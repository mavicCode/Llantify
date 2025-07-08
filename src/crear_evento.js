// crear_evento.js
// Este script recoge los datos del formulario de creación de eventos,
// los guarda en localStorage y redirige a la página del calendario.

// Esperar a que el DOM cargue
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('main .card form');

  form.addEventListener('submit', (e) => {
    e.preventDefault(); // evitar envío tradicional

    // Recoger valores del formulario
    const curso       = form.curso.value.trim();
    const dia         = form.dia.value;
    const horaInicio  = form.hora_inicio.value;
    const horaFin     = form.hora_fin.value;
    const recordatorio= form.recordatorio.checked;
    const colorInput  = form.color;
    let colorNombre;
    for (const radio of colorInput) {
      if (radio.checked) {
        colorNombre = radio.value;
        break;
      }
    }

    // Mapa de nombre → color hexadecimal
    const colorHexMap = {
      azul: '#3b82f6',
      rojo: '#ef4444',
      verde: '#10b981',
      amarillo: '#f59e0b',
      morado: '#8b5cf6',
      rosa: '#ec4899'
    };

    const color = colorHexMap[colorNombre] || '#3b82f6'; // default azul

    // Preparar objeto de evento
    const evento = {
      id:       Date.now(),
      curso,
      dia,
      horaInicio,
      horaFin,
      recordatorio,
      color
    };

    // Recuperar array existente o crear uno nuevo
    const eventos = JSON.parse(localStorage.getItem('eventosAcademicos')) || [];
    eventos.push(evento);

    // Guardar de nuevo en localStorage
    localStorage.setItem('eventosAcademicos', JSON.stringify(eventos));

    // Redirigir a la página del calendario donde se mostrarán
    window.location.href = 'calendar.html';
  });
});