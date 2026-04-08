


"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAME_COUNT = 39;

type TableScrollLeftProps = {
  tableOnRight?: boolean;
  hideText?: boolean;
  enlargeTable?: boolean;
};

export default function TableScrollLeft({
  tableOnRight = false,
  hideText = false,
  enlargeTable = false,
}: TableScrollLeftProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!section || !canvas || !ctx) return;

    const images: HTMLImageElement[] = [];
    const cutoutFrames: Array<HTMLCanvasElement | null> = Array.from(
      { length: FRAME_COUNT },
      () => null,
    );
    const state = { frame: 0 };

    let width = canvas.parentElement!.clientWidth;
    let height = canvas.parentElement!.clientHeight;

    const buildCutoutFrame = (image: HTMLImageElement) => {
      const frameCanvas = document.createElement("canvas");
      frameCanvas.width = image.naturalWidth;
      frameCanvas.height = image.naturalHeight;
      const frameContext = frameCanvas.getContext("2d", { willReadFrequently: true });

      if (!frameContext) {
        return null;
      }

      frameContext.drawImage(image, 0, 0);
      const imageData = frameContext.getImageData(0, 0, frameCanvas.width, frameCanvas.height);
      const pixels = imageData.data;

      for (let index = 0; index < pixels.length; index += 4) {
        const red = pixels[index];
        const green = pixels[index + 1];
        const blue = pixels[index + 2];
        const min = Math.min(red, green, blue);
        const max = Math.max(red, green, blue);
        const spread = max - min;

        // Remove white/off-white background while preserving table edges.
        if (min > 228 && spread < 20) {
          pixels[index + 3] = 0;
        } else if (min > 208 && spread < 26) {
          const softness = (236 - min) / 28;
          const alpha = Math.max(0, Math.min(1, softness));
          pixels[index + 3] = Math.round(pixels[index + 3] * alpha);
        }
      }

      frameContext.putImageData(imageData, 0, 0);
      return frameCanvas;
    };

    // Load Images
    const loadImages = async () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = `/table-frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

        await new Promise((res) => {
          img.onload = res;
        });

        images.push(img);
        cutoutFrames[i - 1] = buildCutoutFrame(img);
      }

      render();
    };

    // Render Frame
    const render = () => {
      const img = images[Math.floor(state.frame)];
      if (!img) return;

      // Keep canvas bounds synced with its current container to avoid mobile overflow.
      width = canvas.parentElement!.clientWidth;
      height = canvas.parentElement!.clientHeight;

      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const responsiveScale = width < 640 ? 1.02 : width < 1024 ? 1.12 : 1.2;
      const scaleBoost = enlargeTable ? 0.12 : 0;
      const scale = Math.min(width / img.width, height / img.height) * responsiveScale;
      const finalScale = scale * (1 + scaleBoost);

      const frameIndex = Math.floor(state.frame);
      const cutout = cutoutFrames[frameIndex];
      const source = cutout ?? img;

      const drawWidth = source.width * finalScale;
      const drawHeight = source.height * finalScale;

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      ctx.drawImage(source, x, y, drawWidth, drawHeight);
    };

    loadImages();

    // GSAP Scroll Animation
    gsap.to(state, {
      frame: FRAME_COUNT - 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=350%",
        scrub: 1.5,
        pin: true,
      },
      onUpdate: render,
    });

    // Resize Handler
    const handleResize = () => {
      width = canvas.parentElement!.clientWidth;
      height = canvas.parentElement!.clientHeight;
      render();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full overflow-x-hidden bg-[#eef0ed] py-6 md:py-10">

      {/* CENTER CONTAINER */}
      <div className="mx-auto w-full max-w-7xl overflow-x-hidden px-4 sm:px-6">

        {/* GRID */}
        <div
          className={`grid min-w-0 items-center gap-8 md:min-h-screen md:gap-10 ${
            hideText && tableOnRight ? "md:grid-cols-[0.22fr_1.78fr]" : "md:grid-cols-[1.08fr_0.92fr]"
          }`}
        >

          {/* LEFT TABLE */}
          <div
            className={`min-w-0 h-[360px] w-full sm:h-[460px] md:h-[560px] ${enlargeTable ? "lg:h-[840px]" : "lg:h-[750px]"} ${tableOnRight ? "md:order-2" : "md:order-1"}`}
          >
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          {/* RIGHT TEXT */}
          {!hideText ? (
            <div
              className={`mx-auto min-w-0 max-w-2xl space-y-3 text-center md:max-w-none md:space-y-4 ${tableOnRight ? "md:order-1 md:mx-0 md:text-left" : "md:order-2 md:mx-0 md:text-left"}`}
            >

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2F5AA8] leading-[1.15]">
              Discover AI and Mechatronics Innovation Lab
            </h2>

            <div className="h-[3px] w-16 bg-[#2563eb] mx-auto md:mx-0"></div>

            <p className="text-[#1f2d2b] leading-[1.55] text-[0.98rem] sm:text-[1.02rem]">
              Interactive AI and Mechatronics Innovation Lab for schools to empower students
              with experiential learning with DIY robotics kit, Iot Training Kit and AI
              platform, practical activity books and annual innovation fest.
            </p>

            <p className="text-[#2F5AA8] font-semibold text-[1.4rem] md:text-[1.6rem] leading-none">
              Modules 
            </p>
              {hideText && tableOnRight ? <div className="hidden md:block md:order-1" aria-hidden /> : null}


            <button className="rounded-2xl bg-[#2F5AA8] hover:bg-[#1d4ed8] transition-all duration-300 px-6 py-2.5 text-white text-base sm:text-lg font-bold shadow-md w-full sm:w-auto">
              What's Covered
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 pt-0.5">
              {[
                "Basic Electronics Exploration Kit",
                "Robotics Starter Kit",
                "Robotics Arms Kit",
                "Iot Training Kit",
                "DIY Iot Kit",
                "Rc Drone",
                "DIY Drone Kit",
                 "VR/AR Experience Kit",


              ].map((item) => (
                <span
                  key={item}
                  className="block w-full break-words rounded-2xl bg-[#c9dde9] px-2.5 sm:px-3 py-1.5 text-center text-sm sm:text-base font-semibold text-[#1e3a8a]"
                >
                  {item}
                </span>
              ))}
            </div>

            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}