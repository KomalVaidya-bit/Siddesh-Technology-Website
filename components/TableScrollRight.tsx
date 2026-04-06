"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAME_COUNT = 18;
const KIT_SOURCES = Array.from({ length: 9 }, (_, index) => `/kit-frames/kit${index + 1}.png`);
const KIT_SEQUENCE_START = 0.04;
const KIT_SEQUENCE_END = 0.96;
const KIT_SCROLL_SNAP_MIN_SECONDS = 2;
const KIT_SCROLL_SNAP_MAX_SECONDS = 3;

const KIT_DETAILS = [
  {
    label: "Kit 01",
    title: "Basic Electronics Exploration Kit",
    description:
      "Built for practical electronics basics including circuit testing, voltage checks, and component behavior understanding.",
  },
  {
    label: "Kit 02",
    title: "Robotics Arms Kit",
    description:
      "Hands-on robotic arm kit focused on motion sequences, grip control, and repeatable pick-and-place experiments.",
  },
  {
    label: "Kit 03",
    title: "Robotics Starter Kit",
    description:
      "Entry-level robotics setup for assembling drive systems, learning control logic, and testing movement commands.",
  },
  {
    label: "Kit 04",
    title: "Iot Training Kit",
    description:
      "Structured IoT training package for sensor-to-cloud workflows, live monitoring, and real-time data projects.",
  },
  {
    label: "Kit 05",
    title: "DIY Iot Kit",
    description:
      "Maker-focused IoT kit for self-built prototypes, custom wiring layouts, and rapid feature experimentation.",
  },
  {
    label: "Kit 06",
    title: "RC Drone",
    description:
      "Remote-control drone package for flight practice, stability tuning, and basic aerial control demonstrations.",
  },
  {
    label: "Kit 07",
    title: "DIY Drone Kit",
    description:
      "Build-your-own drone kit covering frame assembly, motor balancing, and hands-on flight system integration.",
  },
  {
    label: "Kit 08",
    title: "VR/AR Exploration Kit",
    description:
      "Immersive VR and AR exploration kit for guided interactive experiences, spatial learning, and visual simulations.",
  },
  {
    label: "Kit 09",
    title: "3D Printing Kit",
    description:
      "Complete 3D printing setup for model slicing, printer calibration, and quality-focused prototype fabrication.",
  },
] as const;

type KitSizingProfile = {
  widthBoost: number;
  maxHeightRatio: number;
  enterScale: number;
};

type KitSizeControl = {
  canvasScale: number;
  overlayScale: number;
};

type KitPositionOffset = {
  xRatio: number;
  yRatio: number;
};

// Per-kit sizing profile: tune each kit independently without touching render math.
const KIT_SIZING_PROFILES: readonly KitSizingProfile[] = [
  { widthBoost: 1.16, maxHeightRatio: 0.46, enterScale: 0.9 },
  { widthBoost: 1.2, maxHeightRatio: 0.48, enterScale: 0.91 },
  { widthBoost: 5.0, maxHeightRatio: 0.56, enterScale: 0.92 },
  { widthBoost: 1.0, maxHeightRatio: 0.44, enterScale: 0.88 },
  { widthBoost: 5.0, maxHeightRatio: 0.49, enterScale: 0.93 },
  { widthBoost: 1.16, maxHeightRatio: 0.52, enterScale: 0.9 },
  { widthBoost: 1.08, maxHeightRatio: 0.46, enterScale: 0.89 },
  { widthBoost: 2.15, maxHeightRatio: 0.62, enterScale: 0.94 },
  { widthBoost: 1.5, maxHeightRatio: 0.58, enterScale: 0.95 },
] as const;

// Per-kit manual size controls (index 0 = Kit 01, index 1 = Kit 02 ...).
// Increase value (>1) to enlarge, decrease value (<1) to shrink a kit.
const KIT_SIZE_CONTROLS: readonly KitSizeControl[] = [
  { canvasScale: 1, overlayScale: 1 },
  { canvasScale: 1, overlayScale: 1 },
  { canvasScale: 1.42, overlayScale: 1.42 },
  { canvasScale: 0.84, overlayScale: 0.84 },
  { canvasScale: 1.28, overlayScale: 1.28 },
  { canvasScale: 1, overlayScale: 1 },
  { canvasScale: 0.8, overlayScale: 0.8 },
  { canvasScale: 1.4, overlayScale: 1.4 },
  { canvasScale: 0.8, overlayScale: 0.8 },
] as const;

// Per-kit position offset inside table frame. Positive x moves right, negative x moves left.
const KIT_POSITION_OFFSETS: readonly KitPositionOffset[] = [
  { xRatio: 0, yRatio: 0 },
  { xRatio: 0, yRatio: 0 },
  { xRatio: 0.08, yRatio: 0.04 },
  { xRatio: 0, yRatio: -0.03 },
  { xRatio: 0.06, yRatio: 0 },
  { xRatio: 0, yRatio: 0 },
  { xRatio: -0.03, yRatio: 0 },
  { xRatio: 0.06, yRatio: 0.05 },
  { xRatio: -0.04, yRatio: 0 },
] as const;

// One global control to scale all kits up/down together.
const GLOBAL_KIT_SIZE_SCALE = 1.45;
const KIT_CENTER_X_OFFSET_RATIO = 0;
const KIT_CENTER_Y_OFFSET_RATIO = 0.06;

export default function TableScrollRight() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const activeKitRef = useRef(0);
  const pinnedKitRef = useRef<number | null>(null);
  const [activeKitIndex, setActiveKitIndex] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!section || !canvas || !ctx) return;

    const renderCanvas = canvas;
    const renderCtx = ctx;

    const images: HTMLImageElement[] = [];
    const kitImages: HTMLImageElement[] = [];
    const cutoutFrames: Array<HTMLCanvasElement | null> = Array.from(
      { length: FRAME_COUNT },
      () => null,
    );
    const state = { frame: 0 };
    const hoverState = { scale: 1 };

    let width = renderCanvas.parentElement!.clientWidth;
    let height = renderCanvas.parentElement!.clientHeight;

    const getClosestLoadedFrame = (targetIndex: number) => {
      const current = images[targetIndex];
      if (current?.naturalWidth && current?.naturalHeight) {
        return current;
      }

      for (let offset = 1; offset < FRAME_COUNT; offset += 1) {
        const previous = targetIndex - offset;
        const next = targetIndex + offset;

        if (previous >= 0) {
          const previousImage = images[previous];
          if (previousImage?.naturalWidth && previousImage?.naturalHeight) {
            return previousImage;
          }
        }

        if (next < FRAME_COUNT) {
          const nextImage = images[next];
          if (nextImage?.naturalWidth && nextImage?.naturalHeight) {
            return nextImage;
          }
        }
      }

      return null;
    };

    const getDisplayedKitIndex = (scrollIndex: number) => pinnedKitRef.current ?? scrollIndex;

    const updateActiveKit = (frameValue: number) => {
      const progress = Math.max(0, Math.min(1, frameValue / (FRAME_COUNT - 1)));
      const sequenceProgress = Math.max(
        0,
        Math.min(1, (progress - KIT_SEQUENCE_START) / (KIT_SEQUENCE_END - KIT_SEQUENCE_START)),
      );

      const stage = sequenceProgress * KIT_DETAILS.length;
      const scrollIndex = Math.min(KIT_DETAILS.length - 1, Math.floor(stage));
      const nextIndex = getDisplayedKitIndex(scrollIndex);

      if (nextIndex !== activeKitRef.current) {
        activeKitRef.current = nextIndex;
        setActiveKitIndex(nextIndex);
      }
    };

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

    const loadImages = async () => {
      await Promise.all(
        Array.from({ length: FRAME_COUNT }, (_, index) =>
          new Promise<void>((resolve) => {
            const img = new Image();
            img.decoding = "async";
            img.src = `/table-frames/ezgif-frame-${String(index + 1).padStart(3, "0")}.jpg`;

            img.onload = () => {
              images[index] = img;
              cutoutFrames[index] = buildCutoutFrame(img);
              resolve();
            };

            img.onerror = () => {
              resolve();
            };
          }),
        ),
      );

      await Promise.all(
        KIT_SOURCES.map(
          (source, index) =>
            new Promise<void>((resolve) => {
              const kitImage = new Image();
              kitImage.decoding = "async";
              kitImage.src = source;

              kitImage.onload = () => {
                kitImages[index] = kitImage;
                resolve();
              };

              kitImage.onerror = () => {
                resolve();
              };
            }),
        ),
      );

      render();
    };

    function render() {
      const frameIndex = Math.max(0, Math.min(FRAME_COUNT - 1, Math.floor(state.frame)));
      const img = getClosestLoadedFrame(frameIndex);
      if (!img || !img.naturalWidth || !img.naturalHeight) return;

      width = renderCanvas.parentElement!.clientWidth;
      height = renderCanvas.parentElement!.clientHeight;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);

      const targetWidth = Math.max(1, Math.floor(width * pixelRatio));
      const targetHeight = Math.max(1, Math.floor(height * pixelRatio));
      if (renderCanvas.width !== targetWidth || renderCanvas.height !== targetHeight) {
        renderCanvas.width = targetWidth;
        renderCanvas.height = targetHeight;
        renderCanvas.style.width = `${width}px`;
        renderCanvas.style.height = `${height}px`;
      }

      renderCtx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      renderCtx.clearRect(0, 0, width, height);
      renderCtx.imageSmoothingEnabled = true;
      renderCtx.imageSmoothingQuality = "high";

      const responsiveScale = width < 640 ? 0.96 : width < 1024 ? 1.04 : 1.12;
      const source = cutoutFrames[frameIndex] ?? img;
      const scale = Math.min(width / source.width, height / source.height) * responsiveScale;

      const drawWidth = source.width * scale;
      const drawHeight = source.height * scale;
      const x = (width - drawWidth) / 2;
      const y = (height - drawHeight) / 2;

      renderCtx.drawImage(source, x, y, drawWidth, drawHeight);

      const loadedKitImages = kitImages.filter(
        (image): image is HTMLImageElement => !!image?.naturalWidth && !!image?.naturalHeight,
      );
      const loadedKitCount = loadedKitImages.length;

      if (!loadedKitCount) {
        return;
      }

      const progress = Math.max(0, Math.min(1, state.frame / (FRAME_COUNT - 1)));
      const sequenceProgress = Math.max(
        0,
        Math.min(1, (progress - KIT_SEQUENCE_START) / (KIT_SEQUENCE_END - KIT_SEQUENCE_START)),
      );

      if (sequenceProgress <= 0.01) {
        return;
      }

      const kitStage = sequenceProgress * loadedKitCount;
      const scrollKitIndex = Math.min(loadedKitCount - 1, Math.floor(kitStage));
      const kitIndex = getDisplayedKitIndex(scrollKitIndex);
      const currentKit = loadedKitImages[kitIndex] ?? loadedKitImages[scrollKitIndex];

      if (!currentKit || !currentKit.naturalWidth || !currentKit.naturalHeight) {
        return;
      }

      const stageProgress = Math.max(0, Math.min(1, kitStage - kitIndex));
      const easedStageProgress = stageProgress * stageProgress * (3 - 2 * stageProgress);
      const revealProgress =
        kitIndex === scrollKitIndex ? Math.min(1, easedStageProgress / 0.82) : 1;

      const sizingProfile = KIT_SIZING_PROFILES[kitIndex] ?? KIT_SIZING_PROFILES[0];
      const sizeControl = KIT_SIZE_CONTROLS[kitIndex] ?? KIT_SIZE_CONTROLS[0];
      const positionOffset = KIT_POSITION_OFFSETS[kitIndex] ?? KIT_POSITION_OFFSETS[0];
      const desktopReferenceWidth = 1280;
      const responsiveWidthFactor = Math.max(0.94, Math.min(1.12, width / desktopReferenceWidth));
      const normalizedArea = Math.sqrt((currentKit.naturalWidth * currentKit.naturalHeight) / 140000);
      const areaCompensation = 1 / Math.max(0.92, Math.min(1.12, normalizedArea));

      const kitBaseWidth = Math.min(drawWidth * 0.3, width * 0.36);
      const revealScale = sizingProfile.enterScale + revealProgress * (1 - sizingProfile.enterScale);
      const kitWidth =
        kitBaseWidth *
        revealScale *
        sizingProfile.widthBoost *
        sizeControl.canvasScale *
        responsiveWidthFactor *
        areaCompensation *
        GLOBAL_KIT_SIZE_SCALE;
      const kitAspect = currentKit.naturalHeight / currentKit.naturalWidth;
      const maxKitHeight =
        drawHeight * sizingProfile.maxHeightRatio * Math.max(1, sizeControl.canvasScale * 0.96);
      const unconstrainedHeight = kitWidth * kitAspect;
      const fitRatio = unconstrainedHeight > maxKitHeight ? maxKitHeight / unconstrainedHeight : 1;
      const finalKitWidth = kitWidth * fitRatio * hoverState.scale;
      const finalKitHeight = unconstrainedHeight * fitRatio * hoverState.scale;

      const centerX = x + drawWidth * (0.5 + KIT_CENTER_X_OFFSET_RATIO + positionOffset.xRatio);
      const centerY =
        y +
        drawHeight * (0.4 + KIT_CENTER_Y_OFFSET_RATIO + positionOffset.yRatio) -
        drawHeight * (1 - revealProgress) * 0.035;
      const kitX = centerX - finalKitWidth / 2;
      const kitY = centerY - finalKitHeight / 2;

      renderCtx.save();
      renderCtx.beginPath();
      renderCtx.rect(x, y, drawWidth, drawHeight);
      renderCtx.clip();
      renderCtx.globalAlpha = 0.25 + revealProgress * 0.75;
      renderCtx.shadowColor = "rgba(0, 0, 0, 0.22)";
      renderCtx.shadowBlur = 5;
      renderCtx.shadowOffsetY = 3;
      renderCtx.drawImage(currentKit, kitX, kitY, finalKitWidth, finalKitHeight);
      renderCtx.restore();
    }

    function requestRender() {
      if (rafRef.current !== null) {
        return;
      }

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        render();
      });
    }

    void loadImages().then(() => {
      updateActiveKit(state.frame);
      requestRender();
    });

    const mobileViewport = window.innerWidth < 768;
    const compactViewport = window.innerWidth < 640;
    const scrollEndDistance = compactViewport ? "+=980%" : mobileViewport ? "+=900%" : "+=760%";
    const scrollScrubAmount = compactViewport ? 4 : mobileViewport ? 3.6 : 3.2;

    const tween = gsap.to(state, {
      frame: FRAME_COUNT - 1,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: scrollEndDistance,
        scrub: scrollScrubAmount,
        pin: true,
        invalidateOnRefresh: true,
        snap: {
          snapTo: (value: number) => {
            if (value <= KIT_SEQUENCE_START) {
              return 0;
            }

            if (value >= KIT_SEQUENCE_END) {
              return 1;
            }

            const interval = 1 / (KIT_DETAILS.length - 1);
            const normalized =
              (value - KIT_SEQUENCE_START) / (KIT_SEQUENCE_END - KIT_SEQUENCE_START);
            const snapped = Math.round(normalized / interval) * interval;

            return KIT_SEQUENCE_START + snapped * (KIT_SEQUENCE_END - KIT_SEQUENCE_START);
          },
          duration: {
            min: KIT_SCROLL_SNAP_MIN_SECONDS,
            max: KIT_SCROLL_SNAP_MAX_SECONDS,
          },
          delay: 0.06,
          ease: "power2.inOut",
        },
      },
      onUpdate: () => {
        updateActiveKit(state.frame);
        requestRender();
      },
    });

    const zoomKitIn = () => {
      gsap.to(hoverState, {
        scale: 1.12,
        duration: 0.28,
        ease: "power2.out",
        onUpdate: requestRender,
      });
    };

    const zoomKitOut = () => {
      gsap.to(hoverState, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
        onUpdate: requestRender,
      });
    };

    const handleResize = () => {
      width = canvas.parentElement!.clientWidth;
      height = canvas.parentElement!.clientHeight;
      requestRender();
      ScrollTrigger.refresh();
    };

    const kitBadges = Array.from(section.querySelectorAll<HTMLElement>("[data-kit-badge='true']"));
    for (const badge of kitBadges) {
      const kitIndex = Number.parseInt(badge.dataset.kitIndex ?? "0", 10);

      const togglePinnedKit = () => {
        const safeIndex = Number.isNaN(kitIndex) ? 0 : kitIndex;
        pinnedKitRef.current = safeIndex;
        setActiveKitIndex(getDisplayedKitIndex(activeKitRef.current));
        requestRender();
      };

      badge.addEventListener("click", togglePinnedKit);

      (badge as HTMLElement & {
        __togglePinnedKit?: () => void;
      }).__togglePinnedKit = togglePinnedKit;
    }

    window.addEventListener("resize", handleResize);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      tween.scrollTrigger?.kill();
      tween.kill();
      window.removeEventListener("resize", handleResize);
      for (const badge of kitBadges) {
        const handlers = badge as HTMLElement & {
          __togglePinnedKit?: () => void;
        };
        if (handlers.__togglePinnedKit) {
          badge.removeEventListener("click", handlers.__togglePinnedKit);
        }
      }
    };
  }, []);

  const activeKit = KIT_DETAILS[activeKitIndex];
  const activeKitSource = KIT_SOURCES[Math.max(0, Math.min(KIT_SOURCES.length - 1, activeKitIndex))];
  const activeKitOverlayScale =
    (KIT_SIZE_CONTROLS[Math.max(0, Math.min(KIT_SIZE_CONTROLS.length - 1, activeKitIndex))]
      ?.overlayScale ?? 1);
  const activeKitPositionOffset =
    (KIT_POSITION_OFFSETS[Math.max(0, Math.min(KIT_POSITION_OFFSETS.length - 1, activeKitIndex))] ??
      KIT_POSITION_OFFSETS[0]);

  return (
    <section ref={sectionRef} className="w-full overflow-x-hidden bg-[#eef0ed] py-3 sm:py-4 md:py-8">
      <div className="mx-auto w-full max-w-7xl overflow-x-hidden px-3 sm:px-6">
        <div className="grid min-w-0 grid-cols-[0.95fr_1.05fr] items-start gap-2 sm:gap-3 md:min-h-screen md:items-center md:grid-cols-[0.58fr_1.42fr] md:gap-7 lg:grid-cols-[0.62fr_1.38fr]">
          <div className="order-1 h-[270px] min-w-0 overflow-y-auto rounded-2xl border border-[#d2d8d1] bg-gradient-to-b from-[#f8faf7] to-[#edf2ed] p-3 shadow-[0_20px_55px_-40px_rgba(33,58,42,0.52)] sm:h-[380px] sm:rounded-3xl sm:p-5 md:h-auto md:overflow-visible md:p-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4f6a59]">Kits</p>
            <div key={activeKitIndex} className="mt-2 space-y-2 sm:mt-3 sm:space-y-3">
              <span className="inline-flex rounded-full border border-[#c8d2c9] bg-white px-2 py-1 text-[10px] font-semibold text-[#2f4c3c] sm:px-3 sm:text-xs">
                {activeKit.label}
              </span>
              <h3 className="text-base font-semibold leading-snug text-[#1e3528] sm:text-2xl lg:text-[2rem]">
                {activeKit.title}
              </h3>
              <p className="max-w-md text-[11px] leading-5 text-[#41594b] sm:text-sm sm:leading-7 lg:text-base">
                {activeKit.description}
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-1.5 sm:mt-5 sm:grid-cols-4 sm:gap-2 md:grid-cols-3 lg:grid-cols-4">
              {KIT_DETAILS.map((kit, index) => {
                const isActive = index === activeKitIndex;
                return (
                  <button
                    type="button"
                    key={kit.label}
                    data-kit-badge="true"
                    data-kit-index={index}
                    className={`cursor-pointer rounded-lg border px-1.5 py-2 text-center text-[10px] font-medium transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.04] focus:outline-none focus:ring-2 focus:ring-[#7ea6e6] sm:px-2 sm:py-2.5 sm:text-[11px] ${
                      isActive
                        ? "border-[#1e4fa8] bg-[#1e4fa8] text-white shadow-md"
                        : "border-[#d3dff2] bg-white text-[#4a628c]"
                    }`}
                  >
                    {kit.label}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="relative order-2 ml-auto min-w-0 h-[270px] w-full translate-x-0 sm:h-[380px] md:h-[520px] md:w-[90%] md:translate-x-3 lg:h-[680px] lg:w-[88%] lg:translate-x-6">
            <canvas ref={canvasRef} className="h-full w-full" />
            <img
              src={activeKitSource}
              alt={activeKit.title}
              className="pointer-events-none absolute z-10 h-auto w-[48%] max-w-[440px] -translate-x-1/2 -translate-y-[42%] object-contain opacity-95 sm:w-[46%] md:w-[44%] lg:w-[40%]"
              style={{
                left: `calc(50% + ${(activeKitPositionOffset.xRatio * 100).toFixed(2)}%)`,
                top: `calc(50% + ${(activeKitPositionOffset.yRatio * 100).toFixed(2)}%)`,
                scale: activeKitOverlayScale,
                transformOrigin: "center",
              }}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
