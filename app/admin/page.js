"use client";
import React from 'react'
import { useState,useEffect } from 'react';
import Link from 'next/link'




const dashboard  = () => {
  const [patients, setPatients] = useState([]);

useEffect(() => {
    const fetchpaitent = async () => {
      try {
        const res = await fetch("/api/paitents");
        const data = await res.json();
     
        setPatients(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchpaitent();
  }, []);

  const [doctors, setDoctors] = useState([]);

useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        setDoctors(data);
        console.log(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  const [appoint, setappoint] = useState([]);

useEffect(() => {
    const fetchappointment = async () => {
      try {
        const res = await fetch("/api/allappointments");
        const app = await res.json();
        setappoint(app);
        console.log(app);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchappointment();
  }, []);








  return (
    <div className="min-h-screen bg-gray-100 flex text-black">
    
      <aside className="w-64 bg-gradient-to-b from-purple-700 to-purple-500 text-white p-5 space-y-6">
        <h2 className="text-xl font-bold">HEAL WELL</h2>
        
        <div className="space-y-4">
             <Link href="/admin" className="block hover:bg-purple-600 p-2 rounded-lg">Dashboard</Link>
             <Link href="/doctor" className="block hover:bg-purple-600 p-2 rounded-lg">Doctor</Link>
              <Link href="/pharmacy" className="block hover:bg-purple-600 p-2 rounded-lg">Pharmacy</Link>
               <Link href="/paitents" className="block hover:bg-purple-600 p-2 rounded-lg">Paitent</Link>
               
        </div>
      </aside>

    
      <main className="flex-1 p-6">
  
        <div className="flex justify-between items-center mb-6">
          <span className="font-semibold">ADMIN</span>
          
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-6">
          {[
            { title: "Total Patient", value:patients.length },
            { title: "Total Doctors", value:doctors.length },

          ].map((card, i) => (
            <div key={i} className="bg-white text-black shadow rounded-xl p-4 text-center">
              <p className="text-xl font-bold">{card.value}</p>
              <p className="text-gray-500">{card.title}</p>
            </div>
          ))}
        </div>

        {/* Graph + Appointments */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Patients Graph Placeholder */}
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold mb-2">Paitents</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2">Name</th>
                  <th>contact</th>
                  <th>email</th>
                </tr>
              </thead>
              <tbody>
                {patients?.map((app, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{app?.name}</td>
                    <td>{app?.contact}</td>
                    <td>
                     
                        {app?.email}
                    
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Appointments */}
          <div className="bg-white shadow rounded-xl p-4">
            <h3 className="font-semibold mb-2">Appointments</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600 border-b">
                  <th className="py-2">Paitent Name</th>
                  <th>Date</th>
               
                  <th>Status</th>
              <th className="py-2">Dr.Name</th>
                </tr>
              </thead>
              <tbody>
                {appoint.map((app, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{app.userID.name}</td>
                    <td>{app.appointmentDate.split("T")[0]}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          app.status === "Approved"
                            ? "bg-green-100 text-green-600"
                            : app.status === "Rejected"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                      <td className="py-2">{app.doctorName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Doctors */}
        <div className="bg-white shadow rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-2">Doctors</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b text-gray-600">
                <th>ID</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Charge</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc, i) => (
                <tr key={i} className="border-b">
                  <td>{i+1}</td>
                  <td>{doc.name}</td>
                  <td>{doc.mobile}</td>
                  <td>{doc.fees}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        doc.status === "Online"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
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

        {/* Out of Stock */}
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="font-semibold mb-2">Out of Stock</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b text-gray-600">
                <th>ID</th>
                <th>Drug</th>
                <th>Expiry</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, drug: "Paracetamol", expiry: "2025-10-12", qty: 0 },
                { id: 2, drug: "Azinole", expiry: "2025-12-21", qty: 0 },
              ].map((item, i) => (
                <tr key={i} className="border-b">
                  <td>{item.id}</td>
                  <td>{item.drug}</td>
                  <td>{item.expiry}</td>
                  <td>{item.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

export default dashboard 