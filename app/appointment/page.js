
"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function AppointmentManagement() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const searchParams = useSearchParams();
  const doctorName = searchParams.get("name");
  const specialization = searchParams.get("specialization");
  const imageUrl = searchParams.get("imageUrl");
  const doctorId = searchParams.get("id");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    appointmentDate: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      alert("⚠️ User not found. Please log in again.");
      return;
    }

    try {
      const payload = {
        ...formData,
        doctorId,       // attach doctor id here
        userID: user.id, // attach user id here
        doctorName,
        specialization,
      };

      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        alert("✅ Appointment booked successfully!");
        console.log(result);
      } else {
        alert("❌ Failed to book appointment");
      }
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-start">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-3xl w-full">
        {/* Page Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-purple-700">
            Book Your Appointment
          </h1>
          <p className="text-gray-600 mt-2">
            Fill in your details below to confirm an appointment with your doctor.
          </p>
        </div>

        {/* Doctor Info Card */}
        <div className="flex items-center gap-4 border rounded-xl p-4 mb-8 bg-purple-50">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={doctorName}
              width={100}
              height={100}
              className="rounded-lg object-cover shadow-md"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{doctorName}</h2>
            <p className="text-purple-600">{specialization}</p>
          </div>
        </div>

        {/* Appointment Form */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black"
        >
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-purple-500 focus:ring focus:ring-purple-200"
              required
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-purple-500 focus:ring focus:ring-purple-200"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-purple-500 focus:ring focus:ring-purple-200"
              required
            />
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-purple-500 focus:ring focus:ring-purple-200"
              required
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-purple-500 focus:ring focus:ring-purple-200"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-purple-500 focus:ring focus:ring-purple-200"
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Appointment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Appointment Date
            </label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:outline-purple-500 focus:ring focus:ring-purple-200"
              required
            />
          </div>
        </form>

        {/* Address */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <textarea
            name="address"
            placeholder="Enter your complete address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 focus:outline-purple-500 focus:ring focus:ring-purple-200 text-black"
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
}
