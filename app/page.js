"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Script from "next/script";
import Navbar from "./components/navbar";

export default function HomePage() {
  const handleReportClick = (e) => {
    const link = e.target.value;
    if (link) {
      window.open(link, "_blank"); // open in new tab
    }
  };

  // ----- Slider -----
  const slides = [
    { img: "/images/image4.png", caption: "Say No To Drugs" },
    { img: "/images/image2.png", caption: "Choose Health Over Drugs" },
    { img: "/images/image3.png", caption: "Drug-Free Life, Healthy Life" },
  ];

  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 4000);
    return () => clearInterval(interval);
  }, [length]);

  // ----- Doctors -----
  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await fetch("/api/doctors");
        const data = await res.json();
        setDoctors(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  // ----- User -----
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

  // ----- Appointments -----
  const [app, setApp] = useState([]);
  const dummyAppointments = [
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
      doctorreports: [], // ensure dummy has doctorreports
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
      doctorreports: [],
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
      doctorreports: [],
    },
  ];

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
        setApp(dummyAppointments);
      }
    };

    fetchAppointment();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full min-h-[600px] flex flex-col md:flex-row items-center justify-between bg-white text-gray-800 px-6 md:px-20 py-12 md:py-16">
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-purple-600 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm">
            Towards a Healthy Future
            <br /> Drug-Free Society
          </h1>
          <p className="text-lg md:text-xl text-gray-600 font-light max-w-md mx-auto md:mx-0">
            Trusted healthcare solutions with a commitment to a society free from
            harmful substances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mt-6">
            <Link
              href="/about"
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold rounded-full shadow hover:opacity-90 transition text-center"
            >
              Learn More
            </Link>
            <Link
              href="/ecommerce"
              className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-full hover:bg-purple-600 hover:text-white transition text-center"
            >
              Take Action
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center mt-10 md:mt-0">
          <dotlottie-wc
            src="https://lottie.host/2561448b-e814-4774-b182-0d498df57687/5Oyo7vYty0.lottie"
            style={{ width: "600px", height: "600px" }}
            autoplay
            loop
          ></dotlottie-wc>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl text-purple-700 font-semibold mb-6 text-center">
          Our Doctors
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {doctors.length === 0 ? (
            <p className="text-center text-gray-500 col-span-3">
              No doctors available.
            </p>
          ) : (
            doctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center border border-gray-100"
              >
                <Image
                  src={doc.imageUrl}
                  alt={doc.name}
                  width={400}
                  height={400}
                  className="w-full h-[300px] object-cover rounded-xl"
                />
                <h4 className="text-lg font-bold text-gray-800 mt-3">{doc.name}</h4>
                <p className="text-gray-600 mb-2">{doc.specialization}</p>
                <p className="text-gray-500 mb-4">Fees: ₹{doc.fees}</p>
                <Link
                  href={{
                    pathname: "/appointment",
                    query: {
                      name: doc.name,
                      specialization: doc.specialization,
                      imageUrl: doc.imageUrl,
                      id: doc._id,
                    },
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow text-sm"
                >
                  Book Appointment
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Appointment Table */}
      <div className="bg-white shadow rounded-xl p-4 container mx-auto mb-10 overflow-x-auto">
        <h3 className="text-xl font-semibold text-purple-700 mb-4">
          My Appointments
        </h3>
        <table className="w-full text-sm min-w-[600px]">
          <thead>
            <tr className="text-left border-b text-gray-600">
              <th className="py-2">ID</th>
              <th>Doctor Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Meeting</th>
              <th>Doctor Report</th>
            </tr>
          </thead>
          <tbody>
            {app.map((pat, index) => (
              <tr key={index} className="text-black">
                <td className="py-2">{index + 1}</td>
                <td>{pat.doctorName}</td>
                <td>{pat?.appointmentDate?.split("T")[0] || "N/A"}</td>
                <td>{pat.appointmentTime || "N-A"}</td>
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
                    {pat?.appointmentStatus}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => router.push(`${pat.meetinglink}`)}
                    className={`bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-xs shadow transition ${
                      pat.appointmentStatus !== "confirm"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    Join
                  </button>
                </td>
                <td>
                  <div className="flex flex-col space-y-2">
                    {(!pat?.doctorreports || pat.doctorreports.length === 0) ? (
                      <p className="text-gray-500">No reports</p>
                    ) : (
                      <select
                        onChange={handleReportClick}
                        className="p-2 border rounded-lg shadow-sm"
                      >
                        <option value="">View Report</option>
                        {pat.doctorreports.map((link, idx) => (
                          <option key={idx} value={link}>
                            Report {idx + 1}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <footer className="bg-purple-700 text-white text-center py-4 mt-10">
        <p>© 2025 Drug Management System | All Rights Reserved</p>
      </footer>

      {/* ✅ Lottie Script */}
      <Script
        src="https://unpkg.com/@lottiefiles/dotlottie-wc@0.8.1/dist/dotlottie-wc.js"
        type="module"
        strategy="afterInteractive"
      />
    </div>
  );
}
