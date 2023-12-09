const API_URL_UP = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const API_URL_DO = 'https://api.pinata.cloud/data/testAuthentication';

let numeroIdentificacion; // Variable para xalmacenar el número de identificación
let numeroTelefono; // Variable para xalmacenar el número de identificación
const datosBotones = [];

const seccion1 = document.getElementById('seccion1');
const seccion2 = document.getElementById('seccion2');
const seccion3 = document.getElementById('seccion3');
const seccion4 = document.getElementById('seccion4');

function guardarIdentificacion() {
    numeroIdentificacion = document.getElementById('identificacion').value;
    if (numeroIdentificacion) {
        seccion1.style.display = 'none';
        seccion2.style.display = 'block';
    } else {
        alert('Por favor, ingresa un número de identificación antes de continuar.');
    }
}

function activarSeccion3() {
    seccion2.style.display = 'none';
    seccion3.style.display = 'block';
}

function enviarDatos() {
    console.log('Hola'); // Muestra "Hola" en la consola
    alert('Hola'); // Muestra una alerta con "Hola"
}

function marcarBoton(button) {
    // Cambiar el contenido del botón a una "X" roja del mismo tamaño
    button.innerHTML = "&#10060"; // &#10060 representa el carácter "X" roja en HTML
    button.style.backgroundColor = "transparent"; // Cambiar el fondo a transparente para mantenerlo igual
    button.style.color = "red"; // Cambiar el color de la "X" a rojo
    button.style.fontSize = "100%"; // Establecer el tamaño de fuente al 100%
    
}

function marcarBoton(button) {
    // Verificar si el botón ya está marcado
    if (!button.classList.contains('marcado')) {
        // Almacenar el contenido original del botón
        const contenidoOriginal = button.innerHTML;

        // Cambiar el contenido del botón a una "X" roja
        button.innerHTML = "&#10060"; // &#10060 representa el carácter "X" roja en HTML
        button.style.fontSize = "60%"; 
        button.style.backgroundColor = "transparent"; // Cambiar el fondo a transparente para mantenerlo igual
        button.style.color = "red"; // Cambiar el color de la "X" a rojo
        button.style.border = "1px solid black"; // Mantener el borde

        // Agregar una clase para marcar el botón
        button.classList.add('marcado');
    }
}

function generarID() {
    const longitudID = 6;
    const caracteresPermitidos = "0123456789";
    let idGenerado = "";
  
    for (let i = 0; i < longitudID; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
      idGenerado += caracteresPermitidos.charAt(indiceAleatorio);
    }
  
    return idGenerado;
}

function enviarVoto() {
    // Ocultar la Sección 2
    seccion2.style.display = 'none';
    // Mostrar la Sección 3
    seccion4.style.display = 'block';
}

function enviarVoto2() {
    const botonesMarcados = document.querySelectorAll('.marcado');

    botonesMarcados.forEach((boton) => {
        // Aquí puedes acceder a los datos de cada botón y agregarlos al array
        // Por ejemplo, si tienes un atributo de datos personalizado "data-voto"
        // puedes acceder a él con boton.dataset.voto
        const datos = {
            text:generarID(),
            id:boton.id // ID del botón (puedes personalizarlo)
        };        
        datosBotones.push(datos);
    });
    // Ocultar la Sección 2
    seccion4.style.display = 'none';
    // Mostrar la Sección 3
    seccion3.style.display = 'block';
}

function dataURLtoFile(datoURL, filename, contentType) {
    // Eliminar el prefijo "data:image/jpeg;base64," y obtener los datos base64
    const base64Data = datoURL.replace(/^data:[^;]+;base64,/, '');
  
    // Convertir los datos base64 en un ArrayBuffer
    const binaryString = atob(base64Data);
    const length = binaryString.length;
    const dataArray = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      dataArray[i] = binaryString.charCodeAt(i);
    }
  
    // Crear un Blob a partir del ArrayBuffer
    const blob = new Blob([dataArray], { type: contentType });
  
    // Crear un objeto File a partir del Blob
    const file = new File([blob], filename, { type: contentType });
  
    return file;
}

function arrayToDataURL(datosArray) {
    // Convierte el array de datos en una cadena JSON
    const jsonData = JSON.stringify(datosArray);
    
    // Codifica la cadena JSON en base64
    const base64Data = btoa(jsonData);
    
    // Crea la URL de datos de texto plano base64
    const dataURL = `data:text/plain;base64,${base64Data}`;
    
    return dataURL;
}

async function enviarDatos(){
    numeroTelefono = document.getElementById('telefono').value;
    //datosBotones.push({ cc:numeroIdentificacion});
    //datosBotones.push({ tl:numeroTelefono});
    if (numeroTelefono) {
        const dataURL= arrayToDataURL(datosBotones);
        const filename = numeroIdentificacion+"."+numeroTelefono; // El nombre que deseas para el archivo
        const contentType = 'text/plain'; // El tipo MIME que deseas asignar al archivo
        const fileSent = dataURLtoFile(dataURL, filename, contentType);    

        // Ahora tienes un objeto File que incluye el tipo MIME especificado
        console.log(fileSent);
        // Crear un objeto FormData
        const formDato = new FormData();
        // Agregar la imagen al objeto FormData
        formDato.append('file', fileSent); // 'file' es el nombre del campo que recibirás en el servidor
                      
        const res = await fetch(API_URL_UP, {
            method: 'POST',
            headers: {                
                accept: 'application/json',
                authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIyYjBmZjU1MS02YzY3LTRkMGItOTFhNy0yNTM5OGQxN2U0MjIiLCJlbWFpbCI6Im1hcmNlbG9iYXJyYXphc2FudGlhZ29AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siaWQiOiJGUkExIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9LHsiaWQiOiJOWUMxIiwiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjF9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjI1N2NlNWYxMzQ5Y2EzZTM5YmEzIiwic2NvcGVkS2V5U2VjcmV0IjoiYWM0NDVjYmVmZjM4Mjk1OTlkNjhhOTIyOGFlMDI1ODgxYzM2NDEyMDZlMjU5NWI4YmQwMGRkMGNlYTgyYzQ1MCIsImlhdCI6MTY5NTYxMzE4Nn0.7HdtWvxi-3ttP4R8mjOs798UGU194u33oHQwosGW7nE'
            },
            body: formDato
        });
        const data = await res.json();
        console.log(data);
        alert("Datos enviados correctamente");        
        // Espera 2 segundos (2000 milisegundos) antes de redirigir
        setTimeout(function() {
            // Redirigir al usuario a la página de Instagram6
            window.location.href = "https://www.instagram.com/patricia_barraza_al/";
        }, 2000); // 2000 milisegundos = 2 segundos  
    } else {
        alert('Por favor, ingresa un número de telefono antes de continuar.');
    }
}