export const planContentConverter = {
    fromAttribute: (value) => {
        try {
            // Simulación de datos para tener imágenes y enlaces si rellenar propiedades faltantes
            const parsedContent = JSON.parse(value || '[]');
            return parsedContent.map((plan, planIndex) => ({
                ...plan,
                sections: plan.sections ? plan.sections.map((section, sectionIndex) => ({
                    ...section,
                    imagen_url: section.imagen_url || `https://placehold.co/100x100/A0B9BA/ffffff?text=PLAN`,
                    download_url: section.download_url || '#download-link',
                })) : [],
                // Usamos el título como descripción larga si no existe una corta
                descripcion_corta: plan.descripcion_corta || "Este módulo cubre todos los temas esenciales para una comprensión profunda del plan de estudios, desde los fundamentos hasta las aplicaciones avanzadas en el campo.",
                // Simulación de contenido de descripción larga para las 2 columnas
                descripcion_larga_col1: "Contenido temático detallado para la Columna 1. Incluye objetivos, metodologías clave y recursos de apoyo.",
                descripcion_larga_col2: "Contenido temático detallado para la Columna 2. Explora los resultados de aprendizaje esperados y la evaluación de cada unidad.",
            }));
        } catch (e) {
            console.error("Error al parsear el atributo 'data-plan-content':", e);
            return [];
        }
    },
};