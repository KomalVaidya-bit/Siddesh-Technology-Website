"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { value: "70+", label: "Countries Reached" },
  { value: "1500+", label: "Lab Setup" },
  { value: "30,000+", label: "Teachers Trained" },
  { value: "3M+", label: "Students Impacted" },
];

const statIcons = [
  (
    <svg
      key="globe"
      viewBox="0 0 24 24"
      className="h-12 w-12 sm:h-20 sm:w-20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" />
    </svg>
  ),
  (
    <svg
      key="school"
      viewBox="0 0 24 24"
      className="h-12 w-12 sm:h-20 sm:w-20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 10h16" />
      <path d="M6 10v8M10 10v8M14 10v8M18 10v8" />
      <path d="M12 4l8 6H4l8-6z" />
      <path d="M10 18h4" />
    </svg>
  ),
  (
    <svg
      key="teacher"
      viewBox="0 0 24 24"
      className="h-12 w-12 sm:h-20 sm:w-20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="8" cy="8" r="3" />
      <path d="M3 18c0-3 2.5-5 5-5" />
      <rect x="13" y="6" width="8" height="6" rx="1" />
      <path d="M13 14h8" />
    </svg>
  ),
  (
    <svg
      key="cap"
      viewBox="0 0 24 24"
      className="h-12 w-12 sm:h-20 sm:w-20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M3 8l9-4 9 4-9 4-9-4z" />
      <path d="M7 12v4c0 1.7 10 1.7 10 0v-4" />
      <path d="M21 8v5" />
    </svg>
  ),
];

export default function AiLabHero() {
  return (
    <section className="relative min-h-screen overflow-x-hidden bg-[#3FA7D6] pb-16 pt-36 sm:pb-20 sm:pt-40 md:pb-40 md:pt-44">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 pb-8 sm:px-6 sm:pb-10 md:grid-cols-[1.08fr_0.92fr] md:pb-24">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="space-y-5 text-left text-white md:pr-4"
        >
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
          AI and Mechatronics Innovation Lab
            <br />
            for Schools
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
            A holistic ecosystem fostering learning, creativity, and innovation through 
            Robotics Kit, Iot Kit and AI Platform, DIY Drone Kit and Innovation Fest
          </p>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-[#FFC933] px-5 py-2 text-sm font-semibold text-[#6a4b00] shadow-lg sm:px-6"
            >
              Watch Video
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="rounded-full bg-gradient-to-r from-[#7A3CF0] to-[#C23CD6] px-5 py-2 text-sm font-semibold text-white shadow-lg sm:px-6"
            >
              Book Demo
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const }}
          className="relative mx-auto mt-2 h-[240px] w-full max-w-[520px] sm:h-[280px] md:mt-0 md:h-[370px]"
        >
          <div className="absolute right-0 top-0 h-[190px] w-[260px] sm:h-[220px] sm:w-[310px] md:h-[265px] md:w-[380px]">
            <Image
              src="/ai-lab/hero-main.jpg"
              alt="Students in AI lab"
              fill
              className="rounded-2xl border-[4px] border-white object-cover shadow-[0_18px_40px_rgba(15,23,42,0.25)]"
              sizes="(min-width: 768px) 380px, 320px"
              priority
            />
          </div>
          <div className="absolute bottom-0 left-0 h-[100px] w-[145px] sm:h-[130px] sm:w-[180px] md:h-[150px] md:w-[210px]">
            <Image
              src="/ai-lab/hero-small-left.jpg"
              alt="Lab activity"
              fill
              className="rounded-2xl border-[3px] border-white object-cover shadow-lg"
              sizes="(min-width: 768px) 210px, 180px"
            />
          </div>
          <div className="absolute right-2 top-[105px] h-[100px] w-[135px] sm:right-4 sm:top-[130px] sm:h-[130px] sm:w-[170px] md:right-10 md:top-[170px] md:h-[150px] md:w-[190px]">
            <Image
              src="/ai-lab/hero-small-left.jpg"
              alt="Student achievement"
              fill
              className="rounded-2xl border-[3px] border-white object-cover shadow-lg"
              sizes="(min-width: 768px) 190px, 160px"
            />
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.2 }}
        className="relative z-20 mt-14 flex justify-center px-4 sm:mt-16 md:absolute md:inset-x-0 md:bottom-0 md:mt-0 md:translate-y-[42%] md:px-6"
      >
        <div className="grid w-full max-w-6xl gap-x-0 gap-y-10 rounded-3xl border border-white/80 bg-white px-4 pb-8 pt-12 shadow-[0_18px_40px_rgba(15,23,42,0.22)] sm:grid-cols-2 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative px-2 text-center sm:px-4">
              <div className="absolute left-1/2 top-0 flex h-[70px] w-[70px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[4px] border-white bg-[#3FA7D6] text-white shadow-md sm:h-[100px] sm:w-[100px] sm:border-[5px]">
                {statIcons[index]}
              </div>
              <div className="pt-11 sm:pt-16">
                <div className="text-base font-semibold text-[#1b2a28] sm:text-xl md:text-2xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs leading-snug text-[#5a6b69] sm:text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
              {index < stats.length - 1 && (
                <span className="absolute right-0 top-1/2 hidden h-20 w-px -translate-y-1/2 bg-slate-200 md:block" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 hidden md:block">
        <svg
          viewBox="0 0 1440 120"
          className="h-24 w-full text-white md:h-24"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C240,90 520,120 720,120 C920,120 1200,90 1440,0 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
