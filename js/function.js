/*!
 *
 * Evgeniy Ivanov - 2018
 * busforward@gmail.com
 * Skype: ivanov_ea
 *
 */

var TempApp = {
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function() { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    touchDevice: function() { return navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i); }
};

function isLgWidth() { return $(window).width() >= TempApp.lgWidth; } // >= 1200
function isMdWidth() { return $(window).width() >= TempApp.mdWidth && $(window).width() < TempApp.lgWidth; } //  >= 992 && < 1200
function isSmWidth() { return $(window).width() >= TempApp.smWidth && $(window).width() < TempApp.mdWidth; } // >= 768 && < 992
function isXsWidth() { return $(window).width() < TempApp.smWidth; } // < 768
function isIOS() { return TempApp.iOS(); } // for iPhone iPad iPod
function isTouch() { return TempApp.touchDevice(); } // for touch device


$(document).ready(function() {

    // Хак для клика по ссылке на iOS
    if (isIOS()) {
        $(function(){$(document).on('touchend', 'a', $.noop)});
    }

	$('[href*="#"]').click(function(event) {
		event.preventDefault();
	});

    $('[data-scroll-to]').click( function(){ 
        var scroll_el = $(this).attr('href'); 
        if ($(scroll_el).length != 0) {
        $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 20 }, 500);
        }
        return false;
    });

    checkOnResize();

    $('.topSlider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false,
        fade: true,
        asNavFor: '.topSlider_thumbs'
    });
    $('.topSlider_thumbs').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.topSlider',
        arrows: false,
        dots: false,
        // centerMode: false,
        focusOnSelect: true
    });

    $('.shopSlider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        // draggable: false,
        arrows: false,
        fade: true,
        asNavFor: '.shopThumbs'
    });
    $('.shopThumbs').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.shopSlider',
        dots: false,
        // centerMode: false,
        focusOnSelect: true
    });
    
    $('.accordeon__item').click(function() {
        if ($(this).next('.accordeon__element').hasClass('active')) {
            $(this).next('.accordeon__element').removeClass('active');
        }
        else {
            $('.accordeon__element').removeClass('active');
            $(this).next('.accordeon__element').addClass('active');
        }
    });
});

$(window).resize(function(event) {
    var windowWidth = $(window).width();
    // Запрещаем выполнение скриптов при смене только высоты вьюпорта (фикс для скролла в IOS и Android >=v.5)
    if (TempApp.resized == windowWidth) { return; }
    TempApp.resized = windowWidth;

	checkOnResize();

});

function checkOnResize() {
   	// gridMatch();
    // fontResize();
    if (isXsWidth()) {
        $('.footer__center').insertBefore('.footer__left');
        $('.shopItem__title').prependTo('.shopItem__top');
        $('.shopItem__sale').prependTo('.shopItem__description');
    } else {
        $('.footer__center').insertAfter('.footer__right');
        $('.shopItem__title').prependTo('.shopItem__info');
        $('.shopItem__sale').prependTo('.shopItem__grid > div:last');
    }
}

function gridMatch() {
   	$('[data-grid-match] .grid__item').matchHeight({
   		byRow: true,
   	});
}

function fontResize() {
    var windowWidth = $(window).width();
    if (windowWidth >= 1200) {
    	var fontSize = windowWidth/19.05;
    } else if (windowWidth < 1200) {
    	var fontSize = 60;
    }
	$('body').css('fontSize', fontSize + '%');
}
