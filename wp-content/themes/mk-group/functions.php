<?php

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