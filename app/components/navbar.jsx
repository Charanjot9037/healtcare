"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import Image from "next/image";


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
    <header className="bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center ">
        {/* Logo */}
       <div className="flex items-center ml-2 cursor-pointer" onClick={() => router.push("/homepage")}>
  <Image
    src="/images/logo.png"       
    alt="HealWell Logo"
    width={100}            
    height={10}            
    className="object-contain"
  />
</div>
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center mr-10 space-x-8 text-base font-medium">
          <Link
            href="/"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            HOME
          </Link>
            <Link
            href="/task"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            DAILY TASK
          </Link>
          <Link
            href="/userappnt"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            APPOINTMENSTS
          </Link>
          <Link
            href="/userreport"
            className="hover:text-yellow-300 transition-colors duration-200"
          >
            DOCUMENTS
          </Link>

          {user ? (
            <div className="flex items-center space-x-4">
              <span className="font-medium text-yellow-200">
                Hi, {user.name}
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
