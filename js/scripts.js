$(document).ready(function ( ) {
	$('#burger-container').on('click', function (  ) {
		$(this).toggleClass('open');
		$('.menu-list').toggleClass('menu-open');
		$('.slide').toggleClass('content-blur');
	})
})