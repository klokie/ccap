<?php
/**
 * pwrstudio_template functions and definitions
 *
 * @package pwrstudio_template
 */

/**
 * Set the content width based on the theme's design and stylesheet.
 */
if ( ! isset( $content_width ) ) {
	$content_width = 640; /* pixels */
}

if ( ! function_exists( 'pwrstudio_template_setup' ) ) :

function pwrstudio_template_setup() {

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus( array(
		'primary' => __( 'Primary Menu', 'pwrstudio_template' ),
	) );
	
	/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
	add_theme_support( 'html5', array(
		'search-form', 'comment-form', 'comment-list', 'gallery', 'caption'
	) );

}
endif; // pwrstudio_template_setup
add_action( 'after_setup_theme', 'pwrstudio_template_setup' );



/**
 * Enqueue scripts and styles.
 */
function pwrstudio_template_scripts() {
    wp_enqueue_style( 'pwrstudio_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css');
    wp_enqueue_style( 'pwrstudio_template-style', get_template_directory_uri() . '/build/style/main.css');
        
    if (!is_admin()) {
        wp_deregister_script('jquery');
        
        wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js', false, '1', true);
        wp_enqueue_script('jquery');       
      
        wp_register_script('hdb', '//cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.3/handlebars.runtime.min.js', false, '1', true);
        wp_enqueue_script('hdb');         
      
        wp_register_script('cookies', '//cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js', false, '1', true);
        wp_enqueue_script('cookies');           
      
        wp_register_script('templates', get_template_directory_uri() . '/build/js/templates.js', false, '1', true);
        wp_enqueue_script('templates');
        
        wp_register_script( 'pwr_scripts', get_template_directory_uri() . '/build/js/main.min.js', false, '1', true);
        wp_enqueue_script('pwr_scripts');

    }

}
add_action( 'wp_enqueue_scripts', 'pwrstudio_template_scripts' );

add_filter('show_admin_bar', '__return_false');

// Remove auto p
function img_unautop($pee) {
    $pee = preg_replace('/<p>\\s*?(<a .*?><img.*?><\\/a>|<img.*?>)?\\s*<\\/p>/s', '<div class="figure">$1</div>', $pee);
    return $pee;
}
add_filter( 'the_content', 'img_unautop', 30 );

// CUSTOM IMAGE SIZES
add_action( 'after_setup_theme', 'image_size_setup' );
function image_size_setup() {
    add_image_size( 'pwr-small', 500 );
    add_image_size( 'pwr-medium', 800 );
    add_image_size( 'pwr-large', 1600 );
}

// CUSTOM TOOL BAR
add_filter( 'acf/fields/wysiwyg/toolbars' , 'my_toolbars'  );
function my_toolbars( $toolbars )
{
    // Uncomment to view format of $toolbars
    //	echo '< pre >';
    //		print_r($toolbars);
    //	echo '< /pre >';
    //	die;

    // Add a new toolbar called "Very Simple"
    // - this toolbar has only 1 row of buttons
    $toolbars['Very Simple' ] = array();
    $toolbars['Very Simple' ][1] = array('italic', 'bold', 'underline' , 'link', 'unlink');

    // Edit the "Full" toolbar and remove 'code'
    // - delet from array code from http://stackoverflow.com/questions/7225070/php-array-delete-by-value-not-key
    if( ($key = array_search('code' , $toolbars['Full' ][2])) !== false )
    {
        unset( $toolbars['Full' ][2][$key] );
    }

    // remove the 'Basic' toolbar completely
    unset( $toolbars['Basic' ] );

    // return $toolbars - IMPORTANT!
    return $toolbars;
}

// DISABLE STUFF

//Disable RSS Feeds functions
add_action('do_feed', array( $this, 'disabler_kill_rss' ), 1);
add_action('do_feed_rdf', array( $this, 'disabler_kill_rss' ), 1);
add_action('do_feed_rss', array( $this, 'disabler_kill_rss' ), 1);
add_action('do_feed_rss2', array( $this, 'disabler_kill_rss' ), 1);
add_action('do_feed_atom', array( $this, 'disabler_kill_rss' ), 1);
if(function_exists('disabler_kill_rss')) {
	function disabler_kill_rss(){
		wp_die( _e("No feeds available.", 'ippy_dis') );
	}
}

//Remove feed link from header
remove_action( 'wp_head', 'feed_links_extra', 3 ); //Extra feeds such as category feeds
remove_action( 'wp_head', 'feed_links', 2 ); // General feeds: Post and Comment Feed

function pu_remove_script_version( $src ){
    return remove_query_arg( 'ver', $src );
}

add_filter( 'script_loader_src', 'pu_remove_script_version' );
add_filter( 'style_loader_src', 'pu_remove_script_version' );

// Clean up header
remove_action('wp_head', 'rsd_link');
remove_action('wp_head', 'wlwmanifest_link');

function disable_wp_emojicons() {

  // all actions related to emojis
  remove_action( 'admin_print_styles', 'print_emoji_styles' );
  remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
  remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
  remove_action( 'wp_print_styles', 'print_emoji_styles' );
  remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
  remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
  remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );

  // filter to remove TinyMCE emojis
  add_filter( 'tiny_mce_plugins', 'disable_emojicons_tinymce' );
}
add_action( 'init', 'disable_wp_emojicons' );

add_filter( 'query_vars', function( $vars ){
    $vars[] = 'post_parent';
    return $vars;
});

//function my_pre_get_posts( $query ) {
//  
//  
////  var_dump($query->query_vars);
//  
//	// only modify queries for 'event' post type
//	if($query->query_vars['post_type'] == 'schedule' ) {
//		
//		$query->set('orderby', 'meta_value');	
//		$query->set('meta_key', 'datum');	 
//		$query->set('order', 'DESC');
//        var_dump($query);
//	
//	}
//	// return
//	return $query;
//
//}
//
//add_action('pre_get_posts', 'my_pre_get_posts');

//// Disable support for comments and trackbacks in post types
//function df_disable_comments_post_types_support() {
//	$post_types = get_post_types();
//	foreach ($post_types as $post_type) {
//		if(post_type_supports($post_type, 'comments')) {
//			remove_post_type_support($post_type, 'comments');
//			remove_post_type_support($post_type, 'trackbacks');
//		}
//	}
//}
//add_action('admin_init', 'df_disable_comments_post_types_support');
//
//// Close comments on the front-end
//function df_disable_comments_status() {
//	return false;
//}
//add_filter('comments_open', 'df_disable_comments_status', 20, 2);
//add_filter('pings_open', 'df_disable_comments_status', 20, 2);
//
//// Hide existing comments
//function df_disable_comments_hide_existing_comments($comments) {
//	$comments = array();
//	return $comments;
//}
//add_filter('comments_array', 'df_disable_comments_hide_existing_comments', 10, 2);
//
//// Remove comments page in menu
//function df_disable_comments_admin_menu() {
//	remove_menu_page('edit-comments.php');
//}
//add_action('admin_menu', 'df_disable_comments_admin_menu');
//
//// Redirect any user trying to access comments page
//function df_disable_comments_admin_menu_redirect() {
//	global $pagenow;
//	if ($pagenow === 'edit-comments.php') {
//		wp_redirect(admin_url()); exit;
//	}
//}
//add_action('admin_init', 'df_disable_comments_admin_menu_redirect');
//
//// Remove comments metabox from dashboard
//function df_disable_comments_dashboard() {
//	remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');
//}
//add_action('admin_init', 'df_disable_comments_dashboard');
//
//// Remove comments links from admin bar
//function df_disable_comments_admin_bar() {
//	if (is_admin_bar_showing()) {
//		remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
//	}
//}
//add_action('init', 'df_disable_comments_admin_bar');

//
//function formatted_date_span() {
//    $out = array();
//
//    $timestamp_start = strtotime(get_field('start_date', $post->ID));
//    $timestamp_end = strtotime(get_field('end_date', $post->ID));
//
//    $startDatum = strftime('%e %B, %Y', $timestamp_start);
//    $slutDatum = strftime('%e %B, %Y', $timestamp_end);
//
//    if(substr($startDatum, -4) == substr($slutDatum, -4)) {
//        $startDatum = substr_replace($startDatum ,"",-6);
//    }
//    $out[] = ucwords($startDatum) . ' – ' . ucwords($slutDatum);
//    return implode('', $out );
//}
//
//function formatted_date_event() {
//    $out = array();
//    $startDatum = strftime('%A  %e %B – %H.00', get_field('start_date', $post->ID));
//    $out[] = ucwords($startDatum);
//    return implode('', $out );
//}
