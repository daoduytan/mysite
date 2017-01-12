(function($) {

    $(window).on('load', function(event) {

        var loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;

        if (loadTime >= 1500) {
            $('.load_bar').find('span').animate({
                    'width': '250px'
                },
                loadTime,
                function() {

                });

            setTimeout(function() {
                $('.loading').css({
                    'opacity': '0',
                    'visibility': 'hidden'
                });
            }, loadTime);



        } else {
            $('.load_bar').find('span').animate({
                    'width': '250px'
                },
                1500,
                function() {


                });

            setTimeout(function() {
                $('.loading').css({
                    'opacity': '0',
                    'visibility': 'hidden',
                    'transform': 'translateY(-100%)'
                });
            }, 1500);
        }

    });

    enableSmoothScroll(.5, 100);
    smoothScroll(.5, 100);


    $(document).ready(function() {
        var  $vH = $(window).outerHeight();
        
        setTimeout(function() {
            new WOW().init();
        }, 2000);

        smoothClickScroll(300);

        $('.header_icon').on('click', function(event) {
            /* Act on the event */
            var $this = $(this);

            $this.toggleClass('toggle');
            $('.header_top').toggleClass('show');

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
                $h = ($this.find('.mockup').outerHeight())/2;

            $(window).scroll(function() {
                var  x = $(window).scrollTop();

                $('.works .work').each(function(index, el) {
                    var $this = $(this),
                        $top = $this.offset().top,
                        y = (x-$top + $h)/$vH;

                    $this.find('.letter').css({
                        transform: 'translateY(' + (1-(x-$top)-100) + 'px) scale('+ (1-y/2) +')' 
                    }); 
  

                    $this.find('.mockup').css({
                        transform: 'scale('+ (1-y/3) +')'
                    });
                });
            });
        });



        $(window).scroll(function() {
            var x = $(window).scrollTop(),
                $topAbout  =  $('.about_inner').offset().top,
                $h = ($('.about_inner').outerHeight()/2),
                y = (x-$topAbout)/$vH;

            $('.text_1').css('margin-top', -x / 10 + '%');
            $('.text_2').css('margin-top', -x / 12 + '%');

            if (x > $('.about ').offset().top) {
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


        $('.allWorks_slider').slick({
            infinite: true,
            arrows: false,
            autoplay: true,
            speed: 150,
            slidesToShow: 7,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 1000,
                settings: {
                    slidesToShow: 5,
                }
            }, {
                breakpoint: 601,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2
                }
            }]
        });


    });

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

            var $this =  $(this);
                target = $($this.attr('href')),
                heightHeader =  $('.header').height();

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

    function enableSmoothScroll (time, distance) {
          
        $(window).on('mousewheel.smooth DOMMouseScroll.smooth', smoothScroll(time,distance));
      
    }

})(jQuery);
