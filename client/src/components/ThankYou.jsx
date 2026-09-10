import React, { useEffect } from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import Navbar from './Navbar'
import Footer from './Footer'

const ThankYou = ({ theme, onToggleTheme }) => {
  useEffect(() => {
    const leadTrackedKey = 'meta_pixel_lead_tracked'

    if (window.sessionStorage.getItem(leadTrackedKey) === 'true') {
      return
    }

    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead')
      window.sessionStorage.setItem(leadTrackedKey, 'true')
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar theme={theme} onToggleTheme={onToggleTheme} />
      <main className="flex-1 flex items-center justify-center px-4 py-24 bg-white dark:bg-slate-900">
        <div className="max-w-2xl text-center">
          <FaCheckCircle className="mx-auto mb-6 text-6xl text-earth-600" aria-hidden="true" />
          <h1 className="section-title">Thank You</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Your project details have been sent successfully. We&apos;ll get back to you within 24 hours.
          </p>
          <a href="/" className="btn-primary inline-block">
            Return to Homepage
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ThankYou