#!/usr/bin/env python3
"""Extract unique, web-ready DSO figures from the supplied 2026/27 PDF."""

from __future__ import annotations

import argparse
import json
import re
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageStat
from pypdf import PdfReader


TARGETS = [
    (1, 13, "andromeda-galaxy", "Andromeda Galaxy", ["M31", "Andromeda"]),
    (14, 24, "sombrero-galaxy", "Sombrero Galaxy", ["M104", "NGC 4594", "Sombrero"]),
    (25, 33, "m51", "M51", ["Whirlpool Galaxy", "NGC 5194", "M51"]),
    (34, 42, "ngc-4536", "NGC 4536", ["NGC 4536"]),
    (43, 43, "mcg-07-33-027", "MCG+07-33-027", ["MCG+07-33-027"]),
    (44, 57, "ngc-1569", "NGC 1569", ["NGC 1569"]),
    (58, 71, "antennae-galaxies", "Antennae Galaxies", ["NGC 4038", "NGC 4039", "Antennae"]),
    (72, 93, "arp-143", "Arp 143", ["NGC 2444", "NGC 2445", "Arp 143"]),
    (94, 102, "arp-147", "Arp 147", ["Arp 147"]),
    (103, 110, "cartwheel-galaxy", "Cartwheel Galaxy", ["ESO 350-40", "Cartwheel"]),
    (111, 139, "m82", "M82", ["Cigar Galaxy", "NGC 3034", "M82"]),
    (140, 157, "gw170817", "GW170817", ["NGC 4993", "AT 2017gfo", "GW170817"]),
    (158, 171, "terzan-5", "Terzan 5", ["Terzan 5"]),
]


def difference_hash(image: Image.Image, size: int = 16) -> int:
    pixels = list(image.convert("L").resize((size + 1, size)).getdata())
    value = 0
    for y in range(size):
        for x in range(size):
            value = (value << 1) | (pixels[y * (size + 1) + x] > pixels[y * (size + 1) + x + 1])
    return value


def hamming(left: int, right: int) -> int:
    return (left ^ right).bit_count()


def infer_band(text: str) -> str:
    lowered = text.lower()
    bands = []
    if re.search(r"x[ -]?ray|chandra|xmm", lowered):
        bands.append("X-ray")
    if re.search(r"infrared|\bir\b|jwst|spitzer|wise|herschel|miri|nircam", lowered):
        bands.append("Infrared")
    if re.search(r"ultraviolet|\buv\b", lowered):
        bands.append("Ultraviolet")
    if re.search(r"radio|alma|vla|green bank", lowered):
        bands.append("Radio")
    if re.search(r"visible|optical|hst|hubble", lowered):
        bands.append("Visible")
    unique = list(dict.fromkeys(bands))
    return "Multiwavelength" if len(unique) > 1 else (unique[0] if unique else "Visible")


def clean_context(text: str, object_name: str, page_number: int) -> str:
    flattened = " ".join(text.split())
    flattened = re.sub(rf"^{re.escape(object_name)}(?:\s*\([^)]*\))?\s*", "", flattened, flags=re.I)
    sentences = re.split(r"(?<=[.!?])\s+", flattened)
    sentences = [sentence for sentence in sentences if "constellation" not in sentence.lower()]
    summary = " ".join(sentences).strip()
    if not summary:
        summary = f"Scientific figure for {object_name}."
    return f"DSO Images 26_27 PDF, page {page_number}: {summary[:360].rstrip()}"


def target_for_page(page_number: int):
    for target in TARGETS:
        if target[0] <= page_number <= target[1]:
            return target
    return None


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("--project", type=Path, default=Path(__file__).resolve().parents[1])
    args = parser.parse_args()

    project = args.project.resolve()
    output_dir = project / "public" / "dso-pdf-bank"
    output_dir.mkdir(parents=True, exist_ok=True)
    reader = PdfReader(str(args.pdf))

    existing_hashes = []
    for path in (project / "public" / "dso-bank").glob("*.webp"):
        with Image.open(path) as image:
            existing_hashes.append(difference_hash(image))

    accepted_hashes: list[int] = []
    entries = []
    counters: dict[str, int] = {}

    for page_number, page in enumerate(reader.pages[:171], start=1):
        target = target_for_page(page_number)
        if not target:
            continue
        _, _, slug, name, aliases = target
        page_text = page.extract_text() or ""
        for embedded in page.images:
            image = embedded.image.convert("RGB")
            width, height = image.size
            if width * height < 80_000 or max(width, height) < 300 or min(width, height) < 100:
                continue
            if max(ImageStat.Stat(image.convert("L").resize((64, 64))).stddev) < 4:
                continue
            image_hash = difference_hash(image)
            if any(hamming(image_hash, prior) <= 2 for prior in existing_hashes + accepted_hashes):
                continue

            accepted_hashes.append(image_hash)
            counters[slug] = counters.get(slug, 0) + 1
            sequence = counters[slug]
            identifier = f"{slug}-pdf-{sequence:03d}"
            path = output_dir / f"{identifier}.webp"
            image.thumbnail((1024, 1024), Image.Resampling.LANCZOS)
            image.save(path, "WEBP", quality=72, method=0)
            print(f"extracted {identifier}", flush=True)

            research_figure = ".pdf" in page_text.lower()
            if research_figure:
                difficulty = "Nationals"
            elif sequence <= 3:
                difficulty = "Foundations"
            elif sequence <= 8:
                difficulty = "Core"
            elif sequence <= 16:
                difficulty = "Invitational"
            else:
                difficulty = "Nationals"

            entries.append({
                "id": identifier,
                "name": name,
                "aliases": aliases,
                "image": f"/dso-pdf-bank/{path.name}",
                "band": infer_band(page_text),
                "difficulty": difficulty,
                "context": clean_context(page_text, name, page_number),
            })

    data_path = project / "app" / "dso-pdf-data.ts"
    rendered = json.dumps(entries, ensure_ascii=False, indent=2)
    data_path.write_text(
        "// Generated by scripts/extract_dso_pdf.py. Pages 172-184 (constellations) are intentionally excluded.\n"
        "export type DsoPdfImage = {\n"
        "  id: string;\n"
        "  name: string;\n"
        "  aliases: readonly string[];\n"
        "  image: string;\n"
        "  band: string;\n"
        "  difficulty: string;\n"
        "  context: string;\n"
        "};\n\n"
        f"export const dsoPdfImages: DsoPdfImage[] = {rendered};\n",
        encoding="utf-8",
    )
    print(json.dumps({"images": len(entries), "bytes": sum(path.stat().st_size for path in output_dir.glob("*.webp")), "by_object": counters}, indent=2))


if __name__ == "__main__":
    main()
