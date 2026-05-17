import type { FAQ, Product } from "@/lib/data";

export type KazakhstanProductType = "private-package" | "day-tour" | "airport-transfer";
export type KazakhstanServiceLevel = "premium";
export type ProductStatus = "available" | "coming-soon" | "inquiry";

export type KazakhstanProduct = {
  id: string;
  slug: string;
  country: "kazakhstan";
  city: "almaty";
  productType: KazakhstanProductType;
  serviceLevel: KazakhstanServiceLevel;
  canonicalPath: string;
  title: string;
  shortTitle: string;
  summary: string;
  duration: string;
  priceFromKrw: number;
  minRecommendedPeople: number;
  status: ProductStatus;
  imagePath: string;
  highlights: string[];
  recommendedFor: string[];
  includes: string[];
  excludes: string[];
  itinerary: string[];
  notices: string[];
  faqs: FAQ[];
  relatedProductIds: string[];
};

export const guidePolicy =
  "한국어 가이드는 일정과 시즌에 따라 가능 여부가 달라질 수 있습니다. 한국어 가이드 배정이 어려운 경우 영어 가이드와 한국어 통역 지원을 조합해 안내드릴 수 있습니다.";

export const pricingPolicy =
  "기본 요금은 4인 기준으로 산정됩니다. 1~3인 이용도 가능하지만, 전용차량·가이드·식사 포함 상품 특성상 인원에 따라 1인당 요금이 달라질 수 있습니다. 정확한 요금은 일정, 인원, 가이드 언어, 이동 거리, 숙박 여부에 따라 상담 후 안내됩니다.";

export const kazakhstanKakaoMessage = [
  "안녕하세요. EXITour 카자흐스탄 프리미엄 여행 문의드립니다.",
  "희망 여행 형태: 프라이빗 당일투어 / 2일 이상 프리미엄 패키지 / 공항 픽업·샌딩",
  "희망 여행지:",
  "희망 출발일:",
  "여행 기간:",
  "인원:",
  "가이드 언어: 영어 가이드 / 한국어 가이드 / 영어 가이드+한국어 통역",
  "숙박 필요 여부:",
  "식사 요청사항:",
  "문의 내용:",
].join("\n");

export const productTypes = [
  { id: "private-package", label: "프리미엄 프라이빗 패키지", path: "/kazakhstan/almaty/private-package" },
  { id: "day-tour", label: "프라이빗 당일투어", path: "/kazakhstan/almaty/day-tour" },
  { id: "airport-transfer", label: "공항 픽업·샌딩 문의", path: "/kazakhstan/almaty/airport-transfer" },
];

export const serviceLevels = [
  { id: "premium", label: "Premium Private", description: "전용차량, 가이드, 식사 동선을 고객 일정에 맞춰 조합하는 단독 여행" },
];

export const premiumPackageCountries = [
  {
    id: "kazakhstan",
    name: "카자흐스탄 프리미엄 자연 여행",
    status: "available",
    href: "/kazakhstan/premium-packages",
    description: "알마티를 거점으로 캐년, 호수, 국립공원을 전용차량과 가이드 동행으로 연결합니다.",
  },
  {
    id: "vietnam",
    name: "베트남 가족 프리미엄 여행",
    status: "coming-soon",
    href: "/quote",
    description: "다낭, 나트랑, 푸꾸옥 가족 휴양형 맞춤 일정은 준비 중입니다.",
  },
  {
    id: "philippines",
    name: "필리핀 리조트 가족 프리미엄 여행",
    status: "coming-soon",
    href: "/quote",
    description: "보홀, 세부, 보라카이 리조트와 해양 액티비티 조합은 준비 중입니다.",
  },
];

export const kazakhstanDestinations = [
  { id: "almaty", name: "Almaty", title: "알마티", imagePath: "/images/kazakhstan/almaty-hero.jpg", description: "카자흐스탄 프리미엄 자연 여행의 거점 도시입니다." },
  { id: "charyn-canyon", name: "Charyn Canyon", title: "차른 캐년", imagePath: "/images/kazakhstan/charyn-canyon.jpg", description: "붉은 협곡과 장거리 자연 드라이브가 인상적인 대표 당일투어 코스입니다." },
  { id: "kolsai-lake", name: "Kolsai Lake", title: "콜사이 호수", imagePath: "/images/kazakhstan/kolsai-lake.jpg", description: "설산과 숲, 호수가 이어지는 2일 이상 프라이빗 패키지 추천 지역입니다." },
  { id: "kaindy-lake", name: "Kaindy Lake", title: "카인디 호수", imagePath: "/images/kazakhstan/kaindy-lake.jpg", description: "침수림 풍경으로 유명해 콜사이와 함께 묶기 좋은 자연 명소입니다." },
  { id: "altyn-emel", name: "Altyn-Emel National Park", title: "알틴에멜 국립공원", imagePath: "/images/kazakhstan/altyn-emel.jpg", description: "사막, 협곡, 초원 감각을 함께 느끼는 장거리 프리미엄 자연 코스입니다." },
  { id: "big-almaty-lake", name: "Big Almaty Lake", title: "빅 알마티 호수", imagePath: "/images/kazakhstan/premium-private-tour.jpg", description: "알마티 근교 설산 호수 풍경을 짧게 경험하기 좋은 지역입니다." },
  { id: "kok-tobe", name: "Kok-Tobe", title: "콕토베", imagePath: "/images/kazakhstan/almaty-hero.jpg", description: "알마티 시내 전망과 가벼운 야경 동선에 어울리는 코스입니다." },
];

export const kazakhstanFaqs: FAQ[] = [
  {
    question: "카자흐스탄은 렌트카 여행으로 가도 괜찮나요?",
    answer: "EXITour는 카자흐스탄을 렌트카 목적지로 권하지 않습니다. 장거리 이동, 비포장 도로, 통신 불안정, 현지 소통 이슈가 있어 가이드 동행 프라이빗 여행을 권장합니다.",
  },
  {
    question: "최소 몇 명부터 추천하나요?",
    answer: "전용차량과 가이드, 식사가 포함되는 구조라 4인 기준을 가장 추천합니다. 1~3인도 가능하지만 1인당 요금이 달라질 수 있습니다.",
  },
  {
    question: "한국어 가이드가 항상 가능한가요?",
    answer: guidePolicy,
  },
  {
    question: "2일 이상 패키지는 언제부터 상담 가능한가요?",
    answer: "2일 이상 일정부터 프리미엄 프라이빗 패키지로 상담 가능합니다. 숙박, 이동 거리, 식사, 가이드 언어를 함께 확인합니다.",
  },
];

const commonIncludes = ["전용차량", "현지 가이드", "일정 내 식사 상담 포함", "주요 자연 명소 동선 설계", "예약 전 이동 거리와 컨디션 안내"];
const commonExcludes = ["국제선 항공권", "개인 경비", "여행자보험", "확정 전 숙박 보장", "선택 액티비티"];
const commonNotices = [
  "카자흐스탄 자연 지역은 장거리 이동과 비포장 구간이 포함될 수 있습니다.",
  "외곽 자연 지역은 인터넷이 불안정할 수 있어 가이드 동행을 권장합니다.",
  guidePolicy,
  pricingPolicy,
];

export const kazakhstanProducts: KazakhstanProduct[] = [
  {
    id: "kazakhstan-4n6d-nature",
    slug: "4n6d-nature",
    country: "kazakhstan",
    city: "almaty",
    productType: "private-package",
    serviceLevel: "premium",
    canonicalPath: "/kazakhstan/almaty/private-package/4n6d-nature",
    title: "카자흐스탄 4박 6일 프리미엄 자연 프라이빗 패키지",
    shortTitle: "4박 6일 자연 프라이빗 패키지",
    summary:
      "알마티를 거점으로 차른 캐년, 콜사이·카인디 호수, 알틴에멜 등 카자흐스탄 대표 자연 코스를 전용차량과 가이드 동행으로 여행하는 프리미엄 프라이빗 패키지입니다.",
    duration: "4박 6일",
    priceFromKrw: 1890000,
    minRecommendedPeople: 4,
    status: "available",
    imagePath: "/images/kazakhstan/premium-private-tour.jpg",
    highlights: ["전용차량 포함", "가이드 동행", "대표 자연 코스", "4인 기준 상담"],
    recommendedFor: ["부모님 동반 가족", "프리미엄 자연 여행", "장거리 이동을 안전하게 관리하고 싶은 팀"],
    includes: commonIncludes,
    excludes: commonExcludes,
    itinerary: ["알마티 도착 및 휴식", "차른 캐년 프라이빗 투어", "콜사이·카인디 호수 자연 코스", "알틴에멜 국립공원 또는 대체 자연 코스", "알마티 시내 휴식과 공항 이동"],
    notices: commonNotices,
    faqs: kazakhstanFaqs,
    relatedProductIds: ["kazakhstan-charyn-canyon"],
  },
  {
    id: "kazakhstan-charyn-canyon",
    slug: "charyn-canyon",
    country: "kazakhstan",
    city: "almaty",
    productType: "day-tour",
    serviceLevel: "premium",
    canonicalPath: "/kazakhstan/almaty/day-tour/charyn-canyon",
    title: "차른 캐년 프리미엄 프라이빗 당일투어",
    shortTitle: "차른 캐년 당일투어",
    summary:
      "알마티에서 출발해 카자흐스탄 대표 캐년인 차른 캐년을 전용차량과 가이드 동행으로 다녀오는 프리미엄 프라이빗 당일투어입니다.",
    duration: "당일",
    priceFromKrw: 290000,
    minRecommendedPeople: 4,
    status: "available",
    imagePath: "/images/kazakhstan/charyn-canyon.jpg",
    highlights: ["알마티 출발", "전용차량", "가이드 동행", "장거리 당일투어"],
    recommendedFor: ["짧은 일정의 자연 여행", "알마티 체류 중 대표 명소 방문", "현지 소통과 이동을 맡기고 싶은 고객"],
    includes: commonIncludes,
    excludes: commonExcludes,
    itinerary: ["알마티 호텔 출발", "차른 캐년 이동", "캐년 산책과 전망 포인트", "현지 식사 또는 휴식", "알마티 복귀"],
    notices: commonNotices,
    faqs: kazakhstanFaqs,
    relatedProductIds: ["kazakhstan-4n6d-nature"],
  },
  {
    id: "kazakhstan-custom-private",
    slug: "custom",
    country: "kazakhstan",
    city: "almaty",
    productType: "private-package",
    serviceLevel: "premium",
    canonicalPath: "/quote",
    title: "Custom Kazakhstan private package",
    shortTitle: "맞춤 프라이빗 패키지",
    summary: "2일 이상 일정, 숙박, 가이드 언어, 이동 거리, 식사 조건을 기준으로 상담하는 카자흐스탄 맞춤 프라이빗 패키지입니다.",
    duration: "2일 이상",
    priceFromKrw: 0,
    minRecommendedPeople: 4,
    status: "inquiry",
    imagePath: "/images/kazakhstan/almaty-hero.jpg",
    highlights: ["상담 문의", "2일 이상", "전용차량·가이드"],
    recommendedFor: ["가족 맞춤 일정", "부모님 동반", "사진 여행"],
    includes: commonIncludes,
    excludes: commonExcludes,
    itinerary: ["상담 후 구성"],
    notices: commonNotices,
    faqs: kazakhstanFaqs,
    relatedProductIds: ["kazakhstan-4n6d-nature"],
  },
  {
    id: "kazakhstan-kolsai-kaindy",
    slug: "kolsai-kaindy",
    country: "kazakhstan",
    city: "almaty",
    productType: "day-tour",
    serviceLevel: "premium",
    canonicalPath: "/quote",
    title: "Kolsai-Kaindy private tour",
    shortTitle: "콜사이·카인디 프라이빗 투어",
    summary: "콜사이와 카인디 호수를 전용차량과 가이드로 연결하는 자연 투어입니다. 상세 페이지는 준비 중입니다.",
    duration: "상담 후 확정",
    priceFromKrw: 0,
    minRecommendedPeople: 4,
    status: "coming-soon",
    imagePath: "/images/kazakhstan/kolsai-lake.jpg",
    highlights: ["상세 준비 중", "호수 자연 코스", "가이드 동행"],
    recommendedFor: ["자연 풍경", "사진 여행"],
    includes: commonIncludes,
    excludes: commonExcludes,
    itinerary: ["상세 준비 중"],
    notices: commonNotices,
    faqs: kazakhstanFaqs,
    relatedProductIds: ["kazakhstan-4n6d-nature"],
  },
  {
    id: "kazakhstan-altyn-emel",
    slug: "altyn-emel",
    country: "kazakhstan",
    city: "almaty",
    productType: "day-tour",
    serviceLevel: "premium",
    canonicalPath: "/quote",
    title: "Altyn-Emel private tour",
    shortTitle: "알틴에멜 프라이빗 투어",
    summary: "알틴에멜 국립공원 중심의 장거리 자연 투어입니다. 상세 페이지는 준비 중입니다.",
    duration: "상담 후 확정",
    priceFromKrw: 0,
    minRecommendedPeople: 4,
    status: "coming-soon",
    imagePath: "/images/kazakhstan/altyn-emel.jpg",
    highlights: ["상세 준비 중", "국립공원", "장거리 자연 코스"],
    recommendedFor: ["사막과 초원", "프리미엄 자연 여행"],
    includes: commonIncludes,
    excludes: commonExcludes,
    itinerary: ["상세 준비 중"],
    notices: commonNotices,
    faqs: kazakhstanFaqs,
    relatedProductIds: ["kazakhstan-4n6d-nature"],
  },
];

export const premiumPackageGuide = {
  title: "프리미엄 패키지 여행 가이드｜단체 패키지와 맞춤 단독여행의 차이",
  description: "프리미엄 패키지가 필요한 상황, 단체 패키지와 다른 점, 목적지별 맞춤 일정 설계 기준을 정리한 가이드입니다.",
  sections: [
    "프리미엄 패키지란 무엇인가",
    "일반 패키지와 다른 점",
    "단독 가이드 여행이 필요한 경우",
    "부모님 동반 여행에서 중요한 요소",
    "차량, 가이드, 식사, 호텔이 여행 만족도에 미치는 영향",
    "카자흐스탄 같은 장거리 자연 여행에서 가이드가 중요한 이유",
    "다낭·보홀 같은 가족 여행지에서 맞춤 일정이 필요한 이유",
    "상담 전 준비하면 좋은 정보",
    "추천 프리미엄 여행지",
  ].map((title) => ({
    title,
    body: `${title}에 맞춰 여행 속도, 동행자 컨디션, 이동 거리, 현지 소통, 식사와 휴식 시간을 함께 조율하는 것이 EXITour 프리미엄 상담의 핵심입니다.`,
  })),
};

export const toProductCard = (product: KazakhstanProduct): Product & { canonicalPath: string } => ({
  id: product.id,
  slug: product.slug,
  canonicalPath: product.canonicalPath,
  title: product.shortTitle,
  region: "카자흐스탄 알마티",
  countrySlugs: ["kazakhstan"],
  citySlugs: ["almaty"],
  category: product.productType === "day-tour" ? "tour" : "package",
  destinationScope: "카자흐스탄",
  summary: product.summary,
  description: product.summary,
  duration: product.duration,
  priceFromKrw: product.priceFromKrw,
  priceNote: pricingPolicy,
  recommendedFor: product.recommendedFor,
  highlights: product.highlights,
  includes: product.includes,
  excludes: product.excludes,
  itinerary: product.itinerary,
  notices: product.notices,
  cancellationPolicy: ["상담 후 공급처 규정과 일정 조건에 따라 안내합니다."],
  faqs: product.faqs,
  relatedProductSlugs: product.relatedProductIds,
});

export const availableKazakhstanProductCards = kazakhstanProducts
  .filter((product) => product.status === "available")
  .map(toProductCard);

export const getKazakhstanProduct = (productType: KazakhstanProductType, slug: string) =>
  kazakhstanProducts.find((product) => product.productType === productType && product.slug === slug);
