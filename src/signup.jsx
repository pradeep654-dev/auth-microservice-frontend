import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signupUser } from "./api";
import { toast } from "react-toastify";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";


const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        evaluatePasswordStrength(newPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match.", {
                position: "top-right",
                autoClose: 3000,
                style: { color: "white" }
            });
            return;
        }

        const data = await signupUser(name, email, role, password);
        if (data?.message) {
            toast.success(data.message, {
                position: "top-right",
                autoClose: 3000,
                style: { color: "white" }
            });
        }
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

    const evaluatePasswordStrength = (password) => {
        let strength = 0;
        if (password.length > 5) strength += 1;
        if (password.length > 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[\W]/.test(password)) strength += 1;
        setPasswordStrength(strength);
    };


    return (
        <div className="signup-container">
          <div className="w-full max-w-sm bg-white bg-opacity-10 p-6 rounded-xl shadow-md backdrop-blur-md">
            <h2 className="text-2xl font-semibold text-center text-white mb-6">Signup</h2>
            <form onSubmit={handleSubmit} className="space-y-4 text-white">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:ring-2 focus:ring-blue-400"
              />
    
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:ring-2 focus:ring-blue-400"
              />
    
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
    
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:ring-2 focus:ring-blue-400"
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-300"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
    
              {password.length > 0 && (
                <div className="w-full h-2 rounded-md bg-gray-200">
                  <div
                    className={`h-2 rounded-md ${
                      passwordStrength <= 2
                        ? 'bg-red-500 w-1/3'
                        : passwordStrength <= 4
                        ? 'bg-yellow-500 w-2/3'
                        : 'bg-green-500 w-full'
                    }`}
                  ></div>
                </div>
              )}
    
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-transparent focus:ring-2 focus:ring-blue-400"
                />
                <span
                  className="absolute right-3 top-2.5 cursor-pointer text-gray-300"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
    
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
              >
                Signup
              </button>
            </form>
    
            <p className="mt-4 text-center text-sm text-gray-300">
              Already have an account?{" "}
              <Link to="/" className="text-blue-300 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      );
}

export default Signup;
