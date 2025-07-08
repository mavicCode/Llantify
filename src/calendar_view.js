// calendar_view.js
document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'eventosAcademicos';
  const eventos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  // Renderizar lista de eventos
  const container = document.querySelector('.events-container');
  container.innerHTML = '';

  eventos.forEach(ev => {
    const card = document.createElement('div');
    card.className = 'event-card';

    // Sólo Editar y Eliminar
    const actions = [
      `<a href="edit_calendar.html?id=${ev.id}" class="icon-btn" title="Editar">✏️</a>`,
      `<button class="icon-btn" title="Eliminar" data-id="${ev.id}">🗑️</button>`
    ];

    card.innerHTML = `
      <div class="card-header">
        ${actions.join('')}
      </div>
      <div class="card-body">
        <!-- Punto con color dinámico -->
        <span class="dot" style="background: ${ev.color}"></span>
        <div class="info">
          <h3>${ev.curso}</h3>
          <p class="when">${ev.dia} • ${ev.horaInicio} – ${ev.horaFin}</p>
          ${ev.ubicacion ? `<p class="where">${ev.ubicacion}</p>` : ''}
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Delegar eliminación de eventos
  container.addEventListener('click', e => {
    if (e.target.matches('.icon-btn[title="Eliminar"]')) {
      const id = parseInt(e.target.getAttribute('data-id'), 10);
      deleteEvent(id);
    }
  });

  // Mapeo de días a código numérico (FullCalendar: domingo=0)
  const diaMap = {
    Domingo: 0, Lunes: 1, Martes: 2,
    Miércoles: 3, Jueves: 4,
    Viernes: 5, Sábado: 6
  };

  // Preparar eventos para FullCalendar
  const fcEvents = eventos.map(ev => ({
    id: ev.id.toString(),
    title: ev.curso,
    daysOfWeek: [ diaMap[ev.dia] ],
    startTime: ev.horaInicio,
    endTime: ev.horaFin,
    color: ev.color
  }));

  // Inicializar FullCalendar
  const calendar = new FullCalendar.Calendar(
    document.getElementById('fc'),
    {
      initialView: 'dayGridMonth',
      locale: 'es',
      height: 'auto',
      events: fcEvents
    }
  );
  calendar.render();
});

// Función global para eliminar evento
window.deleteEvent = function(id) {
  const STORAGE_KEY = 'eventosAcademicos';
  const eventos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const nuevos = eventos.filter(ev => ev.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevos));
  window.location.reload();
};
