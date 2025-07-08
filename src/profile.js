// Actualiza el nombre completo
document.getElementById("guardarCambiosBtn").addEventListener("click", () => {
  const nuevoNombre = document.getElementById("nombreInput").value.trim();
  const nuevoApellido = document.getElementById("apellidoInput").value.trim();
  document.getElementById("nombreCompleto").textContent = `${nuevoNombre} ${nuevoApellido}`;
});

// Foto de perfil
const uploadBox = document.getElementById("uploadBox");
const inputFoto = document.getElementById("fotoPerfilInput");
const avatarPreview = document.getElementById("avatarPreview");
const navbarProfileImg = document.getElementById("navbarProfileImg");

uploadBox.addEventListener("click", () => {
  inputFoto.click();
});

inputFoto.addEventListener("change", () => {
  const archivo = inputFoto.files[0];
  if (archivo) {
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.src = e.target.result;
      navbarProfileImg.src = e.target.result; // Sincroniza con el navbar
    };
    reader.readAsDataURL(archivo);
  }
});
