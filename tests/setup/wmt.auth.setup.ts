import { test as setup, expect, type Locator, type Page } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { wmtEnv } from '../utils/env';

const authFile = '.playwright/.auth/wmt-user.json';

async function typeControlledInput(page: Page, locator: Locator, value: string) {
  for (const inputValue of [value, `${value[0]}${value}`]) {
    await locator.click();
    await expect(locator).toBeFocused();
    await page.keyboard.press('Control+A');
    await page.keyboard.press('Backspace');
    await page.keyboard.type(inputValue, { delay: 30 });

    const currentValue = await locator.inputValue();
    if (currentValue === value) {
      return;
    }

    if (currentValue === inputValue && inputValue !== value) {
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Backspace');
      await page.keyboard.type(value, { delay: 30 });
      if ((await locator.inputValue()) === value) {
        return;
      }
    }
  }

  await locator.fill(value);
}

setup('authenticate WMT front office user', async ({ page }) => {
  await page.goto(wmtEnv.url());

  const emailInput = page
    .getByRole('textbox', { name: /email address/i })
    .or(page.getByLabel(/email/i))
    .or(page.getByPlaceholder(/email/i))
    .first();
  const passwordInput = page
    .getByRole('textbox', { name: /^password$/i })
    .or(page.getByLabel(/password/i))
    .or(page.getByPlaceholder(/password/i))
    .first();
  const submitButton = page.getByRole('button', { name: /log in|login|sign in/i }).first();

  await typeControlledInput(page, emailInput, wmtEnv.user());
  await emailInput.blur();
  await typeControlledInput(page, passwordInput, wmtEnv.pass());
  await passwordInput.blur();

  await expect(emailInput).toHaveValue(wmtEnv.user());
  await expect(passwordInput).toHaveValue(wmtEnv.pass());
  await expect(submitButton).toBeEnabled();
  await submitButton.click();

  await expect(page).not.toHaveURL(/\/login(?:\/)?$/i);
  await mkdir('.playwright/.auth', { recursive: true });
  await page.context().storageState({ path: authFile });
});
