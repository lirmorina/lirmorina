// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll and active link highlighting
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Update navbar background
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
    }
    
    // Highlight active navigation link
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) navLink.classList.add('active');
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.about-content, .skills-grid, .projects-grid, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Add slide animations to specific elements
    const slideLeftElements = document.querySelectorAll('.about-text, .contact-info');
    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });

    const slideRightElements = document.querySelectorAll('.about-visual, .contact-form');
    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });
});

// Skill bars animation
const skillBars = document.querySelectorAll('.skill-progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target;
            const width = progressBar.getAttribute('data-width');
            progressBar.style.width = width + '%';
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});

// Typing effect for hero title
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

// Initialize typing effect when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title .gradient-text');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Parallax effect for floating cards
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// Form handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
    });
}

// Email validation
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
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Add notification styles to head
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
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
document.head.appendChild(notificationStyles);

// Particle background effect
function createParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    
    document.body.appendChild(particlesContainer);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(99, 102, 241, 0.3);
            border-radius: 50%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation styles
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float-particle {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// Initialize particles
window.addEventListener('load', createParticles);

// Cursor trail effect
let mouseX = 0;
let mouseY = 0;
let cursorTrail = [];

function createCursorTrail() {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--accent-color);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all 0.1s ease;
    `;
    document.body.appendChild(trail);
    return trail;
}

const cursorTrailElement = createCursorTrail();

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursorTrailElement.style.left = mouseX - 3 + 'px';
    cursorTrailElement.style.top = mouseY - 3 + 'px';
});

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .project-card, .skill-tag').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorTrailElement.style.transform = 'scale(2)';
        cursorTrailElement.style.background = 'var(--primary-color)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursorTrailElement.style.transform = 'scale(1)';
        cursorTrailElement.style.background = 'var(--accent-color)';
    });
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Add some random animations to skill tags
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.classList.add('fade-in');
    observer.observe(tag);
});

// Smooth reveal animation for project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
    card.classList.add('fade-in');
    observer.observe(card);
});

// WebGL Shape Blur Effect for Project Card Borders
class ShapeBlur {
    constructor(container, options = {}) {
        this.container = container;
        this.options = {
            variation: options.variation || 0,
            pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
            shapeSize: options.shapeSize || 1.2,
            roundness: options.roundness || 0.4,
            borderSize: options.borderSize || 0.05,
            circleSize: options.circleSize || 0.3,
            circleEdge: options.circleEdge || 0.5
        };
        
        this.vMouse = new THREE.Vector2();
        this.vMouseDamp = new THREE.Vector2();
        this.vResolution = new THREE.Vector2();
        this.time = 0;
        this.lastTime = 0;
        
        this.init();
    }
    
    init() {
        // Create scene
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera();
        this.camera.position.z = 1;
        
        // Create renderer
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setClearColor(0x000000, 0);
        this.container.appendChild(this.renderer.domElement);
        
        // Create shader material
        const vertexShader = `
            varying vec2 v_texcoord;
            void main() {
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                v_texcoord = uv;
            }
        `;
        
        const fragmentShader = `
            varying vec2 v_texcoord;
            uniform vec2 u_mouse;
            uniform vec2 u_resolution;
            uniform float u_pixelRatio;
            uniform float u_shapeSize;
            uniform float u_roundness;
            uniform float u_borderSize;
            uniform float u_circleSize;
            uniform float u_circleEdge;
            
            #define PI 3.1415926535897932384626433832795
            #define TWO_PI 6.2831853071795864769252867665590
            
            vec2 coord(in vec2 p) {
                p = p / u_resolution.xy;
                if (u_resolution.x > u_resolution.y) {
                    p.x *= u_resolution.x / u_resolution.y;
                    p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
                } else {
                    p.y *= u_resolution.y / u_resolution.x;
                    p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
                }
                p -= 0.5;
                p *= vec2(-1.0, 1.0);
                return p;
            }
            
            float sdRoundRect(vec2 p, vec2 b, float r) {
                vec2 d = abs(p) - b + vec2(r);
                return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
            }
            
            float sdCircle(in vec2 st, in vec2 center) {
                return length(st - center) * 2.0;
            }
            
            float fill(float x, float size, float edge) {
                return 1.0 - smoothstep(size - edge, size + edge, x);
            }
            
            float strokeAA(float x, float size, float w, float edge) {
                float afwidth = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;
                float d = smoothstep(size - edge - afwidth, size + edge + afwidth, x + w * 0.5)
                        - smoothstep(size - edge - afwidth, size + edge + afwidth, x - w * 0.5);
                return clamp(d, 0.0, 1.0);
            }
            
            void main() {
                vec2 st = coord(gl_FragCoord.xy);
                vec2 posMouse = coord(u_mouse * u_pixelRatio) * vec2(1., -1.);
                
                float sdfCircle = fill(sdCircle(st + 0.5, posMouse + 0.5), u_circleSize, u_circleEdge);
                
                // Calculate aspect ratio
                float aspect = u_resolution.x / u_resolution.y;
                vec2 size = vec2(aspect * u_shapeSize, u_shapeSize);
                
                float sdf = sdRoundRect(st, size, u_roundness);
                sdf = strokeAA(sdf, 0.0, u_borderSize, sdfCircle) * 4.0;
                
                vec3 color = vec3(1.0);
                float alpha = sdf;
                gl_FragColor = vec4(color.rgb, alpha);
            }
        `;
        
        const geometry = new THREE.PlaneGeometry(1, 1);
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms: {
                u_mouse: { value: this.vMouseDamp },
                u_resolution: { value: this.vResolution },
                u_pixelRatio: { value: this.options.pixelRatio },
                u_shapeSize: { value: this.options.shapeSize },
                u_roundness: { value: this.options.roundness },
                u_borderSize: { value: this.options.borderSize },
                u_circleSize: { value: this.options.circleSize },
                u_circleEdge: { value: this.options.circleEdge }
            },
            transparent: true
        });
        
        this.quad = new THREE.Mesh(geometry, this.material);
        this.scene.add(this.quad);
        
        // Bind mouse move event to parent card
        this.card = this.container.closest('.project-card');
        this.onPointerMove = this.handlePointerMove.bind(this);
        
        // Resize
        this.resize();
        
        // Start animation
        this.animate();
    }
    
    handlePointerMove(e) {
        const rect = this.card.getBoundingClientRect();
        this.vMouse.set(e.clientX - rect.left, e.clientY - rect.top);
    }
    
    resize() {
        const w = this.container.clientWidth;
        const h = this.container.clientHeight;
        const dpr = this.options.pixelRatio;
        
        this.renderer.setSize(w, h, false);
        this.renderer.setPixelRatio(dpr);
        
        // Set canvas style to match container exactly
        this.renderer.domElement.style.width = '100%';
        this.renderer.domElement.style.height = '100%';
        
        this.camera.left = -w / 2;
        this.camera.right = w / 2;
        this.camera.top = h / 2;
        this.camera.bottom = -h / 2;
        this.camera.updateProjectionMatrix();
        
        this.quad.scale.set(w, h, 1);
        this.vResolution.set(w, h).multiplyScalar(dpr);
        this.material.uniforms.u_pixelRatio.value = dpr;
    }
    
    animate() {
        this.time = performance.now() * 0.001;
        const dt = this.time - this.lastTime;
        this.lastTime = this.time;
        
        // Smooth mouse dampening
        this.vMouseDamp.x += (this.vMouse.x - this.vMouseDamp.x) * Math.min(dt * 8, 1);
        this.vMouseDamp.y += (this.vMouse.y - this.vMouseDamp.y) * Math.min(dt * 8, 1);
        
        this.renderer.render(this.scene, this.camera);
        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
    
    start() {
        if (this.card) {
            this.card.addEventListener('mousemove', this.onPointerMove);
            this.card.addEventListener('pointermove', this.onPointerMove);
        }
    }
    
    stop() {
        if (this.card) {
            this.card.removeEventListener('mousemove', this.onPointerMove);
            this.card.removeEventListener('pointermove', this.onPointerMove);
        }
    }
    
    destroy() {
        this.stop();
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
        if (this.renderer && this.container.contains(this.renderer.domElement)) {
            this.container.removeChild(this.renderer.domElement);
        }
        if (this.renderer) {
            this.renderer.dispose();
        }
        if (this.material) {
            this.material.dispose();
        }
    }
}

// Initialize ShapeBlur for each project card
const shapeBlurInstances = [];

document.querySelectorAll('.project-card').forEach((card, index) => {
    const container = card.querySelector('.shape-blur-container');
    if (container) {
        let instance = null;
        
        card.addEventListener('mouseenter', () => {
            if (!instance) {
                instance = new ShapeBlur(container, {
                    variation: 0,
                    shapeSize: 0.57,
                    roundness: 0.06,
                    borderSize: 0.01,
                    circleSize: 0.5,
                    circleEdge: 0.8
                });
                instance.start();
                shapeBlurInstances.push(instance);
            }
        });
        
        card.addEventListener('mouseleave', () => {
            // Keep the instance alive for smooth transition
            // You can optionally destroy it after a delay
        });
    }
});

// Add hover sound effect (optional)
function addHoverSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        });
    });
}

// Uncomment the line below if you want hover sound effects
// addHoverSound();
