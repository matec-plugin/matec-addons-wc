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

        if (defined('MAWC_DEBUG') && MAWC_DEBUG) {
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
        $id = 'mawc-hero-slider-' . $this->get_id();

        // Definí tus slides acá (o venilos de los controles de Elementor)
        $slides = [
            [
                'src' => 'https://picsum.photos/id/21/1600/800',
                'alt' => 'Bosque',
                'badgeText' => 'EBA',
                'title' => 'Formación Consciente',
                'subtitle' => 'Más de 800 árboles plantados por la comunidad',
                'ctaText' => 'Ver Cursos',
                'ctaHref' => '/cursos',
            ],
            [
                'src' => 'https://picsum.photos/id/31/1600/800',
                'alt' => 'Montaña',
                'title' => 'Becas y Descuentos',
                'subtitle' => '10% OFF por transferencia',
                'ctaText' => 'Conocé más',
                'ctaHref' => '/beneficios',
            ],
            [
                'src' => 'https://picsum.photos/id/1044/1600/800',
                'alt' => 'Lago',
                'title' => 'Workshops',
                'subtitle' => 'Próximas fechas',
                'ctaText' => 'Agenda',
                'ctaHref' => '/workshops',
            ],
        ];

        // imprime el contenedor + el custom element
        echo '<div class="mawc-hero-slider mawc-' . esc_attr($this->get_id()) . '">';
        echo '<mawc-hero-slider id="' . esc_attr($id) . '" style="--h:64vh; --radius:14px;" interval="3000" autoplay pause-on-hover></mawc-hero-slider>';
        echo '</div>';

        // asegura pasar los slides cuando el elemento existe y el CE está definido
        $json = wp_json_encode($slides);
        $inline = <<<JS
  (function(){
    function init(){
      var el = document.getElementById("$id");
      if(!el) return; // no está en DOM
      if (customElements && customElements.whenDefined) {
        customElements.whenDefined('mawc-hero-slider').then(function(){
          // asignación por propiedad (reactivo en Lit)
          el.slides = $json;
        });
      } else {
        // fallback muy viejo
        el.slides = $json;
      }
    }
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      requestAnimationFrame(init);
    } else {
      document.addEventListener('DOMContentLoaded', init);
    }
  })();
  JS;

        // inyecta el inline después del handle de tu widget
        wp_add_inline_script('mawc-hero-slider-index', $inline, 'after');
    }
}
