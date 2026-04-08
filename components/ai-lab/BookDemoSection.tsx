"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function DemoSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const left = el.querySelector(".demo-form");
    const right = el.querySelector(".demo-content");

    gsap.fromTo(
      left,
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      right,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#0284c7] text-white"
    >

      {/* 🔥 TOP HEADING */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold">
          Book your FREE Demo Today!
        </h2>

        <div className="w-24 h-1 bg-yellow-400 mx-auto mt-4 mb-6 rounded"></div>

        <p className="text-blue-100">
          Experience the power of AI and Robotics with a hands-on demo tailored
          for your school.
        </p>
      </div>

      {/* 🔥 MAIN GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT FORM */}
        <div className="demo-form bg-white/10 backdrop-blur-lg rounded-3xl p-6 shadow-2xl border border-white/20">

          <h3 className="text-xl font-semibold mb-6 text-white">
            Request your Demo
          </h3>

          <div className="space-y-4">

            <input
              type="text"
              placeholder="Full Name"
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white outline-none"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white outline-none"
            />

            <input
              type="text"
              placeholder="School / Organization"
              className="w-full p-3 rounded-lg bg-white/20 placeholder-white text-white outline-none"
            />

            <button className="w-full py-3 bg-yellow-400 text-black font-semibold rounded-lg hover:scale-105 transition">
              Submit Request
            </button>

          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div className="demo-content">

          <h3 className="text-2xl md:text-3xl font-bold">
            Experience the power of AI and Robotics
          </h3>

          <div className="w-16 h-1 bg-yellow-400 mt-3 mb-5"></div>

          <p className="text-blue-100 leading-relaxed">
            Discover a revolutionary AI ecosystem designed for schools.
            Our platform empowers students with coding, robotics, and
            hands-on learning experiences.
          </p>

          <ul className="mt-6 space-y-3 text-blue-200">
            <li>🚀 Live AI Demo Sessions</li>
            <li>🤖 Robotics Hands-on Experience</li>
            <li>📦 Smart Classroom Kits</li>
            <li>🎯 Activity-based Learning</li>
          </ul>

        </div>

      </div>
    </section>
  );
}