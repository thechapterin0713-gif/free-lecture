/**
 * 상세페이지 HTML → 스마트스토어용 이미지 변환 스크립트
 *
 * 사용법: node scripts/convert-to-images.mjs output/상품명.html
 *
 * 결과물:
 *   output/상품명-images/
 *     ├── full.jpg          (전체 한 장)
 *     ├── section-01.jpg    (섹션별 분할)
 *     ├── section-02.jpg
 *     └── ...
 *
 * 네이버 스마트스토어 권장 사양:
 *   - 가로: 860px
 *   - 포맷: JPG
 *   - 섹션당 세로: 최대 2000px 권장
 */

import puppeteer from "puppeteer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, "..");

// 스마트스토어 설정
const SMARTSTORE_WIDTH = 860;
const MAX_SECTION_HEIGHT = 2000;
const JPEG_QUALITY = 90;

async function convertToImages(htmlPath) {
  const absolutePath = path.resolve(PROJECT_ROOT, htmlPath);

  if (!fs.existsSync(absolutePath)) {
    console.error(`파일을 찾을 수 없습니다: ${absolutePath}`);
    process.exit(1);
  }

  // 결과물 폴더 생성
  const baseName = path.basename(htmlPath, ".html");
  const outputDir = path.join(path.dirname(absolutePath), `${baseName}-images`);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log("브라우저를 실행합니다...");
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox"],
  });

  const page = await browser.newPage();

  // 스마트스토어 기준 860px 너비로 설정
  await page.setViewport({
    width: SMARTSTORE_WIDTH,
    height: 1080,
    deviceScaleFactor: 2, // 고해상도 (레티나)
  });

  // HTML 파일 로드
  const fileUrl = `file://${absolutePath}`;
  await page.goto(fileUrl, { waitUntil: "networkidle0", timeout: 30000 });

  // 컨테이너를 860px로 강제 조정
  await page.evaluate((width) => {
    const container = document.querySelector(".container");
    if (container) {
      container.style.maxWidth = `${width}px`;
      container.style.width = `${width}px`;
      container.style.margin = "0";
    }
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.background = "#ffffff";
  }, SMARTSTORE_WIDTH);

  // 잠시 대기 (스타일 적용)
  await new Promise((r) => setTimeout(r, 500));

  // 1) 전체 한 장 캡처
  const fullPath = path.join(outputDir, "full.jpg");
  const container = await page.$(".container");
  if (container) {
    await container.screenshot({
      path: fullPath,
      type: "jpeg",
      quality: JPEG_QUALITY,
    });
  } else {
    await page.screenshot({
      path: fullPath,
      type: "jpeg",
      quality: JPEG_QUALITY,
      fullPage: true,
    });
  }
  console.log(`전체 이미지 저장: ${fullPath}`);

  // 2) 섹션별 분할 캡처
  const totalHeight = await page.evaluate(() => {
    const container = document.querySelector(".container");
    return container ? container.scrollHeight : document.body.scrollHeight;
  });

  const sectionCount = Math.ceil(totalHeight / MAX_SECTION_HEIGHT);
  console.log(
    `전체 높이: ${totalHeight}px → ${sectionCount}개 섹션으로 분할합니다`
  );

  for (let i = 0; i < sectionCount; i++) {
    const y = i * MAX_SECTION_HEIGHT;
    const height = Math.min(MAX_SECTION_HEIGHT, totalHeight - y);
    const sectionPath = path.join(
      outputDir,
      `section-${String(i + 1).padStart(2, "0")}.jpg`
    );

    await page.screenshot({
      path: sectionPath,
      type: "jpeg",
      quality: JPEG_QUALITY,
      clip: {
        x: 0,
        y: y,
        width: SMARTSTORE_WIDTH,
        height: height,
      },
    });
    console.log(`섹션 ${i + 1}/${sectionCount} 저장: ${sectionPath}`);
  }

  await browser.close();

  console.log(`\n변환 완료!`);
  console.log(`결과물 폴더: ${outputDir}`);
  console.log(`- full.jpg: 전체 상세페이지 (한 장)`);
  console.log(`- section-01~${String(sectionCount).padStart(2, "0")}.jpg: 섹션별 분할 이미지`);
  console.log(`\n스마트스토어에 올릴 때:`);
  console.log(`- 상품 상세 설명 → 이미지 업로드 → section-01부터 순서대로 올리세요`);

  return outputDir;
}

// 실행
const htmlFile = process.argv[2];
if (!htmlFile) {
  console.log("사용법: node scripts/convert-to-images.mjs output/상품명.html");
  console.log("예시: node scripts/convert-to-images.mjs output/꿀잠베개.html");
  process.exit(1);
}

convertToImages(htmlFile);
