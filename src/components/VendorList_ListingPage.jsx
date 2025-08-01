import React from "react";
import { useNavigate } from "react-router-dom";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";

import DummyPhoto from "../assets/GrayDummyPhoto.jpg";

const VendorList_ListingPage = ({
  eventType,
  serviceType,
  date,
  locationType,
  guestCount,
  vendors = [],
  paginationInfo = {},
  currentPage = 1,
  handleShowMore,
  isLoading,
  sortBy,
  sortOrder,
  setSortBy,
  setSortOrder,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="header flex justify-between">
        <div className="leftside leading-7 ml-3">
          <div className="text-sm font-semibold">Top picks for</div>
          <div className="text-[25px] font-bold">
            <span>{eventType}</span>, <span>{serviceType}</span>,{" "}
            <span>{locationType}</span>, <span>{date}</span>,{" "}
            <span>{guestCount} guests</span>
          </div>
        </div>

        <div className="rightside mt-1 flex gap-2 items-center">
          <label className="text-sm font-semibold">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-full border px-4 py-1 text-sm border-[#CCAB4A] bg-white shadow-md"
          >
            <option value="rankingScore">Best Match</option>
            <option value="rating">Rating</option>
            <option value="price">Price</option>
            <option value="experience">Experience</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-full border px-4 py-1 text-sm border-[#CCAB4A] bg-white shadow-md"
          >
            <option value="desc">High to Low</option>
            <option value="asc">Low to High</option>
          </select>
        </div>
      </div>

      {/* Vendor Cards */}
      <div className="vendor-list">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#CCAB4A]"></div>
          </div>
        ) : vendors.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm sm:text-base">No vendors found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {vendors.map((vendor, index) => (
              <div
                key={vendor._id || index}
                onClick={() => navigate(`/vendor/${vendor.id}`, { state: { vendor } })}
                className="vendor-card bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer overflow-hidden"
              >
                {/* Vendor Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={vendor.image || "/src/assets/GrayDummyPhoto.jpg"}
                    alt={vendor.name}
                    className="w-full h-full object-cover"
                  />
                  {vendor.isVerified && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Vendor Info */}
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-1 line-clamp-1">
                    {vendor.name}
                  </h3>
                  
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-1">
                    {vendor.location}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 sm:w-4 sm:h-4 ${
                            i < Math.floor(vendor.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm text-gray-600 ml-1">
                      ({vendor.number_of_reviews || 0} reviews)
                    </span>
                  </div>

                  {/* Price Range */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-[#CCAB4A]">
                      Starting from ₹{vendor.price ?? 'N/A'}
                    </span>
                    <span className="text-xs sm:text-sm text-gray-500">
                      {vendor.serviceType}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Show More */}
      {paginationInfo?.totalPages > currentPage && (
        <div className="flex justify-center mt-7 mb-10">
          <button
            type="button"
            onClick={handleShowMore}
            disabled={isLoading}
            className={`rounded-full shadow-md px-6 py-2 font-semibold border-[1px] border-[#CCAB4A] transition-colors duration-300 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Loading..." : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default VendorList_ListingPage;
