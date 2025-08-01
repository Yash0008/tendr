import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HeroSection_LandingPage from "../components/HeroSection_LandingPage";
import LandingPage2 from "../assets/LandingPage2.jpg";
import NotSure from "../assets/LandingPageNotSure.jpg";
import VendorNetwork from "../assets/LandingPageVendorNetwork.jpg";
import EastIcon from "@mui/icons-material/East";
import BadgeIcon from "@mui/icons-material/Badge";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import VerifiedIcon from "@mui/icons-material/Verified";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const LandingPageNew = () => {
  const navigate = useNavigate();
  const [activeQuestion, setActiveQuestion] = useState(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".questions-answers-main")) {
        setActiveQuestion(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const recommended_arr = [
    {
      src: "/src/assets/LandingPageCatering.jpg",
      label: "Catering",
    },
    {
      src: "/src/assets/LandingPageDecorator.jpg",
      label: "Decoration",
    },
    {
      src: "/src/assets/LandingPageEntertainment.jpg",
      label: "Entertainment",
    },
    {
      src: "/src/assets/LandingPagePhotographer.jpg",
      label: "Photography",
    },
  ];

  const ques_ans = [
    {
      key: 1,
      question: "How do I book a vendor?",
      answer:
        "Simply search for vendors based on your requirements, compare their profiles and prices, and book directly through our platform.",
    },
    {
      key: 2,
      question: "Are all vendors verified?",
      answer:
        "Yes, all vendors on our platform are thoroughly verified and rated by real customers to ensure quality service.",
    },
    {
      key: 3,
      question: "What if I'm not satisfied with the service?",
      answer:
        "We have a comprehensive refund policy and customer support team to ensure your satisfaction with every booking.",
    },
    {
      key: 4,
      question: "Can I customize my event requirements?",
      answer:
        "Absolutely! You can specify your exact requirements and vendors will provide customized quotes for your event.",
    },
  ];

  return (
    <>
      <div className="h-fit relative">
        {/* HERO SECTION PART */}
        <HeroSection_LandingPage />

        {/* SLOGAN BANNER */}
        <div
          onClick={() => navigate("/plan-event/form")}
          className="slogan_banner group my-24 mx-4 md:mx-16 h-[300px] md:h-[422px] rounded-[40px] md:rounded-[80px] text-center bg-center bg-cover flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-500"
          style={{
            backgroundImage: `url(${LandingPage2})`,
            backgroundSize: "cover",
          }}
        >
          <div
            className="text-white font-bold text-2xl sm:text-4xl md:text-6xl lg:text-[120px] transition-transform group-hover:-translate-y-2 group-hover:scale-110"
            style={{ WebkitTextStroke: "1px #CCAB4A" }}
          >
            "We Curate You Celebrate"
          </div>
        </div>

        {/* RECOMMENDED VENDORS */}
        <div className="recommendedvendors my-24">
          <div className="heading mx-16 my-12 text-5xl font-bold underline text-[#CCAB4A]">
            RECOMMENDED VENDORS
          </div>
          <div className="content_box px-4 md:px-16 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-10">
            {recommended_arr.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate("/listings", { 
                  state: { 
                    eventType: item.label.toLowerCase(),
                    serviceType: item.label.toLowerCase()
                  } 
                })}
                className="relative rounded-3xl overflow-hidden cursor-pointer hover:scale-105 transition duration-500"
              >
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-[250px] md:h-[400px] object-cover"
                />
                <div className="label_btn absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-[#D48060] hover:bg-[#D48060] hover:text-white font-bold text-sm sm:text-lg rounded-2xl px-4 py-2 flex items-center transition">
                  <span>{item.label}</span>
                  <span className="ml-2 w-[30px] h-[30px] bg-[#D48060] group-hover:bg-white text-white group-hover:text-[#D48060] flex items-center justify-center rounded-xl transition">
                    <EastIcon fontSize="small" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHY YOU WILL LOVE US */}
        <div className="why_love_us mx-4 md:mx-16 my-24 bg-[#FFD3C3] rounded-[40px] md:rounded-[80px] py-12 px-6 flex flex-col items-center gap-10">
          <div className="text-4xl sm:text-5xl md:text-[85px] font-extrabold text-[#D48060] text-center">
            Why you'll love us!
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            <div className="verified group flex flex-col items-center h-[170px] justify-evenly">
              <BadgeIcon
                className="text-[#D48060]"
                sx={{ fontSize: 60 }}
              />
              <span className="text-xl font-bold text-[#D48060]">
                Verified Vendors
              </span>
            </div>
            <div className="secure group flex flex-col items-center h-[170px] justify-evenly">
              <CreditScoreIcon
                className="text-[#D48060]"
                sx={{ fontSize: 60 }}
              />
              <span className="text-xl font-bold text-[#D48060]">
                Secure Payment
              </span>
            </div>
            <div className="quality group flex flex-col items-center h-[170px] justify-evenly">
              <VerifiedIcon
                className="text-[#D48060]"
                sx={{ fontSize: 60 }}
              />
              <span className="text-xl font-bold text-[#D48060]">
                Quality Assurance
              </span>
            </div>
            <div className="assitance group flex flex-col items-center h-[170px] justify-evenly">
              <SupervisedUserCircleIcon
                className="text-[#D48060]"
                sx={{ fontSize: 60 }}
              />
              <span className="text-xl font-bold text-[#D48060]">
                Event Planning Assistance
              </span>
            </div>
            <div className="discounts group flex flex-col items-center h-[170px] justify-evenly">
              <LocalOfferIcon
                className="text-[#D48060]"
                sx={{ fontSize: 60 }}
              />
              <span className="text-xl font-bold text-[#D48060]">
                Seasonal Discounts
              </span>
            </div>
          </div>
        </div>

        {/* NOT SURE BOX */}
        <div className="not_sure flex flex-col lg:flex-row items-center justify-center gap-10 mx-4 md:mx-16 my-24">
          <div
            className="left w-full lg:w-[50%] h-[300px] md:h-[520px] rounded-[30px] bg-[#FFD3C3] bg-cover transition-transform duration-500 ease-in-out hover:-translate-y-3"
            style={{ backgroundImage: `url(${NotSure})` }}
          ></div>
          <div className="right w-full lg:w-[50%] h-[300px] md:h-[520px] rounded-[30px] bg-[#FFD3C3] flex flex-col justify-center text-center py-8 px-4 gap-6 transition-transform duration-500 ease-in-out hover:-translate-y-3">
            <span className="text-2xl md:text-4xl font-extrabold text-[#D48060]">
              Not Sure Where to begin?
            </span>
            <span className="text-md md:text-2xl font-bold text-[#D48060]">
              Don't worry — we've got you. <br /> Our dedicated company
              representative will be with you from start to finish — helping you
              plan, coordinating with vendors and making sure your entire event
              goes off without a hitch.
            </span>
            <button
              onClick={() => navigate("/plan-event/form")}
              className="bg-[#D48060] text-white hover:bg-[#CCAB4A] rounded-2xl px-8 py-3 font-bold text-lg transition-colors duration-300 hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* JOIN VENDOR NETWORK BOX */}
        <div className="vendornetwork flex flex-col lg:flex-row items-center justify-center gap-10 mx-4 md:mx-16 my-24">
          {/* LEFT TEXT SECTION */}
          <div className="left h-[400px] md:h-[620px] w-full lg:w-[50%] rounded-[30px] bg-[#FFD3C3] p-6 md:p-10 flex flex-col justify-start transition-transform duration-500 ease-in-out hover:-translate-y-3">
            {/* Heading */}
            <span className="text-4xl md:text-6xl font-extrabold text-[#D48060] text-center lg:text-left leading-snug">
              Grow Your Event Business
            </span>

            {/* Description */}
            <div className="text-lg md:text-2xl font-bold text-[#D48060] mt-6 text-center lg:text-left leading-relaxed">
              Expand your reach and attract more clients by showcasing your
              event services on our platform. Get discovered, receive bookings,
              and grow your business—all in one convenient place.
            </div>

            {/* Sub-heading */}
            <span className="text-2xl md:text-4xl font-extrabold text-[#D48060] mt-8 text-center lg:text-left">
              Join us Today!
            </span>

            {/* Button */}
            <div className="btn flex justify-center lg:justify-start mt-6">
              <button
                type="button"
                onClick={() => navigate("/vendor/register")}
                className="group cursor-pointer bg-white hover:bg-[#D48060] hover:text-white rounded-2xl pl-4 pr-2 flex items-center justify-between text-[#D48060] font-bold w-[800px] h-[45px] transform transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 active:scale-95"
              >
                <span className="pb-[2px] text-lg">BECOME A PARTNER</span>
                <span className="group-hover:bg-white arrowButton w-[30px] h-[30px] bg-[#D48060] rounded-xl flex items-center justify-center transition duration-300">
                  <EastIcon
                    className="text-white group-hover:text-[#D48060] transition duration-300"
                    fontSize="medium"
                  />
                </span>
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE SECTION */}
          <div
            className="right cursor-pointer h-[400px] md:h-[620px] w-full lg:w-[520px] rounded-[40px] bg-[#FFD3C3] bg-cover bg-center my-2 transition-transform duration-500 ease-in-out hover:-translate-y-3"
            style={{
              backgroundImage: `url(${VendorNetwork})`,
            }}
          ></div>
        </div>

        {/* FAQ QUESTIONS AND ANSWERS */}
        <div className="questions-answers my-24">
          <div className="heading mx-16 my-12 text-5xl font-bold underline text-[#CCAB4A]">
            QUESTIONS? ANSWERED!
          </div>
          <div className="bigger_box flex flex-col items-center">
            <div className="questions-answers-main w-full md:w-[80%] px-4 md:px-0">
              {ques_ans.map((item) => (
                <div key={item.key} className="map_div pb-7">
                  {/* QUESTION */}
                  <div
                    className="flex flex-col justify-center cursor-pointer"
                    onClick={() =>
                      setActiveQuestion((prev) =>
                        prev === item.key ? null : item.key
                      )
                    }
                  >
                    <div className="ques bg-[#FFD3C3] hover:bg-[#fbbfa7] transition-colors duration-300 h-[90px] rounded-[30px] flex items-center justify-between px-10">
                      <span className="ques text-2xl font-bold text-[#D48060]">
                        {item.question}
                      </span>
                      {activeQuestion !== item.key && (
                        <AddIcon
                          className="text-[#D48060] transition-transform duration-300"
                          sx={{ fontSize: 50 }}
                        />
                      )}
                      {activeQuestion === item.key && (
                        <ClearIcon
                          className="text-[#D48060] transition-transform duration-300 rotate-180"
                          sx={{ fontSize: 50 }}
                        />
                      )}
                    </div>
                  </div>
                  {/* ANSWER */}
                  <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      activeQuestion === item.key
                        ? "max-h-[500px] opacity-100 mt-[3px]"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="bg-[#FFD3C3] px-10 py-5 rounded-[30px]">
                      <span className="ques text-2xl font-bold text-[#D48060]">
                        {item.answer}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER PART */}
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
              <div
                onClick={() => navigate("/plan-event/form")}
                className="group cursor-pointer transition-colors duration-300 hover:text-white"
              >
                Support
              </div>
              <div
                onClick={() => navigate("/plan-event/form")}
                className="group cursor-pointer transition-colors duration-300 hover:text-white"
              >
                Help Center
              </div>
              <div
                onClick={() => navigate("/vendor/register")}
                className="group cursor-pointer transition-colors duration-300 hover:text-white"
              >
                Vendor Support
              </div>
              <div
                onClick={() => navigate("/vendor/register")}
                className="group cursor-pointer transition-colors duration-300 hover:text-white"
              >
                Vendor
              </div>
              <div
                onClick={() => navigate("/plan-event/form")}
                className="group cursor-pointer transition-colors duration-300 hover:text-white"
              >
                Get in touch
              </div>
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
      </div>
    </>
  );
};

export default LandingPageNew;
