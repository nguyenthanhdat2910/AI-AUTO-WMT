# TC → PLAYWRIGHT SCRIPT — Mapping Reference

## Đọc file này khi cần chi tiết mapping từ TC (designer output) sang Playwright code.

---

## 1. Mapping Rules

### TC Field → Code Element

| TC Field | Maps To |
|:---|:---|
| **Suite** (e.g., `Wallet\Withdraw`) | `test.describe('Wallet > Withdraw', ...)` + file name `wallet-withdraw.spec.ts` |
| **Title** | `test('should [title in lowercase]', ...)` |
| **Pre-condition** | Fixture setup, `beforeEach`, hoặc `storageState` |
| **Steps** (actions) | POM action methods → gọi trong spec |
| **Expected Result** | `expect()` hoặc `expect.soft()` assertions |
| **Test Data** | Dynamic generator hoặc fixture account |
| **Automation = AUTO** | Straight spec, không cần special setup |
| **Automation = AUTO*** | Fixture + mock/seed + spec |
| **Exec Tier = SMOKE** | Tag: `test('...', { tag: '@smoke' }, ...)` |
| **Regression = Yes** | Tag: `test('...', { tag: '@regression' }, ...)` |

### Pre-condition → Setup Method

| Pre-condition pattern | Code |
|:---|:---|
| "User is logged in" | `storageState` project |
| "User is on [page]" | `page.goto('/path')` trong `beforeEach` hoặc POM `navigate()` |
| "Account has X trades / Y balance" | AUTO* → fixture seed via API |
| "Feature flag Z is ON" | AUTO* → API mock hoặc config fixture |
| "KYC status = rejected" | AUTO* → `page.route()` mock |

### Expected Result → Assertion Type

| Expected Result pattern | Assertion |
|:---|:---|
| "Toast: 'message'" | `expect(locator).toBeVisible()` + `toHaveText('message')` |
| "Error below field: 'text'" | `expect(page.getByRole('alert')).toHaveText('text')` |
| "Button state: disabled" | `expect(button).toBeDisabled()` |
| "Navigate to /page" | `expect(page).toHaveURL('/page')` |
| "Status changes to 'Pending'" | `expect.poll(...)` với timeout |
| Multiple UI elements (UI Verification TC) | `expect.soft()` cho từng element |

---

## 2. End-to-End Example — AUTO Test

### Input: TC từ designer

```
#### WLT_5.1_01 — Verify successful withdrawal with valid amount
- **Req Ref:** AC 1
- **Priority:** High | **Severity:** Critical | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** SMOKE | **Automation:** AUTO
- **Pre-condition:** Trader logged in, balance ≥ $500
- **Test Data:** Amount: "100"
- **Steps:**
  1. Navigate to Withdraw page
  2. Enter "100" in Amount field
  3. Click "Submit" button
  4. Confirm in modal dialog
- **Expected Result:**
  1. Withdraw page loads with Amount field visible
  2. Amount field displays "100"
  3. Confirmation modal appears with text: "Withdraw $100.00?"
  4. Toast: "Withdrawal submitted successfully". Status in history: "Pending"
```

### Output: POM + Spec

**`tests/pages/WithdrawPage.ts`**
```typescript
import { type Locator, type Page } from '@playwright/test';

export class WithdrawPage {
  readonly page: Page;
  readonly amountInput: Locator;
  readonly submitButton: Locator;
  readonly confirmModal: Locator;
  readonly confirmButton: Locator;
  readonly successToast: Locator;
  readonly historyStatus: Locator;

  constructor(page: Page) {
    this.page = page;
    this.amountInput = page.getByLabel('Amount');
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.confirmModal = page.getByRole('dialog');
    this.confirmButton = this.confirmModal.getByRole('button', { name: 'Confirm' });
    this.successToast = page.getByText('Withdrawal submitted successfully');
    this.historyStatus = page.getByTestId('withdrawal-status');
  }

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

  async confirmWithdrawal() {
    await this.confirmModal.waitFor({ state: 'visible' });
    await this.confirmButton.click();
  }
}
```

**`tests/specs/wallet-withdraw.spec.ts`**
```typescript
/**
 * Feature: Wallet Withdraw — US-5.1
 * TC Coverage: WLT_5.1_01
 * Type: AUTO
 * Pages: WithdrawPage
 */
import { test, expect } from '@playwright/test';
import { WithdrawPage } from '../pages/WithdrawPage';

test.describe('Wallet > Withdraw', () => {
  let withdrawPage: WithdrawPage;

  test.beforeEach(async ({ page }) => {
    withdrawPage = new WithdrawPage(page);
    await withdrawPage.navigate();
  });

  test('should submit withdrawal with valid amount',
    { tag: ['@smoke', '@regression'] },
    async ({ page }) => {
      // Step 1: Page loaded (implicit — navigate() in beforeEach)
      await expect(withdrawPage.amountInput).toBeVisible();

      // Step 2: Enter amount
      await withdrawPage.fillAmount('100');
      await expect(withdrawPage.amountInput).toHaveValue('100');

      // Step 3: Click Submit → modal appears
      await withdrawPage.submit();
      await expect(withdrawPage.confirmModal).toBeVisible();
      await expect(withdrawPage.confirmModal).toContainText('Withdraw $100.00?');

      // Step 4: Confirm → toast + status
      await withdrawPage.confirmWithdrawal();
      await expect(withdrawPage.successToast).toBeVisible();
      await expect(withdrawPage.historyStatus).toHaveText('Pending');
    }
  );
});
```

---

## 3. End-to-End Example — AUTO* Test (API Mock)

### Input: TC từ designer

```
#### KYC_2.1_05 — Verify rejected KYC displays reason
- **Req Ref:** AC 3
- **Priority:** High | **Severity:** Critical | **Behavior:** Negative | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO*
- **Pre-condition:** User has KYC status = "rejected" with reason "ID expired"
- **Test Data:** Account: pre-seeded KYC rejected state
- **Steps:**
  1. Navigate to KYC page
  2. Observe status banner
- **Expected Result:**
  1. KYC page loads
  2. Banner displays: "Your KYC has been rejected. Reason: ID expired"
```

### Output: Mock + Spec

**`tests/specs/kyc-status.spec.ts`**
```typescript
/**
 * Feature: KYC Status — US-2.1
 * TC Coverage: KYC_2.1_05
 * Type: AUTO* (mock KYC rejected state — cannot reproduce via UI)
 * Pages: KYCPage
 */
import { test, expect } from '@playwright/test';

test.describe('KYC > Status Display', () => {

  test('should display rejection reason when KYC is rejected',
    { tag: '@regression' },
    async ({ page }) => {
      // AUTO* setup: mock KYC rejected state
      // Reason: KYC rejection cannot be triggered via UI — requires admin action
      await page.route('**/api/v1/kyc/status', route =>
        route.fulfill({
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({
            status: 'rejected',
            reason: 'ID expired',
            updated_at: '2025-01-15T10:00:00Z',
          }),
        })
      );

      // Step 1: Navigate
      await page.goto('/kyc');

      // Step 2: Verify banner
      const banner = page.getByRole('alert');
      await expect(banner).toBeVisible();
      await expect(banner).toContainText('Your KYC has been rejected');
      await expect(banner).toContainText('Reason: ID expired');
    }
  );
});
```

---

## 4. End-to-End Example — AUTO* Test (Fixture Seed)

### Input: TC từ designer

```
#### PFR_6.1_01 — Verify profit request with qualifying account
- **Automation:** AUTO*
- **Pre-condition:** Account has 10 trades, ≥10% profit, ≥5 trading days
- **Steps:**
  1. Click "Request Profit"
  2. Confirm in modal
- **Expected Result:**
  1. Modal: "Are you sure you want to request profit?"
  2. Toast: "Profit request submitted". History: Status "Pending"
```

### Output: Fixture + Spec

**`tests/fixtures/qualified-account.fixture.ts`**
```typescript
import { test as base, expect } from '@playwright/test';

type QualifiedAccountFixtures = {
  qualifiedAccountId: string;
};

export const test = base.extend<QualifiedAccountFixtures>({
  qualifiedAccountId: async ({ request }, use) => {
    // AUTO* setup: seed account with qualifying conditions
    // Reason: 10 trades + 10% profit + 5 days cannot be created in real-time via UI
    const res = await request.post('/api/test/seed-account', {
      data: { trades: 10, profit_pct: 0.12, trading_days: 5, balance: 5000 },
    });
    const { id } = await res.json();

    await use(id);

    // Teardown
    await request.delete(`/api/test/cleanup/${id}`);
  },
});

export { expect };
```

**`tests/specs/profit-request.spec.ts`**
```typescript
/**
 * Feature: Profit Request — US-6.1
 * TC Coverage: PFR_6.1_01
 * Type: AUTO* (fixture: seed qualified account)
 * Pages: ProfitRequestPage
 */
import { test, expect } from '../fixtures/qualified-account.fixture';

test('should submit profit request with qualifying account',
  { tag: '@regression' },
  async ({ page, qualifiedAccountId }) => {
    await page.goto(`/accounts/${qualifiedAccountId}/profit`);

    // Step 1: Click Request Profit
    await page.getByRole('button', { name: 'Request Profit' }).click();
    const modal = page.getByRole('dialog');
    await expect(modal).toContainText('Are you sure you want to request profit?');

    // Step 2: Confirm
    await modal.getByRole('button', { name: 'Confirm' }).click();
    await expect(page.getByText('Profit request submitted')).toBeVisible();
    await expect(page.getByTestId('request-status')).toHaveText('Pending');
  }
);
```

---

## 5. UI Verification TC → Soft Assertions

```
#### WLT_5.1_02 — Verify Withdraw page UI elements on load
- **Automation:** AUTO
- **Exec Tier:** FULL
- **Expected Result:**
  1. Heading: "Withdraw Funds"
  2. Amount field: visible, empty, placeholder "Enter amount"
  3. Submit button: disabled
  4. Balance display: visible, format "$X,XXX.XX"
```

```typescript
test('should display correct UI elements on Withdraw page load',
  async ({ page }) => {
    const withdrawPage = new WithdrawPage(page);
    await withdrawPage.navigate();

    // Soft assertions — check all, report all failures at once
    await expect.soft(page.getByRole('heading')).toHaveText('Withdraw Funds');
    await expect.soft(withdrawPage.amountInput).toBeEmpty();
    await expect.soft(withdrawPage.amountInput).toHaveAttribute('placeholder', 'Enter amount');
    await expect.soft(withdrawPage.submitButton).toBeDisabled();
    await expect.soft(page.getByTestId('balance')).toBeVisible();
    await expect.soft(page.getByTestId('balance')).toHaveText(/\$[\d,]+\.\d{2}/);
  }
);
```
