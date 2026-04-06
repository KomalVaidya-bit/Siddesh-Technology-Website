// "use client";

// import { motion } from "framer-motion";
// import TableScrollMini from "../../../components/TableScrollMini";
// // import TableScrollPinned from "@/components/TableScrollPinned";


// export default function AiLabIntro() {
//   return (
//     <section className="w-full bg-[#f3f4f6] py-20 ">
//       <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-[1.2fr_0.8fr] lg:gap-12">

        

//         {/* LEFT IMAGE */}
//         <motion.div
//           initial={{ opacity: 0, x: -40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.2 }}
//           viewport={{ once: true }}
//           className="flex justify-center md:justify-start"
//         >
//           {/* <Image
//             src="/ai-lab/intro.png"   // 👈 change image name if needed
//             alt="AI Lab Setup"
//             width={600}
//             height={400}
//             className="rounded-2xl object-contain shadow-lg"
//           /> */}
//           <div className="relative">
//             <TableScrollMini />
//           </div>
//         </motion.div>

//         {/* RIGHT CONTENT */}
//         <motion.div
//           initial={{ opacity: 0, x: 40 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.2 }}
//           viewport={{ once: true }}
//           className="mx-auto w-full max-w-[540px] space-y-5 md:mx-0"
//         >


          
//           {/* Title */}
//           <div
//         className="px-6 md:px-12">
//           <h2 className="text-2xl font-bold text-[#0ea5e9] sm:text-3xl">
//             Discover Next-Gen AI Lab
//           </h2>

//           {/* Underline */}
//           <div className="h-[3px] w-16 bg-yellow-400"></div>

//           {/* Description */}
//           <p className="text-gray-600 leading-relaxed sm:text-[1.02rem]">
//             Interactive AI and Robotics Lab for schools to empower students
//             with experiential learning with DIY robotics kit, coding and AI
//             platform, practical activity books and annual innovation fest.
//           </p>

//           {/* Ships */}
//           <p className="font-medium text-blue-500">
//             Ships Worldwide ✈️
//           </p>

//           {/* Button */}
//           <button className="rounded-full bg-blue-500 px-6 py-3 text-white shadow-md hover:bg-blue-600 transition">
//             What's Covered
//           </button>

//           {/* TAGS */}
//           <div className="flex flex-wrap gap-3 pt-4">
//             {[
//               "Coding",
//               "Artificial Intelligence",
//               "Data Science",
//               "Robotics",
//               "3D and AR-VR",
//               "Machine Learning",
//             ].map((item) => (
//               <span
//                 key={item}
//                 className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-600"
//               >
//                 {item}
//               </span>
//             ))}
//           </div>
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }






// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// const FRAME_COUNT = 40;
// const FRAME_SOURCES = Array.from({ length: FRAME_COUNT }, (_, index) => {
//   const number = String(index + 1).padStart(3, "0");
//   return `/table-frames/ezgif-frame-${number}.jpg`;
// });

// export default function TableScrollClient() {
//   const sectionRef = useRef<HTMLElement | null>(null);
//   const stickyRef = useRef<HTMLDivElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const rafRef = useRef<number | null>(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const section = sectionRef.current;
//     const sticky = stickyRef.current;
//     const canvas = canvasRef.current;
//     const context = canvas?.getContext("2d", { alpha: true });

//     if (!section || !sticky || !canvas || !context) {
//       return;
//     }

//     let isActive = true;
//     const isMobile = window.matchMedia("(max-width: 768px)").matches;
//     const images: HTMLImageElement[] = [];
//     const cutoutFrames: Array<HTMLCanvasElement | null> = Array.from({ length: FRAME_COUNT }, () => null);
//     const state = {
//       frame: 0,
//       scale: isMobile ? 0.78 : 0.64,
//       y: isMobile ? 0 : 14,
//     };
//     const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);

//     const getClosestLoadedFrame = (targetIndex: number) => {
//       if (images[targetIndex]?.naturalWidth) {
//         return images[targetIndex];
//       }

//       for (let offset = 1; offset < FRAME_COUNT; offset += 1) {
//         const prev = targetIndex - offset;
//         const next = targetIndex + offset;

//         if (prev >= 0 && images[prev]?.naturalWidth) {
//           return images[prev];
//         }

//         if (next < FRAME_COUNT && images[next]?.naturalWidth) {
//           return images[next];
//         }
//       }

//       return null;
//     };

//     const buildCutoutFrame = (image: HTMLImageElement) => {
//       const frameCanvas = document.createElement("canvas");
//       frameCanvas.width = image.naturalWidth;
//       frameCanvas.height = image.naturalHeight;
//       const frameContext = frameCanvas.getContext("2d", { willReadFrequently: true });

//       if (!frameContext) {
//         return null;
//       }

//       frameContext.drawImage(image, 0, 0);
//       const imageData = frameContext.getImageData(0, 0, frameCanvas.width, frameCanvas.height);
//       const pixels = imageData.data;

//       for (let index = 0; index < pixels.length; index += 4) {
//         const red = pixels[index];
//         const green = pixels[index + 1];
//         const blue = pixels[index + 2];
//         const min = Math.min(red, green, blue);
//         const max = Math.max(red, green, blue);
//         const colorSpread = max - min;

//         if (min > 228 && colorSpread < 18) {
//           pixels[index + 3] = 0;
//           continue;
//         }

//         if (min > 205 && colorSpread < 24) {
//           const softness = (232 - min) / 27;
//           const alpha = Math.max(0, Math.min(1, softness));
//           pixels[index + 3] = Math.round(pixels[index + 3] * alpha);
//         }
//       }

//       frameContext.putImageData(imageData, 0, 0);
//       return frameCanvas;
//     };

//     const renderFrame = () => {
//       if (!isActive) {
//         return;
//       }

//       const width = canvas.clientWidth;
//       const height = canvas.clientHeight;

//       const targetWidth = Math.max(1, Math.floor(width * pixelRatio));
//       const targetHeight = Math.max(1, Math.floor(height * pixelRatio));

//       if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
//         canvas.width = targetWidth;
//         canvas.height = targetHeight;
//         context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
//       }

//       context.clearRect(0, 0, width, height);

//       const frameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.round(state.frame)));
//       const image = getClosestLoadedFrame(frameIndex);
//       if (!image || !image.naturalWidth || !image.naturalHeight) {
//         return;
//       }

//       const cutout = cutoutFrames[frameIndex];
//       const sourceWidth = cutout?.width ?? image.naturalWidth;
//       const sourceHeight = cutout?.height ?? image.naturalHeight;

//       const containScale = Math.min(
//         width / sourceWidth,
//         height / sourceHeight,
//       );
//       const drawWidth = sourceWidth * containScale * state.scale;
//       const drawHeight = sourceHeight * containScale * state.scale;
//       const x = (width - drawWidth) / 2;
//       const y = (height - drawHeight) / 2 + state.y;

//       context.imageSmoothingEnabled = true;
//       context.imageSmoothingQuality = "high";
//       context.drawImage(cutout ?? image, x, y, drawWidth, drawHeight);
//     };

//     const requestRender = () => {
//       if (rafRef.current !== null) {
//         return;
//       }

//       rafRef.current = window.requestAnimationFrame(() => {
//         rafRef.current = null;
//         renderFrame();
//       });
//     };

//     const loadFrame = (source: string, index: number) =>
//       new Promise<void>((resolve) => {
//         const image = new Image();
//         image.decoding = "async";
//         image.src = source;

//         image.onload = () => {
//           images[index] = image;
//           cutoutFrames[index] = buildCutoutFrame(image);
//           resolve();
//         };

//         image.onerror = () => {
//           resolve();
//         };
//       });

//     let animation: gsap.core.Tween | null = null;

//     Promise.all(FRAME_SOURCES.map((source, index) => loadFrame(source, index))).then(
//       () => {
//         if (!isActive) {
//           return;
//         }

//         requestRender();

//         animation = gsap.to(state, {
//           frame: FRAME_COUNT - 1,
//           scale: isMobile ? 0.84 : 0.7,
//           y: isMobile ? -6 : -18,
//           ease: "none" as const,
//           onUpdate: requestRender,
//           scrollTrigger: {
//             trigger: section,
//             start: "top top",
//             end: isMobile ? "+=420%" : "+=380%",
//             scrub: isMobile ? 2.2 : 1.8,
//             pin: sticky,
//             invalidateOnRefresh: true,
//           },
//         });
//       },
//     );

//     const handleResize = () => {
//       requestRender();
//       ScrollTrigger.refresh();
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       isActive = false;
//       window.removeEventListener("resize", handleResize);
//       if (rafRef.current !== null) {
//         window.cancelAnimationFrame(rafRef.current);
//       }
//       animation?.scrollTrigger?.kill();
//       animation?.kill();
//     };
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative h-[420vh] w-full bg-[#eef0ed]">
//       <div
//         ref={stickyRef}
//         className="sticky top-0 h-screen w-full overflow-hidden bg-[#eef0ed]"
//       >
//         <canvas ref={canvasRef} className="h-full w-full" />
//       </div>
//     </section>
//   );
// }













// "use client";

// import dynamic from "next/dynamic";

// const TableScrollLeft = dynamic(() => import("../../../components/TableScrollLeft"), {
//   ssr: false,
//   loading: () => (
//     <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 md:py-10">
//       <div className="h-[320px] w-full animate-pulse rounded-2xl bg-[#dbe6e9] sm:h-[400px] md:h-[500px] lg:h-[560px]" />
//     </div>
//   ),
// });

// export default function AiLabIntro() {
//   return (
//     <section className="w-full bg-[#eef0ed]">
//       <TableScrollLeft />
//     </section>
//   );
// }







"use client";

import TableScrollLeft from "../../../components/TableScrollLeft";

export default function AiLabIntro() {
  return (
    <section className="w-full bg-[#eef0ed]">
      <TableScrollLeft />
    </section>
  );
}