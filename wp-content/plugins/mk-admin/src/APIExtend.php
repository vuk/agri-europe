<?php
/**
 * Created by PhpStorm.
 * User: vuk
 * Date: 24.7.17.
 * Time: 23.08
 */

namespace MkGroup;


class APIExtend {

	public function __construct() {

	}

	public function addOptionEndpoint () {
		add_action( 'rest_api_init', function () {
			register_rest_route( 'mk', '/option/', array(
				'methods' => \WP_REST_Server::READABLE,
				'callback' => array($this, 'getOptionValue'),
			) );
		} );
	}

	public function addOptionsEndpoint () {
		add_action( 'rest_api_init', function () {
			register_rest_route( 'mk', '/options/', array(
				'methods' => \WP_REST_Server::READABLE,
				'callback' => array($this, 'getOptionValues'),
			) );
		} );
	}

	public function getMenu ($data) {
		$params = $data->get_params();
		$items = wp_get_nav_menu_items($params['menu']);
		foreach ($items as $key => $item) {
			if ($item->object == 'category') {
				$segments = explode('/', $item->url);
				$items[$key]->permalink = '/category/' . $segments[sizeof($segments) - 2];
			}
			if ($item->object == 'page') {
				$post = get_post(intval($item->object_id));
				$items[$key]->permalink = '/page/' . $post->post_name;
			}
		}
		return $items;
	}

	public function addMenuEndpoint () {
		add_action( 'rest_api_init', function () {
			register_rest_route( 'mk', '/menu/', array(
				'methods' => \WP_REST_Server::READABLE,
				'callback' => array($this, 'getMenu'),
			) );
		} );
	}

	public function ofGetOption($name, $default = false) {

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

	public function ofGetOptions() {

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

	public function getOptionValues () {
		return [
			'value' => $this->ofGetOptions()
		];
	}

	public function getOptionValue ($data) {
		$parameters = $data->get_params();
		return [
			'option' => $parameters['option'],
			'value' => $this->ofGetOption($parameters['option'])
		];
	}

	public function getPostType ($data) {
		$parameters = $data->get_params();
		$args = [
			'post_type' => $parameters['post_type']
		];
		if (isset($parameters['category'])) {
			$args['tax_query'] = array(
				array (
					'taxonomy' => 'slide_category',
					'field' => 'id',
					'terms' => $parameters['category'],
				)
			);
		}
		if (isset($parameters['order'])) {
			if ($parameters['order'] == 'asc') {
				$args['order'] = 'asc';
			} else {
				$args['order'] = 'desc';
			}
		}
		if (isset($parameters['orderby'])) {
			$args['orderby'] = $parameters['orderby'];
		}
		$slideQuery = new \WP_Query($args);
		$slides = $slideQuery->get_posts();
		$processedSlides = [];
		if ($parameters['post_type'] == 'slide') {
			foreach ( $slides as $key => $slide ) {
				$slide->mp4_video_url = get_field('mp4_video_url', $slide->ID);
				$slide->webm_video_url = get_field('webm_video_url', $slide->ID);
				$slide->video_poster = get_field('video_poster', $slide->ID);
				array_push($processedSlides, $slide);
			}
		}
		if ($parameters['post_type'] == 'sector') {
			foreach ( $slides as $key => $slide ) {
				$slide->background = get_field('background_image', $slide->ID);
				array_push($processedSlides, $slide);
			}
		}
		return [
			'slides' => $processedSlides
		];
	}

	public function addSlideEndpoint () {
		add_action( 'rest_api_init', function () {
			register_rest_route( 'mk', '/post_type/', array(
				'methods' => \WP_REST_Server::READABLE,
				'callback' => array($this, 'getPostType'),
			) );
		} );
	}

}