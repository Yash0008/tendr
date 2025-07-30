import { useNavigate, useLocation } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

import ListingsNav from "../components/ListingsNav";
import PrimaryFilters_ListingPage from "../components/PrimaryFilters_ListingPage";
import SecondaryFilters_ListingPage from "../components/SecondaryFilters_ListingPage";
import VendorList_ListingPage from "../components/VendorList_ListingPage";
import { useEffect, useState } from "react";
import { getVendors } from "../apis/vendorApi";

const ListingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    eventType = "",
    serviceType = "",
    date = "",
    locationType = "",
    guestCount = 0,
    vendors = [],
    pagination = {},
  } = location.state || {};

  const [eventTypeState, setEventTypeState] = useState(eventType || "");
  const [serviceTypeState, setServiceTypeState] = useState(serviceType || "");
  const [locationTypeState, setLocationTypeState] = useState(
    locationType || ""
  );
  const [dateState, setDateState] = useState(date || "");
  const [guestCountState, setGuestCountState] = useState(guestCount || 0);

  const [vendorList, setVendorList] = useState(vendors);
  const [paginationInfo, setPaginationInfo] = useState(pagination);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [secondaryFilters, setSecondaryFilters] = useState({});
  const [sortBy, setSortBy] = useState("rankingScore");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    if (!locationTypeState || !serviceTypeState) return;

    setIsLoading(true);
    const filters = {
      location: locationTypeState,
      serviceTypes: [serviceTypeState],
      sortBy,
      sortOrder,
      page: 1,
      limit: 10,
      serviceFilters: secondaryFilters,
    };

    getVendors(filters)
      .then((data) => {
        setVendorList(data.vendors || []);
        setPaginationInfo(data.pagination || {});
        setCurrentPage(1);
      })
      .catch((err) => console.error("Error fetching vendors:", err))
      .finally(() => setIsLoading(false));
  }, [
    sortBy,
    sortOrder,
    secondaryFilters,
    locationTypeState,
    serviceTypeState,
  ]);

  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    setIsLoading(true);

    const filters = {
      location: locationTypeState,
      serviceTypes: [serviceTypeState],
      sortBy,
      sortOrder,
      page: nextPage,
      limit: 10,
      serviceFilters: secondaryFilters,
    };

    getVendors(filters)
      .then((data) => {
        setVendorList((prev) => [...prev, ...(data.vendors || [])]);
        setPaginationInfo(data.pagination || {});
        setCurrentPage(nextPage);
      })
      .catch((err) => console.error("Error fetching more vendors:", err))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {/* Navbar */}
      <div className="navbar bg-[#FDFAF0]">
        {/* border-b-2 border-[#CCAB4A] */}
        <ListingsNav />
      </div>

      {/* Main Body */}
      <div className="mainbody w-full h-fit flex">
        <div className="left w-[30%] h-full bg-white">
          <div className="left_content p-2">
            {/* Back Button */}
            <div className="back_btn pl-2">
              <button
                type="button"
                onClick={() => {
                  navigate("/");
                }}
                className="arrowButton w-[45px] h-[45px] bg-[#CCAB4A] hover:bg-[#b89b3f] transition-all duration-200 rounded-full"
              >
                <WestIcon className="text-white" fontSize="large" />
              </button>
            </div>

            {/* Primary Filters */}
            <div className="primary_filter bg-[#FDFAF0] rounded-[40px] shadow-sm pb-6 pt-6 w-[450px] ml-5 mt-5">
              <PrimaryFilters_ListingPage
                eventType={eventTypeState}
                setEventType={setEventTypeState}
                serviceType={serviceTypeState}
                setServiceType={setServiceTypeState}
                locationType={locationTypeState}
                setLocationType={setLocationTypeState}
                date={dateState}
                setDate={setDateState}
                guestCount={guestCountState}
                setGuestCount={setGuestCountState}
                onSearch={() => {
                  setIsLoading(true);
                  setCurrentPage(1);
                  const filters = {
                    location: locationTypeState,
                    serviceTypes: [serviceTypeState],
                    sortBy,
                    sortOrder,
                    page: 1,
                    limit: 10,
                    serviceFilters: secondaryFilters,
                  };

                  getVendors(filters)
                    .then((data) => {
                      setVendorList(data.vendors);
                      setPaginationInfo(data.pagination);
                    })
                    .catch((err) =>
                      console.error("Error fetching vendors:", err)
                    )
                    .finally(() => setIsLoading(false));
                }}
              />
            </div>

            {/* Secondary Filters */}
            <div className="secondary_filter bg-[#FDFAF0] rounded-[40px] shadow-sm pb-6 pt-6 w-[450px] ml-5 mt-7 mb-5">
              <SecondaryFilters_ListingPage
                onFiltersChange={setSecondaryFilters}
              />
            </div>
          </div>
        </div>

        <div className="right w-[70%] bg-white">
          {/* border-l-2 border-[#CCAB4A]*/}

          <div className="right_content px-7 pt-5 h-full">
            <VendorList_ListingPage
              eventType={eventTypeState}
              serviceType={serviceTypeState}
              date={dateState}
              locationType={locationTypeState}
              guestCount={guestCountState}
              vendors={vendorList}
              paginationInfo={paginationInfo}
              handleShowMore={handleShowMore}
              isLoading={isLoading}
              sortBy={sortBy}
              sortOrder={sortOrder}
              setSortBy={setSortBy}
              setSortOrder={setSortOrder}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="footer h-fit pt-20 pb-5 bg-[#FFD3C3] text-[#D48060] rounded-t-[80px] transition-colors duration-300">
        <div className="top mx-20 flex justify-between">
          {/* Left Section */}
          <div className="left flex flex-col gap-16">
            <div className="top text-[45px] font-bold">tendr</div>
            <div className="bottom flex flex-col gap-3">
              <div className="first text-2xl font-semibold">
                Follow us on :-
              </div>
              <div className="second flex gap-5">
                <div className="group cursor-pointer transition-colors duration-300">
                  <LinkedInIcon
                    className="text-black group-hover:text-white"
                    sx={{ fontSize: 40 }}
                  />
                </div>
                <div className="group cursor-pointer transition-colors duration-300">
                  <InstagramIcon
                    className="text-black group-hover:text-white"
                    sx={{ fontSize: 40 }}
                  />
                </div>
                <div className="group cursor-pointer transition-colors duration-300">
                  <FacebookIcon
                    className="text-black group-hover:text-white"
                    sx={{ fontSize: 40 }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="right mt-4 font-bold text-[24px] flex flex-col gap-2">
            {[
              "Support",
              "Help Center",
              "Vendor Support",
              "Vendor",
              "Get in touch",
            ].map((text, index) => (
              <div
                key={index}
                className="group cursor-pointer transition-colors duration-300 hover:text-white"
              >
                {text}
              </div>
            ))}
          </div>
        </div>
        {/* Big tendr text in center */}
        <div className="relative overflow-hidden">
          <div className="center mx-20 text-[380px] font-bold text-center leading-none">
            tendr
          </div>
        </div>
        {/* Bottom row */}
        <div className="bottom mx-12 text-xl font-bold flex justify-between">
          <div className="left group cursor-pointer transition-colors duration-300 hover:text-white">
            Copyright 2025 | tendr
          </div>
          <div className="right group cursor-pointer transition-colors duration-300 hover:text-white">
            Privacy policy
          </div>
        </div>
      </div>
    </>
  );
};

export default ListingPage;
