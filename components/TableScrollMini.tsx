// "use client";

// import { useEffect, useMemo, useRef, useState } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// const FRAME_COUNT = 39;
// const SCROLL_START = "top 92%";
// const SCROLL_END = "bottom 8%";
// const SCROLL_SCRUB = 1.35;

// export default function TableScrollMini() {
// 	const wrapperRef = useRef<HTMLDivElement | null>(null);
// 	const frames = useMemo(
// 		() =>
// 			Array.from({ length: FRAME_COUNT }, (_, index) => {
// 				const number = String(index + 1).padStart(3, "0");
// 				return `/table-frames/ezgif-frame-${number}.jpg`;
// 			}),
// 		[],
// 	);
// 	const [frameIndex, setFrameIndex] = useState(0);

// 	useEffect(() => {
// 		gsap.registerPlugin(ScrollTrigger);

// 		const wrapper = wrapperRef.current;
// 		if (!wrapper) {
// 			return;
// 		}

// 		const frameState = { value: 0 };
// 		const preloaders = frames.map((source) => {
// 			const image = new window.Image();
// 			image.decoding = "async";
// 			image.src = source;
// 			return image;
// 		});

// 		const animation = gsap.to(frameState, {
// 			value: FRAME_COUNT - 1,
// 			ease: "none" as const,
// 			onUpdate: () => {
// 				setFrameIndex(Math.round(frameState.value));
// 			},
// 			scrollTrigger: {
// 				trigger: wrapper,
// 				start: SCROLL_START,
// 				end: SCROLL_END,
// 				scrub: SCROLL_SCRUB,
// 			},
// 		});

// 		return () => {
// 			animation.scrollTrigger?.kill();
// 			animation.kill();
// 			preloaders.length = 0;
// 		};
// 	}, [frames]);

// 	return (
// 		<div
// 			ref={wrapperRef}
// 			className="relative mx-auto w-full max-w-[980px] overflow-visible bg-[#f3f4f6] p-0"
// 		>
// 			<div className="relative aspect-[16/10] w-full overflow-visible bg-[#f3f4f6]">
// 				<img
// 					src={frames[frameIndex]}
// 					alt="Smart table frame sequence"
// 					className="mx-auto w-[120%] max-w-none object-contain mix-blend-multiply md:w-[100%]"
// 					loading="eager"
// 					decoding="async"
// 				/>
// 			</div>
// 		</div>
// 	);
// }









// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// const FRAME_COUNT = 39;

// export default function TableScrollLeftPinned() {
//   const sectionRef = useRef<HTMLDivElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const section = sectionRef.current;
//     const canvas = canvasRef.current;

//     if (!section || !canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let width = canvas.parentElement!.clientWidth;
//     let height = window.innerHeight;

//     const images: HTMLImageElement[] = [];
//     const state = { frame: 0 };

//     // LOAD IMAGES
//     const loadImages = async () => {
//       for (let i = 1; i <= FRAME_COUNT; i++) {
//         const img = new Image();
//         img.src = `/table-frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
//         await new Promise((res) => (img.onload = res));
//         images.push(img);
//       }
//       render();
//     };

//     const render = () => {
//       const img = images[Math.floor(state.frame)];
//       if (!img) return;

//       const pixelRatio = window.devicePixelRatio || 1;

//       canvas.width = width * pixelRatio;
//       canvas.height = height * pixelRatio;
//       canvas.style.width = `${width}px`;
//       canvas.style.height = `${height}px`;

//       ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
//       ctx.clearRect(0, 0, width, height);

//       // 🔥 PERFECT FIT (LEFT SIDE)
//       const scale =
//         Math.min(width / img.width, height / img.height) * 0.9;

//       const drawWidth = img.width * scale;
//       const drawHeight = img.height * scale;

//       const x = (width - drawWidth) / 2;
//       const y = (height - drawHeight) / 2;

//       ctx.drawImage(img, x, y, drawWidth, drawHeight);
//     };

//     loadImages();

//     // 🔥 PINNED SCROLL (MAIN MAGIC)
//     const animation = gsap.to(state, {
//       frame: FRAME_COUNT - 1,
//       ease: "none",
//       scrollTrigger: {
//         trigger: section,
//         start: "top top",
//         end: "+=300%",
//         scrub: 1.3,
//         pin: true,
//       },
//       onUpdate: render,
//     });

//     const handleResize = () => {
//       width = canvas.parentElement!.clientWidth;
//       height = window.innerHeight;
//       render();
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       animation.kill();
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <section ref={sectionRef} className="relative h-[350vh] w-full bg-[#eef0ed]">
      
//       <div className="sticky top-0 h-screen flex flex-col md:flex-row">

//         {/* LEFT TABLE */}
//         <div className="w-full md:w-1/2 h-full flex items-center justify-center">
//           <canvas ref={canvasRef} className="w-full h-full" />
//         </div>

        
       

//       </div>
//     </section>
//   );
// }








// "use client";

// import { useEffect, useRef } from "react";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// const FRAME_COUNT = 39;

// export default function TableScrollLeftSticky() {
//   const containerRef = useRef<HTMLDivElement | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);

//     const container = containerRef.current;
//     const canvas = canvasRef.current;

//     if (!container || !canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let width = canvas.parentElement!.clientWidth;
//     let height = window.innerHeight;

//     const images: HTMLImageElement[] = [];
//     const state = { frame: 0 };

//     // LOAD IMAGES
//     const loadImages = async () => {
//       for (let i = 1; i <= FRAME_COUNT; i++) {
//         const img = new Image();
//         img.src = `/table-frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
//         await new Promise((res) => (img.onload = res));
//         images.push(img);
//       }
//       render();
//     };

//     const render = () => {
//       const img = images[Math.floor(state.frame)];
//       if (!img) return;

//       const pixelRatio = window.devicePixelRatio || 1;

//       canvas.width = width * pixelRatio;
//       canvas.height = height * pixelRatio;
//       canvas.style.width = `${width}px`;
//       canvas.style.height = `${height}px`;

//       ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
//       ctx.clearRect(0, 0, width, height);

//       const scale =
//         Math.min(width / img.width, height / img.height) * 0.9;

//       const drawWidth = img.width * scale;
//       const drawHeight = img.height * scale;

//       const x = (width - drawWidth) / 2;
//       const y = (height - drawHeight) / 2;

//       ctx.drawImage(img, x, y, drawWidth, drawHeight);
//     };

//     loadImages();

//     // 🔥 PIN ONLY LEFT TABLE
//     gsap.to(state, {
//       frame: FRAME_COUNT - 1,
//       ease: "none",
//       scrollTrigger: {
//         trigger: container,
//         start: "top top",
//         end: "+=300%",
//         scrub: 1.2,
//         pin: true, // ONLY this div gets pinned
//       },
//       onUpdate: render,
//     });

//     const handleResize = () => {
//       width = canvas.parentElement!.clientWidth;
//       height = window.innerHeight;
//       render();
//     };

//     window.addEventListener("resize", handleResize);

//     return () => {
//       ScrollTrigger.getAll().forEach((t) => t.kill());
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="w-full h-[350vh] relative"
//     >
//       <div className="sticky top-0 h-screen flex items-center">
//         <canvas ref={canvasRef} className="w-full h-full" />
//       </div>
//     </div>
//   );
// }





"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAME_COUNT = 39;

export default function TableScrollLeftFinal() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.parentElement!.clientWidth;
    let height = window.innerHeight;

    const images: HTMLImageElement[] = [];
    const state = { frame: 0 };

    // LOAD FRAMES
    const loadImages = async () => {
      for (let i = 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = `/table-frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
        await new Promise((res) => (img.onload = res));
        images.push(img);
      }
      render();
    };

    const render = () => {
      const img = images[Math.floor(state.frame)];
      if (!img) return;

      const pixelRatio = window.devicePixelRatio || 1;

      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // PERFECT FIT
      const scale =
        Math.min(width / img.width, height / img.height) * 0.9;

      const drawWidth = img.width * scale;
      const drawHeight = img.height * scale;

      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      ctx.drawImage(img, x, y, drawWidth, drawHeight);
    };

    loadImages();

    // 🔥 PIN ONLY LEFT SIDE
    gsap.to(state, {
      frame: FRAME_COUNT - 1,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=300%",
        scrub: 1.2,
        pin: container, // ONLY LEFT SIDE PIN
      },
      onUpdate: render,
    });

    const handleResize = () => {
      width = canvas.parentElement!.clientWidth;
      height = window.innerHeight;
      render();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[350vh]">
      <div className="sticky top-0 h-screen flex items-center">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>
    </div>
  );
}