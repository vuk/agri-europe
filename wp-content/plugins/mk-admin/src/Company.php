<?php
/**
 * Created by PhpStorm.
 * User: vuk
 * Date: 23.7.17.
 * Time: 22.42
 */

namespace MkGroup;


class Company {

	public function __construct() {

	}

	public function addCompanies () {

		$labels = array(
			'name'                => _x( 'Companies', 'Post Type General Name', 'mkgroup' ),
			'singular_name'       => _x( 'Company', 'Post Type Singular Name', 'mkgroup' ),
			'menu_name'           => __( 'Companies', 'mkgroup' ),
			'parent_item_colon'   => __( 'Parent Company', 'mkgroup' ),
			'all_items'           => __( 'All Companies', 'mkgroup' ),
			'view_item'           => __( 'View Company', 'mkgroup' ),
			'add_new_item'        => __( 'Add New Company', 'mkgroup' ),
			'add_new'             => __( 'Add New', 'mkgroup' ),
			'edit_item'           => __( 'Edit Company', 'mkgroup' ),
			'update_item'         => __( 'Update Company', 'mkgroup' ),
			'search_items'        => __( 'Search Company', 'mkgroup' ),
			'not_found'           => __( 'Not Found', 'mkgroup' ),
			'not_found_in_trash'  => __( 'Not found in Trash', 'mkgroup' ),
		);

		$args = array(
			'label'               => __( 'companies', 'mkgroup' ),
			'description'         => __( 'Companies part of MK Group', 'mkgroup' ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'comments', 'revisions', 'custom-fields', ),
			'taxonomies'          => array( 'companies' ),
			'hierarchical'        => false,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => true,
			'show_in_nav_menus'   => true,
			'show_in_admin_bar'   => true,
			'menu_position'       => 5,
			'can_export'          => true,
			'has_archive'         => true,
			'exclude_from_search' => false,
			'publicly_queryable'  => true,
		);

		// Registering your Custom Post Type
		register_post_type( 'companies', $args );
	}

	public function addCompanyCategories () {
		register_taxonomy('groups', 'companies', array(
			// Hierarchical taxonomy (like categories)
			'hierarchical' => true,
			// This array of options controls the labels displayed in the WordPress Admin UI
			'labels' => array(
				'name' => _x( 'Company Groups', 'taxonomy general name' ),
				'singular_name' => _x( 'Company Group', 'taxonomy singular name' ),
				'search_items' =>  __( 'Search Company Groups' ),
				'all_items' => __( 'All Company Groups' ),
				'parent_item' => __( 'Parent Company Group' ),
				'parent_item_colon' => __( 'Parent Company Group:' ),
				'edit_item' => __( 'Edit Company Group' ),
				'update_item' => __( 'Update Company Group' ),
				'add_new_item' => __( 'Add New Company Group' ),
				'new_item_name' => __( 'New Company Group Name' ),
				'menu_name' => __( 'Company Groups' ),
			),
			// Control the slugs used for this taxonomy
			'rewrite' => array(
				'slug' => 'groups', // This controls the base slug that will display before each term
				'with_front' => false, // Don't display the category base before "/locations/"
				'hierarchical' => true // This will allow URL's like "/locations/boston/cambridge/"
			),
		));
	}

}