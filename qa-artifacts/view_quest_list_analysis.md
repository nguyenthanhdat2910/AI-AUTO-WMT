# Requirement Analysis - View quest list
> **User Story:** View quest list
> **Analyzed:** 2026-05-20
> **Status:** DRAFT - Pending CQ resolution
> **Handoff to:** `$senior-test-designer` sau khi CQ da duoc giai dap hoac defer

---

## 1: RISK & TRACEABILITY SUMMARY

| Atomic ID | Business Flow | Summary | L x I | Risk Score | Priority | Affected Modules | Regression | Ambiguity Flag |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| REQ-VQL-01 | Quest list ordering | FO hien thi quests theo created date tu cu nhat den moi nhat, tu trai sang phai | L2 x I2 | 4 | Medium | FO Tournament, Tournament Quest | Yes | Khong |
| REQ-VQL-02 | Active quest snapshot | Chi lay quest status ACTIVE cua tournament tai thoi diem user enrolled | L3 x I2 | 6 | Medium | FO Tournament, BO Gamification > Quest | Yes | CQ-01 |
| REQ-VQL-03 | Mission tabs | Moi quest hien thi thanh tab rieng voi format Mission N, N bat dau tu 1 | L2 x I1 | 2 | Low | FO Tournament | No | Khong |
| REQ-VQL-04 | Switch quest tab | Click tung Mission tab thi hien thi dung quest tuong ung | L2 x I2 | 4 | Medium | FO Tournament | Yes | Khong |
| REQ-VQL-05 | Empty quest list | Neu khong co quest trong list thi an section Tournament mission/Quests tren FO | L2 x I1 | 2 | Low | FO Tournament | No | Khong |
| REQ-VQL-06 | Quest information | Moi quest hien thi Title va Description | L1 x I1 | 1 | Low | FO Tournament | No | Khong |
| REQ-VQL-07 | Required image field visibility | Upload photo/screenshot chi hien thi khi BO check Required upload image | L2 x I2 | 4 | Medium | FO Tournament, BO Gamification > Quest | Yes | Khong |
| REQ-VQL-08 | Required image validation | Neu image la required va user submit khi null thi hien thi "Please upload your evidence." | L2 x I2 | 4 | Medium | FO Tournament | No | Khong |
| REQ-VQL-09 | Image format validation | Chi cho upload png, jpg, jpeg, heic, heif; sai format hien thi message invalid format | L2 x I2 | 4 | Medium | FO Tournament | No | CQ-02 |
| REQ-VQL-10 | Image quantity validation | Toi da 5 images; du 5 thi an upload button; vuot 5 thi hien thi error quantity | L2 x I2 | 4 | Medium | FO Tournament | No | CQ-03 |
| REQ-VQL-11 | Image size validation | Moi file toi da 5MB; file > 5MB hien thi toast "Maximum upload file size 5MB" | L2 x I2 | 4 | Medium | FO Tournament | No | Khong |
| REQ-VQL-12 | Uploaded file display/remove | Sau upload, hien thi file name va remove icon; click remove thi xoa photo da upload | L2 x I1 | 2 | Low | FO Tournament | No | Khong |
| REQ-VQL-13 | Required link field visibility | Link textbox chi hien thi khi BO check Required enter link | L2 x I2 | 4 | Medium | FO Tournament, BO Gamification > Quest | Yes | Khong |
| REQ-VQL-14 | Link required validation | Neu link la required va null thi hien thi "Please enter the URL for your proof or evidence." | L2 x I2 | 4 | Medium | FO Tournament | No | Khong |
| REQ-VQL-15 | Link field rules | Link co placeholder, max length 1000, tooltip dung content | L2 x I1 | 2 | Low | FO Tournament | No | CQ-04 |
| REQ-VQL-16 | Submit button state | Submit chi enable khi cac required fields da duoc fill | L3 x I2 | 6 | Medium | FO Tournament | Yes | CQ-05 |
| REQ-VQL-17 | Submit success | Submit hop le tao quest request Pending, gui email admin, gui notification user, hien thi success content va hide Submit | L3 x I3 | 9 | High | FO Tournament, Tournament Quest Request, Email, Notification | Yes | CQ-06 |
| REQ-VQL-18 | Submit failure | Neu co error khi submit thi hien thi "Submit failed, please try again" | L2 x I2 | 4 | Medium | FO Tournament | No | CQ-07 |
| REQ-VQL-19 | Approved quest state | Quest duoc approved thi hien thi approved message trong tab tuong ung | L3 x I2 | 6 | Medium | FO Tournament, Tournament Quest Request | Yes | CQ-08 |
| REQ-VQL-20 | Rejected quest state | Quest bi rejected thi reopen submit de user submit lai | L3 x I2 | 6 | Medium | FO Tournament, Tournament Quest Request | Yes | CQ-08 |
| REQ-VQL-21 | All quests approved | Khi tat ca quests approved thi hien thi screen theo requirement | L3 x I2 | 6 | Medium | FO Tournament, Tournament Quest Request | Yes | CQ-09 |

---

## 2: ATOMIC REQUIREMENTS

### AC 1 - Display submit quest list

#### REQ-VQL-01 - Display quests by created date oldest to newest
- **Source:** Explicit
- **Who:** Registered user da enrolled tournament
- **Action:** Open Tournament mission/Quests section
- **Object:** Quest tabs/list
- **Outcome:** Quests duoc sap xep theo created date tu oldest den newest, hien thi tu trai sang phai.
- **Ambiguity:** Khong

---

#### REQ-VQL-02 - Get ACTIVE quests at enrollment time only
- **Source:** Explicit
- **Who:** Registered user da enrolled tournament
- **Action:** View Tournament mission/Quests sau khi enrolled
- **Object:** Quest list
- **Outcome:** FO lay quests co status ACTIVE cua tournament tai thoi diem user enrolled; update quest sau enrollment khong cap nhat vao quest list cua user.
- **Ambiguity:** CQ-01 - Chua ro hanh vi neu BO deactivate/delete/edit quest sau khi user enrolled.

---

#### REQ-VQL-03 - Show each quest as Mission N tab
- **Source:** Explicit
- **Who:** Registered user
- **Action:** View quest list
- **Object:** Quest tab label
- **Outcome:** Moi quest la mot tab rieng, label format `Mission N`, N la so thu tu tang dan bat dau tu 1.
- **Ambiguity:** Khong

---

#### REQ-VQL-04 - Click tab displays corresponding quest
- **Source:** Explicit
- **Who:** Registered user
- **Action:** Click a Mission tab
- **Object:** Quest detail panel
- **Outcome:** FO hien thi dung quest tuong ung voi tab user da click.
- **Ambiguity:** Khong

---

#### REQ-VQL-05 - Hide section when quest list is empty
- **Source:** Explicit
- **Who:** Registered user
- **Action:** View tournament that has no available quest list
- **Object:** Tournament mission/Quests section
- **Outcome:** FO hides this section.
- **Ambiguity:** Khong

---

### AC 2 - Quest content

#### REQ-VQL-06 - Display quest title and description
- **Source:** Explicit
- **Who:** Registered user
- **Action:** View a quest tab
- **Object:** Quest Title, Description
- **Outcome:** FO displays quest title and quest description text.
- **Ambiguity:** Khong

---

### AC 3 - Upload photo/screenshot

#### REQ-VQL-07 - Display upload field only when required upload image is checked
- **Source:** Explicit
- **Who:** Registered user
- **Action:** View quest configured with Required upload image
- **Object:** Upload your photo/screenshot field
- **Outcome:** Upload field is displayed only when BO checkbox Required upload image is checked.
- **Ambiguity:** Khong

---

#### REQ-VQL-08 - Validate required upload image
- **Source:** Explicit
- **Who:** Registered user
- **Action:** Submit quest without image when image is required
- **Object:** Upload field validation
- **Outcome:** FO displays error message `Please upload your evidence.`
- **Ambiguity:** Khong

---

#### REQ-VQL-09 - Validate image file format
- **Source:** Explicit
- **Who:** Registered user
- **Action:** Upload unsupported file format
- **Object:** File picker/upload validation
- **Outcome:** FO allows only png, jpg, jpeg, heic, heif. Unsupported file displays `Invalid file format. Please upload a supported format, e.g., JPG, PNG, JPEG, HEIC, HEIF`
- **Ambiguity:** CQ-02 - Chua ro validate theo extension, MIME type, hay ca hai.

---

#### REQ-VQL-10 - Enforce maximum 5 uploaded images
- **Source:** Explicit
- **Who:** Registered user
- **Action:** Upload images for quest evidence
- **Object:** Uploaded image list, upload button
- **Outcome:** Maximum uploaded images is 5. Exactly 5 images hides Upload button. More than 5 displays `Exceeded the maximum quantities of images`.
- **Ambiguity:** CQ-03 - Chua ro neu multi-select lam tong so file vuot 5 thi reject tat ca hay chi reject file vuot qua.

---

#### REQ-VQL-11 - Validate maximum 5MB per file
- **Source:** Explicit
- **Who:** Registered user
- **Action:** Upload image larger than 5MB
- **Object:** Upload validation
- **Outcome:** FO displays toast `Maximum upload file size 5MB`.
- **Ambiguity:** Khong

---

#### REQ-VQL-12 - Display uploaded file information and allow removal
- **Source:** Explicit
- **Who:** Registered user
- **Action:** Upload image, then click remove icon
- **Object:** Uploaded file row/card
- **Outcome:** FO displays file name and remove icon; clicking remove deletes that uploaded photo from the quest form.
- **Ambiguity:** Khong

---

### AC 4 - Link textbox

#### REQ-VQL-13 - Display Link textbox only when required enter link is checked
- **Source:** Explicit
- **Who:** Registered user
- **Action:** View quest configured with Required enter link
- **Object:** Link textbox
- **Outcome:** Link field is displayed only when BO checkbox Required enter link is checked.
- **Ambiguity:** Khong

---

#### REQ-VQL-14 - Validate required Link textbox
- **Source:** Explicit
- **Who:** Registered user
- **Action:** Submit quest without link when link is required
- **Object:** Link textbox validation
- **Outcome:** FO displays error message `Please enter the URL for your proof or evidence.`
- **Ambiguity:** Khong

---

#### REQ-VQL-15 - Apply Link textbox constraints and tooltip
- **Source:** Explicit
- **Who:** Registered user
- **Action:** Enter link and click tooltip icon
- **Object:** Link textbox, tooltip
- **Outcome:** Placeholder is `Enter your related link`. Max length is 1000 characters. Input over 1000 characters is not allowed and displays `You cannot enter link more than 1000 characters.` Tooltip content is `This link will strengthen your evidence, making it more credible`.
- **Ambiguity:** CQ-04 - Chua ro Link co can validate URL format khong.

---

### AC 5 - Submit quest

#### REQ-VQL-16 - Submit button enabled only when required fields are filled
- **Source:** Explicit
- **Who:** Registered user
- **Action:** Fill or clear required evidence fields
- **Object:** Submit button
- **Outcome:** Submit button is enabled only when all required fields configured for that quest have valid values.
- **Ambiguity:** CQ-05 - Chua ro neu quest khong require image va khong require link thi Submit default enabled hay hidden.

---

#### REQ-VQL-17 - Submit success creates Pending quest request
- **Source:** Explicit
- **Who:** Registered user
- **Action:** Click Submit with valid required fields
- **Object:** Quest request, email, notification, UI state
- **Outcome:** System creates quest request with Pending status, sends email TN8 to admin, sends notification TN2 to user, displays `Your request has been submitted. It may take up 24 hours to verify.`, and hides Submit button.
- **Ambiguity:** CQ-06 - Chua ro success content hien thi dang inline, toast, modal, hay replace form.

---

#### REQ-VQL-18 - Submit failure displays error
- **Source:** Explicit
- **Who:** Registered user
- **Action:** Click Submit and system detects error
- **Object:** Error message
- **Outcome:** FO displays `Submit failed, please try again`.
- **Ambiguity:** CQ-07 - Chua ro error hien thi dang toast hay inline.

---

### AC 6 - Quest request status handling

#### REQ-VQL-19 - Approved quest displays approved content
- **Source:** Explicit
- **Who:** Registered user
- **Action:** View a quest after admin approved its quest request
- **Object:** Quest tab content
- **Outcome:** FO displays `This quest has been approved. Please continue completing the remaining tasks before the tournament begins.`
- **Ambiguity:** CQ-08 - Chua ro status update refresh theo reload, realtime, hay polling.

---

#### REQ-VQL-20 - Rejected quest reopens submit
- **Source:** Explicit
- **Who:** Registered user
- **Action:** View a quest after admin rejected its quest request
- **Object:** Quest submission form
- **Outcome:** FO reopens submit so user can submit again.
- **Ambiguity:** CQ-08 - Chua ro status update refresh theo reload, realtime, hay polling.

---

#### REQ-VQL-21 - All quests approved displays final screen
- **Source:** Missing
- **Who:** Registered user
- **Action:** View Tournament mission/Quests when all quests are approved
- **Object:** Final screen/content
- **Outcome:** Requirement says `When all quests approved, display screen:` but does not define the screen content or UI state.
- **Ambiguity:** CQ-09 - Missing expected success screen.

---

## 3: CLARIFICATION QUESTIONS

| # | Question | Atomic ID | Type | Impact if Unresolved |
|:---|:---|:---|:---|:---|
| CQ-01 | Sau khi user enrolled, neu admin edit/deactivate/delete quest trong BO thi FO phai giu snapshot cu day du, hay chi khong add quest moi? | REQ-VQL-02 | Hidden Dependency | Co the design sai data freshness/snapshot test va regression voi BO Quest config |
| CQ-02 | File format validation dua tren extension, MIME type, hay ca hai? | REQ-VQL-09 | Missing Input Constraint | Khong xac dinh duoc expected result cho file doi duoi gia MIME/extension |
| CQ-03 | Neu user multi-select lam tong so anh vuot 5, he thong reject tat ca file trong lan upload hay chi reject phan vuot qua? | REQ-VQL-10 | Missing Error Behavior | Khong design duoc boundary TC cho upload quantity |
| CQ-04 | Link textbox co can validate URL format hop le khong, hay chi validate required va max length? | REQ-VQL-15 | Missing Input Constraint | Khong ro co can negative TC cho invalid URL |
| CQ-05 | Neu quest khong require image va khong require link thi Submit button mac dinh enabled, disabled, hay hidden? | REQ-VQL-16 | Missing UI State | Khong ro expected state cho optional-evidence quest |
| CQ-06 | Success content sau submit hien thi o dau: inline trong tab, toast, modal, hay replace form? | REQ-VQL-17 | Undefined Success State | Khong viet duoc expected UI state sau submit |
| CQ-07 | Submit failed message hien thi dang toast, inline error, hay popup? | REQ-VQL-18 | Missing Error Behavior | Khong viet duoc expected result dung UI component |
| CQ-08 | Approved/Rejected state duoc cap nhat khi reload page, polling, hay realtime? | REQ-VQL-19, REQ-VQL-20 | Hidden Dependency | Khong ro cach verify status transition tren FO |
| CQ-09 | Khi all quests approved, man hinh/content cuoi cung can hien thi chinh xac la gi? Submit form/tab co bi an khong? | REQ-VQL-21 | Undefined Success State | Khong the design TC cho final approved state |

---

## HANDOFF CHECKLIST

- [x] Tat ca AC trong muc View quest list da phan ra Atomic Requirements
- [x] 8 loai ambiguity da duoc quet va flag thanh CQ khi can
- [x] Risk Score L x I da tinh cho moi flow
- [x] Stop-Ship criteria da kiem tra
- [x] Affected Modules da liet ke
- [ ] CQ da duoc user review, giai dap, hoac defer truoc khi chuyen sang Design Module
