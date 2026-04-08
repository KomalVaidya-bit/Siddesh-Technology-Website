"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AiKitSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;

    if (!el) return;

    const image = el.querySelector(".kit-image");
    const content = el.querySelector(".kit-content");

    // 🔥 smooth entry animation
    gsap.fromTo(
      image,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    gsap.fromTo(
      content,
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.2, ease: "power3.out" }
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#eff6ff] py-20 px-6">
{/* 🔥 TOP HEADING SECTION */}
<div className="max-w-4xl mx-auto text-center mb-16">

  <h2 className="text-3xl md:text-4xl font-bold text-[#2F5AA8]">
    What's Included in AI and Robotics Lab for School
  </h2>

  {/* yellow underline */}
  <div className="w-24 h-1 bg-blue-500 mx-auto mt-4 mb-6 rounded"></div>

  <p className="text-[#475569] leading-relaxed">
    Step into an interactive learning journey with our AI and Robotics Lab for School,
    where students can code games and animations and learn robotics through hands-on
    activities and engaging real-world projects.
  </p>

</div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* 🔥 LEFT IMAGE */}
        <div className="kit-image relative group">
          <div className="rounded-3xl overflow-hidden shadow-xl transition duration-500 group-hover:scale-[1.02]">
            <img
              src="/ai-innovation-images/virtualimg.jpg"
              alt="AI Kit"
              className="w-full h-[350px] object-cover"
            />
          </div>

          {/* glow effect */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
        </div>

        {/* 🔥 RIGHT CONTENT */}
        <div className="kit-content">

          <h2 className="text-3xl md:text-4xl font-bold text-[#2F5AA8]">
            Smart AI & Robotics Lab
          </h2>

          {/* underline */}
          <div className="w-20 h-1 bg-blue-500 mt-3 mb-5 rounded"></div>

          <p className="text-[#475569] leading-relaxed">
            Introduce students to an exciting world of Artificial Intelligence,
            robotics, and real-world innovation. Our AI lab kits include hands-on
            tools like smart robots, IoT devices, and coding platforms that make
            learning interactive, fun, and future-ready.
          </p>

          {/* 🔥 features list */}
          <ul className="mt-6 space-y-3 text-[#1e293b]">
            <li>🚀 Easy to learn coding & robotics</li>
            <li>🤖 Hands-on AI experiments</li>
            <li>📦 Smart kits for schools</li>
            <li>🎯 Activity-based learning</li>
          </ul>

          {/* 🔥 CTA */}
          <button className="mt-8 px-6 py-3 bg-[#2F5AA8] text-white rounded-full shadow-md hover:bg-blue-700 transition">
            Explore AI Kits
          </button>

        </div>

      </div>
    </section>
  );
}