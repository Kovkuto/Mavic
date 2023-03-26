$(function () {
    $('.products__slider').slick({
        nextArrow: '<button class="slider-btn slider-btn__right"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.78161 17L9 9L0.78161 1"/></svg></button>',
        prevArrow: '<button class="slider-btn slider-btn__left"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.21839 1L1 9L9.21839 17"/></svg></button>',
        infinite: false,
    })

    let initialText = []
    $('.questions__item-text').each(function () {
        initialText.push(this.textContent)
    })
    $('.questions__item:not(.questions__item_active)').find('.questions__item-text').text('')
    $('.questions__item-title').on('click', function () {
        $('.questions__item-text').text('')
        $('.questions__item').removeClass('questions__item_active')
        $(this).parent().addClass('questions__item_active')
        $(this).parent().find('.questions__item-text').text(initialText[0])
    })

    $('#fullpage').fullpage({
        autoScrolling: true,
        scrollHorizontally: true,
        sectionSelector: '.page-section',
        scrollOverflow: true,
        menu: "#header__nav",
        anchors: ['top', 'products', 'benefits', 'specification', 'questions', 'contacts']
    })

    // $.fn.fullpage.setAllowScrolling(false);
    $('.fp-section.active').find('.fp-scrollable').data('iscrollInstance');

    $('.menu__btn').on('click', function () {
        $('.menu__btn').toggleClass('menu__btn_active')
        $('.menu__list').toggleClass('menu__list_active')
    })

    $('.menu__list-link').on('click', function () {
        $('.menu__btn').removeClass('menu__btn_active')
        $('.menu__list').removeClass('menu__list_active')
    })
});