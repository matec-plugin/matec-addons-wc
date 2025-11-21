<?php
if (! defined('ABSPATH')) exit;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Matec_Addons_WC_Widget_Modality_Viewer extends Widget_Base
{

    public function __construct($data = [], $args = null)
    {
        parent::__construct($data, $args);

        // Registrar el script del widget
        wp_register_script(
            'mawc-modality-viewer-index',
            MAWC_PLUGIN_URL . 'widgets/assets/js/min/modality-viewer.js',
            array('elementor-frontend'),
            MAWC_VERSION,
            true
        );

        if (defined('MAWC_DEBUG') && MAWC_DEBUG) {
            error_log("[MAWC] Cargando script del widget modality-viewer build");
        }
    }

    public function get_name()
    {
        return 'mawc-modality-viewer';
    }

    public function get_title()
    {
        return __('Modality Viewer', 'MAWC');
    }

    public function get_icon()
    {
        return 'eicon-code';
    }

    public function get_categories()
    {
        return ['general']; // o tu categoría
    }

    // Declarar los handles que registramos en register_widget_scripts()
    public function get_script_depends()
    {
        // Cargar solo index.js del widget "ejemplo"
        return ['mawc-modality-viewer-index'];
    }

    protected function register_controls()
    {
        $this->start_controls_section('section_content', [
            'label' => __('Contenido', 'mi-plugin'),
        ]);
        $this->end_controls_section(); // Es importante cerrar la sección de controles
    }

    // ⭐ Implementación del método render()
    protected function render()
    {
        // 1. Obtener el ID del post actual
        // En Elementor, dentro de un post/página, get_the_ID() o global $post son la forma estándar.
        $post_id = get_the_ID();

        // 2. Verificar si se encontró un ID de post
        if ($post_id) {

            // 3. Verificar si la taxonomía 'modalidad' está registrada (opcional pero buena práctica)
            if (taxonomy_exists('modalidad')) {

                // 4. Obtener los términos de la taxonomía 'modalidad' para el post actual
                $terms = get_the_terms($post_id, 'modalidad');
                $terms_data = array();
                if (!empty($terms) && !is_wp_error($terms)) {
                    foreach ($terms as $term) {

                        // --- ⭐ Obtener el SVG del campo ACF ---
                        $icon_svg = get_field('icon', $term); // 'icon' es el nombre de tu campo ACF para el SVG/icono
                        // --- ⭐ Fin de obtención del SVG ---

                        $terms_data[] = [
                            'id' => $term->term_id,
                            'name' => $term->name,
                            'slug' => $term->slug,
                            'icon_svg' => is_string($icon_svg) ? $icon_svg : '' // Asegúrate de que es un string (el código SVG)
                        ];
                    }
                }

                $json_terms = json_encode($terms_data);

                // Asegúrate de que tu LitElement (mawc-modality-viewer) tenga una propiedad 'modalities' o similar 
                // que pueda recibir este JSON
                echo "<mawc-modality-viewer data-post-id=\"{$post_id}\" data-modalities='{$json_terms}'></mawc-modality-viewer>";
            } else {
                echo '<p>Error: La taxonomía "modalidad" no está registrada.</p>';
            }
        } else {
            echo '<p>Error: No se pudo obtener el ID del post actual.</p>';
        }
    }

    // Si quieres dar soporte a Elementor Pro para previsualización en el editor (opcional, usa _content_template)
    // protected function _content_template()
    // {
    //    // En la plantilla del editor, $post_id no está disponible. Se usa un placeholder.
    // }
}
