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
