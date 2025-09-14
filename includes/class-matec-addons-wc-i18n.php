<?php

/**
 * Define the internationalization functionality
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @link       https://matec.com.ar
 * @since      1.0.0
 *
 * @package    Matec_Addons_Wc
 * @subpackage Matec_Addons_Wc/includes
 */

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    Matec_Addons_Wc
 * @subpackage Matec_Addons_Wc/includes
 * @author     Matec , Tlopez <contacto@matec.com.ar>
 */
class Matec_Addons_Wc_i18n {


	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 */
	public function load_plugin_textdomain() {

		load_plugin_textdomain(
			'matec-addons-wc',
			false,
			dirname( dirname( plugin_basename( __FILE__ ) ) ) . '/languages/'
		);

	}



}
