<?php
    $now = time();
    $q1start = strtotime($atts['q1start']);
    $q1end = strtotime($atts['q1end']);
    $q2start = strtotime($atts['q2start']);
    $q2end = strtotime($atts['q2end']);
    $q3start = strtotime($atts['q3start']);
    $q3end = strtotime($atts['q3end']);
    $q4start = strtotime($atts['q4start']);
    $q4end = strtotime($atts['q4end']);

    if( $now < $q1end ){
        echo '' . date("F j, Y",$q1start) . ' - ' . date("F j, Y",$q1end) . '<br />';
    } else if( $now < $q2end ){
        echo '' . date("F j, Y",$q2start) . ' - ' . date("F j, Y",$q2end) . '<br />';
    } else if( $now < $q3end ){
        echo '' . date("F j, Y",$q3start) . ' - ' . date("F j, Y",$q3end) . '<br />';
    } else if( $now < $q4end ){
        echo '' . date("F j, Y",$q4start) . ' - ' . date("F j, Y",$q4end) . '<br />';
    } else {
        echo $atts['defaultmessage'];
    }
?>