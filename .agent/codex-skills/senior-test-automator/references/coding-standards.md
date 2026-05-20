# CODING STANDARDS REFERENCE — Playwright TypeScript

## Đọc file này khi cần chi tiết về framework config, form interaction, data mgmt, mocking, auth.

---

## 1. Framework Configuration

Repo hiện tại dùng `playwright.config.ts` ở root với cấu hình chính:

- `testDir: './tests'`
- Projects: `bo-setup`, `wmt-setup`, `BO`, `WMT`
- Env vars bắt buộc: `BO_URL`, `BO_USER`, `BO_PASS`, `WMT_URL`, `WMT_USER`, `WMT_PASS`
- Storage state: `.playwright/.auth/bo-user.json`, `.playwright/.auth/wmt-user.json`
- BO specs: `*.bo.spec.ts`; WMT specs: `*.wmt.spec.ts`
- BO project `fullyParallel: false` vì BO staging/config shared state nhạy.

Khi viết test trong repo này, ưu tiên cấu hình thật ở `playwright.config.ts`:

```typescript
export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : undefined,
  reporter: 'html',
  use: {
    actionTimeout: 15_000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'bo-setup', testMatch: /bo\.auth\.setup\.ts/, use: { baseURL: BO_URL } },
    { name: 'wmt-setup', testMatch: /wmt\.auth\.setup\.ts/, use: { baseURL: WMT_URL } },
    {
      name: 'BO',
      fullyParallel: false,
      use: { ...devices['Desktop Chrome'], baseURL: BO_URL, storageState: '.playwright/.auth/bo-user.json' },
      dependencies: ['bo-setup'],
      testMatch: /.*\.bo\.spec\.ts/,
    },
    {
      name: 'WMT',
      use: { ...devices['Desktop Chrome'], baseURL: WMT_URL, storageState: '.playwright/.auth/wmt-user.json' },
      dependencies: ['wmt-setup'],
      testMatch: /.*\.wmt\.spec\.ts/,
    },
  ],
});
```

**Timeout rules:**
- 60s default theo repo hiện tại
- `test.slow()` dùng cho E2E flow dài khi có lý do rõ
- NGHIÊM CẤM ghi đè timeout trong từng test trừ khi có comment lý do
- `expect.poll()` có timeout riêng: tối đa 30s cho async state

**Cross-browser:**
- Chromium là browser chính — chạy mọi test
- Firefox/WebKit: chỉ chạy Smoke suite hoặc khi AC yêu cầu cross-browser
- Skip test trên browser cụ thể: `test.skip(browserName === 'webkit', 'reason')`

---

## 2. Authentication & Session Reuse

Repo hiện tại dùng setup projects thay vì `global-setup.ts`:

```bash
node node_modules/playwright/cli.js test tests/setup/bo.auth.setup.ts --project=bo-setup
node node_modules/playwright/cli.js test tests/setup/wmt.auth.setup.ts --project=wmt-setup
```

Storage state paths:

```text
.playwright/.auth/bo-user.json
.playwright/.auth/wmt-user.json
```

Business specs không login lại trong từng test; dùng project `BO` hoặc `WMT` để inherit storage state.

Multi-role (Customer, Salesman, Admin): dùng `storageState` — KHÔNG login lại mỗi test.

```typescript
// BO spec inherits .playwright/.auth/bo-user.json from project config
test('should update BO configuration', async ({ page }) => {
  await page.goto('/configuration');
});

// WMT spec inherits .playwright/.auth/wmt-user.json from project config
test('should open BAF dashboard', async ({ page }) => {
  await page.goto('/bring-a-friend');
});
```

**KHÔNG dùng storageState khi:** test login flow, session expiry, multi-user concurrent.
Multi-user: tạo 2 browser context riêng trong cùng test.

---

## 3. Custom Fixtures

Dùng fixture thay `beforeEach` khi: setup cần tái sử dụng nhiều file, truyền state vào test, hoặc quản lý lifecycle.

```typescript
// fixtures/trader-account.fixture.ts
import { test as base } from '@playwright/test';
import { DashboardPage } from '../pages/DashboardPage';

type TraderFixtures = {
  dashboardPage: DashboardPage;
  seededAccount: { id: string; balance: number };
};

export const test = base.extend<TraderFixtures>({
  dashboardPage: async ({ page }, use) => {
    const dashboard = new DashboardPage(page);
    await dashboard.navigate();
    await use(dashboard);
  },

  // AUTO* — seed data via API before UI test
  seededAccount: async ({ request }, use) => {
    // Setup
    const response = await request.post('/api/test/seed-account', {
      data: { balance: 5000, trades: 10, profit: 0.12 },
    });
    const account = await response.json();

    await use(account);

    // Teardown
    await request.delete(`/api/test/cleanup/${account.id}`);
  },
});

export { expect } from '@playwright/test';
```

**Spec file import:** `import { test, expect } from '../fixtures/trader-account.fixture';`
(KHÔNG import từ `@playwright/test` khi dùng custom fixture)

---

## 4. Form & UI Interaction

### Khi nào dùng `fill()` vs `pressSequentially()`

| Tình huống | Method | Lý do |
|:---|:---|:---|
| Form HTML thuần, không SPA framework | `fill()` | Nhanh, đủ trigger change event |
| React/Vue/Ant Design/MUI — validation trigger bình thường | `fill()` trước, test thực tế | Thử fill() trước, chỉ switch nếu validation không trigger |
| React/Vue — validation KHÔNG trigger với fill() | `pressSequentially()` + `blur()` | Mô phỏng keystroke → trigger onChange |
| Search field với debounce/autocomplete | `pressSequentially({ delay: 100 })` | Cần delay giữa keystrokes |

```typescript
// Pattern cho SPA form khi fill() không đủ:
await input.fill('');  // clear first
await input.pressSequentially('test@email.com', { delay: 30 });
await input.blur();    // trigger validation
await expect(submitBtn).toBeEnabled();
```

**Trigger blur thứ tự ưu tiên:** `.blur()` → `.press('Tab')` → `page.locator('body').click({ position: { x: 1, y: 1 } })`
**NGHIÊM CẤM:** `page.mouse.click(0, 0)` — có thể click element ẩn → flaky.

### Dropdown, Modal, Dynamic elements
```typescript
// Ant Design Select
await page.getByRole('combobox', { name: 'Currency' }).click();
await page.getByRole('option', { name: 'USD' }).click();

// Wait for modal animation
const modal = page.getByRole('dialog');
await modal.waitFor({ state: 'visible' });
await modal.getByRole('button', { name: 'Confirm' }).click();
await modal.waitFor({ state: 'hidden' });

// Dynamic list — wait for loading done
await expect(page.getByRole('progressbar')).toBeHidden();
await expect(page.getByRole('row')).toHaveCount(10);
```

---

## 5. Test Data Management

### Dynamic generation — bắt buộc cho entity mới
```typescript
// utils/data-generator.ts
export function generateEmail(testName: string): string {
  const ts = Date.now();
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `auto_${testName}_${ts}_${rand}@test.com`;
}

export function generateUsername(prefix: string): string {
  return `${prefix}_${Date.now()}`;
}
```

Format: `auto_[testName]_[timestamp]_[random]@test.com` — unique khi chạy parallel.

| Strategy | Khi dùng |
|:---|:---|
| Dynamic generation | Test tạo entity mới (register, order) |
| Fixture accounts (pre-seeded) | Test cần trạng thái sẵn (đã KYC, có balance) |
| JSON data files | Data-driven tests |
| Faker library | Dữ liệu realistic (tên, địa chỉ) |

**Cleanup:** Ưu tiên fixture teardown. Scheduled job xóa `auto_*` > 24h.
**NGHIÊM CẤM:** Xóa trực tiếp trong DB từ test code.

---

## 6. API Mocking — Cho AUTO* Tests

| Tình huống | Mock? |
|:---|:---|
| Trạng thái hiếm (KYC rejected, frozen) | ✅ |
| Error handling (500, timeout) | ✅ |
| Control exact display data | ✅ |
| Happy path E2E (login, checkout) | ❌ |

```typescript
// Mock pattern — comment lý do bắt buộc
// Mock: KYC rejected state — cannot reproduce via UI
await page.route('**/api/v1/kyc/status', route =>
  route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ status: 'rejected', reason: 'ID expired' }),
  })
);
await page.goto('/kyc');
await expect(page.getByText('ID expired')).toBeVisible();
```

**Rules:**
- Mock response **PHẢI** khớp API contract thật (schema, status code)
- Mỗi mock **PHẢI** có comment lý do
- Test dùng mock = `[AUTO*]` trong test plan
- Mock cleanup: `await page.unroute('**/api/v1/kyc/status')` sau test nếu cần

---

## 7. Annotations & Retry

```typescript
test.fail();   // Known bug — BUG-xxx
test.skip(browserName === 'webkit', 'File upload not stable on WebKit');
test.fixme();  // Flaky investigating — FLAKY-xxx
test.slow();   // Long flow — timeout x3
```

| Env | Retries | Lý do |
|:---|:---|:---|
| Local | 0 | Fail ngay để debug |
| CI | 2 | Retry infra flakiness |
| Nightly | 1 | Balance speed + reliability |

**Rule:** Test fail 3 lần liên tiếp trên CI → mở ticket, **KHÔNG** tăng retries.

---

## 8. Environment Variables

```typescript
// NGHIÊM CẤM giả định env var luôn tồn tại
if (!process.env.BO_URL) throw new Error('BO_URL is required');
if (!process.env.WMT_URL) throw new Error('WMT_URL is required');
const timeout = parseInt(process.env.API_TIMEOUT || '30000');
```

**Không hardcode URL:** luôn dùng relative path (`/login`) với `baseURL` từ config. Trong repo này dùng `BO_URL` và `WMT_URL`, không dùng generic `BASE_URL`.

---

## 9. Code Quality

- **DRY:** Lặp ≥ 3 nơi → extract util/helper
- **Xóa trước output:** `console.log`, `page.pause()`, `debugger`, code comment, unused imports
- **KHÔNG** tự xóa file source đã tồn tại — kiểm tra trước khi tạo mới
- **Comment block đầu file:** bắt buộc (xem SKILL.md §7)
