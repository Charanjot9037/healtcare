"use client";

import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function DoctorsIntroSection() {
  return (
    <section className="container mx-auto px-6 py-16 flex flex-col md:flex-row items-center gap-12">
      {/* Left Side - Lottie Animation */}
      <div className="md:w-1/2 mr-20 flex justify-center items-center">
        <DotLottieReact
          src="https://lottie.host/6c28747a-5392-4e6e-af67-57692a6563bc/tjh7KP59pW.lottie"
          loop={true}
          autoplay={true}
          className="w-80 h-80 md:w-[350px] md:h-[350px]"
        />
      </div>

      {/* Right Side - Text About Doctors */}
      <div className="md:w-1/2 space-y-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-purple-700 leading-snug">
          Meet Our Dedicated Doctors
        </h2>
        <p className="text-gray-700 text-justify text-lg leading-relaxed mr-[100px]">
          Our team of experienced and compassionate doctors is committed to helping 
          individuals overcome drug addiction and reclaim their lives. With personalized 
          care and professional guidance, we support every patient on their journey 
          to recovery.
        </p>
        <p className="text-gray-700 text-justify text-lg leading-relaxed mr-[100px]">
          We specialize in evidence-based treatment methods, ensuring a safe and 
          supportive environment. Our doctors not only treat addiction but also 
          educate and empower patients to maintain long-term sobriety.
        </p>
      </div>
    </section>
  );
}
