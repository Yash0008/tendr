import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import EastIcon from "@mui/icons-material/East";

import Dashboards_Nav from "../components/Dashboards_Nav";

import { Doughnut_EventsBooked_VendorDashboard } from "../components/Charts_Dashboards";

import { Notebook, ChartSpline, Star, IndianRupee, HandCoins, ChartColumnDecreasing, UserRound, BriefcaseBusiness, ArrowLeft, CalendarCheck2, CalendarClock, CalendarFold, CalendarX2, Camera, Music, SprayCan, HandPlatter, Store, Handshake, MonitorCheck, MonitorX, UserPlus } from 'lucide-react';

const formatMoney1 = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
};

const stats_performance = [
    {
        label: 'Total Bookings',
        value: 45,
        icon: <CalendarFold size={32} />,
        key: 'total',
    },
    {
        label: 'Pending Bookings',
        value: 5,
        icon: <CalendarClock size={32} />,
        key: 'pending',
    },
    {
        label: 'Completed Bookings',
        value: 34,
        icon: <CalendarCheck2 size={32} />,
        key: 'completion',
    },
    {
        label: 'Cancelled Bookings',
        value: 6,
        icon: <CalendarX2 size={32} />,
        key: 'cancelled',
    },
    {
        label: 'Average Rating',
        value: 4.5,
        icon: <Star size={32} />,
        key: 'rating',
    },
];

const stats_revenue = [
    {
        label: 'Total Revenue',
        value: 320000,
        icon: <IndianRupee size={32} />,
        key: 'total-revenue',
    },
    {
        label: 'Net Income',
        value: 210000,
        icon: <HandCoins size={32} />,
        key: 'net-income',
    }
];

const sidebar_arr = [
    {
        label: 'Performance',
        icon: <ChartSpline size={22} />,
        key: 'Performance',
    },
    {
        label: 'Revenue',
        icon: <IndianRupee size={22} />,
        key: 'Revenue',
    },
    {
        label: 'Engagement',
        icon: <Notebook size={22} />,
        key: 'Engagement',
    },
    {
        label: 'Customer Info',
        icon: <UserRound size={22} />,
        key: 'Customer Info',
    }
];

const stats_engagement = [
    {
        label: 'Total Views',
        value: 1200,
        icon: <UserRound size={32} />,
        key: 'views',
    },
    {
        label: 'Conversion Rate',
        value: '25%',
        icon: <ChartColumnDecreasing size={32} />,
        key: 'conversion-rate',
    }
];

const guestCountSegments = [
    { segment: "Small (< 100 guests)", count: 8 },
    { segment: "Medium (100–300 guests)", count: 10 },
    { segment: "Large (300+ guests)", count: 6 },
];

const bookingValueSegments = [
    { segment: "Low (< ₹30k)", count: 5 },
    { segment: "Medium (₹30k–80k)", count: 12 },
    { segment: "High (₹80k+)", count: 7 },
];





const VendorDashboard = () => {
    const navigate = useNavigate();
    const [activeDropdown, setactiveDropdown] = useState("performance")


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

                {activeDropdown === "performance" && (
                    <div className="right-dashboard w-[70%] xs:w-[85%] bg-[#FDFAF0] border-l-2 border-[#CCAB4A] px-10">

                        {/* Heading */}
                        <div className="heading font-semibold text-[32px] xs:text-4xl sm:text-5xl my-4">
                            Performance
                        </div>

                        {/* Info Cards Upper */}
                        <div className="py-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

                                {stats_performance.map((item) => (
                                    <div
                                        key={item.key}
                                        className={`h-[180px] w-full px-6 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-between py-5 ${item.label === 'Average booking value' ? 'col-span-2' : ''
                                            }`}
                                    >
                                        {/* Icon */}
                                        <div className="icon">{item.icon}</div>

                                        {/* Bottom Content */}
                                        <div className="content flex flex-col items-center">
                                            <div className="heading font-semibold text-sm xs:text-lg text-gray-500 leading-none text-center">
                                                {item.label}
                                            </div>
                                            <div className="metric text-[60px] sm:text-[75px] font-bold text-[#CCAB4A] leading-[70px]">
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

                {activeDropdown === "revenue" && (

                    <div className="right-booking w-[70%] xs:w-[85%] bg-[#FDFAF0] border-l-2 border-[#CCAB4A] px-10">

                        {/* Heading */}
                        <div className="heading font-semibold text-[32px] xs:text-4xl sm:text-5xl my-4">
                            Revenue
                        </div>

                        {/* Info Cards Upper */}
                        <div className="py-4">
                            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">

                                {stats_revenue.map((item, index) => (
                                    <div
                                        key={item.key}
                                        className={`h-[180px] w-full px-6 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-between py-5 ${index < 2 ? 'col-span-2' : ''}`}
                                    >
                                        {/* Icon */}
                                        <div className="icon">{item.icon}</div>

                                        {/* Bottom Content */}
                                        <div className="content flex flex-col items-center">
                                            <div className="heading font-semibold text-sm xs:text-lg text-gray-500 leading-none text-center">
                                                {item.label}
                                            </div>
                                            <div className="metric text-xl xs:text-[50px] sm:text-[75px] font-bold text-[#CCAB4A] leading-[70px]">
                                                {item.label === "Number of payments" ? item.value.toLocaleString('en-IN') : formatMoney1(item.value)}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>

                )}

                {activeDropdown === "engagement" && (

                    <div className="right-booking w-[70%] xs:w-[85%] bg-[#FDFAF0] border-l-2 border-[#CCAB4A] px-10">

                        {/* Heading */}
                        <div className="heading font-semibold text-[32px] xs:text-4xl sm:text-5xl my-4">
                            Engagement
                        </div>

                        {/* Info Cards Upper */}
                        <div className="py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

                                {stats_engagement.map((item, index) => (
                                    <div
                                        key={item.key}
                                        className="h-[180px] w-full px-6 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-between py-5"
                                    >
                                        {/* Icon */}
                                        <div className="icon">{item.icon}</div>

                                        {/* Bottom Content */}
                                        <div className="content flex flex-col items-center">
                                            <div className="heading font-semibold text-sm xs:text-lg text-gray-500 leading-none text-center">
                                                {item.label}
                                            </div>
                                            <div className="metric text-3xl xs:text-[50px] sm:text-[75px] font-bold text-[#CCAB4A] leading-[70px]">
                                                {item.value.toLocaleString('en-IN')}
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>

                    </div>

                )}

                {activeDropdown === "customer info" && (

                    <div className="right-booking w-[70%] xs:w-[85%] bg-[#FDFAF0] border-l-2 border-[#CCAB4A] px-10">

                        {/* Heading */}
                        <div className="heading font-semibold text-[32px] xs:text-4xl sm:text-5xl my-4">
                            Customer Info
                        </div>

                        {/* Info Cards */}
                        <div className="py-4">

                            <div className="grid grid-cols-1 2xl:grid-cols-2 gap-6 mb-10">

                                {/* Vendors by City */}
                                <div className="h-[400px] w-full px-6 py-5 rounded-[20px] bg-white border-2 border-[#CCAB4A] flex flex-col justify-start">
                                    <div className="heading font-semibold text-2xl text-black mb-2">
                                        Booking by Events
                                    </div>
                                    <div className="flex-1 flex items-center justify-center text-gray-400">
                                        <Doughnut_EventsBooked_VendorDashboard />
                                    </div>
                                </div>

                                {/* Two side-by-side custom columns */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-auto">

                                    {/* Guest Count Segments */}
                                    <div className="flex-1 px-4 sm:px-6 py-4 sm:py-5 bg-white border-2 border-[#CCAB4A] rounded-[16px] sm:rounded-[20px] flex flex-col justify-start h-auto sm:h-[400px]">

                                        {/* Heading */}
                                        <div className="mb-4">
                                            <div className="text-2xl font-semibold text-black">Guest Count</div>
                                            <div className="text-base text-gray-400 leading-4">Based on event size</div>
                                        </div>

                                        {/* Segment List */}
                                        <div className="flex-1 flex flex-col justify-evenly space-y-4">
                                            {guestCountSegments.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-start group cursor-pointer"
                                                >
                                                    {/* Left: label */}
                                                    <div className="flex items-start gap-2 w-[210px]">
                                                        <div className="text-xl font-semibold text-black leading-none">
                                                            {item.segment}
                                                        </div>
                                                    </div>

                                                    {/* Right: Count */}
                                                    <div className="text-[#CCAB4A] font-bold text-2xl leading-none">
                                                        {item.count}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                    {/* Booking Value Segments */}
                                    <div className="flex-1 px-4 sm:px-6 py-4 sm:py-5 bg-white border-2 border-[#CCAB4A] rounded-[16px] sm:rounded-[20px] flex flex-col justify-start h-auto sm:h-[400px]">

                                        {/* Heading */}
                                        <div className="mb-4">
                                            <div className="text-2xl font-semibold text-black">Booking Value</div>
                                            <div className="text-base text-gray-400 leading-4">Based on value tiers</div>
                                        </div>

                                        {/* Segment List */}
                                        <div className="flex-1 flex flex-col justify-evenly space-y-4">
                                            {bookingValueSegments.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-start group cursor-pointer"
                                                >
                                                    {/* Left: label */}
                                                    <div className="flex items-start gap-2 w-[210px]">
                                                        <div className="text-xl font-semibold text-black leading-none">
                                                            {item.segment}
                                                        </div>
                                                    </div>

                                                    {/* Right: Count */}
                                                    <div className="text-[#CCAB4A] font-bold text-2xl leading-none">
                                                        {item.count}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                    </div>

                                </div>


                            </div>

                        </div>

                    </div>

                )}

            </div>

        </div>

    )
}

export default VendorDashboard


// w-[70%] xs:w-[85%]
// w-[30%] xs:w-[25%]
// w-[80px] sm:w-[100px] md:w-[140px] lg:w-[180px] xl:w-[250px]
// block lg:hidden
// hidden lg:block
// pl-2 sm:pl-4

// heading font-semibold text-[32px] xs:text-4xl sm:text-5xl my-4




// heading font-semibold text-sm xs:text-lg text-gray-500 leading-none text-center
// grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6

// metric text-[60px] sm:text-[75px] font-bold text-[#CCAB4A] leading-[70px]
// metric text-xl xs:text-[50px] sm:text-[75px] font-bold text-[#CCAB4A] leading-[70px]
