// Familie Saar Homepage JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 80; // Height of fixed header
                const elementPosition = targetSection.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100; // Add offset for header
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to current link
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // Throttled scroll event listener for better performance
    let ticking = false;
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                handleScrollAnimations();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Fade-in animations for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Add CSS classes for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
    
    // Apply animation classes to elements
    const animatedElements = [
        '.hero-subtitle',
        '.hero-photo',
        '.about-text',
        '.family-card'
    ];
    
    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            element.classList.add('fade-in-element');
            if (selector === '.family-card') {
                element.classList.add(`stagger-${(index % 4) + 1}`);
            }
            observer.observe(element);
        });
    });
    
    // Handle scroll animations
    function handleScrollAnimations() {
        const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        
        // Parallax effect for hero section
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            const parallaxSpeed = 0.5;
            heroSection.style.transform = `translateY(${window.scrollY * parallaxSpeed}px)`;
        }
    }
    
    // Family card hover effects
    const familyCards = document.querySelectorAll('.family-card');
    familyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Photo placeholder click interaction
    const photoPlaceholder = document.querySelector('.photo-placeholder');
    if (photoPlaceholder) {
        photoPlaceholder.addEventListener('click', function() {
            // Create a simple "photo upload" simulation
            const messages = [
                "📷 Taking a family photo...",
                "🌟 Smile everyone!",
                "❤️ Beautiful family!",
                "📸 Picture perfect!"
            ];
            
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            const originalContent = this.innerHTML;
            
            this.innerHTML = `<span style="font-size: 2rem;">${randomMessage.split(' ')[0]}</span><p>${randomMessage.split(' ').slice(1).join(' ')}</p>`;
            this.style.background = 'rgba(255, 255, 255, 0.2)';
            
            setTimeout(() => {
                this.innerHTML = originalContent;
                this.style.background = 'rgba(255, 255, 255, 0.1)';
            }, 2000);
        });
    }
    
    // Add a simple greeting based on time of day
    function updateGreeting() {
        const hour = new Date().getHours();
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroSubtitle && heroSubtitle.textContent === 'Welcome to our family homepage') {
            let greeting = 'Welcome to our family homepage';
            
            if (hour < 12) {
                greeting = 'Good morning! Welcome to our family homepage';
            } else if (hour < 17) {
                greeting = 'Good afternoon! Welcome to our family homepage';
            } else {
                greeting = 'Good evening! Welcome to our family homepage';
            }
            
            heroSubtitle.textContent = greeting;
        }
    }
    
    // Initialize greeting
    updateGreeting();
    
    // Add smooth hover effects to navigation
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Initialize scroll position check
    updateActiveNavLink();
    
    console.log('🏠 Familie Saar homepage loaded successfully!');
});

// Add a simple easter egg
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'F') {
        const familyCards = document.querySelectorAll('.family-card');
        familyCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'bounce 0.6s ease';
                setTimeout(() => {
                    card.style.animation = '';
                }, 600);
            }, index * 100);
        });
        
        // Add bounce animation
        if (!document.querySelector('#bounce-animation')) {
            const bounceStyle = document.createElement('style');
            bounceStyle.id = 'bounce-animation';
            bounceStyle.textContent = `
                @keyframes bounce {
                    0%, 20%, 53%, 80%, 100% { transform: translateY(0) scale(1); }
                    40%, 43% { transform: translateY(-30px) scale(1.1); }
                    70% { transform: translateY(-15px) scale(1.05); }
                    90% { transform: translateY(-4px) scale(1.02); }
                }
            `;
            document.head.appendChild(bounceStyle);
        }
    }
}); 