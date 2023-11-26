(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = support === true ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    console.log("CROSS CHECK. PART 1 (100/100)");
    console.log("1. Checking validation of pages (18/18)");
    console.log("2. The layout matches the design: (40/40)");
    console.log("3. CSS Requirements: (10/10)");
    console.log("4. Interactivity: (32/32)");
    window.addEventListener("load", (() => {
        const lazyObjs = document.querySelectorAll("[data-src], [data-srcset], [data-poster]");
        const updateLazyObject = arr => {
            arr.forEach((el => {
                if (el.dataset.src) el.src = el.dataset.src;
                if (el.dataset.srcset) el.srcset = el.dataset.srcset;
                if (el.dataset.poster) el.poster = el.dataset.poster;
            }));
        };
        if (lazyObjs) updateLazyObject(lazyObjs);
    }));
    window.addEventListener("DOMContentLoaded", (function() {
        [].forEach.call(document.querySelectorAll('input[type="tel"]'), (function(input) {
            var keyCode;
            function mask(event) {
                event.keyCode && (keyCode = event.keyCode);
                var pos = this.selectionStart;
                if (pos < 3) event.preventDefault();
                var matrix = "+7 (___) ___-__-__", i = 0, def = matrix.replace(/\D/g, ""), val = this.value.replace(/\D/g, ""), new_value = matrix.replace(/[_\d]/g, (function(a) {
                    return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
                }));
                i = new_value.indexOf("_");
                if (i != -1) {
                    i < 5 && (i = 3);
                    new_value = new_value.slice(0, i);
                }
                var reg = matrix.substr(0, this.value.length).replace(/_+/g, (function(a) {
                    return "\\d{1," + a.length + "}";
                })).replace(/[+()]/g, "\\$&");
                reg = new RegExp("^" + reg + "$");
                if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
                if (event.type == "blur" && this.value.length < 5) this.value = "";
            }
            input.addEventListener("input", mask, false);
            input.addEventListener("focus", mask, false);
            input.addEventListener("blur", mask, false);
            input.addEventListener("keydown", mask, false);
        }));
    }));
    const initfavoriteSlider = () => {
        const favoriteSlider = document.querySelector(".favorite-slider");
        if (!favoriteSlider) return;
        const favoriteSliderList = favoriteSlider.querySelector(".favorite-slider__swiper");
        const favoriteSliderItems = favoriteSliderList.querySelectorAll(".favorite-slider__slide");
        const favoriteSliderPagination = favoriteSlider.querySelector(".favorite-slider__pagination");
        const favoriteSliderNavButtons = favoriteSlider.querySelectorAll(".favorite-slider__nav-button");
        const changeSlide = e => {
            const favoriteSliderPaginations = favoriteSliderPagination.querySelectorAll("*");
            const slideWidth = +getComputedStyle(favoriteSliderItems[0]).width.replace("px", "") + +getComputedStyle(favoriteSliderList).gap.replace("px", "");
            const countSlides = favoriteSliderPaginations.length;
            let currentSlide = 0;
            let target = e ? e.target : null;
            favoriteSliderPaginations.forEach(((element, index) => {
                if (element.closest("._active")) currentSlide = index;
            }));
            if (target) {
                if (target.closest(".favorite-slider__nav-button_prev") && currentSlide === 0 || target.closest(".favorite-slider__nav-button_next") && currentSlide === countSlides - 1) return;
                if (target.closest(".favorite-slider__nav-button_prev")) currentSlide--; else if (target.closest(".favorite-slider__nav-button_next")) currentSlide++;
            }
            favoriteSliderPaginations.forEach(((element, index) => {
                element.classList.remove("_active");
                if (index === currentSlide) element.classList.add("_active");
            }));
            favoriteSliderList.style.transition = "all 1s ease 0s";
            favoriteSliderList.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
            favoriteSlider.querySelector(".favorite-slider__nav-button_prev").disabled = currentSlide === 0;
            favoriteSlider.querySelector(".favorite-slider__nav-button_next").disabled = currentSlide === countSlides - 1;
        };
        const favoriteSliderFunction = () => {
            favoriteSliderNavButtons.forEach((element => {
                element.addEventListener("click", changeSlide);
            }));
        };
        favoriteSliderFunction();
        changeSlide();
    };
    initfavoriteSlider();
    const tabs = (headerSelector, tabSelector, contentSelector, activeClass, display = "flex") => {
        const header = document.querySelector(headerSelector);
        if (!header) return;
        const tab = header.querySelectorAll(tabSelector);
        const content = header.querySelectorAll(contentSelector);
        const hideTabContent = () => {
            content.forEach((item => {
                item.style.display = "none";
            }));
            tab.forEach((item => {
                item.classList.remove(activeClass);
            }));
        };
        const showTabContent = (i = 0) => {
            content[i].style.display = display;
            tab[i].classList.add(activeClass);
        };
        hideTabContent();
        showTabContent();
        header.addEventListener("click", (e => {
            const target = e.target;
            if (target.classList.contains(tabSelector.replace(/\./, "")) || target.parentNode.classList.contains(tabSelector.replace(/\./, ""))) tab.forEach(((item, i) => {
                if (target == item || target.parentNode == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            }));
        }));
    };
    tabs(".menu-tabs", ".menu-tabs__header-item", ".menu-tabs__content-item", "active");
    isWebp();
    menuInit();
})();