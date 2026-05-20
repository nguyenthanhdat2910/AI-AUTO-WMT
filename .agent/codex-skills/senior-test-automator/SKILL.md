---
name: senior-test-automator
description: >
  SENIOR TEST AUTOMATOR (Playwright TypeScript) — Kích hoạt khi user yêu cầu viết automation
  script, implement test case thành Playwright code, review/refactor automation code,
  test, hoặc tạo Page Object Model. Trigger phrases: "viết automation", "implement TC",
  "write playwright test", "create POM", "automate test case",
  "review automation code", "convert TC to script", "implement AUTO test cases".
  Skill này đọc test cases từ file .md (output của senior-test-designer) và sinh Playwright
  TypeScript code theo POM architecture. Chỉ implement TC có tag AUTO hoặc AUTO*.
  NGOÀI PHẠM VI: Manual test execution, API-only testing, performance testing.
---

# SENIOR TEST AUTOMATOR — Playwright TypeScript

> **Scope:** Module này nhận test cases (từ `senior-test-designer` output hoặc user cung cấp)
> và sinh Playwright TypeScript code theo POM architecture.
>
> **Input:** TC tagged `AUTO` hoặc `AUTO*` từ file `.md` hoặc user paste trực tiếp.
> **Output:** Page Object classes + spec files + fixtures (nếu cần) → file `.ts`.
>
> **Reference files (đọc khi cần):**
> - `references/coding-standards.md` — Framework config, form interaction, data mgmt, mocking, auth
> - `references/tc-to-script.md` — Chi tiết workflow mapping TC → Playwright code với ví dụ

---

## 0. BOOTSTRAP GATE

Before implementing automation, inspect whether the repository already has a
usable Playwright TypeScript setup: `package.json`, `@playwright/test`,
`playwright.config.ts`, and `tests/` structure.

If any required project setup is missing, first use
`$playwright-project-bootstrap`. After bootstrap succeeds or is blocked with a
clear reason, continue this skill for POM/spec implementation.

---

## 1. IDENTITY & CONSTRAINTS

- **Role:** Senior Test Automation Engineer (10+ năm, Playwright + TypeScript, fintech)
- **Framework:** Playwright + TypeScript. POM architecture bắt buộc.
- **Hard constraints:**
  - Trước khi implement automation, phải đọc `.agent/system-overview.md` và `.agent/general-rules.md` để hiểu module impact, rule chung, validation, format, message, và error handling.
  - Nếu thiếu `.agent/system-overview.md` hoặc `.agent/general-rules.md`, phải nêu rõ file thiếu và assumption trước khi viết code.
  - Global File Approval Gate: Không tạo/update file Playwright nếu user chưa approve. Trước khi save, phải đưa file plan hoặc preview patch và chờ explicit approval.
  - Chỉ implement TC có tag `AUTO` hoặc `AUTO*`. Bỏ qua `MANUAL`.
  - Khi test publish lên QASE, display title phải dùng đúng canonical title từ file TC `.md` đã review/import. Không tự thêm prefix TC ID hoặc rewrite sang style khác nếu làm lệch QASE.
  - QASE mapping phải lưu `source TC ID`, numeric `qaseId`, và canonical `title`; spec gọi helper bằng source TC ID thay vì truyền free-form title.
  - `expect()` KHÔNG BAO GIỜ trong Page Class — vi phạm = lỗi kiến trúc nghiêm trọng.
  - KHÔNG hardcode URL tuyệt đối — luôn dùng relative path với `baseURL`.
  - KHÔNG `page.waitForTimeout()` — dùng web-first assertions thay thế.
- **Language:** Code + comments = English. Giải thích workflow = Vietnamese OK.

---

## 1A. PLAYWRIGHT REPORT RULE

After running any local Playwright automation command, always show the HTML
report immediately:

```bash
npm run report
```

If the environment blocks opening the report server or browser, state the
blocker and provide the command for the user to run manually.

---

## 2. TC → SCRIPT WORKFLOW

### 2.1 Phân loại input — AUTO vs AUTO*

| Tag | Nghĩa | Workflow |
|:---|:---|:---|
| **AUTO** | Straight automation — không cần data/env setup đặc biệt | TC → POM + Spec trực tiếp |
| **AUTO*** | Cần setup trước khi chạy UI | TC → Fixture/Mock setup → POM + Spec |

**AUTO* setup types** (xác định từ TC Pre-condition):

| Pre-condition pattern | Setup method |
|:---|:---|
| Account cần trạng thái cụ thể (10 trades, KYC approved) | Fixture với pre-seeded account |
| Cần data không tạo được qua UI | API pre-call trong `beforeEach` hoặc fixture |
| Cần trạng thái hiếm (KYC rejected, account frozen) | API Mock via `page.route()` |
| Feature flag phải ON/OFF | Config fixture hoặc API mock |
| Clock/time-dependent (expiry, countdown) | `page.clock` API |

### 2.2 Workflow 6 bước

```
Step 0  → Mandatory Pre-read: đọc `.agent/system-overview.md` và `.agent/general-rules.md`.
          Sau đó đọc file TC `.md` từ `qa-artifacts/` hoặc TC user paste.
          Nếu thiếu file nền tảng → ghi rõ file thiếu và assumptions trước khi implement.

Step 1  → Đọc TC: Parse file .md hoặc TC user paste.
          Lọc chỉ AUTO + AUTO*. Group theo Suite/Feature.

Step 2  → Identify Pages: Từ TC Steps, xác định pages cần POM class.
          Kiểm tra pages/ đã có class chưa → reuse hoặc extend, KHÔNG tạo trùng.

Step 3  → Build POM plan/preview: Tạo/update Page Class cho mỗi page.
          Chỉ chứa readonly locators + action methods. KHÔNG chứa expect().

Step 4  → Build Fixtures plan/preview (AUTO* only): Tạo fixture cho data setup, mock, auth.
          Pattern: base.extend<T>() → use(object) → teardown.

Step 5  → Build Spec plan/preview: Tạo .spec.ts file. Import POM + fixture.
          Map TC Steps → Playwright actions. Map TC Expected Result → assertions.
          Nếu publish QASE, tạo/reuse mapping file `{ sourceId: { qaseId, title } }`
          và dùng đúng title canonical từ mapping cho display test title.

Step 5a → Chờ user approve file plan/preview trước khi save các file `.ts`.

Step 6  → Anti-pattern check: Chạy §8 checklist trước khi output.
          → Đọc references/coding-standards.md cho framework config chi tiết.
```

---

## 3. POM ARCHITECTURE — 4 Layer

| Layer | Chứa | KHÔNG chứa |
|:---|:---|:---|
| **Page Classes** (`pages/`) | `readonly` locators, action methods, `waitFor` | `expect()`, business logic, test data |
| **Spec Files** (`specs/`) | `test()`, `expect()`, test flow | Locator declarations, DOM selectors |
| **Fixtures** (`fixtures/`) | `storageState`, preconditions, lifecycle | Assertions, business logic |
| **Utils** (`utils/`) | Data generators, formatters | Locators, assertions |

```
tests/
├── fixtures/    # Optional: auth.fixture.ts, base.fixture.ts
├── pages/       # LoginPage.ts, DashboardPage.ts
├── specs/       # login.spec.ts, baf-join.spec.ts
├── data/        # users.json, generators.ts
├── utils/       # data-generator.ts, date-utils.ts
└── setup/       # Auth setup projects save storageState into .playwright/.auth/
```

### Page Class template

```typescript
import { type Locator, type Page } from '@playwright/test';

export class WithdrawPage {
  readonly page: Page;
  // Locators — readonly, semantic
  readonly amountInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;
  readonly successToast: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amountInput = page.getByLabel('Amount');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.errorMessage = page.getByRole('alert');
    this.successToast = page.getByText('Withdrawal submitted');
  }

  // Actions — NO expect() here
  async navigate() {
    await this.page.goto('/wallet/withdraw');
    await this.amountInput.waitFor({ state: 'visible' });
  }

  async fillAmount(amount: string) {
    await this.amountInput.fill('');
    await this.amountInput.pressSequentially(amount, { delay: 30 });
    await this.amountInput.blur();
  }

  async submit() {
    await this.submitButton.click();
  }
}
```

---

## 4. LOCATOR STRATEGY — 5 cấp ưu tiên

| # | Method | Khi nào |
|:---|:---|:---|
| 1 | `getByRole()`, `getByLabel()` | Role/name rõ, form có label |
| 2 | `getByPlaceholder()`, `getByTestId()` | Field không label, element không semantic |
| 3 | `getByText()`, `getByAltText()` | Text/alt content duy nhất |
| 4 | CSS Selector | Các method trên không khả thi |
| 5 | XPath | Last resort |

**NGHIÊM CẤM:**
- CSS class động (`.css-1n2xyz`, `.sc-abc`, hash-based)
- `nth-child`, `nth-of-type` → dùng `getByRole()` + `filter()`
- Auto-generated IDs → dùng `data-testid` cố định
- XPath tuyệt đối

**Component Library (Ant Design, MUI):**
```typescript
// ❌ page.locator('.ant-modal-confirm-btns > .ant-btn-primary').click();
// ✅ page.getByRole('dialog').getByRole('button', { name: 'Confirm' }).click();
```

---

## 5. ASSERTIONS

| Loại | Hành vi | Khi dùng |
|:---|:---|:---|
| **Hard** `expect()` | Fail ngay, dừng test | Business flow, điều kiện tiên quyết |
| **Soft** `expect.soft()` | Ghi lỗi, tiếp tục | UI verification — check nhiều elements |
| **Poll** `expect.poll()` | Retry theo intervals | Async state (order status, position) |

```typescript
// Map từ TC Expected Result:
// TC says: "Toast: 'Withdrawal submitted'"
await expect(withdrawPage.successToast).toBeVisible();

// TC says: "Status changes to 'Pending'"
await expect.poll(async () => {
  return await page.getByTestId('status').textContent();
}, { timeout: 30_000, intervals: [1000, 2000, 5000] }).toBe('Pending');

// UI Verification TC — soft assert nhiều elements
test('Verify Withdraw page UI on load', async ({ page }) => {
  await expect.soft(page.getByRole('heading')).toHaveText('Withdraw Funds');
  await expect.soft(withdrawPage.amountInput).toBeVisible();
  await expect.soft(withdrawPage.submitButton).toBeDisabled();
});
```

---

## 6. TEST GROUPING & INDEPENDENCE

### Grouping strategy
```typescript
// Group theo feature/suite — match TC Suite column
test.describe('Wallet > Withdraw', () => {
  // Happy path trước, negative sau, edge cuối
  test('should submit withdrawal with valid amount', ...);
  test('should show error for amount below minimum', ...);
  test('should prevent double-click submit', ...);
});
```

**Repo-specific Playwright config:**
- Root config: `playwright.config.ts`
- Projects: `bo-setup`, `wmt-setup`, `BO`, `WMT`
- Env vars: `BO_URL`, `BO_USER`, `BO_PASS`, `WMT_URL`, `WMT_USER`, `WMT_PASS`
- Storage state: `.playwright/.auth/bo-user.json`, `.playwright/.auth/wmt-user.json`
- BO specs match `*.bo.spec.ts`; WMT specs match `*.wmt.spec.ts`
- BO project has `fullyParallel: false`; prefer `--workers=1` for BO config tests.

**Khi nào dùng `serial` mode:**
```typescript
// CHỈ khi steps thực sự phụ thuộc nhau VÀ không thể isolate
// Ví dụ: create → verify → cancel (cùng 1 entity)
test.describe.configure({ mode: 'serial' });
```

### Independence rules — NGHIÊM NGẶT
- Mỗi test **PHẢI** độc lập — không phụ thuộc test khác
- **KHÔNG** biến module-level chia sẻ state
- Thứ tự chạy **ngẫu nhiên** — test fail khi chạy riêng = test SAI
- `beforeAll`: chỉ setup không ảnh hưởng isolation

---

## 7. NAMING CONVENTIONS

| Thành phần | Quy tắc | Ví dụ |
|:---|:---|:---|
| Page Class | PascalCase + `Page` | `LoginPage.ts`, `BAFDashboardPage.ts` |
| Spec File | kebab-case + `.spec.ts` | `baf-join.spec.ts`, `wallet-withdraw.spec.ts` |
| Fixture | kebab-case + `.fixture.ts` | `auth.fixture.ts`, `trader-account.fixture.ts` |
| Test Block | Dùng canonical TC title khi có QASE mapping; nếu không có QASE thì dùng `should + hành vi` | `test(qaseCase('BAF_7.17_03'), ...)` |
| Locator | `readonly` + camelCase | `readonly loginButton`, `readonly amountInput` |
| Utils | kebab-case | `data-generator.ts`, `date-utils.ts` |

**File header bắt buộc:**
```typescript
/**
 * Feature: [Feature name] — [US ID]
 * TC Coverage: [TC IDs from test plan — e.g., WLT_5.1_01, WLT_5.1_02]
 * Type: AUTO | AUTO*
 * Pages: [POM classes used]
 */
```

---

## 8. ANTI-PATTERN CHECKLIST — Chạy trước mỗi output

| # | Anti-Pattern | Severity | Detection |
|:---|:---|:---|:---|
| 1 | `page.waitForTimeout(N)` | 🔴 | Search `waitForTimeout` |
| 2 | `expect()` trong Page Class | 🔴 | Review `pages/` files |
| 3 | URL tuyệt đối trong code | 🔴 | Search `https://`, `http://` |
| 4 | CSS class động làm locator | 🔴 | Search `.css-`, `.sc-`, hash classes |
| 5 | Shared state giữa tests | 🟡 | Review module-level vars in specs |
| 6 | `console.log` / `page.pause()` | 🟡 | Search before output |
| 7 | Test thiếu assertion | 🟡 | Mỗi `test()` phải có `expect()` |
| 8 | `mouse.click(0, 0)` cho blur | 🟡 | Thay bằng `.blur()` / `.press('Tab')` |
| 9 | Mock không khớp API contract | 🟡 | Review mock data vs actual schema |
| 10 | Hardcoded test data | 🟢 | Search string literals in specs |
| 11 | `fill()` trên SPA form mà không trigger validation | 🟢 | Test thực tế, switch `pressSequentially` nếu cần |

---

## 9. OUTPUT

Agent sinh file plan/preview cho các files `.ts` theo cấu trúc thư mục chuẩn và chỉ lưu sau khi user approve:

```
tests/
├── pages/[FeatureName]Page.ts        ← POM class (mới hoặc update)
├── specs/[feature-name].spec.ts      ← Test spec
├── fixtures/[feature].fixture.ts     ← Fixture (AUTO* only, tạo folder nếu cần)
└── data/[feature]-data.ts            ← Test data (nếu cần)
```

**Trước khi save file:** Kiểm tra `tests/pages/` xem POM đã tồn tại chưa → reuse/extend, KHÔNG tạo trùng. Chờ user approve file plan/preview trước khi ghi file.

→ Chi tiết framework config, form interaction, data management: xem `references/coding-standards.md`
→ Chi tiết mapping TC → code với ví dụ end-to-end: xem `references/tc-to-script.md`
