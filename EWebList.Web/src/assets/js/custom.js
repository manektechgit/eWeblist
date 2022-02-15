$(document).ready(function(){
    // navbar-toggler
    $("header .navbar-toggler").click(function(){
        $("header").toggleClass("nav-open");
        // $("body").toggleClass("overflow_body");
    });
});

//footer bottom
jQuery(document).ready(function () {
    footer_manage();
});
function footer_manage() {
    var footer_height = jQuery('footer').innerHeight();
    footer_height = footer_height + 'px';
    jQuery('.main').css('padding-bottom', footer_height);
}
jQuery(window).resize(function () {
    setTimeout(footer_manage, 1000);
    footer_manage();
});

//  search top js
$(document).ready(function () {
    $('header .search_bar').click(function (e) {
        $('.search_top_head').stop(true).slideToggle();
    });

    $('.close_src').click(function (e) {
        $('.search_top_head').stop(true).slideUp();
    });
});

$(document).ready(function(){
    // admin sidebar
    // $("header .navbar-toggler").click(function(){
    //     $(this).toggleClass('active');
    //     $(".main-sidebar").toggleClass('show');
    // });

    // tooltip
    // $(function () {
    //     $('[data-toggle="tooltip"]').tooltip();
    // });

    // input tag
    $(function() {
        $('input').on('change', function(event) {

          var $element = $(event.target);
          var $container = $element.closest('.example');

          if (!$element.data('tagsinput'))
            return;

          var val = $element.val();
          if (val === null)
            val = "null";
          var items = $element.tagsinput('items');

          $('code', $('pre.val', $container)).html(($.isArray(val) ? JSON.stringify(val) : "\"" + val.replace('"', '\\"') + "\""));
          $('code', $('pre.items', $container)).html(JSON.stringify($element.tagsinput('items')));

          console.log(val);
          console.log(items);
          console.log(JSON.stringify(val));
          console.log(JSON.stringify(items));

          console.log(items[items.length - 1]);

        }).trigger('change');
      });

      $("#button").click(function() {
        var input = $("input[name='tags']").tagsinput('items');
        console.clear();
        console.log(input);
        console.log(JSON.stringify(input));
        console.log(input[input.length - 1]);
      });

});

// category filter mobi
jQuery('.sidebar_toggle').click(function () {
    var $this = jQuery(this);
    if (jQuery(window).width() < 992) {
        if ($this.parent().find('.sidebar_toggle_open').hasClass('show')) {
                $this.toggleClass('show').parent().find('.sidebar_toggle_open').removeClass('show');
                $this.parent().find('.sidebar_toggle_open').slideUp(350);
        } else {
        jQuery('.sidebar_toggle').removeClass('show');
                jQuery('.sidebar_toggle_open').slideUp(350).removeClass('show');
                $this.toggleClass('show').parent().parent().find('li .inner').removeClass('show');
                $this.parent().parent().find('li .inner').slideUp(350);
                $this.parent().find('.sidebar_toggle_open').toggleClass('show');
                $this.parent().find('.sidebar_toggle_open').slideToggle(350);
        }
    }
});
