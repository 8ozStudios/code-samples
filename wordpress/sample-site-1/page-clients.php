<?php
/**
 *
 * Template Name:  Clients
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
	
	<!--
<section class="logos">
	<div class="content-wrapper row col">
		<?php if( have_rows('client_logos') ): ?>
			<?php while ( have_rows('client_logos') ) : the_row(); ?>
				<div class="col-1">
					<?php echo (get_sub_field('link')) ? '<a href="'.get_sub_field('link').'">' : ''; ?>
					<img src="<?php echo wp_get_attachment_image_src( get_sub_field('logo_image'), 'full' )[0]; ?>" width="150" alt="<?php the_sub_field('alt_text'); ?>">
					<?php echo (get_sub_field('link')) ? '</a>' : ''; ?>
				</div>
			<?php endwhile; ?>
		<?php endif; ?>
	</div>
</section>
-->
	
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
	
<section class="industries">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('industries_title'); ?></div>
		<div class="title-3"><?php the_field('industries_subtitle'); ?></div>
		<?php if( have_rows('industries') ): ?>
			<div class="industries-sections row col">
				<?php while ( have_rows('industries') ) : the_row(); ?>
					<div class="section col-1">
						<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_sub_field('industry_icon'), 'full' )[0]; ?>" alt="" /></div>
						<div class="text"><?php the_sub_field('industry_text'); ?></div>
					</div>
				<?php endwhile; ?>
			</div>
		<?php endif; ?>
	</div>
</section>
	
<section class="clients">
	<div class="content-wrapper row col">
		<div class="col-3">
			<div class="graphic">
				<img src="/wp-content/themes/kale-child/images/ODO-Logo-Sm.png" width="100">
			</div>
			<div class="title-1"><?php the_field('clients_title'); ?></div>
			<p><?php the_field('clients_subtitle'); ?></p>
			<button class="desktop-only" onclick="location.href='<?php the_field('clients_button_link'); ?>'" type="button"><?php the_field('clients_button_text'); ?></button>
		</div>
		<div class="col-2">
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
			<button class="desktop-hide" onclick="location.href='<?php the_field('clients_button_link'); ?>'" type="button"><?php the_field('clients_button_text'); ?></button>
		</div>
	</div>
</section>
	

	<!--
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
-->
	
</div>

<?php endwhile; ?>

<?php get_footer(); ?>