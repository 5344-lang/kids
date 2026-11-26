/* 1분 맞춤 추천 */
const QS_T = [
  { id: 'effort', q: '공부하는 시간에 비해 성적이 잘 오르지 않아요.', yes: ['habit'], no: [] },
  { id: 'self',   q: '과제를 스스로 시작하고 끝까지 하는 편이에요.', yes: [], no: ['habit'] },
  { id: 'gap',    q: '과목마다 잘하는 것과 못하는 것의 차이가 커요.', yes: ['blct'], no: [], only: ['high', 'ms', 'hs'] },
  { id: 'focus2', q: '어떤 과목에 힘을 실어 지도할지 정하고 싶어요.', yes: ['blct'], no: [], only: ['high', 'ms', 'hs'] },
  { id: 'career', q: '진로·진학 상담 자료도 필요해요.', yes: ['career'], no: [], skip: g => g === 'pre' },
];
const QS = [
  { id: 'bounce', q: '속상한 일이 있어도 금방 털고 일어나요.', yes: [], no: ['rs'] },
  { id: 'friend', q: '친구들과 잘 어울려 지내요.', yes: [], no: ['rs', 'kbasc'] },
  { id: 'focus', parentOnly: true,  q: '가만히 앉아 있기 힘들거나, 기분이 자주 크게 바뀌어요.', yes: ['kbasc'], no: [] },
  { id: 'clash', parentOnly: true,  q: '공부 문제로 집에서 자주 부딪혀요.', t: '공부 문제로 보호자와 자주 부딪힌다고 들었어요.', yes: ['pat'], no: [], skip: g => g === 'low' },
  { id: 'gap',    q: '과목마다 잘하는 것과 못하는 것의 차이가 커요.', yes: ['blct'], no: [], only: ['high', 'ms', 'hs'] },
  { id: 'deep',   q: '아이 성향(기질과 성격)을 깊이 알고 싶어요.', t: '학생 성향(기질과 성격)을 깊이 알고 싶어요.', yes: ['deep'], no: [], only: ['pre', 'low', 'mid'] },
  { id: 'career', q: '앞으로 하고 싶은 일(진로)도 함께 알아보고 싶어요.', yes: ['career'], no: [], skip: g => g === 'pre' },
  { id: 'self',   q: '숙제나 공부를 스스로 시작하는 편이에요.', t: '과제를 스스로 시작하는 편이에요.', yes: [], no: ['habit'] },
];
const st = { step: 0, g: null, who: null, qs: [], ans: {} };
const box = () => document.getElementById('quiz');
const bar = p => document.getElementById('qbar').style.width = p + '%';


/* 0단계: 이미 받은 결과지가 있는지 */
function stepHave() {
  st.prev = false; st.ans = {};
  bar(3);
  box().innerHTML = `<h2>이미 받아 둔 검사 결과지가 있나요?</h2>
    <p class="qhint">학교·상담센터·학원에서 받은 웩슬러, TCI, 학습전략검사 결과지 같은 것들이요.</p>
    <div class="qopts">
      <button class="qopt wide" data-h="no"><span>✨</span>아니요, 처음이에요<small>검사부터 해석까지 받기</small></button>
      <button class="qopt wide" data-h="yes"><span>📄</span>네, 결과지가 있어요<small>받아 둔 결과지를 쉽게 풀어 받기</small></button>
      <button class="qopt wide" data-h="both"><span>➕</span>있지만 새로 검사도 받고 싶어요<small>새 검사 + 해석, 받은 결과지도 함께 참고</small></button>
    </div>`;
  box().onclick = e => {
    const b = e.target.closest('[data-h]'); if (!b) return;
    if (b.dataset.h === 'yes') return stepReports();
    st.prev = b.dataset.h === 'both';
    stepGrade();
  };
}

/* 결과지 분석 흐름 */
const ana = { picks: new Set(), g: null, road: false };
function stepReports() {
  bar(20);
  const list = C.analysis.accepted.map(([n]) => n).concat(['그 밖의 검사']);
  box().innerHTML = `<h2>어떤 결과지가 있나요?</h2><p class="qhint">있는 것을 모두 골라 주세요.</p>
    <div class="calc-list">${list.map(n => `<label class="ci"><input type="checkbox" data-r="${n}" ${ana.picks.has(n) ? 'checked' : ''}><div class="ci-main"><b>${n}</b></div></label>`).join('')}</div>
    <div class="hero-cta"><button class="btn btn-big" id="rNext">다음</button><button class="btn btn-line" id="rBack">← 처음으로</button></div>`;
  box().onchange = e => { const n = e.target.dataset.r; if (n) e.target.checked ? ana.picks.add(n) : ana.picks.delete(n); };
  box().onclick = e => {
    if (e.target.id === 'rBack') { box().onchange = null; return stepHave(); }
    if (e.target.id === 'rNext') {
      if (!ana.picks.size) { alert('결과지를 하나 이상 골라 주세요.'); return; }
      box().onchange = null; stepAGrade();
    }
  };
}
function stepAGrade() {
  bar(50);
  box().innerHTML = `<h2>아이는 몇 학년인가요?</h2>
    <div class="qopts grid">${GKEYS.map(g => `<button class="qopt" data-g="${g}"><span>${C.grades[g].icon}</span>${gname(g)}</button>`).join('')}</div>`;
  box().onclick = e => { const b = e.target.closest('[data-g]'); if (b) { ana.g = b.dataset.g; stepRoad(); } };
}
function stepRoad() {
  bar(75);
  box().innerHTML = `<h2>결과를 보고 학원·공부 방향까지 정하고 싶으세요?</h2>
    <p class="qhint">학원과 과외 중 무엇이 맞는지, 수업 방식, 문제집·과제 분량까지 정리해 드려요.</p>
    <div class="qopts yn"><button class="qopt yn" data-a="yes">네</button><button class="qopt yn" data-a="no">아니오</button></div>`;
  box().onclick = e => { const b = e.target.closest('[data-a]'); if (b) { ana.road = b.dataset.a === 'yes'; resultA(); } };
}
function resultA() {
  bar(100);
  const P = C.analysis.packages, n = ana.picks.size;
  const rec = ana.road ? 2 : n >= 2 ? 1 : 0;
  let sel = rec;
  const tiers = ['STANDARD', 'DELUXE', 'PREMIUM'];
  function render() {
    const p = P[sel];
    box().innerHTML = `
      <p class="qnum">추천 결과 · ${gname(ana.g)} · 결과지 ${n}종</p>
      <h2>결과지 분석 ${tiers[rec]}를 추천해요</h2>
      <div class="pkg-toggle">${P.map((x, i) => `<button class="cg ${i === sel ? 'on' : ''}" data-i="${i}">${x.name} ${won(x.price)}${i === rec ? ' · 추천' : ''}</button>`).join('')}</div>
      <div class="rbox">
        <h4>${p.title}</h4>
        <ul>${p.items.map(i => `<li><b>${i}</b></li>`).join('')}</ul>
        <h4>보내 주실 결과지</h4>
        <ul>${[...ana.picks].map(r => `<li>${r}</li>`).join('')}</ul>
        ${sel === 0 && n >= 2 ? '<p class="tip">💡 기본은 결과지 1종만 풀어 드려요. 여러 개를 함께 보시려면 통합을 골라 주세요.</p>' : ''}
        ${n >= 4 ? '<p class="tip">💡 결과지가 4종 이상이면 먼저 메시지로 문의해 주세요. 구성을 맞춰 드릴게요.</p>' : ''}
        ${ana.picks.has('그 밖의 검사') ? '<p class="tip">💡 목록에 없는 검사는 해석 가능한지 먼저 확인해 드려요.</p>' : ''}
        <p class="tip">🔒 결과지를 보내실 때 이름·생년월일·학교는 꼭 가려 주세요.</p>
      </div>
      <div class="rprice"><span>예상 금액</span><strong>${won(p.price)}</strong></div>
      <div class="hero-cta">
        <button class="btn btn-big" id="apply">이 구성으로 신청하기</button>
        <button class="btn btn-line" id="again">다시 하기</button>
      </div>
      <p class="small-note"><a href="analysis.html">결과지 분석 자세히 보기 →</a></p>`;
  }
  render();
  box().onclick = e => {
    const b = e.target.closest('[data-i]'); if (b) { sel = +b.dataset.i; render(); return; }
    if (e.target.id === 'again') { ana.picks.clear(); return stepHave(); }
    if (e.target.id === 'apply') applyWith(['[똑심마인드 키즈 · 결과지 분석 신청]',
      `학년: ${gname(ana.g)}`, `결과지: ${[...ana.picks].join(', ')}`,
      `패키지: ${tiers[sel]} · ${P[sel].title} (${won(P[sel].price)})`,
      `학원·공부 로드맵 희망: ${ana.road ? '예' : '아니오'}`].join('\n'));
  };
}

function stepGrade() {
  bar(5);
  box().innerHTML = `<h2>아이는 몇 학년인가요?</h2>
    <div class="qopts grid">${GKEYS.map(g => `<button class="qopt" data-g="${g}"><span>${C.grades[g].icon}</span>${gname(g)}</button>`).join('')}</div>`;
  box().onclick = e => { const b = e.target.closest('[data-g]'); if (b) { st.g = b.dataset.g; stepWho(); } };
}
function stepWho() {
  bar(15);
  box().innerHTML = `<h2>누가 신청하시나요?</h2>
    <div class="qopts">
      <button class="qopt wide" data-w="parent"><span>👪</span>보호자예요<small>우리 아이 한 명</small></button>
      <button class="qopt wide" data-w="teacher"><span>🧑‍🏫</span>학원·공부방·과외 선생님이에요<small>학생 지도용, 단체 구매 가능</small></button>
    </div>`;
  box().onclick = e => {
    const b = e.target.closest('[data-w]'); if (!b) return;
    st.who = b.dataset.w;
    st.qs = (st.who === 'teacher' ? QS_T : QS).filter(q => (!q.only || q.only.includes(st.g)) && !(q.skip && q.skip(st.g))).slice(0, 6);
    st.step = 0; stepQ();
  };
}
function stepQ() {
  const q = st.qs[st.step];
  bar(15 + Math.round(80 * st.step / st.qs.length));
  box().innerHTML = `<p class="qnum">${st.step + 1} / ${st.qs.length}</p>
    <h2>${st.who === 'teacher' && q.t ? q.t : q.q}</h2>
    <div class="qopts yn">
      <button class="qopt yn" data-a="yes">네</button>
      <button class="qopt yn" data-a="no">아니오</button>
    </div>
    ${st.step ? '<button class="qback">← 이전</button>' : ''}`;
  box().onclick = e => {
    if (e.target.closest('.qback')) { st.step--; stepQ(); return; }
    const b = e.target.closest('[data-a]'); if (!b) return;
    st.ans[q.id] = b.dataset.a;
    st.step++;
    st.step < st.qs.length ? stepQ() : result();
  };
}
function result() {
  bar(100);
  const g = st.g, teacher = st.who === 'teacher';
  const flags = [];
  st.qs.forEach(q => flags.push(...q[st.ans[q.id]]));
  const avail = addOns(g, { group: teacher });
  const order = ['rs', 'kbasc', 'pat', 'blct'];
  const recAdds = order.filter(k => flags.includes(k) && avail.includes(k)).slice(0, 2);
  const recCar = flags.includes('career') ? careers(g) : [];
  const recPkg = teacher ? 'teacher' : (flags.includes('career') && (flags.includes('deep') || recAdds.length >= 1)) ? 'premium' : (flags.includes('deep') || recAdds.length >= 2) ? 'deep' : 'basic';
  // 고를 수 있는 전체 목록: 추천 먼저
  const addList = [...recAdds, ...avail.filter(k => !recAdds.includes(k))];
  const carList = careers(g);
  const sel = { pkg: recPkg, picks: new Set([...recAdds, ...recCar]) };

  const why = {
    rs: '속상한 일이나 관계에서 다시 일어서는 힘을 함께 보면 좋아요.',
    kbasc: '집중이나 감정 변화가 걱정된다면 정서·행동을 폭넓게 살펴봐요.',
    pat: '공부 갈등이 잦다면 지도 방식을 함께 점검하면 해결이 빨라요.',
    blct: teacher ? '과목 편차가 크다면 영역별 실제 능력과 흥미를 비교해 지도 과목을 정할 수 있어요.' : '과목 편차가 크다면 영역별 실제 능력과 흥미를 비교해 봐요.',
    kicsl: '아이가 가진 성격 강점으로 진로 이야기를 시작해요.',
    holland: '흥미 유형과 어울리는 직업·학과를 보여 줘요.',
  };
  const rec = k => recAdds.includes(k) || recCar.includes(k);
  const row = k => `<label class="ci ${rec(k) ? 'rec' : ''}"><input type="checkbox" data-k="${k}" ${sel.picks.has(k) ? 'checked' : ''}>
      <div class="ci-main"><b>${T[k].name}</b>${rec(k) ? '<em>추천</em>' : ''}<small>${rec(k) && why[k] ? why[k] : T[k].desc.split('.')[0] + '.'}</small></div>
      <span class="ci-price">+${won(T[k].price)}</span></label>`;

  function calcPrice() {
    const P = PKG(sel.pkg);
    const adds = [...sel.picks].filter(k => T[k].kind === 'add').map(k => T[k].price);
    const cars = [...sel.picks].filter(k => T[k].kind === 'career').map(k => T[k].price);
    const jt = sel.pkg === 'deep' || sel.pkg === 'premium';
    const free = (jt && adds.length ? Math.max(...adds) : 0) + (sel.pkg === 'premium' && cars.length ? Math.max(...cars) : 0);
    return { P, free, total: P.price + adds.reduce((a, b) => a + b, 0) + cars.reduce((a, b) => a + b, 0) - free };
  }
  function render() {
    const core = coreTests(g, sel.pkg);
    const { P, free, total } = calcPrice();
    box().innerHTML = `
    <p class="qnum">추천 결과 · ${gname(g)}</p>
    <h2>${PKG(recPkg).name}${teacher ? '을' : ' 패키지를'} 추천해요</h2>
    ${teacher ? '' : `<div class="pkg-toggle">${['basic', 'deep', 'premium'].map(p => `<button class="cg ${sel.pkg === p ? 'on' : ''}" data-p="${p}">${C.packages[p].name} ${won(C.packages[p].price)}${p === recPkg ? ' · 추천' : ''}</button>`).join('')}</div>`}
    <div class="rbox">
      <h4>${teacher ? '들어가는 학습 검사' : '패키지에 들어가는 검사'}</h4>
      <ul>${core.map(k => `<li><a href="test.html?t=${k}"><b>${T[k].name}</b></a>${k === 'sct' ? '<small>후기 작성 시 무료</small>' : ''}</li>`).join('')}
      ${sel.pkg !== 'basic' && !teacher ? `<li><b>공부·학원 로드맵</b><small>학원·과외 고르는 기준, 수업 방식, 문제집·과제 분량</small></li><li><b>크몽 메시지 Q&A</b><small>리포트 받은 뒤 ${sel.pkg === 'premium' ? 14 : 7}일</small></li>` : ''}${sel.pkg === 'premium' ? '<li><b>심층 고민 3개 답변</b><small>프리미엄 포함</small></li>' : ''}</ul>
      ${addList.length ? `<h4>추가 검사 <span class="opt">선택</span></h4>${sel.pkg === 'deep' || sel.pkg === 'premium' ? '<p class="small-note">심화·프리미엄은 고른 추가 검사 중 1개가 무료예요.</p>' : ''}<div class="calc-list">${addList.map(row).join('')}</div>` : ''}
      ${carList.length ? `<h4>진로 옵션 <span class="opt">선택</span></h4>${sel.pkg === 'premium' ? '<p class="small-note">프리미엄은 진로 옵션 1개가 포함돼요.</p>' : ''}<div class="calc-list">${carList.map(row).join('')}</div>` : ''}
      ${flags.includes('habit') ? `<p class="tip">💡 ${teacher ? '해석지의 지도 포인트에서 학생에게 맞는 과제 분량과 시작 습관 잡는 방법을 정리해 드려요.' : '스스로 시작하기 어려운 아이라면, 해석지의 4주 학습 가이드에서 "시작하는 습관"을 중심으로 잡아 드려요.'}</p>` : ''}
    </div>
    <div class="rprice"><span>예상 금액 (1명)<small>${P.name} ${won(P.price)}${total !== P.price ? ` + 선택 ${won(total - P.price)}` : ''}${free ? ' (1개 무료 적용)' : ''}</small></span><strong>${won(total)}</strong></div>
    ${st.prev ? '<p class="tip">📄 받아 두신 결과지는 사전 질문지를 쓸 때 함께 알려 주세요. 리포트에 같이 참고해 드려요.</p>' : ''}
    ${teacher ? `<p class="tip">🧑‍🏫 기질·정서 검사 없이 학업 검사만 진행해요. ${C.group.min}명 이상이면 ${C.group.rate}% 할인되고, 반 전체 요약표를 함께 드려요. 14세 미만 학생은 보호자 동의서가 필요해요.</p>` : ''}
    <div class="hero-cta">
      <button class="btn btn-big" id="apply">이 구성으로 신청하기</button>
      <button class="btn btn-line" id="again">다시 하기</button>
    </div>`;
  }
  function summary() {
    const core = coreTests(g, sel.pkg);
    const { P, total } = calcPrice();
    const adds = [...sel.picks].filter(k => T[k].kind === 'add'), cars = [...sel.picks].filter(k => T[k].kind === 'career');
    return ['[똑심마인드 키즈 신청 · 맞춤 추천 결과]',
      `학년: ${gname(g)}`, `신청: ${teacher ? '학원·선생님' : '보호자'}`, st.prev ? '받아 둔 결과지: 있음 (함께 참고 요청)' : '',
      `패키지: ${P.name} (${won(P.price)})`,
      `포함 검사: ${core.map(k => k === 'sct' ? 'SCT(후기 작성 시 무료)' : T[k].short).join(', ')}`,
      `추가 검사: ${adds.length ? adds.map(k => T[k].short).join(', ') : '없음'}`,
      `진로 옵션: ${cars.length ? cars.map(k => T[k].short).join(', ') : '없음'}`,
      `예상 금액(1명): ${won(total)}`,
      teacher ? '인원: (적어 주세요)명' : ''].filter(Boolean).join('\n');
  }
  render();
  box().onclick = e => {
    if (e.target.id === 'again') { st.ans = {}; stepHave(); return; }
    if (e.target.id === 'apply') { applyWith(summary()); return; }
    const b = e.target.closest('[data-p]'); if (b) { sel.pkg = b.dataset.p; render(); }
  };
  box().onchange = e => {
    const k = e.target.dataset.k; if (!k) return;
    e.target.checked ? sel.picks.add(k) : sel.picks.delete(k);
    render();
  };
}
document.addEventListener('DOMContentLoaded', () => { if (document.getElementById('quiz')) stepHave(); });
