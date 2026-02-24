import React, { useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaPlay } from 'react-icons/fa'

const Videos = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const videos = [
    {
      id: 'xfI4mBQkGkQ',
      title: 'Project Showcase 1',
      description: 'See our expert construction work in action'
    },
    {
      id: 'BedJx4D2jUo',
      title: 'Project Showcase 2',
      description: 'Quality craftsmanship and attention to detail'
    }
  ]

  const nextVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length)
  }

  const prevVideo = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + videos.length) % videos.length)
  }

  const currentVideo = videos[currentIndex]

  return (
    <section id="videos" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-3 sm:mb-4">
            Our Work in Action
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-earth-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Watch our construction projects come to life
          </p>
        </div>

        {/* Video Carousel */}
        <div className="max-w-5xl mx-auto">
          <div className="relative bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden p-4 sm:p-6 md:p-8 border border-transparent dark:border-slate-800">
            {/* Video Container */}
            <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-6">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${currentVideo.id}`}
                title={currentVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {currentVideo.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                {currentVideo.description}
              </p>
            </div>

            {/* Navigation Controls */}
            {videos.length > 1 && (
              <div className="flex items-center justify-center gap-4">
                {/* Previous Button */}
                <button
                  onClick={prevVideo}
                  className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-earth-600 hover:bg-earth-700 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label="Previous video"
                >
                  <FaChevronLeft className="text-base sm:text-lg" />
                </button>

                {/* Video Indicators */}
                <div className="flex gap-2">
                  {videos.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                        index === currentIndex
                          ? 'bg-earth-600 w-6 sm:w-8'
                          : 'bg-gray-300 dark:bg-slate-700 hover:bg-gray-400 dark:hover:bg-slate-600'
                      }`}
                      aria-label={`Go to video ${index + 1}`}
                    />
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextVideo}
                  className="group flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-earth-600 hover:bg-earth-700 text-white transition-all duration-300 shadow-md hover:shadow-lg"
                  aria-label="Next video"
                >
                  <FaChevronRight className="text-base sm:text-lg" />
                </button>
              </div>
            )}

            {/* Counter */}
            <div className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
              Video {currentIndex + 1} of {videos.length}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Videos
