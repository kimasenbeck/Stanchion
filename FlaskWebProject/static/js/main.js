function main() {
  (function () {
    'use strict';
    var slider;

    $('a.page-scroll').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - 40
            }, 900);
          return false;
        }
      }
    });

    window.setTimeout(function() {
      if(location.hash.length !== 0) {
        window.scrollTo(window.scrollX, window.scrollY - 40);
      }
    }, 1);

    /*====================================
    Show Menu on Book
    ======================================*/
    $(window).bind('scroll', function() {
      var navHeight = $(window).height()*0.6; // Where the navigation bar changes
      if ($(window).scrollTop() > navHeight) {
        $('.navbar-default').addClass('on');
        $('#tf-menu a.navbar-brand').css({'opacity':1,'z-index':0});
      } else {
        $('.navbar-default').removeClass('on');
        $('#tf-menu a.navbar-brand').css({'opacity':0,'z-index':-1});
      }
    });

    $('body').scrollspy({ 
      target: '.navbar-default',
      offset: 80
    })

  }());

}

main();