$(window).on('load', function(event) {
    var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;

    if (loadTime >= 500) {

        LoadBar(loadTime)

        setTimeout(function() {
            $('.loading').css({
                'opacity': '0',
                'visibility': 'hidden'
            });
        }, loadTime);

    } else {
        LoadBar(500)

        setTimeout(function() {
            $('.loading').css({
                'opacity': '0',
                'visibility': 'hidden',
                'transform': 'translateY(-100%) scale(.5)'
            });
        }, 500);
    }

    function LoadBar(time) {
        $('.load_bar').find('span').animate({
            'width': '250px'
        }, time);
    }
});


(function($) {

    var x =  $(window).width();

    if(x >= 1024) {
        enableSmoothScroll(.5, 100);
        smoothScroll(.5, 100);
    }

    $(document).ready(function() {
        var $vH = $(window).outerHeight();

        setTimeout(function() {
            new WOW().init();
        }, 600);

        smoothClickScroll(500);

        $('.header_icon').on('click', function(event) {
            /* Act on the event */
            var $this = $(this);

            $('body').animate({
                scrollTop: 0},
                300, function() {
                $this.toggleClass('toggle');
                $('.header_top').toggleClass('show');
            });
            playAdio()
        });

        $('.header_btn').on('click', 'a', function(event) {
            event.preventDefault();
            /* Act on the event */

            $('.wrap_inner').toggleClass('showContact');
            playAdio()
        });

        $('.btnBack').on('click', function(event) {
            event.preventDefault();
            /* Act on the event */
            $('.wrap_inner').removeClass('showContact');
            playAdio()
        });


        $('.works > .work').each(function(index, el) {
            var $this = $(this),
                $h = ($this.find('.mockup').outerHeight()) / 2;

            $(window).scroll(function() {
                var x = $(window).scrollTop();

                $('.works .work').each(function(index, el) {
                    var $this = $(this),
                        $top = $this.offset().top,
                        y = (x - $top + $h) / $vH;

                    $this.find('.letter').css({
                        transform: 'translateY(' + (1 - (x - $top) - 100) + 'px) scale(' + (1 - y / 2) + ')'
                    });


                    $this.find('.mockup').css({
                        transform: 'scale(' + (1 - y / 3) + ')'
                    });
                });
            });
        });



        $(window).scroll(function() {
            var x = $(window).scrollTop(),
                $topAbout = $('.about_inner').offset().top,
                $h = ($('.about_inner').outerHeight() / 2),
                y = (x - $topAbout) / $vH;

            $('.text_1').css('margin-top', -x / 10 + '%');
            $('.text_2').css('margin-top', -x / 12 + '%');

            if ( x > $('.about ').offset().top) {
                $('.about_skill ul li').each(function(index, el) {
                    var $this = $(this),
                        skillBar = $this.find('.skill_bar'),
                        childskillBar = skillBar.children('span'),
                        numberValue = skillBar.data('value');

                    setTimeout(function(index) {
                        childskillBar.animate({ width: numberValue + '%' }, 500);
                    }, 150 * (index + 1))
                });
            }

            closeHeader();
        });

        $('.allWorks_slider').owlCarousel({
            loop:true,
            dots: false,
            autoplay: true,
            autoplayHoverPause: true,
            nav:true,
            mouseDrag: false,
            smartSpeed: 700,
            autoplaySpeed: 700,
            navSpeed:700,
            margin:0,
            responsive:{
                0:{
                    items:2
                },
                600:{
                    items:3
                },            
                601:{
                    items:5
                },
                1001:{
                    items:7
                }
            }
        });

    });

    // function

    function playAdio() {
        var audio = $('#menuSound')[0];
        audio.play();
    }


    function closeHeader() {
        $('.header_icon').removeClass('toggle')
        $('.header_top').removeClass('show');
    }


    function smoothClickScroll(duration) {
        $('a[href^="#"]').on('click', function(event) {

            var $this = $(this);
                target = $($this.attr('href')),
                heightHeader = $('.header').height();

            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - heightHeader
                }, duration);
            }

            closeHeader();
        });
    }


    function smoothScroll(time, distance) {

        var $window = $(window);
        var scrollTime = time;
        var scrollDistance = distance;

        $window.on("mousewheel.smooth DOMMouseScroll.smooth", function(event) {

            event.preventDefault();
            var delta = event.originalEvent.wheelDelta / 80 || -event.originalEvent.detail / 3;
            var scrollTop = $window.scrollTop();
            var finalScroll = scrollTop - parseInt(delta * scrollDistance);

            TweenMax.to($window, scrollTime, {
                scrollTo: { y: finalScroll, autoKill: true },
                ease: Power1.easeOut,
                overwrite: 5
            });

        });

    }

    function enableSmoothScroll(time, distance) {
        $(window).on('mousewheel.smooth DOMMouseScroll.smooth', smoothScroll(time, distance));
    }
    

})(jQuery);
