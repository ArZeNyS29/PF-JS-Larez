const carrito=[];

class Producto{
    constructor (name,price,cant){
    this.name=name;
    this.price=price*cant;
    this.cant=cant;
    }
}

function agregarProdcto(name,price,cant){
    if(cant>=1){
        let carrito=callCarritoLS();
        const repito = carrito.some(producto=> producto.name === name) 
        const carga= repito ? 
        prodRepit(name,price,cant) : (carrito.push(new Producto(name,price,cant)), guardarCarritoLS(carrito));
        Toastify({
            text: "Producto Cargado Con Exito",
            duration: 2000,
            style: {
                background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
        }).showToast();
        canvaCart();
    }else{
        Toastify({
            text: "Selecione Cantidad",
            duration: 1500,
            style: {
                background: "linear-gradient(to right,#FF3F3F, #FF7E7E,#FFBEBE)",
            },
        }).showToast();
    }
}

function guardarCarritoLS(cart){
    localStorage.setItem("cart", JSON.stringify(cart))
}

function callCarritoLS(){
    const cartData = localStorage.getItem("cart");
    return cartData ? JSON.parse(cartData) : [];
}

function verCart(){
    console.log(callCarritoLS());
}

function eraseCart(){
    localStorage.clear();
    canvaCart();
}


function prodRepit(name,price,num){
    let carrito=callCarritoLS();
    let repetid= carrito.findIndex(cart => cart.name === name)
    carrito[repetid].cant=carrito[repetid].cant+num;
    carrito[repetid].price=price*carrito[repetid].cant;
    guardarCarritoLS(carrito);
    canvaCart();
}

function canvaCart(){
    let carrito=callCarritoLS();
    let listHTML="";
    let total=0
    for (const prod of carrito) {
        listHTML+=`
        <tr>
        <th scope="row">${prod.cant}</th>
        <td>${prod.name}</td>
        <td></td>
        <td>${prod.price}</td>
        </tr>
        `
        total+=prod.price;
    }
    document.getElementById("listCarrito").innerHTML=listHTML;
    document.getElementById("totalCart").innerHTML=`<p>${total}</p>`
}



document.addEventListener("DOMContentLoaded", function() {
    canvaCart();
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("borrarCarrito").addEventListener("click", function() {
        eraseCart();
    });
});

document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("compraExitosa").addEventListener("click",function(){
        Swal.fire({
            title: 'Gracias por su compra!',
            text: 'Su pedido a Pasado a deposito',
            icon: 'success',
            confirmButtonText: 'Ok'})
        eraseCart();/*Para el futuro agregar envio de carrito al mail para su despacho*/
    })
})


