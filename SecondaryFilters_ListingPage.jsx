import React from "react";

const SecondaryFilters_ListingPage = ({ filters, onFilterChange }) => {
  const handleCheckboxChange = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange(filterType, newValues);
  };

  return (
    <div className="secondary-filters space-y-4 sm:space-y-6">
      {/* Cuisine Types */}
      <div className="filter-group">
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">Cuisine Types</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {["North Indian", "South Indian", "Chinese", "Italian", "Mexican", "Continental"].map((cuisine) => (
            <label key={cuisine} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.cuisineTypes || []).includes(cuisine)}
                onChange={() => handleCheckboxChange("cuisineTypes", cuisine)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#CCAB4A] border-gray-300 rounded focus:ring-[#CCAB4A]"
              />
              <span className="text-sm sm:text-base text-gray-700">{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dietary Preferences */}
      <div className="filter-group">
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">Dietary Preferences</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {["Vegetarian", "Vegan", "Non-Vegetarian", "Gluten-Free", "Halal", "Jain"].map((diet) => (
            <label key={diet} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.dietaryPreferences || []).includes(diet)}
                onChange={() => handleCheckboxChange("dietaryPreferences", diet)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#CCAB4A] border-gray-300 rounded focus:ring-[#CCAB4A]"
              />
              <span className="text-sm sm:text-base text-gray-700">{diet}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Service Features */}
      <div className="filter-group">
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">Service Features</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
          {["On-Site Cooking", "Delivery", "Setup & Cleanup", "Staff Provided", "Custom Menu", "Tasting Available"].map((feature) => (
            <label key={feature} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={(filters.serviceFeatures || []).includes(feature)}
                onChange={() => handleCheckboxChange("serviceFeatures", feature)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#CCAB4A] border-gray-300 rounded focus:ring-[#CCAB4A]"
              />
              <span className="text-sm sm:text-base text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="filter-group">
        <h4 className="text-sm sm:text-base font-semibold text-gray-700 mb-3">Minimum Rating</h4>
        <div className="flex items-center space-x-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-1 cursor-pointer">
              <input
                type="radio"
                name="minRating"
                checked={filters.minRating === rating}
                onChange={() => onFilterChange("minRating", rating)}
                className="w-4 h-4 sm:w-5 sm:h-5 text-[#CCAB4A] border-gray-300 focus:ring-[#CCAB4A]"
              />
              <span className="text-sm sm:text-base text-gray-700">{rating}+</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecondaryFilters_ListingPage;
