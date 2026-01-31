import React, { useState, useEffect } from 'react'
import { FaPhone, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-lg py-4' : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection('hero')}
              className="transition-opacity hover:opacity-80"
            >
              <img 
                src={isScrolled ? '/logo/logo-default.png' : '/logo/logo-white.png'}
                alt="M.WARREN CONSTRUCTION"
                className="h-12 w-auto"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-earth-600' : 'text-white hover:text-gray-200'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-earth-600' : 'text-white hover:text-gray-200'
              }`}
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 hover:text-earth-600' : 'text-white hover:text-gray-200'
              }`}
            >
              Contact
            </button>
            <a 
              href="tel:8013698515"
              className={`flex items-center space-x-2 font-semibold px-4 py-2 rounded-lg transition-all ${
                isScrolled 
                  ? 'bg-earth-600 text-white hover:bg-earth-700' 
                  : 'bg-white text-earth-700 hover:bg-gray-100'
              }`}
            >
              <FaPhone className="text-sm" />
              <span>(801) 369-8515</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden text-2xl ${isScrolled ? 'text-gray-700' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white rounded-lg shadow-xl">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-gray-700 hover:text-earth-600 font-medium px-4 py-2 text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-gray-700 hover:text-earth-600 font-medium px-4 py-2 text-left"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-earth-600 font-medium px-4 py-2 text-left"
              >
                Contact
              </button>
              <a 
                href="tel:8013698515"
                className="flex items-center space-x-2 bg-earth-600 text-white font-semibold px-4 py-3 rounded-lg mx-4 hover:bg-earth-700 transition-colors"
              >
                <FaPhone />
                <span>(801) 369-8515</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
