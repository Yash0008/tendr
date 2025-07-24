import React, { useState, useEffect, useRef } from "react";

const SERVICE_FIELDS = {
  caterer: [
    { name: "cuisine", label: "Cuisine Types", options: ["North Indian", "South Indian", "Snacks", "Chinese Starters", "Punjabi", "Sweets", "Italian", "Other"] },
    { name: "serviceType", label: "Service Type", options: ["Buffet", "Food Stations", "Live Counters", "Family Style"] },
    { name: "menuType", label: "Menu Type", options: ["Veg", "Non Veg", "Jain"] },
    { name: "beverage", label: "Beverage", options: ["Yes", "No", "Other"] }
  ],
  dj: [
    { name: "setup", label: "Setup Type", options: ["Basic Setup", "Full Production"] },
    { name: "lightIncluded", label: "Light Included?", options: ["Yes", "No"] },
    { name: "eventType", label: "Event Type", options: ["House Party", "Corporate", "Venue"] }
  ],
  decorator: [
    { name: "decorationType", label: "Type of Decoration", options: ["Themed Decoration", "Floral", "Lighting", "Balloon Art", "Traditional", "Modern", "Rustic", "Minimalist", "Other"] },
    { name: "coverage", label: "Venue Coverage", options: ["Interior", "Exterior", "Full", "Stage Setup", "Entrance Focus", "Backdrop"] }
  ],
  photographer: [
    { name: "photographyType", label: "Photography Type", options: ["Candid", "Drone", "Traditional", "Cinematic"] },
    { name: "hoursIncluded", label: "Hours Included", options: ["2", "4", "8", "Full Day"] },
    { name: "editingTime", label: "Editing Time (days)", options: ["2", "5", "7", "10+"] }
  ]
};

export default function ServiceSpecificFields({ service, onChange, initialFilters }) {
  const [filters, setFilters] = useState(initialFilters || {});
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [otherInputs, setOtherInputs] = useState({});
  const [photos, setPhotos] = useState([]);
  const containerRefs = useRef({});

  useEffect(() => {
    function handleClickOutside(event) {
      Object.keys(containerRefs.current).forEach((key) => {
        const ref = containerRefs.current[key];
        if (ref && !ref.contains(event.target)) {
          setDropdownOpen((prev) => ({ ...prev, [key]: false }));
        }
      });
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const mergedFilters = { ...filters, photos };
    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      const custom = otherInputs[`${key}_other`];
      if (Array.isArray(value)) {
        mergedFilters[key] = value.map((v) => (v === "Other" && custom ? custom : v));
      } else if (value === "Other" && custom) {
        mergedFilters[key] = custom;
      }
    });
    onChange(mergedFilters);
  }, [filters, otherInputs, photos, onChange]); // ✅ Fixed: added onChange

  const toggleDropdown = (field) => {
    setDropdownOpen((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const isSingleSelect = (options) =>
    JSON.stringify(options) === JSON.stringify(["Yes", "No"]) ||
    JSON.stringify(options) === JSON.stringify(["Yes", "No", "Other"]);

  const handleMultiSelect = (field, value) => {
    const current = filters[field] || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    if (!updated.includes("Other")) {
      setOtherInputs((prev) => ({ ...prev, [`${field}_other`]: "" }));
    }
    setFilters((prev) => ({ ...prev, [field]: updated }));
  };

  const handleSingleSelect = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    if (value !== "Other") {
      setOtherInputs((prev) => ({ ...prev, [`${field}_other`]: "" }));
    }
  };

  const handleOtherInputChange = (field, value) => {
    setOtherInputs((prev) => ({ ...prev, [`${field}_other`]: value }));
  };

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);
  };

  const renderDisplayText = (field) => {
    const selected = filters[field.name];
    const other = otherInputs[`${field.name}_other`];
    if (!selected || (Array.isArray(selected) && selected.length === 0)) return "Click to select";
    if (Array.isArray(selected)) {
      return selected.map((item) => (item === "Other" && other ? other : item)).join(", ");
    }
    return selected === "Other" && other ? other : selected;
  };

  return (
    <div className="space-y-6 mt-6">
      {SERVICE_FIELDS[service]?.map((field) => {
        const isSingle = isSingleSelect(field.options);
        const selected = filters[field.name];
        const isOpen = dropdownOpen[field.name];
        const customValue = otherInputs[`${field.name}_other`] || "";

        if (!containerRefs.current[field.name]) {
          containerRefs.current[field.name] = React.createRef();
        }

        return (
          <div key={field.name} ref={(el) => (containerRefs.current[field.name] = el)} className="relative">
            <label className="block mb-2 font-medium text-[#6B4226] text-sm">{field.label}</label>
            <div
              onClick={() => toggleDropdown(field.name)}
              className="w-full border border-[#6B4226] rounded-lg p-2 cursor-pointer bg-white text-[#6B4226] text-sm"
            >
              {renderDisplayText(field)}
            </div>

            {isOpen && (
              <div className="absolute z-10 mt-1 w-full max-h-60 overflow-auto border border-[#6B4226] rounded-lg bg-white shadow-md text-sm">
                {field.options.map((option) => (
                  <label key={option} className="block px-4 py-2 cursor-pointer hover:bg-yellow-100 text-[#6B4226]">
                    {isSingle ? (
                      <input
                        type="radio"
                        name={field.name}
                        value={option}
                        checked={selected === option}
                        onChange={() => handleSingleSelect(field.name, option)}
                        className="mr-2"
                      />
                    ) : (
                      <input
                        type="checkbox"
                        checked={selected?.includes(option) || false}
                        onChange={() => handleMultiSelect(field.name, option)}
                        className="mr-2"
                      />
                    )}
                    {option}
                  </label>
                ))}
                {((isSingle && selected === "Other") || (!isSingle && selected?.includes("Other"))) && (
                  <div className="px-4 py-2">
                    <input
                      type="text"
                      placeholder={`Specify Other (${field.label})`}
                      value={customValue}
                      onChange={(e) => handleOtherInputChange(field.name, e.target.value)}
                      className="mt-1 w-full p-2 border border-[#6B4226] rounded text-sm"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      <div className="mt-6">
        <label className="block mb-2 font-medium text-[#6B4226] text-sm">Upload Photos</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handlePhotoChange}
          className="w-full border border-[#6B4226] rounded-lg p-2 bg-white text-[#6B4226] text-sm"
        />
        {photos.length > 0 && (
          <p className="text-sm mt-2 text-[#6B4226]">{photos.length} photo(s) selected.</p>
        )}
      </div>
    </div>
  );
}
