/* 똑심마인드 키즈 — 공통 + 메인 페이지 */
const C = KIDS_CONFIG;
const T = C.tests;
const won = n => n.toLocaleString('ko-KR') + '원';
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const GKEYS = Object.keys(C.grades);
const gname = g => C.grades[g].label;

/* 이 학년의 패키지 기본 검사 */
const PKG = k => k === 'teacher' ? C.teacherPkg : C.packages[k];
function coreTests(g, pkg) {
  if (pkg === 'teacher') return [C.teacherGradeTest[g]];
  const list = [pkg === 'basic' ? 'sts' : 'jtci', C.gradeTest[g]];
  if (T.sct.grades.includes(g)) list.push('sct');
  return list;
}
/* 이 학년에서 고를 수 있는 추가 검사 / 진로 옵션 */
function addOns(g, opts = {}) {
  const core = [opts.group ? C.teacherGradeTest[g] : C.gradeTest[g]];
  return Object.keys(T).filter(k => T[k].kind === 'add' && T[k].grades.includes(g) && !core.includes(k) && (!opts.group || T[k].academic));
}
function careers(g) { return Object.keys(T).filter(k => T[k].kind === 'career' && T[k].grades.includes(g)); }
function gradeRange(k) {
  const gs = T[k].grades; if (gs.length === GKEYS.length) return '전 학년';
  return gs.map(gname).join(' · ');
}


/* 고른 구성을 복사하고 크몽 채팅 안내 */
async function copyText(t) {
  try { await navigator.clipboard.writeText(t); return true; } catch (e) {}
  try {
    const ta = document.createElement('textarea'); ta.value = t; ta.style.position = 'fixed'; ta.style.opacity = '0';
    document.body.appendChild(ta); ta.select(); const ok = document.execCommand('copy'); ta.remove(); return ok;
  } catch (e) { return false; }
}
async function applyWith(summary) {
  const ok = await copyText(summary);
  let m = document.getElementById('applyModal');
  if (!m) { m = document.createElement('div'); m.id = 'applyModal'; m.className = 'modal'; document.body.appendChild(m); }
  m.innerHTML = `<div class="modal-box" role="dialog" aria-modal="true">
    <h3>${ok ? '✅ 고른 구성이 복사됐어요' : '📸 이 화면을 캡처해 주세요'}</h3>
    <ol class="modal-steps">
      <li>아래 <b>크몽에서 신청하기</b>를 눌러 주세요.</li>
      <li>크몽 <b>문의하기(채팅)</b>를 열고 ${ok ? '<b>붙여넣기</b> 해 주세요.' : '캡처한 화면을 보내 주세요.'}</li>
      <li>확인 후 결제 안내와 사전 설문 링크를 보내 드려요.</li>
    </ol>
    <pre class="modal-text">${summary.replace(/</g, '&lt;')}</pre>
    ${ok ? '<p class="small-note">붙여넣기가 안 되면 이 화면을 캡처해서 보내 주셔도 돼요.</p>' : ''}
    <div class="hero-cta">
      <a class="btn btn-big" href="${C.contactUrl}" target="_blank" rel="noopener">크몽에서 신청하기</a>
      <button class="btn btn-line" data-close>닫기</button>
    </div></div>`;
  m.classList.add('on');
  m.onclick = e => { if (e.target === m || e.target.hasAttribute('data-close')) m.classList.remove('on'); };
}

/* 공통 링크 */
function wireLinks() {
  $$('.js-contact').forEach(a => { a.href = C.contactUrl; a.target = '_blank'; a.rel = 'noopener'; });
  $$('.js-survey').forEach(a => { a.href = C.surveyUrl || C.contactUrl; a.target = '_blank'; a.rel = 'noopener'; });
  $$('.js-main').forEach(a => { a.href = C.mainSite; a.target = '_blank'; a.rel = 'noopener'; });
}

/* ---------- 메인 페이지 ---------- */
function renderPlans() {
  const el = $('#plans'); if (!el) return;
  el.innerHTML = ['basic', 'deep', 'premium'].map(k => {
    const p = C.packages[k];
    return `<article class="plan ${k === 'deep' ? 'best' : ''}">
      ${k === 'deep' ? '<p class="plan-badge">가장 많이 찾는</p>' : ''}
      <p class="plan-tag">${k === 'deep' ? p.name : p.tag + ' · ' + p.name}</p>
      <h3>${p.title}</h3>
      <p class="plan-price">${won(p.price)}</p>
      <ul>${p.items.map(i => `<li>${i}</li>`).join('')}</ul>
      <a class="btn ${k === 'deep' ? '' : 'btn-line'} js-contact" href="#">신청하기</a>
    </article>`;
  }).join('');
}

function renderGrade(g) {
  $$('#gradeTabs .gtab').forEach(b => b.classList.toggle('on', b.dataset.g === g));
  const gt = T[C.gradeTest[g]];
  const adds = addOns(g), cars = careers(g);
  const chip = k => `<a class="tchip" href="test.html?t=${k}">${T[k].short}</a>`;
  $('#gradePanel').innerHTML = `
    <div class="gp-cols">
      <div><h4>온라인 기본 ${won(C.packages.basic.price)}</h4>
        <ul class="gp-list"><li><b>STS 6요인 기질검사</b><span>${T.sts.who}</span></li>
        <li><b>${gt.name}</b><span>${gt.who}</span></li>
        ${T.sct.grades.includes(g) ? '<li><b>SCT 문장완성검사</b><span>후기 작성 시 무료</span></li>' : ''}</ul></div>
      <div><h4>온라인 심화 ${won(C.packages.deep.price)} · 프리미엄 ${won(C.packages.premium.price)}</h4>
        <ul class="gp-list"><li><b>JTCI 기질 및 성격검사</b><span>상세 해석보고서 포함</span></li>
        <li><b>${gt.name}</b><span>${gt.who}</span></li>
        <li><b>추가 검사 1개 무료</b><span>${adds.map(k => T[k].short).join(', ')} 중 선택</span></li>
        ${cars.length ? `<li><b>프리미엄: 진로 옵션 1개 포함</b><span>${cars.map(k => T[k].short).join(', ')}</span></li>` : ''}
        ${T.sct.grades.includes(g) ? '<li><b>SCT 문장완성검사</b><span>후기 작성 시 무료</span></li>' : ''}</ul></div>
      <div><h4>더할 수 있는 검사</h4>
        <div class="tchips">${adds.map(chip).join('')}</div>
        ${cars.length ? `<h4 style="margin-top:14px">진로 옵션</h4><div class="tchips">${cars.map(chip).join('')}</div>` : '<p class="small-note">진로 옵션은 초등 2학년부터 가능해요.</p>'}
      </div>
    </div>`;
}

function addonRow(k) {
  const t = T[k];
  return `<a class="arow" href="test.html?t=${k}">
    <div><b>${t.name}</b><small>${t.target}</small>
    ${t.personalOnly || t.parentOnly ? '<em>보호자 구매 전용</em>' : ''}${k === 'blct' ? '<em>혼자 풀기 필수</em>' : ''}${k === 'pat' ? '<em>1~2학년 보호자 구매는 패키지에 포함</em>' : ''}</div>
    <span class="aprice">+${won(t.price)}</span></a>`;
}

function renderAddons() {
  const a = $('#addonList'); if (!a) return;
  a.innerHTML = Object.keys(T).filter(k => T[k].kind === 'add').map(addonRow).join('');
  $('#careerList').innerHTML = Object.keys(T).filter(k => T[k].kind === 'career').map(addonRow).join('');
}

/* 가격 계산 */
const calc = { g: 'high', pkg: 'basic', picks: new Set() };
function renderCalc() {
  const gEl = $('#calcGrades'); if (!gEl) return;
  gEl.innerHTML = GKEYS.map(g => `<button class="cg ${g === calc.g ? 'on' : ''}" data-g="${g}">${gname(g)}</button>`).join('');
  $('#calcPkgs').innerHTML = ['basic', 'deep', 'premium', 'teacher'].map(p => `<button class="cg ${p === calc.pkg ? 'on' : ''}" data-p="${p}">${PKG(p).name}</button>`).join('');
  const avail = [...addOns(calc.g, { group: calc.pkg === 'teacher' }), ...careers(calc.g)];
  [...calc.picks].forEach(k => { if (!avail.includes(k)) calc.picks.delete(k); });
  const core = coreTests(calc.g, calc.pkg);
  const incRow = (name, sub, deepTag) => `<div class="ci inc${deepTag ? ' deep' : ''}"><span>✓</span><div class="ci-main"><b>${name}</b><small>${sub}</small></div><span class="ci-price">${deepTag ? '심화 포함' : '포함'}</span></div>`;
  const deep = calc.pkg === 'deep' || calc.pkg === 'premium';
  const prem = calc.pkg === 'premium';
  const sctOk = T.sct.grades.includes(calc.g);
  $('#calcList').innerHTML =
    core.filter(k => k !== 'sct').map(k => incRow(T[k].name + (k === 'jtci' ? ' + 상세 해석보고서' : ''), k === 'jtci' ? 'STS 대신 기질과 성격을 함께 보는 검사' : '패키지 포함', k === 'jtci')).join('') +
    (calc.pkg !== 'teacher' ? (sctOk ? incRow('SCT 문장완성검사', '후기 작성 시 무료 · 아이 속마음을 아이 말로 확인', deep) : `<div class="ci inc off"><span>–</span><div class="ci-main"><b>SCT 문장완성검사</b><small>글을 직접 써야 해서 3학년부터 가능해요</small></div><span class="ci-price">해당 없음</span></div>`) : '') +
    (deep ? incRow('추가 검사 1개 무료', '아래 추가 검사 중 하나를 고르면 1개 가격이 빠져요', true) + incRow('크몽 메시지 Q&A', `리포트 받은 뒤 ${prem ? 14 : 7}일 동안 질문할 수 있어요`, true) + incRow('공부·학원 로드맵', '학원·과외 고르는 기준, 수업 방식, 문제집·과제 분량', true) + (prem ? incRow('진로 옵션 1개 포함', '아래 진로 옵션 중 하나를 고르면 1개 가격이 빠져요', true) + incRow('심층 고민 3개 답변', '사전 설문에 적어 주신 고민을 따로 정리해 드려요', true) : '') : '') +
    avail.map(k => `<label class="ci"><input type="checkbox" data-k="${k}" ${calc.picks.has(k) ? 'checked' : ''}><div class="ci-main"><b>${T[k].name}</b><small>${T[k].kind === 'career' ? '진로 옵션' : '추가 검사'}${T[k].personalOnly || T[k].parentOnly ? ' · 보호자 구매 전용' : ''}</small></div><span class="ci-price">+${won(T[k].price)}</span></label>`).join('');
  sumCalc();
}
function sumCalc() {
  const base = PKG(calc.pkg).price;
  const addPrices = [...calc.picks].filter(k => T[k].kind === 'add').map(k => T[k].price);
  const carPrices = [...calc.picks].filter(k => T[k].kind === 'career').map(k => T[k].price);
  let free = 0;
  if ((calc.pkg === 'deep' || calc.pkg === 'premium') && addPrices.length) free = Math.max(...addPrices);
  if (calc.pkg === 'premium' && carPrices.length) free += Math.max(...carPrices);
  const extra = addPrices.reduce((a, b) => a + b, 0) + carPrices.reduce((a, b) => a + b, 0) - free;
  $('#calcBreak').innerHTML = `${PKG(calc.pkg).name} <b>${won(base)}</b> + 추가 <b>${won(extra)}</b>${free ? ` <small>(무료 항목 적용)</small>` : ''}`;
  $('#calcSum').textContent = won(base + extra);
  calc.total = base + extra;
}
function calcSummary() {
  const core = coreTests(calc.g, calc.pkg);
  const picks = [...calc.picks];
  return ['[똑심마인드 키즈 신청]',
    `학년: ${gname(calc.g)}`,
    `패키지: ${PKG(calc.pkg).name} (${won(PKG(calc.pkg).price)})`,
    `포함 검사: ${core.map(k => k === 'sct' ? 'SCT(후기 작성 시 무료)' : T[k].short).join(', ')}`,
    `추가 선택: ${picks.length ? picks.map(k => T[k].short).join(', ') : '없음'}`,
    `예상 금액: ${won(calc.total)}${calc.pkg === 'teacher' ? ' (1명)' : ''}`,
    calc.pkg === 'teacher' ? '인원: (적어 주세요)명' : ''].filter(Boolean).join('\n');
}
function wireCalc() {
  const box = $('#calc'); if (!box) return;
  box.addEventListener('click', e => {
    if (e.target.closest('#calcApply')) { applyWith(calcSummary()); return; }
    const b = e.target.closest('.cg'); if (!b) return;
    if (b.dataset.g) calc.g = b.dataset.g;
    if (b.dataset.p) calc.pkg = b.dataset.p;
    renderCalc();
  });
  box.addEventListener('change', e => {
    const k = e.target.dataset.k; if (!k) return;
    e.target.checked ? calc.picks.add(k) : calc.picks.delete(k);
    sumCalc();
  });
}

function renderTestCards(el) {
  if (!el) return;
  const order = ['sts', 'jtci', 'esra', 'pat', 'amt', 'mlst', 'rs', 'kbasc', 'blct', 'kicsl', 'holland', 'sct'];
  const kindLabel = { core: '패키지 기질검사', grade: '학년별 학습 검사', add: '추가 검사', career: '진로 옵션', free: '후기 작성 시 무료' };
  el.innerHTML = order.map(k => {
    const t = T[k];
    const label = k === 'pat' ? '1~2학년 학습 검사 · 추가 검사' : kindLabel[t.kind];
    return `<a class="tcard" href="test.html?t=${k}">
      <span class="tkind k-${t.kind}">${label}</span>
      <b>${t.name}</b>
      <small>${t.target}</small>
      <p>${t.desc.split('.')[0]}.</p>
      <span class="tmore">${t.samples.length ? '샘플 결과지 보기 →' : '자세히 보기 →'}</span>
    </a>`;
  }).join('');
}

function initMain() {
  renderPlans();
  const tabs = $('#gradeTabs');
  if (tabs) {
    tabs.innerHTML = GKEYS.map(g => `<button class="gtab" data-g="${g}"><span>${C.grades[g].icon}</span>${gname(g)}</button>`).join('');
    tabs.addEventListener('click', e => { const b = e.target.closest('.gtab'); if (b) renderGrade(b.dataset.g); });
    renderGrade('pre');
  }
  renderAddons();
  renderCalc(); wireCalc();
  $$('[data-tpkg-price]').forEach(e => e.textContent = won(C.teacherPkg.price));
  const tl = $('#tpkgItems'); if (tl) tl.innerHTML = C.teacherPkg.items.map(i => `<li>${i}</li>`).join('');
  $$('[data-group-rate]').forEach(e => e.textContent = C.group.rate + '%');
  $$('[data-group-min]').forEach(e => e.textContent = C.group.min);
  $$('[data-group-quote]').forEach(e => e.textContent = C.group.quoteFrom);
  renderTestCards($('#testCards'));
}

document.addEventListener('DOMContentLoaded', () => {
  if (typeof PAGE === 'undefined') initMain();
  wireLinks();
});
