document.querySelector('.contact-button').addEventListener('click', () => {
  alert('Gracias por tu interés. Pronto te contactaremos.');
});

locales.forEach(local => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3>${local.nombre}</h3>
    <img src="${local.imagen}" alt="${local.nombre}">
    <p>En ${local.tipo}</p>
    <button class="label-type" onclick="verDetalle('${local.nombre}', '${local.tipo}', '${local.precio}', '${local.imagen}', \${local.descripcion}\)">
      ${local.tipo.toUpperCase()}
    </button>
    <p class="price">${local.precio}</p>
  `;
  contenedor.appendChild(card);
});

