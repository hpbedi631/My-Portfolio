$(window).on('load', function() {
	// icon fade out first
	$('.loader .inner').fadeOut(500, function() {
		// then the background fade out
		$('.loader').fadeOut(750);
	});

	// call this when the page load
	$('.items').isotope({
		filter: '*',
		animationOptions: {
			duration: 1500,
			easing: 'linear',
			queue: false
		}
	});
});

$(document).ready(function() {
	$('#slides').superslides({
		animation: 'fade',
		play: 6000,
		pagination: false
	});

	// switching words animation
	var typed = new Typed('.typed', {
		strings: [ 'Student.', 'Gamer.', 'Web Developer.' ],
		typeSpeed: 75,
		loop: true,
		startDelay: 500,
		showCursor: false
	});

	$('.owl-carousel').owlCarousel({
		loop: true,
		items: 4,
		responsive: {
			0: {
				items: 1
			},
			480: {
				items: 2
			},
			768: {
				items: 3
			},
			938: {
				items: 4
			}
		}
	});

	// Activating the charts on scroll
	var skillsTopOffset = $('.skillSection').offset().top;
	var statsTopOffset = $('.statsSection').offset().top;
	var countUpFinished = false;

	$(window).scroll(function() {
		// Check if the skillsTopOffSet is in the view or not, and whether to call the easyPieChart or not
		// wait 300px to activate
		if (window.pageYOffset > skillsTopOffset - $(window).height() + 300) {
			$('.chart').easyPieChart({
				easing: 'easeInOut',
				barColor: '#fff',
				trackColor: false,
				scaleColor: false,
				lineWidth: 4,
				size: 150
			});
		}
		// Check if the view reaches the stats
		if (!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 255) {
			// stats countup
			$('.counter').each(function() {
				var element = $(this);
				var endVal = parseInt(element.text());
				element.countup(endVal);
			});
			countUpFinished = true;
		}
	});

	$('[data-fancybox]').fancybox();

	// select a tag under the id: filters
	$('#filters a').click(function() {
		$('#filter .current').removeClass('current');
		// 'this' refers to the current button we clicked on
		$(this).addClass('current');

		var selector = $(this).attr('data-filter');
		// call this again when we click on the element
		$('.items').isotope({
			filter: selector,
			animationOptions: {
				duration: 1500,
				easing: 'linear',
				queue: false
			}
		});
		// stop do anything
		return false;
	});

	// smooth navigation
	$('#navigation li a').click(function(elem) {
		elem.preventDefault();

		var targetElement = $(this).attr('href');
		// creating a jquery object
		var targetPosition = $(targetElement).offset().top;
		$('html, body').animate({ scrollTop: targetPosition - 50 }, 'slow');
	});

	// sticking navbar
	const nav = $('#navigation');
	const navTop = nav.offset().top;

	$(window).on('scroll', stickyNavigation);
	function stickyNavigation() {
		var body = $('body');
		if ($(window).scrollTop() >= navTop) {
			// adjust the height
			body.css('padding-top', nav.outerHeight() + 'px');
			// if pass the top position, apply this class
			body.addClass('fixedNav');
		} else {
			// remove the padding first
			body.css('padding-top', 0);
			body.removeClass('fixedNav');
		}
	}
});
