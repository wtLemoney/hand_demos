   $(document).ready(function(){
   // Items Magic [Preview-1]

    $('.paper.preview-1 .item').click(function () {
        $('.paper.preview-1 .item').not(this).removeClass('active');
        $(this).toggleClass('active');
        if ($('.paper.preview-1 .item').hasClass('active')) {
            $('.paper.preview-1').addClass('item-active');
        } else {
            $('.paper.preview-1').removeClass('item-active')
        };
    });
    // Preventing Closing when Click inside counter
    $('.minus,.plus').click(function (a) {
        a.stopPropagation();
    });

    // Adding Counter [Preview-1]
    $('.paper.preview-1 .plus').click(function () {
        $(this).parent().find('.number').html(function (y, val) {
            return val * 1 + 1  
        });
    });

    $('.paper.preview-1 .minus').click(function () {
        var increased = parseInt($(this).parent().find('.number').text());
        if (isNaN(increased) || increased > 0) {
            $(this).parent().find('.number').html(function (t, val) {
                return val * 1 - 1
            });
        } else {
        return false;
        }
    });
    $('.paper.preview-1 .plus, .paper.preview-1 .minus').click(function () {
        var increased = parseInt($(this).parent().find('.number').text());
        
        var itemsTotal = 0;
        $('.paper.preview-1 .number').each(function () {
            itemsTotal += ($(this).html() * 1);
        });
        $('.paper.preview-1 .items-total').html(itemsTotal);
        
        var itemsTotalAll = parseInt($('.paper.preview-1 .items-total').text());
        if (isNaN(itemsTotalAll) || itemsTotalAll <= 0) {
            $('.paper.preview-1 .action').hide();
        } else {
            $('.paper.preview-1 .action').show();
        }
        
        if (isNaN(increased) || increased <= 0) {        
            $(this).parent().find('.number').hide();
        } else {
            $(this).parent().find('.number').show();
        }
    });

    // JavaScript code is done
    // the rest are just repeating 
    // for Paper Preview-2 functionality

    // Items Magic [Preview-2]
    $('.paper.preview-2 .item').click(function () {
        $('.paper.preview-2 .item').not(this).removeClass('active');
        $(this).toggleClass('active');
        if ($('.paper.preview-2 .item').hasClass('active')) {
            $('.paper.preview-2').addClass('item-active');
        } else {
            $('.paper.preview-2').removeClass('item-active')
        };
    });

    // Adding Counter [Preview-2]
    $('.paper.preview-2 .plus').click(function () {
        $(this).parent().find('.number').html(function (p, val) {
            return val * 1 + 1
        });
    });


    $('.paper.preview-2 .minus').click(function () {
        var increased = parseInt($(this).parent().find('.number').text());
        if (isNaN(increased) || increased > 0) {
            $(this).parent().find('.number').html(function (k, val) {
                return val * 1 - 1
            });
        } else {

        }
    });
    $('.paper.preview-2 .plus, .paper.preview-2 .minus').click(function () {
        var increased = parseInt($(this).parent().find('.number').text());
        
        var itemsTotal = 0;
        $('.paper.preview-2 .number').each(function () {
            itemsTotal += ($(this).html() * 1);
        });
        $('.paper.preview-2 .items-total').html(itemsTotal);
        
        var itemsTotalAll = parseInt($('.paper.preview-2 .items-total').text());
        if (isNaN(itemsTotalAll) || itemsTotalAll <= 0) {
            $('.paper.preview-2 .action').hide();
        } else {
            $('.paper.preview-2 .action').show();
        }
        
        if (isNaN(increased) || increased <= 0) {        
            $(this).parent().find('.number').hide();
        } else {
            $(this).parent().find('.number').show();
        }
    });
})