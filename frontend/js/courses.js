async function loadCategories(){
  const r = await fetch('/api/categories');
  const cats = await r.json();
  const list = document.getElementById('category-list');
  list.innerHTML = cats.map(c=>`<li><a href="?cat=${c.slug}">${c.name}</a></li>`).join('');
}
async function loadCourses(q=''){
  const url = q?('/api/courses?q='+encodeURIComponent(q)):'/api/courses';
  const r = await fetch(url);
  const data = await r.json();
  const grid = document.getElementById('courses-grid');
  grid.innerHTML = data.map(c=>`<div class="card"><h3>${c.title}</h3><p>${c.shortDesc||''}</p><p><strong>₹${c.price}</strong></p><a class="btn" href="/pages/course.html?slug=${c.slug}">View</a></div>`).join('');
}
document.getElementById('searchBtn')?.addEventListener('click', ()=>{ const q=document.getElementById('q').value; loadCourses(q); });
loadCategories(); loadCourses();
