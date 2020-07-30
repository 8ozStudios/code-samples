<?php
/**
 *
 * Template Name:  Home
 *
 */
?>
<?php get_header(); ?>

<?php while ( have_posts() ) : the_post(); ?>

<div class="main-content">

<section class="hero">
	<div class="content-wrapper row col">
		<div class="col-2 text">
			<h1><?php the_field('hero_title'); ?></h1>
			<h2><?php the_field('hero_subtitle'); ?></h2>
			<div class="row col button-row">
				<div class="col-1">
					<button onclick="location.href='<?php the_field('hero_link'); ?>'" type="button"><?php the_field('hero_button'); ?></button>
				</div>
				<div class="col-1 small-text">
					<?php the_field('hero_small_text'); ?>
				</div>
			</div>
		</div>
		<div class="col-1 graphic">
			<img src="<?php echo wp_get_attachment_image_src( get_field('hero_graphic'), 'full' )[0]; ?>" alt="" />
		</div>
	</div>
</section>
	
<section class="fancy-hands">
	<div class="content-wrapper row col">
		<div class="col-1 part-of">
			<?php the_field('fancyhands_text'); ?>
		</div>
		<div class="col-2 logos-wrapper">
			<?php if( have_rows('logos') ): ?>
				<?php while ( have_rows('logos') ) : the_row(); ?>
				<div>
					<?php echo (get_sub_field('link')) ? '<a href="'.get_sub_field('link').'">' : ''; ?>
					<img src="<?php echo wp_get_attachment_image_src( get_sub_field('logo'), 'full' )[0]; ?>" width="150" alt="<?php the_sub_field('alt_text'); ?>">
					<?php echo (get_sub_field('link')) ? '</a>' : ''; ?>

				</div>
				<?php endwhile; ?>
			<?php endif; ?>
		</div>
	</div>
</section>
	
<section class="how-we-help">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('how_we_help_title'); ?></div>
		<?php if( have_rows('section') ): ?>
			<div class="row col">
				<?php while ( have_rows('section') ) : the_row(); ?>
					<div class="col-1">
						<?php echo (get_sub_field('link')) ? '<a href="'.get_sub_field('link').'">' : ''; ?>
						<div class="graphic">
							<img src="<?php echo wp_get_attachment_image_src( get_sub_field('graphic'), 'full' )[0]; ?>" width="300">
						</div>
						<div class="title-2"><?php the_sub_field('title'); ?></div>
						<div class="text"><?php the_sub_field('subtitle'); ?></div>
						<?php echo (get_sub_field('link')) ? '</a>' : ''; ?>
					</div>
				<?php endwhile; ?>
			</div>
		<?php endif; ?>
	</div>
</section>
	
<section class="prospects">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('prospects_title'); ?></div>
		<div class="title-3"><?php the_field('prospects_subtitle'); ?></div>
		<div class="row col">
			<div class="col-1">
				<div class="metric"><?php the_field('metric_1_number'); ?></div>
				<div class="type"><?php the_field('metric_1_label'); ?></div>
			</div>
			<div class="col-2">
				<div class="metric"><?php the_field('metric_2_number'); ?></div>
				<div class="type"><?php the_field('metric_2_label'); ?></div>
			</div>
			<div class="col-3">
				<div class="metric"><?php the_field('metric_3_number'); ?></div>
				<div class="type"><?php the_field('metric_3_label'); ?></div>
			</div>
			<div class="col-3">
				<div class="metric"><?php the_field('metric_4_number'); ?></div>
				<div class="type"><?php the_field('metric_4_label'); ?></div>
			</div>
		</div>
		<div class="center">
			<button onclick="location.href='<?php the_field('metric_button_link'); ?>'" type="button"><?php the_field('metric_button_text'); ?></button>
		</div>
	</div>
</section>
	
<section class="diagram">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('diagram_title'); ?></div>
		<div class="row col venn">
			<div class="col-1 circle">
				<div class="circle-content">					
					<div class="graphic">
						<img src="<?php echo wp_get_attachment_image_src( get_field('left_icon'), 'full' )[0]; ?>" width="300">
					</div>
					<div class="title"><?php the_field('left_title'); ?></div>
					<div class="text"><?php the_field('left_description'); ?></div>
					<button onclick="location.href='<?php the_field('left_button_link'); ?>'" type="button"><?php the_field('left_button_text'); ?></button>
				</div>
			</div>
			<div class="plus"></div>
			<div class="col-1 circle">
				<div class="circle-content">					
					<div class="graphic">
						<img src="<?php echo wp_get_attachment_image_src( get_field('right_icon'), 'full' )[0]; ?>" width="300">
					</div>
					<div class="title"><?php the_field('right_title'); ?></div>
					<div class="text"><?php the_field('right_description'); ?></div>
					<button onclick="location.href='<?php the_field('right_button_link'); ?>'" type="button"><?php the_field('right_button_text'); ?></button>
				</div>
			</div>
		</div>
	</div>
</section>
	
<section class="map">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('map_title'); ?></div>
		<div class="map-wrapper" style="background:url(<?php echo wp_get_attachment_image_src( get_field('map_background_image'), 'full' )[0]; ?>) no-repeat center center;background-size:contain;">
			<?php if( have_rows('testimonials') ): ?>
				<?php while ( have_rows('testimonials') ) : the_row(); ?>
				<?php $offset = explode(",", get_sub_field('center_offset')); ?>
				<div class="quote-wrapper" style="margin-left:<?php echo $offset[0]; ?>;margin-top:<?php echo $offset[1]; ?>;">
					<div class="quote">"<?php the_sub_field('quote'); ?>"</div>
					<img src="<?php echo wp_get_attachment_image_src( get_sub_field('icon'), 'full' )[0]; ?>" width="150">
					<div class="name"><?php the_sub_field('name'); ?>,<br /> <?php the_sub_field('position'); ?></div>
				</div>
				<?php endwhile; ?>
			<?php endif; ?>
		</div>
		<div class="quotes-slider">
			<ul>
				<?php if( have_rows('testimonials') ): ?>
					<?php while ( have_rows('testimonials') ) : the_row(); ?>
					<li class="quote-wrapper" >
						<div class="quote">"<?php the_sub_field('quote'); ?>"</div>
						<img src="<?php echo wp_get_attachment_image_src( get_sub_field('icon'), 'full' )[0]; ?>" width="150">
						<div class="name"><?php the_sub_field('name'); ?>,<br /> <?php the_sub_field('position'); ?></div>
					</li>
					<?php endwhile; ?>
				<?php endif; ?>
			</ul>
		</div>
	</div>
</section>
	
<section class="complement">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('perfect_title'); ?></div>
		<p><?php the_field('perfect_subtitle'); ?></p>
		<div class="center">
			<img class="mobile-hide" src="<?php echo wp_get_attachment_image_src( get_field('perfect_graphic'), 'full' )[0]; ?>" width="900">
			<img class="mobile" src="<?php echo wp_get_attachment_image_src( get_field('perfect_graphic_mobile'), 'full' )[0]; ?>" width="900">
		</div>
	</div>
</section>
	
<section class="clients">
	<div class="content-wrapper row col">
		<div class="col-1">
			<div class="graphic">
				<img src="/wp-content/themes/kale-child/images/ODO-Logo-Sm.png" width="100">
			</div>
			<div class="title-1"><?php the_field('clients_title'); ?></div>
			<p><?php the_field('clients_subtitle'); ?></p>
			<button class="tablet-hide" onclick="location.href='<?php the_field('clients_button_link'); ?>'" type="button"><?php the_field('clients_button_text'); ?></button>
		</div>
		<div class="col-1">
			<div class="checks-wrapper">
				<?php if( have_rows('bulletpoints') ): ?>
					<?php while ( have_rows('bulletpoints') ) : the_row(); ?>
						<div class="point">
							<div class="check"></div>
							<?php the_sub_field('text'); ?>
						</div>
					<?php endwhile; ?>
				<?php endif; ?>
			</div>
			<button class="tablet" onclick="location.href='<?php the_field('clients_button_link'); ?>'" type="button"><?php the_field('clients_button_text'); ?></button>
		</div>
	</div>
</section>
	
<section class="leads">
	<div class="content-wrapper row col">
		<div class="col-1"></div>
		<div class="col-9">	
			<div class="title-1"><?php the_field('leads_title'); ?></div>
			<p><?php the_field('leads_subtitle'); ?></p>
			<div class="circle-wrapper row col">
				<div class="col-1">
					<div class="circle">
						<div class="circle-content">
							<div class="text"><?php the_field('left_circle_text'); ?></div>
							<button onclick="location.href='<?php the_field('left_circle_link'); ?>'" type="button"><?php the_field('left_circle_button_text'); ?></button>
						</div>
					</div>
				</div>
				<div class="col-1">
					<div class="circle">
						<div class="circle-content">
							<div class="text"><?php the_field('right_circle_text'); ?></div>
							<button onclick="location.href='<?php the_field('right_circle_link'); ?>'" type="button"><?php the_field('right_circle_button_text'); ?></button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-1"></div>
	</div>
	<div class="triangle"></div>
</section>
	
<section class="calltoaction">
	<div class="content-wrapper">
		<div class="center">
			<img src="<?php echo wp_get_attachment_image_src( get_field('cta_graphic'), 'full' )[0]; ?>" width="900">
		</div>
		<div class="title-1"><?php the_field('cta_title'); ?></div>
		<div class="center">
			<button onclick="location.href='<?php the_field('cta_button_link'); ?>'" type="button"><?php the_field('cta_button_text'); ?></button>
			<div class="small-text"><?php the_field('cta_small_text'); ?></div>
		</div>
	</div>
</section>
	
</div>

<?php endwhile; ?>

<?php get_footer(); ?>