insert into public.countries (slug, name_ko, name_en, description_ko, hero_image_url, seo_title, seo_description, sort_order)
values
  ('philippines', '필리핀', 'Philippines', '보라카이, 보홀, 세부를 중심으로 해양 액티비티와 리조트 휴양을 조합하기 좋은 목적지입니다.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', '필리핀 여행 | EXITour', '필리핀 보라카이, 보홀, 세부 프리미엄 맞춤 여행', 10),
  ('vietnam', '베트남', 'Vietnam', '다낭, 나트랑, 푸꾸옥, 하노이, 호치민 등 휴양과 도시 여행을 함께 설계하기 좋은 목적지입니다.', 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', '베트남 여행 | EXITour', '베트남 주요 도시와 리조트 맞춤 여행', 20),
  ('guam', '괌', 'Guam', '짧은 비행과 렌터카 자유 일정이 편한 아이 동반 가족 휴양지입니다.', 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80', '괌 여행 | EXITour', '괌 가족여행과 렌터카 리조트 상담', 30),
  ('dubai', '두바이', 'United Arab Emirates', '럭셔리 호텔, 사막 사파리, 쇼핑과 미식을 함께 즐기는 프리미엄 스톱오버 목적지입니다.', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80', '두바이 여행 | EXITour', '두바이 럭셔리 호텔과 사막투어 맞춤 여행', 40),
  ('kazakhstan', '카자흐스탄', 'Kazakhstan', '알마티 대자연과 도시 감각을 함께 즐기는 새로운 프리미엄 여행지입니다.', 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80', '카자흐스탄 여행 | EXITour', '알마티 자연 투어와 맞춤 여행', 50),
  ('europe', '유럽', 'Europe', '서유럽 클래식, 동유럽 소도시, 허니문 루트를 일정 밀도와 휴식 균형에 맞춰 설계합니다.', 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80', '유럽 여행 | EXITour', '유럽 허니문과 가족 기념여행 맞춤 상담', 60)
on conflict (slug) do update set
  name_ko = excluded.name_ko,
  name_en = excluded.name_en,
  description_ko = excluded.description_ko,
  hero_image_url = excluded.hero_image_url,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  sort_order = excluded.sort_order;

insert into public.cities (country_id, slug, name_ko, name_en, short_description_ko, guide_content_ko, airport_name, best_season, recommended_for, hero_image_url, seo_title, seo_description, sort_order)
values
  ((select id from public.countries where slug = 'philippines'), 'boracay', '보라카이', 'Boracay', '화이트비치와 프라이빗 호핑을 즐기는 필리핀 대표 휴양지', '화이트비치 중심의 고급 리조트, 선셋 세일링, 프라이빗 호핑을 균형 있게 즐기는 휴양지입니다.', 'Caticlan Airport / Kalibo Airport', '11월-5월', array['허니문','가족 휴양','해양 액티비티'], 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', '보라카이 여행 | EXITour', '보라카이 리조트와 호핑투어 맞춤 여행', 10),
  ((select id from public.countries where slug = 'philippines'), 'bohol', '보홀', 'Bohol', '나팔링 스노클링과 초콜릿힐을 함께 즐기는 휴양지', '알로나비치와 발리카삭 스노클링, 초콜릿힐을 함께 묶기 좋은 프라이빗 휴양 코스입니다.', 'Bohol Panglao International Airport', '12월-5월', array['스노클링','커플 여행','소규모 가족'], 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', '보홀 여행 | EXITour', '보홀 나팔링 스노클링과 가족 리조트 상담', 20),
  ((select id from public.countries where slug = 'philippines'), 'cebu', '세부', 'Cebu', '리조트, 마사지, 호핑투어가 안정적인 첫 동남아 여행지', '막탄 리조트 휴양과 해양 액티비티를 함께 구성하기 좋은 필리핀 대표 목적지입니다.', 'Mactan-Cebu International Airport', '12월-5월', array['가족 여행','리조트 휴양','첫 해외여행'], 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80', '세부 여행 | EXITour', '세부 호핑투어와 리조트 맞춤 여행', 30),
  ((select id from public.countries where slug = 'vietnam'), 'danang', '다낭', 'Da Nang', '미케비치, 호이안, 바나힐 동선이 좋은 가족 여행지', '미케비치 리조트와 호이안 야경, 바나힐까지 동선이 좋아 가족 단위 문의가 많은 지역입니다.', 'Da Nang International Airport', '2월-8월', array['가족 여행','호이안','리조트'], 'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80', '다낭 여행 | EXITour', '다낭 리조트와 공항 픽업 맞춤 여행', 10),
  ((select id from public.countries where slug = 'vietnam'), 'nhatrang', '나트랑', 'Nha Trang', '섬 리조트와 머드온천을 즐기는 베트남 휴양지', '섬 리조트, 머드온천, 해변 카페를 여유롭게 즐기는 베트남 대표 휴양지입니다.', 'Cam Ranh International Airport', '1월-8월', array['휴양','리조트','가성비 럭셔리'], 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', '나트랑 여행 | EXITour', '나트랑 리조트와 섬 투어 상담', 20),
  ((select id from public.countries where slug = 'vietnam'), 'phuquoc', '푸꾸옥', 'Phu Quoc', '선셋과 풀빌라 중심의 조용한 베트남 휴양지', '롱비치 선셋과 풀빌라 숙박, 섬 남부 케이블카 일정까지 조용한 휴양에 강합니다.', 'Phu Quoc International Airport', '11월-4월', array['풀빌라','허니문','선셋'], 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80', '푸꾸옥 여행 | EXITour', '푸꾸옥 풀빌라와 호핑투어 맞춤 여행', 30),
  ((select id from public.countries where slug = 'vietnam'), 'sapa', '사파', 'Sa Pa', '계단식 논과 판시판을 즐기는 북부 고산 여행지', '사파는 베트남 북부의 산악 풍경과 소수민족 마을을 여유 있게 연결하는 목적지입니다.', null, '3월-5월, 9월-11월', array['자연','트레킹','사진 여행'], 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80', '사파 여행 | EXITour', '사파 자연 여행과 하노이 연계 상담', 40),
  ((select id from public.countries where slug = 'vietnam'), 'hanoi', '하노이', 'Hanoi', '구시가지 미식과 하롱베이 연계가 좋은 북부 관문', '구시가지 미식, 하롱베이 크루즈, 닌빈 일일투어를 조합하기 좋은 북부 관문입니다.', 'Noi Bai International Airport', '10월-4월', array['미식','하롱베이','문화'], 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80', '하노이 여행 | EXITour', '하노이와 하롱베이 맞춤 여행', 50),
  ((select id from public.countries where slug = 'vietnam'), 'hochiminh', '호치민', 'Ho Chi Minh City', '남부 베트남 도시 여행과 메콩델타 관문', '도심 호텔, 메콩델타, 무이네 연계까지 가능한 활기 있는 남부 베트남 일정입니다.', 'Tan Son Nhat International Airport', '12월-4월', array['도시 여행','미식','근교 투어'], 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&w=1200&q=80', '호치민 여행 | EXITour', '호치민 도심과 메콩델타 맞춤 여행', 60),
  ((select id from public.countries where slug = 'vietnam'), 'dalat', '달랏', 'Da Lat', '선선한 고원 도시에서 카페와 폭포를 즐기는 일정', '선선한 고원 도시에서 카페, 폭포, 프렌치 빌라 감성을 즐기는 감각적인 일정입니다.', 'Lien Khuong Airport', '11월-3월', array['카페 여행','커플','고원 휴양'], 'https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1200&q=80', '달랏 여행 | EXITour', '달랏 카페와 고원 휴양 여행', 70),
  ((select id from public.countries where slug = 'vietnam'), 'muine', '무이네', 'Mui Ne', '사막 지프투어와 해변 리조트를 묶는 사진 여행지', '사막 지프투어와 해변 리조트를 묶어 특별한 사진과 휴식을 모두 남기는 여행지입니다.', null, '11월-4월', array['사진 여행','리조트','지프투어'], 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80', '무이네 여행 | EXITour', '무이네 사막 지프투어와 리조트 상담', 80),
  ((select id from public.countries where slug = 'guam'), 'guam', '괌', 'Guam', '렌터카와 리조트 자유 일정이 편한 가족 휴양지', '짧은 비행, 안정적인 리조트, 렌터카 자유 일정으로 아이 동반 가족에게 꾸준히 사랑받습니다.', 'Antonio B. Won Pat International Airport', '연중', array['아이 동반','렌터카','리조트'], 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1200&q=80', '괌 여행 | EXITour', '괌 가족 리조트와 렌터카 여행', 10),
  ((select id from public.countries where slug = 'dubai'), 'dubai', '두바이', 'Dubai', '럭셔리 호텔과 사막 사파리가 강한 프리미엄 목적지', '럭셔리 호텔, 사막 사파리, 몰과 미식을 한 번에 경험하는 중동 프리미엄 스톱오버입니다.', 'Dubai International Airport', '11월-3월', array['럭셔리','스톱오버','사막투어'], 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80', '두바이 여행 | EXITour', '두바이 럭셔리 호텔과 사막 사파리', 10),
  ((select id from public.countries where slug = 'kazakhstan'), 'almaty', '알마티', 'Almaty', '대자연과 도시 감각을 함께 즐기는 카자흐스탄 여행지', '알마티 대자연과 현대적인 도시 감각을 함께 즐기는 새로운 프리미엄 여행지입니다.', 'Almaty International Airport', '5월-10월', array['자연','새로운 여행지','가족'], 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80', '알마티 여행 | EXITour', '알마티 자연 투어와 맞춤 여행', 10),
  ((select id from public.countries where slug = 'europe'), 'paris', '파리', 'Paris', '허니문과 미식 여행의 클래식 도시', '파리는 유럽 허니문과 가족 기념여행의 대표 도시로 호텔 위치와 동선 설계가 중요합니다.', 'Charles de Gaulle Airport', '4월-10월, 12월', array['허니문','미식','기념여행'], 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80', '파리 여행 | EXITour', '파리 허니문과 가족 기념여행', 10),
  ((select id from public.countries where slug = 'europe'), 'rome', '로마', 'Rome', '역사와 미식을 함께 즐기는 이탈리아 대표 도시', '로마는 도보 동선과 호텔 위치에 따라 여행 피로도가 크게 달라집니다.', 'Fiumicino Airport', '4월-10월', array['문화','미식','허니문'], 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80', '로마 여행 | EXITour', '로마 문화 여행과 호텔 상담', 20),
  ((select id from public.countries where slug = 'europe'), 'interlaken', '인터라켄', 'Interlaken', '스위스 알프스 자연을 즐기는 기념여행 도시', '인터라켄은 스위스 자연과 산악 열차를 중심으로 여유로운 일정이 어울립니다.', null, '5월-10월', array['자연','가족 기념여행','허니문'], 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80', '인터라켄 여행 | EXITour', '스위스 인터라켄 자연 여행', 30),
  ((select id from public.countries where slug = 'europe'), 'frankfurt', '프랑크푸르트', 'Frankfurt', '유럽 항공 관문과 독일 소도시 연계 거점', '프랑크푸르트는 독일과 인근 유럽 도시를 연결하는 항공 관문으로 활용하기 좋습니다.', 'Frankfurt Airport', '4월-10월, 12월', array['스톱오버','소도시','가족'], 'https://images.unsplash.com/photo-1491557345352-5929e343eb89?auto=format&fit=crop&w=1200&q=80', '프랑크푸르트 여행 | EXITour', '프랑크푸르트와 독일 소도시 여행', 40)
on conflict (country_id, slug) do update set
  name_ko = excluded.name_ko,
  name_en = excluded.name_en,
  short_description_ko = excluded.short_description_ko,
  guide_content_ko = excluded.guide_content_ko,
  airport_name = excluded.airport_name,
  best_season = excluded.best_season,
  recommended_for = excluded.recommended_for,
  hero_image_url = excluded.hero_image_url,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  sort_order = excluded.sort_order;

insert into public.product_categories (slug, name_ko, description_ko, sort_order)
values
  ('airport-pickup', '공항 픽업', '공항에서 호텔까지 연결하는 도착 이동 서비스', 10),
  ('airport-dropoff', '공항 샌딩', '호텔에서 공항까지 연결하는 출국 이동 서비스', 20),
  ('rental-car', '렌터카', '자유 일정과 가족 여행을 위한 차량 대여 서비스', 30),
  ('activity', '액티비티', '현지 체험과 해양 액티비티', 40),
  ('snorkeling-diving', '스노클링/다이빙', '스노클링과 다이빙 중심 해양 상품', 50),
  ('hopping-tour', '호핑투어', '보트 기반 섬 투어 상품', 60),
  ('massage', '마사지', '스파와 마사지 예약 서비스', 70),
  ('day-tour', '일일투어', '주요 명소를 둘러보는 반일/종일 투어', 80),
  ('package', '패키지', '호텔, 차량, 투어를 조합하는 맞춤 패키지', 90),
  ('ticket', '입장권', '테마파크, 전망대, 교통 패스 등 티켓 상품', 100)
on conflict (slug) do update set
  name_ko = excluded.name_ko,
  description_ko = excluded.description_ko,
  sort_order = excluded.sort_order;

insert into public.products (
  city_id, category_id, slug, title_ko, subtitle_ko, summary_ko, description_ko, itinerary_ko,
  included_items, excluded_items, meeting_point, duration, min_people, max_people, recommended_for,
  preparation_items, caution_items, cancellation_policy_ko, hero_image_url, kakao_cta_message,
  is_featured, seo_title, seo_description, last_verified_at
)
values
  ((select c.id from public.cities c join public.countries co on co.id = c.country_id where co.slug = 'philippines' and c.slug = 'bohol'), (select id from public.product_categories where slug = 'snorkeling-diving'), 'bohol-napaling-snorkeling', '보홀 나팔링 스노클링', '정어리 떼를 만나는 보홀 반일 투어', '초보자도 도전하기 좋은 보홀 대표 스노클링 포인트를 안전하게 즐기는 반일 투어입니다.', '나팔링 포인트는 맑은 바다와 정어리 떼로 유명합니다. 현지 가이드가 수심과 조류를 확인하고 초보자도 부담 없도록 진행합니다.', '호텔 또는 미팅장소 집결 > 안전 안내 > 스노클링 > 샤워 후 복귀', array['스노클링 장비','현지 가이드','기본 안전 안내'], array['개인 경비','수중 촬영 옵션','외곽 픽업 추가비'], '알로나비치 인근 또는 호텔별 안내', '약 3시간', 1, null, array['스노클링 초보','커플','소규모 가족'], array['수영복','타월','선크림'], array['해상 상황에 따라 포인트 변경 가능','수영이 어려운 고객은 사전 상담 필요'], '이용 3일 전까지 무료 취소 가능. 이후 공급처 규정에 따라 수수료가 발생할 수 있습니다.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80', '보홀 나팔링 스노클링 날짜와 인원을 알려주세요.', true, '보홀 나팔링 스노클링 | EXITour', '보홀 나팔링 스노클링 반일 투어 상담', now()),
  ((select c.id from public.cities c join public.countries co on co.id = c.country_id where co.slug = 'philippines' and c.slug = 'boracay'), (select id from public.product_categories where slug = 'hopping-tour'), 'boracay-private-hopping-tour', '보라카이 프라이빗 호핑투어', '화이트비치 여행 중 즐기는 단독 보트 투어', '화이트비치 여행 중 하루를 여유롭게 채우는 단독 보트 기반 프리미엄 호핑투어입니다.', '보라카이 바다 컨디션에 맞춰 스노클링, 해변 정박, 선상 식사를 조합합니다.', '해변 미팅 > 보트 탑승 > 스노클링과 해변 휴식 > 식사 후 복귀', array['보트 이용','스노클링 장비','현지 스태프','기본 음료'], array['매너팁','개인 장비','프리미엄 식사 업그레이드'], '화이트비치 지정 미팅 포인트', '반일-종일', 2, null, array['가족 휴양','허니문','친구 모임'], array['모자','선크림','여벌 옷'], array['바람과 파도에 따라 운영 시간이 변경될 수 있음'], '이용 4일 전까지 무료 취소 가능. 전용 보트 확정 후 공급처 규정을 따릅니다.', 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', '보라카이 호핑투어 단독 진행 여부와 인원을 알려주세요.', true, '보라카이 프라이빗 호핑투어 | EXITour', '보라카이 단독 호핑투어 상담', now()),
  ((select c.id from public.cities c join public.countries co on co.id = c.country_id where co.slug = 'philippines' and c.slug = 'cebu'), (select id from public.product_categories where slug = 'airport-pickup'), 'cebu-mactan-airport-pickup', '세부 막탄 공항 픽업', '막탄 공항에서 리조트까지 편안한 전용차 이동', '세부 막탄 공항 도착 후 리조트까지 전용 차량으로 연결합니다.', '항공편 도착 시간을 기준으로 기사 미팅과 차량 이동을 준비합니다.', '항공편 도착 확인 > 공항 미팅 > 호텔 이동', array['전용 차량','기사','공항 미팅 안내'], array['매너팁','경유지 추가','외곽 추가비'], '막탄 공항 입국장', '편도', 1, null, array['밤 도착 항공','가족 여행','첫 세부 여행'], array['항공편 정보','호텔명'], array['수하물 수량에 따라 차량 등급 조정 필요'], '이용 2일 전까지 무료 취소 가능. 당일 취소는 제한될 수 있습니다.', null, '세부 도착 항공편과 호텔명을 알려주세요.', false, '세부 막탄 공항 픽업 | EXITour', '세부 공항 픽업 전용차 상담', now()),
  ((select c.id from public.cities c join public.countries co on co.id = c.country_id where co.slug = 'vietnam' and c.slug = 'danang'), (select id from public.product_categories where slug = 'airport-pickup'), 'danang-airport-pickup', '다낭 공항 픽업', '다낭 공항에서 호텔까지 전용차 이동', '다낭 공항 도착 후 미케비치, 시내, 호이안 호텔까지 편안하게 연결하는 전용 차량 서비스입니다.', '항공편 도착 시간을 기준으로 기사 미팅과 차량 이동을 준비합니다.', '항공편 도착 확인 > 공항 미팅 > 호텔 이동 > 로비 하차', array['전용 차량','기사','공항 미팅 안내'], array['기사 매너팁','경유지 추가','외곽 지역 추가비'], '다낭 공항 입국장', '편도', 1, null, array['밤 도착 항공','아이 동반','부모님 동반'], array['항공편 정보','호텔명','수하물 수량'], array['입국 지연 시 현지 연락 필요 가능'], '이용 2일 전까지 무료 취소 가능. 당일 취소와 노쇼는 환불이 제한될 수 있습니다.', null, '다낭 도착 항공편과 호텔 지역을 알려주세요.', true, '다낭 공항 픽업 | EXITour', '다낭 공항 픽업과 호이안 이동 상담', now()),
  ((select c.id from public.cities c join public.countries co on co.id = c.country_id where co.slug = 'vietnam' and c.slug = 'danang'), (select id from public.product_categories where slug = 'day-tour'), 'danang-ba-na-hills-day-tour', '다낭 바나힐 일일투어', '가족 여행 인기 바나힐 전용차 투어', '다낭 여행 중 바나힐을 전용차 또는 조인 투어로 다녀오는 대표 일일투어입니다.', '날씨와 대기 시간을 고려해 바나힐 체류 시간을 조정합니다.', '호텔 픽업 > 바나힐 이동 > 케이블카와 골든브릿지 > 호텔 복귀', array['차량','현지 안내','일정 조율'], array['입장권','식사','개인 경비'], '다낭 또는 호이안 호텔', '종일', 2, null, array['가족 여행','부모님 동반','사진 여행'], array['편한 신발','겉옷'], array['날씨에 따라 전망이 제한될 수 있음'], '투어별 공급처 규정에 따릅니다.', null, '바나힐 방문 날짜와 인원을 알려주세요.', true, '다낭 바나힐 일일투어 | EXITour', '다낭 바나힐 전용차 일일투어 상담', now()),
  ((select c.id from public.cities c join public.countries co on co.id = c.country_id where co.slug = 'vietnam' and c.slug = 'phuquoc'), (select id from public.product_categories where slug = 'hopping-tour'), 'phu-quoc-south-island-hopping', '푸꾸옥 남부섬 호핑투어', '푸꾸옥 남부 바다와 케이블카를 즐기는 일정', '푸꾸옥 남부 섬과 스노클링 포인트를 연결하는 해양 투어입니다.', '남부 섬 투어와 선셋타운 또는 케이블카 일정을 조합할 수 있습니다.', '호텔 픽업 > 항구 이동 > 스노클링 > 남부 명소 연계 > 복귀', array['현지 투어','스노클링 장비','기본 안내'], array['개인 경비','프리미엄 식사','외곽 픽업'], '푸꾸옥 호텔별 픽업', '반일-종일', 2, null, array['허니문','커플','휴양 여행'], array['수영복','타월'], array['해상 상황에 따라 일정 변경 가능'], '이용 3일 전까지 무료 취소 가능. 이후 공급처 규정을 따릅니다.', null, '푸꾸옥 숙소 위치와 희망 일정을 알려주세요.', false, '푸꾸옥 남부섬 호핑투어 | EXITour', '푸꾸옥 호핑투어와 선셋 일정 상담', now()),
  ((select c.id from public.cities c join public.countries co on co.id = c.country_id where co.slug = 'dubai' and c.slug = 'dubai'), (select id from public.product_categories where slug = 'activity'), 'dubai-desert-safari', '두바이 사막 사파리', '두바이 대표 사막 체험 액티비티', '도심 호텔에서 출발해 사막 드라이브와 캠프 체험을 즐기는 두바이 대표 상품입니다.', '차량 픽업과 사막 캠프 체험을 조합해 프리미엄 스톱오버에 어울리는 일정으로 구성합니다.', '호텔 픽업 > 사막 이동 > 듄 드라이브 > 캠프 체험 > 호텔 복귀', array['차량 픽업','사막 사파리','캠프 체험'], array['개인 경비','프리미엄 좌석','특별 식음료'], '두바이 시내 호텔', '약 6시간', 2, null, array['럭셔리 여행','스톱오버','커플'], array['편한 복장','선글라스'], array['차량 멀미가 있으면 사전 상담 필요'], '이용 3일 전까지 무료 취소 가능. 이후 공급처 규정을 따릅니다.', null, '두바이 호텔명과 희망 날짜를 알려주세요.', true, '두바이 사막 사파리 | EXITour', '두바이 사막 사파리 프리미엄 상담', now()),
  ((select c.id from public.cities c join public.countries co on co.id = c.country_id where co.slug = 'kazakhstan' and c.slug = 'almaty'), (select id from public.product_categories where slug = 'day-tour'), 'almaty-altyn-emel-day-trip', '알마티 알틴에멜 일일투어', '카자흐스탄 대자연을 만나는 전용차 투어', '알마티 근교 자연 명소를 전용차로 둘러보는 장거리 일일투어입니다.', '차량 이동 시간이 길어 여유 있는 일정과 휴식 포인트가 중요합니다.', '호텔 픽업 > 자연 명소 이동 > 현지 식사 > 알마티 복귀', array['전용 차량','현지 기사','기본 일정 설계'], array['식사','입장료','개인 경비'], '알마티 시내 호텔', '종일', 2, null, array['자연 여행','사진 여행','가족'], array['겉옷','간식','보조 배터리'], array['차량 이동 시간이 길어 컨디션 확인 필요'], '투어 확정 후 공급처 규정을 따릅니다.', null, '알마티 여행일과 동행자 구성을 알려주세요.', false, '알마티 알틴에멜 일일투어 | EXITour', '카자흐스탄 알마티 자연 투어 상담', now())
on conflict (slug) do update set
  city_id = excluded.city_id,
  category_id = excluded.category_id,
  title_ko = excluded.title_ko,
  subtitle_ko = excluded.subtitle_ko,
  summary_ko = excluded.summary_ko,
  description_ko = excluded.description_ko,
  itinerary_ko = excluded.itinerary_ko,
  included_items = excluded.included_items,
  excluded_items = excluded.excluded_items,
  meeting_point = excluded.meeting_point,
  duration = excluded.duration,
  min_people = excluded.min_people,
  max_people = excluded.max_people,
  recommended_for = excluded.recommended_for,
  preparation_items = excluded.preparation_items,
  caution_items = excluded.caution_items,
  cancellation_policy_ko = excluded.cancellation_policy_ko,
  hero_image_url = excluded.hero_image_url,
  kakao_cta_message = excluded.kakao_cta_message,
  is_featured = excluded.is_featured,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  last_verified_at = excluded.last_verified_at;

insert into public.product_rates (
  product_id, season_name, valid_from, valid_to, currency, base_cost, adult_price, child_price, infant_price,
  exchange_rate, margin_rate, fixed_fee_krw, calculated_price_krw, display_price_krw, price_note_ko, approval_status
)
select p.id, v.season_name, date '2026-04-01', date '2026-06-30', v.currency, v.base_cost, v.adult_price, v.child_price, v.infant_price,
  v.exchange_rate, v.margin_rate, v.fixed_fee_krw, v.calculated_price_krw, v.display_price_krw,
  '2026 Q2 샘플 요금이며 실제 운영 전 확인 필요', 'approved'
from (
  values
    ('bohol-napaling-snorkeling', '2026 Q2 샘플', 'PHP', 1700.00, 59000.00, 49000.00, 0.00, 24.5000, 0.1800, 5000, 58000, 59000),
    ('boracay-private-hopping-tour', '2026 Q2 샘플', 'PHP', 4200.00, 129000.00, 99000.00, 0.00, 24.5000, 0.2200, 10000, 126000, 129000),
    ('cebu-mactan-airport-pickup', '2026 Q2 샘플', 'PHP', 1400.00, 45000.00, 45000.00, 0.00, 24.5000, 0.1500, 5000, 44500, 45000),
    ('danang-airport-pickup', '2026 Q2 샘플', 'USD', 18.00, 35000.00, 35000.00, 0.00, 1370.0000, 0.1800, 5000, 34100, 35000),
    ('danang-ba-na-hills-day-tour', '2026 Q2 샘플', 'USD', 58.00, 109000.00, 89000.00, 0.00, 1370.0000, 0.2200, 10000, 107000, 109000),
    ('phu-quoc-south-island-hopping', '2026 Q2 샘플', 'USD', 52.00, 99000.00, 79000.00, 0.00, 1370.0000, 0.2200, 10000, 97000, 99000),
    ('dubai-desert-safari', '2026 Q2 샘플', 'USD', 70.00, 149000.00, 119000.00, 0.00, 1370.0000, 0.2500, 15000, 145000, 149000),
    ('almaty-altyn-emel-day-trip', '2026 Q2 샘플', 'USD', 95.00, 189000.00, 169000.00, 0.00, 1370.0000, 0.2400, 20000, 186000, 189000)
) as v(slug, season_name, currency, base_cost, adult_price, child_price, infant_price, exchange_rate, margin_rate, fixed_fee_krw, calculated_price_krw, display_price_krw)
join public.products p on p.slug = v.slug
where not exists (
  select 1 from public.product_rates pr
  where pr.product_id = p.id and pr.season_name = v.season_name and pr.valid_from = date '2026-04-01' and pr.valid_to = date '2026-06-30'
);

insert into public.hotels (
  city_id, slug, name_ko, name_en, star_rating, hotel_type, summary_ko, description_ko, address,
  hero_image_url, gallery_urls, amenities, recommended_for, nearby_attractions, is_luxury, is_contract,
  is_family_friendly, seo_title, seo_description
)
values
  ((select c.id from public.cities c join public.countries co on co.id = c.country_id where co.slug = 'philippines' and c.slug = 'boracay'), 'boracay-luxury-beach-resort', '보라카이 럭셔리 비치 리조트', 'Boracay Luxury Beach Resort', 5.0, 'beach_resort', '화이트비치 접근성과 프리미엄 객실 컨디션을 함께 갖춘 보라카이 대표 리조트 특가입니다.', '허니문과 커플 여행에 어울리는 비치 리조트입니다.', 'Boracay Island, Philippines', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80', array['https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80'], array['수영장','비치 접근','스파','레스토랑'], array['허니문','커플','조용한 가족 휴양'], array['화이트비치','디몰','푸카쉘 비치'], true, true, false, '보라카이 럭셔리 비치 리조트 | EXITour', '보라카이 계약 특가 리조트 상담'),
  ((select c.id from public.cities c join public.countries co on co.id = c.country_id where co.slug = 'philippines' and c.slug = 'bohol'), 'bohol-family-resort', '보홀 패밀리 리조트', 'Bohol Family Resort', 5.0, 'family_resort', '알로나비치와 주요 해양 투어 동선이 좋아 아이 동반 가족에게 안정적인 리조트입니다.', '보홀 가족 여행과 스노클링 일정에 어울리는 리조트입니다.', 'Panglao, Bohol, Philippines', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', array['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'], array['키즈풀','조식','투어 픽업','패밀리룸'], array['아이 동반','소규모 가족','스노클링 여행'], array['알로나비치','나팔링 포인트','초콜릿힐'], false, true, true, '보홀 패밀리 리조트 | EXITour', '보홀 가족 리조트 계약 특가 상담'),
  ((select c.id from public.cities c join public.countries co on co.id = c.country_id where co.slug = 'vietnam' and c.slug = 'danang'), 'danang-beachfront-hotel', '다낭 비치프론트 호텔', 'Da Nang Beachfront Hotel', 5.0, 'beachfront_hotel', '미케비치 앞 입지와 넓은 객실 타입으로 3대 가족 여행에 잘 맞는 호텔입니다.', '다낭 미케비치와 호이안 연계 일정에 좋은 호텔입니다.', 'My Khe Beach, Da Nang, Vietnam', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80', array['https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80'], array['오션뷰','키즈풀','조식','피트니스'], array['가족 여행','부모님 동반','호이안 연계'], array['미케비치','호이안','바나힐','한시장'], false, true, true, '다낭 비치프론트 호텔 | EXITour', '다낭 미케비치 호텔 특가 상담'),
  ((select c.id from public.cities c join public.countries co on co.id = c.country_id where co.slug = 'vietnam' and c.slug = 'phuquoc'), 'phu-quoc-pool-villa-resort', '푸꾸옥 풀빌라 리조트', 'Phu Quoc Pool Villa Resort', 5.0, 'pool_villa', '프라이빗 풀과 선셋 비치 접근성을 갖춘 허니문 추천 숙소입니다.', '조용한 휴양과 허니문 세팅에 어울리는 풀빌라 리조트입니다.', 'Phu Quoc, Vietnam', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80', array['https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1200&q=80'], array['프라이빗 풀','조식','공항 픽업','스파'], array['허니문','부모님 동반','조용한 휴양'], array['롱비치','선셋타운','혼똔섬 케이블카'], true, true, false, '푸꾸옥 풀빌라 리조트 | EXITour', '푸꾸옥 풀빌라와 허니문 특가 상담'),
  ((select c.id from public.cities c join public.countries co on co.id = c.country_id where co.slug = 'dubai' and c.slug = 'dubai'), 'dubai-downtown-luxury-hotel', '두바이 다운타운 럭셔리 호텔', 'Dubai Downtown Luxury Hotel', 5.0, 'luxury_city_hotel', '도심 전망과 사막 사파리 픽업 동선이 좋은 프리미엄 스톱오버 호텔입니다.', '두바이몰과 부르즈 칼리파 접근성이 좋은 럭셔리 호텔입니다.', 'Downtown Dubai, UAE', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80', array['https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80'], array['스카이라인 전망','클럽룸','조식','수영장'], array['허니문','럭셔리 여행','스톱오버'], array['두바이몰','부르즈 칼리파','마리나'], true, true, false, '두바이 다운타운 럭셔리 호텔 | EXITour', '두바이 럭셔리 호텔과 사막투어 상담')
on conflict (slug) do update set
  city_id = excluded.city_id,
  name_ko = excluded.name_ko,
  name_en = excluded.name_en,
  star_rating = excluded.star_rating,
  hotel_type = excluded.hotel_type,
  summary_ko = excluded.summary_ko,
  description_ko = excluded.description_ko,
  address = excluded.address,
  hero_image_url = excluded.hero_image_url,
  gallery_urls = excluded.gallery_urls,
  amenities = excluded.amenities,
  recommended_for = excluded.recommended_for,
  nearby_attractions = excluded.nearby_attractions,
  is_luxury = excluded.is_luxury,
  is_contract = excluded.is_contract,
  is_family_friendly = excluded.is_family_friendly,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description;

insert into public.hotel_rooms (hotel_id, room_type_ko, room_type_en, max_occupancy, bed_type, breakfast_included, room_description_ko)
select h.id, v.room_type_ko, v.room_type_en, v.max_occupancy, v.bed_type, v.breakfast_included, v.room_description_ko
from (
  values
    ('boracay-luxury-beach-resort', '디럭스룸', 'Deluxe Room', 2, 'King or Twin', true, '커플과 허니문 고객에게 적합한 기본 객실입니다.'),
    ('boracay-luxury-beach-resort', '오션뷰 스위트', 'Ocean View Suite', 3, 'King', true, '화이트비치 전망을 선호하는 고객에게 추천합니다.'),
    ('bohol-family-resort', '패밀리룸', 'Family Room', 4, 'Twin + Extra Bed', true, '아이 동반 가족에게 적합한 넓은 객실입니다.'),
    ('danang-beachfront-hotel', '패밀리 스위트', 'Family Suite', 4, 'King + Twin', true, '3대 가족 또는 아이 동반 고객에게 추천합니다.'),
    ('phu-quoc-pool-villa-resort', '원베드 풀빌라', 'One Bedroom Pool Villa', 2, 'King', true, '프라이빗 풀을 갖춘 허니문 추천 객실입니다.'),
    ('dubai-downtown-luxury-hotel', '스카이라인뷰룸', 'Skyline View Room', 2, 'King', true, '두바이 도심 전망을 즐길 수 있는 객실입니다.')
) as v(hotel_slug, room_type_ko, room_type_en, max_occupancy, bed_type, breakfast_included, room_description_ko)
join public.hotels h on h.slug = v.hotel_slug
where not exists (
  select 1 from public.hotel_rooms hr
  where hr.hotel_id = h.id and hr.room_type_ko = v.room_type_ko
);

insert into public.hotel_rates (
  hotel_id, room_id, season_name, valid_from, valid_to, currency, contract_rate, exchange_rate,
  margin_rate, display_price_krw, cancellation_policy_ko, inventory_status, approval_status
)
select h.id, hr.id, '2026 Q2 샘플', date '2026-04-01', date '2026-06-30', v.currency, v.contract_rate,
  v.exchange_rate, v.margin_rate, v.display_price_krw,
  '2026 Q2 샘플 요금이며 실제 운영 전 확인 필요. 객실별 취소 규정은 예약 확정 전 재확인합니다.',
  'on_request', 'approved'
from (
  values
    ('boracay-luxury-beach-resort', '디럭스룸', 'PHP', 8200.00, 24.5000, 0.2200, 280000),
    ('boracay-luxury-beach-resort', '오션뷰 스위트', 'PHP', 11800.00, 24.5000, 0.2400, 410000),
    ('bohol-family-resort', '패밀리룸', 'PHP', 7600.00, 24.5000, 0.2200, 240000),
    ('danang-beachfront-hotel', '패밀리 스위트', 'USD', 95.00, 1370.0000, 0.2500, 180000),
    ('phu-quoc-pool-villa-resort', '원베드 풀빌라', 'USD', 190.00, 1370.0000, 0.2600, 360000),
    ('dubai-downtown-luxury-hotel', '스카이라인뷰룸', 'USD', 245.00, 1370.0000, 0.2500, 420000)
) as v(hotel_slug, room_type_ko, currency, contract_rate, exchange_rate, margin_rate, display_price_krw)
join public.hotels h on h.slug = v.hotel_slug
join public.hotel_rooms hr on hr.hotel_id = h.id and hr.room_type_ko = v.room_type_ko
where not exists (
  select 1 from public.hotel_rates rate
  where rate.hotel_id = h.id and rate.room_id = hr.id and rate.season_name = '2026 Q2 샘플'
);

insert into public.faqs (target_type, target_id, question_ko, answer_ko, sort_order)
values
  ('home', null, 'EXITour는 패키지 여행사인가요?', '정해진 일정만 판매하기보다 고객의 항공, 예산, 동행자, 여행 목적에 맞춰 호텔과 현지 서비스를 조합하는 맞춤 여행사입니다.', 10),
  ('home', null, '견적 요청 후 실제 예약은 어떻게 진행되나요?', '현재는 견적 요청 UI를 기준으로 상담 흐름을 준비하는 단계입니다. 이후 저장, 관리자 확인, 결제 안내를 순차적으로 붙일 예정입니다.', 20),
  ('custom_package', null, '항공권을 이미 구매했어도 가능한가요?', '가능합니다. 항공 시간에 맞춰 호텔과 현지 일정을 구성합니다.', 30)
on conflict do nothing;

insert into public.reviews (target_type, target_id, customer_name, rating, review_text_ko, travel_date)
values
  ('product', (select id from public.products where slug = 'bohol-napaling-snorkeling'), '김OO', 5, '아이와 함께 처음 스노클링을 했는데 일정이 무리 없이 진행되어 좋았습니다.', date '2026-04-12'),
  ('hotel', (select id from public.hotels where slug = 'danang-beachfront-hotel'), '박OO', 5, '부모님 동반이라 동선이 걱정됐는데 해변과 차량 이동이 편했습니다.', date '2026-05-03')
on conflict do nothing;

insert into public.external_providers (slug, name, provider_type, is_active, config_public)
values
  ('manual-hotel-contracts', 'Manual Hotel Contracts', 'hotel', false, '{"note":"수동 계약 호텔 관리용 placeholder"}'::jsonb),
  ('manual-activity-contracts', 'Manual Activity Contracts', 'activity', false, '{"note":"수동 액티비티 공급처 관리용 placeholder"}'::jsonb)
on conflict (slug) do update set
  name = excluded.name,
  provider_type = excluded.provider_type,
  is_active = excluded.is_active,
  config_public = excluded.config_public;
