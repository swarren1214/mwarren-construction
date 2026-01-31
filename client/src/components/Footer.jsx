import React from 'react'
import { FaPhone, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-earth-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">M.WARREN CONSTRUCTION</h3>
            <p className="text-gray-300 mb-4">
              B100 General Contractor specializing in professional landscapes and retaining walls. 
              Serving Utah County with 15+ years of experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#hero" className="text-gray-300 hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-300 hover:text-white transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <div className="space-y-3">
              <a 
                href="tel:8013698515"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <FaPhone />
                <span>(801) 369-8515</span>
              </a>
              <a 
                href="mailto:mikewarrenconstruction@outlook.com"
                className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
              >
                <FaEnvelope />
                <span>mikewarrenconstruction@outlook.com</span>
              </a>
            </div>
            <div className="mt-6">
              <p className="text-gray-300 text-sm">
                Monday - Friday: 8:00 AM - 5:00 PM<br />
                Saturday: Closed<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-earth-700 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} M.WARREN CONSTRUCTION. All rights reserved. | Licensed B100 General Contractor
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Serving Utah County & Surrounding Areas
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
