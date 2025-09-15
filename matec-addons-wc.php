<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://matec.com.ar
 * @since             1.0.0
 * @package           Matec_Addons_Wc
 *
 * @wordpress-plugin
 * Plugin Name:       Matec Addons Web Components
 * Plugin URI:        https://matec.com.ar
 * Description:       This is a description of the plugin.
 * Version:           1.0.0
 * Author:            Matec , Tlopez
 * Author URI:        https://matec.com.ar/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       matec-addons-wc
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'MATEC_ADDONS_WC_VERSION', '1.0.0' );
define( 'MAWC_VERSION', time());
define('MAWC_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define('MAWC_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

define('MAWC_DEBUG', true);

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-matec-addons-wc-activator.php
 */
function activate_matec_addons_wc() {
	require_once MAWC_PLUGIN_DIR . 'includes/class-matec-addons-wc-activator.php';
	Matec_Addons_Wc_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-matec-addons-wc-deactivator.php
 */
function deactivate_matec_addons_wc() {
	require_once MAWC_PLUGIN_DIR . 'includes/class-matec-addons-wc-deactivator.php';
	Matec_Addons_Wc_Deactivator::deactivate();
}

register_activation_hook( __FILE__, 'activate_matec_addons_wc' );
register_deactivation_hook( __FILE__, 'deactivate_matec_addons_wc' );

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require MAWC_PLUGIN_DIR . 'includes/class-matec-addons-wc.php';

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_matec_addons_wc() {

	$plugin = new Matec_Addons_Wc();
	$plugin->run();

}
run_matec_addons_wc();
