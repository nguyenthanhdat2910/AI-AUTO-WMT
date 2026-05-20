# REPORTING FORMAT & ESCALATION GUIDE

## Đọc file này khi cần sinh debug report hoặc escalate sau 3 rounds.

---

## Report Template

File: `qa-artifacts/[feature]_debug_report.md`

```markdown
# Debug Report — [Feature / CI Run ID]
> **Date:** [Date]
> **Analyzed by:** Codex agent
> **Status:** RESOLVED | ESCALATED | BLOCKED

---

## Failure Classification Summary

| # | Test ID | Test Name | Classification | RCA Code | Fix Applied | Rounds | Status |
|:---|:---|:---|:---|:---|:---|:---|:---|
| 1 | WLT_5.1_01 | Verify withdrawal submit | Flaky Script | F5 | Replaced CSS with getByRole | 1 | ✅ Fixed |
| 2 | KYC_2.1_03 | Verify KYC rejection banner | Real Bug | — | None (bug reported) | — | 🐛 Bug |
| 3 | AUTH_1.1_01 | Verify login flow | Env/Infra | — | None (server down) | — | 🔧 Env |

---

## Evidence Collected

### Test: WLT_5.1_01
- **Error:** `Timeout waiting for selector '.css-xyz123'`
- **Screenshot:** `test-results/wallet-withdraw/test-failed-1.png`
- **Trace:** `test-results/wallet-withdraw/trace.zip`
- **Root cause:** CSS class dynamic, changes per build

### Test: KYC_2.1_03
- **Error:** `Expected "Rejected" but received "Pending"`
- **Screenshot:** Shows KYC status stuck at "Pending" — app bug
- **Trace:** N/A
- **Conclusion:** App behavior incorrect. Test flow verified correct.

---

## Fixes Applied

| File | Change | RCA Code | Commit |
|:---|:---|:---|:---|
| `tests/pages/WithdrawPage.ts` | `.css-xyz` → `getByRole('button', { name: 'Submit' })` | F5 | `fix(test): F5 replace CSS locator` |
| `tests/specs/wallet-withdraw.spec.ts` | Added `expect(spinner).toBeHidden()` before click | F1 | `fix(test): F1 wait for spinner` |

---

## Anti-Pattern Scan

| Anti-Pattern | Found? | File | Action |
|:---|:---|:---|:---|
| `waitForTimeout()` | No | — | — |
| `expect()` in Page Class | No | — | — |
| `{ force: true }` | No | — | — |
| Absolute URL | No | — | — |
| Shared mutable state | No | — | — |
| `console.log` / `page.pause()` | No | — | — |
| Hardcoded test data | No | — | — |

---

## Verification Results

| Test | Repeat 1 | Repeat 2 | Repeat 3 | Verdict |
|:---|:---|:---|:---|:---|
| WLT_5.1_01 | ✅ Pass | ✅ Pass | ✅ Pass | Stable |

---

## Remaining Issues

### Real Bugs (cần ticket)
- KYC_2.1_03: KYC status không update từ Pending → Rejected. Cần dev investigate.

### Env/Infra Blockers
- AUTH_1.1_01: Staging server down. Cần DevOps check.

### Not Verified
- [None]
```

---

## Escalation Guide — Khi nào và cách escalate

### Trigger: Sau 3 vòng fix-verify vẫn fail

Agent **PHẢI** sinh report đầy đủ ở trên và kèm phần sau:

```markdown
## Escalation

### Lý do escalate
- Test [ID] vẫn fail sau 3 vòng fix-verify.
- Fix đã thử: [liệt kê]
- Hypothesis hiện tại: [mô tả]

### Cần gì để unblock
- [ ] Dev support: [mô tả cụ thể — review component X, check API Y]
- [ ] Env fix: [mô tả — restart service, update config]
- [ ] Product confirm: [mô tả — behavior này đúng hay sai?]
- [ ] Test data: [mô tả — cần seed specific state]

### Evidence đính kèm
- Screenshot path: `test-results/...`
- Trace path: `test-results/...`
- Error log: [paste hoặc path]
```

### Commit message cho escalation
```
chore(test): escalate [test-id] after 3 fix rounds — see debug report
```
