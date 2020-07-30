<?php
/**
 *
 * Template Name:  Careers
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
	
<section class="career-intro">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('page_title'); ?></div>
		<div class="subtitle-1"><?php the_field('page_description'); ?></div>
		<?php if( have_rows('sections') ): ?>
			<div class="section row">
				<?php while ( have_rows('sections') ) : the_row(); ?>
				<div class="col-1">
					<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_sub_field('graphic'), 'full' )[0]; ?>" width="400" /></div>
					<div class="title"><?php the_sub_field('title'); ?></div>
				</div>
				<?php endwhile; ?>
			</div>
		<?php endif; ?>				
	</div>
</section>
	
<section class="operations jobs">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('oa_title'); ?></div>
		<div class="subtitle-1"><?php the_field('oa_desc'); ?></div>
		<div class="skills-row">
			<?php if( have_rows('oa_skills') ): ?>
				<?php while ( have_rows('oa_skills') ) : the_row(); ?>
					<div class="skill"><?php the_sub_field('skill'); ?></div>
				<?php endwhile; ?>
			<?php endif; ?>
		</div>
		<div class="jobs-row">
			<div class="jobs-row-title"><?php the_field('oa_list_title'); ?></div>
			<?php if( have_rows('oa_jobs') ): ?>
				<div class="job-list">
					<?php while ( have_rows('oa_jobs') ) : the_row(); ?>
						<div class="job-wrapper">
							<div class="position">
								<div class="job-toggle toggle"></div>
								<?php the_sub_field('position_title'); ?>
								<div class="job-content-preview fadeout"><?php the_sub_field('position_description'); ?></div>
							</div>
							<div class="job-content">
								<div class="description"><?php the_sub_field('position_description'); ?></div>
								<div class="category"><?php the_sub_field('expectations_title'); ?></div>
								<div class="content"><?php the_sub_field('expectations_text'); ?></div>
								<div class="category"><?php the_sub_field('qualifications_title'); ?></div>
								<div class="content"><?php the_sub_field('qualifications_text'); ?></div>
								<div class="button-row">
									<!-- apply now link is always empty -->
									<!-- the_field: <?php the_field('apply_now_link'); ?> -->
									<!-- the_sub_field: <?php the_field('apply_now_link'); ?> -->
									<button class="button" onclick="location.href='<?php the_sub_field('apply_now_link'); ?>'">							
										<?php the_sub_field('apply_now_text'); ?>
									</button>
								</div>
							</div>
						</div>
					<?php endwhile; ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</section>
	
<section class="looking-for">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('looking_title'); ?></div>
		<div class="subtitle-1"><?php the_field('looking_desc'); ?></div>
	</div>
</section>
	
<section class="sales jobs">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('more_title'); ?></div>
		<div class="subtitle-1"><?php the_field('more_desc'); ?></div>
		<div class="skills-row">
			<?php if( have_rows('more_skills') ): ?>
				<?php while ( have_rows('more_skills') ) : the_row(); ?>
					<div class="skill"><?php the_sub_field('skill'); ?></div>
				<?php endwhile; ?>
			<?php endif; ?>
		</div>
		<div class="jobs-row">
			<div class="jobs-row-title"><?php the_field('more_list_title'); ?></div>
			<?php if( have_rows('more_jobs') ): ?>
				<div class="job-list">
					<?php while ( have_rows('more_jobs') ) : the_row(); ?>
						<div class="job-wrapper">
							<div class="position">
								<div class="job-toggle toggle"></div>
								<?php the_sub_field('position_title'); ?>
								<div class="job-content-preview fadeout"><?php the_sub_field('position_description'); ?></div>
							</div>
							<div class="job-content">
								<div class="description"><?php the_sub_field('position_description'); ?></div>
								<div class="category"><?php the_sub_field('expectations_title'); ?></div>
								<div class="content"><?php the_sub_field('expectations_text'); ?></div>
								<div class="category"><?php the_sub_field('qualifications_title'); ?></div>
								<div class="content"><?php the_sub_field('qualifications_text'); ?></div>
								<div class="button-row">
									<!-- apply now link is always empty -->
									<!-- the_field: <?php the_field('apply_now_link'); ?> -->
									<!-- the_sub_field: <?php the_field('apply_now_link'); ?> -->
									<button class="button" onclick="location.href='<?php the_sub_field('apply_now_link'); ?>'">
										<?php the_sub_field('apply_now_text'); ?> 
									</button>
								</div>
							</div>
						</div>
					<?php endwhile; ?>
				</div>
			<?php endif; ?>
		</div>
	</div>
</section>
	
<section class="calltoaction">
	<div class="content-wrapper">
		<div class="center">
			<img src="<?php echo wp_get_attachment_image_src( get_field('cta_graphic'), 'full' )[0]; ?>" width="900">
		</div>
		<div class="title-1"><?php the_field('cta_title'); ?></div>
		<div class="cta_content"><?php the_field('cta_content'); ?></div>
	</div>
</section>
	
</div>

<?php endwhile; ?>

<?php get_footer(); ?>