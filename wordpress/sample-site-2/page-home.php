<?php 
// Loads the header.php template.
get_header();
?>

<?php
// Dispay Loop Meta at top
hoot_display_loop_title_content( 'pre', 'page.php' );
if ( hoot_page_header_attop() ) {
	get_template_part( 'template-parts/loop-meta' ); // Loads the template-parts/loop-meta.php template to display Title Area with Meta Info (of the loop)
	hoot_display_loop_title_content( 'post', 'page.php' );
}

// Template modification Hook
do_action( 'hoot_template_before_content_grid', 'page.php' );
?>

<div class="hgrid main-content-grid">

	<?php
	// Template modification Hook
	do_action( 'hoot_template_before_main', 'page.php' );
	?>

	<main <?php hoot_attr( 'content' ); ?>>

		<?php
		// Template modification Hook
		do_action( 'hoot_template_main_start', 'page.php' );

		// Checks if any posts were found.
		if ( have_posts() ) :

			// Dispay Loop Meta in content wrap
			if ( ! hoot_page_header_attop() ) {
				hoot_display_loop_title_content( 'post', 'page.php' );
				get_template_part( 'template-parts/loop-meta' ); // Loads the template-parts/loop-meta.php template to display Title Area with Meta Info (of the loop)
			}
			?>

			<div id="content-wrap">

				<?php
				// Template modification Hook
				do_action( 'hoot_loop_start', 'page.php' );

				// Begins the loop through found posts, and load the post data.
				while ( have_posts() ) : the_post(); ?>
				
					<section class="slideshow">
						<div class="slider">
							<?php if( get_field('text_box_overlaying_slideshow') ){ ?>
								<div class="slider-overlay">
									<?php the_field('text_box_overlaying_slideshow'); ?>									
								</div>
							<?php } ?>
							<?php if( have_rows('slideshow') ): ?>
								<ul>
								<?php while ( have_rows('slideshow') ) : the_row(); ?>
									<li>
										<img src="<?php echo wp_get_attachment_image_src( get_sub_field('image'), 'full' )[0]; ?>" alt="<?php the_sub_field('caption'); ?>" width="1300"/>
										<?php if( get_sub_field('caption') ){ ?>
											<div class="caption"></div>
										<?php } ?>
									</li>
								<?php endwhile; ?>
								</ul>
							<?php endif; ?>
						</div>
						<script>
							(function ($) {
								$(document).ready(function(){
									$('.slider').unslider() 
								});
							})
						</script>
					</section>
					<section class="mission">
						<?php if( get_field('our_mission_header') ){ ?>
							<div class="header">
								<?php the_field('our_mission_header'); ?>									
							</div>
						<?php } ?>
						<?php if( get_field('our_mission_content') ){ ?>
							<div class="content">
								<?php the_field('our_mission_content'); ?>												<div class="button-wrapper">
									<!--<?php if( get_field('left_button_text') && get_field('left_button_url') ){ ?>
										<a class="button" href="<?php the_field('left_button_url'); ?>"><?php the_field('left_button_text'); ?></a>
									<?php } ?>-->
									<?php echo do_shortcode('[give_form id="281"]'); ?>
								
									<?php if( get_field('right_button_text') && get_field('right_button_url') ){ ?>
										<a class="button" href="<?php the_field('right_button_url'); ?>"><?php the_field('right_button_text'); ?></a>
									<?php } ?>
								</div>
							</div>
						<?php } ?>
					</section>
					<?php if( get_field('display_news') == 'yes' ){ ?>
						<section class="news">
							<div class="news-wrapper">
								<div class="header">
									<?php the_field('news_header'); ?>	
								</div>
								<div class="content">
									<?php 
									$args = array(
										'post_type' => 'events',
										'showposts' => 1,
									);
									$my_query = new WP_Query( $args );
									?>
									<?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
										<div class="title">
											<a href="<?php the_permalink() ?>" title="<?php the_title(); ?>">
												<?php the_title(); ?>
											</a>
										</div>
										<div class="desc">
											<?php the_content(); ?>
											<a href="<?php the_permalink() ?>" title="<?php the_title(); ?>">
												Read more
											</a>
										</div>
									<?php endwhile; wp_reset_query(); ?>
								</div>
							</div>
							<!--<div class="serving-wrapper">
								<?php if( get_field('right_side_header') ){ ?>
									<div class="header">
										<?php the_field('right_side_header'); ?>									
									</div>
								<?php } ?>
								<?php if( get_field('right_side_content') ){ ?>
									<div class="content">
										<?php the_field('right_side_content'); ?>	
										<div class="button-wrapper">
											<?php if( get_field('left_button_text') && get_field('left_button_url') ){ ?>
												<a class="button" href="<?php the_field('left_button_url'); ?>"><?php the_field('left_button_text'); ?></a>
											<?php } ?>
											<?php if( get_field('right_button_text') && get_field('right_button_url') ){ ?>
												<a class="button" href="<?php the_field('right_button_url'); ?>"><?php the_field('right_button_text'); ?></a>
												<?php } ?>
										</div>
									</div>
								<?php } ?>
							</div>-->
						</section>
					<?php } ?>
					<section class="metrics">
						<div class="three-columns">
							<div class="title"><?php the_field('left_metric_title'); ?></div>
							<div class="desc"><?php the_field('left_metric_description'); ?></div>
							<div class="value"><?php the_field('left_metric_value'); ?></div>
							<div class="label"><?php the_field('left_metric_label'); ?></div>
						</div>
						<div class="three-columns">
							<div class="title"><?php the_field('middle_metric_title'); ?></div>
							<div class="desc"><?php the_field('middle_metric_description'); ?></div>
							<div class="value"><?php the_field('middle_metric_value'); ?></div>
							<div class="label"><?php the_field('middle_metric_label'); ?></div>
						</div>
						<div class="three-columns">
							<div class="title"><?php the_field('right_metric_title'); ?></div>
							<div class="desc"><?php the_field('right_metric_description'); ?></div>
							<div class="value"><?php the_field('right_metric_value'); ?></div>
							<div class="label"><?php the_field('right_metric_label'); ?></div>
						</div>
					</section>
					

				<?php endwhile;

				// Template modification Hook
				do_action( 'hoot_loop_end', 'page.php' );
				?>

			</div><!-- #content-wrap -->

			<?php
			// Template modification Hook
			do_action( 'hoot_template_after_content_wrap', 'page.php' );

			// Loads the comments.php template if this page is not being displayed as frontpage or a custom 404 page or if this is attachment page of media attached (uploaded) to a page.
			if ( !is_front_page() && !hoot_is_404() && !is_attachment() ) :

				// Loads the comments.php template
				comments_template( '', true );

			endif;

		// If no posts were found.
		else :

			// Loads the template-parts/error.php template.
			get_template_part( 'template-parts/error' );

		// End check for posts.
		endif;

		// Template modification Hook
		do_action( 'hoot_template_main_end', 'page.php' );
		?>

	</main><!-- #content -->

	<?php
	// Template modification Hook
	do_action( 'hoot_template_after_main', 'page.php' );
	?>

	<?php hoot_get_sidebar( 'primary' ); // Loads the template-parts/sidebar-primary.php template. ?>

</div><!-- .hgrid -->

<section class="photos">
	<?php if( have_rows('photos') ): ?>
	<div class="grid">
		<?php while ( have_rows('photos') ) : the_row(); ?>
		<div class="grid-item">
			<img src="<?php echo wp_get_attachment_image_src( get_sub_field('image'), 'large' )[0]; ?>" alt="<?php the_sub_field('caption'); ?>" />
		</div>
		<?php endwhile; ?>
	</div>
	<?php endif; ?>
</section>

<?php get_footer(); // Loads the footer.php template. ?>