var _mode = "1";

$(document).ready(function() {
	$('.mode').on('change', function() {
		_mode = this.value;
	 	runMode();
	});

	$('.input').bind('input propertychange', function() {
		runMode();
	});

	$('.screenWidth').keyup(function() {
		runMode();
	});

	$('.scaleRatio').keyup(function() {
		runMode();
	});

	handleScrolling();

	$('.mode1').addClass('contents');
})

function runMode() {
	switch(_mode) {
		case "1":
			$('.mode1').addClass('contents');
			$('.mode2').removeClass('contents');
			convertPixelToViewwidth();
			break;

		case "2":
			$('.mode1').removeClass('contents');
			$('.mode2').addClass('contents');
			scaling();
			break;

		default:
			break;
	}
}

function convertPixelToViewwidth() {
	let ratio = parseInt($('.screenWidth').val()) / 100;
	$('.output').val($('.input').val().replace(/((\d+.)?\d+)(px|rem)/g, function(match, pixel) {
	    return (parseFloat(pixel) / ratio).toFixed(2) + 'vw';
	}));
}

function scaling() {
	$('.output').val($('.input').val().replace(/((((\d+.)?\d+)(px|rem))+|(((\d+.)?\d+)vw)+)/g, function(match, pixel) {
	    return (parseFloat(pixel) * parseFloat($('.scaleRatio').val())).toFixed(getNumberOfDecimals(parseFloat(pixel))) +
	    	match.replace(/((\d+.)?\d+)/, '');
	}));
}

function getNumberOfDecimals(number) {
	return (number.toString().split('.')[1] || []).length;
}

function handleScrolling() {
	$(".input, .output").mouseenter(function(){
		$(this).addClass('mouseenter');
	});

	$(".input, .output").mouseleave(function(){
		$(this).removeClass('mouseenter');
	});

	$('.input').on('scroll', function() {
		if($(this).hasClass('mouseenter')) {
			$('.output').scrollTop(this.scrollTop);
		}
	});

	$('.output').on('scroll', function() {
		if($(this).hasClass('mouseenter')) {
			$('.input').scrollTop(this.scrollTop);
		}
	});
}