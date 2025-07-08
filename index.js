// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (!name || !email || !subject || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you! Your message has been sent successfully.', 'success');
        this.reset();
    });
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6b7280'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
        }
        
        .notification-close:hover {
            opacity: 0.8;
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.service-card, .portfolio-item, .stat');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                setTimeout(updateCounter, 20);
            } else {
                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Portfolio item hover effects
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.service-icon i');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
        icon.style.transition = 'transform 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.service-icon i');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Back to top button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #374151;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

document.body.appendChild(backToTopBtn);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add hover effect to back to top button
backToTopBtn.addEventListener('mouseenter', () => {
    backToTopBtn.style.background = '#6b7280';
    backToTopBtn.style.transform = 'translateY(-2px)';
});

backToTopBtn.addEventListener('mouseleave', () => {
    backToTopBtn.style.background = '#374151';
    backToTopBtn.style.transform = 'translateY(0)';
});

// FAQ Accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const answer = faqItem.querySelector('.faq-answer');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
                const otherAnswer = item.querySelector('.faq-answer');
                otherAnswer.style.maxHeight = '0';
            }
        });
        
        // Toggle current FAQ item
        faqItem.classList.toggle('active');
        
        if (faqItem.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = '0';
        }
    });
});

// Initialize FAQ answers with max-height: 0
document.querySelectorAll('.faq-answer').forEach(answer => {
    answer.style.maxHeight = '0';
    answer.style.overflow = 'hidden';
    answer.style.transition = 'max-height 0.3s ease';
});

// Enhanced form handling for contact page
const contactFormDetailed = document.querySelector('.contact-form-detailed');
if (contactFormDetailed) {
    contactFormDetailed.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const firstName = this.querySelector('#firstName').value;
        const lastName = this.querySelector('#lastName').value;
        const email = this.querySelector('#email').value;
        const phone = this.querySelector('#phone').value;
        const company = this.querySelector('#company').value;
        const service = this.querySelector('#service').value;
        const budget = this.querySelector('#budget').value;
        const message = this.querySelector('#message').value;
        const newsletter = this.querySelector('input[name="newsletter"]').checked;
        
        // Basic validation
        if (!firstName || !lastName || !email || !message) {
            showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.', 'success');
        this.reset();
    });
}

// Pricing card hover effects
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        if (!card.classList.contains('featured')) {
            card.style.transform = 'translateY(0) scale(1)';
        }
    });
});

// Technology item hover effects
document.querySelectorAll('.technology-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        const icon = item.querySelector('.technology-icon i');
        icon.style.transform = 'scale(1.2)';
        icon.style.transition = 'transform 0.3s ease';
    });
    
    item.addEventListener('mouseleave', () => {
        const icon = item.querySelector('.technology-icon i');
        icon.style.transform = 'scale(1)';
    });
});

// Process step animations
const processSteps = document.querySelectorAll('.process-step');
const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.5 });

processSteps.forEach(step => {
    step.style.opacity = '0';
    step.style.transform = 'translateY(30px)';
    step.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    processObserver.observe(step);
});

// Team member hover effects
document.querySelectorAll('.team-member').forEach(member => {
    member.addEventListener('mouseenter', () => {
        const socialLinks = member.querySelector('.member-social');
        socialLinks.style.opacity = '1';
        socialLinks.style.transform = 'translateY(0)';
    });
    
    member.addEventListener('mouseleave', () => {
        const socialLinks = member.querySelector('.member-social');
        socialLinks.style.opacity = '0.7';
        socialLinks.style.transform = 'translateY(5px)';
    });
});

// Initialize team member social links
document.querySelectorAll('.member-social').forEach(social => {
    social.style.opacity = '0.7';
    social.style.transform = 'translateY(5px)';
    social.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
});

// Language Switcher Functionality
const languageSwitcher = {
    currentLang: 'is', // Default to Icelandic
    
    init() {
        this.bindEvents();
        this.loadLanguage();
    },
    
    bindEvents() {
        const buttons = document.querySelectorAll('.lang-btn');
        console.log('Found language buttons:', buttons.length);
        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                console.log('Language button clicked:', lang);
                this.switchLanguage(lang);
            });
        });
    },
    
    switchLanguage(lang) {
        console.log('Switching to language:', lang);
        this.currentLang = lang;
        
        // Update button states
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Update all translatable elements
        const translatableElements = document.querySelectorAll('[data-en][data-is]');
        console.log('Found translatable elements:', translatableElements.length);
        translatableElements.forEach(element => {
            if (element.dataset[lang]) {
                element.textContent = element.dataset[lang];
            }
        });
        
        // Update navigation links
        this.updateNavigation(lang);
        
        // Save language preference
        localStorage.setItem('preferred-language', lang);
        
        // Update page title
        this.updatePageTitle(lang);
        
        // Update form placeholders and labels
        this.updateFormElements(lang);
        
        // Update footer content
        this.updateFooter(lang);
    },
    
    updateNavigation(lang) {
        // Update navigation menu items using data attributes
        const navItems = document.querySelectorAll('.nav-link');
        console.log('Found navigation items:', navItems.length);
        navItems.forEach((item) => {
            console.log('Nav item:', item.textContent, 'data-en:', item.dataset.en, 'data-is:', item.dataset.is);
            if (item.dataset[lang]) {
                item.textContent = item.dataset[lang];
                console.log('Updated nav item to:', item.dataset[lang]);
            }
        });
    },
    
    updateFormElements(lang) {
        const formElements = {
            'en': {
                'name': 'Your Name',
                'email': 'Your Email',
                'subject': 'Subject',
                'message': 'Your Message',
                'send': 'Send Message',
                'backToHome': '← Back to Home'
            },
            'is': {
                'name': 'Nafn þitt',
                'email': 'Netfang þitt',
                'subject': 'Efni',
                'message': 'Skilaboð þín',
                'send': 'Senda skilaboð',
                'backToHome': '← Til baka'
            }
        };
        
        // Update form inputs
        const inputs = document.querySelectorAll('input[placeholder]');
        inputs.forEach(input => {
            const key = input.getAttribute('data-field');
            if (key && formElements[lang][key]) {
                input.placeholder = formElements[lang][key];
            }
        });
        
        // Update textareas
        const textareas = document.querySelectorAll('textarea[placeholder]');
        textareas.forEach(textarea => {
            const key = textarea.getAttribute('data-field');
            if (key && formElements[lang][key]) {
                textarea.placeholder = formElements[lang][key];
            }
        });
        
        // Update buttons
        const buttons = document.querySelectorAll('button[type="submit"]');
        buttons.forEach(button => {
            if (button.textContent.includes('Send Message')) {
                button.textContent = formElements[lang]['send'];
            }
        });
        
        // Update back to home buttons
        const backButtons = document.querySelectorAll('.btn-secondary');
        backButtons.forEach(btn => {
            if (btn.textContent.includes('Back to Home')) {
                btn.textContent = formElements[lang]['backToHome'];
            }
        });
    },
    
    updateFooter(lang) {
        const footerContent = {
            'en': {
                'description': 'Creating exceptional digital experiences that drive business growth and success.',
                'services': 'Services',
                'company': 'Company',
                'contactInfo': 'Contact Info',
                'rights': 'All rights reserved.'
            },
            'is': {
                'description': 'Sköpun undantekninga stafrænna upplifana sem knýja framgang og árangur fyrirtækja.',
                'services': 'Þjónusta',
                'company': 'Fyrirtæki',
                'contactInfo': 'Upplýsingar',
                'rights': 'Öll réttindi áskilin.'
            }
        };
        
        // Update footer description
        const footerDesc = document.querySelector('.footer-section p');
        if (footerDesc && !footerDesc.querySelector('a')) {
            footerDesc.textContent = footerContent[lang]['description'];
        }
        
        // Update footer section headers
        const footerHeaders = document.querySelectorAll('.footer-section h3');
        footerHeaders.forEach((header, index) => {
            const keys = ['services', 'company', 'contactInfo'];
            if (keys[index] && footerContent[lang][keys[index]]) {
                header.textContent = footerContent[lang][keys[index]];
            }
        });
    },
    
    updatePageTitle(lang) {
        const titles = {
            'en': 'AurenicMedia - Professional Web Development',
            'is': 'AurenicMedia - Fagleg vefþróun'
        };
        document.title = titles[lang];
    },
    
    loadLanguage() {
        const savedLang = localStorage.getItem('preferred-language');
        if (savedLang) {
            this.switchLanguage(savedLang);
        }
    }
};

// Cookie Consent Functionality
const cookieConsent = {
    init() {
        this.checkConsent();
        this.bindEvents();
    },
    
    checkConsent() {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            this.showBanner();
        }
    },
    
    showBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            setTimeout(() => {
                banner.classList.add('show');
            }, 1000); // Show after 1 second
        }
    },
    
    hideBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('show');
        }
    },
    
    acceptCookies() {
        localStorage.setItem('cookie-consent', 'accepted');
        this.hideBanner();
        console.log('Cookies accepted');
    },
    
    declineCookies() {
        localStorage.setItem('cookie-consent', 'declined');
        this.hideBanner();
        console.log('Cookies declined');
    },
    
    bindEvents() {
        const acceptBtn = document.getElementById('accept-cookies');
        const declineBtn = document.getElementById('decline-cookies');
        
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                this.acceptCookies();
            });
        }
        
        if (declineBtn) {
            declineBtn.addEventListener('click', () => {
                this.declineCookies();
            });
        }
    }
};

// Initialize language switcher
document.addEventListener('DOMContentLoaded', () => {
    languageSwitcher.init();
    cookieConsent.init();
});
