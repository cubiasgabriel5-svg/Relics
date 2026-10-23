document.addEventListener("DOMContentLoaded", () => {

/* DESPLAZAMIENTO SUAVE */

const enlaces = document.querySelectorAll('a[href^="#"]');

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


/* ANIMACIĆ“N DE SECCIONES */

const secciones = document.querySelectorAll("section");

const observar = new IntersectionObserver(
    (entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
            }
        });
    },
    { threshold: 0.15 }
);

secciones.forEach(seccion => observar.observe(seccion));


/* PARTĆ¨CULAS DORADAS */

const canvas = document.getElementById("particulas");

if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {

    const ctx = canvas.getContext("2d");
    let ancho, alto, particulas = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function ajustar() {
        ancho = window.innerWidth;
        alto = window.innerHeight;
        canvas.width = ancho * dpr;
        canvas.height = alto * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const cantidad = ancho < 700 ? 35 : 70;
        particulas = Array.from({ length: cantidad }, () => nueva(true));
    }

    function nueva(inicial = false) {
        return {
            x: Math.random() * ancho,
            y: inicial ? Math.random() * alto : alto + 10,
            r: Math.random() * 2 + 0.6,
            vy: Math.random() * 0.4 + 0.15,
            vx: (Math.random() - 0.5) * 0.25,
            fase: Math.random() * Math.PI * 2,
            brillo: Math.random() * 0.02 + 0.01
        };
    }

    function dibujar() {
        ctx.clearRect(0, 0, ancho, alto);

        particulas.forEach((p, i) => {
            p.y -= p.vy;
            p.x += p.vx + Math.sin(p.fase) * 0.15;
            p.fase += p.brillo * 3;

            const alpha = 0.25 + Math.abs(Math.sin(p.fase)) * 0.55;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(212, 175, 55, " + alpha + ")";
            ctx.shadowColor = "rgba(255, 215, 90, 0.9)";
            ctx.shadowBlur = 8;
            ctx.fill();

            if (p.y < -10 || p.x < -10 || p.x > ancho + 10) {
                particulas[i] = nueva();
            }
        });

        requestAnimationFrame(dibujar);
    }

    ajustar();
    window.addEventListener("resize", ajustar);
    dibujar();
}

});