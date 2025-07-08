// script.js
const rutas = [
  { id: 1, name: 'Lima Centro → San Isidro', time: '25 min', occupancy: 30 },
  { id: 2, name: 'Miraflores → La Molina', time: '35 min', occupancy: 65 },
  { id: 3, name: 'San Miguel → Surco', time: '40 min', occupancy: 90 }
];
const cardsEl = document.getElementById('cards');
const searchInput = document.getElementById('search');
function renderCards(list) {
  cardsEl.innerHTML = '';
  list.forEach(route => {
    const card = document.createElement('div'); card.className = 'card';
    const color = route.occupancy < 60 ? '#4caf50' : route.occupancy < 85 ? '#ff9800' : '#f44336';
    card.innerHTML = `
      <div class="card-header">
        <div class="route-name">${route.name}</div>
        <div class="occupancy-circle" style="background:${color}"></div>
      </div>
      <div class="card-time">Tiempo estimado: ${route.time}</div>
      <div class="bar-wrap"><div class="bar" style="width:${route.occupancy}% ; background:${color}"></div></div>
      <div class="feedbacks">
        <button data-id="${route.id}" data-action="full">Sí, va lleno</button>
        <button data-id="${route.id}" data-action="empty">No, hay espacio</button>
      </div>
    `;
    cardsEl.appendChild(card);
  });
}
searchInput.addEventListener('input', () => {
  const term = searchInput.value.toLowerCase();
  const filtered = rutas.filter(r => r.name.toLowerCase().includes(term));
  renderCards(filtered);
});
cardsEl.addEventListener('click', e => {
  if (e.target.matches('button[data-action]')) {
    const id = +e.target.dataset.id;
    const action = e.target.dataset.action;
    const route = rutas.find(r => r.id === id);
    route.occupancy = action === 'full'
      ? Math.min(100, route.occupancy + 10)
      : Math.max(0, route.occupancy - 10);
    renderCards(rutas);
  }
});
renderCards(rutas);
const modal = document.getElementById('modal');
document.getElementById('openModal').onclick = () => modal.classList.add('open');
document.getElementById('cancel').onclick = () => modal.classList.remove('open');
modal.querySelectorAll('.send').forEach(btn => {
  btn.onclick = () => {
    const origen = document.getElementById('origen').value;
    const destino = document.getElementById('destino').value;
    const status = btn.dataset.status;
    const newRoute = { id: rutas.length + 1, name: `${origen} → ${destino}`, time: 'N/A', occupancy: status === 'full' ? 100 : 0 };
    rutas.push(newRoute);
    renderCards(rutas);
    modal.classList.remove('open');
  };
});
