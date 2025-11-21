import { css } from 'lit';

export const programViewerStyles = css`
    :host {
        display: block;
        font-family: 'Inter', Arial, sans-serif;
        --main-color: #D4FF00; /* Azul primario */
        --accent-color: #333; /* Color de línea/puntos de la imagen de referencia */
        --background-card-color: transparent; /* Gris claro para el fondo */
        --line-offset: 10px; /* Posición de la línea y el punto en desktop timeline */
    }

    /* ---------------------------------------------------- */
    /* Contenedor principal y estructura de acordeón */
    /* ---------------------------------------------------- */
    .program-container {
        background-color: var(--background-card-color);
        padding: 10px;
        border-radius: 8px;
    }

    /* Estilos aplicados solo a la vista de múltiples planes (Acordeón) */
    .plan-accordion-details {
        border: none;
        margin-bottom: 0;
        overflow: visible;
        background-color: transparent;
        position: relative;
    }
    .plan-accordion-details summary {
        cursor: pointer;
        outline: none;
        list-style: none;
        padding: 10px 0;
    }
    .plan-accordion-details summary::-webkit-details-marker,
    .plan-accordion-details summary::marker {
        display: none;
    }

    /* Contenedor que desplaza la tarjeta a la derecha de la línea */
    .plan-summary-card-wrapper {
        padding-left: 10px;
        position: relative;
    }
    /* Solo en desktop se aplica el desplazamiento para el timeline vertical */
    @media (min-width: 641px) {
        .multi-plan-view .plan-summary-card-wrapper {
            padding-left: calc(var(--line-offset) + 10px);
        }
    }

    /* Línea conectora entre tarjetas (Solo para multi-plan y si no es la última - Desktop Timeline) */
    @media (min-width: 641px) {
        .multi-plan-view .plan-accordion-details:not(:last-of-type)::after {
            content: '';
            position: absolute;
            top: 60px; /* Ajuste para alinear con el centro de la imagen en la tarjeta */
            left: var(--line-offset);
            bottom: -65px; /* Valor ajustado para conectar bien los puntos */
            width: 4px;
            background-color: var(--accent-color);
            z-index: 10; /* Pasa por encima de la tarjeta */
        }
    }

    /* Estilo de Tarjeta para el Encabezado del Plan */
    .plan-summary-card {
        background-color: #f4f4f4;
        border-radius: 12px;
        padding: 15px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s;
        display: flex;
        align-items: stretch;
        position: relative;
        z-index: 5; /* Queda debajo de la línea */
    }
    .multi-plan-view .plan-summary-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    /* Punto decorativo sobre la línea: Centrado en la posición de la línea (solo para multi-plan - Desktop) */
    @media (min-width: 641px) {
        .multi-plan-view .plan-summary-card::before {
            content: '';
            position: absolute;
            top: 50%;
            left: calc(var(--line-offset) * -1 - 5px); /* Ajuste para centrar el punto en la línea */
            transform: translateY(-50%);
            width: 10px;
            height: 10px;
            background-color: var(--accent-color);
            border-radius: 50%;
            border: 2px solid #fff;
            box-sizing: content-box;
            z-index: 15; /* Más alto que la línea para que quede centrado sobre ella */
        }
    }


    /* Contenido de la Tarjeta */
    .card-image-wrapper {
        flex-shrink: 0;
        width: 80px;
        height: 80px;
        margin-right: 20px;
        overflow: hidden;
        border-radius: 8px;
    }
    .card-image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
    }

    .card-content {
        flex-grow: 1;
        padding-right: 15px;
    }
    .card-content h3 {
        font-size: 1.1em;
        font-weight: 700;
        color: #333;
        margin: 0 0 5px 0;
    }
    .card-content .description-text {
        font-size: 0.9em;
        color: #666;
        line-height: 1.4;
        white-space: wrap;
    }

    /* Acciones e Iconos */
    .card-action-group {
        flex-shrink: 0;
        margin-left: auto;
        align-self: flex-start;
        display: flex;
        gap: 10px;
    }

    /* Rotación del Chevron Principal */
    .chevron-wrapper {
        transition: transform 0.3s ease;
    }
    .plan-accordion-details:not([open]) .chevron-wrapper {
        transform: rotate(0deg);
    }
    .plan-accordion-details[open] .chevron-wrapper {
        transform: rotate(180deg);
    }

    /* ---------------------------------------------------- */
    /* Contenido del Plan (Descripción Larga y Temas) */
    /* ---------------------------------------------------- */
    .accordion-content {
        padding: 10px 15px;
        background-color: #fff;
        border-radius: 0 0 20px 20px;
        margin-top: -8px;
        margin-left:0;
        border: 2px solid #333;
    }
    /* Ajuste de padding para el contenido cuando es multi-plan (Desktop Timeline) */
    @media (min-width: 641px) {
        .multi-plan-view .accordion-content {
            padding-left: calc(var(--line-offset) + 10px);
        }
    }


    /* ---------------------------------------------------- */
    /* Single Plan View - Encabezado Único */
    /* ---------------------------------------------------- */

    .single-plan-view > .accordion-content {
    border: 0px solid #333;
    border-top: 2px solid #333;
    margin-top: 0;
    border-radius: 0 0 12px 12px;
}
    .single-plan-view .single-plan-header {
        background-color: #fff;
        border-radius: 12px 12px 0 0;
        border: none;
        border-bottom: none;
        padding: 20px;
        display: flex;
        flex-direction: column; /* Apilado por defecto */
        align-items: center;
        text-align: center;
    }
    /* ... (Estilos de Single Plan Header, Two Column Description, etc. permanecen igual) ... */
    .single-plan-view .single-plan-header .header-image-wrapper {
        width: 150px; /* Imagen más grande */
        height: 150px;
        margin-bottom: 20px;
        border-radius: 50%; /* Circular */
        overflow: hidden;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }
    .single-plan-view .single-plan-header .header-image-wrapper img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    .single-plan-view .single-plan-header h2 {
        font-size: 2em; /* Título más grande */
        color: #333;
        margin: 0 0 10px 0;
        line-height: 1.2;
    }
    .single-plan-view .single-plan-header .header-description {
        font-size: 1.1em; /* Descripción más prominente */
        color: #555;
        line-height: 1.6;
        max-width: 700px;
        margin-bottom: 20px;
    }
    .single-plan-view .single-plan-header .header-download-button {
        display: inline-flex;
        align-items: center;
        background-color: var(--main-color);
        color: var(--accent-color);
        padding: 10px 20px;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
        transition: background-color 0.2s;
    }
    .single-plan-view .single-plan-header .header-download-button:hover {
        background-color: #a9cc00;
        color: #fff;
    }
    .single-plan-view .single-plan-header .header-download-button svg {
        width: 20px;
        height: 20px;
        margin-right: 8px;
        stroke: var(--accent-color);
    }

    /* Desktop para Single Plan Header */
    @media (min-width: 768px) {
        .single-plan-view .single-plan-header {
            flex-direction: row; /* Layout horizontal */
            text-align: left;
            align-items: flex-start;
            padding: 30px;
        }
        .single-plan-view .single-plan-header .header-image-wrapper {
            margin-right: 30px;
            margin-bottom: 0;
        }
        .single-plan-view .single-plan-header .header-content {
            flex-grow: 1;
        }
        .single-plan-view .single-plan-header .header-download-button {
            align-self: flex-end; /* Alinea el botón a la derecha */
            margin-left: auto; /* Empuja el botón a la derecha */
        }
    }


    /* Contenido Flexible: Descripción en 2 Columnas (Desktop) */
    .two-column-description {
        padding-bottom: 15px;
        border-bottom: 1px solid #eee;
        margin-bottom: 15px;
    }
    @media (min-width: 768px) {
        .two-column-description {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
        }
    }

    .description-column {
        font-size: 0.9em;
        color: #444;
        line-height: 1.6;
        margin-bottom: 10px;
    }
    @media (min-width: 768px) {
        .description-column {
            margin-bottom: 0;
        }
    }

    /* ---------------------------------------------------- */
    /* Temas con Timeline (Diseño Original Interior) */
    /* ---------------------------------------------------- */
    .theme-accordion {
        position: relative;
        padding: 10px 0;
    }

    // /* Dibujar la Línea Temporal Vertical Interior */
    // .theme-accordion::before {
    //     content: '';
    //     position: absolute;
    //     top: 0;
    //     bottom: 0;
    //     left: 7px; /* Solo 7px de offset en la vista single/acordeón interno */
    //     width: 2px;
    //     background-color: #eee;
    // }

    .accordion-items{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    }
    /* El offset de la línea interna cambia en el multi-plan (Desktop Timeline) */
    @media (min-width: 641px) {
        .multi-plan-view .theme-accordion::before {
            left: var(--line-offset);
        }
    }


    .theme-accordion details {
        border: none;
        margin-bottom: 0;
        position: relative;
    }
    .theme-accordion details > summary {
        background-color: #fff;
        color: #333;
        border: 2px solid #333;
        border-radius: 10px;
        cursor: pointer;
        padding: 12px;
        font-weight: normal;
        display: flex;
        align-items: center;
        gap:10px;
    }


    /* Índice Numérico (DOT en la línea temporal) */
    .summary-index {
        display: grid;
        place-items: center;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-color: var(--main-color);
        color: var(--accent-color);
        font-size: 0.8em;
        font-weight: 600;
        z-index: 10;
    }
    /* El índice se alinea al inicio de la tarjeta en multi-plan (Desktop Timeline) */
    @media (min-width: 641px) {
        .multi-plan-view .theme-accordion .summary-index {
            left: 0;
        }
    }

    .theme-accordion .summary-title {
        flex-grow: 1;
        margin-right: 10px;
    }
    .theme-accordion .summary-chevron svg {
        width: 18px;
        height: 18px;
        stroke: #333;
        transition: transform 0.3s;
    }

    /* Contenido del Desplegable (Descripción del Tema) */
    .theme-accordion .accordion-content {
        padding: 10px 0 15px 25px;
        background-color: #fff;
        color: #555;
        font-size: 0.9em;
    }
    /* Alineación del Título/Párrafo del Tema */
    .theme-accordion h4 {
        padding-left: 25px;
        color: #333;
        margin: 0 0 10px 0;
    }
    /* El padding cambia en multi-plan (Desktop Timeline) */
    @media (min-width: 641px) {
        .multi-plan-view .theme-accordion h4 {
            padding-left: calc(var(--line-offset) + 25px);
        }
    }


    /* ---------------------------------------------------- */
    /* Flechas de Navegación (Controles del Carrusel) */
    /* ---------------------------------------------------- */

    /* Contenedor wrapper para posicionar las flechas absolutas */
    .slider-controls {
        position: relative;
        display: block;
    }
    /* Ocultar las flechas en desktop */
    @media (min-width: 641px) {
        .slide-arrow {
            display: none !important;
        }
        .slider-controls {
            padding: 0; /* Eliminar padding en desktop */
        }
    }

    .slide-arrow {
        position: absolute;
        top: 50%; /* Centrado vertical */
        transform: translateY(-50%);
        background: #fff;
        border: 1px solid #ddd;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        display: grid;
        place-items: center;
        cursor: pointer;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        z-index: 20; /* Por encima de todo */
        color: var(--accent-color);
        transition: opacity 0.3s;
    }

    .slide-arrow:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }

    .slide-arrow svg {
        width: 20px;
        height: 20px;
    }

    .prev-arrow {
        left: 5px; /* Flecha izquierda al borde */
    }

    .next-arrow {
        right: 5px; /* Flecha derecha al borde */
    }

    /* ---------------------------------------------------- */
    /* AJUSTES PARA VISTA MÓVIL (<= 640px) */
    /* Transformación a Carrusel Horizontal - Controlado por JS */
    /* ---------------------------------------------------- */
    @media (max-width: 640px) {
        /* Wrapper de control necesario para el posicionamiento de las flechas */
        .slider-controls {
            padding: 20px; /* Margen para las flechas laterales */
            overflow: hidden;
        }

        /* 1. Contenedor Principal: Desactivar scroll manual y snap */
        .program-container.multi-plan-view {
            padding: 10px 0;
            white-space: nowrap;

            /* --- CAMBIO CLAVE para desactivar el deslizamiento manual --- */
            overflow-x: hidden;
            scroll-snap-type: none;
            /* ---------------------------------------------------------- */

            overflow-y: hidden;
            background-color: transparent;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-left: 20px; /* Offset inicial para la primera tarjeta */
            padding-right: 20px; /* Offset final para la última tarjeta */
        }
        .program-container.multi-plan-view::-webkit-scrollbar {
            display: none;
        }

        /* 2. Acordeón (details): Convertir en tarjetas in-line */
        .multi-plan-view .plan-accordion-details {
            display: inline-block;
            max-width: 300px;
            margin-right: 20px; /* Espacio entre tarjetas */
            vertical-align: top;
            padding: 0;
            position: relative;
            white-space: normal; /* Permitir salto de línea dentro de la tarjeta */
        }

        /* 3. Ocultar Elementos de Timeline Vertical en Mobile */
        .multi-plan-view .plan-accordion-details::after,
        .multi-plan-view .plan-summary-card::before {
            display: none;
        }

        /* 4. Tarjeta de Resumen y Wrapper */
        .multi-plan-view .plan-summary-card-wrapper {
            padding-left: 0;
            margin: 0;
        }

        .plan-summary-card {
            flex-direction: column; /* Apilamos la imagen y el texto */
            align-items: center;
            text-align: center;
            position: relative;
            z-index: 5;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            width: calc(100% - 30px);
            margin: 0 auto;
            padding:25px;
        }

        /* 5. Contenido Desplegable (Debajo de la tarjeta) */
        .multi-plan-view .accordion-content {
            padding-left: 15px;
            margin-left: 0;
            border-radius: 0 0 20px 20px;
            margin-top: 0;
        }
        .multi-plan-view .plan-accordion-details[open] .accordion-content {
            border-top: 1px solid #eee;
            margin-top: -1px;
        }

        /* 6. Alinear elementos de la Tarjeta */
        .card-image-wrapper {
            margin-right: 0;
            margin-bottom: 10px;
            width: 80px;
            height: 80px;
        }
        .card-content {
            padding-right: 0;
        }
        .card-content h3 {
            justify-content: center;
            font-size: 1.2em;
        }
        .card-action-group {
            position: static;
            margin-top: 10px;
            margin-left: 0;
            width: 100%;
            justify-content: center; /* Centrar acciones en mobile */
        }

        /* 7. Ajustes de la última tarjeta en el carrusel */
        .multi-plan-view .plan-accordion-details:last-of-type {
            margin-right: 40px;
        }

        /* Resetear los padding-left del timeline interno si se usan */
        .multi-plan-view .theme-accordion h4 {
            padding-left: 25px;
        }
    }
`;