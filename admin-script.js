// Admin credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'rotc2026'
};

const STORAGE_KEY = 'rotc_registrations';
let allRegistrations = [];
let isLoggedIn = false;

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    initializeEventListeners();
});

function initializeEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Export button
    const exportBtn = document.getElementById('exportBtn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportAllData);
    }

    // Clear all button
    const clearAllBtn = document.getElementById('clearAllBtn');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', clearAllRecords);
    }

    // Modal close
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            document.getElementById('detailModal').style.display = 'none';
        });
    }

    // Close modal on outside click
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('detailModal');
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function checkLoginStatus() {
    const sessionLogin = sessionStorage.getItem('adminLoggedIn');
    if (sessionLogin === 'true') {
        isLoggedIn = true;
        showDashboard();
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Login successful
        isLoggedIn = true;
        sessionStorage.setItem('adminLoggedIn', 'true');
        errorDiv.style.display = 'none';
        showDashboard();
    } else {
        // Login failed
        errorDiv.style.display = 'block';
        document.getElementById('password').value = '';
    }
}

function handleLogout() {
    isLoggedIn = false;
    sessionStorage.removeItem('adminLoggedIn');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
    document.getElementById('loginForm').reset();
}

function showDashboard() {
    document.getElementById('loginScreen').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'block';
    loadRegistrations();
    updateStatistics();
}

function loadRegistrations() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        allRegistrations = data ? JSON.parse(data) : [];
        displayRegistrations(allRegistrations);
    } catch (error) {
        console.error('Error loading registrations:', error);
        allRegistrations = [];
        displayRegistrations([]);
    }
}

function displayRegistrations(registrations) {
    const tbody = document.getElementById('recordsTableBody');
    const noRecords = document.getElementById('noRecords');

    if (!registrations || registrations.length === 0) {
        tbody.innerHTML = '';
        noRecords.style.display = 'block';
        return;
    }

    noRecords.style.display = 'none';
    tbody.innerHTML = '';

    registrations.forEach((reg, index) => {
        const row = document.createElement('tr');
        row.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05}s both`;
        
        const fullName = `${reg.personalData.retRank} ${reg.personalData.firstName} ${reg.personalData.familyName}`;
        const registeredDate = new Date(reg.timestamp).toLocaleString();

        row.innerHTML = `
            <td class="photo-cell">
                ${reg.photo ? `<img src="${reg.photo}" alt="Photo">` : '<div style="width:50px;height:50px;background:rgba(212,175,55,0.2);border-radius:5px;display:flex;align-items:center;justify-content:center;">📷</div>'}
            </td>
            <td><code style="color: var(--gold-accent);">${reg.id}</code></td>
            <td><strong>${fullName}</strong></td>
            <td>${reg.personalData.retRank}</td>
            <td>${reg.personalData.email}</td>
            <td>${reg.personalData.cellPhone}</td>
            <td>${registeredDate}</td>
            <td>
                <button class="action-btn" onclick="viewDetails('${reg.id}')">👁️ VIEW</button>
                <button class="action-btn delete-btn" onclick="deleteRecord('${reg.id}')">🗑️ DELETE</button>
            </td>
        `;

        tbody.appendChild(row);
    });
}

function viewDetails(id) {
    const registration = allRegistrations.find(reg => reg.id === id);
    if (!registration) return;

    const modal = document.getElementById('detailModal');
    const content = document.getElementById('detailContent');

    const fullName = `${registration.personalData.retRank} ${registration.personalData.firstName} ${registration.personalData.middleInitial} ${registration.personalData.familyName}`;

    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px;">
            ${registration.photo ? `<img src="${registration.photo}" style="width: 150px; height: 150px; border-radius: 10px; border: 3px solid var(--gold-accent); object-fit: cover; margin-bottom: 20px;">` : ''}
            <h2 style="color: var(--gold-accent); font-family: 'Orbitron', sans-serif; font-size: 24px; margin-bottom: 10px;">${fullName}</h2>
            <p style="color: var(--text-light); font-size: 14px; letter-spacing: 2px;">ID: <code style="color: var(--gold-accent);">${registration.id}</code></p>
        </div>

        <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; border: 2px solid rgba(212,175,55,0.3); margin-bottom: 20px;">
            <h3 style="color: var(--gold-accent); font-family: 'Orbitron', sans-serif; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid var(--gold-accent); padding-bottom: 10px;">PERSONAL DATA</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div>
                    <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">RETIRED RANK</p>
                    <p style="color: var(--text-light); font-size: 16px;">${registration.personalData.retRank}</p>
                </div>
                <div>
                    <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">DATE OF BIRTH</p>
                    <p style="color: var(--text-light); font-size: 16px;">${registration.personalData.dateOfBirth}</p>
                </div>
                <div>
                    <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">STATUS</p>
                    <p style="color: var(--text-light); font-size: 16px;">${registration.personalData.status}</p>
                </div>
                <div>
                    <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">AFPSN & BR SVC</p>
                    <p style="color: var(--text-light); font-size: 16px;">${registration.personalData.afpsn}</p>
                </div>
            </div>
            <div style="margin-top: 15px;">
                <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">SPOUSE NAME</p>
                <p style="color: var(--text-light); font-size: 16px;">${registration.personalData.spouseName || 'N/A'}</p>
            </div>
            <div style="margin-top: 15px;">
                <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">HOME ADDRESS</p>
                <p style="color: var(--text-light); font-size: 16px;">${registration.personalData.homeAddress}</p>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 15px;">
                <div>
                    <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">CELL PHONE</p>
                    <p style="color: var(--text-light); font-size: 16px;">${registration.personalData.cellPhone}</p>
                </div>
                <div>
                    <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">EMAIL</p>
                    <p style="color: var(--text-light); font-size: 16px;">${registration.personalData.email}</p>
                </div>
            </div>
        </div>

        <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; border: 2px solid rgba(212,175,55,0.3); margin-bottom: 20px;">
            <h3 style="color: var(--gold-accent); font-family: 'Orbitron', sans-serif; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid var(--gold-accent); padding-bottom: 10px;">MILITARY SERVICE RECORDS</h3>
            <div style="display: grid; gap: 15px;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">DATE ENTERED MIL SVC</p>
                        <p style="color: var(--text-light); font-size: 16px;">${registration.militaryRecords.dateEntered}</p>
                    </div>
                    <div>
                        <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">LOCATION</p>
                        <p style="color: var(--text-light); font-size: 16px;">${registration.militaryRecords.entryLocation}</p>
                    </div>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div>
                        <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">11RCDU/HDU</p>
                        <p style="color: var(--text-light); font-size: 16px;">${registration.militaryRecords.rcduHdu}</p>
                    </div>
                    <div>
                        <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">11RCDG</p>
                        <p style="color: var(--text-light); font-size: 16px;">${registration.militaryRecords.rcdg}</p>
                    </div>
                </div>
                <div>
                    <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">LAST UNIT ASSIGNMENT</p>
                    <p style="color: var(--text-light); font-size: 16px;">${registration.militaryRecords.lastUnit}</p>
                </div>
                <div>
                    <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">LAST LOCATION</p>
                    <p style="color: var(--text-light); font-size: 16px;">${registration.militaryRecords.lastLocation}</p>
                </div>
                <div>
                    <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">RETIREMENT DATE & AUTHORITY</p>
                    <p style="color: var(--text-light); font-size: 16px;">${registration.militaryRecords.retirementDate}</p>
                </div>
            </div>
        </div>

        <div style="background: rgba(0,0,0,0.3); padding: 20px; border-radius: 8px; border: 2px solid rgba(212,175,55,0.3);">
            <h3 style="color: var(--gold-accent); font-family: 'Orbitron', sans-serif; font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid var(--gold-accent); padding-bottom: 10px;">CERTIFICATION</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                <div>
                    <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">ADMISSION DATE</p>
                    <p style="color: var(--text-light); font-size: 16px;">${registration.certification.admissionDate}</p>
                </div>
                <div>
                    <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">ATTACHMENT</p>
                    <p style="color: var(--text-light); font-size: 16px;">${registration.certification.attachment}</p>
                </div>
            </div>
            <div style="margin-top: 15px;">
                <p style="color: var(--gold-accent); font-size: 12px; font-weight: 700; margin-bottom: 5px;">REGISTERED</p>
                <p style="color: var(--text-light); font-size: 16px;">${new Date(registration.timestamp).toLocaleString()}</p>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function deleteRecord(id) {
    if (!confirm('Are you sure you want to delete this registration? This action cannot be undone.')) {
        return;
    }

    try {
        allRegistrations = allRegistrations.filter(reg => reg.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(allRegistrations));
        loadRegistrations();
        updateStatistics();
        
        showNotification('Record deleted successfully', 'success');
    } catch (error) {
        console.error('Error deleting record:', error);
        showNotification('Error deleting record', 'error');
    }
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (!searchTerm) {
        displayRegistrations(allRegistrations);
        return;
    }

    const filtered = allRegistrations.filter(reg => {
        const fullName = `${reg.personalData.firstName} ${reg.personalData.familyName}`.toLowerCase();
        const email = reg.personalData.email.toLowerCase();
        const id = reg.id.toLowerCase();
        
        return fullName.includes(searchTerm) || 
               email.includes(searchTerm) || 
               id.includes(searchTerm);
    });

    displayRegistrations(filtered);
}

function updateStatistics() {
    const total = allRegistrations.length;
    document.getElementById('totalRegistrations').textContent = total;

    // Today's registrations
    const today = new Date().toDateString();
    const todayCount = allRegistrations.filter(reg => {
        return new Date(reg.timestamp).toDateString() === today;
    }).length;
    document.getElementById('todayRegistrations').textContent = todayCount;

    // This month's registrations
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const monthCount = allRegistrations.filter(reg => {
        const date = new Date(reg.timestamp);
        return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    }).length;
    document.getElementById('monthRegistrations').textContent = monthCount;
}

function exportAllData() {
    if (allRegistrations.length === 0) {
        showNotification('No data to export', 'warning');
        return;
    }

    try {
        // Create CSV content
        let csv = 'ID,Timestamp,Rank,First Name,Family Name,MI,AFPSN,DOB,Status,Spouse,Address,Cell Phone,Email,Date Entered,Entry Location,RCDU/HDU,RCDG,Last Unit,Last Location,Retirement Date,Admission Date\n';

        allRegistrations.forEach(reg => {
            const row = [
                reg.id,
                new Date(reg.timestamp).toISOString(),
                reg.personalData.retRank,
                reg.personalData.firstName,
                reg.personalData.familyName,
                reg.personalData.middleInitial,
                reg.personalData.afpsn,
                reg.personalData.dateOfBirth,
                reg.personalData.status,
                reg.personalData.spouseName,
                `"${reg.personalData.homeAddress}"`,
                reg.personalData.cellPhone,
                reg.personalData.email,
                reg.militaryRecords.dateEntered,
                reg.militaryRecords.entryLocation,
                reg.militaryRecords.rcduHdu,
                reg.militaryRecords.rcdg,
                `"${reg.militaryRecords.lastUnit}"`,
                reg.militaryRecords.lastLocation,
                reg.militaryRecords.retirementDate,
                reg.certification.admissionDate
            ];
            csv += row.join(',') + '\n';
        });

        // Download file
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ROTC_Registrations_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        showNotification('Data exported successfully', 'success');
    } catch (error) {
        console.error('Error exporting data:', error);
        showNotification('Error exporting data', 'error');
    }
}

function clearAllRecords() {
    if (!confirm('⚠️ WARNING: This will permanently delete ALL registration records. This action CANNOT be undone. Are you absolutely sure?')) {
        return;
    }

    if (!confirm('FINAL CONFIRMATION: All data will be lost forever. Continue?')) {
        return;
    }

    try {
        localStorage.removeItem(STORAGE_KEY);
        allRegistrations = [];
        loadRegistrations();
        updateStatistics();
        showNotification('All records have been cleared', 'success');
    } catch (error) {
        console.error('Error clearing records:', error);
        showNotification('Error clearing records', 'error');
    }
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 20px 30px;
        background: ${type === 'success' ? 'rgba(76, 175, 80, 0.95)' : type === 'error' ? 'rgba(212, 55, 55, 0.95)' : 'rgba(255, 193, 7, 0.95)'};
        color: white;
        border-radius: 8px;
        border: 2px solid ${type === 'success' ? '#4caf50' : type === 'error' ? '#d43737' : '#ffc107'};
        font-family: 'Rajdhani', sans-serif;
        font-weight: 700;
        font-size: 16px;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        animation: slideIn 0.3s ease-out;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const animationStyles = document.createElement('style');
animationStyles.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(animationStyles);
