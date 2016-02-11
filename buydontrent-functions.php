<?php
/**
 * Realia Child Theme Functions
 */

require_once('includes/SaveSearch.php');

/*
 * Adding javascript and css files for our child theme
 */

function includeFrontEndFiles(){
    wp_register_script( 'custom_wp_js', get_bloginfo('stylesheet_directory') . '/js/script.js', array('jquery'), '', TRUE );
    wp_enqueue_script( 'custom_wp_js' );
    wp_register_script( 'd3', get_bloginfo('stylesheet_directory') . '/js/d3.min.js', array('jquery'), '', TRUE );
    wp_enqueue_script( 'd3' );
    wp_register_script( 'topojson', get_bloginfo('stylesheet_directory') . '/js/topojson.min.js', array('jquery'), '', TRUE );
    wp_enqueue_script( 'topojson' );
    wp_register_script( 'datamaps', get_bloginfo('stylesheet_directory') . '/js/datamaps.usa.min.js', array('jquery'), '', TRUE );
    wp_enqueue_script( 'datamaps' );
}
add_action( 'wp_enqueue_scripts', 'includeFrontEndFiles' );

function includeAdminFiles(){
    wp_register_style( 'custom_wp_admin_css', get_bloginfo('stylesheet_directory') . '/css/admin.css', false, '1.0.0' );
    wp_enqueue_style( 'custom_wp_admin_css' );
    wp_register_script( 'custom_wp_admin_js', get_bloginfo('stylesheet_directory') . '/js/admin.js', false, '1.0.0' );
    wp_enqueue_script( 'custom_wp_admin_js' );
}
add_action( 'admin_enqueue_scripts', 'includeAdminFiles' );

function includeLoginFiles(){
    wp_register_style( 'custom_wp_login_css', get_bloginfo('stylesheet_directory') . '/css/login.css', false, '1.0.0' );
    wp_enqueue_style( 'custom_wp_login_css' );
    wp_register_script( 'custom_wp_login_js', get_bloginfo('stylesheet_directory') . '/js/login.js', false, '1.0.0' );
    wp_enqueue_script( 'custom_wp_login_js' );
}
add_action( 'login_enqueue_scripts', 'includeLoginFiles' );


/*
 * This function builds an array of states with the number of properties in each state and sets it as a javascript global.
 * It is used on the homepage map.
 */
//if( is_front_page() != null ){
function echo_state_results() {
    $args = array(
        'post_type'  => 'property',
        'posts_per_page'    => '99999'
    );
    $query = new WP_Query( $args );
    $stateCount = array();
    if ( $query->have_posts() ) {
        while ( $query->have_posts() ) {
            $query->the_post();
            if( get_post_meta( $query->post->ID, 'state', true ) ){
                $cur = 0;
                if( $stateCount[ get_post_meta( $query->post->ID, 'state', true ) ] ){
                    $cur = $stateCount[ get_post_meta( $query->post->ID, 'state', true ) ];
                }
                $stateCount[ get_post_meta( $query->post->ID, 'state', true ) ] = $cur+1;
            }
            //echo '(' . get_post_meta( $query->post->ID, 'state', true ). ') ';
        }
    }
    echo '<script type="text/javascript">';
    //echo 'var stateCount = []; stateCount["Arizona"]=0; stateCount["Colorado"]=0; stateCount["Delaware"]=0; stateCount["Florida"]=0; stateCount["Georgia"]=0; stateCount["Hawaii"]=0; stateCount["Idaho"]=0; stateCount["Illinois"]=0; stateCount["Indiana"]=0; stateCount["Iowa"]=0; stateCount["Kansas"]=0; stateCount["Kentucky"]=0; stateCount["Louisiana"]=0; stateCount["Maryland"]=0; stateCount["Maine"]=0; stateCount["Massachusetts"]=0; stateCount["Minnesota"]=0; stateCount["Michigan"]=0; stateCount["Mississippi"]=0; stateCount["Missouri"]=0; stateCount["Montana"]=0; stateCount["NorthCarolina"]=0; stateCount["Nebraska"]=0; stateCount["Nevada"]=0; stateCount["NewHampshire"]=0; stateCount["NewJersey"]=0; stateCount["NewYork"]=0; stateCount["NorthDakota"]=0; stateCount["NewMexico"]=0; stateCount["Ohio"]=0; stateCount["Oklahoma"]=0; stateCount["Oregon"]=0; stateCount["Pennsylvania"]=0; stateCount["RhodeIsland"]=0; stateCount["SouthCarolina"]=0; stateCount["SouthDakota"]=0; stateCount["Tennessee"]=0; stateCount["Texas"]=0; stateCount["Utah"]=0; stateCount["Wisconsin"]=0; stateCount["Virginia"]=0; stateCount["Vermont"]=0; stateCount["Washington"]=0; stateCount["WestVirginia"]=0; stateCount["Wyoming"]=0; stateCount["California"]=0; stateCount["Connecticut"]=0; stateCount["Alaska"]=0; stateCount["Arkansas"]=0; stateCount["Alabama"]=0;';
    echo 'var stateCount = [];';
    foreach ($stateCount as $key => $value){
        echo 'stateCount["'.str_replace(' ','',$key).'"] = "'.$value.'";';
    }
    echo '</script>';
}
add_action( 'wp_head', 'echo_state_results' );
//}

/*
 * This code adds/edits the menu links for the admin navigation bar
 */
add_action( 'admin_menu', 'add_intake_link' );
function add_intake_link() {
    add_menu_page( 'admin_intake_form', 'Qualification Questionnaire', 'view_intake', 'intake_page', '', 'dashicons-text', 77 );
}
add_action( 'admin_menu' , 'setting_intake_link' );
function setting_intake_link() {
    global $menu;
    $menu[77][2] = "/intake-form/";
}
add_action( 'admin_menu' , 'renaming_user_link' );
function renaming_user_link() {
    global $menu;
    $menu[70][0] = "Prospects";
}

/*
 * Send user to homepage after login
 * */
function redirect_to_front_page() {
    global $redirect_to;
    if (!isset($_GET['redirect_to'])) {
        $redirect_to = get_option('siteurl');
    }
}
add_action('login_form', 'redirect_to_front_page');

/*
 * Replace Howdy in the top bar
 */
function wp_admin_bar_my_custom_account_menu( $wp_admin_bar ) {
    $user_id = get_current_user_id();
    $current_user = wp_get_current_user();
    $profile_url = get_edit_profile_url( $user_id );

    if ( 0 != $user_id ) {
        /* Add the "My Account" menu */
        $avatar = get_avatar( $user_id, 28 );
        $howdy = sprintf( __('Welcome, %1$s'), $current_user->display_name );
        $class = empty( $avatar ) ? '' : 'with-avatar';

        $wp_admin_bar->add_menu( array(
            'id' => 'my-account',
            'parent' => 'top-secondary',
            'title' => $howdy . $avatar,
            'href' => $profile_url,
            'meta' => array(
                'class' => $class,
            ),
        ) );

    }
}
add_action( 'admin_bar_menu', 'wp_admin_bar_my_custom_account_menu', 11 );

/*
 * Disable admin black bar for all users except admins
 */
function remove_admin_bar() {
    if (!current_user_can('administrator') && !is_admin() && !check_user_role('bdr_staff')) {
        show_admin_bar(false);
    }
}
add_action('after_setup_theme', 'remove_admin_bar');


/*
 * Check for user role
 */
function check_user_role( $role, $user_id = null ) {
    if ( is_numeric( $user_id ) )
        $user = get_userdata( $user_id );
    else
        $user = wp_get_current_user();
    if ( empty( $user ) )
        return false;
    return in_array( $role, (array) $user->roles );
}

/*
 * Add Favicon
 */
function add_favicon(){ ?>
    <link rel="shortcut icon" href="/wp-content/uploads/2015/03/favicon.ico"/>
<?php }
add_action('wp_head','add_favicon');

/*
 * Language switcher to menu
 */
function add_language_switcher ( $items, $args ) {
    if ($args->theme_location == 'main') {
        $languages = icl_get_languages('skip_missing=0&orderby=code');
        if(!empty($languages)){
            foreach($languages as $l){
                $li = '<li class="language">';
                if($l['country_flag_url']){
                    if(!$l['active']){
                        $li .= '<a href="'.$l['url'].'">';
                        $li .= icl_disp_language($l['native_name']);
                        $li .= '</a>';
                    }
                    $li .= '</li>';
                }
            }
        }
        $items .= $li;
    }
    return $items;
}
//add_filter( 'wp_nav_menu_items', 'add_language_switcher', 10, 2 );


/*
 * Save Search functionality
 */

function includeSaveSearchFiles(){
    wp_register_script( 'save_search_script', get_bloginfo('stylesheet_directory') . '/js/save_search.js', array('jquery'), '1', TRUE );
    wp_enqueue_script( 'save_search_script' );
}
add_action( 'wp_enqueue_scripts', 'includeSaveSearchFiles' );

function save_search_handler()
{
    if(empty($_POST)) die('hack');

    $saveSearch = new SaveSearch();
    $saveSearch->processPost();
    $response = 'ok';
    if($saveSearch->hasErrors())
    {
        $response = $saveSearch->getErrors();
    }
    wp_send_json(array('response' => $response));
}

function delete_save_search_handler()
{
    if(empty($_POST)) die('hack');

    $saveSearch = new SaveSearch();
    $saveSearch->deleteFromPost();
    $response = 'ok';
    if($saveSearch->hasErrors())
    {
        $response = $saveSearch->getErrors();
    }
    wp_send_json(array('response' => $response));
}

function set_email_notification_handler()
{
    if(empty($_POST)) die('hack');

    $saveSearch = new SaveSearch();
    $saveSearch->setEmailNotificationFromPost();
    $response = 'ok';
    if($saveSearch->hasErrors())
    {
        $response = $saveSearch->getErrors();
    }
    wp_send_json(array('response' => $response));
}

function after_property_import_cron($import_id) {
    if($import_id == 1){
        $search = new SaveSearch();
        $search->notifyAll();
    }
}

add_action('wp_ajax_save_search', 'save_search_handler');
add_action('wp_ajax_delete_save_search', 'delete_save_search_handler');
add_action('wp_ajax_set_email_notification', 'set_email_notification_handler');
add_action('pmxi_after_xml_import', 'after_property_import_cron', 10, 1);
