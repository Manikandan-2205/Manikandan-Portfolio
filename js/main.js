 
$(document).ready(function() {
    // Mobile menu toggle
    $('.hamburger').click(function() {
        $('.mobile-menu').toggleClass('hidden');
        $(this).toggleClass('open');
    });
    
    // Close mobile menu when clicking a link
    $('.mobile-menu a').click(function() {
        $('.mobile-menu').addClass('hidden');
        $('.hamburger').removeClass('open');
    });
    
    // Smooth scrolling for anchor links
    $('a[href*="#"]').not('[href="#"]').click(function(e) {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
            location.hostname === this.hostname) {
            let target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 800);
                return false;
            }
        }
    });
    
    // Sticky header
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('nav').addClass('scrolled');
        } else {
            $('nav').removeClass('scrolled');
        }
    });
    
    // Active navigation link
    $(window).scroll(function() {
        const scrollPosition = $(this).scrollTop() + 100;
        
        $('section').each(function() {
            const sectionId = $(this).attr('id');
            const sectionTop = $(this).offset().top;
            const sectionHeight = $(this).outerHeight();
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                $('.nav-link').removeClass('active');
                $(`.nav-link[href="#${sectionId}"]`).addClass('active');
            }
        });
    });
    
    // Animate skill bars when section is in view
    function animateSkillBars() {
        $('.skill-bar').each(function() {
            const width = $(this).data('width');
            $(this).css('width', width);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                $(entry.target).find('[data-animate]').each(function() {
                    $(this).addClass('animate');
                });
            }
        });
    }, observerOptions);
    
    // Observe all sections
    $('section').each(function() {
        observer.observe(this);
    });
    
    // Form submission
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        // Here you would typically send the form data to a server
        alert('Thank you for your message! I will get back to you soon.');
        this.reset();
    });
});