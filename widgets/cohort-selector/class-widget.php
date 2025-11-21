<?php
if (! defined('ABSPATH')) exit;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Matec_Addons_WC_Widget_Cohort_Selector extends Widget_Base
{

    public function __construct($data = [], $args = null)
    {
        parent::__construct($data, $args);

        // Registrar el script del widget
        wp_register_script(
            'mawc-cohort-selector-index',
            MAWC_PLUGIN_URL . 'widgets/assets/js/min/cohort-selector.js',
            array('elementor-frontend'),
            MAWC_VERSION,
            true
        );

        if (defined('MAWC_DEBUG') && MAWC_DEBUG) {
            error_log("[MAWC] Cargando script del widget cohort-selector build");
        }
    }


    public function get_name()
    {
        return 'mawc-cohort-selector';
    }

    public function get_title()
    {
        return __('Cohort Selector', 'MAWC');
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
        return ['mawc-cohort-selector-index'];
    }

    protected function register_controls()
    {
        $this->start_controls_section('section_content', [
            'label' => __('Configuración del Selector de Cohort', 'MAWC'),
        ]);
    }

    protected function render()
    {
        // ... (el código de obtención de datos permanece igual)
        $settings = $this->get_settings_for_display();
        $post_id = get_the_ID();

        // Obtener los datos del Plan de Estudio
        $plan_raw_content = get_field('plan_de_estudio', $post_id);

        $json_data = [];

        $json_data['parent'] = [
            'id' => $post_id,
            'title' => get_the_title($post_id),
            'type' => get_post_type($post_id),
        ];

        if (!empty($plan_raw_content) && is_array($plan_raw_content)) {
            foreach ($plan_raw_content as $plan_item) {
                $horarios = get_field('horarios', $plan_item);

                    $json_data['plan_de_estudio'][] = [
                        'id' => $plan_item,
                        'nombre' => get_the_title($plan_item),
                        'horarios' => [],
                        'correlativas' => get_field('correlativas', $plan_item),
                    ];

                if (!empty($horarios) && is_array($horarios)) {
                    foreach ($horarios as $horario_id) {
                        $json_data['horarios'][] = [
                            'id' => $horario_id,
                            'plan_id' => $plan_item,
                            'nombre' => get_the_title($horario_id),
                            'modalidad' => get_field('modalidad', $horario_id),
                            'fecha_inicio' => get_field('fecha_de_inicio', $horario_id),
                            'cupos' => get_field('cupos', $horario_id),
                            'horario_semanal' => get_field('horario_semanal', $horario_id), // ✅ Incluye el array de horarios
                        ];
                    }
                }
            }
        }

        // Codificación y escape CORRECTOS para dinamismo
        $cohorts_json = json_encode($json_data);
        $cohorts_data_attr = esc_attr($cohorts_json);

        echo '<pre>'; // Para depuración visual en el front-end (opcional)
        echo $cohorts_json; // Descomenta para ver el JSON generado
        echo '</pre>';
        echo "<mawc-cohort-selector data-cohorts='{$cohorts_data_attr}'></mawc-cohort-selector>";
    }
}
