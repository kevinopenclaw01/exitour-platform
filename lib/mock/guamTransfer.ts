import type { Product } from "@/lib/data";

export type GuamTransferTripType = "roundtrip" | "oneway";

export type GuamTransferPriceOption = {
  id: string;
  tripType: GuamTransferTripType;
  tripLabel: string;
  passengerLabel: string;
  priceUsd?: number;
  reservationDepositKrw: number;
  note?: string;
};

export type GuamTransferFAQ = {
  question: string;
  answer: string;
};

export type GuamVehicleImage = {
  id: string;
  title: string;
  description: string;
  imagePath: string;
  alt: string;
};

export const guamTransferProduct = {
  title: "괌 공항 픽업/드랍 단독차량｜공항↔호텔 편도·왕복 이동 서비스",
  shortTitle: "괌 공항 픽업/드랍 단독차량",
  region: "괌",
  productType: "transfer",
  canonicalPath: "/guam/transfer/airport-pickup-dropoff",
  marketingPath: "/guam-pickup",
  guidePath: "/guam/transfer-guide",
  reservationDepositKrw: 10000,
  priceFromUsd: 25,
  priceFromKrw: 10000,
  heroImagePath: "/images/guam-transfer/sienna.jpg",
  summary:
    "괌 공항과 호텔 사이를 단독차량으로 이동하는 편도·왕복 공항 픽업/드랍 서비스입니다. 전 옵션 예약금 10,000원으로 상담 후 확정합니다.",
  heroDescription:
    "가족 여행, 밤 도착 항공편, 캐리어가 많은 일정에 맞춰 공항→호텔, 호텔→공항, 왕복 이동을 깔끔하게 연결합니다. 대표 차량은 Sienna급 또는 동급 차량 기준으로 안내합니다.",
  heroBullets: ["공항↔호텔 편도·왕복", "전 옵션 예약금 10,000원", "Sienna급 대표 차량 안내"],
  recommendedFor: [
    "괌 도착 첫날 택시 대기 없이 호텔로 이동하고 싶은 가족",
    "귀국일 캐리어와 아이 동선을 줄이고 싶은 고객",
    "공항 픽업과 드랍을 왕복으로 한 번에 상담하고 싶은 고객",
    "카시트 필요 여부와 캐리어 수를 미리 확인해 차량을 배정받고 싶은 고객",
  ],
  meetingSteps: [
    "항공편명, 도착 시간, 탑승 인원, 캐리어 수를 기준으로 미팅 정보를 확인합니다.",
    "괌 공항 도착 후 입국 심사와 수하물 수령을 마칩니다.",
    "예약 확정 시 안내받은 미팅 위치에서 기사 또는 현지 담당자와 만납니다.",
    "항공편 지연 시 도착 상황을 기준으로 현지 미팅 시간을 조정합니다.",
  ],
  hotelTransferGuide: [
    "공항→호텔은 도착 항공편 기준으로 미팅합니다.",
    "호텔→공항은 항공편 출발 시간과 호텔 위치를 기준으로 픽업 시간을 안내합니다.",
    "왕복 예약은 도착일과 귀국일 정보를 함께 확인합니다.",
    "호텔명, 영문 예약자명, 캐리어 수, 카시트 필요 여부를 미리 알려주면 배정이 수월합니다.",
  ],
  vehicleGuide: [
    "대표 이미지는 Sienna 차량 또는 동급 차량 예시입니다.",
    "실제 배정 차량은 현지 차량 상황과 탑승 인원, 캐리어 수에 따라 달라질 수 있습니다.",
    "차량 이미지는 확정 차종 보장이 아니라 이해를 돕기 위한 대표 이미지로 표시합니다.",
  ],
  includes: ["공항/호텔 단독차량 이동", "기사 배정", "항공편 기준 미팅 안내", "예약 확정 후 미팅 정보 안내"],
  excludes: ["예약금 외 현장 결제 요금", "추가 경유지", "대기 시간 초과 비용", "카시트 등 현장 옵션 비용", "기사 매너팁"],
  notices: [
    "7인 편도 요금은 아직 미정이므로 상담 후 안내합니다.",
    "캐리어 수가 많으면 실제 탑승 가능 인원이 줄어들 수 있습니다.",
    "차량 이미지는 대표 이미지 또는 동급 차량 예시이며 특정 차종 확정을 의미하지 않습니다.",
    "항공편 변경, 지연, 결항이 있으면 가능한 빨리 상담 채널로 공유해 주세요.",
  ],
  kakaoMessage: [
    "안녕하세요. EXITour 괌 공항 픽업/드랍 문의드립니다.",
    "이용 구간: 공항→호텔 / 호텔→공항 / 왕복",
    "이용일:",
    "항공편명:",
    "탑승 인원:",
    "호텔명:",
    "캐리어 수:",
    "카시트 필요 여부:",
    "문의 내용:",
  ].join("\n"),
};

export const guamTransferPriceOptions: GuamTransferPriceOption[] = [
  { id: "roundtrip-4", tripType: "roundtrip", tripLabel: "왕복", passengerLabel: "4인까지", priceUsd: 45, reservationDepositKrw: 10000 },
  { id: "roundtrip-5", tripType: "roundtrip", tripLabel: "왕복", passengerLabel: "5인까지", priceUsd: 55, reservationDepositKrw: 10000 },
  { id: "roundtrip-6", tripType: "roundtrip", tripLabel: "왕복", passengerLabel: "6인까지", priceUsd: 65, reservationDepositKrw: 10000 },
  { id: "roundtrip-7", tripType: "roundtrip", tripLabel: "왕복", passengerLabel: "7인까지", priceUsd: 75, reservationDepositKrw: 10000 },
  { id: "oneway-4", tripType: "oneway", tripLabel: "편도", passengerLabel: "4인까지", priceUsd: 25, reservationDepositKrw: 10000 },
  { id: "oneway-5", tripType: "oneway", tripLabel: "편도", passengerLabel: "5인까지", priceUsd: 30, reservationDepositKrw: 10000 },
  { id: "oneway-6", tripType: "oneway", tripLabel: "편도", passengerLabel: "6인까지", priceUsd: 35, reservationDepositKrw: 10000 },
  { id: "oneway-7", tripType: "oneway", tripLabel: "편도", passengerLabel: "7인", reservationDepositKrw: 10000, note: "상담 후 안내" },
];

export const guamTransferFaqs: GuamTransferFAQ[] = [
  {
    question: "예약금은 옵션마다 다른가요?",
    answer: "아니요. 괌 공항 픽업/드랍은 전 옵션 예약금 10,000원 기준으로 안내합니다. 최종 가능 여부와 현장 결제 조건은 상담 후 확정합니다.",
  },
  {
    question: "왕복과 편도를 따로 예약할 수 있나요?",
    answer: "가능합니다. 공항→호텔, 호텔→공항 편도 또는 도착/귀국 왕복으로 상담할 수 있습니다.",
  },
  {
    question: "7인 편도 요금은 왜 문의인가요?",
    answer: "7인 편도는 차량과 캐리어 수에 따라 배정 조건이 달라질 수 있어 상담 후 안내합니다.",
  },
  {
    question: "Sienna 차량이 확정인가요?",
    answer: "대표 이미지는 Sienna급 또는 동급 차량 예시입니다. 실제 차량은 현지 배정 상황에 따라 달라질 수 있습니다.",
  },
  {
    question: "카시트 요청이 가능한가요?",
    answer: "가능 여부 확인이 필요합니다. 아이 나이와 개월수, 필요한 수량을 상담 시 함께 알려주세요.",
  },
];

export const guamTransferGuide = {
  title: "괌 공항 이동 가이드｜픽업·드랍·왕복 예약과 호텔 이동 준비",
  description:
    "괌 공항에서 호텔까지 이동할 때 편도와 왕복 중 어떤 방식이 좋은지, 미팅 방법과 캐리어/카시트 확인 포인트를 정리한 가이드입니다.",
  sections: [
    { title: "괌 공항 픽업이 필요한 경우", body: "밤 도착, 아이 동반, 캐리어가 많은 일정이라면 공항에서 단독차량을 바로 만나는 편이 이동 피로를 줄입니다." },
    { title: "공항→호텔 편도 이용", body: "도착 첫날 호텔 체크인까지 빠르게 이동하고 싶을 때 적합합니다. 항공편명과 도착 시간을 기준으로 미팅 정보를 안내합니다." },
    { title: "호텔→공항 드랍 이용", body: "귀국일에는 캐리어와 쇼핑 짐이 많아질 수 있습니다. 항공편 출발 시간과 호텔 위치를 기준으로 여유 있는 픽업 시간을 잡는 것이 좋습니다." },
    { title: "왕복 예약이 편한 경우", body: "도착일과 귀국일 이동을 한 번에 정리하고 싶다면 왕복 예약이 편합니다. 호텔명과 항공편 정보를 함께 남겨 주세요." },
    { title: "캐리어와 카시트 확인", body: "탑승 인원만큼 캐리어 수가 중요합니다. 카시트가 필요하면 아이 개월수와 수량을 미리 알려야 배정 가능 여부를 확인할 수 있습니다." },
    { title: "차량 이미지 주의사항", body: "Sienna급 대표 이미지는 차량 크기 이해를 돕기 위한 예시입니다. 특정 차종 확정으로 표현하지 않고 현지 배정 상황에 따라 안내합니다." },
  ],
};

export const guamTransferVehicleImages: GuamVehicleImage[] = [
  {
    id: "sienna-roundtrip",
    title: "왕복 대표 차량",
    description: "Sienna급 또는 동급 차량 예시입니다. 왕복 이동 시 탑승 인원과 캐리어 수를 함께 확인합니다.",
    imagePath: "/images/guam-transfer/sienna.jpg",
    alt: "괌 공항 왕복 이동 Sienna급 대표 차량 예시",
  },
  {
    id: "sienna-oneway",
    title: "편도 대표 차량",
    description: "공항→호텔 또는 호텔→공항 편도 이동에 사용하는 대표 이미지입니다. 실제 차종은 확정 전 안내합니다.",
    imagePath: "/images/guam-transfer/sienna.jpg",
    alt: "괌 공항 편도 이동 Sienna급 대표 차량 예시",
  },
];

export const guamTransferProductCard: Product & { canonicalPath: string } = {
  id: "guam-airport-pickup-dropoff",
  slug: "guam-airport-pickup-dropoff",
  canonicalPath: guamTransferProduct.canonicalPath,
  title: "괌 공항 픽업/드랍",
  region: guamTransferProduct.region,
  countrySlugs: ["guam"],
  citySlugs: ["guam"],
  category: "transfer",
  destinationScope: "괌",
  summary: "공항↔호텔 편도·왕복 이동을 단독차량으로 연결하는 괌 공항 픽업/드랍 서비스입니다.",
  description: guamTransferProduct.heroDescription,
  duration: "편도 / 왕복",
  priceFromKrw: guamTransferProduct.priceFromKrw,
  priceNote: "전 옵션 예약금 10,000원이며 현장 요금은 USD 기준으로 상담 후 안내합니다.",
  recommendedFor: guamTransferProduct.recommendedFor,
  highlights: ["공항↔호텔 이동", "편도·왕복 선택", "Sienna급 대표 차량"],
  includes: guamTransferProduct.includes,
  excludes: guamTransferProduct.excludes,
  itinerary: guamTransferProduct.meetingSteps,
  notices: guamTransferProduct.notices,
  cancellationPolicy: ["예약 확정 후 현지 공급처 규정에 따라 취소 수수료가 발생할 수 있습니다."],
  faqs: guamTransferFaqs,
  relatedProductSlugs: ["guam-family-rent-car", "airport-pickup"],
};
