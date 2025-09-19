
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
const appointment = [
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
    date: "29-09-2025",
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
  },
];

const Page = () => {
  const router = useRouter();
const {id}=useParams();
  return (
    <div className="bg-white w-screen h-screen min-h-screen">
   <div className="max-w-4xl mx-auto py-8">
<h6 className="text-black">HI {id}</h6>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b text-gray-600">
            <th className="py-2">ID</th>
            <th>Doctor Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Meeting</th>
          </tr>
        </thead>
        <tbody>
          {appointment.map((pat) => (
            <tr key={pat.appointmentId} className="border-b text-black">
              <td className="py-2">{pat.appointmentId}</td>
              <td>{pat.doctorName}</td>
              <td>{pat.date}</td>
              <td>{pat.startTime}</td>
              {/* <td>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    pat.status === "Confirmed"
                      ? "bg-green-100 text-green-600"
                      : pat.status === "Cancelled"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {pat.status}
                </span>
              </td>
              <td>
                <button
                  onClick={() => router.push("/meeting")}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs shadow transition"
                >
                  Join
                </button>
              </td> */}
              <td>
  <span
    className={`px-2 py-1 rounded text-xs ${
      pat.status === "Confirmed"
        ? "bg-green-100 text-green-600"
        : pat.status === "Cancelled"
        ? "bg-red-100 text-red-600"
        : "bg-yellow-100 text-yellow-600"
    }`}
  >
    {pat.status}
  </span>
</td>
<td>
  <button
    // Disable if status is Cancelled or Pending
    disabled={pat.status !== "Confirmed"}
    onClick={() => router.push("/meeting")}
    className={`bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs shadow transition
      ${pat.status !== "Confirmed" ? "opacity-50 cursor-not-allowed" : ""}
    `}
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
 
  );
};

export default Page;
