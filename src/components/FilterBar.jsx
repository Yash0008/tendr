import React, { useState, useEffect } from "react";
import EastIcon from "@mui/icons-material/East";
import { useNavigate } from "react-router-dom";
import Separator_FilterBar from "./Separator_FilterBar";
import { getVendors } from "../apis/vendorApi";

const FilterBar = () => {
  const navigate = useNavigate();

  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [locationType, setLocationType] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [guestCount, setGuestCount] = useState(0);

  const [activeDropdown, setActiveDropdown] = useState(null);

  const eventOptions = [
    "Get-together",
    "Birthday",
    "Office Party",
    "Concert",
    "Anniversary",
    "Pre Wedding",
    "Rituals",
    "Festival",
    "Others",
  ];
  const locationOptions = [
    "Delhi",
    "Noida",
    "Greater Noida",
    "Gurugram",
    "Ghaziabad"
  ];
  const serviceOptions = [
    "Decorator",
    "Entertainment",
    "Catering",
    "Photographer"
  ];

  const handleOptionClick = (setter, option) => {
    setter(option);
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown-wrapper")) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async () => {
    try {
      const filters = {
        location: locationType,
        serviceTypes: [serviceType],
        sortBy: "rankingScore",
        sortOrder: "desc",
        page: 1,
        limit: 10,
      };

      const data = await getVendors(filters);

      navigate("/listings", {
        state: {
          eventType,
          serviceType,
          locationType,
          date,
          guestCount,
          vendors: data.vendors,
          pagination: data.pagination,
        },
      });
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  return (
    <form>
      <div className="bardiv flex justify-center">
        <div className="bar w-[1200px] h-[66px] bg-white rounded-full flex justify-between items-center ring-[1px] ring-[#CCAB4A] shadow-[0_2px_10px_rgba(0,0,0,0.25)]">
          <div className="flex w-full h-full justify-between">

            {/* Event Type */}
            <div className="event p-3 pl-12 flex flex-col text-sm rounded-full w-full md:w-[200px] hover:bg-[#ffe69e4a] relative">
              <label className="font-semibold text-[16px] cursor-pointer" onClick={() => setActiveDropdown("event")}>
                Event Type
              </label>
              <input
                type="text"
                value={eventType}
                onClick={() => setActiveDropdown("event")}
                placeholder="Select events"
                readOnly
                className="font-bold text-[#CCAB4A] placeholder-[#CCAB4A] outline-none bg-transparent cursor-pointer"
              />
              {activeDropdown === "event" && (
                <div className="dropdown-wrapper absolute left-0 top-[75px] w-[350px] h-[250px] bg-white rounded-3xl z-30 shadow overflow-y-auto">
                  {eventOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleOptionClick(setEventType, option)}
                      className={`cursor-pointer text-lg p-3 pl-10 pr-10 ml-5 mr-5 mt-2 rounded-full font-medium text-black ${
                        eventType === option ? "bg-[#ffe69e]" : "hover:bg-[#ffe79e45]"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator_FilterBar />

            {/* Service Type */}
            <div className="service p-3 pl-5 flex flex-col text-sm rounded-full w-full md:w-[200px] hover:bg-[#ffe69e4a] relative">
              <label className="font-semibold text-[16px] cursor-pointer" onClick={() => setActiveDropdown("service")}>
                Service Type
              </label>
              <input
                type="text"
                value={serviceType}
                onClick={() => setActiveDropdown("service")}
                placeholder="Select service"
                readOnly
                className="font-bold text-[#CCAB4A] placeholder-[#CCAB4A] outline-none bg-transparent cursor-pointer"
              />
              {activeDropdown === "service" && (
                <div className="dropdown-wrapper absolute left-0 top-[75px] w-[350px] h-[250px] bg-white rounded-3xl z-30 shadow overflow-y-auto">
                  {serviceOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleOptionClick(setServiceType, option)}
                      className={`cursor-pointer text-lg p-3 pl-10 pr-10 ml-5 mr-5 mt-2 rounded-full font-medium text-black ${
                        serviceType === option ? "bg-[#ffe69e]" : "hover:bg-[#ffe79e45]"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator_FilterBar />

            {/* Date */}
            <div className="date p-3 pl-5 flex flex-col text-sm rounded-full w-full md:w-[180px] hover:bg-[#ffe69e4a] relative">
              <label className="font-semibold text-[16px] cursor-pointer" onClick={() => setActiveDropdown("date")}>
                Date
              </label>
              <input
                type="text"
                value={date}
                onClick={() => setActiveDropdown("date")}
                placeholder="Add date"
                readOnly
                className="font-bold text-[#CCAB4A] placeholder-[#CCAB4A] outline-none bg-transparent cursor-pointer"
              />
              {activeDropdown === "date" && (
                <div className="dropdown-wrapper absolute left-0 top-[75px] bg-white rounded-3xl z-30 shadow p-5">
                  <input
                    type="date"
                    className="text-[#CCAB4A] text-md font-semibold cursor-pointer"
                    onChange={(e) => {
                      setDate(e.target.value);
                      setActiveDropdown(null);
                    }}
                  />
                </div>
              )}
            </div>

            <Separator_FilterBar />

            {/* Location */}
            <div className="location p-3 pl-5 flex flex-col text-sm rounded-full w-full md:w-[200px] hover:bg-[#ffe69e4a] relative">
              <label className="font-semibold text-[16px] cursor-pointer" onClick={() => setActiveDropdown("location")}>
                Location
              </label>
              <input
                type="text"
                value={locationType}
                onClick={() => setActiveDropdown("location")}
                placeholder="Add location"
                readOnly
                className="font-bold text-[#CCAB4A] placeholder-[#CCAB4A] outline-none bg-transparent cursor-pointer"
              />
              {activeDropdown === "location" && (
                <div className="dropdown-wrapper absolute left-0 top-[75px] w-[350px] h-[250px] bg-white rounded-3xl z-30 shadow overflow-y-auto">
                  {locationOptions.map((option, index) => (
                    <div
                      key={index}
                      onClick={() => handleOptionClick(setLocationType, option)}
                      className={`cursor-pointer text-lg p-3 pl-10 pr-10 ml-5 mr-5 mt-2 rounded-full font-medium text-black ${
                        locationType === option ? "bg-[#ffe69e]" : "hover:bg-[#ffe79e45]"
                      }`}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Separator_FilterBar />

            {/* Guests */}
            <div className="guests p-3 pl-5 text-sm flex justify-between items-center rounded-full w-full md:w-[250px] hover:bg-[#ffe69e4a] relative">
              <div className="guests_left flex flex-col cursor-pointer w-full" onClick={() => setActiveDropdown("guests")}>
                <span className="font-semibold text-[16px]">Guests</span>
                <span className={`${guestCount > 0 ? "font-bold" : "font-medium"} text-[#CCAB4A]`}>
                  {guestCount > 0 ? `${guestCount} Guest${guestCount > 1 ? "s" : ""}` : "Number of guests"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="arrowButton absolute right-2 w-[45px] h-[45px] bg-[#CCAB4A] rounded-full z-10 flex items-center justify-center"
              >
                <EastIcon className="text-white" fontSize="large" />
              </button>

              {activeDropdown === "guests" && (
                <div className="dropdown-wrapper absolute right-0 top-[75px] bg-white rounded-3xl z-30 shadow p-5 w-[220px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[#CCAB4A] font-semibold text-md">Guest count</span>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => setGuestCount((prev) => Math.max(prev - 1, 0))}
                        className="text-xl w-8 h-8 bg-[#ffe69e] rounded-full"
                      >
                        -
                      </button>
                      <span className="font-bold">{guestCount}</span>
                      <button
                        type="button"
                        onClick={() => setGuestCount((prev) => prev + 1)}
                        className="text-xl w-8 h-8 bg-[#ffe69e] rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </form>
  );
};

export default FilterBar;
