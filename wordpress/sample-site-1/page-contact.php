<?php
/**
 *
 * Template Name:  Contact
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
	
<section class="contact">
	<div class="content-wrapper">
		<div class="section row">
			<div class="col-3 contact-method">
				<div class="col-2 icon">
					<img src="<?php echo wp_get_attachment_image_src( get_field('email_icon'), 'full' )[0]; ?>" alt="" />
				</div>
				<div class="col-5 text">
					<div>
						<div class="labl">Email:</div>
						<div class="value"><?php the_field('email'); ?></div>
					</div>
				</div>
			</div>
			<div class="col-1 spacer"></div>
			<div class="col-3 contact-method">
				<div class="col-2 icon">
					<img src="<?php echo wp_get_attachment_image_src( get_field('phone_icon'), 'full' )[0]; ?>" alt="" />
				</div>
				<div class="col-5 text">
					<div>
						<div class="labl">Phone:</div>
						<div class="value"><?php the_field('phone'); ?></div>
					</div>
				</div>
			</div>
			<div class="col-1 spacer"></div>
			<div class="col-3 contact-method">
				<div class="col-2 icon">
					<img src="<?php echo wp_get_attachment_image_src( get_field('address_icon'), 'full' )[0]; ?>" alt="" />
				</div>
				<div class="col-5 text">
					<div>
						<div class="labl">Address:</div>
						<div class="value"><?php the_field('address'); ?></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
	
<section class="form">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('form_title'); ?></div>
		<div class="subtitle-1"><?php the_field('form_description'); ?></div>
		<div class="form-row">
			<?php echo do_shortcode("[gravityform id=" . get_field('gravity_form_id') . " ajax=true title=false description=false]"); ?>
		</div>
		
	</div>
</section>
	
</div>

<?php endwhile; ?>

<?php get_footer(); ?>