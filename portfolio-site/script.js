(function ($) {

  $(document).ready(function(){

    if( $('body').width() < 510 ){
      $('body').addClass('mobile');
    }
    if( $('body').width() < 701 ){
      $('body').addClass('tablet');
    }

    $('nav item').click(function(e){
      e.preventDefault()
      var id = $(this).attr('id');
      $('section#content item').hide();
      $('section#content item#' + id).show();
      $('#shadow').animate({
        width: '+=20px',
        height: '+=20px',
        opacity: 0
      },700,'swing',function(){
        var width = '200';
        var height = '200';
        if( $(window).outerWidth() < 701 ){
          width = '150';
          height = '150';
        }
        $('#shadow').css({
            width: width + 'px',
            height: height + 'px',
            opacity: 1
        });
      });
      var navOffset = $('nav').offset().left;
      var leftOffset = $(this).offset().left;
      var itemWidth = $(this).width();
      var newOffset = (leftOffset - navOffset) + (itemWidth/2);
      //console.log('leftOffset is: ' + newOffset)
      //$('#arrow').css({'margin-left':newOffset+'px'});
      $('#arrow').animate({
        marginLeft: newOffset + 'px',
      });
    });
    $('nav item#about').click();

  });

  $(window).on("load", function() {

    if( $('body').width() > 509 ){
      setHeight();
    }
    contactInfo();
    //trackMouseEffect();

  });

  function trackMouseEffect(){

    var width = $(window).width();
    var height = $(window).height();
    console.log( 'Window: (' + $(window).width() + ', ' + $(window).height() + ')' );

    //left edge: 0
    //right edge: 1073
    //top edge: 0
    //bottom edge: 888

    function getNewTopValue( mouseY ){
      //mouse Y is 10
      //top edge: 0
      //bottom edge: 888

      return null;
    }

    function getNewLeftValue( mouseX ){
      //mouse X is 115
      //left edge: 0
      //right edge: 1073

      return null;
    }

    $('body').mousemove(function( event ) {
      var msg = " ";
      msg += event.pageX + ", " + event.pageY;
      console.log( 'Mouse: (' + event.pageX + ', ' + event.pageY + ')' );
      console.log( 'Window: (' + $(window).width() + ', ' + $(window).height() + ')' );

      //mouse X is 115
      //mouse Y is 10

      var newTop = getNewTopValue( event.pageY );
      var newLeft = getNewLeftValue( event.pageX );

      $('#bg').animate({
        marginTop: newTop + '%',
        marginLeft: newLeft + '%'
      });

    });
  }

  function contactInfo(){
    $('#email').html('<a href="mailto:hello@example.com">hello@example.com</a>');
    $('#phone').html('<a href="tel:6071231234">(607) 323-7376</a>')
  }

  function setHeight(){

    var height = 0;
    var thisHeight = null;
    $('section#content item').each(function(){
        thisHeight = $(this).outerHeight();
        if(thisHeight > height){
            height = thisHeight;
        }
        console.log('height is :' + thisHeight );
        console.log('max height is :' + height );
    });
    if( height < $(window).outerHeight()  ){
      $('section#content item').css({'min-height':height+0});
    }

  }


})(jQuery);
