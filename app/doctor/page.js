// app/admin/doctors/page.tsx  (Next.js 13+ App Router)
// or pages/admin/doctors.js   (Next.js Pages Router)

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
export default function AdminDoctors() {
  const [doctors, setDoctors] = useState([
    { id: 1, name: "Dr. John Smith", mobile: "9876543210", charge: 2000, status: "Online" },
    { id: 2, name: "Dr. Emily Johnson", mobile: "8765432109", charge: 2500, status: "Offline" },
    { id: 3, name: "Dr. Rahul Sharma", mobile: "7654321098", charge: 1800, status: "Online" },
  ]);

  // Delete handler
//   const deleteDoctor = (id: number) => {
//     setDoctors(doctors.filter((doc) => doc.id !== id));
//   };

const router=useRouter();
  return (
    <div className="min-h-screen bg-gray-100 p-6 text-black" >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Doctors Management</h1>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow transition"
          onClick={() => router.push("/adddoctor")}
        >
          + Add Doctor
        </button>
      </div>

      {/* Doctors Table */}
      <div className="bg-white shadow rounded-xl p-4">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left border-b text-gray-600">
              <th className="py-2">ID</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Consultancy Charge</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id} className="border-b">
                <td className="py-2">{doc.id}</td>
                <td>{doc.name}</td>
                <td>{doc.mobile}</td>
                <td>₹{doc.charge}</td>
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
                <td>
                  <button
                    onClick={() => deleteDoctor(doc.id)}
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
