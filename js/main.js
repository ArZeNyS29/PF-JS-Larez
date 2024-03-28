// Función para mostrar los productos
function mostrarProductos() {
  fetch("./js/productos.json")
  .then(productos => productos.json())
  .then(data => {
      let prodHTML = "";
      for (const prod of data) {
        prodHTML += `
        <div class="card fixed-height-card m-3 position-relative" style="width: 18rem;">
            <img src="${prod.img}" class="card-img-top img-fluid" style="max-height: 200px;" alt="${prod.nombre}">
            <div class="card-body d-flex flex-column justify-content-end">
                <h4 class="card-title">${prod.nombre}</h4>
                <select id='cant${prod.id}' class="form-select form-select-sm w-50" aria-label="Default select example">
                  <option value="" disabled selected hidden>Cantidad</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
                <p>Precio: $${prod.precio}</p>
                <button id="${prod.id}" class="btn btn-primary align-self-start mb-3" onclick="agregarProdcto('${prod.nombre}',${prod.precio},parseInt(document.getElementById('cant${prod.id}').value))">Añadir al carrito</button>
            </div>
        </div>
        `;
      }
      document.getElementById("cards").innerHTML=prodHTML;
  });
}

mostrarProductos()