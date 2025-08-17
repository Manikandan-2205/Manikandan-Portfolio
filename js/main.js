$(document).ready(function() {
    // Theme Toggle
    const themeToggle = $('#theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Check for saved theme preference or use system preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
        $('html').addClass('dark');
    }
    
    // Toggle theme
    themeToggle.click(function() {
        $('html').toggleClass('dark');
        const theme = $('html').hasClass('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
    
    // Mobile Menu Toggle
    $('.mobile-menu-toggle').click(function() {
        $('.nav-links').toggleClass('hidden');
        $(this).find('i').toggleClass('mdi-menu mdi-close');
    });
    
    // Close mobile menu when clicking a link
    $('.nav-link').click(function() {
        $('.nav-links').addClass('hidden');
        $('.mobile-menu-toggle').find('i').removeClass('mdi-close').addClass('mdi-menu');
    });
    
    // Smooth scrolling for anchor links
    $('a[href*="#"]').not('[href="#"]').click(function(e) {
        e.preventDefault();
        const target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });
    
    // Sticky header
    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
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
        $('.skill-progress').each(function() {
            const width = $(this).data('width');
            $(this).css('width', width);
        });
    }
    
    // Intersection Observer for animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'skills') {
                    animateSkillBars();
                }
                $(entry.target).find('[data-animate]').addClass('animate');
            }
        });
    }, { threshold: 0.1 });
    
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