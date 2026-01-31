import React from 'react'
import { FaPhone, FaEnvelope, FaHardHat, FaAward } from 'react-icons/fa'

const Hero = () => {
  const baseUrl = import.meta.env.BASE_URL
  
  const scrollToContact = () => {
    const element = document.getElementById('contact')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const scrollToGallery = () => {
    const element = document.getElementById('gallery')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${baseUrl}images/IMG_0300.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-earth-900/80 via-earth-800/85 to-gray-900/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="text-center text-white">
          {/* Main Heading */}
          <div className="mb-6">
            <h1 className=" text-4xl sm:text-3xl md:text-7xl lg:text-8xl font-bold tracking-wider mb-4 drop-shadow-2xl">
              M.WARREN CONSTRUCTION
            </h1>
            <div className="h-1 w-32 bg-white mx-auto mb-6"></div>
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-100 tracking-wide">
              B100 GENERAL CONTRACTOR
            </p>
          </div>

          {/* Specialization */}
          <div className="mb-16">
            <p className="text-2xl sm:text-3xl md:text-4xl font-light text-gray-200 leading-relaxed max-w-4xl mx-auto">
              Professional Home Builds, Remodels, Landscapes & Retaining Walls
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <FaHardHat className="text-4xl mb-3 mx-auto text-yellow-400" />
              <h3 className="text-3xl font-bold mb-2">15+</h3>
              <p className="text-gray-200">Years Experience</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <FaAward className="text-4xl mb-3 mx-auto text-yellow-400" />
              <h3 className="text-3xl font-bold mb-2">B100</h3>
              <p className="text-gray-200">Licensed Contractor</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <div className="text-4xl mb-3 mx-auto">🏆</div>
              <h3 className="text-3xl font-bold mb-2">100%</h3>
              <p className="text-gray-200">Client Satisfaction</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={scrollToContact}
              className="bg-earth-600 hover:bg-earth-700 text-white font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 shadow-2xl hover:shadow-earth-600/50 transform hover:-translate-y-1"
            >
              Get Free Estimate
            </button>
            <button 
              onClick={scrollToGallery}
              className="bg-white hover:bg-gray-100 text-earth-700 font-bold py-4 px-10 rounded-lg text-lg transition-all duration-300 shadow-2xl transform hover:-translate-y-1"
            >
              View Our Work
            </button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-lg">
            <a 
              href="tel:8013698515"
              className="flex items-center space-x-2 hover:text-yellow-400 transition-colors"
            >
              <FaPhone className="text-xl" />
              <span className="font-semibold">(801) 369-8515</span>
            </a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a 
              href="mailto:mikewarrenconstruction@outlook.com"
              className="flex items-center space-x-2 hover:text-yellow-400 transition-colors"
            >
              <FaEnvelope className="text-xl" />
              <span className="font-semibold">mikewarrenconstruction@outlook.com</span>
            </a>
          </div>

          {/* Tagline */}
          <div className="mt-12">
            <p className="text-xl text-gray-300 italic font-light">
              "Grateful for every opportunity to bring your vision to life"
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero
