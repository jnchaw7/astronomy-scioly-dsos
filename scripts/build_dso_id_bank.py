#!/usr/bin/env python3
"""Make an answer-hidden ID bank from the supplied 2026/27 DSO PDF figures.

The complete, unaltered extraction remains in public/dso-pdf-bank for study.
This selects figures for ID practice and trims printed paper captions/titles
without changing the plotted data or astronomical image content.
"""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image, ImageChops, ImageStat


PROJECT = Path(__file__).resolve().parents[1]
SOURCE = PROJECT / "public/dso-pdf-bank"
DEST = PROJECT / "public/dso-id-bank"
DATA = PROJECT / "app/dso-pdf-data.ts"
OUTPUT = PROJECT / "app/dso-id-data.ts"


def seqs(spec: str) -> set[int]:
    result: set[int] = set()
    for part in spec.split(","):
        if "-" in part:
            first, last = map(int, part.split("-"))
            result.update(range(first, last + 1))
        else:
            result.add(int(part))
    return result


# These omit obvious answer-bearing maps, infographics, and source title cards.
# Remaining paper figures have their printed captions removed below.
SELECTION = {
    "andromeda-galaxy": ("1,3-5,7-14,16-25,28-29,33-37", "4,9,15,26-27"),
    "sombrero-galaxy": ("1-7,9,11-25", ""),
    "m51": ("1-4,6-7,10-19", ""),
    "ngc-4536": ("1-4,8-24", "19,21,24"),
    "mcg-07-33-027": ("1-2", ""),
    "ngc-1569": ("1-7,13-18,22-34", "2"),
    "antennae-galaxies": ("1-3,5,7-11,13-24", ""),
    "arp-143": ("4-5,7-46,48-50", "6,17,20,31"),
    "arp-147": ("1-4,6-31", "9,12,13,29"),
    "cartwheel-galaxy": ("1-3,5-17", "3,6"),
    "m82": ("1-19,23-64", "7,12,17,44,50"),
    "gw170817": ("1-52", "7,9,10,12,13,32,42,46"),
    "terzan-5": ("2-5,7-27", "7,10,11"),
}

# From the first paper-style image onward, figures are labeled "paper/data".
PAPER_START = {
    "andromeda-galaxy": 25,
    "sombrero-galaxy": 11,
    "m51": 12,
    "ngc-4536": 8,
    "mcg-07-33-027": 99,
    "ngc-1569": 5,
    "antennae-galaxies": 15,
    "arp-143": 4,
    "arp-147": 6,
    "cartwheel-galaxy": 8,
    "m82": 23,
    "gw170817": 11,
    "terzan-5": 7,
}

# A few distinctive panels have an unusually high/low caption boundary.
CROPS = {
    "andromeda-galaxy-pdf-025": (0.10, 1.0),
    "sombrero-galaxy-pdf-011": (0.0, 0.72),
    "sombrero-galaxy-pdf-015": (0.0, 0.87),
    "m51-pdf-012": (0.0, 0.83),
    "m51-pdf-013": (0.0, 0.85),
    "m51-pdf-019": (0.0, 0.80),
    "ngc-4536-pdf-008": (0.0, 0.57),
    "ngc-4536-pdf-010": (0.0, 0.69),
    "ngc-4536-pdf-012": (0.0, 0.72),
    "ngc-1569-pdf-005": (0.0, 0.90),
    "ngc-1569-pdf-007": (0.0, 0.92),
    "antennae-galaxies-pdf-017": (0.0, 0.77),
    "arp-143-pdf-004": (0.0, 0.80),
    "arp-143-pdf-009": (0.0, 0.93),
    "arp-143-pdf-010": (0.0, 0.87),
    "arp-147-pdf-006": (0.0, 0.79),
    "arp-147-pdf-010": (0.0, 0.75),
    "cartwheel-galaxy-pdf-008": (0.0, 0.89),
    "cartwheel-galaxy-pdf-009": (0.0, 0.73),
    "cartwheel-galaxy-pdf-014": (0.0, 0.61),
    "m82-pdf-026": (0.0, 0.75),
    "m82-pdf-049": (0.0, 0.72),
    "gw170817-pdf-005": (0.0, 0.96),
    "gw170817-pdf-026": (0.0, 0.76),
    "terzan-5-pdf-019": (0.0, 0.77),
    "terzan-5-pdf-024": (0.0, 0.75),
}


def read_source_entries() -> list[dict]:
    content = DATA.read_text(encoding="utf-8")
    start = content.index("export const dsoPdfImages: DsoPdfImage[] = ")
    json_text = content[start:].split("= ", 1)[1].rstrip().removesuffix(";")
    return json.loads(json_text)


def mostly_white_bottom(image: Image.Image) -> bool:
    strip = image.crop((0, round(image.height * 0.88), image.width, image.height))
    return ImageStat.Stat(strip.convert("L")).mean[0] > 170


def prep(source: Path, destination: Path, image_id: str, paper: bool) -> bool:
    with Image.open(source) as original:
        im = original.convert("RGB")
        top, bottom = CROPS.get(image_id, (0.0, 0.76 if paper and mostly_white_bottom(im) else 1.0))
        trimmed = top > 0 or bottom < 1
        if trimmed:
            im = im.crop((0, round(im.height * top), im.width, round(im.height * bottom)))
            white = Image.new("RGB", im.size, (250, 250, 250))
            ink = ImageChops.difference(im, white).convert("L").point(lambda n: 255 if n > 28 else 0)
            box = ink.getbbox()
            if box:
                pad = 12
                im = im.crop((max(0, box[0] - pad), max(0, box[1] - pad), min(im.width, box[2] + pad), min(im.height, box[3] + pad)))
        im.save(destination, "WEBP", quality=82, method=4)
        return trimmed


def main() -> None:
    entries = read_source_entries()
    selected: list[dict] = []
    DEST.mkdir(parents=True, exist_ok=True)
    counts: dict[str, int] = {}
    trimmed_count = 0
    for entry in entries:
        image_id = entry["id"]
        slug, seq_text = image_id.rsplit("-pdf-", 1)
        seq = int(seq_text)
        include, exclude = SELECTION[slug]
        if seq not in seqs(include) or (exclude and seq in seqs(exclude)):
            continue
        paper = seq >= PAPER_START[slug]
        source = SOURCE / f"{image_id}.webp"
        destination = DEST / source.name
        trimmed_count += prep(source, destination, image_id, paper)
        selected.append({"id": image_id, "image": f"/dso-id-bank/{source.name}", "kind": "Paper figure" if paper else "Object view"})
        counts[slug] = counts.get(slug, 0) + 1
    if len(counts) != 13:
        raise ValueError(f"Expected all 13 DSOs; got {counts}")
    if len(selected) < 200:
        raise ValueError(f"Selection unexpectedly small: {len(selected)}")
    selected_names = {Path(entry["image"]).name for entry in selected}
    for stale in DEST.glob("*.webp"):
        if stale.name not in selected_names:
            stale.unlink()
    OUTPUT.write_text(
        "// Generated by scripts/build_dso_id_bank.py from the supplied DSO image packet.\n"
        "export type DsoIdAsset = { id: string; image: string; kind: 'Paper figure' | 'Object view' };\n"
        f"export const dsoIdAssets: DsoIdAsset[] = {json.dumps(selected, indent=2)};\n",
        encoding="utf-8",
    )
    print(json.dumps({"selected": len(selected), "cropped": trimmed_count, "allExtracted": len(entries), "byObject": counts}, indent=2))


if __name__ == "__main__":
    main()
