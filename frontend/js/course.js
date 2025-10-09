async function loadCourse(){
  const params = new URLSearchParams(location.search);
  const slug = params.get('slug');
  if (!slug) return document.getElementById('course-detail').innerText='No course specified';
  const r = await fetch('/api/courses/'+slug);
  if (!r.ok) return document.getElementById('course-detail').innerText='Course not found';
  const c = await r.json();
  const el = document.getElementById('course-detail');
  el.innerHTML = `<h1>${c.title}</h1><p>${c.shortDesc||''}</p><p>${c.description||''}</p><p><strong>₹${c.price}</strong></p><button class="btn btn-primary" id="buy">Buy Course</button>`;
  document.getElementById('buy').addEventListener('click', async ()=>{
    alert('Demo checkout — create a purchase via POST /api/purchases with user and course id.');
  });
}
loadCourse();
