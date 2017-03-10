'use strict';
if (!window.console) window.console = {};
if (!window.console.memory) window.console.memory = function() {};
if (!window.console.debug) window.console.debug = function() {};
if (!window.console.error) window.console.error = function() {};
if (!window.console.info) window.console.info = function() {};
if (!window.console.log) window.console.log = function() {};

// sticky footer
//-----------------------------------------------------------------------------
if (!Modernizr.flexbox) {
    (function() {
        var
            $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            noFlexboxStickyFooter = function() {
                $pageBody.height('auto');
                if ($pageBody.height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageBody.height($(window).height() - $('#header').outerHeight() - $('#footer').outerHeight());
                } else {
                    $pageWrapper.height('auto');
                }
            };
        $(window).on('load resize', noFlexboxStickyFooter);
    })();
}
if (ieDetector.ieVersion == 10 || ieDetector.ieVersion == 11) {
    (function() {
        var
            $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            ieFlexboxFix = function() {
                if ($pageBody.addClass('flex-none').height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageWrapper.height($(window).height());
                    $pageBody.removeClass('flex-none');
                } else {
                    $pageWrapper.height('auto');
                }
            };
        ieFlexboxFix();
        $(window).on('load resize', ieFlexboxFix);
    })();
    svg4everybody();

}

$(function() {

    // placeholder
    //-----------------------------------------------------------------------------
    $('input[placeholder], textarea[placeholder]').placeholder();

    //service slider
    $('.js-slider').slick({
        infinite: true,
        dots: true,
        arrows: false,
    });

    $(document).on('click', '.js-arrows', function(e) {
        e.preventDefault();
        $(this).closest('.js-slider-wrapper').find('.js-slider').slick($(this).attr('data-slider'));
    });

    // photo gallery

    $('.js-gallery').slick({
        infinite: true,
        dots: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
    });

    $(document).on('click', '.js-arrows', function(e) {
        e.preventDefault();
        $(this).closest('.js-slider-wrapper').find('.js-gallery').slick($(this).attr('data-slider'));
    });



    $('.js-height').matchHeight();

    $('.js-show-menu').on('click', function(e) {
        e.preventDefault();

        if ($(this).hasClass('active')) {
            $('.header__menu').slideUp();
        } else {
            $('.header__menu').slideDown();
        }

        $(this).toggleClass('active');

    });

    $('#callback-form').validate({
        rules: {
            name: {
                required: true,
            },
            phone: {
                required: true
            },

        },
        messages: {
            name: {
                required: 'Вы ввели неверные данные. Постарайтесь больше не косячить.',
            },
            phone: {
                required: 'Вы ввели неверные данные. Постарайтесь больше не косячить.'
            },
        }
    });

    $('.js-styler').styler({

    });
    setTimeout(function() {
        $('.jq-selectbox__dropdown ul').mCustomScrollbar();
    }, 100)

    // $('.js-close-pop-up').on('click',function(e){
    //     e.preventDefault();
    //     $.fancybox.close();
    // })
});



var sliderParams = (function() {
    var $sliderCPU = $('.js-params-slider-cpu');
    var $slider = $('.js-params-slider');

    $sliderCPU.each(function() {
        var $this = $(this);
        var $value = parseInt($this.attr('data-value'));
        var $min = parseInt($this.attr('data-min'));
        var $max = parseInt($this.attr('data-max'));
        var $step = parseInt($this.attr('data-step'));
        $this.slider({
            value: $value,
            min: $min,
            max: $max,
            step: $step,
            range: "max",
            create: function(event, ui) {
                setTimeout(function() {
                    changeValCpu($this, $value)
                }, 10)
            },
            slide: function(event, ui) {
                setTimeout(function() {
                    changeValCpu($this, ui.value)
                }, 10)
            }
        });
    })

    $slider.each(function() {
        var $this = $(this);
        var $value = parseInt($this.attr('data-value'));
        var $min = parseInt($this.attr('data-min'));
        var $max = parseInt($this.attr('data-max'));
        var $step = parseInt($this.attr('data-step'));

        var $infomin = $this.attr('data-left-info') ? $this.attr('data-left-info') : $min;
        var $infomax = $this.attr('data-right-info') ? $this.attr('data-right-info') : $max;
        var $infomiddle = $this.attr('data-middle-info') ? $this.attr('data-middle-info') : '';

        $this.slider({
            value: $value,
            min: $min,
            max: $max,
            step: $step,
            range: "max",
            create: function(event, ui) {
                setTimeout(function() {
                    changeVal($this, $value)
                }, 10)

                //создаем посказки на слайдере - инфу наприме от 1 гб , до 16 гб и т.д.
                $this.closest('.testing__params-slider').append('<span class="testing__params-wrapper"></span>')

                $this.closest('.testing__params-slider').find('.testing__params-wrapper').append('<span class="testing__params-left">' + $infomin + '</span><span  class="testing__params-middle">' + $infomiddle + '</span><span class="testing__params-right">' + $infomax + '</span>')
            },
            slide: function(event, ui) {
                setTimeout(function() {
                    changeVal($this, ui.value)
                }, 10)
            }
        });
    });

    function changeValCpu($this, value) {
        var cpuName = '';
        switch (value) {
            case 0:
                cpuName = '1 vCPU 1ГГц'
                break;
            case 1:
                cpuName = '1 vCPU 1.4ГГц'
                break;
            case 2:
                cpuName = '2 vCPU 1.4ГГц'
                break;
            case 3:
                cpuName = '4 vCPU 2ГГц'
                break;
            case 4:
                cpuName = '4 vCPU 2.2ГГц'
                break;
            case 5:
                cpuName = '8 vCPU 2.2ГГц'
                break;
        }
        $this.closest('.testing__tabs-params').find('.testing__params-value span').html(cpuName)
    }

    function changeVal($this, value) {
        $this.closest('.testing__tabs-params').find('.testing__params-value span').html(value)
    }


})();


var searchFn = (function() {
    var $btn = $('.js-show-search');
    var $wrap = $('.header__search-wrap');
    var $close = $('.js-close-search');

    $btn.on('click', function(e) {
        e.preventDefault();

        $wrap.fadeIn(200);
        $wrap.find('.header__search-input').focus();
    });

    $close.on('click', function(e) {
        e.preventDefault();
        $wrap.fadeOut(200, function() {
            $wrap.find('.header__search-input').val('');
        });
    });
})();

var tabsFn = (function() {
    var $btn = $('.js-testing-tab');
    var $tabBody = $('.testing__tabs-body');
    var $tabItem = $('.testing__tabs-item');

    $btn.on('click', function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        $btn.removeClass('active');
        $(this).addClass('active');
        $tabItem.removeClass('active');
        $tabBody.find(target).addClass('active');

    })

})();


var mainTabs = (function() {
    var $btn = $('.js-tab-link');
    var $wrapper = $('.js-tab-wrapper');
    var $tabItem = $('.js-tab-item');

    $btn.on('click', function(e) {
        e.preventDefault();

        console.log(1);
        var $this = $(this);
        var target = $this.attr('href');

        $this.closest($wrapper).find($btn).removeClass('active');
        $this.addClass('active');
        $this.closest($wrapper).find($tabItem).removeClass('active');
        $this.closest($wrapper).find(target).addClass('active');


    });
})();



var mobileDrop = (function() {
    var $btn = $('.js-mobile-drop');

    $btn.on('click', function(e) {
        e.preventDefault();
        $(this).next('.header__drop').slideToggle();
    });
})();

//Maps Fn
var position = []
var mapFn = (function() {
    var $map = $('#map');
    var $changeTown = $('.js-change-town');
    var $townWrap = $('.map__info-wrapper');


    if ($map.length > 0) {
        $('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4iiu69HGNYjeWowMnGtdghML_vNg5M_Y&callback=firstShow"></script>');
    };

    $changeTown.on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            return false;
        }

        $changeTown.removeClass('active');
        $(this).addClass('active');
        var target = $(this).attr('href');

        $townWrap.removeClass('active');
        $(target).addClass('active');

        position = []
        var datalat = $(this).attr('data-lat');
        var datalng = $(this).attr('data-lng');

        position.push(datalat);
        position.push(datalng);


        initMap(position);
    });




})();

function firstShow() {
    var activeTown = $('.js-change-town.active');

    var datalat = activeTown.attr('data-lat');
    var datalng = activeTown.attr('data-lng');

    position.push(datalat);
    position.push(datalng);

    initMap(position);
}

function initMap(position) {
    var townlatlng = position;
    var map;
    var myLatlng = new google.maps.LatLng(townlatlng[0], townlatlng[1]);

    var newLat = townlatlng[1];

    if ($(window).outerWidth() > 767) {
        var changer = parseInt(townlatlng[1].split('.')[1]) - 750;
        var newLat = townlatlng[1].replace(townlatlng[1].split('.')[1], changer)
    }

    map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(townlatlng[0], newLat),
        zoom: 17,
        scrollwheel: false,
    });
    var marker = new google.maps.Marker({
        icon: new google.maps.MarkerImage('images/svg/marker.svg', new google.maps.Size(77, 102)),
        position: myLatlng,
    });
    marker.setMap(map);

    google.maps.event.trigger(map, 'resize');
};


var accardeon = (function() {
    var $btn = $('.js-acc-link');
    var $body = $('.js-acc-body');
    $btn.on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.hasClass('active')) {
            $this.next($body).slideUp();
            $btn.removeClass('active');
        } else {
            $btn.removeClass('active');
            $this.addClass('active');
            $body.slideUp();
            $this.next($body).slideDown();
        }
    })
})();

var inputFn = (function() {
    var input = $('input');
    $(window).on('load',function(){
        input.each(function(){
            if ($(this).val().length > 0) {
                $(this).addClass('focus');
            } else {
                $(this).removeClass('focus');
            }
        })
    })
    $('input').blur(function() {
        if ($(this).val().length > 0) {
            $(this).addClass('focus');
        } else {
            $(this).removeClass('focus');
        }
    })
})();


var photoPreview = (function() {
    var $slider = $('.js-photo-preview-slider');
    var $btns = $('.js-preview-slider-arrows');
    var $list = $('.js-photo-preview');
    var $listItem = $list.find('.photo-preview__link');


    $list.mCustomScrollbar({
        axis: "x",
        contentTouchScroll: 50,
        documentTouchScroll: true
    });

    $slider.on('init', function() {
        for (var i = 0; i < $listItem.length; i++) {
            $listItem.eq(i).attr('data-id-slide', i);
        }

        $listItem.eq(0).addClass('active');
    });

    $slider.slick({
        infinite: false,
        dots: false,
        arrows: false,
    });

    $slider.on('afterChange', function(slick, currentSlide) {
        $listItem.removeClass('active');
        $listItem.eq(currentSlide.currentSlide).addClass('active');
    });

    $(document).on('click', '.js-preview-slider-arrows', function(e) {
        e.preventDefault();
        $(this).closest('.js-slider-wrapper').find('.js-photo-preview-slider').slick($(this).attr('data-slider'));
    });

    $listItem.on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var targetId = parseInt($this.attr('data-id-slide'));
        $listItem.removeClass('active');
        $this.addClass('active');

        // var targetLength = 0;
        // for (var i = 0; i < targetId; i++){
        //     targetLength += $listItem.eq(i).outerWidth()
        // }
        // $list.mCustomScrollbar("scrollTo", targetLength, {
        //     moveDragger: true
        // });
        setPreview(targetId);
    });

    function setPreview(targetId) {
        $slider.slick('slickGoTo', targetId);

    }



})();

var dropdown = (function() {
    var $dropdown = $('.js-header-dropdown');


    $dropdown.on('mouseover', function() {
        var position = $(this).offset().left;
        var parentPos = $(this).closest('.container').offset().left - 35;
        if ($(window).outerWidth() > 767) {

            var rightPosition = $(this).offset().left + $(this).outerWidth();
            var parentPosRight = $(this).closest('.container').offset().left - 35 + $(this).closest('.container').outerWidth();

            if ((position - parentPos) < ($(this).find('.header__drop').outerWidth() / 2)) {
                $(this).find('.header__drop').css({
                    'left': -(position - parentPos - 50),
                    'transform': 'translate(0%, 100%)'
                })
            } else if (($(this).find('.header__drop').outerWidth() / 2) > (parentPosRight - rightPosition + ($(this).outerWidth() / 2))) {
                $(this).find('.header__drop').css({
                    'left': 'auto',
                    'transform': 'translate(0%, 100%)',
                    'right': -(parentPosRight - rightPosition + 50)

                })
            }
        }





    });
    $dropdown.on('mouseout', function() {
        if ($(window).outerWidth() > 767) {
            $('.header__drop').attr('style', '');
        }
    })
})();


var sectionLoad = (function() {
    var dataCenter = $('.data-center');
    $(window).on('scroll load', function() {

        if (dataCenter.length != $('.data-center.visible').length) {
            dataCenter.each(function() {
                if ($(this).offset().top < ($(window).outerHeight() + $(window).scrollTop())) {
                    $(this).addClass('visible');
                }
            });
        };
    });
})();
