import type { FAQ } from "@/lib/data";
import type { KazakhstanProduct } from "@/lib/mock/kazakhstanPremium";

export const altynEmelPrivateTourMessage = [
  "안녕하세요. EXITour 알틴에멜 프라이빗 투어 문의드립니다.",
  "",
  "희망 상품:",
  "알틴에멜 국립공원 프라이빗 투어",
  "",
  "희망 이용일:",
  "인원:",
  "가이드 언어:",
  "숙소명:",
  "희망 코스:",
  "문의 내용:",
].join("\n");

export const altynEmelJoinTourMessage = [
  "안녕하세요. EXITour 알틴에멜 조인 투어 문의드립니다.",
  "",
  "희망 상품:",
  "알틴에멜 조인 투어",
  "",
  "희망 이용일:",
  "인원:",
  "가이드 언어:",
  "숙소명:",
  "조인 가능 날짜 확인 요청:",
  "문의 내용:",
].join("\n");

export const altynEmelPrivatePrefill = {
  productId: "kazakhstan-altyn-emel-private-day-tour",
  product: "카자흐스탄 알틴에멜 국립공원 프라이빗 투어",
  destination: "카자흐스탄",
  service: "프라이빗 단품투어",
  sourcePath: "/kazakhstan/almaty/day-tour/altyn-emel-singing-dune-aktau",
};

export const altynEmelJoinPrefill = {
  productId: "kazakhstan-altyn-emel-join-tour",
  product: "카자흐스탄 알틴에멜 조인 투어",
  destination: "카자흐스탄",
  service: "조인 그룹투어",
  sourcePath: "/kazakhstan/almaty/join-tour/altyn-emel-singing-dune-aktau",
};

export const altynEmelJoinGuideNotice =
  "한국어 가이드는 가능 시 선택할 수 있으며, 선택 시 1인당 약 $20 추가됩니다. 일정과 시즌, 현지 배정 상황에 따라 가능 여부가 달라질 수 있습니다.";

export const altynEmelBreakfastNotice =
  "아침 식사는 포함되어 있지 않습니다. 이른 출발 일정이므로 간단한 아침 식사나 간식을 준비해 주세요.";

export const altynEmelScheduleNotice =
  "상기 일정은 예시이며, 날씨, 도로 상황, 국립공원 운영 상황, 현지 사정에 따라 순서와 체류 시간이 조정될 수 있습니다.";

export const altynEmelPrivatePriceNotice =
  "프라이빗 투어 금액은 차량 조건, 인원, 가이드 언어, 포함 내역 확인 후 상담 시 안내됩니다. 현재 화면의 금액은 확정가로 표시하지 않습니다.";

export const altynEmelJoinPriceNotice =
  "조인 투어 가격은 상담 후 안내됩니다. 한국어 가이드 선택 가능 시 1인당 약 $20 추가되며, 출발 가능 여부는 날짜와 모객 상황 확인이 필요합니다.";

export const altynEmelFaqs: FAQ[] = [
  {
    question: "알틴에멜은 당일로 다녀올 수 있나요?",
    answer: "가능하지만 알마티에서 이동 거리가 긴 자연 코스입니다. 출발 시간, 도로 상황, 국립공원 운영 상황을 확인한 뒤 일정표를 조정합니다.",
  },
  {
    question: "노래하는 사구와 악타우 산맥을 모두 볼 수 있나요?",
    answer: "프라이빗 투어는 두 포인트를 중심으로 상담하고, 조인 투어도 악타우 산맥과 노래하는 사구를 핵심 방문지로 안내합니다. 다만 현지 상황에 따라 순서와 체류 시간이 조정될 수 있습니다.",
  },
  {
    question: "한국어 가이드가 확정인가요?",
    answer: "한국어 가이드는 확정 보장이 아닙니다. 일정과 시즌, 현지 배정 상황에 따라 가능 여부를 확인하며, 조인 투어는 가능 시 1인당 약 $20 추가됩니다.",
  },
  {
    question: "프라이빗 투어와 조인 투어 중 무엇을 선택해야 하나요?",
    answer: "가족, 부모님 동반, 단독 일정 선호 고객은 전용차량과 일정 조정 폭이 있는 프라이빗 투어를 추천합니다. 혼자 또는 소수 인원이 합리적인 비용으로 참여하고 싶다면 조인 투어가 맞습니다.",
  },
];

export const altynEmelGuide = {
  title: "알틴에멜 국립공원 여행 가이드｜노래하는 사구·악타우 산맥 알마티 출발 투어",
  description:
    "알틴에멜 국립공원의 노래하는 사구, 악타우 산맥, 알마티 출발 투어 방법, 프라이빗 투어와 조인 투어 차이, 준비물과 주의사항을 안내합니다.",
  sections: [
    {
      title: "알틴에멜 국립공원은 어떤 곳인가",
      body: "알틴에멜 국립공원은 사막, 초원, 컬러 산맥이 함께 펼쳐지는 카자흐스탄 대표 자연 여행지입니다. 알마티에서 장거리 이동이 필요한 코스라 차량과 가이드 동선 관리가 중요합니다.",
    },
    {
      title: "노래하는 사구란 무엇인가",
      body: "노래하는 사구는 바람과 모래가 만들어내는 독특한 풍경으로 알려진 알틴에멜의 대표 포인트입니다. 계절과 날씨에 따라 체감 분위기가 달라집니다.",
    },
    {
      title: "악타우 산맥의 특징",
      body: "악타우 산맥은 붉고 밝은 색의 지층이 이어지는 컬러 산맥입니다. 사진 여행과 자연 지형 감상을 원하는 고객에게 만족도가 높은 구간입니다.",
    },
    {
      title: "알마티에서 이동 시간과 일정 난이도",
      body: "알틴에멜은 알마티 근교 자연투어 중에서도 이동 시간이 긴 편입니다. 이른 출발, 중간 휴식, 식사 동선, 도로 상황 확인이 필요합니다.",
    },
    {
      title: "프라이빗 투어와 조인 투어 차이",
      body: "프라이빗 투어는 전용차량과 가이드 동행으로 진행되어 가족, 부모님 동반, 단독 일정 선호 고객에게 적합합니다. 조인 투어는 다른 여행자와 함께 진행될 수 있어 비용 부담은 낮출 수 있지만 맞춤 일정 조정은 제한됩니다.",
    },
    {
      title: "당일투어와 1박 2일 투어 차이",
      body: "당일투어는 핵심 포인트를 빠르게 다녀오는 방식이고, 1박 2일은 이동 피로를 줄이면서 체류 시간을 더 확보할 수 있습니다.",
    },
    {
      title: "부모님 동반 여행 시 주의사항",
      body: "장거리 차량 이동과 사막 지형을 고려해 무리한 도보를 줄이고, 휴식과 화장실 이용 가능 지점을 미리 확인하는 일정이 필요합니다.",
    },
    {
      title: "차량과 가이드 동행이 필요한 이유",
      body: "국립공원 입장, 포인트별 이동, 도로와 날씨 변수, 현지 소통 때문에 단순 이동이 아니라 가이드 동행 투어로 안내합니다.",
    },
    {
      title: "준비물",
      body: "편한 신발, 선글라스, 모자, 선크림, 개인 생수, 개인 상비약, 바람막이 또는 계절별 외투를 준비하는 것이 좋습니다.",
    },
    {
      title: "계절별 추천 포인트",
      body: "봄과 가을은 이동과 야외 관람이 비교적 편하고, 여름에는 햇빛과 더위 대비가 중요합니다. 겨울 일정은 도로와 운영 상황 확인이 필요합니다.",
    },
  ],
};

const privateIncludes = [
  "전용차량",
  "현지 가이드",
  "기사",
  "국립공원 입장 또는 일정표상 포함된 입장료",
  "중식, 참고 상품 기준 포함 시",
  "일정표에 명시된 포함 내역",
];

const privateExcludes = ["개인 경비", "개인 매너팁", "여행자보험", "일정 외 식음료", "선택 체험 비용", "포함사항에 명시되지 않은 항목"];

const joinIncludes = ["에어컨이 구비된 차량", "생수", "영어 가이드", "국립공원 입장료", "현지 음식 점심 식사", "모래 언덕 방문 후 간식"];

const joinExcludes = ["아침 식사", "개인 경비", "개인 매너팁", "여행자보험", "포함사항에 명시되지 않은 항목"];

const privateItinerary = ["알마티 출발", "알틴에멜 국립공원 이동", "노래하는 사구 관람", "악타우 산맥 관람", "현지 중식 또는 식사/휴식", "알마티 복귀"];

const joinItinerary = [
  "05:30 호텔 픽업",
  "07:30 주유소/마켓 잠시 정차",
  "09:00 바시 마을 / 국립공원 입구 도착",
  "오프로드 이동",
  "10:00 악타우 산맥 도착",
  "12:00 출발",
  "12:30 카투타우 산 도착",
  "13:50-14:30 점심",
  "15:30 노래하는 사구 도착",
  "17:30 시내로 출발",
];

const privateNotices = [
  "정확한 일정 순서와 체류 시간은 날씨, 도로 상황, 국립공원 운영 상황, 현지 사정에 따라 조정될 수 있습니다.",
  "알틴에멜은 장거리 자연투어이므로 편한 신발과 계절별 외투를 준비하는 것이 좋습니다.",
  altynEmelPrivatePriceNotice,
  "특정 차량, 식당, 가이드 배정은 확정 보장 표현이 아니며 예약 가능 여부 확인 후 안내됩니다.",
];

const joinNotices = [
  "조인 투어는 다른 여행자와 함께 진행될 수 있습니다.",
  "출발 가능 여부는 날짜, 모객, 현지 운영 상황에 따라 확인이 필요합니다.",
  "프라이빗 투어처럼 일정, 차량, 식사, 체류 시간을 자유롭게 조정하기 어렵습니다.",
  altynEmelJoinGuideNotice,
  altynEmelBreakfastNotice,
  altynEmelScheduleNotice,
  altynEmelJoinPriceNotice,
];

export const altynEmelProducts: KazakhstanProduct[] = [
  {
    id: "kazakhstan-altyn-emel-private-day-tour",
    slug: "altyn-emel-singing-dune-aktau",
    country: "kazakhstan",
    city: "almaty",
    productType: "day-tour",
    serviceLevel: "premium",
    canonicalPath: "/kazakhstan/almaty/day-tour/altyn-emel-singing-dune-aktau",
    title: "카자흐스탄 알틴에멜 국립공원 프라이빗 투어｜노래하는 사구·악타우 산맥",
    shortTitle: "알틴에멜 국립공원 프라이빗 투어",
    summary:
      "알마티 출발로 알틴에멜 국립공원의 대표 자연 포인트인 노래하는 사구와 악타우 산맥을 전용차량과 가이드 동행으로 여행하는 프라이빗 자연투어입니다.",
    duration: "당일 또는 상담 후 확정",
    priceFromKrw: 0,
    minRecommendedPeople: 2,
    status: "available",
    imagePath: "/images/kazakhstan/altyn-emel-private-tour-hero.png",
    highlights: ["알틴에멜 국립공원", "노래하는 사구", "악타우 산맥", "전용차량+가이드"],
    recommendedFor: ["가족 또는 부모님 동반 여행", "단독 일정과 여유 있는 동선을 원하는 고객", "장거리 자연 코스를 안전하게 보고 싶은 고객"],
    includes: privateIncludes,
    excludes: privateExcludes,
    itinerary: privateItinerary,
    notices: privateNotices,
    faqs: altynEmelFaqs,
    relatedProductIds: ["kazakhstan-altyn-emel-join-tour", "kazakhstan-charyn-canyon"],
    quotePrefill: altynEmelPrivatePrefill,
  },
  {
    id: "kazakhstan-altyn-emel-join-tour",
    slug: "altyn-emel-singing-dune-aktau",
    country: "kazakhstan",
    city: "almaty",
    productType: "join-tour",
    serviceLevel: "join",
    canonicalPath: "/kazakhstan/almaty/join-tour/altyn-emel-singing-dune-aktau",
    title: "카자흐스탄 알틴에멜 조인 투어｜악타우 산맥·노래하는 사구",
    shortTitle: "알틴에멜 조인 투어",
    summary:
      "혼자 또는 소수 인원이 합리적인 비용으로 참여할 수 있는 알마티 출발 알틴에멜 현지 조인형 자연투어입니다.",
    duration: "조인 일정 기준",
    priceFromKrw: 0,
    minRecommendedPeople: 1,
    status: "available",
    imagePath: "/images/kazakhstan/altyn-emel.jpg",
    highlights: ["조인 그룹투어", "악타우 산맥", "노래하는 사구", "중식 포함"],
    recommendedFor: ["혼자 또는 소수 인원 여행", "출발 가능 날짜에 맞출 수 있는 고객", "합리적인 비용으로 핵심 포인트를 보고 싶은 고객"],
    includes: joinIncludes,
    excludes: joinExcludes,
    itinerary: joinItinerary,
    notices: joinNotices,
    faqs: altynEmelFaqs,
    relatedProductIds: ["kazakhstan-altyn-emel-private-day-tour"],
    quotePrefill: altynEmelJoinPrefill,
  },
];

export const getAltynEmelProduct = (productType: "day-tour" | "join-tour") =>
  altynEmelProducts.find((product) => product.productType === productType);

export const altynEmelPreparationItems = ["편한 신발", "선글라스", "모자", "선크림", "개인 생수", "개인 상비약", "바람막이 또는 계절별 외투", "여권 사본 또는 신분 확인용 자료, 필요 시"];

export const altynEmelPrivateSections = {
  placeIntro:
    "도시에서 멀어질수록 카자흐스탄의 풍경은 더 강렬해집니다. 전용차량과 가이드 동행으로 사막, 컬러 산맥, 국립공원의 장거리 자연 코스를 안전하게 경험하세요.",
  recommendation:
    "알틴에멜은 알마티 근교 자연투어 중에서도 이동거리와 현지 동선 관리가 중요한 코스입니다. 단순 차량 이동이 아니라 국립공원 입장, 포인트별 이동, 식사와 휴식 동선, 날씨와 도로 상황까지 고려해야 하므로 가이드 동행 투어로 안내합니다.",
};

export const altynEmelJoinSections = {
  intro:
    "혼자 또는 소수 인원도 참여 가능한 조인형 투어입니다. 다른 여행자와 함께 진행될 수 있으며, 가이드 동행과 중식 포함으로 알틴에멜의 핵심 포인트를 효율적으로 여행합니다.",
  difference:
    "조인 투어는 비용 부담을 줄일 수 있지만 일정, 체류 시간, 차량, 식사 장소는 현지 운영 상황에 따라 정해지며 개별 맞춤 조정은 제한됩니다. 가족, 부모님 동반, 단독 일정 선호 고객은 프라이빗 투어를 추천합니다.",
  guide: altynEmelJoinGuideNotice,
};
