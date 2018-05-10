$( document ).ready( function () {

	$( '#burger-container' ).on( 'click', function () {
		$( this ).toggleClass( 'open' );
		$( '.menu-list' ).toggleClass( 'menu-open' );
		$( '.slide' ).toggleClass( 'content-blur' );
	} )

	$( '.next' ).on( 'click', function nextImageFunc() {
		var currentImage      = $( '.img.curry' );
		var currentImageIndex = $( '.img.curry' ).index();
		var nextImageIndex    = currentImageIndex + 1;
		var nextImage         = $( '.img' ).eq( nextImageIndex );
		currentImage.fadeOut( 3000 );
		currentImage.removeClass( 'curry' );

		if ( nextImageIndex == ($( '.img:last' ).index() + 1) ) {
			$( '.img' ).eq( 0 ).fadeIn( 3000 );
			$( '.img' ).eq( 0 ).addClass( 'curry' );
		} else {
			nextImage.fadeIn( 3000 );
			nextImage.addClass( 'curry' );
		}
	} );


	$( '.prev' ).on( 'click', function () {
		var currentImage      = $( '.img.curry' );
		var currentImageIndex = $( '.img.curry' ).index();
		var prevImageIndex    = currentImageIndex - 1;
		var prevImage         = $( '.img' ).eq( prevImageIndex );

		currentImage.fadeOut( 3000 );
		currentImage.removeClass( 'curry' );
		prevImage.fadeIn( 3000 );
		prevImage.addClass( 'curry' );
	} );


	// Params
	let mainSliderSelector = '.main-slider',
		navSliderSelector = '.nav-slider',
		interleaveOffset = 0.5;

// Main Slider
	let mainSliderOptions = {
		loop: true,
		speed:1000,
		autoplay:{
			delay:3000
		},
		loopAdditionalSlides: 10,
		grabCursor: true,
		watchSlidesProgress: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		on: {
			init: function(){
				this.autoplay.stop();
			},
			imagesReady: function(){
				this.el.classList.remove('loading');
				this.autoplay.start();
			},
			slideChangeTransitionEnd: function(){
				let swiper = this,
					captions = swiper.el.querySelectorAll('.caption');
				for (let i = 0; i < captions.length; ++i) {
					captions[i].classList.remove('show');
				}
				swiper.slides[swiper.activeIndex].querySelector('.caption').classList.add('show');
			},
			progress: function(){
				let swiper = this;
				for (let i = 0; i < swiper.slides.length; i++) {
					let slideProgress = swiper.slides[i].progress,
						innerOffset = swiper.width * interleaveOffset,
						innerTranslate = slideProgress * innerOffset;
					swiper.slides[i].querySelector(".slide-bgimg").style.transform =
						"translate3d(" + innerTranslate + "px, 0, 0)";
				}
			},
			touchStart: function() {
				let swiper = this;
				for (let i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = "";
				}
			},
			setTransition: function(speed) {
				let swiper = this;
				for (let i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = speed + "ms";
					swiper.slides[i].querySelector(".slide-bgimg").style.transition =
						speed + "ms";
				}
			}
		}
	};
	let mainSlider = new Swiper(mainSliderSelector, mainSliderOptions);

// Navigation Slider
	let navSliderOptions = {
		loop: true,
		loopAdditionalSlides: 10,
		speed:1000,
		spaceBetween: 5,
		slidesPerView: 5,
		centeredSlides : true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		direction: 'vertical',
		on: {
			imagesReady: function(){
				this.el.classList.remove('loading');
			},
			click: function(){
				mainSlider.autoplay.stop();
			}
		}
	};
	let navSlider = new Swiper(navSliderSelector, navSliderOptions);

// Matching sliders
	mainSlider.controller.control = navSlider;
	navSlider.controller.control = mainSlider;

} );



