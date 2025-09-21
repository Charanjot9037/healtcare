"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <header className="bg-gradient-to-r from-purple-700 to-purple-900 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <h1
          onClick={() => router.push("/homepage")}
          className="text-2xl font-bold tracking-wide cursor-pointer"
        >
          Heal <span className="text-yellow-300">Well</span>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-base font-medium">
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
              <span className="font-medium text-yellow-200">
                Hello, {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-gray-200 text-purple-900 font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-yellow-400 text-purple-900 font-medium px-4 py-2 rounded-lg hover:bg-yellow-300 transition duration-200 shadow-sm"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-purple-800 px-6 py-4 space-y-4">
          <Link
            href="/homepage"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-yellow-300"
          >
            Home
          </Link>
          <Link
            href="/userappnt/jot"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-yellow-300"
          >
            Appointments
          </Link>
          <Link
            href="#"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-yellow-300"
          >
            Reports
          </Link>

          {user ? (
            <div className="flex flex-col space-y-3">
              <span className="text-yellow-200">Hello, {user.name}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="bg-gray-200 text-purple-900 font-medium px-4 py-2 rounded-lg shadow-sm hover:bg-gray-300 transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block bg-yellow-400 text-purple-900 font-medium px-4 py-2 rounded-lg hover:bg-yellow-300 transition duration-200 shadow-sm"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
