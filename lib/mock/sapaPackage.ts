import type { FAQ, Product } from "@/lib/data";
import { buildQuoteUrl } from "@/lib/quote/prefill";

export type SapaDay = {
  day: number;
  title: string;
  location: string;
  description: string;
  stops: string[];
  meals: string;
  accommodation: string;
};

export const sapaPackage = {
  id: "vietnam-sapa-3n5d-private-package",
  slug: "3n5d-sapa-hanoi",
  country: "vietnam",
  city: "sapa",
  productType: "private-package",
  canonicalPath: "/vietnam/sapa/private-package/3n5d-sapa-hanoi",
  title: "하노이·사파 3박 5일 단독 패키지",
  subtitle: "판시팡의 구름 위에서, 하노이의 골목까지",
  summary: "우리 일행만의 전용차량과 한국어 가능한 현지 가이드로 사파를 여행합니다. 판시팡, 깟깟마을, 사랑의 폭포와 전망 카페를 둘러보고, 마지막 날은 하노이 올드쿼터와 마사지로 마무리합니다.",
  price: {
    amountKrw: 690000,
    currency: "KRW",
    unit: "adult_per_person",
    referenceAdults: 4,
    referenceTotalKrw: 2760000,
    note: "성인 4인 출발 기준 1인 기본요금입니다. 항공권·호텔은 불포함이며, 여행일·인원·현지 운영 조건에 따라 최종 견적을 안내드립니다.",
  },
  hero: {
    src: "/images/sapa/sapa-terraces-hero.png",
    alt: "사파 계단식 논과 산악 풍경을 표현한 AI 이미지",
    caption: "사파 여행의 분위기를 표현한 AI 생성 이미지입니다.",
  },
  gallery: [
    { src: "/images/sapa/fansipan-clouds.jpg", alt: "판시팡에서 바라본 산 능선과 운해", caption: "제공받은 현지 촬영 사진 · 판시팡의 운해" },
    { src: "/images/sapa/fansipan-sky.jpg", alt: "판시팡 산 위로 펼쳐진 푸른 하늘과 구름", caption: "제공받은 현지 촬영 사진 · 날씨에 따라 풍경이 달라집니다" },
  ],
  storeUrl: "https://smartstore.naver.com/kevintour/products/13027526993",
  highlights: ["우리 일행만 단독 진행", "한국어 가능한 현지 가이드", "판시팡 열차·케이블카 코스", "하노이 반일투어·마사지"],
  includes: [
    "일정표상 전용차량과 기사, 고속도로 통행료",
    "한국어 가능한 베트남 현지 가이드",
    "일정표에 포함으로 명시된 관광지 입장권",
    "판시팡 므엉화 열차·왕복 케이블카·정상 트램 코스",
    "일정표상 식사와 전망 카페 음료 2회",
    "하노이 구시가지 전동카 체험과 응옥선 사당",
    "하노이 전신마사지 90분 1회와 해당 마사지 팁",
    "차량 내 생수",
  ],
  excludes: [
    "국제선 항공권",
    "사파 호텔 3박 및 호텔 조식(예약 조건에 따라 별도)",
    "여행자보험(포함 계약 시 별도 표기)",
    "일정 외 식음료·주류 및 개인 경비",
    "별도 요청 일정, 차량 연장 및 추가 체험 비용",
    "가이드·기사 팁 등 최종 견적서에 포함으로 명시되지 않은 항목",
  ],
  preparation: [
    "미끄럽지 않은 운동화와 걷기 편한 복장",
    "산악 기온 변화에 대비한 바람막이·겉옷",
    "우산 또는 우비, 모자와 자외선 차단제",
    "개인 상비약, 멀미약과 보조 배터리",
    "여권과 항공편·숙소 예약 정보",
  ],
  notices: [
    "하노이와 사파 사이는 편도 약 5~6시간 이동합니다. 교통·기상 상황에 따라 더 걸릴 수 있으며 중간 휴식은 가이드와 조율합니다.",
    "판시팡은 고도가 높은 코스입니다. 건강 상태와 보행 가능 범위를 미리 알려주시고, 무리한 이동은 피해주세요.",
    "안개·우천·시설 점검 등에 따라 판시팡 및 산악 일정 순서나 방문지가 조정될 수 있습니다. 운해나 맑은 조망은 보장되지 않습니다.",
    "깟깟마을과 전망 코스에는 경사·계단이 있습니다. 부모님·아이 동반 시 걷는 거리와 휴식 시간을 출발 전에 상담해주세요.",
    "기본 일정에 맞춰 진행하며, 변경을 원하시면 상담 후 가능 여부와 추가 비용을 확인합니다. 특정 차량·호텔·식당은 확정 전 보장되지 않습니다.",
    "22시 이후 차량 이용이나 항공편 변경에 따른 연장은 추가 비용이 생길 수 있습니다. 미팅 위치와 최종 일정은 출발 전 안내드립니다.",
  ],
  cancellation: "예약 확정 전 취소·변경 조건을 별도로 안내드립니다. 항공권·호텔을 직접 예약하신 경우 해당 예약처의 규정이 적용되며, 현지 시설 운영 중단 시 대체 일정과 정산 기준을 개별 확인합니다.",
} as const;

export const sapaDays: SapaDay[] = [
  {
    day: 1, title: "하노이 도착, 사파로 향하는 길", location: "노이바이 공항 → 사파",
    description: "낮 도착 항공편 기준으로 공항에서 가이드와 만나 사파로 이동합니다. 긴 이동을 마치면 현지식 저녁과 휴식으로 첫날을 정리합니다.",
    stops: ["노이바이 국제공항 도착·가이드 미팅", "전용차량으로 사파 이동(약 5~6시간, 휴식 조율)", "사파 현지식 석식 후 호텔 이동"],
    meals: "석식: 현지식", accommodation: "사파 1박차 · 호텔 별도 예약",
  },
  {
    day: 2, title: "판시팡과 사파의 전망을 만나는 하루", location: "판시팡 · 사랑의 폭포 · 오꾸이호",
    description: "열차와 케이블카를 연결하는 판시팡 코스를 중심으로 하루를 보냅니다. 산악 날씨를 살피며 전망 카페와 폭포 방문 순서를 조율합니다.",
    stops: ["호텔 조식 후 가이드 미팅", "므엉화 열차·판시팡 케이블카·정상 트램", "현지식 중식과 전망 카페 음료", "사랑의 폭포와 오꾸이호 헤븐 게이트", "현지식 석식·사파 여행자 거리 후 호텔 이동"],
    meals: "중·석식: 현지식 / 조식: 호텔 예약 조건에 따름", accommodation: "사파 2박차 · 호텔 별도 예약",
  },
  {
    day: 3, title: "깟깟마을을 걷고, 사파의 일상을 만나다", location: "깟깟마을 · 함종공원 · 사파 중심가",
    description: "마을길과 계곡 풍경을 천천히 둘러보고 전망 카페에서 쉬어갑니다. 광장·성당·시장을 돌아본 뒤 익숙한 삼겹살 메뉴로 하루를 마무리합니다.",
    stops: ["호텔 조식 후 깟깟마을 트레킹", "현지식 중식과 함종공원·전망 카페 음료", "사파 광장·성당·재래시장", "삼겹살 석식 후 호텔 이동"],
    meals: "중식: 현지식 / 석식: 삼겹살 / 조식: 호텔 예약 조건에 따름", accommodation: "사파 3박차 · 호텔 별도 예약",
  },
  {
    day: 4, title: "하노이 올드쿼터, 여행 끝의 여유", location: "사파 → 하노이 → 노이바이 공항",
    description: "호텔 체크아웃 후 하노이로 돌아옵니다. 구시가지 반일투어와 전신마사지로 이동의 피로를 풀고 귀국 항공편에 맞춰 공항으로 이동합니다.",
    stops: ["사파 호텔 체크아웃·하노이 이동(약 6시간)", "분짜·스프링롤 등 현지식 중식", "호안끼엠 구시가지 전동카·응옥선 사당", "현지 마트 방문(희망 시 상담)·전신마사지 90분", "현지식 석식 후 공항 샌딩"],
    meals: "중·석식: 현지식 / 조식: 호텔 예약 조건에 따름", accommodation: "추가 호텔 숙박 없음 · 심야편 기준 기내박",
  },
  {
    day: 5, title: "귀국, 일상으로 돌아오는 날", location: "하노이 출발 → 한국 도착",
    description: "심야 출발편으로 귀국하는 예시입니다. 실제 출발일·도착일은 선택한 항공편에 따라 확정합니다.",
    stops: ["노이바이 국제공항 출국", "한국 도착·개별 해산"],
    meals: "기내식: 항공권 조건에 따름", accommodation: "현지 호텔 3박 + 귀국 기내박 기준 3박 5일",
  },
];

export const sapaFaqs: FAQ[] = [
  { question: "69만 원은 몇 명 기준인가요?", answer: "성인 4인 출발 시 1인 기본요금 690,000원이며 4인 총액은 2,760,000원입니다. 다른 인원 구성·아동 요금·여행일별 최종 금액은 상담 후 안내드립니다." },
  { question: "항공권과 호텔도 포함인가요?", answer: "기본요금에는 국제선 항공권과 사파 호텔 3박이 포함되지 않습니다. 항공편과 숙소를 직접 선택하실 수 있으며, 숙소 상담이 필요하면 견적 요청에 남겨주세요. 호텔 조식도 예약 조건에 따라 다릅니다." },
  { question: "다른 팀과 함께 여행하나요?", answer: "전용차량과 한국어 가능한 베트남 현지 가이드로 우리 일행만 진행하는 단독 일정입니다. 기본 동선은 유지하되 요청 일정은 상담 후 조정 가능 여부를 확인합니다." },
  { question: "왜 3박 5일인데 호텔은 3박인가요?", answer: "Day 1~3에 사파에서 숙박하고, Day 4 관광 후 공항으로 이동해 심야편으로 귀국하는 구성입니다. 마지막 밤은 기내에서 보내며 Day 5에 한국에 도착하는 예시입니다." },
  { question: "부모님이나 아이와 가도 괜찮을까요?", answer: "장거리 차량 이동과 고지대·계단 구간이 있습니다. 건강 상태와 보행 가능 범위를 미리 알려주시면 이동 중 휴식과 코스 조정 가능 여부를 상담합니다." },
  { question: "판시팡 날씨가 좋지 않으면 어떻게 하나요?", answer: "안개나 강풍, 케이블카 운영 상황을 확인해 방문 순서 또는 대체 코스를 안내합니다. 전망과 시설 이용을 확정 보장하지 않으며 변경 조건은 예약 전에 확인합니다." },
];

export const sapaQuoteUrl = buildQuoteUrl({
  productId: sapaPackage.id,
  product: sapaPackage.title,
  destination: "베트남 사파·하노이",
  service: "단독 패키지",
  sourcePath: sapaPackage.canonicalPath,
});

export const sapaProductCard: Product & { canonicalPath: string } = {
  id: sapaPackage.id, slug: sapaPackage.slug, title: sapaPackage.title,
  region: "베트남 사파·하노이", countrySlugs: ["vietnam"], citySlugs: ["sapa", "hanoi"],
  category: "package", destinationScope: "베트남 사파·하노이", summary: sapaPackage.summary,
  description: sapaPackage.summary, duration: "3박 5일 / 성인 4인 기준 1인", priceFromKrw: sapaPackage.price.amountKrw,
  priceNote: sapaPackage.price.note, recommendedFor: ["가족 단독여행", "부모님 동반", "산악 자연여행"],
  highlights: ["4인 기준 1인 690,000원", "전용차량·한국어 가능한 현지 가이드", "항공권·호텔 불포함"],
  includes: [...sapaPackage.includes], excludes: [...sapaPackage.excludes],
  itinerary: sapaDays.map((day) => `Day ${day.day}: ${day.title}`), notices: [...sapaPackage.notices],
  cancellationPolicy: [sapaPackage.cancellation], faqs: sapaFaqs, relatedProductSlugs: [], canonicalPath: sapaPackage.canonicalPath,
};
