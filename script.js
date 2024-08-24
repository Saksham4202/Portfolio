let achievements = [];
let certificates = [];
let editingAchievementIndex = null;
let editingCertificateIndex = null;

// Show the Add/Edit Achievement form
function showAddAchievementForm(index) {
    const form = document.getElementById('add-achievement-form');
    if (index !== undefined) {
        // Edit mode
        document.getElementById('form-title').innerText = 'Edit Achievement';
        const achievement = achievements[index];
        document.getElementById('achievement-title').value = achievement.title;
        document.getElementById('achievement-description').value = achievement.description;
        editingAchievementIndex = index;
    } else {
        // Add mode
        document.getElementById('form-title').innerText = 'Add New Achievement';
        document.getElementById('achievement-title').value = '';
        document.getElementById('achievement-description').value = '';
        editingAchievementIndex = null;
    }
    form.style.display = 'block';
}

// Hide the Add/Edit Achievement form
function hideAddAchievementForm() {
    document.getElementById('add-achievement-form').style.display = 'none';
}

// Save Achievement (Add or Edit)
function saveAchievement() {
    const title = document.getElementById('achievement-title').value;
    const description = document.getElementById('achievement-description').value;

    if (title && description) {
        if (editingAchievementIndex !== null) {
            // Edit existing achievement
            achievements[editingAchievementIndex] = { title, description };
        } else {
            // Add new achievement
            achievements.push({ title, description });
        }

        updateAchievementList();
        hideAddAchievementForm();
    } else {
        alert('Please fill in all fields.');
    }
}

// Update the list of achievements
function updateAchievementList() {
    const list = document.getElementById('achievement-list');
    list.innerHTML = '';

    achievements.forEach((ach, index) => {
        const div = document.createElement('div');
        div.className = 'achievement';
        div.innerHTML = `
            <h3>${ach.title}</h3>
            <p>${ach.description}</p>
            <button class="edit-button" onclick="showAddAchievementForm(${index})">Edit</button>
        `;
        list.appendChild(div);
    });
}

// Show the Add/Edit Certificate form
function showAddCertificateForm(index) {
    const form = document.getElementById('add-certificate-form');
    if (index !== undefined) {
        // Edit mode
        document.getElementById('certificate-form-title').innerText = 'Edit Certificate';
        const certificate = certificates[index];
        document.getElementById('certificate-title').value = certificate.title;
        document.getElementById('certificate-description').value = certificate.description;
        editingCertificateIndex = index;
    } else {
        // Add mode
        document.getElementById('certificate-form-title').innerText = 'Add New Certificate';
        document.getElementById('certificate-title').value = '';
        document.getElementById('certificate-description').value = '';
        editingCertificateIndex = null;
    }
    form.style.display = 'block';
}

// Hide the Add/Edit Certificate form
function hideAddCertificateForm() {
    document.getElementById('add-certificate-form').style.display = 'none';
}

// Save Certificate (Add or Edit)
function saveCertificate() {
    const title = document.getElementById('certificate-title').value;
    const description = document.getElementById('certificate-description').value;
    const imageInput = document.getElementById('certificate-image');
    const image = imageInput.files[0];

    if (title && description && image) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            if (editingCertificateIndex !== null) {
                // Edit existing certificate
                certificates[editingCertificateIndex] = { title, description, image: imageUrl };
            } else {
                // Add new certificate
                certificates.push({ title, description, image: imageUrl });
            }

            updateCertificateList();
            hideAddCertificateForm();
        };
        reader.readAsDataURL(image);
    } else {
        alert('Please fill in all fields.');
    }
}

// Update the list of certificates
function updateCertificateList() {
    const list = document.getElementById('certificate-list');
    list.innerHTML = '';

    certificates.forEach((cert, index) => {
        const div = document.createElement('div');
        div.className = 'certificate';
        div.innerHTML = `
            <h3>${cert.title}</h3>
            <p>${cert.description}</p>
            <img src="${cert.image}" alt="${cert.title}">
            <button class="edit-button" onclick="showAddCertificateForm(${index})">Edit</button>
        `;
        list.appendChild(div);
    });
}

// Initial data for demonstration
document.addEventListener('DOMContentLoaded', () => {
    achievements = [
        { title: 'Achievement 1', description: 'Description of achievement 1' },
        { title: 'Achievement 2', description: 'Description of achievement 2' }
    ];
    certificates = [
        { title: 'Certificate 1', description: 'Description of certificate 1', image: 'https://via.placeholder.com/200' },
        { title: 'Certificate 2', description: 'Description of certificate 2', image: 'https://via.placeholder.com/200' }
    ];
    updateAchievementList();
    updateCertificateList();
});
