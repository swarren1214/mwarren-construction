import React, { useState } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const imagesPerPage = 12
  const baseUrl = import.meta.env.BASE_URL

  // M.WARREN CONSTRUCTION project photos
  const images = [
    { url: `${baseUrl}images/IMG_0217.jpeg`, title: 'Retaining Wall Project', description: 'Professional retaining wall installation' },
    { url: `${baseUrl}images/IMG_0300.jpg`, title: 'Landscape Design', description: 'Custom landscape design and installation' },
    { url: `${baseUrl}images/IMG_0302.JPG`, title: 'Hardscaping Work', description: 'Quality hardscaping and stone work' },
    { url: `${baseUrl}images/IMG_0392.jpeg`, title: 'Outdoor Project', description: 'Professional outdoor construction' },
    { url: `${baseUrl}images/IMG_0633.jpeg`, title: 'Stone Work', description: 'Expert stone masonry' },
    { url: `${baseUrl}images/IMG_0674.JPG`, title: 'Retaining Wall', description: 'Durable retaining wall construction' },
    { url: `${baseUrl}images/IMG_0675.JPG`, title: 'Landscaping Project', description: 'Complete landscaping transformation' },
    { url: `${baseUrl}images/IMG_0676.JPG`, title: 'Construction Work', description: 'Professional construction services' },
    { url: `${baseUrl}images/IMG_0802.jpeg`, title: 'Outdoor Installation', description: 'Quality outdoor installations' },
    { url: `${baseUrl}images/IMG_0907.JPG`, title: 'Landscape Feature', description: 'Custom landscape features' },
    { url: `${baseUrl}images/IMG_0913.JPG`, title: 'Hardscape Design', description: 'Professional hardscape design' },
    { url: `${baseUrl}images/IMG_0914.JPG`, title: 'Stone Installation', description: 'Expert stone installation work' },
    { url: `${baseUrl}images/IMG_0916.JPG`, title: 'Retaining Wall System', description: 'Multi-level retaining wall system' },
    { url: `${baseUrl}images/IMG_0924.JPG`, title: 'Outdoor Project', description: 'Quality outdoor project completion' },
    { url: `${baseUrl}images/IMG_0948.JPG`, title: 'Landscape Work', description: 'Professional landscape installation' },
    { url: `${baseUrl}images/IMG_0949.JPG`, title: 'Construction Project', description: 'Expert construction services' },
    { url: `${baseUrl}images/IMG_0951.JPG`, title: 'Hardscaping', description: 'Custom hardscaping solutions' },
    { url: `${baseUrl}images/IMG_0972.JPG`, title: 'Stone Work', description: 'Quality stone masonry work' },
    { url: `${baseUrl}images/IMG_0973.JPG`, title: 'Outdoor Feature', description: 'Custom outdoor features' },
    { url: `${baseUrl}images/IMG_0978.JPG`, title: 'Landscape Project', description: 'Complete landscape project' },
    { url: `${baseUrl}images/IMG_0982.JPG`, title: 'Retaining Wall', description: 'Professional retaining wall construction' },
    { url: `${baseUrl}images/IMG_1087.JPG`, title: 'Construction Work', description: 'Quality construction services' },
    { url: `${baseUrl}images/IMG_1133.jpeg`, title: 'Outdoor Installation', description: 'Professional outdoor installations' },
    { url: `${baseUrl}images/IMG_1166.jpeg`, title: 'Landscape Design', description: 'Expert landscape design work' },
    { url: `${baseUrl}images/IMG_1263.JPG`, title: 'Hardscape Project', description: 'Custom hardscape installation' },
    { url: `${baseUrl}images/IMG_1264.JPG`, title: 'Stone Work', description: 'Professional stone work' },
    { url: `${baseUrl}images/IMG_1265.JPG`, title: 'Outdoor Project', description: 'Quality outdoor projects' },
    { url: `${baseUrl}images/IMG_1267.JPG`, title: 'Landscape Feature', description: 'Custom landscape features' },
    { url: `${baseUrl}images/IMG_1268.JPG`, title: 'Construction Project', description: 'Expert construction work' },
    { url: `${baseUrl}images/IMG_1275.JPG`, title: 'Retaining Wall', description: 'Durable retaining wall installation' },
    { url: `${baseUrl}images/IMG_1306.JPG`, title: 'Hardscaping', description: 'Professional hardscaping services' },
    { url: `${baseUrl}images/IMG_1377.JPG`, title: 'Landscape Work', description: 'Quality landscape installation' },
    { url: `${baseUrl}images/IMG_1378.JPG`, title: 'Stone Installation', description: 'Expert stone installation' },
    { url: `${baseUrl}images/IMG_1393.JPG`, title: 'Outdoor Feature', description: 'Custom outdoor features' },
    { url: `${baseUrl}images/IMG_1394.JPG`, title: 'Construction Work', description: 'Professional construction services' },
    { url: `${baseUrl}images/IMG_1402.JPG`, title: 'Landscape Project', description: 'Complete landscape transformation' },
    { url: `${baseUrl}images/IMG_1539.jpeg`, title: 'Retaining Wall', description: 'Quality retaining wall work' },
    { url: `${baseUrl}images/IMG_1587.JPG`, title: 'Hardscape Design', description: 'Custom hardscape design' },
    { url: `${baseUrl}images/IMG_1588.JPG`, title: 'Stone Work', description: 'Professional stone masonry' },
    { url: `${baseUrl}images/IMG_1589.JPG`, title: 'Outdoor Project', description: 'Expert outdoor installations' },
    { url: `${baseUrl}images/IMG_1590.JPG`, title: 'Landscape Feature', description: 'Custom landscape features' },
    { url: `${baseUrl}images/IMG_1591.JPG`, title: 'Construction Project', description: 'Quality construction work' },
    { url: `${baseUrl}images/IMG_1618.jpeg`, title: 'Retaining Wall', description: 'Professional retaining wall construction' },
    { url: `${baseUrl}images/IMG_1620.JPG`, title: 'Hardscaping Work', description: 'Expert hardscaping services' },
    { url: `${baseUrl}images/IMG_1622.JPG`, title: 'Landscape Installation', description: 'Professional landscape work' },
    { url: `${baseUrl}images/IMG_1850.JPG`, title: 'Stone Project', description: 'Quality stone work' },
    { url: `${baseUrl}images/IMG_1856.jpeg`, title: 'Outdoor Feature', description: 'Custom outdoor installations' },
    { url: `${baseUrl}images/IMG_1871.jpeg`, title: 'Construction Work', description: 'Expert construction services' },
    { url: `${baseUrl}images/IMG_1913.JPG`, title: 'Landscape Project', description: 'Complete landscape solutions' },
    { url: `${baseUrl}images/IMG_2024.jpeg`, title: 'Retaining Wall', description: 'Durable retaining wall systems' },
    { url: `${baseUrl}images/IMG_2202.JPG`, title: 'Hardscape Design', description: 'Professional hardscape work' },
    { url: `${baseUrl}images/IMG_2232.jpg`, title: 'Stone Installation', description: 'Expert stone installation' },
    { url: `${baseUrl}images/IMG_2233.JPG`, title: 'Outdoor Project', description: 'Quality outdoor projects' },
    { url: `${baseUrl}images/IMG_2234.JPG`, title: 'Landscape Work', description: 'Professional landscaping' },
    { url: `${baseUrl}images/IMG_2262.JPG`, title: 'Construction Project', description: 'Expert construction work' },
    { url: `${baseUrl}images/IMG_2522.JPG`, title: 'Retaining Wall', description: 'Professional retaining wall construction' },
    { url: `${baseUrl}images/IMG_2544.jpg`, title: 'Hardscaping', description: 'Custom hardscaping solutions' },
    { url: `${baseUrl}images/IMG_2734.JPG`, title: 'Stone Work', description: 'Quality stone masonry' },
    { url: `${baseUrl}images/IMG_2735.JPG`, title: 'Outdoor Feature', description: 'Custom outdoor features' },
    { url: `${baseUrl}images/IMG_2753.JPG`, title: 'Landscape Project', description: 'Complete landscape installation' },
    { url: `${baseUrl}images/IMG_2762.JPG`, title: 'Construction Work', description: 'Professional construction services' },
    { url: `${baseUrl}images/IMG_2804.JPG`, title: 'Retaining Wall', description: 'Expert retaining wall work' },
    { url: `${baseUrl}images/IMG_3433.jpeg`, title: 'Hardscape Design', description: 'Custom hardscape design' },
    { url: `${baseUrl}images/IMG_3434.jpeg`, title: 'Stone Installation', description: 'Professional stone work' },
    { url: `${baseUrl}images/IMG_3613.jpeg`, title: 'Outdoor Project', description: 'Quality outdoor installations' },
    { url: `${baseUrl}images/IMG_3614.jpeg`, title: 'Landscape Feature', description: 'Custom landscape features' },
    { url: `${baseUrl}images/IMG_3616.JPG`, title: 'Construction Project', description: 'Expert construction work' },
    { url: `${baseUrl}images/IMG_3628.JPG`, title: 'Retaining Wall', description: 'Professional retaining wall construction' },
    { url: `${baseUrl}images/IMG_3632.jpeg`, title: 'Hardscaping Work', description: 'Quality hardscaping services' },
    { url: `${baseUrl}images/IMG_3697.JPG`, title: 'Landscape Installation', description: 'Expert landscape work' },
    { url: `${baseUrl}images/IMG_3970.jpeg`, title: 'Stone Project', description: 'Professional stone masonry' },
    { url: `${baseUrl}images/IMG_4011.JPG`, title: 'Outdoor Feature', description: 'Custom outdoor installations' },
    { url: `${baseUrl}images/IMG_4213.JPG`, title: 'Construction Work', description: 'Quality construction services' },
    { url: `${baseUrl}images/IMG_4256.jpeg`, title: 'Landscape Project', description: 'Complete landscape transformation' },
    { url: `${baseUrl}images/IMG_4257.jpg`, title: 'Retaining Wall', description: 'Durable retaining wall systems' },
    { url: `${baseUrl}images/IMG_4319.JPG`, title: 'Hardscape Design', description: 'Professional hardscape work' },
    { url: `${baseUrl}images/IMG_4353.JPG`, title: 'Stone Installation', description: 'Expert stone installation' },
    { url: `${baseUrl}images/IMG_4355.JPG`, title: 'Outdoor Project', description: 'Quality outdoor projects' },
    { url: `${baseUrl}images/IMG_4356.JPG`, title: 'Landscape Work', description: 'Professional landscaping' },
    { url: `${baseUrl}images/IMG_4444.jpeg`, title: 'Construction Project', description: 'Expert construction work' },
    { url: `${baseUrl}images/IMG_4466.jpeg`, title: 'Retaining Wall', description: 'Professional retaining wall construction' },
    { url: `${baseUrl}images/IMG_4467.jpeg`, title: 'Hardscaping', description: 'Custom hardscaping solutions' },
    { url: `${baseUrl}images/IMG_4476.JPG`, title: 'Stone Work', description: 'Quality stone masonry' },
    { url: `${baseUrl}images/IMG_4493.JPG`, title: 'Outdoor Feature', description: 'Custom outdoor features' },
    { url: `${baseUrl}images/IMG_4501.JPG`, title: 'Landscape Project', description: 'Complete landscape installation' },
    { url: `${baseUrl}images/IMG_4504.JPG`, title: 'Construction Work', description: 'Professional construction services' },
    { url: `${baseUrl}images/IMG_4505.JPG`, title: 'Retaining Wall', description: 'Expert retaining wall work' },
    { url: `${baseUrl}images/IMG_4647.jpeg`, title: 'Hardscape Design', description: 'Custom hardscape design' },
    { url: `${baseUrl}images/IMG_4779.jpeg`, title: 'Stone Installation', description: 'Professional stone work' },
    { url: `${baseUrl}images/IMG_4792.JPG`, title: 'Outdoor Project', description: 'Quality outdoor installations' },
    { url: `${baseUrl}images/IMG_4855.jpeg`, title: 'Landscape Feature', description: 'Custom landscape features' },
    { url: `${baseUrl}images/IMG_4886.jpeg`, title: 'Construction Project', description: 'Expert construction work' },
    { url: `${baseUrl}images/IMG_4887.jpeg`, title: 'Retaining Wall', description: 'Professional retaining wall construction' },
    { url: `${baseUrl}images/IMG_4888.jpeg`, title: 'Hardscaping Work', description: 'Quality hardscaping services' },
    { url: `${baseUrl}images/IMG_4889.jpeg`, title: 'Landscape Installation', description: 'Expert landscape work' },
    { url: `${baseUrl}images/IMG_5026.jpeg`, title: 'Stone Project', description: 'Professional stone masonry' },
    { url: `${baseUrl}images/IMG_5079.jpeg`, title: 'Outdoor Feature', description: 'Custom outdoor installations' },
    { url: `${baseUrl}images/IMG_5080.jpeg`, title: 'Construction Work', description: 'Quality construction services' },
    { url: `${baseUrl}images/IMG_5081.jpeg`, title: 'Landscape Project', description: 'Complete landscape transformation' },
    { url: `${baseUrl}images/IMG_5082.jpeg`, title: 'Retaining Wall', description: 'Durable retaining wall systems' },
    { url: `${baseUrl}images/IMG_5083.jpeg`, title: 'Hardscape Design', description: 'Professional hardscape work' },
    { url: `${baseUrl}images/IMG_5204.jpeg`, title: 'Stone Installation', description: 'Expert stone installation' },
    { url: `${baseUrl}images/IMG_5282.jpeg`, title: 'Outdoor Project', description: 'Quality outdoor projects' },
    { url: `${baseUrl}images/IMG_5292.jpeg`, title: 'Landscape Work', description: 'Professional landscaping' },
    { url: `${baseUrl}images/IMG_5299.jpeg`, title: 'Construction Project', description: 'Expert construction work' },
    { url: `${baseUrl}images/IMG_5301.jpeg`, title: 'Retaining Wall', description: 'Professional retaining wall construction' },
    { url: `${baseUrl}images/IMG_5302.jpeg`, title: 'Hardscaping', description: 'Custom hardscaping solutions' },
    { url: `${baseUrl}images/IMG_5464.jpeg`, title: 'Stone Work', description: 'Quality stone masonry' },
    { url: `${baseUrl}images/IMG_5700.jpeg`, title: 'Outdoor Feature', description: 'Custom outdoor features' },
    { url: `${baseUrl}images/IMG_5734.jpeg`, title: 'Landscape Project', description: 'Complete landscape installation' },
    { url: `${baseUrl}images/IMG_5799.jpeg`, title: 'Construction Work', description: 'Professional construction services' },
    { url: `${baseUrl}images/IMG_5927.jpeg`, title: 'Retaining Wall', description: 'Expert retaining wall work' },
    { url: `${baseUrl}images/IMG_6345.jpeg`, title: 'Hardscape Design', description: 'Custom hardscape design' },
    { url: `${baseUrl}images/IMG_6355.jpeg`, title: 'Stone Installation', description: 'Professional stone work' },
    { url: `${baseUrl}images/IMG_6357.jpeg`, title: 'Outdoor Project', description: 'Quality outdoor installations' },
    { url: `${baseUrl}images/IMG_6754.jpeg`, title: 'Landscape Feature', description: 'Custom landscape features' },
    { url: `${baseUrl}images/IMG_6766.jpeg`, title: 'Construction Project', description: 'Expert construction work' },
    { url: `${baseUrl}images/IMG_6779.jpg`, title: 'Retaining Wall', description: 'Professional retaining wall construction' },
    { url: `${baseUrl}images/IMG_6811.jpg`, title: 'Hardscaping Work', description: 'Quality hardscaping services' },
    { url: `${baseUrl}images/IMG_6834.jpeg`, title: 'Landscape Installation', description: 'Expert landscape work' },
    { url: `${baseUrl}images/IMG_7091.jpeg`, title: 'Stone Project', description: 'Professional stone masonry' },
    { url: `${baseUrl}images/IMG_7268.jpeg`, title: 'Outdoor Feature', description: 'Custom outdoor installations' },
    { url: `${baseUrl}images/IMG_8480.jpeg`, title: 'Construction Work', description: 'Quality construction services' },
    { url: `${baseUrl}images/IMG_8482.jpeg`, title: 'Landscape Project', description: 'Complete landscape transformation' },
    { url: `${baseUrl}images/IMG_8581.jpeg`, title: 'Retaining Wall', description: 'Durable retaining wall systems' },
    { url: `${baseUrl}images/IMG_8582.jpeg`, title: 'Hardscape Design', description: 'Professional hardscape work' },
    { url: `${baseUrl}images/IMG_8583.jpeg`, title: 'Stone Installation', description: 'Expert stone installation' },
    { url: `${baseUrl}images/IMG_8920.jpeg`, title: 'Outdoor Project', description: 'Quality outdoor projects' },
    { url: `${baseUrl}images/IMG_8926.jpeg`, title: 'Landscape Work', description: 'Professional landscaping' },
    { url: `${baseUrl}images/IMG_9124.jpeg`, title: 'Construction Project', description: 'Expert construction work' },
    { url: `${baseUrl}images/IMG_9285.jpeg`, title: 'Retaining Wall', description: 'Professional retaining wall construction' },
    { url: `${baseUrl}images/IMG_9429.jpeg`, title: 'Hardscaping', description: 'Custom hardscaping solutions' },
    { url: `${baseUrl}images/IMG_9430.jpeg`, title: 'Stone Work', description: 'Quality stone masonry' },
    { url: `${baseUrl}images/20220827_090510.jpg`, title: 'Landscape Feature', description: 'Custom landscape features' },
    { url: `${baseUrl}images/20220827_090516.jpg`, title: 'Outdoor Installation', description: 'Professional outdoor work' },
    { url: `${baseUrl}images/FullSizeRender.jpeg`, title: 'Construction Project', description: 'Quality construction services' },
    { url: `${baseUrl}images/FullSizeRender (1).jpeg`, title: 'Retaining Wall Work', description: 'Expert retaining wall construction' },
    { url: `${baseUrl}images/FullSizeRender (2).jpeg`, title: 'Hardscape Project', description: 'Professional hardscaping' },
    { url: `${baseUrl}images/FullSizeRender (3).jpeg`, title: 'Landscape Design', description: 'Custom landscape design' },
    { url: `${baseUrl}images/FullSizeRender (4).jpeg`, title: 'Stone Installation', description: 'Quality stone work' },
    { url: `${baseUrl}images/FullSizeRender (5).jpeg`, title: 'Outdoor Feature', description: 'Custom outdoor features' },
    { url: `${baseUrl}images/Attachment.jpg`, title: 'Construction Work', description: 'Professional construction services' },
    { url: `${baseUrl}images/Attachment (1).jpg`, title: 'Landscape Project', description: 'Complete landscape transformation' }
  ]

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setSelectedImage(images[index])
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedImage(images[newIndex])
  }

  const goToNext = () => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setSelectedImage(images[newIndex])
  }

  // Pagination logic
  const totalPages = Math.ceil(images.length / imagesPerPage)
  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = images.slice(indexOfFirstImage, indexOfLastImage)

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo({ top: document.getElementById('gallery').offsetTop - 100, behavior: 'smooth' })
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  return (
    <section id="gallery" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-title">Our Work</h2>
          <div className="h-1 w-24 bg-earth-600 mx-auto mb-6"></div>
          <p className="section-subtitle">
            Explore our portfolio of professional landscapes, retaining walls, and construction projects. 
            Each project showcases our commitment to quality craftsmanship and attention to detail.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentImages.map((image, index) => {
            const actualIndex = indexOfFirstImage + index
            return (
              <div 
                key={actualIndex}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => openLightbox(actualIndex)}
              >
                <div className="aspect-w-16 aspect-h-12 bg-gray-200">
                  <img 
                    src={image.url} 
                    alt={image.title}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination Controls */}
        <div className="mt-12 flex flex-col items-center gap-6">
          {/* Page Info */}
          <div className="text-gray-600 text-sm">
            Showing {indexOfFirstImage + 1} - {Math.min(indexOfLastImage, images.length)} of {images.length} photos
          </div>

          {/* Pagination Buttons */}
          <div className="flex items-center gap-2">
            {/* Previous Button */}
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-lg items-center justify-center bg-white border-2 border-earth-600 text-earth-600 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-earth-50 transition-colors"
            >
              <FaChevronLeft className="inline h-4 w-4 mb-1 mr-1" />
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1
                // Show first page, last page, current page, and pages around current
                if (
                  pageNumber === 1 ||
                  pageNumber === totalPages ||
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button
                      key={pageNumber}
                      onClick={() => goToPage(pageNumber)}
                      className={`w-10 h-10 rounded-lg font-semibold transition-all ${
                        currentPage === pageNumber
                          ? 'bg-earth-600 text-white shadow-lg'
                          : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-earth-600 hover:text-earth-600'
                      }`}
                    >
                      {pageNumber}
                    </button>
                  )
                } else if (
                  pageNumber === currentPage - 2 ||
                  pageNumber === currentPage + 2
                ) {
                  return <span key={pageNumber} className="flex items-center px-2 text-gray-400">...</span>
                }
                return null
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-lg items-center justify-center bg-white border-2 border-earth-600 text-earth-600 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-earth-50 transition-colors"
            >
              <FaChevronRight className="inline h-4 w-4 mb-1 ml-1" />
            </button>
          </div>
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/65 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-50"
            >
              <FaTimes />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors z-50"
            >
              <FaChevronLeft />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors z-50"
            >
              <FaChevronRight />
            </button>

            {/* Image */}
            <div 
              className="max-w-6xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage.url} 
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">
                  {currentIndex + 1} of {images.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery
