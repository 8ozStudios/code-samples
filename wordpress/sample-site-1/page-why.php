<?php
/**
 *
 * Template Name:  Why ODO
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
			<?php if( get_field('hero_button') || get_field('hero_small_text') ){ ?>
				<div class="row col">
					<?php if( get_field('hero_button') ){ ?>
						<div class="col-1">
							<button onclick="location.href='<?php the_field('hero_link'); ?>'" type="button"><?php the_field('hero_button'); ?></button>
						</div>
					<?php } ?>
					<?php if( get_field('hero_small_text') ){ ?>
						<div class="col-1 small-text">
							<?php the_field('hero_small_text'); ?>
						</div>
					<?php } ?>
				</div>
			<?php } ?>
		</div>
		<div class="col-1 graphic">
			<img src="<?php echo wp_get_attachment_image_src( get_field('hero_graphic'), 'full' )[0]; ?>" alt="" />
		</div>
	</div>
</section>
	
<section class="top-three">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('top3_title'); ?></div>
		<?php if( have_rows('top3_sections') ): ?>
			<div class="top3-sections row col">
				<ul>				
				<?php $i = 1; while ( have_rows('top3_sections') ) : the_row(); ?>
					<li><div class="section col-1">
						<div class="line"></div>
						<div class="diamond"></div>
						<div class="number"><?php echo $i; ?></div>
						<div class="title"><?php the_sub_field('title'); ?></div>
						<div class="subtitle"><?php the_sub_field('subtitle'); ?></div>
					</div></li>
				<?php $i++; endwhile; ?>
				</ul>
		</div>
		<?php endif; ?>
	</div>
</section>
	
<section class="growth">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('growth_title'); ?></div>
		<?php if( have_rows('growth_sections') ): ?>
			<div class="growth-sections">
				<?php while ( have_rows('growth_sections') ) : the_row(); ?>
					<div class="growth-wrapper">
						<div class="row col">
							<div class="graphic col-1"><img src="<?php echo wp_get_attachment_image_src( get_sub_field('growth_graphics'), 'full' )[0]; ?>" width="900" /></div>
							<div class="col-4">
								<div class="title"><?php the_sub_field('growth_title'); ?></div>
								<div class="description"><?php the_sub_field('growth_description'); ?></div>
							</div>
						</div>
					</div>
				<?php endwhile; ?>
			</div>
		<?php endif; ?>
		<?php if( get_field('growth_description') ){ ?>
			<div class="row col growth-description">
				<?php the_field('growth_description'); ?>
			</div>
		<?php } ?>
		<?php if( get_field('growth_chart_graphic') ){ ?>
			<div class="row col growth-chart">
				<img src="<?php echo wp_get_attachment_image_src( get_field('growth_chart_graphic'), 'full' )[0]; ?>" width="900" class="mobile-hide" />
				<img src="<?php echo wp_get_attachment_image_src( get_field('growth_chart_graphic_mobile'), 'full' )[0]; ?>" width="900" class="mobile-only" />
			</div>
		<?php } ?>
	</div>
</section>
	
<section class="process">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('process_title'); ?></div>
		<?php if( have_rows('process_timeline_items') ): ?>
			<div class="process-timeline"><ul>
				<?php $i = 1; while ( have_rows('process_timeline_items') ) : the_row(); ?>
					<li><div class="timeline-row">
						<div class="timeline-item">
							<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_sub_field('graphic'), 'full' )[0]; ?>" width="900" /></div>
							<div class="title">
								<span>Step <?php echo $i; ?>:</span>
								<?php the_sub_field('text'); ?>
							</div>
							<div class="description"><?php the_sub_field('description'); ?></div>
						</div>	
						<div class="elements">
							<div class="line"></div>
							<div class="dot"></div>
						</div>
					</div></li>
				<?php $i++; endwhile; ?>
			</ul></div>
		<?php endif; ?>
	</div>
</section>
	
<section class="testimonials">
	<div class="content-wrapper">
		<?php if( have_rows('testimonials') ): ?>
			<div class="testimonials-wrapper">
				<ul>
					<?php while ( have_rows('testimonials') ) : the_row(); ?>
						<li class="quote-wrapper">
							<div class="headshot"><img src="<?php echo wp_get_attachment_image_src( get_sub_field('headshot'), 'full' )[0]; ?>" alt="" /></div>
							<div class="title"><?php the_sub_field('title'); ?></div>
							<div class="quote"><?php the_sub_field('quote'); ?></div>
							<div class="name">
								<?php the_sub_field('name'); ?>,
								<?php the_sub_field('position'); ?> @
								<?php the_sub_field('company'); ?>
							</div>
						</li>
					<?php endwhile; ?>
				</ul>
			</div>
		<?php endif; ?>
	</div>
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