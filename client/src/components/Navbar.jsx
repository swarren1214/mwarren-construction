import React, { useState, useEffect } from 'react'
import { FaPhone, FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'

const Navbar = ({ theme, onToggleTheme }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const baseUrl = import.meta.env.BASE_URL

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
      isScrolled ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
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
                src={isScrolled ? (theme === 'dark' ? `${baseUrl}logo/logo-white.png` : `${baseUrl}logo/logo-default.png`) : `${baseUrl}logo/logo-white.png`}
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
                isScrolled ? 'text-gray-700 dark:text-gray-200 hover:text-earth-600 dark:hover:text-earth-400' : 'text-white hover:text-gray-200'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 dark:text-gray-200 hover:text-earth-600 dark:hover:text-earth-400' : 'text-white hover:text-gray-200'
              }`}
            >
              Team
            </button>
            <button 
              onClick={() => scrollToSection('gallery')}
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 dark:text-gray-200 hover:text-earth-600 dark:hover:text-earth-400' : 'text-white hover:text-gray-200'
              }`}
            >
              Gallery
            </button>
            <button 
              onClick={() => scrollToSection('videos')}
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 dark:text-gray-200 hover:text-earth-600 dark:hover:text-earth-400' : 'text-white hover:text-gray-200'
              }`}
            >
              Videos
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`font-medium transition-colors ${
                isScrolled ? 'text-gray-700 dark:text-gray-200 hover:text-earth-600 dark:hover:text-earth-400' : 'text-white hover:text-gray-200'
              }`}
            >
              Contact
            </button>
            <div className="flex flex-row items-center gap-4">
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
              <button
                onClick={onToggleTheme}
                className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors ${
                  isScrolled
                    ? 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-slate-700'
                    : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
                }`}
                aria-label="Toggle dark mode"
                title="Toggle dark mode"
              >
                {theme === 'dark' ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden text-2xl ${isScrolled ? 'text-gray-700 dark:text-gray-200' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-gray-200 dark:border-slate-800">
            <div className="flex flex-col space-y-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-gray-700 dark:text-gray-200 hover:text-earth-600 dark:hover:text-earth-400 font-medium px-4 py-2 text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="text-gray-700 dark:text-gray-200 hover:text-earth-600 dark:hover:text-earth-400 font-medium px-4 py-2 text-left"
              >
                Team
              </button>
              <button 
                onClick={() => scrollToSection('gallery')}
                className="text-gray-700 dark:text-gray-200 hover:text-earth-600 dark:hover:text-earth-400 font-medium px-4 py-2 text-left"
              >
                Gallery
              </button>
              <button 
                onClick={() => scrollToSection('videos')}
                className="text-gray-700 dark:text-gray-200 hover:text-earth-600 dark:hover:text-earth-400 font-medium px-4 py-2 text-left"
              >
                Videos
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 dark:text-gray-200 hover:text-earth-600 dark:hover:text-earth-400 font-medium px-4 py-2 text-left"
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
              <button
                onClick={onToggleTheme}
                className="mx-4 flex items-center justify-center space-x-2 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-yellow-300 font-semibold px-4 py-3 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
