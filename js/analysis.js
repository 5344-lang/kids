/* 결과지 분석 페이지 */
document.addEventListener('DOMContentLoaded', () => {
  const A = C.analysis;
  document.getElementById('anaPlans').innerHTML = A.packages.map(p => `<article class="plan ${p.best ? 'best' : ''}">
    ${p.best ? '<p class="plan-badge">가장 많이 찾는</p>' : ''}
    <p class="plan-tag">${p.name}</p><h3>${p.title}</h3>
    <p class="plan-price">${won(p.price)}</p>
    <ul>${p.items.map(i => `<li>${i}</li>`).join('')}</ul>
    <a class="btn ${p.best ? '' : 'btn-line'} js-contact" href="#">신청하기</a></article>`).join('');
  document.getElementById('anaList').innerHTML = A.accepted.map(([n, d]) => `<div class="arow"><div><b>${n}</b><small>${d}</small></div></div>`).join('');
  wireLinks();
});
