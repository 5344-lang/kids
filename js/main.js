(function () {
  const C = KIDS_CONFIG;
  const won = n => n.toLocaleString('ko-KR') + '원';

  // 링크
  const contact = C.contactUrl;
  document.querySelectorAll('.js-contact').forEach(a => { a.href = contact; a.target = '_blank'; a.rel = 'noopener'; });
  document.querySelectorAll('.js-survey').forEach(a => { a.href = C.surveyUrl || contact; a.target = '_blank'; a.rel = 'noopener'; });
  document.querySelectorAll('.js-main').forEach(a => { a.href = C.mainSite; });
  document.querySelectorAll('.js-area').forEach(el => { el.textContent = C.area; });

  // 가격 표시
  document.querySelectorAll('[data-base]').forEach(el => { el.textContent = won(C.onlineBase); });
  document.querySelectorAll('[data-price]').forEach(el => {
    const v = C.visit[el.dataset.price];
    if (v) el.innerHTML = won(v.price);
  });

  // 학년별 검사 안내
  const GRADES = {
    pre:  { label: '입학 전', icon: '🐣', q: '학교 갈 준비가 되었을까?',
            online: ['sts', 'esra'], face: ['E-RAM 조기 읽기검사', 'BASA:EL 초기문해'],
            look: ['한글 읽기와 이야기 이해', '10분 이상 앉아서 활동하기', '낯선 상황에 적응하는 방식'] },
    low:  { label: '1~2학년', icon: '🎒', q: '읽기 기초가 잘 잡혔을까?',
            online: ['sts', 'pat'], face: ['초등 저학년 초기 문해력 검사', 'BASA:R 읽기검사'],
            look: ['소리 내어 읽기의 정확도와 속도', '읽은 내용을 말로 설명하기', '숙제를 시작하는 방식'] },
    mid:  { label: '3학년', icon: '📚', q: '읽기에서 이해로 넘어가고 있을까?',
            online: ['sts', 'pat'], face: ['BASA:R 읽기검사', 'BASA:RC 읽기이해'],
            look: ['교과서 글의 중심 내용 찾기', '긴 글을 끝까지 읽는 힘', '모를 때의 반응'] },
    high: { label: '4~6학년', icon: '✏️', q: '스스로 공부하는 방법을 알고 있을까?',
            online: ['mlst', 'sts', 'blct'], face: ['BASA:RC 읽기이해'],
            look: ['비문학 글의 구조 파악', '공부 계획과 집중 전략', '문제를 푸는 순서'] },
    ms:   { label: '중학생', icon: '🎓', q: '중학교 국어에 맞는 공부법을 쓰고 있을까?',
            online: ['mlst', 'sts', 'blct'], face: ['RWT 읽기·쓰기 검사 (필요할 때)'],
            look: ['문학·비문학 독해 방식', '시험 공부 계획', '서술형 답안 쓰기'] },
  };
  const order = ['pre', 'low', 'mid', 'high', 'ms'];

  const panel = document.getElementById('gradePanel');
  function renderPanel(g) {
    const d = GRADES[g];
    const online = d.online.map(k => `<li><b>${C.tests[k].name}</b><span>${C.tests[k].who}</span></li>`).join('');
    const face = d.face.map(f => `<li><b>${f}</b><span>방문 때 직접 실시</span></li>`).join('');
    panel.innerHTML = `
      <div class="gp-q"><span class="gp-ic">${d.icon}</span><div><small>${d.label}</small><b>${d.q}</b></div></div>
      <div class="gp-cols">
        <div><h4>온라인으로 하는 검사</h4><ul class="gp-list">${online}</ul></div>
        <div><h4>방문 때 하는 읽기 검사</h4><ul class="gp-list">${face}</ul></div>
        <div><h4>직접 만나서 보는 것</h4><ul class="gp-look">${d.look.map(x => `<li>${x}</li>`).join('')}</ul></div>
      </div>`;
  }
  document.querySelectorAll('.gtab').forEach(b => b.addEventListener('click', () => {
    document.querySelectorAll('.gtab').forEach(x => x.classList.toggle('on', x === b));
    renderPanel(b.dataset.g);
  }));
  renderPanel('pre');

  // 온라인 가격 계산기
  const cg = document.getElementById('calcGrades');
  const cl = document.getElementById('calcList');
  let cur = 'low';
  cg.innerHTML = order.map(g => `<button type="button" class="cg${g === cur ? ' on' : ''}" data-g="${g}">${GRADES[g].label}</button>`).join('');
  function renderCalc() {
    const keys = Object.keys(C.tests).filter(k => C.tests[k].grades.includes(cur));
    const rec = C.recommend[cur] || [];
    cl.innerHTML = keys.map(k => {
      const t = C.tests[k];
      return `<label class="ci"><input type="checkbox" value="${k}"${rec.includes(k) ? ' checked' : ''}>
        <span class="ci-main"><b>${t.name}</b><small>${t.desc}</small><em>${t.who}</em></span>
        <span class="ci-price">${won(t.price)}</span></label>`;
    }).join('');
    cl.querySelectorAll('input').forEach(i => i.addEventListener('change', sum));
    sum();
  }
  function sum() {
    const picked = [...cl.querySelectorAll('input:checked')].map(i => C.tests[i.value].price);
    const tests = picked.reduce((a, b) => a + b, 0);
    document.getElementById('calcTests').textContent = won(tests);
    document.getElementById('calcSum').textContent = won(C.onlineBase + tests);
  }
  cg.querySelectorAll('.cg').forEach(b => b.addEventListener('click', () => {
    cur = b.dataset.g;
    cg.querySelectorAll('.cg').forEach(x => x.classList.toggle('on', x === b));
    renderCalc();
  }));
  renderCalc();
})();
