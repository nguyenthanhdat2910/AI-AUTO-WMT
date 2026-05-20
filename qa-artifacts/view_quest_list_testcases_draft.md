# Test Cases - View Quest List
> **User Story:** View quest list
> **Generated:** 2026-05-20
> **Status:** DRAFT - Pending review

---

## 1: RISK & TRACEABILITY

| Req ID / AC | Business Flow | L x I | Risk Score | Priority | TC Coverage |
|:---|:---|:---|:---|:---|:---|
| REQ-VQL-01 | Display quests by created date oldest to newest | L2 x I2 | 4 | Medium | VQL_01, VQL_02 |
| REQ-VQL-02 | Use ACTIVE quest snapshot at enrollment time | L3 x I2 | 6 | Medium | VQL_03 |
| REQ-VQL-03, REQ-VQL-04 | Mission tab labels and tab switching | L2 x I2 | 4 | Medium | VQL_04, VQL_05 |
| REQ-VQL-05 | Hide Quests section when quest list is empty | L2 x I1 | 2 | Low | VQL_06 |
| REQ-VQL-06 | Display quest title and description | L1 x I1 | 1 | Low | VQL_07 |
| REQ-VQL-07, REQ-VQL-08 | Required image field visibility and validation | L2 x I2 | 4 | Medium | VQL_08, VQL_09 |
| REQ-VQL-09, REQ-VQL-10, REQ-VQL-11, REQ-VQL-12 | Image upload format, quantity, size, and removal | L2 x I2 | 4 | Medium | VQL_10, VQL_11, VQL_12, VQL_13 |
| REQ-VQL-13, REQ-VQL-14, REQ-VQL-15 | Link field visibility, validation, max length, and tooltip | L2 x I2 | 4 | Medium | VQL_14, VQL_15, VQL_16 |
| REQ-VQL-16 | Submit button enablement | L3 x I2 | 6 | Medium | VQL_17 |
| REQ-VQL-17 | Successful quest submission | L3 x I3 | 9 | High | VQL_18, VQL_19 |
| REQ-VQL-18 | Failed quest submission | L2 x I2 | 4 | Medium | VQL_20 |
| REQ-VQL-19, REQ-VQL-20 | Approved and rejected quest states | L3 x I2 | 6 | Medium | VQL_21, VQL_22 |
| REQ-VQL-21 | All quests approved final screen | L3 x I2 | 6 | Medium | Blocked by CQ-09 |

---

## 2: DETAILED TEST CASES

### Tournament / View Quest List

#### VQL_01 - Display quest tabs in created date order
- **Req Ref:** REQ-VQL-01
- **Priority:** Medium | **Severity:** Major | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO*
- **Pre-condition:** User is logged in and enrolled in a tournament. The tournament has 3 ACTIVE quests created in this order: Quest A, Quest B, Quest C.
- **Test Data:** Quest A created first, Quest B created second, Quest C created third.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the Tournament mission / Quests section.
- **Expected Result:**
  1. The Quests section is displayed.
  2. The quest tabs are displayed from left to right in created date order: Mission 1 for Quest A, Mission 2 for Quest B, Mission 3 for Quest C.

---

#### VQL_02 - Verify newest quest is displayed after older quests
- **Req Ref:** REQ-VQL-01
- **Priority:** Medium | **Severity:** Major | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO*
- **Pre-condition:** User is logged in and enrolled in a tournament. The tournament has multiple ACTIVE quests with different created dates.
- **Test Data:** Oldest quest, middle quest, newest quest.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the Tournament mission / Quests section.
  5. Observe the first and last visible quest tabs.
- **Expected Result:**
  1. The oldest quest is mapped to the first tab.
  2. The newest quest is mapped to the last tab.

---

#### VQL_03 - Keep enrollment-time quest snapshot after BO quest update
- **Req Ref:** REQ-VQL-02
- **Priority:** Medium | **Severity:** Major | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO*
- **Pre-condition:** User is logged in and enrolled in a tournament with ACTIVE quest snapshot already captured. Admin updates the tournament quest after user enrollment.
- **Test Data:** Existing ACTIVE quest at enrollment time; updated BO quest after enrollment.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page after the BO quest update.
  4. Open the Tournament mission / Quests section.
- **Expected Result:**
  1. The user's quest list remains based on the quests captured at enrollment time.
  2. New BO updates after enrollment are not reflected in the user's existing quest list.

---

#### VQL_04 - Display each quest as Mission N tab
- **Req Ref:** REQ-VQL-03
- **Priority:** Low | **Severity:** Normal | **Behavior:** Positive | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO
- **Pre-condition:** User is logged in and enrolled in a tournament with at least 3 quests.
- **Test Data:** 3 tournament quests.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the Tournament mission / Quests section.
  5. Observe the quest tab labels.
- **Expected Result:**
  1. Each quest is displayed as a separate tab.
  2. Tab labels are displayed as Mission 1, Mission 2, and Mission 3.
  3. Numbering starts from 1 and increases sequentially.

---

#### VQL_05 - Switch quest detail by clicking Mission tab
- **Req Ref:** REQ-VQL-04
- **Priority:** Medium | **Severity:** Major | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO
- **Pre-condition:** User is logged in and enrolled in a tournament with at least 2 quests.
- **Test Data:** Mission 1 title = "Share your result"; Mission 2 title = "Post your screenshot".
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the Tournament mission / Quests section.
  5. Click Mission 1.
  6. Click Mission 2.
- **Expected Result:**
  1. Mission 1 displays the quest detail for "Share your result".
  2. Mission 2 displays the quest detail for "Post your screenshot".

---

#### VQL_06 - Hide Quests section when tournament has no quest
- **Req Ref:** REQ-VQL-05
- **Priority:** Low | **Severity:** Normal | **Behavior:** Negative | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO*
- **Pre-condition:** User is logged in and enrolled in a tournament that has no quest in the quest list.
- **Test Data:** Tournament with zero quests.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the tournament detail page.
- **Expected Result:**
  1. The Tournament mission / Quests section is not displayed on FO.

---

#### VQL_07 - Display quest title and description
- **Req Ref:** REQ-VQL-06
- **Priority:** Low | **Severity:** Normal | **Behavior:** Positive | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO
- **Pre-condition:** User is logged in and enrolled in a tournament with at least one quest.
- **Test Data:** Quest title = "Upload trade screenshot"; Description = "Submit evidence for your tournament mission."
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the Tournament mission / Quests section.
  5. Open the quest tab.
- **Expected Result:**
  1. Quest title is displayed as "Upload trade screenshot".
  2. Quest description is displayed as "Submit evidence for your tournament mission."

---

#### VQL_08 - Display upload image field when Required upload image is enabled
- **Req Ref:** REQ-VQL-07
- **Priority:** Medium | **Severity:** Major | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO*
- **Pre-condition:** User is logged in and enrolled in a tournament. The quest has Required upload image checked in BO.
- **Test Data:** Quest with Required upload image = checked.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the quest detail.
- **Expected Result:**
  1. Upload your photo/screenshot field is displayed.

---

#### VQL_09 - Validate required image when submitting without evidence image
- **Req Ref:** REQ-VQL-08
- **Priority:** Medium | **Severity:** Major | **Behavior:** Negative | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO*
- **Pre-condition:** User is logged in and enrolled in a tournament. The quest requires image upload.
- **Test Data:** No uploaded image.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the quest detail.
  5. Leave Upload your photo/screenshot empty.
  6. Trigger submission validation.
- **Expected Result:**
  1. Error message is displayed: "Please upload your evidence."
  2. Quest request is not submitted.

---

#### VQL_10 - Reject unsupported evidence file format
- **Req Ref:** REQ-VQL-09
- **Priority:** Medium | **Severity:** Major | **Behavior:** Negative | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO
- **Pre-condition:** User is logged in and enrolled in a tournament. The quest requires image upload.
- **Test Data:** File = evidence.pdf.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the quest detail.
  5. Click Upload your photo/screenshot.
  6. Select evidence.pdf.
- **Expected Result:**
  1. The file is not accepted as evidence.
  2. Error message is displayed: "Invalid file format. Please upload a supported format, e.g., JPG, PNG, JPEG, HEIC, HEIF"

---

#### VQL_11 - Hide upload button after uploading exactly 5 images
- **Req Ref:** REQ-VQL-10
- **Priority:** Medium | **Severity:** Major | **Behavior:** Positive | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO
- **Pre-condition:** User is logged in and enrolled in a tournament. The quest requires image upload.
- **Test Data:** 5 valid image files under 5MB each.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the quest detail.
  5. Upload 5 valid image files.
- **Expected Result:**
  1. All 5 uploaded image file names are displayed.
  2. Upload your photo/screenshot button is hidden after the fifth image is uploaded.

---

#### VQL_12 - Show error when uploading more than 5 images
- **Req Ref:** REQ-VQL-10
- **Priority:** Medium | **Severity:** Major | **Behavior:** Negative | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO
- **Pre-condition:** User is logged in and enrolled in a tournament. The quest already has 5 uploaded images.
- **Test Data:** Additional valid image file under 5MB.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the quest detail.
  5. Attempt to upload one more valid image.
- **Expected Result:**
  1. Additional image is not accepted.
  2. Error message is displayed: "Exceeded the maximum quantities of images"

---

#### VQL_13 - Validate maximum upload file size per image
- **Req Ref:** REQ-VQL-11
- **Priority:** Medium | **Severity:** Major | **Behavior:** Negative | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO
- **Pre-condition:** User is logged in and enrolled in a tournament. The quest requires image upload.
- **Test Data:** Valid image file greater than 5MB.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the quest detail.
  5. Upload a valid image file greater than 5MB.
- **Expected Result:**
  1. The image is not accepted.
  2. Toast message is displayed: "Maximum upload file size 5MB"

---

#### VQL_14 - Remove uploaded evidence image
- **Req Ref:** REQ-VQL-12
- **Priority:** Low | **Severity:** Normal | **Behavior:** Destructive | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO
- **Pre-condition:** User is logged in and enrolled in a tournament. At least one evidence image is uploaded but not submitted.
- **Test Data:** Uploaded file = evidence.png.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the quest detail.
  5. Observe the uploaded file information.
  6. Click the remove icon for evidence.png.
- **Expected Result:**
  1. File name "evidence.png" is displayed before removal.
  2. evidence.png is removed from the upload list after clicking the remove icon.

---

#### VQL_15 - Display Link textbox when Required enter link is enabled
- **Req Ref:** REQ-VQL-13
- **Priority:** Medium | **Severity:** Major | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO*
- **Pre-condition:** User is logged in and enrolled in a tournament. The quest has Required enter link checked in BO.
- **Test Data:** Quest with Required enter link = checked.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the quest detail.
- **Expected Result:**
  1. Link textbox is displayed.
  2. Placeholder is displayed as "Enter your related link".

---

#### VQL_16 - Validate required Link textbox
- **Req Ref:** REQ-VQL-14
- **Priority:** Medium | **Severity:** Major | **Behavior:** Negative | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO*
- **Pre-condition:** User is logged in and enrolled in a tournament. The quest requires link evidence.
- **Test Data:** Link = blank.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the quest detail.
  5. Leave Link textbox empty.
  6. Trigger submission validation.
- **Expected Result:**
  1. Error message is displayed: "Please enter the URL for your proof or evidence."
  2. Quest request is not submitted.

---

#### VQL_17 - Validate Link max length and tooltip content
- **Req Ref:** REQ-VQL-15
- **Priority:** Low | **Severity:** Normal | **Behavior:** Negative | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO
- **Pre-condition:** User is logged in and enrolled in a tournament. The quest requires link evidence.
- **Test Data:** Link value = 1001 characters.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the quest detail.
  5. Enter 1001 characters into Link textbox.
  6. Click the Link tooltip icon.
- **Expected Result:**
  1. System does not allow the Link value to exceed 1000 characters.
  2. Error message is displayed: "You cannot enter link more than 1000 characters."
  3. Tooltip content is displayed: "This link will strengthen your evidence, making it more credible"

---

#### VQL_18 - Enable Submit only after all required evidence fields are filled
- **Req Ref:** REQ-VQL-16
- **Priority:** Medium | **Severity:** Major | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO*
- **Pre-condition:** User is logged in and enrolled in a tournament. The quest requires both image and link evidence.
- **Test Data:** Valid image under 5MB; Link = "https://example.com/proof".
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the quest detail.
  5. Observe Submit button before filling evidence.
  6. Upload a valid image.
  7. Enter "https://example.com/proof" into Link textbox.
- **Expected Result:**
  1. Submit button is disabled before required evidence is filled.
  2. Submit button becomes enabled after all required evidence fields are filled.

---

#### VQL_19 - Submit quest request successfully with valid evidence
- **Req Ref:** REQ-VQL-17
- **Priority:** High | **Severity:** Critical | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** SMOKE | **Automation:** AUTO*
- **Pre-condition:** User is logged in and enrolled in a tournament. The quest requires both image and link evidence. No existing submitted request is pending for this quest.
- **Test Data:** Valid image under 5MB; Link = "https://example.com/proof".
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the quest detail.
  5. Upload a valid evidence image.
  6. Enter "https://example.com/proof" into Link textbox.
  7. Click Submit.
- **Expected Result:**
  1. Quest request is created with Pending status.
  2. Content is displayed: "Your request has been submitted. It may take up 24 hours to verify."
  3. Submit button is hidden.

---

#### VQL_20 - Verify admin email and user notification after successful submission
- **Req Ref:** REQ-VQL-17
- **Priority:** High | **Severity:** Critical | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** MANUAL
- **Pre-condition:** User has successfully submitted a quest request. Admin mailbox UI and user notification UI are accessible.
- **Test Data:** Submitted quest request.
- **Steps:**
  1. Open the admin email inbox UI.
  2. Check the email generated for TN8.
  3. Log in as the user.
  4. Open the notification UI.
- **Expected Result:**
  1. Admin receives the TN8 quest submission email.
  2. User receives the TN2 Submit quest notification.

---

#### VQL_21 - Display submit failed error when quest request cannot be submitted
- **Req Ref:** REQ-VQL-18
- **Priority:** Medium | **Severity:** Major | **Behavior:** Negative | **Regression:** No | **Exec Tier:** FULL | **Automation:** AUTO*
- **Pre-condition:** User is logged in and enrolled in a tournament. The quest form has valid required evidence. The system returns an error during submission.
- **Test Data:** Valid evidence; forced submission failure.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the quest detail.
  5. Fill all required evidence fields.
  6. Click Submit.
- **Expected Result:**
  1. Error message is displayed: "Submit failed, please try again"
  2. Submit button remains available for retry.

---

#### VQL_22 - Display approved message for approved quest
- **Req Ref:** REQ-VQL-19
- **Priority:** Medium | **Severity:** Major | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO*
- **Pre-condition:** User is logged in and enrolled in a tournament. The user's quest request for Mission 1 is approved by admin.
- **Test Data:** Mission 1 quest request status = Approved.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the Tournament mission / Quests section.
  5. Open Mission 1.
- **Expected Result:**
  1. Mission 1 displays content: "This quest has been approved. Please continue completing the remaining tasks before the tournament begins."

---

#### VQL_23 - Reopen submission form for rejected quest
- **Req Ref:** REQ-VQL-20
- **Priority:** Medium | **Severity:** Major | **Behavior:** Positive | **Regression:** Yes | **Exec Tier:** REGRESSION | **Automation:** AUTO*
- **Pre-condition:** User is logged in and enrolled in a tournament. The user's quest request for Mission 1 is rejected by admin.
- **Test Data:** Mission 1 quest request status = Rejected.
- **Steps:**
  1. Log in to WMT.
  2. Click Tournament on the left menu.
  3. Open the enrolled tournament detail page.
  4. Open the Tournament mission / Quests section.
  5. Open Mission 1.
- **Expected Result:**
  1. Quest submission form is displayed again for Mission 1.
  2. User can submit new evidence for the rejected quest.

---

## 3: CLARIFICATION QUESTIONS

| # | Question | AC Ref | Impact if Unresolved |
|:---|:---|:---|:---|
| CQ-01 | After user enrollment, if admin edits, deactivates, or deletes a quest in BO, should FO keep the full old snapshot, or only prevent new quests from being added? | REQ-VQL-02 | Snapshot and BO update regression coverage may be incorrect. |
| CQ-02 | Should file format validation use extension, MIME type, or both? | REQ-VQL-09 | Security and invalid upload test data may be incomplete. |
| CQ-03 | If multi-select upload makes total images exceed 5, should the system reject all files in that upload action or only reject the extra files? | REQ-VQL-10 | Boundary expected result for image quantity is unclear. |
| CQ-04 | Should Link textbox validate URL format, or only required and max length? | REQ-VQL-15 | Invalid URL negative test cannot be finalized. |
| CQ-05 | If a quest requires neither image nor link, should Submit be enabled by default, disabled, or hidden? | REQ-VQL-16 | Optional-evidence quest behavior cannot be covered. |
| CQ-06 | Where should the success content be displayed after submit: inline, toast, modal, or replacement state? | REQ-VQL-17 | Post-submit UI assertion may need adjustment. |
| CQ-07 | Should "Submit failed, please try again" be displayed as toast, inline error, or popup? | REQ-VQL-18 | Failure UI assertion may need adjustment. |
| CQ-08 | Are approved and rejected quest statuses refreshed by page reload, polling, or realtime update? | REQ-VQL-19, REQ-VQL-20 | Status transition test steps may need adjustment. |
| CQ-09 | What exact screen/content should be displayed when all quests are approved? | REQ-VQL-21 | Test case for final all-approved state is blocked. |
