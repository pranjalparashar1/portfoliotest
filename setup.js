document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('setupForm');
    const profileImageInput = document.getElementById('profileImage');
    const profileImagePreview = document.getElementById('profileImagePreview');
    const statusMessage = document.getElementById('statusMessage');
    const resetButton = document.getElementById('resetButton');

    let profileImageData = null;

    // Function to load existing data into the form
    function loadExistingData() {
        const savedData = localStorage.getItem('portfolioData');
        if (savedData) {
            try {
                const data = JSON.parse(savedData);
                // Loop through data and fill form fields
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                        const input = form.elements[key];
                        if (input) {
                            if (input.type === 'file') {
                                // Don't pre-fill file inputs for security reasons
                                // But display the saved image if it exists
                                if (key === 'profileImage' && data[key]) {
                                    profileImageData = data[key];
                                    profileImagePreview.src = data[key];
                                    profileImagePreview.style.display = 'block';
                                }
                            } else {
                                input.value = data[key];
                            }
                        }
                    }
                }
                console.log('Loaded existing configuration.');
            } catch (e) {
                console.error('Error parsing saved portfolio data:', e);
                statusMessage.textContent = 'Error loading saved data.';
                statusMessage.style.color = 'red';
            }
        } else {
            console.log('No existing configuration found.');
        }
    }

    // Handle image preview
    profileImageInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImagePreview.src = e.target.result;
                profileImagePreview.style.display = 'block';
                profileImageData = e.target.result;
            }
            reader.readAsDataURL(file);
        } else {
            profileImagePreview.style.display = 'none';
            profileImagePreview.src = '';
            profileImageData = null;
        }
    });

    // Function to update index.html with new configuration
    function updateIndexHTML(data) {
        // Create a new configuration object with default values
        const newConfig = {
            name: data.heroName || "John Doe",
            title: data.heroTitle || "Full Stack Developer & Designer",
            acronym: data.heroName ? data.heroName.split(' ').map(word => word[0]).join('').toUpperCase() : "JD",
            about: {
                text1: data.aboutText1 || "Hello! I'm a passionate developer with a keen eye for design and a love for creating beautiful, functional web applications. With a background in both front-end and back-end development, I bring a holistic approach to every project.",
                text2: data.aboutText2 || "My journey in tech has been driven by curiosity and a desire to build solutions that make a difference. I'm constantly learning and exploring new technologies to stay at the forefront of web development."
            },
            stats: {
                years: (data.statYears || "4") + "+",
                projects: (data.statProjects || "50") + "+",
                clients: (data.statClients || "20") + "+"
            },
            profileImage: profileImageData || data.profileImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
            skills: [
                {
                    icon: data.skillIcon1 || "fab fa-html5",
                    name: data.skillName1 || "HTML5",
                    level: data.skillLevel1 || "Advanced",
                    color: "text-orange-500"
                },
                {
                    icon: data.skillIcon2 || "fab fa-css3-alt",
                    name: data.skillName2 || "CSS3",
                    level: data.skillLevel2 || "Advanced",
                    color: "text-blue-500"
                },
                {
                    icon: data.skillIcon3 || "fab fa-js",
                    name: data.skillName3 || "JavaScript",
                    level: data.skillLevel3 || "Advanced",
                    color: "text-yellow-500"
                },
                {
                    icon: data.skillIcon4 || "fab fa-react",
                    name: data.skillName4 || "React",
                    level: data.skillLevel4 || "Advanced",
                    color: "text-blue-400"
                },
                {
                    icon: data.skillIcon5 || "fab fa-node-js",
                    name: data.skillName5 || "Node.js",
                    level: data.skillLevel5 || "Advanced",
                    color: "text-green-500"
                },
                {
                    icon: data.skillIcon6 || "fab fa-python",
                    name: data.skillName6 || "Python",
                    level: data.skillLevel6 || "Intermediate",
                    color: "text-blue-600"
                },
                {
                    icon: data.skillIcon7 || "fas fa-database",
                    name: data.skillName7 || "SQL",
                    level: data.skillLevel7 || "Advanced",
                    color: "text-blue-700"
                },
                {
                    icon: data.skillIcon8 || "fab fa-git-alt",
                    name: data.skillName8 || "Git",
                    level: data.skillLevel8 || "Advanced",
                    color: "text-red-500"
                }
            ],
            projects: [
                {
                    title: data.projectTitle1 || "E-commerce Platform",
                    description: data.projectDesc1 || "A full-featured e-commerce platform built with React and Node.js",
                    image: data.projectImage1 || "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                    link: data.projectLink1 || "#"
                },
                {
                    title: data.projectTitle2 || "Task Management App",
                    description: data.projectDesc2 || "A collaborative task management application with real-time updates",
                    image: data.projectImage2 || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                    link: data.projectLink2 || "#"
                },
                {
                    title: data.projectTitle3 || "Portfolio Website",
                    description: data.projectDesc3 || "A responsive portfolio website with 3D animations",
                    image: data.projectImage3 || "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
                    link: data.projectLink3 || "#"
                }
            ],
            experience: [
                {
                    title: data.expTitle1 || "Senior Software Engineer",
                    company: data.expCompany1 || "Tech Solutions Inc.",
                    dates: data.expDates1 || "2020 - Present",
                    description: data.expDesc1 || "Leading development of enterprise applications and mentoring junior developers."
                },
                {
                    title: data.expTitle2 || "Software Developer",
                    company: data.expCompany2 || "Digital Innovations",
                    dates: data.expDates2 || "2018 - 2020",
                    description: data.expDesc2 || "Developed and maintained web applications using modern technologies."
                }
            ],
            certifications: [
                {
                    name: data.certName1 || "AWS Certified Solutions Architect",
                    issuer: data.certIssuer1 || "Amazon Web Services",
                    date: "Issued: " + (data.certDate1 || "2021")
                },
                {
                    name: data.certName2 || "Google Cloud Professional Developer",
                    issuer: data.certIssuer2 || "Google Cloud",
                    date: "Issued: " + (data.certDate2 || "2020")
                }
            ],
            social: {
                github: data.githubLink || "#",
                linkedin: data.linkedinLink || "#",
                twitter: data.twitterLink || "#"
            }
        };

        try {
            // Save the new configuration to localStorage
            localStorage.setItem('portfolioConfig', JSON.stringify(newConfig));
            statusMessage.textContent = 'Portfolio configuration saved successfully!';
            statusMessage.style.color = 'green';
        } catch (error) {
            console.error('Error saving configuration:', error);
            statusMessage.textContent = 'Error saving configuration. See console for details.';
            statusMessage.style.color = 'red';
        }
    }

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        statusMessage.textContent = 'Saving...';
        statusMessage.style.color = 'orange';

        try {
            const formData = new FormData(form);
            const portfolioData = {};

            // Convert FormData to a plain object
            for (let [key, value] of formData.entries()) {
                if (key !== 'profileImage') {
                    portfolioData[key] = value;
                }
            }

            // Add the image data if available
            if (profileImageData) {
                portfolioData.profileImage = profileImageData;
            }

            // Save to localStorage
            localStorage.setItem('portfolioData', JSON.stringify(portfolioData));

            // Update the index.html file
            updateIndexHTML(portfolioData);

        } catch (error) {
            console.error('Error saving configuration:', error);
            statusMessage.textContent = 'Error saving configuration. See console for details.';
            statusMessage.style.color = 'red';
        }
    });

    // Handle Reset Button Click
    resetButton.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all fields to their defaults? This will clear your saved configuration.')) {
            try {
                // Clear localStorage
                localStorage.removeItem('portfolioData');
                localStorage.removeItem('portfolioConfig');
                
                // Reset the form fields
                form.reset();
                
                // Clear the image preview and stored data
                profileImagePreview.style.display = 'none';
                profileImagePreview.src = '';
                profileImageData = null;
                
                // Update status message
                statusMessage.textContent = 'Configuration reset to defaults.';
                statusMessage.style.color = 'blue';
                console.log('Portfolio data reset.');

                // Clear status message after 3 seconds
                setTimeout(() => {
                    statusMessage.textContent = '';
                }, 3000);

            } catch (error) {
                console.error('Error resetting configuration:', error);
                statusMessage.textContent = 'Error resetting configuration. See console for details.';
                statusMessage.style.color = 'red';
            }
        }
    });

    // Load existing data when the page loads
    loadExistingData();
});

// Portfolio Setup Configuration
const portfolioConfig = {
    // Personal Information
    name: "John Doe",
    title: "Full Stack Developer & Designer",
    about: {
        text1: "Hello! I'm a passionate developer with a keen eye for design and a love for creating beautiful, functional web applications. With a background in both front-end and back-end development, I bring a holistic approach to every project.",
        text2: "My journey in tech has been driven by curiosity and a desire to build solutions that make a difference. I'm constantly learning and exploring new technologies to stay at the forefront of web development."
    },
    stats: {
        years: "4+",
        projects: "50+",
        clients: "20+"
    },
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",

    // Skills
    skills: [
        {
            icon: "fab fa-react",
            name: "React",
            level: "Advanced",
            color: "text-blue-500"
        },
        {
            icon: "fab fa-node-js",
            name: "Node.js",
            level: "Advanced",
            color: "text-green-500"
        },
        {
            icon: "fab fa-python",
            name: "Python",
            level: "Intermediate",
            color: "text-yellow-500"
        },
        {
            icon: "fas fa-database",
            name: "SQL",
            level: "Advanced",
            color: "text-blue-400"
        }
    ],

    // Projects
    projects: [
        {
            title: "E-commerce Platform",
            description: "A full-featured e-commerce platform built with React and Node.js",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            link: "#"
        },
        {
            title: "Task Management App",
            description: "A collaborative task management application with real-time updates",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            link: "#"
        },
        {
            title: "Portfolio Website",
            description: "A responsive portfolio website with 3D animations",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            link: "#"
        }
    ],

    // Experience
    experience: [
        {
            title: "Senior Software Engineer",
            company: "Tech Solutions Inc.",
            dates: "2020 - Present",
            description: "Leading development of enterprise applications and mentoring junior developers."
        },
        {
            title: "Software Developer",
            company: "Digital Innovations",
            dates: "2018 - 2020",
            description: "Developed and maintained web applications using modern technologies."
        }
    ],

    // Certifications
    certifications: [
        {
            name: "AWS Certified Solutions Architect",
            issuer: "Amazon Web Services",
            date: "Issued: 2021"
        },
        {
            name: "Google Cloud Professional Developer",
            issuer: "Google Cloud",
            date: "Issued: 2020"
        }
    ],

    // Social Links
    social: {
        github: "#",
        linkedin: "#",
        twitter: "#"
    }
};

// Function to update the HTML with the configuration
function updatePortfolio() {
    // Update personal information
    document.getElementById('heroNameDisplay').textContent = portfolioConfig.name;
    document.getElementById('heroTitleDisplay').textContent = portfolioConfig.title;
    document.getElementById('pageTitle').textContent = portfolioConfig.name + " - Portfolio";
    
    // Update about section
    document.getElementById('aboutText1Display').textContent = portfolioConfig.about.text1;
    document.getElementById('aboutText2Display').textContent = portfolioConfig.about.text2;
    document.getElementById('statYearsDisplay').textContent = portfolioConfig.stats.years;
    document.getElementById('statProjectsDisplay').textContent = portfolioConfig.stats.projects;
    document.getElementById('statClientsDisplay').textContent = portfolioConfig.stats.clients;
    document.getElementById('profileImageDisplay').src = portfolioConfig.profileImage;

    // Update skills
    portfolioConfig.skills.forEach((skill, index) => {
        const skillIndex = index + 1;
        document.getElementById(`skillIcon${skillIndex}Display`).className = `${skill.icon} ${skill.color} text-3xl sm:text-4xl mb-2 sm:mb-4`;
        document.getElementById(`skillName${skillIndex}Display`).textContent = skill.name;
        document.getElementById(`skillLevel${skillIndex}Display`).textContent = skill.level;
    });

    // Update projects
    portfolioConfig.projects.forEach((project, index) => {
        const projectIndex = index + 1;
        document.getElementById(`projectImage${projectIndex}Display`).src = project.image;
        document.getElementById(`projectTitle${projectIndex}Display`).textContent = project.title;
        document.getElementById(`projectDesc${projectIndex}Display`).textContent = project.description;
        document.getElementById(`projectLink${projectIndex}Display`).href = project.link;
    });

    // Update experience
    portfolioConfig.experience.forEach((exp, index) => {
        const expIndex = index + 1;
        document.getElementById(`expTitle${expIndex}Display`).textContent = exp.title;
        document.getElementById(`expCompany${expIndex}Display`).textContent = exp.company;
        document.getElementById(`expDates${expIndex}Display`).textContent = exp.dates;
        document.getElementById(`expDesc${expIndex}Display`).textContent = exp.description;
    });

    // Update certifications
    portfolioConfig.certifications.forEach((cert, index) => {
        const certIndex = index + 1;
        document.getElementById(`certName${certIndex}Display`).textContent = cert.name;
        document.getElementById(`certIssuer${certIndex}Display`).textContent = cert.issuer;
        document.getElementById(`certDate${certIndex}Display`).textContent = cert.date;
    });

    // Update social links
    document.getElementById('githubLinkDisplay').href = portfolioConfig.social.github;
    document.getElementById('linkedinLinkDisplay').href = portfolioConfig.social.linkedin;
    document.getElementById('twitterLinkDisplay').href = portfolioConfig.social.twitter;
}

// Initialize the portfolio when the page loads
document.addEventListener('DOMContentLoaded', updatePortfolio); 