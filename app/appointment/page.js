// app/admin/appointments/page.tsx (Next.js 13+ App Router)
// or pages/admin/appointments.js (Next.js Pages Router)

"use client";
import { useState } from "react";

export default function AppointmentManagement() {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    nic: "",
    dob: "",
    gender: "",
    appointmentDate: "",
    appointmentTime: "",
    department: "",
    doctor: "",
    address: "",
  });

// handleChange for all inputs, selects, textareas
const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

// handleAction for buttons
const handleAction = (action) => {
  alert(`${action} clicked!\n\n` + JSON.stringify(formData, null, 2));
};


  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-6">Appointment Management</h1>

        {/* Top Bar */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <button
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-700 to-gray-500 text-white shadow hover:opacity-90"
            onClick={() => handleAction("Generate Report")}
          >
            Get Appointments
          </button>
  
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-purple-500"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-purple-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-purple-500"
          />
          <input
            type="text"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-purple-500"
          />
          <input
            type="text"
            name="nic"
            placeholder="NIC"
            value={formData.nic}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-purple-500"
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-purple-500"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-purple-500"
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input
            type="date"
            name="appointmentDate"
            placeholder="Appointment Date"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-purple-500"
          />
          <input
            type="time"
            name="appointmentTime"
            placeholder="Appointment Time"
            value={formData.appointmentTime}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-purple-500"
          />
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-purple-500"
          >
            <option value="">Department Name</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
          </select>
          <select
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 focus:outline-purple-500"
          >
            <option value="">Doctor Name</option>
            <option value="Dr. John Smith">Dr. John Smith</option>
            <option value="Dr. Emily Johnson">Dr. Emily Johnson</option>
            <option value="Dr. Rahul Sharma">Dr. Rahul Sharma</option>
          </select>
        </div>

        {/* Address */}
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 mb-6 focus:outline-purple-500"
          rows={3}
        />

       
      </div>
    </div>
  );
}
