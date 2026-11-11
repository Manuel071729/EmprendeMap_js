document.addEventListener("DOMContentLoaded", () => {
  initProfile();
  setupEditButton();
  setupLogoutConfirmation();
});

function initProfile() {
  
  const stored = JSON.parse(localStorage.getItem("perfil_propietario") || "{}");
  const nombreLabel = document.querySelector('label[for="nombre"]');
  const telefonoLabel = document.querySelector('label[for="telefono"]');
  const descripcionLabel = document.querySelector('label[for="descripcion"]');
  const fotoImg = document.querySelector(".foto");

  if (stored.nombre) {
    nombreLabel.textContent = Nombre =stored.nombre;
  }
  if (stored.telefono) {
    telefonoLabel.textContent = Teléfono = stored.telefono;
  }
  if (stored.descripcion) {
    descripcionLabel.textContent = Descripcion = stored.descripcion;
  }
  if (stored.foto) {
    fotoImg.src = stored.foto;
  }
}

function setupEditButton() {
  const editarLink = document.querySelector('a.button');
  if (!editarLink) return;

  editarLink.addEventListener("click", (e) => {
    e.preventDefault();
    enterEditMode();
  });
}

function enterEditMode() {
  const card = document.querySelector(".perfil-card");
  if (!card) return;

  
  const editarLink = document.querySelector('a.button');
  editarLink.style.display = "none";

  const nombreLabel = document.querySelector('label[for="nombre"]');
  const telefonoLabel = document.querySelector('label[for="telefono"]');
  const descripcionLabel = document.querySelector('label[for="descripcion"]');
  const fotoImg = document.querySelector(".foto");

  const nombre = parseLabelText(nombreLabel.textContent);
  const telefono = parseLabelText(telefonoLabel.textContent);
  const descripcion = parseLabelText(descripcionLabel.textContent);

  
  const form = document.createElement("div");
  form.className = "edit-form";

  form.innerHTML = `
    <div class="campo">
      <label for="input-nombre">Nombre:</label>
      <input type="text" id="input-nombre" value="${nombre || ""}" />
    </div>
    <div class="campo">
      <label for="input-telefono">Teléfono:</label>
      <input type="text" id="input-telefono" value="${telefono || ""}" />
    </div>
    <div class="campo">
      <label for="input-descripcion">Descripcion:</label>
      <textarea id="input-descripcion" rows="3">${descripcion || ""}</textarea>
    </div>
    <div class="campo">
      <label for="input-foto">Foto:</label>
      <input type="file" id="input-foto" accept="image/*" />
    </div>
    <div class="botones-edicion">
      <button id="guardar">Guardar</button>
      <button id="cancelar">Cancelar</button>
    </div>
  `;

  
  const labelsRow = document.querySelector(".labels-row");
  labelsRow.replaceWith(form);

  
  const inputFoto = document.getElementById("input-foto");
  inputFoto.addEventListener("change", (ev) => {
    const file = ev.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      document.querySelector(".foto").src = e.target.result;
    };
    reader.readAsDataURL(file);
  });

  
  document.getElementById("guardar").addEventListener("click", () => {
    const nuevoNombre = document.getElementById("input-nombre").value.trim();
    const nuevoTelefono = document.getElementById("input-telefono").value.trim();
    const nuevaDescripcion = document.getElementById("input-descripcion").value.trim();

    
    if (!/^\d{7,}$/.test(nuevoTelefono.replace(/\D/g, ""))) {
      alert("Ingresa un teléfono válido (mínimo 7 dígitos).");
      return;
    }

    
    const perfil = {
      nombre: nuevoNombre,
      telefono: nuevoTelefono,
      descripcion: nuevaDescripcion,
    };

    
    const fotoSrc = document.querySelector(".foto").src;
    if (fotoSrc && !fotoSrc.startsWith("http")) {
      perfil.foto = fotoSrc;
    } else if (fotoSrc && fotoSrc.includes("data:")) {
      perfil.foto = fotoSrc;
    }

    localStorage.setItem("perfil_propietario", JSON.stringify(perfil));

    exitEditMode(perfil);
  });

  
  document.getElementById("cancelar").addEventListener("click", () => {
    
    initProfile();
    location.reload();
  });
}

function exitEditMode(perfil) {

  const form = document.querySelector(".edit-form");
  if (!form) return;

  const nuevoDiv = document.createElement("div");
  nuevoDiv.className = "labels-row";
  nuevoDiv.innerHTML = `
    <label for="nombre">Nombre: ${perfil.nombre || ""}</label>
    <label for="telefono">Teléfono: ${perfil.telefono || ""}</label>
    <label for="descripcion">Descripcion: ${perfil.descripcion || ""}</label>
  `;
  form.replaceWith(nuevoDiv);

  
  const editarLink = document.querySelector('a.button');
  if (editarLink) editarLink.style.display = "";

  alert("Cambios guardados.");
}

function parseLabelText(text) {

  const parts = text.split(":");
  if (parts.length < 2) return "";
  let rest = parts.slice(1).join(":").trim();
  if (rest.endsWith(".")) rest = rest.slice(0, -1);
  return rest;
}

function setupLogoutConfirmation() {
  const cerrar = document.querySelector('a.cerrar');
  if (!cerrar) return;
  cerrar.addEventListener("click", (e) => {
    const confirmed = confirm("¿Seguro que quieres cerrar sesión?");
    if (!confirmed) e.preventDefault();
});
}