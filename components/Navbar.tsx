"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const labsItems = [
  {
    label: "AI and Mechatronics Innovation Lab",
    href: "/labs/ai-and-mechatronics-innovation-lab",
  },
  { label: "Science Lab", href: "/labs/science-lab" },
  { label: "Mathematics Lab", href: "/labs/mathematics-lab" },
  { label: "Geography Lab", href: "/labs/geography-lab" },
];

const menuItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Labs", href: "/labs", hasDropdown: true },
  { label: "Our Products", href: "/our-products" },
  { label: "Social Initiatives", href: "/social-initiatives" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact-us" },
];

const dropdownMotion = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
  transition: { duration: 0.2, ease: "easeOut" as const },
};

const mobilePanelMotion = {
  initial: { x: "100%" },
  animate: { x: 0 },
  exit: { x: "100%" },
  transition: { duration: 0.3, ease: "easeOut" as const },
};

const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.2 },
};

type NavbarProps = {
  floating?: boolean;
  overlay?: boolean;
};

export default function Navbar({ floating = false, overlay = false }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileLabsOpen, setMobileLabsOpen] = useState(false);
  const [desktopLabsOpen, setDesktopLabsOpen] = useState(false);

  return (
    <>
      <header
        className={`w-full ${floating ? "fixed inset-x-0 top-0 z-50" : "sticky top-0 z-50"}`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 md:px-6">
          <nav className="relative flex w-full items-center justify-between rounded-2xl border border-white/30 bg-white/70 px-4 py-3 shadow-[0_14px_40px_rgba(15,23,42,0.12)] backdrop-blur">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-[#20306f]"
          >
            <Image
              src="/siddesh logo.png"
              alt="Siddesh"
              width={180}
              height={60}
              className="h-12 w-auto object-contain md:h-16"
              priority
            />
            <span className="sr-only">Siddesh</span>
          </Link>

          <div className="hidden items-center gap-6 text-sm font-medium text-slate-700 md:flex">
            {menuItems.map((item) => {
              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setDesktopLabsOpen(true)}
                    onMouseLeave={() => setDesktopLabsOpen(false)}
                  >
                    <button
                      type="button"
                      className="flex items-center gap-1 rounded-lg px-2 py-1 text-slate-700 transition-colors hover:text-[#3B5BDB]"
                      onClick={() => setDesktopLabsOpen((prev) => !prev)}
                      aria-expanded={desktopLabsOpen}
                    >
                      {item.label}
                      <span className="text-xs">▾</span>
                    </button>

                    <AnimatePresence>
                      {desktopLabsOpen && (
                        <motion.div
                          {...dropdownMotion}
                          className="absolute right-0 top-full mt-3 w-64 rounded-2xl border border-white/60 bg-white/95 p-2 shadow-[0_18px_45px_rgba(15,23,42,0.2)] backdrop-blur"
                        >
                          <div className="flex flex-col gap-1">
                            {labsItems.map((lab) => (
                              <Link
                                key={lab.label}
                                href={lab.href}
                                className="rounded-xl px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-[#3B5BDB]/10 hover:text-[#3B5BDB]"
                                onClick={() => setDesktopLabsOpen(false)}
                              >
                                {lab.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-2 py-1 transition-colors hover:text-[#3B5BDB]"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white/80 px-3 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:text-[#3B5BDB] md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? "X" : "Menu"}
          </button>
          </nav>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              {...overlayMotion}
              className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
          )}
        </AnimatePresence>

        <AnimatePresence>
          {mobileOpen && (
            <motion.aside
              {...mobilePanelMotion}
              className="fixed right-0 top-0 z-50 flex h-full w-72 flex-col gap-4 bg-white px-6 py-8 shadow-[0_20px_60px_rgba(15,23,42,0.25)] md:hidden"
            >
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-[#20306f]">Siddesh</span>
              <button
                type="button"
                className="rounded-lg px-2 py-1 text-sm font-semibold text-slate-600"
                onClick={() => setMobileOpen(false)}
              >
                X
              </button>
            </div>

            <div className="flex flex-col gap-1 text-sm font-medium text-slate-700">
              {menuItems.map((item) => {
                if (item.hasDropdown) {
                  return (
                    <div key={item.label} className="flex flex-col">
                      <button
                        type="button"
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-[#3B5BDB]/10 hover:text-[#3B5BDB]"
                        onClick={() => setMobileLabsOpen((prev) => !prev)}
                        aria-expanded={mobileLabsOpen}
                      >
                        <span>{item.label}</span>
                        <span className="text-xs">{mobileLabsOpen ? "▴" : "▾"}</span>
                      </button>

                      <AnimatePresence>
                        {mobileLabsOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" as const }}
                            className="overflow-hidden"
                          >
                            <div className="mt-2 flex flex-col gap-1 pl-2">
                              {labsItems.map((lab) => (
                                <Link
                                  key={lab.label}
                                  href={lab.href}
                                  className="rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-[#3B5BDB]/10 hover:text-[#3B5BDB]"
                                  onClick={() => setMobileOpen(false)}
                                >
                                  {lab.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="rounded-xl px-3 py-2 transition-colors hover:bg-[#3B5BDB]/10 hover:text-[#3B5BDB]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </header>

      {floating && !overlay ? <div className="h-[88px] sm:h-[96px] md:h-[104px]" aria-hidden /> : null}
    </>
  );
}
