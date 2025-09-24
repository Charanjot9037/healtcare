"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([]);
  const router = useRouter();

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

  const deleteDoctor = (id) => {
    // Placeholder for delete functionality
    console.log("Deleting doctor with id:", id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-900">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Doctors Management
        </h1>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg shadow-md transition font-medium"
          onClick={() => router.push("/adddoctor")}
        >
          + Add Doctor
        </button>
      </div>

      {/* Doctors Table */}
      <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-purple-200 text-purple-900">
            <tr>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">Mobile</th>
              <th className="py-3 px-4 text-left">Consultancy Charge</th>
              <th className="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.length > 0 ? (
              doctors.map((doc, idx) => (
                <tr
                  key={doc.id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-gray-100 transition`}
                >
                  <td className="py-4 px-4 font-medium">{doc.name}</td>
                  <td className="px-4">{doc.mobile}</td>
                  <td className="px-4">₹{doc.fees}</td>
                  <td className="px-4">
                    <button
                      onClick={() => deleteDoctor(doc.id)}
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
                  colSpan="4"
                  className="text-center py-6 text-gray-500 italic"
                >
                  No doctors available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
