import React, { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    projectType: '',
    projectDescription: ''
  })
  const [honeypot, setHoneypot] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const projectTypes = [
    'Retaining Wall',
    'Landscape Design',
    'Hardscaping',
    'Patio/Walkway',
    'General Construction',
    'Other'
  ]

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required'
    } else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Phone number is invalid'
    }
    
    if (!formData.projectType) {
      newErrors.projectType = 'Please select a project type'
    }
    
    if (!formData.projectDescription.trim()) {
      newErrors.projectDescription = 'Project description is required'
    }
    
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Check honeypot - if filled, it's likely a bot
    if (honeypot) {
      return
    }
    
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    setSubmitStatus(null)
    setErrorMessage('')
    
    try {
      // Get reCAPTCHA token
      let recaptchaToken = ''
      if (window.grecaptcha) {
        recaptchaToken = await new Promise((resolve) => {
          window.grecaptcha.ready(async () => {
            try {
              const token = await window.grecaptcha.execute('6Ldu7V4sAAAAAITIiKQLMzoxAUNMAMRUyTYRFCt4', { action: 'submit' })
              resolve(token)
            } catch (error) {
              console.error('reCAPTCHA error:', error)
              resolve('')
            }
          })
        })
      }
      
      // Prepare form data for Formspree
      const formDataToSend = new FormData()
      formDataToSend.append('fullName', formData.fullName)
      formDataToSend.append('email', formData.email)
      formDataToSend.append('phone', formData.phone)
      formDataToSend.append('projectType', formData.projectType)
      formDataToSend.append('projectDescription', formData.projectDescription)
      formDataToSend.append('_gotcha', honeypot)
      if (recaptchaToken) {
        formDataToSend.append('g-recaptcha-response', recaptchaToken)
      }
      
      // Submit to Formspree
      const response = await fetch('https://formspree.io/f/mpqlbndv', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      
      if (response.ok) {
        // Success
        setSubmitStatus('success')
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          projectType: '',
          projectDescription: ''
        })
        setHoneypot('')
        setErrors({})
      } else {
        // Error from server
        const data = await response.json()
        setSubmitStatus('error')
        setErrorMessage(data.error || data.errors?.[0]?.message || 'There was an error sending your message. Please try calling us directly at (801) 369-8515.')
      }
    } catch (error) {
      // Network or other error
      setSubmitStatus('error')
      setErrorMessage('There was an error sending your message. Please try calling us directly at (801) 369-8515.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Get In Touch</h2>
          <div className="h-1 w-24 bg-earth-600 mx-auto mb-6"></div>
          <p className="section-subtitle">
            Ready to start your project? Contact us today for a free estimate. 
            We're grateful for every opportunity to serve you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Let's Build Something Great Together</h3>
              <p className="text-gray-600 text-lg mb-8">
                With over 15 years of experience as a General Contractor, we are committed to delivering exceptional Results for every project.
                We build everything from new homes to remodels and we possess a unique in house artistic talent for Landscape and retaining wall construction and design. 
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-4">
              <a 
                href="tel:8013698515"
                className="flex items-start space-x-4 p-6 bg-earth-50 rounded-lg hover:bg-earth-100 transition-colors group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-earth-600 rounded-lg flex items-center justify-center group-hover:bg-earth-700 transition-colors">
                    <FaPhone className="text-white text-xl" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                  <p className="text-earth-700 font-semibold text-lg">(801) 369-8515</p>
                  <p className="text-gray-600 text-sm">Call us for immediate assistance</p>
                </div>
              </a>

              <a 
                href="mailto:mikewarrenconstruction@outlook.com"
                className="flex items-start space-x-4 p-6 bg-earth-50 rounded-lg hover:bg-earth-100 transition-colors group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-earth-600 rounded-lg flex items-center justify-center group-hover:bg-earth-700 transition-colors">
                    <FaEnvelope className="text-white text-xl" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                  <p className="text-earth-700 font-semibold text-lg break-all">mikewarrenconstruction@outlook.com</p>
                  <p className="text-gray-600 text-sm">Send us your project details</p>
                </div>
              </a>

              <div className="flex items-start space-x-4 p-6 bg-earth-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-earth-600 rounded-lg flex items-center justify-center">
                    <FaClock className="text-white text-xl" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Business Hours</h4>
                  <p className="text-gray-700">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-700">Saturday: Closed</p>
                  <p className="text-gray-700">Sunday: Closed</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-earth-50 rounded-lg">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-earth-600 rounded-lg flex items-center justify-center">
                    <FaMapMarkerAlt className="text-white text-xl" />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Service Area</h4>
                  <p className="text-gray-700">Utah County & Surrounding Areas</p>
                  <p className="text-gray-600 text-sm">Licensed B100 General Contractor</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 rounded-xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Request a Free Estimate</h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start space-x-3">
                <FaCheckCircle className="text-green-600 text-xl flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-900">Message Sent Successfully!</h4>
                  <p className="text-green-700 text-sm">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">
                  {errorMessage || 'There was an error sending your message. Please try calling us directly at (801) 369-8515.'}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 outline-none transition-colors ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="John Smith"
                  required
                />
                {errors.fullName && <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 outline-none transition-colors ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                    required
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 outline-none transition-colors ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="(801) 555-0123"
                    required
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Type *
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className={`w-full h-12 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 outline-none transition-colors ${
                    errors.projectType ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select a project type</option>
                  {projectTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.projectType && <p className="mt-1 text-sm text-red-600">{errors.projectType}</p>}
              </div>

              <div>
                <label htmlFor="projectDescription" className="block text-sm font-semibold text-gray-700 mb-2">
                  Project Description *
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-earth-500 focus:border-earth-500 outline-none transition-colors resize-none ${
                    errors.projectDescription ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell us about your project..."
                  required
                ></textarea>
                {errors.projectDescription && <p className="mt-1 text-sm text-red-600">{errors.projectDescription}</p>}
              </div>

              {/* Honeypot field for spam protection */}
              <input
                type="text"
                name="_gotcha"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
