# OUTPUT FORMAT REFERENCE — Analysis Module

## File output

File name: `qa-artifacts/[feature]_analysis.md`

Agent **BẮT BUỘC** sinh preview .md theo structure dưới đây. Chỉ lưu file sau khi user approve theo Global File Approval Gate.
User sẽ review, giải đáp CQ, rồi chuyển sang Design Module.

---

## Template .md

```markdown
# Requirement Analysis — [Feature Name]
> **User Story:** [US ID + Title]
> **Analyzed:** [Date]
> **Status:** DRAFT — Pending CQ resolution
> **Handoff to:** `$senior-test-designer` (sau khi CQ đã giải đáp)

---

## 1: RISK & TRACEABILITY SUMMARY

| Atomic ID | Business Flow | Summary | L × I | Risk Score | Priority | Affected Modules | Regression | Ambiguity Flag |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| REQ-WLT-01 | Nút Withdraw active | Chỉ active khi Trader đã login và có số dư > $0 | L2 × I3 | 6 | Medium | Dashboard, Wallet | Yes | ❌ Không |
| REQ-WLT-02 | Hiển thị Withdraw form | Click "Withdraw" khi đủ điều kiện → modal form | L2 × I3 | 6 | Medium | Wallet | No | ❌ Không |
| REQ-WLT-03 | Validation số tiền rút | Min = $50; nhập < $50 → error message | L2 × I3 | 6 | Medium | Wallet | No | ⚠️ Error text chưa rõ → CQ-02 |
| REQ-WLT-04 | UI khi số dư < $50 | Nút disabled hay clickable + error? | L2 × I3 | 6 | Medium | Wallet, Dashboard | Yes | ⚠️ Missing UI State → CQ-01 |

**Ambiguity Flag legend:**
- `❌ Không` — Requirement rõ ràng, sẵn sàng cho Design Module.
- `⚠️ [Ghi chú → CQ-##]` — Còn mơ hồ, cần giải đáp CQ trước khi design TC.

---

## 2: ATOMIC REQUIREMENTS

### AC 1 — [Tên AC]

#### REQ-WLT-01 — Nút Withdraw chỉ active khi đủ điều kiện
- **Source:** Implicit (agent suy luận từ business context)
- **Who:** Trader (logged in)
- **Action:** Observe button state on Wallet page
- **Object:** Button "Withdraw"
- **Outcome:** Button state = `enabled` khi balance > $0; `disabled` khi balance = $0
- **Ambiguity:** ⚠️ Balance threshold chưa rõ — $0 hay $50? → CQ-01

---

#### REQ-WLT-02 — Click Withdraw → hiển thị form
- **Source:** Explicit (AC nêu rõ)
- **Who:** Trader
- **Action:** Click "Withdraw" button
- **Object:** Modal dialog
- **Outcome:** Withdraw form modal appears with fields: Amount, Method, Confirm
- **Ambiguity:** ❌ Không

---

#### REQ-WLT-03 — Validation số tiền rút tối thiểu
- **Source:** Explicit (AC nêu rõ: min = $50)
- **Who:** Trader
- **Action:** Enter amount < $50, click Submit
- **Object:** Amount field, Error message
- **Outcome:** Error message displays below Amount field: "[exact text?]"
- **Ambiguity:** ⚠️ Error message text chưa rõ → CQ-02

---

### [Implicit Requirements — Không nằm trong AC]

#### REQ-WLT-04 — UI state khi số dư không đủ
- **Source:** Implicit (Missing — cần CQ)
- **Who:** Trader
- **Action:** Navigate to Wallet page with balance < $50
- **Object:** Withdraw button, Error/info message
- **Outcome:** [Chưa xác định] → CQ-01
- **Ambiguity:** ⚠️ Missing UI State

---

## 3: CLARIFICATION QUESTIONS

| # | Question | Atomic ID | Type | Impact if Unresolved |
|:---|:---|:---|:---|:---|
| CQ-01 | Khi balance < $50, nút "Withdraw" ở trạng thái disabled hay clickable + hiện error? | REQ-WLT-04 | Missing UI State | Không design được negative path và UI state verification TC |
| CQ-02 | Error message khi nhập số tiền < $50 hiển thị nội dung chính xác là gì? | REQ-WLT-03 | Missing Error Behavior | Không viết được literal Expected Result cho validation TC |
| CQ-03 | Số dư hiển thị trên Withdraw form có real-time hay cached? Cập nhật bao lâu 1 lần? | REQ-WLT-01 | Hidden Dependency | Không design được edge case cho stale data |

---

## HANDOFF CHECKLIST

Trước khi chuyển sang Design Module, verify:
- [ ] Tất cả AC đã phân rã thành Atomic Requirements
- [ ] 8 loại mơ hồ đã quét — mọi flag đều có CQ tương ứng
- [ ] Risk Score (L × I) đã tính cho mọi flow
- [ ] Stop-Ship criteria đã kiểm tra
- [ ] Affected Modules đã liệt kê
- [ ] CQ đã được user review (giải đáp hoặc ghi nhận "defer")
```

---

## Quy tắc viết .md

- Mỗi Atomic Requirement là 1 block riêng, ngăn cách `---`
- **Source** ghi rõ: `Explicit` / `Implicit` / `Missing`
- **Ambiguity** ghi rõ flag + link đến CQ number
- Phần 1 (Summary table) phải có cột `L × I` và `Risk Score` — agent phải justify priority
- CQ đánh số `CQ-01`, `CQ-02`... liên tục trong toàn bộ file
- Handoff checklist ở cuối — user tick trước khi chuyển sang designer
