

"use client";
import { useState } from "react";
import { useEffect } from "react";
export default function AdminPatients() {
  const [patients, setPatients] = useState([]);

useEffect(() => {
    const fetchpaitent = async () => {
      try {
        const res = await fetch("/api/paitents");
        const data = await res.json();
        console.log(data);
        setPatients(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchpaitent();
  }, []);






  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patients Management</h1>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow transition"
          onClick={() => alert("Add Patient Modal/Functionality here")}
        >
          + Add Patient
        </button>
      </div>

      {/* Patients Table */}
      <div className="bg-white shadow rounded-xl p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b text-gray-600">
              <th className="py-2">ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Age</th>
              <th>Disease</th>
            
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((pat) => (
              <tr key={pat.id} className="border-b">
                <td className="py-4">{pat.id}</td>
                <td>{pat.name}</td>
                <td>{pat.contact}</td>
                <td>{pat.age}</td>
                <td>{pat.disease}</td>
               
                <td>
                  <button
                    onClick={() => deletePatient(pat.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs shadow transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
