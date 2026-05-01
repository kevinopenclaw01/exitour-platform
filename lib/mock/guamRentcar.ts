import type { Product } from "@/lib/data";

export type GuamRentcarProviderId = "rent-a" | "rent-b";

export type GuamRentcarProvider = {
  id: GuamRentcarProviderId;
  name: string;
  paymentModel: string;
  summary: string;
  bestFor: string[];
  keyPoints: string[];
};

export type GuamProviderARate = {
  id: string;
  vehicleClass: string;
  periodLabel: string;
  salePriceUsd: number;
  onsitePaymentUsd: number;
  reservationDepositUsd: number;
  note?: string;
};

export type GuamProviderBRate = {
  id: string;
  vehicleClass: string;
  modelExample: string;
  dailyUsd: number;
  threePlusUsd?: number;
  weekUsd: number;
  monthUsd: number;
  threeHourUsd: number;
  zdcUsd: number;
  airportPickupUsd: number;
  airportDropUsd: number;
};

export type GuamRentcarFAQ = {
  question: string;
  answer: string;
};

export const guamRentcarExchangeRatePolicy = {
  currency: "USD",
  basis: "현금살 때 환율",
  source: "manual_mock",
  rateKrw: 1400,
  fixedServiceFeeKrw: 10000,
  note: "1차 구현용 mock 환율입니다. 실제 예약 전 현금살 때 환율 기준으로 재확인이 필요합니다.",
};

export const calculateProviderADepositKrw = (reservationDepositUsd: number) =>
  Math.round(reservationDepositUsd * guamRentcarExchangeRatePolicy.rateKrw);

export const calculateProviderBPrepayKrw = (dailyUsd: number) =>
  Math.round(dailyUsd * guamRentcarExchangeRatePolicy.rateKrw + guamRentcarExchangeRatePolicy.fixedServiceFeeKrw);

export const guamRentcarProduct = {
  title: "괌 렌트카｜공항인수·호텔반납·카시트 포함 자유여행 렌터카",
  shortTitle: "괌 렌트카 자유여행",
  region: "괌",
  productType: "self-drive rentcar",
  canonicalPath: "/guam/rentcar/self-drive",
  marketingPath: "/guam-rentcar",
  guidePath: "/guam/rentcar-guide",
  ratingLabel: "실제 후기 추가 예정",
  priceFromKrw: calculateProviderADepositKrw(10),
  summary:
    "괌 자유여행에 필요한 렌터카를 렌트A 예약금+현장결제형과 렌트B 전액 사전결제형으로 비교해 선택할 수 있는 상품입니다.",
  heroDescription:
    "공항 인수, 호텔 반납, 카시트, 아이스쿨러, 보험 조건을 한 화면에서 비교하고 가족 일정에 맞는 괌 렌트카 업체와 차종을 상담합니다.",
  heroBullets: ["렌트A / 렌트B 업체 비교", "공항인수·호텔반납 조건 안내", "카시트와 아이스쿨러 옵션 확인"],
  recommendedFor: [
    "아이 동반 괌 가족여행에서 식사와 쇼핑 동선을 자유롭게 잡고 싶은 고객",
    "공항 도착 직후 차량을 인수하거나 호텔에서 편하게 반납하고 싶은 고객",
    "예약금 결제형과 전액 사전결제형을 비교한 뒤 선택하고 싶은 고객",
    "보험, 디파짓, 운전면허 조건을 출발 전 명확히 확인하고 싶은 고객",
  ],
  includes: ["렌터카 예약 상담", "업체별 인수/반납 조건 안내", "카시트/아이스쿨러 가능 여부 확인", "보험/디파짓 조건 안내"],
  excludes: ["유류비", "주차비", "교통법규 위반 과태료", "현장 추가 옵션", "업체별 보증금 또는 디파짓"],
  applicationFields: [
    "차종",
    "렌트 날짜/시간/장소/항공편명",
    "반납 날짜/시간/장소",
    "성함/영문명",
    "연락처",
    "카시트 필요 여부와 아이 개월수",
    "아이스쿨러 여부",
  ],
  suvUpgradeNotice: [
    "렌트A 준중형 코롤라급은 3일 이상 예약 시 SUV 무료 업그레이드가 가능할 수 있습니다.",
    "특정 차종 보장은 아닙니다. RAV4급 SUV가 많은 편이나 차량 상황에 따라 Corolla Cross 등 동급 SUV로 배정될 수 있습니다.",
    "업그레이드는 현지 차량 상황에 따라 달라질 수 있으므로 확정 전 가능 여부 확인이 필요합니다.",
  ],
  kakaoMessage: [
    "안녕하세요. EXITour 괌 렌트카 문의드립니다.",
    "희망 업체: 렌트A / 렌트B",
    "차종:",
    "렌트 시작일/시간/장소:",
    "반납일/시간/장소:",
    "항공편명:",
    "성함/영문명:",
    "연락처:",
    "카시트 필요 여부:",
    "아이스쿨러 필요 여부:",
    "문의 내용:",
  ].join("\n"),
};

export const guamRentcarProviders: GuamRentcarProvider[] = [
  {
    id: "rent-a",
    name: "렌트A",
    paymentModel: "예약금 + 현장 카드결제",
    summary: "예약금은 원화로 먼저 결제하고, 잔액은 렌트 당일 현장에서 카드로 결제하는 구조입니다.",
    bestFor: ["현장 카드결제를 선호하는 고객", "카시트와 아이스쿨러 포함 조건을 중시하는 가족", "3일 이상 준중형 예약 고객"],
    keyPoints: ["VISA, JCB, MASTER, AMEX, DISCOVER 가능", "디파짓 $200", "기본보험 CDW 적용", "완전면책보험 가입 불가"],
  },
  {
    id: "rent-b",
    name: "렌트B",
    paymentModel: "전액 사전결제",
    summary: "차량 요금과 선택 옵션을 환율 기준 원화로 계산해 사전에 결제하는 구조입니다.",
    bestFor: ["현장 결제 부담을 줄이고 싶은 고객", "풀커버 보험 옵션을 비교하고 싶은 고객", "호텔 인수/반납 무료 조건을 원하는 고객"],
    keyPoints: ["판매가 = daily USD x 현금살 때 환율 + 10,000원", "풀커버 보험 1일 $22부터", "공항 인수 $13", "공항 반납 $10"],
  },
];

export const guamProviderARates: GuamProviderARate[] = [
  { id: "a-corolla-1-2", vehicleClass: "준중형 코롤라급", periodLabel: "1~2일", salePriceUsd: 55, onsitePaymentUsd: 45, reservationDepositUsd: 10 },
  { id: "a-corolla-3-9", vehicleClass: "준중형 코롤라급", periodLabel: "3~9일", salePriceUsd: 50, onsitePaymentUsd: 40, reservationDepositUsd: 10, note: "3일 이상 예약 시 SUV 무료 업그레이드 가능" },
  { id: "a-corolla-10", vehicleClass: "준중형 코롤라급", periodLabel: "10일 이상", salePriceUsd: 45, onsitePaymentUsd: 35, reservationDepositUsd: 10, note: "3일 이상 예약 시 SUV 무료 업그레이드 가능" },
  { id: "a-camry-1", vehicleClass: "캠리 풀사이즈", periodLabel: "1일", salePriceUsd: 71, onsitePaymentUsd: 61, reservationDepositUsd: 10 },
  { id: "a-camry-2", vehicleClass: "캠리 풀사이즈", periodLabel: "2일", salePriceUsd: 142, onsitePaymentUsd: 122, reservationDepositUsd: 20 },
  { id: "a-camry-3", vehicleClass: "캠리 풀사이즈", periodLabel: "3일", salePriceUsd: 198, onsitePaymentUsd: 168, reservationDepositUsd: 30 },
  { id: "a-suv-1", vehicleClass: "SUV", periodLabel: "1일", salePriceUsd: 71, onsitePaymentUsd: 61, reservationDepositUsd: 10 },
  { id: "a-suv-2", vehicleClass: "SUV", periodLabel: "2일", salePriceUsd: 142, onsitePaymentUsd: 122, reservationDepositUsd: 20 },
  { id: "a-suv-3", vehicleClass: "SUV", periodLabel: "3일부터", salePriceUsd: 50, onsitePaymentUsd: 40, reservationDepositUsd: 10, note: "3일부터는 준중형 요금과 동일" },
];

export const guamProviderBRates: GuamProviderBRate[] = [
  { id: "b-compact", vehicleClass: "Compact Sedan", modelExample: "Kia Rio", dailyUsd: 40, threePlusUsd: 38, weekUsd: 266, monthUsd: 1080, threeHourUsd: 10, zdcUsd: 22, airportPickupUsd: 13, airportDropUsd: 10 },
  { id: "b-midsize", vehicleClass: "Midsize Sedan", modelExample: "Mazda3 또는 Hyundai Elantra", dailyUsd: 44, threePlusUsd: 42, weekUsd: 294, monthUsd: 1188, threeHourUsd: 10, zdcUsd: 22, airportPickupUsd: 13, airportDropUsd: 10 },
  { id: "b-compact-suv", vehicleClass: "Compact SUV", modelExample: "Kia Seltos", dailyUsd: 53, weekUsd: 371, monthUsd: 1431, threeHourUsd: 10, zdcUsd: 22, airportPickupUsd: 13, airportDropUsd: 10 },
  { id: "b-minivan", vehicleClass: "Minivan", modelExample: "Kia Carnival", dailyUsd: 85, weekUsd: 595, monthUsd: 2295, threeHourUsd: 10, zdcUsd: 27, airportPickupUsd: 13, airportDropUsd: 10 },
];

export const guamRentcarPickupReturnRules = [
  {
    provider: "렌트A",
    items: [
      "공항 인수는 낮/새벽 모두 가능하며 $10 추가",
      "사무실 인수는 $10 추가, 3일 이상 렌트 시 $10 지원",
      "공항 반납은 추가비용 없음",
      "호텔 반납은 $10 추가",
      "시내 사무실 반납 후 호텔 드랍은 무료",
      "호텔 픽업 가능",
    ],
  },
  {
    provider: "렌트B",
    items: ["공항 인수/픽업 $13", "공항 반납 $10", "호텔 인수 무료", "호텔 반납 무료", "결제는 전액 사전결제 기준"],
  },
];

export const guamRentcarRules = [
  {
    title: "보험/디파짓/면허 조건",
    items: [
      "렌트A는 기본보험 CDW가 적용됩니다.",
      "렌트A는 완전면책보험 가입이 불가합니다.",
      "렌트A 디파짓은 $200입니다.",
      "렌트A는 만 25세 이상, 운전경력 3년 이상 조건입니다.",
      "실물 운전면허증이 필요합니다.",
      "렌트B 풀커버 보험은 1일 $22부터이며 미니밴은 $27입니다.",
    ],
  },
  {
    title: "무료/유료 포함사항",
    items: [
      "렌트A 카시트 2개 무료",
      "렌트A 아이스쿨러 무료",
      "렌트A 운전자 추가 1인 무료",
      "렌트A 카시트 3개부터 유료",
      "렌트A 운전자 추가 2인부터 유료",
      "렌트B 공항 인수/반납과 보험은 선택 조건에 따라 추가됩니다.",
    ],
  },
];

export const guamRentcarFaqs: GuamRentcarFAQ[] = [
  {
    question: "렌트A와 렌트B 중 어떤 업체가 더 좋나요?",
    answer: "현장 카드결제와 무료 제공 조건을 중시하면 렌트A, 전액 사전결제와 풀커버 보험 옵션을 명확히 보고 싶다면 렌트B가 편합니다.",
  },
  {
    question: "렌트A 예약금은 어떻게 계산하나요?",
    answer: "예약금은 판매가에서 현장결제금액을 뺀 금액이며, 1차 화면에서는 mock 현금살 때 환율을 적용해 원화로 보여줍니다.",
  },
  {
    question: "렌트A SUV 무료 업그레이드는 확정인가요?",
    answer: "아닙니다. 준중형 3일 이상 예약 시 가능할 수 있으나 특정 차종 보장은 아니며 현지 차량 상황에 따라 동급 SUV로 배정될 수 있습니다.",
  },
  {
    question: "카시트와 아이스쿨러는 미리 신청해야 하나요?",
    answer: "네. 수량 확인이 필요하므로 예약 신청 시 카시트 필요 여부, 아이 개월수, 아이스쿨러 필요 여부를 함께 알려주세요.",
  },
  {
    question: "실시간 환율이 자동 적용되나요?",
    answer: "아직은 mock 환율 기준입니다. 다음 단계에서 현금살 때 환율 API 또는 관리자 입력 환율과 연결하는 구조를 제안합니다.",
  },
];

export const guamRentcarGuide = {
  title: "괌 렌트카 이용 가이드｜공항인수·호텔반납·카시트·보험 조건 총정리",
  description:
    "괌 자유여행에서 렌트카가 필요한 이유, 공항/호텔 인수 차이, 예약금 결제형과 전액 사전결제형 차이, 보험과 디파짓 조건을 정리한 가이드입니다.",
  sections: [
    { title: "괌 자유여행에서 렌트카가 필요한 이유", body: "괌은 식사, 쇼핑, 해변 이동 동선이 단순하지만 아이 동반 가족은 이동 횟수가 많습니다. 렌트카가 있으면 택시 대기와 쇼핑 짐 이동 부담을 줄일 수 있습니다." },
    { title: "공항 인수와 호텔 인수 차이", body: "공항 인수는 도착 직후 바로 이동할 수 있어 편하지만 업체별 추가요금이 있을 수 있습니다. 호텔 인수는 첫날 이동 부담을 줄이고 다음 날부터 여유 있게 시작하기 좋습니다." },
    { title: "공항 반납과 호텔 반납 차이", body: "공항 반납은 출국 동선이 짧고, 호텔 반납은 마지막 날 차량 이용을 일찍 끝내고 리조트에서 쉬기 좋습니다. 업체별 비용 차이를 확인해야 합니다." },
    { title: "예약금 결제형과 전액 사전결제형 차이", body: "예약금 결제형은 일부만 원화로 결제하고 현장에서 카드로 잔액을 결제합니다. 전액 사전결제형은 환율 기준으로 계산한 원화 금액을 미리 결제하는 방식입니다." },
    { title: "괌 렌트카 보험과 디파짓 이해", body: "기본보험, 풀커버 보험, 디파짓 조건은 업체마다 다릅니다. 특히 완전면책 가능 여부와 보증금 결제 방식을 예약 전 확인해야 합니다." },
    { title: "카시트/아이스쿨러 이용 팁", body: "아이 개월수와 카시트 수량은 예약 시점에 알려주는 것이 좋습니다. 아이스쿨러는 해변이나 쇼핑 일정이 있는 가족에게 유용합니다." },
    { title: "3일 이상 렌트 시 장점", body: "렌트A는 3일 이상 조건에서 일부 인수 비용 지원과 준중형 SUV 업그레이드 가능성이 있어 가족 일정에 유리할 수 있습니다." },
    { title: "SUV 업그레이드 주의사항", body: "무료 업그레이드는 특정 차종 확정이 아닙니다. RAV4급 SUV가 많더라도 차량 상황에 따라 Corolla Cross 등 동급 SUV로 배정될 수 있습니다." },
    { title: "면허증/나이/운전경력 조건", body: "실물 운전면허증, 만 25세 이상, 운전경력 3년 이상 같은 조건을 출발 전 확인해야 합니다. 조건 미충족 시 현장 인수가 제한될 수 있습니다." },
  ],
};

export const guamRentcarProductCard: Product & { canonicalPath: string } = {
  id: "guam-self-drive-rentcar",
  slug: "guam-self-drive-rentcar",
  canonicalPath: guamRentcarProduct.canonicalPath,
  title: "괌 렌트카 자유여행",
  region: guamRentcarProduct.region,
  countrySlugs: ["guam"],
  citySlugs: ["guam"],
  category: "transport",
  destinationScope: "괌",
  summary: "렌트A 예약금+현장결제형과 렌트B 전액 사전결제형을 비교해 선택하는 괌 렌터카 상품입니다.",
  description: guamRentcarProduct.heroDescription,
  duration: "1일 이상",
  priceFromKrw: guamRentcarProduct.priceFromKrw,
  priceNote: "mock 현금살 때 환율 기준 예약금 시작가이며 실제 예약 전 재확인이 필요합니다.",
  recommendedFor: guamRentcarProduct.recommendedFor,
  highlights: ["렌트A/B 업체 비교", "공항인수·호텔반납", "카시트/보험 조건 안내"],
  includes: guamRentcarProduct.includes,
  excludes: guamRentcarProduct.excludes,
  itinerary: guamRentcarProduct.applicationFields,
  notices: guamRentcarProduct.suvUpgradeNotice,
  cancellationPolicy: ["업체별 확정 후 취소 규정이 다를 수 있어 예약 전 별도 안내합니다."],
  faqs: guamRentcarFaqs,
  relatedProductSlugs: ["guam-family-rent-car", "airport-pickup"],
};
