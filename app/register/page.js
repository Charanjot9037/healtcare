"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [role, setRole] = useState("patient");

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Form submitted!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-4xl">
        {/* Title */}
        <h1 className="text-2xl font-bold text-purple-700 text-center mb-6">
          Drug Management System
        </h1>
        <h2 className="text-lg font-semibold text-gray-700 text-center mb-6">
          Create an Account
        </h2>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-6">
          {/* 2-column layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="John Doe"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="••••••••"
              />
            </div>

            {/* Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number
              </label>
              <input
                type="tel"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="+91 9876543210"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                placeholder="City, Country"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="doctor">Doctor</option>
                <option value="patient">Patient</option>
              </select>
            </div>
          </div>

          {/* Extra fields if Patient */}
          {role === "patient" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  min="0"
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  placeholder="25"
                />
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Disease (full width row) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Current Disease / Problem
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Diabetes, Flu, etc."
                />
              </div>
            </div>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg shadow transition"
          >
            Register
          </button>
        </form>

        {/* Extra Links */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
