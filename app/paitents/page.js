// app/admin/patients/page.tsx  (Next.js 13+ App Router)
// or pages/admin/patients.js   (Next.js Pages Router)

"use client";
import { useState } from "react";

export default function AdminPatients() {
  const [patients, setPatients] = useState([
    { id: 1, name: "Amit Kumar", mobile: "9876543210", age: 30, disease: "Fever", status: "Admitted" },
    { id: 2, name: "Sara Ali", mobile: "8765432109", age: 25, disease: "Cough", status: "Discharged" },
    { id: 3, name: "Michael John", mobile: "7654321098", age: 40, disease: "Diabetes", status: "Admitted" },
  ]);

  // Delete handler
//   const deletePatient = (id: number) => {
//     setPatients(patients.filter((pat) => pat.id !== id));
//   };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
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
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((pat) => (
              <tr key={pat.id} className="border-b">
                <td className="py-2">{pat.id}</td>
                <td>{pat.name}</td>
                <td>{pat.mobile}</td>
                <td>{pat.age}</td>
                <td>{pat.disease}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      pat.status === "Admitted"
                        ? "bg-green-100 text-green-600"
                        : "bg-yellow-100 text-yellow-600"
                    }`}
                  >
                    {pat.status}
                  </span>
                </td>
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
