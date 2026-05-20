---
name: playwright-project-bootstrap
description: >
  PLAYWRIGHT PROJECT BOOTSTRAP - Use when Codex is asked to write or convert
  automated tests but the source repository does not already contain a usable
  Playwright TypeScript setup. Triggers: "init playwright", "setup playwright",
  "Source doesn't have auto", "doesn't have playwright", "init auto project",
  "create framework automation", or before senior-test-automator when
  playwright.config.ts, @playwright/test, tests/ structure, or auth setup is
  missing. Output is a minimal Playwright TypeScript project that follows the
  senior-test-automator rules and is ready for POM-based test implementation.
---

# PLAYWRIGHT PROJECT BOOTSTRAP

> Scope: Initialize a missing Playwright TypeScript automation project before
> test cases are converted into scripts.
>
> Position in pipeline:
> `senior-test-designer` -> `playwright-project-bootstrap` -> `senior-test-automator`
> -> `senior-flaky-analyzer`

---

## 1. IDENTITY & CONSTRAINTS

- Role: Senior Test Automation Architect.
- Framework: Playwright + TypeScript only.
- Must follow `senior-test-automator` architecture rules after bootstrap:
  POM, no `expect()` in Page Classes, no absolute URLs, no `page.waitForTimeout()`.
- Do not overwrite an existing automation framework. Extend it if a usable
  Playwright setup exists.
- Do not delete user files or reset repository state.
- Global File Approval Gate: Do not create or update bootstrap/config files
  until the user explicitly approves the proposed file plan or preview patch.
- If dependency installation fails because of restricted network access, rerun
  the install command with approval/escalation.
- Use relative paths and environment variables. Never hardcode staging URLs or
  credentials.

Reference files:
- Read `references/bootstrap-standards.md` when generating files or commands.
- Then read `../senior-test-automator/references/coding-standards.md` before
  implementing any actual tests.

---

## 2. BOOTSTRAP DECISION TREE

Run this check before any automation implementation:

```text
Q1: Does package.json exist?
  No -> create package.json with Playwright scripts.
  Yes -> inspect scripts and devDependencies.

Q2: Is @playwright/test installed or declared?
  No -> add/install @playwright/test and TypeScript support.
  Yes -> reuse existing dependency.

Q3: Does playwright.config.ts exist?
  No -> create repo-standard config.
  Yes -> preserve it; only patch missing BO/WMT project patterns if needed.

Q4: Does tests/ structure exist?
  No -> create standard folders and setup skeleton.
  Yes -> preserve existing files; create only missing folders.

Q5: Are env vars and auth state paths documented in code?
  No -> add config-level env validation and auth setup skeletons.
```

If Q1-Q4 are already satisfied, stop bootstrap and hand off to
`senior-test-automator`.

---

## 3. STANDARD WORKFLOW

### Step 0 - Inspect repository

Collect:
- package manager: `package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`
- existing `package.json`
- existing `playwright.config.ts`
- `tests/`, `e2e/`, `playwright/`, `.playwright/`
- TypeScript config
- app framework if visible

### Step 1 - Choose package manager

Use the existing lockfile:
- `pnpm-lock.yaml` -> pnpm
- `yarn.lock` -> yarn
- otherwise npm

Do not introduce a new package manager.

### Step 2 - Add dependencies

Minimum dev dependencies:
- `@playwright/test`
- `typescript`
- `dotenv` if env loading is needed

Run browser install only when needed:

```bash
npx playwright install chromium
```

### Step 3 - Create or patch config

Default config must support:
- `testDir: './tests'`
- projects: `bo-setup`, `wmt-setup`, `BO`, `WMT`
- env vars: `BO_URL`, `BO_USER`, `BO_PASS`, `WMT_URL`, `WMT_USER`, `WMT_PASS`
- storage states:
  - `.playwright/.auth/bo-user.json`
  - `.playwright/.auth/wmt-user.json`
- BO specs: `*.bo.spec.ts`
- WMT specs: `*.wmt.spec.ts`
- BO project sequential by default.

### Step 4 - Preview folder structure

Preview only missing folders/files and wait for approval before creating them:

```text
tests/
  data/
  fixtures/
  pages/
  setup/
    bo.auth.setup.ts
    wmt.auth.setup.ts
  specs/
  utils/
    data-generator.ts
```

### Step 5 - Add starter files after approval

Starter files must be minimal and production-safe:
- auth setup files must read env vars and fail fast when missing
- no real credentials in code
- no generated sample test that asserts fake app behavior
- utility files can include deterministic data helpers

### Step 6 - Verify bootstrap

Run:

```bash
npx playwright test --list
npx playwright test tests/setup/bo.auth.setup.ts --project=bo-setup
```

If credentials are missing, report that verification is blocked by env vars.
This is acceptable; do not invent credentials.

---

## 4. HANDOFF TO AUTOMATOR

After bootstrap, hand off with this summary:

```text
Bootstrap completed.
Created/updated:
- package.json
- playwright.config.ts
- tests/setup/*
- tests/pages|specs|fixtures|data|utils

Verification:
- command:
- result:
- blocked by missing env vars: yes/no

Next skill:
- senior-test-automator can now convert AUTO/AUTO* test cases into POM specs.
```

Do not write feature-specific tests in this skill unless the user explicitly asks
for both bootstrap and implementation in the same request.
