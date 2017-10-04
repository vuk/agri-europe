<?php
add_theme_support('menus');
add_theme_support( 'post-thumbnails' );
if ( !function_exists( 'of_get_option' ) ) {
	/**
	 * @desc Get single option
	 * @param $name
	 * @param bool $default
	 *
	 * @return string
	 */
	function of_get_option($name, $default = false) {

		$optionsframework_settings = get_option('optionsframework');

		// Gets the unique option id
		$option_name = $optionsframework_settings['id'];

		if ( get_option($option_name) ) {
			$options = get_option($option_name);
		}

		if ( isset($options[$name]) ) {
			return $options[$name];
		} else {
			return $default;
		}
	}
}

if ( !function_exists( 'of_get_options' ) ) {
	/**
	 * @desc Get single options
	 * @return array
	 */
	function of_get_options() {

		$optionsframework_settings = get_option('optionsframework');

		// Gets the unique option id
		$option_name = $optionsframework_settings['id'];

		if ( get_option($option_name) ) {
			$options = get_option($option_name);
			return $options;
		} else {
			return [];
		}
	}
}

add_action( 'rest_api_init', function() {

	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
	add_filter( 'rest_pre_serve_request', function( $value ) {
		header( 'Access-Control-Allow-Origin: *' );
		header( 'Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE' );
		header( 'Access-Control-Allow-Credentials: true' );

		return $value;

	});
}, 15 );