# RCA FIX PATTERNS — F1 to F8

## Đọc file này khi cần code examples cho từng RCA code.

---

## F1 — UI/Animation Race

**Dấu hiệu:** Click bị overlay/spinner/toast che, element đang transition.

```typescript
// ❌ Sai
await page.waitForTimeout(3000);
await button.click({ force: true });

// ✅ Đúng — chờ state thật
await expect(spinner).toBeHidden();
await expect(button).toBeEnabled();
await button.click();

// ✅ Modal animation
const modal = page.getByRole('dialog');
await modal.waitFor({ state: 'visible' });
await modal.getByRole('button', { name: 'Confirm' }).click();
await modal.waitFor({ state: 'hidden' });

// ✅ Toast che nút — chờ toast biến mất
await expect(page.getByRole('status')).toBeHidden({ timeout: 10_000 });
await button.click();
```

---

## F2 — Network/API Timing

**Dấu hiệu:** UI chưa render data sau API call, dropdown chưa có options.

```typescript
// ✅ Chờ response cụ thể
const [response] = await Promise.all([
  page.waitForResponse(r => r.url().includes('/api/config') && r.status() === 200),
  configPage.updateConfiguration(),
]);
expect(response.ok()).toBeTruthy();

// ✅ Async state polling — order status, position update
await expect.poll(async () => {
  return await page.getByTestId('status').textContent();
}, { timeout: 30_000, intervals: [1000, 2000, 5000] }).toBe('Completed');

// ✅ Chờ dropdown populate
await page.getByRole('combobox').click();
await expect(page.getByRole('option').first()).toBeVisible();
```

---

## F3 — Shared State

**Dấu hiệu:** Pass đơn lẻ, fail khi chạy suite. Module-level mutable state.

```typescript
// ❌ Sai — shared state
let configPage: BAFConfigurationPage;
test.beforeEach(async ({ page }) => {
  configPage = new BAFConfigurationPage(page);
});

// ✅ Đúng — localize trong từng test
test('updates config', async ({ page }) => {
  const configPage = new BAFConfigurationPage(page);
  // ...
});
```

---

## F4 — Data Collision

**Dấu hiệu:** Fail khi repeat/parallel, hardcoded email/code trùng nhau.

```typescript
// ❌ Sai
const email = 'test@example.com';

// ✅ Đúng — dynamic unique
import { generateEmail } from '../utils/data-generator';
const email = generateEmail('BAF_7.1');
// → auto_BAF_7.1_1713500000000_A3F2@test.com
```

---

## F5 — Locator Fragile

**Dấu hiệu:** CSS dynamic, nth-child, XPath tuyệt đối, locator match nhiều element.

```typescript
// ❌ Sai
await page.locator('.css-123abc').click();
await page.locator('//div[3]/button[1]').click();
await page.locator('.ant-select-selector').click();

// ✅ Đúng — semantic
await page.getByRole('button', { name: 'Submit' }).click();
await page.getByLabel('Stage 1 Target Amount').fill('100');
await page.getByRole('combobox', { name: 'Currency' }).click();

// ✅ Ant Design component scoping
await page.getByRole('dialog').getByRole('button', { name: 'Confirm' }).click();
```

**Verify locator trước commit:** (1) Match đúng 1 element (2) Không bị overlay che (3) Đúng sau reload (4) Đúng trên mọi state.

---

## F6 — SPA Form Trigger

**Dấu hiệu:** `fill()` không trigger validation trên React/Ant Design/MUI.

```typescript
// ❌ Sai — fill() không trigger onChange
await input.fill('test@email.com');
await submitBtn.click();

// ✅ Đúng — pressSequentially + blur
await input.click();
await input.fill('');
await input.pressSequentially('test@email.com', { delay: 30 });
await input.blur();
await expect(submitBtn).toBeEnabled();
await submitBtn.click();
```

**Lưu ý:** Thử `fill()` trước. Chỉ switch sang `pressSequentially` khi validation thực sự không trigger.

---

## F7 — Auth/Session Drift

**Dấu hiệu:** Storage state hết hạn, bị redirect login ngoài ý muốn.

```bash
# Chạy lại auth setup trong repo này
node node_modules/playwright/cli.js test tests/setup/bo.auth.setup.ts --project=bo-setup
node node_modules/playwright/cli.js test tests/setup/wmt.auth.setup.ts --project=wmt-setup
```

**KHÔNG** sửa business test để handle login redirect. Auth failure = infrastructure issue.

---

## F8 — Cleanup Gap

**Dấu hiệu:** Test update BO config/settings nhưng không restore → test sau fail.

```typescript
// ✅ Đúng — restore trong afterEach
test.afterEach(async ({ page }) => {
  // Restore original config
  const configPage = new BAFConfigurationPage(page);
  await configPage.navigate();
  await configPage.restoreDefaults();
});

// ✅ Hoặc dùng scoped fixture with teardown
export const test = base.extend<{ configScope: void }>({
  configScope: async ({ page }, use) => {
    const original = await getConfig(page);
    await use();
    await restoreConfig(page, original);
  },
});
```
