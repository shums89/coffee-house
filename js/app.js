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
    function addTouchClass() {
        if ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch) ; else document.documentElement.classList.add("no-touch");
    }
    const lazyload = () => {
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
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    function menuClose() {
        bodyUnlock();
        document.documentElement.classList.remove("menu-open");
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
    const toggleButtonRefresh = () => {
        const products = document.querySelector(".menu-content-item._active").querySelectorAll(".products__item");
        const count = [ ...products ].filter((product => getComputedStyle(product).display == "none")).length || 0;
        count > 0 ? document.querySelector(".menu-tabs__refresh").classList.remove("hidden") : document.querySelector(".menu-tabs__refresh").classList.add("hidden");
    };
    const tabs = (headerSelector, tabSelector, contentSelector, activeClassHeader, activeClassContent) => {
        const header = document.querySelector(headerSelector);
        if (!header) return;
        const tab = header.querySelectorAll(tabSelector);
        const content = header.querySelectorAll(contentSelector);
        const resetContent = content => {
            const products = content.querySelectorAll(".products__item");
            products.forEach((product => product.style = ""));
        };
        const hideTabContent = () => {
            content.forEach((item => {
                item.classList.remove(activeClassContent);
            }));
            tab.forEach((item => {
                item.classList.remove(activeClassHeader);
            }));
        };
        const showTabContent = (i = 0) => {
            content[i].classList.add(activeClassContent);
            tab[i].classList.add(activeClassHeader);
            resetContent(content[i]);
            toggleButtonRefresh();
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
    tabs(".menu-tabs", ".menu-tabs__header-item", ".menu-tabs__content-item", "_active", "_active");
    const init = () => {
        if (!document.querySelector(".html-menu")) return;
        const modal = document.querySelector(".modal");
        const inputs = modal.querySelectorAll("input");
        const productCards = document.querySelectorAll(".product-card__link");
        const getData = async function(url) {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Ошибка по адресу "${url}", статус ошибки ${response.status}!`);
            return await response.json();
        };
        const getProduct = title => {
            getData(`./files/products.json`).then((products => {
                openModal(products.find((product => product.name == title)));
            }));
        };
        const openModal = product => {
            if (!product) return;
            modal.querySelector(".modal__title").textContent = product.name;
            modal.querySelector(".modal__text").textContent = product.description;
            modal.querySelector(".modal__total-value span").textContent = product.price;
            modal.querySelector(".modal__total-value span").dataset.value = product.price;
            calcTotal();
            modal.classList.remove("hidden");
            document.documentElement.classList.add("lock");
        };
        const closeModal = e => {
            if (!e.target.closest(".modal__wrapper") || e.target.closest(".modal__btn")) {
                modal.classList.add("hidden");
                document.documentElement.classList.remove("lock");
                inputs.forEach((input => input.checked = input.defaultChecked));
            }
        };
        productCards.forEach((card => {
            card.addEventListener("click", (e => {
                const card = e.target.closest(".product-card__link");
                if (!card && !modal) return;
                getProduct(card.querySelector(".product-card__title").textContent);
            }));
        }));
        const calcTotal = () => {
            let total = modal.querySelector(".modal__total-value span").dataset.value;
            inputs.forEach((input => total = +total + +(input.checked ? input.dataset.value : 0)));
            const totalFormat = new Intl.NumberFormat("en", {
                style: "decimal",
                minimumFractionDigits: 2
            }).format(total);
            modal.querySelector(".modal__total-value span").textContent = totalFormat;
        };
        modal.addEventListener("click", closeModal);
        inputs.forEach((input => input.addEventListener("change", calcTotal)));
    };
    init();
    const products = () => {
        const tabs = document.querySelector(".menu-tabs");
        if (!tabs) return;
        const btnRefresh = tabs.querySelector(".menu-tabs__refresh");
        btnRefresh.addEventListener("click", (e => {
            e.preventDefault();
            const products = tabs.querySelectorAll("._active .products__item");
            products.forEach((product => {
                product.style.display = "block";
            }));
            btnRefresh.classList.add("hidden");
        }));
        window.addEventListener("resize", (() => {
            const products = tabs.querySelectorAll(".products__item");
            products.forEach((product => product.style = ""));
            toggleButtonRefresh();
        }));
    };
    products();
    const initFavoriteSlider = () => {
        const slider = document.querySelector(".favorite-slider");
        if (!slider) return;
        const sliderWrapper = slider.querySelector(".favorite-slider__wrapper");
        const sliderList = slider.querySelector(".favorite-slider__swiper");
        const sliderItems = sliderList.querySelectorAll(".favorite-slider__slide");
        const sliderPaginations = slider.querySelectorAll(".favorite-slider__pagination > span");
        const btnPrev = slider.querySelector(".favorite-slider__nav-button_prev");
        const btnNext = slider.querySelector(".favorite-slider__nav-button_next");
        let currentSlide = 0;
        const PosX = {
            init: 0,
            current: 0,
            min: 0,
            max: 0
        };
        let PosYInit = 0;
        const changeSlide = (slide = "") => {
            const slideWidth = +getComputedStyle(sliderItems[0]).width.replace("px", "") + +getComputedStyle(sliderList).gap.replace("px", "");
            const countSlides = sliderItems.length;
            sliderItems[currentSlide].removeEventListener("touchmove", move);
            sliderItems[currentSlide].removeEventListener("mouseleave", move);
            sliderItems[currentSlide].removeEventListener("touchend", endListener);
            sliderItems[currentSlide].removeEventListener("mouseup", endListener);
            sliderPaginations.forEach(((pagination, index) => {
                if (pagination.closest("._active")) currentSlide = index;
            }));
            switch (slide) {
              case "prev":
                currentSlide === 0 ? currentSlide = countSlides - 1 : currentSlide--;
                break;

              case "next":
                currentSlide === countSlides - 1 ? currentSlide = 0 : currentSlide++;
            }
            sliderPaginations.forEach(((pagination, index) => {
                pagination.classList.remove("_active");
                pagination.classList.remove("_paused");
                if (index === currentSlide) pagination.classList.add("_active");
            }));
            sliderList.style.transition = "all 1s ease 0s";
            sliderList.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
            PosX.init = 0;
            PosX.current = 0;
            sliderItems[currentSlide].addEventListener("touchstart", startListener);
            sliderItems[currentSlide].addEventListener("mousedown", startListener);
        };
        const setPaused = () => {
            slider.querySelector("span._active").classList.add("_paused");
        };
        const deletePaused = () => {
            slider.querySelector("span._active").classList.remove("_paused");
        };
        const startListener = e => {
            e.preventDefault();
            setPaused();
            const coords = sliderWrapper.getBoundingClientRect();
            PosX.init = e.clientX || e.changedTouches[0].clientX;
            PosYInit = e.clientY || e.changedTouches[0].clientY;
            PosX.min = coords.left;
            PosX.max = coords.right;
            sliderItems[currentSlide].addEventListener("touchmove", move);
            sliderItems[currentSlide].addEventListener("mouseleave", move);
            sliderItems[currentSlide].addEventListener("touchend", endListener);
            sliderItems[currentSlide].addEventListener("mouseup", endListener);
        };
        const endListener = e => {
            e.preventDefault();
            deletePaused();
            PosX.current = e.clientX || e.changedTouches[0].clientX;
            if (Math.abs(PosX.current - PosX.init) > 20) if (PosX.current > PosX.init) changeSlide("prev"); else changeSlide("next"); else changeSlide();
        };
        const move = e => {
            PosX.current = e.clientX || e.changedTouches[0].clientX;
            window.scrollBy(0, PosYInit - (e.clientY || e.changedTouches[0].clientY));
            if (PosX.current > PosX.max) changeSlide("prev"); else if (PosX.current < PosX.min) changeSlide("next");
        };
        btnPrev.addEventListener("click", (() => changeSlide("prev")));
        btnNext.addEventListener("click", (() => changeSlide("next")));
        sliderPaginations.forEach((pagination => {
            pagination.addEventListener("animationend", (() => changeSlide("next")));
        }));
        sliderItems.forEach((slide => {
            slide.addEventListener("click", (e => e.preventDefault()));
            slide.addEventListener("mouseenter", setPaused);
            slide.addEventListener("mouseleave", deletePaused);
        }));
        changeSlide();
    };
    initFavoriteSlider();
    console.log("CROSS CHECK. PART 1 (100/100)");
    console.log("1. Checking validation of pages (18/18)");
    console.log("2. The layout matches the design: (40/40)");
    console.log("3. CSS Requirements: (10/10)");
    console.log("4. Interactivity: (32/32)");
    console.log("\n");
    console.log("CROSS CHECK. PART 2 (90/90)");
    console.log("1. The layout of the pages aligns the design at a screen width of 1440px (14/14)");
    console.log("2. The layout of the pages aligns the design at a screen width of 768px (14/14)");
    console.log("3. The layout of the pages aligns the design at a screen width of 380px (14/14)");
    console.log("4. There is no horizontal scrollbar at all screen width up to 380px inclusive (20/20)");
    console.log("5. During smooth resizing of the browser window from 1440px to 380px, nothing breaks (8/8)");
    console.log("6. At screen widths of 768px and below, the hamburger menu icon appears instead of the navigation bar (4/4)");
    console.log("7. Hover effects are active on desktop devices and are disabled for mobile devices on both pages (4/4)");
    console.log("8. The layout for both pages is validated and error-free according to the W3C Validator (12/12)");
    const links = document.querySelectorAll(".menu__link");
    links.forEach((link => link.addEventListener("click", (() => menuClose()))));
    isWebp();
    addTouchClass();
    lazyload();
    menuInit();
})();