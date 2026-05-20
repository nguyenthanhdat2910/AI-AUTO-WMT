# Test Cases - Tournament Quest Edit
> **User Story:** US 7.13 - [Tournament quests] Edit a tournament quest
> **Generated:** 2026-05-20
> **Status:** DRAFT - Pending review

---

## 1: RISK & TRACEABILITY

| Req ID / AC | Business Flow | L x I | Risk Score | Priority | TC Coverage |
|:---|:---|:---|:---|:---|:---|
| AC 1 | Admin opens tournament quest detail and edits allowed fields | L2 x I2 | 4 | Medium | TQ_7.13_01, TQ_7.13_02 |
| AC 2 | Edit validation follows create tournament quest rules | L2 x I2 | 4 | Medium | TQ_7.13_03, TQ_7.13_04, TQ_7.13_05, TQ_7.13_06 |
| AC 3 | Admin saves updated tournament quest successfully | L2 x I2 | 4 | Medium | TQ_7.13_07 |
| AC 4 | System displays success toast after update | L2 x I1 | 2 | Low | TQ_7.13_08 |

---

## 2: DETAILED TEST CASES

### Tournament Quest / Edit

#### TQ_7.13_01 - Open tournament quest detail from list
- **Req Ref:** AC 1
- **Priority:** Medium | **Severity:** Major | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO
- **Pre-condition:** Admin is logged in. At least one tournament quest exists.
- **Test Data:** Existing tournament quest.
- **Steps:**
  1. Navigate to Quest - Tournament quests.
  2. Click Detail on an existing tournament quest.
- **Expected Result:**
  1. Tournament quest list is displayed.
  2. Edit tournament quest detail screen is displayed.

---

#### TQ_7.13_02 - Verify editable fields on detail screen
- **Req Ref:** AC 1
- **Priority:** Medium | **Severity:** Major | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO
- **Pre-condition:** Admin is on tournament quest detail screen.
- **Test Data:** Existing tournament quest.
- **Steps:**
  1. Observe the detail form.
- **Expected Result:**
  1. Form displays editable fields: Quest Title, Active, Platform, Tournament ID, Required upload image, Required enter link, Description, and Update button.

---

#### TQ_7.13_03 - Validate required Quest Title
- **Req Ref:** AC 2
- **Priority:** Medium | **Severity:** Major | **Behavior:** Negative | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO
- **Pre-condition:** Admin is on tournament quest detail screen.
- **Test Data:** Quest Title = blank.
- **Steps:**
  1. Clear Quest Title.
  2. Click Update.
- **Expected Result:**
  1. Quest Title is empty.
  2. Error is displayed for required Quest Title.

---

#### TQ_7.13_04 - Validate Quest Title max length
- **Req Ref:** AC 2
- **Priority:** Medium | **Severity:** Major | **Behavior:** Negative | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO
- **Pre-condition:** Admin is on tournament quest detail screen.
- **Test Data:** Quest Title = 201 characters.
- **Steps:**
  1. Enter 201 characters into Quest Title.
  2. Click Update.
- **Expected Result:**
  1. Quest Title accepts the input.
  2. Error is displayed: "Quest Title exceed 200 characters".

---

#### TQ_7.13_05 - Validate at least one evidence requirement is selected
- **Req Ref:** AC 2
- **Priority:** Medium | **Severity:** Major | **Behavior:** Negative | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO
- **Pre-condition:** Admin is on tournament quest detail screen.
- **Test Data:** Required upload image = unchecked, Required enter link = unchecked.
- **Steps:**
  1. Uncheck Required upload image.
  2. Uncheck Required enter link.
  3. Click Update.
- **Expected Result:**
  1. Required upload image is unchecked.
  2. Required enter link is unchecked.
  3. Error is displayed: "At least required image or required link checked".

---

#### TQ_7.13_06 - Validate required Tournament ID
- **Req Ref:** AC 2
- **Priority:** Medium | **Severity:** Major | **Behavior:** Negative | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO
- **Pre-condition:** Admin is on tournament quest detail screen.
- **Test Data:** Tournament ID = blank.
- **Steps:**
  1. Clear Tournament ID selection.
  2. Click Update.
- **Expected Result:**
  1. Tournament ID is empty.
  2. Required field error is displayed for Tournament ID.

---

#### TQ_7.13_07 - Update tournament quest successfully
- **Req Ref:** AC 3
- **Priority:** Medium | **Severity:** Major | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO*
- **Pre-condition:** Admin is on tournament quest detail screen. At least one Up-coming tournament exists.
- **Test Data:** Valid title, valid platform, valid tournament ID, valid description, at least one evidence requirement selected.
- **Steps:**
  1. Update Quest Title.
  2. Select Platform.
  3. Select an Up-coming Tournament ID.
  4. Update Description.
  5. Click Update.
- **Expected Result:**
  1. Quest Title is updated.
  2. Platform is selected.
  3. Tournament ID is selected in format "[Tournament ID] - [Tournament title]".
  4. Description is updated.
  5. System saves the tournament quest.

---

#### TQ_7.13_08 - Verify success toast after update
- **Req Ref:** AC 4
- **Priority:** Low | **Severity:** Normal | **Behavior:** Positive | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO
- **Pre-condition:** Admin has submitted a valid update.
- **Test Data:** Valid tournament quest update.
- **Steps:**
  1. Click Update with valid data.
- **Expected Result:**
  1. Toast message is displayed: "Update new tournament quest successfully".

---

## 3: CLARIFICATION QUESTIONS

| # | Question | AC Ref | Impact if Unresolved |
|:---|:---|:---|:---|
| 1 | Should the Edit screen auto-fill all current tournament quest data when opened? | AC 1 | Test coverage for existing value display may be incomplete. |
| 2 | AC says Active is "Checkbox" while Create uses "toggle". Which UI control is correct? | AC 1 | UI verification and automation locator strategy may differ. |
| 3 | What exact required-field message should be shown for blank Quest Title, blank Description, and blank Tournament ID? | AC 2 | Expected results cannot use exact literal text for these validations. |
| 4 | If the currently linked tournament is no longer Up-coming, should it still be displayed as the selected value in Edit mode? | AC 2 | Could block valid edits for existing records. |
| 5 | After successful update, should the admin remain on Edit screen or navigate elsewhere? | AC 3 | Navigation/assertion scope is unclear. |
