"use client";

import { useEffect, useState } from "react";

export default function DoctorLandingPage() {
  const [user, setuser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setuser(parsedUser.id);
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }
  }, []);

  const [app, setApp] = useState(null);
  useEffect(() => {
    const fetchAppointment = async () => {
      if (!user) return;

      try {
        const res = await fetch("/api/doctorsappt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user }),
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

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      time: "09:00 AM",
      patientName: "John Doe",
      reason: "Regular Checkup",
      status: "Confirmed",
    },
    {
      id: 2,
      time: "11:30 AM",
      patientName: "Jane Smith",
      reason: "Follow-up",
      status: "Pending",
    },
    {
      id: 3,
      time: "02:00 PM",
      patientName: "Alice Johnson",
      reason: "Consultation",
      status: "Cancelled",
    },
  ]);

  const [animate, setAnimate] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-200 text-green-800";
      case "Pending":
        return "bg-yellow-200 text-yellow-900";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const updateStatus = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
  };

  const filteredAppointments = appointments.filter((appt) => {
    const matchesSearch =
      appt.patientName.toLowerCase().includes(search.toLowerCase()) ||
      appt.reason.toLowerCase().includes(search.toLowerCase()) ||
      appt.status.toLowerCase().includes(search.toLowerCase());

    const matchesFilter = filter === "All" || appt.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 flex items-center justify-center p-6">
      {/* Transparent Center Card */}
      <div className="max-w-5xl w-full bg-white/30 backdrop-blur-2xl border border-white/40 shadow-2xl rounded-2xl p-10">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2 drop-shadow-sm">
            {app?.[0]?.doctorName || "Doctor Name"}
          </h1>
          <p className="text-gray-700 text-lg">
            Here are your appointments for today:
          </p>
        </header>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="🔍 Search by name, reason, or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-400 bg-white/60 backdrop-blur-md text-gray-900 placeholder-gray-600 rounded-xl shadow-sm w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-400 bg-white/60 backdrop-blur-md text-gray-900 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        {filteredAppointments.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            No appointments found.
          </p>
        ) : (
          <table className="w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-700 text-sm uppercase tracking-wide">
                <th className="text-left py-3 px-6">Time</th>
                <th className="text-left py-3 px-6">Patient Name</th>
                <th className="text-left py-3 px-6">Date</th>
                <th className="text-left py-3 px-6">Status</th>
                <th className="text-left py-3 px-6">Meeting</th>
              </tr>
            </thead>
            <tbody>
              {app?.map((app, index) => (
                <tr
                  key={index}
                  onClick={() =>
                    setSelectedPatient({
                      id: app._id,
                      time: app.appointmentTime,
                      patientName: app.firstName,
                      status: app.status,
                    })
                  }
                  className={`cursor-pointer rounded-xl bg-white/70 backdrop-blur-md shadow-md
                    transition transform duration-500
                    ${
                      animate
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4"
                    }
                    hover:scale-[1.01] hover:bg-purple-50`}
                  style={{ transitionDelay: `${index * 120}ms` }}
                >
                  <td className="py-4 px-6 font-semibold text-purple-700">
                    {app.appointmentTime || "N/A"}
                  </td>
                  <td className="py-4 px-6 text-gray-900">{app.firstName}</td>
                  <td className="py-4 px-6 text-gray-600 italic">
                    {app.appointmentDate}
                  </td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-sm font-semibold shadow-sm ${statusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <button className="px-3 py-1 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition">
                      Create
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white/90 backdrop-blur-xl p-8 rounded-2xl shadow-xl max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 text-purple-700">
                {selectedPatient.patientName}
              </h2>
              <p className="text-gray-900">
                <strong>Time:</strong> {selectedPatient.time}
              </p>
              <p className="text-gray-900">
                <strong>Status:</strong> {selectedPatient.status}
              </p>
              <p className="mt-2 text-gray-800">
                <strong>Notes:</strong> Lorem ipsum dolor sit amet.
              </p>
              <p className="mt-1 text-gray-800">
                <strong>Prescription:</strong> Vitamin D, Paracetamol
              </p>

              {/* Status Update */}
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2 text-gray-700">
                  Update Status:
                </label>
                <select
                  value={selectedPatient.status}
                  onChange={(e) => {
                    updateStatus(selectedPatient.id, e.target.value);
                    setSelectedPatient((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }));
                  }}
                  className="px-4 py-2 border border-gray-400 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedPatient(null)}
                className="mt-6 px-6 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
