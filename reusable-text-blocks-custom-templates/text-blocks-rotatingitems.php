<?php
$num = rand(1,99999);
$id = 'slider' . $num;

$autoslide = true;
if($atts['autoslide'] == 'no'){
    $autoslide = false;
}
$nav = false;
if($atts['shownav'] == 'yes'){
    $nav = true;
}
$arrows = false;
if($atts['showarrows'] == 'yes'){
    $arrows = true;
}
$delay = '3000';
if($atts['slidedelay']){
    $delay = $atts['slidedelay'];
}
?>
<link type="text/css" rel="stylesheet" href="/wp-content/themes/iab/assets/css/unslider.css" />
<link type="text/css" rel="stylesheet" href="/wp-content/themes/iab/assets/css/unslider-dots.css" />
<script type="text/javascript" src="/wp-content/themes/iab/assets/js/unslider-min.js"></script>

<div id="<?php echo $id; ?>" class="">
    <?php echo $content; ?>
</div>
<style>
#<?php echo $id; ?> ul li {
    display:none;
    background-color:#FFF;
}
</style>
<script type="text/javascript">
(function($){
    $(document).ready(function(){
        var height = 0;
        var wrapper = $('#<?php echo $id; ?>');
        wrapper.find('li').each(function(){
            if( $(this).height() > height ){
                height = $(this).height();
            }
        });
        wrapper.height( height );
        var slider<?php echo $num; ?> = wrapper.unslider({
            autoplay: <?php echo ($autoslide) ? 'true' : 'false'; ?>,
            delay: <?php echo $delay; ?>,
            nav: <?php echo ($nav) ? 'true' : 'false'; ?>,
            arrows: <?php echo ($arrows) ? 'true' : 'false'; ?>,
            animation: 'fade',
            animateHeight: true
        });
        $('#<?php echo $id; ?> ul li').show();
    });
})(jQuery);
</script>