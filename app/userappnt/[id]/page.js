"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";

const appointments = [
  {
    appointmentId: "A1001",
    doctorId: "D200",
    doctorName: "Dr. Sunil Sharma",
    specialization: "Cardiologist",
    patientId: "P300",
    patientName: "Mayank Singh",
    appointmentDate: "2025-09-20",
    startTime: "10:00",
    endTime: "10:30",
    treatmentType: "Routine check-up",
    status: "Confirmed",
    office: "Sharma Clinic, Mumbai",
    date: "31-09-2025",
  },
  {
    appointmentId: "A1002",
    doctorId: "D201",
    doctorName: "Dr. Priya Saini",
    specialization: "Dermatologist",
    patientId: "P304",
    patientName: "Riya Jain",
    appointmentDate: "2025-09-21",
    startTime: "11:00",
    endTime: "11:30",
    treatmentType: "Skin allergy",
    status: "Pending",
    office: "Skin Care Center, Pune",
    date: "30-09-2025",
  },
  {
    appointmentId: "A1003",
    doctorId: "D202",
    doctorName: "Dr. Amit Patel",
    specialization: "Psychiatrist",
    patientId: "P309",
    patientName: "Vikram Verma",
    appointmentDate: "2025-09-21",
    startTime: "14:00",
    endTime: "14:45",
    treatmentType: "Counseling",
    status: "Cancelled",
    office: "Patel Hospital, Delhi",
    date: "29-09-2025",
  },
];

const Page = () => {
  const router = useRouter();
  const { id } = useParams();

  return (
    <div className="bg-gray-50 min-h-screen w-screen py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Hi <span className="text-purple-600">{id}</span>, here are your
          appointments
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-700 text-sm">
                <th className="py-3 px-5">ID</th>
                <th className="py-3 px-5">Doctor Name</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Time</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Meeting</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((pat, index) => (
                <tr
                  key={pat.appointmentId}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-purple-50 transition`}
                >
                  <td className="py-3 px-5 text-gray-800 font-medium">
                    {pat.appointmentId}
                  </td>
                  <td className="px-5 text-gray-700">{pat.doctorName}</td>
                  <td className="px-5 text-gray-700">{pat.date}</td>
                  <td className="px-5 text-gray-700">{pat.startTime}</td>

                  {/* Status Badge */}
                  <td className="px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          pat.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : pat.status === "Cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                      {pat.status}
                    </span>
                  </td>

                  {/* Join Button */}
                  <td className="px-5">
                    <button
                      disabled={pat.status !== "Confirmed"}
                      onClick={() => router.push("/meeting")}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium shadow-md transition
                        ${
                          pat.status === "Confirmed"
                            ? "bg-purple-600 text-white hover:bg-purple-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                      Join
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Page;
