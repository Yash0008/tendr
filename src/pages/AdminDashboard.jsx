import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EastIcon from "@mui/icons-material/East";

import Dashboards_Nav from "../components/Dashboards_Nav";

import { LineChart_UserVendorGrowth_AdminDashboard, LineChart_BookingsPerMonth_AdminDashboard, Doughnut_BookingCategory_AdminDashboard, Doughnut_BookingCity_AdminDashboard, Doughnut_VendorCity_AdminDashboard, Doughnut_UserCity_AdminDashboard, LineChart_UserNew_AdminDashboard } from "../components/Charts_Dashboards";

import { LayoutDashboard, IndianRupee, TicketSlash, ChartColumnDecreasing, UserRound, BriefcaseBusiness, BadgeIndianRupee, ArrowLeft, CalendarCheck2, CalendarClock, CalendarFold, CalendarX2, Camera, Music, SprayCan, HandPlatter, Store, Handshake, MonitorCheck, MonitorX, UserPlus } from 'lucide-react';

const formatEarnings = (amount) => {
  if (amount >= 1000) {
    return `₹${Math.round(amount / 1000)}K`;
  }
  return `₹${amount}`;
};

const stats_dashboard = [
  {
    label: 'Users Count',
    value: 1229,
    icon: <UserRound size={32} />,
    key: 'customer'
  },
  {
    label: 'Vendor Count',
    value: 305,
    icon: <BriefcaseBusiness size={32} />,
    key: 'vendor'
  },
  {
    label: 'Completed Bookings',
    value: 689,
    icon: <CalendarCheck2 size={32} />,
    key: 'events-completed'
  },
  {
    label: 'Pending Bookings',
    value: 132,
    icon: <CalendarClock size={32} />,
    key: 'events-due'
  }
];

const stats_bookings = [
  {
    label: 'Total Bookings',
    value: 838,
    icon: <CalendarFold size={32} />,
    key: 'customer'
  },
  {
    label: 'Completed Bookings',
    value: 689,
    icon: <CalendarCheck2 size={32} />,
    key: 'vendor'
  },
  {
    label: 'Pending Bookings',
    value: 132,
    icon: <CalendarClock size={32} />,
    key: 'events-completed'
  },
  {
    label: 'Cancelled Bookings',
    value: 17,
    icon: <CalendarX2 size={32} />,
    key: 'events-due'
  }
];

const stats_payments = [
  {
    label: 'Total Payments',
    value: 208,
    icon: <CalendarFold size={32} />,
    key: 'customer'
  },
  {
    label: 'Payments done this month',
    value: 159,
    icon: <CalendarCheck2 size={32} />,
    key: 'vendor'
  },
  {
    label: 'Total Revenue',
    value: 49,
    icon: <CalendarClock size={32} />,
    key: 'events-completed'
  },
  {
    label: 'Total Payouts to Vendors',
    value: 17,
    icon: <CalendarX2 size={32} />,
    key: 'events-due'
  }
];

const stats_vendors = [
  {
    label: 'Total Vendors',
    value: 305,
    icon: <BriefcaseBusiness size={32} />,
    key: 'customer'
  },
  {
    label: 'Total Caterers',
    value: 82,
    icon: <HandPlatter size={32} />,
    key: 'vendor'
  },
  {
    label: 'Total DJs',
    value: 77,
    icon: <Music size={32} />,
    key: 'events-completed'
  },
  {
    label: 'Total Decorators',
    value: 67,
    icon: <SprayCan size={32} />,
    key: 'events-due'
  },
  {
    label: 'Total Photographers',
    value: 79,
    icon: <Camera size={32} />,
    key: 'events-due'
  },
  {
    label: 'New Vendors this month',
    value: 28,
    icon: <Handshake size={32} />,
    key: 'events-due'
  },
  {
    label: 'Active Vendors',
    value: 219,
    icon: <MonitorCheck size={32} />,
    key: 'events-due'
  },
  {
    label: 'Inactive Vendors',
    value: 86,
    icon: <MonitorX size={32} />,
    key: 'events-due'
  }
];

const topVendors = [
  { name: "Vendor A", city: "Delhi", bookings: 59, medal: "🥇" },
  { name: "Vendor B", city: "Noida", bookings: 54, medal: "🥈" },
  { name: "Vendor C", city: "Gurugram", bookings: 48, medal: "🥉" },
];

const topEarners = [
  { name: "Vendor X", city: "Noida", medal: "🥇", earnings: 670000 },
  { name: "Vendor Y", city: "Gurugram", medal: "🥈", earnings: 625500 },
  { name: "Vendor Z", city: "Gurugram", medal: "🥉", earnings: 592000 },
];

const stats_users = [
  {
    label: 'Total Users',
    value: 1229,
    icon: <UserRound size={32} />,
    key: 'customer'
  },
  {
    label: 'Active Users',
    value: 412,
    icon: <MonitorCheck size={32} />,
    key: 'vendor'
  },
  {
    label: 'New Users this month',
    value: 121,
    icon: <UserPlus size={32} />,
    key: 'events-completed'
  },
  {
    label: 'Repeat Users',
    value: 185,
    icon: <Handshake size={32} />,
    key: 'events-due'
  }
];

const sidebar_arr = [
  {
    label: 'Dashboard',
    icon: <LayoutDashboard size={22} />,
    key: 'Dashboard',
  },
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
    label: 'Vendors',
    icon: <BriefcaseBusiness size={22} />,
    key: 'Vendors',
  },
  {
    label: 'Users',
    icon: <UserRound size={22} />,
    key: 'Users',
  }
];





const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeDropdown, setactiveDropdown] = useState("dashboard")

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

        {activeDropdown === "dashboard" && (
          <div className="right-dashboard w-[70%] xs:w-[85%] bg-[#FDFAF0] border-l-2 border-[#CCAB4A] px-10">

            {/* Heading */}
            <div className="heading font-semibold text-[32px] xs:text-4xl sm:text-5xl my-4">
              Dashboard
            </div>

            {/* Info Cards Upper */}
            <div className="py-4">
              <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-6">

                {stats_dashboard.map((item) => (
                  <div
                    key={item.key}
                    className="h-[180px] w-[100%] px-6 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-between py-5"
                  >
                    {/* Icon */}
                    <div className="icon">{item.icon}</div>

                    {/* Bottom Content */}
                    <div className="content flex flex-col items-center">
                      <div className="heading font-semibold text-lg text-gray-500 leading-none text-center">
                        {item.label}
                      </div>
                      <div className="metric text-[75px] font-bold text-[#CCAB4A] leading-[70px]">
                        {item.value}
                      </div>
                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* Info Cards Lower */}
            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 gap-6 mb-10">

              {/* New Users and Vendors per month */}
              <div className="h-[400px] w-full px-6 py-5 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-start">
                <div className="heading font-semibold text-2xl text-black mb-2">
                  New Users and Vendors per month
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <LineChart_UserVendorGrowth_AdminDashboard />
                </div>
              </div>

              {/* New Bookings per month */}
              <div className="h-[400px] w-full px-6 py-5 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-start">
                <div className="heading font-semibold text-2xl text-black mb-2">
                  New Bookings per month
                </div>
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  <LineChart_BookingsPerMonth_AdminDashboard />
                </div>
              </div>

            </div>

          </div>
        )}

        {activeDropdown === "bookings" && (

          <div className="right-dashboard w-[70%] xs:w-[85%] bg-[#FDFAF0] border-l-2 border-[#CCAB4A] px-10">

            {/* Heading */}
            <div className="heading font-semibold text-[32px] xs:text-4xl sm:text-5xl my-4">
              Bookings
            </div>

            {/* Info Cards Upper */}
            <div className="py-4">
              <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-6">

                {stats_bookings.map((item) => (
                  <div
                    key={item.key}
                    className="h-[180px] w-[100%] px-6 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-between py-5"
                  >
                    {/* Icon */}
                    <div className="icon">{item.icon}</div>

                    {/* Bottom Content */}
                    <div className="content flex flex-col items-center">
                      <div className="heading font-semibold text-lg text-gray-500 leading-none text-center">
                        {item.label}
                      </div>
                      <div className="metric text-[75px] font-bold text-[#CCAB4A] leading-[70px]">
                        {item.value}
                      </div>
                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* Info Cards Lower */}
            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 gap-6 mb-10">

              {/* Booking by Category */}
              <div className="h-[400px] w-full px-6 py-5 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-start">
                <div className="heading font-semibold text-2xl text-black mb-2">
                  Booking by Category
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <Doughnut_BookingCategory_AdminDashboard />
                </div>
              </div>

              {/* Booking by City */}
              <div className="h-[400px] w-full px-6 py-5 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-start">
                <div className="heading font-semibold text-2xl text-black mb-2">
                  Booking by City
                </div>
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  <Doughnut_BookingCity_AdminDashboard />
                </div>
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
              <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-6">

                {stats_payments.map((item) => (
                  <div
                    key={item.key}
                    className="h-[180px] w-[100%] px-6 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-between py-5"
                  >
                    {/* Icon */}
                    <div className="icon">{item.icon}</div>

                    {/* Bottom Content */}
                    <div className="content flex flex-col items-center">
                      <div className="heading font-semibold text-lg text-gray-500 leading-none text-center">
                        {item.label}
                      </div>
                      <div className="metric text-[75px] font-bold text-[#CCAB4A] leading-[70px]">
                        {item.value}
                      </div>
                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* Info Cards Lower */}
            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 gap-6 mb-10">

              {/* Booking by Category */}
              <div className="h-[400px] w-full px-6 py-5 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-start">
                <div className="heading font-semibold text-2xl text-black mb-2">
                  Booking by Category
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <Doughnut_BookingCategory_AdminDashboard />
                </div>
              </div>

              {/* Booking by City */}
              <div className="h-[400px] w-full px-6 py-5 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-start">
                <div className="heading font-semibold text-2xl text-black mb-2">
                  Booking by City
                </div>
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  <Doughnut_BookingCity_AdminDashboard />
                </div>
              </div>

            </div>

          </div>

        )}

        {activeDropdown === "vendors" && (

          <div className="right-dashboard w-[70%] xs:w-[85%] bg-[#FDFAF0] border-l-2 border-[#CCAB4A] px-10">

            {/* Heading */}
            <div className="heading font-semibold text-[32px] xs:text-4xl sm:text-5xl my-4">
              Vendors
            </div>

            {/* Info Cards Upper */}
            <div className="py-4">
              <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-2 gap-6">

                {stats_vendors.map((item) => (
                  <div
                    key={item.key}
                    className="h-[180px] w-[100%] px-6 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-between py-5"
                  >
                    {/* Icon */}
                    <div className="icon">{item.icon}</div>

                    {/* Bottom Content */}
                    <div className="content flex flex-col items-center">
                      <div className="heading font-semibold text-lg text-gray-500 leading-none text-center">
                        {item.label}
                      </div>
                      <div className="metric text-[75px] font-bold text-[#CCAB4A] leading-[70px]">
                        {item.value}
                      </div>
                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* Info Cards Lower */}
            <div className="grid grid-cols-1 mt-4 lg:grid-cols-2 gap-6 mb-10">

              {/* Two side-by-side custom columns */}
              <div className="w-full grid grid-cols-1 2xl:grid-cols-2 gap-6">

                {/* Left box */}
                <div className="flex-1 px-6 py-5 bg-white border-2 border-[#CCAB4A] rounded-[20px] flex flex-col justify-start">

                  {/* Heading */}
                  <div className="mb-4">
                    <div className="text-2xl font-semibold text-black">Top Performers</div>
                    <div className="text-base text-gray-400 leading-4">Total bookings handled</div>
                  </div>

                  {/* Vendor list */}
                  <div className="flex-1 flex flex-col justify-evenly space-y-4">
                    {topVendors.map((vendor, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start group cursor-pointer"
                      >
                        {/* Left: medal + name */}
                        <div className="flex items-start gap-2 w-[210px]">
                          <div className="text-2xl leading-tight group-hover:text-3xl transition-all duration-500">
                            {vendor.medal}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-xl leading-none break-words">
                              {vendor.name}
                            </span>
                            <span className="text-sm text-gray-500 mt-2">{vendor.city}</span>
                          </div>
                        </div>

                        {/* Right: booking count */}
                        <div className="text-[#CCAB4A] font-bold text-2xl leading-none">
                          {vendor.bookings}
                        </div>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Right box */}
                <div className="flex-1 px-6 py-5 bg-white border-2 border-[#CCAB4A] rounded-[20px] flex flex-col justify-start">

                  {/* Heading */}
                  <div className="mb-4">
                    <div className="text-2xl font-semibold text-black">Top Earners</div>
                    <div className="text-base text-gray-400 leading-4">Total revenue generated</div>
                  </div>

                  {/* Earner list */}
                  <div className="flex-1 flex flex-col justify-evenly space-y-4">
                    {topEarners.map((earner, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-start group cursor-pointer"
                      >
                        {/* Left: medal + name */}
                        <div className="flex items-start gap-2 w-[170px]">
                          <div className="text-2xl leading-tight group-hover:text-3xl transition-all duration-500">
                            {earner.medal}
                          </div>
                          <div className="flex flex-col">
                            <span className="font-semibold text-xl leading-none break-words">
                              {earner.name}
                            </span>
                            <span className="text-sm text-gray-500 mt-2">{earner.city}</span>
                          </div>
                        </div>

                        {/* Right: Earnings */}
                        <div className="text-[#CCAB4A] font-bold text-2xl leading-none whitespace-nowrap">
                          {formatEarnings(earner.earnings)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Vendors by City */}
              <div className="h-[400px] w-full px-6 py-5 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-start">
                <div className="heading font-semibold text-2xl text-black mb-2">
                  Vendors by City
                </div>
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  <Doughnut_VendorCity_AdminDashboard />
                </div>
              </div>

            </div>

          </div>

        )}

        {activeDropdown === "users" && (

          <div className="right-dashboard w-[70%] xs:w-[85%] bg-[#FDFAF0] border-l-2 border-[#CCAB4A] px-10">

            {/* Heading */}
            <div className="heading font-semibold text-[32px] xs:text-4xl sm:text-5xl my-4">
              Users
            </div>

            {/* Info Cards Upper */}
            <div className="py-4">
              <div className="grid grid-cols-1 xl:grid-cols-4 md:grid-cols-2 gap-6">

                {stats_users.map((item) => (
                  <div
                    key={item.key}
                    className="h-[180px] w-[100%] px-6 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-between py-5"
                  >
                    {/* Icon */}
                    <div className="icon">{item.icon}</div>

                    {/* Bottom Content */}
                    <div className="content flex flex-col items-center">
                      <div className="heading font-semibold text-lg text-gray-500 leading-none text-center">
                        {item.label}
                      </div>
                      <div className="metric text-[75px] font-bold text-[#CCAB4A] leading-[70px]">
                        {item.value}
                      </div>
                    </div>

                  </div>
                ))}

              </div>
            </div>

            {/* Info Cards Lower */}
            <div className="grid grid-cols-1 mt-4 sm:grid-cols-2 gap-6 mb-10">

              {/* Users by City */}
              <div className="h-[400px] w-full px-6 py-5 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-start">
                <div className="heading font-semibold text-2xl text-black mb-2">
                  Users by City
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <Doughnut_UserCity_AdminDashboard />
                </div>
              </div>

              {/* New Users per month */}
              <div className="h-[400px] w-full px-6 py-5 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-start">
                <div className="heading font-semibold text-2xl text-black mb-2">
                  New Users per month
                </div>
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  <LineChart_UserNew_AdminDashboard />
                </div>
              </div>

            </div>

          </div>

        )}

      </div>

    </div>

  );
};

export default AdminDashboard;