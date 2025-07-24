import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import signupBgImage from "../assets/signup-bg-image.png";
import logo from "../assets/logo2.png";
import { FiCheck, FiStar, FiUsers, FiCalendar, FiDollarSign, FiShield, FiAward } from "react-icons/fi";

export default function CorporateSignup() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedPlan = location.state?.plan;

  const [formData, setFormData] = useState({
    companyName: "",
    location: "",
    personName: "",
    designation: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    teamSize: "",
    industry: "",
    annualEvents: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (!formData.personName.trim()) {
      newErrors.personName = "Your name is required";
    }

    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }

    if (!formData.teamSize) {
      newErrors.teamSize = "Team size is required";
    }

    if (!formData.industry) {
      newErrors.industry = "Industry is required";
    }

    if (!formData.annualEvents) {
      newErrors.annualEvents = "Number of annual events is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    const coupon = selectedPlan?.isPaid
      ? `TENDR-CORP-${Math.floor(1000 + Math.random() * 9000)}`
      : null;
      
    localStorage.setItem(
      "corporatePlan",
        JSON.stringify({ 
          ...formData, 
          plan: selectedPlan?.title, 
          planId: selectedPlan?.id,
          coupon,
          signupDate: new Date().toISOString()
        })
    );
      
      navigate("/otp", { state: { plan: selectedPlan, formData } });
    } catch (error) {
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateSavings = () => {
    if (!selectedPlan) return 0;
    
    const eventsPerYear = parseInt(formData.annualEvents) || 12;
    const traditionalCost = eventsPerYear * 5000;
    let tendrCost = 0;
    
    if (selectedPlan.id === "basic") {
      tendrCost = eventsPerYear * 750;
    } else if (selectedPlan.id === "pro") {
      tendrCost = 12000 + (eventsPerYear * 500);
    } else if (selectedPlan.id === "elite") {
      tendrCost = 18000;
    }
    
    return traditionalCost - tendrCost;
  };

  return (
    <div
      className="w-screen min-h-screen flex flex-col bg-cover bg-center relative"
      style={{ backgroundImage: `url(${signupBgImage})` }}
    >
      <div className="absolute inset-0 bg-[#CCAB4A] opacity-30 z-0" />

      <div className="flex-grow flex items-center justify-center px-2 sm:px-4 pt-4 relative z-10">
        <div className="bg-[#F7F4EF] py-4 sm:py-6 px-3 sm:px-6 rounded-2xl shadow-lg w-full max-w-4xl mx-2 sm:mx-4">
          <div className="flex justify-center mb-3 sm:mb-4 sm:mb-6">
            <img
              src={logo}
              alt="tendr logo"
              className="w-32 sm:w-48 md:w-[300px] lg:w-[326px] h-auto"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-center mb-3 sm:mb-4 sm:mb-6 text-gray-800">
            Corporate Signup - {selectedPlan?.title || "Selected Plan"}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {/* Plan Details */}
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md order-2 lg:order-1">
              <h3 className="text-lg sm:text-xl font-bold text-[#CCAB4A] mb-3 sm:mb-4">Selected Plan Details</h3>
              
              {selectedPlan && (
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xl sm:text-2xl font-bold text-[#CCAB4A]">{selectedPlan.price}</span>
                    {selectedPlan.originalPrice && (
                      <span className="text-base sm:text-lg text-gray-500 line-through">{selectedPlan.originalPrice}</span>
                    )}
                  </div>
                  
                  <p className="text-xs sm:text-sm text-gray-600">{selectedPlan.subtext}</p>
                  
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 mb-2">Key Features:</h4>
                    {selectedPlan.highlights.slice(0, 5).map((highlight, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <FiCheck className="w-3 h-3 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm text-gray-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-100 to-pink-100 p-3 sm:p-4 rounded-xl">
                    <h4 className="font-semibold text-gray-800 mb-2">Annual Savings:</h4>
                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                      ₹{calculateSavings().toLocaleString()}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">vs traditional agencies</p>
                  </div>
                </div>
              )}
            </div>

            {/* Signup Form */}
            <div className="order-1 lg:order-2">
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.companyName ? 'border-red-500 focus:ring-red-500' : 'border-yellow-400 focus:ring-yellow-500'
                      }`}
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.location ? 'border-red-500 focus:ring-red-500' : 'border-yellow-400 focus:ring-yellow-500'
                      }`}
                    />
                    {errors.location && (
                      <p className="text-red-500 text-xs mt-1">{errors.location}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="personName"
                      value={formData.personName}
                      onChange={handleChange}
                      className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.personName ? 'border-red-500 focus:ring-red-500' : 'border-yellow-400 focus:ring-yellow-500'
                      }`}
                    />
                    {errors.personName && (
                      <p className="text-red-500 text-xs mt-1">{errors.personName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Designation *
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.designation ? 'border-red-500 focus:ring-red-500' : 'border-yellow-400 focus:ring-yellow-500'
                      }`}
                    />
                    {errors.designation && (
                      <p className="text-red-500 text-xs mt-1">{errors.designation}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.email ? 'border-red-500 focus:ring-red-500' : 'border-yellow-400 focus:ring-yellow-500'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-yellow-400 focus:ring-yellow-500'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Team Size *
                    </label>
                    <select
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.teamSize ? 'border-red-500 focus:ring-red-500' : 'border-yellow-400 focus:ring-yellow-500'
                      }`}
                    >
                      <option value="">Select Team Size</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-100">51-100 employees</option>
                      <option value="101-500">101-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </select>
                    {errors.teamSize && (
                      <p className="text-red-500 text-xs mt-1">{errors.teamSize}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Industry *
                    </label>
                    <select
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.industry ? 'border-red-500 focus:ring-red-500' : 'border-yellow-400 focus:ring-yellow-500'
                      }`}
                    >
                      <option value="">Select Industry</option>
                      <option value="technology">Technology</option>
                      <option value="finance">Finance</option>
                      <option value="healthcare">Healthcare</option>
                      <option value="education">Education</option>
                      <option value="retail">Retail</option>
                      <option value="manufacturing">Manufacturing</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.industry && (
                      <p className="text-red-500 text-xs mt-1">{errors.industry}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                      Annual Events *
                    </label>
                    <select
                      name="annualEvents"
                      value={formData.annualEvents}
                      onChange={handleChange}
                      className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                        errors.annualEvents ? 'border-red-500 focus:ring-red-500' : 'border-yellow-400 focus:ring-yellow-500'
                      }`}
                    >
                      <option value="">Select Frequency</option>
                      <option value="4">4 events/year (Quarterly)</option>
                      <option value="6">6 events/year (Bi-monthly)</option>
                      <option value="12">12 events/year (Monthly)</option>
                      <option value="24">24+ events/year (Bi-weekly)</option>
                    </select>
                    {errors.annualEvents && (
                      <p className="text-red-500 text-xs mt-1">{errors.annualEvents}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.password ? 'border-red-500 focus:ring-red-500' : 'border-yellow-400 focus:ring-yellow-500'
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Confirm Password *
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                  onChange={handleChange}
                    className={`w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border rounded-xl focus:outline-none focus:ring-2 ${
                      errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-yellow-400 focus:ring-yellow-500'
                    }`}
                />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
              </div>

                <div className="flex justify-center pt-3 sm:pt-4">
              <button
                type="submit"
                    disabled={isSubmitting}
                    className={`text-white text-xs sm:text-sm font-semibold rounded-xl px-6 sm:px-8 py-2 sm:py-3 transition-all ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-[#CCAB4A] hover:bg-[#b7973f] hover:scale-105'
                    }`}
              >
                    {isSubmitting ? 'Processing...' : 'Proceed to OTP'}
              </button>
            </div>
          </form>
            </div>
          </div>
        </div>
      </div>

      <footer className="w-full text-black text-xs sm:text-sm py-2 sm:py-3 px-2 sm:px-4 text-center bg-opacity-60 mt-4 sm:mt-8">
        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4 font-semibold">
          <span>tendr ©</span>
          <span>|</span>
          <a href="#" className="hover:underline cursor-pointer">Support</a>
          <span>|</span>
          <a href="#" className="hover:underline cursor-pointer">Help Center</a>
          <span>|</span>
          <a href="#" className="hover:underline cursor-pointer">Vendor Support</a>
          <span>|</span>
          <a href="#" className="hover:underline cursor-pointer">Get in touch</a>
        </div>
      </footer>
    </div>
  );
}