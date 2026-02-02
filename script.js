// Storage key for cadet registrations
const STORAGE_KEY = 'rotc_registrations';
let photoDataURL = null;

// Initialize photo upload
document.addEventListener('DOMContentLoaded', function() {
    const photoBox = document.getElementById('photoBox');
    const photoUpload = document.getElementById('photoUpload');
    const photoPreview = document.getElementById('photoPreview');
    const photoPlaceholder = photoBox.querySelector('.photo-placeholder');

    photoBox.addEventListener('click', () => {
        photoUpload.click();
    });

    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                photoDataURL = event.target.result;
                photoPreview.src = photoDataURL;
                photoPreview.style.display = 'block';
                photoPlaceholder.style.display = 'none';
            };
            reader.readAsDataURL(file);
        }
    });

    // Form submission handler
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', handleFormSubmit);
});

function handleFormSubmit(e) {
    e.preventDefault();

    // Collect form data
    const formData = {
        id: generateID(),
        timestamp: new Date().toISOString(),
        photo: photoDataURL,
        personalData: {
            retRank: document.getElementById('retRank').value,
            familyName: document.getElementById('familyName').value,
            firstName: document.getElementById('firstName').value,
            middleInitial: document.getElementById('middleInitial').value,
            afpsn: document.getElementById('afpsn').value,
            dateOfBirth: document.getElementById('dateOfBirth').value,
            status: document.querySelector('input[name="status"]:checked')?.value || '',
            spouseName: document.getElementById('spouseName').value,
            homeAddress: document.getElementById('homeAddress').value,
            cellPhone: document.getElementById('cellPhone').value,
            email: document.getElementById('email').value
        },
        militaryRecords: {
            dateEntered: document.getElementById('dateEntered').value,
            entryLocation: document.getElementById('entryLocation').value,
            rcduHdu: document.getElementById('rcduHdu').value,
            rcdg: document.getElementById('rcdg').value,
            lastUnit: document.getElementById('lastUnit').value,
            lastLocation: document.getElementById('lastLocation').value,
            retirementDate: document.getElementById('retirementDate').value
        },
        certification: {
            admissionDate: document.getElementById('admissionDate').value,
            attachment: document.getElementById('attachment').value
        }
    };

    // Save to localStorage
    saveRegistration(formData);

    // Show success message
    showSuccessMessage();

    // Reset form
    setTimeout(() => {
        document.getElementById('registrationForm').reset();
        photoDataURL = null;
        document.getElementById('photoPreview').style.display = 'none';
        document.querySelector('.photo-placeholder').style.display = 'flex';
    }, 2000);
}

function generateID() {
    return 'ROTC-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function saveRegistration(data) {
    try {
        // Get existing registrations
        let registrations = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        
        // Add new registration
        registrations.push(data);
        
        // Save back to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
        
        console.log('Registration saved successfully!');
        return true;
    } catch (error) {
        console.error('Error saving registration:', error);
        alert('Error saving registration. Please try again.');
        return false;
    }
}

function showSuccessMessage() {
    // Create success overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    const messageBox = document.createElement('div');
    messageBox.style.cssText = `
        background: linear-gradient(135deg, #3d4f2f 0%, #2d3a2e 100%);
        border: 3px solid #d4af37;
        border-radius: 10px;
        padding: 40px;
        text-align: center;
        max-width: 500px;
        animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
    `;

    messageBox.innerHTML = `
        <div style="font-size: 60px; margin-bottom: 20px;">✓</div>
        <h2 style="color: #d4af37; font-family: 'Orbitron', sans-serif; font-size: 28px; margin-bottom: 15px; letter-spacing: 2px;">REGISTRATION SUCCESSFUL!</h2>
        <p style="color: #f4f4f4; font-size: 16px; line-height: 1.6;">
            Your registration has been submitted successfully.<br>
            Registration ID: <strong style="color: #d4af37;">${generateID()}</strong>
        </p>
    `;

    overlay.appendChild(messageBox);
    document.body.appendChild(overlay);

    // Remove after 3 seconds
    setTimeout(() => {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    @keyframes scaleIn {
        from { transform: scale(0.5); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);
