
"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function AdminDoctors() {
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
              {/* <th className="py-2">sr.no</th> */}
              <th>Name</th>
              <th>Mobile</th>
              <th>Consultancy Charge</th>
              {/* <th>Status</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id} className="border-b">
                {/* <td className="py-4">{doc.id}</td> */}
                <td className="py-4">{doc.name}</td>
                <td>{doc.mobile}</td>
                <td>₹{doc.fees}</td>
                {/* <td>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      doc.status === "Online"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {doc.status}
                  </span>
                </td> */}
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
