"use client";

import { motion } from "framer-motion";

const sections = [
  {
    title: "Discover Limitless Possibilities",
    description:
      "Launch creative journeys with AI-assisted learning, digital fabrication, and intuitive mentorship.",
    image:
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Unleash Your Potential",
    description:
      "Structured pathways make complex technologies accessible, empowering every student to build.",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "You Imagine, We Build",
    description:
      "Collaborate with our team to translate imagination into tangible, high-impact innovations.",
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
  },
];

const sectionMotion = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
  viewport: { once: true, amount: 0.3 },
};

export default function ContentSections() {
  return (
    <section className="bg-[#eef0ed] py-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6">
        {sections.map((section, index) => {
          const isReversed = index % 2 === 1;
          return (
            <motion.div
              key={section.title}
              {...sectionMotion}
              className={`grid items-center gap-8 rounded-2xl border border-white/70 bg-white/70 p-6 shadow-lg shadow-slate-200/50 md:grid-cols-2 ${
                isReversed ? "md:grid-flow-dense" : ""
              }`}
            >
              <div className={isReversed ? "md:col-start-2" : ""}>
                <img
                  src={section.image}
                  alt={section.title}
                  className="h-64 w-full rounded-2xl object-cover shadow-lg md:h-72"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[#3B5BDB]">
                  Insight {index + 1}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-[#1b2a28]">
                  {section.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#4f5f5d]">
                  {section.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
