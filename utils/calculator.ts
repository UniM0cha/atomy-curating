import type { Product, CashbackResult } from "@/types";
import { CASHBACK_CONFIG, findProductById, categories } from "@/data/products";

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

// 월간 구매금액 계산 (1인 기준)
export function calculateMonthlyPrice(products: Product[]): number {
  return products.reduce((sum, product) => sum + product.price * product.monthlyUsage, 0);
}

// 월간 PV 계산 (1인 기준)
export function calculateMonthlyPV(products: Product[]): number {
  return products.reduce((sum, product) => sum + product.pv * product.monthlyUsage, 0);
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

// 선택된 제품 ID 목록으로 전체 계산 (1인 기준)
export function calculateResult(selectedProductIds: string[]): CashbackResult {
  // 제품 ID로 제품 객체 조회
  const products: Product[] = selectedProductIds
    .map((id) => findProductById(id))
    .filter((product): product is Product => product !== undefined);

  // 월간 계산
  const monthlyPrice = calculateMonthlyPrice(products);
  const monthlyPV = calculateMonthlyPV(products);

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
