<?php
if (! defined('ABSPATH')) exit;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Matec_Addons_WC_Widget_Hello_Word extends Widget_Base
{

  public function get_name()
  {
    return 'mawc-hello-word';
  }

  public function get_title()
  {
    return __('Hola mundo', 'MAWC');
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
    return ['mawc-hello-word-index'];
  }

  protected function register_controls()
  {
    $this->start_controls_section('section_content', [
      'label' => __('Contenido', 'mi-plugin'),
    ]);

    $this->add_control('texto', [
      'label' => __('Texto', 'mi-plugin'),
      'type'  => Controls_Manager::TEXT,
      'default' => __('Hola desde el widget ejemplo', 'mi-plugin'),
    ]);

    $this->end_controls_section();
  }

  protected function render()
  {
    // $settings = $this->get_settings_for_display();

    // $this->add_render_attribute( 'wrap', 'id', 'ejemplo-' . $this->get_id() );
    // $this->add_render_attribute( 'wrap', 'class', 'mi-plugin-ejemplo' );

    echo '<div class="mawc-hello-word">';
    echo esc_html($this->get_id());
    echo '</div>';
  }
}
