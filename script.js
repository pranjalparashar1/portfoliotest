// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const html = document.documentElement;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

function toggleDarkMode() {
    if (html.classList.contains('dark')) {
        html.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
    } else {
        html.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
    }
}

// Check for saved dark mode preference or system preference
const savedDarkMode = localStorage.getItem('darkMode');
if (savedDarkMode === 'true' || (!savedDarkMode && prefersDarkScheme.matches)) {
    html.classList.add('dark');
}

// Listen for system preference changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('darkMode')) {
        if (e.matches) {
            html.classList.add('dark');
        } else {
            html.classList.remove('dark');
        }
    }
});

darkModeToggle.addEventListener('click', toggleDarkMode);

// Smooth Scroll for Navigation Links
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

// Intersection Observer for Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        try {
            // Here you would typically send the data to your backend
            console.log('Form submitted:', data);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'bg-green-500 text-white p-4 rounded-lg mt-4';
            successMessage.textContent = 'Message sent successfully!';
            contactForm.appendChild(successMessage);
            
            // Reset form
            contactForm.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'bg-red-500 text-white p-4 rounded-lg mt-4';
            errorMessage.textContent = 'Error sending message. Please try again.';
            contactForm.appendChild(errorMessage);
            
            // Remove error message after 3 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        }
    });
}

// Skills Progress Animation
const skills = document.querySelectorAll('.skill-progress');
skills.forEach(skill => {
    const progress = skill.getAttribute('data-progress');
    skill.style.width = '0';
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skill.style.transition = 'width 1s ease-in-out';
                skill.style.width = progress + '%';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skill);
});

// Project Card Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.classList.add('hover:scale-105');
    });
    
    card.addEventListener('mouseleave', () => {
        card.classList.remove('hover:scale-105');
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('bg-gray-800');
        navbar.classList.add('bg-transparent');
    } else {
        navbar.classList.remove('bg-transparent');
        navbar.classList.add('bg-gray-800');
    }
    
    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobileMenuButton');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Initialize Three.js for Hero Section
const initThreeJS = () => {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        canvas,
        alpha: true,
        antialias: true
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Camera position
    camera.position.z = 5;
    
    // Create a group for all geometries
    const group = new THREE.Group();
    scene.add(group);
    
    // Create multiple geometries
    const geometries = [
        new THREE.TetrahedronGeometry(1, 0),
        new THREE.OctahedronGeometry(1, 0),
        new THREE.IcosahedronGeometry(1, 0)
    ];
    
    // Create materials with different colors
    const materials = [
        new THREE.MeshPhongMaterial({ 
            color: 0x007AFF,
            transparent: true,
            opacity: 0.6,
            shininess: 100
        }),
        new THREE.MeshPhongMaterial({ 
            color: 0x34C759,
            transparent: true,
            opacity: 0.6,
            shininess: 100
        }),
        new THREE.MeshPhongMaterial({ 
            color: 0xFF9500,
            transparent: true,
            opacity: 0.6,
            shininess: 100
        })
    ];
    
    // Create meshes and add to group
    geometries.forEach((geometry, index) => {
        const mesh = new THREE.Mesh(geometry, materials[index]);
        mesh.position.set(
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10,
            (Math.random() - 0.5) * 10
        );
        mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        group.add(mesh);
    });
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);
    
    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        
        // Rotate the group
        group.rotation.x += 0.001;
        group.rotation.y += 0.001;
        
        // Move individual meshes
        group.children.forEach((mesh, index) => {
            mesh.rotation.x += 0.01 * (index + 1);
            mesh.rotation.y += 0.01 * (index + 1);
            
            // Add subtle floating motion
            mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.01;
        });
        
        renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        
        renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
        window.removeEventListener('resize', handleResize);
        scene.remove(group);
        geometries.forEach(geometry => geometry.dispose());
        materials.forEach(material => material.dispose());
        renderer.dispose();
    };
};

// Initialize Three.js when the page loads
window.addEventListener('load', initThreeJS);

// Typing Effect for Hero Text
const heroText = document.getElementById('heroText');
if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroText.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    typeWriter();
}

// Lazy Loading Images
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
}, { threshold: 0.1 });

lazyImages.forEach(img => imageObserver.observe(img));

// Add loading animation to images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Check if there's a scroll event listener that changes navbar color
document.addEventListener('DOMContentLoaded', function() {
    // Get navbar element
    const navbar = document.querySelector('nav');
    
    // Function to handle scroll - we'll keep the class but not change appearance
    function handleScroll() {
        if (window.scrollY > 10) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
});

/* Load Portfolio Data from localStorage */
function loadPortfolioData() {
    const savedData = localStorage.getItem('portfolioData');
    if (!savedData) {
        console.log('No portfolio data found in localStorage.');
        return; // No data to load
    }

    try {
        const data = JSON.parse(savedData);
        console.log('Loading portfolio data:', data);

        // Helper function to set text content if element exists
        const setText = (id, value) => {
            const element = document.getElementById(id);
            if (element && value) element.textContent = value;
        };
        
        // Helper function to set image src if element exists
        const setImage = (id, value) => {
            const element = document.getElementById(id);
            if (element && value) element.src = value;
        };
        
        // Helper function to set href if element exists
        const setLink = (id, value) => {
            const element = document.getElementById(id);
            if (element && value) element.href = value;
        };
        
        // Helper function to set icon class if element exists
        const setIcon = (id, value) => {
            const element = document.getElementById(id);
            // Reset class list and add new ones if value exists
            if (element && value) { 
                // Basic Font Awesome icon styling (can be adjusted)
                const baseClasses = ['text-4xl', 'mb-4']; 
                 // Heuristic to add color based on common usage (can be improved)
                let colorClass = 'text-blue-500'; // Default color
                if (value.includes('node')) colorClass = 'text-green-500';
                if (value.includes('python')) colorClass = 'text-yellow-500';
                if (value.includes('database')) colorClass = 'text-blue-400';
                
                element.className = ''; // Clear existing classes
                element.classList.add(...value.split(' '), ...baseClasses, colorClass);
            }
        };

        // Populate General
        setText('navAcronymDisplay', data.navAcronym);
        setText('pageTitle', data.heroName ? `${data.heroName} - Portfolio` : 'Portfolio');

        // Populate Hero
        setText('heroNameDisplay', data.heroName);
        setText('heroTitleDisplay', data.heroTitle);

        // Populate About
        setText('aboutText1Display', data.aboutText1);
        setText('aboutText2Display', data.aboutText2);
        setImage('profileImageDisplay', data.profileImage); // Handles the Data URL
        setText('statYearsDisplay', data.statYears ? data.statYears + '+' : '');
        setText('statProjectsDisplay', data.statProjects ? data.statProjects + '+' : '');
        setText('statClientsDisplay', data.statClients ? data.statClients + '+' : '');

        // Populate Skills (First 4)
        for (let i = 1; i <= 4; i++) {
            setText(`skillName${i}Display`, data[`skillName${i}`]);
            setText(`skillLevel${i}Display`, data[`skillLevel${i}`]);
            setIcon(`skillIcon${i}Display`, data[`skillIcon${i}`]);
        }

        // Populate Projects (First 3)
        for (let i = 1; i <= 3; i++) {
            setImage(`projectImage${i}Display`, data[`projectImage${i}`]);
            setText(`projectTitle${i}Display`, data[`projectTitle${i}`]);
            setText(`projectDesc${i}Display`, data[`projectDesc${i}`]);
            setLink(`projectLink${i}Display`, data[`projectLink${i}`]);
        }
        
        // Populate Experience (First 2)
        for (let i = 1; i <= 2; i++) {
            setText(`expTitle${i}Display`, data[`expTitle${i}`]);
            setText(`expCompany${i}Display`, data[`expCompany${i}`]);
            setText(`expDates${i}Display`, data[`expDates${i}`]);
            setText(`expDesc${i}Display`, data[`expDesc${i}`]);
        }
        
        // Populate Certifications (First 2)
        for (let i = 1; i <= 2; i++) {
            setText(`certName${i}Display`, data[`certName${i}`]);
            setText(`certIssuer${i}Display`, data[`certIssuer${i}`]);
            setText(`certDate${i}Display`, data[`certDate${i}`] ? `Issued: ${data[`certDate${i}`]}` : '');
        }

        // Populate Social Links
        setLink('githubLinkDisplay', data.githubLink);
        setLink('linkedinLinkDisplay', data.linkedinLink);
        setLink('twitterLinkDisplay', data.twitterLink);
         // Hide Twitter icon if link is empty
        const twitterLinkElement = document.getElementById('twitterLinkDisplay');
        if (twitterLinkElement && !data.twitterLink) {
            twitterLinkElement.style.display = 'none';
        }

        console.log('Portfolio data loaded successfully.');

    } catch (e) {
        console.error('Error loading or parsing portfolio data:', e);
    }
}

// Run the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', loadPortfolioData); 