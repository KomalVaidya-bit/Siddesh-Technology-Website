"use client";

import { motion } from "framer-motion";

const highlights = [
  {
    title: "Continuous Support",
    description: "Dedicated mentorship and curriculum guidance at every step.",
  },
  {
    title: "AI Exploration Tools",
    description: "Hands-on tools that transform ideas into intelligent systems.",
  },
  {
    title: "IoT Training Kits",
    description: "Curated kits for building connected and measurable prototypes.",
  },
];

const highlightMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
  viewport: { once: true, amount: 0.3 },
};

export default function Highlight() {
  return (
    <section className="relative overflow-hidden bg-[#3B5BDB] py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.2)_1px,transparent_0)] bg-[size:26px_26px] opacity-40" />
      <div className="relative mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          {highlights.map((item) => (
            <motion.div
              key={item.title}
              {...highlightMotion}
              className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-white/80">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
