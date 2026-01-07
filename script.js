/**
 * Project: Sabbir Hosen Akash Portfolio
 * Description: Fully integrated script for animations, effects and UI logic.
 */

// --- 1. Skeleton Loader Removal ---
// পেজ পুরোপুরি লোড হওয়ার পর লোডারটি ভ্যানিশ হয়ে যাবে
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// --- 2. Typing Effect ---
const textArray = ["Bangladeshi Musician", "Creative Writer", "Web Developer", "SEO Expert", "Professional Keyboardist"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingElement = document.getElementById("typing-effect");
    if (!typingElement) return;

    const currentText = textArray[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 60 : 120;

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // লেখা শেষ হলে ২ সেকেন্ড থামবে
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// --- 3. Initialize AOS (Scroll Animation) ---
AOS.init({
    duration: 1000,
    once: true,
    mirror: false,
    offset: 120
});

// --- 4. Swiper JS (Project Section Slider) ---
const swiper = new Swiper('.project-slider', {
    loop: true,
    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 30,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
});

// --- 5. 3D Skill Bar Animation on Scroll ---
const skillSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.fill-3d');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.style.getPropertyValue('--width');
        progressBar.style.width = value;
    });
}

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            showProgress();
        }
    });
}, { threshold: 0.3 });

if (skillSection) {
    skillObserver.observe(skillSection);
}

// --- 6. Mobile Menu Logic ---
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    if (navLinks) {
        navLinks.classList.toggle('active');
    }
}

// মেনুর লিঙ্কে ক্লিক করলে মেনু অটোমেটিক বন্ধ হবে (মোবাইল ভার্সনের জন্য)
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        const navLinks = document.getElementById('nav-links');
        if (navLinks) {
            navLinks.classList.remove('active');
        }
    });
});

// --- 7. Particles JS Config ---
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 60, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00ff88" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#00ff88", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { 
                "onhover": { "enable": true, "mode": "grab" }, 
                "onclick": { "enable": true, "mode": "push" } 
            },
            "modes": {
                "grab": { "distance": 200, "line_linked": { "opacity": 0.5 } }
            }
        },
        "retina_detect": true
    });
}

// --- 8. Initialization on DOM Content Loaded ---
document.addEventListener("DOMContentLoaded", () => {
    // ১ সেকেন্ড পর টাইপিং শুরু হবে
    setTimeout(typeEffect, 1000);
});
