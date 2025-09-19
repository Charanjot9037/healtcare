"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data.user));

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
    <div className="min-h-[90vh] flex items-center justify-center bg-purple-50">
      <div className="bg-white shadow-2xl rounded-2xl overflow-hidden flex w-full max-w-5xl transform hover:scale-[1.01] transition-transform duration-300">
        {/* Left side: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center space-y-5">
          <h1 className="text-3xl font-extrabold text-purple-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600 mb-6">
            Enter your credentials to access your account
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-purple-700">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                placeholder="you@example.com"
                className="w-full px-4 py-3 mt-2 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:scale-[1.02] transition-transform duration-200 hover:shadow-md disabled:opacity-50"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-purple-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                disabled={loading}
                placeholder="••••••••"
                className="w-full px-4 py-3 mt-2 border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:scale-[1.02] transition-transform duration-200 hover:shadow-md disabled:opacity-50"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 transition-all text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-6">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="text-purple-600 font-semibold hover:underline"
            >
              Register
            </a>
          </p>
        </div>

        {/* Right side: Animation */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-purple-100 via-purple-200 to-purple-50 items-center justify-center transform hover:scale-[1.03] transition-transform duration-500 shadow-inner">
          <DotLottieReact
            src="https://lottie.host/0262f4de-bf75-47e2-8d7a-5417fcade979/4MF8v2RSm8.lottie"
            loop
            autoplay
            style={{ width: 300, height: 300 }}
          />
        </div>
      </div>
    </div>
  );
}
