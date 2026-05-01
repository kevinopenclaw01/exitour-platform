import type { Product } from "@/lib/data";

export type DanangTransferRoute = "airport-to-danang" | "airport-to-hoian" | "danang-to-airport" | "hoian-to-airport";
export type DanangTransferVehicle = "7seater" | "16seater" | "limousine" | "29seater";

export type TransferOption = {
  id: string;
  route: DanangTransferRoute;
  routeLabel: string;
  vehicle: DanangTransferVehicle;
  vehicleLabel: string;
  maxPassengers: string;
  priceKrw: number;
  note?: string;
};

export type TransferFAQ = {
  question: string;
  answer: string;
};

export const danangTransferProduct = {
  title: "다낭 공항 픽업 샌딩 단독차량",
  fullTitle: "다낭 공항 픽업 샌딩 단독차량｜기사포함 공항↔호텔 이동",
  region: "베트남 다낭",
  productType: "transfer",
  canonicalPath: "/vietnam/danang/transfer/airport-pickup",
  marketingPath: "/danang-pickup",
  guidePath: "/vietnam/danang/transfer-guide",
  rating: 4.86,
  reviewCount: 428,
  priceFromKrw: 25000,
  heroBullets: ["추가금 없이 공항 시작 가능", "공항 픽업 / 드랍 가능", "기사 미팅 안내: 스타카페"],
  summary:
    "다낭 공항에서 다낭 시내, 미케비치, 호이안 호텔까지 기사 포함 단독차량으로 이동하는 공항 픽업·샌딩 상품입니다.",
  heroDescription:
    "공항 도착 후 짐을 찾고 스타카페 미팅 포인트에서 기사와 만나 호텔까지 이동합니다. 항공편 지연 상황을 고려해 안내하며, 공항 픽업과 공항 드랍 모두 가능합니다.",
  recommendedFor: [
    "밤 도착 또는 새벽 도착 항공편으로 다낭에 도착하는 고객",
    "아이, 부모님, 캐리어가 많아 공항 택시 이용이 부담스러운 가족",
    "공항에서 호이안 호텔까지 바로 이동해야 하는 일정",
    "귀국일 호텔에서 공항까지 단독차량 샌딩이 필요한 고객",
  ],
  includes: ["기사 포함 단독 차량", "공항 또는 호텔 미팅", "기본 유류비", "항공편 기준 미팅 안내", "스타카페 미팅 안내"],
  excludes: ["기사 매너팁", "경유지 추가", "외곽 리조트 추가요금", "초과 대기료", "카시트 옵션"],
  usageSteps: [
    "공항 도착 후 입국 심사와 짐 수령을 진행합니다.",
    "안내받은 스타카페 미팅 포인트로 이동합니다.",
    "기사 또는 현지 담당자와 미팅 후 차량에 탑승합니다.",
    "항공편 지연 시 도착 상황을 기준으로 미팅 시간을 조정합니다.",
  ],
  routeGuide: [
    {
      title: "공항 → 다낭",
      body: "다낭 시내, 미케비치, 한강 주변 호텔로 이동하는 기본 픽업 구간입니다. 밤 도착 항공편이라면 사전 예약을 권장합니다.",
    },
    {
      title: "공항 → 호이안",
      body: "호이안 호텔까지 바로 이동하는 구간입니다. 이동 시간이 길어 차량 크기와 수하물 수량을 미리 확인하는 것이 좋습니다.",
    },
    {
      title: "다낭 → 공항",
      body: "다낭 호텔에서 공항까지 이동하는 샌딩 구간입니다. 국제선 출국 시간에 맞춰 여유 있는 출발을 추천합니다.",
    },
    {
      title: "호이안 → 공항",
      body: "호이안에서 다낭 공항으로 이동하는 샌딩 구간입니다. 야간 이동이나 가족 단위 이동에 단독차량이 편합니다.",
    },
  ],
  cancellationPolicy: [
    "이용 2일 전 한국시간 17:00 이전 취소 시 전액 환불",
    "이용 2일 전 한국시간 17:00 이후부터 이용 1일 전 한국시간 17:00까지 취소 시 50% 환불",
    "이용 1일 전 한국시간 17:01 이후 취소 또는 노쇼 시 환불 불가",
  ],
  kakaoMessage: [
    "안녕하세요. EXITour 다낭 공항 픽업 샌딩 문의드립니다.",
    "상품명: 다낭 공항 픽업 샌딩 단독차량",
    "희망 이용일:",
    "픽업/샌딩 구분:",
    "구간: 공항→다낭 / 공항→호이안 / 다낭→공항 / 호이안→공항",
    "항공편명:",
    "도착/출발 시간:",
    "차량 옵션:",
    "탑승 인원:",
    "수하물 개수:",
    "호텔명:",
    "문의 내용:",
  ].join("\n"),
};

export const danangTransferOptions: TransferOption[] = [
  { id: "airport-danang-7", route: "airport-to-danang", routeLabel: "공항 → 다낭", vehicle: "7seater", vehicleLabel: "7인승", maxPassengers: "소가족 추천", priceKrw: 25000 },
  { id: "airport-danang-16", route: "airport-to-danang", routeLabel: "공항 → 다낭", vehicle: "16seater", vehicleLabel: "16인승", maxPassengers: "가족/그룹 추천", priceKrw: 35000 },
  { id: "airport-danang-limo", route: "airport-to-danang", routeLabel: "공항 → 다낭", vehicle: "limousine", vehicleLabel: "리무진", maxPassengers: "프리미엄 이동", priceKrw: 65000 },
  { id: "airport-danang-29", route: "airport-to-danang", routeLabel: "공항 → 다낭", vehicle: "29seater", vehicleLabel: "29인승", maxPassengers: "단체 이동", priceKrw: 95000, note: "단체 일정 상담 필요" },
  { id: "airport-hoian-7", route: "airport-to-hoian", routeLabel: "공항 → 호이안", vehicle: "7seater", vehicleLabel: "7인승", maxPassengers: "소가족 추천", priceKrw: 39000 },
  { id: "airport-hoian-16", route: "airport-to-hoian", routeLabel: "공항 → 호이안", vehicle: "16seater", vehicleLabel: "16인승", maxPassengers: "가족/그룹 추천", priceKrw: 52000 },
  { id: "airport-hoian-limo", route: "airport-to-hoian", routeLabel: "공항 → 호이안", vehicle: "limousine", vehicleLabel: "리무진", maxPassengers: "프리미엄 이동", priceKrw: 85000 },
  { id: "airport-hoian-29", route: "airport-to-hoian", routeLabel: "공항 → 호이안", vehicle: "29seater", vehicleLabel: "29인승", maxPassengers: "단체 이동", priceKrw: 120000, note: "단체 일정 상담 필요" },
  { id: "danang-airport-7", route: "danang-to-airport", routeLabel: "다낭 → 공항", vehicle: "7seater", vehicleLabel: "7인승", maxPassengers: "소가족 추천", priceKrw: 25000 },
  { id: "danang-airport-16", route: "danang-to-airport", routeLabel: "다낭 → 공항", vehicle: "16seater", vehicleLabel: "16인승", maxPassengers: "가족/그룹 추천", priceKrw: 35000 },
  { id: "danang-airport-limo", route: "danang-to-airport", routeLabel: "다낭 → 공항", vehicle: "limousine", vehicleLabel: "리무진", maxPassengers: "프리미엄 이동", priceKrw: 65000 },
  { id: "danang-airport-29", route: "danang-to-airport", routeLabel: "다낭 → 공항", vehicle: "29seater", vehicleLabel: "29인승", maxPassengers: "단체 이동", priceKrw: 95000, note: "단체 일정 상담 필요" },
  { id: "hoian-airport-7", route: "hoian-to-airport", routeLabel: "호이안 → 공항", vehicle: "7seater", vehicleLabel: "7인승", maxPassengers: "소가족 추천", priceKrw: 39000 },
  { id: "hoian-airport-16", route: "hoian-to-airport", routeLabel: "호이안 → 공항", vehicle: "16seater", vehicleLabel: "16인승", maxPassengers: "가족/그룹 추천", priceKrw: 52000 },
  { id: "hoian-airport-limo", route: "hoian-to-airport", routeLabel: "호이안 → 공항", vehicle: "limousine", vehicleLabel: "리무진", maxPassengers: "프리미엄 이동", priceKrw: 85000 },
  { id: "hoian-airport-29", route: "hoian-to-airport", routeLabel: "호이안 → 공항", vehicle: "29seater", vehicleLabel: "29인승", maxPassengers: "단체 이동", priceKrw: 120000, note: "단체 일정 상담 필요" },
];

export const danangTransferFaqs: TransferFAQ[] = [
  {
    question: "스타카페는 어디인가요?",
    answer: "다낭 공항 도착 후 짐을 찾고 안내받은 스타카페 미팅 포인트로 이동하면 기사 또는 현지 담당자와 만나는 방식입니다.",
  },
  {
    question: "항공편이 지연되면 어떻게 되나요?",
    answer: "항공편 정보를 기준으로 도착 상황을 확인합니다. 항공편 변경이나 장시간 지연은 현지 운영 상황에 따라 추가 확인이 필요합니다.",
  },
  {
    question: "공항 픽업과 드랍 모두 가능한가요?",
    answer: "가능합니다. 공항에서 호텔로 이동하는 픽업과 호텔에서 공항으로 이동하는 드랍/샌딩 모두 상담 가능합니다.",
  },
  {
    question: "호이안 호텔도 이용할 수 있나요?",
    answer: "가능합니다. 공항↔호이안 구간은 다낭 시내보다 이동 시간이 길어 별도 구간 요금으로 안내합니다.",
  },
];

export const danangTransferGuide = {
  title: "다낭 공항 픽업 샌딩 가이드｜스타카페 미팅·호이안 이동·가족여행 공항차량",
  description:
    "다낭 공항 픽업과 샌딩이 필요한 경우, 스타카페 미팅 방식, 공항↔호이안 이동, 항공편 지연 대응을 정리한 가이드입니다.",
  sections: [
    { title: "다낭 공항 픽업이 필요한 경우", body: "밤 도착, 아이 동반, 부모님 동반, 수하물이 많은 일정이라면 공항에서 차량을 바로 만나는 편이 안전하고 편합니다." },
    { title: "스타카페 미팅 방식", body: "공항 도착 후 짐을 수령하고 안내받은 스타카페 미팅 포인트로 이동합니다. 기사 또는 현지 담당자가 예약자 정보를 기준으로 미팅합니다." },
    { title: "공항 픽업 / 드랍 차이", body: "공항 픽업은 공항에서 호텔로 이동하는 도착 서비스이고, 드랍 또는 샌딩은 호텔에서 공항으로 이동하는 출국 서비스입니다." },
    { title: "공항에서 호이안 이동", body: "호이안은 다낭 시내보다 이동 시간이 길어 도착 시간, 아이 컨디션, 수하물 수량을 고려해 차량을 선택하는 것이 좋습니다." },
    { title: "항공편 지연 대응", body: "항공편명이 정확해야 기사 배정과 미팅 시간을 조정할 수 있습니다. 항공편 변경은 가능한 빨리 공유하는 편이 좋습니다." },
    { title: "차량 선택 기준", body: "소가족은 7인승, 짐이 많거나 가족 인원이 많으면 16인승, 프리미엄 이동은 리무진, 단체는 29인승을 상담 기준으로 봅니다." },
  ],
};

export const danangTransferProductCard: Product & { canonicalPath: string } = {
  id: "danang-airport-transfer",
  slug: "danang-airport-transfer",
  canonicalPath: danangTransferProduct.canonicalPath,
  title: "다낭 공항 픽업 샌딩",
  region: danangTransferProduct.region,
  countrySlugs: ["vietnam"],
  citySlugs: ["danang"],
  category: "transfer",
  destinationScope: "다낭",
  summary: "추가금 없이 공항 시작 가능한 기사 포함 단독차량 공항 픽업·드랍 상품입니다.",
  description: danangTransferProduct.heroDescription,
  duration: "편도",
  priceFromKrw: danangTransferProduct.priceFromKrw,
  priceNote: "구간과 차량 옵션에 따라 요금이 달라집니다.",
  recommendedFor: danangTransferProduct.recommendedFor,
  highlights: ["공항 픽업/드랍", "스타카페 미팅", "호이안 이동 가능"],
  includes: danangTransferProduct.includes,
  excludes: danangTransferProduct.excludes,
  itinerary: danangTransferProduct.usageSteps,
  notices: ["항공편명과 호텔명을 정확히 알려주세요.", "외곽 리조트는 추가요금이 발생할 수 있습니다."],
  cancellationPolicy: danangTransferProduct.cancellationPolicy,
  faqs: [],
  relatedProductSlugs: ["danang-private-car-rentcar", "danang-airport-pickup"],
};
