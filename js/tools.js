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

                $('.advantages-content').eq(curIndex).fadeOut();
                $('.advantages-content').eq(newIndex).fadeIn();
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
        });

        $('.tariff-option:even').addClass('even');

        $('.tariff-option input:checked').parent().parent().parent().addClass('checked');
        $('.tariff-option').click(function() {
            var curRow = $(this);
            curRow.toggleClass('checked');
            curRow.find('input').prop('checked', curRow.hasClass('checked')).change();
            $('.tafiffs-plans ul li').removeClass('disable active');
            $('.tariff-option').removeClass('checked-1 checked-2 checked-3 checked-4');
            recalcSumm();
            $('.tariff-options-summ-tariff').hide();
            $('.tariff-options-summ-price').removeClass('tariff-options-summ-price-tariff');
            $('.tariff-comment').hide();
        });

    });

    function recalcSumm() {
        var curSumm = 0;

        $('.tariff-option.checked').each(function() {
            curSumm += Number($(this).find('.tariff-option-price strong').html().replace(' ', ''));
        });
        $('.tariff-options-summ-price strong').html(String(curSumm).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
    }

})(jQuery);