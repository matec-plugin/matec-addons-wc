<?php
if (! defined('ABSPATH')) exit;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Matec_Addons_WC_Widget_Program_Viewer extends Widget_Base
{

    public function __construct($data = [], $args = null)
    {
        parent::__construct($data, $args);

        // Registrar el script del widget
        wp_register_script(
            'mawc-program-viewer-index',
            MAWC_PLUGIN_URL . 'widgets/assets/js/min/program-viewer.js',
            array('elementor-frontend'),
            MAWC_VERSION,
            true
        );

        if (defined('MAWC_DEBUG') && MAWC_DEBUG) {
            error_log("[MAWC] Cargando script del widget program-viewer build");
        }
    }

    public function get_name()
    {
        return 'mawc-program-viewer';
    }

    public function get_title()
    {
        return __('Program Viewer', 'MAWC');
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
        return ['mawc-program-viewer-index'];
    }

    protected function register_controls()
    {
        $this->start_controls_section('section_content', [
            'label' => __('Configuración del Programa', 'MAWC'),
        ]);

        $this->add_control('allowed_post_types', [
            'label' => __('Tipos de Post Válidos', 'MAWC'),
            'type' => Controls_Manager::TEXT,
            'default' => 'product, curso',
            'description' => __('Post types permitidos (separados por coma).', 'MAWC'),
        ]);

        $this->end_controls_section();
    }

   protected function render()
    {
        $post_id = get_the_ID();
        $settings = $this->get_settings_for_display();
        $allowed_post_types = array_map('trim', explode(',', $settings['allowed_post_types'] ?? ''));
        $current_post_type = get_post_type($post_id);
        
        $plan_data = []; // Array final que contendrá los datos procesados para el LitElement
        $plan_ids = [];  // Array temporal para IDs de los posts del plan

        if (!$post_id || !in_array($current_post_type, $allowed_post_types)) {
            if (class_exists('Elementor\Plugin') && Elementor\Plugin::$instance->editor->is_edit_mode()) {
                 echo '<p style="color: orange;">Advertencia: Post type no permitido o ID no encontrado.</p>';
                }
                return;
            }
            
            if (function_exists('get_field')) {
                // 1. Obtener el array de IDs de posts desde el campo ACF 'plan_de_estudio'
                $plan_raw_content = get_field('plan_de_estudio', $post_id);
                
                // Asegurarse de que $plan_raw_content es un array de IDs (si es un campo Relación, etc.)
                if (is_array($plan_raw_content) && !empty($plan_raw_content)) {
                    $plan_ids = $plan_raw_content;
                } elseif (is_numeric($plan_raw_content)) {
                    // Si solo retorna un ID
                    $plan_ids[] = (int) $plan_raw_content;
                }
                
                // 2. Iterar sobre los IDs y obtener el contenido de cada plan
                if (!empty($plan_ids)) {
                    
                    // Usamos get_posts para obtener los posts del plan
                    $plan_posts = get_posts([
                        'post_type'      => 'any', // Asume que el post type es queryable
                        'post__in'       => $plan_ids,
                        'orderby'        => 'post__in', // Mantener el orden de los IDs
                        'posts_per_page' => -1,
                        'suppress_filters' => false,
                    ]);
                    
                    foreach ($plan_posts as $plan_post) {
                        $post_plan_id = $plan_post->ID;
                        
                        // 3. Obtener el campo Flexible Content 'contenido' de cada post
                        $flexible_content = get_field('contenido', $post_plan_id);
                        
                    if (is_array($flexible_content) && !empty($flexible_content)) {
                        // Estructura de datos para el LitElement: Post del plan + su contenido flexible
                        $plan_data[] = [
                            'post_id' => $post_plan_id,
                            'title'   => get_the_title($post_plan_id),
                            'sections' => $flexible_content, // Esto es el array del Flexible Content
                        ];
                    }
                }
            }
        }

        // Codificar los datos del plan de estudio a JSON
        $json_plan_data = json_encode($plan_data);

        // Imprimir el LitElement con los datos inyectados como atributo
        echo "<mawc-program-viewer data-plan-content='{$json_plan_data}'></mawc-program-viewer>";
    }
}
