/*
 * Javascript for public-facing site
 */

var $ = jQuery;

$(document).ready(function($) {

    $('body').append('<div id="loading" style="display:none;"></div>');

    if($("body").hasClass("home")){
        initHome();
    }else if( $("body").hasClass("single-property")){
        initSingleProperty();
    }else if(typeof pageId !== 'undefined'){
        if(pageId == 'propertySearch'){
            initPropertySearch();
            if( document.URL.indexOf('savesearch=true') > -1 ){
                $('#saveSearchButton').click();
            }
        }
    }else if($('body').hasClass('page-id-28612')){
        initIntake();
    }
    if( $('form.property-search').length ){
        $('form.property-search input,form.property-search select').keypress(function(e) {
            if (e.which == 13) {
                submitSearch();
                e.preventDefault();
                return false;
            }
        });
    }
});

// trace - for debugging

function trace( string ){
    if(console){
        console.log( string );
    }
}

// initHome - Initializing the homepage

function initHome(){
    if( $('body').width() > 500 ){
        initMap();
    }else{
        $('#interactiveMap,#or').hide();
    }
    $.get("http://ipinfo.io", function(response) {
        if(response.postal.length){
            $('#interactiveMap p b').text(response.postal);
            $('#interactiveMap p a').attr( 'href', '/property-search/?filter_zipcode='+response.postal);
            $('#interactiveMap p').show();
        }else{
            $('#interactiveMap p').hide();
        }
    }, "jsonp");

        //after a delay, show pop up
    setTimeout(showPopUp, 3000);

    function showPopUp(){
        $('#popUp').fadeIn(function(){
            $('#popUp').click(function(){
                $(this).toggleClass('open');
            });
        });
    }

}

// initMap - Initializing the map

function initMap(){
    var map = new Datamap({
        scope: 'usa',
        responsive: true,
        element: document.getElementById('map'),
        fills: {
            defaultFill: '#102C3C' //any hex, color name or rgb/rgba value
        },
        geographyConfig: {
            highlightBorderColor: '#84979D',
            highlightFillColor: '#84979D',
            popupTemplate: function(geography, data) {
                var str = '<div class="hoverinfo">' + geography.properties.name;
                str += (data.results > 0) ? ' (' +  data.results + ')' : ' - No Properties';
                str += '</div>';
                return str;
            },
            highlightBorderWidth: 1
        },
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                window.location = '/property-search/?filter_state='+geography.properties.name.toLowerCase();
            });
        },
        data:{
            "AZ": {
                "results": (stateCount.Arizona) ? stateCount.Arizona : 0
            },
            "CO": {
                "results": (stateCount.Colorado) ? stateCount.Colorado : 0
            },
            "DE": {
                "results": (stateCount.Delaware) ? stateCount.Delaware : 0
            },
            "FL": {
                "results": (stateCount.Florida) ? stateCount.Florida : 0
            },
            "GA": {
                "results": (stateCount.Georgia) ? stateCount.Georgia : 0
            },
            "HI": {
                "results": (stateCount.Hawaii) ? stateCount.Hawaii : 0
            },
            "ID": {
                "results": (stateCount.Idaho) ? stateCount.Idaho : 0
            },
            "IL": {
                "results": (stateCount.Illinois) ? stateCount.Illinois : 0
            },
            "IN": {
                "results": (stateCount.Indiana) ? stateCount.Indiana : 0
            },
            "IA": {
                "results": (stateCount.Iowa) ? stateCount.Iowa : 0
            },
            "KS": {
                "results": (stateCount.Kansas) ? stateCount.Kansas : 0
            },
            "KY": {
                "results": (stateCount.Kentucky) ? stateCount.Kentucky : 0
            },
            "LA": {
                "results": (stateCount.Louisiana) ? stateCount.Louisiana : 0
            },
            "MD": {
                "results": (stateCount.Maryland) ? stateCount.Maryland : 0
            },
            "ME": {
                "results": (stateCount.Maine) ? stateCount.Maine : 0
            },
            "MA": {
                "results": (stateCount.Massachusetts) ? stateCount.Massachusetts : 0
            },
            "MN": {
                "results": (stateCount.Minnesota) ? stateCount.Minnesota : 0
            },
            "MI": {
                "results": (stateCount.Michigan) ? stateCount.Michigan : 0
            },
            "MS": {
                "results": (stateCount.Mississippi) ? stateCount.Mississippi : 0
            },
            "MO": {
                "results": (stateCount.Missouri) ? stateCount.Missouri : 0
            },
            "MT": {
                "results": (stateCount.Montana) ? stateCount.Montana : 0
            },
            "NC": {
                "results": (stateCount.NorthCarolina) ? stateCount.NorthCarolina : 0
            },
            "NE": {
                "results": (stateCount.Nebraska) ? stateCount.Nebraska : 0
            },
            "NV": {
                "results": (stateCount.Nevada) ? stateCount.Nevada : 0
            },
            "NH": {
                "results": (stateCount.NewHampshire) ? stateCount.NewHampshire : 0
            },
            "NJ": {
                "results": (stateCount.NewJersey) ? stateCount.NewJersey : 0
            },
            "NY": {
                "results": (stateCount.NewYork) ? stateCount.NewYork : 0
            },
            "ND": {
                "results": (stateCount.NorthDakota) ? stateCount.NorthDakota : 0
            },
            "NM": {
                "results": (stateCount.NewMexico) ? stateCount.NewMexico : 0
            },
            "OH": {
                "results": (stateCount.Ohio) ? stateCount.Ohio : 0
            },
            "OK": {
                "results": (stateCount.Oklahoma) ? stateCount.Oklahoma : 0
            },
            "OR": {
                "results": (stateCount.Oregon) ? stateCount.Oregon : 0
            },
            "PA": {
                "results": (stateCount.Pennsylvania) ? stateCount.Pennsylvania : 0
            },
            "RI": {
                "results": (stateCount.RhodeIsland) ? stateCount.RhodeIsland : 0
            },
            "SC": {
                "results": (stateCount.SouthCarolina) ? stateCount.SouthCarolina : 0
            },
            "SD": {
                "results": (stateCount.SouthDakota) ? stateCount.SouthDakota : 0
            },
            "TN": {
                "results": (stateCount.Tennessee) ? stateCount.Tennessee : 0
            },
            "TX": {
                "results": (stateCount.Texas) ? stateCount.Texas : 0
            },
            "UT": {
                "results": (stateCount.Utah) ? stateCount.Utah : 0
            },
            "WI": {
                "results": (stateCount.Wisconsin) ? stateCount.Wisconsin : 0
            },
            "VA": {
                "results": (stateCount.Virginia) ? stateCount.Virginia : 0
            },
            "VT": {
                "results": (stateCount.Vermont) ? stateCount.Vermont : 0
            },
            "WA": {
                "results": (stateCount.Washington) ? stateCount.Washington : 0
            },
            "WV": {
                "results": (stateCount.WestVirginia) ? stateCount.WestVirginia : 0
            },
            "WY": {
                "results": (stateCount.Wyoming) ? stateCount.Wyoming : 0
            },
            "CA": {
                "results": (stateCount.California) ? stateCount.California : 0
            },
            "CT": {
                "results": (stateCount.Connecticut) ? stateCount.Connecticut : 0
            },
            "AK": {
                "results": (stateCount.Alaska) ? stateCount.Alaska : 0
            },
            "AR": {
                "results": (stateCount.Arkansas) ? stateCount.Arkansas : 0
            },
            "AL": {
                "results": (stateCount.Alabama) ? stateCount.Alabama : 0
            }
        }
    });
}

// initPropertySearch - initializing the property search process

function initPropertySearch(){
    if(getParameterByName('filter_bathrooms')){
        $('.filter_bathrooms').val(getParameterByName('filter_bathrooms'));
    }
    if(getParameterByName('filter_bedrooms')){
        $('.filter_bedrooms').val(getParameterByName('filter_bedrooms'));
    }
    if(getParameterByName('filter_type')){
        $('.filter_type').val(getParameterByName('filter_type'));
    }
    if(getParameterByName('filter_price_from')){
        $('.filter_price_from').val(getParameterByName('filter_price_from'));
    }
    if(getParameterByName('filter_price_to')){
        $('.filter_price_to').val(getParameterByName('filter_price_to'));
    }

    if(getParameterByName('filter_lat')){
        $('.filter_lat').val(getParameterByName('filter_lat'));
    }
    if(getParameterByName('filter_long')){
        $('.filter_long').val(getParameterByName('filter_long'));
    }
    if(getParameterByName('filter_address')){
        var location = getParameterByName('filter_address');
        $('.filter_address').val( toTitleCase( location ) );
    }else{
        var str = '';
        if(getParameterByName('filter_city')){
            str += toTitleCase(getParameterByName('filter_city'));
        }
        if(getParameterByName('filter_state')){
            str += (str.length) ? ', ' : '';
            str += toTitleCase(getParameterByName('filter_state'));
        }
        if(getParameterByName('filter_zipcode')){
            str += (str.length) ? ', ' : '';
            str += getParameterByName('filter_zipcode');
        }
        $('.filter_address').val( str );
    }
    $('.chzn-done').trigger("liszt:updated");
    initResultsMap();
}

// toTitleCode - subfunction to set string to title case

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

// initResultsMap - initializing the map on the results page

function initResultsMap() {
    if(markers.length<1){
        $('#map_wrapper').hide();
        return;
    }
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map
    for( i = 0; i < markers.length; i++ ) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0],
            icon: '/wp-content/themes/realia-child/images/marker-'+markers[i][3]+'.png'
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
        //this.setZoom(14);
        google.maps.event.removeListener(boundsListener);
    });

}

// initSingleProperty - initializing the single property detail page

function initSingleProperty(){
    var minVar = 2;
    var maxVar = 3;
    if($('body').width()<500){
        minVar = 1;
        maxVar = 1;
    }
    $('.bxslider').bxSlider({
        //pagerCustom: '#bx-pager',
        adaptiveHeight: true,
        minSlides: minVar,
        maxSlides: maxVar,
        slideWidth: 400,
        slideMargin: 10
    });
}

/*
function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
    'callback=initialize';
    document.body.appendChild(script);
}
window.onload = loadScript;
*/

// submitSearch - geocode address string and submit to search results page

function submitSearch() {
    $('#loading').fadeIn();
    geocoder = new google.maps.Geocoder(); // initialize
    var address = $('input[name="filter_address"]').val();//'1301 central ave, highland park, nj';
    var fullAddress;
    var city;
    var state;
    var zip;
    var lat;
    var long;
    geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            $( results[0].address_components ).each(function(){
                if(this.types[0] == 'locality'){
                    city = this.long_name;
                }else if(this.types[0] == 'administrative_area_level_1'){
                    state = this.long_name;
                }else if(this.types[0] == 'postal_code'){
                    zip = this.long_name;
                }
            });
            fullAddress = results[0].formatted_address;
            lat = results[0].geometry.location.k;
            long = results[0].geometry.location.B;
            $('#filter_address').val( fullAddress );
            $('#filter_city').val( city );
            $('#filter_state').val( state );
            $('#filter_zipcode').val( zip );
            $('#filter_lat').val( lat );
            $('#filter_long').val( long );
            $('#loading').fadeOut();
        } else {
            $('#loading').fadeOut();
            //alert('Geocode was not successful for the following reason: ' + status);
        }
        window.location = '/property-search/?' + $('form.property-search').serialize();
    });
}

// convertStateName - subroutine to convert state abbreviation to full name

function convertStateName( target, lowercase, allowSpaces ){
    var StateNamesFromAbbreviations =
    {
        "AL": "Alabama",
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arkansas",
        "CA": "California",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "DC": "District of Columbia",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucky",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Maryland",
        "MA": "Massachusetts",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Missouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hamspire",
        "NJ": "New Jersey",
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklahoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
    };
    var stateName = StateNamesFromAbbreviations[target.toUpperCase()];
    var returnString = stateName;
    if(lowercase){
        returnString = stateName.toLowerCase();
    }
    if(!allowSpaces){
        returnString = stateName.replace(/ /g,'-');
    }
    return returnString;
}

// getParameterByName - subroutine to get parameter value from the URL by key

function getParameterByName(name) {
    name = name.replace(/[[]/, "[").replace(/[]]/, "]");
    var regex = new RegExp("[?&]" + name + "=([^&#]*)"),
        results = regex.exec(document.URL);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// initIntake - initalizie the intake form

function initIntake(){
        // move the ajax search form into the middle of the Presspoint form
    function initIntakeReady(){
        //trace('moving.');
            // move search form into the middle of the presspoint form
        $('#post-28612').addClass('loaded');
        $('#_pp_form_227087f2b576a995a14fc8c609a6a3f6,#propertySearch').show();
        var searchHtml = $('#propertySearch')[0].outerHTML;
        $('#propertySearch').remove();
        $('#_pp_form_227087f2b576a995a14fc8c609a6a3f6').find('form ul.paupress li').eq(0).after(searchHtml);
            // remove chosen from these fields
        $('#propertySearch .chzn-container').remove();
        $('#propertySearch .chzn-done').show().removeClass('chzn-done');
            // submit search form onchange
        $('#propertySearch form input,#propertySearch form select').change(function(){ajaxSearch()});
            // set call date to today if its empty
        var callDate = $('#2be97cdcd661912b291cda83b7e456fb');
        if( callDate.val() == '' ){ // new form
            var d = new Date();
            var prettyDate =(d.getMonth()+1) + '/' + d.getDate() + '/' + d.getFullYear();
            callDate.val(prettyDate);
        }
            // set specialist field to current user's name
        if(currentUser){
            $('input#8ad42c83bf114494599584cefd51732d').val( currentUser.first + ' ' + currentUser.last + ' (ID: ' + currentUser.id + ')' );
                // the CRM is autopopulating the current users email into this field
            if( $('#email').val() == currentUser.email ){
                $('#email').val('');
            }
        }

            // check evaluation after any required checkboxes are checked. Must be on a delay because the click happens on an <a> element, the click event is fired, and then the box is checked.
        $('a[title="b319453d587b280fcf24755dd2462c32"],a[title="d092de9d99babe3f869e6089d116b424"],a[title="e8a4656d2cebeb61908e29449ac8254b"],a[title="3f79552238b07894f00e6de9117ce1a9"],a[title="f3c458491c8f03e6e51d820e727e16ef"],a[title="7e1222419c80dcbbd8adb52899c741bf"]').click(function(){
            setTimeout(function(){ console.log( evaluateQualification() ) }, 100);
        });
    }
        // next to wait until Presspoint form is ready before moving
    function isFormReady(){
        //trace('checking...');
        if ($('#_pp_form_227087f2b576a995a14fc8c609a6a3f6 form ul.paupress li').length > 0) {
            //trace('found.');
            initIntakeReady();
            myStopFunction();
        }
    }
        // found it, stop checking
    function myStopFunction() {
        //trace('cancel.');
        clearInterval(checkForForm);
    }

    var checkForForm = setInterval(function(){ isFormReady() }, 500);
}

// ajaxSearch - submit a property search and get results by ajax

function ajaxSearch(){
    var parameters = $('#propertySearch form').serialize();
    $('#results table tbody tr').remove();
    $('#loading').show();
    $.get( "/property-search/?"+parameters, function( data ) {
        $('#loading').hide();
        var results = JSON.parse(data);
        //trace( 'results is [' + JSON.stringify(results) + ']' );
        var row = '';
        var i = 0;
        $(results).each(function(){
            row = '';
            row += '<tr data-id="' + results[i]['ID'] + '" data-address="' + results[i]['meta']['address1'] + '" data-city="' + results[i]['meta']['city'] + '" data-state="' + results[i]['meta']['state'] + '" data-zip="' + results[i]['meta']['zipcode'] + '" data-bedrooms="' + results[i]['meta']['_property_bedrooms'] + '" data-bathrooms="' + results[i]['meta']['_property_bathrooms'] + '">';
            row += '<td>' + results[i]['ID'] + '</td>';
            row += '<td>' + results[i]['meta']['_property_location_search'] + '</td>';
            row += '<td>' + results[i]['meta']['_property_bedrooms'] + '</td>';
            row += '<td>' + results[i]['meta']['_property_bathrooms'] + '</td>';
            row += '<td>' + results[i]['meta']['_property_area'] + ' sqft</td>';
            row += '<td>$' + numberWithCommas(results[i]['meta']['_property_price']) + '</td>';
            row += '<td><input type="button" value="Select" class="selectProperty" data-id="' + results[i]['ID'] + '" /></td>';
            row += '</tr>';
            $('#results table tbody').append(row);
            i++;
        });
        if(i == 0){
            $('#results table tbody').append('<tr><td colspan="7" align="center"><br /><br /><em>Sorry, no properties match your search.</em></td></tr>');
        } else {
            $('.selectProperty').click(function(){
                selectProperty( $(this).data('id') );
            });
        }
    });
}

// clearResults - clear results from the page

function clearResults(){
    $('#results table tbody tr').remove();
}

// numberWithCommas - subroutine to format number string

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// selectProperty - select a property

function selectProperty( id ){
    $('tr.selected').removeClass('selected');
    var element = $('tr[data-id="' + id + '"]');
    $('input#f2282751429c3ecd45e2cdf6f7d344ec').val( element.data('address') );
    $('input#7a12aabeebae187ee7625403c8eb8f7e').val( element.data('city') );
    $('input#dc1f0518e1e1a44bd9902030045d096e').val( element.data('state') );
    $('input#5998bff8e0630d98f348ac23b72522e4').val( element.data('zip') );
    element.closest('tr').addClass('selected');
}

// evaluateQualification - validate the intake form

function evaluateQualification(){
    var inquiryOnly = $('#b319453d587b280fcf24755dd2462c32').val();
    var renting = $('#d092de9d99babe3f869e6089d116b424').val();
    var income = $('#e8a4656d2cebeb61908e29449ac8254b').val();
    var employed = $('#3f79552238b07894f00e6de9117ce1a9').val();
    var legal = $('#f3c458491c8f03e6e51d820e727e16ef').val();
    var downpayment = $('#7e1222419c80dcbbd8adb52899c741bf').val();
    var result = '';
    var reason = '';
    if( inquiryOnly  == 'true' ){
        console.log('1');
        result = 'Inquiry Only';
        reason = '';
    } else if( renting == 'true' && income == 'true' && employed == 'true' && legal == 'true' && downpayment == 'true' ){
        result = 'Pass';
        reason = 'Qualifications Met';
        console.log('2');
    } else {
        console.log('3');
        if( renting != 'true' ){
            result = 'Fail';
            reason += 'Rental Requirement. ';
        }
        if( income != 'true' ){
            result = 'Fail';
            reason += 'Income Requirement. ';
        }
        if( employed != 'true' ){
            result = 'Fail';
            reason += 'Employment Requirement. ';
        }
        if( legal != 'true' ){
            result = 'Fail';
            reason += 'Legal Requirement. ';
        }
        if( downpayment != 'true' ){
            result = 'Fail';
            reason += 'Down Payment Requirement. ';
        }
    }
    if(result){
        $('#b06de68713dda6849bb31319c9d8b4c6').val( result ).removeClass('pass').removeClass('fail').addClass( result.toLowerCase() );
    }
    if(reason){
        $('#187b60cb7b0caf1009ce351aff278348').val( reason );
    }
}
