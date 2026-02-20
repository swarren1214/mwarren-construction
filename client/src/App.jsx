import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Team from './components/Team'
import Gallery from './components/Gallery'
import Videos from './components/Videos'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
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
