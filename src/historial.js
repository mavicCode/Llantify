const historyData = [
  { date:'15/05/2025', name:'Lima Centro → San Isidro', estimated:30, real:35 },
  { date:'14/05/2025', name:'Miraflores → La Molina', estimated:40, real:38 },
  { date:'13/05/2025', name:'San Miguel → Surco', estimated:35, real:42 },
  { date:'12/05/2025', name:'Barranco → San Borja', estimated:25, real:22 }
];

// Render lista
const listEl = document.getElementById('history-list');
historyData.forEach(item=>{
  const card = document.createElement('div'); card.className='card';
  card.innerHTML=`
    <div class="card-header">
      <div class="route-date">${item.date}</div>
      <div>&gt;</div>
    </div>
    <div class="route-name">${item.name}</div>
    <div class="times">
      <span class="estimated">⏱ Estimado: ${item.estimated} min</span>
      <span class="real">⏰ Real: ${item.real} min</span>
    </div>
  `;
  listEl.appendChild(card);
});

// Chart
const ctx = document.getElementById('travelChart').getContext('2d');
const labels = ['Lun','Mar','Mie','Jue','Vie','Sab','Dom'];
const estimatedData = [30,45,50,40,38,42,35];
const realData = [28,50,48,42,36,45,33];
new Chart(ctx,{
  type:'line',
  data:{labels, datasets:[
    {label:'Estimado', data:estimatedData, borderColor:'#743ede', tension:0.3},
    {label:'Real', data:realData, borderColor:'#4caf50', tension:0.3}
  ]},
  options:{plugins:{legend:{position:'bottom'}}, scales:{y:{beginAtZero:true}}
}});

// Tab switching
const tabs=document.querySelectorAll('.tab-btn');
tabs.forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelector('.tab-btn.active').classList.remove('active');
  btn.classList.add('active');
  document.querySelectorAll('.tab-content').forEach(tc=>tc.style.display='none');
  document.getElementById(btn.dataset.tab).style.display='block';
}));

// Descargar informe 
document.getElementById('downloadReport').addEventListener('click',()=>{
  alert('Funcionalidad de descarga aún no implementada.');
});