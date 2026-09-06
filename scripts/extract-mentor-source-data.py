#!/usr/bin/env python3
"""Extract searchable slide and DOCX text for the DSO learning modules."""

from __future__ import annotations

import json
import re
import zipfile
from pathlib import Path
from xml.etree import ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]
SOURCE_ROOT = ROOT.parent / "resources"
OUTPUT = ROOT / "public" / "mentor-source-data.json"

SOURCES = {
    "andromeda": {
        "deck": "Andromeda Galaxy.pptx",
        "documents": ["Andromeda Galaxy.docx"],
    },
    "antennae": {
        "deck": "Antennae Galaxies.pptx",
        "documents": ["Antennae Galaxies.docx"],
    },
    "arp-143": {"deck": "Arp 143.pptx", "documents": ["Arp 143.docx"]},
    "arp-147": {"deck": "Arp 147.pptx", "documents": ["Arp 147.docx"]},
    "cartwheel": {
        "deck": "Cartwheel Galaxy.pptx",
        "documents": ["Cartwheel Galaxy.docx"],
    },
    "gw170817": {"deck": "GW170817.pptx", "documents": ["GW170817.docx"]},
    "m51": {
        "deck": "M51.pptx",
        "documents": ["M51 Whirlpool Galaxy.docx", "Copy of M51_NGC 5195.docx"],
    },
    "m82": {
        "deck": "M82 - Cigar Galaxy.pptx",
        "documents": ["M82.docx", "Copy of M81_M82.docx", "Copy of M82 X-2.docx"],
    },
    "mcg-07-33-027": {
        "deck": "MCG+07-33-027.pptx",
        "documents": ["MCG +07-33-027.docx"],
    },
    "ngc-1569": {"deck": "NGC 1569.pptx", "documents": ["NGC 1569.docx"]},
    "ngc-4536": {"deck": "NGC 4536.pptx", "documents": ["NGC 4536.docx"]},
    "sombrero": {
        "deck": "Sombrero Galaxy.pptx",
        "documents": ["Sombrero Galaxy.docx"],
    },
    "terzan-5": {"deck": "Terzan 5.pptx", "documents": ["Terzan 5.docx"]},
}


def natural_number(name: str) -> int:
    match = re.search(r"(\d+)", name)
    return int(match.group(1)) if match else 0


def xml_text(blob: bytes) -> list[str]:
    root = ET.fromstring(blob)
    paragraphs: list[str] = []
    for paragraph in root.iter():
        if not paragraph.tag.endswith("}p"):
            continue
        parts = [node.text or "" for node in paragraph.iter() if node.tag.endswith("}t")]
        text = "".join(parts).strip()
        if text and text not in paragraphs:
            paragraphs.append(text)
    return paragraphs


def extract_deck(path: Path) -> list[dict[str, object]]:
    slides: list[dict[str, object]] = []
    with zipfile.ZipFile(path) as archive:
        names = sorted(
            (
                name
                for name in archive.namelist()
                if re.fullmatch(r"ppt/slides/slide\d+\.xml", name)
            ),
            key=natural_number,
        )
        for index, name in enumerate(names, start=1):
            paragraphs = xml_text(archive.read(name))
            notes_name = f"ppt/notesSlides/notesSlide{index}.xml"
            notes = xml_text(archive.read(notes_name)) if notes_name in archive.namelist() else []
            notes = [note for note in notes if note not in {str(index), "Slide", "Notes"}]
            slides.append({"number": index, "text": paragraphs, "notes": notes})
    return slides


def extract_docx(path: Path) -> list[str]:
    with zipfile.ZipFile(path) as archive:
        return xml_text(archive.read("word/document.xml"))


def main() -> None:
    result: dict[str, object] = {}
    for key, source in SOURCES.items():
        deck_path = SOURCE_ROOT / "dso-presentations" / source["deck"]
        documents = []
        for filename in source["documents"]:
            path = SOURCE_ROOT / "dso-documents" / filename
            documents.append({"name": filename, "paragraphs": extract_docx(path)})
        result[key] = {
            "deckName": source["deck"],
            "slides": extract_deck(deck_path),
            "documents": documents,
        }

    OUTPUT.write_text(json.dumps(result, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    print(f"Wrote {OUTPUT} with {sum(len(v['slides']) for v in result.values())} slides")


if __name__ == "__main__":
    main()
