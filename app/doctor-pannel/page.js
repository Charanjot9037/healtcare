
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "../lib/config/uploadToCloudiary";

export default function DoctorLandingPage() {
  const [user, setUser] = useState(null);
  const [doctorRep, setDoctorRep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [app, setApp] = useState([]);
  const [animate, setAnimate] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  
  const router = useRouter();

  // Fetch logged-in doctor
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser.id);
      } catch (err) {
        console.error("Error parsing user from localStorage:", err);
      }
    }
  }, []);

  // Fetch appointments





  // const handleReportClick = (e) => {
  //   const link = e.target.value;
  //   if (link) {
  //     window.open(link, "_blank"); // open in new tab
  //   }
  // };
 
  // const [app, setApp] = useState(null);
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

  useEffect(() => setAnimate(true), []);

  const statusColor = (status) => {
    switch (status) {
      case "Confirmed": return "bg-purple-200 text-purple-800";
      case "Pending": return "bg-yellow-200 text-yellow-900";
      case "Cancelled": return "bg-red-200 text-red-800";
      default: return "bg-gray-200 text-gray-800";
    }
  };

  const generateMeetingLink = (meetingId) => {
    return `${window.location.protocol}//${window.location.host}/room/${meetingId}`;
  };

  const handleReportClick = (e) => {
    const link = e.target.value;
    if (link) window.open(link, "_blank");
  };

  const filteredAppointments = app.filter((appt) => {
    const matchesSearch =
      appt.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      appt.reason?.toLowerCase().includes(search.toLowerCase()) ||
      appt.status?.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || appt.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen  bg-gradient-to-br from-white via-purple-100 to-purple-200 flex flex-col items-center justify-start p-6 md:p-1">
      {/* Header */}
      {!showModal && (
        <div className=" w-full  bg-white backdrop-blur-xl shadow-2xl  p-8 md:p-12 border border-purple-200 transition-all duration-500">
          <header className="mb-8 text-center ">
            <h1 className="text-4xl font-bold text-purple-700 mb-2"> 
              {app?.[0]?.doctorName || "Doctor Name"} 
            </h1>
            <p className="text-purple-600 text-lg">Today's Appointments</p>
          </header>

          {/* Search & Filter */}
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="🔍 Search by name, reason, or status..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 border border-purple-300 rounded-xl shadow-sm w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-purple-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option value="All">All</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Appointments Table */}
          {filteredAppointments.length === 0 ? (
            <p className="text-center text-purple-600 text-lg">No appointments found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-sm uppercase tracking-wide text-purple-700">
                    <th className="text-left py-3 px-6">Time</th>
                    <th className="text-left py-3 px-6">Patient</th>
                    <th className="text-left py-3 px-6">Date</th>
                    <th className="text-left py-3 px-6">Status</th>
                    <th className="text-left py-3 px-6">Test Reports</th>
                    <th className="text-left py-3 px-6">Meeting</th>
                    <th className="text-left py-3 px-6">Add Prescription</th>
                      <th className="text-left py-3 px-6">Write  Prescription</th>
                  </tr>
                </thead>
                <tbody>
                  {app.map((appt, idx) => (
                    <tr
                      key={appt._id || idx}
                      className={`bg-white shadow-md rounded-xl transition transform duration-500 hover:scale-[1.02]`}
                      style={{ transitionDelay: `${idx * 100}ms` }}
                    >
                      <td className="py-3 px-6 font-semibold">{appt.appointmentTime}</td>
                      <td className="py-3 px-6">{appt.firstName}</td>
                      <td className="py-3 px-6 italic">{appt.appointmentDate}</td>
                      <td className="py-3 px-6">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(appt.status)}`}>
                          {appt.status}
                        </span>
                      </td>
                      <td className="py-3 px-6">
                        {appt?.reports?.length === 0 ? (
                          <p className="text-gray-500">No reports</p>
                        ) : (
                          <select
                            onChange={handleReportClick}
                            className="p-2 border rounded-lg shadow-sm w-full"
                          >
                            <option value="">View Report</option>
                            {appt.reports.map((link, i) => (
                              <option key={i} value={link}>Report {i + 1}</option>
                            ))}
                          </select>
                        )}
                      </td>
                      <td className="py-3 px-6">
                        {appt.status === "Confirmed" ? (
                          <button
                            onClick={() => router.push(appt.meetinglink)}
                            className="px-3 py-1 bg-purple-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
                          >
                            Join
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              setSelectedPatient({
                                id: appt._id,
                                time: appt.appointmentTime,
                                patientName: appt.firstName,
                                status: appt.status,
                              });
                              setShowModal(true);
                            }}
                            className="px-3 py-1 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition"
                          >
                            Create
                          </button>
                        )}
                      </td>
                      <td className="py-3 px-6">
                        <input
                          type="file"
                          accept="image/*,application/pdf"
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;
                            setLoading(true);
                            try {
                              const url = await uploadToCloudinary(file);
                              setDoctorRep(url);
                              const res = await fetch("/api/doctorpres", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ id: appt._id, prescription: url }),
                              });
                              if (!res.ok) throw new Error("Failed to save report");
                              alert("Report submitted successfully!");
                            } catch (err) {
                              console.error(err);
                              alert("Error uploading report");
                            } finally {
                              setLoading(false);
                            }
                          }}
                          className="mt-2 w-full text-sm"
                        />
                      </td>
                      <td className="py-3 px-6">
                      
                       <button 
                       className="px-3 py-1 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600 transition"
                        onClick={()=>{
                        const id=appt?._id;
                      
                        router.push(`/prescription/${id}`)
                        }}>write</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && selectedPatient && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 w-full max-w-lg text-purple-800">
            <h2 className="text-2xl font-bold mb-4">{selectedPatient.patientName}</h2>
            <p><strong>Time:</strong> {selectedPatient.time}</p>
            <p><strong>Status:</strong> {selectedPatient.status}</p>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Set Meeting Time:</label>
                <input
                  type="time"
                  value={selectedPatient.time || ""}
                  onChange={(e) => setSelectedPatient(prev => ({ ...prev, time: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <button
                disabled={!selectedPatient.time}
                onClick={async () => {
                  const meetingLink = generateMeetingLink(selectedPatient.id);
                  try {
                    const res = await fetch("/api/updateappointment", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        appointmentId: selectedPatient.id,
                        status: "Confirmed",
                        time: selectedPatient.time,
                        meetingLink,
                      }),
                    });
                    if (!res.ok) throw new Error("Failed to save meeting link");
                    alert("Meeting link created: " + meetingLink);
                    setShowModal(false);
                  } catch (err) {
                    console.error(err);
                    alert("Error creating meeting link");
                  }
                }}
                className="w-full bg-purple-600 text-white py-2 rounded-xl hover:bg-purple-700 transition"
              >
                Create Meeting
              </button>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full bg-gray-300 text-purple-800 py-2 rounded-xl hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
