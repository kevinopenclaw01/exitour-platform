// 행선지별 도착 공항 IATA 코드. 실제 공항이 있는 곳만 적는다(무이네·유럽처럼 공항이 하나로 정해지지 않으면 비워 둔다).
export const airportCodes: Record<string, { code: string; airport: string }> = {
  danang: { code: "DAD", airport: "다낭 국제공항" },
  bohol: { code: "TAG", airport: "보홀 팡라오 국제공항" },
  boracay: { code: "MPH", airport: "카티클란 공항" },
  cebu: { code: "CEB", airport: "막탄 세부 국제공항" },
  guam: { code: "GUM", airport: "괌 국제공항" },
  "nha-trang": { code: "CXR", airport: "깜라인 국제공항" },
  "phu-quoc": { code: "PQC", airport: "푸꾸옥 국제공항" },
  hanoi: { code: "HAN", airport: "노이바이 국제공항" },
  sapa: { code: "HAN", airport: "노이바이 국제공항(하노이)" },
  "ho-chi-minh": { code: "SGN", airport: "떤선녓 국제공항" },
  "da-lat": { code: "DLI", airport: "리엔크엉 공항" },
  dubai: { code: "DXB", airport: "두바이 국제공항" },
  kazakhstan: { code: "ALA", airport: "알마티 국제공항" },
};

export const getAirportCode = (id: string) => airportCodes[id];
