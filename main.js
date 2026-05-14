// Typing Effect
const typeText = document.getElementById('type-text');
const phrases = ['Java Developer', 'Web Developer', 'Problem Solver', 'Open Source Contributor'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typeText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Scroll Reveal
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    reveal();
});

// High-Performance Smooth Cursor Logic
const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let blurX = 0;
let blurY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    const size = cursor.classList.contains('hovering') ? 80 : 40;
    
    // Lerp smoothing
    cursorX += (mouseX - size/2 - cursorX) * 0.15;
    cursorY += (mouseY - size/2 - cursorY) * 0.15;
    
    blurX += (mouseX - blurX) * 0.08;
    blurY += (mouseY - blurY) * 0.08;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorBlur.style.transform = `translate(${blurX}px, ${blurY}px)`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Detecting text for "Scanning" effect
const textElements = document.querySelectorAll('h1, h2, h3, p, a, button, li, .skill-item, .project-card, .timeline-item');
textElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
});

// Particles Logic (Light Theme Pastel version)
const particlesContainer = document.getElementById('particles-js');
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 8 + 3;
    
    // Updated Pastel Colors
    const colors = ['#fff7ed', '#f5f3ff', '#f0fdfa', '#f0f9ff', '#fef3c7'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.position = 'absolute';
    particle.style.background = color;
    particle.style.border = '1px solid rgba(0,0,0,0.05)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = Math.random() * 100 + 'vh';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '-1';
    
    particlesContainer.appendChild(particle);
    
    const animation = particle.animate([
        { transform: 'translateY(0) scale(1)', opacity: 0.6 },
        { transform: `translateY(-${Math.random() * 300 + 100}px) rotate(360deg) scale(0)`, opacity: 0 }
    ], {
        duration: Math.random() * 8000 + 7000,
        easing: 'ease-out'
    });
    
    animation.onfinish = () => particle.remove();
}

setInterval(createParticle, 400);

// Project & Experience Card Parallax Tilt
const cards = document.querySelectorAll('.glass-card');
cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 15;
        const rotateY = (centerX - x) / 15;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        // Inner element parallax effect
        const elements = card.querySelectorAll('h3, p, .project-link, .timeline-date');
        elements.forEach(el => {
            el.style.transform = 'translateZ(40px)';
        });
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        const elements = card.querySelectorAll('h3, p, .project-link, .timeline-date');
        elements.forEach(el => {
            el.style.transform = 'translateZ(0px)';
        });
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        formStatus.textContent = 'Sending...';
        formStatus.className = '';

        try {
            const response = await fetch('https://formspree.io/f/xdabvyvo', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                },
                body: formData,
            });

            if (response.ok) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.className = 'status-success';
                contactForm.reset();
            } else {
                throw new Error('Failed to send message');
            }
        } catch (error) {
            formStatus.textContent = 'Error sending message. Please try again.';
            formStatus.className = 'status-error';
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    type();
    reveal(); // Initial check for elements in view
});
