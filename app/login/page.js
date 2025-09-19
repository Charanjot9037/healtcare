"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // Save tokens and user info
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirect by role
      if (data.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-teal-100 via-purple-50 to-blue-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Info Side */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-tr from-purple-100 to-blue-50 px-8 py-8 w-1/3">
          <img
            src="/healthcare-icon.svg"
            alt="Healthcare Icon"
            className="w-20 mb-6"
          />
          <h2 className="text-xl font-bold text-[#2D8C7B] mb-2">Welcome Back!</h2>
          <p className="text-gray-600 text-center">
            Access your account to manage your health and wellness securely.
          </p>
        </div>

        {/* Login Form */}
        <div className="w-full md:w-2/3 p-8">
          <h1 className="text-2xl font-extrabold text-[#22577A] text-center mb-2">
            HEAL WELL
          </h1>
          <h2 className="text-lg font-semibold text-[#374151] text-center mb-6">
            Login to your account
          </h2>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#374151]">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                className="input border-teal-300 rounded-lg focus:border-purple-400 text-[#3C4858] bg-white mt-1 block w-full px-4 py-2 shadow-sm disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#374151]">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                className="input border-teal-300 rounded-lg focus:border-purple-400 text-[#3C4858] bg-white mt-1 block w-full px-4 py-2 shadow-sm disabled:opacity-50"
                placeholder="••••••••"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 hover:bg-purple-600 transition-all text-white font-semibold py-2 rounded-xl shadow-md disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center text-[#6B7280] mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-[#2D8C7B] hover:underline">
              Register
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
