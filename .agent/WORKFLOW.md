# AI-AUTO-WMT Workflow

This repository is organized as a QA automation pipeline for WMT.

## Runtime Order

```text
00 Project Context
  -> 01 Requirement Analysis
  -> 02 Test Case Design
  -> 03 Playwright Project Bootstrap
  -> 04 Test Automation Implementation
  -> 05 Flaky Test Analysis and Fix
```

## 00 Project Context

Read these files before analysis, design, automation, or debug work:

- `.agent/system-overview.md`
- `.agent/general-rules.md`

These files define WMT modules, integration impact, regression triggers,
common UI rules, validation rules, format rules, search/filter behavior,
edit-column behavior, and export rules.

## Global File Approval Gate

Before creating or updating any repository file, including code, config,
Markdown, generated artifacts, or documentation, the agent must first present a
preview or file plan and wait for explicit user approval.

This applies to:

- code files such as `.ts`, `.js`, `.py`, and test/spec/page files
- Markdown files such as `.md`
- config files such as `package.json`, `playwright.config.ts`, and `tsconfig.json`
- analysis files in `qa-artifacts/`
- test case draft/export/import report files in `qa-artifacts/`
- debug reports in `qa-artifacts/`
- Playwright files under `tests/`
- bootstrap files and setup skeletons

Required approval keyword: `approved`.

If approval is missing, the agent must not create or update files. It should
return the proposed content or summarize the planned file changes for review
and wait for the user to reply `approved`.

## Playwright Report Rule

After running any local Playwright automation command, the agent must show the
HTML report immediately by running:

```bash
npm run report
```

If the environment blocks opening the report server or browser, the agent must
state that clearly and provide the same command for the user to run manually.

## 01 Requirement Analysis

Skill:

- `.agent/codex-skills/senior-test-analyst/SKILL.md`

Use when the user asks to analyze a User Story, Acceptance Criteria, or feature
spec before writing test cases.

Output:

- `qa-artifacts/[feature]_analysis.md`

## 02 Test Case Design

Skill:

- `.agent/codex-skills/senior-test-designer/SKILL.md`

Use when the user asks to write, generate, or design test cases.

Output:

- Draft review file: `qa-artifacts/[feature]_testcases_draft.md`
- Export CSV: `qa-artifacts/[feature]_testcases_qase.csv`
- Export XLSX: `qa-artifacts/[feature]_testcases_review.xlsx`
- QASE import report: `qa-artifacts/[feature]_qase_import_report.md`

QASE API import must only run when the user explicitly requests QASE import,
sync, publish, or API import.

## 03 Playwright Project Bootstrap

Skill:

- `.agent/codex-skills/playwright-project-bootstrap/SKILL.md`

Use before automation implementation when the source repository does not already
have a usable Playwright TypeScript setup.

Bootstrap checks:

- `package.json`
- `@playwright/test`
- `playwright.config.ts`
- `tests/` structure

If all required setup exists, do not create a new framework. Hand off directly
to `senior-test-automator`.

## 04 Test Automation Implementation

Skill:

- `.agent/codex-skills/senior-test-automator/SKILL.md`

Use to convert `AUTO` and `AUTO*` test cases into Playwright TypeScript code.

Output:

- `tests/pages/*.ts`
- `tests/specs/*.spec.ts`
- `tests/fixtures/*.fixture.ts`
- `tests/data/*`
- `tests/utils/*`

Rules:

- Use POM architecture.
- Do not put `expect()` in Page Classes.
- Do not use `page.waitForTimeout()`.
- Do not hardcode absolute URLs.
- Use env vars and relative paths with `baseURL`.

## 05 Flaky Test Analysis and Fix

Skill:

- `.agent/codex-skills/senior-flaky-analyzer/SKILL.md`

Use when Playwright tests fail locally or in CI.

Classification:

- Flaky Script
- Real Bug
- Env/Infra

Output:

- `qa-artifacts/[feature]_debug_report.md`

Fix limit:

- Maximum 3 fix-verify rounds before escalation.
