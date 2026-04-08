// "use client";

// export default function AutoScrollCards() {
//   const cards = [
//     {
//       title: "AI Classroom Setup",
//       img: "/ai-innovation-images/test.jpg",
//       desc: "Modern AI learning environment for students.",
//     },
//     {
//       title: "Robotics Lab",
//       img: "/ai-innovation-images/imagelab.jpg",
//       desc: "Hands-on robotics experience.",
//     },
//     {
//       title: "Coding Workshop",
//       img: "/ai-innovation-images/virtualimg.jpg",
//       desc: "Interactive coding sessions.",
//     },
//     {
//       title: "STEM Lab",
//       img: "/ai-innovation-images/sciencewall.jpg",
//       desc: "Explore STEM concepts visually.",
//     },
//   ];

//   return (
//     <section className="bg-white py-20 overflow-hidden">

//       {/* 🔥 HEADING */}
//       <div className="text-center mb-12">
//         <h2 className="text-3xl md:text-4xl font-bold text-[#2F5AA8]">
//           Our AI and Innovation Lab Setup in Schools
//         </h2>
//         <div className="w-24 h-1 bg-blue-500 mx-auto mt-4"></div>
//       </div>

//       {/* 🔥 SCROLL AREA */}
//       <div className="relative overflow-hidden">

//         <div className="flex gap-8 w-max animate-scroll-left">

//           {/* 🔁 DOUBLE for infinite loop */}
//           {[...cards, ...cards].map((card, index) => (
//             <div
//               key={index}
//               className="min-w-[300px] bg-white rounded-2xl shadow-lg overflow-hidden"
//             >
//               <img
//                 src={card.img}
//                 className="w-full h-48 object-cover"
//               />

//               <div className="p-4">
//                 <h3 className="font-semibold text-[#1e293b]">
//                   {card.title}
//                 </h3>
//                 <p className="text-sm text-[#64748b] mt-2">
//                   {card.desc}
//                 </p>
//               </div>
//             </div>
//           ))}

//         </div>

//       </div>

//     </section>
//   );
// }




"use client";

import { useEffect, useRef } from "react";

export default function AutoScrollCards() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  let interval: any;

  const cards = [
  {
    title: "AI Classroom",
    desc: "Modern smart classroom with AI tools and interactive boards.",
    img: "/ai-innovation-images/test.jpg",
  },
  {
    title: "Robotics Lab",
    desc: "Hands-on robotics kits for real-world learning experience.",
    img: "/ai-innovation-images/imagelab.jpg",
  },
  {
    title: "Coding Workshop",
    desc: "Students learn coding through fun and interactive projects.",
    img: "/ai-innovation-images/virtualimg.jpg",
  },
  {
    title: "STEM Lab",
    desc: "Explore science, tech, engineering with practical activities.",
    img: "/ai-innovation-images/sciencewall.jpg",
  },
];

  // 🔥 FAST AUTO SCROLL
  useEffect(() => {
  const el = scrollRef.current;
  if (!el) return;

  let speed = 1; // 🔥 adjust speed here
  let rafId;

  const startScroll = () => {
    el.scrollLeft += speed;

    // infinite loop fix
    if (el.scrollLeft >= el.scrollWidth / 2) {
      el.scrollLeft = 0;
    }

    rafId = requestAnimationFrame(startScroll);
  };

  startScroll();

  // cleanup
  return () => cancelAnimationFrame(rafId);
}, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="bg-white py-20">

      {/* 🔥 HEADING + PARAGRAPH */}
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-[#2F5AA8]">
          Our AI and Robotics Lab Setup
        </h2>

        <div className="w-24 h-1 bg-blue-400 mx-auto mt-3 mb-4"></div>

        <p className="text-[#475569] leading-relaxed">
          Explore how schools are transforming learning with AI and robotics labs.
          These setups provide hands-on experience, real-world applications, and
          innovative tools to make students future-ready.
        </p>
      </div>

      <div className="relative">

  {/* LEFT BUTTON */}
  <button
    onClick={scrollLeft}
    className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-[#2F5AA8] text-white p-3 rounded-full shadow-lg hover:bg-[#3B6CC4]"
  >
    ←
  </button>

  {/* RIGHT BUTTON */}
  <button
    onClick={scrollRight}
    className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-[#2F5AA8] text-white p-3 rounded-full shadow-lg hover:bg-[#3B6CC4]"
  >
    →
  </button>

  {/* 🔥 SCROLL CONTAINER */}
  <div
    ref={scrollRef}
    className="flex gap-4 md:gap-6 overflow-x-auto no-scrollbar px-4 md:px-10 whitespace-nowrap"
  >
    {[...cards, ...cards].map((card, index) => (
      
      <div
        key={index}
        className="min-w-[240px] sm:min-w-[260px] md:min-w-[300px] flex-shrink-0 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
      >
        
        {/* IMAGE */}
        <img
          src={card.img}
          className="w-full h-40 sm:h-44 md:h-48 object-cover"
        />

        {/* CONTENT */}
        <div className="p-3 sm:p-4">
          
          {/* TITLE */}
          <h3 className="font-semibold text-[#1e293b] text-base sm:text-lg">
            {card.title}
          </h3>

          {/* SUBTEXT */}
          <p className="text-xs sm:text-sm text-[#64748b] mt-2 leading-relaxed">
            {card.desc}
          </p>

        </div>

      </div>

    ))}
  </div>

</div>
    </section>
  );
}