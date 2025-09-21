"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in (from localStorage)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login"); // redirect to login after logout
  };

  return (
    <header className="bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo / Brand */}
        <h1 className="text-2xl font-extrabold tracking-wide cursor-pointer">
          Heal <span className="text-yellow-300">Well</span>
        </h1>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-8 text-lg font-medium">
          <Link
            href="/homepage"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            href="/userappnt/jot"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Appointments
          </Link>
          <Link
            href="#"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            Reports
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="font-semibold text-yellow-200">
                Hello, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow-md transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-yellow-400 text-purple-900 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition duration-200 shadow-md"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
