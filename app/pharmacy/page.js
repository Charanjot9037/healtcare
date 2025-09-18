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



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Pharmacy Management</h1>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow transition"
          onClick={() => alert("Add Medicine Modal/Functionality here")}
        >
          + Add Medicine
        </button>
      </div>

      {/* Medicines Table */}
      <div className="bg-white shadow rounded-xl p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b text-gray-600">
              <th className="py-2">ID</th>
              <th>Medicine Name</th>
              <th>Expiry Date</th>
              <th>Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med.id} className="border-b">
                <td className="py-2">{med.id}</td>
                <td>{med.name}</td>
                <td>{med.expiry}</td>
                <td>{med.quantity}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      med.status === "Available"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {med.status}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => deleteMedicine(med.id)}
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
