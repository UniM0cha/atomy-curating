/**
 * 앱 아이콘 생성 스크립트 (애터미 큐레이팅 스타일)
 * 실행: node scripts/generate-icons.js
 * 필요: npm install --save-dev canvas
 */

const { createCanvas } = require("canvas");
const fs = require("fs");
const path = require("path");

// 색상 설정
const BACKGROUND_COLOR = "#5BC0DE";
const ICON_COLOR = "#FFFFFF";
const BETA_BG_COLOR = "#4A90A4"; // BETA 배지 배경 (약간 어두운 하늘색)

// 출력 경로
const OUTPUT_DIR = path.join(__dirname, "../assets/images");

/**
 * 둥근 사각형 그리기 헬퍼
 */
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * 문서(클립보드) 아이콘 그리기
 */
function drawDocumentIcon(ctx, x, y, size) {
  const scale = size / 100;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.fillStyle = ICON_COLOR;
  ctx.strokeStyle = ICON_COLOR;
  ctx.lineWidth = 2;

  // 문서 본체 (둥근 모서리 사각형)
  roundRect(ctx, 10, 5, 60, 80, 6);
  ctx.fill();

  // 문서 내용 라인들 (하늘색)
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.globalAlpha = 0.6;

  // 라인 1
  roundRect(ctx, 18, 25, 44, 6, 2);
  ctx.fill();

  // 라인 2
  roundRect(ctx, 18, 38, 44, 6, 2);
  ctx.fill();

  // 라인 3
  roundRect(ctx, 18, 51, 30, 6, 2);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.restore();
}

/**
 * 연필 아이콘 그리기
 */
function drawPencilIcon(ctx, x, y, size) {
  const scale = size / 100;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.rotate(-Math.PI / 6); // 약간 기울임

  ctx.fillStyle = ICON_COLOR;
  ctx.strokeStyle = ICON_COLOR;
  ctx.lineWidth = 2;

  // 연필 몸통
  ctx.beginPath();
  ctx.moveTo(10, 0);
  ctx.lineTo(10, 50);
  ctx.lineTo(15, 60); // 연필 끝
  ctx.lineTo(20, 50);
  ctx.lineTo(20, 0);
  ctx.closePath();
  ctx.fill();

  // 연필 지우개 부분
  ctx.fillStyle = "#FFB6C1"; // 분홍색
  ctx.beginPath();
  ctx.moveTo(10, 0);
  ctx.lineTo(10, -8);
  ctx.lineTo(20, -8);
  ctx.lineTo(20, 0);
  ctx.closePath();
  ctx.fill();

  // 연필 팁 (어두운 부분)
  ctx.fillStyle = "#333333";
  ctx.beginPath();
  ctx.moveTo(12, 55);
  ctx.lineTo(15, 62);
  ctx.lineTo(18, 55);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

/**
 * BETA 배지 그리기
 */
function drawBetaBadge(ctx, x, y, size) {
  const scale = size / 100;
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  // 배지 배경
  ctx.fillStyle = BETA_BG_COLOR;
  roundRect(ctx, 0, 0, 60, 22, 4);
  ctx.fill();

  // BETA 텍스트
  ctx.fillStyle = ICON_COLOR;
  ctx.font = "bold 14px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("BETA", 30, 12);

  ctx.restore();
}

/**
 * atom美 로고 텍스트 그리기
 */
function drawAtomyLogo(ctx, x, y, size) {
  ctx.save();

  ctx.fillStyle = ICON_COLOR;
  ctx.font = `bold ${size * 0.15}px Arial`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // "atom" 부분
  ctx.fillText("atom", x - size * 0.08, y);

  // "美" 부분 (한자)
  ctx.font = `bold ${size * 0.18}px serif`;
  ctx.fillText("美", x + size * 0.12, y);

  ctx.restore();
}

/**
 * 메인 아이콘 생성
 */
function generateIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // 배경
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, size, size);

  // 문서 아이콘 (중앙)
  const docSize = size * 0.55;
  const docX = size * 0.22;
  const docY = size * 0.18;
  drawDocumentIcon(ctx, docX, docY, docSize);

  // 연필 아이콘 (문서 오른쪽 상단)
  const pencilSize = size * 0.35;
  const pencilX = size * 0.58;
  const pencilY = size * 0.08;
  drawPencilIcon(ctx, pencilX, pencilY, pencilSize);

  // BETA 배지 (문서 왼쪽 상단)
  const betaSize = size * 0.35;
  const betaX = size * 0.12;
  const betaY = size * 0.12;
  drawBetaBadge(ctx, betaX, betaY, betaSize);

  // atom美 로고 (하단)
  drawAtomyLogo(ctx, size * 0.5, size * 0.88, size);

  // 파일 저장
  const buffer = canvas.toBuffer("image/png");
  const outputPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ 생성됨: ${filename} (${size}x${size})`);
}

/**
 * Adaptive Icon 전경 이미지 (투명 배경)
 */
function generateAdaptiveIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // 투명 배경
  ctx.clearRect(0, 0, size, size);

  // 문서 아이콘 (중앙, safe zone 고려)
  const docSize = size * 0.45;
  const docX = size * 0.25;
  const docY = size * 0.22;
  drawDocumentIcon(ctx, docX, docY, docSize);

  // 연필 아이콘
  const pencilSize = size * 0.28;
  const pencilX = size * 0.55;
  const pencilY = size * 0.15;
  drawPencilIcon(ctx, pencilX, pencilY, pencilSize);

  // BETA 배지
  const betaSize = size * 0.28;
  const betaX = size * 0.18;
  const betaY = size * 0.18;
  drawBetaBadge(ctx, betaX, betaY, betaSize);

  // atom美 로고
  drawAtomyLogo(ctx, size * 0.5, size * 0.82, size);

  // 파일 저장
  const buffer = canvas.toBuffer("image/png");
  const outputPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ 생성됨: ${filename} (${size}x${size}, adaptive)`);
}

/**
 * 스플래시 아이콘 (심플)
 */
function generateSplashIcon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // 투명 배경
  ctx.clearRect(0, 0, size, size);

  // 문서 아이콘 (하늘색으로)
  const docSize = size * 0.6;
  const docX = size * 0.18;
  const docY = size * 0.1;

  const scale = docSize / 100;
  ctx.save();
  ctx.translate(docX, docY);
  ctx.scale(scale, scale);

  ctx.fillStyle = BACKGROUND_COLOR;

  // 문서 본체
  roundRect(ctx, 10, 5, 60, 80, 6);
  ctx.fill();

  // 문서 내용 라인들
  ctx.fillStyle = ICON_COLOR;
  ctx.globalAlpha = 0.8;
  roundRect(ctx, 18, 25, 44, 6, 2);
  ctx.fill();
  roundRect(ctx, 18, 38, 44, 6, 2);
  ctx.fill();
  roundRect(ctx, 18, 51, 30, 6, 2);
  ctx.fill();
  ctx.globalAlpha = 1;

  ctx.restore();

  // 연필 아이콘
  const pencilSize = size * 0.4;
  const pencilX = size * 0.55;
  const pencilY = size * 0.05;

  ctx.save();
  ctx.translate(pencilX, pencilY);
  ctx.scale(pencilSize / 100, pencilSize / 100);
  ctx.rotate(-Math.PI / 6);

  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.beginPath();
  ctx.moveTo(10, 0);
  ctx.lineTo(10, 50);
  ctx.lineTo(15, 60);
  ctx.lineTo(20, 50);
  ctx.lineTo(20, 0);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#FFB6C1";
  ctx.beginPath();
  ctx.moveTo(10, 0);
  ctx.lineTo(10, -8);
  ctx.lineTo(20, -8);
  ctx.lineTo(20, 0);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#333333";
  ctx.beginPath();
  ctx.moveTo(12, 55);
  ctx.lineTo(15, 62);
  ctx.lineTo(18, 55);
  ctx.closePath();
  ctx.fill();

  ctx.restore();

  // 파일 저장
  const buffer = canvas.toBuffer("image/png");
  const outputPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ 생성됨: ${filename} (${size}x${size}, splash)`);
}

/**
 * 파비콘 생성 (심플한 버전)
 */
function generateFavicon(size, filename) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // 배경
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, size, size);

  // 간단한 문서 아이콘
  ctx.fillStyle = ICON_COLOR;
  roundRect(ctx, size * 0.2, size * 0.15, size * 0.6, size * 0.7, size * 0.08);
  ctx.fill();

  // 라인
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.globalAlpha = 0.6;
  ctx.fillRect(size * 0.28, size * 0.35, size * 0.44, size * 0.08);
  ctx.fillRect(size * 0.28, size * 0.5, size * 0.44, size * 0.08);
  ctx.globalAlpha = 1;

  // 파일 저장
  const buffer = canvas.toBuffer("image/png");
  const outputPath = path.join(OUTPUT_DIR, filename);
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ 생성됨: ${filename} (${size}x${size}, favicon)`);
}

// 메인 실행
console.log("\n🎨 애터미 큐레이팅 앱 아이콘 생성 시작...\n");

// 아이콘 생성
generateIcon(1024, "icon.png");
generateAdaptiveIcon(1024, "adaptive-icon.png");
generateFavicon(48, "favicon.png");
generateSplashIcon(288, "splash-icon.png");

console.log("\n✨ 모든 아이콘 생성 완료!\n");
console.log("📁 출력 경로:", OUTPUT_DIR);
console.log("\n💡 app.json에서 아이콘 경로가 올바른지 확인하세요.");
