"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { useState,useEffect } from "react";
import Link from "next/link";
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
   const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }
  }, []);

  const [app,setApp]=useState(null)
  useEffect(() => {
    const fetchAppointment = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch("/api/userappointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });

        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        setApp(data.appointments || []);
      
      } catch (err) {
        console.error("Error fetching appointments:", err);
        
      }
    };

    fetchAppointment();
  }, [user]);


  console.log(app);
  return (
    <div className="bg-gray-50 min-h-screen w-screen py-10 px-6">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Hi <span className="text-purple-600"></span>, here are your
          All reports
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-purple-500  text-left text-white text-sm">
                <th className="py-3 px-5">ID</th>
                <th className="py-3 px-5">Doctor Name</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Submitted Reports</th>
              <th className="py-3 px-5">Prescriptions</th>
             
              </tr>
            </thead>
            <tbody>
              {app?.map((pat, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-purple-50 transition`}
                >
                  <td className="py-3 px-5 text-gray-800 font-medium">
                    {index+1}
                  </td>
                  <td className="px-5 text-gray-700">{pat.doctorName}</td>
                  <td className="px-5 text-gray-700">{pat.appointmentDate.split("T")[0]}</td>
                  <td className="px-5 text-gray-700">
  {Array.isArray(pat?.doctorreports) && pat.doctorreports.length > 0 ? (
  <select className="border rounded px-2 py-1">
    <option value="">View Report</option>
    {pat.doctorreports.map((link, idx) => (
      <option key={idx} value={link}>
        Report {idx + 1}
      </option>
    ))}
  </select>
) : (
  <p className="text-gray-500">No Submitted report</p>
)}

                    </td>



                  {/* Status Badge */}
                  <td className="px-5">
                 {Array.isArray(pat?.doctorreports) && pat.doctorreports.length > 0 ? (
  <select className="border rounded px-2 py-1">
    <option value="">View Report</option>
    {pat.reports.map((link, idx) => (
      <option key={idx} value={link}>
        Report {idx + 1}
      </option>
    ))}
  </select>
) : (
  <p className="text-gray-500">No prescriptions</p>
)}
                  </td>

                  {/* Join Button */}
                 
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
