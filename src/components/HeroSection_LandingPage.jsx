import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import logo from "../assets/logo2.png";
import LandingPage1 from "../assets/LandingPage1.jpg";

import EastIcon from '@mui/icons-material/East';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

const words = [
  "Event",
  "Pre-Wedding",
  "Anniversary",
  "Birthday",
  "Office Party",
  "Festival",
  "Get-together",
];

const HeroSection_LandingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const isAuthenticated = !!user && !!token;
  const [index, setIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userInitial = isAuthenticated && user.name ? user.name.charAt(0).toUpperCase() : '';

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 400);
    }, 2300);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".user-badge") && !e.target.closest(".user-modal")) {
        setIsModalOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate('/');
      setIsModalOpen(false);
    });
  };

  const handleDashboard = () => {
    navigate('/dashboard');
    setIsModalOpen(false);
  };

  return (
    <div className="Hero_section relative min-h-screen w-full bg-cover bg-center rounded-b-[40px] sm:rounded-b-[60px] md:rounded-b-[80px]" style={{ backgroundImage: `url(${LandingPage1})` }}>
      {/* TOP PART */}
      <div className="top flex justify-between items-center px-4 py-4 sm:px-6 md:px-10">
        <img
          src={logo}
          alt="tendr logo"
          className='h-12 sm:h-14 md:h-16 transition duration-300 ease-in-out transform hover:-translate-y-1 cursor-pointer'
          onClick={() => navigate("/")}
        />

        {isAuthenticated ? (
          <div className="user-badge relative flex items-center">
            <div
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="w-10 h-10 bg-[#CCAB4A] text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md cursor-pointer transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
            >
              {userInitial}
            </div>
            {isModalOpen && (
              <div className="user-modal absolute top-12 right-0 w-48 bg-[#F7F4EF] rounded-xl shadow-lg py-2 z-50">
                <div
                  onClick={handleDashboard}
                  className="flex items-center gap-2 px-4 py-2 text-[#D48060] font-semibold hover:bg-[#FFD3C3] cursor-pointer"
                >
                  <DashboardIcon fontSize="small" />
                  <span>Dashboard</span>
                </div>
                <div
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 text-[#D48060] font-semibold hover:bg-[#FFD3C3] cursor-pointer"
                >
                  <LogoutIcon fontSize="small" />
                  <span>Logout</span>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="btns flex gap-3">
            <button
              onClick={() => navigate("/signup")}
              className="bg-transparent border-2 border-white text-white font-bold rounded-xl px-4 py-1 hover:bg-white hover:text-black transition"
            >
              Sign Up
            </button>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-black font-bold rounded-xl px-4 py-1 hover:bg-[#CCAB4A] hover:text-white transition"
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* BANNER TEXT */}
      <div className="banner_text px-6 md:px-32 py-12 text-white text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight" style={{ WebkitTextStroke: "1px #CCAB4A" }}>
        <span>Everything You Need to Plan the Perfect </span>
        <span
          className={`inline-block transition-all duration-1000 ease-in-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          {words[index]}
        </span>
      </div>
{/* 

             {/* BOOKING */}
       <div className="make_a_group flex flex-col items-center gap-4 px-4 pb-10">
         <p className='text-white text-lg md:text-xl font-semibold text-center'>
           Require more than one service? <span className='text-[#f5b041]'>Click the button below</span>
         </p>
         <button
           onClick={() => navigate("/plan-event/form")}
           className="bg-white text-[#f7dc6f] hover:bg-[#f5b041] hover:text-white rounded-2xl px-8 py-3 flex items-center gap-4 font-bold transition transform hover:scale-105 active:scale-95 text-lg"
         >
           BOOKING
          <span className="w-8 h-8 bg-[#CCAB4A] hover:bg-white text-white hover:text-[#CCAB4A] rounded-xl flex items-center justify-center">
            <EastIcon fontSize="medium" />
          </span>
        </button>
      </div>
    </div>
  );
};

export default HeroSection_LandingPage;
