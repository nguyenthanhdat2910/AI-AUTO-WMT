# OUTPUT FORMAT REFERENCE

## NAMING CONVENTION

**TC ID:** `[FunctionAbbrev]_[UserStoryNumber]_[IncrementNumber]`

| Component           | Rule                         | Example                                      |
| :------------------ | :--------------------------- | :------------------------------------------- |
| `FunctionAbbrev`  | English abbreviation         | `BAF`, `CHK`, `WLT`, `AUTH`, `PFR` |
| `UserStoryNumber` | Giữ nguyên từ requirement | `7.1`, `3.2`                             |
| `IncrementNumber` | 2 chữ số tăng dần        | `01`, `02`, `03`                       |

**Req Ref:** `AC [N]` (cover AC cụ thể) · `EC` (edge/boundary ngoài AC)

---

## PHASE 1 OUTPUT — File .md

File name: `qa-artifacts/[feature]_testcases_draft.md`

Agent **BẮT BUỘC** sinh preview .md theo đúng structure dưới đây. Chỉ lưu file sau khi user approve theo Global File Approval Gate. User sẽ review và chỉnh sửa
trực tiếp trên file này trước khi export.

### Template .md

```markdown
# Test Cases — [Feature Name]
> **User Story:** [US ID + Title]
> **Generated:** [Date]
> **Status:** DRAFT — Pending review

---

## 1: RISK & TRACEABILITY

| Req ID / AC | Business Flow | L × I | Risk Score | Priority | TC Coverage |
|:---|:---|:---|:---|:---|:---|
| AC 1 | [Mô tả luồng] | L? × I? | ? | P? | TC_ID_01, TC_ID_02 |
| AC 2 | [Mô tả luồng] | L? × I? | ? | P? | TC_ID_03 |
| EC | [Edge case description] | — | Edge | P? | TC_ID_08 |

---

## 2: DETAILED TEST CASES

### [Suite Name — e.g., Auth\Login]

#### TC_ID_01 — [Title]
- **Req Ref:** AC 1
- **Priority:** High | **Severity:** Critical | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** SMOKE | **Automation:** AUTO
- **Pre-condition:** [Điều kiện đầu vào]
- **Test Data:** [Dữ liệu cụ thể hoặc N/A]
- **Steps:**
  1. [Action 1]
  2. [Action 2]
  3. [Action 3]
- **Expected Result:**
  1. [Expected cho step 1]
  2. [Expected cho step 2]
  3. [Expected cho step 3]

---

#### TC_ID_02 — [Title]
- **Req Ref:** AC 1
- **Priority:** Medium | **Severity:** Major | **Behavior:** Negative | **Regression:** No | **Exec Tier:** FULL | **Automation:** MANUAL
- **Pre-condition:** [Điều kiện]
- **Test Data:** [Dữ liệu]
- **Steps:**
  1. [Action]
- **Expected Result:**
  1. [Expected]

---

## 3: CLARIFICATION QUESTIONS

| # | Question | AC Ref | Impact if Unresolved |
|:---|:---|:---|:---|
| 1 | [Câu hỏi] | AC ? | [Hậu quả nếu không giải quyết] |
```

### Quy tắc viết .md

- Mỗi TC là 1 block riêng biệt, ngăn cách bằng `---`
- Steps và Expected Result đánh số 1:1 tương ứng — dễ review từng bước
- Metadata (Priority, Severity, Behavior, Regression, Exec Tier, Automation) trên cùng 1 dòng — dễ scan và import QASE
- `Priority` chỉ dùng `High/Medium/Low`, dựa trên Risk Score và execution/triage priority
- `Severity` dùng `Blocker/Critical/Major/Normal/Minor/Trivial`; `Behavior` dùng `Positive/Negative/Destructive`
- User có thể chỉnh sửa trực tiếp: thêm/xóa TC, sửa expected result, đổi priority
- Khi user nói "final" / "export" → agent đọc file .md này để sinh CSV + XLSX.
- Khi user nói rõ "import qase" / "import lên QASE" / "sync qase" / "publish qase" → agent import trực tiếp qua QASE API và tạo import report.
- Không import QASE API nếu user chỉ nói "final", "export", "xuất csv", hoặc "xuất excel".

---

## PHASE 2 OUTPUT — CSV + XLSX (khi user yêu cầu)

Xem `references/artifact-gen.md` cho:

- QASE CSV format (step-per-row)
- XLSX Review format (1 row/TC, 2 sheets)
- Python script

Agent đọc file .md đã finalize → parse → sinh 2 files.

---

## PHASE 2B OUTPUT — QASE API IMPORT (khi user yêu cầu rõ)

Trigger hợp lệ:

- `import qase`
- `import lên QASE`
- `đẩy test case lên QASE`
- `sync qase`
- `publish qase`
- `import test case qua API`

Yêu cầu `.env`:

```text
QASE_API_TOKEN=
QASE_PROJECT_CODE=
QASE_SUITE_ID=
```

Agent đọc file `.md` đã review trong `qa-artifacts/`, parse metadata TC, import qua API,
và sinh report:

```text
qa-artifacts/[feature]_qase_import_report.md
```

Hard rule: không in token ra output/report và không import nếu user chỉ yêu cầu export/finalize.
