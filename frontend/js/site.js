// async function loadPopular() {
//   try {
//     const r = await fetch('/api/courses');
//     const data = await r.json();
//     const grid = document.getElementById('popular-grid');
//     grid.innerHTML = data.slice(0,3).map(c=>`<div class="card"><h3>${c.title}</h3><p>${c.shortDesc||''}</p><p><strong>₹${c.price}</strong></p><a class="btn" href="/pages/course.html?slug=${c.slug}">View</a></div>`).join('');
//   } catch (err) { console.error(err); }
// }
// document.addEventListener('DOMContentLoaded', loadPopular);
// // 

fetch('/api/courses')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('popular-grid');
    grid.innerHTML = data.map(c => `
      <div class="card">
        <h4>${c.title}</h4>
        <p>${c.shortDesc}</p>
        <p>₹${c.price}</p>
        <a href="/pages/course.html?slug=${c.slug}" class="btn">View</a>
      </div>`).join('');
  });
