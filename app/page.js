
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
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

  // ----- Doctors (from API) -----
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

  // ----- Appointments (dummy for now) -----
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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header / Navbar */}
      <header className="bg-purple-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Heal Well</h1>
          <nav className="space-x-6">
            <Link href="/homepage" className="hover:text-yellow-300">Home</Link>
            <Link href="/admin" className="hover:text-yellow-300">Admin</Link>
            <Link href="/userappnt/jot" className="hover:text-yellow-300">Appointments</Link>
            <Link href="#" className="hover:text-yellow-300">Reports</Link>
            <Link href="/login" className="hover:text-yellow-300">Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section with Slider */}
      <section className="relative w-full h-[600px] overflow-hidden shadow bg-white">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.img}
              alt={slide.caption}
              width={1200}
              height={800}
              className="w-full h-full object-cover"
              priority={idx === current}
            />
          </div>
        ))}

        {/* Slider Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full ${
                idx === current ? "bg-purple-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Doctors Section */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl text-purple-600 font-semibold mb-6 text-center">
          Our Doctors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.length === 0 ? (
            <p className="text-center text-gray-500 col-span-3">
              No doctors available.
            </p>
          ) : (
            doctors.map((doc) => (
              <div
                key={doc._id}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center"
              >
                <Image
                  src={doc.imageUrl}
                  alt={doc.name}
                  width={400}
                  height={400}
                  className="w-full h-[350px] object-cover rounded-xl"
                />
                <h4 className="text-lg font-bold text-gray-800">{doc.name}</h4>
                <p className="text-gray-600 mb-2">{doc.specialization}</p>
                <p className="text-gray-500 mb-4">Fees: ₹{doc.fees}</p>
                {/* <Link
                  href="/appointment"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow"
                >
                  Book Appointment
                </Link> */}
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
  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow"
>
  Book Appointment
</Link>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Appointment Table */}
      <div className="bg-white shadow rounded-xl p-4">
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
              <tr key={pat.appointmentId} className="text-black">
                <td className="py-2">{pat.appointmentId}</td>
                <td>{pat.doctorName}</td>
                <td>{pat.date}</td>
                <td>{pat.startTime}</td>
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
                    disabled={pat.status !== "Confirmed"}
                    onClick={() => router.push("/meeting")}
                    className={`bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-xs shadow transition
                      ${pat.status !== "Confirmed" ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    Join
                  </button>
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
    </div>
  );
}
