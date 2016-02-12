<?php
//$now = time();
$topic = $atts['topic'];
$type = $atts['type'];
$limit = ($atts['limit']) ? $atts['limit'] : '1';

wp_reset_query();

$upcoming = (object) array(
    'from' => (object) array(
            'formatted' => date("Ymd"),
            'year' => date("Y"),
            'month' => date("n"),
            'day' => date("d"),
        ),
    'to' => (object) array(
            'formatted' => date("Y1231"),
            'year' => date("Y"),
            'month' => date("12"),
            'day' => date("31"),
        ),
);

$dateList = array((object) array(
    'dateFrom' => $upcoming->from->formatted,
    'dateTo' => $upcoming->to->formatted,
));

$meta_query = array();

$meta_query[] = _iab_event_browse_fetch_get_meta_query( $dateList[0]->dateFrom, $dateList[0]->dateTo );

$args = array(
    'post_type'         => array('iab_event'),
    'category_name'     => $topic,
    'iab_event_type'    => $type,
    'posts_per_page'    => $limit,
    'order'             => 'ASC',
    'post_status'       => 'publish',
    'meta_query'        => $meta_query
);

$posts = new WP_Query($args);
$total_posts = $posts->found_posts;
$posts_count = 0;

if($posts->have_posts()):
    while($posts->have_posts()): $posts->the_post();
        $event_date_from    = get_field( 'event_date_from', get_the_ID() );
        $event_date_to      = get_field( 'event_date_to', get_the_ID() );
        $event_time_start   = get_field( 'event_time_start', get_the_ID() );
        $event_time_end     = get_field( 'event_time_end', get_the_ID() );
        $event_time_tz      = get_field( 'event_time_timezone', get_the_ID() ) ?: 'EST';
        $event_location     = get_field( 'event_location', get_the_ID() );

        $formatted_date = ( empty($event_date_to) || $event_date_from == $event_date_to ) ? date( 'l, F, j, Y', strtotime($event_date_from) ) : date( 'F, j', strtotime($event_date_from) ) . " - " . date( 'F, j, Y', strtotime($event_date_to) );
        $formatted_date .= ', ' . $event_time_start.' '.$event_time_tz.' - '.$event_time_end.' '.$event_time_tz;

        ?>
        <a href="<?php the_permalink() ?>" title="Link to <?php the_title_attribute(); ?>"><?php the_title(); ?></a>,<br /> <?php echo $formatted_date; ?>
    <?php endwhile;
else :
    echo '<span class="no-results">No upcoming events at this time, check back soon.</span>';
endif; wp_reset_query();
?>