/* ============================================================
   똑심마인드 키즈 — 설정 파일
   가격·검사·샘플 링크는 이 파일만 고치면 사이트 전체에 반영됩니다.
   ============================================================ */
const S = 'https://ssproxy.ucloudbiz.olleh.com/v1/AUTH_be6ec959-1c37-4a8c-948a-ef2ae7ddfb1a/';

const KIDS_CONFIG = {
  contactUrl: 'https://kmong.com/gig/766983',   // 크몽 상품 링크 (키즈 전용 상품이 생기면 바꿔 주세요)
  surveyUrl:  'https://forms.gle/eHh23PuRUgN7V9HT7',
  mainSite:   'https://5344-lang.github.io/page/',

  // 학년 구분
  grades: {
    pre:  { label: '입학 전',   sub: '만 5~7세',   icon: '🐣' },
    low:  { label: '초등 1~2학년', sub: '저학년',   icon: '🎒' },
    mid:  { label: '초등 3학년', sub: '중간 학년', icon: '✏️' },
    high: { label: '초등 4~6학년', sub: '고학년',   icon: '📚' },
    ms:   { label: '중학생',     sub: '',          icon: '🧭' },
    hs:   { label: '고등학생',   sub: '',          icon: '🎓' },
  },

  // 패키지
  packages: {
    basic: {
      name: '온라인 기본', price: 45000, short: '기본',
      title: '우리 아이 공부 성향 리포트',
      tag: '처음 점검하는 분께',
      items: ['STS 6요인 기질검사', '학년별 학습 검사 1개', '공부 성향 리포트 PDF (강점 · 공부 방법 · 4주 학습 가이드)', 'SCT 문장완성검사 (3학년 이상, 후기 작성 시 무료)'],
    },
    deep: {
      name: '온라인 심화', price: 79000, short: '심화',
      title: '맞춤 공부 · 학원 로드맵',
      tag: '가장 많이 찾는',
      items: ['JTCI 기질 및 성격검사 + 상세 해석보고서', '학년별 학습 검사 1개', '추가 검사 1개 무료 선택', '공부·학원 로드맵 리포트 PDF (학원·과외 고르는 기준, 수업 방식, 문제집·과제 분량)', '크몽 메시지 Q&A (리포트 받은 뒤 7일)', 'SCT 문장완성검사 (3학년 이상, 후기 작성 시 무료)'],
    },
    premium: {
      name: '온라인 프리미엄', price: 109000, short: '프리미엄',
      title: '로드맵 + 진로 + 고민 해결',
      tag: '진로까지 한 번에',
      items: ['심화 패키지 전체', '진로 옵션 1개 포함 (KICS-L 또는 홀랜드)', '심층 고민 3개 답변 (해석지에 따로 정리)', '진로 방향 1쪽 추가', '크몽 메시지 Q&A (리포트 받은 뒤 14일)'],
    },
  },

  // 결과지 분석만 (이미 받은 결과지)
  analysis: {
    packages: [
      { name: '기본', title: '결과지 1종 쉬운 해석', price: 29000, items: ['결과지 1종을 쉬운 말로 풀이', '강점과 지치기 쉬운 지점', '집에서 해 볼 공부 방법 3가지'] },
      { name: '통합', title: '결과지 2~3종 통합 해석', price: 49000, items: ['결과지 2~3종을 엮어 하나의 그림으로', '검사끼리 맞는 부분과 다른 부분 설명', '4주 학습 가이드'], best: true },
      { name: '로드맵', title: '통합 해석 + 공부·학원 로드맵', price: 79000, items: ['통합 해석 전체', '공부·학원 로드맵 (학원·과외 고르는 기준, 수업 방식, 문제집·과제 분량)', '크몽 메시지 Q&A (리포트 받은 뒤 7일)'] },
    ],
    accepted: [
      ['K-WISC-V 웩슬러 지능검사', '지표별 강점·약점과 학습 방법 (교육적 활용 관점)'],
      ['TCI · JTCI 기질 및 성격검사', '타고난 기질과 성격'],
      ['STS 6요인 기질검사', '기질 6요인'],
      ['MLST-II 학습전략검사', '공부 동기·습관·전략'],
      ['AMT 학업동기검사', '학업 자신감과 실패내성'],
      ['RS 회복탄력성 검사', '다시 일어서는 힘'],
      ['PAT-2 부모양육태도검사', '양육·지도 방식'],
      ['Holland 홀랜드 진로검사', '흥미 유형과 진로 방향'],
      ['SCT 문장완성검사', '아이가 쓴 문장 속 생각'],
    ],
  },

  // 학원·공부방·과외 선생님용 (학업만)
  teacherPkg: {
    name: '선생님용 학습 점검', price: 25000, short: '선생님용',
    tag: '학원·공부방·과외 선생님',
    items: ['학년별 학습 검사 1개', '학생별 해석지 (핵심 2쪽)', '수업에서 바로 쓰는 지도 포인트', '반 전체 요약표 (5명 이상)'],
  },

  // 학년별로 패키지에 들어가는 학습 검사
  gradeTest: { pre: 'esra', low: 'pat', mid: 'amt', high: 'mlst', ms: 'mlst', hs: 'mlst' },
  // 학원·선생님용: 학업 검사만 (기질·정서 검사 없음)
  teacherGradeTest: { pre: 'esra', low: 'amt', mid: 'amt', high: 'mlst', ms: 'mlst', hs: 'mlst' },

  // 단체 구매 (학원·공부방·과외 선생님)
  group: { min: 5, rate: 10, quoteFrom: 20 },

  // kind: core 패키지 기본 / add 추가 검사 / career 진로 옵션 / free 무료
  tests: {
    jtci: {
      name: 'JTCI 기질 및 성격검사', short: 'JTCI', kind: 'core', price: null,
      en: 'Junior Temperament and Character Inventory',
      grades: ['pre','low','mid','high','ms','hs'],
      target: '유아용 만 3~6세 · 아동용 만 7~11세 · 청소년용 만 12~18세',
      who: '유아·아동용은 보호자, 청소년용은 학생 본인',
      time: '약 15~20분',
      what: ['기질: 자극추구, 위험회피, 사회적 민감성, 인내력', '성격: 자율성, 연대감, 자기초월'],
      desc: '타고난 반응 방식(기질)과 자라면서 다듬어지는 성격을 함께 봅니다. 아이가 어떤 상황에서 힘을 내고, 어떤 상황에서 쉽게 지치는지 이해하는 데 가장 기본이 되는 검사예요.',
      forWho: ['아이 성향을 깊이 이해하고 싶을 때', '형제·남매가 너무 달라서 대하는 법이 고민일 때', '칭찬·훈육 방법을 아이에게 맞추고 싶을 때'],
      samples: [['유아용 샘플','samples/jtci-preschool.pdf'],['아동용 샘플','samples/jtci-child.pdf'],['청소년용 샘플','samples/jtci-teen.pdf']],
      note: '온라인 심화 패키지에 포함되며, 상세 해석보고서가 함께 나옵니다.',
    },
    sts: {
      name: 'STS 6요인 기질검사', short: 'STS', kind: 'core', price: null,
      en: 'Six-factor Temperament Scale',
      grades: ['pre','low','mid','high','ms','hs'],
      target: '유아용 36~72개월 · 아동용 · 청소년용(중·고등학생)',
      who: '유아·아동용은 보호자, 청소년용은 학생 본인',
      time: '약 10~15분',
      what: ['활동성', '조심성', '긍정정서', '부정정서', '사회적 민감성', '의도적 조절'],
      desc: '여섯 가지 기질 요인으로 아이의 타고난 반응 경향을 봅니다. 문항이 짧아 부담 없이 시작하기 좋아요.',
      forWho: ['처음으로 아이 성향을 점검해 보고 싶을 때', '집중·감정 조절의 바탕이 궁금할 때'],
      samples: [['영아용 샘플', S+'resultSample/STS_CO_PG_I_Sample.pdf'],['유아용 샘플', S+'resultSample/STS_CO_PG_T_Sample.pdf']],
      note: '온라인 기본 패키지에 포함됩니다.',
    },
    esra: {
      name: 'ESRA 초등학교 준비도 검사', short: 'ESRA', kind: 'grade', price: 14000,
      en: 'Elementary School Readiness Assessment',
      grades: ['pre'],
      target: '만 5세 이상 미취학 아동', who: '보호자', time: '약 15~20분',
      what: ['인지', '언어·문해', '수리', '사회정서'],
      desc: '초등학교 입학을 앞두고 학습과 학교생활에 필요한 준비가 어느 정도 되어 있는지 봅니다. 부족한 영역은 입학 전에 집에서 채울 활동으로 연결해 드려요.',
      forWho: ['입학 전 무엇을 준비해야 할지 막막할 때', '또래보다 늦은 것 같아 걱정될 때'],
      samples: [['부모보고 샘플', S+'resultSample/ESRA_sample(%EB%B6%80%EB%AA%A8%EB%B3%B4%EA%B3%A0)_20250216103034.pdf']],
      note: '입학 전 아이의 패키지 학습 검사입니다.',
    },
    pat: {
      name: 'PAT-2 부모양육태도검사', short: 'PAT-2', kind: 'add', price: 15000, parentOnly: true,
      en: 'Parenting Attitude Test-2nd Edition',
      grades: ['pre','low','mid','high','ms','hs'],
      target: '부모용: 만 0세 이상 자녀의 부모 · 자녀용: 만 7세 이상', who: '보호자 (자녀용은 아이 본인)', time: '약 20분 · 43문항',
      what: ['지지표현', '합리적 설명', '성취압력', '간섭', '처벌', '감독', '과잉기대', '비일관성'],
      desc: '아이를 대하는 나의 양육·지도 방식을 점검합니다. 저학년의 공부 습관은 부모님이 어떻게 지도하느냐에 크게 좌우되기 때문에, 1~2학년은 이 검사를 패키지 학습 검사로 씁니다.',
      forWho: ['숙제 시간마다 아이와 부딪힐 때', '내 지도 방식이 아이에게 맞는지 궁금할 때'],
      samples: [['부모용 샘플', S+'mailImg/inpsyt-img/download/2025/250318%20PAT-2%20%EB%B6%80%EB%AA%A8%EC%9A%A9%20%EC%83%98%ED%94%8C.pdf'],['자녀용 샘플', S+'mailImg/inpsyt-img/download/2025/250318%20PAT-2%20%EC%9E%90%EB%85%80%EC%9A%A9%20%EC%83%98%ED%94%8C.pdf']],
      note: '보호자 구매에서 초등 1~2학년은 패키지에 포함, 다른 학년은 추가 검사로 고를 수 있어요. 학원·선생님 구매에는 포함되지 않습니다.',
    },
    amt: {
      name: 'AMT 학업동기검사', short: 'AMT', kind: 'grade', price: 9000,
      en: 'Academic Motivation Test',
      grades: ['low','mid'],
      target: '초등학생~', who: '학생 본인 (저학년은 읽어 줘도 됩니다)', time: '약 10~20분 · 44문항',
      what: ['학업적 자기효능감: 자신감, 자기조절 효능감, 과제 수준 선호', '학업적 실패내성: 감정, 행동, 과제 난이도 선호'],
      desc: '공부에 대한 자신감과, 틀리거나 실패했을 때 다시 해 보려는 힘을 봅니다. 학습전략검사(MLST-II)를 받기 전인 3학년에게 맞는 검사예요.',
      forWho: ['"난 못해"라는 말을 자주 할 때', '어려운 문제를 만나면 금방 포기할 때'],
      samples: [['결과지 샘플', S+'resultSample/AMT_CO_SG.pdf']],
      note: '보호자 구매는 초등 3학년, 선생님용은 초등 1~3학년의 학습 검사입니다. 4학년부터는 같은 내용을 MLST-II가 더 자세히 다룹니다.',
    },
    mlst: {
      name: 'MLST-II 학습전략검사', short: 'MLST-II', kind: 'grade', price: 14000,
      en: 'Multi-dimensional Learning Strategy Test-2nd Edition',
      grades: ['high','ms','hs'],
      target: '초등 4~6학년 · 중·고등학생', who: '학생 본인', time: '초등용 약 40분(115문항) · 청소년용 약 45분(185문항)',
      what: ['성격 특성: 효능감, 결과기대, 성실성', '동기 특성: 학습, 경쟁, 회피', '정서 특성: 우울, 불안, 짜증', '행동 특성: 시간관리, 수업듣기, 노트필기, 공부환경, 집중, 읽기, 기억, 시험 전략', '자기주도 학습지수(LQ)'],
      desc: '공부하는 습관과 방법을 성격·동기·정서·행동 네 방향에서 봅니다. 열심히 하는데 성적이 안 오르는 이유를 찾을 때 가장 많이 쓰는 검사예요.',
      forWho: ['책상에 오래 앉아 있는데 성과가 없을 때', '자기주도 학습 습관을 잡아 주고 싶을 때', '학원·과외에서 학생 지도 방향을 잡을 때'],
      samples: [['초등용 샘플', S+'resultSample/MLST2_CO_SG_E.pdf'],['청소년용 샘플', S+'resultSample/MLST2_CO_SG_A.pdf']],
      note: '초등 4학년 이상의 패키지 학습 검사입니다.',
    },
    rs: {
      name: 'RS 회복탄력성 검사', short: 'RS', kind: 'add', price: 12000,
      en: 'Resilience Scale',
      grades: ['low','mid','high','ms','hs'],
      target: '초등 1학년~고등 3학년', who: '학생 본인 (저학년은 보호자가 읽어 줘도 됩니다)', time: '약 10~15분 · 37문항',
      what: ['감정조절, 문제해결력, 낙관성, 끈기 등 회복탄력성 7요인'],
      desc: '속상하거나 실패한 뒤 다시 일어서는 마음의 힘을 봅니다. 결과에 맞춰 생활 속에서 해 볼 활동을 함께 안내해 드려요.',
      forWho: ['작은 실수에도 크게 속상해할 때', '친구 관계나 시험에서 쉽게 무너질 때'],
      samples: [['결과지 샘플', S+'resultSample/RS_CO_SG_CA_Sample.pdf']],
      note: '추가 검사',
    },
    kbasc: {
      name: 'K·BASC-3 정서·행동 평가 (부모보고)', short: 'K·BASC-3', kind: 'add', price: 15000, personalOnly: true,
      en: 'Korean Behavior Assessment System for Children 3rd Edition',
      grades: ['pre','low','mid','high','ms','hs'],
      target: '만 2세~ (부모보고형: 유아용·아동용·청소년용)', who: '보호자', time: '약 20~30분',
      what: ['외현화 문제: 과잉행동, 공격성, 품행', '내면화 문제: 불안, 우울, 신체화', '행동증상지표·주의집중', '적응기술: 적응성, 사회성 기술, 리더십, 일상 활동, 의사소통'],
      desc: '집중, 감정, 행동, 적응 기술을 폭넓게 살피는 선별 검사입니다. 학습보다 정서·행동이 먼저 걱정될 때 고르세요. 결과가 높게 나오면 가까운 전문기관 상담을 함께 안내해 드려요.',
      forWho: ['산만함이나 감정 기복이 걱정될 때', '학교·어린이집에서 행동 이야기를 자주 들을 때'],
      samples: [['일반 결과보고서 샘플(아동용)', S+'mailImg/inpsyt-img/download/2024/K%C2%B7BASC-3/K%C2%B7BASC-3_%EB%B6%80%EB%AA%A8%EB%B3%B4%EA%B3%A0%ED%98%95_%EC%95%84%EB%8F%99%EC%9A%A9_%EC%9D%BC%EB%B0%98%20%EA%B2%B0%EA%B3%BC%EB%B3%B4%EA%B3%A0%EC%84%9C%20%EC%83%98%ED%94%8C.pdf']],
      note: '보호자 구매에서만 고를 수 있어요. 학원·선생님 구매에는 포함되지 않습니다.',
    },
    blct: {
      name: 'BLCT 기초학습역량검사', short: 'BLCT', kind: 'add', price: 14000, academic: true,
      en: 'Basic Learning Competence Test',
      grades: ['high','ms','hs'],
      target: '초등 4~6학년 · 중·고등학생', who: '학생 본인 (직접 문제를 푸는 검사)', time: '약 40분 · 초등용 118문항 / 청소년용 142문항',
      what: ['능력: 언어(어휘적용력, 언어유추력), 논리수학(수치이해력, 수리력), 공간(공간활용력, 공간지각력)', '흥미: 언어, 논리수학, 공간'],
      desc: '실제로 문제를 풀어 언어·논리수학·공간 영역의 현재 능력을 재고, 그 영역을 얼마나 좋아하는지와 비교합니다. 잘하는데 싫어하는 과목, 좋아하는데 아직 약한 과목을 찾을 수 있어요.',
      forWho: ['과목별 편차가 클 때', '어떤 과목에 힘을 실어야 할지 정하고 싶을 때'],
      samples: [['초등용 샘플', S+'resultSample/BLCT_CO_SG_E_sample.pdf'],['청소년용 샘플', S+'resultSample/BLCT_CO_SG_A_sample.pdf']],
      note: '반드시 혼자, 조용한 곳에서, 한 번에 풀어 주세요. 도움을 받으면 결과가 실제보다 높게 나와 해석이 틀어집니다.',
    },
    kicsl: {
      name: 'KICS-L 아동 진로성격강점검사 (저학년용)', short: 'KICS-L', kind: 'career', price: 12000,
      en: 'Korean Inventory of Character Strengths for Lower graders',
      grades: ['low','mid'],
      target: '초등 2~3학년', who: '학생 본인', time: '약 20분 · 73문항',
      what: ['24가지 성격강점 중 아이의 대표강점'],
      desc: '호기심, 감사, 리더십처럼 아이가 이미 가진 좋은 성품을 찾아 줍니다. 아직 직업을 고르기 이른 저학년에게 맞는 진로 첫걸음이에요.',
      forWho: ['아이가 잘하는 것을 칭찬해 주고 싶은데 막연할 때', '진로 이야기를 가볍게 시작하고 싶을 때'],
      samples: [['결과지 샘플', S+'resultSample/KICSL_EX_SG_Sample.pdf']],
      note: '진로 옵션 (초등 2~3학년)',
    },
    holland: {
      name: 'Holland® 홀랜드 진로검사', short: '홀랜드', kind: 'career', price: 15000,
      en: 'Holland Career Test',
      grades: ['high','ms','hs'],
      target: '초등 4~6학년 진로발달검사 · 중학생 진로성숙검사 · 고등학생 계열적성검사', who: '학생 본인', time: '약 40~50분 · 204~222문항',
      what: ['Holland 진로코드(RIASEC 흥미 유형)', '진로포부, 성격적성, 능력적성, 직업적성, 직업분야', '진로성숙(초등·중학생용), 학업성적(고등용)'],
      desc: '흥미와 적성을 여섯 가지 유형(현실·탐구·예술·사회·진취·관습)으로 정리하고, 어울리는 직업과 학과를 보여 줍니다. 해석지에 학습 결과와 엮은 "진로 방향" 1쪽을 붙여 드려요.',
      forWho: ['진로 상담이나 진학 지도에 쓸 자료가 필요할 때', '문과·이과, 계열 선택을 앞두고 있을 때'],
      samples: [['초등용 샘플', S+'resultSample/HollandCDI_CO_SG_E.pdf'],['중학생 진로성숙 샘플', S+'resultSample/HollandCMI_CO_SG_M.pdf'],['중학생 진로적성 샘플', S+'resultSample/HollandCPI_CO_SG_M.pdf']],
      note: '문항이 많아서 다른 검사와 다른 날 실시하는 것을 권해요.',
    },
    sct: {
      name: 'SCT 문장완성검사', short: 'SCT', kind: 'free', price: 0,
      en: 'Sentence Completion Test',
      grades: ['mid','high','ms','hs'],
      target: '초등 3학년 이상', who: '학생 본인', time: '약 20분',
      what: ['가족, 친구, 학교, 나 자신, 미래에 대한 생각'],
      desc: '"나는 공부할 때 ___" 같은 미완성 문장을 채우며 아이가 평소 하는 생각과 바람을 자연스럽게 보여 줍니다. 숫자로 나온 결과를 아이의 말로 한 번 더 확인할 수 있어요.',
      forWho: ['아이 속마음을 아이 말로 듣고 싶을 때'],
      samples: [],
      note: '모든 패키지에서 후기 작성을 약속해 주시면 무료로 드립니다. 글을 직접 써야 해서 3학년 이상만 가능해요.',
    },
  },
};
