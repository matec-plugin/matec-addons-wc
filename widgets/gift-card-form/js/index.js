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

const el = document.querySelector('mawc-gift-card-form');
el.recommendations = [
  { amount: 8000, label: 'Café & medialunas (1-2 pers.)', icon: 'coffee' },
  { amount: 18000, label: 'Brunch liviano (2 pers.)', icon: 'utensils' },
  { amount: 45000, label: 'Cena aniversario (2-3 pers.)', icon: 'gift' },
];