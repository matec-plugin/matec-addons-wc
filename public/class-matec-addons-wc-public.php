<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://matec.com.ar
 * @since      1.0.0
 *
 * @package    Matec_Addons_Wc
 * @subpackage Matec_Addons_Wc/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Matec_Addons_Wc
 * @subpackage Matec_Addons_Wc/public
 * @author     Matec , Tlopez <contacto@matec.com.ar>
 */
class Matec_Addons_Wc_Public
{

	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{

		$this->plugin_name = $plugin_name;
		$this->version = time(); // $version;
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Matec_Addons_Wc_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Matec_Addons_Wc_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/matec-addons-wc-public.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts()
	{

		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Matec_Addons_Wc_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Matec_Addons_Wc_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/matec-addons-wc-public.js', array('jquery'), $this->version, false);
	}

	public function register()
	{
		// Register a script with type="module"
		wp_register_script('matec_addons_wc_module', plugin_dir_url(__FILE__) . 'js/matec-addons-wc-module.js', array(), $this->version, true);

		// add_filter('script_loader_tag', array($this, 'as_module'), 10, 3);
	}

	public function as_module($tag, $handle, $src)
	{
		if (in_array($handle, ['mawc-hello-word-index'], true)) {
			if (false === strpos($tag, 'type=')) {
				$tag = str_replace('<script ', '<script type="module" ', $tag);
			}
		}
		return $tag;
	}

	public function register_widgets($widgets_manager)
	{
		// Asegúrate de que Elementor esté activo
		if (! did_action('elementor/loaded')) {
			return;
		}

		// TODO: review CARGA DE WIDGETS

		require_once(MAWC_PLUGIN_DIR . 'widgets/hello-word/class-widget-hello-word.php');

		$widgets_manager->register(
			new Matec_Addons_WC_Widget_Hello_Word()
		);


		if (define('MAWC_DEBUG') && MAWC_DEBUG) {
			error_log("[MAWC] Widgets registrados desde class-matec-addons-wc-public.php");
		}
	}
}
