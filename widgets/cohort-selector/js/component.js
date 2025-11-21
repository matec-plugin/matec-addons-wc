import { LitElement, html } from 'lit';

import { cohortSelectorStyles } from './CohortSelector.css.js';

class CohortSelector extends LitElement {

    static properties = {
        cohort: {
            type: Array, // Sigue siendo Array, aunque el valor es un objeto (Lit lo maneja)
            attribute: 'data-cohorts',
            converter: {
                fromAttribute: (value) => {
                    try {
                        return JSON.parse(value);
                    }
                    catch (e) {
                        console.error("Error al parsear el atributo 'data-cohorts':", e);
                        // Devolvemos el formato esperado vacío para evitar errores en render()
                        return { horarios: [] };
                    }
                }
            }
        }
    };


    static styles = cohortSelectorStyles;

    constructor() {
        super();
        // Inicialización por defecto
        this.cohort = { horarios: [] };
    }


    render() {
        // Accedemos al array anidado 'horarios' con manejo de errores
        const horarios = this.cohort?.horarios ?? [];

        // Función auxiliar para unir una lista de cadenas con comas y 'y' al final
        const formatList = (items) => {
            if (items.length === 0) return '';
            if (items.length === 1) return items[0];

            // Une todos los elementos excepto el último con coma y espacio
            const allButLast = items.slice(0, -1).join(', ');
            // Obtiene el último elemento
            const lastItem = items[items.length - 1];

            // Combina: "Item1, Item2 y Item3"
            return `${allButLast} y ${lastItem}`;
        };

        // Función auxiliar para formatear los horarios
        const formatHorarioSemanal = (horarioSemanal) => {
            if (!horarioSemanal || horarioSemanal.length === 0) {
                return 'No especificado';
            }

            // Mapea cada rango de hora
            return horarioSemanal.map(rango => {
                // 1. Extrae solo las etiquetas (nombres) de los días
                const diasLabelsArray = rango.dia.map(d => d.label);

                // 2. Formatea la lista de días usando la nueva función
                const diasLabels = formatList(diasLabelsArray);

                // 3. Concatena los días con el rango de horas, acortando las horas a HH:MM
                return `${diasLabels}: ${rango.hora_de_inicio.substring(0, 5)} - ${rango.hora_de_finalizacion.substring(0, 5)}`;
            }).join(' | '); // Une los diferentes rangos semanales (ej: [Lunes...] | [Viernes...])
        };

        return html`
      <div>
        <h3>Selector de Cohorte</h3>
                ${horarios.length === 0
                ? html`<p>No hay horarios disponibles.</p>`
                : html`
                        <ul>
                            ${horarios.map(horario => html`
                                <li>
                                    <p>
                                        <strong>ID:</strong> ${horario.id} | 
                                        <strong>Modalidad:</strong> ${horario.modalidad.label} <br>
                                        <strong>Nombre:</strong> ${horario.nombre} <br>
                                        <strong>Inicio:</strong> ${horario.fecha_inicio} <br>
                                        <strong>Cupos:</strong> ${horario.cupos} <br>
                                        <strong>Horario Semanal:</strong> ${formatHorarioSemanal(horario.horario_semanal)}
                                    </p>
                                </li>
                            `)}
                        </ul>
                    `
            }
      </div> 
    `;
    }

}

customElements.define('mawc-cohort-selector', CohortSelector);