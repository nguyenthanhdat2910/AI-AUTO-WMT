import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';

function resolveEnvValue(value?: string): string | undefined {
  if (!value) {
    return undefined;
  }

  const match = value.match(/^\$\{([A-Z0-9_]+)\}$/);
  return match ? process.env[match[1]] : value;
}

const targetEnv = (process.env.TEST_ENV || process.env.ENV_NAME || 'STG3').toUpperCase();
const boUrl =
  resolveEnvValue(process.env[`${targetEnv}_BO_URL`]) ||
  resolveEnvValue(process.env.BO_URL) ||
  resolveEnvValue(process.env.BO_BASE_URL);
const wmtUrl =
  resolveEnvValue(process.env[`${targetEnv}_WMT_URL`]) ||
  resolveEnvValue(process.env.WMT_URL) ||
  resolveEnvValue(process.env.BASE_URL);

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
    {
      name: 'bo-setup',
      testMatch: /bo\.auth\.setup\.ts/,
      use: { baseURL: boUrl },
    },
    {
      name: 'wmt-setup',
      testMatch: /wmt\.auth\.setup\.ts/,
      use: { baseURL: wmtUrl },
    },
    {
      name: 'BO',
      fullyParallel: false,
      dependencies: ['bo-setup'],
      testMatch: /.*\.bo\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: boUrl,
        storageState: '.playwright/.auth/bo-user.json',
      },
    },
    {
      name: 'WMT',
      dependencies: ['wmt-setup'],
      testMatch: /.*\.wmt\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        baseURL: wmtUrl,
        storageState: '.playwright/.auth/wmt-user.json',
      },
    },
  ],
});
