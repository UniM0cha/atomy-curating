import type { Category } from "../types";

// 캐쉬백 설정
export const CASHBACK_CONFIG = {
  pvPerCashback: 300000, // 30만 PV
  cashbackAmount: 60000, // 6만원
} as const;

// 제품 카테고리 데이터
// 주의: 가격/PV는 더미 데이터이며, 추후 실제 데이터로 교체 필요
export const categories: Category[] = [
  {
    id: "living",
    name: "리빙/생활용품",
    items: [
      { id: "living_tissue", name: "화장지/휴지", price: 15000, pv: 10000, monthlyUsage: 1 },
      { id: "living_wettissue", name: "물티슈", price: 8000, pv: 5000, monthlyUsage: 2 },
      { id: "living_dishsoap", name: "주방세제", price: 12000, pv: 8000, monthlyUsage: 1 },
      { id: "living_laundry", name: "세탁세제", price: 18000, pv: 12000, monthlyUsage: 1 },
      { id: "living_gloves", name: "고무장갑", price: 5000, pv: 3000, monthlyUsage: 1 },
      { id: "living_sponge", name: "수세미", price: 4000, pv: 2500, monthlyUsage: 1 },
    ],
  },
  {
    id: "cosmetics",
    name: "화장품",
    items: [
      { id: "cosmetics_toner", name: "토너", price: 25000, pv: 18000, monthlyUsage: 1 },
      { id: "cosmetics_lotion", name: "로션", price: 28000, pv: 20000, monthlyUsage: 1 },
      { id: "cosmetics_mist", name: "미스트", price: 15000, pv: 10000, monthlyUsage: 1 },
      { id: "cosmetics_essence", name: "에센스", price: 35000, pv: 25000, monthlyUsage: 1 },
      { id: "cosmetics_serum", name: "세럼", price: 40000, pv: 28000, monthlyUsage: 1 },
      { id: "cosmetics_ampoule", name: "앰플", price: 45000, pv: 32000, monthlyUsage: 1 },
      { id: "cosmetics_synergy", name: "시너지 앰플", price: 50000, pv: 35000, monthlyUsage: 1 },
    ],
  },
  {
    id: "hairbody",
    name: "헤어&바디",
    items: [
      { id: "hairbody_toothbrush", name: "칫솔", price: 8000, pv: 5000, monthlyUsage: 1 },
      { id: "hairbody_toothpaste", name: "치약", price: 10000, pv: 7000, monthlyUsage: 1 },
      { id: "hairbody_shampoo", name: "샴푸", price: 20000, pv: 14000, monthlyUsage: 1 },
      { id: "hairbody_conditioner", name: "컨디셔너", price: 18000, pv: 12000, monthlyUsage: 1 },
      { id: "hairbody_treatment", name: "트리트먼트", price: 22000, pv: 15000, monthlyUsage: 1 },
      { id: "hairbody_hairdye", name: "염색약", price: 15000, pv: 10000, monthlyUsage: 0.5 },
      { id: "hairbody_hairoil", name: "헤어 오일", price: 25000, pv: 18000, monthlyUsage: 1 },
    ],
  },
  {
    id: "health",
    name: "건강기능식품",
    items: [
      { id: "health_hemohim", name: "면역력/피로 개선(헤모힘)", price: 120000, pv: 85000, monthlyUsage: 1 },
      { id: "health_redginseng", name: "면역력/피로 개선(홍삼단)", price: 80000, pv: 55000, monthlyUsage: 1 },
      { id: "health_vitaminc", name: "비타민/미네랄(비타민 C)", price: 25000, pv: 18000, monthlyUsage: 1 },
      { id: "health_vitaminb", name: "비타민/미네랄(비타민 B)", price: 22000, pv: 15000, monthlyUsage: 1 },
      { id: "health_milkthistle", name: "간 건강(밀크씨슬)", price: 30000, pv: 22000, monthlyUsage: 1 },
      { id: "health_biotin", name: "에너지 보충(비오틴)", price: 28000, pv: 20000, monthlyUsage: 1 },
    ],
  },
  {
    id: "food",
    name: "식품",
    items: [
      { id: "food_water", name: "생수/음료", price: 15000, pv: 10000, monthlyUsage: 4 },
      { id: "food_coffee", name: "커피(믹스)", price: 18000, pv: 12000, monthlyUsage: 2 },
      { id: "food_seafood", name: "수산물/건어물", price: 35000, pv: 25000, monthlyUsage: 1 },
      { id: "food_ramen", name: "라면/컵라면", price: 12000, pv: 8000, monthlyUsage: 2 },
      { id: "food_rice", name: "즉석밥", price: 20000, pv: 14000, monthlyUsage: 2 },
      { id: "food_retort", name: "레토르트", price: 15000, pv: 10000, monthlyUsage: 2 },
    ],
  },
];

// 제품 ID로 제품 찾기
export function findProductById(productId: string): import("../types").Product | undefined {
  for (const category of categories) {
    const product = category.items.find((item) => item.id === productId);
    if (product) return product;
  }
  return undefined;
}

// 카테고리 ID로 카테고리 찾기
export function findCategoryById(categoryId: string): Category | undefined {
  return categories.find((category) => category.id === categoryId);
}
