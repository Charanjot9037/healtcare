"use client";

import { useEffect, useState } from "react";

export default function DoctorLandingPage() {
const [user, setuser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      // console.log("Logged in userID:", parsedUser);
      setuser(parsedUser.id);
   
    } catch (err) {
      console.error("Error parsing user from localStorage:", err);
    }
  }
}, []);


const [app,setApp]=useState(null);
  useEffect(() => {
    const fetchAppointment = async () => {
      if (!user) return;

      try {
        const res = await fetch("/api/doctorsappt", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId:user }), // ✅ only send ID
        });

        if (!res.ok) throw new Error("Failed to fetch appointments");

        const data = await res.json();
        setApp(data.appointments || []); // ✅ safe fallback
        console.log("User appointments:", data.appointments);
      } catch (err) {
        console.error("Error fetching appointments:", err);
        // fallback to dummy data
       
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
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    <div className="min-h-screen bg-gradient-to-tr from-indigo-500 via-purple-600 to-pink-500 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-10">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-3 drop-shadow-md">
      {app?.[0]?.doctorName || "Doctor Name"}

          </h1>
          <p className="text-gray-700 text-xl tracking-wide">
            Here are your appointments for today:
          </p>
        </header>

        {/* Search + Filter */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name, reason, or status..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border-black border placeholder-black rounded-lg w-full md:w-1/2"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-black text-black rounded-lg"
          >
            <option className="text-black" value="All">All</option>
            <option className="text-black" value="Confirmed">Confirmed</option>
            <option className="text-black" value="Pending">Pending</option>
            <option className="text-black" value="Cancelled">Cancelled</option>
          </select>
        </div>

        {filteredAppointments.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            No appointments found.
          </p>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="text-left py-4 px-6 text-gray-800 uppercase tracking-wide">Time</th>
                <th className="text-left py-4 px-6 text-gray-800 uppercase tracking-wide">Patient Name</th>
                <th className="text-left py-4 px-6 text-gray-800 uppercase tracking-wide">Date</th>
                <th className="text-left py-4 px-6 text-gray-800 uppercase tracking-wide">Status</th>
                  <th className="text-left py-4 px-6 text-gray-800 uppercase tracking-wide">Meeting</th>
              </tr>
            </thead>
            <tbody>
              {app?.map((app, index) => (
                <tr
                  key={index}
                  onClick={() => setSelectedPatient({ id:app._id, time:app.appointmentTime, patientName:app.firstName, status:app.status })}
                  className={`cursor-pointer border-b border-gray-200 bg-white 
                    transform transition duration-500 ease-in-out
                    ${
                      animate
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 translate-x-10"
                    }
                    hover:bg-indigo-50`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <td className="py-4 px-6 font-semibold text-indigo-700">{app.appointmentTime||"N-A"}</td>
                  <td className="py-4 px-6 text-gray-900">{app.firstName}</td>
                  <td className="py-4 px-6 text-gray-700 italic">{app.appointmentDate}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`inline-block px-4 py-1 rounded-full text-sm font-semibold shadow-sm
                      transition-colors duration-300
                      ${statusColor(status)}
                      hover:brightness-110`}
                    >
                      {app.status}
                    </span>
                  </td>
                    <td>
                      <button>create</button> </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal */}
        {selectedPatient && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4 text-black">
                {selectedPatient.patientName}
              </h2>
              <p className="text-black"><strong>Time:</strong> {selectedPatient.time}</p>
              <p className="text-black"><strong>Reason:</strong> {selectedPatient.reason}</p>
              <p className="text-black"><strong>Status:</strong> {selectedPatient.status}</p>
                <p className="text-black"><strong>Status:</strong> {selectedPatient.status}</p>
              <p className="mt-2 text-black">
                <strong>Notes:</strong> Lorem ipsum dolor sit amet.
              </p>
              <p className="mt-1 text-black ">
                <strong>Prescription:</strong> Vitamin D, Paracetamol
              </p>

              {/* Status Update */}
              <div className="mt-4">
                <label className="block text-sm font-semibold mb-2 text-black">Update Status:</label>
                <select 
                  value={selectedPatient.status}
                  onChange={(e) => {
                    updateStatus(selectedPatient.id, e.target.value);
                    setSelectedPatient((prev) => ({ ...prev, status: e.target.value }));
                  }}
                  className="px-4 py-2 border border-black text-black rounded-lg w-full"
                >
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <button
                onClick={() => setSelectedPatient(null)}
                className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-lg"
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
