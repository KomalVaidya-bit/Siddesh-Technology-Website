// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export default function TechFocusSection() {
//   const sectionRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const cards = gsap.utils.toArray(".tech-card");

//     // 🔥 Scroll Animation
//     gsap.from(cards, {
//       y: 100,
//       opacity: 0,
//       duration: 1,
//       stagger: 0.2,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top 85%",
//       },
//     });

//     // 🔥 Parallax Effect
//     gsap.to(cards, {
//       y: (i) => (i % 2 === 0 ? -30 : -60),
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top bottom",
//         end: "bottom top",
//         scrub: true,
//       },
//     });

//     // 🔥 3D Tilt Effect
//     const cardElements = document.querySelectorAll(".tech-card");

//     cardElements.forEach((card) => {
//       const el = card as HTMLElement;

//       el.addEventListener("mousemove", (e: MouseEvent) => {
//         const rect = el.getBoundingClientRect();

//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;

//         const rotateX = -(y - rect.height / 2) / 20;
//         const rotateY = (x - rect.width / 2) / 20;

//         el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
//       });

//       el.addEventListener("mouseleave", () => {
//         el.style.transform = "rotateX(0) rotateY(0) scale(1)";
//       });
//     });

//   }, []);

//   return (
//     <section ref={sectionRef} className="bg-[#eff6ff] py-16 px-4">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
//           Technologies in Focus for Inclusive AI Innovation
//         </h2>

//         <p className="mt-4 text-[#475569] max-w-3xl mx-auto">
//           Learn cutting-edge technologies through hands-on kits and real-world applications.
//         </p>
//       </div>

//       {/* CARDS */}
//       <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

//         {[
//           "Coding - Graphical & Python",
//           "Self Driving Technology",
//           "Robotics with AI",
//           "AI and Machine Learning",
//           "STEM and Tinkering",
//           "Industry and Automation",
//         ].map((title, index) => (
//           <div
//             key={index}
//             className="tech-card bg-white rounded-2xl shadow-md overflow-hidden transition duration-300 transform perspective-[1000px] hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)]"
//           >
//             <img
//               src="/ai-innovation-images/virtualimg.jpg"
//               alt="tech"
//               className="w-full h-48 object-cover transition duration-500 hover:scale-110"
//             />
            

//             <div className="p-4 text-center font-semibold text-[#1e293b]">
//               {title}
//             </div>
//           </div>
//         ))}

//       </div>
//     </section>
//   );
// }











// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// export default function TechFocusSection() {
//   const sectionRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const cards = gsap.utils.toArray(".tech-card");

//     gsap.from(cards, {
//       y: 100,
//       opacity: 0,
//       duration: 1,
//       stagger: 0.2,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top 85%",
//       },
//     });

//     gsap.to(cards, {
//       y: (i) => (i % 2 === 0 ? -30 : -60),
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top bottom",
//         end: "bottom top",
//         scrub: true,
//       },
//     });

//     const cardElements = document.querySelectorAll(".tech-card");

//     cardElements.forEach((card) => {
//       const el = card as HTMLElement;

//       el.addEventListener("mousemove", (e: MouseEvent) => {
//         const rect = el.getBoundingClientRect();

//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;

//         const rotateX = -(y - rect.height / 2) / 20;
//         const rotateY = (x - rect.width / 2) / 20;

//         el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
//       });

//       el.addEventListener("mouseleave", () => {
//         el.style.transform = "rotateX(0) rotateY(0) scale(1)";
//       });
//     });

//   }, []);

//   // 🔥 YAHAN IMAGES + TEXT DEFINE KARO
//   const cardsData = [
//     {
//       title: "Iot Lab",
//       img: "/ai-innovation-images/imagelab.jpg",
//     },
//     {
//       title: "Science Lab",
//       img: "/ai-innovation-images/receiptionimg.jpg",
//     },
//     {
//       title: "Science wall",
//       img: "/ai-innovation-images/sciencewall.jpg",
//     },
//     {
//       title: "AI and Machine Learning",
//       img: "/ai-innovation-images/virtualimg.jpg",
//     },
//     {
//       title: "Science Wall",
//       img: "/ai-innovation-images/sciencewall.jpg",
//     },
//     {
//       title: "Iot Lab",
//       img: "/ai-innovation-images/imagelab.jpg",
//     },
//   ];

//   return (
//     <section ref={sectionRef} className="bg-[#eff6ff] py-16 px-4">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
//           Technologies in Focus for Inclusive AI Education
//         </h2>

//         <p className="mt-4 text-[#475569] max-w-3xl mx-auto">
//           Learn cutting-edge technologies through hands-on kits and real-world applications.
//         </p>
//       </div>

//       <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

//         {cardsData.map((card, index) => (
//           <div
//             key={index}
//             className="tech-card bg-white rounded-2xl shadow-md overflow-hidden transition duration-300 transform perspective-[1000px] hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)]"
//           >
//             <img
//               src={card.img}
//               alt={card.title}
//               className="w-full h-48 object-cover transition duration-500 hover:scale-110"
//             />

//             <div className="p-4 text-center font-semibold text-[#1e293b]">
//               {card.title}
//             </div>
//           </div>
//         ))}

//       </div>
//     </section>
//   );
// }






// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import Image from "next/image";

// export default function TechFocusSection() {
//   const sectionRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const cards = gsap.utils.toArray(".tech-card");

//     gsap.from(cards, {
//       y: 100,
//       opacity: 0,
//       duration: 1,
//       stagger: 0.2,
//       ease: "power3.out",
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top 85%",
//       },
//     });

//     gsap.to(cards, {
//       y: (i) => (i % 2 === 0 ? -30 : -60),
//       scrollTrigger: {
//         trigger: sectionRef.current,
//         start: "top bottom",
//         end: "bottom top",
//         scrub: true,
//       },
//     });

//     const cardElements = document.querySelectorAll(".tech-card");

//     cardElements.forEach((card) => {
//       const el = card as HTMLElement;

//       const handleMove = (e: MouseEvent) => {
//         const rect = el.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;

//         const rotateX = -(y - rect.height / 2) / 20;
//         const rotateY = (x - rect.width / 2) / 20;

//         el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
//       };

//       const handleLeave = () => {
//         el.style.transform = "rotateX(0) rotateY(0) scale(1)";
//       };

//       el.addEventListener("mousemove", handleMove);
//       el.addEventListener("mouseleave", handleLeave);

//       // cleanup
//       return () => {
//         el.removeEventListener("mousemove", handleMove);
//         el.removeEventListener("mouseleave", handleLeave);
//       };
//     });

//   }, []);

//   // ✅ CLEAN IMAGE PATHS (MAKE SURE FILE NAMES MATCH EXACTLY)
//   const cardsData = [
//     {
//       title: "Iot Lab",
//       img: "/ai-innovation-images/imagelab.jpg",
//     },
//     {
//       title: "Science Lab",
//       img: "/ai-innovation-images/receptionimg.jpg", // ⚠️ spelling check
//     },
//     {
//       title: "Science Wall",
//       img: "/ai-innovation-images/sciencewall.jpg",
//     },
//     {
//       title: "AI and Machine Learning",
//       img: "/ai-innovation-images/virtualimg.jpg",
//     },
//     {
//       title: "STEM",
//       img: "/ai-innovation-images/img5.jpg", // optional replace
//     },
//     {
//       title: "Automation",
//       img: "/ai-innovation-images/img6.jpg", // optional replace
//     },
//   ];

//   return (
//     <section ref={sectionRef} className="bg-[#eff6ff] py-16 px-4">
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
//           Technologies in Focus for Inclusive AI Education
//         </h2>

//         <p className="mt-4 text-[#475569] max-w-3xl mx-auto">
//           Learn cutting-edge technologies through hands-on kits and real-world applications.
//         </p>
//       </div>

//       <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

//         {cardsData.map((card, index) => (
//           <div
//             key={index}
//             className="tech-card bg-white rounded-2xl shadow-md overflow-hidden transition duration-300 transform perspective-[1000px] hover:shadow-[0_20px_50px_rgba(37,99,235,0.25)]"
//           >
//             {/* ✅ Next Image FIX */}
//             <div className="relative w-full h-48">
//               <Image
//                 src={card.img}
//                 alt={card.title}
//                 fill
//                 unoptimized
//                 className="object-cover transition duration-500 hover:scale-110"
//               />
//             </div>

//             <div className="p-4 text-center font-semibold text-[#1e293b]">
//               {card.title}
//             </div>
//           </div>
//         ))}

//       </div>
//     </section>
//   );
// }


// "use client";

// import { useEffect, useRef } from "react";

// export default function TechFocusSection() {
//   const sectionRef = useRef<HTMLDivElement | null>(null);

//   // ❌ GSAP temporarily hata diya (pehle UI fix karte hain)

//   const cardsData = [
//     { title: "Iot Lab", img: "/ai-innovation-images/test.jpg" },
//     { title: "Science Lab", img: "/ai-innovation-images/test.jpg" },
//     { title: "Science Wall", img: "/ai-innovation-images/test.jpg" },
//     { title: "AI ML", img: "/ai-innovation-images/test.jpg" },
//     { title: "STEM", img: "/ai-innovation-images/test.jpg" },
//     { title: "Automation", img: "/ai-innovation-images/test.jpg" },
//   ];

//   return (
//     <section ref={sectionRef} className="bg-[#eff6ff] py-16 px-4">
      
//       <div className="max-w-6xl mx-auto text-center">
//         <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
//           Technologies in Focus for Inclusive AI Education
//         </h2>

//         <p className="mt-4 text-[#475569] max-w-3xl mx-auto">
//           Learn cutting-edge technologies through hands-on kits and real-world applications.
//         </p>
//       </div>

//       {/* 🔥 CARDS GRID */}
//       <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

//         {cardsData.map((card, index) => {
//           return (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow p-2"
//             >
//               <img
//                 src={card.img}
//                 alt="img"
//                 className="w-full h-48 object-cover"
//               />

//               <p className="text-center mt-2">{card.title}</p>
//             </div>
//           );
//         })}

//       </div>
//     </section>
//   );
// }










"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TechFocusSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
useEffect(() => {
  const cards = document.querySelectorAll(".tech-card");

  // 🔥 SAFE scroll animation (no opacity bug)
  cards.forEach((card, index) => {
    gsap.fromTo(
      card,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
      }
    );
    

    
  });
  
  

}, []);

  const cardsData = [
    { title: "Iot Lab", img: "/ai-innovation-images/imagelab.jpg" },
    { title: "Science Lab", img: "/ai-innovation-images/receiptionimg.jpg" },
    { title: "Science Wall", img: "/ai-innovation-images/sciencewall.jpg" },
    { title: "AI ML", img: "/ai-innovation-images/virtualimg.jpg" },
    { title: "STEM", img: "/ai-innovation-images/test.jpg" },
    { title: "Automation", img: "/ai-innovation-images/test.jpg" },
  ];

  return (
    <section ref={sectionRef} className="bg-gradient-to-br from-[#eff6ff] via-[#dbeafe] to-[#bfdbfe] py-16 px-4">


        

      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-[#0f172a]">
          Technologies in Focus for Inclusive AI Innovation
        </h2>

        <p className="mt-4 text-[#334155] max-w-3xl mx-auto">
          Learn cutting-edge technologies through hands-on kits.
        </p>
      </div>

      {/* ✅ FORCE VISIBLE */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">

        {cardsData.map((card, index) => (
          <div
            key={index}
            className="tech-card bg-white rounded-2xl shadow-md overflow-hidden transition duration-300 hover:shadow-xl"
          >
            <img
              src={card.img}
              alt={card.title}
              className="w-full h-48 object-cover transition duration-500 hover:scale-110"
            />

            <div className="p-4 text-center font-semibold text-[#1e293b]">
              {card.title}
            </div>
          </div>
        ))}

      </div>

    </section>
  );
}