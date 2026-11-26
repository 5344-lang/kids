/* ============================================================
   똑심마인드 키즈 — 설정 파일
   링크와 가격은 이 파일만 고치면 사이트 전체에 반영됩니다.
   ============================================================ */
const KIDS_CONFIG = {
  contactUrl: 'https://kmong.com/gig/766983',   // 상담 신청 링크 (키즈 전용 크몽 상품이 생기면 바꿔 주세요)
  surveyUrl:  '',                                // 구글 설문지 링크 (비워 두면 상담 신청 링크로 연결)
  mainSite:   'https://5344-lang.github.io/page/',
  area:       '대구',                            // 방문 가능 지역

  // 온라인 체크 = 기본료(사전 설문·전화 상담·해석지) + 고른 검사 가격의 합
  onlineBase: 19000,
  // 방문형 고정 가격 (검사 포함 개수 안에서는 추가 요금 없음)
  visit: {
    basic: { price: 99000,  tests: 2 },
    full:  { price: 149000, tests: 4 },
  },

  // 온라인으로 실시하는 검사 (부모님 응답형 또는 아이 응답형)
  // grades: pre 입학 전 / low 1~2학년 / mid 3학년 / high 4~6학년 / ms 중학생
  tests: {
    sts:   { name: 'STS 6요인 기질검사',       price: 12000, grades: ['pre','low','mid','high','ms'], who: '부모님 응답 (4학년부터 아이 응답 가능)', desc: '타고난 반응 방식(활동성, 조심성, 감정, 스스로 조절하는 힘)을 봅니다.' },
    esra:  { name: 'ESRA 초등학교 준비도검사', price: 14000, grades: ['pre'],                       who: '부모님 응답',                  desc: '입학을 앞두고 인지·언어, 문해, 사회정서 준비가 얼마나 되었는지 봅니다.' },
    pat:   { name: 'PAT-2 부모양육태도검사',   price: 15000, grades: ['pre','low','mid','high','ms'], who: '부모님 응답',                  desc: '아이를 대하는 양육 방식을 점검합니다.' },
    kbasc: { name: 'K·BASC-3 정서·행동 (부모보고)', price: 15000, grades: ['pre','low','mid','high'], who: '부모님 응답',                desc: '집중, 감정, 적응 기술을 폭넓게 살펴봅니다.' },
    rs:    { name: 'RS 회복탄력성검사',        price: 12000, grades: ['low','mid','high','ms'],       who: '아이 응답',                    desc: '속상한 일을 겪은 뒤 다시 일어서는 힘을 봅니다.' },
    kics:  { name: 'KICS 진로성격강점검사',    price: 14000, grades: ['low','mid','high'],            who: '아이 응답 (2학년부터)',         desc: '아이가 가진 성격 강점을 찾아봅니다.' },
    amt:   { name: 'AMT 학업동기검사',         price:  9000, grades: ['mid','high','ms'],             who: '아이 응답',                    desc: '공부를 하려는 마음과 자신감을 봅니다.' },
    mlst:  { name: 'MLST-II 학습전략검사',     price: 14000, grades: ['high','ms'],                   who: '아이 응답 (4학년부터)',         desc: '시간관리, 집중, 읽기·기억 전략 같은 공부 습관을 봅니다.' },
    blct:  { name: 'BLCT 기초학습역량검사',    price: 14000, grades: ['high','ms'],                   who: '아이 응답 (4학년부터)',         desc: '언어, 논리, 수학, 공간 영역의 강점을 봅니다.' },
  },
  // 학년별 추천 (온라인 계산기에서 미리 체크되는 검사)
  recommend: {
    pre:  ['sts','esra'],
    low:  ['sts','pat'],
    mid:  ['sts','pat'],
    high: ['mlst','sts'],
    ms:   ['mlst','sts'],
  },
};
