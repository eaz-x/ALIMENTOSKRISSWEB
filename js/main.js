;(function() {
    // Configuración global
    const isIOS = /iPad|iPhone|iPod/.test(navigator.platform);
    const $window = $(window);
    const $body = $('body');

    // Funciones base
    const setElementHeight = (selector) => {
        if (!isIOS) {
            const setHeight = () => $(selector).css('height', $window.height());
            setHeight();
            $window.on('resize', setHeight);
        }
    };

    const initSlider = (selector, options = {}) => {
        const slider = $(selector);
        if (slider.length) {
            slider.flexslider(options);
            setElementHeight(`${selector} .slides > li`);
        }
    };

    // Funciones principales
    const initMenu = () => {
        // Offcanvas menu
        $body.prepend('<div id="fh5co-offcanvas"/><a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle"><i></i></a>');
        $('.fh5co-main-nav .fh5co-menu-1 a, .fh5co-main-nav .fh5co-menu-2 a').each(function() {
            $('#fh5co-offcanvas').append($(this).clone());
        });

        // Burger menu
        $body.on('click', '.js-fh5co-nav-toggle', function(e) {
            e.preventDefault();
            $body.toggleClass('fh5co-overflow offcanvas-visible');
            $(this).toggleClass('active');
        });
    };

    const initStickyMenu = () => {
        const $section = $('.fh5co-main-nav');
        const sticky = $('.js-sticky').css('height', $('.js-sticky').height());
        
        $window.on('resize', () => sticky.css('height', sticky.height()));
        
        $section.waypoint({
            handler: function(direction) {
                if (direction === 'down') {
                    $section.css({
                        'position': 'fixed',
                        'top': 0,
                        'width': '100%',
                        'z-index': 99999
                    }).addClass('fh5co-shadow');
                }
            },
            offset: '0px'
        });

        $('.js-sticky').waypoint({
            handler: function(direction) {
                if (direction === 'up') {
                    $section.removeAttr('style').removeClass('fh5co-shadow');
                }
            },
            offset: function() { return -$(this.element).height() + 69; }
        });
    };

    const initScrollEffects = () => {
        $window.on('scroll', function() {
            const scrollPos = $window.scrollTop();
            const $text = $('#inicio .fh5co-text');
            const $overlay = $('#inicio .flexslider .fh5co-overlay');

            $text.css({
                'opacity': 1 - (scrollPos/300),
                'margin-top': -212 + (scrollPos/1),
                'display': scrollPos > 300 ? 'none' : 'block'
            });

            $overlay.css('opacity', 0.5 + (scrollPos/2000));
        });
    };

    const initSmoothScroll = () => {
        $('.js-gotop').on('click', function(e) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: 0 }, 500);
        });

        $('.fh5co-main-nav a:not(.external), #fh5co-offcanvas a:not(.external)').on('click', function(e) {
            const section = $(this).data('nav-section');
            const $target = $(`div[data-section="${section}"]`);
            
            if ($target.length) {
                e.preventDefault();
                const topVal = $window.width() < 769 ? 0 : 58;
                $('html, body').animate({ scrollTop: $target.offset().top - topVal }, 500);
            }
        });
    };

    const initNavigation = () => {
        const updateActiveNav = (section) => {
            $('[data-nav-section]').removeClass('active');
            $(`[data-nav-section="${section}"]`).addClass('active');
        };

        $('div[data-section]').waypoint({
            handler: function(direction) {
                updateActiveNav($(this.element).data('section'));
            },
            offset: function() {
                return direction === 'down' ? '150px' : -$(this.element).height() + 155;
            }
        });
    };

    const initAnimations = () => {
        const animateElements = (section, configs) => {
            const $section = $(section);
            if (!$section.length) return;

            $section.waypoint({
                handler: function(direction) {
                    if (direction === 'down' && !$(this.element).hasClass('animated')) {
                        configs.forEach(({ selector, animation, delay }, i) => {
                            setTimeout(() => {
                                $section.find(selector).each(function(k) {
                                    setTimeout(() => $(this).addClass(`${animation} animated`), k * delay);
                                });
                            }, i * 300);
                        });
                        $(this.element).addClass('animated');
                    }
                },
                offset: '80%'
            });
        };

        // Configuraciones de animación
        const animationConfigs = [
            { section: '#inicio', configs: [{ selector: '.to-animate', animation: 'fadeInUp', delay: 200 }] },
            { section: '#acerca-de', configs: [
                { selector: '.to-animate', animation: 'fadeInUp', delay: 200 },
                { selector: '.to-animate-2', animation: 'fadeIn', delay: 200 }
            ]},
            // ... otras configuraciones de sección
        ];

        animationConfigs.forEach(({ section, configs }) => animateElements(section, configs));
    };

    // Inicialización
    $(function() {
        setElementHeight('.js-fullheight');
        initSlider('#inicio .flexslider', { animation: "fade", slideshowSpeed: 5000 });
        initSlider('#frases-inspiradoras .flexslider', {
            animation: "slide",
            slideshowSpeed: 5000,
            directionNav: false,
            controlNav: true,
            smoothHeight: true,
            reverse: true
        });
        
        initMenu();
        initStickyMenu();
        initScrollEffects();
        initSmoothScroll();
        initNavigation();
        initAnimations();
    });

    // Mobile menu (vanilla JS)
    document.addEventListener('DOMContentLoaded', () => {
        const toggle = document.querySelector('.nav-toggle');
        const mobileMenu = document.querySelector('.nav-mobile');

        if (toggle && mobileMenu) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                mobileMenu.classList.toggle('active');
            });

            document.querySelectorAll('.nav-mobile a').forEach(link => {
                link.addEventListener('click', () => {
                    toggle.classList.remove('active');
                    mobileMenu.classList.remove('active');
                });
            });
        }

        document.querySelectorAll('a[href*="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const hash = this.hash;
                const targetPage = this.getAttribute('href').split('#')[0];
                
                if (targetPage !== window.location.pathname) {
                    window.location.href = this.getAttribute('href');
                    return;
                }
                
                if (hash) {
                    e.preventDefault();
                    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    });
	
}());