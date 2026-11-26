# 똑심마인드 키즈

아동·청소년 온라인 학습습관 검사와 해석 서비스 소개 사이트 (GitHub Pages: https://5344-lang.github.io/kids/)

## 페이지
- `index.html` 메인: 패키지, 학년별 검사, 추가 검사·진로 옵션, 가격 계산, 단체 구매, FAQ
- `tests.html` 검사 목록 (학년 필터)
- `test.html?t=검사코드` 검사 상세 (대상·소요·보는 것·샘플 결과지)
- `quiz.html` 1분 맞춤 추천 (학년 → 신청자 → 예/아니오 6문항)

## 수정하는 곳
- 가격, 패키지, 검사 정보, 샘플 링크: `js/config.js` 하나만 고치면 됩니다.
- 학년별 패키지 검사: `gradeTest`
- 단체 할인: `group`
- JTCI 샘플 PDF: `samples/`

방문 검사는 하지 않습니다(온라인 전용).
