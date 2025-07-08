document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'eventosAcademicos';
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get('id'), 10);

  const eventos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  const evento = eventos.find(ev => ev.id === id);

  if (!evento) {
    alert('Evento no encontrado');
    window.location.href = 'user_calendar.html';
    return;
  }

  // Rellenar campos
  document.getElementById('nombre').value = evento.curso;
  document.getElementById('dia').value = evento.dia;
  document.getElementById('hora_inicio').value = evento.horaInicio;
  document.getElementById('hora_fin').value = evento.horaFin;
  document.getElementById('recordatorio').checked = evento.recordatorio;

  const colorInputs = document.querySelectorAll('input[name="color"]');
  colorInputs.forEach(input => {
    if (input.value === evento.colorNombre) {
      input.checked = true;
    }
  });

  // Guardar cambios
  const form = document.getElementById('formEditarEvento');
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Actualizar los valores
    evento.curso = document.getElementById('nombre').value;
    evento.dia = document.getElementById('dia').value;
    evento.horaInicio = document.getElementById('hora_inicio').value;
    evento.horaFin = document.getElementById('hora_fin').value;
    evento.recordatorio = document.getElementById('recordatorio').checked;

    const colorSeleccionado = document.querySelector('input[name="color"]:checked');
    evento.colorNombre = colorSeleccionado.value;

    // Mapea color por nombre
    const colorHex = {
      azul: '#3b82f6',
      rojo: '#ef4444',
      verde: '#10b981',
      amarillo: '#f59e0b',
      morado: '#8b5cf6',
      rosa: '#ec4899'
    };
    evento.color = colorHex[evento.colorNombre];

    // Guardar
    const index = eventos.findIndex(ev => ev.id === id);
    eventos[index] = evento;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(eventos));

    alert('Evento actualizado');
    window.location.href = 'calendar.html';
  });
  // Eliminar evento
    document.getElementById('btnEliminar').addEventListener('click', () => {
    const confirmar = confirm('¿Estás seguro de eliminar este evento?');
    if (!confirmar) return;

    const nuevosEventos = eventos.filter(ev => ev.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nuevosEventos));

    alert('Evento eliminado');
    window.location.href = 'calendar.html';
    });

});

