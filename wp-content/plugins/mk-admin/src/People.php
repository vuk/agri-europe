<?php
/**
 * Created by PhpStorm.
 * User: vuk
 * Date: 23.7.17.
 * Time: 23.28
 */

namespace MkGroup;


class People {

	public function addPeople () {

		$labels = array(
			'name'                => _x( 'People', 'Post Type General Name', 'mkgroup' ),
			'singular_name'       => _x( 'Person', 'Post Type Singular Name', 'mkgroup' ),
			'menu_name'           => __( 'People', 'mkgroup' ),
			'parent_item_colon'   => __( 'Superior', 'mkgroup' ),
			'all_items'           => __( 'All People', 'mkgroup' ),
			'view_item'           => __( 'View Person', 'mkgroup' ),
			'add_new_item'        => __( 'Add New Person', 'mkgroup' ),
			'add_new'             => __( 'Add New', 'mkgroup' ),
			'edit_item'           => __( 'Edit Person', 'mkgroup' ),
			'update_item'         => __( 'Update Person', 'mkgroup' ),
			'search_items'        => __( 'Search Person', 'mkgroup' ),
			'not_found'           => __( 'Not Found', 'mkgroup' ),
			'not_found_in_trash'  => __( 'Not found in Trash', 'mkgroup' ),
		);

		$args = array(
			'label'               => __( 'people', 'mkgroup' ),
			'description'         => __( 'People of MK Group', 'mkgroup' ),
			'labels'              => $labels,
			'supports'            => array( 'title', 'editor', 'excerpt', 'author', 'thumbnail', 'comments', 'revisions', 'custom-fields', ),
			'taxonomies'          => array( 'group' ),
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
		register_post_type( 'people', $args );
	}

	public function addPeopleGroups () {
		register_taxonomy('group', 'people', array(
			// Hierarchical taxonomy (like categories)
			'hierarchical' => true,
			// This array of options controls the labels displayed in the WordPress Admin UI
			'labels' => array(
				'name' => _x( 'People Groups', 'taxonomy general name' ),
				'singular_name' => _x( 'People Group', 'taxonomy singular name' ),
				'search_items' =>  __( 'Search People Groups' ),
				'all_items' => __( 'All People Groups' ),
				'parent_item' => __( 'Parent People Group' ),
				'parent_item_colon' => __( 'Parent People Group:' ),
				'edit_item' => __( 'Edit People Group' ),
				'update_item' => __( 'Update People Group' ),
				'add_new_item' => __( 'Add New People Group' ),
				'new_item_name' => __( 'New People Group Name' ),
				'menu_name' => __( 'People Groups' ),
			),
			// Control the slugs used for this taxonomy
			'rewrite' => array(
				'slug' => 'group', // This controls the base slug that will display before each term
				'with_front' => false, // Don't display the category base before "/locations/"
				'hierarchical' => true // This will allow URL's like "/locations/boston/cambridge/"
			),
		));
	}

}