# BOOTSTRAP STANDARDS

## Package scripts

Use these scripts when creating a new `package.json` or patching missing scripts:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:bo": "playwright test --project=BO --workers=1",
    "test:wmt": "playwright test --project=WMT",
    "test:auth:bo": "playwright test tests/setup/bo.auth.setup.ts --project=bo-setup",
    "test:auth:wmt": "playwright test tests/setup/wmt.auth.setup.ts --project=wmt-setup",
    "test:ui": "playwright test --ui",
    "report": "playwright show-report"
  }
}
```

## Config template rules

`playwright.config.ts` must:
- import `defineConfig` and `devices` from `@playwright/test`
- optionally load `.env` via `dotenv/config`
- validate required env vars only inside auth setup or before URL use, not at module import when listing tests
- use `baseURL` from `BO_URL` and `WMT_URL`
- save traces on first retry
- save screenshots and videos on failure
- keep BO sequential with `fullyParallel: false`

## Auth setup rules

Auth setup files:
- must fail fast when required env vars are missing
- must use semantic locators where possible
- must save storage state to `.playwright/.auth/*.json`
- may include TODO comments for app-specific selectors if login UI is unknown
- must not hardcode credentials

## Starter utility

`tests/utils/data-generator.ts` may include:

```typescript
export function generateEmail(prefix: string): string {
  const timestamp = Date.now();
  const suffix = Math.random().toString(36).slice(2, 8);
  return `auto_${prefix}_${timestamp}_${suffix}@test.com`;
}
```

## Do not create

- Fake sample tests that pass without touching the app.
- API-only tests as the first output.
- Absolute URLs inside specs or page objects.
- `page.waitForTimeout()`.
- `expect()` in Page Classes.
