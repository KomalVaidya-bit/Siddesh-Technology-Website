"use client";

import { motion } from "framer-motion";

const ctaMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" as const },
  viewport: { once: true, amount: 0.3 },
};

export default function CTA() {
  return (
    <section className="bg-[#eef0ed] py-16">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.div {...ctaMotion}>
          <h2 className="text-2xl font-semibold text-[#1b2a28] md:text-3xl">
            Ready to take the next step in embracing technology?
          </h2>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-5 rounded-xl bg-[#3B5BDB] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#3B5BDB]/30"
          >
            Contact Us
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
