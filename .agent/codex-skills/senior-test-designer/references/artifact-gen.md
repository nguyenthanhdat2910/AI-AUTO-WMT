# ARTIFACT GENERATION — Phase 2: Export CSV + XLSX

## Khi nào đọc file này
Chỉ đọc khi user trigger Phase 2 (export). Trigger phrases:
"export", "xuất csv", "xuất excel", "finalize", "final", "xuất file", "gen csv", "tạo file qase"

## Workflow

```
1. Đọc file .md đã finalize: qa-artifacts/[feature]_testcases_draft.md
   (hoặc bản user đã rename/chỉnh sửa)
2. Trước khi chạy script sinh CSV/XLSX, trình bày export plan và chờ user approve theo Global File Approval Gate.
3. Parse từng TC block → build TEST_CASES list
4. Parse bảng Traceability → build TRACEABILITY list
5. Điền vào Python script dưới đây
6. Sau khi user approve, chạy script → sinh 2 files
7. Chỉ đổi Status trong .md từ "DRAFT" → "FINAL" nếu user approve việc update file .md
```

---

## QASE CSV Format

**Mỗi bước = 1 dòng CSV riêng.** Dòng đầu TC: metadata đầy đủ. Dòng tiếp: chỉ `Title` + `Action` + `Expected result`.

**Headers:** `Suite,Title,Status,Description,Pre-conditions,Severity,Priority,Type,Layer,Action,Expected result`

**Valid values:**

| Column | Values |
|:---|:---|
| Status | `Actual`, `Draft` |
| Severity | `Blocker`, `Critical`, `Major`, `Normal`, `Minor`, `Trivial` |
| Priority | `High`, `Medium`, `Low` |
| Type | `Functional`, `Smoke`, `Regression`, `Security` |
| Layer | `E2E`, `API`, `Unit` |

**Mapping:** Priority dùng trực tiếp `High` / `Medium` / `Low` từ file `.md` · Type map từ `Exec Tier`: `SMOKE`→`Smoke`, `REGRESSION`→`Regression`, `FULL`→`Functional` · Khi import qua QASE API, phải lấy system field IDs từ `/system_field` thay vì hard-code thứ tự ID · Regression giữ trong cột/tag riêng · Suite: dùng `\`

---

## XLSX Review Format

**Sheet 1 — "Test Cases":** 1 dòng/TC.
Columns: `TC ID · Req Ref · Suite · Title · Status · Description · Pre-conditions · Severity · Priority · Type · Layer · Steps · Test Data · Automation · Regression · Exec Tier`

**Sheet 2 — "Traceability":** Data từ Phần 1 của .md file.
Columns: `Req ID / AC · Business Flow · L × I · Risk Score · Priority · TC Coverage`

**Formatting:**
- Header: Bold, fill `#1E3A5F`, white font, freeze row 1
- Severity/Priority: Critical→`#FFD7D7` · High→`#FFE8CC` · Medium→`#FFFACC` · Low→`#D7FFD7`
- Automation: bold — AUTO→`#1D7A1D` · AUTO*→`#0B5394` · MANUAL→`#CC0000`

---

## Python Script

Agent đọc .md file, extract TC data, điền vào `TEST_CASES` và `TRACEABILITY`, rồi chạy:

```python
import csv, os
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

# ── DATA — Agent điền từ file .md đã finalize ────────────────────────────
# Mỗi TC: steps = list of {"action": str, "expected_result": str}
TEST_CASES = [
    # Agent parse từng TC block trong .md → populate list này
    # Example:
    # {
    #     "id": "AUTH_1.1_01", "req_ref": "AC 1",
    #     "suite": "Auth\\Login",
    #     "title": "Verify successful login with valid credentials",
    #     "status": "Actual",
    #     "description": "Verify core login flow end-to-end",
    #     "preconditions": "User has active account with verified email",
    #     "severity": "Critical", "priority": "High",
    #     "type": "Functional", "layer": "E2E",
    #     "test_data": "email: qa_test@example.com / password: Test@1234",
    #     "automation": "AUTO", "regression": "Yes", "exec_tier": "SMOKE",
    #     "steps": [
    #         {"action": "Enter valid email", "expected_result": "Email displayed"},
    #         {"action": 'Click "Login"', "expected_result": "Redirected to Dashboard"},
    #     ]
    # },
]

TRACEABILITY = [
    # Agent parse bảng Phần 1 trong .md → populate list này
    # Example:
    # {"ac": "AC 1", "flow": "User login", "l_i": "L3 × I3",
    #  "risk": "9", "priority": "High", "coverage": "AUTH_1.1_01, AUTH_1.1_02"},
]

FEATURE_NAME = "feature_name"  # Agent điền từ .md header

OUTPUT_DIR = "./qa-artifacts"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ── 1. QASE CSV ──────────────────────────────────────────────────────────
QASE_HEADERS = [
    "Suite", "Title", "Status", "Description", "Pre-conditions",
    "Severity", "Priority", "Type", "Layer", "Action", "Expected result"
]

csv_rows = []
for tc in TEST_CASES:
    for i, step in enumerate(tc["steps"]):
        if i == 0:
            csv_rows.append([
                tc["suite"], tc["title"], tc["status"],
                tc.get("description", ""), tc.get("preconditions", ""),
                tc["severity"], tc["priority"], tc["type"], tc["layer"],
                step["action"], step["expected_result"]
            ])
        else:
            csv_rows.append([
                "", tc["title"], "", "", "", "", "", "", "",
                step["action"], step["expected_result"]
            ])

csv_path = f"{OUTPUT_DIR}/{FEATURE_NAME}_testcases_qase.csv"
with open(csv_path, "w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(QASE_HEADERS)
    writer.writerows(csv_rows)

# ── 2. XLSX REVIEW ───────────────────────────────────────────────────────
wb = openpyxl.Workbook()
ws = wb.active
ws.title = "Test Cases"

XLSX_HEADERS = [
    "TC ID", "Req Ref", "Suite", "Title", "Status", "Description",
    "Pre-conditions", "Severity", "Priority", "Type", "Layer",
    "Steps", "Test Data", "Automation", "Regression", "Exec Tier"
]
COL_WIDTHS = [12, 10, 20, 45, 10, 40, 35, 12, 10, 14, 10, 60, 40, 10, 12, 12]

HDR_FILL  = PatternFill("solid", fgColor="1E3A5F")
HDR_FONT  = Font(bold=True, color="FFFFFF", name="Arial", size=10)
CELL_FONT = Font(name="Arial", size=10)
THIN = Border(
    left=Side(style="thin"), right=Side(style="thin"),
    top=Side(style="thin"),  bottom=Side(style="thin")
)
SEV_COLOR = {
    "Critical": "FFD7D7", "Blocker": "FFD7D7",
    "Major": "FFE8CC",    "High": "FFE8CC",
    "Normal": "FFFACC",   "Medium": "FFFACC",
    "Minor": "D7FFD7",    "Low": "D7FFD7", "Trivial": "D7FFD7"
}
AUTO_COLOR = {"AUTO": "1D7A1D", "AUTO*": "0B5394", "MANUAL": "CC0000"}
CENTER_COLS = {"TC ID", "Req Ref", "Status", "Severity", "Priority",
               "Type", "Layer", "Automation", "Regression", "Exec Tier"}

ws.row_dimensions[1].height = 22
for col_idx, hdr in enumerate(XLSX_HEADERS, 1):
    cell = ws.cell(row=1, column=col_idx, value=hdr)
    cell.font = HDR_FONT
    cell.fill = HDR_FILL
    cell.alignment = Alignment(horizontal="center", vertical="top", wrap_text=True)
    cell.border = THIN

for tc in TEST_CASES:
    steps_text = "\n".join(
        f"{i+1}. {s['action']} → {s['expected_result']}"
        for i, s in enumerate(tc["steps"])
    )
    row_data = [
        tc["id"], tc["req_ref"], tc["suite"], tc["title"],
        tc["status"], tc.get("description", ""), tc.get("preconditions", ""),
        tc["severity"], tc["priority"], tc["type"], tc["layer"],
        steps_text, tc["test_data"], tc["automation"],
        tc["regression"], tc.get("exec_tier", "FULL")
    ]
    row_idx = ws.max_row + 1
    for col_idx, val in enumerate(row_data, 1):
        hdr = XLSX_HEADERS[col_idx - 1]
        cell = ws.cell(row=row_idx, column=col_idx, value=val)
        cell.font = CELL_FONT
        cell.border = THIN
        cell.alignment = Alignment(
            horizontal="center" if hdr in CENTER_COLS else "left",
            vertical="top", wrap_text=True
        )
        if hdr in ("Severity", "Priority"):
            cell.fill = PatternFill("solid", fgColor=SEV_COLOR.get(str(val), "FFFFFF"))
        if hdr == "Automation":
            cell.font = Font(bold=True, color=AUTO_COLOR.get(str(val), "000000"),
                             name="Arial", size=10)

for i, w in enumerate(COL_WIDTHS, 1):
    ws.column_dimensions[get_column_letter(i)].width = w
ws.freeze_panes = "A2"

# Sheet 2: Traceability
ws2 = wb.create_sheet("Traceability")
TRACE_HDRS = ["Req ID / AC", "Business Flow", "L × I", "Risk Score", "Priority", "TC Coverage"]
ws2.row_dimensions[1].height = 22
for col_idx, hdr in enumerate(TRACE_HDRS, 1):
    cell = ws2.cell(row=1, column=col_idx, value=hdr)
    cell.font = HDR_FONT
    cell.fill = HDR_FILL
    cell.alignment = Alignment(horizontal="center", vertical="top", wrap_text=True)
    cell.border = THIN
for i, w in enumerate([15, 45, 12, 12, 12, 40], 1):
    ws2.column_dimensions[get_column_letter(i)].width = w
ws2.freeze_panes = "A2"

for row in TRACEABILITY:
    ws2.append([row["ac"], row["flow"], row["l_i"], row["risk"], row["priority"], row["coverage"]])
    row_idx = ws2.max_row
    for col_idx in range(1, len(TRACE_HDRS) + 1):
        cell = ws2.cell(row=row_idx, column=col_idx)
        cell.font = CELL_FONT
        cell.border = THIN
        cell.alignment = Alignment(horizontal="center" if col_idx != 2 else "left",
                                   vertical="top", wrap_text=True)

xlsx_path = f"{OUTPUT_DIR}/{FEATURE_NAME}_testcases_review.xlsx"
wb.save(xlsx_path)

print(f"✅ QASE CSV  → {csv_path}")
print(f"✅ XLSX      → {xlsx_path}")
```

Sau khi chạy → thông báo user đường dẫn 2 files.
