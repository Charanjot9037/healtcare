// app/page.tsx  (Next.js 13+ App Router)
// or pages/index.js (Next.js Pages Router)

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
export default function HomePage() {
  // ----- Slider -----
  const slides = [
    { img: "/images/images.jpeg", caption: "Say No To Drugs" },
    { img: "/images/anti2.jpg", caption: "Choose Health Over Drugs" },
    { img: "/images/anti3.jpg", caption: "Drug-Free Life, Healthy Life" },
  ];

  const [current, setCurrent] = useState(0);
  const length = slides.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 4000);
    return () => clearInterval(interval);
  }, [length]);

  // ----- Doctor Cards -----
  const doctors = [
    {
      id: 1,
      name: "Dr. John Smith",
      specialty: "Cardiologist",
      img: "/images/doctor1.jpg",
    },
    {
      id: 2,
      name: "Dr. Emily Johnson",
      specialty: "Neurologist",
      img: "/images/doctor2.jpg",
    },
    {
      id: 3,
      name: "Dr. Rahul Sharma",
      specialty: "Orthopedic Surgeon",
      img: "/images/doctor3.jpg",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header / Navbar */}
      <header className="bg-purple-700 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Drug Management System</h1>
          <nav className="space-x-6">
            <Link href="/homepage" className="hover:text-yellow-300">Home</Link>
         <Link href="/admin" className="hover:text-yellow-300">Admin</Link>
            <Link href="#" className="hover:text-yellow-300">Appointments</Link>
            <Link href="#" className="hover:text-yellow-300">Reports</Link>
            <Link href="/login" className="hover:text-yellow-300">Login</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section with Slider */}
      <section className="relative w-full h-[400px] overflow-hidden shadow bg-white">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000  ${
              idx === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.img}
              alt={slide.caption}
              className="w-full h-full object-cover bg-white"
            />
            <div className="absolute inset-0 bg-white text-purple bg-opacity-50 flex items-center justify-center">
              <h2 className="text-purple text-3xl md:text-5xl font-bold">
                {slide.caption}
              </h2>
            </div>
          </div>
        ))}
      </section>

      {/* Doctors Section */}
      <section className="container mx-auto px-6 py-12">
        <h3 className="text-2xl font-semibold mb-6 text-center">Our Doctors</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center"
            >
              <img
                src={doc.img}
                alt={doc.name}
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
              <h4 className="text-lg font-bold text-gray-800">{doc.name}</h4>
              <p className="text-gray-600 mb-4">{doc.specialty}</p>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow">
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-700 text-white text-center py-4 mt-10">
        <p>© 2025 Drug Management System | All Rights Reserved</p>
      </footer>
    </div>
  );
}
