"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
    location: "",
    age: "",
    gender: "",
    disease: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message);

    alert(data.message);
    router.push("/login");
  }

  return (
    <div className="min-h-[90vh] bg-purple-50 flex items-center justify-center">
      <div className="bg-white mt-5 shadow-2xl rounded-3xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden transform hover:scale-[1.01] transition-transform duration-300">
        {/* Left Info + Animation Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-tr from-purple-200 via-purple-100 to-purple-50 px-6 py-6 w-1/3 text-center space-y-3 transform hover:scale-[1.03] transition-transform duration-500 shadow-inner">
          <DotLottieReact
            src="https://lottie.host/da1b98e1-e661-4802-b8ee-0fff226b4fe5/2ez5Y6owxE.lottie"
            loop
            autoplay
            style={{ width: 180, height: 180 }}
          />
          <h2 className="text-lg font-bold text-purple-700">
            Welcome to RecoveryCare
          </h2>
          <p className="text-gray-600 text-sm">
            Your information is safe and confidential. Our team is here to
            support your recovery journey.
          </p>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-2/3 p-8 md:p-10 space-y-5">
          <h1 className="text-2xl md:text-3xl font-extrabold text-purple-900 text-center mb-2">
            Drug Addiction Management System
          </h1>
          <h2 className="text-md md:text-lg font-semibold text-gray-700 text-center mb-5">
            Create an Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-3 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:scale-[1.02] transition-transform duration-200 shadow-sm hover:shadow-md"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="you@example.com"
                  className="w-full px-3 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:scale-[1.02] transition-transform duration-200 shadow-sm hover:shadow-md"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  placeholder="••••••"
                  className="w-full px-3 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:scale-[1.02] transition-transform duration-200 shadow-sm hover:shadow-md"
                />
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Contact
                </label>
                <input
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  required
                  placeholder="+91 9876543210"
                  className="w-full px-3 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:scale-[1.02] transition-transform duration-200 shadow-sm hover:shadow-md"
                />
              </div>

              {/* Location (full width) */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  required
                  placeholder="City, Country"
                  className="w-full px-3 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:scale-[1.02] transition-transform duration-200 shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            {/* Age, Gender, Disease */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={form.age}
                  onChange={handleChange}
                  placeholder="25"
                  className="w-full px-3 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:scale-[1.02] transition-transform duration-200 shadow-sm hover:shadow-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  className="w-full px-3 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:scale-[1.02] transition-transform duration-200 shadow-sm hover:shadow-md"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Disease
                </label>
                <input
                  name="disease"
                  value={form.disease}
                  onChange={handleChange}
                  placeholder="Diabetes, Flu, etc."
                  className="w-full px-3 py-2 mt-1 border border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:scale-[1.02] transition-transform duration-200 shadow-sm hover:shadow-md"
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 transition-all text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-5">
            Already have an account?{" "}
            <a href="/login" className="text-purple-600 hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
