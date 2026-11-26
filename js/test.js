/* 검사 상세 */
document.addEventListener('DOMContentLoaded', () => {
  const k = new URLSearchParams(location.search).get('t');
  const t = (k && Object.prototype.hasOwnProperty.call(T, k)) ? T[k] : null;
  const el = document.getElementById('testDetail');
  if (!t) { el.innerHTML = '<h1 class="page-title">검사를 찾을 수 없어요</h1><a class="btn" href="tests.html">검사 목록으로</a>'; return; }
  document.title = `${t.name} | 똑심마인드 키즈`;
  const kindText = {
    core: () => k === 'sts' ? `온라인 기본 패키지에 포함 (${won(C.packages.basic.price)})` : `온라인 심화·프리미엄 패키지에 포함 (${won(C.packages.deep.price)}~)`,
    grade: () => `${t.grades.map(gname).join(' · ')} 패키지에 포함`,
    add: () => `추가 검사 +${won(t.price)}`,
    career: () => `진로 옵션 +${won(t.price)} · 프리미엄 패키지는 1개 포함`,
    free: () => '후기 작성 시 무료',
  };
  const where = kindText[t.kind]() + (k === 'pat' ? ' · 초등 1~2학년은 패키지에 포함' : '');
  el.innerHTML = `
    <a class="back" href="tests.html">← 검사 목록</a>
    <p class="eyebrow">${t.short}</p>
    <h1 class="page-title">${t.name}</h1>
    <p class="en">${t.en}</p>
    <p class="lead">${t.desc}</p>
    <div class="facts">
      <div><span>대상</span><b>${t.target}</b></div>
      <div><span>응답</span><b>${t.who}</b></div>
      <div><span>소요</span><b>${t.time}</b></div>
      <div><span>실시</span><b>온라인 (휴대폰·PC)</b></div>
      <div><span>가격</span><b>${where}</b></div>
    </div>
    <div class="detail-cols">
      <div class="dbox"><h3>무엇을 보나요</h3><ul>${t.what.map(w => `<li>${w}</li>`).join('')}</ul></div>
      <div class="dbox"><h3>이럴 때 추천해요</h3><ul>${t.forWho.map(w => `<li>${w}</li>`).join('')}</ul></div>
    </div>
    ${t.note ? `<div class="notice ${k === 'blct' || k === 'kbasc' ? 'warn' : ''}">${t.note}</div>` : ''}
    <div class="sample-box">
      <h3>샘플 결과지</h3>
      ${t.samples.length ? `<div class="sample-btns">${t.samples.map(([n, u]) => `<a class="btn btn-line" href="${u}" target="_blank" rel="noopener noreferrer">${n} ↗</a>`).join('')}</div>
      <p class="small-note">출판사 결과지 샘플입니다. 실제로는 이 결과지와 함께 쉬운 말로 풀어 쓴 종합해석지를 보내 드려요.</p>`
      : `<p class="small-note">SCT는 정해진 결과지 없이, 아이가 쓴 문장을 주제별로 묶어 종합해석지 안에 정리해 드립니다.</p>`}
    </div>
    <div class="hero-cta">
      <a class="btn btn-big js-contact" href="#">신청하기</a>
      <a class="btn btn-line" href="quiz.html">맞춤 추천 받기</a>
    </div>`;
  wireLinks();
});
