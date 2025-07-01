// Hamburger menu toggle
function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

// Animated counter for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;
        
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current);
        }, 16);
    });
}

// Role text rotation
function initRoleRotation() {
    const roles = [
        'Software Developer',
        'Teaching Assistant', 
        'Computer Science Student',
        'Problem Solver',
        'Code Enthusiast'
    ];
    
    const roleElement = document.getElementById('roleText');
    let currentIndex = 0;
    
    if (roleElement) {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % roles.length;
            roleElement.style.opacity = '0';
            
            setTimeout(() => {
                roleElement.textContent = roles[currentIndex];
                roleElement.style.opacity = '1';
            }, 300);
        }, 3000);
    }
}

// Skill bars animation
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width;
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScrollEffect() {
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(255, 255, 255, 0.15)';
            nav.style.backdropFilter = 'blur(25px)';
        } else {
            nav.style.background = 'rgba(255, 255, 255, 0.1)';
            nav.style.backdropFilter = 'blur(20px)';
        }
    });
}

// Active navigation highlighting
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPos = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Hobby cards interaction
function initHobbyCards() {
    const hobbyCards = document.querySelectorAll('.hobby-card');
    
    hobbyCards.forEach(card => {
        card.addEventListener('click', () => {
            const detail = card.querySelector('.hobby-detail');
            const isHidden = detail.classList.contains('hidden');
            
            // Close all other hobby details
            hobbyCards.forEach(otherCard => {
                if (otherCard !== card) {
                    const otherDetail = otherCard.querySelector('.hobby-detail');
                    otherDetail.classList.add('hidden');
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Toggle current card
            if (isHidden) {
                detail.classList.remove('hidden');
                card.classList.add('expanded');
            } else {
                detail.classList.add('hidden');
                card.classList.remove('expanded');
            }
        });
    });
}

// Typing animation for the title
function initTypingAnimation() {
    const title = document.querySelector('.typing-animation');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.borderRight = '2px solid var(--accent-color)';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Blinking cursor animation
                setInterval(() => {
                    title.style.borderRight = title.style.borderRight === 'none' ? 
                        '2px solid var(--accent-color)' : 'none';
                }, 500);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
}

// Parallax effect for background elements
function initParallaxEffect() {
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Project card hover effects
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Contact form animation (if you add a form later)
function initContactAnimations() {
    const contactMethods = document.querySelectorAll('.contact-method');
    
    contactMethods.forEach((method, index) => {
        method.style.animationDelay = `${index * 0.1}s`;
        method.classList.add('fade-in-up');
    });
}

// Scroll reveal animation
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add animation classes
                entry.target.classList.add('reveal');
                
                // Animate stats when profile section is visible
                if (entry.target.id === 'profile') {
                    setTimeout(animateCounters, 500);
                }
                
                // Animate skill bars when experience section is visible
                if (entry.target.id === 'experience') {
                    setTimeout(animateSkillBars, 300);
                }
                
                // Animate project cards
                if (entry.target.id === 'projects') {
                    const projectCards = entry.target.querySelectorAll('.project-card');
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Preloader
function initPreloader() {
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
}

// Theme toggle (for future dark/light mode)
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', 
                document.body.classList.contains('light-theme') ? 'light' : 'dark'
            );
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
}

// Easter egg - Konami code
function initEasterEgg() {
    let konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                document.body.style.animation = 'rainbow 2s infinite';
                setTimeout(() => {
                    document.body.style.animation = '';
                }, 5000);
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Core functionality
    initRoleRotation();
    initSmoothScrolling();
    initNavbarScrollEffect();
    initActiveNavHighlight();
    initScrollReveal();
    
    // Interactive elements
    initHobbyCards();
    initProjectCardEffects();
    initContactAnimations();
    
    // Visual effects
    initTypingAnimation();
    initParallaxEffect();
    initPreloader();
    
    // Optional features
    initThemeToggle();
    initEasterEgg();
    
    // Performance optimization - delay heavy animations
    setTimeout(() => {
        document.body.classList.add('animations-loaded');
    }, 1000);
});

// Utility functions
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

// Optimized scroll handler
const optimizedScrollHandler = debounce(() => {
    // Add any performance-heavy scroll operations here
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

// Console greeting
console.log(`
🚀 Welcome to Albertus Ivan Wijaya's Portfolio!
📧 Contact: wialbertusivan@gmail.com
💼 LinkedIn: linkedin.com/in/albertus-ivan-wijaya-7b2219274
🐙 GitHub: github.com/Ivan-web-source

Try the Konami code for a surprise! ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️BA
`);