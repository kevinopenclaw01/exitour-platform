export type Destination = {
  id: string;
  country: string;
  name: string;
  summary: string;
  bestFor: string[];
  flightTime: string;
  season: string;
  imageUrl: string;
};

export type Product = {
  id: string;
  title: string;
  category: "transfer" | "transport" | "tour" | "wellness" | "package";
  destinationScope: string;
  summary: string;
  duration: string;
  priceFromKrw: number;
  highlights: string[];
};

export type Hotel = {
  id: string;
  name: string;
  destination: string;
  grade: "4성급" | "5성급" | "풀빌라" | "럭셔리";
  summary: string;
  priceFromKrw: number;
  perks: string[];
  imageUrl: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export const destinations: Destination[] = [
  {
    id: "boracay",
    country: "필리핀",
    name: "보라카이",
    summary: "화이트비치 중심의 고급 리조트, 선셋 세일링, 프라이빗 호핑을 균형 있게 즐기는 휴양지입니다.",
    bestFor: ["허니문", "가족 휴양", "해양 액티비티"],
    flightTime: "약 4시간 30분 + 국내 이동",
    season: "11월-5월",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "bohol",
    country: "필리핀",
    name: "보홀",
    summary: "알로나비치와 발리카삭 스노클링, 초콜릿힐을 함께 묶기 좋은 프라이빗 휴양 코스입니다.",
    bestFor: ["스노클링", "커플 여행", "소규모 가족"],
    flightTime: "약 4시간 40분",
    season: "12월-5월",
    imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "cebu",
    country: "필리핀",
    name: "세부",
    summary: "리조트, 마사지, 호핑투어, 시티투어까지 첫 동남아 프리미엄 여행에 안정적인 목적지입니다.",
    bestFor: ["가족 여행", "리조트 휴양", "첫 해외여행"],
    flightTime: "약 4시간 30분",
    season: "12월-5월",
    imageUrl: "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "danang",
    country: "베트남",
    name: "다낭",
    summary: "미케비치 리조트와 호이안 야경, 바나힐까지 동선이 좋아 가족 단위 문의가 많은 지역입니다.",
    bestFor: ["가족 여행", "호이안", "리조트"],
    flightTime: "약 4시간 40분",
    season: "2월-8월",
    imageUrl: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "nha-trang",
    country: "베트남",
    name: "나트랑",
    summary: "섬 리조트, 머드온천, 해변 카페를 여유롭게 즐기는 베트남 대표 휴양지입니다.",
    bestFor: ["휴양", "리조트", "가성비 럭셔리"],
    flightTime: "약 5시간",
    season: "1월-8월",
    imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "phu-quoc",
    country: "베트남",
    name: "푸꾸옥",
    summary: "롱비치 선셋과 풀빌라 숙박, 섬 남부 케이블카 일정까지 조용한 휴양에 강합니다.",
    bestFor: ["풀빌라", "허니문", "선셋"],
    flightTime: "약 5시간 30분",
    season: "11월-4월",
    imageUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "sapa",
    country: "베트남",
    name: "사파",
    summary: "계단식 논과 판시판 케이블카, 소수민족 마을을 품격 있게 연결하는 북부 고산 여행입니다.",
    bestFor: ["자연", "트레킹", "사진 여행"],
    flightTime: "하노이 경유 후 차량 약 5시간",
    season: "3월-5월, 9월-11월",
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "hanoi",
    country: "베트남",
    name: "하노이",
    summary: "구시가지 미식, 하롱베이 크루즈, 닌빈 일일투어를 조합하기 좋은 북부 관문입니다.",
    bestFor: ["미식", "하롱베이", "문화"],
    flightTime: "약 4시간 30분",
    season: "10월-4월",
    imageUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "ho-chi-minh",
    country: "베트남",
    name: "호치민",
    summary: "도심 호텔, 메콩델타, 무이네 연계까지 가능한 활기 있는 남부 베트남 일정입니다.",
    bestFor: ["도시 여행", "미식", "근교 투어"],
    flightTime: "약 5시간 20분",
    season: "12월-4월",
    imageUrl: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "da-lat",
    country: "베트남",
    name: "달랏",
    summary: "선선한 고원 도시에서 카페, 폭포, 프렌치 빌라 감성을 즐기는 감각적인 일정입니다.",
    bestFor: ["카페 여행", "커플", "고원 휴양"],
    flightTime: "호치민 경유",
    season: "11월-3월",
    imageUrl: "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "mui-ne",
    country: "베트남",
    name: "무이네",
    summary: "사막 지프투어와 해변 리조트를 묶어 특별한 사진과 휴식을 모두 남기는 여행지입니다.",
    bestFor: ["사진 여행", "리조트", "지프투어"],
    flightTime: "호치민 도착 후 차량 약 3시간",
    season: "11월-4월",
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "guam",
    country: "미국령",
    name: "괌",
    summary: "짧은 비행, 안정적인 리조트, 렌터카 자유 일정으로 아이 동반 가족에게 꾸준히 사랑받습니다.",
    bestFor: ["아이 동반", "렌터카", "리조트"],
    flightTime: "약 4시간 30분",
    season: "연중",
    imageUrl: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "dubai",
    country: "아랍에미리트",
    name: "두바이",
    summary: "럭셔리 호텔, 사막 사파리, 몰과 미식을 한 번에 경험하는 중동 프리미엄 스톱오버입니다.",
    bestFor: ["럭셔리", "스톱오버", "사막투어"],
    flightTime: "약 10시간",
    season: "11월-3월",
    imageUrl: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "kazakhstan",
    country: "카자흐스탄",
    name: "카자흐스탄",
    summary: "알마티 대자연과 현대적인 도시 감각을 함께 즐기는 새로운 프리미엄 단거리 장거리 여행지입니다.",
    bestFor: ["자연", "새로운 여행지", "가족"],
    flightTime: "약 6시간 30분",
    season: "5월-10월",
    imageUrl: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "europe",
    country: "유럽",
    name: "유럽",
    summary: "서유럽 클래식, 동유럽 소도시, 허니문 루트를 일정 밀도와 휴식 균형에 맞춰 설계합니다.",
    bestFor: ["허니문", "가족 기념여행", "소도시"],
    flightTime: "약 11시간-14시간",
    season: "4월-10월, 12월",
    imageUrl: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80",
  },
];

export const products: Product[] = [
  {
    id: "airport-pickup",
    title: "공항 픽업",
    category: "transfer",
    destinationScope: "전 지역",
    summary: "입국장 미팅부터 호텔 체크인 동선까지 낯선 도착 첫날을 편안하게 연결합니다.",
    duration: "편도",
    priceFromKrw: 45000,
    highlights: ["전용 차량", "항공편 지연 모니터링", "한국어 안내 지원"],
  },
  {
    id: "airport-sending",
    title: "공항 샌딩",
    category: "transfer",
    destinationScope: "전 지역",
    summary: "호텔에서 공항까지 여유 있는 출발 시간으로 마지막 날 이동 부담을 줄입니다.",
    duration: "편도",
    priceFromKrw: 45000,
    highlights: ["호텔 로비 픽업", "수하물 동선 지원", "출국 시간 맞춤 배차"],
  },
  {
    id: "rent-car",
    title: "렌터카",
    category: "transport",
    destinationScope: "괌, 두바이, 유럽",
    summary: "보험 조건과 차량 등급을 확인해 가족 여행에 맞는 안정적인 렌터카를 제안합니다.",
    duration: "24시간 기준",
    priceFromKrw: 85000,
    highlights: ["차량 등급 선택", "보험 조건 안내", "공항 또는 호텔 인수"],
  },
  {
    id: "hopping-tour",
    title: "호핑투어",
    category: "tour",
    destinationScope: "필리핀, 베트남 휴양지",
    summary: "인기 포인트와 식사, 이동 시간을 조율해 피로도가 낮은 해양 투어로 구성합니다.",
    duration: "반일-종일",
    priceFromKrw: 79000,
    highlights: ["스팟 선별", "현지식 또는 BBQ", "구명 장비 포함"],
  },
  {
    id: "snorkeling",
    title: "스노클링",
    category: "tour",
    destinationScope: "보홀, 세부, 나트랑, 괌",
    summary: "초보자도 부담 없는 포인트부터 프라이빗 보트 옵션까지 여행 성향에 맞춥니다.",
    duration: "2-4시간",
    priceFromKrw: 59000,
    highlights: ["장비 포함", "초보자 가능", "프라이빗 옵션"],
  },
  {
    id: "massage",
    title: "마사지",
    category: "wellness",
    destinationScope: "동남아 주요 도시",
    summary: "검증된 스파와 이동 동선을 연결해 여행 중간의 회복 시간을 품격 있게 예약합니다.",
    duration: "60-120분",
    priceFromKrw: 35000,
    highlights: ["스파 등급 선택", "커플룸 가능", "픽업 옵션"],
  },
  {
    id: "day-tour",
    title: "일일투어",
    category: "tour",
    destinationScope: "전 지역",
    summary: "핵심 명소를 무리 없이 둘러보는 전용차 또는 조인 투어를 목적지별로 추천합니다.",
    duration: "반일-종일",
    priceFromKrw: 99000,
    highlights: ["전용차 가능", "가이드 옵션", "식사 동선 조율"],
  },
  {
    id: "custom-package",
    title: "맞춤 패키지",
    category: "package",
    destinationScope: "전 지역",
    summary: "항공, 호텔, 차량, 투어, 식사까지 여행 목적과 예산에 맞춰 하나의 일정으로 설계합니다.",
    duration: "상담 후 확정",
    priceFromKrw: 690000,
    highlights: ["1:1 일정 설계", "호텔 특가 연동", "가족/허니문 전문"],
  },
];

export const hotels: Hotel[] = [
  {
    id: "boracay-premier-beach",
    name: "보라카이 프리미어 비치 리조트",
    destination: "보라카이",
    grade: "5성급",
    summary: "화이트비치 도보권과 조용한 객실 동선을 모두 챙긴 가족형 리조트 특가입니다.",
    priceFromKrw: 230000,
    perks: ["조식 포함", "비치 접근 우수", "공항 이동 상담"],
    imageUrl: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "danang-ocean-suite",
    name: "다낭 오션 스위트 호텔",
    destination: "다낭",
    grade: "5성급",
    summary: "미케비치 중심 입지와 넓은 객실 타입으로 3대 가족 여행에 잘 맞습니다.",
    priceFromKrw: 180000,
    perks: ["오션뷰 옵션", "호이안 차량 연결", "키즈풀"],
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "phuquoc-pool-villa",
    name: "푸꾸옥 선셋 풀빌라",
    destination: "푸꾸옥",
    grade: "풀빌라",
    summary: "프라이빗 풀과 선셋 비치 접근성을 갖춘 허니문, 부모님 동반 일정 추천 숙소입니다.",
    priceFromKrw: 360000,
    perks: ["프라이빗 풀", "공항 픽업 옵션", "허니문 세팅"],
    imageUrl: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "guam-family-resort",
    name: "괌 패밀리 베이 리조트",
    destination: "괌",
    grade: "4성급",
    summary: "렌터카 여행과 쇼핑 동선이 편한 입지로 아이 동반 고객에게 안정적인 선택입니다.",
    priceFromKrw: 210000,
    perks: ["패밀리룸", "주차 편리", "쇼핑센터 인접"],
    imageUrl: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "dubai-luxury-tower",
    name: "두바이 럭셔리 타워 호텔",
    destination: "두바이",
    grade: "럭셔리",
    summary: "도심 전망과 사막 사파리 픽업 동선이 좋은 프리미엄 스톱오버 호텔입니다.",
    priceFromKrw: 420000,
    perks: ["스카이라인 전망", "사막투어 연결", "클럽룸 옵션"],
    imageUrl: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "europe-boutique-stay",
    name: "유럽 부티크 시티 스테이",
    destination: "유럽",
    grade: "4성급",
    summary: "역세권과 구시가지 접근성을 우선으로 엄선한 도시별 부티크 호텔 컬렉션입니다.",
    priceFromKrw: 260000,
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
    answer: "1단계 MVP에서는 저장 기능 없이 요청 UI만 제공합니다. 이후 상담 접수, 관리자 확인, 결제 안내 흐름을 순차적으로 붙일 예정입니다.",
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
