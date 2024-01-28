 // declaracion de los elementos que traeremos para aplicar eventos y modificación de DOM
 let boton = document.getElementById("boton");
 let limpiarBoton = document.getElementById("limpiar")
 let resultadoDiv = document.getElementById("resultado");
 let nombreInput = document.getElementById("nombre");
 let cantidadInput = document.getElementById("cantidad");
 let plazoInput = document.getElementById("plazo");

 let listado = document.getElementById("listado");

 fetch("./data.json")
 .then((response) => response.json())
 .then((data) => {
    data.forEach((clientes) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <h4>${clientes.nombre}</h4>
            <p>${clientes.cantidad}</p>
            <p>Plazo: ${clientes.plazo}</h4>
            <hr/>
            `;

        listado.append(li); 
        
    });
 })

// se cambia la peticion de datos a través de prompy, ahora traemos los valores a treves de document.getElementById
 const calcularMensualidad = () => {
     let nombre = nombreInput.value;
     let cantidad = Number(cantidadInput.value);
     let plazo = Number(plazoInput.value);

//hacemos validacion de los datos solicitados a través de inputs
     do {
         if (!nombre || nombre.trim() === "") {
             resultadoDiv.innerHTML = "Ingresa un nombre válido";
             return;
         }
     } while (!nombre || nombre.trim() === "");

   
     do {
        if (cantidad > 3000000) {
            resultadoDiv.innerHTML = "La cantidad que ingresaste es mayor a 3,000,000 de pesos. Ingresa un monto menor";
            return;
        }
    } while (cantidad > 3000000);
     
     do {
         if (![12, 18, 24].includes(plazo)) {
             resultadoDiv.innerHTML = "Por favor, elija una de las opciones válidas (12, 18 o 24).";
             return;
         }
     } while (![12, 18, 24].includes(plazo));

// creamos variable para calcular la mensualidad de acuerdo a la cantidad y plazo ingresados por usuario 
 let mensualidad;

     switch (plazo) {
         case 12:
             mensualidad = cantidad / 12;
             break;
         case 18:
             mensualidad = cantidad / 18;
             break;
         case 24:
             mensualidad = cantidad / 24;
             break;
         default:
             mensualidad = 0;
     }
// una vez calculado, se crea el objeto 
     const Prestamo = {
         nombre: nombre,
         cantidad: cantidad,
         plazo: plazo,
         mensualidad: mensualidad
     };
//guardamos el objeo prestamo en el arreglo prestamos, que dejamos en longitud de 1
     prestamos.push(Prestamo);
// Guardamos los datos del objeto Prestamo en el local storage
     guardarPrestamosEnLocalStorage(); 

//se da salida al procesamiento a través de un div que resume la operación 
     resultadoDiv.innerHTML = `${nombre}, tu mensualidad fija para pagar tu préstamo de ${cantidad} a ${plazo} meses es de: ${mensualidad} pesos mexicanos`;
 
     Swal.fire({
        position: "top-center",
        icon: "success",
        title: "¡Felicidades, tienes tu préstamo!",
        showConfirmButton: false,
        timer: 2000
      });
 
    }


// funcion que sirve para limpiar el formulario
 const limpiarFormulario = () => {
     document.getElementById("nombre").value = "";
     document.getElementById("cantidad").value = "";
     document.getElementById("plazo").value = "";
     resultadoDiv.innerHTML = "";
     

 }


//creamos dos funciones, una guarda en localstorage y la otra carga
 const guardarPrestamosEnLocalStorage = () => {
     localStorage.setItem("prestamos", JSON.stringify(prestamos));
 }
 
 const cargarPrestamosDesdeLocalStorage = () => {
     const prestamosGuardados = localStorage.getItem("prestamos");
     if (prestamosGuardados) {
         prestamos.push(...JSON.parse(prestamosGuardados));
     }
 }

// funcionalidad de los botones para modificación del DOM 
 boton.addEventListener("click", calcularMensualidad);
 limpiarBoton.addEventListener("click", limpiarFormulario);


// se crea un arreglo de prestamos, lo dejé en uno para sencillez de la página, pero se modifica a gusto
 const prestamos = [];
 cargarPrestamosDesdeLocalStorage();
 for (let i = 0; i < 10; i++) {
     calcularMensualidad();
 }

 const filtrados = prestamos.filter((item) => item.cantidad >= 1000000);

 

 console.log(prestamos);
 console.log(filtrados);

 
