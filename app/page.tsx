import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import ContentSections from "../components/ContentSections";
import Highlight from "../components/Highlight";
import Pricing from "../components/Pricing";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#eef0ed] text-[#1f2d2b]">
      <Navbar floating overlay />
      <Hero />
      <Features />
      <ContentSections />
      <Highlight />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  );
}
