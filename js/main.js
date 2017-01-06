(function($) {

    $(document).ready(function() {
        new WOW().init();
        smoothScroll(300);

        var audio = $('#menuSound')[0]

        $('.header_icon').on('click', function(event) {
            /* Act on the event */
            var $this =  $(this);

            $this.toggleClass('toggle');
            $('.header_top').toggleClass('show');

            audio.play();
        });

        

        $(window).scroll(function() {
            var x = $(window).scrollTop();

            $('.text_1').css('margin-top', -x/10 +'%');
            $('.text_2').css('margin-top', -x/12 +'%');

            $('.banner_intro').css('margin-top', -x/1000 +'%');

            if(x > $('.about ').offset().top) {
                $('.about_skill ul li').each(function(index, el) {
                    var $this = $(this),
                        skillBar  =  $this.find('.skill_bar'),
                        childskillBar = skillBar.children('span'),
                        numberValue = skillBar.data('value');

                    // childskillBar.css('width', numberValue + '%');

                    setTimeout(function(index) {
                        childskillBar.animate({width: numberValue + '%'}, 500); 
                    }, 150 *(index+1))
                });
            }

            closeHeader();

        });
    });

    
    function closeHeader() {
        $('.header_icon').removeClass('toggle')
        $('.header_top').removeClass('show');
    }
    

    function smoothScroll (duration) {
        $('a[href^="#"]').on('click', function(event) {

            var target = $( $(this).attr('href') );

            if( target.length ) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, duration);
            }
        });
    }
   
})(jQuery);