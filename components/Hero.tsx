"use client";

import { motion } from "framer-motion";

const heroBackground =
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=2000&q=80";

export default function Hero() {
  return (
    <section
      className="relative isolate overflow-hidden"
      style={{
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1b3a]/85 via-[#0b1b3a]/70 to-[#0b1b3a]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,91,219,0.2)_1px,transparent_0)] bg-[size:28px_28px] opacity-40" />

      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-32 text-center text-white sm:pt-36 md:pb-28 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="space-y-4"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/70">Siddesh</p>
          <h1 className="text-3xl font-semibold leading-tight md:text-5xl">
            Siddesh Technologies Private Limited
          </h1>
          <p className="mx-auto max-w-2xl text-base text-white/80 md:text-lg">
            Empowering Education with Innovative Solutions
          </p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="mt-4 rounded-xl bg-[#3B5BDB] px-6 py-3 text-sm font-semibold shadow-lg shadow-[#3B5BDB]/40"
          >
            Explore Us
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" as const, delay: 0.2 }}
          className="mx-auto mt-10 max-w-4xl rounded-2xl border border-white/20 bg-white/10 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.35)] backdrop-blur"
        >
          <div className="overflow-hidden rounded-xl border border-white/10 bg-white">
            <img
              src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1600&q=80"
              alt="Lab preview"
              className="h-60 w-full object-cover md:h-72"
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-white/80">
            <span>Inside a next-gen innovation lab</span>
            <span className="rounded-full border border-white/30 px-3 py-1">Preview</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
