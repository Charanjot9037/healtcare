"use client";
import { useState, useEffect } from "react";

export default function AdminPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("/api/paitents");
        const data = await res.json();
        console.log(data);
        setPatients(data);
      } catch (err) {
        console.error("Error fetching patients:", err);
      }
    };
    fetchPatients();
  }, []);

  const deletePatient = (id) => {
    // Placeholder for delete functionality
    console.log("Deleting patient with id:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Patients Management
        </h1>
      </div>

      {/* Patients Table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-purple-200 text-purple-900">
            <tr>
              <th className="py-3 px-4 text-left">Sr. No</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Mobile</th>
              <th className="py-3 px-4 text-left">Age</th>
              <th className="py-3 px-4 text-left">Disease</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.length > 0 ? (
              patients.map((pat, index) => (
                <tr
                  key={pat.id || index}
                  className={`${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="py-4 px-4 font-medium">{index + 1}</td>
                  <td className="px-4">{pat.name}</td>
                  <td className="px-4">{pat.contact}</td>
                  <td className="px-4">{pat.age}</td>
                  <td className="px-4">{pat.disease}</td>
                  <td className="px-4">
                    <button
                      onClick={() => deletePatient(pat.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-xs font-semibold shadow transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No patients available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
