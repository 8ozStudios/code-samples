/**
 *
 * Script.js
 *
 **/



(function($) {

	$(document).ready(function(){
		


		function stickyNav() {
			var header = document.getElementById("header");
			var sticky = header.offsetTop;
			//console.log('nav: window is ', window.pageYOffset)
			//console.log('nav: sticky is ', sticky)
		  	if (window.pageYOffset > sticky) {
				header.classList.add("fixed");
		  	} else {
				header.classList.remove("fixed");
		  	}
		}
		stickyNav();
		$(window).scroll(function() {
			//console.log('scroll1!');
			stickyNav();
		});
		
		$('button.navbar-toggle').click(function(){
			$('.navbar-collapse').toggleClass('in');
			$(this).toggleClass('active');
		});
		
		if( $('body').hasClass('page-template-page-solutions') ){
		   initSolutionsTabs();
		}
		
		if( $('.testimonials-wrapper ul').length ){
			$('.testimonials-wrapper ul').lightSlider({
				auto: false,
				loop: true,
				item: 1,
				pause: 5000,
				adaptiveHeight: true
			});
		}
		
		if( $('.quotes-slider ul').length ){
			var itemNum = 3;
			if( $(window).width() < 550 ){
				itemNum = 1;
			}
			$('.quotes-slider ul').lightSlider({
				auto: true,
				loop: true,
				item: itemNum,
				pause: 5000,
				adaptiveHeight: true
			});
		}
		
		if( $('section.top-three .top3-sections ul').length ){
			if( $(window).width() < 769 ){
				$('section.top-three .top3-sections ul').lightSlider({
					auto: false,
					loop: false,
					item: 1,
					adaptiveHeight: true
				});
			}
		}
		
		if( $('.process-timeline ul').length ){
			if( $(window).width() < 551 ){
				$('.process-timeline ul').lightSlider({
					auto: false,
					loop: false,
					item: 1,
					adaptiveHeight: true
				});
			}
		}
		
		if( $('.research-sections ul').length ){
			if( $(window).width() < 551 ){
				$('.research-sections ul').lightSlider({
					auto: false,
					loop: false,
					item: 1,
					adaptiveHeight: true
				});
			}
		}
		
		if( $('section.faq').length ){
			$('.title_row').click(function(){
				$parent = $(this).parents('.qa_steps');
				$parent.find('.qa-group').slideToggle();
				$parent.find('.step-toggle').toggleClass('open')
			});
			// $('.step-toggle:not(:first)').click();
			$('.question').click(function(){
				$parent = $(this).parents('.qa-wrapper');
				$parent.find('.answer').slideToggle();
				$parent.find('.answer-preview').toggleClass('fadeout');
				$parent.find('.qa-toggle').toggleClass('open')
			});
			$('.qa-toggle:not(:first)').click();
		}
		
		if( $('section.jobs').length ){
			$('.position').click(function(){
				$parent = $(this).parents('.job-wrapper');
				$parent.find('.job-content').slideToggle();
				$parent.find('.job-toggle').toggleClass('open')
			});
			$('section.operations.jobs .position:not(:first)').click();
			$('section.sales.jobs .position').click();
		}
		
		function standardHeight(elem){
			if( $(elem).length ){
				var height = 0;
				$(elem).each(function(){
					if( $(this).outerHeight() >  height ){
						height = $(this).outerHeight();
					}
				});
				$(elem).css('min-height', height);
			}
		}
		standardHeight('section.how-we-help .row .col-1 .graphic')
		setTimeout(function(){standardHeight('section.how-we-help .row .col-1 .graphic')},1000);
		setTimeout(function(){standardHeight('section.how-we-help .row .col-1 .graphic')},2000);
		
		standardHeight('.industries-sections .col-1 .graphic')
		setTimeout(function(){standardHeight('.industries-sections .col-1 .graphic')},1000);
		setTimeout(function(){standardHeight('.industries-sections .col-1 .graphic')},2000);
		
		standardHeight('#tabs-wrapper .graphic')
		setTimeout(function(){standardHeight('#tabs-wrapper .graphic')},1000);
		setTimeout(function(){standardHeight('#tabs-wrapper .graphic')},2000);


	});
	
	function initSolutionsTabs(){
		
		$('#tabs-wrapper>div').click(function() {
			var step =  $(this).attr('class').replace('tab-','');
			//console.log(step);
			$([document.documentElement, document.body]).animate({
				scrollTop: $('section.step' + step).offset().top - 80
			}, 1000);
		});

		var sticky = $('#tabs-row').offset().top - $('#header').height() + 45;
		function stickyTabs() {			
			var tabs = document.getElementById("tabs-row");
			//console.log('tab: window = ['+window.pageYOffset+'] and sticky = ['+sticky+']');
			if (window.pageYOffset > sticky) {
				tabs.classList.add("fixed");
			} else {
				tabs.classList.remove("fixed");
			}
		}
		stickyTabs();

		$(window).scroll(function() {
			stickyTabs();
		});
		
		function Utils() {}

		Utils.prototype = {
			constructor: Utils,
			isElementInView: function (element, fullyInView) {
				var pageTop = $(window).scrollTop();
				var pageBottom = pageTop + $(window).height();
				var elementTop = $(element).offset().top;
				var elementBottom = elementTop + $(element).height();

				if (fullyInView === true) {
					return ((pageTop < elementTop) && (pageBottom > elementBottom));
				} else {
					return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
				}
			}
		};

		var Utils = new Utils();
		
		$(window).scroll(function() {
		
			var isStep1Active = Utils.isElementInView($('.step1'), false);
			var isStep2Active = Utils.isElementInView($('.step2'), false);
			var isStep3Active = Utils.isElementInView($('.step3'), false);
			if(isStep3Active){
				$('#tabs-wrapper .tab-1').removeClass('active');
				$('#tabs-wrapper .tab-2').removeClass('active');
				$('#tabs-wrapper .tab-3').addClass('active');
			} else if(isStep2Active){
				$('#tabs-wrapper .tab-1').removeClass('active');
				$('#tabs-wrapper .tab-3').removeClass('active');
				$('#tabs-wrapper .tab-2').addClass('active');
			} else if(isStep1Active){
				$('#tabs-wrapper .tab-2').removeClass('active');
				$('#tabs-wrapper .tab-3').removeClass('active');
				$('#tabs-wrapper .tab-1').addClass('active');
			}
		});
		

		
	}

	function trace( msg ){
		if( console ){
			console.log( '[' + msg + ']' );
		}
	}

})(jQuery);