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
    <header className="bg-purple-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Heal Well</h1>
        <nav className="space-x-6 flex items-center">
          <Link href="/homepage" className="hover:text-yellow-300">
            Home
          </Link>
       
          <Link href="/userappnt/jot" className="hover:text-yellow-300">
            Appointments
          </Link>
          <Link href="#" className="hover:text-yellow-300">
            Reports
          </Link>

          {user ? (
            <>
              <span className="font-semibold text-yellow-200">
                hello, 
                       {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:text-yellow-300">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
