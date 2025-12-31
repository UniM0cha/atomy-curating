import type { Product, CashbackResult } from '../types';
import { CASHBACK_CONFIG, findProductById, categories } from '../data/products';

// 카테고리별 선택 개수 계산
export interface CategoryCount {
  id: string;
  name: string;
  count: number;
}

export function getCategoryCounts(selectedProductIds: string[]): CategoryCount[] {
  return categories
    .map((category) => {
      const count = category.items.filter((item) =>
        selectedProductIds.includes(item.id)
      ).length;
      return {
        id: category.id,
        name: category.name,
        count,
      };
    })
    .filter((cat) => cat.count > 0);
}

// 연간 구매금액 계산
export function calculateAnnualPrice(products: Product[]): number {
  return products.reduce(
    (sum, product) => sum + product.price * product.monthlyUsage * 12,
    0
  );
}

// 연간 PV 계산
export function calculateAnnualPV(products: Product[]): number {
  return products.reduce(
    (sum, product) => sum + product.pv * product.monthlyUsage * 12,
    0
  );
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
export function calculateResult(selectedProductIds: string[]): CashbackResult {
  // 제품 ID로 제품 객체 조회
  const products: Product[] = selectedProductIds
    .map((id) => findProductById(id))
    .filter((product): product is Product => product !== undefined);

  const annualPrice = calculateAnnualPrice(products);
  const annualPV = calculateAnnualPV(products);
  const cashbackCount = calculateCashbackCount(annualPV);
  const totalCashback = calculateTotalCashback(cashbackCount);

  return {
    annualPrice,
    annualPV,
    cashbackCount,
    totalCashback,
  };
}

// 숫자 포맷팅 (천단위 콤마)
export function formatNumber(num: number): string {
  return num.toLocaleString('ko-KR');
}

// 금액 포맷팅 (천단위 콤마 + 원)
export function formatCurrency(amount: number): string {
  return `${formatNumber(amount)}원`;
}
