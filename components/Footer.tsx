"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerMotion = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const },
  viewport: { once: true, amount: 0.2 },
};

const quickLinks = [
  { label: "About Us", href: "/about-us" },
  { label: "Products", href: "/our-products" },
  { label: "Social Initiatives", href: "/social-initiatives" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] py-12 text-white">
      <motion.div
        {...footerMotion}
        className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-3"
      >
        <div>
          <h3 className="text-lg font-semibold">Siddesh Technologies Private Limited</h3>
          <p className="mt-3 text-sm text-white/70">
            Building future-ready learners through immersive technology education and
            innovation labs.
          </p>
        </div>

        <div>
          <h4 className="text-base font-semibold">Quick Links</h4>
          <div className="mt-3 flex flex-col gap-2 text-sm text-white/70">
            {quickLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-base font-semibold">Contact</h4>
          <p className="mt-3 text-sm text-white/70">
            Siddesh Technologies Pvt. Ltd.
            <br />
            Innovation Park, Bengaluru, Karnataka
            <br />
            +91 98765 43210
            <br />
            hello@siddeshtechnologies.com
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
