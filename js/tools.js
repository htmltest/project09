(function($) {

    $(document).ready(function() {

        // advantages
        $('.advantages-tabs a').click(function() {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                var curIndex = $('.advantages-tabs li').index($('.advantages-tabs li.active'));
                var newIndex = $('.advantages-tabs li').index(curLi);
                $('.advantages-tabs li.active').removeClass('active');
                curLi.addClass('active');

                $('.advantages-content').eq(curIndex).hide();
                $('.advantages-content').eq(newIndex).find('.advantage').css({'opacity': 0, 'top': -100});
                $('.advantages-content').eq(newIndex).show();
                $('.advantages-content').eq(newIndex).find('.advantage').eq(0).animate({'opacity': 1, 'top': 0}, 300, function() {
                    $('.advantages-content').eq(newIndex).find('.advantage').eq(1).animate({'opacity': 1, 'top': 0}, 300, function() {
                        $('.advantages-content').eq(newIndex).find('.advantage').eq(2).animate({'opacity': 1, 'top': 0}, 300, function() {
                            $('.advantages-content').eq(newIndex).find('.advantage').eq(3).animate({'opacity': 1, 'top': 0}, 300);
                        });
                    });
                });
            }
            return false;
        });

        // tariffs plans
        $('.tafiffs-plans ul li').click(function() {
            var curLi = $(this);
            $('.tafiffs-plans ul li.active').removeClass('disable active');
            $('.tafiffs-plans ul li').addClass('disable');
            curLi.removeClass('disable').addClass('active');
            var curTariff = $('.tafiffs-plans ul li').index(curLi) + 1;
            $('.tariff-option').removeClass('checked');
            $('.tariff-option').find('input').prop('checked', false).change();
            $('.tariff-option').removeClass('checked-1 checked-2 checked-3 checked-4');
            $('.tariff-' + curTariff).addClass('checked checked-' + curTariff);
            $('.tariff-' + curTariff).find('input').prop('checked', true).change();
            $('.tariff-submit').removeClass('tariff-submit-1 tariff-submit-2 tariff-submit-3 tariff-submit-4');
            $('.tariff-submit').addClass('tariff-submit-' + curTariff);
            recalcSumm();
            $('.tariff-options-summ-tariff').show();
            $('.tariff-options-summ-price').addClass('tariff-options-summ-price-tariff');
            $('.tariff-options-summ-tariff-price strong').html(curLi.find('span').html());
            $('.tariff-options-summ-tariff-economy span').html(Math.round((Number($('.tariff-options-summ-price strong').html().replace(' ', '')) - Number(curLi.find('span').html().replace(' ', ''))) / Number($('.tariff-options-summ-price strong').html().replace(' ', '')) * 100));
            $('.tariff-comment').hide();
            $('.tariff-comment').eq(curTariff - 1).show();

            $('.order-window-info-tariff').show();
            $('.order-window-info-services').hide();
            $('.order-window-info-tariff-name').html(curLi.find('.tariffs-plan-title').html());
            $('.order-window-info-tariff-cost').html(curLi.find('.tariffs-plan-price span').html());
        });

        $('.tariff-option:even').addClass('even');

        $('.tariff-option input:checked').parent().parent().parent().addClass('checked');
        $('.tariff-option').click(function() {
            var curRow = $(this);

            if ($('.tafiffs-plans ul li.active').length > 0) {
                if (curRow.hasClass('checked')) {
                    $('.tariff-option').removeClass('checked');
                    $('.tariff-option').find('input').prop('checked', false).change();
                    $('.tariff-option').removeClass('checked-1 checked-2 checked-3 checked-4');
                } else {
                    $('.tariff-option').removeClass('checked');
                    $('.tariff-option').find('input').prop('checked', false).change();
                    $('.tariff-option').removeClass('checked-1 checked-2 checked-3 checked-4');
                    curRow.addClass('checked');
                    curRow.find('input').prop('checked', curRow.hasClass('checked')).change();
                }
            } else {
                curRow.toggleClass('checked');
                curRow.find('input').prop('checked', curRow.hasClass('checked')).change();
            }

            $('.tafiffs-plans ul li').removeClass('disable active');
            $('.tariff-option').removeClass('checked-1 checked-2 checked-3 checked-4');
            recalcSumm();
            $('.tariff-options-summ-tariff').hide();
            $('.tariff-options-summ-price').removeClass('tariff-options-summ-price-tariff');
            $('.tariff-comment').hide();
            $('.tariff-submit').removeClass('tariff-submit-1 tariff-submit-2 tariff-submit-3 tariff-submit-4');

            $('.order-window-info-tariff').hide();
            $('.order-window-info-services').show();
        });

        $('.tariffs form').submit(function() {
            $('.order-window-form-services').html($('.tariff-options').html());
            windowOpen($('.order-window').html());
            $('.window input[name="phone"]').mask('(999) 999-9999');
            return false;
        });

        recalcSumm();

    });

    function recalcSumm() {
        var curSumm = 0;

        $('.tariff-options .tariff-option.checked').each(function() {
            curSumm += Number($(this).find('.tariff-option-price strong').html().replace(' ', ''));
        });
        $('.tariff-options-summ-price strong').html(String(curSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
        $('.order-window-info-services-count').html($('.tariff-options .tariff-option.checked').length);
        $('.order-window-info-services-cost').html(String(curSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    }

    // открытие окна
    function windowOpen(contentWindow) {
        var windowWidth  = $(window).width();
        var windowHeight = $(window).height();
        var curScrollTop = $(window).scrollTop();

        $('body').css({'width': windowWidth, 'height': windowHeight, 'overflow': 'hidden'});
        $(window).scrollTop(0);
        $('.wrapper').css({'top': -curScrollTop});
        $('.wrapper').data('scrollTop', curScrollTop);

        $('body').append('<div class="window"><div class="window-overlay"></div><div class="window-container">' + contentWindow + '<a href="#" class="window-close"></a></div></div>')
        recalcWindow();
        var params = {
            changedEl: '.window select',
            visRows: 5,
            scrollArrows: true
        }
        cuSel(params);
        $('.cuselText').each(function() {
            if ($(this).html() == '') {
                $(this).html('<em>выберите ответ</em>');
            }
        });

        $('.window-overlay').click(function() {
            windowClose();
        });

        $('body').bind('keypress keydown', keyDownBody);

        $('.order-window-cancel input').click(function() {
            windowClose();
            return false;
        });
    }

    // функция обновления позиции окна
    function recalcWindow() {
        var windowWidth  = $(window).width();
        var windowHeight = $(window).height();
        if ($('.window-container').width() < windowWidth) {
            $('.window-container').css({'margin-left': -$('.window-container').width() / 2});
        } else {
            $('.window-container').css({'left': 0});
        }
        if ($('.window-container').height() < windowHeight) {
            $('.window-container').css({'margin-top': -$('.window-container').height() / 2});
        } else {
            $('.window-container').css({'top': 20});
            $('.window-overlay').css({'min-height': $('.window-container').height() + 40});
        }
    }

    // обработка Esc после открытия окна
    function keyDownBody(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    }

    // закрытие окна
    function windowClose() {
        $('body').unbind('keypress keydown', keyDownBody);
        $('.window').remove();
        $('.wrapper').css({'top': 'auto'});
        $('body').css({'width': 'auto', 'height': '100%', 'overflow': 'auto'});
        var curScrollTop = $('.wrapper').data('scrollTop');
        $(window).scrollTop(curScrollTop);
    }

})(jQuery);