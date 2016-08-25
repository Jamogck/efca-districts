	// Animated Presentation
	(function($) {
	var pathToModule = '/sites/all/modules/custom/explore_presentations/';
	
	var $p = {
		self   : $('.presentation'),
		window : $('.presentation .window'),
		slides : $('.presentation .pslide'),
		illos  : $('.presentation .pslide .illo span'),
		offset : 0,
		count  : $('.presentation .pslide').length,
		
		navtrigger : $('.presentation .pnav .pnav-trigger'),
		titleswrap : $('.presentation .pnav .slidetitles'),
		navlink    : $('.presentation .pnav li span')
	},
	settings = {
		duration : 750,
		semaphore : 1
	},
	methods = {
		show : function($toShow) {
			if(Modernizr.csstransitions) $toShow.addClass('showing');
				else $toShow.css({top:$p.window.height()}).addClass('showing').animate({top:0}, settings.duration);
			setTimeout(function() {
				$toShow.addClass('animating');
			}, settings.duration);
			methods.loadBG($toShow);
		},
		hide : function($toHide) {
			$toHide.addClass('move-back');
			setTimeout(function() {
				$toHide
					.removeClass('animating')
					.removeClass('showing')
					.removeClass('move-back');
				if(!Modernizr.csstransitions) $toHide.css({top:''});
			}, settings.duration);
		},
		loadBG : function($element) {
			var src = $element.attr('data-bg'),
				$img = $('<img />');
			if(typeof(src) !== 'undefined' && src.length > 0) {
				$img
					.addClass('bg')
					.attr('src', pathToModule + 'css/' + src)
					.css({display:'none'})
					.prependTo($element);
				$element
					.removeAttr('data-bg')
					.waitForImages(function() {
						setTimeout(function() {
							$img.fadeIn();
						}, 500);
					});
			}
		},
		shownav : function() {
			$p.self.addClass('shownav');
			$('html').addClass('fade-page');
		},
		hidenav : function() {
			if($p.slides.eq(0).hasClass('showing') && !$p.slides.eq(0).hasClass('move-back')) {
				$p.self.removeClass('shownav');
			}
			$('html').removeClass('fade-page');
		},
		lock : function() {
			settings.semaphore = 0;
		},
		unlock : function() {
			settings.semaphore = 1;
		}
	};
	
	// click to advance slides
	$p.slides
		.click(function(e, source) {
			if(typeof(source) === 'undefined') source = 'slide';
			e.preventDefault();
			methods.shownav();
			if(settings.semaphore) {
				var $toHide = $p.slides.filter('.showing'),
					$toShow = $p.slides.eq(($(this).index() + 1) % $p.count),
					redirect = $toHide.attr('data-redirect');
				
				if(typeof(redirect) !== 'undefined' && source == 'slide') {
					window.location = redirect;
				} else {
					methods.lock();
					if($p.self.hasClass('expandnav')) {
						$p.self.removeClass('expandnav');	
					}
					methods.hide($toHide);
					methods.show($toShow);
					$p.titleswrap
						.find('.active').removeClass('active').end()
						.find('li').eq($toShow.index()).addClass('active');
					setTimeout(function() {
						methods.unlock();
					}, settings.duration);
				}
			}
		})
		.find('a').click(function(e) {
			e.stopPropagation();
		});
	
	// click navtrigger to expand/collapse nav
	$p.navtrigger
		.click(function(e) {
			e.preventDefault();
			$p.self.toggleClass('expandnav');
		});
		
		$p.titleswrap.click(function(e) {
			if(!$p.self.hasClass('expandnav')) {
				$p.self.addClass('expandnav');
			}
		});
	
	// click link in nav to jump to slide
	$p.navlink
		.click(function(e) {
			e.preventDefault();
			var $li = $(this).parent('li');
			if($p.self.hasClass('expandnav')) {
				e.stopPropagation();
				if(!$li.hasClass('active')) $p.slides.eq($li.index() - 1).trigger('click', 'navlink');
					else $p.self.removeClass('expandnav');
			}
		});
	
	// lazyload illos sprite
/*
	var spritePath = $p.self.attr('data-preload-sprite');
	if(typeof(spritePath) !== 'undefined') {
		var $sprite = $('<img class="sprite--loading" src="' + pathToModule + 'css/i/' + spritePath + '" />');
		$sprite.hide();
		$p.illos.hide();
		$p.self
			.append($sprite)
			.waitForImages(function() {
				$(this).addClass('sprite-loaded');
				$p.illos.show();
				$sprite.remove();
			});
	} else {
		$p.self.addClass('no-preload');
	}
*/
	$p.self.addClass('no-preload');
	
	$p.self
		// activate hover
		.hover(function() {
			methods.shownav();
		}, function() {
			methods.hidenav();	
		});
	
	
})(jQuery);