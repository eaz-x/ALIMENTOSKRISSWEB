/* =============================================================================
   FLIP-CARD.JS — Tarjeta giratoria genérica para empaques de producto
   
   USO en HTML:
     <div data-flip-container>
       <div data-flip-card>
         <div data-flip-front> <img ...> </div>
         <div data-flip-back>  <img ...> </div>
       </div>
       <button
         data-flip-trigger
         data-label-front="🔄 Ver información nutricional"
         data-label-back="🔄 Ver frente del empaque"
       >
         🔄 Ver información nutricional
       </button>
     </div>
   
   Para agregar un segundo producto, simplemente añade otro bloque
   con los mismos atributos data-flip-* — este script los maneja todos.
   
   Clases CSS gestionadas (definidas en components.css):
     .flip-card--flipped   → estado girado
============================================================================= */

(function () {
  'use strict';

  /* Respeta prefers-reduced-motion */
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Encuentra todos los contenedores flip de la página */
  document.querySelectorAll('[data-flip-container]').forEach((container) => {
    const card    = container.querySelector('[data-flip-card]');
    const trigger = container.querySelector('[data-flip-trigger]');

    if (!card || !trigger) return; /* seguridad */

    const labelFront = trigger.dataset.labelFront || '🔄 Ver frente del empaque';
    const labelBack  = trigger.dataset.labelBack  || '🔄 Ver información nutricional';

    let flipped = false;

    /* Función de giro */
    const flip = () => {
      if (reducedMotion) {
        /* Sin animación: intercambia directamente la visibilidad */
        const front = container.querySelector('[data-flip-front]');
        const back  = container.querySelector('[data-flip-back]');
        if (front && back) {
          front.style.display = flipped ? 'flex' : 'none';
          back.style.display  = flipped ? 'none' : 'flex';
        }
      } else {
        card.classList.toggle('flip-card--flipped');
      }

      flipped = !flipped;
      trigger.setAttribute('aria-pressed', flipped);
      trigger.textContent = flipped ? labelBack : labelFront;
    };

    /* Click en la imagen o en el botón */
    container.querySelector('[data-flip-front], [data-flip-back]')
      ?.closest('.flip-container')
      ?.addEventListener('click', flip);

    trigger.addEventListener('click', (e) => {
      e.stopPropagation(); /* evita doble disparo si el botón está dentro del container */
      flip();
    });

    /* Teclado: Enter o Espacio sobre el contenedor (accesibilidad) */
    const flipContainer = container.querySelector('.flip-container');
    if (flipContainer) {
      flipContainer.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          flip();
        }
      });
    }
  });

})();
