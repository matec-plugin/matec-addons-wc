<?php
if (! defined('ABSPATH')) exit;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Matec_Addons_WC_Widget_Post_Type_Label extends Widget_Base
{

    public function get_name()
    {
        return 'mawc-post-type-label';
    }

    public function get_title()
    {
        return __('Etiqueta Dinámica de Post Type', 'MAWC');
    }

    public function get_icon()
    {
        return 'eicon-text-area'; // Icono para un widget de texto/etiqueta
    }

    public function get_categories()
    {
        return ['general']; 
    }

    protected function register_controls()
    {
        $this->start_controls_section('section_content', [
            'label' => __('Configuración de la Etiqueta', 'MAWC'),
        ]);
        
        $this->add_control('mapping_key_values', [
            'label' => __('Mapeo Post Type -> Etiqueta', 'MAWC'),
            'type' => Controls_Manager::TEXTAREA,
            'default' => "product: Curso\ncurso: Curso\ndiplomatura: Diplomatura\nworkshop: Workshop",
            'description' => __('Define el mapeo: `post_type_key: Etiqueta a mostrar`. Separa cada par con una nueva línea.', 'MAWC'),
        ]);

        $this->add_control('default_label', [
            'label' => __('Etiqueta por Defecto', 'MAWC'),
            'type' => Controls_Manager::TEXT,
            'default' => 'Contenido',
            'description' => __('Etiqueta si el post type no está en el mapeo.', 'MAWC'),
        ]);

        // Estilos básicos para la etiqueta (opcional, pero ayuda a la estética)
        $this->add_control('label_style', [
            'label' => __('Estilos de la Etiqueta', 'MAWC'),
            'type' => Controls_Manager::HEADING,
            'separator' => 'before',
        ]);
        
        $this->add_control('label_bg_color', [
            'label' => __('Color de Fondo', 'MAWC'),
            'type' => Controls_Manager::COLOR,
            'default' => '#007bff',
            'selectors' => [
                '{{WRAPPER}} .mawc-post-type-label' => 'background-color: {{VALUE}};',
            ],
        ]);

        $this->add_control('label_text_color', [
            'label' => __('Color de Texto', 'MAWC'),
            'type' => Controls_Manager::COLOR,
            'default' => '#ffffff',
            'selectors' => [
                '{{WRAPPER}} .mawc-post-type-label' => 'color: {{VALUE}};',
            ],
        ]);

        $this->end_controls_section();
    }

    /**
     * Procesa la cadena de mapeo de texto en un array asociativo.
     * Ejemplo: "product: Curso\ndiplo: Diplomatura" -> ['product' => 'Curso', 'diplo' => 'Diplomatura']
     *
     * @param string $mapping_text
     * @return array
     */
    protected function parse_mapping($mapping_text) {
        $map = [];
        $lines = explode("\n", $mapping_text);
        foreach ($lines as $line) {
            $parts = explode(':', $line, 2);
            if (count($parts) === 2) {
                $key = sanitize_key(trim($parts[0])); // post type key
                $value = trim($parts[1]);             // Label value
                if (!empty($key) && !empty($value)) {
                    $map[$key] = $value;
                }
            }
        }
        return $map;
    }

    // Lógica principal: Obtener Post Type y mostrar la etiqueta
    protected function render()
    {
        $settings = $this->get_settings_for_display();
        $post_id = get_the_ID();
        
        if (!$post_id) {
            // Solo mostrar un mensaje si estamos en modo edición de Elementor
            if (Elementor\Plugin::$instance->editor->is_edit_mode()) {
                echo '<div class="mawc-post-type-label" style="background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;">' . __('Error: ID de post no encontrado.', 'MAWC') . '</div>';
            }
            return;
        }

        $current_post_type = get_post_type($post_id);
        $mapping = $this->parse_mapping($settings['mapping_key_values']);

        $default_label = $settings['default_label'];

        // Buscar la etiqueta en el mapeo o usar la etiqueta por defecto
        $label_to_display = $mapping[$current_post_type] ?? $default_label;
        
        // Estilos inline básicos para que se vea como una etiqueta/píldora
        $inline_styles = '
            padding: 5px 15px;
            border-radius: 50px;
            border: 2px solid #272727;
            font-weight: bold;
            display: inline-block;
            text-transform: uppercase;
            font-size: 0.8em;
            line-height: 1;
        ';

        echo '<span class="mawc-post-type-label" style="' . $inline_styles . '">';
        echo esc_html($label_to_display);
        echo '</span>';
    }
}