document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('setupForm');
    const profileImageInput = document.getElementById('profileImage');
    const profileImagePreview = document.getElementById('profileImagePreview');
    const statusMessage = document.getElementById('statusMessage');
    const resetButton = document.getElementById('resetButton'); // Get reset button

    let profileImageData = null; // To store image data URL

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
                                    profileImageData = data[key]; // Store for submission if not changed
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
                profileImageData = e.target.result; // Store the new image data
            }
            reader.readAsDataURL(file);
        } else {
            profileImagePreview.style.display = 'none';
            profileImagePreview.src = '';
            profileImageData = null; // Clear if no file selected
        }
    });

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        statusMessage.textContent = 'Saving...';
        statusMessage.style.color = 'orange';

        try {
            const formData = new FormData(form);
            const portfolioData = {};

            // Iterate over form data entries
            for (let [key, value] of formData.entries()) {
                 if (key !== 'profileImage') { // Exclude file input from direct data capture
                     portfolioData[key] = value;
                 }
            }

            // Add the potentially updated image data URL
            // Use the stored profileImageData which holds the latest Data URL
            portfolioData['profileImage'] = profileImageData; 

            // Save to localStorage
            localStorage.setItem('portfolioData', JSON.stringify(portfolioData));

            statusMessage.textContent = 'Configuration saved successfully!';
            statusMessage.style.color = 'green';
            console.log('Portfolio data saved:', portfolioData);

            // Clear status message after 3 seconds
            setTimeout(() => {
                statusMessage.textContent = '';
            }, 3000);

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