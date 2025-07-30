import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EastIcon from "@mui/icons-material/East";

import Dashboards_Nav from "../components/Dashboards_Nav";

import { Doughnut_BookingCategory_UserDashboard } from "../components/Charts_Dashboards";

import { LayoutDashboard, IndianRupee, TicketSlash, ChartColumnDecreasing, UserRound, BriefcaseBusiness, Puzzle, ArrowLeft, CalendarCheck2, CalendarClock, CalendarFold, BadgeIndianRupee, CalendarX2, Camera, Music, SprayCan, HandPlatter, Store, Handshake, MonitorCheck, MonitorX, UserPlus } from 'lucide-react';

const formatMoney1 = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

const sidebar_arr = [
  {
    label: 'Bookings',
    icon: <CalendarFold size={22} />,
    key: 'Bookings',
  },
  {
    label: 'Payments',
    icon: <BadgeIndianRupee size={22} />,
    key: 'Payments',
  },
  {
    label: 'Preferences',
    icon: <Puzzle size={22} />,
    key: 'Preferences',
  }
];

const stats_bookings = [
  {
    label: 'Total Bookings',
    value: 7,
    icon: <CalendarFold size={32} />,
    key: 'customer'
  },
  {
    label: 'Completed bookings',
    value: 6,
    icon: <CalendarCheck2 size={32} />,
    key: 'vendor'
  },
  {
    label: 'Pending bookings',
    value: 1,
    icon: <CalendarClock size={32} />,
    key: 'events-completed'
  },
  {
    label: 'Cancelled bookings',
    value: 2,
    icon: <CalendarX2 size={32} />,
    key: 'events-completed'
  },
  {
    label: 'Average booking value',
    value: 23800,
    icon: <IndianRupee size={32} />,
    key: 'events-due'
  }
];

const stats_payments = [
  {
    label: 'Total amount spent',
    value: 238000,
    icon: <CalendarFold size={32} />,
    key: 'customer'
  },
  {
    label: 'Average transaction value',
    value: 34000,
    icon: <CalendarCheck2 size={32} />,
    key: 'vendor'
  },
  {
    label: 'Number of payments',
    value: 132,
    icon: <CalendarClock size={32} />,
    key: 'events-completed'
  }
];

const favoriteEventTypes = [
  { type: "Office Party", count: 18, medal: "🥇" },
  { type: "Birthday", count: 12, medal: "🥈" },
  { type: "Festival", count: 8, medal: "🥉" },
];

const preferredServices = [
  { service: "Photographer", count: 9, medal: "🥇" },
  { service: "Catering", count: 8, medal: "🥈" },
  { service: "Entertainment", count: 7, medal: "🥉" },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const [activeDropdown, setactiveDropdown] = useState("bookings")

  return (

    <div className="flex flex-col h-screen">

      {/* Navbar */}
      <div className="navbar bg-white border-b-2 border-[#CCAB4A]">
        <Dashboards_Nav />
      </div>

      {/* Main content below navbar, takes remaining height */}
      <div className="mainbody w-full flex flex-1">

        <div className="left w-[30%] xs:w-[25%] bg-[#fff4d4] h-full flex flex-col items-center py-8">

          {/* Sidebar options */}
          <div className="options flex flex-col items-center w-full">
            <div className="flex flex-col gap-3 w-[220px] items-center">
              {sidebar_arr.map((item) => {
                const key = item.key.toLowerCase();
                const isActive = activeDropdown === key;

                return (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setactiveDropdown(key)}
                    className={`group cursor-pointer rounded-[16px] pl-2 sm:pl-4 pr-2 flex items-center justify-between font-bold w-[80px] sm:w-[100px] md:w-[140px] lg:w-[180px] xl:w-[250px] h-[40px] transform transition-transform duration-500 ease-in-out hover:scale-105 hover:-translate-y-1 active:scale-95 ${isActive ? "bg-[#CCAB4A] text-white" : "bg-white text-[#CCAB4A] hover:bg-[#CCAB4A] hover:text-white"}`}
                  >
                    <span className="pb-[2px] text-base hidden lg:block">{item.label}</span>
                    <span className="pb-[2px] text-base block lg:hidden">{item.icon}</span>
                    <span className={`arrowButton w-[30px] h-[30px] rounded-[13px] flex items-center justify-center transition duration-500 ${isActive ? "bg-white text-[#CCAB4A]" : "bg-[#CCAB4A] text-white group-hover:bg-white group-hover:text-[#CCAB4A]"}`}>
                      <EastIcon fontSize="medium" />
                    </span>
                  </button>
                );
              })}

            </div>
          </div>

          {/* Back Button at bottom */}
          <div className="back_btn mt-20">
            <button
              type="button"
              onClick={() => navigate("/")}
              className=" w-[50px] sm:w-[120px] xl:w-[200px] flex justify-center items-center gap-2 sm:pr-4 py-2 text-black bg-white hover:shadow-md transition-all duration-300 rounded-full"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-base font-semibold hidden sm:block">Go Back</span>
            </button>
          </div>

        </div>

        {activeDropdown === "bookings" && (
          <div className="right-dashboard w-[70%] xs:w-[85%] bg-[#FDFAF0] border-l-2 border-[#CCAB4A] px-10">

            {/* Heading */}
            <div className="heading font-semibold text-[32px] xs:text-4xl sm:text-5xl my-4">
              Bookings
            </div>

            {/* Info Cards Upper */}
            <div className="py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {stats_bookings.map((item) => (
                  <div
                    key={item.key}
                    className={`min-h-[160px] w-full px-6 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-between py-5`}
                  >
                    {/* Icon */}
                    <div className="icon">{item.icon}</div>

                    {/* Bottom Content */}
                    <div className="content flex flex-col items-center">
                      <div className="heading font-semibold text-base md:text-lg text-gray-500 leading-none text-center">
                        {item.label}
                      </div>
                      <div className="metric text-[38px] md:text-[55px] lg:text-[65px] font-bold text-[#CCAB4A] leading-none">
                        {item.label.toLowerCase().includes('value')
                          ? formatMoney1(item.value)
                          : item.value.toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                ))}

              </div>
            </div>

          </div>
        )}

        {activeDropdown === "payments" && (

          <div className="right-dashboard w-[70%] xs:w-[85%] bg-[#FDFAF0] border-l-2 border-[#CCAB4A] px-10">

            {/* Heading */}
            <div className="heading font-semibold text-[32px] xs:text-4xl sm:text-5xl my-4">
              Payments
            </div>

            {/* Info Cards Upper */}
            <div className="py-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {stats_payments.map((item, index) => (
                  <div
                    key={item.key}
                    className="min-h-[160px] w-full px-6 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-between py-5"
                  >
                    <div className="icon">{item.icon}</div>

                    <div className="content flex flex-col items-center">
                      <div className="heading font-semibold text-base md:text-lg text-gray-500 leading-none text-center">
                        {item.label}
                      </div>
                      <div className="metric text-[38px] md:text-[55px] lg:text-[65px] font-bold text-[#CCAB4A] leading-none text-center">
                        {item.label === "Number of payments"
                          ? item.value.toLocaleString('en-IN')
                          : formatMoney1(item.value)}
                      </div>
                    </div>
                  </div>

                ))}

              </div>
            </div>

          </div>

        )}

        {activeDropdown === "preferences" && (

          <div className="right-dashboard w-[70%] xs:w-[85%] bg-[#FDFAF0] border-l-2 border-[#CCAB4A] px-10">

            {/* Heading */}
            <div className="heading font-semibold text-[32px] xs:text-4xl sm:text-5xl my-4">
              Preferences
            </div>

            {/* Info Cards */}
            <div className="py-4">

              <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 mb-10">

                {/* Two side-by-side custom columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

                  {/* Favorite Event Types */}
                  <div className="w-full px-6 py-5 bg-white border-2 border-[#CCAB4A] rounded-[20px] flex flex-col justify-start min-h-[400px]">
                    <div className="mb-4">
                      <div className="text-xl md:text-2xl font-semibold text-black">Favorite Event Types</div>
                      <div className="text-sm text-gray-400 leading-4">Most frequently booked</div>
                    </div>

                    <div className="flex-1 flex flex-col justify-evenly space-y-4">
                      {favoriteEventTypes.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-start group cursor-pointer"
                        >
                          <div className="flex items-start gap-2">
                            <div className="text-xl md:text-2xl leading-tight group-hover:text-3xl transition-all duration-500">
                              {item.medal}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-base md:text-xl leading-none break-words">
                                {item.type}
                              </span>
                            </div>
                          </div>

                          <div className="text-[#CCAB4A] font-bold text-xl md:text-2xl leading-none">
                            {item.count}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preferred Services */}
                  <div className="w-full px-6 py-5 bg-white border-2 border-[#CCAB4A] rounded-[20px] flex flex-col justify-start min-h-[400px]">
                    <div className="mb-4">
                      <div className="text-xl md:text-2xl font-semibold text-black">Preferred Services</div>
                      <div className="text-sm text-gray-400 leading-4">Most chosen offerings</div>
                    </div>

                    <div className="flex-1 flex flex-col justify-evenly space-y-4">
                      {preferredServices.map((item, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-start group cursor-pointer"
                        >
                          <div className="flex items-start gap-2">
                            <div className="text-xl md:text-2xl leading-tight group-hover:text-3xl transition-all duration-500">
                              {item.medal}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-base md:text-xl leading-none break-words">
                                {item.service}
                              </span>
                            </div>
                          </div>

                          <div className="text-[#CCAB4A] font-bold text-xl md:text-2xl leading-none">
                            {item.count}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>


                {/* Vendors by City */}
                <div className="h-[400px] w-full px-6 py-5 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-start">
                  <div className="heading font-semibold text-2xl text-black mb-2">
                    Booking by Category
                  </div>
                  <div className="flex-1 flex items-center justify-center text-gray-400">
                    <Doughnut_BookingCategory_UserDashboard />
                  </div>
                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );
};

export default UserDashboard;