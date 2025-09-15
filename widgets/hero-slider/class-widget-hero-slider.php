<?php
if (! defined('ABSPATH')) exit;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Matec_Addons_WC_Widget_Hero_Slider extends Widget_Base
{

  public function __construct($data = [], $args = null)
  {
    parent::__construct($data, $args);

    // Registrar el script del widget
    wp_register_script(
      'mawc-hero-slider-index',
      MAWC_PLUGIN_URL . 'widgets/assets/js/min/hero-slider.js',
      array('elementor-frontend'),
      MAWC_VERSION,
      true
    );

    if(defined('MAWC_DEBUG') && MAWC_DEBUG){
      error_log("[MAWC] Cargando script del widget hero-slider build");
    }

  }

  public function get_name()
  {
    return 'mawc-hero-slider';
  }

  public function get_title()
  {
    return __('Hero slider', 'MAWC');
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
    return ['mawc-hero-slider-index'];
  }

  protected function register_controls()
  {
    $this->start_controls_section('section_content', [
      'label' => __('Contenido', 'mi-plugin'),
    ]);

    $this->end_controls_section();
  }

  protected function render()
  {
    // $settings = $this->get_settings_for_display();

    // $this->add_render_attribute( 'wrap', 'id', 'ejemplo-' . $this->get_id() );
    // $this->add_render_attribute( 'wrap', 'class', 'mi-plugin-ejemplo' );
    $post_id = get_the_ID();

    echo '<div class="mawc-hello-word mawc-'.$this->get_id().'">';
    echo '<mawc-hero-slider style="--h:64vh; --radius:14px;" interval="6000" autoplay pause-on-hover></mawc-hero-slider>';
    echo '</div>';
  }
}
