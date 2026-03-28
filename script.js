/* ========================================
   ADVANCED PREMIUM COMPANY WEBSITE
   script.js - Complete Interactivity & Animations
   ======================================== */

// ========== DOM ELEMENTS ==========
const header = document.querySelector('.header');
const contactBtn = document.getElementById('contactBtn');
const contactModal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
const serviceCards = document.querySelectorAll('.service-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const carousel = document.querySelector('.achievements-carousel');
const carouselItems = document.querySelectorAll('.carousel-item');
const dropdownItems = document.querySelectorAll('.dropdown-item');

// ========== STATE VARIABLES ==========
let currentCarouselIndex = 0;
// ========== HEADER & SCROLL EFFECTS ==========
// window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Scroll reveal animations
//     revealElementsOnScroll();
// });

// ========== SCROLL REVEAL ANIMATIONS ==========
function revealElementsOnScroll() {
    const elements = document.querySelectorAll(
        '.service-card, .about-image, .about-text, .why-card, .process-step, .testimonial-card, .client-logo'
    );

    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementPosition < windowHeight - 100) {
            element.classList.add('fade-in-up');
        }
    });
}

// ========== MODAL FUNCTIONALITY ==========
contactBtn.addEventListener('click', openModal);
closeModal.addEventListener('click', closeContactModal);

function openModal() {
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    contactModal.classList.remove('active');
    document.body.style.overflow = 'auto';
    contactForm.reset();
    formMessage.classList.remove('show');
}

// Close modal on background click
contactModal.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        closeContactModal();
    }
});

// ========== CONTACT FORM HANDLING ==========
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const reason = document.getElementById('reason').value;

    // Validate form
    if (!name || !email || !phone || !address || !reason) {
        showFormMessage('Please fill in all fields.', false);
        return;
    }

    // Show success message
    showFormMessage(`Thank you, ${name}! We'll contact you soon.`, true);

    // Hide form and show message
    contactForm.style.display = 'none';

    // Reset after 3 seconds and close modal
    setTimeout(() => {
        closeContactModal();
        contactForm.style.display = 'block';
    }, 3000);
});

function showFormMessage(message, isSuccess) {
    formMessage.textContent = message;
    formMessage.classList.add('show');
    formMessage.style.color = isSuccess ? '#0F3D3E' : '#e74c3c';
}

// ========== HAMBURGER MENU ==========
hamburger.addEventListener('click', toggleMobileMenu);

function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
}

const NAV_MOBILE_BREAKPOINT = 992;

window.addEventListener('resize', () => {
    if (window.innerWidth > NAV_MOBILE_BREAKPOINT) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Close mobile menu on link click (skip dropdown toggles)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (link.classList.contains('dropdown-toggle')) return;
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ========== NAVIGATION ACTIVE STATE ==========
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        if (link.classList.contains('dropdown-toggle')) return;
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ========== DROPDOWN MENU HANDLING ==========
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const dropdown = toggle.closest('.dropdown');
        const isActive = dropdown.classList.contains('active');

        // Close all dropdowns
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));

        // Toggle current dropdown
        if (!isActive) dropdown.classList.add('active');
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    }
});

// ========== SERVICE DROPDOWN ITEMS ==========
dropdownItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const service = item.getAttribute('data-service');
        showService(service);
    });
});

function showService(serviceType) {
    // Remove active-page from all service details
    document.querySelectorAll('#service-view .service-detail').forEach(s => s.classList.remove('active-page'));

    // Activate the selected one
    const detailSection = document.getElementById(`detail-${serviceType}`);
    if (detailSection) detailSection.classList.add('active-page');

    // Swap views
    document.getElementById('main-view').style.display = 'none';
    document.getElementById('main-view-rest').style.display = 'none';
    document.getElementById('service-view').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });

    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}

function closeService() {
    document.getElementById('service-view').style.display = 'none';
    document.getElementById('main-view').style.display = 'block';
    document.getElementById('main-view-rest').style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========== CAROUSEL FUNCTIONALITY ==========
prevBtn.addEventListener('click', () => {
    currentCarouselIndex = (currentCarouselIndex - 1 + carouselItems.length) % carouselItems.length;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentCarouselIndex = (currentCarouselIndex + 1) % carouselItems.length;
    updateCarousel();
});

function updateCarousel() {
    const translateX = -currentCarouselIndex * 100;
    carousel.style.transform = `translateX(${translateX}%)`;
}

// Auto-slide carousel every 5 seconds
setInterval(() => {
    if (!document.hidden) {
        currentCarouselIndex = (currentCarouselIndex + 1) % carouselItems.length;
        updateCarousel();
    }
}, 5000);

// ========== SMOOTH SCROLL TO SECTIONS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && !href.includes('data-service')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                setTimeout(() => {
                    target.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    });
});

// ========== PARALLAX SCROLL EFFECT ==========
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(element => {
        const speed = element.getAttribute('data-parallax') || 0.5;
        element.style.transform = `translateY(${scrollY * speed}px)`;
    });
});

// ========== COUNTER ANIMATION FOR HIGHLIGHTS ==========
function animateCounters() {
    const countElements = document.querySelectorAll('.number');

    countElements.forEach(element => {
        const finalValue = element.textContent;
        const numericValue = parseInt(finalValue);

        if (isNaN(numericValue)) return;

        let currentValue = 0;
        const increment = Math.ceil(numericValue / 20);
        const interval = setInterval(() => {
            currentValue += increment;
            if (currentValue >= numericValue) {
                element.textContent = finalValue;
                clearInterval(interval);
            } else {
                element.textContent = currentValue + (finalValue.includes('%') ? '%' : '')
                    .replace(/\d+/, currentValue);
            }
        }, 30);
    });
}

// Trigger counter animation when scrolling to the about section
const aboutSection = document.querySelector('.about');
let aboutSectionAnimated = false;

window.addEventListener('scroll', () => {
    if (!aboutSectionAnimated && aboutSection) {
        const rect = aboutSection.getBoundingClientRect();
        if (rect.top < window.innerHeight) {
            animateCounters();
            aboutSectionAnimated = true;
        }
    }
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('service-card')) {
                entry.target.classList.add('fade-in-up');
            }
            if (entry.target.classList.contains('testimonial-card')) {
                entry.target.classList.add('fade-in-up');
            }
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .testimonial-card, .why-card').forEach(element => {
    observer.observe(element);
});

// ========== KEYBOARD NAVIGATION ==========
document.addEventListener('keydown', (e) => {
    // Close modal with Escape key
    if (e.key === 'Escape' && contactModal.classList.contains('active')) {
        closeContactModal();
    }

    // Navigate carousel with arrow keys
    if (e.key === 'ArrowLeft') {
        prevBtn.click();
    }
    if (e.key === 'ArrowRight') {
        nextBtn.click();
    }
});

// ========== TOUCH SWIPE FOR CAROUSEL (Mobile) ==========
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

carousel.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            nextBtn.click(); // Swiped left
        } else {
            prevBtn.click(); // Swiped right
        }
    }
}

// ========== SCROLL HINT ANIMATION ==========
const scrollHint = document.getElementById('scrollHint');

if (scrollHint) {
    scrollHint.style.display = 'block';

    // Hide scroll hint after scrolling
    let scrollHintShown = true;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100 && scrollHintShown) {
            fadeOut(scrollHint);
            scrollHintShown = false;
        }
    });

    // Click scroll hint to go to about section
    scrollHint.addEventListener('click', () => {
        const aboutSection = document.querySelector('.about');
        aboutSection.scrollIntoView({ behavior: 'smooth' });
    });
}

function fadeOut(element) {
    element.style.opacity = '0';
    element.style.pointerEvents = 'none';
    element.style.transition = 'opacity 0.3s ease';
}

// ========== PAGE LOAD ANIMATION ==========
window.addEventListener('load', () => {
    // Trigger initial animations
    revealElementsOnScroll();

    // Add stagger animation to service cards
    const cards = document.querySelectorAll('.service-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// ========== PERFORMANCE OPTIMIZATIONS ==========
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        // Debounce scroll events
    }, 100);
}, { passive: true });

// ========== PREVENT LAYOUT SHIFT ==========
document.addEventListener('DOMContentLoaded', () => {
    // Ensure all images have aspect ratios
    document.querySelectorAll('img').forEach(img => {
        if (img.naturalHeight > 0) {
            const aspectRatio = img.naturalWidth / img.naturalHeight;
            img.style.aspectRatio = aspectRatio;
        }
    });
});

// ========== UTILITY FUNCTION: ADD CLASS WITH DELAY ==========
function addClassWithDelay(element, className, delay) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}

// ========== PRINT FRIENDLY ==========
if (window.matchMedia) {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    darkModeQuery.addEventListener('change', (e) => {
        if (e.matches) {
            document.documentElement.style.colorScheme = 'dark';
        } else {
            document.documentElement.style.colorScheme = 'light';
        }
    });
}

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🎨 Premium Company Website Loaded', 'color: #D4AF37; font-size: 16px; font-weight: bold;');
    console.log('%cDesigned & Built with ❤️', 'color: #0F3D3E; font-size: 12px;');

    // Initialize all sections
    revealElementsOnScroll();

    // Smooth initial page load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========== ACCESSIBILITY IMPROVEMENTS ==========
// Add focus visible styles
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ========== READY STATE ==========
console.log('✅ All JavaScript features initialized and ready!');
