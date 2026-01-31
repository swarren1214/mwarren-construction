import React from 'react'
import { FaHardHat, FaAward, FaMapMarkerAlt } from 'react-icons/fa'

const Team = () => {
  const baseUrl = import.meta.env.BASE_URL

  return (
    <section id="team" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Meet the Team
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-earth-600 mx-auto mb-4 sm:mb-6"></div>
        </div>

        {/* Team Member Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl overflow-hidden p-6 sm:p-8 md:p-12">
            {/* Profile Header - Image and Name */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg">
                  <img 
                    src={`${baseUrl}images/mwarren-profile-photo.png`}
                    alt="Mike Warren - Owner & General Contractor"
                    className="w-full h-full object-contain bg-gray-50"
                  />
                </div>
              </div>
              
              {/* Name and Title */}
              <div className="text-center sm:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  Mike Warren
                </h3>
                <p className="text-base sm:text-lg text-earth-600 font-semibold">
                  Owner & Licensed B100 General Contractor
                </p>
              </div>
            </div>

            {/* Bio Content */}
            <div>
                <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700 leading-relaxed mb-6 sm:mb-8">
                  <p>
                    Mike Warren is a licensed B100 general contractor who has been serving Utah County 
                    and the surrounding areas for over 15 years. With a passion for transforming outdoor 
                    spaces and building quality structures, Mike has built a reputation for excellence 
                    in both residential construction and landscape design.
                  </p>
                  <p>
                    Specializing in homes and landscape design, Mike brings a unique blend of technical 
                    expertise and creative vision to every project. His commitment to quality craftsmanship 
                    and attention to detail has made M.WARREN CONSTRUCTION a trusted name throughout the 
                    community.
                  </p>
                  <p>
                    From home builds to custom retaining walls and complete landscape transformations, Mike personally 
                    oversees each project to ensure it meets the highest standards of quality and exceeds 
                    client expectations.
                  </p>
                </div>

                {/* Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                  <div className="flex flex-col items-center space-y-2 p-4 sm:p-0">
                    <FaAward className="text-2xl sm:text-3xl text-earth-600" />
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Licensed B100 General Contractor</h4>
                      <p className="text-xs text-gray-600">Fully licensed and insured</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 p-4 sm:p-0">
                    <FaHardHat className="text-2xl sm:text-3xl text-earth-600" />
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">15+ Years Experience</h4>
                      <p className="text-xs text-gray-600">Proven track record of excellence</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 p-4 sm:p-0">
                    <FaMapMarkerAlt className="text-2xl sm:text-3xl text-earth-600" />
                    <div className="text-center">
                      <h4 className="font-semibold text-gray-900 text-xs sm:text-sm">Utah County & Surrounding Areas</h4>
                      <p className="text-xs text-gray-600">Proudly serving the local community</p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Team
