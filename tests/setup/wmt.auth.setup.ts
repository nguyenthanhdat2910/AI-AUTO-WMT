import { test as setup, expect } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { wmtEnv } from '../utils/env';

const authFile = '.playwright/.auth/wmt-user.json';

setup('authenticate WMT front office user', async ({ page }) => {
  await page.goto(wmtEnv.url());

  const emailInput = page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i)).first();
  const passwordInput = page.getByLabel(/password/i).or(page.getByPlaceholder(/password/i)).first();
  const submitButton = page.getByRole('button', { name: /log in|login|sign in/i }).first();

  await emailInput.fill(wmtEnv.user());
  await passwordInput.fill(wmtEnv.pass());
  await submitButton.click();

  await expect(page).not.toHaveURL(/\/login(?:\/)?$/i);
  await mkdir('.playwright/.auth', { recursive: true });
  await page.context().storageState({ path: authFile });
});
