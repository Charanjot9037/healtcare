"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Dashboard = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appoint, setAppoint] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("/api/paitents");
        const data = await res.json();
        setPatients(data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/allappointments");
        const data = await res.json();
        setAppoint(data);
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen flex text-gray-800 bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-800 text-white p-6 space-y-6 shadow-lg">
        <h2 className="text-2xl font-bold">HEAL WELL</h2>
        <nav className="space-y-3 mt-6">
          <Link href="/admin" className="block hover:bg-purple-700 p-3 rounded transition">
            Dashboard
          </Link>
          <Link href="/doctor" className="block hover:bg-purple-700 p-3 rounded transition">
            Doctor
          </Link>
          <Link href="/pharmacy" className="block hover:bg-purple-700 p-3 rounded transition">
            Pharmacy
          </Link>
          <Link href="/paitents" className="block hover:bg-purple-700 p-3 rounded transition">
            Patient
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            { title: "Total Patients", value: patients.length },
            { title: "Total Doctors", value: doctors.length },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white shadow rounded-xl p-6 flex flex-col items-center justify-center hover:shadow-md transition"
            >
              <p className="text-3xl font-bold text-purple-800">{card.value}</p>
              <p className="mt-2 text-lg text-gray-600">{card.title}</p>
            </div>
          ))}
        </div>

        {/* Patients & Appointments Tables */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Patients Table */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-800">Patients</h3>
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">Name</th>
                  <th className="py-2 px-4 text-left">Contact</th>
                  <th className="py-2 px-4 text-left">Email</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((p, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-4">{p?.name}</td>
                    <td className="py-2 px-4">{p?.contact}</td>
                    <td className="py-2 px-4">{p?.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Appointments Table */}
          <div className="bg-white shadow rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-800">Appointments</h3>
            <table className="w-full text-sm border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 text-left">Patient Name</th>
                  <th className="py-2 px-4 text-left">Date</th>
                  <th className="py-2 px-4 text-left">Status</th>
                  <th className="py-2 px-4 text-left">Doctor Name</th>
                </tr>
              </thead>
              <tbody>
                {appoint.map((a, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50 transition">
                    <td className="py-2 px-4">{a.userID.name}</td>
                    <td className="py-2 px-4">{a.appointmentDate.split("T")[0]}</td>
                    <td className="py-2 px-4">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          a.status === "Approved"
                            ? "bg-purple-100 text-purple-700"
                            : a.status === "Rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {a.status}
                      </span>
                    </td>
                    <td className="py-2 px-4">{a.doctorName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Doctors Table */}
        <div className="bg-white shadow rounded-xl p-6 mb-8">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">Doctors</h3>
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Mobile</th>
                <th className="py-2 px-4">Charge</th>
                <th className="py-2 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{i + 1}</td>
                  <td className="py-2 px-4">{doc.name}</td>
                  <td className="py-2 px-4">{doc.mobile}</td>
                  <td className="py-2 px-4">{doc.fees}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        doc.status === "Online"
                          ? "bg-purple-100 text-purple-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Out of Stock Table */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-4 text-purple-800">Out of Stock</h3>
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">Drug</th>
                <th className="py-2 px-4">Expiry</th>
                <th className="py-2 px-4">Qty</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, drug: "Paracetamol", expiry: "2025-10-12", qty: 0 },
                { id: 2, drug: "Azinole", expiry: "2025-12-21", qty: 0 },
              ].map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  <td className="py-2 px-4">{item.id}</td>
                  <td className="py-2 px-4">{item.drug}</td>
                  <td className="py-2 px-4">{item.expiry}</td>
                  <td className="py-2 px-4">{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
