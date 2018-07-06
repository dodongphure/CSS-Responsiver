$(document).ready(function() {
	$('.input').bind('input propertychange', function() {
		convert($('.screenWidth').val(), $(this).val());
	});

	$('.screenWidth').keyup(function() {
		convert($(this).val(), $('.input').val());
	});
})

function convert(screenWidth, input) {
	let ratio = parseInt(screenWidth) / 100;
	$('.output').val(input.replace(/(\d+)px/g, function(match, pixel) {
	    return (parseInt(pixel) / ratio).toFixed(2) + 'vw';
	}));
}