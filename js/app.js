jQuery(document).ready(function($) {

	function minNav() {
		var viewportWidth = $(window).width();

		$('#nav_trigger .hamburger').click(function() {
			$('.first_level_menu, .submenu').toggleClass('overlay');
			$('#nav_trigger .hamburger').toggleClass('is-active');
		});


		// resets the desktop styles for topbar navigation
		$(window).resize(function() {
			if (viewportWidth >= 500) {
				$('#primary-nav ul li:not(#site-title)').css('display', 'block');
			}
		});
	}

	function primaryNav() {
		$('.first').click(function(e) {
			e.preventDefault();
			$('.first').not(this).removeClass('expanded');
			$(this).toggleClass('expanded');
		});
	}
	
	minNav();
	primaryNav();

	function toggleInfo() {
		$('.toggler').click(function() {
			$(this).next().toggle();
		});
	}

	toggleInfo();
});