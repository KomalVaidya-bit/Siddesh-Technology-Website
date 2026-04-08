"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function AiKitSectionReverse() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const image = el.querySelector(".kit-image");
    const content = el.querySelector(".kit-content");

    // 🔥 opposite animation
    gsap.fromTo(
      content,
      { x: -80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );

    gsap.fromTo(
      image,
      { x: 80, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.2 }
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#eff6ff] py-20 px-6 -m--t-10">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* 🔥 LEFT TEXT */}
        <div className="kit-content">

          <h3 className="text-2xl md:text-3xl font-bold text-[#2F5AA8]">
            Interactive Learning Experience
          </h3>

          <div className="w-16 h-1 bg-blue-500 mt-3 mb-5 rounded"></div>

          <p className="text-[#475569] leading-relaxed">
            Empower students with hands-on AI and robotics learning. This lab
            helps them explore coding, automation, and real-world problem solving
            through engaging activities and smart tools.
          </p>

          <ul className="mt-6 space-y-3 text-[#1e293b]">
            <li>🚀 Practical learning approach</li>
            <li>🤖 Build real-world projects</li>
            <li>📦 Smart classroom kits</li>
            <li>🎯 Future-ready skills</li>
          </ul>
 {/* 🔥 CTA */}
          <button className="mt-8 px-6 py-3 bg-[#2F5AA8] text-white rounded-full shadow-md hover:bg-blue-700 transition">
            Explore AI Kits
          </button>

        </div>

        {/* 🔥 RIGHT IMAGE */}
        <div className="kit-image relative group">
          <div className="rounded-3xl overflow-hidden shadow-xl transition duration-500 group-hover:scale-[1.02]">
            <img
              src="/ai-innovation-images/test.jpg"
              alt="AI Lab"
              className="w-full h-[350px] object-cover"
            />
          </div>

          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition"></div>
        </div>

      </div>
    </section>
  );
}