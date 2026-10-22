export type TravelCategoryId = "packages" | "activities";
export type TravelCountry = "vietnam" | "philippines" | "kazakhstan" | "guam";

export type TravelCategory = {
  id: TravelCategoryId;
  name: string;
  shortDescription: string;
  description: string;
  guide: string;
  itinerary: string;
  accommodation: string;
  image: string;
  imageAlt: string;
  points: string[];
};

export type TravelDestination = {
  country: TravelCountry;
  countryName: string;
  city: string;
  name: string;
  code?: string;
  packageSummary?: string;
  activitySummary?: string;
  packageIdeas?: string[];
  activityIdeas?: string[];
  consultationNote: string;
};

// New public catalog. Legacy product mocks and approved pricing stay untouched.
export const travelCategories: TravelCategory[] = [
  {
    id: "packages",
    name: "우리끼리 맞춤 패키지",
    shortDescription: "우리 일행만을 위한 가이드, 우리에게 맞춘 일정",
    description: "다른 팀과 섞이지 않고 우리 일행만 전담 가이드와 함께 떠납니다. 보고 싶은 곳과 쉬고 싶은 시간을 이야기해 주세요. 일정과 이동 동선을 상담하며 맞춥니다.",
    guide: "우리 그룹 전담 가이드 동행",
    itinerary: "희망 일정과 동선을 상담 후 구성",
    accommodation: "호텔·항공 불포함, 요청 시 예약 대행 상담",
    image: "/images/home/kazakhstan-nature-editorial.png",
    imageAlt: "설산과 호수가 펼쳐진 자연 여행 풍경",
    points: ["다른 팀 합류 없이", "일정·동선 맞춤", "현지인 또는 한국어 가능 가이드"],
  },
  {
    id: "activities",
    name: "내맘대로 단품 투어",
    shortDescription: "여행은 자유롭게, 필요한 서비스만 하나씩",
    description: "여행 전체를 동행하는 전담 가이드 없이, 내가 짠 여행에 필요한 서비스만 더합니다. 렌터카, 공항 이동, 육상투어, 바나힐 투어 등을 개별로 선택하는 방식입니다.",
    guide: "여행 전체 전담 가이드 없음",
    itinerary: "직접 짠 일정에 필요한 서비스만 선택",
    accommodation: "호텔·항공은 별도로 준비",
    image: "/images/home/exitour-coast-hero-v2.png",
    imageAlt: "푸른 바다와 모래사장이 펼쳐진 휴양 여행 풍경",
    points: ["필요한 것만 선택", "자유일정에 더하기", "서비스별 이용 조건 확인"],
  },
];

export const travelDestinations: TravelDestination[] = [
  {
    country: "vietnam", countryName: "베트남", city: "danang", name: "다낭", code: "DAD",
    packageSummary: "바나힐과 호이안, 해변에서의 휴식까지 우리 일행의 속도로.",
    activitySummary: "바나힐 투어와 차량 이동을 자유일정에 필요한 만큼.",
    packageIdeas: ["바나힐과 호이안을 함께 보는 일정", "부모님과 아이의 휴식 시간을 고려한 동선", "관광과 해변 휴양의 균형"],
    activityIdeas: ["바나힐 투어", "렌터카·차량 서비스", "공항 픽업·샌딩"],
    consultationNote: "숙소 위치와 바나힐·호이안 방문 희망일을 알려주시면 이동 동선을 함께 확인합니다.",
  },
  {
    country: "vietnam", countryName: "베트남", city: "nhatrang", name: "나트랑", code: "CXR",
    packageSummary: "리조트에서 쉬는 시간과 나트랑을 둘러보는 시간을 여유 있게.",
    packageIdeas: ["리조트 휴식과 시내 관광 조합", "가족 구성에 맞춘 이동 시간", "여유 있는 식사와 휴식 동선"],
    consultationNote: "리조트 위치와 자유시간을 얼마나 원하는지 알려주세요. 휴양을 중심으로 일정을 구성합니다.",
  },
  {
    country: "vietnam", countryName: "베트남", city: "sapa", name: "사파",
    packageSummary: "산과 계단식 논, 마을 풍경을 가이드와 천천히 만나는 여행.",
    packageIdeas: ["산악 풍경과 마을 산책", "판시판 방문 희망 여부 상담", "하노이와 사파 간 이동을 고려한 일정"],
    consultationNote: "산길 걷기와 장거리 이동이 괜찮은지 알려주세요. 일행의 체력과 현지 날씨를 고려해 조정합니다.",
  },
  {
    country: "vietnam", countryName: "베트남", city: "phuquoc", name: "푸꾸옥", code: "PQC",
    packageSummary: "섬에서의 휴양과 관광을 우리 가족의 리듬에 맞게.",
    activitySummary: "섬 안 이동과 하루 투어만 골라 휴양 일정에 더하기.",
    packageIdeas: ["리조트 휴식 중심 일정", "섬의 남부·북부 관광 동선 상담", "아이와 함께하는 여유 있는 하루"],
    activityIdeas: ["공항 픽업·샌딩", "섬 관광·일일투어", "차량 이동 서비스"],
    consultationNote: "호텔 위치에 따라 이동 거리가 달라집니다. 숙소와 희망 방문지를 함께 알려주세요.",
  },
  {
    country: "kazakhstan", countryName: "카자흐스탄", city: "almaty", name: "알마티", code: "ALA",
    packageSummary: "설산, 호수, 캐년을 전용차량과 전담 가이드가 함께하는 자연여행.",
    packageIdeas: ["알마티 시내와 설산을 함께 보는 일정", "호수·캐년 중심의 자연 코스", "장거리 이동 사이 충분한 휴식"],
    consultationNote: "장거리·비포장 이동과 날씨를 고려해 방문지를 조합합니다. 차량만 빌리는 여행이 아닌 가이드 동행 일정으로 상담합니다.",
  },
  {
    country: "philippines", countryName: "필리핀", city: "bohol", name: "보홀", code: "TAG",
    packageSummary: "보홀의 육상 관광과 바다에서의 휴식, 우리 팀만의 섬 여행.",
    activitySummary: "육상투어와 공항 이동 등 보홀 여행에 필요한 서비스 선택.",
    packageIdeas: ["육상 관광과 해변 휴식 조합", "가족 구성에 맞춘 방문지 선택", "일행만을 위한 이동·식사 동선"],
    activityIdeas: ["보홀 육상투어", "공항 픽업·샌딩", "차량 이동 서비스"],
    consultationNote: "육상 관광 희망일과 바다에서 쉬고 싶은 날을 알려주세요. 각 서비스의 인원·포함 조건은 별도로 확인합니다.",
  },
  {
    country: "philippines", countryName: "필리핀", city: "boracay", name: "보라카이", code: "MPH",
    packageSummary: "해변의 여유와 섬 관광을 전담 가이드와 편안하게.",
    activitySummary: "공항에서 섬까지의 이동, 원하는 하루 체험만 간편하게.",
    packageIdeas: ["해변 휴양과 섬 관광 균형", "공항·선착장 이동을 고려한 동선", "가족·일행의 취향에 맞춘 체험"],
    activityIdeas: ["공항·선착장 이동", "해양 액티비티", "일일투어"],
    consultationNote: "도착 공항과 항공편, 숙소를 알려주세요. 섬으로 들어가는 이동과 날씨에 따른 체험 가능 여부를 확인합니다.",
  },
  {
    country: "guam", countryName: "괌", city: "guam", name: "괌", code: "GUM",
    activitySummary: "렌터카와 공항 이동으로 직접 계획하는 괌 자유여행.",
    activityIdeas: ["렌터카", "공항 픽업·샌딩"],
    consultationNote: "렌터카는 인수·반납 시간과 탑승 인원, 짐 수량을 알려주세요. 차량·보험·운전자 조건은 상담 시 확인합니다.",
  },
];

const destinationOrder: Record<TravelCategoryId, string[]> = {
  packages: ["danang", "nhatrang", "sapa", "phuquoc", "almaty", "bohol", "boracay"],
  activities: ["danang", "bohol", "boracay", "guam", "phuquoc"],
};

export function getTravelCategory(id: TravelCategoryId) {
  return travelCategories.find((category) => category.id === id)!;
}

export function getTravelDestinations(category: TravelCategoryId) {
  return destinationOrder[category].map((city) => travelDestinations.find((destination) => destination.city === city)!);
}

export function getTravelDestination(category: TravelCategoryId, country: string, city: string) {
  return getTravelDestinations(category).find((destination) => destination.country === country && destination.city === city);
}

export function destinationPath(category: TravelCategoryId, destination: TravelDestination) {
  return `/${category}/${destination.country}/${destination.city}`;
}

export const travelFaqs = [
  { question: "두 여행 방식은 무엇이 다른가요?", answer: "우리끼리 맞춤 패키지는 우리 일행만 전담 가이드와 함께하며 일정과 동선을 상담해 구성합니다. 내맘대로 단품 투어는 여행 전체를 동행하는 전담 가이드 없이 필요한 개별 서비스만 선택합니다." },
  { question: "맞춤 패키지에 호텔과 항공권도 포함되나요?", answer: "호텔과 항공권은 기본 포함 사항이 아닙니다. 직접 예약하셔도 되며, 원하시는 분에 한해 예약 대행 가능 여부와 비용을 별도로 상담합니다." },
  { question: "맞춤 패키지는 한국인 가이드가 동행하나요?", answer: "한국인 가이드 동행을 기본 조건으로 하지 않습니다. 현지인 가이드 또는 한국어가 가능한 가이드가 우리 그룹을 담당하며, 사용 언어와 배정 조건은 지역과 일정에 맞춰 상담 시 안내합니다." },
  { question: "일정과 방문지를 바꿀 수 있나요?", answer: "맞춤 패키지는 희망 방문지와 휴식 시간을 기준으로 일정과 동선을 함께 조정합니다. 이동 거리, 현지 운영 시간, 날씨 등 실제 진행 조건을 확인한 뒤 확정합니다." },
  { question: "단품 투어에는 현장 안내도 없나요?", answer: "여행 전체를 동행하는 전담 가이드는 없습니다. 개별 서비스의 기사, 현장 진행 인력이나 안내 포함 여부는 서비스마다 다르므로 신청 전에 확인해 드립니다." },
  { question: "요금과 상세 일정은 어디서 확인하나요?", answer: "현재 지역별 상세 상품을 새로 준비하고 있습니다. 여행지, 날짜, 인원과 필요한 서비스를 남겨주시면 확인 가능한 일정과 요금을 상담으로 안내드립니다. 상담 접수만으로 예약이나 결제가 확정되지는 않습니다." },
];
