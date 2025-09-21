"use client";
import { useEffect, useState } from "react";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/userappointment");
        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchAppointments();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Appointments</h1>
      <ul className="space-y-4">
        {appointments.map((appt) => (
          <li key={appt._id} className="p-4 border rounded-lg bg-white shadow">
            <h2 className="font-semibold text-lg">
              Dr. {appt.doctorName} ({appt.specialization})
            </h2>
            <p>Date: {new Date(appt.appointmentDate).toDateString()}</p>
            <p>Status: <span className="text-green-600">{appt.status}</span></p>
          </li>
        ))}
      </ul>
    </div>
  );
}
