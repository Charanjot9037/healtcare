"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    router.push("/login"); // go to login after signup
  }

  return (
    <div className="min-h-screen bg-gradient-to-tr from-teal-100 via-purple-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        {/* Info Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-tr from-purple-100 to-blue-50 px-8 py-8 w-1/3">
          <img src="/healthcare-icon.svg" alt="Healthcare Icon" className="w-20 mb-6" />
          <h2 className="text-xl font-bold text-purple-700 mb-2">Welcome to RecoveryCare</h2>
          <p className="text-gray-600 text-center">Your information is safe and confidential. Our team is here to support your recovery journey.</p>
        </div>
        {/* Form Side */}
        <div className="w-full md:w-2/3 p-8">
          <h1 className="text-2xl font-extrabold text-teal-700 text-center mb-2">Drug Addiction Management System</h1>
          <h2 className="text-lg font-semibold text-gray-700 text-center mb-6">Create an Account</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input name="name" value={form.name} onChange={handleChange} required
                  className="input border-teal-300 rounded-lg focus:border-purple-400 text-black placeholder-gray-800" placeholder="John Doe" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} required
                  className="input border-teal-300 rounded-lg focus:border-purple-400 text-black placeholder-gray-800" placeholder="you@example.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required
                  className="input border-teal-300 rounded-lg focus:border-purple-400 text-black placeholder-gray-800" placeholder="••••••" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input name="contact" value={form.contact} onChange={handleChange} required
                  className="input border-teal-300 rounded-lg focus:border-purple-400 text-black placeholder-gray-800" placeholder="+91 9876543210" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input name="location" value={form.location} onChange={handleChange} required
                  className="input border-teal-300 rounded-lg focus:border-purple-400 text-black placeholder-gray-800" placeholder="City, Country" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input type="number" name="age" value={form.age} onChange={handleChange}
                  className="input border-teal-300 rounded-lg focus:border-purple-400 text-black placeholder-gray-800" placeholder="25" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select name="gender" value={form.gender} onChange={handleChange}
                  className="input border-teal-300 rounded-lg focus:border-purple-400">
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Disease</label>
                <input name="disease" value={form.disease} onChange={handleChange}
                  className="input border-teal-300 rounded-lg focus:border-purple-400 text-black placeholder-gray-800" placeholder="Diabetes, Flu, etc. " />
              </div>
            </div>
            <button type="submit"
              className="w-full bg-teal-600 hover:bg-purple-600 transition-all text-white font-semibold py-2 rounded-xl shadow-md">
              Register
            </button>
          </form>
          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-purple-600 hover:underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
