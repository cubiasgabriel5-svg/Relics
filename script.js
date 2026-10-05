document.addEventListener("DOMContentLoaded", () => {

/* DESPLAZAMIENTO SUAVE */

const enlaces = document.querySelectorAll(
    'a[href^="#"]'
);

enlaces.forEach(enlace => {

    enlace.addEventListener("click", function (e) {

        const destino = this.getAttribute("href");

        if (!destino || destino === "#") {
            return;
        }

        const seccion = document.querySelector(destino);

        if (seccion) {
            e.preventDefault();

            seccion.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }
    });

});


/* ANIMACIÓN DE BOTONES */

const botones = document.querySelectorAll(
    ".boton, .boton-secundario"
);

botones.forEach(boton => {

    boton.addEventListener("mouseenter", () => {
        boton.style.transition = "0.3s";
    });

});


/* ANIMACIÓN DE SECCIONES */

const secciones = document.querySelectorAll("section");

const observar = new IntersectionObserver(
    (entradas) => {

        entradas.forEach(entrada => {

            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
            }

        });

    },
    {
        threshold: 0.15
    }
);


secciones.forEach(seccion => {
    observar.observe(seccion);
});


});
