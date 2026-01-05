import type { Product, CashbackResult, SurveyData } from "@/types";
import { CASHBACK_CONFIG, findProductById, categories } from "@/data/products";

// 가족 수에 따른 소비량 배수 (1인 가구 기준)
const FAMILY_MULTIPLIER: Record<string, number> = {
  "1": 1, // 기준
  "2": 1.7, // 2인 (규모의 경제 반영)
  "3": 2.3, // 3인
  "4": 2.8, // 4인
  "5+": 3.5, // 5인 이상
};

// 카테고리별 선택 개수 계산
export interface CategoryCount {
  id: string;
  name: string;
  count: number;
}

export function getCategoryCounts(selectedProductIds: string[]): CategoryCount[] {
  return categories
    .map((category) => {
      const count = category.items.filter((item) => selectedProductIds.includes(item.id)).length;
      return {
        id: category.id,
        name: category.name,
        count,
      };
    })
    .filter((cat) => cat.count > 0);
}

// 가족 수에 따른 배수 가져오기
export function getFamilyMultiplier(familySize: string | null): number {
  if (!familySize) return 1;
  return FAMILY_MULTIPLIER[familySize] ?? 1;
}

// 월간 구매금액 계산 (가족 수 배수 적용)
export function calculateMonthlyPrice(products: Product[], familyMultiplier: number = 1): number {
  return products.reduce((sum, product) => sum + product.price * product.monthlyUsage * familyMultiplier, 0);
}

// 월간 PV 계산 (가족 수 배수 적용)
export function calculateMonthlyPV(products: Product[], familyMultiplier: number = 1): number {
  return products.reduce((sum, product) => sum + product.pv * product.monthlyUsage * familyMultiplier, 0);
}

// 연간 구매금액 계산
export function calculateAnnualPrice(products: Product[]): number {
  return calculateMonthlyPrice(products) * 12;
}

// 연간 PV 계산
export function calculateAnnualPV(products: Product[]): number {
  return calculateMonthlyPV(products) * 12;
}

// 캐쉬백 횟수 계산
export function calculateCashbackCount(annualPV: number): number {
  return Math.floor(annualPV / CASHBACK_CONFIG.pvPerCashback);
}

// 총 캐쉬백 금액 계산
export function calculateTotalCashback(cashbackCount: number): number {
  return cashbackCount * CASHBACK_CONFIG.cashbackAmount;
}

// 선택된 제품 ID 목록으로 전체 계산
export function calculateResult(selectedProductIds: string[], survey?: SurveyData): CashbackResult {
  // 제품 ID로 제품 객체 조회
  const products: Product[] = selectedProductIds
    .map((id) => findProductById(id))
    .filter((product): product is Product => product !== undefined);

  // 가족 수에 따른 배수 적용
  const familyMultiplier = getFamilyMultiplier(survey?.familySize ?? null);

  // 월간 계산 (가족 수 배수 적용)
  const monthlyPrice = calculateMonthlyPrice(products, familyMultiplier);
  const monthlyPV = calculateMonthlyPV(products, familyMultiplier);

  // 연간 계산
  const annualPrice = monthlyPrice * 12;
  const annualPV = monthlyPV * 12;
  const cashbackCount = calculateCashbackCount(annualPV);
  const totalCashback = calculateTotalCashback(cashbackCount);

  return {
    monthlyPrice,
    monthlyPV,
    annualPrice,
    annualPV,
    cashbackCount,
    totalCashback,
  };
}

// 숫자 포맷팅 (천단위 콤마)
export function formatNumber(num: number): string {
  return num.toLocaleString("ko-KR");
}

// 금액 포맷팅 (천단위 콤마 + 원)
export function formatCurrency(amount: number): string {
  return `${formatNumber(amount)}원`;
}
