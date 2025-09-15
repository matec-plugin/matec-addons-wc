import './component.js';
const slides = [
{ src: 'https://picsum.photos/id/21/1600/800', alt: 'Bosque', badgeText: 'EBA', title:'Formación Consciente', subtitle:'Más de 800 árboles plantados por la comunidad', ctaText:'Ver Cursos', ctaHref:'/cursos' },
{ src: 'https://picsum.photos/id/31/1600/800', alt: 'Montaña', title:'Becas y Descuentos', subtitle:'10% OFF por transferencia', ctaText:'Conocé más', ctaHref:'/beneficios' },
{ src: 'https://picsum.photos/id/1044/1600/800', alt: 'Lago', title:'Workshops', subtitle:'Próximas fechas', ctaText:'Agenda', ctaHref:'/workshops' },
];
window.addEventListener('DOMContentLoaded', ()=>{
const el = document.querySelector('hero-slider');
el.slides = slides; // también podés setear por atributo con JSON válido
});
