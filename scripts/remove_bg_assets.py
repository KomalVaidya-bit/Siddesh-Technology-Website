from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"
FRAMES_DIR = PUBLIC_DIR / "table-frames"
OUTPUT_FRAMES_DIR = PUBLIC_DIR / "table-frames-transparent"
HERO_INPUT = PUBLIC_DIR / "hero-table.png"
HERO_OUTPUT = PUBLIC_DIR / "hero-table-transparent.png"


def remove_background(image: Image.Image) -> Image.Image:
    rgba = image.convert("RGBA")
    arr = np.array(rgba)

    rgb = arr[:, :, :3].astype(np.int16)
    min_c = rgb.min(axis=2)
    max_c = rgb.max(axis=2)
    spread = max_c - min_c

    strong_bg = (min_c > 228) & (spread < 18)
    soft_bg = (min_c > 205) & (spread < 26)

    alpha = arr[:, :, 3].astype(np.float32)

    alpha[strong_bg] = 0

    soft_zone = soft_bg & (~strong_bg)
    softness = np.clip((232 - min_c) / 27.0, 0.0, 1.0)
    alpha[soft_zone] = alpha[soft_zone] * softness[soft_zone]

    arr[:, :, 3] = np.clip(alpha, 0, 255).astype(np.uint8)

    return Image.fromarray(arr, mode="RGBA")


def process_frames() -> int:
    OUTPUT_FRAMES_DIR.mkdir(parents=True, exist_ok=True)
    count = 0

    for file_path in sorted(FRAMES_DIR.glob("*.jpg")):
        out_name = f"{file_path.stem}.png"
        out_path = OUTPUT_FRAMES_DIR / out_name

        image = Image.open(file_path)
        result = remove_background(image)
        result.save(out_path, format="PNG", optimize=True)
        count += 1

    return count


def process_hero() -> bool:
    if not HERO_INPUT.exists():
        return False

    image = Image.open(HERO_INPUT)
    result = remove_background(image)
    result.save(HERO_OUTPUT, format="PNG", optimize=True)
    return True


def main() -> None:
    frame_count = process_frames()
    hero_done = process_hero()

    print(f"Processed frames: {frame_count}")
    print(f"Processed hero image: {hero_done}")


if __name__ == "__main__":
    main()
