import Navbar from "../../components/Navbar";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#eef0ed] text-[#1f2d2b]">
      <Navbar floating />
      <section className="mx-auto w-full max-w-5xl px-4 py-16 md:px-6">
        <h1 className="text-3xl font-semibold text-[#1b2a28] md:text-5xl">Labs</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#304542]">
          Choose a lab from the menu to explore learning tracks and activities.
        </p>
      </section>
    </main>
  );
}
