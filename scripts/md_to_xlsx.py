#!/usr/bin/env python3
"""
Convert a Markdown test case file to XLSX without external dependencies.

Usage:
    python scripts/md_to_xlsx.py qa-artifacts/testcases_draft.md
    python scripts/md_to_xlsx.py qa-artifacts/testcases_draft.md -o qa-artifacts/testcases.xlsx
"""

from __future__ import annotations

import argparse
import html
import re
import sys
import zipfile
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from xml.etree import ElementTree as ET


COLUMNS = [
    "Test Case ID",
    "Title",
    "Req Ref",
    "Priority",
    "Severity",
    "Behavior",
    "Regression",
    "Exec Tier",
    "Automation",
    "Pre-condition",
    "Test Data",
    "Steps",
    "Expected Result",
]

CASE_HEADING_RE = re.compile(r"^####\s+([A-Za-z0-9_.-]+)\s+-\s+(.+?)\s*$")
FIELD_RE = re.compile(r"^-\s+\*\*(.+?):\*\*\s*(.*)$")
PIPE_FIELD_RE = re.compile(r"\*\*(.+?):\*\*\s*([^|]+)")
NUMBERED_RE = re.compile(r"^\s*\d+\.\s+(.*)$")


@dataclass
class TestCase:
    case_id: str
    title: str
    req_ref: str = ""
    priority: str = ""
    severity: str = ""
    behavior: str = ""
    regression: str = ""
    exec_tier: str = ""
    automation: str = ""
    pre_condition: str = ""
    test_data: str = ""
    steps: str = ""
    expected_result: str = ""

    def row(self) -> list[str]:
        return [
            self.case_id,
            self.title,
            self.req_ref,
            self.priority,
            self.severity,
            self.behavior,
            self.regression,
            self.exec_tier,
            self.automation,
            self.pre_condition,
            self.test_data,
            self.steps,
            self.expected_result,
        ]


def clean_inline_markdown(value: str) -> str:
    value = value.strip()
    value = re.sub(r"\*\*(.*?)\*\*", r"\1", value)
    value = re.sub(r"`([^`]+)`", r"\1", value)
    return value.strip()


def parse_pipe_fields(line: str) -> dict[str, str]:
    fields: dict[str, str] = {}
    for key, value in PIPE_FIELD_RE.findall(line):
        fields[key.strip().lower()] = clean_inline_markdown(value)
    return fields


def collect_numbered_items(lines: list[str], start_index: int) -> tuple[str, int]:
    items: list[str] = []
    index = start_index
    while index < len(lines):
        line = lines[index]
        if not line.strip():
            index += 1
            continue
        if line.startswith("---") or line.startswith("#### ") or line.startswith("- **"):
            break
        match = NUMBERED_RE.match(line)
        if not match:
            break
        items.append(match.group(1).strip())
        index += 1
    return "\n".join(f"{i + 1}. {item}" for i, item in enumerate(items)), index


def parse_test_cases(markdown: str) -> list[TestCase]:
    lines = markdown.splitlines()
    cases: list[TestCase] = []
    current: TestCase | None = None
    index = 0

    while index < len(lines):
        line = lines[index].rstrip()
        heading = CASE_HEADING_RE.match(line)
        if heading:
            if current:
                cases.append(current)
            current = TestCase(
                case_id=heading.group(1).strip(),
                title=clean_inline_markdown(heading.group(2)),
            )
            index += 1
            continue

        if current is None:
            index += 1
            continue

        field = FIELD_RE.match(line)
        if field:
            key = field.group(1).strip().lower()
            value = clean_inline_markdown(field.group(2))

            if key == "req ref":
                current.req_ref = value
            elif key == "pre-condition":
                current.pre_condition = value
            elif key == "test data":
                current.test_data = value
            elif key == "steps":
                current.steps, index = collect_numbered_items(lines, index + 1)
                continue
            elif key == "expected result":
                current.expected_result, index = collect_numbered_items(lines, index + 1)
                continue
            else:
                fields = parse_pipe_fields(line)
                current.priority = fields.get("priority", current.priority)
                current.severity = fields.get("severity", current.severity)
                current.behavior = fields.get("behavior", current.behavior)
                current.regression = fields.get("regression", current.regression)
                current.exec_tier = fields.get("exec tier", current.exec_tier)
                current.automation = fields.get("automation", current.automation)

        index += 1

    if current:
        cases.append(current)

    return cases


def column_letter(index: int) -> str:
    result = ""
    while index:
        index, remainder = divmod(index - 1, 26)
        result = chr(65 + remainder) + result
    return result


def worksheet_xml(rows: list[list[str]]) -> str:
    widths = [16, 34, 12, 12, 12, 12, 12, 12, 12, 34, 34, 48, 56]
    cols = "".join(
        f'<col min="{i}" max="{i}" width="{width}" customWidth="1"/>'
        for i, width in enumerate(widths, start=1)
    )

    xml_rows: list[str] = []
    for row_index, row in enumerate(rows, start=1):
        style = "1" if row_index == 1 else "2"
        height = "24" if row_index == 1 else "64"
        cells: list[str] = []
        for col_index, value in enumerate(row, start=1):
            ref = f"{column_letter(col_index)}{row_index}"
            escaped = html.escape(value or "")
            cells.append(f'<c r="{ref}" t="inlineStr" s="{style}"><is><t>{escaped}</t></is></c>')
        xml_rows.append(f'<row r="{row_index}" ht="{height}" customHeight="1">{"".join(cells)}</row>')

    return f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <cols>{cols}</cols>
  <sheetData>{''.join(xml_rows)}</sheetData>
  <autoFilter ref="A1:M{len(rows)}"/>
</worksheet>
"""


def workbook_xml() -> str:
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"
  xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>
    <sheet name="Test Cases" sheetId="1" r:id="rId1"/>
  </sheets>
</workbook>
"""


def styles_xml() -> str:
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><sz val="11"/><name val="Calibri"/></font>
    <font><b/><sz val="11"/><name val="Calibri"/></font>
  </fonts>
  <fills count="3">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFD9EAF7"/><bgColor indexed="64"/></patternFill></fill>
  </fills>
  <borders count="2">
    <border><left/><right/><top/><bottom/><diagonal/></border>
    <border>
      <left style="thin"><color auto="1"/></left>
      <right style="thin"><color auto="1"/></right>
      <top style="thin"><color auto="1"/></top>
      <bottom style="thin"><color auto="1"/></bottom>
      <diagonal/>
    </border>
  </borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="3">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="1" xfId="0" applyFont="1" applyFill="1" applyBorder="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
    <xf numFmtId="0" fontId="0" fillId="0" borderId="1" xfId="0" applyBorder="1" applyAlignment="1"><alignment vertical="top" wrapText="1"/></xf>
  </cellXfs>
  <cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>
"""


def content_types_xml() -> str:
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
  <Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  <Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
  <Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>
"""


def root_rels_xml() -> str:
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
  <Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>
"""


def workbook_rels_xml() -> str:
    return """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
</Relationships>
"""


def doc_props_xml() -> tuple[str, str]:
    created = datetime.now(timezone.utc).replace(microsecond=0).isoformat().replace("+00:00", "Z")
    core = f"""<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:dcterms="http://purl.org/dc/terms/"
  xmlns:dcmitype="http://purl.org/dc/dcmitype/"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <dc:creator>md_to_xlsx.py</dc:creator>
  <cp:lastModifiedBy>md_to_xlsx.py</cp:lastModifiedBy>
  <dcterms:created xsi:type="dcterms:W3CDTF">{created}</dcterms:created>
  <dcterms:modified xsi:type="dcterms:W3CDTF">{created}</dcterms:modified>
</cp:coreProperties>
"""
    app = """<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties"
  xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
  <Application>Python</Application>
</Properties>
"""
    return core, app


def write_xlsx(rows: list[list[str]], output_path: Path) -> None:
    core, app = doc_props_xml()
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(output_path, "w", compression=zipfile.ZIP_DEFLATED) as xlsx:
        xlsx.writestr("[Content_Types].xml", content_types_xml())
        xlsx.writestr("_rels/.rels", root_rels_xml())
        xlsx.writestr("docProps/core.xml", core)
        xlsx.writestr("docProps/app.xml", app)
        xlsx.writestr("xl/workbook.xml", workbook_xml())
        xlsx.writestr("xl/_rels/workbook.xml.rels", workbook_rels_xml())
        xlsx.writestr("xl/styles.xml", styles_xml())
        xlsx.writestr("xl/worksheets/sheet1.xml", worksheet_xml(rows))


def convert_markdown_to_xlsx(input_path: Path, output_path: Path | None = None) -> Path:
    if input_path.suffix.lower() != ".md":
        raise ValueError("Only .md files are supported.")
    if not input_path.exists():
        raise FileNotFoundError(input_path)

    output_path = output_path or input_path.with_suffix(".xlsx")
    markdown = input_path.read_text(encoding="utf-8")
    cases = parse_test_cases(markdown)
    if not cases:
        raise ValueError("No test cases found. Expected headings like: #### TC_001 - Title")

    rows = [COLUMNS] + [case.row() for case in cases]
    write_xlsx(rows, output_path)
    return output_path


def parse_args(argv: list[str]) -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Convert a Markdown test case file to XLSX without external dependencies."
    )
    parser.add_argument("input", type=Path, help="Path to the .md file.")
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        help="Output .xlsx path. Defaults to the input file name with .xlsx extension.",
    )
    return parser.parse_args(argv)


def main(argv: list[str] | None = None) -> int:
    args = parse_args(argv or sys.argv[1:])
    try:
        output_path = convert_markdown_to_xlsx(args.input, args.output)
    except Exception as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1

    print(f"Converted: {output_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
