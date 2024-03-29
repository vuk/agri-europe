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

	public function addOptionEndpoint() {
		add_action( 'rest_api_init', function () {
			register_rest_route( 'mk', '/option/', array(
				'methods'  => \WP_REST_Server::READABLE,
				'callback' => array( $this, 'getOptionValue' ),
			) );
		} );
	}

	public function addOptionsEndpoint() {
		add_action( 'rest_api_init', function () {
			register_rest_route( 'mk', '/options/', array(
				'methods'  => \WP_REST_Server::READABLE,
				'callback' => array( $this, 'getOptionValues' ),
			) );
		} );
	}

	public function getMenu( $data ) {
		$params = $data->get_params();
		$items  = wp_get_nav_menu_items( $params['menu'] );
		foreach ( $items as $key => $item ) {
			if ( $item->object == 'category' ) {
				$segments                 = explode( '/', $item->url );
				$items[ $key ]->permalink = '/category/' . $segments[ sizeof( $segments ) - 2 ];
			}
			if ( $item->object == 'page' ) {
				$post                     = get_post( intval( $item->object_id ) );
				$items[ $key ]->permalink = '/page/' . $post->post_name;
			}
		}

		return $items;
	}

	public function addMenuEndpoint() {
		add_action( 'rest_api_init', function () {
			register_rest_route( 'mk', '/menu/', array(
				'methods'  => \WP_REST_Server::READABLE,
				'callback' => array( $this, 'getMenu' ),
			) );
		} );
	}

	public function ofGetOption( $name, $default = false ) {

		$optionsframework_settings = get_option( 'optionsframework' );

		// Gets the unique option id
		$option_name = $optionsframework_settings['id'];

		if ( get_option( $option_name ) ) {
			$options = get_option( $option_name );
		}

		if ( isset( $options[ $name ] ) ) {
			return $options[ $name ];
		} else {
			return $default;
		}
	}

	public function ofGetOptions() {

		$optionsframework_settings = get_option( 'optionsframework' );

		// Gets the unique option id
		$option_name = $optionsframework_settings['id'];

		if ( get_option( $option_name ) ) {
			$options = get_option( $option_name );

			return $options;
		} else {
			return [];
		}
	}

	public function getOptionValues() {
		return [
			'value' => $this->ofGetOptions()
		];
	}

	public function getOptionValue( $data ) {
		$parameters = $data->get_params();

		return [
			'option' => $parameters['option'],
			'value'  => $this->ofGetOption( $parameters['option'] )
		];
	}

	public function getPostType( $data ) {
		$parameters = $data->get_params();
		$args       = [
			'post_type' => $parameters['post_type']
		];
		if ( isset( $parameters['category'] ) && $parameters['post_type'] != 'post' ) {
			$args['tax_query'] = array(
				array(
					'taxonomy' => $parameters['taxonomy'],
					'field'    => 'id',
					'terms'    => $parameters['category'],
				)
			);
		}
		if ( isset( $parameters['category'] ) && $parameters['post_type'] == 'post' ) {
			$args['category_name'] = $parameters['category'];
		}
		if ( isset( $parameters['order'] ) ) {
			if ( $parameters['order'] == 'asc' ) {
				$args['order'] = 'asc';
			} else {
				$args['order'] = 'desc';
			}
		}
		if ( isset( $parameters['orderby'] ) ) {
			$args['orderby'] = $parameters['orderby'];
		}
		if ( isset( $parameters['per_page'] ) ) {
			$args['posts_per_page'] = $parameters['per_page'];
			$args['paged']          = $parameters['page'];
		}
		$slideQuery      = new \WP_Query( $args );
		$slides          = $slideQuery->get_posts();
		$processedSlides = [];
		if ( $parameters['post_type'] == 'slide' ) {
			foreach ( $slides as $key => $slide ) {
				$slide->mp4_video_url  = get_field( 'mp4_video_url', $slide->ID );
				$slide->webm_video_url = get_field( 'webm_video_url', $slide->ID );
				$slide->video_poster   = get_field( 'video_poster', $slide->ID );
				array_push( $processedSlides, $slide );
			}
		}
		if ( $parameters['post_type'] == 'sector' ) {
			foreach ( $slides as $key => $slide ) {
				$slide->background                  = get_field( 'background_image', $slide->ID );
				$slide->company_category_to_display = get_field( 'company_category_to_display', $slide->ID );
				$slide->links_to                    = get_field( 'links_to', $slide->ID );
				$slide->background_video_mp4        = get_field( 'background_video_mp4', $slide->ID );
				$slide->background_video_webm       = get_field( 'background_video_webm', $slide->ID );
				$slide->preload_video               = get_field( 'preload_video', $slide->ID );
				$slide->preload_video_webm          = get_field( 'preload_video_webm', $slide->ID );
				array_push( $processedSlides, $slide );
			}
		}
		if ( $parameters['post_type'] == 'company' ) {
			foreach ( $slides as $key => $slide ) {
				$slide->mp4        = get_field( 'video', $slide->ID );
				$slide->webm       = get_field( 'video_webm', $slide->ID );
				$slide->logo_grey  = get_field( 'logo_grey', $slide->ID );
				$slide->logo_color = get_field( 'logo_color', $slide->ID );
				array_push( $processedSlides, $slide );
			}
		}

		if ( $parameters['post_type'] == 'post' ) {
			foreach ( $slides as $key => $slide ) {
				$slide->featured_image         = get_the_post_thumbnail_url( $slide->ID, 'full' );
				$slide->post_content_formatted = wpautop( apply_filters( 'the_content', $slide->post_content ) );
				array_push( $processedSlides, $slide );
			}
		}

		return [
			'slides'     => $processedSlides,
			'page_count' => $slideQuery->max_num_pages
		];
	}

	public function getPost( $data ) {
		$parameters = $data->get_params();
		$args       = [];
		if ( isset( $parameters['p'] ) ) {
			$args['p'] = $parameters['p'];
		}
		if ( isset( $parameters['post_type'] ) ) {
			$args['post_type'] = $parameters['post_type'];
		}
		if ( isset( $parameters['name'] ) ) {
			$args['name'] = $parameters['name'];
		}
		$slideQuery = new \WP_Query( $args );
		$slides     = $slideQuery->get_posts();
		foreach ( $slides as $key => $slide ) {
			if ( $parameters['post_type'] == 'slide' ) {
				$slide->mp4_video_url  = get_field( 'mp4_video_url', $slide->ID );
				$slide->webm_video_url = get_field( 'webm_video_url', $slide->ID );
				$slide->video_poster   = get_field( 'video_poster', $slide->ID );
			}
			if ( $parameters['post_type'] == 'sector' ) {
				$slide->background                  = get_field( 'background_image', $slide->ID );
				$slide->company_category_to_display = get_field( 'company_category_to_display', $slide->ID );
				$slide->links_to                    = get_field( 'links_to', $slide->ID );
				$slide->background_video_mp4        = get_field( 'background_video_mp4', $slide->ID );
				$slide->background_video_webm       = get_field( 'background_video_webm', $slide->ID );
				$slide->video_poster                = get_field( 'video_poster', $slide->ID );
				$slide->preload_video               = get_field( 'preload_video', $slide->ID );
				$slide->preload_video_webm          = get_field( 'preload_video_webm', $slide->ID );
				$slide->post_content_formatted      = wpautop( apply_filters( 'the_content', $slide->post_content ) );
			}
			if ( $parameters['post_type'] == 'company' ) {
				$slide->mp4                    = get_field( 'video', $slide->ID );
				$slide->webm                   = get_field( 'video_webm', $slide->ID );
				$slide->logo_grey              = get_field( 'logo_grey', $slide->ID );
				$slide->logo_color             = get_field( 'logo_color', $slide->ID );
				$slide->video_poster           = get_field( 'video_poster', $slide->ID );
				$slide->post_content_formatted = wpautop( apply_filters( 'the_content', $slide->post_content ) );
			}

			if ( $parameters['post_type'] == 'post' ) {
				$slide->featured_image         = get_the_post_thumbnail_url( $slide->ID, 'full' );
				$slide->post_content_formatted = wpautop( apply_filters( 'the_content', $slide->post_content ) );
			}
			if ( $parameters['post_type'] == 'page' ) {
				$slide->background_image       = get_field( 'background_image', $slide->ID );
				$slide->redirect               = get_field( 'redirect', $slide->ID );
				$slide->columns                = get_field( 'columns', $slide->ID );
				$slide->featured_image         = get_the_post_thumbnail_url( $slide->ID, 'full' );
				$slide->post_content_formatted = wpautop( apply_filters( 'the_content', $slide->post_content ) );
			}

			return $slide;
		}

		return [];
	}

	public function addSlideEndpoint() {
		add_action( 'rest_api_init', function () {
			register_rest_route( 'mk', '/post_type/', array(
				'methods'  => \WP_REST_Server::READABLE,
				'callback' => array( $this, 'getPostType' ),
			) );
		} );
	}

	public function addPostEndpoint() {
		add_action( 'rest_api_init', function () {
			register_rest_route( 'mk', '/single_post/', array(
				'methods'  => \WP_REST_Server::READABLE,
				'callback' => array( $this, 'getPost' ),
			) );
		} );
	}

}