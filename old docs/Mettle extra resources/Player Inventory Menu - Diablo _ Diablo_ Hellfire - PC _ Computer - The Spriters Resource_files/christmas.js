$(function() {
    // Get visible height of footer
    function footerHeight() {
        if($('#footer').length) {
            let w = $(window).height();
            let r = $('#footer')[0].getBoundingClientRect();
            return Math.max(0, r.top > 0 ? Math.min($('#footer').outerHeight(), w - r.top) : Math.min(r.bottom, w));
        }
        return 0;
    }
    // Check if footer is visible on load
    setTimeout(function() {
        if($(document).height() <= $(window).height() && footerHeight()) {
            let bg = $('body').css('background-image').split(',').length;
            if(bg == 2) {
                $('body').css('background-position', 'right 10px bottom ' + footerHeight() + 'px, center');
            } else if(bg == 3) {
                $('body').css('background-position', 'left 10px bottom ' + footerHeight() + 'px, right 10px bottom ' + footerHeight() + 'px, center');
            }
        }
    }, 100);
    // Check if scrolled to bottom
    $(window).on('scroll resize', function() {
        let bg = $('body').css('background-image').split(',').length;
        if(bg > 1 && footerHeight()) {
            if(bg == 2) {
                $('body').css('background-position', 'right 10px bottom ' + footerHeight() + 'px, center');
            } else if(bg == 3) {
                $('body').css('background-position', 'left 10px bottom ' + footerHeight() + 'px, right 10px bottom ' + footerHeight() + 'px, center');
            }
        } else {
            $('body').css('background-position', '');
        }
    });
});
