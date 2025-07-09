const opcionFavRoute = document.getElementById('btn_fav_routes');
  const opcionRecentRoute = document.getElementById('btn_recent_routes');

  const opcionFavRouteText = document.getElementById('user_fav_route_home_section');
  const opcionRecentRouteText = document.getElementById('user_recent_route_home_section');

  opcionFavRoute.addEventListener('click', () => {
    opcionFavRoute.classList.add('btn_home_active');
    opcionRecentRoute.classList.remove('btn_home_active');
    opcionFavRouteText.classList.remove('user_side_section_inactive')
    opcionRecentRouteText.classList.add('user_side_section_inactive');
  });

  opcionRecentRoute.addEventListener('click', () => {
    opcionRecentRoute.classList.add('btn_home_active');
    opcionFavRoute.classList.remove('btn_home_active');
    opcionRecentRouteText.classList.remove('user_side_section_inactive');
    opcionFavRouteText.classList.add('user_side_section_inactive');
  });

let map;
let directionsService;
let directionsRenderer; 
function initMap() {
  const lima = { lat: -12.0464, lng: -77.0428 };
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: lima,
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  cargarFavoritos();

  // Mostrar ruta de ejemplo al cargar
  const origenEjemplo = document.getElementById("search_origin").value;
  const destinoEjemplo = document.getElementById("search_destination").value;
  if (origenEjemplo && destinoEjemplo) {
    calcularRuta(origenEjemplo, destinoEjemplo);
  }

  // Inicializar autocompletado
  initAutocomplete();
}

let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
const maxFavoritos = 5;

function guardarFavoritos() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}
document.getElementById("btn_agregar_lugar").onclick = () => {
  document.getElementById("modal_favorito").style.display = "flex";
};

document.getElementById("close_modal_favorito").onclick = () => {
  document.getElementById("modal_favorito").style.display = "none";
};

document.getElementById("form_favorito").onsubmit = (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre_favorito").value.trim();
  const direccion = document.getElementById("direccion_favorito").value.trim();
  // Al guardar un favorito:
  if (nombre && direccion && favoritos.length < maxFavoritos) {
    favoritos.push({ nombre, direccion });
    guardarFavoritos();
    renderizarFavoritos();
    document.getElementById("modal_favorito").style.display = "none";
    document.getElementById("form_favorito").reset();
  } else if (favoritos.length >= maxFavoritos) {
    alert("Límite de lugares favoritos alcanzado.");
  }
};

function renderizarFavoritos() {
  const contenedor = document.querySelector(".user_fav_route_home_container");
  contenedor.innerHTML = "";

  favoritos.forEach((fav, index) => {
   const div = document.createElement("div");
  div.classList.add("user_fav_route_home_content");

  const rutaDiv = document.createElement("div");
  rutaDiv.classList.add("user_fav_route_home_content_text");
  rutaDiv.innerHTML = `
    <i class="fa-solid fa-location-dot"></i>
    <label>${fav.nombre} - ${fav.direccion}</label>
  `;
  rutaDiv.onclick = () => {
    const destino = document.getElementById("search_destination").value;
    if (destino) {
      calcularRuta(lugar, destino);
    } else {
    alert("Ingresa un destino en el formulario");
    }
};

const btn = document.createElement("button");
btn.textContent = "-";
btn.onclick = (e) => {
  e.stopPropagation(); // ← esto es clave para que no dispare el onclick de ruta
  eliminarFavorito(index);
};

div.appendChild(rutaDiv);
div.appendChild(btn);
contenedor.appendChild(div);
  });
  mostrarFavoritosEnMapa();

  // Actualiza contador y estado del botón
  const btnAgregar = document.getElementById("btn_agregar_lugar");
  const contador = document.getElementById("contador_favoritos");
  if (btnAgregar && contador) {
    contador.textContent = `${favoritos.length}/${maxFavoritos}`;
    btnAgregar.disabled = favoritos.length >= maxFavoritos;
    btnAgregar.classList.toggle("disabled", favoritos.length >= maxFavoritos);
  }
}
function calcularRuta(origen, destino) {
  directionsService.route({
    origin: origen,
    destination: destino,
    travelMode: google.maps.TravelMode.DRIVING,
    provideRouteAlternatives: true
  }, (response, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(response);

      // Mostrar botones para rutas alternativas
      mostrarBotonesAlternativas(response);

      // Mostrar info de la ruta principal
      const leg = response.routes[0].legs[0];
      const distanciaKm = leg.distance.value / 1000;
      const duracionMin = leg.duration.value / 60;

      // Guardar información clave en localStorage para otra vista
      const rutaSeleccionada = {
        origen: leg.start_address,
        destino: leg.end_address,
        distanciaKm: distanciaKm.toFixed(1),
        duracionMin: Math.round(duracionMin),
        costo: calcularCosto(distanciaKm, duracionMin),
        fecha: new Date().toLocaleDateString("es-PE")
      };
      localStorage.setItem("rutaSeleccionada", JSON.stringify(rutaSeleccionada));

      document.querySelector(".user_route_info_time label").textContent = `${Math.round(duracionMin)} min`;
      document.querySelector(".user_route_info_distance label").textContent = `${distanciaKm.toFixed(1)} km`;

      const costo = calcularCosto(distanciaKm, duracionMin);
      document.querySelector(".user_route_info_cost label").textContent = `$${costo}`;
    } else {
      alert("No se pudo calcular la ruta");
    }
  });
}

// Agrega esta función al final del archivo
function mostrarBotonesAlternativas(response) {
  let contenedor = document.getElementById("alternativas_ruta");
  if (!contenedor) {
    contenedor = document.createElement("div");
    contenedor.id = "alternativas_ruta";
    contenedor.style.margin = "10px 0";
    document.querySelector(".user_map_container")?.appendChild(contenedor);
  }
  contenedor.innerHTML = "";

  response.routes.forEach((ruta, idx) => {
    const btn = document.createElement("button");
    btn.textContent = `Ruta ${idx + 1}`;
    btn.style.marginRight = "8px";
    btn.className = "btn-alternativa";
    btn.onclick = () => {
      directionsRenderer.setRouteIndex(idx);
      // Actualiza la info de la ruta seleccionada
      const leg = ruta.legs[0];
      const distanciaKm = leg.distance.value / 1000;
      const duracionMin = leg.duration.value / 60;
      document.querySelector(".user_route_info_time label").textContent = `${Math.round(duracionMin)} min`;
      document.querySelector(".user_route_info_distance label").textContent = `${distanciaKm.toFixed(1)} km`;
      const costo = calcularCosto(distanciaKm, duracionMin);
      document.querySelector(".user_route_info_cost label").textContent = `$${costo}`;
    };
    contenedor.appendChild(btn);
  });
}

function calcularCosto(distanciaKm, tiempoMin) {
  return Math.round(distanciaKm * 2.5 + tiempoMin * 0.3);
}
function cargarFavoritos() {
  renderizarFavoritos();
}
document.querySelector(".search_form").addEventListener("submit", (e) => {
  e.preventDefault();
  const origen = document.getElementById("search_origin").value;
  const destino = document.getElementById("search_destination").value;

  if (origen && destino) {
    calcularRuta(origen, destino);
  } else {
    alert("Completa ambos campos");
  }
});
function limpiarInfoRuta() {
  document.querySelector(".user_route_info_time label").textContent = "-";
  document.querySelector(".user_route_info_distance label").textContent = "-";
  document.querySelector(".user_route_info_cost label").textContent = "-";
}
function eliminarFavorito(index) {
  favoritos.splice(index, 1);
  guardarFavoritos();
  renderizarFavoritos();
}
function initAutocomplete() {
  const inputOrigen = document.getElementById("search_origin");
  const inputDestino = document.getElementById("search_destination");
  if (inputOrigen && inputDestino && window.google && google.maps.places) {
    const limaBounds = new google.maps.LatLngBounds(
      { lat: -12.2, lng: -77.15 }, // Suroeste de Lima
      { lat: -11.9, lng: -76.9 }   // Noreste de Lima
    );
    const options = {
      types: ["geocode"],
      componentRestrictions: { country: "pe" },
      bounds: limaBounds,
      strictBounds: false // true para limitar solo a Lima, false para sugerir cerca
    };
    new google.maps.places.Autocomplete(inputOrigen, options);
    new google.maps.places.Autocomplete(inputDestino, options);
  }
}

let favoritosMarkers = [];

function mostrarFavoritosEnMapa() {
  // Limpia los marcadores anteriores
  favoritosMarkers.forEach(marker => marker.setMap(null));
  favoritosMarkers = [];

  const geocoder = new google.maps.Geocoder();

  favoritos.forEach(fav => {
    geocoder.geocode({ address: fav.direccion }, (results, status) => {
      if (status === "OK" && results[0]) {
        const marker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location,
          title: fav.nombre,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        });
        favoritosMarkers.push(marker);
      }
    });
  });
}
