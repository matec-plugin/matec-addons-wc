<?php
if (! defined('ABSPATH')) exit;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

class Matec_Addons_WC_Widget_Gift_Card_Form extends Widget_Base
{

  public function __construct($data = [], $args = null)
  {
    parent::__construct($data, $args);

    // Registrar el script del widget
    wp_register_script(
      'mawc-gift-card-form-index',
      MAWC_PLUGIN_URL . 'widgets/assets/js/min/gift-card-form.js',
      array('elementor-frontend'),
      MAWC_VERSION,
      true
    );

    if(defined('MAWC_DEBUG') && MAWC_DEBUG){
      error_log("[MAWC] Cargando script del widget gift-card-form build");
    }

  }

  public function get_name()
  {
    return 'mawc-gift-card-form';
  }

  public function get_title()
  {
    return __('Gift Card Form', 'MAWC');
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
    return ['mawc-gift-card-form-index'];
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

    $post_id = get_the_ID();

    echo '<div class="mawc-gift-card-form mawc-'.$this->get_id().'">';
    echo '<mawc-gift-card-form currency="ARS" locale="es-AR"></mawc-gift-card-form>';
    echo '</div>';
  }
}
