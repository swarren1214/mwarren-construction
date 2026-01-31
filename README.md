# M.WARREN CONSTRUCTION - Portfolio Website

Professional portfolio website for M.WARREN CONSTRUCTION, a B100 General Contractor specializing in professional landscapes and retaining walls with 15+ years of experience.

## Features

- **Responsive Design**: Fully responsive across all devices (mobile, tablet, desktop)
- **Modern UI**: Built with React and Tailwind CSS for a professional appearance
- **Photo Gallery**: Interactive lightbox gallery showcasing completed projects
- **Contact Form**: Validated contact form with email notifications
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance**: Optimized images and lazy loading
- **Accessibility**: WCAG compliant with proper ARIA labels

## Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Vite (Build tool)
- React Icons
- Axios

### Backend
- Node.js
- Express
- Nodemailer (Email handling)
- Helmet (Security)
- Express Rate Limit (DDoS protection)

## Installation

### Prerequisites
- Node.js 16+ and npm installed
- Email account credentials for contact form (Outlook, Gmail, etc.)

### Setup Instructions

1. **Clone or navigate to the project directory**
   ```bash
   cd /Users/stephenwarren/Developer/mwarren-construction
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../server
   npm install
   ```

4. **Configure Environment Variables**
   
   Copy the `.env.example` file to `.env` in the server directory:
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Edit `.env` and add your email credentials:
   ```env
   PORT=5000
   NODE_ENV=production
   
   # For Outlook/Hotmail
   SMTP_HOST=smtp-mail.outlook.com
   SMTP_PORT=587
   EMAIL_USER=mikewarrenconstruction@outlook.com
   EMAIL_PASS=your-actual-password
   
   # For Gmail (requires App Password)
   # SMTP_HOST=smtp.gmail.com
   # SMTP_PORT=587
   # EMAIL_USER=your-gmail@gmail.com
   # EMAIL_PASS=your-app-specific-password
   ```

5. **Add Project Photos**
   
   Place your actual project photos in `client/public/images/` and update the image URLs in `client/src/components/Gallery.jsx`

## Running the Application

### Development Mode

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```
The server will start on `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
The website will open at `http://localhost:3000`

### Production Build

1. **Build the Frontend:**
   ```bash
   cd client
   npm run build
   ```

2. **Configure server to serve the built files** (optional - for deployment)

## Project Structure

```
mwarren-construction/
├── client/                 # React frontend
│   ├── public/
│   │   └── images/        # Gallery images
│   ├── src/
│   │   ├── components/
│   │   │   ├── Hero.jsx          # Hero section
│   │   │   ├── Gallery.jsx       # Photo gallery with lightbox
│   │   │   ├── Contact.jsx       # Contact form
│   │   │   ├── Footer.jsx        # Footer
│   │   │   └── Navbar.jsx        # Navigation
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── server/                 # Node.js backend
│   ├── server.js          # Express server & email handler
│   ├── package.json
│   ├── .env               # Environment variables (not in git)
│   └── .env.example       # Environment variables template
└── README.md
```

## Customization

### Adding Your Own Photos

1. Place high-quality images in `client/public/images/`
2. Update the `images` array in `client/src/components/Gallery.jsx`:
   ```javascript
   const images = [
     {
       url: '/images/project1.jpg',
       title: 'Your Project Title',
       description: 'Project description'
     },
     // Add more images...
   ]
   ```

### Changing Colors

The color scheme is defined in `client/tailwind.config.js`. The earth-tone palette can be customized:

```javascript
colors: {
  earth: {
    500: '#9d7e4d',  // Primary color
    600: '#7d6340',  // Darker shade
    // ... modify as needed
  }
}
```

### Email Configuration

#### For Gmail:
1. Enable 2-Factor Authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password in `.env`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-digit-app-password
   ```

#### For Outlook/Hotmail:
1. Use your regular Outlook credentials
2. Make sure "Less secure app access" is enabled if needed
3. Configuration in `.env`:
   ```env
   SMTP_HOST=smtp-mail.outlook.com
   SMTP_PORT=587
   EMAIL_USER=mikewarrenconstruction@outlook.com
   EMAIL_PASS=your-password
   ```

## Deployment

### Recommended Hosting Options

1. **Vercel** (Frontend) + **Railway/Render** (Backend)
2. **Netlify** (Frontend) + **Heroku** (Backend)
3. **DigitalOcean** (Full-stack)
4. **AWS** (S3 + Lambda/EC2)

### Deployment Steps

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Deploy the `client/dist` folder to your frontend host

3. Deploy the `server` folder to your backend host

4. Update environment variables on your hosting platform

5. Update the API endpoint in `client/vite.config.js` if needed

## Contact Information

- **Business**: M.WARREN CONSTRUCTION
- **Phone**: (801) 369-8515
- **Email**: mikewarrenconstruction@outlook.com
- **License**: B100 General Contractor
- **Experience**: 15+ years

## Support

For technical issues or questions about this website, please contact the developer or submit an issue.

## License

Copyright © 2026 M.WARREN CONSTRUCTION. All rights reserved.
