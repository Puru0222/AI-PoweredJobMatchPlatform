import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../services/authAPI";
import toast from "react-hot-toast";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const onSubmit = async (data) => {
    const { name, email, password } = data;
    try {
      await dispatch(signUp(name, email, password, navigate));
      reset();
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-custom-bg bg-cover bg-center bg-fixed p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="mt-1 opacity-90">
            Join us to unlock your career potential
          </p>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters",
                    },
                  })}
                  type="text"
                  className={`w-full pl-10 pr-3 py-3 rounded-lg border ${
                    errors.name
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <FaExclamationCircle className="mr-1" />
                    {errors.name.message}
                  </div>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  className={`w-full pl-10 pr-3 py-3 rounded-lg border ${
                    errors.email
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <FaExclamationCircle className="mr-1" />
                    {errors.email.message}
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain uppercase, lowercase, number and special character",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                    errors.password
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
                {errors.password && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <FaExclamationCircle className="mr-1" />
                    {errors.password.message}
                  </div>
                )}
              </div>
              {password && !errors.password && (
                <div className="password-strength mt-1 flex gap-1">
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      password.length > 10 ? "bg-green-500" : "bg-blue-500"
                    }`}
                  />
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      /[A-Z]/.test(password) ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      /[0-9]/.test(password) ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                  <div
                    className={`h-1 flex-1 rounded-full ${
                      /[^A-Za-z0-9]/.test(password)
                        ? "bg-green-500"
                        : "bg-gray-300"
                    }`}
                  />
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  type={showConfirmPassword ? "text" : "password"}
                  className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                    errors.confirmPassword
                      ? "border-red-500 bg-red-50"
                      : "border-gray-300 focus:border-blue-500"
                  } focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <div className="flex items-center mt-1 text-red-500 text-sm">
                    <FaExclamationCircle className="mr-1" />
                    {errors.confirmPassword.message}
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isValid}
              className={`w-full py-3 px-4 ${
                !isValid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              } text-white font-medium rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all`}
            >
              Create Account
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-medium hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
