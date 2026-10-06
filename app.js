const wedding = window.WEDDING;
const setText = (id, value) => { if (value) document.getElementById(id).textContent = value; };
setText('couple-names', wedding.names); setText('hero-note', wedding.dateLabel); setText('hero-location', wedding.location);
setText('story-copy', wedding.story); setText('location-detail', wedding.locationDetails); setText('travel-detail', wedding.travelDetails); setText('contact-detail', wedding.contact);
if (wedding.heroImage) { document.getElementById('hero-image').src = wedding.heroImage; document.getElementById('hero-image').alt = wedding.names ? `Wedding portrait of ${wedding.names}` : 'Wedding portrait'; }
const make = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text) node.textContent = text; return node; };
wedding.events.forEach((event, i) => {
  const article = make('article', `event ${event.id}`); article.id = event.id;
  const visual = make('div', 'event-art');
  if (event.image) { const image = make('img'); image.src = event.image; image.alt = event.imageAlt || `${event.name} celebration`; image.loading = 'lazy'; visual.append(image); }
  else { visual.append(make('span', 'motif', event.motif), make('span', 'hindi', event.hindi)); }
  const copy = make('div', 'event-copy'); copy.append(make('p', 'eyebrow', `0${i + 1} / THE CELEBRATIONS`), make('h3', '', event.name), make('p', 'mood', event.mood), make('p', 'description', event.description));
  const dl = make('dl'); [['WHEN', `${event.date} · ${event.time}`], ['WHERE', event.venue], ['ATTIRE', event.dress]].forEach(([label, value]) => { dl.append(make('dt', '', label), make('dd', '', value)); });
  copy.append(dl); article.append(visual, copy); document.getElementById('event-list').append(article);
});
const dialog = document.getElementById('lightbox');
document.getElementById('close-lightbox').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
function renderGallery(filter) {
  const gallery = document.getElementById('gallery'); gallery.replaceChildren();
  const items = wedding.memories.filter(item => filter === 'all' || item.event === filter);
  if (!items.length) {
    const events = wedding.events.filter(event => filter === 'all' || event.id === filter);
    events.forEach(event => { const card = make('div', `memory-placeholder ${event.id}`); card.append(make('span', 'motif', event.motif), make('p', '', event.name), make('span', 'small', 'Memories coming soon')); gallery.append(card); });
    return;
  }
  items.forEach(item => {
    const figure = make('figure');
    if (item.type === 'video') { const video = make('video'); video.src = item.src; video.controls = true; video.preload = 'metadata'; video.setAttribute('aria-label', item.caption || 'Wedding film'); if (item.poster) video.poster = item.poster; figure.append(video); }
    else { const button = make('button', 'photo-button'); const img = make('img'); img.src = item.src; img.alt = item.alt || item.caption || 'Wedding memory'; img.loading = 'lazy'; button.append(img); button.addEventListener('click', () => { document.getElementById('lightbox-image').src = item.src; document.getElementById('lightbox-image').alt = img.alt; setText('lightbox-caption', item.caption || img.alt); dialog.showModal(); }); figure.append(button); }
    figure.append(make('figcaption', '', item.caption || 'A moment to remember')); gallery.append(figure);
  });
}
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('[data-filter]').forEach(b => { b.classList.toggle('selected', b === button); b.setAttribute('aria-pressed', String(b === button)); }); renderGallery(button.dataset.filter); }));
renderGallery('all');
