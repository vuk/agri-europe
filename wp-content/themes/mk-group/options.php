<?php
/**
 * A unique identifier is defined to store the options in the database and reference them from the theme.
 */
function optionsframework_option_name() {
	// Change this to use your theme slug
	return 'options-framework-theme';
}

/**
 * Defines an array of options that will be used to generate the settings page and be saved in the database.
 * When creating the 'id' fields, make sure to use all lowercase and no spaces.
 *
 * If you are making your theme translatable, you should replace 'agrieurope'
 * with the actual text domain for your theme.  Read more:
 * http://codex.wordpress.org/Function_Reference/load_theme_textdomain
 */

function optionsframework_options() {

	// Test data
	$test_array = array(
		'one' => __( 'One', 'agrieurope' ),
		'two' => __( 'Two', 'agrieurope' ),
		'three' => __( 'Three', 'agrieurope' ),
		'four' => __( 'Four', 'agrieurope' ),
		'five' => __( 'Five', 'agrieurope' )
	);

	// Multicheck Array
	$multicheck_array = array(
		'one' => __( 'French Toast', 'agrieurope' ),
		'two' => __( 'Pancake', 'agrieurope' ),
		'three' => __( 'Omelette', 'agrieurope' ),
		'four' => __( 'Crepe', 'agrieurope' ),
		'five' => __( 'Waffle', 'agrieurope' )
	);

	// Multicheck Defaults
	$multicheck_defaults = array(
		'one' => '1',
		'five' => '1'
	);

	// Background Defaults
	$background_defaults = array(
		'color' => '',
		'image' => '',
		'repeat' => 'repeat',
		'position' => 'top center',
		'attachment'=>'scroll' );

	// Typography Defaults
	$typography_defaults = array(
		'size' => '15px',
		'face' => 'georgia',
		'style' => 'bold',
		'color' => '#bada55' );

	// Typography Options
	$typography_options = array(
		'sizes' => array( '6','12','14','16','20' ),
		'faces' => array( 'Helvetica Neue' => 'Helvetica Neue','Arial' => 'Arial' ),
		'styles' => array( 'normal' => 'Normal','bold' => 'Bold' ),
		'color' => false
	);

	// Pull all the categories into an array
	$options_categories = array();
	$options_categories_obj = get_categories();
	foreach ($options_categories_obj as $category) {
		$options_categories[$category->cat_ID] = $category->cat_name;
	}

	// Pull all tags into an array
	$options_tags = array();
	$options_tags_obj = get_tags();
	foreach ( $options_tags_obj as $tag ) {
		$options_tags[$tag->term_id] = $tag->name;
	}


	// Pull all the pages into an array
	$options_pages = array();
	$options_pages_obj = get_pages( 'sort_column=post_parent,menu_order' );
	$options_pages[''] = 'Select a page:';
	foreach ($options_pages_obj as $page) {
		$options_pages[$page->ID] = $page->post_title;
	}

	// If using image radio buttons, define a directory path
	$imagepath =  get_template_directory_uri() . '/images/';

	$options = array();

	$options[] = array(
		'name' => __( 'Home Page Settings', 'agrieurope' ),
		'type' => 'heading'
	);

	$options[] = array(
		'name' => __( 'Home Slides Time Delay', 'agrieurope' ),
		'desc' => __( 'Delay for switching slides on home page in milliseconds. Please note curtain animation lasts for 500ms', 'agrieurope' ),
		'id' => 'time_delay',
		'type' => 'text'
	);

	$options[] = array(
		'name' => __( 'Description', 'agrieurope' ),
		'desc' => __( 'Site description', 'agrieurope' ),
		'id' => 'description',
		'type' => 'text'
	);

	$options[] = array(
		'name' => __( 'Basic Settings', 'agrieurope' ),
		'type' => 'heading'
	);

	$options[] = array(
		'name' => __( 'Dark Logo', 'agrieurope' ),
		'desc' => __( 'Dark logo for display on light background.', 'agrieurope' ),
		'id' => 'dark_logo',
		'type' => 'upload'
	);

	$options[] = array(
		'name' => __( 'Light Logo', 'agrieurope' ),
		'desc' => __( 'Light logo for display on dark background.', 'agrieurope' ),
		'id' => 'light_logo',
		'type' => 'upload'
	);

	$options[] = array(
		'name' => __( 'Company Info Settings', 'agrieurope' ),
		'type' => 'heading'
	);

	$options[] = array(
		'name' => __( 'Company Name', 'agrieurope' ),
		'desc' => __( 'Full name of company', 'agrieurope' ),
		'id' => 'company_name',
		'type' => 'text'
	);

	$options[] = array(
		'name' => __( 'Office', 'agrieurope' ),
		'id' => 'office',
		'type' => 'text'
	);

	$options[] = array(
		'name' => __( 'Address', 'agrieurope' ),
		'id' => 'office_address',
		'type' => 'text'
	);

	$options[] = array(
		'name' => __( 'City/County', 'agrieurope' ),
		'id' => 'office_city',
		'type' => 'text'
	);

	/*$options[] = array(
		'name' => __( 'Input Text Mini', 'agrieurope' ),
		'desc' => __( 'A mini text input field.', 'agrieurope' ),
		'id' => 'example_text_mini',
		'std' => 'Default',
		'class' => 'mini',
		'type' => 'text'
	);

	$options[] = array(
		'name' => __( 'Input Text', 'agrieurope' ),
		'desc' => __( 'A text input field.', 'agrieurope' ),
		'id' => 'example_text',
		'std' => 'Default Value',
		'type' => 'text'
	);

	$options[] = array(
		'name' => __( 'Input with Placeholder', 'agrieurope' ),
		'desc' => __( 'A text input field with an HTML5 placeholder.', 'agrieurope' ),
		'id' => 'example_placeholder',
		'placeholder' => 'Placeholder',
		'type' => 'text'
	);

	$options[] = array(
		'name' => __( 'Textarea', 'agrieurope' ),
		'desc' => __( 'Textarea description.', 'agrieurope' ),
		'id' => 'example_textarea',
		'std' => 'Default Text',
		'type' => 'textarea'
	);

	$options[] = array(
		'name' => __( 'Input Select Small', 'agrieurope' ),
		'desc' => __( 'Small Select Box.', 'agrieurope' ),
		'id' => 'example_select',
		'std' => 'three',
		'type' => 'select',
		'class' => 'mini', //mini, tiny, small
		'options' => $test_array
	);

	$options[] = array(
		'name' => __( 'Input Select Wide', 'agrieurope' ),
		'desc' => __( 'A wider select box.', 'agrieurope' ),
		'id' => 'example_select_wide',
		'std' => 'two',
		'type' => 'select',
		'options' => $test_array
	);

	if ( $options_categories ) {
		$options[] = array(
			'name' => __( 'Select a Category', 'agrieurope' ),
			'desc' => __( 'Passed an array of categories with cat_ID and cat_name', 'agrieurope' ),
			'id' => 'example_select_categories',
			'type' => 'select',
			'options' => $options_categories
		);
	}

	if ( $options_tags ) {
		$options[] = array(
			'name' => __( 'Select a Tag', 'options_check' ),
			'desc' => __( 'Passed an array of tags with term_id and term_name', 'options_check' ),
			'id' => 'example_select_tags',
			'type' => 'select',
			'options' => $options_tags
		);
	}

	$options[] = array(
		'name' => __( 'Select a Page', 'agrieurope' ),
		'desc' => __( 'Passed an pages with ID and post_title', 'agrieurope' ),
		'id' => 'example_select_pages',
		'type' => 'select',
		'options' => $options_pages
	);

	$options[] = array(
		'name' => __( 'Input Radio (one)', 'agrieurope' ),
		'desc' => __( 'Radio select with default options "one".', 'agrieurope' ),
		'id' => 'example_radio',
		'std' => 'one',
		'type' => 'radio',
		'options' => $test_array
	);

	$options[] = array(
		'name' => __( 'Example Info', 'agrieurope' ),
		'desc' => __( 'This is just some example information you can put in the panel.', 'agrieurope' ),
		'type' => 'info'
	);

	$options[] = array(
		'name' => __( 'Input Checkbox', 'agrieurope' ),
		'desc' => __( 'Example checkbox, defaults to true.', 'agrieurope' ),
		'id' => 'example_checkbox',
		'std' => '1',
		'type' => 'checkbox'
	);*/

	/*$options[] = array(
		'name' => __( 'Check to Show a Hidden Text Input', 'agrieurope' ),
		'desc' => __( 'Click here and see what happens.', 'agrieurope' ),
		'id' => 'example_showhidden',
		'type' => 'checkbox'
	);

	$options[] = array(
		'name' => __( 'Hidden Text Input', 'agrieurope' ),
		'desc' => __( 'This option is hidden unless activated by a checkbox click.', 'agrieurope' ),
		'id' => 'example_text_hidden',
		'std' => 'Hello',
		'class' => 'hidden',
		'type' => 'text'
	);

	$options[] = array(
		'name' => __( 'Uploader Test', 'agrieurope' ),
		'desc' => __( 'This creates a full size uploader that previews the image.', 'agrieurope' ),
		'id' => 'example_uploader',
		'type' => 'upload'
	);

	$options[] = array(
		'name' => "Example Image Selector",
		'desc' => "Images for layout.",
		'id' => "example_images",
		'std' => "2c-l-fixed",
		'type' => "images",
		'options' => array(
			'1col-fixed' => $imagepath . '1col.png',
			'2c-l-fixed' => $imagepath . '2cl.png',
			'2c-r-fixed' => $imagepath . '2cr.png'
		)
	);

	$options[] = array(
		'name' =>  __( 'Example Background', 'agrieurope' ),
		'desc' => __( 'Change the background CSS.', 'agrieurope' ),
		'id' => 'example_background',
		'std' => $background_defaults,
		'type' => 'background'
	);

	$options[] = array(
		'name' => __( 'Multicheck', 'agrieurope' ),
		'desc' => __( 'Multicheck description.', 'agrieurope' ),
		'id' => 'example_multicheck',
		'std' => $multicheck_defaults, // These items get checked by default
		'type' => 'multicheck',
		'options' => $multicheck_array
	);

	$options[] = array(
		'name' => __( 'Colorpicker', 'agrieurope' ),
		'desc' => __( 'No color selected by default.', 'agrieurope' ),
		'id' => 'example_colorpicker',
		'std' => '',
		'type' => 'color'
	);

	$options[] = array( 'name' => __( 'Typography', 'agrieurope' ),
	                    'desc' => __( 'Example typography.', 'agrieurope' ),
	                    'id' => "example_typography",
	                    'std' => $typography_defaults,
	                    'type' => 'typography'
	);

	$options[] = array(
		'name' => __( 'Custom Typography', 'agrieurope' ),
		'desc' => __( 'Custom typography options.', 'agrieurope' ),
		'id' => "custom_typography",
		'std' => $typography_defaults,
		'type' => 'typography',
		'options' => $typography_options
	);*/

	/**
	 * For $settings options see:
	 * http://codex.wordpress.org/Function_Reference/wp_editor
	 *
	 * 'media_buttons' are not supported as there is no post to attach items to
	 * 'textarea_name' is set by the 'id' you choose
	 */

	/*$wp_editor_settings = array(
		'wpautop' => true, // Default
		'textarea_rows' => 5,
		'tinymce' => array( 'plugins' => 'wordpress,wplink' )
	);

	$options[] = array(
		'name' => __( 'Default Text Editor', 'agrieurope' ),
		'desc' => sprintf( __( 'You can also pass settings to the editor.  Read more about wp_editor in <a href="%1$s" target="_blank">the WordPress codex</a>', 'agrieurope' ), 'http://codex.wordpress.org/Function_Reference/wp_editor' ),
		'id' => 'example_editor',
		'type' => 'editor',
		'settings' => $wp_editor_settings
	);*/

	return $options;
}