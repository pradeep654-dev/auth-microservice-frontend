import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [showGetButton, setSowGetButton] = useState(true);
    const [showReswndButton, setShowResendButton] = useState(false);
    const [timer, setTimer] = useState(0);
    const [isOtpVerified, setIsOtpVerified] = useState(false);

    const [, setMessage] = useState('');
    useEffect(() => {
        let interval = null;
        if (timer > 0) {
          interval = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
          }, 1000); 
        } else if (timer === 0 && !showGetButton) {
          setShowResendButton(true);
        }
        return () => clearInterval(interval);
      }, [timer, showGetButton]);
    

    const handleGetOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://auth-microservice-l975.onrender.com/api/auth/getOtp', { email });
            setMessage(response.data.message);
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                style: { color: "white" }
            });
            setSowGetButton(false);
            setShowResendButton(false);
            setTimer(60);

        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "top-right",
                autoClose: 3000,
                style: { color: "white" }
            });
            setMessage('Error sending reset link. Please try again.');
        }
    }


    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.post('https://auth-microservice-l975.onrender.com/api/auth/changePassword', { email, newPassword });
        setMessage(response.data.message);
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 3000,
          style: { color: "white" }
        });
        // Redirect to login page after successful password reset
        setTimeout(() => {
          window.location.href = '/';
        }, 3000); // Redirect after 3 seconds to allow the user to see the success message
      } catch (error) {
        toast.error(error?.response?.data?.message, {
          position: "top-right",
          autoClose: 3000,
          style: { color: "white" }
        });
        setMessage('Error sending reset link. Please try again.');
      }
    };

    const handelVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            // setOtp(e.target.value)
            const response = await axios.post('https://auth-microservice-l975.onrender.com/api/auth/verifyOtp', { email, otp });
            setMessage(response.data.message);
            toast.success(response.data.message, {
                position: "top-right",
                autoClose: 3000,
                style: { color: "white" }
            });
            setIsOtpVerified(true);
        } catch (error) {
            toast.error(error?.response?.data?.message, {
                position: "top-right",
                autoClose: 3000,
                style: { color: "white" }
            });
            setMessage('Error verifying OTP. Please try again.');
        }
    }

    return (
      <div className="forgot-container">
        <div className="max-w-md w-full p-6 bg-white bg-opacity-10 rounded-lg shadow-md backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-4 text-center text-white">Forgot Password</h2>
    
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-white">
            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="p-2 border border-gray-300 rounded-lg w-full bg-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* OTP Controls */}
              <div className="flex justify-end items-center mt-1 gap-2">
                {showGetButton && (
                  <button
                    onClick={handleGetOtp}
                    className="px-3 py-1 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700"
                  >
                    Send OTP
                  </button>
                )}
                {!showGetButton && timer > 0 && (
                  <span className="text-gray-200 text-xs">Resend in {timer}s</span>
                )}
                {showReswndButton && (
                  <button
                    onClick={handleGetOtp}
                    className="px-3 py-1 bg-gray-500 text-white rounded-lg text-xs hover:bg-gray-600"
                  >
                    Resend OTP
                  </button>
                )}
              </div>
            </div>
    
            {/* OTP Field */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="OTP"
                className="p-2 border border-gray-300 rounded-lg flex-1 bg-transparent"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={handelVerifyOtp}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-xs"
              >
                Verify OTP
              </button>
            </div>
    
            <p className={`text-center text-sm ${isOtpVerified ? "text-green-400" : "text-red-400"}`}>
              {isOtpVerified ? "✔ OTP Verified" : "❌ Please verify OTP first"}
            </p>
    
            {/* Password Fields */}
            <input
              type="password"
              placeholder="New Password"
              className="p-2 border border-gray-300 rounded-lg w-full bg-transparent"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={!isOtpVerified}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="p-2 border border-gray-300 rounded-lg w-full bg-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={!isOtpVerified}
            />
    
            {/* Submit */}
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded-lg transition ${
                isOtpVerified ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={!isOtpVerified}
            >
              Reset Password
            </button>
          </form>
    
          <ToastContainer />
        </div>
      </div>
    );
    
};

export default ForgotPassword;