document.addEventListener("DOMContentLoaded", () => {
  const actividad = JSON.parse(localStorage.getItem("actividadLlantify"));

  if (!actividad) {
    console.warn("No hay datos de actividad aún.");
    return;
  }

  // Mostrar métricas generales
 document.getElementById("tiempo-valor").textContent = `${actividad.tiempo} min`;
document.getElementById("distancia-valor").textContent = `${actividad.distancia.toFixed(1)} km`;
document.getElementById("gasto-valor").textContent = `$${actividad.gasto.toFixed(2)}`;
document.getElementById("rutas-valor").textContent = `${actividad.rutas}`;


  // Mostrar gráfico semanal por defecto
  mostrarGraficoSemanal(actividad.viajesPorDia);

  // Botones para cambiar de vista (opcional)
  const btnSemanal = document.getElementById("btn_vista_semanal");
  const btnMensual = document.getElementById("btn_vista_mensual");

  if (btnSemanal && btnMensual) {
    btnSemanal.addEventListener("click", () => {
      mostrarGraficoSemanal(actividad.viajesPorDia);
    });

    btnMensual.addEventListener("click", () => {
      mostrarGraficoMensual(actividad.viajesPorSemana);
    });
  }
});

function mostrarGraficoSemanal(viajesPorDia) {
  const dias = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

  dias.forEach(dia => {
    const barra = document.getElementById(`bar-${dia}`);
    if (barra) {
      const cantidad = viajesPorDia[dia] || 0;
      barra.style.height = `${cantidad * 20}px`; // ajusta el número si quieres barras más altas
      barra.textContent = cantidad;
    }
  });
}


function mostrarGraficoMensual(viajesPorSemana) {
  viajesPorSemana.forEach((cantidad, index) => {
    const barra = document.getElementById(`barra-semana-${index + 1}`);
    if (barra) {
      barra.style.height = `${cantidad * 15}px`;
      barra.textContent = cantidad;
    }
  });
}
document.getElementById("btn_reiniciar_estadisticas").addEventListener("click", () => {
  if (confirm("¿Estás seguro de que deseas reiniciar las estadísticas? Esta acción no se puede deshacer.")) {
    const nuevaActividad = {
      tiempo: 0,
      distancia: 0,
      gasto: 0,
      rutas: 0,
      viajesPorDia: { lunes: 0, martes: 0, miercoles: 0, jueves: 0, viernes: 0, sabado: 0, domingo: 0 },
      viajesPorSemana: [0, 0, 0, 0]
    };
    localStorage.setItem("actividadLlantify", JSON.stringify(nuevaActividad));
    location.reload(); // Recarga la página para actualizar los datos visuales
  }
});

