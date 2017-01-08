(function($) {

    $(window).on('load', function(event) {

       var loadTime = window.performance.timing.domContentLoadedEventEnd-window.performance.timing.navigationStart; 
        // console.log('Page load time is '+ loadTime);


        if (loadTime >=2000) {
            $('.load_bar').find('span').animate({
                'width': '250px'},
                loadTime, function() {
               
            });

            setTimeout(function() {
                $('.loading').css({
                    'opacity': '0',
                    'visibility': 'hidden'
                });
            }, loadTime);

            

        } else {
            $('.load_bar').find('span').animate({
                'width': '250px'},
                2000, function() {

              
            });

              setTimeout(function() {
                    $('.loading').css({
                        'opacity': '0',
                        'visibility': 'hidden',
                        'transform': 'translateY(-100%)'
                    });
                }, 2000);
        }

    });
    

    $(document).ready(function() {
        setTimeout(function() {
            new WOW().init();
        }, 2000);
        
        smoothScroll(300);

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



        $(window).scroll(function() {
            var x = $(window).scrollTop();

            $('.text_1').css('margin-top', -x / 10 + '%');
            $('.text_2').css('margin-top', -x / 12 + '%');

            $('.banner_intro').css('margin-top', -x / 1000 + '%');

            if (x > $('.about ').offset().top) {
                $('.about_skill ul li').each(function(index, el) {
                    var $this = $(this),
                        skillBar = $this.find('.skill_bar'),
                        childskillBar = skillBar.children('span'),
                        numberValue = skillBar.data('value');

                    // childskillBar.css('width', numberValue + '%');

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
            speed: 300,
            slidesToShow: 7,
            slidesToScroll: 1,
            responsive: [{
                breakpoint: 1000,
                settings: {
                    slidesToShow: 5,
                }
            }, 
            {
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


    function smoothScroll(duration) {
        $('a[href^="#"]').on('click', function(event) {

            var target = $($(this).attr('href'));

            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, duration);
            }
        });
    }




})(jQuery);
