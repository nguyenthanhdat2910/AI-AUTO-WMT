import { test as setup, expect } from '@playwright/test';
import { mkdir } from 'fs/promises';
import { BoLoginPage } from '../pages/BoLoginPage';
import { BoShellPage } from '../pages/BoShellPage';
import { boEnv } from '../utils/env';

const authFile = '.playwright/.auth/bo-user.json';

setup('authenticate BO admin', async ({ page }) => {
  const loginPage = new BoLoginPage(page);

  await loginPage.goto(boEnv.url());
  await loginPage.login(boEnv.user(), boEnv.pass());
  await expect(page.getByRole('heading', { name: /login/i })).toBeHidden();
  await new BoShellPage(page).ensureGamificationApplication();

  await mkdir('.playwright/.auth', { recursive: true });
  await page.context().storageState({ path: authFile });
});
