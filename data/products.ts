import type {Category, Product} from "@/types";

// 캐쉬백 설정
export const CASHBACK_CONFIG = {
    pvPerCashback: 300000, // 30만 PV
    cashbackAmount: 60000, // 6만원
} as const;

// 제품 카테고리 데이터
// monthlyUsage: 1인 가구 기준 월간 구매 빈도 (예: 0.33 = 3개월에 1번)
export const categories: Category[] = [
    {
        id: "living",
        name: "리빙/생활용품",
        items: [
            {id: "living_tissue", name: "화장지", price: 42800, pv: 5600, monthlyUsage: 0.33},
            {id: "living_wettissue", name: "물티슈", price: 17800, pv: 3300, monthlyUsage: 0.5},
            {id: "living_facialtissue", name: "미용티슈", price: 6400, pv: 900, monthlyUsage: 0.33},
            {id: "living_kitchentowel", name: "키친타올", price: 5900, pv: 800, monthlyUsage: 0.5},
            {id: "living_dishsoap", name: "주방세제", price: 7800, pv: 2800, monthlyUsage: 0.33},
            {id: "living_liquiddetergent", name: "액상세제", price: 8900, pv: 3100, monthlyUsage: 0.33},
            {id: "living_fabricsoftener", name: "섬유린스", price: 7900, pv: 2400, monthlyUsage: 0.33},
            {id: "living_sanitarypad", name: "생리대", price: 12900, pv: 3400, monthlyUsage: 1},
            {id: "living_sponge", name: "수세미", price: 3800, pv: 900, monthlyUsage: 0.17},
            {id: "living_gloves", name: "고무장갑", price: 4600, pv: 1000, monthlyUsage: 0.25},
            {id: "living_papercup", name: "종이컵", price: 13800, pv: 500, monthlyUsage: 0.17},
            {id: "living_laundry", name: "세탁세제", price: 11000, pv: 2800, monthlyUsage: 0.33},
            {id: "living_multipurpose", name: "다목적세제", price: 9800, pv: 3500, monthlyUsage: 0.25},
            {id: "living_stainremover", name: "얼룩제거", price: 6900, pv: 2500, monthlyUsage: 0.17},
            {id: "living_frypan", name: "프라이팬", price: 158000, pv: 70000, monthlyUsage: 0.04},
            {id: "living_capsuledetergent", name: "캡슐세제", price: 21000, pv: 7500, monthlyUsage: 0.33},
        ],
    },
    {
        id: "cosmetics",
        name: "화장품",
        items: [
            {id: "cosmetics_toner", name: "토너", price: 33000, pv: 16000, monthlyUsage: 0.33},
            {id: "cosmetics_lotion", name: "로션", price: 33000, pv: 16000, monthlyUsage: 0.33},
            {id: "cosmetics_eyecream", name: "아이크림", price: 36300, pv: 18000, monthlyUsage: 0.25},
            {id: "cosmetics_nutritioncream", name: "영양크림", price: 33000, pv: 16000, monthlyUsage: 0.33},
            {id: "cosmetics_serum", name: "세럼", price: 36300, pv: 18000, monthlyUsage: 0.33},
            {id: "cosmetics_ampoule", name: "앰플", price: 39600, pv: 20000, monthlyUsage: 0.25},
            {id: "cosmetics_deepcleanser", name: "딥 클렌저", price: 8800, pv: 3000, monthlyUsage: 0.33},
            {id: "cosmetics_foamcleanser", name: "폼 클렌저", price: 8800, pv: 3000, monthlyUsage: 0.5},
            {id: "cosmetics_exfoliator", name: "각질제거", price: 8800, pv: 3000, monthlyUsage: 0.25},
            {id: "cosmetics_maskpack", name: "마스크팩", price: 8800, pv: 3000, monthlyUsage: 0.5},
            {id: "cosmetics_gelmask", name: "겔 마스크", price: 29800, pv: 9700, monthlyUsage: 0.25},
            {id: "cosmetics_cleansingwater", name: "클렌징 워터", price: 13200, pv: 5300, monthlyUsage: 0.33},
            {id: "cosmetics_bbcream", name: "BB크림", price: 14800, pv: 6000, monthlyUsage: 0.25},
            {id: "cosmetics_mist", name: "미스트", price: 11800, pv: 4200, monthlyUsage: 0.5},
            {id: "cosmetics_sunscreen", name: "선크림", price: 8000, pv: 2500, monthlyUsage: 0.5},
            {id: "cosmetics_skinbooster", name: "스킨부스터", price: 148000, pv: 75000, monthlyUsage: 0.17},
            {id: "cosmetics_mencosmetics", name: "남성 화장품", price: 47800, pv: 23900, monthlyUsage: 0.25},
            {id: "cosmetics_collagencushion", name: "콜라겐 앰플 쿠션", price: 34800, pv: 14000, monthlyUsage: 0.25},
            {id: "cosmetics_lipstick", name: "립스틱", price: 16800, pv: 8000, monthlyUsage: 0.17},
            {id: "cosmetics_mascara", name: "마스카라", price: 11800, pv: 5200, monthlyUsage: 0.33},
        ],
    },
    {
        id: "hairbody",
        name: "헤어&바디",
        items: [
            {id: "hairbody_toothbrush", name: "칫솔", price: 9600, pv: 4800, monthlyUsage: 0.33},
            {id: "hairbody_toothpaste", name: "치약", price: 16800, pv: 3000, monthlyUsage: 0.33},
            {id: "hairbody_sensitivetoothpaste", name: "시린이 치약", price: 10800, pv: 4000, monthlyUsage: 0.33},
            {id: "hairbody_herbalshampoo", name: "한방샴푸", price: 10300, pv: 4000, monthlyUsage: 0.33},
            {id: "hairbody_hairlossshampoo", name: "탈모샴푸", price: 9800, pv: 7000, monthlyUsage: 0.33},
            {id: "hairbody_proteinshampoo", name: "단백질 샴푸", price: 18800, pv: 6600, monthlyUsage: 0.33},
            {id: "hairbody_treatment", name: "헤어 트리트먼트", price: 13800, pv: 6000, monthlyUsage: 0.33},
            {id: "hairbody_hairoil", name: "헤어오일", price: 10800, pv: 4000, monthlyUsage: 0.25},
            {id: "hairbody_curlingessence", name: "컬링에센스", price: 8000, pv: 4000, monthlyUsage: 0.25},
            {id: "hairbody_hairlossspray", name: "탈모방지 스프레이", price: 11300, pv: 4000, monthlyUsage: 0.33},
            {id: "hairbody_bodycleanser", name: "바디클렌저", price: 12500, pv: 4400, monthlyUsage: 0.33},
            {id: "hairbody_bodylotion", name: "바디로션", price: 8500, pv: 2500, monthlyUsage: 0.33},
            {id: "hairbody_femininewash", name: "여성 청결제", price: 5300, pv: 1500, monthlyUsage: 0.5},
            {id: "hairbody_handcream", name: "핸드크림", price: 13800, pv: 5000, monthlyUsage: 0.25},
            {id: "hairbody_soap", name: "비누", price: 12800, pv: 5000, monthlyUsage: 0.33},
            {id: "hairbody_babycream", name: "베이비 크림", price: 12500, pv: 4500, monthlyUsage: 0.33},
            {id: "hairbody_footscrub", name: "풋 스크럽", price: 12800, pv: 5000, monthlyUsage: 0.17},
        ],
    },
    {
        id: "health",
        name: "건강기능식품",
        // monthlyUsage: 애터미 공식 홈페이지 기준 개월치 반영 (1개월분=1, 2개월분=0.5, 3개월분=0.33 등)
        items: [
            {id: "health_immunity", name: "면역력", atomyName: "헤모힘", price: 88000, pv: 44000, monthlyUsage: 1}, // 60포, 1개월분
            {id: "health_noni", name: "노니", price: 47800, pv: 24000, monthlyUsage: 1.8}, // 1000g, 17일분 (1일 1.5회 40g)
            {id: "health_redginseng", name: "홍삼", atomyName: "홍삼단", price: 80000, pv: 40000, monthlyUsage: 0.5}, // 60포, 2개월분
            {id: "health_probiotics", name: "유산균", price: 56800, pv: 21500, monthlyUsage: 0.25}, // 120포, 4개월분
            {id: "health_enzyme", name: "효소", atomyName: "파인자임", price: 16800, pv: 7000, monthlyUsage: 1}, // 30포, 1개월분
            {id: "health_joint", name: "관절건강", atomyName: "터마신", price: 39800, pv: 16000, monthlyUsage: 1}, // 128정, 32일분
            {id: "health_omega", name: "오메가", price: 34800, pv: 14000, monthlyUsage: 0.33}, // 180캡슐, 3개월분
            {id: "health_eye", name: "눈 건강", atomyName: "루아잔틴", price: 38800, pv: 19500, monthlyUsage: 0.33}, // 90캡슐, 3개월분
            {id: "health_vitaminc", name: "비타민C", atomyName: "메가비타민C", price: 29000, pv: 13000, monthlyUsage: 0.33}, // 90포, 3개월분
            {id: "health_liver", name: "간 건강", atomyName: "밀크씨슬", price: 31800, pv: 11500, monthlyUsage: 0.5}, // 120정, 2개월분
            {id: "health_collagen", name: "콜라겐", price: 34800, pv: 17000, monthlyUsage: 2}, // 14병, 14일분
            {id: "health_circulation", name: "혈액순환", atomyName: "징코 앤 낫토", price: 25800, pv: 9500, monthlyUsage: 0.5}, // 60정, 2개월분
            {id: "health_multivitamin", name: "종합영양제", price: 37800, pv: 19000, monthlyUsage: 0.5}, // 120캡슐, 2개월분
            {id: "health_calmadi", name: "칼슘/마그네슘/비타민D", atomyName: "칼마디", price: 22800, pv: 11500, monthlyUsage: 0.5}, // 180정, 2개월분
            {id: "health_prostate", name: "전립선", atomyName: "오-쏘팔메토", price: 34800, pv: 12000, monthlyUsage: 0.33}, // 90캡슐, 3개월분
            {id: "health_psyllium", name: "차전자피", price: 32800, pv: 16500, monthlyUsage: 2}, // 45포, 15일분
            {id: "health_biotin", name: "비오틴", price: 23000, pv: 10000, monthlyUsage: 0.5}, // 60정, 2개월분
            {id: "health_menopause", name: "여성갱년기", atomyName: "소포라퀸", price: 32800, pv: 11000, monthlyUsage: 1}, // 120캡슐, 1개월분
            {id: "health_protein", name: "단백질", price: 46800, pv: 23000, monthlyUsage: 2}, // 30포, 15일분
            {id: "health_diet", name: "다이어트 제품", atomyName: "애플페논", price: 27800, pv: 13000, monthlyUsage: 2}, // 28포, 14일분
            {id: "health_bloodsugar", name: "당뇨(혈당관리)", price: 52800, pv: 26000, monthlyUsage: 1}, // 60포, 1개월분
            {id: "health_sleep", name: "수면 개선", price: 39800, pv: 16000, monthlyUsage: 1}, // 60정, 1개월분
            {id: "health_puertea", name: "보이차", price: 25000, pv: 10000, monthlyUsage: 1}, // 30포, 1개월분
            {id: "health_spirulina", name: "스피루리나", price: 19800, pv: 7000, monthlyUsage: 0.75}, // 120캡슐, 40일분
            {id: "health_vitaminb", name: "비타민B", price: 26000, pv: 12000, monthlyUsage: 0.33}, // 90캡슐, 3개월분
            {id: "health_stomach", name: "위 건강", price: 34800, pv: 17000, monthlyUsage: 1}, // 30포, 1개월분
            {id: "health_iron", name: "철분", price: 24000, pv: 9500, monthlyUsage: 0.5}, // 60포, 2개월분
            {id: "health_respiratory", name: "기관지", price: 19800, pv: 6500, monthlyUsage: 0.33}, // 30ml*3병, 3개월분
            {id: "health_folicacid", name: "엽산", price: 14800, pv: 6000, monthlyUsage: 0.5}, // 60정, 2개월분
        ],
    },
    {
        id: "food",
        name: "식품",
        items: [
            {id: "food_mackerel", name: "간고등어", price: 39800, pv: 3200, monthlyUsage: 0.25},
            {id: "food_soysauce", name: "간장", price: 9500, pv: 1500, monthlyUsage: 0.17},
            {id: "food_mixcoffee", name: "믹스커피", price: 33800, pv: 4000, monthlyUsage: 0.5},
            {id: "food_blackcoffee", name: "블랙커피", price: 13800, pv: 3400, monthlyUsage: 0.5},
            {id: "food_zerosugarcoffee", name: "제로슈가커피", price: 32800, pv: 3300, monthlyUsage: 0.5},
            {id: "food_water", name: "생수", price: 12800, pv: 3000, monthlyUsage: 1},
            {id: "food_nuts", name: "견과류", price: 34500, pv: 3500, monthlyUsage: 0.5},
            {id: "food_seaweed", name: "미역", price: 6900, pv: 1100, monthlyUsage: 0.17},
            {id: "food_avocadooil", name: "아보카도 오일", price: 16800, pv: 4000, monthlyUsage: 0.25},
            {id: "food_seaweedlaver", name: "곱창김", price: 13800, pv: 1400, monthlyUsage: 0.5},
            {id: "food_cupramen", name: "컵라면", price: 15800, pv: 2600, monthlyUsage: 0.5},
            {id: "food_dashipack", name: "다시팩", price: 13800, pv: 1500, monthlyUsage: 0.25},
            {id: "food_instantfood", name: "간편식품", price: 8400, pv: 900, monthlyUsage: 0.5},
            {id: "food_curry", name: "카레", price: 18000, pv: 1700, monthlyUsage: 0.33},
            {id: "food_potatoramen", name: "감자라면", price: 34400, pv: 4500, monthlyUsage: 0.5},
            {id: "food_ham", name: "햄", price: 11800, pv: 1800, monthlyUsage: 0.5},
            {id: "food_gochujang", name: "고추장", price: 11900, pv: 1700, monthlyUsage: 0.17},
            {id: "food_anchovy", name: "멸치", price: 9700, pv: 1200, monthlyUsage: 0.25},
            {id: "food_dumpling", name: "만두", price: 27800, pv: 1200, monthlyUsage: 0.5},
            {id: "food_kelp", name: "다시마", price: 6900, pv: 600, monthlyUsage: 0.17},
            {id: "food_organicsugar", name: "유기농 원당", price: 12800, pv: 2500, monthlyUsage: 0.25},
            {id: "food_bamboosalt", name: "소금", price: 58000, pv: 20000, monthlyUsage: 0.08},
            {id: "food_greentea", name: "녹차", price: 13600, pv: 1500, monthlyUsage: 0.25},
            {id: "food_porkcultet", name: "돈까스", price: 35800, pv: 1700, monthlyUsage: 0.33},
            {id: "food_kimchi", name: "김치", price: 38500, pv: 12000, monthlyUsage: 0.5},
            {id: "food_soymilk", name: "두유", price: 14800, pv: 1500, monthlyUsage: 1},
            {id: "food_sweetbeanjelly", name: "양갱", price: 13700, pv: 3600, monthlyUsage: 0.33},
        ],
    },
    {
        id: "pet",
        name: "반려동물",
        items: [
            {id: "pet_dogfood", name: "강아지 사료", atomyName: "헤이독", price: 19800, pv: 5000, monthlyUsage: 0.5},
        ],
    },
];

// 제품 ID로 제품 찾기
export function findProductById(productId: string): Product | undefined {
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
