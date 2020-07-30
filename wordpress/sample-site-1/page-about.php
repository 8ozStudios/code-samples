<?php
/**
 *
 * Template Name:  About Us
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
	
<section class="about">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('section_title_1'); ?></div>
		<div class="section row">
			<div class="col-1">
				<img src="<?php echo wp_get_attachment_image_src( get_field('section_graphic_1'), 'full' )[0]; ?>" alt="" />
			</div>
			<div class="col-3">
				<?php the_field('section_content_1'); ?>
			</div>
		</div>
		<div class="title-1"><?php the_field('section_title_2'); ?></div>
		<div class="section row">
			<div class="col-1">
				<img src="<?php echo wp_get_attachment_image_src( get_field('section_graphic_2'), 'full' )[0]; ?>" alt="" />
			</div>
			<div class="col-3">
				<?php the_field('section_content_2'); ?>
			</div>
		</div>
	</div>
</section>
	<!-- COMMENT THIS OUT  
<section class="staff">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('staff_title'); ?></div>
		<div class="staff-row">
			<div class="staff-row-title"><?php the_field('leadership_title'); ?></div>
			<?php if( have_rows('leadership') ): ?>
				<div class="staff-row-thumbs">
					<?php while ( have_rows('leadership') ) : the_row(); ?>
						<div class="staff-thumb">
							<div class="headshot" style="background:url(<?php echo wp_get_attachment_image_src( get_sub_field('headshot'), 'medium' )[0]; ?>) no-repeat center center;background-size:cover;"></div>
							<div class="name"><?php the_sub_field('name'); ?></div>
							<div class="position"><?php the_sub_field('position'); ?></div>
						</div>
					<?php endwhile; ?>
				</div>
			<?php endif; ?>
		</div>
		<div class="staff-row">
			<div class="staff-row-title"><?php the_field('team_title'); ?></div>
			<?php if( have_rows('team') ): ?>
				<div class="staff-row-thumbs">
					<?php while ( have_rows('team') ) : the_row(); ?>
						<div class="staff-thumb">
							<div class="headshot" style="background:url(<?php echo wp_get_attachment_image_src( get_sub_field('headshot'), 'medium' )[0]; ?>) no-repeat center center;background-size:cover;"></div>
							<div class="name"><?php the_sub_field('name'); ?></div>
							<div class="position"><?php the_sub_field('position'); ?></div>
						</div>
					<?php endwhile; ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</section>
	 END COMMENT -->
	
<section class="sections">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('section_title'); ?></div>
		<?php if( have_rows('section_columns') ): ?>
			<div class="section-wrapper">
				<ul>
					<?php while ( have_rows('section_columns') ) : the_row(); ?>
						<li>
							<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_sub_field('icon'), 'full' )[0]; ?>" alt="" /></div>
							<div class="title"><?php the_sub_field('title'); ?></div>
							<div class="description"><?php the_sub_field('description'); ?></div>
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