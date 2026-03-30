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
// ========== STATE VARIABLES ==========
let currentCarouselIndex = 0;
// ========== HEADER & SCROLL EFFECTS ==========
window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Scroll reveal animations
    revealElementsOnScroll();
});

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
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
        const response = await fetch('https://formspree.io/f/xykbeelz', {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            const name = document.getElementById('name').value;
            showFormMessage(`Thank you, ${name}! We'll contact you soon.`, true);
            contactForm.style.display = 'none';
            setTimeout(() => {
                closeContactModal();
                contactForm.style.display = 'block';
            }, 3000);
        } else {
            showFormMessage('Something went wrong. Please try again.', false);
            submitBtn.textContent = 'Send Message';
            submitBtn.disabled = false;
        }
    } catch (err) {
        showFormMessage('Network error. Please check your connection.', false);
        submitBtn.textContent = 'Send Message';
        submitBtn.disabled = false;
    }
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
document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".slide");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  let index = 0;
  let autoSlide;

  function updateSlide() {
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function nextSlide() {
    index = (index + 1) % slides.length;
    updateSlide();
  }

  function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateSlide();
  }

  // Button controls
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetAutoSlide();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetAutoSlide();
  });

  // 🔥 Auto Slide every 3 seconds
  function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 3000);
  }

  function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
  }

  startAutoSlide();
});
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

    if (prevBtn && nextBtn) {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    }
});

// ========== TOUCH SWIPE FOR CAROUSEL (Mobile) ==========
let touchStartX = 0;
let touchEndX = 0;

function handleSwipe() {
    if (!prevBtn || !nextBtn) return;
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) nextBtn.click();
        else prevBtn.click();
    }
}

if (carousel && prevBtn && nextBtn) {
    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
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

// ========== HOW WE WORK: TIMELINE (smooth scroll-in animation) ==========
const HWW_IO_OPTS = { root: null, rootMargin: '0px 0px -8% 0px', threshold: [0, 0.12, 0.25] };
let hwwTimelineObserver = null;

function setupHwwTimelineObserver() {
    if (hwwTimelineObserver) {
        hwwTimelineObserver.disconnect();
        hwwTimelineObserver = null;
    }

    const stepsToWatch = document.querySelectorAll('.hww-panel.active .hww-step');
    if (!stepsToWatch.length) {
        return;
    }

    hwwTimelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const step = entry.target;
            const panel = step.closest('.hww-panel');
            if (panel && !panel.classList.contains('active')) return;

            const timeline = step.closest('.hww-timeline');
            const ordered = timeline ? [...timeline.querySelectorAll('.hww-step')] : [step];
            const idx = ordered.indexOf(step);
            const staggerMs = Math.max(0, idx) * 100;

            window.setTimeout(() => {
                step.classList.add('visible');
            }, staggerMs);

            hwwTimelineObserver.unobserve(step);
        });
    }, HWW_IO_OPTS);

    stepsToWatch.forEach((step) => {
        if (!step.classList.contains('visible')) {
            hwwTimelineObserver.observe(step);
        }
    });
}

// ========== HOW WE WORK: TABS ==========
document.querySelectorAll('.hww-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.hww-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.hww-panel').forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.getElementById('hww-' + tab.dataset.hww);
        if (panel) {
            panel.classList.add('active');
            document.querySelectorAll('.hww-panel .hww-step').forEach(s => s.classList.remove('visible'));
            window.setTimeout(() => setupHwwTimelineObserver(), 60);
        }
    });
});

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    setupHwwTimelineObserver();

    console.log('%c🎨 Premium Company Website Loaded', 'color: #D4AF37; font-size: 16px; font-weight: bold;');
    console.log('%cDesigned & Built with ❤️', 'color: #0F3D3E; font-size: 12px;');

    revealElementsOnScroll();

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

//========PROCESS SECTION ANIMATION WITH INTERSECTION OBSERVER=========
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;

    reveals.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

  const steps = document.querySelectorAll('.step');
  const trackFill = document.getElementById('trackFill');
  const track = document.querySelector('.timeline-track');
 
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const delay = parseInt(e.target.dataset.delay || 0);
        setTimeout(() => e.target.classList.add('visible'), delay);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
 
  steps.forEach(s => io.observe(s));
 
  function updateTrack() {
    if (!track) return;
    const tRect = track.getBoundingClientRect();
    const vh = window.innerHeight;
    const trackTop = tRect.top;
    const trackH = tRect.height;
    const progress = Math.min(1, Math.max(0, (vh * 0.85 - trackTop) / trackH));
    trackFill.style.height = (progress * 100) + '%';
  }
 
  window.addEventListener('scroll', updateTrack, { passive: true });
  updateTrack();