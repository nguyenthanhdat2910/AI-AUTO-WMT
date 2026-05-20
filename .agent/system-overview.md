# 🗺️ SYSTEM MAP — WeMasterTrade (WMT)

> **Purpose:** Agent context — understand system structure & impact scope before writing test cases.
> **Rule:** When a user story touches a module below, check its dependencies for regression impact.

---

## 1. MODULE MAP — Client Site (FO)

| Module                                | Key Actions                                                                                                          | Risk Level  |
| :------------------------------------ | :------------------------------------------------------------------------------------------------------------------- | :---------- |
| **Authentication**              | Register, Login, Logout, OAuth (Google/Facebook/Apple), KYC                                                          | 🔴 Critical |
| **Package Purchase (Checkout)** | Browse packages, apply discount, select payment method, pay                                                          | 🔴 Critical |
| **Trading Account**             | View account status, stats, equity, daily/total loss progress                                                        | 🔴 Critical |
| **Wallet**                      | Manage balance (Withdrawable/Bonus), add/remove payment methods, withdraw funds, view transaction & withdraw history | 🔴 Critical |
| **WeTrader**                    | View open/closed trades, trading history, P/L charts                                                                 | 🟠 High     |
| **Withdrawal**                  | *(Trading account profit withdrawal — separate from Wallet)* Request, view history, check conditions              | 🟠 High     |
| **Bring a Friend (BAF)**        | Join program, invite friends, track referrals, withdraw bonus                                                        | 🟠 High     |
| **Academy**                     | View courses, lessons (read-only content)                                                                            | 🟡 Medium   |
| **Certificates**                | View/download earned certificates                                                                                    | 🟡 Medium   |
| **Leaderboard**                 | View ranking by profitability                                                                                        | 🟡 Medium   |
| **My Profile**                  | Update personal info, KYC documents, referral code                                                                   | 🟡 Medium   |
| **Notifications**               | In-app + email notifications for account events                                                                      | 🟡 Medium   |

---

## 2. MODULE MAP — Back Office (BO)

| System                           | Key Actions                                                                          | Used By |
| :------------------------------- | :----------------------------------------------------------------------------------- | :------ |
| **BO PHP** (current admin) | Config packages, discounts, payment methods, users, countries, announcements         | Admin   |
| **BO Trading Service**     | Manage trading accounts, change status, general config (Start time, loss thresholds) | Admin   |
| **BO ** New                     | Future replacement of BO PHP — in development                                       | Admin   |

---

## 3. 🔗 INTEGRATION IMPACT MAP

> When testing a feature that touches integration X → regression scope must include all affected areas.

| Integration                                                              | Connected To                                                           | Impact if Down/Changed                                       |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------- | :----------------------------------------------------------- |
| **MetaTrader 5 (MT5)**                                             | Trading Account creation, WeTrader data, account status                | Trading Account, WeTrader, Withdrawal conditions all break   |
| **Trading Service (TS)**                                           | All trading data, account status transitions, checkout condition check | WeTrader, Withdrawal, Checkout, BO Trading Service all break |
| **HubSpot**                                                        | Customer sync, Salesman role, invite flow                              | Salesman login, BAF invite email, CRM sync                   |
| **Sumsub**                                                         | Auto KYC (non-VN/MY/IN users)                                          | KYC verification flow for international users                |
| **DocuSeal**                                                       | E-contract signing                                                     | Trading account activation after purchase                    |
| **Stripe / PayPal**                                                | Payment processing                                                     | Checkout — if gateway fails, purchase blocked               |
| **Crypto Chill / Vietlocal / Zenpay / H2helppay / Exxogate**       | Alternative payment methods                                            | Checkout — affects specific payment methods only            |
| **Bank Transfer / PayPal / Crypto (USDT/USDC) / Volet / Interact** | Wallet withdrawal methods                                              | Wallet Withdrawal flow; country restriction config in BO     |

---

## 4. 👤 USER ROLES SUMMARY

| Role               | Portal                                | Key Difference                                            |
| :----------------- | :------------------------------------ | :-------------------------------------------------------- |
| **Customer** | Client Site                           | Standard user — buy, trade, withdraw                     |
| **Salesman** | Client Site + Sales view              | Can select customer on login; requires HubSpot invitation |
| **Admin**    | BO PHP / BO Trading Service / BO Odoo | Full system config & management                           |

**KYC method by region:**

- `VN, Malaysia, India` → Manual KYC (user uploads)
- `All other countries` → Auto KYC via Sumsub

---

## 5. 🧪 TEST ENVIRONMENTS

| Env             | Purpose                                                        |
| :-------------- | :------------------------------------------------------------- |
| Staging 1, 3, 4 | Feature testing                                                |
| UAT             | Pre-production validation                                      |
| MT5 Test Server | `136.244.68.219:443` (general) / `136.244.98.85:443` (WMT) |

---

## 6. ⚡ HIGH-IMPACT REGRESSION TRIGGERS

> When any of these change → always expand regression scope significantly.

| Change                                                          | Regression Must Cover                                                                             |
| :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| Trading Service config (Start time, loss %)                     | Account status, WeTrader display, Withdrawal conditions                                           |
| Checkout / Payment method change                                | All payment gateways, discount logic, account activation via DocuSeal                             |
| KYC flow change                                                 | Registration, My Profile, account activation, Withdrawal eligibility                              |
| Account status logic (Active/No Trading/Terminated)             | WeTrader, Withdrawal, Checkout (condition check), BO Trading Service                              |
| MT5 integration change                                          | Trading Account creation, trade history, P/L calculations                                         |
| Notification/Email templates                                    | All account lifecycle events (purchase, status change, withdrawal)                                |
| BAF config change (BO PHP)                                      | BAF Dashboard, referral code, bonus calculation, invite email                                     |
| Wallet config change (Min/Max amount, Fee, Country restriction) | Withdrawal eligibility, payment method visibility, fee calculation on all Wallet withdrawal flows |

---

## 7. 📦 ACCOUNT TYPE QUICK REFERENCE

| Type                | Phases                                     | Key Difference                                                 |
| :------------------ | :----------------------------------------- | :------------------------------------------------------------- |
| **Challenge** | Phase 1 → Phase 2 → Funded → Withdrawal | Must pass profit targets per phase; breach = Terminated        |
| **Instant**   | Active → trade directly                   | Daily loss hit counter (max 3); more flexible recovery options |

---

## 8. 💰 WALLET MODULE — Structure & Impact

> **Pre-requisite:** KYC must be **Verified** before user can access Wallet detail. Unverified users see a locked screen.

### 8.1 Balance Structure

| Balance Type                   | Can Purchase Package? | Can Withdraw?        | Source                                           |
| :----------------------------- | :-------------------- | :------------------- | :----------------------------------------------- |
| **Withdrawable Balance** | ✅ Yes                | ✅ Yes (only if > 0) | Trader profit, Commission, BAF bonus, Tournament |
| **Bonus Balance**        | ✅ Yes                | ❌ No                | Promotions, bonuses                              |
| **Total Balance**        | —                    | —                   | Withdrawable + Bonus                             |

### 8.2 Payment Methods

| Rule                           | Detail                                                                                                                                    |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **Max methods per user** | 5                                                                                                                                         |
| **Supported types**      | Bank Transfer, PayPal, Crypto (USDT/USDC — ERC20/TRC20/BEP20), Volet, Interact e-Transfer                                                |
| **2FA required**         | All Add / Delete / Withdraw actions require TOTP authentication                                                                           |
| **Country restriction**  | Admin configures allowed countries per method in BO → unavailable methods shown as greyed-out with label*"This payment not available"* |

### 8.3 Withdrawal Flow

```
[FO] User clicks Withdraw
        → Select Payment Method (country-filtered)
        → Enter Amount (validate Min–Max from BO config)
        → System calculates Processing Fee (fixed or %)
        → Check: Incomplete Quests? → Block with popup warning
        → On success: Withdrawable Balance → Pending Balance

[BO] Admin sees request as Pending
        → Reject: must enter reason → funds returned to Withdrawable Balance
        → Approve → transfer funds externally
        → Complete: must upload evidence file (< 5MB) → user can view file on FO
```

**Withdraw request statuses:** `Pending` → `Approved` → `Completed` | `Rejected`

### 8.4 Transaction History — 6 Transaction Types

| Type                     | Direction |
| :----------------------- | :-------- |
| Purchase (buy package)   | Out       |
| Trader profit withdrawal | In        |
| Commission (Affiliate)   | In        |
| Wallet Withdrawal        | Out       |
| Bring a Friend bonus     | In        |
| Tournament reward        | In        |

### 8.5 BO Wallet Configuration — Impact on FO

| Config                                | FO Impact                                                  |
| :------------------------------------ | :--------------------------------------------------------- |
| Min / Max Amount per method           | Validates user's entered withdrawal amount                 |
| Processing Fee Type (fixed\| percent) | Changes net amount received shown to user                  |
| Allowed Countries per method          | Controls which methods are active/greyed-out for each user |

### 8.6 Wallet Regression Trigger Map

| What changes                                | Must re-test                                                      |
| :------------------------------------------ | :---------------------------------------------------------------- |
| BO Wallet config (amounts, fees, countries) | Payment method visibility, fee display, amount validation         |
| KYC flow                                    | Wallet access gate (locked screen logic)                          |
| 2FA / TOTP                                  | Add/Delete payment method, Withdraw action                        |
| Quest system                                | Withdrawal blocker popup on Wallet                                |
| Trading profit withdrawal (separate module) | Confirm Wallet balance is updated correctly after profit credited |

---

## 9. 🤝 BRING A FRIEND (BAF) MODULE — Structure & Impact

> **Overview:** Referral marketing program. Referrer invites friends (Referral) → both receive rewards (Discount Code + Cash Bonus).
> **Key cross-module dependency:** BAF Bonus approved → credited to **Wallet Withdrawable Balance**.

### 9.1 Roles

| Role               | Definition                                                         |
| :----------------- | :----------------------------------------------------------------- |
| **Referrer** | Existing WMT user who invites friends via their referral code/link |
| **Referral** | New user who registers using a referral code                       |

### 9.2 Join & Register Flow

```
[Referrer] Click "Join Now" on BAF Dashboard
        → BAF account created → Referral Code assigned (format: BF + 6 digits, e.g. BF000001)
        → Referral Link generated

[Referral] Register via Email form OR Social Login (Google/Facebook/Apple)
        → Enter referral code (6 or 8 characters) → account linked to Referrer
        → Tracking record created for Referrer (Status: Registered)
```

### 9.3 Reward Triggers

| Reward                        | Recipient | Trigger Event                                                                     |
| :---------------------------- | :-------- | :-------------------------------------------------------------------------------- |
| **Discount Code**       | Referral  | KYC status →**Verified**                                                   |
| **Discount Code**       | Referrer  | Referral completes**first paid transaction**                                |
| **Cash Bonus Stage 1**  | Referrer  | Referral's total purchase reaches**Stage 1 Target Amount** AND KYC=Verified |
| **Cash Bonus Stage 2**  | Referrer  | Referral's total purchase reaches**Stage 2 Target Amount** AND KYC=Verified |
| **Both stages at once** | Referrer  | Referral's first purchase exceeds Stage 2 directly                                |

> **Max Referrals limit:** Admin configures max number of rewarded referrals per Referrer. Beyond limit → status = `Exceeded Limit`, no bonus generated.

### 9.4 Referral Tracking Statuses (on BAF Dashboard)

| Status                   | Meaning                                                  |
| :----------------------- | :------------------------------------------------------- |
| **Registered**     | Referral signed up via referral code                     |
| **In Progress**    | At least 1 condition met (KYC Verified OR purchase made) |
| **Completed**      | All conditions met; Referrer received full bonus         |
| **Exceeded Limit** | Referral valid but beyond Referrer's max rewarded count  |

### 9.5 BAF Bonus Withdrawal Flow

```
[FO] Referrer clicks Withdraw (KYC=Verified required)
        → Enter amount (within Min/Max config)
        → Request created → Status: Pending (SLA: 48–72 working hours)

[BO] Admin reviews request
        → Reject: enter reason → bonus restored to Referrer's BAF balance
        → Approve → BAF bonus credited to user's Wallet Withdrawable Balance
                  → User can then withdraw from Wallet to bank
```

### 9.6 BO Admin Scope

| BO Section                    | Actions                                                                                     |
| :---------------------------- | :------------------------------------------------------------------------------------------ |
| **BAF Configuration**   | Set Stage 1/2 Target Amount, Gift Amount, Max Referrals, Discount %, code validity duration |
| **Withdraw Management** | View Pending requests; Approve / Reject BAF bonus withdrawals                               |
| **Referrer Management** | View per-Referrer stats, earned bonus, referral list                                        |
| **Bonus Management**    | View all bonus records issued by the system                                                 |

### 9.7 BAF Regression Trigger Map

| What changes                                            | Must re-test                                                                      |
| :------------------------------------------------------ | :-------------------------------------------------------------------------------- |
| BAF config (Stage amounts, Gift amounts, Max Referrals) | Bonus calculation, tracking status transitions, Total Gift Amount on intro screen |
| Discount code config (%, duration)                      | Discount code issued to Referrer & Referral after trigger events                  |
| KYC flow                                                | Discount code trigger for Referral; withdrawal eligibility                        |
| Wallet module                                           | BAF bonus approval → Wallet Withdrawable Balance update                          |
| Registration flow                                       | Referral code linkage at signup (email & social login)                            |
| Payment/Checkout                                        | Referral's first purchase trigger for Referrer discount code                      |

---

## 10. 💸 PROFIT REQUEST MODULE — Structure & Impact

> **Overview:** Allows users to withdraw trading profit from a virtual trading account (Instant or Challenge Funded) into their Wallet Withdrawable Balance for real bank withdrawal.
> **Key cross-module dependencies:** Trading Account → Profit Request → Wallet → Withdrawal

### 10.1 Applicable Account Types

| Account Type        | Eligible When             |
| :------------------ | :------------------------ |
| **Instant**   | Status =`Full Trading`  |
| **Challenge** | Phase =`Funded Account` |

### 10.2 Pre-conditions Checklist (all must pass before Submit)

| # | Condition                                                                    | Notes      |
| :- | :--------------------------------------------------------------------------- | :--------- |
| 1 | KYC =**Verified**                                                      | Hard block |
| 2 | Trading account age ≥**30 days** (configurable in BO)                 | Hard block |
| 3 | Account status =**Full Trading** / **Funded**                    | Hard block |
| 4 | Account Profit Ratio ≥**Minimum Profit Target**                       | Hard block |
| 5 | Profit Consistency within allowed range (if configured)                      | Hard block |
| 6 | **All open positions closed + pending orders cancelled**               | Hard block |
| 7 | No incomplete Quests (status: New / Reviewing / Rejected) from prior request | Hard block |

### 10.3 Profit Request Flow

```
[FO — User]
  Submit request (2FA OTP required)
        → Trading account locked (inactive / EA disabled) during review

  Admin sends Net Profit proposal
        → User sees "Please Confirm" button on FO
        → Approve → Status: Awaiting Review
        → Reject  → Status: Rejected; trading account reactivated immediately

  (If Quests required)
        → User completes Quests (share Facebook/Discord, Trustpilot review)
        → Upload evidence photo → Quest Submission
        → On Quest completion → Profit released

[BO — Admin]
  Risk Management review (fraud/risk checks):
    • Scalping (< 120s / 180s hold time)
    • Hedging (two-side positions)
    • Cross-account hedging (same IP/device across accounts)
    • Shared IP / Shared CID detection

  Daily Loss Violation Penalty (if applicable):
    • Violation at 2% daily loss threshold → Profit Share reduced to 20%
    • Violation at 1% daily loss threshold → Profit Share reduced to 50%

  Admin enters Profit Shared Rate → system checks threshold:
    • Rate < Auto-Approval Threshold (default 60%) → Must send to user for confirmation
    • Rate ≥ Threshold → Admin can skip user confirmation → auto push to Approved
```

### 10.4 Post-Approval System Actions (triggered automatically)

| Action                                 | Detail                                                                                |
| :------------------------------------- | :------------------------------------------------------------------------------------ |
| **Credit Wallet**                | Net Profit → Wallet Withdrawable Balance (user can then withdraw to bank)            |
| **Reset Trading Account**        | MT5 wipes all trade history (Deals/Orders); restores Initial Balance only             |
| **Reset Violation Counters**     | Daily Loss Violation count + Daily Loss Max Hits + highest daily profit → reset to 0 |
| **Reactivate Trading**           | Account restored to Full Trading + EA bot enabled                                     |
| **Generate Certificate**         | Certificate of Profit Split auto-created for trader                                   |
| **Create Quest (if configured)** | If "Require submit quest" checked → Quest flow triggered on FO                       |

### 10.5 Profit Request Statuses

| Status              | Meaning                                        |
| :------------------ | :--------------------------------------------- |
| `Pending`         | Submitted; awaiting Admin review               |
| `Awaiting Review` | User confirmed Net Profit proposal             |
| `Approved`        | Admin approved; post-approval actions executed |
| `Rejected`        | User or Admin rejected; account reactivated    |

### 10.6 Profit Request Regression Trigger Map

| What changes                                                 | Must re-test                                                        |
| :----------------------------------------------------------- | :------------------------------------------------------------------ |
| Pre-condition config (min days, profit target, PC threshold) | All 7 pre-condition checks on FO submit                             |
| Auto-Approval Threshold config                               | Whether user confirmation step is shown or skipped                  |
| Quest config ("Require submit quest")                        | Quest creation flow on FO post-approval                             |
| Wallet module                                                | Net Profit credited to Wallet Withdrawable Balance after approval   |
| KYC flow                                                     | Profit Request gate (pre-condition #1)                              |
| Daily Loss / Max Hits counters                               | Reset correctly after approval (affects next trading cycle)         |
| MT5 integration                                              | Account reset (history wipe, balance restore), reactivation with EA |
| Trading account status                                       | Full Trading/Funded eligibility check; lock/unlock during review    |

---

## 11. 🤝 AFFILIATE MODULE — Structure & Impact

> **Overview:** Affiliate Partner (AP) / Salesman program — partners earn commission when referred customers purchase trading packages.
> **Key cross-module dependencies:** Registration → AP Code linkage → Checkout (paid) → Commission → Wallet Withdrawable Balance

### 11.1 AP Referral Code (AP Code)

| Rule                      | Detail                                                                                          |
| :------------------------ | :---------------------------------------------------------------------------------------------- |
| **Format**          | Numeric only, max 6 characters                                                                  |
| **Invalid**         | Contains letters OR > 6 characters → validation error                                          |
| **At registration** | Customer enters AP Code → validated → saved permanently to My Profile `Referral Code` field |
| **BAF interaction** | If AP Code entered → BAF referral code fields are**hidden** on registration form         |
| **Notification**    | On successful referral signup → email + push notification sent to AP account                   |

### 11.2 Salesman / AP Role Activation

> Requires cross-system setup between BO WCT and HubSpot CRM — both must be configured.

| Step | System           | Action Required                                                                                  |
| :--- | :--------------- | :----------------------------------------------------------------------------------------------- |
| 1    | BO WCT (Admin)   | Enable**"Mark as salesman"** flag on user account + enter valid **HubSpot ID**       |
| 2    | HubSpot CRM      | Send**Salesman invitation** to user                                                        |
| 3    | Client Site (FO) | User can now select**"Salesman"** role at login → unlocks AP dashboard & management menus |

### 11.3 Commission Trigger Flow

```
[Trigger] Customer (referred by AP) completes a package purchase
          → Transaction status = Paid

[System checks]
  → Is this customer directly referred by this AP? YES
  → Check for AP Referral code on transaction
  → If AP code found → BLOCK Hubspot internal Sales commission
  → Allocate commission by scaling plan to 3 levels:

        AP (direct referrer)           ← commission %
        AP Manager (if exists)         ← commission %
        Sale Manager (if exists)       ← commission %
```

> **Deduplication rule:** If transaction contains AP Referral code → internal HubSpot Sales staff do NOT receive commission. AP gets priority.

### 11.4 Commission in Wallet

| Field                            | Detail                                                                               |
| :------------------------------- | :----------------------------------------------------------------------------------- |
| **Credited to**            | Wallet →**Withdrawable Balance**                                              |
| **Transaction type label** | `Commission Affiliate`                                                             |
| **Transaction ID format**  | `CW` + 7 digits (e.g., `CW0000000`)                                              |
| **Description**            | `"Commission approved"`                                                            |
| **Withdrawal**             | AP can withdraw via Wallet withdrawal flow (Bank Transfer, Crypto, PayPal, Volet...) |

### 11.5 Affiliate Regression Trigger Map

| What changes                             | Must re-test                                                               |
| :--------------------------------------- | :------------------------------------------------------------------------- |
| Registration flow (email / social login) | AP Code validation, BAF field hide/show, Referral Code saved to My Profile |
| Checkout / Payment flow                  | Commission trigger on Transaction = Paid                                   |
| Commission scaling plan config           | 3-tier commission allocation (AP / AP Manager / Sale Manager)              |
| HubSpot integration                      | Salesman invitation flow; internal Sales deduplication logic               |
| Wallet module                            | Commission credited to Withdrawable Balance; transaction history label     |
| BO "Mark as salesman" + HubSpot ID       | Salesman role availability at login                                        |

---

## 12. 💳 PAYMENT METHOD MODULE — Structure & Impact

> **Overview:** Two distinct business domains — (A) Withdrawal Methods (user's payout accounts) and (B) Checkout Methods (purchase gateways). Both are controlled by BO country-based configuration.
> **Key cross-module dependencies:** BO Config → Checkout display, Wallet withdrawal eligibility, country restriction enforcement on FO

### 12.1 Domain A — Withdrawal Methods (FO — User manages payout accounts)

**Pre-condition:** KYC must be **Verified** (`Unverified` / `Verifying` / `Rejected` → blocked)

| Rule                           | Detail                                                                                                                                       |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| **Max methods per user** | 5                                                                                                                                            |
| **2FA required**         | All Add / Delete actions require TOTP OTP authentication                                                                                     |
| **Country restriction**  | Method unavailable for user's country → card shown greyed-out + "This payment not available"; can only Delete, cannot select for withdrawal |

**Supported withdrawal method types:**

| Method                        | Key Validation Rules                                                                                                        |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **Bank Transfer**       | Bank Name ≤ 50 chars; Account Number ≤ 20 chars; Swift Code ≤ 20 chars; Address + City + Country + Postcode all required |
| **PayPal**              | Must be valid email format                                                                                                  |
| **Crypto (USDT/USDC)**  | Networks: ERC20 / TRC20 / BEP20; Wallet address ≥ 10 characters                                                            |
| **Volet**               | Must be valid email format                                                                                                  |
| **Rise**                | —                                                                                                                          |
| **Interact e-Transfer** | Canada only                                                                                                                 |

---

### 12.2 Domain B — Checkout Payment Methods (FO — displayed at purchase)

**Default gateways (all countries):**

| Gateway             | Provider    |
| :------------------ | :---------- |
| Credit / Debit Card | Stripe      |
| Crypto Currency     | CryptoChill |
| PayPal              | PayPal      |
| Bank Transfer       | —          |

**Local Payment routing (by Resident Country selected at Checkout Step 1):**

| Country  | Local Gateway shown            |
| :------- | :----------------------------- |
| Vietnam  | VietLocal Pay                  |
| Malaysia | ZP (Zenpay)                    |
| Canada   | Square                         |
| Others   | Configured per BO gateway list |

---

### 12.3 BO Configuration — Checkout Gateways

**Integrated gateway list (Admin manages):** Stripe, CryptoChill, Help2Pay (H2P), Bitolo, Exxogate, Monetix, Unlimit, United Pay, Starpago, ZenPay, Square, VietLocal... *(expandable)*

**Country Access Control (3 modes per gateway):**

| Mode                                   | Behavior                                             |
| :------------------------------------- | :--------------------------------------------------- |
| **All Countries**                | Gateway shown to all users                           |
| **All Countries, except [list]** | Blacklist — shown to all except specified countries |
| **No Country, except [list]**    | Whitelist — only shown to specified countries       |

**Other BO options per gateway:**

| Config                                  | Detail                                                                                                              |
| :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| **Logo**                          | Upload custom logo (< 2MB); shown on Checkout FO                                                                    |
| **Display Name**                  | Override gateway name shown to user on Checkout                                                                     |
| **Deposit Options (sub-options)** | Inside large gateways (e.g., H2P, Starpago): Admin can toggle ON/OFF individual local banks, QR codes, or e-Wallets |

---

### 12.4 BO Configuration — Withdrawal Settings

| Config                                     | Detail                                                                    |
| :----------------------------------------- | :------------------------------------------------------------------------ |
| **Min / Max Amount**                 | Per method (Bank, Crypto, PayPal, Volet); default range:`$50 – $5,000` |
| **Processing Fee — Certain Amount** | Deduct fixed amount (e.g.,`$20`) from withdrawal                        |
| **Processing Fee — Ratio**          | Deduct percentage (e.g.,`10%`) from withdrawal amount                   |

---

### 12.5 Payment Method Regression Trigger Map

| What changes                                          | Must re-test                                                                |
| :---------------------------------------------------- | :-------------------------------------------------------------------------- |
| BO country access control (gateway allow/block list)  | Checkout gateway visibility per country; Withdrawal method greyed-out logic |
| BO Deposit Options (sub-option ON/OFF inside gateway) | Sub-options shown/hidden inside gateway on Checkout FO                      |
| BO gateway logo / display name                        | Logo and name displayed correctly on Checkout FO                            |
| BO withdrawal Min/Max config                          | Amount validation on Wallet withdraw form                                   |
| BO Processing Fee config (fixed / ratio)              | Net amount shown to user on withdrawal confirmation                         |
| KYC flow                                              | Payment Method tab access gate (Withdrawal Methods)                         |
| 2FA / TOTP                                            | Add/Delete withdrawal method actions                                        |
| Checkout flow (country selection step)                | Local Payment gateway routing by Resident Country                           |

---

## 13. 🔀 MATCH TRADER (MTR) — Structure & Impact

> **Overview:** Secondary trading platform alongside MT5. Default platform for USA/Canada users. MTR has distinct BOT processing logic that differs from MT5 in critical ways.
> **Web Trading URL:** `https://mtr.wemastertrade.com/dashboard`

### 13.1 Country Restrictions — MTR vs MT5

| Country           | MT5                | Match Trader (MTR)        |
| :---------------- | :----------------- | :------------------------ |
| **USA**     | ❌ Cannot purchase | ✅ Default / Only option  |
| **Canada**  | ❌ Cannot purchase | ✅ Default / Only option  |
| **Vietnam** | ✅ Supported       | ❌ Not supported          |
| **Others**  | ✅ Supported       | ✅ Supported (if enabled) |

### 13.2 Account Creation

- If user buys MTR package and has **no Master Account** → system auto-creates Master Account using WMT registered email
- MTR accounts appear in **WeTrader tab** (FO): Login info, Server, Balance chart, Statistics, Trading Objectives

### 13.3 Instant Package (MTR)

| Step                           | Detail                                                                                                   |
| :----------------------------- | :------------------------------------------------------------------------------------------------------- |
| **Balance input**        | Must be a**multiple of 1,000**                                                                     |
| **Account types**        | Forex, Stock                                                                                             |
| **Add-ons**              | No-Swap, Customize Daily Loss, Customize Max Total Loss                                                  |
| **Post-purchase status** | Account created →`No Trading` (locked)                                                                |
| **Activation**           | User must sign**E-Contract** → when contract = `Signed` → account switches to `Full Trading` |

### 13.4 Challenge Package (MTR)

**3-Phase structure:** `Phase 1` → `Phase 2` → `Funded Account`

| Phase Transition                           | User Action                                                       | Admin Action                                                |
| :----------------------------------------- | :---------------------------------------------------------------- | :---------------------------------------------------------- |
| **Phase 1 → Phase 2**               | All Phase 1 objectives =`Passed` → click **"Start Now"** | Not required (automatic)                                    |
| **Phase 2 → Funded**                | Click**"Request Now"** → status = `Pending`              | Admin must**Approve** → "Start Now" appears for user |
| **Funded rejected + refund enabled** | Click**"Refund Now"**                                       | Admin enables refund option                                 |

**Fee refund rule:** Registration fee refunded if user passes **Phase 2** or **Funded Account**.

**Add-ons:** Expert Advisor (EA), No-Swap

---

### 13.5 ⚠️ Critical BOT Differences — MTR vs MT5

> These are the highest-risk areas for regression testing when MTR is involved.

#### Reset Account Logic

| Platform               | Reset Method                                                                                       |
| :--------------------- | :------------------------------------------------------------------------------------------------- |
| **MT5**          | Wipe all Deals/Orders history → perform virtual Deposit/Withdrawal                                |
| **Match Trader** | Do NOT delete Deals on MTR server →**balance equalization by difference:**                  |
|                        | •`Current Balance > Initial Balance` → MTR creates a **Withdrawal** for the difference   |
|                        | •`Current Balance < Initial Balance` → MTR creates a **Deposit** to cover the difference |
|                        | → THEN Trading Service BOT deletes deals/positions in its**internal DB only**               |

#### Login Time Limit (Challenge only)

| Platform               | Inactivity Measurement                                                         |
| :--------------------- | :----------------------------------------------------------------------------- |
| **MT5**          | Based on**Last Access Date** (last login date)                           |
| **Match Trader** | Based on**Last Activity** (last actual action: open or close a position) |

---

### 13.6 MTR Regression Trigger Map

| What changes               | Must re-test                                                               |
| :------------------------- | :------------------------------------------------------------------------- |
| Country restriction config | MTR/MT5 platform availability on Checkout per country                      |
| E-Contract (DocuSeal)      | Post-purchase account activation (No Trading → Full Trading)              |
| Phase upgrade flow         | "Start Now" / "Request Now" / "Refund Now" button logic                    |
| BOT reset logic (MTR path) | Balance equalization (Deposit/Withdraw on MTR server); internal DB cleanup |
| Login Time Limit config    | MTR uses Last Activity (position open/close), not Last Access Date         |
| WeTrader tab               | MTR account stats, login info, Trading Objectives display                  |
| Master Account creation    | Auto-created on first MTR purchase if not exists                           |
