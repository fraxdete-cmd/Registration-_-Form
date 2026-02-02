# 11RCDG ROTC Registration System
### SMCTI Tagum College - Professional Military Management System

---

## 🎖️ SYSTEM OVERVIEW

This is a professional, military-themed ROTC registration and management system designed for SMCTI Tagum College's 11RCDG (11th Reserve Command Division Group). The system features a modern, secure registration form with an administrative portal for managing cadet records.

---

## 🚀 FEATURES

### Registration Form (`index.html`)
- **Professional Military Design**: Custom camouflage-themed background with gold accents
- **Photo Upload**: 1x1 ID photo upload with live preview
- **Complete Data Collection**:
  - Personal Data (Name, DOB, Status, Address, Contact)
  - Military Service Records (Entry dates, assignments, units)
  - Certification and validation
- **Real-time Validation**: Form validation before submission
- **Local Storage**: All data stored in browser's localStorage
- **Success Notifications**: Visual confirmation of successful registration
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Admin Portal (`admin.html`)
- **Secure Login System**:
  - Username: `admin`
  - Password: `rotc2026`
- **Dashboard Features**:
  - Real-time statistics (Total, Today, This Month)
  - Complete records table with photo display
  - Search functionality (by name, email, or ID)
  - Detailed record viewer
  - Export to CSV
  - Delete individual records
  - Clear all records option
- **Professional UI**: Military-themed design matching registration form
- **Session Management**: Login persists during browser session

---

## 📁 FILE STRUCTURE

```
rotc-registration-system/
│
├── index.html              # Main registration form
├── styles.css              # Registration form styles
├── script.js               # Registration form functionality
│
├── admin.html              # Admin portal
├── admin-styles.css        # Admin portal styles
├── admin-script.js         # Admin portal functionality
│
└── README.md              # This file
```

---

## 🔧 SETUP INSTRUCTIONS

### Option 1: Local Setup (Simple)

1. **Download all files** to a folder on your computer

2. **Open `index.html`** in your web browser
   - Just double-click the file
   - Or right-click → Open with → Your browser

3. **That's it!** The system is ready to use

### Option 2: VS Code + GitHub Setup (Recommended)

#### Prerequisites:
- Install [VS Code](https://code.visualstudio.com/)
- Install [Git](https://git-scm.com/)
- Create a [GitHub account](https://github.com/)

#### Steps:

1. **Create a new repository on GitHub**
   ```
   - Go to GitHub.com
   - Click "New Repository"
   - Name it: "rotc-registration-system"
   - Make it Public or Private
   - Click "Create Repository"
   ```

2. **Clone repository to your computer**
   ```bash
   git clone https://github.com/YOUR-USERNAME/rotc-registration-system.git
   cd rotc-registration-system
   ```

3. **Add all the files**
   - Copy all 6 files into the cloned folder

4. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit - ROTC Registration System"
   git push origin main
   ```

5. **Enable GitHub Pages (Optional - for web hosting)**
   ```
   - Go to your repository on GitHub
   - Click "Settings"
   - Scroll to "Pages"
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be live at: https://YOUR-USERNAME.github.io/rotc-registration-system/
   ```

---

## 🔐 ADMIN ACCESS

**Login Credentials:**
- **Username**: `admin`
- **Password**: `rotc2026`

**To Access Admin Portal:**
1. Open the registration page
2. Click "ADMIN PORTAL" button at the bottom
3. Enter credentials
4. Access full dashboard

---

## 💾 DATA STORAGE

### How It Works:
- All registration data is stored in the browser's **localStorage**
- Data persists even after closing the browser
- Data is stored locally on each computer/device
- **Important**: Clearing browser data will delete all records

### Data Persistence:
- ✅ Survives browser restart
- ✅ Survives computer restart
- ❌ Does NOT sync between devices
- ❌ Lost if browser cache/data is cleared

### For Production Use:
To make this a full production system with centralized database, you would need:
1. A backend server (Node.js, PHP, Python, etc.)
2. A database (MySQL, PostgreSQL, MongoDB, etc.)
3. Web hosting service

The current localStorage solution is perfect for:
- Testing and development
- Small-scale deployments
- Single-computer usage
- Offline functionality

---

## 📊 USING THE SYSTEM

### For Cadets (Registration):

1. **Open the registration form** (`index.html`)

2. **Upload Photo**:
   - Click the photo upload box
   - Select a 1x1 ID photo
   - Preview appears automatically

3. **Fill Personal Data**:
   - Complete all required fields
   - Select marital status
   - Provide contact information

4. **Fill Military Records**:
   - Enter service dates and locations
   - Specify unit assignments
   - Retirement information

5. **Submit**:
   - Click "SUBMIT REGISTRATION"
   - Wait for success message
   - Note your Registration ID

### For Administrators:

1. **Access Admin Portal**:
   - Click "ADMIN PORTAL" button
   - Login with credentials

2. **View Dashboard**:
   - See statistics at the top
   - Browse all registrations in the table

3. **Search Records**:
   - Use search box to find specific cadets
   - Search by name, email, or ID

4. **View Details**:
   - Click "👁️ VIEW" button
   - See complete registration information
   - View uploaded photo

5. **Export Data**:
   - Click "📥 EXPORT ALL DATA"
   - Downloads CSV file with all records

6. **Manage Records**:
   - Delete individual records with "🗑️ DELETE"
   - Clear all records with "🗑️ CLEAR ALL RECORDS"

---

## 🎨 CUSTOMIZATION

### Change Admin Credentials:
Edit `admin-script.js`:
```javascript
const ADMIN_CREDENTIALS = {
    username: 'your-username',
    password: 'your-password'
};
```

### Change Color Scheme:
Edit CSS files (`:root` section):
```css
:root {
    --gold-accent: #d4af37;  /* Change to your color */
    --army-green: #3d4f2f;   /* Change to your color */
    /* etc. */
}
```

### Change College Name:
Edit `index.html` and `admin.html` - search for "SMCTI TAGUM COLLEGE"

---

## 🔒 SECURITY NOTES

### Current Security Level:
- ⚠️ **Development/Testing Level**
- Login credentials stored in plain text (client-side)
- No server-side validation
- Data stored locally (not encrypted)

### For Production Deployment:
1. **Implement server-side authentication**
2. **Use HTTPS/SSL**
3. **Add database encryption**
4. **Implement proper password hashing**
5. **Add rate limiting**
6. **Set up backup system**

---

## 📱 BROWSER COMPATIBILITY

✅ **Fully Compatible:**
- Google Chrome (latest)
- Microsoft Edge (latest)
- Mozilla Firefox (latest)
- Safari (latest)
- Opera (latest)

✅ **Mobile Compatible:**
- iOS Safari
- Android Chrome
- Samsung Internet

---

## 🐛 TROUBLESHOOTING

### Registration not saving?
- Check if browser allows localStorage
- Try different browser
- Check browser console for errors (F12)

### Can't login to admin?
- Verify credentials: `admin` / `rotc2026`
- Clear browser cache and try again
- Check browser console for errors

### Photos not uploading?
- Ensure file is an image (JPG, PNG)
- Check file size (should be reasonable)
- Try different image

### Data disappeared?
- Check if browser data was cleared
- Try different computer (data is device-specific)
- Restore from exported CSV if available

---

## 📞 SUPPORT

For issues or questions about this system:
1. Check this README thoroughly
2. Review browser console for errors (Press F12)
3. Contact your system administrator

---

## 📄 LICENSE

This system is created for SMCTI Tagum College - 11RCDG ROTC.
All rights reserved.

---

## 🎖️ CREDITS

**Designed for:**
- SMCTI Tagum College
- 11th Reserve Command Division Group (11RCDG)
- ROTC Program

**System Version:** 1.0.0  
**Last Updated:** February 2026

---

## 🚀 FUTURE ENHANCEMENTS

Potential features for future versions:
- [ ] Cloud database integration
- [ ] Email notifications
- [ ] PDF report generation
- [ ] Batch photo uploads
- [ ] Advanced analytics dashboard
- [ ] Multi-admin support
- [ ] Audit trail logging
- [ ] Mobile app version
- [ ] QR code generation for IDs
- [ ] Integration with existing college systems

---

**Ready to Deploy! 🎖️**

The system is fully functional and ready for immediate use. Simply open `index.html` in any modern web browser to begin registering cadets.
