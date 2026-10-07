import React, { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Team from './components/Team'
import Gallery from './components/Gallery'
import Videos from './components/Videos'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ThankYou from './components/ThankYou'

function App() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || savedTheme === 'light') {
      setTheme(savedTheme)
      return
    }

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    setTheme(prefersDark ? 'dark' : 'light')
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'))
  }

  if (window.location.hash === '#/thank-you' || window.location.pathname === '/thank-you' || window.location.pathname === '/thank-you/') {
    return <ThankYou theme={theme} onToggleTheme={toggleTheme} />
  }

  return (
    <div className="min-h-screen">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <Hero />
      <Team />
      <Gallery />
      <Videos />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
