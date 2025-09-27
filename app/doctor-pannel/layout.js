"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function DoctorLayout({ children }) {
  const [user, setUser] = useState(null);
  const [doctorData, setDoctorData] = useState(null);
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

  // Fetch doctor profile
  useEffect(() => {
    const fetchDoctorProfile = async () => {
      if (!user) return;
      try {
        const res = await fetch("/api/getDoctor", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ doctorId: user }),
        });
        if (!res.ok) throw new Error("Failed to fetch doctor profile");
        const data = await res.json();
        setDoctorData(data.doctor);
      } catch (err) {
        console.error("Error fetching doctor profile:", err);
      }
    };
    fetchDoctorProfile();
  }, [user]);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-72 bg-purple-700 text-white flex flex-col py-8 px-4 shadow-2xl">
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
            onClick={() => router.push("/doctor/home")}
            className="px-4 py-2 rounded-lg text-left hover:bg-purple-600 transition-all duration-300"
          >
            Home
          </button>
          <button
            onClick={() => router.push("/app/doctor-pannel")}
            className="px-4 py-2 rounded-lg text-left hover:bg-purple-600 transition-all duration-300"
          >
            Patient
          </button>
          <button
            onClick={() => router.push("/doctor/appointment")}
            className="px-4 py-2 rounded-lg text-left hover:bg-purple-600 transition-all duration-300"
          >
            Appointment
          </button>

          {/* Lottie Animation */}
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
      <main className="flex-1 bg-gradient-to-br from-white via-purple-100 to-purple-200 p-6 md:p-8">
        {children}
      </main>
    </div>
  );
}
