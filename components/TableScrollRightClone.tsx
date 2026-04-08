"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FRAME_COUNT = 18;
const STATIC_TABLE_FRAME_INDEX = 0;
const KIT_CENTER_X_OFFSET_RATIO = 0;
const KIT_CENTER_Y_OFFSET_RATIO = 0.06;

type KitSlot = {
	x: number;
	y: number;
	scale: number;
	z: number;
};

type KitConfig = {
	name: string;
	source: string;
	sizeBoost: number;
	maxHeight: number;
	revealOrder: number;
	alwaysVisible?: boolean;
	slot: KitSlot;
};

type KitStageContent = {
	heading: string;
	description: string;
};

const KIT_STAGE_CONTENT: KitStageContent[] = [
	{
		heading: "Basic Electronics Exploration Kit",
		description:
			"Dummy content: foundational electronics kit with hands-on activities for circuits, components, and guided beginner experiments.",
	},
	{
		heading: "Robotics Arms Kit + Robotics Starter Kit",
		description:
			"Dummy content: dual robotics stage focused on assembly basics, movement logic, and starter automation workflows.",
	},
	{
		heading: "IoT Training Kit + DIY IoT Kit",
		description:
			"Dummy content: connected systems stage with sensor tasks, simple dashboards, and practical smart-device concepts.",
	},
	{
		heading: "RC Drone Kit + DIY Drone Kit",
		description:
			"Dummy content: drone stage for flight concepts, control familiarity, and maker-style build-and-test challenges.",
	},
	{
		heading: "VR/AR Experience Kit",
		description:
			"Dummy content: immersive learning stage introducing interactive visual experiences and guided mixed-reality exploration.",
	},
	{
		heading: "3D Printing Kit (Black)",
		description:
			"Dummy content: final fabrication stage for model preparation, print workflow understanding, and rapid prototyping exposure.",
	},
];

const KIT_CONFIGS: KitConfig[] = [
	{
		name: "Basic Electronics Exploration Kit",
		source: "/kit-frames/kit1.png",
		sizeBoost: 1.2,
		maxHeight: 0.36,
		revealOrder: 1,
		slot: { x: 0.5, y: 0.26, scale: 0.98, z: 1 },
	},
	{
		name: "Robotics Arms Kit",
		source: "/kit-frames/kit2.png",
		sizeBoost: 1.1,
		maxHeight: 0.4,
		revealOrder: 2,
		slot: { x: 0.23, y: 0.43, scale: 1.04, z: 2 },
	},
	{
		name: "Robotics Starter Kit",
		source: "/kit-frames/kit3.png",
		sizeBoost: 1.1,
		maxHeight: 1.55,
		revealOrder: 2,
		slot: { x: 0.77, y: 0.39, scale: 1.6, z: 2 },
	},
	{
		name: "IoT Training Kit",
		source: "/kit-frames/kit4.png",
		sizeBoost: 1.08,
		maxHeight: 0.44,
		revealOrder: 3,
		slot: { x: 0.25, y: 0.55, scale: 1.02, z: 4 },
	},
	{
		name: "DIY IoT Kit",
		source: "/kit-frames/kit5.png",
		sizeBoost: 1.08,
		maxHeight: 0.44,
		revealOrder: 3,
		slot: { x: 0.79, y: 0.49, scale: 1.62, z: 4 },
	},
	{
		name: "RC Drone Kit",
		source: "/kit-frames/kit6.png",
		sizeBoost: 1,
		maxHeight: 0.45,
		revealOrder: 4,
		slot: { x: 0.26, y: 0.7, scale: 1.29, z: 6 },
	},
	{
		name: "DIY Drone Kit",
		source: "/kit-frames/kit7.png",
		sizeBoost: 1,
		maxHeight: 0.44,
		revealOrder: 4,
		slot: { x: 0.79, y: 0.61, scale: 1.08, z: 5 },
	},
	{
		name: "VR/AR Experience Kit",
		source: "/kit-frames/kit8.png",
		sizeBoost: 1.04,
		maxHeight: 0.46,
		revealOrder: 5,
		slot: { x: 0.8, y: 0.7, scale: 1.84, z: 7 },
	},
	{
		name: "3D Printing Kit (Black)",
		source: "/kit-frames/kit9.png",
		sizeBoost: 1.16,
		maxHeight: 0.48,
		revealOrder: 6,
		slot: { x: 0.5, y: 0.65, scale: 1, z: 8 },
	},
];

const MAX_REVEAL_ORDER = Math.max(1, ...KIT_CONFIGS.map((kit) => kit.revealOrder));

export default function TableScrollRightClone() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const rafRef = useRef<number | null>(null);
	const stageRef = useRef<number>(1);
	const [activeStage, setActiveStage] = useState(1);

	useEffect(() => {
		gsap.registerPlugin(ScrollTrigger);

		const section = sectionRef.current;
		const canvas = canvasRef.current;
		const ctx = canvas?.getContext("2d");

		if (!section || !canvas || !ctx) return;

		const images: HTMLImageElement[] = [];
		const kitImages: HTMLImageElement[] = [];
		const cutoutFrames: Array<HTMLCanvasElement | null> = Array.from(
			{ length: FRAME_COUNT },
			() => null,
		);
		const state = { frame: 0 };

		let width = canvas.parentElement!.clientWidth;
		let height = canvas.parentElement!.clientHeight;

		const getStageFromFrame = (frame: number) => {
			const progress = Math.max(0, Math.min(1, frame / (FRAME_COUNT - 1)));
			const sequenceStart = 0.04;
			const sequenceEnd = 0.96;
			const sequenceProgress = Math.max(
				0,
				Math.min(1, (progress - sequenceStart) / (sequenceEnd - sequenceStart)),
			);

			if (sequenceProgress <= 0) {
				return 1;
			}

			return Math.min(MAX_REVEAL_ORDER, Math.max(1, Math.ceil(sequenceProgress * MAX_REVEAL_ORDER)));
		};

		const syncStage = () => {
			const nextStage = getStageFromFrame(state.frame);
			if (nextStage !== stageRef.current) {
				stageRef.current = nextStage;
				setActiveStage(nextStage);
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
			for (let i = 1; i <= FRAME_COUNT; i++) {
				const img = new Image();
				img.src = `/table-frames/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;

				await new Promise((resolve) => {
					img.onload = () => resolve(undefined);
					img.onerror = () => resolve(undefined);
				});

				images.push(img);
				if (img.naturalWidth && img.naturalHeight) {
					cutoutFrames[i - 1] = buildCutoutFrame(img);
				}
			}

			for (const kit of KIT_CONFIGS) {
				const kitImage = new Image();
				kitImage.src = kit.source;
				await new Promise((resolve) => {
					kitImage.onload = () => resolve(undefined);
					kitImage.onerror = () => resolve(undefined);
				});
				kitImages.push(kitImage);
			}

			render();
		};

		const render = () => {
			const img = images[STATIC_TABLE_FRAME_INDEX];
			if (!img || !img.naturalWidth || !img.naturalHeight) return;

			width = canvas.parentElement!.clientWidth;
			height = canvas.parentElement!.clientHeight;

			const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);

			const targetWidth = Math.max(1, Math.floor(width * pixelRatio));
			const targetHeight = Math.max(1, Math.floor(height * pixelRatio));
			if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
				canvas.width = targetWidth;
				canvas.height = targetHeight;
				canvas.style.width = `${width}px`;
				canvas.style.height = `${height}px`;
			}

			ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
			ctx.clearRect(0, 0, width, height);
			ctx.imageSmoothingEnabled = true;
			ctx.imageSmoothingQuality = "high";

			const responsiveScale = width < 640 ? 0.96 : width < 1024 ? 1.04 : 1.12;
			const frameIndex = STATIC_TABLE_FRAME_INDEX;
			const source = cutoutFrames[frameIndex] ?? img;
			const scale = Math.min(width / source.width, height / source.height) * responsiveScale;

			const drawWidth = source.width * scale;
			const drawHeight = source.height * scale;
			const x = (width - drawWidth) / 2;
			const y = (height - drawHeight) / 2;

			ctx.drawImage(source, x, y, drawWidth, drawHeight);

			if (!kitImages.length) {
				return;
			}

			const progress = Math.max(0, Math.min(1, state.frame / (FRAME_COUNT - 1)));
			const sequenceStart = 0.04;
			const sequenceEnd = 0.96;
			const sequenceProgress = Math.max(
				0,
				Math.min(1, (progress - sequenceStart) / (sequenceEnd - sequenceStart)),
			);

			if (sequenceProgress <= 0) {
				return;
			}

			const kitCount = Math.min(KIT_CONFIGS.length, kitImages.length);
			if (!kitCount) {
				return;
			}

			const activeKits = KIT_CONFIGS.slice(0, kitCount).map((config, index) => ({
				config,
				image: kitImages[index],
			}));
			const maxRevealOrder = Math.max(
				1,
				...activeKits
					.map((item) => item.config.revealOrder)
					.filter((value) => value > 0),
			);

			const stagedKits = activeKits
				.map((item, index) => ({
					...item,
					index,
				}))
				.sort((a, b) => a.config.slot.z - b.config.slot.z);

			for (const stagedKit of stagedKits) {
				const {
					config: { slot, sizeBoost, maxHeight, revealOrder, alwaysVisible },
					index,
					image,
				} = stagedKit;

				if (!image.naturalWidth || !image.naturalHeight) {
					continue;
				}

				const localProgress = alwaysVisible
					? 1
					: sequenceProgress <= (revealOrder - 1) / maxRevealOrder
						? 0
						: sequenceProgress >= revealOrder / maxRevealOrder
							? 1
							: (sequenceProgress - (revealOrder - 1) / maxRevealOrder) / (1 / maxRevealOrder);

				if (localProgress <= 0) {
					continue;
				}

				const easedProgress = Math.pow(localProgress, 0.72);
				const revealProgress = Math.min(1, easedProgress / 0.7);

				const kitBaseWidth = Math.min(drawWidth * 0.28, width * 0.32);
				const kitWidth = kitBaseWidth * slot.scale;
				const kitAspect = image.naturalHeight / image.naturalWidth;
				const maxKitHeight = drawHeight * maxHeight * 1.32;
				const unconstrainedHeight = kitWidth * kitAspect * sizeBoost;
				const fitRatio = unconstrainedHeight > maxKitHeight ? maxKitHeight / unconstrainedHeight : 1;
				const finalKitWidth = kitWidth * sizeBoost * fitRatio;
				const finalKitHeight = unconstrainedHeight * fitRatio;

				const targetCenterX = x + drawWidth * (slot.x + KIT_CENTER_X_OFFSET_RATIO * 0.45);
				const targetCenterY =
					y +
					drawHeight * (slot.y + KIT_CENTER_Y_OFFSET_RATIO * 0.32);
				const firstKitVerticalDrop = index === 0 ? drawHeight * 0.06 * revealProgress : 0;

				const centerX = targetCenterX;
				const centerY = targetCenterY + firstKitVerticalDrop;

				ctx.save();
				ctx.beginPath();
				ctx.rect(x, y, drawWidth, drawHeight);
				ctx.clip();
				ctx.globalAlpha = 0.05 + revealProgress * 0.95;
				ctx.shadowColor = "rgba(0, 0, 0, 0.2)";
				ctx.shadowBlur = 6;
				ctx.shadowOffsetY = 3;
				ctx.translate(centerX, centerY);
				ctx.drawImage(image, -finalKitWidth / 2, -finalKitHeight / 2, finalKitWidth, finalKitHeight);
				ctx.restore();
			}
		};

		const requestRender = () => {
			if (rafRef.current !== null) {
				return;
			}

			rafRef.current = window.requestAnimationFrame(() => {
				rafRef.current = null;
				render();
			});
		};

		void loadImages().then(() => {
			syncStage();
			requestRender();
		});

		const tween = gsap.to(state, {
			frame: FRAME_COUNT - 1,
			ease: "none",
			scrollTrigger: {
				trigger: section,
				start: "top top",
				end: "+=520%",
				scrub: 2.6,
				pin: true,
			},
			onUpdate: () => {
				syncStage();
				requestRender();
			},
		});

		const handleResize = () => {
			width = canvas.parentElement!.clientWidth;
			height = canvas.parentElement!.clientHeight;
			requestRender();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			if (rafRef.current !== null) {
				window.cancelAnimationFrame(rafRef.current);
			}
			tween.scrollTrigger?.kill();
			tween.kill();
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	const contentIndex = Math.max(0, Math.min(KIT_STAGE_CONTENT.length - 1, activeStage - 1));
	const activeContent = KIT_STAGE_CONTENT[contentIndex];

	return (
		<section ref={sectionRef} className="w-full overflow-x-hidden bg-[#eef0ed] py-3 sm:py-4 md:py-8">
			<div className="mx-auto w-full max-w-7xl overflow-x-hidden px-3 sm:px-6">
				<div className="grid min-w-0 grid-cols-[0.95fr_1.05fr] items-start gap-2 sm:gap-3 md:min-h-screen md:items-center md:grid-cols-[0.58fr_1.42fr] md:gap-7 lg:grid-cols-[0.62fr_1.38fr]">
					<div className="order-1 h-[270px] min-w-0 overflow-y-auto rounded-2xl border border-[#d2d8d1] bg-gradient-to-b from-[#f8faf7] to-[#edf2ed] p-3 shadow-[0_20px_55px_-40px_rgba(33,58,42,0.52)] sm:h-[380px] sm:rounded-3xl sm:p-5 md:h-auto md:overflow-visible md:p-7">
						<p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#4f6a59]">Stages</p>
						<div key={activeStage} className="mt-2 space-y-2 sm:mt-3 sm:space-y-3">
							<span className="inline-flex rounded-full border border-[#c8d2c9] bg-white px-2 py-1 text-[10px] font-semibold text-[#2f4c3c] sm:px-3 sm:text-xs">
								Stage {String(activeStage).padStart(2, "0")}
							</span>
							<h3 className="text-base font-semibold leading-snug text-[#1e3528] sm:text-2xl lg:text-[2rem]">
								{activeContent.heading}
							</h3>
							<p className="max-w-md text-[11px] leading-5 text-[#41594b] sm:text-sm sm:leading-7 lg:text-base">
								{activeContent.description}
							</p>
						</div>
						<div className="mt-3 grid grid-cols-2 gap-1.5 sm:mt-5 sm:grid-cols-3 sm:gap-2 md:grid-cols-3 lg:grid-cols-3">
							{KIT_STAGE_CONTENT.map((content, index) => {
								const isActive = index + 1 === activeStage;
								return (
									<button
										type="button"
										key={content.heading}
										className={`cursor-default rounded-lg border px-1.5 py-2 text-center text-[10px] font-medium transition-all duration-300 sm:px-2 sm:py-2.5 sm:text-[11px] ${
											isActive
												? "border-[#1e4fa8] bg-[#1e4fa8] text-white shadow-md"
												: "border-[#d3dff2] bg-white text-[#4a628c]"
										}`}
										aria-current={isActive ? "true" : undefined}
										tabIndex={-1}
									>
										Stage {String(index + 1).padStart(2, "0")}
									</button>
								);
							})}
						</div>
					</div>
					<div className="relative order-2 ml-auto min-w-0 h-[270px] w-full translate-x-0 sm:h-[380px] md:h-[520px] md:w-[100%] md:translate-x-3 lg:h-[680px] lg:w-[98%] lg:translate-x-6">
						<canvas ref={canvasRef} className="h-full w-full" />
					</div>
				</div>
			</div>
		</section>
	);
}
