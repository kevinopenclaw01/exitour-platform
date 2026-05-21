import type { FAQ, Product } from "@/lib/data";
import { altynEmelProducts } from "@/lib/mock/kazakhstanAltynEmel";
import type { QuotePrefillInput } from "@/lib/quote/prefill";

export type KazakhstanProductType = "private-package" | "day-tour" | "join-tour" | "airport-transfer";
export type KazakhstanServiceLevel = "premium" | "join";
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
  quotePrefill?: QuotePrefillInput;
};

export const guidePolicy =
  "한국어 가이드는 일정과 시즌에 따라 가능 여부가 달라질 수 있습니다. 한국어 가이드 배정이 어려운 경우, 영어 가이드와 한국어 통역 조합으로 안내를 도와드립니다.";

export const pricingPolicy =
  "카자흐스탄 프리미엄 패키지는 인원, 일정, 호텔 등급, 가이드 언어, 차량 조건에 따라 요금이 달라집니다. 기본 상담 기준은 4인 이상이며, 6인 이상 단체는 별도 견적이 가능합니다. 정확한 요금은 희망 일정과 인원 확인 후 안내드립니다.";

export const kazakhstanKakaoMessage = [
  "안녕하세요. EXITour 카자흐스탄 여행 문의드립니다.",
  "",
  "희망 상품:",
  "- 3박 5일 프리미엄 패키지",
  "- 4박 6일 프리미엄 패키지",
  "- 맞춤 프라이빗 패키지 DIY",
  "- 조인 그룹투어",
  "- 프라이빗 단품투어",
  "- 공항 픽업/샌딩",
  "- 호텔 예약",
  "",
  "희망 출발일:",
  "여행 기간:",
  "인원:",
  "희망 호텔 등급:",
  "가이드 언어:",
  "식사 요청사항:",
  "희망 여행지:",
  "문의 내용:",
].join("\n");

export const kazakhstanQuotePrefills = {
  threeNightsFiveDays: {
    productId: "kazakhstan-3n5d-premium",
    product: "Kazakhstan Almaty 3 nights 5 days premium private package",
    destination: "Kazakhstan",
    service: "Premium Package",
    sourcePath: "/kazakhstan/almaty/private-package/3n5d-premium",
  },
  fourNightsSixDays: {
    productId: "kazakhstan-4n6d-nature",
    product: "Kazakhstan Almaty 4 nights 6 days premium nature trip",
    destination: "Kazakhstan",
    service: "Premium Package",
    sourcePath: "/kazakhstan/almaty/private-package/4n6d-nature",
  },
  customPrivatePackage: {
    productId: "kazakhstan-custom-private-package",
    product: "Kazakhstan Custom Private Package DIY",
    destination: "Kazakhstan",
    service: "Custom Private Package",
    sourcePath: "/kazakhstan/almaty/private-package/custom",
  },
  privateTourConsulting: {
    productId: "kazakhstan-private-tour-consulting",
    product: "Kazakhstan private tour consultation",
    destination: "Kazakhstan",
    service: "Private Tour",
    sourcePath: "/kazakhstan/private-tour-guide",
  },
  hotelConsulting: {
    productId: "kazakhstan-hotel-consulting",
    product: "Kazakhstan Almaty hotel reservation consultation",
    destination: "Kazakhstan",
    service: "Hotel Reservation",
    sourcePath: "/kazakhstan/almaty-hotel-guide",
  },
  kazakhstanHub: {
    productId: "kazakhstan-premium-consulting",
    product: "Kazakhstan premium private travel consultation",
    destination: "Kazakhstan",
    service: "Premium Travel Consultation",
    sourcePath: "/kazakhstan",
  },
  kazakhstanPremiumHub: {
    productId: "kazakhstan-premium-package-hub",
    product: "Kazakhstan premium package consultation",
    destination: "Kazakhstan",
    service: "Premium Package",
    sourcePath: "/kazakhstan/premium-packages",
  },
} satisfies Record<string, QuotePrefillInput>;

export const productTypes = [
  { id: "private-package", label: "프리미엄 프라이빗 패키지", path: "/kazakhstan/almaty/private-package" },
  { id: "day-tour", label: "프라이빗 당일투어", path: "/kazakhstan/almaty/day-tour" },
  { id: "join-tour", label: "조인 그룹투어", path: "/kazakhstan/almaty/join-tour" },
  { id: "airport-transfer", label: "공항 픽업·샌딩 문의", path: "/kazakhstan/almaty/airport-transfer" },
];

export const serviceLevels = [
  { id: "premium", label: "Premium Private", description: "전용차량, 가이드, 식사 동선을 고객 일정에 맞춰 조합하는 단독 여행" },
  { id: "join", label: "Join Group", description: "현지 운영 일정과 모객 상황에 따라 함께 출발하는 조인형 자연투어" },
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

export const kazakhstanHotelOptions = [
  "스탠다드 / 밸류 클래스",
  "디럭스 / 상위 4성급 클래스",
  "프리미엄 클래스",
  "콜사이 / 사티 지역 숙박",
];

export const hotelPolicy =
  "특정 호텔은 확정 보장이 아니며, 예약 시점의 객실 가능 여부와 시즌에 따라 예정 호텔 또는 동급 호텔로 변경될 수 있습니다. 정확한 호텔은 상담 및 예약 확정 시 안내드립니다.";

export const kazakhstanMealHighlights = [
  "현지식",
  "조지아식",
  "한식 특식",
  "송어구이",
  "예정 또는 동급 식당",
  "상담 후 확정",
];

export const kazakhstanPreparationItems = [
  "장거리 이동에 편한 복장과 신발",
  "얇은 겉옷과 방풍 의류",
  "개인 상비약",
  "보조 배터리",
  "오프라인 지도 또는 여권 사본",
  "현지 날씨에 따른 선글라스와 자외선 차단제",
];

const commonIncludes = ["일정표상 숙박", "전용차량", "현지 가이드", "기사", "일정표상 식사", "관광지 입장료", "데일리 생수", "일정표에 명시된 포함 내역"];
const commonExcludes = [
  "국제선 항공권",
  "개인 경비",
  "개인 매너팁",
  "가이드/기사 경비, 포함 여부에 따라 조정",
  "유료 화장실 이용료",
  "일정 외 추가 식음료",
  "선택 체험 비용",
  "싱글룸 추가비",
  "호텔 업그레이드 비용",
  "여행자보험, 포함 시 별도 표기",
];
const commonNotices = [
  "카자흐스탄 자연 지역은 장거리 이동과 비포장 구간이 포함될 수 있습니다.",
  "외곽 자연 지역은 인터넷이 불안정할 수 있어 가이드 동행을 권장합니다.",
  guidePolicy,
  pricingPolicy,
];

export const kazakhstanProducts: KazakhstanProduct[] = [
  {
    id: "kazakhstan-3n5d-premium",
    slug: "3n5d-premium",
    country: "kazakhstan",
    city: "almaty",
    productType: "private-package",
    serviceLevel: "premium",
    canonicalPath: "/kazakhstan/almaty/private-package/3n5d-premium",
    title: "카자흐스탄 알마티 3박 5일 프리미엄 프라이빗 패키지",
    shortTitle: "알마티 3박 5일 프리미엄 패키지",
    summary:
      "알마티를 거점으로 침블락, 아유사이, 차린캐년, 콜사이호수, 블랙캐년, 이식호수, 투르겐폭포, 알마티 시티투어를 전용차량과 가이드 동행으로 여행하는 카자흐스탄 3박 5일 프리미엄 프라이빗 패키지입니다.",
    duration: "3박 5일",
    priceFromKrw: 0,
    minRecommendedPeople: 4,
    status: "available",
    imagePath: "/images/kazakhstan/premium-private-tour.jpg",
    highlights: ["3박 5일 대표 상품", "전용차량+가이드", "식사 포함", "호텔 선택형"],
    recommendedFor: ["카자흐스탄을 처음 가는 프리미엄 자연 여행 고객", "부모님 동반 가족", "장거리 이동과 현지 소통을 맡기고 싶은 팀"],
    includes: commonIncludes,
    excludes: commonExcludes,
    itinerary: [
      "Day 1: 알마티 국제공항 도착, 가이드 미팅, 호텔 이동 및 휴식",
      "Day 2: 침블락, 초대 대통령 공원, 아유사이 국립공원, 싸이란 파크, 특식/맛집투어",
      "Day 3: 차린 캐년, 콜사이 호수, 블랙캐년, 현지식 또는 특식",
      "Day 4: 이식호수, 투르겐 폭포, 이식박물관 / 황금인간, 한식 또는 특식",
      "Day 5: 알마라산, 알마티 시티투어, 그린바자르, 젠코브성당, 판필로브 공원, 아르바트 거리 등 일정/요일/시간에 따라 조정, 공항 이동",
    ],
    notices: [
      ...commonNotices,
      hotelPolicy,
      "홍범도 장군 기념관, 카자흐 전통복장 체험, 사마르칸 포토존 등은 가능 시 특전으로 상담하며 확정 보장 사항이 아닙니다.",
      "특정 식당, 특정 호텔, 특정 특전은 예정 또는 동급 기준이며 상담 후 확정됩니다.",
    ],
    faqs: kazakhstanFaqs,
    relatedProductIds: ["kazakhstan-4n6d-nature", "kazakhstan-charyn-canyon"],
    quotePrefill: kazakhstanQuotePrefills.threeNightsFiveDays,
  },
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
    relatedProductIds: ["kazakhstan-3n5d-premium", "kazakhstan-charyn-canyon"],
    quotePrefill: kazakhstanQuotePrefills.fourNightsSixDays,
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
    relatedProductIds: ["kazakhstan-3n5d-premium", "kazakhstan-4n6d-nature"],
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
    relatedProductIds: ["kazakhstan-3n5d-premium"],
    quotePrefill: kazakhstanQuotePrefills.customPrivatePackage,
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
    relatedProductIds: ["kazakhstan-3n5d-premium"],
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
    relatedProductIds: ["kazakhstan-3n5d-premium"],
  },
  ...altynEmelProducts,
];

export const privateTourGuide = {
  title: "카자흐스탄 프라이빗 가이드 투어 가이드｜렌트카보다 가이드 동행이 적합한 이유",
  description: "카자흐스탄 자연 여행에서 장거리 이동, 비포장 도로, 통신 불안정, 언어 소통 문제 때문에 프라이빗 가이드 투어가 필요한 이유를 정리한 정보 페이지입니다.",
  sections: [
    { title: "장거리 이동", body: "알마티에서 차린캐년, 콜사이호수, 알틴에멜 등 주요 자연 지역은 이동 시간이 길어 차량 컨디션과 중간 휴식 동선이 중요합니다." },
    { title: "비포장 도로", body: "일부 자연 지역은 도로 상태가 일정하지 않을 수 있어 현지 운전 경험이 있는 기사와 가이드 동행을 권장합니다." },
    { title: "인터넷 불안정 지역", body: "외곽 자연 지역은 통신이 불안정할 수 있어 즉석 검색이나 번역 앱에 의존하기 어렵습니다." },
    { title: "언어 소통 문제", body: "관광지, 식당, 이동 중 현지 소통이 필요할 수 있어 영어 가이드 또는 한국어 통역 지원 조합이 안정적입니다." },
    { title: "관광지 시설 제한", body: "유료 화장실, 휴식 공간, 식사 장소 등 시설이 제한적인 구간은 사전 안내와 동선 조율이 필요합니다." },
    { title: "식사와 휴식 동선", body: "현지식, 조지아식, 한식 특식, 송어구이 등 식사 콘텐츠를 일정 흐름 안에 자연스럽게 배치하는 것이 만족도를 높입니다." },
    { title: "부모님 동반 여행 시 주의사항", body: "차량 이동 시간, 기온 변화, 걷는 거리, 화장실 이용 가능 여부를 고려해 무리 없는 일정으로 조정해야 합니다." },
    { title: "단품 당일투어와 2일 이상 패키지 차이", body: "당일투어는 한 명소를 집중 방문하고, 2일 이상 패키지는 숙박과 식사, 장거리 이동 컨디션까지 설계합니다." },
    { title: "가이드 언어 선택 기준", body: guidePolicy },
  ],
};

export const almatyHotelGuide = {
  title: "알마티 호텔 선택 가이드｜스탠다드·디럭스·프리미엄·콜사이/사티 숙박",
  description: "카자흐스탄 프리미엄 패키지 상담 중 호텔 등급을 선택할 수 있도록 알마티와 콜사이·사티 지역 숙박 기준을 정리한 정보 페이지입니다.",
  sections: [
    { title: "알마티 호텔 선택 기준", body: "알마티는 시내 동선, 공항 이동, 식사 접근성, 다음 날 자연 투어 출발 시간을 기준으로 호텔 위치를 잡는 것이 좋습니다." },
    { title: "스탠다드 / 밸류 클래스", body: "예산 균형을 중시하는 고객에게 적합합니다. 객실 컨디션은 상담 시 예정 또는 동급 기준으로 안내합니다." },
    { title: "디럭스 / 상위 4성급 클래스", body: "부모님 동반과 가족 여행에서 가장 많이 검토하는 등급입니다. 위치와 조식, 객실 컨디션을 함께 봅니다." },
    { title: "프리미엄 클래스", body: "호텔 체류 만족도와 객실 컨디션을 중시하는 고객에게 추천합니다. 시즌과 객실 가능 여부에 따라 요금 차이가 큽니다." },
    { title: "트윈룸 수배 주의사항", body: "트윈룸은 호텔과 날짜에 따라 수량이 제한될 수 있어 상담 단계에서 침대 타입을 미리 확인해야 합니다." },
    { title: "알마티 시내 호텔 예시", body: "특정 호텔 확정이 아니라 위치, 등급, 객실 가능 여부에 맞춰 예정 또는 동급 호텔로 안내합니다." },
    { title: "콜사이·사티 지역 숙박 예시", body: "자연 지역 숙박은 도시 호텔과 기준이 다를 수 있습니다. 지역 특성상 시설과 객실 타입은 상담 후 확정합니다." },
    { title: "동급 호텔 변경 가능성", body: hotelPolicy },
  ],
};

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
  category: product.productType === "private-package" ? "package" : "tour",
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
