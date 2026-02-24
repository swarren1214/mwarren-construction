import React, { useEffect, useMemo, useState } from 'react'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import galleryImages from '../data/gallery-images.json'

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [brokenImageIds, setBrokenImageIds] = useState(new Set())
  const [imagesPerPage, setImagesPerPage] = useState(10)
  const baseUrl = import.meta.env.BASE_URL
  const gridSizes = '(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 20vw'

  const getImagesPerPageForWidth = (width) => {
    if (width >= 1024) return 10
    if (width >= 768) return 6
    if (width >= 640) return 4
    return 1
  }

  const getImageKey = (image) => image.relativePath || image.id

  const toAbsoluteUrl = (relativeUrl) => `${baseUrl}${relativeUrl}`

  const toSrcSet = (variants) => variants.map((variant) => `${toAbsoluteUrl(variant.url)} ${variant.width}w`).join(', ')

  const getLargestVariant = (variants) => variants[variants.length - 1]

  const getBestDefaultVariant = (variants, preferredWidth = 400) => {
    const firstLarger = variants.find((variant) => variant.width >= preferredWidth)
    return firstLarger || getLargestVariant(variants)
  }

  const images = useMemo(() => {
    return galleryImages.filter(
      (image) =>
        image &&
        image.id &&
        Array.isArray(image.avif) &&
        image.avif.length > 0 &&
        Array.isArray(image.webp) &&
        image.webp.length > 0
    )
  }, [])

  const availableImages = images.filter((image) => !brokenImageIds.has(getImageKey(image)))

  const openLightbox = (index) => {
    if (!availableImages[index]) return
    setCurrentIndex(index)
    setSelectedImage(availableImages[index])
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const goToPrevious = () => {
    if (availableImages.length === 0) return
    const newIndex = currentIndex === 0 ? availableImages.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
    setSelectedImage(availableImages[newIndex])
  }

  const goToNext = () => {
    if (availableImages.length === 0) return
    const newIndex = currentIndex === availableImages.length - 1 ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
    setSelectedImage(availableImages[newIndex])
  }

  const handleImageError = (imageKey) => {
    setBrokenImageIds((previousIds) => {
      if (previousIds.has(imageKey)) {
        return previousIds
      }

      const nextIds = new Set(previousIds)
      nextIds.add(imageKey)
      return nextIds
    })
  }

  // Pagination logic
  const totalPages = Math.ceil(availableImages.length / imagesPerPage)
  const indexOfLastImage = currentPage * imagesPerPage
  const indexOfFirstImage = indexOfLastImage - imagesPerPage
  const currentImages = availableImages.slice(indexOfFirstImage, indexOfLastImage)
  const isMobileSingleImage = imagesPerPage === 1

  useEffect(() => {
    const updateImagesPerPage = () => {
      setImagesPerPage(getImagesPerPageForWidth(window.innerWidth))
    }

    updateImagesPerPage()
    window.addEventListener('resize', updateImagesPerPage)

    return () => window.removeEventListener('resize', updateImagesPerPage)
  }, [])

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  useEffect(() => {
    if (!selectedImage) return
    const selectedStillAvailable = availableImages.some((image) => getImageKey(image) === getImageKey(selectedImage))
    if (!selectedStillAvailable) {
      setSelectedImage(null)
    }
  }, [availableImages, selectedImage])

  const goToPage = (pageNumber, shouldScroll = true) => {
    setCurrentPage(pageNumber)

    if (shouldScroll) {
      window.scrollTo({ top: document.getElementById('gallery').offsetTop - 100, behavior: 'smooth' })
    }
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
    <section id="gallery" className="py-20 bg-gray-50 dark:bg-slate-950">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {availableImages.length === 0 && (
            <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-16 bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800">
              No gallery photos are available yet.
            </div>
          )}

          {currentImages.map((image, index) => {
            const actualIndex = indexOfFirstImage + index
            const webpDefault = getBestDefaultVariant(image.webp)
            return (
              <div 
                key={getImageKey(image)}
                className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => openLightbox(actualIndex)}
              >
                <div className="aspect-square bg-gray-200">
                  <picture>
                    <source type="image/avif" srcSet={toSrcSet(image.avif)} sizes={gridSizes} />
                    <source type="image/webp" srcSet={toSrcSet(image.webp)} sizes={gridSizes} />
                    <img
                      src={toAbsoluteUrl(webpDefault.url)}
                      srcSet={toSrcSet(image.webp)}
                      sizes={gridSizes}
                      alt={image.alt || image.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                      decoding="async"
                      width={webpDefault.width}
                      height={Math.round((webpDefault.width / image.width) * image.height)}
                      onError={() => handleImageError(getImageKey(image))}
                    />
                  </picture>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination Controls */}
        <div className="mt-12 flex flex-col items-center gap-6">
          {/* Page Info */}
          <div className="text-gray-600 dark:text-gray-300 text-sm">
            Showing {availableImages.length === 0 ? 0 : indexOfFirstImage + 1} - {Math.min(indexOfLastImage, availableImages.length)} of {availableImages.length} photos
          </div>

          {isMobileSingleImage ? (
            <div className="w-full">
              <div className="flex gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
                {availableImages.map((image, index) => {
                  const pageNumber = index + 1
                  const thumbnailVariant = getBestDefaultVariant(image.webp, 400)
                  return (
                    <button
                      key={`mobile-thumb-${getImageKey(image)}`}
                      onClick={() => goToPage(pageNumber, false)}
                      className={`shrink-0 w-14 h-14 rounded-md overflow-hidden border-2 transition-colors snap-start ${
                        currentPage === pageNumber
                          ? 'border-earth-600'
                          : 'border-gray-300 dark:border-slate-700'
                      }`}
                      aria-label={`Go to photo ${pageNumber}`}
                    >
                      <img
                        src={toAbsoluteUrl(thumbnailVariant.url)}
                        alt={image.alt || image.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                        width="56"
                        height="56"
                      />
                    </button>
                  )
                })}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {/* Previous Button */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1 || totalPages <= 1}
                className="px-3 py-2 rounded-lg items-center justify-center bg-white dark:bg-slate-900 border-2 border-earth-600 text-earth-600 dark:text-earth-300 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-earth-50 dark:hover:bg-slate-800 transition-colors"
              >
                <FaChevronLeft className="inline h-4 w-4 mb-1 mr-1" />
              </button>

              {/* Page Numbers */}
              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => {
                  const pageNumber = index + 1
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
                            : 'bg-white dark:bg-slate-900 border-2 border-gray-300 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:border-earth-600 hover:text-earth-600 dark:hover:text-earth-300'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    )
                  } else if (
                    pageNumber === currentPage - 2 ||
                    pageNumber === currentPage + 2
                  ) {
                    return <span key={pageNumber} className="flex items-center px-2 text-gray-400 dark:text-gray-500">...</span>
                  }
                  return null
                })}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages || totalPages <= 1}
                className="px-3 py-2 rounded-lg items-center justify-center bg-white dark:bg-slate-900 border-2 border-earth-600 text-earth-600 dark:text-earth-300 font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-earth-50 dark:hover:bg-slate-800 transition-colors"
              >
                <FaChevronRight className="inline h-4 w-4 mb-1 ml-1" />
              </button>
            </div>
          )}
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
              <picture>
                <source type="image/avif" srcSet={toSrcSet(selectedImage.avif)} sizes="100vw" />
                <source type="image/webp" srcSet={toSrcSet(selectedImage.webp)} sizes="100vw" />
                <img
                  src={toAbsoluteUrl(getLargestVariant(selectedImage.webp).url)}
                  srcSet={toSrcSet(selectedImage.webp)}
                  sizes="100vw"
                  alt={selectedImage.alt || selectedImage.title}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  decoding="async"
                />
              </picture>
              <div className="text-center mt-6">
                <p className="text-gray-300 text-sm">
                  {currentIndex + 1} of {availableImages.length}
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
