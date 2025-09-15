<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://matec.com.ar
 * @since      1.0.0
 *
 * @package    Matec_Addons_Wc
 * @subpackage Matec_Addons_Wc/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Matec_Addons_Wc
 * @subpackage Matec_Addons_Wc/admin
 * @author     Matec , Tlopez <contacto@matec.com.ar>
 */
class Matec_Addons_Wc_Admin
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
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version)
	{

		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the admin area.
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

		wp_enqueue_style($this->plugin_name, plugin_dir_url(__FILE__) . 'css/matec-addons-wc-admin.css', array(), $this->version, 'all');
	}

	/**
	 * Register the JavaScript for the admin area.
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

		wp_enqueue_script($this->plugin_name, plugin_dir_url(__FILE__) . 'js/matec-addons-wc-admin.js', array('jquery'), $this->version, false);
	}

	// public function register_widgets($widgets_manager)
	// {
	// 	// Asegúrate de que Elementor esté activo
	// 	if (! did_action('elementor/loaded')) {
	// 		return;
	// 	}

	// 	// Incluye el archivo del widget
	// 	require_once plugin_dir_path(dirname(__FILE__)) . 'widgets/hello-word/class-widget-hello-word.php';

	// 	// Registra el widget
	// 	$widgets_manager->register(new Matec_Addons_WC_Widget_Hello_Word());
	// }
}
