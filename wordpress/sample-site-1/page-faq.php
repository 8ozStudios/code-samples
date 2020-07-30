<?php
/**
 *
 * Template Name:  FAQ
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
	
<section class="faq">
	<div class="content-wrapper">
		<?php if( have_rows('qa_steps') ): ?>
			<?php $i = 1; while ( have_rows('qa_steps') ) : the_row(); ?>
				<div class="qa_steps <?php echo (true || $i==1) ? 'expanded' : ''; ?>" data-qagroup="<?php echo $i; ?>">
					<div class="title_row">
						<div class="step-toggle toggle"></div>
						<div class="number"><span><?php echo $i; ?></span></div>
						<div class="section_title"><?php the_sub_field('section_title'); ?><a name="<?php the_sub_field('section_title'); ?>"> </a></div>
					</div>
					<?php if( have_rows('qa') ): ?>
						<div class="qa-group">
							<?php $j = 1; while ( have_rows('qa') ) : the_row(); ?>
								<div class="qa <?php echo ($j==1) ? 'expanded' : ''; ?>" data-qa="<?php echo $j; ?>">
									<div class="qa-wrapper">
										<div class="question">
											<?php the_sub_field('question'); ?>
											<div class="qa-toggle toggle"></div>
										</div>
										<div class="answer-preview fadeout"><?php the_sub_field('answer'); ?></div>
										<div class="answer">
											<?php the_sub_field('answer'); ?>
										</div>
									</div>
								</div>
							<?php $j++; endwhile; ?>
						</div>
					<?php endif; ?>
				</div>
			<?php $i++; endwhile; ?>
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