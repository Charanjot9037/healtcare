"use client";

import React, { useState } from "react";

const AddDoctorPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    degree: "",
    fees: "",
    licenseNumber: "",
    gender: "",
    image: null,
    specialization: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload excluding image file - handle image upload separately if needed
    const {
      name,
      mobile,
      degree,
      fees,
      licenseNumber,
      gender,
      specialization,
    } = formData;

    const payload = {
      name,
      mobile,
      degree,
      fees,
      licenseNumber,
      gender,
      specialization,
      imageUrl: "", // update with image URL after upload if implemented
    };

    try {
      const response = await fetch("/api/auth/adddoctor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Doctor added successfully!");
        setFormData({
          name: "",
          mobile: "",
          degree: "",
          fees: "",
          licenseNumber: "",
          gender: "",
          image: null,
          specialization: "",
        });
      } else {
        alert("Failed to add doctor: " + result.error);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen text-black bg-white flex items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
        <h2 className="text-3xl font-semibold mb-6 text-gray-900">Add New Doctor</h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6"
        >
          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2 font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              required
              className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
              placeholder="Doctor's full name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="mobile" className="mb-2 font-medium text-gray-700">
              Mobile
            </label>
            <input
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              type="tel"
              pattern="[0-9]{10}"
              required
              className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
              placeholder="10-digit mobile number"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="degree" className="mb-2 font-medium text-gray-700">
              Degree
            </label>
            <input
              id="degree"
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              type="text"
              required
              className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
              placeholder="e.g., MBBS, MD"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="fees" className="mb-2 font-medium text-gray-700">
              Fees
            </label>
            <input
              id="fees"
              name="fees"
              value={formData.fees}
              onChange={handleChange}
              type="number"
              min="0"
              required
              className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
              placeholder="Consultation fees"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="licenseNumber" className="mb-2 font-medium text-gray-700">
              License Number
            </label>
            <input
              id="licenseNumber"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              type="text"
              required
              className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
              placeholder="Medical license number"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="gender" className="mb-2 font-medium text-gray-700">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="specialization" className="mb-2 font-medium text-gray-700">
              Specialization
            </label>
            <input
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              type="text"
              required
              className="border border-gray-300 rounded px-3 py-2 bg-white placeholder-gray-400"
              placeholder="e.g., Cardiologist"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="mb-2 font-medium text-gray-700">
              Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="bg-white"
            />
            {formData.image && (
              <p className="mt-2 text-sm text-gray-600">
                Selected file: {formData.image.name}
              </p>
            )}
          </div>

          {/* Empty div to fill grid column for alignment */}
          <div></div>

          <button
            type="submit"
            className="w-full md:col-span-2 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded transition"
          >
            Add Doctor
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddDoctorPage;
