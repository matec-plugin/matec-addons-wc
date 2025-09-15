import './component.js';
/*
USO RÁPIDO (pégalo en un HTML):

  <script type="module">
    import 'https://esm.run/lit'; // Asegura Lit disponible si tu hosting no resuelve dependencias
    import './gift-card-form.js';
  </script>

  <gift-card-form currency="ARS" locale="es-AR"></gift-card-form>

ESCUCHAR EL EVENTO:
  document.addEventListener('giftcard-submit', (ev)=>{
    console.log('Detalle compra:', ev.detail);
    // Aquí llamar a tu backend para crear el pago, enviar email, programar alerta, etc.
  });

PERSONALIZAR RECOMENDACIONES DESDE JS:
  const el = document.querySelector('gift-card-form');
  el.recommendations = [15000, 30000, 75000];
*/

const init = (scope) => {
  const root = (scope || document);
  // Podés hacer inicializaciones adicionales si las necesitás
  // Ej: root.querySelectorAll('mi-ejemplo').forEach(el => { ... });
};

// Front
document.addEventListener('DOMContentLoaded', () => init());


document.addEventListener('giftcard-submit', (ev) => {
    console.log('Detalle compra:', ev.detail);
    // Aquí llamar a tu backend para crear el pago, enviar email, programar alerta, etc.
});

const el = document.querySelector('gift-card-form');
el.recommendations = [15000, 30000, 75000];