// Wedding invitation interactive features
document.addEventListener('DOMContentLoaded', function() {
    console.log('Wedding invitation loaded successfully!');
    
    // Add gentle animations to elements
    animateInvitationElements();
    
    // Add interactive touches
    addInteractiveTouches();
    
    // Add click sound effect (optional)
    addSoundEffects();
    
    // Animate floating hearts
    initFloatingHearts();
    
    // Add greeting animation on page load
    setTimeout(() => {
        showWelcomeAnimation();
    }, 1000);
});

// Animate invitation elements on scroll/load
function animateInvitationElements() {
    const elements = document.querySelectorAll('.invitation-content > *');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200 + 300);
    });
}

// Add interactive touches to elements
function addInteractiveTouches() {
    // Make the main title interactive
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.addEventListener('click', function() {
            this.style.transform = 'scale(1.05)';
            this.style.color = '#d4af37';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.color = '#8b4513';
            }, 300);
            
            // Add sparkle effect
            createSparkleEffect(this);
        });
    }
    
    // Make the date interactive
    const dateElement = document.querySelector('.date');
    if (dateElement) {
        dateElement.addEventListener('click', function() {
            this.style.transform = 'scale(1.1)';
            this.style.background = 'linear-gradient(135deg, #d4af37 0%, #f4e5d3 100%)';
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.background = 'linear-gradient(135deg, #f8f5f0 0%, #ede4d3 100%)';
            }, 500);
        });
    }
    
    // Add hover effects to address section
    const addressSection = document.querySelector('.address-section');
    if (addressSection) {
        addressSection.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.boxShadow = '0 5px 15px rgba(212, 175, 55, 0.3)';
        });
        
        addressSection.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    }
    
    // Add touch feedback for mobile
    const touchElements = document.querySelectorAll('.date-time, .family-signature, .blessing');
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
            
            // Add gentle pulse animation
            this.style.animation = 'pulse 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
}

// Add sound effects (using Web Audio API)
function addSoundEffects() {
    let audioContext;
    
    // Initialize audio context on first user interaction
    document.addEventListener('click', function initAudio() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        document.removeEventListener('click', initAudio);
    });
    
    // Create gentle chime sound
    function playChime() {
        if (!audioContext) return;
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.3);
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    // Add chime to main title click
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.addEventListener('click', playChime);
    }
}

// Initialize floating hearts animation
function initFloatingHearts() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    // Add random movement to hearts
    setInterval(() => {
        if (Math.random() > 0.7) { // 30% chance every interval
            createFloatingHeart();
        }
    }, 3000);
}

// Create additional floating hearts
function createFloatingHeart() {
    const heartsContainer = document.querySelector('.floating-hearts');
    if (!heartsContainer) return;
    
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
    heart.style.opacity = Math.random() * 0.3 + 0.1;
    
    heartsContainer.appendChild(heart);
    
    // Remove heart after animation
    setTimeout(() => {
        if (heart.parentNode) {
            heart.parentNode.removeChild(heart);
        }
    }, 8000);
}

// Create sparkle effect
function createSparkleEffect(element) {
    const rect = element.getBoundingClientRect();
    const sparkles = [];
    
    for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = rect.left + rect.width / 2 + 'px';
        sparkle.style.top = rect.top + rect.height / 2 + 'px';
        sparkle.style.width = '4px';
        sparkle.style.height = '4px';
        sparkle.style.background = '#d4af37';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '1000';
        sparkle.style.transition = 'all 0.8s ease-out';
        
        document.body.appendChild(sparkle);
        sparkles.push(sparkle);
        
        // Animate sparkle
        setTimeout(() => {
            const angle = (i * 60) * Math.PI / 180;
            const distance = 50;
            sparkle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
            sparkle.style.opacity = '0';
        }, 10);
    }
    
    // Remove sparkles after animation
    setTimeout(() => {
        sparkles.forEach(sparkle => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        });
    }, 800);
}

// Show welcome animation
function showWelcomeAnimation() {
    const container = document.querySelector('.invitation-container');
    if (!container) return;
    
    // Add entrance animation
    container.style.transform = 'scale(0.9) rotateY(5deg)';
    container.style.opacity = '0.8';
    container.style.transition = 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    
    setTimeout(() => {
        container.style.transform = 'scale(1) rotateY(0deg)';
        container.style.opacity = '1';
    }, 100);
}

// Add pulse animation CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    @keyframes shimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
    }
`;
document.head.appendChild(style);

// Add resize handler for mobile optimization
window.addEventListener('resize', function() {
    // Recalculate animations on orientation change
    const elements = document.querySelectorAll('.invitation-content > *');
    elements.forEach(element => {
        element.style.transition = 'none';
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
        }, 100);
    });
});

// Console message for developers
console.log('💒 Wedding invitation JavaScript loaded successfully!');
console.log('🎉 All interactive features are ready!');
console.log('💝 Wish the couple a happy marriage!');

// Add smooth scrolling for better mobile experience
if ('scrollBehavior' in document.documentElement.style) {
    document.documentElement.style.scrollBehavior = 'smooth';
}