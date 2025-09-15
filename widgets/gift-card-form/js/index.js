import './component.js';

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