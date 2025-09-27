"use client";

import React from "react";
import Image from "next/image";
// import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-700 to-purple-900 text-white py-10">
      <div className="container mx-auto flex flex-col items-center gap-6 px-6">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          {/* Replace logo.png with your actual file path in /public folder */}
          <Image
            src="/images/logo2.png"
            alt="Heal Well Logo"
            width={100}
            height={100}
            className="object-contain"
          />
          <span className="font-bold text-2xl">HEAL </span><span className="text-yellow-200 font-bold text-2xl">WELL</span>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap justify-center gap-8 text-sm md:text-base">
          <a href="/" className="hover:text-gray-400 transition">HOME</a>
          <a href="#" className="hover:text-gray-400 transition">VIEW PROGRESS</a>
          <a href="/userappnt" className="hover:text-gray-400 transition">APPOINTMENTS</a>
          <a href="/userreport" className="hover:text-gray-400 transition">DOCUMENTS</a>
        
        </div>

        {/* Social Media Icons */}
        {/* <div className="flex gap-6 text-xl">
          <a href="#" className="hover:text-gray-400 transition"><FaFacebookF /></a>
          <a href="#" className="hover:text-gray-400 transition"><FaXTwitter /></a>
          <a href="#" className="hover:text-gray-400 transition"><FaInstagram /></a>
          <a href="#" className="hover:text-gray-400 transition"><FaLinkedinIn /></a>
        </div> */}
      </div>
    </footer>
  );
}
