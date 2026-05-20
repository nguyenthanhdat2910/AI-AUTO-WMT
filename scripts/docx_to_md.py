#!/usr/bin/env python3
"""
Convert a .docx file to Markdown without external dependencies.

Usage:
    python scripts/docx_to_md.py input.docx
    python scripts/docx_to_md.py input.docx -o requirements/output.md
"""

from __future__ import annotations

import argparse
import re
import sys
import xml.etree.ElementTree as ET
import zipfile
from pathlib import Path


NS = {
    "w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}
W = f"{{{NS['w']}}}"


def q(tag: str) -> str:
    return W + tag


def w_attr(el: ET.Element | None, name: str) -> str | None:
    return el.get(q(name)) if el is not None else None


def escape_md_text(text: str) -> str:
    return text.replace("\\", "\\\\")


def escape_table_text(text: str) -> str:
    return text.replace("|", "\\|")


def read_relationships(docx: zipfile.ZipFile) -> dict[str, str]:
    rels: dict[str, str] = {}
    try:
        root = ET.fromstring(docx.read("word/_rels/document.xml.rels"))
    except KeyError:
        return rels

    for rel in root:
        rel_id = rel.get("Id")
        target = rel.get("Target")
        if rel_id and target:
            rels[rel_id] = target
    return rels


def read_styles(docx: zipfile.ZipFile) -> dict[str, str]:
    styles: dict[str, str] = {}
    try:
        root = ET.fromstring(docx.read("word/styles.xml"))
    except KeyError:
        return styles

    for style in root.findall("w:style", NS):
        style_id = style.get(q("styleId"))
        name_el = style.find("w:name", NS)
        if style_id and name_el is not None:
            styles[style_id] = w_attr(name_el, "val") or style_id
    return styles


def read_numbering(docx: zipfile.ZipFile) -> dict[str, dict[str, str]]:
    try:
        root = ET.fromstring(docx.read("word/numbering.xml"))
    except KeyError:
        return {}

    abstract_nums: dict[str, dict[str, str]] = {}
    for abstract_num in root.findall("w:abstractNum", NS):
        abstract_id = w_attr(abstract_num, "abstractNumId")
        levels: dict[str, str] = {}
        for level in abstract_num.findall("w:lvl", NS):
            level_id = w_attr(level, "ilvl") or "0"
            fmt_el = level.find("w:numFmt", NS)
            levels[level_id] = w_attr(fmt_el, "val") or "bullet"
        if abstract_id:
            abstract_nums[abstract_id] = levels

    nums: dict[str, dict[str, str]] = {}
    for num in root.findall("w:num", NS):
        num_id = w_attr(num, "numId")
        abstract_el = num.find("w:abstractNumId", NS)
        abstract_id = w_attr(abstract_el, "val")
        if num_id and abstract_id:
            nums[num_id] = abstract_nums.get(abstract_id, {})
    return nums


def paragraph_meta(p: ET.Element) -> tuple[str, str | None, str]:
    ppr = p.find("w:pPr", NS)
    if ppr is None:
        return "", None, "0"

    style_el = ppr.find("w:pStyle", NS)
    style_id = w_attr(style_el, "val") or ""

    num_id: str | None = None
    level_id = "0"
    numpr = ppr.find("w:numPr", NS)
    if numpr is not None:
        level_el = numpr.find("w:ilvl", NS)
        num_el = numpr.find("w:numId", NS)
        level_id = w_attr(level_el, "val") or "0"
        num_id = w_attr(num_el, "val")

    return style_id, num_id, level_id


def run_segments(run: ET.Element) -> list[tuple[str, bool, bool]]:
    text_parts: list[str] = []
    for node in run:
        if node.tag == q("t"):
            text_parts.append(node.text or "")
        elif node.tag == q("tab"):
            text_parts.append("    ")
        elif node.tag in {q("br"), q("cr")}:
            text_parts.append("  \n")

    text = "".join(text_parts)
    if not text:
        return []

    rpr = run.find("w:rPr", NS)
    bold = rpr is not None and rpr.find("w:b", NS) is not None
    italic = rpr is not None and rpr.find("w:i", NS) is not None
    return [(text, bold, italic)]


def render_segments(segments: list[tuple[str, bool, bool]], plain: bool = False) -> str:
    if plain:
        return "".join(text for text, _, _ in segments)

    merged: list[tuple[str, bool, bool]] = []
    for text, bold, italic in segments:
        if not text:
            continue
        if merged and merged[-1][1:] == (bold, italic):
            previous_text, _, _ = merged[-1]
            merged[-1] = (previous_text + text, bold, italic)
        else:
            merged.append((text, bold, italic))

    rendered: list[str] = []
    for text, bold, italic in merged:
        text = escape_md_text(text)
        if bold and italic:
            rendered.append(f"***{text}***")
        elif bold:
            rendered.append(f"**{text}**")
        elif italic:
            rendered.append(f"*{text}*")
        else:
            rendered.append(text)
    return "".join(rendered)


def paragraph_text(
    p: ET.Element,
    rels: dict[str, str],
    *,
    plain: bool = False,
) -> str:
    chunks: list[str] = []
    segment_buffer: list[tuple[str, bool, bool]] = []

    def flush_segments() -> None:
        nonlocal segment_buffer
        if segment_buffer:
            chunks.append(render_segments(segment_buffer, plain=plain))
            segment_buffer = []

    for child in p:
        if child.tag == q("r"):
            segment_buffer.extend(run_segments(child))
        elif child.tag == q("hyperlink"):
            flush_segments()
            hyperlink_segments: list[tuple[str, bool, bool]] = []
            for run in child.findall("w:r", NS):
                hyperlink_segments.extend(run_segments(run))

            label = render_segments(hyperlink_segments, plain=plain)
            rel_id = child.get(f"{{{NS['r']}}}id")
            url = rels.get(rel_id, "") if rel_id else ""
            chunks.append(f"[{label}]({url})" if label and url and not plain else label)

    flush_segments()
    return "".join(chunks).strip()


def heading_level(style_name: str) -> int:
    match = re.search(r"heading\s*(\d+)", style_name, re.I)
    if not match:
        match = re.match(r"Heading(\d+)$", style_name, re.I)
    if not match:
        return 0
    return min(6, max(1, int(match.group(1))))


def convert_paragraph(
    p: ET.Element,
    rels: dict[str, str],
    styles: dict[str, str],
    nums: dict[str, dict[str, str]],
) -> str:
    style_id, num_id, level_id = paragraph_meta(p)
    style_name = styles.get(style_id, style_id)
    level = heading_level(style_name)
    text = paragraph_text(p, rels, plain=bool(level))
    if not text:
        return ""

    if level:
        return f"{'#' * level} {text}"

    if num_id:
        fmt = nums.get(num_id, {}).get(level_id, "bullet")
        indent = "  " * int(level_id or 0)
        numbered_formats = {
            "decimal",
            "decimalZero",
            "upperRoman",
            "lowerRoman",
            "upperLetter",
            "lowerLetter",
        }
        marker = "1." if fmt in numbered_formats else "-"
        return f"{indent}{marker} {text}"

    return text


def convert_cell(
    cell: ET.Element,
    rels: dict[str, str],
    styles: dict[str, str],
    nums: dict[str, dict[str, str]],
) -> str:
    parts: list[str] = []
    for p in cell.findall("w:p", NS):
        text = convert_paragraph(p, rels, styles, nums)
        if text:
            parts.append(re.sub(r"\n+", "<br>", text))
    return escape_table_text("<br>".join(parts))


def convert_table(
    table: ET.Element,
    rels: dict[str, str],
    styles: dict[str, str],
    nums: dict[str, dict[str, str]],
) -> str:
    rows: list[list[str]] = []
    for tr in table.findall("w:tr", NS):
        cells = [convert_cell(tc, rels, styles, nums) for tc in tr.findall("w:tc", NS)]
        if cells:
            rows.append(cells)

    if not rows:
        return ""

    max_cols = max(len(row) for row in rows)
    rows = [row + [""] * (max_cols - len(row)) for row in rows]
    lines = [
        "| " + " | ".join(rows[0]) + " |",
        "| " + " | ".join(["---"] * max_cols) + " |",
    ]
    lines.extend("| " + " | ".join(row) + " |" for row in rows[1:])
    return "\n".join(lines)


def convert_docx_to_markdown(input_path: Path, output_path: Path | None = None) -> Path:
    if input_path.suffix.lower() != ".docx":
        raise ValueError("Only .docx files are supported.")
    if not input_path.exists():
        raise FileNotFoundError(input_path)

    output_path = output_path or input_path.with_suffix(".md")

    with zipfile.ZipFile(input_path) as docx:
        try:
            document = ET.fromstring(docx.read("word/document.xml"))
        except KeyError as exc:
            raise ValueError(f"{input_path} does not look like a valid .docx file.") from exc

        rels = read_relationships(docx)
        styles = read_styles(docx)
        nums = read_numbering(docx)
        body = document.find("w:body", NS)
        if body is None:
            raise ValueError("Could not find the document body.")

        blocks: list[str] = []
        for child in body:
            if child.tag == q("p"):
                markdown = convert_paragraph(child, rels, styles, nums)
            elif child.tag == q("tbl"):
                markdown = convert_table(child, rels, styles, nums)
            else:
                markdown = ""
            if markdown:
                blocks.append(markdown)

    title = input_path.stem.replace("_", " ").strip()
    content = f"# {title}\n\n" + "\n\n".join(blocks).rstrip() + "\n"

    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(content, encoding="utf-8")
    return output_path


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert a .docx file to Markdown without external dependencies."
    )
    parser.add_argument("input", type=Path, help="Path to the .docx file.")
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        help="Output .md path. Defaults to the input file name with .md extension.",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv or sys.argv[1:])
    try:
        output_path = convert_docx_to_markdown(args.input, args.output)
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print(f"Converted: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
