// Smooth scroll for navigation links
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

// Navbar background on scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
    }

    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.about-card, .app-card, .ads-content, .contact-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add stagger delay to grid items
document.querySelectorAll('.about-grid .about-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Copy to clipboard functionality for code blocks
document.querySelectorAll('.code-window').forEach(codeWindow => {
    codeWindow.addEventListener('click', async (e) => {
        if (e.target.classList.contains('view-raw')) return;

        const code = codeWindow.querySelector('code').textContent;
        try {
            await navigator.clipboard.writeText(code);

            // Show feedback
            const feedback = document.createElement('div');
            feedback.textContent = 'Copied!';
            feedback.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: var(--color-success);
                color: white;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 500;
                z-index: 10000;
                animation: fadeInUp 0.3s ease;
            `;
            document.body.appendChild(feedback);

            setTimeout(() => {
                feedback.style.opacity = '0';
                feedback.style.transition = 'opacity 0.3s ease';
                setTimeout(() => feedback.remove(), 300);
            }, 2000);
        } catch (err) {
            console.log('Failed to copy:', err);
        }
    });
});

// Parallax effect for floating cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.floating-card');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    cards.forEach((card, index) => {
        const speed = (index + 1) * 10;
        const x = mouseX * speed;
        const y = mouseY * speed;
        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Reset floating cards position when mouse leaves
document.addEventListener('mouseleave', () => {
    document.querySelectorAll('.floating-card').forEach(card => {
        card.style.transform = 'translate(0, 0)';
    });
});

console.log('🚀 Developer Profile loaded successfully');

