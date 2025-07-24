import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import ListingsNav from '../components/ListingsNav';

import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

import { Heart, Share, Star, Hourglass } from 'lucide-react';

import main1 from "../assets/vendor_details_main_1.avif";
import main2 from "../assets/vendor_details_main_2.avif";
import main3 from "../assets/vendor_details_main_3.avif";
import main4 from "../assets/vendor_details_main_4.avif";
import main5 from "../assets/vendor_details_main_5.avif";

import south_indian from "../assets/vendor_details_south_indian_catering.jpeg";
import north_indian from "../assets/vendor_details_north_indian_catering.jpeg";
import snacks from "../assets/vendor_details_snacks_catering.jpeg";
import beverage from "../assets/vendor_details_beverage_catering.jpeg";
import desert from "../assets/vendor_details_desert_catering.jpeg";
import live_counter from "../assets/vendor_details_live_counter_catering.jpeg";

import { getVendorById } from "../apis/vendorApi";

const VendorDetailsPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  // Get vendor data from state (if navigating from listings) or fetch by ID
  const vendorFromState = location.state?.vendor;

  useEffect(() => {
    const fetchVendorData = async () => {
      try {
        setLoading(true);
        setError(null);

        let vendorData;
        if (vendorFromState) {
          // Use vendor data from navigation state
          vendorData = vendorFromState;
        } else if (id) {
          // Fetch vendor data by ID
          const response = await getVendorById(id);
          vendorData = response.vendor || response;
        } else {
          throw new Error("No vendor ID provided");
        }

        setVendor(vendorData);
      } catch (err) {
        console.error("Error fetching vendor data:", err);
        setError(err.message || "Failed to load vendor details");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorData();
  }, [id, vendorFromState]);

  const filtersData = {
    guest: 100,
    location: "Jalandhar",
    date: "2025-05-10",
    time: "7:00 PM",
    foodType: "South Indian",
    decorTheme: "Royal",
  };

  const handlePayment = async () => {
    try {
      const totalAmount = 10000; // Update with actual value
      const conversationId = "YOUR_CONVERSATION_ID"; // Ideally passed as prop or state

      // Step 1: Create Razorpay order
      const res = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversationId, totalAmount }),
      });

      const { orderId, amount, currency } = await res.json();

      // Step 2: Launch Razorpay Checkout
      const options = {
        key: "rzp_test_YOUR_KEY_HERE", // Replace with your actual key
        amount: amount,
        currency: currency,
        name: "Tendr",
        description: "Event Booking Payment",
        order_id: orderId,
        handler: function (response) {
          console.log("Payment successful:", response);
          // Handle successful payment
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#CCAB4A",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading vendor details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-red-600 mb-4">Error loading vendor</div>
          <div className="text-gray-600 mb-4">{error}</div>
          <button
            onClick={() => navigate("/listings")}
            className="px-6 py-2 bg-[#CCAB4A] text-white rounded-xl hover:bg-[#ab8f39]"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-600 mb-4">Vendor not found</div>
          <div className="text-gray-600 mb-4">The vendor you're looking for doesn't exist or has been removed.</div>
          <button
            onClick={() => navigate("/listings")}
            className="px-6 py-2 bg-[#CCAB4A] text-white rounded-xl hover:bg-[#ab8f39]"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="">

      {/* Navbar */}
      <div className="navbar border-b-[1px] border-[#CCAB4A]">
        <ListingsNav />
      </div>

      {/* Page Content Container */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title, Share and Save */}
        <div className="flex items-center justify-between py-7">

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl break-words">
            {vendor.name || "Vendor Name"}
          </h1>

          {/* Share and Save */}
          <div className="flex w-[180px] justify-between">
            <button className="flex justify-center items-center gap-[6px] leading-none text-sm bg-black w-[78px] rounded-full h-8 transition-all duration-300 text-white font-semibold hover:-translate-y-1 hover:scale-110">
              <Share size={16} />
              <span>Share</span>
            </button>
            <button className="flex justify-center items-center gap-[6px] leading-none text-sm bg-black w-[78px] rounded-full h-8 transition-all duration-300 text-white font-semibold hover:-translate-y-1 hover:scale-110">
              <Heart size={16} />
              <span>Save</span>
            </button>
          </div>

        </div>

        {/* Gallery */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-3">

          {/* Main Image */}
          <div className="relative h-[400px] w-full rounded-l-xl overflow-hidden group cursor-pointer">
            <img
              src={vendor.portfolioFiles?.[0] || main1}
              alt="Main 1"
              className="h-full w-full object-cover"
              onLoad={() => setIsLoaded(true)}
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
          </div>

          {/* Small Grid Images */}
          <div className="grid grid-cols-2 gap-3">
            {[main2, main3, main4, main5].map((img, idx) => {
              // Determine rounding class based on index
              let rounding = '';
              if (idx === 1) {
                rounding = 'rounded-tr-xl';
              } else if (idx === 3) {
                rounding = 'rounded-br-xl';
              }

              return (
                <div
                  key={idx}
                  className={`relative h-[195px] w-full overflow-hidden group cursor-pointer ${rounding}`}
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 2}`}
                    className="h-full w-full object-cover"
                    onLoad={() => setIsLoaded(true)}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                </div>
              );
            })}
          </div>

        </section>

        {/* Title and Booking Info */}
        <div className="flex flex-col lg:flex-row justify-between gap-8 py-10">

          {/* Left: Vendor Info */}
          <div className="lg:w-2/3">

            {/* Location */}
            <div className="text-black text-2xl font-semibold">
              Located in {vendor.address?.city || vendor.location || "Location"}, {vendor.address?.state || "State"}
            </div>

            {/* Star Rating Pill */}
            <div className="inline-flex items-center h-16 text-black font-semibold text-xl rounded-3xl border-[1px] border-[#CCAB4A] mt-4">

              <div className="flex flex-col text-center items-center px-8 py-2 gap-1 h-full">
                <span>{vendor.rating || "4.9"}</span>
                <div className="stars flex gap-[1px]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} fill="black" />
                  ))}
                </div>
              </div>

              {/* Divider (optional) */}
              <div className="h-10 w-px bg-[#CCAB4A]"></div>

              <div className="flex flex-col text-center items-center h-full px-8 py-2">
                <div>{vendor.number_of_reviews || "112"}</div>
                <div className="text-sm leading-tight">Reviews</div>
              </div>

            </div>

            {/* Description */}
            <p className="text-xl text-gray-700 mt-6">
              {vendor.description || 
                "We offer premium services with an unwavering commitment to quality, sophistication, and detail. " +
                "Whether you're planning an elegant wedding, a high-end corporate gathering, or a private celebration, " +
                "our team is dedicated to curating experiences that leave a lasting impression. " +
                "From personalized planning to flawless execution, we ensure that every aspect reflects your vision with " +
                "a touch of luxury and class. Our expertise lies in delivering not just events, but moments that feel effortless, " +
                "seamless, and unforgettable."
              }
            </p>

            {/* Response Time */}
            <div className="inline-flex items-center h-16 text-black font-semibold text-xl rounded-3xl border-[1px] border-[#CCAB4A] mt-6">
              {/* Hourglass and Response Time Pill */}
              <div className="flex items-center gap-2 px-8 py-2 h-full">

                <Hourglass className="w-5 h-5" />
                <div className="text-xl font-medium pr-8">Response time</div>

                <div className="h-10 w-px bg-[#CCAB4A]"></div>

                <div className="text-xl ml-1 px-8">1 hour</div>
              </div>
            </div>

          </div>

          {/* Right: Booking Card */}
          <div className="lg:w-1/3 bg-white p-5 rounded-2xl shadow-lg border border-[#CCAB4A]">
            <h2 className="text-xl font-semibold">
              ₹{vendor.price || "Price to be updated"}
            </h2>
            <div className="text-base mt-2 text-gray-600 font-medium">Event Location, Date & Time</div>

            <div className="bg-[#fffaea] mt-4 border border-[#CCAB4A] text-base font-medium p-3 rounded-xl whitespace-pre-line text-gray-800">
              {`Guest: ${filtersData.guest}
                Location: ${filtersData.location}
                Date: ${filtersData.date}
                Time: ${filtersData.time}
                Food Type: ${filtersData.foodType}
                Decor Theme: ${filtersData.decorTheme}
                Are you available?`}
            </div>

            <button
              onClick={() =>
                navigate("/chat", {
                  state: {
                    vendor: vendor,
                    filters: filtersData,
                  },
                })
              }
              className="w-full mt-5 px-4 py-2 bg-[#CCAB4A] hover:bg-[#ab8f39] text-white rounded-xl text-base font-bold"
            >
              Chat with Vendor
            </button>

            <button
              onClick={() => navigate("/vendor/dashboard")}
              className="w-full mt-3 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-xl text-base font-bold"
            >
              Vendor Dashboard
            </button>

            <button
              onClick={handlePayment}
              className="w-full mt-5 px-4 py-2 bg-[#CCAB4A] hover:bg-[#ab8f39] text-white rounded-xl text-base font-bold"
            >
              Pay
            </button>

          </div>

        </div>

        {/* Specializes In */}
        <section className="pb-12">
          <h3 className="text-2xl font-semibold mb-6">
            Specializes In - {vendor.serviceType || "Catering"}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { title: "South Indian", img: south_indian },
              { title: "North Indian", img: north_indian },
              { title: "Snacks", img: snacks },
              { title: "Desserts", img: desert },
              { title: "Beverages", img: beverage },
              { title: "Live Counters", img: live_counter },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-md overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:scale-110 cursor-pointer"
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className={`h-32 w-full object-cover transition-opacity duration-200 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  onLoad={() => setIsLoaded(true)}
                />
                <div className="p-3 text-center font-semibold text-sm text-gray-700">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Footer */}
      <div className="footer h-fit pt-20 pb-5 bg-[#FFD3C3] text-[#D48060] rounded-t-[40px] md:rounded-t-[80px] transition-colors duration-300">
        <div className="top flex flex-col md:flex-row justify-between items-start md:items-center gap-10 mx-4 md:mx-20">
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
        <div className="center text-[100px] md:text-[280px] lg:text-[380px] text-center font-bold text-[#D48060] leading-none">
          tendr
        </div>
        <div className="bottom flex flex-col md:flex-row justify-between items-center gap-4 mx-4 md:mx-12 text-xl font-bold">
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
      </div>

    </div >
  );

};

export default VendorDetailsPage;
