// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initMobileMenu();
    initTabs();
    initSmoothScrolling();
    initAnimations();
    initButtonHovers();
});

// Mobile Menu Toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.btn-hamburger');
    const nav = document.querySelector('.nav');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function() {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (nav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
}

// Tab Functionality
function initTabs() {
    const tabs = document.querySelectorAll('.tab');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Here you could add functionality to show/hide different speaker content
            // For now, we'll just handle the visual state
        });
    });
}
document.querySelectorAll('.dropbtn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        // Close other dropdowns
        document.querySelectorAll('.dropdown').forEach(d => {
            if (d !== this.parentElement) d.classList.remove('open');
        });
        // Toggle this dropdown
        this.parentElement.classList.toggle('open');
    });
});

// Close dropdown when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
    }
});
// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Skip if it's just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();

                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.speaker-card, .speaker-card-large, .news-card, .testimonial, .cta-card, .future-card');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Button Hover Effects
function initButtonHovers() {
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Statistics Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/,/g, ''));
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 20);
    });
}

// Initialize counter animation when stats section is visible
function initStatsAnimation() {
    const statsSection = document.querySelector('.hero-stats');

    if (statsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(statsSection);
    }
}

// Speaker Card Interactions
function initSpeakerCards() {
    const speakerCards = document.querySelectorAll('.speaker-card, .speaker-card-large');

    speakerCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        });

        // Add click event for potential modal or navigation
        card.addEventListener('click', function() {
            const speakerName = this.querySelector('h3').textContent;
            console.log('Clicked on speaker:', speakerName);
            // Here you could open a modal or navigate to speaker details
        });
    });
}

// Form Handling (if any forms are added)
function initFormHandling() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Basic form validation
            const inputs = form.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '';
                }
            });

            if (isValid) {
                // Handle form submission
                console.log('Form submitted successfully');
                // Here you would typically send the data to a server
            } else {
                console.log('Form validation failed');
            }
        });
    });
}

// Search Functionality (if search is added)
function initSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchableItems = document.querySelectorAll('.speaker-card, .speaker-card-large');

    if (searchInput && searchableItems.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();

            searchableItems.forEach(item => {
                const name = item.querySelector('h3').textContent.toLowerCase();
                const title = item.querySelector('.title').textContent.toLowerCase();
                const company = item.querySelector('.company').textContent.toLowerCase();

                if (name.includes(searchTerm) || title.includes(searchTerm) || company.includes(searchTerm)) {
                    item.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Navigation Highlighting
function initNavigationHighlighting() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');

                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`.nav-list a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => observer.observe(section));
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 1000;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    `;

    document.body.appendChild(backToTopBtn);

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Hover effects
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.1)';
    });

    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
}

// Loading Screen
function initLoadingScreen() {
    window.addEventListener('load', function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 300);
        }
    });
}

// Initialize additional features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initStatsAnimation();
    initSpeakerCards();
    initFormHandling();
    initSearch();
    initLazyLoading();
    initNavigationHighlighting();
    initBackToTop();
    initLoadingScreen();
});

// Performance optimization - debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const debouncedScrollHandler = debounce(function() {
    // Handle scroll-based functionality here
    console.log('Scroll event fired');
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Browser compatibility checks
function checkBrowserSupport() {
    // Check for IntersectionObserver support
    if (!('IntersectionObserver' in window)) {
        console.log('IntersectionObserver not supported, using fallback');
        // Implement fallback for older browsers
    }

    // Check for CSS Grid support
    if (!CSS.supports('display', 'grid')) {
        console.log('CSS Grid not supported, using fallback');
        document.body.classList.add('no-grid-support');
    }
}

// Initialize browser compatibility checks
checkBrowserSupport();
