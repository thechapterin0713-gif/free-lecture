import pptxgen from "pptxgenjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, "..");

const pptx = new pptxgen();
pptx.layout = "LAYOUT_WIDE"; // 16:9
pptx.author = "태오";
pptx.subject = "바이브코딩으로 상세페이지 만들기";

// ─── 색상 팔레트 (원래 다크 테마) ───
const C = {
  bg: "1A1A2E",
  bgLight: "16213E",
  accent: "E94560",
  accentSoft: "FF6B6B",
  white: "FFFFFF",
  gray: "AAAAAA",
  grayLight: "DDDDDD",
  yellow: "FFC947",
  green: "4ADE80",
  blue: "60A5FA",
  card: "0F3460",
};

// ─── 레이아웃 상수 ───
const L = {
  mx: 1.0,          // 좌측 마진
  contentW: 10.5,   // 콘텐츠 너비
  titleY: 1.2,      // 제목 Y (아래로 내림)
  titleSize: 34,     // 제목 폰트
  bodySize: 20,      // 본문 폰트
  smallSize: 16,     // 작은 텍스트
  labelSize: 11,     // 라벨
  lineH: 1.5,        // 줄간격
};

// ─── 유틸 ───
let pageNum = 0;
const TOTAL = 30;

function newSlide(notes = "", label = "") {
  pageNum++;
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  if (notes) s.addNotes(notes);

  // 파트 라벨
  if (label) {
    s.addText(label, {
      x: L.mx, y: 0.6, w: 3, fontSize: L.labelSize,
      fontFace: "Apple SD Gothic Neo", color: C.accent, bold: true,
    });
  }

  // 페이지 번호
  s.addText(`${pageNum} / ${TOTAL}`, {
    x: 11.0, y: 7.1, w: 1.2, fontSize: 10, color: C.gray, align: "right",
  });

  return s;
}

function addTitle(s, text, opts = {}) {
  s.addText(text, {
    x: L.mx, y: opts.y ?? L.titleY, w: L.contentW,
    fontSize: opts.fontSize ?? L.titleSize,
    fontFace: "Apple SD Gothic Neo",
    color: opts.color ?? C.white, bold: true,
  });
}

function addBody(s, text, opts = {}) {
  s.addText(text, {
    x: opts.x ?? L.mx, y: opts.y ?? 1.8, w: opts.w ?? L.contentW,
    fontSize: opts.fontSize ?? L.bodySize,
    fontFace: "Apple SD Gothic Neo",
    color: opts.color ?? C.grayLight,
    lineSpacingMultiple: opts.lineH ?? L.lineH,
    bold: opts.bold ?? false,
  });
}

function addCard(s, x, y, w, h, fill = C.card) {
  s.addShape(pptx.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h, fill: { color: fill }, rectRadius: 0.2,
  });
}

function addCircle(s, x, y, text, fill = C.accent) {
  s.addShape(pptx.shapes.OVAL, {
    x, y, w: 0.45, h: 0.45, fill: { color: fill },
  });
  s.addText(text, {
    x, y, w: 0.45, h: 0.45,
    fontSize: 14, color: C.white, align: "center", valign: "middle", bold: true,
  });
}


// ═══════════════════════════════════════════
// 1. 표지
// ═══════════════════════════════════════════
{
  const s = newSlide(
    "인사하고 분위기 파악. '코드 경험 있는 분?' 손들기.\n'완벽합니다. 오늘 코드 한 줄도 안 칩니다.'"
  );

  s.addText("바이브코딩으로\n상세페이지 만들기", {
    x: L.mx, y: 2.2, w: L.contentW,
    fontSize: 46, fontFace: "Apple SD Gothic Neo",
    color: C.white, bold: true, lineSpacingMultiple: 1.3,
  });

  s.addText("코드 한 줄 없이, AI 직원한테 시키는 법", {
    x: L.mx, y: 4.6, w: L.contentW,
    fontSize: 22, fontFace: "Apple SD Gothic Neo", color: C.accentSoft,
  });

  // 구분선
  s.addShape(pptx.shapes.RECTANGLE, {
    x: L.mx, y: 5.6, w: 3, h: 0.04, fill: { color: C.accent },
  });

  s.addText("태오  |  비개발자 · 3개 사업 운영", {
    x: L.mx, y: 5.9, w: L.contentW,
    fontSize: 14, color: C.gray,
  });
}

// ═══════════════════════════════════════════
// 2. 자기소개
// ═══════════════════════════════════════════
{
  const s = newSlide(
    "자기소개. 비개발자인데 AI로 사업을 운영한다는 점 강조.\n'저도 코드 모릅니다' → 친근감.",
    "PART 1 · 오프닝"
  );
  addTitle(s, "발표자 소개");

  addCard(s, L.mx, 2.4, L.contentW, 4.2);

  s.addText("태오", {
    x: 1.6, y: 2.7, w: 9, fontSize: 28, color: C.white, bold: true,
    fontFace: "Apple SD Gothic Neo",
  });

  // 구분선
  s.addShape(pptx.shapes.RECTANGLE, {
    x: 1.6, y: 3.5, w: 2, h: 0.03, fill: { color: C.accent },
  });

  const info = [
    "🙅  비개발자 (코드 모릅니다)",
    "🏢  3개 사업 운영 중",
    "🤖  AI를 직원처럼 활용해서 사업 운영",
    "🎤  오늘 여러분도 할 수 있다는 걸 보여드리겠습니다",
  ];

  info.forEach((item, i) => {
    s.addText(item, {
      x: 1.6, y: 3.85 + i * 0.65, w: 9,
      fontSize: 19, color: C.grayLight, fontFace: "Apple SD Gothic Neo",
    });
  });
}

// ═══════════════════════════════════════════
// 3. 오늘의 목표
// ═══════════════════════════════════════════
{
  const s = newSlide(
    "목표를 명확히. '끝나고 집에서 혼자 할 수 있다'.\n'카카오톡 칠 줄 알면 됩니다.'",
    "PART 1 · 오프닝"
  );
  addTitle(s, "오늘의 목표");

  addBody(s, "강의가 끝나면 여러분이\n직접 상세페이지를 만들 수 있습니다.", {
    y: 2.8, fontSize: 28, color: C.yellow, bold: true, lineH: 1.4,
  });

  addBody(s, "혼자서.\n코드 없이.\nAI한테 시켜서.", {
    y: 4.6, fontSize: 24, color: C.white, lineH: 1.8,
  });
}

// ═══════════════════════════════════════════
// 3. 바이브코딩이란?
// ═══════════════════════════════════════════
{
  const s = newSlide(
    "'바이브코딩 들어보신 분?' 손들기.\n핵심: 코딩을 배우는 게 아니라 AI한테 일을 시키는 것.",
    "PART 2 · 바이브코딩"
  );
  addTitle(s, "바이브코딩이 뭔가요?");

  addBody(s, "말로 설명하면\nAI가 대신 만들어주는 것", {
    y: 2.7, fontSize: 30, color: C.yellow, bold: true, lineH: 1.3,
  });

  addBody(s, "코딩을 배우는 게 아닙니다.\nAI한테 일을 시키는 겁니다.\n\n여러분은 사장님이고,\nAI는 직원입니다.", {
    y: 4.2, fontSize: 20, lineH: 1.7,
  });
}

// ═══════════════════════════════════════════
// 4. 예전 vs 지금
// ═══════════════════════════════════════════
{
  const s = newSlide(
    "비용/시간 비교. '200만원 vs 커피 2잔'. '수정 3일 vs 즉시'.",
    "PART 2 · 바이브코딩"
  );
  addTitle(s, "상세페이지, 예전과 지금");

  // 예전 카드
  addCard(s, L.mx, 2.5, 5.0, 4.0);
  s.addText("예전 방식", {
    x: L.mx, y: 2.65, w: 5.0,
    fontSize: 14, color: C.accent, bold: true, align: "center",
  });
  addBody(s, "디자이너 외주\n\n💰  200만원\n⏰  수정 3일\n😤  소통 스트레스", {
    x: 1.6, y: 3.2, w: 3.8, fontSize: 19, lineH: 1.6,
  });

  // 지금 카드
  addCard(s, 6.5, 2.5, 5.0, 4.0, "0D4A2E");
  s.addText("바이브코딩", {
    x: 6.5, y: 2.65, w: 5.0,
    fontSize: 14, color: C.green, bold: true, align: "center",
  });
  addBody(s, "AI한테 시키기\n\n💰  월 2만원 (커피 2잔)\n⏰  수정 즉시\n😊  말하면 끝", {
    x: 7.1, y: 3.2, w: 3.8, fontSize: 19, lineH: 1.6,
  });
}

// ═══════════════════════════════════════════
// 5. ChatGPT vs 클로드 코드
// ═══════════════════════════════════════════
{
  const s = newSlide(
    "'ChatGPT 쓰시는 분?' 손들기. '텍스트 vs 실제 파일' 핵심.",
    "PART 2 · 바이브코딩"
  );
  addTitle(s, "ChatGPT vs 클로드 코드");

  const hdr = { fill: { color: C.card }, bold: true, align: "center" };
  const rowA = { fill: { color: C.bgLight }, align: "center" };
  const rowB = { fill: { color: C.card }, align: "center" };
  const lbl = { bold: true };

  const rows = [
    [
      { text: "", options: { ...hdr } },
      { text: "ChatGPT", options: { ...hdr, color: C.accent } },
      { text: "클로드 코드", options: { ...hdr, color: C.green } },
    ],
    [
      { text: "결과물", options: { ...rowA, ...lbl } },
      { text: "텍스트 (복붙 필요)", options: { ...rowA, color: C.gray } },
      { text: "실제 파일 (바로 사용)", options: { ...rowA, color: C.green } },
    ],
    [
      { text: "수정", options: { ...rowB, ...lbl } },
      { text: "다시 물어봐야 함", options: { ...rowB, color: C.gray } },
      { text: "\"바꿔줘\" 한마디", options: { ...rowB, color: C.green } },
    ],
    [
      { text: "기억력", options: { ...rowA, ...lbl } },
      { text: "매번 처음부터 설명", options: { ...rowA, color: C.gray } },
      { text: "업무 매뉴얼 읽고 일함", options: { ...rowA, color: C.green } },
    ],
    [
      { text: "비유", options: { ...rowB, ...lbl } },
      { text: "프리랜서한테 카톡", options: { ...rowB, color: C.gray } },
      { text: "사무실에 앉은 직원", options: { ...rowB, color: C.green } },
    ],
  ];

  s.addTable(rows, {
    x: L.mx, y: 2.5, w: L.contentW,
    fontSize: 17, fontFace: "Apple SD Gothic Neo",
    color: C.grayLight,
    border: { type: "solid", pt: 1, color: C.bg },
    rowH: [0.65, 0.8, 0.8, 0.8, 0.8],
    colW: [2.5, 4.0, 4.0],
  });
}

// ═══════════════════════════════════════════
// 6. 왜 VS Code?
// ═══════════════════════════════════════════
{
  const s = newSlide(
    "VS Code 화면 띄워서 보여주기.\n'메모장의 업그레이드 버전' 비유.",
    "PART 2 · 바이브코딩"
  );
  addTitle(s, "왜 VS Code에서 하나요?");

  addBody(s, "메모장의 업그레이드 버전\n+ AI가 같이 살고 있는 곳", {
    y: 2.5, fontSize: 26, color: C.yellow, bold: true, lineH: 1.3,
  });

  addBody(s, "AI가 파일을 직접 만들려면 '작업 공간'이 필요합니다.\n그 작업 공간이 VS Code예요.", {
    y: 3.9, fontSize: 18,
  });

  // 3개 영역
  const areas = [
    { x: L.mx, label: "왼쪽", desc: "📁  파일/폴더", color: C.blue, bg: C.card },
    { x: 4.6, label: "가운데", desc: "📄  파일 내용\n(안 봐도 됨)", color: C.gray, bg: C.card },
    { x: 8.2, label: "오른쪽", desc: "🤖  AI 직원\n(여기만 보세요!)", color: C.green, bg: "0D4A2E" },
  ];

  areas.forEach((a) => {
    addCard(s, a.x, 5.2, 3.3, 1.5, a.bg);
    s.addText(a.label, {
      x: a.x, y: 5.3, w: 3.3,
      fontSize: 12, color: a.color, bold: true, align: "center",
    });
    s.addText(a.desc, {
      x: a.x, y: 5.7, w: 3.3,
      fontSize: 16, color: C.grayLight, align: "center",
      fontFace: "Apple SD Gothic Neo", lineSpacingMultiple: 1.3,
    });
  });
}

// ═══════════════════════════════════════════
// 7. CLAUDE.md = 업무 매뉴얼
// ═══════════════════════════════════════════
{
  const s = newSlide(
    "CLAUDE.md 열어서 보여주기.\n'직원한테 주는 업무 매뉴얼' '한번 쓰면 매번 읽고 일함'",
    "PART 3 · AI 직원"
  );
  addTitle(s, "CLAUDE.md = 업무 매뉴얼");

  addBody(s, "신입 직원한테 주는 업무 지시서", {
    y: 2.4, fontSize: 24, color: C.yellow, bold: true,
  });

  addCard(s, L.mx, 3.3, L.contentW, 2.8);

  const items = [
    "📋  상세페이지 만들 때는 이렇게 해라",
    "📋  CS 답변할 때는 이렇게 해라",
    "📋  톤은 친절하게 해라",
    "📋  모바일 기준으로 만들어라",
  ];
  items.forEach((item, i) => {
    s.addText(item, {
      x: 1.6, y: 3.6 + i * 0.6, w: 9.5,
      fontSize: 18, color: C.grayLight, fontFace: "Apple SD Gothic Neo",
    });
  });

  addBody(s, "한 번 만들어두면 → AI가 매번 읽고 일합니다\n매번 처음부터 설명할 필요 없어요.", {
    y: 6.3, fontSize: 17, color: C.green,
  });
}

// ═══════════════════════════════════════════
// 8. 몰라도 되는 것
// ═══════════════════════════════════════════
{
  const s = newSlide(
    "'나는 컴퓨터 잘 모르는데...' 안심시키기.\n'카카오톡 칠 줄 알면 됩니다'",
    "PART 3 · AI 직원"
  );
  addTitle(s, "몰라도 되는 것 / 알아야 하는 것", { fontSize: 30 });

  // 왼쪽
  addCard(s, L.mx, 2.5, 5.0, 4.0);
  s.addText("❌  몰라도 됩니다", {
    x: L.mx, y: 2.7, w: 5.0, fontSize: 15, color: C.accent, bold: true, align: "center",
  });
  const nope = ["코드, 프로그래밍", "HTML, CSS", "터미널, 명령어", "영어"];
  nope.forEach((t, i) => {
    s.addText(t, {
      x: 1.8, y: 3.3 + i * 0.7, w: 3.5,
      fontSize: 20, color: C.grayLight, fontFace: "Apple SD Gothic Neo",
    });
  });

  // 오른쪽
  addCard(s, 6.5, 2.5, 5.0, 4.0, "0D4A2E");
  s.addText("✅  이것만 알면 됩니다", {
    x: 6.5, y: 2.7, w: 5.0, fontSize: 15, color: C.green, bold: true, align: "center",
  });
  const yep = ["카카오톡 칠 줄 알면 됨", "폴더에 파일 넣을 줄 알면 됨", "'이거 해줘' 말할 줄 알면 됨"];
  yep.forEach((t, i) => {
    s.addText(t, {
      x: 7.2, y: 3.3 + i * 0.85, w: 3.8,
      fontSize: 19, color: C.white, fontFace: "Apple SD Gothic Neo", bold: true,
    });
  });
}

// ═══════════════════════════════════════════
// 9. 라이브 시연 시작
// ═══════════════════════════════════════════
{
  const s = newSlide(
    "여기서부터 VS Code 화면으로 전환.",
    "PART 4 · 라이브 시연"
  );

  s.addText("자, 이제\n진짜로 해보겠습니다", {
    x: L.mx, y: 2.5, w: L.contentW,
    fontSize: 44, fontFace: "Apple SD Gothic Neo",
    color: C.white, bold: true, lineSpacingMultiple: 1.3,
    align: "center",
  });

  s.addText("🔴  LIVE DEMO", {
    x: L.mx, y: 4.8, w: L.contentW,
    fontSize: 24, color: C.accent, bold: true, align: "center",
  });
}

// ═══════════════════════════════════════════
// 10~16: 시연 단계들
// ═══════════════════════════════════════════
const steps = [
  {
    label: "STEP 1 · 초기화", title: "AI한테 첫 번째 지시",
    cmd: "초기화해줘", cmdSize: 32,
    bullets: [
      "→  폴더 구조 자동 생성",
      "→  브랜드 설정 파일 생성",
      "→  CS 답변 템플릿 생성",
      "→  HTML 템플릿 4종 준비",
    ],
    notes: "'초기화해줘' 입력. 폴더 생기는 것 보여주기.\n'한마디 했더니 직원이 사무실을 세팅했습니다.'",
  },
  {
    label: "STEP 2 · 브랜드 설정", title: "브랜드 정보 입력하기",
    cmd: "우리 브랜드 정보야:\n상호명: 반죽연구소\n분위기는 따뜻하고 정직한 느낌\n주황색 계열로 해줘",
    cmdSize: 18,
    bullets: [
      "→  컬러 코드 몰라도 됩니다",
      "→  '주황색'이라고만 하면 AI가 알아서",
    ],
    notes: "brand-config.md 빈칸 보여주고, 말로 입력하면 채워지는 것 시연.",
  },
  {
    label: "STEP 3 · 인터뷰", title: "AI 직원이 인터뷰합니다",
    cmd: "상세페이지 만들어줘", cmdSize: 30,
    bullets: [
      '🤖  "어떤 상품인가요?"',
      '🤖  "가격대는 어떻게 되나요?"',
      '🤖  "고객이 어떤 고민을 하나요?"',
      '🤖  "비슷한 상품이랑 뭐가 다른가요?"',
    ],
    notes: "참석자 상품으로 할지 물어보기. 없으면 반죽으로.\n'사장님이 한 건 질문에 답한 것뿐입니다'",
  },
  {
    label: "STEP 4 · 생성", title: "AI가 만들고 있습니다",
    cmd: "☕  커피 한 잔 마시고 오세요", cmdSize: 26,
    bullets: [
      "화면에 코드가 올라가고 있죠?",
      "이거 안 봐도 됩니다.",
      "AI 직원이 혼자 일하는 겁니다.",
    ],
    notes: "코드 나오는 화면 보여주면서 '안 봐도 됩니다' 반복.\n완성되면 브라우저에서 열어서 보여주기!",
  },
  {
    label: "STEP 5 · 수정", title: "마음에 안 들면?",
    cmd: "헤드라인을 '매일 아침이 기다려지는\n갓 구운 빵의 비밀'로 바꿔줘",
    cmdSize: 20,
    bullets: [
      "→  즉시 수정됨",
      "→  말하면 끝",
      "→  디자이너 수정 3일 기다릴 필요 없음",
    ],
    notes: "수정 2가지. 헤드라인 + 색상 변경.",
  },
  {
    label: "STEP 6 · 이미지 변환", title: "스마트스토어에 올리려면?",
    cmd: "스마트스토어에 올릴 수 있게\n이미지로 변환해줘",
    cmdSize: 22,
    bullets: [
      "→  가로 860px (스마트스토어 규격)",
      "→  섹션별 자동 분할",
      "→  순서대로 업로드하면 끝",
    ],
    notes: "'디자이너 없이, 포토샵 없이, 한마디로 끝'",
  },
];

steps.forEach((step) => {
  const s = newSlide(step.notes, step.label);
  addTitle(s, step.title);

  // 명령어 카드
  const cmdLines = step.cmd.split("\n").length;
  const cmdH = Math.max(1.2, cmdLines * 0.5 + 0.4);
  addCard(s, L.mx, 2.4, L.contentW, cmdH);
  s.addText(step.cmd, {
    x: 1.6, y: 2.5, w: 9.3, h: cmdH - 0.2,
    fontSize: step.cmdSize, color: C.green, bold: true,
    fontFace: "Apple SD Gothic Neo", lineSpacingMultiple: 1.4,
    valign: "middle",
  });

  // 결과 목록
  const bulletY = 2.5 + cmdH + 0.5;
  step.bullets.forEach((b, i) => {
    s.addText(b, {
      x: 1.6, y: bulletY + i * 0.6, w: 9.3,
      fontSize: 18, color: C.grayLight, fontFace: "Apple SD Gothic Neo",
    });
  });
});

// ═══════════════════════════════════════════
// 17: 시연 정리
// ═══════════════════════════════════════════
{
  const s = newSlide("시연 전체 흐름 정리.", "PART 4 · 시연 정리");
  addTitle(s, "방금 한 일 정리");

  const summary = [
    { num: "1", text: '"초기화해줘"', desc: "작업 환경 세팅" },
    { num: "2", text: "브랜드 정보 입력", desc: "색상/로고 자동 반영" },
    { num: "3", text: "질문에 답하기", desc: "상품 정보 정리" },
    { num: "4", text: "승인하기", desc: "상세페이지 완성" },
    { num: "5", text: '"바꿔줘"', desc: "즉시 수정" },
    { num: "6", text: '"이미지 변환해줘"', desc: "스마트스토어 업로드 준비" },
  ];

  summary.forEach((item, i) => {
    const y = 2.4 + i * 0.75;
    addCircle(s, L.mx, y + 0.05, item.num, C.blue);
    s.addText(item.text, {
      x: 1.8, y, w: 4.5, fontSize: 19, color: C.white, bold: true,
      fontFace: "Apple SD Gothic Neo",
    });
    s.addText(item.desc, {
      x: 6.5, y, w: 4.5, fontSize: 17, color: C.grayLight,
      fontFace: "Apple SD Gothic Neo",
    });
  });

  addBody(s, "여러분이 한 건 말한 것뿐입니다.", {
    y: 6.5, fontSize: 20, color: C.yellow, bold: true,
  });
}

// ═══════════════════════════════════════════
// 18~19: 보너스 활용
// ═══════════════════════════════════════════
{
  const s = newSlide("시간 여유 있으면 CS 시연.", "보너스 · 활용 사례");
  addTitle(s, "이것도 됩니다 ①  CS 답변");

  addCard(s, L.mx, 2.5, L.contentW, 2.0);
  s.addText(
    '고객한테 이런 문의가 왔어:\n"반죽 유통기한이 어떻게 되나요?\n냉동 보관 가능한가요?"\n답변 초안 만들어줘',
    { x: 1.6, y: 2.7, w: 9.3, fontSize: 17, color: C.grayLight,
      fontFace: "Apple SD Gothic Neo", lineSpacingMultiple: 1.4 }
  );

  addBody(s, "→  카테고리 자동 분류\n→  친절한 답변 즉시 생성\n→  복사 붙여넣기만 하면 끝", {
    y: 5.0, fontSize: 18, lineH: 1.7,
  });
}

{
  const s = newSlide("마케팅 코치.", "보너스 · 활용 사례");
  addTitle(s, "이것도 됩니다 ②  마케팅 코치");

  addCard(s, L.mx, 2.5, L.contentW, 1.6);
  s.addText(
    "우리 반죽 제품 마케팅 방향 잡아줘\n타겟 고객, 차별화 포인트,\n스마트스토어 전략 초안 만들어줘",
    { x: 1.6, y: 2.7, w: 9.3, fontSize: 17, color: C.grayLight,
      fontFace: "Apple SD Gothic Neo", lineSpacingMultiple: 1.4 }
  );

  addBody(s, "→  타겟 고객 정의\n→  차별화 포인트 분석\n→  채널별 전략\n→  이번 달 실행 가능한 액션 3가지", {
    y: 4.6, fontSize: 18, lineH: 1.7,
  });

  addBody(s, "컨설턴트 100만원짜리가 이렇게 나옵니다.", {
    y: 6.5, fontSize: 18, color: C.yellow, bold: true,
  });
}

// ═══════════════════════════════════════════
// 20~22: 집에서 따라하기
// ═══════════════════════════════════════════
{
  const s = newSlide("따라하기 파트 시작.", "PART 5 · 따라하기");

  s.addText("집에서 따라하기", {
    x: L.mx, y: 2.2, w: L.contentW,
    fontSize: 40, color: C.white, bold: true, align: "center",
    fontFace: "Apple SD Gothic Neo",
  });

  s.addText("딱 3가지만 설치하면 됩니다", {
    x: L.mx, y: 3.8, w: L.contentW,
    fontSize: 24, color: C.yellow, bold: true, align: "center",
  });
}

{
  const s = newSlide("설치 3단계.", "PART 5 · 설치 방법");
  addTitle(s, "설치 3단계");

  const installs = [
    { num: "1", t: "VS Code 설치", desc: "'VS Code 다운로드' 검색 → 설치 (무료)", col: C.blue },
    { num: "2", t: "클로드 코드 확장 설치", desc: "VS Code → 왼쪽 블록 아이콘 → 'Claude' 검색 → 설치", col: C.green },
    { num: "3", t: "클로드 계정 만들기", desc: "claude.ai 가입 (구글 로그인 가능) → 끝!", col: C.yellow },
  ];

  installs.forEach((item, i) => {
    const y = 2.5 + i * 1.5;
    addCard(s, L.mx, y, L.contentW, 1.3);
    addCircle(s, 1.5, y + 0.3, item.num, item.col);
    s.addText(item.t, {
      x: 2.3, y: y + 0.15, w: 5, fontSize: 21, color: C.white, bold: true,
      fontFace: "Apple SD Gothic Neo",
    });
    s.addText(item.desc, {
      x: 2.3, y: y + 0.75, w: 8.5, fontSize: 16, color: C.grayLight,
      fontFace: "Apple SD Gothic Neo",
    });
  });
}

{
  const s = newSlide("시작 프롬프트.", "PART 5 · 시작하는 법");
  addTitle(s, "시작하는 법");

  addBody(s, "1.  바탕화면에 폴더 하나 만들기\n2.  VS Code에서 그 폴더 열기\n3.  클로드 코드 패널 열기\n4.  이렇게 입력하기  ↓", {
    y: 2.4, fontSize: 19, lineH: 1.7,
  });

  addCard(s, L.mx, 4.8, L.contentW, 1.8);
  s.addText(
    "CLAUDE.md 파일 만들어줘.\n나는 이커머스 상세페이지를 만들 거야.\n업무 지시서를 만들어줘.",
    { x: 1.6, y: 4.9, w: 9.3, fontSize: 20, color: C.green, bold: true,
      fontFace: "Apple SD Gothic Neo", lineSpacingMultiple: 1.4 }
  );

  addBody(s, "이것만 하면 AI가 알아서 세팅합니다.", {
    y: 6.6, fontSize: 17, color: C.yellow, bold: true,
  });
}

// ═══════════════════════════════════════════
// 23~24: 꿀팁
// ═══════════════════════════════════════════
{
  const s = newSlide("막히면 AI한테 물어보라.", "PART 5 · 꿀팁");
  addTitle(s, "막히면 이렇게 하세요");

  const tips = [
    { input: '"이거 왜 안 돼?"', result: "→  알아서 고칩니다", icon: "🔧" },
    { input: '"이게 뭐야?"', result: "→  설명해줍니다", icon: "📖" },
    { input: '"처음부터 다시 해줘"', result: "→  다시 해줍니다", icon: "🔄" },
    { input: '"마음에 안 들어"', result: "→  다르게 만들어줍니다", icon: "✨" },
  ];

  tips.forEach((tip, i) => {
    const y = 2.5 + i * 1.05;
    addCard(s, L.mx, y, L.contentW, 0.9);
    s.addText(tip.icon + "  " + tip.input, {
      x: 1.6, y: y + 0.15, w: 5.5, fontSize: 19, color: C.white, bold: true,
      fontFace: "Apple SD Gothic Neo",
    });
    s.addText(tip.result, {
      x: 7.2, y: y + 0.15, w: 4, fontSize: 17, color: C.green, bold: true,
      fontFace: "Apple SD Gothic Neo",
    });
  });

  addBody(s, "이 직원은 야근해도 화 안 냅니다.\n100번 물어봐도 짜증 안 냅니다.", {
    y: 6.3, fontSize: 16, color: C.gray,
  });
}

{
  const s = newSlide("플랜 모드.", "PART 5 · 꿀팁");
  addTitle(s, "꿀팁:  Shift + Tab");

  addBody(s, "= 플랜 모드", {
    y: 2.5, fontSize: 28, color: C.yellow, bold: true,
  });

  addBody(s, "바로 만들지 말고\n계획서부터 보여달라는 것", {
    y: 3.4, fontSize: 22, color: C.white, lineH: 1.4,
  });

  addCard(s, L.mx, 4.8, L.contentW, 2.0);
  s.addText(
    "계획이 마음에 들면  →  승인\n계획이 마음에 안 들면  →  수정 요청\n\n무조건 쓰세요. 실수가 확 줄어듭니다.",
    { x: 1.6, y: 5.0, w: 9.3, fontSize: 19, color: C.grayLight,
      fontFace: "Apple SD Gothic Neo", lineSpacingMultiple: 1.5 }
  );
}

// ═══════════════════════════════════════════
// 25~26: 마무리
// ═══════════════════════════════════════════
{
  const s = newSlide("오늘 한 것 정리.", "PART 6 · 마무리");
  addTitle(s, "오늘 보여드린 것");

  const summary = [
    "바이브코딩 = 말하면 AI가 만들어줌",
    "클로드 코드 = VS Code에 사는 AI 직원",
    "CLAUDE.md = 직원 업무 매뉴얼",
    "상세페이지 30분 만에 완성",
    "수정은 말하면 바로",
    "스마트스토어용 이미지 자동 변환",
  ];

  summary.forEach((text, i) => {
    const y = 2.5 + i * 0.75;
    s.addText(`${i + 1}.`, {
      x: L.mx, y, w: 0.5, fontSize: 20, color: C.accent, bold: true,
    });
    s.addText(text, {
      x: 1.8, y, w: 9.5, fontSize: 20, color: C.white,
      fontFace: "Apple SD Gothic Neo", bold: true,
    });
  });

  addBody(s, "이 모든 걸 코드 한 줄 없이 했습니다.", {
    y: 6.5, fontSize: 20, color: C.yellow, bold: true,
  });
}

{
  const s = newSlide("집에서 해볼 것.", "PART 6 · 마무리");

  s.addText("오늘 저녁에\n딱 하나만 해보세요", {
    x: L.mx, y: 1.5, w: L.contentW,
    fontSize: 38, color: C.white, bold: true, align: "center",
    fontFace: "Apple SD Gothic Neo", lineSpacingMultiple: 1.3,
  });

  addBody(s, "1.  VS Code 설치\n2.  클로드 코드 깔기\n3.  본인 상품 하나로 상세페이지 만들어보기", {
    y: 3.8, fontSize: 22, color: C.grayLight, lineH: 1.8,
    x: 3.0, w: 6.5,
  });

  addBody(s, "설명란에 CLAUDE.md 파일이랑\n시작 프롬프트 전부 올려놨습니다.", {
    y: 6.0, fontSize: 16, color: C.gray, x: 3.0, w: 6.5,
  });
}

// ═══════════════════════════════════════════
// 27: Q&A
// ═══════════════════════════════════════════
{
  const s = newSlide("자주 나오는 질문들.", "Q&A");
  addTitle(s, "자주 묻는 질문");

  const hdr = { fill: { color: C.card }, bold: true, color: C.accent, align: "center" };
  const rA = { fill: { color: C.bgLight } };
  const rB = { fill: { color: C.card } };

  const rows = [
    [
      { text: "질문", options: { ...hdr } },
      { text: "답변", options: { ...hdr, color: C.green } },
    ],
    [
      { text: "유료인가요?", options: { ...rA, bold: true } },
      { text: "기본 무료. 많이 쓰면 월 $20 (커피 2잔값)", options: { ...rA } },
    ],
    [
      { text: "코드 무서운데요", options: { ...rB, bold: true } },
      { text: "안 봐도 됩니다. 결과물만 보세요", options: { ...rB } },
    ],
    [
      { text: "쿠팡에도 되나요?", options: { ...rA, bold: true } },
      { text: "네! 이미지로 변환하면 어디든 OK", options: { ...rA } },
    ],
    [
      { text: "디자인이 별로면요?", options: { ...rB, bold: true } },
      { text: "사진만 좋으면 됩니다 + 수정하면 되죠", options: { ...rB } },
    ],
    [
      { text: "영어 나오면요?", options: { ...rA, bold: true } },
      { text: "한국말로만 하시면 됩니다", options: { ...rA } },
    ],
  ];

  s.addTable(rows, {
    x: L.mx, y: 2.5, w: L.contentW,
    fontSize: 16, fontFace: "Apple SD Gothic Neo",
    color: C.grayLight,
    border: { type: "solid", pt: 1, color: C.bg },
    rowH: [0.55, 0.7, 0.7, 0.7, 0.7, 0.7],
    colW: [3.0, 7.5],
  });
}

// ═══════════════════════════════════════════
// 28: 감사합니다
// ═══════════════════════════════════════════
{
  const s = newSlide("박수 기다리기.");

  s.addText("감사합니다!", {
    x: L.mx, y: 2.5, w: L.contentW,
    fontSize: 52, color: C.white, bold: true, align: "center",
    fontFace: "Apple SD Gothic Neo",
  });

  s.addShape(pptx.shapes.RECTANGLE, {
    x: 5.0, y: 4.2, w: 2.5, h: 0.04, fill: { color: C.accent },
  });

  s.addText("질문 있으시면 편하게 말씀해주세요", {
    x: L.mx, y: 4.6, w: L.contentW,
    fontSize: 20, color: C.grayLight, align: "center",
  });

  s.addText("자료 다운로드: 설명란 링크 확인", {
    x: L.mx, y: 5.8, w: L.contentW,
    fontSize: 14, color: C.gray, align: "center",
  });
}

// ═══════════════════════════════════════════
// 29: 발표자 전용 (비상+시간)
// ═══════════════════════════════════════════
{
  const s = newSlide("발표자 전용. 비상시 참고.", "발표자 전용");
  addTitle(s, "비상 대응 + 시간 조절", { color: C.accent });

  const hdr = { fill: { color: C.card }, bold: true, color: C.accent };
  const rA = { fill: { color: C.bgLight } };
  const rB = { fill: { color: C.card } };

  const rows = [
    [
      { text: "상황", options: { ...hdr } },
      { text: "대응", options: { ...hdr, color: C.green } },
    ],
    [
      { text: "인터넷 끊김", options: { ...rA, bold: true } },
      { text: "모바일 핫스팟 전환", options: { ...rA } },
    ],
    [
      { text: "에러 발생", options: { ...rB, bold: true } },
      { text: "\"에러도 알아서 고칩니다\" (장점으로 전환)", options: { ...rB } },
    ],
    [
      { text: "결과물 안 나옴", options: { ...rA, bold: true } },
      { text: "백업 HTML 보여주기", options: { ...rA } },
    ],
    [
      { text: "시간 부족 (-15분)", options: { ...rB, bold: true } },
      { text: "이미지 변환 스킵, 설치법만 간단히", options: { ...rB } },
    ],
    [
      { text: "시간 여유 (+15분)", options: { ...rA, bold: true } },
      { text: "CS 답변 라이브 시연 추가", options: { ...rA } },
    ],
    [
      { text: "질문 많음", options: { ...rB, bold: true } },
      { text: "PART 5 줄이고 Q&A 늘리기", options: { ...rB } },
    ],
  ];

  s.addTable(rows, {
    x: L.mx, y: 2.5, w: L.contentW,
    fontSize: 15, fontFace: "Apple SD Gothic Neo",
    color: C.grayLight,
    border: { type: "solid", pt: 1, color: C.bg },
    rowH: [0.5, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6],
    colW: [3.2, 7.3],
  });

  s.addText(
    '반복 메시지:  "코드 안 칩니다"  ·  "결과만 보면 됩니다"  ·  "말하면 됩니다"',
    { x: L.mx, y: 6.5, w: L.contentW, fontSize: 14, color: C.yellow, bold: true }
  );
}


// ═══════════════════════════════════════════
// 저장
// ═══════════════════════════════════════════
const outputPath = path.join(OUTPUT_DIR, "presentation.pptx");
await pptx.writeFile({ fileName: outputPath });
console.log(`\nPPTX 생성 완료: ${outputPath}`);
console.log(`총 ${pageNum}장 슬라이드`);
