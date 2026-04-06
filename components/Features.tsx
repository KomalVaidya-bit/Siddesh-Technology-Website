"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Unlocking the Potential of Technology",
    description:
      "Welcome to Siddesh Technologies Private Limited, where we believe in unleashing the power of innovation and technology to revolutionize education. Our mission is to empower individuals and organizations to explore the boundless possibilities of IoT and AI through immersive learning experiences..",
  },
  {
    title: "Comprehensive Training Solutions",
    description:
      "Embark on a journey of discovery with our comprehensive suite of professional services designed to cater to a diverse clientele. From educational institutions seeking to enhance their curriculum to aspiring technologists eager to delve into the world of IoT and AI, Siddesh offers customized training solutions tailored to your unique needs and objectives..",
  },
  {
    title: "Experience the Future",
    description:
      "Join us on a journey of discovery and innovation as we unlock the full potential of IoT and AI technology. With Siddesh Technologies Private Limited, the possibilities are endless. Explore our range of products and services today and embark on your path to technological excellence",
  },
];

const containerMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
  viewport: { once: true, amount: 0.3 },
};

export default function Features() {
  return (
    <section className="relative bg-white py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,91,219,0.12)_1px,transparent_0)] bg-[size:26px_26px]" />
      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div {...containerMotion} className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#3B5BDB]">Features</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#1b2a28] md:text-4xl">
            Unlocking the Potential with Siddesh
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              {...containerMotion}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/60 transition hover:-translate-y-1"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#3B5BDB]/10 text-[#3B5BDB]">
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <circle cx="12" cy="12" r="8" />
                  <path d="M8 12h8M12 8v8" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-[#1b2a28]">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5a6b69]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
