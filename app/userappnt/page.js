"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
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

  const [app, setApp] = useState(null);
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
    <div className="bg-gray-50  w-screen ">
      <Navbar />
      <div className="max-w-screen mx-auto bg-white shadow-lg rounded-2xl p-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          All appointments
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full  border-collapse ">
            <thead>
              <tr className="bg-purple-200 w-full text-left text-gray-700 text-sm">
                <th className="py-3 px-5">ID</th>
                <th className="py-3 px-5">Doctor Name</th>
                <th className="py-3 px-5">Date</th>
                <th className="py-3 px-5">Time</th>
                <th className="py-3 px-5">Status</th>
                <th className="py-3 px-5">Meeting</th>

                <th className="py-3 px-5">submitted Reports</th>
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
                    {index + 1}
                  </td>
                  <td className="px-5 text-gray-700">{pat.doctorName}</td>
                  <td className="px-5 text-gray-700">
                    {pat.appointmentDate.split("T")[0]}
                  </td>
                  {/* <td className="px-5 text-gray-700">{pat.appointmentTime}</td> */}
                  <td className="px-5 text-gray-700">
                    {new Date(
                      `1970-01-01T${pat.appointmentTime}:00`
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    })}
                  </td>

                  {/* Status Badge */}
                  <td className="px-5">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          pat.appointmentStatus === "confirm"
                            ? "bg-green-100 text-green-700"
                            : pat.status === "Cancelled"
                            ? "bg-red-100 text-red-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                    >
                      {pat?.appointmentStatus}
                    </span>
                  </td>

                  {/* Join Button */}
                  <td className="px-5">
                    {/* <Link
                      disabled={pat?.appointmentStatus !== "confirm"}
                      href={pat?.meetinglink}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium shadow-md transition
                        ${
                          pat.appointmentStatus === "confirm"
                            ? "bg-purple-600 text-white hover:bg-purple-700"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                    >
                      Join
                    </Link> */}
                    {pat?.appointmentStatus === "confirm" &&
                    pat?.meetinglink ? (
                      <Link
                        href={pat.meetinglink}
                        className="px-4 py-1.5 rounded-lg text-sm font-medium shadow-md bg-purple-600 text-white hover:bg-purple-700 transition"
                      >
                        Join
                      </Link>
                    ) : (
                      <button
                        disabled
                        className="px-4 py-1.5 rounded-lg text-sm font-medium shadow-md bg-gray-300 text-gray-500 cursor-not-allowed"
                      >
                        Join
                      </button>
                    )}
                  </td>

                  <td>
                    <select
                      onChange={(e) => {
                        const link = e.target.value;
                        if (link) window.open(link, "_blank"); // Opens the image in a new tab
                      }}
                      className="px-3 py-1 text-gray-700 border border-purple-300 shadow-sm"
                    >
                      <option value="">View Report</option>
                      {Array.isArray(pat.reports) && pat.reports.length > 0 ? (
                        pat.reports.map((link, i) => (
                          <option key={i} value={link}>
                            Report {i + 1}
                          </option>
                        ))
                      ) : (
                        <option value="">No reports</option>
                      )}
                    </select>
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
