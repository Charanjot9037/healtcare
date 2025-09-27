"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadToCloudinary } from "../lib/config/uploadToCloudiary";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { FaPencilAlt } from "react-icons/fa";
export default function DoctorLandingPage() {
  const [user, setUser] = useState(null);
  const [doctorData, setDoctorData] = useState(null); // holds doctor info
  const [doctorRep, setDoctorRep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [app, setApp] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const router = useRouter();

  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
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

  // Fetch doctor profile
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      if (!user) return;
      try {
        const res = await fetch("/api/getDoctor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user }),
        });
        if (!res.ok) throw new Error("Failed to fetch doctor profile");
        const data = await res.json();
        console.log(data);
        setDoctorData(data.doctor);
      } catch (err) {
        console.error("Error fetching doctor profile:", err);
      }
    };
    fetchDoctorProfile();
  }, [user]);

  // Fetch appointments
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

  const statusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "bg-purple-200 text-purple-800";
      case "Pending":
        return "bg-yellow-200 text-yellow-900";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const generateMeetingLink = (meetingId) => {
    return `${window.location.protocol}//${window.location.host}/room/${meetingId}`;
  };

  const handleReportClick = (e) => {
    const link = e.target.value;
    if (link) window.open(link, "_blank");
  };
    const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  const filteredAppointments = app.filter((appt) => {
    const matchesSearch =
      appt.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      appt.appointmentTime?.toLowerCase().includes(search.toLowerCase()) ||
      appt.appointmentStatus?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      appt.appointmentStatus?.toLowerCase() === filter.toLowerCase();

    return matchesSearch && matchesFilter;
  });

  const fileInputRef = useRef(null);
  return (
    <div className="h-screen flex">
      {/* Sidebar Dashboard */}
      <aside className="w-72 pt-4 bg-purple-700 text-white flex flex-col  px-4 shadow-2xl">
        <div className="flex flex-col items-center">
          {doctorData?.imageUrl ? (
            <img
              src={doctorData.imageUrl}
              alt="Doctor Profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow-lg object-cover"
            />
          ) : (
            <div className="w-28 h-28 rounded-full bg-purple-500 flex items-center justify-center text-xl font-bold">
              DR
            </div>
          )}
          <h2 className="text-2xl font-bold mt-4">Doctor Panel</h2>
          <p className="text-purple-200 mt-1">{doctorData?.name || "Doctor"}</p>
          <p className="text-sm text-purple-300">
            {doctorData?.specialization || "Specialization"}
          </p>
        </div>

        <nav className="flex flex-col gap-4 mt-10">
          <button
            onClick={() => router.push("/doctor-pannel")}
            className="px-4 py-2 rounded-lg text-left hover:bg-purple-600 transition-all duration-300"
          >
            Home
          </button>

          <button
            onClick={() => router.push("/docapp")}
            className="px-4 py-2 rounded-lg text-left hover:bg-purple-600 transition-all duration-300"
          >
            Appointment
          </button>

      {doctorData ? (
            <div className="flex items-center space-x-4">
              <span className="font-medium text-yellow-200">
                Hi, {doctorData.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-purple-900 font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition duration-200"
              >
                LOGOUT
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-white text-purple-900 font-medium px-4 py-2 rounded-lg hover:bg-gray-600 hover:text-white transition duration-200 shadow-sm"
            >
              Login
            </Link>
          )}



          {/* ✅ Lottie Animation */}
          <div className="mt-5">
            <DotLottieReact
              src="https://lottie.host/6c28747a-5392-4e6e-af67-57692a6563bc/tjh7KP59pW.lottie"
              loop
              autoplay
              className="w-full h-40"
            />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-br from-white via-purple-100 to-purple-200 p-6 md:p-0">
        {!showModal && (
          <div className="w-full h-screen bg-white backdrop-blur-xl shadow-2xl p-8 md:p-1 border border-purple-200 transition-all duration-500 animate-fadeIn">
            <header className="mb-8 text-left">
              <h1 className="text-4xl font-bold text-purple-700 mb-2">
                Dr {doctorData?.name || "Doctor Name"}
              </h1>
              <p className="text-purple-600 text-xl">Today's Appointments</p>
            </header>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <input
                type="text"
                placeholder="Search by name, reason, or status..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="px-4 py-2 border text-gray-700 border-purple-300  shadow-sm w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 border border-purple-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="All">All</option>
                <option value="confirm">confirm</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            {/* Appointments Table */}
            {filteredAppointments.length === 0 ? (
              <p className="text-center text-purple-600 text-lg">
                No appointments found.
              </p>
            ) : (
              <div>
                <table className="border-2-black w-full overflow-y-auto ">
                  <thead>
                    <tr className="text-sm uppercase tracking-wide text-purple-700">
                      <th className="text-left py-3 px-6">Time</th>
                      <th className="text-left py-3 px-6">Patient</th>
                      <th className="text-left py-3 px-6">Date</th>
                      <th className="text-left py-3 px-6">Status</th>
                      <th className="text-left py-3 px-6">Test Reports</th>
                      <th className="text-left py-3 px-6">Meeting</th>
                      <th className="text-left py-3 px-6">Add Prescription</th>
                      <th className="text-left py-3 px-6">
                        Write Prescription
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {app.map((appt, idx) => (
                      <tr
                        key={appt._id || idx}
                        className="bg-white shadow-md rounded-xl transition transform duration-200 hover:bg-purple-200 "
                        style={{ transitionDelay: `${idx * 100}ms` }}
                      >
                        <td className="py-3 px-6 font-semibold">
                          {appt.appointmentTime}
                        </td>
                        <td className="py-3 px-6">{appt.firstName}</td>
                        <td className="py-3  italic">
                          {appt.appointmentDate.split("T")[0]}
                        </td>
                        <td className="py-3 px-6">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColor(
                              appt.appointmentStatus
                            )}`}
                          >
                            {appt.appointmentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-6">
                          {/* {appt?.reports?.length === 0 ? (
                            <p className="text-gray-500">No reports</p>
                          ) : (
                            <select
                              onChange={handleReportClick}
                              className="px-3 py-1 text-gray-700 border border-purple-300  shadow-sm "
                            >
                              
                              {appt.reports.map((link, i) => (
                                <option key={i} value={link}>
                                  Report {i + 1}
                                </option>
                              ))}
                            </select>
                          )} */}
                          {Array.isArray(appt.reports) &&
                          appt.reports.length > 0 ? (
                            <select
                              onChange={(e) => {
                                const link = e.target.value;
                                if (link) {
                                  window.open(link, "_blank"); // Opens the report in a new tab
                                  e.target.value = ""; // Reset select to default after opening
                                }
                              }}
                              className="px-3 py-1 text-gray-700 border border-purple-300 shadow-sm"
                            >
                              <option value="">View Report</option>
                              {appt.reports.map((link, i) => (
                                <option key={i} value={link}>
                                  Report {i + 1}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <p className="text-gray-500">No reports</p>
                          )}
                        </td>
                        <td className="py-3 px-6">
                          {/* {appt.appointmentStatus === "confirm" ? (
                            <button
                              onClick={() => router.push(appt.meetinglink)}
                              className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
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
                          )} */}
                          {appt.appointmentStatus === "confirm" ? (
  <button
    onClick={() => router.push(appt.meetinglink)}
    className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow-md hover:bg-purple-700 transition"
  >
    Join
  </button>
) : appt.appointmentStatus == "Done" ? (
  <button
    disabled
    className="px-3 py-1 bg-gray-400 text-white rounded-lg shadow-md cursor-not-allowed"
  >
    Done
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
                          <div className="flex items-center justify-center mt-2">
                            {/* Hidden file input */}
                            <input
                              type="file"
                              accept="image/*,application/pdf"
                              ref={(el) => (appt.fileInputRef = el)} // store ref per row
                              onChange={async (e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                setLoading(true);
                                try {
                                  const url = await uploadToCloudinary(file);
                                  setDoctorRep(url);

                                  const res = await fetch("/api/doctorpres", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      id: appt._id,
                                      prescription: url,
                                    }),
                                  });

                                  if (!res.ok)
                                    throw new Error("Failed to save report");
                                  alert("Report submitted successfully!");
                                } catch (err) {
                                  console.error(err);
                                  alert("Error uploading report");
                                } finally {
                                  setLoading(false);
                                }
                              }}
                              className="hidden"
                            />

                            {/* Clickable + icon */}
                            <button
                              onClick={() => appt.fileInputRef?.click()}
                              className="text-purple-600 hover:text-purple-800 bg-purple-100 hover:bg-purple-200 rounded-full p-2 flex items-center justify-center shadow-md transition"
                            >
                              <AiOutlinePlus size={24} />
                            </button>
                          </div>
                        </td>
                        <td className="py-3 px-6">
                          <button
                            className=" text-white  transition flex items-center justify-center"
                            onClick={() => {
                              const id = appt?._id;
                              router.push(`/prescription/${id}`);
                            }}
                          >
                            <FaPencilAlt
                              className="text-black hover:text-black-400"
                              size={18}
                            />
                          </button>
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
              <h2 className="text-2xl font-bold mb-4">
                {selectedPatient.patientName}
              </h2>
              <p>
                <strong>Time:</strong> {selectedPatient.time}
              </p>
              <p>
                <strong>Status:</strong> {selectedPatient.status}
              </p>

              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Set Meeting Time:
                  </label>
                  <input
                    type="time"
                    value={selectedPatient.time || ""}
                    onChange={(e) =>
                      setSelectedPatient((prev) => ({
                        ...prev,
                        time: e.target.value,
                      }))
                    }
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
                      if (!res.ok)
                        throw new Error("Failed to save meeting link");
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
      </main>
    </div>
  );
}
