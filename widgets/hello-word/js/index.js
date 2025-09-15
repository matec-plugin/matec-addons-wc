// Importa el componente (esto registra <mi-ejemplo/>)
import './component.js';

// Helper por si querés hacer algo al insertarse en el DOM
const init = (scope) => {
  const root = (scope || document);
  // Podés hacer inicializaciones adicionales si las necesitás
  // Ej: root.querySelectorAll('mi-ejemplo').forEach(el => { ... });
};

// Front
document.addEventListener('DOMContentLoaded', () => init());

// Editor de Elementor: re-inicializa en cada render de este widget
window.addEventListener('elementor/frontend/init', () => {
  const { frontend } = elementor;
  frontend.hooks.addAction('frontend/element_ready/hello-word.default', ($scope) => {
    init($scope[0] || $scope);
  });
});
