// script.js
// Función para el menú hamburguesa en dispositivos móviles
// Menú hamburguesa
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => { nav.classList.toggle("activo"); });

/* Carrusel de imágenes de la sección de instalaciones:
    - Se mueve automáticamente cada 5 segundos.
    - Al llegar al final, vuelve al inicio.
    - Pausa al pasar el ratón por la imagen.
*/
const track = document.querySelector('.carousel-track');
const items = Array.from(track.children);
let index = 0;
let direccion = 1; // 1 = hacia adelante, -1 = hacia atrás

function moverCarrusel() {
    const ancho = items[0].getBoundingClientRect().width;
    // Cambiar dirección al llegar al final o al inicio
    if(index === items.length - 1) direccion = -1;
    else if(index === 0) direccion = 1;
    // Actualizar índice según dirección
    index += direccion;
    // Aplicar transformación
    track.style.transform = `translateX(-${index * ancho}px)`;
}

// Iniciar carrusel
// Si la página se abre en modo web, será automático el desplazamiento, si abre en modo dispositivo, se moverá de forma manual
let intervalo;
function iniciarCarrusel() {
    if (window.innerWidth >= 1024)
        intervalo = setInterval(moverCarrusel, 5000);
}

// Detener Carrusel para pausar el movimiento del contenedor
function detenerCarrusel() {
    clearInterval(intervalo);
}

// Iniciar el carrusel y reiniciar en caso de que cambie la configuración de la pantalla
iniciarCarrusel();
window.addEventListener("resize", () => {
    detenerCarrusel();
    iniciarCarrusel();
})

// Pausa al pasar el ratón por la imagen
track.addEventListener('mouseenter', () => clearInterval(intervalo));
track.addEventListener('mouseleave', () => intervalo = setInterval(moverCarrusel, 5000));


/* Función para enviar desde el formulario de contacto:
    - Valida que todos los campos estén completos.
    - Si hay campos vacíos, muestra un mensaje de error junto al campo.
    - Si todo está correcto, abre WhatsApp con una cabecera predefinida.
*/
const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const motivo = document.getElementById("motivo");
const mensaje = document.getElementById("mensaje");
function enviarFormulario() {
    const campos = [
        { input: nombre, error: nombre.nextElementSibling },
        { input: email, error: email.nextElementSibling },
        { input: motivo, error: motivo.nextElementSibling },
        { input: mensaje, error: mensaje.nextElementSibling }
    ];
    let valido = true;
    campos.forEach(campo => {
        if (campo.input.value.trim() === "") {
            campo.input.classList.add("error-campo");
            campo.error.classList.add("visible");
            valido = false;
        } else {
            campo.input.classList.remove("error-campo");
            campo.error.classList.remove("visible");
        }
    });
    if (!valido) return;
    // Si todo está correcto -> envío del mensaje a través de WhatsApp
    const texto = `Hola, soy ${nombre.value}. Mi correo es ${email.value}. Escribo acerca de ${motivo.value}. ${mensaje.value}`;

    window.open("https://wa.me/34639128494?text=" + encodeURIComponent(texto), "_blank");
}