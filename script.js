/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW/HIDE (toggle) =====*/
/* Validate if constant exists */
if(navToggle) {
    navToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.contains('show-menu');
        if (isOpen) {
            // Second click closes
            navMenu.classList.remove('show-menu');
        } else {
            // Open and wait for user to close manually
            navMenu.classList.add('show-menu');
        }
    });
}

/*===== MENU HIDDEN via close button =====*/
/* Validate if constant exists */
if(navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header');

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for(i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close';
    }
    if(itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

/*==================== PROJECTS FILTERS ====================*/
const projectFilters = document.querySelectorAll('.projects__filter');
const projectCards = document.querySelectorAll('.projects__card');

// Function to filter projects
function filterProjects() {
    const target = this.getAttribute('data-target');
    
    // Remove active class from all filters
    projectFilters.forEach(filter => filter.classList.remove('active-filter'));
    
    // Add active class to clicked filter
    this.classList.add('active-filter');
    
    // Show/hide projects based on filter
    projectCards.forEach(card => {
        if(target === 'all' || card.classList.contains(target)) {
            card.classList.add('show-mix');
            card.classList.remove('hide-mix');
            card.style.display = 'block';
        } else {
            card.classList.remove('show-mix');
            card.classList.add('hide-mix');
            card.style.display = 'none';
        }
    });
}

// Add event listeners to filter buttons
projectFilters.forEach(filter => {
    filter.addEventListener('click', filterProjects);
});

// Initialize projects - show all by default
document.addEventListener('DOMContentLoaded', () => {
    projectCards.forEach(card => {
        card.classList.add('show-mix');
    });
});

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById('header');
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollUp);

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*==================== SMOOTH SCROLLING ====================*/
const navLinks = document.querySelectorAll('.nav__link, .hero__button, .hero__scroll-button, .footer__link, .hero__info-item');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        // Check if it's an internal link (starts with #)
        if(href && href.startsWith('#')) {
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if(targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

/*==================== INTERSECTION OBSERVER FOR ANIMATIONS ====================*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

// Animate sections on scroll
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

// Observe all sections except hero
document.querySelectorAll('.section:not(.hero)').forEach(section => {
    sectionObserver.observe(section);
});

// Animate project cards individually
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
            // Stagger animation for multiple cards
            setTimeout(() => {
                entry.target.style.animationDelay = '0s';
            }, 100);
        }
    });
}, observerOptions);

document.querySelectorAll('.projects__card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    projectObserver.observe(card);
});

/*==================== CONTACT FORM ====================*/
const contactForm = document.getElementById('contact-form');
const contactMessage = document.getElementById('contact-message');

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show message
function showMessage(message, type) {
    contactMessage.textContent = message;
    contactMessage.className = `contact__message show ${type}`;
    
    setTimeout(() => {
        contactMessage.classList.remove('show');
    }, 5000);
}

// Handle form submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const name = formData.get('name').trim();
    const email = formData.get('email').trim();
    const message = formData.get('message').trim();
    
    // Validation
    if(!name || !email || !message) {
        showMessage('Please fill in all fields.', 'error');
        return;
    }
    
    if(!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    if(message.length < 10) {
        showMessage('Message must be at least 10 characters long.', 'error');
        return;
    }
    
    // Simulate form submission (replace with actual form handling)
    const submitButton = contactForm.querySelector('.contact__form-button');
    const originalText = submitButton.innerHTML;
    
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
        
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;
    }, 2000);
});

/*==================== TYPING ANIMATION ====================*/
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const heroName = document.querySelector('.hero__name');
            const heroProfession = document.querySelector('.hero__profession');
            
            if(heroName && !heroName.classList.contains('typed')) {
                heroName.classList.add('typed');
                setTimeout(() => {
                    typeWriter(heroName, 'Rajendra Sapkota', 150);
                }, 500);

            }
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if(heroSection) {
    heroObserver.observe(heroSection);
}

/*==================== SKILLS PROGRESS ANIMATION ====================*/
function animateSkillsProgress() {
    const skillsData = document.querySelectorAll('.skills__data');
    
    skillsData.forEach((skill, index) => {
        const level = skill.querySelector('.skills__level').textContent;
        let percentage = 0;
        
        switch(level) {
            case 'Advanced':
                percentage = 90;
                break;
            case 'Intermediate':
                percentage = 75;
                break;
            case 'Basic':
                percentage = 50;
                break;
            default:
                percentage = 60;
        }
        
        // Create progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'skills__progress';
        progressBar.innerHTML = `<div class="skills__progress-bar" style="width: 0%"></div>`;
        
        skill.appendChild(progressBar);
        
        // Animate progress bar
        setTimeout(() => {
            const bar = progressBar.querySelector('.skills__progress-bar');
            bar.style.transition = 'width 1.5s ease-in-out';
            bar.style.width = percentage + '%';
        }, index * 200);
    });
}

// Animate skills when section becomes visible
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            animateSkillsProgress();
        }
    });
}, { threshold: 0.3 });

const skillsSection = document.querySelector('.skills');
if(skillsSection) {
    skillsObserver.observe(skillsSection);
}

/*==================== LAZY LOADING IMAGES ====================*/
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

/*==================== PARTICLE BACKGROUND ====================*/
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    document.querySelector('.hero').appendChild(particleContainer);
    
    for(let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position and size
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.width = (Math.random() * 4 + 1) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        particle.style.animationDelay = Math.random() * 20 + 's';
        
        particleContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

/*==================== PERFORMANCE OPTIMIZATIONS ====================*/
// Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollUp);
window.removeEventListener('scroll', scrollActive);

window.addEventListener('scroll', throttle(scrollHeader, 16));
window.addEventListener('scroll', throttle(scrollUp, 16));
window.addEventListener('scroll', throttle(scrollActive, 16));

/*==================== THEME TOGGLE ====================*/
function createThemeToggle() {
    const themeButton = document.createElement('button');
    themeButton.className = 'theme-toggle';
    themeButton.innerHTML = '<i class="fas fa-moon"></i>';
    themeButton.setAttribute('aria-label', 'Toggle dark theme');
    
    document.body.appendChild(themeButton);
    
    // Check for saved theme preference or default to 'light' mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', currentTheme === 'dark');
    
    if(currentTheme === 'dark') {
        themeButton.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        const theme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
        
        themeButton.innerHTML = theme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
}

// Initialize theme toggle
createThemeToggle();

/*==================== LOADING ANIMATION ====================*/
function createLoadingAnimation() {
    const loader = document.createElement('div');
    loader.className = 'page-loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <p>Loading...</p>
        </div>
    `;
    
    document.body.appendChild(loader);
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.remove();
            }, 500);
        }, 1000);
    });
}

// Initialize loading animation
createLoadingAnimation();

/*==================== KEYBOARD NAVIGATION ====================*/
document.addEventListener('keydown', (e) => {
    const focusableElements = 'a, button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(document.querySelectorAll(focusableElements));
    const index = focusable.indexOf(document.activeElement);
    
    if(e.key === 'Tab') {
        if(e.shiftKey) {
            if(index === 0) {
                focusable[focusable.length - 1].focus();
                e.preventDefault();
            }
        } else {
            if(index === focusable.length - 1) {
                focusable[0].focus();
                e.preventDefault();
            }
        }
    }
    
    // ESC to close mobile menu
    if(e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        if(navMenu.classList.contains('show-menu')) {
            navMenu.classList.remove('show-menu');
        }
    }
});

/*==================== SCROLL ANIMATIONS ====================*/
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if(elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', throttle(revealOnScroll, 16));

/*==================== INITIALIZE ANIMATIONS ====================*/
document.addEventListener('DOMContentLoaded', () => {
    // Add reveal class to animated elements
    const animatedElements = document.querySelectorAll('.about__info-item, .skills__data, .projects__card');
    animatedElements.forEach(el => el.classList.add('reveal'));
    
    // Initialize AOS (Animate On Scroll) alternative
    revealOnScroll();
});

/*==================== ERROR HANDLING ====================*/
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
    // Optionally show user-friendly error message
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    e.preventDefault();
});

/*==================== RESIZE HANDLER ====================*/
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate animations and layouts if needed
        // Mobile and desktop optimizations can be added here if needed
    }, 250);
});

/*==================== PRELOAD CRITICAL RESOURCES ====================*/
function preloadImages() {
    const imageUrls = [
        'https://via.placeholder.com/300x300/4f46e5/ffffff?text=Profile',
        'https://via.placeholder.com/400x500/6366f1/ffffff?text=About+Me'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Preload images after page load
window.addEventListener('load', preloadImages);

/*==================== LEFT NAVIGATION ====================*/
function showLeftNav() {
    const leftNav = document.getElementById('left-nav');
    const scrollY = window.pageYOffset;

    if(scrollY >= 100) {
        leftNav.classList.add('show');
        // Add body class for content padding
        document.body.classList.add('left-nav-open');
    } else {
        leftNav.classList.remove('show');
        // Remove body class for content padding
        document.body.classList.remove('left-nav-open');
    }
}

window.addEventListener('scroll', showLeftNav);

// Left navigation active link
function leftNavLinkAction() {
    const leftNavLinks = document.querySelectorAll('.left-nav__link');
    
    leftNavLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    this.classList.add('active');
}

const leftNavLinks = document.querySelectorAll('.left-nav__link');
leftNavLinks.forEach(link => link.addEventListener('click', leftNavLinkAction));

// Update active left nav link based on scroll position
function updateActiveLeftNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        const leftNavLink = document.querySelector('.left-nav__link[href*=' + sectionId + ']');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            leftNavLinks.forEach(link => link.classList.remove('active'));
            if(leftNavLink) {
                leftNavLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveLeftNavLink);

/*==================== ENHANCED PROJECT INTERACTIONS ====================*/
// Add better feedback for project buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add enhanced click feedback for all project links
    const projectLinks = document.querySelectorAll('.projects__link');
    
    projectLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Add enhanced hover effects for hero info items
    const infoItems = document.querySelectorAll('.hero__info-item');
    
    infoItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
});

/*==================== BUTTON CLICK ANIMATIONS ====================*/
// Add click animations to all buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

/*==================== ENHANCED USER FEEDBACK FUNCTIONS ====================*/
// Professional download CV message
function showDownloadMessage() {
    const message = `📄 CV Download Notice\n\n` +
                   `Thank you for your interest in my CV!\n\n` +
                   `The download functionality is currently under development and will be available soon.\n\n` +
                   `In the meantime, you can:\n` +
                   `• View my work in the Projects section\n` +
                   `• Contact me directly for CV requests\n` +
                   `• Connect with me through the Contact section\n\n` +
                   `Thank you for your understanding! 🙏`;
    
    alert(message);
}

// Location information with navigation
function showLocationInfo(event) {
    // Don't prevent navigation, just show additional info
    const message = `📍 Location: Kristiansand, Norway\n\n` +
                   `Navigating to Contact section for more details...`;
    
    // Show brief message
    setTimeout(() => {
        alert(message);
    }, 100);
    
    // Allow the link to navigate normally
    return true;
}

/*==================== SECTION VERIFICATION ====================*/
// Verify all navigation links work properly
document.addEventListener('DOMContentLoaded', function() {
    const navigationLinks = [
        { selector: 'a[href="#projects"]', target: '#projects', name: 'Projects' },
        { selector: 'a[href="#contact"]', target: '#contact', name: 'Contact' },
        { selector: 'a[href="#experience"]', target: '#experience', name: 'Experience' },
        { selector: 'a[href="#skills"]', target: '#skills', name: 'Skills' },
        { selector: 'a[href="#home"]', target: '#home', name: 'Home' }
    ];
    
    navigationLinks.forEach(link => {
        const linkElements = document.querySelectorAll(link.selector);
        const targetElement = document.querySelector(link.target);
        
        if (linkElements.length > 0 && !targetElement) {
            console.warn(`Warning: Links to ${link.name} (${link.target}) exist but target section not found!`);
        }
        
        if (linkElements.length > 0 && targetElement) {
            console.log(`✓ ${link.name} navigation verified: ${linkElements.length} link(s) → ${link.target}`);
        }
    });
});

/* Theme toggle */
(function(){
  const btn = document.getElementById('theme-toggle');
  if(!btn) return;
  const icon = document.getElementById('theme-toggle-icon');
  const DARK = 'dark-theme';
  const saved = localStorage.getItem('pref-theme');
  if(saved === 'dark') document.body.classList.add(DARK);
  update();
  btn.addEventListener('click', () => {
    document.body.classList.toggle(DARK);
    localStorage.setItem('pref-theme', document.body.classList.contains(DARK)?'dark':'light');
    update();
  });
  function update(){
    if(!icon) return;
    if(document.body.classList.contains(DARK)) {
      icon.classList.remove('fa-moon'); icon.classList.add('fa-sun');
    } else { icon.classList.remove('fa-sun'); icon.classList.add('fa-moon'); }
  }
})();
