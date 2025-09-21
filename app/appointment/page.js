"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function AppointmentManagement() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const searchParams = useSearchParams();
  const doctorName = searchParams.get("name");
  const specialization = searchParams.get("specialization");
  const imageUrl = searchParams.get("imageUrl");
  const doctorId = searchParams.get("id");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    dob: "",
    gender: "",
    appointmentDate: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!user?.id) {
    alert("⚠️ User not found. Please log in again.");
    return;
  }

  try {
    const payload = {
      ...formData,
      doctorId,
      userID: user.id,
      doctorName,
      specialization,
    };

    // 1️⃣ Create Checkout Session from backend
    const res = await fetch("/api/stripe/create-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const { id } = await res.json();

    if (!id) {
      alert("❌ Could not start payment");
      return;
    }

    // 2️⃣ Redirect to Stripe Checkout
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: id });
  } catch (error) {
    console.error(error);
    alert("❌ Something went wrong");
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-pink-100 to-indigo-200 flex justify-center items-start py-12 px-4">
      <div className="w-full max-w-3xl bg-white/40 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-8 md:p-12 transition-all">
        {/* Page Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-purple-700 drop-shadow-md">
            Book Your Appointment
          </h1>
          <p className="text-gray-700 mt-2 md:text-lg">
            Fill in your details to confirm an appointment with your doctor.
          </p>
        </div>

        {/* Doctor Info Card */}
        <div className="flex items-center gap-4 border rounded-2xl p-4 mb-8 bg-purple-50/60 backdrop-blur-md shadow-md hover:shadow-xl transition">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={doctorName}
              width={100}
              height={100}
              className="rounded-xl object-cover shadow-lg"
            />
          )}
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{doctorName}</h2>
            <p className="text-purple-600 font-medium">{specialization}</p>
          </div>
        </div>

        {/* Appointment Form */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black">
          {[
            { label: "First Name", name: "firstName", type: "text", required: true },
            { label: "Last Name", name: "lastName", type: "text", required: true },
            { label: "Email Address", name: "email", type: "email", required: true },
            { label: "Mobile Number", name: "mobile", type: "text", required: true },
            { label: "Date of Birth", name: "dob", type: "date" },
            {
              label: "Gender",
              name: "gender",
              type: "select",
              options: ["Male", "Female", "Other"],
            },
            { label: "Appointment Date", name: "appointmentDate", type: "date", required: true },
          ].map((field, idx) => (
            <div key={idx}>
              <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-3 py-2 focus:outline-purple-500 focus:ring focus:ring-purple-200 backdrop-blur-sm"
                >
                  <option value="">Select {field.label.toLowerCase()}</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                  required={field.required}
                  className="w-full border rounded-xl px-3 py-2 focus:outline-purple-500 focus:ring focus:ring-purple-200 backdrop-blur-sm"
                />
              )}
            </div>
          ))}

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              name="address"
              placeholder="Enter your complete address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 focus:outline-purple-500 focus:ring focus:ring-purple-200 backdrop-blur-sm"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-lg transition-all duration-300"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
