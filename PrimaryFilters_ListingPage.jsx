import React from "react";

const PrimaryFilters_ListingPage = ({ filters, onFilterChange }) => {
  return (
    <div className="primary-filters space-y-4 sm:space-y-6">
      {/* Event Type */}
      <div className="filter-group">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Event Type
        </label>
        <select
          value={filters.eventType || ""}
          onChange={(e) => onFilterChange("eventType", e.target.value)}
          className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCAB4A] focus:border-[#CCAB4A] text-sm sm:text-base"
        >
          <option value="">All Event Types</option>
          <option value="Get-together">Get-together</option>
          <option value="Birthday">Birthday</option>
          <option value="Office Party">Office Party</option>
          <option value="Concert">Concert</option>
          <option value="Anniversary">Anniversary</option>
          <option value="Pre Wedding">Pre Wedding</option>
          <option value="Rituals">Rituals</option>
          <option value="Festival">Festival</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Date */}
      <div className="filter-group">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Date
        </label>
        <input
          type="date"
          value={filters.date || ""}
          onChange={(e) => onFilterChange("date", e.target.value)}
          className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCAB4A] focus:border-[#CCAB4A] text-sm sm:text-base"
        />
      </div>

      {/* Guest Count */}
      <div className="filter-group">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Number of Guests
        </label>
        <input
          type="number"
          min="1"
          value={filters.guestCount || ""}
          onChange={(e) => onFilterChange("guestCount", e.target.value)}
          placeholder="Enter guest count"
          className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCAB4A] focus:border-[#CCAB4A] text-sm sm:text-base"
        />
      </div>

      {/* Budget Range */}
      <div className="filter-group">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Budget Range
        </label>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <input
            type="number"
            min="0"
            value={filters.minBudget || ""}
            onChange={(e) => onFilterChange("minBudget", e.target.value)}
            placeholder="Min"
            className="px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCAB4A] focus:border-[#CCAB4A] text-sm sm:text-base"
          />
          <input
            type="number"
            min="0"
            value={filters.maxBudget || ""}
            onChange={(e) => onFilterChange("maxBudget", e.target.value)}
            placeholder="Max"
            className="px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCAB4A] focus:border-[#CCAB4A] text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Sort By */}
      <div className="filter-group">
        <label className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy || "rankingScore"}
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
          className="w-full px-3 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CCAB4A] focus:border-[#CCAB4A] text-sm sm:text-base"
        >
          <option value="rankingScore">Best Match</option>
          <option value="rating">Rating</option>
          <option value="price">Price</option>
          <option value="reviewCount">Most Reviews</option>
        </select>
      </div>
    </div>
  );
};

export default PrimaryFilters_ListingPage;
