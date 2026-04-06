"use client";

import { motion } from "framer-motion";

const pricing = [
  {
    title: "IoT Training Kit",
    price: "Starting INR 4999/-",
    features: [
      "Sensor starter pack",
      "Guided IoT curriculum",
      "Project-based challenges",
    ],
    cta: "Get Details",
  },
  {
    title: "AI Exploration Kit",
    price: "Starting INR 7499/-",
    features: [
      "AI starter toolkit",
      "Model building activities",
      "Mentor support sessions",
    ],
    cta: "Explore Kit",
  },
  {
    title: "Science Wall",
    price: "Contact our Sales Team",
    features: [
      "Custom lab installations",
      "Interactive learning panels",
      "On-site deployment support",
    ],
    cta: "Talk to Sales",
  },
];

const pricingMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
  viewport: { once: true, amount: 0.3 },
};

export default function Pricing() {
  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div {...pricingMotion} className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#3B5BDB]">Pricing</p>
          <h2 className="mt-3 text-3xl font-semibold text-[#1b2a28] md:text-4xl">
            Explore Our Product Pricing Options
          </h2>
        </motion.div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {pricing.map((plan) => (
            <motion.div
              key={plan.title}
              {...pricingMotion}
              whileHover={{ scale: 1.03 }}
              className="rounded-2xl border border-slate-100 bg-white p-6 shadow-lg shadow-slate-200/60"
            >
              <h3 className="text-xl font-semibold text-[#1b2a28]">{plan.title}</h3>
              <p className="mt-3 text-lg font-semibold text-[#3B5BDB]">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-[#4f5f5d]">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#3B5BDB]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-6 w-full rounded-xl bg-[#3B5BDB] px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-[#3B5BDB]/30"
              >
                {plan.cta}
              </motion.button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
