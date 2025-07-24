import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServiceSpecificFields from "./ServiceSpecificFields";
import { signupVendorOtp, verifyVendorOtp, completeVendorSignup } from "../apis";

export default function VendorRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phoneNumber: "",
    secondaryPhoneNumber: "",
    otp: "",
    name: "",
    location: "",
    address: "",
    state: "",
    gstNumber: "",
    teamSize: "",
    experience: "",
    eventsCompleted: "",
    concurrentEvents: "",
    clientReferences: "",
    governmentId: "",
    accHolderName: "",
    bankName: "",
    accNumber: "",
    ifscCode: "",
    upiId: "",
    aadhaarNumber: "",
    password: "",
    portfolioFiles: [],
    service: "",
    customService: "",
    serviceFilters: {},
  });

  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [canResend, setCanResend] = useState(true);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [supportedCities, setSupportedCities] = useState([]);
  const [citiesLoading, setCitiesLoading] = useState(false);
  const [citiesError, setCitiesError] = useState("");
  const otpInputRefs = useRef([]);

  useEffect(() => {
    const fetchCities = async () => {
      setCitiesLoading(true);
      setCitiesError("");
      try {
        console.log("Fetching supported cities...");
        const response = await fetch("http://localhost:8080/cities", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log("Cities API response status:", response.status);
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
          const text = await response.text();
          throw new Error(`Expected JSON, but received: ${text.substring(0, 100)}...`);
        }

        const result = await response.json();
        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch supported cities");
        }
        console.log("Supported cities fetched:", result.data);
        setSupportedCities(result.data || []);
      } catch (error) {
        console.error("Error fetching supported cities:", error);
        setCitiesError(error.message || "Failed to fetch supported cities");
      } finally {
        setCitiesLoading(false);
        console.log("Cities loading complete, citiesLoading:", false);
      }
    };

    fetchCities();
  }, []);

  const capitalizeService = (service) => {
    if (service === "others") return service;
    else if (service === "dj") return "DJ";
    else if (service === "caterer") return "Caterer";
    else if (service === "decorator") return "Decorator";
    else if (service === "photographer") return "Photographer";
    // return service.charAt(0).toUpperCase() + service.slice(1).toLowerCase();
  };

  const lowercaseService = (service) => {
    if (service === "others") return service;
    return service.toLowerCase();
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "portfolioFiles") {
      setFormData((prev) => ({ ...prev, [name]: Array.from(files) }));
    } else if (name === "service") {
      setFormData((prev) => ({
        ...prev,
        [name]: capitalizeService(value),
        customService: value === "others" ? prev.customService : "",
        serviceFilters: [],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleServiceFiltersChange = (filters) => {
    setFormData((prev) => ({
      ...prev,
      serviceFilters: filters,
      portfolioFiles: filters.photos || prev.portfolioFiles,
    }));
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newOtpDigits = [...otpDigits];
    newOtpDigits[index] = value;
    setOtpDigits(newOtpDigits);
    const newOtp = newOtpDigits.join("");
    setFormData((prev) => ({ ...prev, otp: newOtp }));
    if (value && index < 3) {
      otpInputRefs.current[index + 1].focus();
    }
    if (!value && index > 0) {
      otpInputRefs.current[index - 1].focus();
    }
  };

  const handleOtpPaste = (e) => {
    const pastedData = e.clipboardData.getData("text").trim();
    if (/^\d{4}$/.test(pastedData)) {
      const newOtpDigits = pastedData.split("");
      setOtpDigits(newOtpDigits);
      setFormData((prev) => ({ ...prev, otp: pastedData }));
      otpInputRefs.current[3].focus();
    }
    e.preventDefault();
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.phoneNumber || !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Valid 10-digit phone number required";
    }
    return newErrors;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.otp || formData.otp.length !== 4 || !/^\d{4}$/.test(formData.otp)) {
      newErrors.otp = "Enter a valid 4-digit OTP";
    }
    return newErrors;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.address) newErrors.address = "Street address is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.location) newErrors.location = "Location is required";
    if (!supportedCities.includes(formData.location)) newErrors.location = "Location must be a supported city";
    if (!formData.service) newErrors.service = "Service type is required";
    if (!formData.gstNumber) newErrors.gstNumber = "GST number is required";
    if (!formData.teamSize) newErrors.teamSize = "Team size is required";
    if (formData.teamSize && (isNaN(formData.teamSize) || formData.teamSize < 1)) {
      newErrors.teamSize = "Team size must be a positive integer";
    }
    if (!formData.accHolderName) newErrors.accHolderName = "Account holder name required";
    if (!formData.bankName) newErrors.bankName = "Bank name is required";
    if (!formData.accNumber) newErrors.accNumber = "Account number is required";
    if (!formData.ifscCode) newErrors.ifscCode = "IFSC code is required";
    if (formData.secondaryPhoneNumber && !/^\d{10}$/.test(formData.secondaryPhoneNumber)) {
      newErrors.secondaryPhoneNumber = "Secondary phone number must be 10 digits if provided";
    }
    if (formData.experience && (isNaN(formData.experience) || formData.experience < 0)) {
      newErrors.experience = "Years of experience must be a non-negative integer";
    }
    if (formData.eventsCompleted && isNaN(formData.eventsCompleted)) {
      newErrors.eventsCompleted = "Total events must be a number";
    }
    if (formData.concurrentEvents && isNaN(formData.concurrentEvents)) {
      newErrors.concurrentEvents = "Concurrent events must be a number";
    }
    if (!formData.governmentId) newErrors.governmentId = "PAN number is required";
    if (!formData.aadhaarNumber || !/^\d{12}$/.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = "Aadhaar number must be 12 digits";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    console.log("Validation errors:", newErrors);
    return newErrors;
  };

  const handleStep1Submit = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep1();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError("");
    setErrors({});
    try {
      await signupVendorOtp(formData.phoneNumber);
      setStep(2);
    } catch (error) {
      try {
        const parsedErrors = JSON.parse(error.message);
        const apiErrors = {};
        parsedErrors.forEach((err) => {
          if (err.path) {
            apiErrors[err.path] = err.msg;
          }
        });
        setErrors((prev) => ({ ...prev, ...apiErrors }));
        if (!Object.keys(apiErrors).length) {
          setApiError(error.message || "Failed to send OTP");
        }
      } catch {
        setApiError(error.message || "Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setCanResend(false);
    setResendCooldown(30);
    setApiError("");
    setErrors({});
    try {
      await signupVendorOtp(formData.phoneNumber);
      alert("OTP resent successfully!");
    } catch (error) {
      try {
        const parsedErrors = JSON.parse(error.message);
        const apiErrors = {};
        parsedErrors.forEach((err) => {
          if (err.path) {
            apiErrors[err.path] = err.msg;
          }
        });
        setErrors((prev) => ({ ...prev, ...apiErrors }));
        if (!Object.keys(apiErrors).length) {
          setApiError(error.message || "Failed to resend OTP");
        }
      } catch {
        setApiError(error.message || "Failed to resend OTP");
      }
    }
  };

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown((prev) => prev - 1);
        if (resendCooldown === 1) setCanResend(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleStep2Submit = async (e) => {
    e.preventDefault();
    const validationErrors = validateStep2();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError("");
    setErrors({});
    try {
      await verifyVendorOtp({ phoneNumber: formData.phoneNumber, otp: formData.otp });
      setStep(3);
    } catch (error) {
      try {
        const parsedErrors = JSON.parse(error.message);
        const apiErrors = {};
        parsedErrors.forEach((err) => {
          if (err.path) {
            apiErrors[err.path] = err.msg;
          }
        });
        setErrors((prev) => ({ ...prev, ...apiErrors }));
        if (!Object.keys(apiErrors).length) {
          setApiError(error.message || "OTP verification failed");
        }
      } catch {
        setApiError(error.message || "OTP verification failed");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleStep3Submit = async (e) => {
    e.preventDefault();
    console.log("Step 3 form submitted, formData:", formData);
    const validationErrors = validateStep3();
    if (Object.keys(validationErrors).length > 0) {
      console.log("Validation failed, errors:", validationErrors);
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setApiError("");
    setErrors({});
    try {
      console.log("Calling completeVendorSignup with formData:", formData);
      const response = await completeVendorSignup(formData);
      console.log("Vendor signup successful, response:", response);
      alert("Vendor registered successfully!");
      navigate("/vendor/dashboard", { state: { vendor: response.vendor, token: response.token } });
    } catch (error) {
      console.error("Error during vendor signup:", error);
      try {
        const parsedErrors = JSON.parse(error.message);
        const apiErrors = {};
        parsedErrors.forEach((err) => {
          if (err.path === "address.street") apiErrors.address = err.msg;
          else if (err.path === "address.city" || err.path === "locations") apiErrors.location = err.msg;
          else if (err.path === "address.state") apiErrors.state = err.msg;
          else if (err.path === "yearsOfExperience") apiErrors.experience = err.msg;
          else if (err.path === "panNumber") apiErrors.governmentId = err.msg;
          else if (err.path === "serviceType") apiErrors.service = err.msg;
          else if (err.path) apiErrors[err.path] = err.msg;
        });
        setErrors((prev) => ({ ...prev, ...apiErrors }));
        if (!Object.keys(apiErrors).length) {
          setApiError(error.message || "An error occurred during registration");
        }
      } catch {
        setApiError(error.message || "An error occurred during registration");
      }
    } finally {
      setLoading(false);
      console.log("Submission complete, loading:", false);
    }
  };

  const inputClass =
    "border border-[#D48060] p-3 rounded-xl text-sm text-[#D48060] placeholder-[#D48060] focus:outline-none focus:ring-2 focus:ring-[#CCAB4A] bg-white transition-all duration-300";

  const otpInputClass =
    "w-12 h-12 border border-[#D48060] rounded-xl text-center text-[#D48060] text-xl font-semibold focus:outline-none focus:ring-2 focus:ring-[#CCAB4A] bg-white transition-all duration-300";

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl bg-[#FFD3C3] p-6 sm:p-8 rounded-[40px] shadow-lg space-y-8">
        <h2 className="text-3xl font-extrabold text-[#D48060] text-center">Register as a Vendor</h2>
        {apiError && <p className="text-red-500 text-center font-medium">{apiError}</p>}
        {citiesError && <p className="text-red-500 text-center font-medium">{citiesError}</p>}

        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-6">
            <div>
              <label className="block mb-2 text-[#D48060] font-semibold">Phone Number</label>
              <input
                name="phoneNumber"
                placeholder="Enter your 10-digit phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className={inputClass + " w-full"}
              />
              {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#CCAB4A] hover:bg-[#D48060] text-white font-semibold px-6 py-3 rounded-xl w-full transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-6">
            <div>
              <label className="block mb-2 text-[#D48060] font-semibold">Enter OTP</label>
              <div className="flex justify-center gap-4" onPaste={handleOtpPaste}>
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    className={otpInputClass}
                    autoFocus={index === 0}
                  />
                ))}
              </div>
              {errors.otp && <p className="text-red-500 text-center text-xs mt-2">{errors.otp}</p>}
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResend}
                className={`text-[#D48060] font-semibold hover:underline mt-2 ${
                  !canResend ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {canResend ? "Resend OTP" : `Resend OTP (${resendCooldown}s)`}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`bg-[#CCAB4A] hover:bg-[#D48060] text-white font-semibold px-6 py-3 rounded-xl w-full transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Verifying OTP..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={() => setStep(1)}
              className="text-[#D48060] font-semibold hover:underline mt-2"
            >
              Back
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleStep3Submit} className="space-y-6">
            {citiesLoading && <p className="text-[#D48060] text-center">Loading supported cities...</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { name: "name", placeholder: "Vendor Name *" },
                { name: "location", placeholder: "Select City *", type: "select", options: supportedCities },
                { name: "address", placeholder: "Street Address *" },
                { name: "state", placeholder: "State *" },
                { name: "gstNumber", placeholder: "GST Number *" },
                { name: "teamSize", placeholder: "Team Size *" },
                { name: "experience", placeholder: "Years of Service" },
                { name: "eventsCompleted", placeholder: "Total Events Completed" },
                { name: "concurrentEvents", placeholder: "Concurrent Events You Can Handle" },
                { name: "clientReferences", placeholder: "Past Client References" },
                { name: "governmentId", placeholder: "PAN Number *" },
                { name: "aadhaarNumber", placeholder: "Aadhaar Number (12 digits) *" },
                { name: "secondaryPhoneNumber", placeholder: "Secondary Phone Number (Optional)" },
              ].map(({ name, placeholder, type, options }, i) => (
                <div key={i}>
                  {type === "select" ? (
                    <select
                      name={name}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className={inputClass + " w-full"}
                      disabled={citiesLoading}
                    >
                      <option value="">{placeholder}</option>
                      {options.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={name}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className={inputClass + " w-full"}
                    />
                  )}
                  {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
                </div>
              ))}
            </div>

            <div>
              <label className="block mb-2 text-[#D48060] font-semibold">Service Type *</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className={inputClass + " w-full"}
              >
                <option value="">Select Service</option>
                <option value="caterer">Caterer</option>
                <option value="dj">DJ</option>
                <option value="decorator">Decorator</option>
                <option value="photographer">Photographer</option>
                <option value="others">Others</option>
              </select>
              {errors.service && <p className="text-red-500 text-xs mt-1">{errors.service}</p>}
            </div>

            {formData.service === "others" && (
              <div>
                <input
                  name="customService"
                  placeholder="Specify Your Service"
                  value={formData.customService || ""}
                  onChange={handleInputChange}
                  className={inputClass + " w-full"}
                />
              </div>
            )}

            {formData.service && (
              <ServiceSpecificFields
                service={lowercaseService(formData.service)}
                onChange={handleServiceFiltersChange}
                initialFilters={formData.serviceFilters}
              />
            )}

            <div>
              <h3 className="text-xl font-bold text-[#D48060] mb-4">Bank Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { name: "accHolderName", placeholder: "Account Holder Name *" },
                  { name: "bankName", placeholder: "Bank Name *" },
                  { name: "accNumber", placeholder: "Account Number *" },
                  { name: "ifscCode", placeholder: "IFSC Code *" },
                  { name: "upiId", placeholder: "UPI ID (Optional)" },
                ].map(({ name, placeholder }, i) => (
                  <div key={i}>
                    <input
                      name={name}
                      placeholder={placeholder}
                      value={formData[name]}
                      onChange={handleInputChange}
                      className={inputClass + " w-full"}
                    />
                    {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-2 text-[#D48060] font-semibold">Password *</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password (min 8 characters)"
                value={formData.password}
                onChange={handleInputChange}
                className={inputClass + " w-full"}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="block mb-2 font-semibold text-[#D48060]">
                Upload Portfolio Files (Images, Videos)
              </label>
              <input
                type="file"
                name="portfolioFiles"
                multiple
                accept="image/*,video/*"
                onChange={handleInputChange}
                className="w-full border border-[#D48060] rounded-xl p-2 bg-white text-[#D48060] file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#CCAB4A] file:text-white hover:file:bg-[#D48060] transition-all duration-300"
              />
              {formData.portfolioFiles.length > 0 && (
                <p className="text-sm mt-2 text-[#D48060]">
                  {formData.portfolioFiles.length} file(s) selected.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || citiesLoading}
              className={`bg-[#CCAB4A] hover:bg-[#D48060] text-white font-semibold px-6 py-3 rounded-xl w-full transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${
                (loading || citiesLoading) ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => console.log("Submit button clicked, disabled:", loading || citiesLoading)}
            >
              {loading ? "Submitting..." : "Complete Registration"}
            </button>
            <button
              type="button"
              onClick={() => setStep(2)}
              className="text-[#D48060] font-semibold hover:underline mt-2"
            >
              Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}