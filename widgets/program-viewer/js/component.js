import { LitElement, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

// Importaciones de Archivos Separados
import { programViewerStyles } from './ProgramViewer.css.js';
import { CHEVRON_DOWN_SVG, DOWNLOAD_SVG } from './svgs.js';
import { planContentConverter } from './utils/converters.js';

export class ProgramViewer extends LitElement {

    static properties = {
        planContent: {
            type: Array,
            attribute: 'data-plan-content',
            converter: planContentConverter,
        },
        // Propiedad para controlar el índice de la tarjeta visible/activa en el slider
        activeIndex: { type: Number, state: true }
    };

    static styles = programViewerStyles;

    constructor() {
        super();
        this.planContent = [];
        // Inicializar el índice al primer elemento
        this.activeIndex = 0;
    }

    // Se llama después de que el componente se ha renderizado por primera vez.
    firstUpdated() {
        this.updateSliderPosition();
    }

    // Se llama cuando una propiedad observada cambia.
    updated(changedProperties) {
        if (changedProperties.has('activeIndex')) {
            this.updateSliderPosition();
        }
    }

    // --- Lógica del Slider (Botones) ---

    // Mueve el carrusel al índice actual
    updateSliderPosition() {
        const sliderContainer = this.shadowRoot.querySelector('.program-container.multi-plan-view');
        if (!sliderContainer) return;

        // Obtener todas las tarjetas (details)
        const cards = sliderContainer.querySelectorAll('.plan-accordion-details');

        if (cards.length > 0 && this.activeIndex >= 0 && this.activeIndex < cards.length) {
            const activeCard = cards[this.activeIndex];
            // Scroll hacia la tarjeta activa
            sliderContainer.scrollTo({
                left: activeCard.offsetLeft - 20, // Restar el padding-left del contenedor
                behavior: 'smooth'
            });
        }
    }

    scrollPrev() {
        if (this.activeIndex > 0) {
            this.activeIndex--;
        }
    }

    scrollNext() {
        if (this.activeIndex < this.planContent.length - 1) {
            this.activeIndex++;
        }
    }

    // --- Lógica de Acordeón (Cerrar abiertos) ---

    handlePlanSummaryClick(event) {
        const clickedDetails = event.currentTarget.closest('details');
        const isCurrentlyOpen = clickedDetails.hasAttribute('open');

        // Si ya está abierto, déjalo que se cierre por el comportamiento nativo de <details>
        if (isCurrentlyOpen) {
            return;
        }

        // 1. Cerrar todos los demás detalles abiertos
        this.shadowRoot.querySelectorAll('.plan-accordion-details[open]').forEach(details => {
            if (details !== clickedDetails) {
                details.removeAttribute('open');
            }
        });

        // 2. Permitir que el clic nativo abra el clickedDetails
        // (Opcional: podrías usar event.preventDefault() y manejar el open/close tú mismo,
        // pero dejar el comportamiento nativo es más limpio si solo quieres cerrar los demás).
    }

    // --- Métodos de Renderizado ---

    renderPlanDescription(planPost) {
        return html`
            <div class="two-column-description">
                <div class="description-column">
                    <h4>Información General</h4>
                    <p>${planPost.descripcion_larga_col1}</p>
                </div>
                <div class="description-column">
                    <h4>Resultados y Evaluación</h4>
                    <p>${planPost.descripcion_larga_col2}</p>
                </div>
            </div>
        `;
    }

    renderThemeAccordion(planPost) {
        const sections = planPost.sections.filter(s => s.acf_fc_layout === 'tema');
        if (!sections || sections.length === 0) {
            return html`<p style="padding: 10px 0 10px 25px; color: #666;">Este plan no tiene temas definidos.</p>`;
        }

        return html`
        <div class="theme-accordion">
            <h4>Contenido del Plan</h4><div class="accordion-items">
                ${sections.map((section, index) => {
            const itemIndex = `${index + 1}`;

            return html`
                        <details>
                            <summary>
                                <span class="summary-index">U${itemIndex}</span>
                                <span class="summary-title">${section.titulo}</span>
                                <span class="summary-chevron">${CHEVRON_DOWN_SVG}</span> 
                            </summary>
                            <div class="accordion-content">
                                ${this.renderFlexibleContent(section)}
                            </div>
                        </details>
                    </div>`;
        })}
            </div>
        `;
    }

    renderFlexibleContent(section) {
        if (!section || section.acf_fc_layout !== 'tema') {
            return html``;
        }
        return html`
            <div class="flexible-section" data-layout="tema">
                <div class="section-description">
                    ${unsafeHTML(section.descripcion)}
                </div>
            </div>
        `;
    }

    renderSinglePlanView(planPost) {
        const imageUrl = planPost.sections.length > 0 ? planPost.sections[0].imagen_url : 'https://placehold.co/150x150/A0B9BA/ffffff?text=PLAN';
        const downloadUrl = planPost.sections.length > 0 ? planPost.sections[0].download_url : '#download-link';

        return html`
            <div class="program-container single-plan-view">
                <div class="single-plan-header">
                    <div class="header-image-wrapper">
                        <img 
                            src="${imageUrl}" 
                            alt="${planPost.title}" 
                            onerror="this.src='https://placehold.co/150x150/F0F0F0/4D7D7D?text=IMG'"
                        />
                    </div>
                    <div class="header-content">
                        <h2>${planPost.title}</h2>
                        <p class="header-description">${unsafeHTML(planPost.descripcion_corta)}</p>
                    </div>
                    <a href="${downloadUrl}" class="header-download-button" aria-label="Descargar programa completo">
                        ${DOWNLOAD_SVG} Descargar programa
                    </a>
                </div>
                
                <div class="accordion-content">
                    ${this.renderPlanDescription(planPost)}
                    ${this.renderThemeAccordion(planPost)}
                </div>
            </div>
        `;
    }


    renderPlanSummaryCard(planPost, isMultiPlanView) {
        // ... (Tu código para renderPlanSummaryCard permanece igual)
        const imageUrl = planPost.sections.length > 0 ? planPost.sections[0].imagen_url : 'https://placehold.co/100x100/A0B9BA/ffffff?text=PLAN';
        const downloadUrl = planPost.sections.length > 0 ? planPost.sections[0].download_url : '#download-link';

        return html`
            <div class="plan-summary-card-wrapper">
                <div class="plan-summary-card">
                    <div class="card-image-wrapper">
                        <img 
                            src="${imageUrl}" 
                            alt="${planPost.title}" 
                            onerror="this.src='https://placehold.co/100x100/F0F0F0/4D7D7D?text=IMG'"
                        />
                    </div>

                    <div class="card-content">
                        <h3>${planPost.title}</h3>
                        <div class="description-text">
                            ${unsafeHTML(planPost.descripcion_corta)}
                        </div>
                    </div>

                    <div class="card-action-group">
                        <a href="${downloadUrl}" aria-label="Descargar material del plan">
                            ${DOWNLOAD_SVG}
                        </a>
                        ${isMultiPlanView ? html`<div class="chevron-wrapper">${CHEVRON_DOWN_SVG}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    renderMultiPlanView() {
        return html`
            <div class="program-container multi-plan-view">
                    ${this.planContent.map((planPost, index) => {
            const isCardOpen = index === this.activeIndex; // Usamos activeIndex para la inicialización
            return html`
                            <details 
                                .open=${isCardOpen} 
                                class="plan-accordion-details"
                            >
                                <summary @click=${this.handlePlanSummaryClick}>${this.renderPlanSummaryCard(planPost, true)}</summary>
                                <div class="accordion-content">
                                    ${this.renderPlanDescription(planPost)}
                                    ${this.renderThemeAccordion(planPost)}
                                </div>
                            </details>
                        `;
        })}
                </div>
            `;
    }

    render() {
        if (!this.planContent || this.planContent.length === 0) {
            return html`<div class="program-container"><p>No se encontró el Plan de Estudio.</p></div>`;
        }

        const isSinglePlanPost = this.planContent.length === 1;

        if (isSinglePlanPost) {
            return this.renderSinglePlanView(this.planContent[0]);
        } else {
            return html`
                <div class="slider-controls">
                    <button 
                        class="slide-arrow prev-arrow" 
                        aria-label="Anterior" 
                        @click=${this.scrollPrev}
                        ?disabled=${this.activeIndex === 0}
                    >
                        <svg fill="currentColor" viewBox="0 0 20 20"><path d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                    </button>
                    
                    ${this.renderMultiPlanView()}
                    
                    <button 
                        class="slide-arrow next-arrow" 
                        aria-label="Siguiente" 
                        @click=${this.scrollNext}
                        ?disabled=${this.activeIndex === this.planContent.length - 1}
                    >
                        <svg fill="currentColor" viewBox="0 0 20 20"><path d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" fill-rule="evenodd"></path></svg>
                    </button>
                </div>
            `;
        }
    }
}

customElements.define('mawc-program-viewer', ProgramViewer);