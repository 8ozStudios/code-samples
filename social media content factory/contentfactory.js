/*
 Content Factory Script
 */

/* Globals */
var fb = [];
fb.status = null;
fb.accessToken = null;
fb.uid = null;

$(document).ready( function(){

    $.ajaxSetup({ cache: true });
    $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
        FB.init({
            appId: '715987105178433',
            version: 'v2.3' // or v2.0, v2.1, v2.0
        });
        FB.getLoginStatus(function(response) {
            fb.status = response.status;
            if (response.status === 'connected') {
                fb.uid = response.authResponse.userID;
                fb.accessToken = response.authResponse.accessToken;
            } else if (response.status === 'not_authorized') {
                //jAlert('You have not accepted our app.');
            } else {
                //jAlert('Please log in to Facebook and try again.')
            }
        });
    });

    $('.share.facebook').click(function(){
        shareOnFacebook();
    });
    $('.share.twitter').click(function(){
        share( 'twitter' );
    });
    $('.share.googleplus').click(function(){
        share( 'googleplus' );
    });
    $('.share.linkedin').click(function(){
        share( 'linkedin' );
    });

    $('span.preview').click(function(){
        var url = $(this).parent('li').data('link');
        window.open( url, "_blank" );
    });

    $('span.shorten').click(function(){
        shorten();
    });

    //

    $( ".box ul li" ).draggable({
        appendTo: "body",
        helper: "clone"
    });
    $( "#share" ).droppable({
        activeClass: "ui-state-default",
        hoverClass: "ui-state-hover",
        tolerance: "pointer",
        drop: function( event, ui ) {
            trace( ui.draggable );
            $('#message').val( ui.draggable.data('title') );
            $('#link').val( ui.draggable.data('link') );
            $('.shorten').show();
            updateWordCount();
        }
    }).keyup(function(){
       updateWordCount();
    });

    $('#link').keyup(function(){
        updateWordCount();
    });
});

function updateWordCount(){
    var count = $('#message').val().length + $('#link').val().length
    $('#characterCount .count').text( count );
    if(count>140){
        $('#characterCount .count').addClass('red');
    }else{
        $('#characterCount .count').removeClass('red');
    }
}

function shareOnFacebook(){
    if(fb.status == 'connected'){
        FB.ui({
            method: 'share',
            href: $('#link').val()
        }, function(response){});
        /*
        FB.login(
            function(){
                if (response.authResponse) {
                    var message = $('#message').val();
                    var link = $('#link').val();
                    FB.api(
                        "/" + fb.uid + "/feed?access_token=" + fb.accessToken,
                        "POST",
                        {
                            "message": message
                        },
                        function (response) {
                            if (response && !response.error) {
                                jAlert('Success!');
                            }
                        }
                    );
                } else {
                    jAlert( 'We were unable to configure posting automatically to Facebook - you will now be sent to Facebook to post manually.' );
                    share( 'facebook' );
                }
            }, {
                scope: 'publish_actions'
            }
        );
        */
    } else {
        share( 'facebook' );
    }
}

function shorten() {
    var link = $('#link').val();
    var accessToken = 'f2ab60ff00e13e6b881ae33319ed83435034c7ec';
    var url = 'https://api-ssl.bitly.com/v3/shorten?access_token=' + accessToken + '&longUrl=' + encodeURIComponent(link);
    $.getJSON(
        url,
        {},
        function(response)
        {
            if(response.status_code == 200){
                $("#link").val(response.data.url);
                updateWordCount();
            } else {
                jAlert( 'Sorry, there was an error shortening the URL.' );
            }
        }
    );
}

function share( target){
    var message = $('#message').val();
    var link = $('#link').val();
    var url = '';
    switch( target ){
        case "facebook":
            url = 'https://www.facebook.com/sharer/sharer.php?u=' + link;
            break;
        case "twitter":
            if($('#characterCount .count').text() > 144){
                jAlert( 'Sorry, your message is longer than Twitter\'s maximum 144 characters, please revise the text.' );
                return;
            }
            url = 'https://twitter.com/home?status=' + message + ' ' + link;
            break;
        case "googleplus":
            url = 'https://plus.google.com/share?url=' + link;
            break;
        case "linkedin":
            url = 'https://www.linkedin.com/shareArticle?mini=true&url=' + link + '&title=' + message + '&summary=&source=' + platformName;
            break;
        default:
            //oops, no target specified
            break;

    }

    window.open( url, "_blank" );
}