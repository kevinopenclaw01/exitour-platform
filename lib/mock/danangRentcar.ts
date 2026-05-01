export type RentcarPriceOption = {
  id: string;
  vehicleType: "7seater" | "16seater" | "limousine" | "29seater";
  label: string;
  duration: string;
  maxPassengers: string;
  priceKrw: number;
  note?: string;
};

export type RentcarExtraOption = {
  id: string;
  category: "guide" | "massage";
  label: string;
  description: string;
};

export type RentcarFAQ = {
  question: string;
  answer: string;
};

export const danangRentcarProduct = {
  title: "다낭 렌트카 단독차량｜기사포함 7인승·16인승·리무진 차량대절",
  shortTitle: "다낭 렌트카 단독차량",
  region: "베트남 다낭",
  productType: "rentcar",
  canonicalPath: "/vietnam/danang/rentcar/private-car",
  marketingPath: "/danang-rentcar",
  guidePath: "/vietnam/danang/rentcar-guide",
  rating: 4.88,
  reviewCount: 615,
  priceFromKrw: 48000,
  summary:
    "다낭 시내, 호이안, 바나힐, 마사지, 맛집, 쇼핑 이동을 기사 포함 단독차량으로 편안하게 연결하는 차량대절 상품입니다.",
  heroDescription:
    "가족여행, 부모님 동반, 아이 동반 일정에 맞춰 7인승·16인승·리무진·29인승 차량을 선택하고 6시간 또는 12시간 기준으로 이용할 수 있습니다.",
  recommendedFor: [
    "부모님과 함께 이동 동선을 줄이고 싶은 가족",
    "아이 동반으로 택시 호출과 대기 시간을 줄이고 싶은 여행자",
    "바나힐, 호이안, 마사지, 맛집을 하루에 효율적으로 묶고 싶은 팀",
    "공항 픽업보다 긴 시간의 단독 차량대절이 필요한 고객",
  ],
  vehicleGuide: [
    {
      title: "7인승",
      body: "성인 2-4명 또는 아이 동반 소가족에게 적합합니다. 캐리어가 많다면 탑승 인원을 여유 있게 잡는 편이 좋습니다.",
    },
    {
      title: "16인승",
      body: "3대 가족, 친구 모임, 골프백이나 짐이 많은 일정에 안정적입니다. 장거리 이동 시 좌석 여유가 장점입니다.",
    },
    {
      title: "리무진",
      body: "좌석 컨디션과 프라이빗한 이동 경험을 중시하는 고객에게 추천합니다. 부모님 동반 또는 기념 여행에 잘 맞습니다.",
    },
    {
      title: "29인승",
      body: "단체 이동용 차량이며 2일 이상 예약 시 상담 가능합니다. 일정표와 탑승 인원을 먼저 확인해야 합니다.",
    },
  ],
  includes: ["기사 포함 단독 차량", "기본 유류비", "다낭 시내 기준 이동", "예약 확정 후 차량/기사 배정 안내"],
  excludes: ["관광지 입장료", "주차비 또는 통행료가 발생하는 특수 구간", "기사 매너팁", "외곽 지역 추가요금", "한국어 가이드 비용"],
  usageSteps: [
    "희망 이용일, 이용 시간, 탑승 인원, 호텔명을 알려주세요.",
    "방문지와 동선을 확인한 뒤 적합한 차량 옵션을 추천합니다.",
    "예약 확정 후 미팅 시간과 기사 정보를 안내합니다.",
    "이용 당일 호텔 로비 또는 지정 장소에서 기사와 미팅합니다.",
  ],
  recommendedCourses: [
    { title: "다낭 시내 6시간", items: ["호텔 출발", "한시장 또는 롯데마트", "마사지", "맛집 또는 카페", "호텔 복귀"] },
    { title: "호이안 야간 6시간", items: ["호텔 출발", "호이안 올드타운", "저녁 식사", "소원배 또는 야시장", "호텔 복귀"] },
    { title: "바나힐 12시간", items: ["호텔 출발", "바나힐 왕복", "시내 마사지", "저녁 식사", "호텔 복귀"] },
    { title: "부모님 동반 12시간", items: ["늦은 오전 출발", "맛집", "카페", "마사지", "호이안 야경", "호텔 복귀"] },
  ],
  cancellationPolicy: [
    "출발 3일 전 한국시간 17:00 이전 취소 시 전액 환불",
    "출발 3일 전 한국시간 17:00 이후부터 출발 1일 전 한국시간 17:00까지 취소 시 50% 환불",
    "출발 1일 전 한국시간 17:01 이후 취소 시 환불 불가",
  ],
  kakaoMessage: [
    "안녕하세요. EXITour 다낭 렌트카 문의드립니다.",
    "상품명: 다낭 렌트카 단독차량",
    "희망 이용일:",
    "이용 시간:",
    "차량 옵션:",
    "탑승 인원:",
    "호텔명:",
    "희망 방문지:",
    "가이드 필요 여부:",
    "마사지 예약 여부:",
    "문의 내용:",
  ].join("\n"),
};

export const danangRentcarProductCard: Product & { canonicalPath: string } = {
  id: "danang-private-car-rentcar",
  slug: "danang-private-car-rentcar",
  canonicalPath: danangRentcarProduct.canonicalPath,
  title: "다낭 렌트카 단독차량",
  region: danangRentcarProduct.region,
  countrySlugs: ["vietnam"],
  citySlugs: ["danang"],
  category: "transport",
  destinationScope: "다낭",
  summary: "기사 포함 7인승·16인승·리무진 차량대절로 다낭, 호이안, 바나힐 이동을 편하게 연결합니다.",
  description: danangRentcarProduct.heroDescription,
  duration: "6시간 / 12시간",
  priceFromKrw: danangRentcarProduct.priceFromKrw,
  priceNote: "차량 옵션과 이용 시간에 따라 요금이 달라집니다.",
  recommendedFor: danangRentcarProduct.recommendedFor,
  highlights: ["기사 포함", "7인승·16인승·리무진", "호이안·바나힐 동선 상담"],
  includes: danangRentcarProduct.includes,
  excludes: danangRentcarProduct.excludes,
  itinerary: danangRentcarProduct.usageSteps,
  notices: ["외곽 지역과 특수 동선은 추가요금이 발생할 수 있습니다.", "29인승은 2일 이상 예약 시 상담 가능합니다."],
  cancellationPolicy: danangRentcarProduct.cancellationPolicy,
  faqs: [],
  relatedProductSlugs: ["danang-airport-pickup", "private-day-tour"],
};

export const danangRentcarPriceOptions: RentcarPriceOption[] = [
  { id: "7seat-6h", vehicleType: "7seater", label: "7인승", duration: "6시간", maxPassengers: "소가족 추천", priceKrw: 48000 },
  { id: "7seat-12h", vehicleType: "7seater", label: "7인승", duration: "12시간", maxPassengers: "소가족 추천", priceKrw: 63900 },
  { id: "16seat-6h", vehicleType: "16seater", label: "16인승", duration: "6시간", maxPassengers: "가족/그룹 추천", priceKrw: 63900 },
  { id: "16seat-12h", vehicleType: "16seater", label: "16인승", duration: "12시간", maxPassengers: "가족/그룹 추천", priceKrw: 78300 },
  { id: "limousine-9-6h", vehicleType: "limousine", label: "리무진 9인까지", duration: "6시간", maxPassengers: "9인까지", priceKrw: 95000 },
  { id: "limousine-9-12h", vehicleType: "limousine", label: "리무진 9인까지", duration: "12시간", maxPassengers: "9인까지", priceKrw: 126500 },
  { id: "limousine-10-6h", vehicleType: "limousine", label: "리무진 10인까지", duration: "6시간", maxPassengers: "10인까지", priceKrw: 110000 },
  { id: "limousine-10-12h", vehicleType: "limousine", label: "리무진 10인까지", duration: "12시간", maxPassengers: "10인까지", priceKrw: 141500 },
  {
    id: "29seat-12h",
    vehicleType: "29seater",
    label: "29인승",
    duration: "12시간",
    maxPassengers: "단체 이동",
    priceKrw: 150000,
    note: "29인승은 2일 이상 예약 시 가능",
  },
];

export const danangRentcarExtraOptions: RentcarExtraOption[] = [
  { id: "guide-12h-1place", category: "guide", label: "한국어 가이드 12시간 1곳", description: "바나힐 또는 호이안 등 주요 방문지 1곳 집중 안내" },
  { id: "guide-12h-2places", category: "guide", label: "한국어 가이드 12시간 2곳", description: "시내와 근교를 함께 묶는 일정 안내" },
  { id: "guide-12h-myson-hoian", category: "guide", label: "한국어 가이드 12시간 미선+호이안", description: "미선 유적과 호이안 야간 일정을 함께 안내" },
  { id: "massage-local", category: "massage", label: "마사지 현지 마사지샵", description: "가성비 중심 현지 마사지샵 예약 상담" },
  { id: "massage-korean", category: "massage", label: "마사지 한국인 마사지샵", description: "한국어 응대가 편한 마사지샵 예약 상담" },
];

export const danangRentcarFaqs: RentcarFAQ[] = [
  { question: "6시간과 12시간 중 어떤 옵션이 좋나요?", answer: "다낭 시내와 마사지 정도면 6시간, 바나힐이나 호이안 야간 이동을 포함하면 12시간을 추천합니다." },
  { question: "기사님이 한국어를 하나요?", answer: "기본 차량은 현지 기사 기준입니다. 한국어 설명과 일정 안내가 필요하면 한국어 가이드 옵션을 함께 상담해 주세요." },
  { question: "공항 픽업과 렌트카는 무엇이 다른가요?", answer: "공항 픽업은 편도 이동이고, 렌트카 단독차량은 정해진 시간 동안 여러 방문지를 이동하는 차량대절 상품입니다." },
  { question: "바나힐과 호이안을 하루에 같이 갈 수 있나요?", answer: "가능하지만 이동 시간이 길어 12시간 기준으로 여유 있게 구성하는 편이 좋습니다." },
  { question: "차량에 짐을 두고 관광해도 되나요?", answer: "일반적으로 가능하지만 귀중품은 직접 소지하는 것을 권장합니다." },
];

export const danangRentcarGuide = {
  title: "다낭 렌트카 이용 가이드｜가족여행·부모님 동반·바나힐·호이안 차량대절",
  description:
    "다낭에서 렌트카 단독차량이 필요한 상황, 차량 선택 기준, 6시간/12시간 선택법, 부모님·아이 동반 이동 팁을 정리한 가이드입니다.",
  sections: [
    { title: "다낭에서 렌트카가 필요한 경우", body: "택시 호출을 반복하기 어렵거나 부모님, 아이, 짐이 있는 일정이라면 기사 포함 단독차량이 훨씬 편합니다. 바나힐, 호이안, 마사지, 맛집, 쇼핑을 하루에 묶을 때 특히 유용합니다." },
    { title: "7인승, 16인승, 리무진 차량 선택 기준", body: "2-4명 소가족은 7인승, 짐이 많거나 3대 가족은 16인승, 좌석 컨디션과 프라이빗함을 중시하면 리무진을 추천합니다." },
    { title: "6시간과 12시간 선택 기준", body: "다낭 시내 중심 이동은 6시간으로도 충분한 편입니다. 호이안 야간, 바나힐, 외곽 맛집, 마사지까지 묶으면 12시간이 안정적입니다." },
    { title: "부모님 동반 가족여행 추천 동선", body: "늦은 오전 출발, 점심, 카페, 마사지, 호이안 야경처럼 중간 휴식이 있는 동선이 좋습니다. 더운 시간대에는 실내 일정과 차량 대기를 적절히 섞어야 합니다." },
    { title: "아이 동반 여행 시 차량 이용 팁", body: "카시트 필요 여부, 유모차와 캐리어 수량, 낮잠 시간을 미리 알려주면 차량 크기와 일정 순서를 조정하기 쉽습니다." },
    { title: "바나힐 이동 시 주의사항", body: "바나힐은 날씨와 케이블카 대기 시간 영향을 받습니다. 귀가 후 마사지나 식사를 넣는다면 12시간 기준이 더 안정적입니다." },
    { title: "호이안 야간 이동 시 주의사항", body: "호이안은 저녁 시간 인파가 많고 귀가 차량 수요가 몰립니다. 단독차량을 이용하면 가족 단위 이동 피로를 크게 줄일 수 있습니다." },
    { title: "마사지, 맛집, 쇼핑 이동 활용법", body: "마사지 예약 시간, 식당 위치, 쇼핑 시간을 차량 이용 시간 안에 맞춰두면 대기 시간과 추가 이동비를 줄일 수 있습니다." },
    { title: "공항 픽업과 렌트카의 차이", body: "공항 픽업은 공항에서 호텔까지의 편도 이동입니다. 렌트카 단독차량은 6시간 또는 12시간 동안 여러 목적지를 이동하는 차량대절입니다." },
  ],
};
import type { Product } from "@/lib/data";
