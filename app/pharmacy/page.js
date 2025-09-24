// app/admin/pharmacy/page.tsx  (Next.js 13+ App Router)
// or pages/admin/pharmacy.js   (Next.js Pages Router)

"use client";
import { useState } from "react";

export default function AdminPharmacy() {
  const [medicines, setMedicines] = useState([
    { id: 1, name: "Paracetamol", expiry: "2025-12-20", quantity: 120, status: "Available" },
    { id: 2, name: "Amoxicillin", expiry: "2024-11-10", quantity: 0, status: "Out of Stock" },
    { id: 3, name: "Cough Syrup", expiry: "2026-01-15", quantity: 50, status: "Available" },
  ]);

  const deleteMedicine = (id) => {
    // Add delete functionality here
    console.log("Delete medicine with id:", id);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 text-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Pharmacy Management</h1>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg shadow transition"
          onClick={() => alert("Add Medicine Modal/Functionality here")}
        >
          + Add Medicine
        </button>
      </div>

      {/* Medicines Table */}
      <div className="bg-white shadow-lg rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-purple-100">
            <tr className="text-left bg-purple-200 text-purple-900">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Medicine Name</th>
              <th className="py-3 px-4">Expiry Date</th>
              <th className="py-3 px-4">Quantity</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-3 px-4">{med.id}</td>
                <td className="py-3 px-4">{med.name}</td>
                <td className="py-3 px-4">{med.expiry}</td>
                <td className="py-3 px-4">{med.quantity}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      med.status === "Available"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {med.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => deleteMedicine(med.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-xs shadow transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {medicines.length === 0 && (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
                  No medicines found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
