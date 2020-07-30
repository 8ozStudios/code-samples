<?php
/**
 *
 * Template Name:  Solutions
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
	
<section class="page-title">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('main_page_title'); ?></div>
		<div id="tabs-row">
			<div id="tabs-wrapper">
				<div class="tab-1">
					<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_field('step_1_tab_icon'), 'full' )[0]; ?>" alt="" width="50" /></div>
					<div class="text"><?php the_field('step_1_tab'); ?></div>
				</div>
				<div class="tab-2">
					<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_field('step_2_tab_icon'), 'full' )[0]; ?>" alt="" width="50" /></div>
					<div class="text"><?php the_field('step_2_tab'); ?></div>
				</div>
				<div class="tab-3">
					<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_field('step_3_tab_icon'), 'full' )[0]; ?>" alt="" width="50" /></div>
					<div class="text"><?php the_field('step_3_tab'); ?></div>
				</div>
			</div>
		</div>
	</div>
</section>
	
<section class="step1 step">
	<div class="content-wrapper">
		<div class="dot"><span>1</span></div>
		<div class="title-1"><?php the_field('step_1_title'); ?></div>
		<div class="subtitle-1"><?php the_field('step_1_description'); ?></div>
		<div class="title-3"><?php the_field('step_1a_subtitle'); ?></div>
		<div class="step1-row">
			<?php if( have_rows('step_1a_section') ): ?>
			<?php while ( have_rows('step_1a_section') ) : the_row(); ?>
			<div class="step1-section">
				<div class="step1-section-wrapper">
					<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_sub_field('graphic'), 'full' )[0]; ?>" alt="" /></div>
					<div class="text">
						<div class="title"><?php the_sub_field('title'); ?></div>
						<div class="description"><?php the_sub_field('description'); ?></div>
					</div>
				</div>
			</div>
			<?php endwhile; ?>
			<?php endif; ?>
		</div>
		<div class="title-3"><?php the_field('step_1b_subtitle'); ?></div>
		<div class="step1-row">
			<?php if( have_rows('step_1b_section') ): ?>
			<?php while ( have_rows('step_1b_section') ) : the_row(); ?>
			<div class="step1-section">
				<div class="step1-section-wrapper">
					<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_sub_field('graphic'), 'full' )[0]; ?>" alt="" /></div>
					<div class="text">
						<div class="title"><?php the_sub_field('title'); ?></div>
						<div class="description"><?php the_sub_field('description'); ?></div>	
					</div>
				</div>
			</div>
			<?php endwhile; ?>
			<?php endif; ?>
		</div>
		<div class="dash-row">
			<div class="title-1"><?php the_field('dash_title'); ?></div>
			<div class="subtitle-1"><?php the_field('dashboard_subtitle'); ?></div>	
			<div class="row">
				<div class="col-1">
					<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_field('dashboard_image_1'), 'full' )[0]; ?>" alt="" /></div>				
				</div>
				<div class="col-1">
					<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_field('dashboard_image_2'), 'full' )[0]; ?>" alt="" /></div>				
				</div>
			</div>
		</div>
	</div>
</section>
	
<section class="step2 step">
	<div class="content-wrapper">
		<div class="dot"><span>2</span></div>
		<div class="title-1"><?php the_field('step_2_title'); ?></div>
		<div class="subtitle-1"><?php the_field('step_2_description'); ?></div>
		<div class="research-sections row"><ul>
			<li><div class="col-1">
				<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_field('data_icon_1'), 'full' )[0]; ?>" alt="" /></div>
				<div class="title"><?php the_field('data_label_1'); ?></div>
			</div></li>
			<li><div class="col-1">
				<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_field('data_icon_2'), 'full' )[0]; ?>" alt="" /></div>
				<div class="title"><?php the_field('data_label_2'); ?></div>
			</div></li>
			<li><div class="col-1">
				<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_field('data_icon_3'), 'full' )[0]; ?>" alt="" /></div>
				<div class="title"><?php the_field('data_label_3'); ?></div>
			</div></li>
		</ul></div>
		<div class="research-twocol-section row">
			<div class="col-1">
				<div class="title"><?php the_field('step_2a_subtitle'); ?></div>
				<?php if( have_rows('section_2a_sections') ): ?>
					<div class="section-2a-sections">
						<?php while ( have_rows('section_2a_sections') ) : the_row(); ?>
							<div class="row">
								<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_sub_field('graphic'), 'full' )[0]; ?>" alt="" /></div>
								<div class="text">
									<div class="title"><?php the_sub_field('title'); ?></div>
									<div class="description"><?php the_sub_field('description'); ?></div>
								</div>
							</div>
						<?php endwhile; ?>
					</div>
				<?php endif; ?>
			</div>
			<div class="col-1">
				<div class="title"><?php the_field('step_2b_subtitle'); ?></div>
				<?php if( have_rows('section_2b_sections') ): ?>
					<div class="section-2b-sections">
						<?php while ( have_rows('section_2b_sections') ) : the_row(); ?>
							<div class="row">
								<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_sub_field('graphic'), 'full' )[0]; ?>" alt="" /></div>
								<div class="text">
									<div class="title"><?php the_sub_field('title'); ?></div>
									<div class="description"><?php the_sub_field('description'); ?></div>
								</div>
							</div>
						<?php endwhile; ?>
					</div>
				<?php endif; ?>
			</div>
		</div>
		
		
		
	</div>
</section>
	
<section class="step3 step">
	<div class="content-wrapper">
		<div class="dot"><span>3</span></div>
		<div class="title-1"><?php the_field('step_3_title'); ?></div>
		<div class="subtitle-1"><?php the_field('step_3_description'); ?></div>
		<?php if( have_rows('documents') ): ?>
			<div class="step3-sections row col">
				<?php while ( have_rows('documents') ) : the_row(); ?>
					<div class="section col-1">
						<div class="graphic"><img src="<?php echo wp_get_attachment_image_src( get_sub_field('icon'), 'full' )[0]; ?>" alt="" /></div>
						<div class="text"><?php the_sub_field('text'); ?></div>
					</div>
				<?php endwhile; ?>
			</div>
		<?php endif; ?>
	</div>
</section>
	

	
<section class="custom">
	<div class="content-wrapper">
		<div class="title-1"><?php the_field('needs_title'); ?></div>
		<div class="subtitle-1"><?php the_field('needs_subtitle'); ?></div>
		<button onclick="location.href='<?php the_field('needs_button_link'); ?>'" type="button"><?php the_field('needs_button_text'); ?></button>

	</div>
</section>
		<!--
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
-->
	
</div>

<?php endwhile; ?>

<?php get_footer(); ?>