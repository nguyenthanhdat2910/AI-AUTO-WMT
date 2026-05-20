---
name: senior-flaky-analyzer
description: >
  FLAKY TEST ANALYZER & FIX WORKFLOW — Kích hoạt khi Playwright test bị fail, cần debug
  automation, phân tích flaky, phân biệt lỗi script / real bug / lỗi môi trường, và sửa test.
  Trigger phrases: "fix flaky", "debug test", "test bị fail", "sửa test", "chạy test lại",
  "phân tích lỗi test", "tại sao test fail", "CI fail", "test red", "fix test".
  Skill này KHÔNG được sửa assertion để che bug thật. Tối đa 3 vòng fix-verify.
---

# FLAKY TEST ANALYZER — Debug & Fix Workflow

> **Scope:** Phân tích test failures, classify root cause, fix flaky scripts.
> Tối đa 3 vòng fix → verify. Nếu vẫn fail → escalate với report.
>
> **Integration:** Fix code phải tuân theo `$senior-test-automator` coding standards
> (POM architecture, locator strategy, assertion rules).
>
> **Reference files:**
> - `references/rca-fix-patterns.md` — F1–F8 chi tiết code examples
> - `references/reporting-format.md` — Report template, anti-pattern scan, escalation guide

---

## 1. HARD CONSTRAINTS

- Trước khi phân loại lỗi có liên quan requirement/business behavior, phải đọc `.agent/system-overview.md` và `.agent/general-rules.md` để đối chiếu expected behavior, rule chung, validation, format, message, và error handling.
- Nếu thiếu `.agent/system-overview.md` hoặc `.agent/general-rules.md`, phải nêu rõ file thiếu trong debug report và ghi assumption minh bạch. Không được sửa assertion để bù cho phần behavior chưa rõ.
- **KHÔNG** sửa assertion để che bug thật (nới expected result, skip test, đổi threshold)
- **KHÔNG** thêm `test.fail()` cho Real Bug nếu chưa có bug ticket hoặc user confirm
- **KHÔNG** dùng `page.waitForTimeout()` — dùng web-first assertion thay thế
- **KHÔNG** dùng `{ force: true }` để bypass overlay/disabled/UI chưa sẵn sàng
- **KHÔNG** tăng timeout tùy tiện — ưu tiên wait cụ thể trước
- **KHÔNG** xóa coverage để suite pass
- **Global File Approval Gate:** Không tạo/update debug report hoặc file test/POM nếu user chưa approve. Trước khi save, phải đưa file plan hoặc preview patch và chờ explicit approval.
- `expect()` KHÔNG trong Page Class — fix phải tuân theo POM
- Test phải độc lập, restore state nếu thay đổi config

---

## 1A. PLAYWRIGHT REPORT RULE

After running any local Playwright verification or debug command, always show
the HTML report immediately:

```bash
npm run report
```

If the environment blocks opening the report server or browser, state the
blocker and provide the command for the user to run manually.

---

## 2. FAILURE CLASSIFICATION — 3 nhóm

| Nhóm | Định nghĩa | Hành động |
|:---|:---|:---|
| **Flaky Script** | Lỗi automation code: locator, race, data collision, shared state, form trigger | Sửa code test/POM/data setup |
| **Real Bug** | Test flow đúng, app behavior sai so với requirement | KHÔNG sửa test. Báo bug. `test.fail()` chỉ khi có ticket |
| **Env/Infra** | Server lỗi, app không render, auth/session chết, network | Dừng. Báo user kiểm tra môi trường |

### Decision Tree

```
Test failed
  → Trang trắng, JS bundle lỗi, MIME type, ERR_CONNECTION, net::ERR?
      ⇒ Env/Infra. Dừng.
  → Auth state hết hạn, redirect login ngoài ý muốn?
      ⇒ Env/Auth. Chạy lại auth setup, không sửa assertion.
  → App hiển thị sai so với requirement, test flow đúng?
      ⇒ Real Bug. Báo bug, không đổi expected result.
  → Locator timeout nhưng element có trên UI thực tế?
      ⇒ Flaky Script: locator/sync issue (F1/F5).
  → Pass đơn lẻ, fail khi suite/parallel?
      ⇒ Flaky Script: shared state/data collision (F3/F4).
  → Không rõ?
      ⇒ Chạy repeat scoped để phân loại lại.
```

---

## 3. RCA CODES — 8 loại Flaky Script

| Code | Nhóm | Dấu hiệu | Fix tóm tắt |
|:---|:---|:---|:---|
| **F1** | UI/Animation Race | Click bị overlay/spinner/toast che, element transition | Chờ state bằng web-first assertion |
| **F2** | Network/API Timing | UI chưa render data, dropdown chưa có options | `waitForResponse` hoặc `expect.poll` |
| **F3** | Shared State | Module-level mutable state, test phụ thuộc test trước | Localize state, reset/restore |
| **F4** | Data Collision | Hardcoded email/code trùng khi parallel/repeat | Dynamic generator hoặc unique fixture |
| **F5** | Locator Fragile | CSS dynamic, nth-child, XPath tuyệt đối, match nhiều | Semantic locator (getByRole, getByLabel) |
| **F6** | SPA Form Trigger | `fill()` không trigger validation React/Ant Design | `pressSequentially` + `blur()` |
| **F7** | Auth/Session Drift | Storage state hết hạn, redirect login | Chạy auth setup lại |
| **F8** | Cleanup Gap | Test update config nhưng không restore | `afterEach` restore hoặc scoped helper |

→ Chi tiết code examples: xem `references/rca-fix-patterns.md`

---

## 4. WORKFLOW

### 4.1 Single Test Failure

```
Step 0  → Mandatory Context Check:
          - Đọc `.agent/system-overview.md` và `.agent/general-rules.md` nếu lỗi cần đối chiếu expected behavior hoặc business rule.
          - Đọc requirement/test case source nếu có trong `requirements/` hoặc `qa-artifacts/`.
          - Nếu thiếu file nền tảng/source → ghi rõ file thiếu và assumptions trong report.

Step 1  → Evidence Collection:
          - Playwright output: command, test title, stack trace, line number
          - Screenshot: test-results/**/test-failed-*.png
          - Error context: test-results/**/error-context.md
          - Trace zip nếu có
          KHÔNG phân tích chỉ dựa error log khi screenshot/context có sẵn.

Step 2  → Classify: Chạy Decision Tree (§2). Xác định Flaky/Bug/Env.

Step 3  → RCA: Nếu Flaky Script → xác định F-code (§3).

Step 4  → Fix: Apply fix pattern tương ứng.
          Fix code PHẢI tuân theo automator coding standards.

Step 5  → Verify: Chạy scoped repeat (xem §5).
          Pass 3 repeats → Done. Fail → quay Step 3 (max 3 rounds).
```

### 4.2 Batch Failure (CI fail nhiều tests)

```
Step 1  → Collect tất cả failure summaries.

Step 2  → Group by pattern:
          - Cùng error type (timeout, assertion, network)
          - Cùng page/module
          - Cùng RCA code

Step 3  → Priority order:
          [SMOKE] tests → fix trước (block deploy)
          [REGRESSION] tests → fix tiếp (block release)
          [FULL] tests → fix sau

Step 4  → Fix root cause per group, KHÔNG fix từng test riêng lẻ.
          VD: 5 tests fail F5 trên cùng page → fix POM 1 lần.

Step 5  → Verify toàn bộ group sau mỗi fix.
```

---

## 5. VERIFICATION COMMANDS

Detect project từ `playwright.config.ts` thay vì hardcode. Trong repo này ưu tiên local CLI:

```bash
# Single test — scoped repeat
node node_modules/playwright/cli.js test <file-path> --grep "<test-name>" --workers=1 --repeat-each=3

# Specific project (nếu config có multi-project)
node node_modules/playwright/cli.js test <file-path> --project=<project-name> --workers=1 --repeat-each=3

# BO project — config/shared state nhạy, ưu tiên sequential
node node_modules/playwright/cli.js test <file-path> --project=BO --workers=1 --repeat-each=3

# WMT project — có thể stress parallel khi nghi data collision

# Parallel stress test (khi suspect data collision)
node node_modules/playwright/cli.js test <file-path> --project=WMT --workers=4 --repeat-each=3

# Auth re-setup (khi suspect session drift)
node node_modules/playwright/cli.js test tests/setup/bo.auth.setup.ts --project=bo-setup
node node_modules/playwright/cli.js test tests/setup/wmt.auth.setup.ts --project=wmt-setup
```

### Pass Criteria — Tất cả phải thỏa

- [ ] Test pass 3 repeats liên tiếp
- [ ] Không có `test.only` còn sót
- [ ] Không có `waitForTimeout` mới
- [ ] Không có `expect()` trong Page Class
- [ ] Không có `{ force: true }` không được user approve
- [ ] State đã restore nếu test thay đổi config

---

## 6. ESCALATION — Sau 3 rounds vẫn fail

Sinh report đầy đủ (xem `references/reporting-format.md`) gồm:
- Classification Summary cho mỗi test
- Evidence đã thu thập (screenshot, trace path, error log)
- Fix đã thử và kết quả
- Anti-pattern scan
- **Đề xuất cụ thể:** cần dev support? cần env fix? cần product confirm?

---

## 7. OUTPUT

Agent sinh preview report cho `qa-artifacts/[feature]_debug_report.md` và chỉ lưu file sau khi user approve.
Nếu fix code → commit message format: `fix(test): [F-code] [mô tả ngắn]`
VD: `fix(test): F5 replace CSS locator with getByRole in WithdrawPage`

→ Report format: xem `references/reporting-format.md`
→ Fix patterns: xem `references/rca-fix-patterns.md`
