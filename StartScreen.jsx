import React from "react";
import { motion as MOTION } from "framer-motion";

const benefits = [
  {
    title: "✨ Featured Vendor",
    features: [
      "Top placement in search results",
      "Priority in homepage listings",
      "Verified vendor badge",
    ],
    tagline: "Stand out from the competition",
  },
  {
    title: "📈 Extended Reach",
    features: [
      "Access 10,000+ event planners",
      "Get direct inquiries from clients",
      "Promote seasonal offers easily",
    ],
    tagline: "Grow your audience and bookings",
  },
  {
    title: "💳 Smart Dashboard",
    features: [
      "Track earnings in real time",
      "Manage bookings & calendar",
      "One-click invoice downloads",
    ],
    tagline: "Business tools that just work",
  },
  {
    title: "🌐 Online Boost",
    features: [
      "SEO-optimized vendor profile",
      "Ratings & reviews from clients",
      "Social media sharing options",
    ],
    tagline: "Your online reputation, upgraded",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
  hover: {
    scale: 1.06,
    boxShadow: "0 12px 24px rgba(255, 204, 77, 0.4)",
    transition: { duration: 0.3 },
  },
};

const buttonVariants = {
  initial: { scale: 1 },
  pulse: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  hover: { scale: 1.1 },
  tap: { scale: 0.95 },
};

export default function StartScreen({ onNext }) {
  return (
    <div className="min-h-screen bg-[#F7F4EF] flex flex-col items-center justify-center px-6 py-12 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-[#6B4226] mb-14">
        Why Register with Us?
      </h1>

      {/* Benefits Grid */}
      <MOTION.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {benefits.map((item, index) => (
          <MOTION.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            className="bg-white rounded-2xl p-6 flex flex-col justify-between text-[#6B4226] shadow-md hover:bg-yellow-50 transition-all duration-300"
          >
            <div>
              <h3 className="text-xl font-bold mb-4">{item.title}</h3>
              <ul className="text-sm text-left space-y-2 mb-6">
                {item.features.map((line, i) => (
                  <li key={i} className="pl-4 relative before:absolute before:left-0 before:top-1 before:content-['•'] before:text-yellow-500">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-xs italic text-yellow-600">{item.tagline}</p>
          </MOTION.div>
        ))}
      </MOTION.div>

      {/* Start Button */}
      <MOTION.button
        variants={buttonVariants}
        initial="initial"
        animate="pulse"
        whileHover="hover"
        whileTap="tap"
        onClick={onNext}
        className="mt-14 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold text-lg px-10 py-3 rounded-xl shadow-lg transition duration-300"
      >
        Start Registration
      </MOTION.button>
    </div>
  );
}
