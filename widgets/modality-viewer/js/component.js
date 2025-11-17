import { LitElement, html, css } from 'lit';
// Ya no necesitamos 'unsafeHTML'

export class ModalityViewer extends LitElement {

    static properties = {
        postId: { type: String, attribute: 'data-post-id' },
        modalities: {
            type: Array,
            attribute: 'data-modalities',
            converter: {
                fromAttribute: (value) => {
                    try {
                        return JSON.parse(value || '[]');
                    } catch (e) {
                        console.error("Error al parsear el atributo 'data-modalities':", e);
                        return [];
                    }
                },
            }
        },
    };

    static styles = css`
        :host {
            display: block;
            margin: 20px 0;
        }

        /* Contenedor principal para la disposición horizontal */
        .modality-list {
            display: flex;
            gap: 10px; /* Incrementé el gap para que el texto hover no choque */
            padding: 0;
            margin:0;
            list-style: none;
            justify-content: left;
            flex-wrap: wrap;
        }

        /* Contenedor de cada ítem */
        .modality-item {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            cursor: pointer;
            padding: 0px;
        }
        
        /* Contenedor del ícono visible */
        .modality-icon {
            width: 40px; /* Tamaño del área visible */
            height: 40px;
            border: 2px solid #ddd;
            border-radius: 50%;
            display: grid;
            place-content: center;
            transition: all 0.3s ease;
            background-color: #fff;
        }

        
        /* Estilo de la imagen SVG cargada */
        .modality-icon img {
            width: 100%; /* La imagen es más pequeña que el contenedor */
            height: 100%;
            object-fit: contain;
            transition: all 0.3s ease;
        }

        /* Contenedor del texto oculto (Tooltip) */
        .modality-name {
            position: absolute;
            top: 100%;
            margin-top: 15px; /* Más margen para separación */
            padding: 8px 12px;
            background-color: #333;
            color: #fff;
            border-radius: 4px;
            white-space: nowrap;
            pointer-events: none; 
            opacity: 0;
            visibility: hidden;
            transform: translateY(10px);
            transition: opacity 0.3s, transform 0.3s, visibility 0.3s;
            z-index: 10;
        }

        /* Efecto Hover */
        .modality-item:hover .modality-icon {
            background-color: #D3FF00;
            border-color: #272727;
            transform: scale(1.1);
        }

        /* Opcional: Si el SVG está bien diseñado, puedes mantener el color del borde como el único indicador visual de hover */

        .modality-item:hover .modality-name {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
    `;

    constructor() {
        super();
        this.postId = '';
        this.modalities = [];
    }

    render() {
        return html`
            <ul class="modality-list">
                ${this.modalities.map(modality => html`
                    <li class="modality-item" aria-label=${modality.name} tabindex="0">
                        <div class="modality-icon">
                            ${modality.icon_svg ? html`
                                <img src=${modality.icon_svg} alt="Icono de ${modality.name}" />
                            ` : html`<span style="font-size: 24px;">?</span>`}
                        </div>
                        <span class="modality-name">${modality.name}</span>
                    </li>
                `)}
            </ul>
        `;
    }
}

customElements.define('mawc-modality-viewer', ModalityViewer);