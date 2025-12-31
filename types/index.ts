// 제품 타입
export interface Product {
  id: string;
  name: string;
  price: number;
  pv: number;
  monthlyUsage: number;
}

// 카테고리 타입
export interface Category {
  id: string;
  name: string;
  items: Product[];
}

// 설문 응답 타입
export interface SurveyData {
  familySize: string | null;
  ageGroup: string | null;
  atomyExperience: string | null;
}

// 캐쉬백 계산 결과 타입
export interface CashbackResult {
  annualPrice: number;
  annualPV: number;
  cashbackCount: number;
  totalCashback: number;
}

// 스토어 타입
export interface AppState {
  // 설문 데이터
  survey: SurveyData;
  // 선택된 제품 ID 목록
  selectedProductIds: string[];

  // Actions
  setSurvey: <K extends keyof SurveyData>(key: K, value: SurveyData[K]) => void;
  toggleProduct: (productId: string) => void;
  selectAllInCategory: (categoryId: string, productIds: string[]) => void;
  clearAllInCategory: (productIds: string[]) => void;
  reset: () => void;
}
