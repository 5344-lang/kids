/* 검사 소개 목록 */
document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('testCards');
  renderTestCards(el);
  const f = document.getElementById('filter');
  f.innerHTML = '<button class="cg on" data-g="all">전체</button>' + GKEYS.map(g => `<button class="cg" data-g="${g}">${gname(g)}</button>`).join('');
  f.addEventListener('click', e => {
    const b = e.target.closest('.cg'); if (!b) return;
    f.querySelectorAll('.cg').forEach(x => x.classList.toggle('on', x === b));
    el.querySelectorAll('.tcard').forEach(c => {
      const k = new URL(c.href).searchParams.get('t');
      c.style.display = (b.dataset.g === 'all' || T[k].grades.includes(b.dataset.g)) ? '' : 'none';
    });
  });
});
