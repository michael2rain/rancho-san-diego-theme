/**
 * @file rooms-slider.js
 * @description: Este archivo se encarga de inicializar el slider de habitaciones
 */

const addClass = (e, className) => {
    if (window.innerWidth > 768) {
        e.classList.add(className);
    } else if (window.innerWidth <= 768) {
        e.classList.remove(className);
        e.removeAttribute('style');
    }
};

const swiperInit = (executed) => {
    const idContainer = document.getElementById('swiperInit');
    const swiperContainer = idContainer.querySelector('div');
    const swiperWrapper = idContainer.querySelector('.elementor-loop-container')
    const slides = document.querySelectorAll('.habitaciones');

    let buttonPrev;
    let buttonNext;
    let pagination;

    if (!executed) {
        buttonPrev = document.createElement('div');
        buttonNext = document.createElement('div');
        pagination = document.createElement('div');
        buttonPrev.classList.add('swiper-button-prev');
        buttonNext.classList.add('swiper-button-next');
        pagination.classList.add('swiper-pagination');
        idContainer.appendChild(buttonPrev);
        idContainer.appendChild(buttonNext);
        idContainer.appendChild(pagination);
        executed = true;
    };

    addClass(swiperContainer, 'swiper-container');
    addClass(swiperWrapper, 'swiper-wrapper');
    for (let slide of slides) {
        addClass(slide, 'swiper-slide');
    }

    const swiperRooms = new Swiper(swiperContainer, {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 36,
        loop: false,
        pagination: {
            el: pagination,
            clickable: true,
        },
        navigation: {
            nextEl: buttonNext,
            prevEl: buttonPrev,
        },
    });

};

document.addEventListener('DOMContentLoaded', () => {
    addLinks();
    let executed = false;
    if (window.innerWidth > 768) {
        const initializeSwiper = () => {
            if (typeof Swiper !== 'undefined') {
                swiperInit(executed);
            } else {
                setTimeout(initializeSwiper, 100);
            }
        };
        initializeSwiper();
    }
    window.addEventListener('resize', () => {
        swiperInit(executed);
    });
});
