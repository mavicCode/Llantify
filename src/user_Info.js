document.addEventListener("DOMContentLoaded", () => {
  const ruta = JSON.parse(localStorage.getItem("rutaSeleccionada"));

  if (ruta) {
    // Rellenar los elementos con la información de la ruta
    document.getElementById("info_origen").textContent = ruta.origen || "-";
    document.getElementById("info_destino").textContent = ruta.destino || "-";
    document.getElementById("info_distancia").textContent = `${ruta.distanciaKm || "-"} km`;
    document.getElementById("info_duracion").textContent = `${ruta.duracionMin || "-"} min`;
    document.getElementById("info_costo").textContent = `$${ruta.costo || "-"}`;
    document.getElementById("info_fecha").textContent = ruta.fecha || "-";
  } else {
    // Si no hay ruta almacenada, mostrar guiones
    const campos = ["info_origen", "info_destino", "info_distancia", "info_duracion", "info_costo", "info_fecha"];
    campos.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = "-";
    });
  }
});