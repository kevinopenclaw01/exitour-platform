export type ProductCategory = "transfer" | "transport" | "tour" | "wellness" | "package";

export type FAQ = {
  question: string;
  answer: string;
};

export type Country = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  season: string;
  travelStyles: string[];
  imageUrl: string;
  faqs: FAQ[];
};

export type Destination = {
  id: string;
  country: string;
  countrySlug: string;
  citySlug: string;
  name: string;
  summary: string;
  guide: string;
  bestFor: string[];
  flightTime: string;
  season: string;
  attractions: string[];
  itinerary: string[];
  transferInfo: string;
  familyTips: string[];
  faqs: FAQ[];
  imageUrl: string;
};

export type Product = {
  id: string;
  slug: string;
  title: string;
  region: string;
  countrySlugs: string[];
  citySlugs: string[];
  category: ProductCategory;
  destinationScope: string;
  summary: string;
  description: string;
  duration: string;
  priceFromKrw: number;
  priceNote: string;
  recommendedFor: string[];
  highlights: string[];
  includes: string[];
  excludes: string[];
  itinerary: string[];
  notices: string[];
  cancellationPolicy: string[];
  faqs: FAQ[];
  relatedProductSlugs: string[];
};

export type Hotel = {
  id: string;
  slug: string;
  name: string;
  city: string;
  citySlug: string;
  country: string;
  countrySlug: string;
  destination: string;
  grade: "4성급" | "5성급" | "풀빌라" | "럭셔리";
  isContractedDeal: boolean;
  badges: string[];
  roomTypes: string[];
  breakfast: string;
  summary: string;
  priceFromKrw: number;
  priceNote: string;
  recommendedFor: string[];
  nearbyAttractions: string[];
  cancellationPolicy: string[];
  perks: string[];
  imageUrl: string;
};

export const countries: Country[] = [
  {
    slug: "philippines",
    name: "필리핀",
    headline: "투명한 바다와 리조트 휴양을 가장 편안하게 즐기는 섬 여행",
    summary: "보라카이, 보홀, 세부를 중심으로 해양 액티비티와 리조트 휴식을 조합하기 좋습니다. 가족, 커플, 첫 동남아 여행 고객에게 안정적인 선택지입니다.",
    season: "11월부터 5월까지 건기 시즌 추천",
    travelStyles: ["가족 휴양", "허니문", "호핑투어", "스노클링", "마사지"],
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    faqs: [
      {
        question: "필리핀은 처음 해외여행인 가족에게도 괜찮나요?",
        answer: "세부와 보라카이는 리조트와 현지 서비스가 잘 갖춰져 있어 첫 해외 가족여행에도 안정적입니다.",
      },
      {
        question: "호핑투어는 아이와 함께 참여할 수 있나요?",
        answer: "가능하지만 바다 컨디션과 아이 나이에 따라 포인트와 보트 타입을 조정하는 것이 좋습니다.",
      },
    ],
  },
  {
    slug: "vietnam",
    name: "베트남",
    headline: "해변 휴양, 미식, 도시 여행을 예산에 맞춰 조합하는 목적지",
    summary: "다낭, 나트랑, 푸꾸옥은 리조트 휴양에 강하고 하노이, 호치민, 사파, 달랏, 무이네는 도시와 자연을 함께 즐기기 좋습니다.",
    season: "지역별 차이가 있어 도시별 시즌 확인 권장",
    travelStyles: ["가성비 럭셔리", "가족 여행", "미식", "자연 여행", "일일투어"],
    imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
    faqs: [
      {
        question: "다낭과 나트랑 중 가족 여행은 어디가 좋나요?",
        answer: "호이안까지 함께 보고 싶다면 다낭, 리조트 휴양 중심이면 나트랑이 잘 맞습니다.",
      },
      {
        question: "베트남은 도시 이동을 많이 해도 괜찮나요?",
        answer: "아이 동반이나 부모님 동반이라면 한 도시 체류형 일정이 피로도가 낮습니다.",
      },
    ],
  },
  {
    slug: "guam",
    name: "괌",
    headline: "짧은 비행과 렌터카 자유 일정이 편한 가족 휴양지",
    summary: "한국에서 비교적 짧게 이동할 수 있고 리조트, 쇼핑, 렌터카 동선이 단순해 아이 동반 여행에 꾸준히 인기입니다.",
    season: "연중 가능, 우기에는 스콜을 고려",
    travelStyles: ["아이 동반", "렌터카", "쇼핑", "리조트"],
    imageUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
    faqs: [
      {
        question: "괌은 렌터카가 꼭 필요한가요?",
        answer: "필수는 아니지만 가족 여행에서는 렌터카가 있으면 식사와 쇼핑 동선이 훨씬 편해집니다.",
      },
    ],
  },
  {
    slug: "dubai",
    name: "두바이",
    headline: "럭셔리 호텔과 사막 체험을 함께 즐기는 프리미엄 스톱오버",
    summary: "도심 호텔, 쇼핑몰, 사막 사파리, 미식 경험을 짧고 밀도 있게 구성하기 좋은 중동 대표 목적지입니다.",
    season: "11월부터 3월까지 추천",
    travelStyles: ["럭셔리", "사막투어", "스톱오버", "허니문"],
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
    faqs: [
      {
        question: "두바이는 며칠 일정이 적당한가요?",
        answer: "스톱오버는 2박 3일, 두바이만 여유롭게 보면 4박 이상을 추천합니다.",
      },
    ],
  },
  {
    slug: "kazakhstan",
    name: "카자흐스탄",
    headline: "알마티 대자연과 도시 감각을 함께 즐기는 새로운 여행지",
    summary: "아직 과밀하지 않은 목적지로 산악 호수, 캐니언, 도시 카페 문화를 함께 경험할 수 있습니다.",
    season: "5월부터 10월까지 추천",
    travelStyles: ["자연", "사진 여행", "새로운 목적지", "가족"],
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    faqs: [
      {
        question: "카자흐스탄은 가족 여행으로도 괜찮나요?",
        answer: "차량 이동 시간이 길 수 있어 전용차와 여유 있는 일정으로 구성하면 만족도가 높습니다.",
      },
    ],
  },
  {
    slug: "europe",
    name: "유럽",
    headline: "허니문과 가족 기념여행을 위한 도시별 맞춤 루트",
    summary: "서유럽 클래식 루트부터 동유럽 소도시, 지중해 휴양까지 일정 밀도와 휴식을 균형 있게 설계합니다.",
    season: "4월부터 10월, 크리스마스 시즌 추천",
    travelStyles: ["허니문", "가족 기념여행", "소도시", "미식"],
    imageUrl: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80",
    faqs: [
      {
        question: "유럽은 몇 개 도시를 묶는 것이 좋나요?",
        answer: "7박 기준 2개 도시 정도가 여유롭고, 부모님 동반이면 이동 횟수를 더 줄이는 편이 좋습니다.",
      },
    ],
  },
];

export const destinations: Destination[] = [
  {
    id: "boracay",
    country: "필리핀",
    countrySlug: "philippines",
    citySlug: "boracay",
    name: "보라카이",
    summary: "화이트비치 중심의 고급 리조트, 선셋 세일링, 프라이빗 호핑을 균형 있게 즐기는 휴양지입니다.",
    guide: "보라카이는 선명한 화이트비치와 다양한 리조트 선택지가 강점입니다. 낮에는 해양 액티비티, 저녁에는 선셋과 해변 레스토랑을 즐기는 일정이 잘 맞습니다.",
    bestFor: ["허니문", "가족 휴양", "해양 액티비티"],
    flightTime: "약 4시간 30분 + 국내 이동",
    season: "11월-5월",
    attractions: ["화이트비치", "디몰", "푸카쉘 비치", "선셋 세일링"],
    itinerary: ["공항 도착 후 리조트 체크인", "프라이빗 호핑투어와 선셋 감상", "마사지와 자유 휴양"],
    transferInfo: "칼리보 또는 카티클란 공항 도착 후 차량과 보트 이동이 필요해 사전 픽업 예약을 권장합니다.",
    familyTips: ["보트 이동 시간을 고려해 첫날 일정은 가볍게 잡기", "아이 동반은 스테이션 2보다 조용한 리조트 구역 추천"],
    faqs: [
      { question: "보라카이는 몇 박이 적당한가요?", answer: "이동 피로를 고려하면 최소 3박, 여유로운 휴양은 4박 이상을 추천합니다." },
      { question: "우기에도 여행이 가능한가요?", answer: "가능하지만 해양 투어 취소 가능성이 있어 건기 시즌 만족도가 더 높습니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bohol",
    country: "필리핀",
    countrySlug: "philippines",
    citySlug: "bohol",
    name: "보홀",
    summary: "알로나비치와 발리카삭 스노클링, 초콜릿힐을 함께 묶기 좋은 프라이빗 휴양 코스입니다.",
    guide: "보홀은 바다와 육상 관광을 모두 즐기기 좋습니다. 나팔링, 발리카삭 같은 스노클링 포인트와 초콜릿힐, 로복강 투어를 일정에 맞춰 조합합니다.",
    bestFor: ["스노클링", "커플 여행", "소규모 가족"],
    flightTime: "약 4시간 40분",
    season: "12월-5월",
    attractions: ["알로나비치", "나팔링 포인트", "발리카삭", "초콜릿힐"],
    itinerary: ["알로나비치 리조트 체크인", "나팔링 또는 발리카삭 스노클링", "초콜릿힐과 로복강 일일투어"],
    transferInfo: "팡라오 공항에서 주요 리조트까지 차량으로 약 20-40분 이동합니다.",
    familyTips: ["스노클링 전 아이 수영 실력과 파도 상태 확인", "육상투어는 차량 이동이 있어 중간 휴식 확보"],
    faqs: [
      { question: "보홀 스노클링은 초보도 가능한가요?", answer: "가능합니다. 다만 포인트별 수심과 조류가 달라 초보자는 가이드 동행을 권장합니다." },
      { question: "보홀은 세부와 함께 묶을 수 있나요?", answer: "가능하지만 페리 또는 항공 이동이 있어 전체 일정이 5박 이상일 때 추천합니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cebu",
    country: "필리핀",
    countrySlug: "philippines",
    citySlug: "cebu",
    name: "세부",
    summary: "리조트, 마사지, 호핑투어, 시티투어까지 첫 동남아 프리미엄 여행에 안정적인 목적지입니다.",
    guide: "세부는 리조트 휴양과 해양 액티비티 인프라가 안정적입니다. 막탄 리조트에 머물며 호핑투어와 마사지를 조합하기 좋습니다.",
    bestFor: ["가족 여행", "리조트 휴양", "첫 해외여행"],
    flightTime: "약 4시간 30분",
    season: "12월-5월",
    attractions: ["막탄", "올랑고", "세부 시티", "스파"],
    itinerary: ["막탄 리조트 체크인", "호핑투어와 마사지", "세부 시티 반일투어"],
    transferInfo: "막탄 공항에서 리조트까지 차량으로 약 20-50분 이동합니다.",
    familyTips: ["막탄 내 리조트 선택 시 수영장과 키즈 편의시설 확인", "시티투어는 교통 체증을 고려해 반일로 구성"],
    faqs: [
      { question: "세부는 밤 도착 항공도 괜찮나요?", answer: "가능하지만 첫날은 공항 픽업과 가까운 리조트 체크인 위주로 잡는 것이 좋습니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "danang",
    country: "베트남",
    countrySlug: "vietnam",
    citySlug: "danang",
    name: "다낭",
    summary: "미케비치 리조트와 호이안 야경, 바나힐까지 동선이 좋아 가족 단위 문의가 많은 지역입니다.",
    guide: "다낭은 공항, 해변, 호이안, 바나힐의 동선이 단순해 가족 여행 만족도가 높습니다. 리조트 휴양과 근교 관광을 균형 있게 섞기 좋습니다.",
    bestFor: ["가족 여행", "호이안", "리조트"],
    flightTime: "약 4시간 40분",
    season: "2월-8월",
    attractions: ["미케비치", "호이안", "바나힐", "한시장"],
    itinerary: ["미케비치 리조트 체크인", "호이안 야경 투어", "바나힐 또는 마사지 휴식"],
    transferInfo: "다낭 공항에서 미케비치까지 차량으로 약 15-25분 이동합니다.",
    familyTips: ["호이안은 야간 인파가 많아 전용차 이동 추천", "바나힐은 날씨와 대기 시간을 고려해 일정 선택"],
    faqs: [
      { question: "다낭은 몇 월이 가장 좋나요?", answer: "해변 휴양은 2월부터 8월 사이가 좋고, 우기에는 실내 일정과 마사지를 섞는 편이 안정적입니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "nha-trang",
    country: "베트남",
    countrySlug: "vietnam",
    citySlug: "nhatrang",
    name: "나트랑",
    summary: "섬 리조트, 머드온천, 해변 카페를 여유롭게 즐기는 베트남 대표 휴양지입니다.",
    guide: "나트랑은 리조트 휴양에 집중하기 좋고 시내 맛집, 머드온천, 섬 투어를 선택적으로 더할 수 있습니다.",
    bestFor: ["휴양", "리조트", "가성비 럭셔리"],
    flightTime: "약 5시간",
    season: "1월-8월",
    attractions: ["나트랑 비치", "혼땀섬", "머드온천", "포나가르 사원"],
    itinerary: ["리조트 체크인과 휴식", "섬 투어 또는 머드온천", "시내 미식과 마사지"],
    transferInfo: "깜란 공항에서 나트랑 시내까지 차량으로 약 40-60분 이동합니다.",
    familyTips: ["시내 호텔보다 리조트형 숙소가 아이 동반에 편함", "섬 투어는 배 이동 시간을 고려"],
    faqs: [
      { question: "나트랑은 다낭보다 조용한가요?", answer: "일정 구성에 따라 다르지만 리조트 중심으로 잡으면 나트랑이 더 휴양형으로 느껴집니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "phu-quoc",
    country: "베트남",
    countrySlug: "vietnam",
    citySlug: "phuquoc",
    name: "푸꾸옥",
    summary: "롱비치 선셋과 풀빌라 숙박, 섬 남부 케이블카 일정까지 조용한 휴양에 강합니다.",
    guide: "푸꾸옥은 풀빌라와 선셋 리조트 선택지가 좋아 커플, 허니문, 부모님 동반 여행에 잘 맞습니다.",
    bestFor: ["풀빌라", "허니문", "선셋"],
    flightTime: "약 5시간 30분",
    season: "11월-4월",
    attractions: ["롱비치", "혼똔섬 케이블카", "선셋타운", "야시장"],
    itinerary: ["풀빌라 체크인", "남부 케이블카와 선셋타운", "리조트 휴식과 마사지"],
    transferInfo: "푸꾸옥 공항에서 주요 리조트까지 지역에 따라 약 15-60분 이동합니다.",
    familyTips: ["리조트 위치별 이동 시간이 달라 식사 동선 확인", "아이 동반은 키즈클럽과 수영장 깊이 확인"],
    faqs: [
      { question: "푸꾸옥은 허니문에 적합한가요?", answer: "프라이빗 풀빌라와 선셋 리조트가 많아 조용한 허니문에 잘 맞습니다." },
    ],
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sapa",
    country: "베트남",
    countrySlug: "vietnam",
    citySlug: "sapa",
    name: "사파",
    summary: "계단식 논과 판시판 케이블카, 소수민족 마을을 품격 있게 연결하는 북부 고산 여행입니다.",
    guide: "사파는 베트남 북부의 산악 풍경을 느끼는 목적지입니다. 하노이와 함께 묶고 차량 이동 피로를 고려해야 합니다.",
    bestFor: ["자연", "트레킹", "사진 여행"],
    flightTime: "하노이 경유 후 차량 약 5시간",
    season: "3월-5월, 9월-11월",
    attractions: ["판시판", "깟깟마을", "므엉호아 계곡"],
    itinerary: ["하노이 도착 후 사파 이동", "판시판과 마을 산책", "하노이 복귀"],
    transferInfo: "하노이에서 차량 또는 리무진으로 약 5시간 이상 이동합니다.",
    familyTips: ["차량 이동이 길어 어린아이 동반은 여유 일정 권장", "고산 기온 변화에 대비"],
    faqs: [{ question: "사파는 당일치기가 가능한가요?", answer: "이동 시간이 길어 최소 1박 이상을 추천합니다." }],
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hanoi",
    country: "베트남",
    countrySlug: "vietnam",
    citySlug: "hanoi",
    name: "하노이",
    summary: "구시가지 미식, 하롱베이 크루즈, 닌빈 일일투어를 조합하기 좋은 북부 관문입니다.",
    guide: "하노이는 북부 베트남 여행의 출발점입니다. 구시가지 미식과 하롱베이, 닌빈을 함께 구성할 수 있습니다.",
    bestFor: ["미식", "하롱베이", "문화"],
    flightTime: "약 4시간 30분",
    season: "10월-4월",
    attractions: ["호안끼엠", "구시가지", "하롱베이", "닌빈"],
    itinerary: ["구시가지 미식", "하롱베이 크루즈", "닌빈 일일투어"],
    transferInfo: "노이바이 공항에서 시내까지 차량으로 약 40-60분 이동합니다.",
    familyTips: ["구시가지는 보행 동선이 복잡해 숙소 위치 중요", "하롱베이는 크루즈 등급 확인"],
    faqs: [{ question: "하노이와 사파를 같이 갈 수 있나요?", answer: "가능하지만 최소 4박 이상일 때 동선이 안정적입니다." }],
    imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ho-chi-minh",
    country: "베트남",
    countrySlug: "vietnam",
    citySlug: "hochiminh",
    name: "호치민",
    summary: "도심 호텔, 메콩델타, 무이네 연계까지 가능한 활기 있는 남부 베트남 일정입니다.",
    guide: "호치민은 남부 베트남의 도시 감각과 근교 투어를 함께 즐기기 좋습니다.",
    bestFor: ["도시 여행", "미식", "근교 투어"],
    flightTime: "약 5시간 20분",
    season: "12월-4월",
    attractions: ["동커이", "벤탄시장", "메콩델타", "꾸찌터널"],
    itinerary: ["도심 미식", "메콩델타 일일투어", "무이네 연계"],
    transferInfo: "탄손누트 공항에서 1군까지 교통 상황에 따라 약 30-60분 이동합니다.",
    familyTips: ["오토바이 교통이 많아 전용차 이동 추천", "무이네 연계는 차량 시간이 길어 숙박 권장"],
    faqs: [{ question: "호치민은 휴양지인가요?", answer: "도시 여행 성격이 강하며 휴양은 무이네나 푸꾸옥 연계를 추천합니다." }],
    imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "da-lat",
    country: "베트남",
    countrySlug: "vietnam",
    citySlug: "dalat",
    name: "달랏",
    summary: "선선한 고원 도시에서 카페, 폭포, 프렌치 빌라 감성을 즐기는 감각적인 일정입니다.",
    guide: "달랏은 베트남 안에서도 선선한 기후와 카페 문화가 돋보이는 고원 도시입니다.",
    bestFor: ["카페 여행", "커플", "고원 휴양"],
    flightTime: "호치민 경유",
    season: "11월-3월",
    attractions: ["쑤언흐엉 호수", "다딴라 폭포", "달랏 야시장"],
    itinerary: ["카페와 호수 산책", "폭포 체험", "야시장 미식"],
    transferInfo: "리엔크엉 공항에서 시내까지 차량으로 약 40분 이동합니다.",
    familyTips: ["기온이 낮아 겉옷 준비", "폭포 액티비티는 연령에 맞게 선택"],
    faqs: [{ question: "달랏은 해변이 있나요?", answer: "해변이 아닌 고원 도시이며 선선한 휴식과 카페 여행에 가깝습니다." }],
    imageUrl: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mui-ne",
    country: "베트남",
    countrySlug: "vietnam",
    citySlug: "muine",
    name: "무이네",
    summary: "사막 지프투어와 해변 리조트를 묶어 특별한 사진과 휴식을 모두 남기는 여행지입니다.",
    guide: "무이네는 사막 지프투어와 해변 리조트 조합이 특별합니다. 호치민과 연계하는 일정이 일반적입니다.",
    bestFor: ["사진 여행", "리조트", "지프투어"],
    flightTime: "호치민 도착 후 차량 약 3시간",
    season: "11월-4월",
    attractions: ["화이트샌듄", "레드샌듄", "요정의 샘", "무이네 해변"],
    itinerary: ["호치민 도착 후 무이네 이동", "새벽 지프투어", "해변 리조트 휴식"],
    transferInfo: "호치민에서 차량으로 약 3-4시간 이동합니다.",
    familyTips: ["새벽 지프투어는 아이 컨디션에 맞게 선택", "차량 이동 전 멀미 대비"],
    faqs: [{ question: "무이네는 당일 투어가 가능한가요?", answer: "가능은 하지만 이동 시간이 길어 1박 이상을 추천합니다." }],
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "guam",
    country: "미국령",
    countrySlug: "guam",
    citySlug: "guam",
    name: "괌",
    summary: "짧은 비행, 안정적인 리조트, 렌터카 자유 일정으로 아이 동반 가족에게 꾸준히 사랑받습니다.",
    guide: "괌은 비행 시간이 비교적 짧고 리조트와 쇼핑 동선이 단순합니다. 렌터카를 더하면 가족 여행의 자유도가 높아집니다.",
    bestFor: ["아이 동반", "렌터카", "리조트"],
    flightTime: "약 4시간 30분",
    season: "연중",
    attractions: ["투몬비치", "사랑의 절벽", "GPO", "차모로 야시장"],
    itinerary: ["투몬 리조트 체크인", "렌터카 쇼핑과 남부 드라이브", "해변 휴양"],
    transferInfo: "괌 공항에서 투몬 주요 호텔까지 차량으로 약 10-20분 이동합니다.",
    familyTips: ["카시트와 보험 조건 확인", "렌터카 반납 시간을 항공편에 맞춰 여유 있게 설정"],
    faqs: [{ question: "괌은 몇 박이 적당한가요?", answer: "3박도 가능하지만 아이 동반은 4박 이상이 더 여유롭습니다." }],
    imageUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "dubai",
    country: "아랍에미리트",
    countrySlug: "dubai",
    citySlug: "dubai",
    name: "두바이",
    summary: "럭셔리 호텔, 사막 사파리, 몰과 미식을 한 번에 경험하는 중동 프리미엄 스톱오버입니다.",
    guide: "두바이는 호텔 등급과 체험 선택에 따라 만족도가 크게 달라지는 목적지입니다. 사막 사파리와 도심 전망, 쇼핑을 조합합니다.",
    bestFor: ["럭셔리", "스톱오버", "사막투어"],
    flightTime: "약 10시간",
    season: "11월-3월",
    attractions: ["부르즈 칼리파", "두바이몰", "사막 사파리", "마리나"],
    itinerary: ["도심 호텔 체크인", "사막 사파리", "전망대와 미식"],
    transferInfo: "두바이 공항에서 도심 주요 호텔까지 차량으로 약 20-40분 이동합니다.",
    familyTips: ["여름 낮 일정은 실내 중심 추천", "사막투어는 차량 멀미와 연령 제한 확인"],
    faqs: [{ question: "두바이는 아이와 가도 괜찮나요?", answer: "호텔과 실내 시설이 좋아 가족 여행도 가능하지만 계절과 낮 기온을 고려해야 합니다." }],
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "kazakhstan",
    country: "카자흐스탄",
    countrySlug: "kazakhstan",
    citySlug: "almaty",
    name: "알마티",
    summary: "알마티 대자연과 현대적인 도시 감각을 함께 즐기는 새로운 프리미엄 여행지입니다.",
    guide: "알마티는 산악 호수와 캐니언, 도시 카페 문화를 함께 즐길 수 있는 새로운 목적지입니다.",
    bestFor: ["자연", "새로운 여행지", "가족"],
    flightTime: "약 6시간 30분",
    season: "5월-10월",
    attractions: ["빅알마티 호수", "차른 캐니언", "침불락", "그린 바자르"],
    itinerary: ["알마티 도심 산책", "침불락과 호수", "차른 캐니언 전용차 투어"],
    transferInfo: "알마티 공항에서 도심까지 차량으로 약 30-50분 이동합니다.",
    familyTips: ["자연 투어는 차량 시간이 길어 간식과 휴식 준비", "고산 지역은 날씨 변화 대비"],
    faqs: [{ question: "카자흐스탄은 비자가 필요한가요?", answer: "여권과 체류 조건은 출발 전 최신 기준 확인이 필요합니다." }],
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "europe",
    country: "유럽",
    countrySlug: "europe",
    citySlug: "europe",
    name: "유럽",
    summary: "서유럽 클래식, 동유럽 소도시, 허니문 루트를 일정 밀도와 휴식 균형에 맞춰 설계합니다.",
    guide: "유럽은 도시 수보다 이동 품질이 중요합니다. 여행 목적에 맞춰 주요 도시와 소도시를 적절히 묶습니다.",
    bestFor: ["허니문", "가족 기념여행", "소도시"],
    flightTime: "약 11시간-14시간",
    season: "4월-10월, 12월",
    attractions: ["파리", "로마", "프라하", "스위스 알프스"],
    itinerary: ["대표 도시 도착", "소도시 또는 자연 일정", "여유 있는 귀국 전 휴식"],
    transferInfo: "도시 간 이동은 열차, 항공, 전용차를 일정 목적에 맞춰 조합합니다.",
    familyTips: ["숙소 이동 횟수를 줄이면 만족도가 높음", "기차역 접근성과 엘리베이터 여부 확인"],
    faqs: [{ question: "유럽 허니문은 몇 박이 좋나요?", answer: "최소 7박 이상을 추천하며 2-3개 도시 이내가 여유롭습니다." }],
    imageUrl: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80",
  },
];

export const products: Product[] = [
  {
    id: "bohol-napaling-snorkeling",
    slug: "bohol-napaling-snorkeling",
    title: "보홀 나팔링 스노클링",
    region: "필리핀 보홀",
    countrySlugs: ["philippines"],
    citySlugs: ["bohol"],
    category: "tour",
    destinationScope: "보홀",
    summary: "초보자도 도전하기 좋은 보홀 대표 스노클링 포인트를 안전하게 즐기는 반일 투어입니다.",
    description: "나팔링 포인트는 맑은 바다와 정어리 떼로 유명합니다. 현지 가이드가 수심과 조류를 확인하고 초보자도 부담 없도록 진행합니다.",
    duration: "약 3시간",
    priceFromKrw: 59000,
    priceNote: "시작가는 성인 1인 기준이며 장비, 이동 범위, 단독 진행 여부에 따라 달라집니다.",
    recommendedFor: ["스노클링 초보", "커플", "소규모 가족"],
    highlights: ["장비 포함", "초보자 가능", "가이드 동행"],
    includes: ["스노클링 장비", "현지 가이드", "기본 안전 안내"],
    excludes: ["개인 경비", "수중 촬영 옵션", "호텔 외곽 픽업 추가비"],
    itinerary: ["호텔 또는 미팅장소 집결", "포인트 이동과 안전 안내", "스노클링 진행", "샤워 후 복귀"],
    notices: ["당일 해상 상황에 따라 포인트가 변경될 수 있습니다.", "심혈관 질환이나 수영이 어려운 고객은 사전 상담이 필요합니다."],
    cancellationPolicy: ["이용 3일 전까지 무료 취소 가능", "이용 2일 전부터 취소 수수료가 발생할 수 있습니다.", "기상 악화로 취소 시 대체 일정 또는 환불을 안내합니다."],
    faqs: [
      { question: "수영을 못해도 가능한가요?", answer: "구명조끼 착용 후 진행하지만 물 공포가 있으면 사전 상담을 권장합니다." },
      { question: "아이도 참여할 수 있나요?", answer: "가능 연령은 현장 조건에 따라 달라지며 보호자 동반이 필요합니다." },
    ],
    relatedProductSlugs: ["boracay-private-hopping-tour", "cebu-private-hopping-tour"],
  },
  {
    id: "boracay-private-hopping-tour",
    slug: "boracay-private-hopping-tour",
    title: "보라카이 프라이빗 호핑투어",
    region: "필리핀 보라카이",
    countrySlugs: ["philippines"],
    citySlugs: ["boracay"],
    category: "tour",
    destinationScope: "보라카이",
    summary: "화이트비치 여행 중 하루를 여유롭게 채우는 단독 보트 기반 프리미엄 호핑투어입니다.",
    description: "보라카이 바다 컨디션에 맞춰 스노클링, 해변 정박, 선상 식사를 조합합니다. 가족 또는 커플만의 속도로 진행할 수 있습니다.",
    duration: "반일-종일",
    priceFromKrw: 129000,
    priceNote: "보트 단독 여부, 식사 구성, 인원에 따라 견적이 달라집니다.",
    recommendedFor: ["가족 휴양", "허니문", "친구 모임"],
    highlights: ["전용 보트", "스노클링 포인트", "식사 옵션"],
    includes: ["보트 이용", "스노클링 장비", "현지 스태프", "기본 음료"],
    excludes: ["매너팁", "개인 장비", "프리미엄 식사 업그레이드"],
    itinerary: ["해변 미팅", "보트 탑승", "스노클링과 해변 휴식", "식사 후 복귀"],
    notices: ["파도와 바람에 따라 운영 시간이 변경될 수 있습니다.", "선크림, 모자, 여벌 옷을 준비해주세요."],
    cancellationPolicy: ["이용 4일 전까지 무료 취소 가능", "전용 보트 확정 후 취소 규정은 공급처 기준을 따릅니다."],
    faqs: [
      { question: "단독 진행이 가능한가요?", answer: "가능합니다. 단독 보트는 인원과 날짜에 따라 추가 비용이 발생할 수 있습니다." },
    ],
    relatedProductSlugs: ["bohol-napaling-snorkeling", "airport-pickup"],
  },
  {
    id: "danang-airport-pickup",
    slug: "danang-airport-pickup",
    title: "다낭 공항 픽업",
    region: "베트남 다낭",
    countrySlugs: ["vietnam"],
    citySlugs: ["danang"],
    category: "transfer",
    destinationScope: "다낭",
    summary: "다낭 공항 도착 후 미케비치, 시내, 호이안 호텔까지 편안하게 연결하는 전용 차량 서비스입니다.",
    description: "항공편 도착 시간을 기준으로 기사 미팅과 차량 이동을 준비합니다. 늦은 밤 도착이나 아이 동반 가족에게 특히 유용합니다.",
    duration: "편도",
    priceFromKrw: 35000,
    priceNote: "시내 기준 시작가이며 호이안, 바나힐, 외곽 리조트는 추가 요금이 적용됩니다.",
    recommendedFor: ["밤 도착 항공", "아이 동반", "부모님 동반"],
    highlights: ["항공편 지연 확인", "전용 차량", "호텔 드롭"],
    includes: ["전용 차량", "기사", "공항 미팅 안내"],
    excludes: ["기사 매너팁", "경유지 추가", "외곽 지역 추가비"],
    itinerary: ["항공편 도착 확인", "공항 미팅", "호텔 이동", "로비 하차"],
    notices: ["입국 지연 시 현지 연락이 필요할 수 있습니다.", "수하물 수량에 따라 차량 등급을 조정해야 합니다."],
    cancellationPolicy: ["이용 2일 전까지 무료 취소 가능", "당일 취소와 노쇼는 환불이 제한될 수 있습니다."],
    faqs: [
      { question: "새벽 도착도 가능한가요?", answer: "가능합니다. 항공편 정보를 기준으로 미팅 시간을 조정합니다." },
    ],
    relatedProductSlugs: ["airport-sending", "day-tour"],
  },
  {
    id: "airport-pickup",
    slug: "airport-pickup",
    title: "공항 픽업",
    region: "전 지역",
    countrySlugs: ["philippines", "vietnam", "guam", "dubai", "kazakhstan", "europe"],
    citySlugs: [],
    category: "transfer",
    destinationScope: "전 지역",
    summary: "입국장 미팅부터 호텔 체크인 동선까지 낯선 도착 첫날을 편안하게 연결합니다.",
    description: "항공편 도착 시간과 호텔 위치를 확인해 적절한 차량 등급을 배정합니다.",
    duration: "편도",
    priceFromKrw: 45000,
    priceNote: "목적지와 차량 등급에 따라 확정가가 달라집니다.",
    recommendedFor: ["첫 해외여행", "가족 여행", "밤 도착 항공"],
    highlights: ["전용 차량", "항공편 지연 모니터링", "한국어 안내 지원"],
    includes: ["전용 차량", "기사", "미팅 안내"],
    excludes: ["매너팁", "경유지 추가", "외곽 지역 추가비"],
    itinerary: ["항공편 확인", "공항 미팅", "호텔 이동"],
    notices: ["수하물 수량과 카시트 필요 여부를 미리 알려주세요."],
    cancellationPolicy: ["이용 2일 전까지 무료 취소 가능", "당일 취소는 공급처 기준 수수료가 적용됩니다."],
    faqs: [{ question: "항공편이 지연되면 어떻게 하나요?", answer: "항공편 정보를 기준으로 현지 기사에게 지연 상황을 공유합니다." }],
    relatedProductSlugs: ["airport-sending", "danang-airport-pickup"],
  },
  {
    id: "airport-sending",
    slug: "airport-sending",
    title: "공항 샌딩",
    region: "전 지역",
    countrySlugs: ["philippines", "vietnam", "guam", "dubai", "kazakhstan", "europe"],
    citySlugs: [],
    category: "transfer",
    destinationScope: "전 지역",
    summary: "호텔에서 공항까지 여유 있는 출발 시간으로 마지막 날 이동 부담을 줄입니다.",
    description: "출국 시간, 공항 혼잡도, 호텔 위치를 고려해 픽업 시간을 안내합니다.",
    duration: "편도",
    priceFromKrw: 45000,
    priceNote: "목적지, 차량, 외곽 지역 여부에 따라 달라집니다.",
    recommendedFor: ["가족 여행", "수하물 많은 일정", "새벽 출국"],
    highlights: ["호텔 로비 픽업", "수하물 동선 지원", "출국 시간 맞춤 배차"],
    includes: ["전용 차량", "기사", "픽업 시간 안내"],
    excludes: ["매너팁", "경유지 추가", "추가 대기료"],
    itinerary: ["호텔 로비 미팅", "공항 이동", "터미널 하차"],
    notices: ["교통 체증과 공항 혼잡을 고려해 여유 있게 출발합니다."],
    cancellationPolicy: ["이용 2일 전까지 무료 취소 가능", "당일 취소는 환불이 제한될 수 있습니다."],
    faqs: [{ question: "픽업 시간은 누가 정하나요?", answer: "항공편과 지역 교통 상황을 기준으로 권장 시간을 안내합니다." }],
    relatedProductSlugs: ["airport-pickup", "danang-airport-pickup"],
  },
  {
    id: "rent-car",
    slug: "guam-family-rent-car",
    title: "괌 패밀리 렌터카",
    region: "괌",
    countrySlugs: ["guam"],
    citySlugs: ["guam"],
    category: "transport",
    destinationScope: "괌",
    summary: "보험 조건과 차량 등급을 확인해 가족 여행에 맞는 안정적인 렌터카를 제안합니다.",
    description: "괌 가족 여행은 렌터카가 있으면 식사와 쇼핑 동선이 편합니다. 카시트와 보험 조건을 함께 확인합니다.",
    duration: "24시간 기준",
    priceFromKrw: 85000,
    priceNote: "차량 등급, 보험, 성수기 재고에 따라 변동됩니다.",
    recommendedFor: ["아이 동반", "쇼핑 일정", "자유 일정"],
    highlights: ["차량 등급 선택", "보험 조건 안내", "공항 또는 호텔 인수"],
    includes: ["기본 보험", "차량 대여", "현지 인수 안내"],
    excludes: ["유류비", "추가 보험", "카시트 옵션"],
    itinerary: ["예약 확인", "차량 인수", "자유 일정", "차량 반납"],
    notices: ["운전면허와 국제운전 관련 조건을 출발 전 확인해야 합니다."],
    cancellationPolicy: ["차량 확정 후 공급처 규정에 따라 수수료가 발생할 수 있습니다."],
    faqs: [{ question: "카시트 예약이 가능한가요?", answer: "가능 여부와 수량은 차량 예약 시 함께 확인합니다." }],
    relatedProductSlugs: ["airport-pickup", "airport-sending"],
  },
  {
    id: "cebu-private-hopping-tour",
    slug: "cebu-private-hopping-tour",
    title: "세부 프라이빗 호핑투어",
    region: "필리핀 세부",
    countrySlugs: ["philippines"],
    citySlugs: ["cebu"],
    category: "tour",
    destinationScope: "세부",
    summary: "막탄 리조트 여행 중 하루를 시원하게 채우는 전용 보트 호핑투어입니다.",
    description: "세부의 대표 해양 포인트를 가족 또는 일행끼리 편안하게 즐길 수 있게 구성합니다.",
    duration: "반일-종일",
    priceFromKrw: 89000,
    priceNote: "인원과 보트 단독 여부에 따라 달라집니다.",
    recommendedFor: ["가족", "친구 모임", "첫 세부 여행"],
    highlights: ["전용 보트 옵션", "스노클링", "현지식 식사"],
    includes: ["보트", "장비", "현지 스태프"],
    excludes: ["개인 경비", "프리미엄 식사", "매너팁"],
    itinerary: ["미팅", "보트 이동", "스노클링", "식사와 복귀"],
    notices: ["기상 상황에 따라 일정이 조정될 수 있습니다."],
    cancellationPolicy: ["이용 3일 전까지 무료 취소 가능"],
    faqs: [{ question: "막탄 호텔 픽업이 가능한가요?", answer: "대부분 가능하지만 호텔 위치에 따라 추가비가 발생할 수 있습니다." }],
    relatedProductSlugs: ["bohol-napaling-snorkeling", "boracay-private-hopping-tour"],
  },
  {
    id: "massage",
    slug: "premium-spa-massage",
    title: "프리미엄 스파 마사지",
    region: "동남아 주요 도시",
    countrySlugs: ["philippines", "vietnam"],
    citySlugs: ["boracay", "bohol", "cebu", "danang", "nhatrang", "phuquoc"],
    category: "wellness",
    destinationScope: "동남아 주요 도시",
    summary: "검증된 스파와 이동 동선을 연결해 여행 중간의 회복 시간을 품격 있게 예약합니다.",
    description: "여행 중 쌓인 피로를 풀 수 있도록 위치, 시설, 커플룸, 픽업 옵션을 확인합니다.",
    duration: "60-120분",
    priceFromKrw: 35000,
    priceNote: "코스 시간과 스파 등급에 따라 달라집니다.",
    recommendedFor: ["커플", "부모님 동반", "휴양 일정"],
    highlights: ["스파 등급 선택", "커플룸 가능", "픽업 옵션"],
    includes: ["예약 대행", "선택 코스", "현지 안내"],
    excludes: ["매너팁", "추가 코스", "외곽 픽업"],
    itinerary: ["예약 시간 도착", "코스 진행", "휴식 후 복귀"],
    notices: ["임산부나 특정 질환이 있으면 사전 고지가 필요합니다."],
    cancellationPolicy: ["이용 1-2일 전부터 취소 수수료가 발생할 수 있습니다."],
    faqs: [{ question: "커플룸 요청이 가능한가요?", answer: "가능하지만 스파 재고에 따라 사전 확정이 필요합니다." }],
    relatedProductSlugs: ["airport-pickup", "day-tour"],
  },
  {
    id: "day-tour",
    slug: "private-day-tour",
    title: "전용차 일일투어",
    region: "전 지역",
    countrySlugs: ["philippines", "vietnam", "guam", "dubai", "kazakhstan", "europe"],
    citySlugs: [],
    category: "tour",
    destinationScope: "전 지역",
    summary: "핵심 명소를 무리 없이 둘러보는 전용차 또는 조인 투어를 목적지별로 추천합니다.",
    description: "아이 동반, 부모님 동반, 사진 여행 등 목적에 따라 명소 수와 이동 시간을 조절합니다.",
    duration: "반일-종일",
    priceFromKrw: 99000,
    priceNote: "전용차, 가이드, 입장권 포함 여부에 따라 달라집니다.",
    recommendedFor: ["가족", "부모님 동반", "효율적인 일정"],
    highlights: ["전용차 가능", "가이드 옵션", "식사 동선 조율"],
    includes: ["일정 설계", "차량 또는 투어 예약", "현지 안내"],
    excludes: ["입장료", "식사", "개인 경비"],
    itinerary: ["호텔 픽업", "주요 명소 방문", "식사 또는 카페", "호텔 복귀"],
    notices: ["명소 휴무일과 교통 상황에 따라 순서가 변경될 수 있습니다."],
    cancellationPolicy: ["투어별 공급처 규정을 따릅니다."],
    faqs: [{ question: "원하는 장소를 넣을 수 있나요?", answer: "전용차 일정은 가능하지만 이동 시간에 따라 조정이 필요합니다." }],
    relatedProductSlugs: ["airport-pickup", "premium-spa-massage"],
  },
  {
    id: "custom-package",
    slug: "custom-premium-package",
    title: "맞춤 패키지",
    region: "전 지역",
    countrySlugs: ["philippines", "vietnam", "guam", "dubai", "kazakhstan", "europe"],
    citySlugs: [],
    category: "package",
    destinationScope: "전 지역",
    summary: "항공, 호텔, 차량, 투어, 식사까지 여행 목적과 예산에 맞춰 하나의 일정으로 설계합니다.",
    description: "정해진 일정표가 아니라 동행자 구성, 예산, 여행 속도, 꼭 하고 싶은 경험을 기준으로 전체 일정을 조율합니다.",
    duration: "상담 후 확정",
    priceFromKrw: 690000,
    priceNote: "목적지, 항공 포함 여부, 호텔 등급, 투어 구성에 따라 견적이 달라집니다.",
    recommendedFor: ["가족 기념여행", "허니문", "부모님 동반"],
    highlights: ["1:1 일정 설계", "호텔 특가 연동", "가족/허니문 전문"],
    includes: ["일정 설계", "호텔/차량/투어 조합", "상담용 견적"],
    excludes: ["확정 전 예약 보장", "여권/비자 발급", "개인 경비"],
    itinerary: ["여행 조건 접수", "일정과 견적 설계", "상담 후 예약 진행"],
    notices: ["상담용 견적은 예약 가능 여부 확인 후 확정됩니다."],
    cancellationPolicy: ["예약 확정 전에는 취소 수수료가 없으며, 확정 후에는 항목별 규정을 따릅니다."],
    faqs: [{ question: "항공권을 이미 구매했어도 가능한가요?", answer: "가능합니다. 항공 시간에 맞춰 호텔과 현지 일정을 구성합니다." }],
    relatedProductSlugs: ["airport-pickup", "private-day-tour"],
  },
];

export const hotels: Hotel[] = [
  {
    id: "boracay-luxury-beach-resort",
    slug: "boracay-luxury-beach-resort",
    name: "보라카이 럭셔리 비치 리조트",
    city: "보라카이",
    citySlug: "boracay",
    country: "필리핀",
    countrySlug: "philippines",
    destination: "보라카이",
    grade: "5성급",
    isContractedDeal: true,
    badges: ["럭셔리 추천", "허니문 추천"],
    roomTypes: ["디럭스룸", "오션뷰 스위트", "패밀리 커넥팅룸"],
    breakfast: "조식 포함 가능",
    summary: "화이트비치 접근성과 프리미엄 객실 컨디션을 함께 갖춘 보라카이 대표 리조트 특가입니다.",
    priceFromKrw: 280000,
    priceNote: "1박 1실 시작가이며 날짜, 객실 타입, 조식 포함 여부에 따라 달라집니다.",
    recommendedFor: ["허니문", "커플", "조용한 가족 휴양"],
    nearbyAttractions: ["화이트비치", "디몰", "푸카쉘 비치"],
    cancellationPolicy: ["성수기와 프로모션 요금은 환불 규정이 엄격할 수 있습니다.", "확정 전 객실별 규정을 안내합니다."],
    perks: ["계약 특가", "비치 접근", "허니문 세팅 상담"],
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bohol-family-resort",
    slug: "bohol-family-resort",
    name: "보홀 패밀리 리조트",
    city: "보홀",
    citySlug: "bohol",
    country: "필리핀",
    countrySlug: "philippines",
    destination: "보홀",
    grade: "5성급",
    isContractedDeal: true,
    badges: ["가족 추천", "스노클링 동선"],
    roomTypes: ["가든뷰룸", "패밀리룸", "풀억세스룸"],
    breakfast: "조식 포함",
    summary: "알로나비치와 주요 해양 투어 동선이 좋아 아이 동반 가족에게 안정적인 리조트입니다.",
    priceFromKrw: 240000,
    priceNote: "1박 1실 기준 시작가이며 성수기에는 요금이 변동됩니다.",
    recommendedFor: ["아이 동반", "소규모 가족", "스노클링 여행"],
    nearbyAttractions: ["알로나비치", "나팔링 포인트", "초콜릿힐"],
    cancellationPolicy: ["객실 확정 후 날짜별 취소 규정이 적용됩니다.", "연휴 기간은 환불 불가 요금이 있을 수 있습니다."],
    perks: ["조식 포함", "투어 픽업 편리", "패밀리룸"],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "danang-beachfront-hotel",
    slug: "danang-beachfront-hotel",
    name: "다낭 비치프론트 호텔",
    city: "다낭",
    citySlug: "danang",
    country: "베트남",
    countrySlug: "vietnam",
    destination: "다낭",
    grade: "5성급",
    isContractedDeal: true,
    badges: ["가족 추천", "비치프론트"],
    roomTypes: ["디럭스 오션", "패밀리 스위트", "클럽룸"],
    breakfast: "조식 포함 옵션",
    summary: "미케비치 앞 입지와 넓은 객실 타입으로 3대 가족 여행에 잘 맞는 호텔입니다.",
    priceFromKrw: 180000,
    priceNote: "객실 타입과 호이안 이동 포함 여부에 따라 견적이 달라집니다.",
    recommendedFor: ["가족 여행", "부모님 동반", "호이안 연계"],
    nearbyAttractions: ["미케비치", "호이안", "바나힐", "한시장"],
    cancellationPolicy: ["프로모션 요금은 취소 불가 조건이 있을 수 있습니다.", "확정 전 객실별 규정을 확인합니다."],
    perks: ["오션뷰 옵션", "호이안 차량 연결", "키즈풀"],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "phuquoc-pool-villa",
    slug: "phuquoc-pool-villa",
    name: "푸꾸옥 선셋 풀빌라",
    city: "푸꾸옥",
    citySlug: "phuquoc",
    country: "베트남",
    countrySlug: "vietnam",
    destination: "푸꾸옥",
    grade: "풀빌라",
    isContractedDeal: true,
    badges: ["럭셔리 추천", "허니문 추천"],
    roomTypes: ["원베드 풀빌라", "투베드 풀빌라", "비치프론트 빌라"],
    breakfast: "조식 포함 가능",
    summary: "프라이빗 풀과 선셋 비치 접근성을 갖춘 허니문, 부모님 동반 일정 추천 숙소입니다.",
    priceFromKrw: 360000,
    priceNote: "빌라 타입, 숙박일, 프로모션에 따라 달라집니다.",
    recommendedFor: ["허니문", "부모님 동반", "조용한 휴양"],
    nearbyAttractions: ["롱비치", "선셋타운", "혼똔섬 케이블카"],
    cancellationPolicy: ["풀빌라 특가 요금은 조기 취소 기한이 짧을 수 있습니다."],
    perks: ["프라이빗 풀", "공항 픽업 옵션", "허니문 세팅"],
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "guam-family-resort",
    slug: "guam-family-resort",
    name: "괌 패밀리 베이 리조트",
    city: "괌",
    citySlug: "guam",
    country: "괌",
    countrySlug: "guam",
    destination: "괌",
    grade: "4성급",
    isContractedDeal: true,
    badges: ["가족 추천", "렌터카 추천"],
    roomTypes: ["스탠다드룸", "패밀리룸", "오션뷰룸"],
    breakfast: "조식 별도 또는 포함 옵션",
    summary: "렌터카 여행과 쇼핑 동선이 편한 입지로 아이 동반 고객에게 안정적인 선택입니다.",
    priceFromKrw: 210000,
    priceNote: "1박 기준 시작가이며 주말과 방학 시즌에는 변동됩니다.",
    recommendedFor: ["아이 동반", "쇼핑", "렌터카 자유여행"],
    nearbyAttractions: ["투몬비치", "GPO", "사랑의 절벽"],
    cancellationPolicy: ["미국 공휴일과 성수기에는 별도 취소 규정이 적용됩니다."],
    perks: ["패밀리룸", "주차 편리", "쇼핑센터 인접"],
    imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "dubai-luxury-tower",
    slug: "dubai-luxury-tower",
    name: "두바이 럭셔리 타워 호텔",
    city: "두바이",
    citySlug: "dubai",
    country: "두바이",
    countrySlug: "dubai",
    destination: "두바이",
    grade: "럭셔리",
    isContractedDeal: true,
    badges: ["럭셔리 추천", "스톱오버 추천"],
    roomTypes: ["디럭스룸", "스카이라인뷰룸", "클럽 스위트"],
    breakfast: "조식 포함 옵션",
    summary: "도심 전망과 사막 사파리 픽업 동선이 좋은 프리미엄 스톱오버 호텔입니다.",
    priceFromKrw: 420000,
    priceNote: "행사 기간과 객실 전망에 따라 요금 변동이 큽니다.",
    recommendedFor: ["허니문", "럭셔리 여행", "스톱오버"],
    nearbyAttractions: ["두바이몰", "부르즈 칼리파", "마리나"],
    cancellationPolicy: ["도시 행사 기간에는 환불 불가 요금이 많아 사전 확인이 필요합니다."],
    perks: ["스카이라인 전망", "사막투어 연결", "클럽룸 옵션"],
    imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "europe-boutique-stay",
    slug: "europe-boutique-stay",
    name: "유럽 부티크 시티 스테이",
    city: "유럽",
    citySlug: "europe",
    country: "유럽",
    countrySlug: "europe",
    destination: "유럽",
    grade: "4성급",
    isContractedDeal: false,
    badges: ["소도시 추천", "기념여행"],
    roomTypes: ["스탠다드룸", "부티크룸", "패밀리룸"],
    breakfast: "호텔별 상이",
    summary: "역세권과 구시가지 접근성을 우선으로 엄선한 도시별 부티크 호텔 컬렉션입니다.",
    priceFromKrw: 260000,
    priceNote: "도시, 날짜, 박람회 기간, 환율에 따라 달라집니다.",
    recommendedFor: ["허니문", "가족 기념여행", "소도시 여행"],
    nearbyAttractions: ["중앙역", "구시가지", "대표 미술관"],
    cancellationPolicy: ["유럽 호텔은 도시와 요금제별 취소 규정 차이가 커 확정 전 개별 안내합니다."],
    perks: ["역세권", "소도시 연계", "조식 옵션"],
    imageUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=80",
  },
];

export const faqs: FAQ[] = [
  {
    question: "EXITour는 패키지 여행사인가요?",
    answer: "정해진 일정만 판매하기보다 고객의 항공, 예산, 동행자, 여행 목적에 맞춰 호텔과 현지 서비스를 조합하는 맞춤 여행사입니다.",
  },
  {
    question: "견적 요청 후 실제 예약은 어떻게 진행되나요?",
    answer: "현재는 견적 요청 UI를 기준으로 상담 흐름을 준비하는 단계입니다. 이후 저장, 관리자 확인, 결제 안내를 순차적으로 붙일 예정입니다.",
  },
  {
    question: "호텔만 따로 문의해도 되나요?",
    answer: "가능합니다. 계약 호텔 특가, 객실 타입, 조식 포함 여부, 이동 서비스까지 함께 비교해 안내합니다.",
  },
  {
    question: "아이 동반 여행도 맞춤 설계가 가능한가요?",
    answer: "가능합니다. 비행 시간, 객실 구조, 수영장, 차량 이동 시간, 식사 동선을 고려해 무리 없는 일정으로 구성합니다.",
  },
];

export const serviceOptions = products.map((product) => product.title);

export const formatKrw = (value: number) => new Intl.NumberFormat("ko-KR").format(value);

export const getCountryBySlug = (countrySlug: string) =>
  countries.find((country) => country.slug === countrySlug);

export const getDestinationBySlugs = (countrySlug: string, citySlug: string) =>
  destinations.find((destination) => destination.countrySlug === countrySlug && destination.citySlug === citySlug);

export const getProductBySlug = (productSlug: string) =>
  products.find((product) => product.slug === productSlug);

export const getHotelBySlug = (hotelSlug: string) =>
  hotels.find((hotel) => hotel.slug === hotelSlug);

export const getProductsForCountry = (countrySlug: string) =>
  products.filter((product) => product.countrySlugs.includes(countrySlug));

export const getProductsForCity = (countrySlug: string, citySlug: string) =>
  products.filter(
    (product) =>
      product.countrySlugs.includes(countrySlug) &&
      (product.citySlugs.length === 0 || product.citySlugs.includes(citySlug)),
  );

export const getHotelsForCountry = (countrySlug: string) =>
  hotels.filter((hotel) => hotel.countrySlug === countrySlug);

export const getHotelsForCity = (countrySlug: string, citySlug: string) =>
  hotels.filter((hotel) => hotel.countrySlug === countrySlug && hotel.citySlug === citySlug);

export const getRelatedProducts = (product: Product) =>
  product.relatedProductSlugs
    .map((slug) => getProductBySlug(slug))
    .filter((related): related is Product => Boolean(related));
