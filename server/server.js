import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

// Email transporter configuration
// Configure with your email service
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp-mail.outlook.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER || 'mikewarrenconstruction@outlook.com',
    pass: process.env.EMAIL_PASS || 'your-email-password-here'
  }
})

// Contact form endpoint
app.post('/api/contact', limiter, async (req, res) => {
  try {
    const { name, email, phone, projectType, message } = req.body

    // Validation
    if (!name || !email || !phone || !projectType || !message) {
      return res.status(400).json({ 
        error: 'All fields are required' 
      })
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      })
    }

    // Phone validation
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ 
        error: 'Invalid phone number format' 
      })
    }

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER || 'mikewarrenconstruction@outlook.com',
      to: process.env.EMAIL_USER || 'mikewarrenconstruction@outlook.com',
      replyTo: email,
      subject: `New Project Inquiry - ${projectType} from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7d6340; border-bottom: 3px solid #7d6340; padding-bottom: 10px;">
            New Project Inquiry
          </h2>
          
          <div style="background-color: #f5f1ea; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #3d3020; margin-top: 0;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
            <p><strong>Project Type:</strong> ${projectType}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #3d3020;">Project Description</h3>
            <p style="white-space: pre-wrap; background-color: #faf9f7; padding: 15px; border-left: 4px solid #7d6340; border-radius: 3px;">
              ${message}
            </p>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e8dfc9; color: #666; font-size: 12px;">
            <p>This inquiry was submitted through the M.WARREN CONSTRUCTION website contact form.</p>
            <p>Submitted on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
      text: `
        New Project Inquiry
        
        Contact Information:
        Name: ${name}
        Email: ${email}
        Phone: ${phone}
        Project Type: ${projectType}
        
        Project Description:
        ${message}
        
        Submitted on: ${new Date().toLocaleString()}
      `
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Send auto-reply to customer
    const autoReplyOptions = {
      from: process.env.EMAIL_USER || 'mikewarrenconstruction@outlook.com',
      to: email,
      subject: 'Thank you for contacting M.WARREN CONSTRUCTION',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #7d6340;">Thank You for Your Inquiry!</h2>
          
          <p>Dear ${name},</p>
          
          <p>Thank you for reaching out to M.WARREN CONSTRUCTION. We have received your inquiry regarding <strong>${projectType}</strong> and appreciate your interest in our services.</p>
          
          <p>We will review your project details and get back to you within 24 hours. If you need immediate assistance, please feel free to call us at <a href="tel:8013698515" style="color: #7d6340; font-weight: bold;">(801) 369-8515</a>.</p>
          
          <div style="background-color: #f5f1ea; padding: 20px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #3d3020;">Your Inquiry Summary</h3>
            <p><strong>Project Type:</strong> ${projectType}</p>
            <p><strong>Your Message:</strong></p>
            <p style="white-space: pre-wrap; background-color: #faf9f7; padding: 10px; border-radius: 3px;">
              ${message}
            </p>
          </div>
          
          <p>We're grateful for every opportunity to serve our community and look forward to potentially working with you.</p>
          
          <p style="margin-top: 30px;">
            Best regards,<br>
            <strong>M.WARREN CONSTRUCTION</strong><br>
            B100 General Contractor<br>
            Professional Landscapes & Retaining Walls<br>
            <a href="tel:8013698515" style="color: #7d6340;">(801) 369-8515</a><br>
            <a href="mailto:mikewarrenconstruction@outlook.com" style="color: #7d6340;">mikewarrenconstruction@outlook.com</a>
          </p>
        </div>
      `
    }

    await transporter.sendMail(autoReplyOptions)

    res.status(200).json({ 
      message: 'Message sent successfully',
      success: true
    })

  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ 
      error: 'Failed to send message. Please try again or call us directly.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})
