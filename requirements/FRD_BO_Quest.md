# FRD BO Quest

***DOCUMENT OF GENERAL ***

***Mobile BO_WeMasterTrade***

***Version: 1.0***

# Revision Summary

| **Version** | **Comments** | **Author** | **Issue Date** |
| --- | --- | --- | --- |
| 1.0 | MVP version:<br>- Quest | Nu Le | Nov 20, 2024 |
|  |  |  |  |
|  |  |  |  |

# Objective

# Scope

# Current Processing

# Business Flow Diagram

# Assumptions, dependencies and constraints

# Definition, acronyms and abbreviations

# Detailed functional descriptions

## View Quest list

### User story

As an administrator, I want to view the Quest lists so that I can manage the Quests

### GUI

View UI [here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=2201-9926&t=ufjicfbLdfHhJsWT-1)

### Acceptance criteria

- When user clicks on Quest Lists tab, the Quests lists screen will be displayed with the following information:

- New button: Clicks on button, navigate user to the add new Quest screen

- The list of all Quests in the system with the information mentioned above:

| **Column** | **Description** |
| --- | --- |
| Quest ID | - Display the Quest ID<br>- Format: CL00000N (With: N from 1) |
| Quest Title | - Display the title of the Quest<br>- If the title exceeds max of width, show”...” at the end and provide a mouse hover tooltip with the full title |
| Point | - Display the point of this Quest<br>- Format: comma (,) to separate thousands |
| Created Date | - Display the created date of this Quest<br>- Format: mm/dd/yyyy hh:mm:ss |
| Status | - Display the status of this Quest<br>- There are two statuses:<br>+ Active<br>+ Inactive |

- The Quests list is sorted according to the Created Date (From Newest to Oldest)

- Click on QuestID of each row, navigate user to the corresponding Quest details screen

- The Quests list is displayed with 10 items per page.

## Search in Quest list

### User story

As an administrator, I want to search specific Quest from the Quests list so that I can find the Quest easily

### GUI

View UI [here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=2201-9926&t=Zq2v8VXDtpb3oZgD-4)

### Acceptance criteria

On the Quest List screen, allow user search and filters by column***: ***

- Search box:

  - ID

  - Title.

- Filter by select:

  - Status

    - Includes: Active, Inactive

- Filter by Date:

  - Created Date

***Apply the standard Search & Filter rules as defined here: ***[***Search & Filter***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/ESCfc22W9M5NhbFlQcBmyZcBb4YC95tPo8cB94kZKEpZjA?e=JbS1q0&nav=eyJoIjoiMTMyMTkxNDg2NyJ9)***   ***

## [Quest] Create a new Quest

### User story

As an administrator, I want to create a new Quest so that the users can participate in the Quest within the app.

### GUI

### Acceptance criteria

- When admin clicks on New button, add new Quest screen will be displayed with the following information:

- Active: ***toggle on-off***

  - Default: ON (active)

- Quest Title:

  - Text box - Required field

  - Max length: 200. Exceed allowed length, display an error message: “*Quest Title exceed 200 characters*”

  - Placeholder: Enter title

- *Expiry Date: *

  - *Date picker – Optional Field*

  - *Default: Null*

  - *User clicks on this field to pick a date. If selected date is earlier than today, display an error message:” You can only choose a future date” *

  - *Format: mm/dd/yyyy*

- *Platform: Dropdown list – Optional field*

  - *There are some options as above:*

    - *Facebook*

    - *Instagram*

    - *YouTube*

    - *Telegram*

    - *Tiktok*

    - *Twitter*

    - *Discord*

    - *Other*

  - *Default: Other*

  - *Questionary icon : Hover on this icon, display the content:” The user will participate in the Quest on selected platform”*

- Point:

  - Textbox – Required field

  - Only accept numeric integer characters

  - Accepted range: [1;100000]. If user input value out of the range, display an error message: “*Point must be between 1 and 100000*”

  - *Questionary icon : Hover on this icon, display the content:” The user will earn points upon completing the Quest”*

  - *Default: 1*

  - Format: comma (,) to separate thousands

- Required upload image: toggle on-off

  - Default: ON

  - *Questionary icon : Hover on this icon, display the content:” Require user upload evidence by providing an image or screenshot”*

- Required enter link: toggle on-off

  - Default: ON

  - *Questionary icon : Hover on this icon, display the content:” Require user upload evidence by entering link (Facebook link, Instagram link...)”*

*=> ****Note****: The user must check at least one of the following boxes “Required upload image” or “Required enter link”. If user unchecked both of that field, display an error message: “At least required image or required link checked”*

- Allow multiple submissions: toggle on-off

  - Default: ON

  - *Questionary icon : Hover on this icon, display the content:” Allows users to participate in the Quest multiple times.”*

- *Expiry Date: Data picker – Optional Field*

  - *Default: Null*

  - *User clicks on this field to pick a date. If selected date is earlier than today, display an error message:” You can only choose a future date” *

  - *Format: mm/dd/yyyy*

  - *Questionary icon : Hover on this icon, display the content:” This Quest will expire at 23:59 on the selected date. If no date is selected, it will have no expiration”*

- *Account Ranks: *

  - *Checkbox, Required Field*

  - *Allow users to check multi-check boxes. *

  - *Initial Default: Null*

  - *There are three options: Silver, Gold, Diamond*

  - *Questionary icon : Hover on this icon, display the content:” The Quest will be displayed to accounts with the corresponding rank.”*

- *Description: *

  - *Text editor – Required Field*

  - *Hint: Enter description  *

  - *Max length: 2000. Exceed allowed range, display an error message: “Description cannot exceed 2000 characters”*

  - *Functions included:*

    - *Bold*

    - *Italic*

    - *Strikethrough*

    - *Text size*

    - *Text color*

    - *Link*

    - *Bulleted list*

- *Specific Email:*

  - ***The input text field: ***

***+ Max length: 100 characters ***

***+ Hint text: “Enter user’s email” ***

  - ***When user clicks on button Add: ***

***+ Case 1: There is no data in the input field, display error message: Please fill out this field. ***

***+ Case 2: Check format email. ***

    - ***emailPattern = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/)***

    - ***If the email format is incorrect. display error message: Please enter a valid email.***

***+ Case 3: There is data in the input field. Check if it is matched with an existing user 'email (registered email), case insensitive: ***

- ***Matched: Add Email to the user list received discount code***

- ***Not matched: Display error message: Email does not exist in registered users. ***

***+ Case 4: Email has already been added. Display error: Email has already been added.***

- ***Email list: ***

  - ***Display User' email***

  - ***Display Full Name of this email added (First name + last name)***

  - ***Sort from newest to oldest.***

  - ***User can delete the specific email by clicking the DELETE button at each record.***

- ***Add: button, click on this button, system will check:***

  - ***If there are errors, display an error message below each field. ***

  - ***If no: ***

    - ***Save a new quest successfully, create a record in the Quest list. ***

    - ***Navigate user to Edit quest view. ***

    - ***If status of this Quest is active:***

      - ***Send notification to user ***[***ID N00001***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBnTyhUNWITynTGxtmiO-znA?e=FRet3F)

    - ***Create a record in the audit trail with the information as described at ***[***AD00065***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=67:67)

## View/Edit a Quest

### User story

As an administrator, I want to view/edit Quest detail to update some news for Quest

### GUI

### Acceptance criteria

In Edit quest view, user can view and edit this following information:

- *Status of quest*

- Quest Title

- *Expiry Date*

- *Platform  *

- Point

- Account Rank

- Required upload image

- Required enter link

- Allow multiple submission

- *Description*

*When user click button Update, the system will:*

- *Check validates: All validation of Edit quest is the same as Create a new quest.*

  - *If no error founds, the system will check the notification status: *

    - *If this quest is active and not sent notification new quest (*[***ID N00001)***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBnTyhUNWITynTGxtmiO-znA?e=FRet3F)

      - ***Save new update quest successfully***

      - ***Send notification to user ***[***ID N00001***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBnTyhUNWITynTGxtmiO-znA?e=FRet3F)

    - *If this quest sent notification new quest (*[***ID N00001)***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBnTyhUNWITynTGxtmiO-znA?e=FRet3F)

      - ***Save new update quest successfully.***

- ***Create a record in the audit trail with the information as described at ***[***AD00066***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=68:68)*** ***

## [Quest] Handle expiry date of Quest

### User story

As an administrator, I want to automatically inactive Quest when it is expired

### Acceptance criteria

The system will run a cronjob at 00:00 AM (UTC+0) each date to check if all active Quests are expired or not (Current Date >= Expiry Date). If yes, the system will execute:

- BO: The toggle active will be change to OFF

- FO: Hide this Quest in Quest screen

## [Welcome quests] View welcome quest list

### User story

As an admin, I want to view quest lists in the welcome package so that I can manage the quests.

### GUI

### Acceptance criteria

***- When user clicks on Welcome quest tab, the welcome quests manage screen will be displayed with the following information:***

| ***Column*** | ***Description*** |
| --- | --- |
| ***Quest ID*** | - ***Display the quest ID***<br>- ***Format: WQ00000N (With: N from 1)*** |
| ***Quest Title*** | - ***Display the title of the quest***<br>- ***If the title exceeds max of width, show”...” at the end and provide a mouse hover tooltip with the full title*** |
| ***Created Date*** | - ***Display the created date of this quest***<br>- ***Format: mm/dd/yyyy hh:mm:ss*** |
| ***Status*** | - ***Display the status of this quest***<br>- ***There are two statuses:***<br>***+ Active***<br>***+ Inactive*** |

- ***The quests list is sorted according to the Created Date (From Newest to Oldest)***

- ***Click on QuestID, navigate to the corresponding welcome quest details screen. ***

## [Welcome quests] Search in welcome quest list

### User story

As an administrator, I want to search for specific quests from the quests list so that I can find the quest easily.

### GUI

[View UI here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=7488-51498&t=Zq2v8VXDtpb3oZgD-4)

### Acceptance criteria

On the Quest List screen, allow user search and filters by column***: ***

- Search box:

  - ID

  - Title.

- Filter by select:

  - Status

    - Includes: Active, Inactive.

- Filter by Date:

  - Created Date

***Apply the standard Search & Filter rules as defined here: ***[***Search & Filter***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQAgn3NtlvTOTYWxZUHAZsmXAW-GAvebT6PHAfeJGShKWYw?e=QVK6sw&nav=eyJoIjoiMTQ5MDYwNzY3MyJ9)***   ***

## [Welcome quests] Create/Edit a quest in Welcome quest list

### User story

As an admin, I want to create a new quest in the welcome package, so that users can engage with it and participate in the quest within the app.

### GUI

### Acceptance criteria

- When admin clicks on New button, add new Welcome Quest screen will be displayed with the following information:

- Active: ***toggle on-off***

  - Default: ON (active)

- Quest Title:

  - Text box - Required field

  - Max length: 200. Exceed allowed length, display an error message: “*Quest Title exceed 200 characters*”

  - Placeholder: Enter title

- *Expiry Date: *

  - *Date picker – Optional Field*

  - *Default: Null*

  - *User clicks on this field to pick a date. If selected date is earlier than today, display an error message:” You can only choose a future date” *

  - *Format: mm/dd/yyyy*

- *Platform: Dropdown list – Optional field*

  - *There are some options as above:*

    - *Facebook*

    - *Instagram*

    - *YouTube*

    - *Telegram*

    - *Tiktok*

    - *Twitter*

    - *Discord*

    - *Other*

  - *Default: Other*

  - *Questionary icon : Hover on this icon, display the content:” The user will participate in the Quest on selected platform”*

- Point:

  - Textbox – Required field

  - Only accept numeric integer characters

  - Accepted range: [1;100000]. If user input value out of the range, display an error message: “*Point must be between 1 and 100000*”

  - *Questionary icon : Hover on this icon, display the content:” The user will earn points upon completing the Quest”*

  - *Default: 1*

  - Format: comma (,) to separate thousands

- Required upload image: toggle on-off

  - Default: ON

  - *Questionary icon : Hover on this icon, display the content:” Require user upload evidence by providing an image or screenshot”*

- Required enter link: toggle on-off

  - Default: ON

  - *Questionary icon : Hover on this icon, display the content:” Require user upload evidence by entering link (Facebook link, Instagram link...)”*

*=> ****Note****: The user must check at least one of the following boxes “Required upload image” or “Required enter link”. If user unchecked both of that field, display an error message: “At least required image or required link checked”*

- *Expiry Date: Data picker – Optional Field*

  - *Default: Null*

  - *User clicks on this field to pick a date. If selected date is earlier than today, display an error message:” You can only choose a future date” *

  - *Format: mm/dd/yyyy*

  - *Questionary icon : Hover on this icon, display the content:” This Quest will expire at 23:59 on the selected date. If no date is selected, it will have no expiration”*

- *Description: *

  - *Text editor – Required Field*

  - *Max length: 2000. Exceed allowed range, display an error message: “Description cannot exceed 2000 characters”*

  - *Hint: Enter description*

  - *Functions included:*

    - *Bold*

    - *Italic*

    - *Strikethrough*

    - *Text size*

    - *Text color*

    - *Link*

    - *Bulleted list*

- ***Add: button, click on this button, system will check:***

  - ***If there are errors, display an error message below each field. ***

  - ***If no: ***

    - ***Save a new welcome quest successfully, create a record in the Welcome Quest list. ***

    - ***Navigate user to Edit welcome quest detail view.***

    - ***Create a record in the audit trail with the information as described at ***[***AD00067***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=68:68)

    - ***Create a record in the audit trail with the information as described at ***[***AD00068***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=69:69)

## [Welcome quests] Handle expiry date of welcome quest

### User story

As an administrator, I want to automatically inactive Quest when it is expired

### GUI

### Acceptance criteria

***The system will run a cronjob at 00:00 AM (UTC+0) each date to check if all active Quests are expired or not (Current Date >= Expiry Date). If yes, the system will execute:***

- ***BO: The toggle active will be changed to OFF***

- ***FO: Hide this Quest in Quest screen***

***In case user submitted quest and in processing (pending, approved), this quest is still displayed in FO | Welcome quest list.***

## [Tournament quests] Tournament quest list

### User story

As an admin, I want to view tournament quest so that I can manage them.

### GUI

[View UI here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=7488-48401&t=Drc5AJQ4XPJ67zMr-4)

### Acceptance criteria

***When admin Quest >> Tournament quests > Tournament quests list will be displayed with the following information:  ***

| ***Column*** | ***Description*** |
| --- | --- |
| ***Quest ID*** | - ***Display the Quest ID***<br>- ***Format: TNQ00000N (With: N from 1)*** |
| ***Quest Title*** | - ***Display the title of the Tournament Quest***<br>- ***If the title exceeds max of width, show” ...” at the end and provide a mouse hover tooltip with the full title*** |
| ***Tournament ID*** | - ***Display the tournament ID*** |
| ***Tournament Title*** | - ***Display the Tournament title***<br>- ***If the title exceeds max of width, show” ...” at the end and provide a mouse hover tooltip with the full title*** |
| ***Created Date*** | - ***Display the created date of this Quest***<br>- ***Format: mm/dd/yyyy hh:mm:ss*** |
| ***Status*** | - ***Display the status of this quest***<br>- ***There are 2 statues: Active and Inactive*** |
| ***Detail*** | - ***Click this button to navigate user to the Detail page. *** |

- ***Display 20 items per page.  ***

- ***Sort by created date (newest to oldest)  ***

## [Tournament quests] Search and filter in Tournament quest

### User story

As an admin, I want to search tournament quest so that I can manage them.

### GUI

[View UI here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=7488-48401&t=Drc5AJQ4XPJ67zMr-4)

### Acceptance criteria

- ***Search box: ***

  - ***Tournament ID***

  - ***Tournament Title  ***

  - Quest ID

  - Quest title

- Filter by:

  - Status: Active, Inactive

- Filter by datetime picker:

  - Created date

- ***Apply the standard Search & Filter rules as defined here: ***[***Search. & Filter***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQAgn3NtlvTOTYWxZUHAZsmXAW-GAvebT6PHAfeJGShKWYw?e=4CI2Fv&nav=eyJoIjoiMTQ5MDYwNzY3MyJ9)

## [Tournament quests] Create a tournament quest

### User story

As an admin, I want to create tournament quest so that I can manage them.

### GUI

[View UI here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=7488-50140&t=Drc5AJQ4XPJ67zMr-4)

### Acceptance criteria

***- When admin clicks on New button, add new Quest screen will be displayed with the following information:  ***

- ***Quest Title: Text box - Required field ***

  - ***Max length: 200. Exceed allowed length, display an error message: “Quest Title exceed 200 characters” ***

  - ***Placeholder: “Enter title”***

- ***Active: toggle ***

  - ***Default: ON***

- ***Platform: Dropdown list – Optional field ***

  - ***There are some options as above: ***

    - ***Facebook ***

    - ***Instagram ***

    - ***YouTube ***

    - ***Telegram ***

    - ***Tiktok ***

    - ***Twitter ***

    - ***Discord ***

    - ***Other ***

    - ***Default: Other***

- ***Required upload image: Check box ***

  - ***Default: Checked ***

  - ***Questionary icon : Hover on this icon, display the content:” Require user upload evidence by providing an image or screenshot”***

- ***Required enter link: Check box ***

  - ***Default: Checked ***

  - ***Questionary icon : Hover on this icon, display the content:” Require user upload evidence by entering link (Facebook link, Instagram link...) ”***

***Note: The user must check at least one of the following boxes “Required upload image” or “Required enter link”. If user unchecked both of that field, display an error message: “At least required image or required link checked”***

- ***Description: Text editor – Required Field ***

  - ***Max length: 2000. Exceed allowed range, display an error message: “Description cannot exceed 2000 characters” ***

  - ***Functions included: ***

    - ***Bold ***

    - ***Italic ***

    - ***Strikethrough ***

    - ***Text size ***

    - ***Text color ***

    - ***Link ***

    - ***Bulleted list***

- ***Tournament ID: ***

  - ***Dropdown, single select***

  - ***Required field***

  - ***Get the tournament with status Up-coming***

  - ***Format: [Tournament ID] - [Tournament title]***

- ***Add: button***

  - ***Click this button, the system will save this tournament quest.***

  - ***Display toast message: “Add new tournament quest successfully”***

## [Tournament quests] Edit a tournament quest

### User story

As an admin, I want to edit a new tournament quest so that my user can submit that.

### GUI

### Acceptance criteria

***In tournament quest detail, admin can edit these field: ***

- Quest Title: Text box - Required field

- Active: Checkbox

- Platform: Dropdown list – Optional field

- Tournament ID:  Dropdown list

- Required upload image: Check box

- Required enter link: Check box

- Description: Text editor – Required Field

Update: button - All field validations follow the same rules as when [creating a new tournament quest](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQCbT4q1drPVQKRV9YwpYtEyAdEWNskAUOriDposqH-FbPY?e=gN7JQm&nav=eyJoIjoiMTcxNTA2ODkwNiJ9).

- Click this button, the system will save this tournament quest.

- Display toast message: “Update new tournament quest successfully”

## View Quest request list

### User story

As an administrator, I want to view Quest request list so that I can manage progress of Quest submissions

### GUI

### Acceptance criteria

When user clicks on Quest -> Quest Request, the quest request list will be displayed with the following information:

| **Column** | **Description** |
| --- | --- |
| Request ID | - Display the quest request ID<br>- Format: PR0000000N (With N from 1) (8 digits) |
| Quest Type | - Display the quest type of quest request<br>- There are 3 types:<br>- Common quest<br>- Welcome quest |
| Quest Title | - Display the Quest title<br>- If the text exceeds max of width, shown “...” at the end and provide mouse hover tooltip with the full Quest title |
| Email | - Display user’s email<br>- If the text exceeds max of width, shown “...” at the end and provide mouse hover tooltip with the full email |
| Full Name | - Display full name of the requested user<br>- Format: Full Name = First Name + Last Name<br>- If the text exceeds max of width, shown “...” at the end and provide mouse hover tooltip with the full name |
| Quest Title | - Display the Quest title<br>- If the text exceeds max of width, shown “...” at the end and provide mouse hover tooltip with the full Quest title |
| Point | - Display the point of the Quest<br>- Format: comma (,) to separate thousands<br>- Keep it null if there is no value. (for Welcome quests |
| Submitted Date | - Display the submitted date of the quest request<br>- Format: mm/dd/yyyy hh:mm:ss |
| Status | - Display the quest request status<br>- There are 3 statuses:<br>  - Pending<br>  - Approved<br>  - Rejected |

- The quest request list is sorted according to the Submitted Date (From Newest to Oldest)

- When user clicks on RequestID of the row, navigate user to the Quest details screen

- The quest request list displays 10 items per page.

## Search in quest request list

### User story

As an administrator, I want to search specific quest request from the quest requests list so that I can find the quest request easily

### GUI

[View UI here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=2268-4170&t=qNy3O83HEAuIQV6H-4)

### Acceptance criteria

On the Quest Requests screen, allow user search and filters by column:

- Search box:

  - ID

  - Title

  - Email.

- Filter by select:

  - Quest Type

    - Includes: Common Quest, Welcome Quest

  - Status:

    - Includes: Pending, Approved, and Rejected.

- Filter by Date

  - Created Date

***Apply the standard Search & Filter rules as defined here: ***[***Search & Filter***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQAgn3NtlvTOTYWxZUHAZsmXAW-GAvebT6PHAfeJGShKWYw?e=QVK6sw&nav=eyJoIjoiMTQ5MDYwNzY3MyJ9)***   ***

## View Quest request details

### User story

As an administrator, I want to view the detailed information of a request so that I can understand the specifics of the request

### GUI

### Acceptance criteria

- When user clicks on a quest request, navigate the user to the quest requests detail. This screen will be displayed with the following information:

- Request ID: Display the quest request ID

  - Format: PR0000000N (With N from 1) (8 digits)

- Quest ID: Display the Quest ID

- Quest Type: display the quest type of this quest

- Title: Display the Quest title

- Platform: Display the flatform of this Quest

- Point: Display the point of this Quest

  - Hide this field if request belong to welcome quest

- Description: Display the Quest description

- Evidence: Display the image link user uploaded

  - Click on each link to open image in a new tab

  - Display ‘-’ if there is no value in this field

- Related Link: Display the related link user entered

  - Click on this link to open the related link in a new tab

  - Display “-” if there is no value in this field

- Full Name: Display Full Name of this quest request

  - Format: Full Name = First Name + Last Name

- Email: Display the user’s email

- Status: Display the status of this quest request. There are 3 statuses: Pending, Approved, Rejected

- Submitted Date: Display the submitted date of this quest request

  - Format: mm/dd/yyyy hh:mm:ss

- Updated Date: Display the updated date of this quest request

  - Format: mm/dd/yyyy hh:mm:ss

  - Only display this field when the status is Rejected of Approved

- Updated By: Display the name’s updater of this quest request

  - Only display this field when the status is Rejected of Approved

- Rejected reason: Display the rejected reason of this request

  - Only display this field when the status is “Rejected”

- Approved: button (Refer user story: [Approve the quest request](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/EWk5RCDc8ZtIrGjydUDLDm8BW-2h8RxxDSdQNcgRjlHVoQ?e=Zpi9Uh&nav=eyJoIjoiMTQ0ODY4MzU2NCJ9))

  - Only display this field when the status is Pending

- Rejected: button (Refer user story: [Reject the quest request](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/EWk5RCDc8ZtIrGjydUDLDm8BW-2h8RxxDSdQNcgRjlHVoQ?e=3e1YBy&nav=eyJoIjoiMjQ2NzgxMjEifQ%3D%3D))

  - Only display this field when the status is Pending

## Approve the quest request

### User story

As an administrator, I want to approve a quest request for user so that they can receive their Quest point

### GUI

### Acceptance criteria

- When user clicks on Approve button, a confirmation popup will be displayed as above:

- Title: Approve quest request

- Content: Are you sure you want to approve this Quest request?

- Cancel: Button. Click on this button to discard the approve quest request and close the popup

- Approve: Button. Click on this button, the system execute:

  - Change the status of this quest request to Approved

  - Display a toast message: “Approve the quest request successfully!”

  - Close this popup and hide button Approve and Reject at the Quest Request Details

  - For Quest type = Common quest:

    - Plus point for user:

      - Total points = Current total points + the point of this request

      - Available points = Current available points + the point of this request

    - Update quest request to Approved tab in Quest screen in Mobile

    - Send notification to user (Sheet: Noti_Mobile [ID N00003](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBnTyhUNWITynTGxtmiO-znA?e=eu4w07&nav=MTVfezc4OENBNkJDLUMyMDUtNDNDNS04NzhCLTIzQzg1MTA5NkU5MH0))

    - Send email to user (Sheet: Email_Mobile [ID E0001)](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=bkTzVB&nav=MTVfezVCQTU2MDlDLTIyQjktNDQ3Mi1BM0I0LTJERTA0RUNDMDJCNX0)

  - For Quest type = Welcome quest:

    - Update quest request to Approved tab in Quest screen in Mobile

    - Send notification to user (Sheet: Noti_Mobile [ID N00007](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBnTyhUNWITynTGxtmiO-znA?e=eu4w07&nav=MTVfezc4OENBNkJDLUMyMDUtNDNDNS04NzhCLTIzQzg1MTA5NkU5MH0))

    - Send email to user (Sheet: Email_Mobile [ID E0003)](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=bkTzVB&nav=MTVfezVCQTU2MDlDLTIyQjktNDQ3Mi1BM0I0LTJERTA0RUNDMDJCNX0)

    - ***Create a record in the audit trail with the information as described at ***[***AD00069***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=71:71)

## Reject the quest request

### User story

As an administrator, I want to reject a quest request because there may be some cheat or invalid evidence

### GUI

### Acceptance criteria

- When user clicks on Reject button, a confirmation popup will be displayed as above:

- Title: Reject quest request

- Reason: Text box – Required Field

  - Max length: 250 characters. The user cannot enter more than. If user enters more than 250 characters, display an error message: “You cannot more than 250 characters”

- Cancel: Button. Click on this button to discard the reject quest request action and close the popup

- Reject: Button. Only enable when the reason is filled. Click on this button, the system execute:

  - Change the status of this quest request to Rejected

  - Update quest request to Rejected tab in Quest screen in Mobile

  - Display a toast message: “Reject the quest request successfully!”

  - For Quest type = Common:

    - ***Send notification to user (Sheet: Noti_Mobile ***[***ID N00004***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBnTyhUNWITynTGxtmiO-znA?e=DUPrZK&nav=MTVfezc4OENBNkJDLUMyMDUtNDNDNS04NzhCLTIzQzg1MTA5NkU5MH0)***)***

    - ***Send email to user (Sheet: Email_Mobile ***[***ID E0002)***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=bkTzVB&nav=MTVfezVCQTU2MDlDLTIyQjktNDQ3Mi1BM0I0LTJERTA0RUNDMDJCNX0)

  - For Quest type = Welcome quest

    - ***Send notification to user (Sheet: Noti_Mobile ***[***ID N00008***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBnTyhUNWITynTGxtmiO-znA?e=DUPrZK&nav=MTVfezc4OENBNkJDLUMyMDUtNDNDNS04NzhCLTIzQzg1MTA5NkU5MH0)***)***

    - ***Send email to user (Sheet: Email_Mobile ***[***ID E0004)***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=bkTzVB&nav=MTVfezVCQTU2MDlDLTIyQjktNDQ3Mi1BM0I0LTJERTA0RUNDMDJCNX0)

  - Close this popup and hide button Approve and Reject at the Quest Details

  - ***Create a record in the audit trail with the information as described at ***[***AD00069***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=71:71)

## View Redeem List

### User story

As an administrator, I want to view list of redeem so that I can manage them.

### GUI

### Acceptance criteria

- When user clicks on the Redeem tab, the Redeem list will be displayed with the following information:

| **Column** | **Description** |
| --- | --- |
| Redeem Code | - Display the code of redeem |
| Point | - Display the point of this redeem<br>- Format: comma (,) to separate thousands |
| Percentage Amount | - Display the Percentage Off.<br>- Leave a blank Percentage Amount field, if there is no value in this field.<br>- Format: comma (,) to separate thousands |
| Fix Amount | - Display the number of Discount amount.<br>- Leave blank Fix Amount field, if there is no value in this field.<br>- Format: comma (,) to separate thousands and 2 decimal places. Ex: 1,200.15 |
| Redeem Quantities | - Display the total number of times redeem used (Count on the number of redeemed successfully – Generate discount code successfully)<br>- Leave blank if there is no value in this field |
| Allowed Quantities | - Display the allowed quantities of that redeem<br>- Leave blank if there is no value in this field |
| Status | - Display the status of this redeem<br>- There are 2 statuses:<br>  - Available<br>  - Sold out |

- The redeem list is sorted according to the Created date (From Newest to Oldest)

- Clicks on Redeem code of the row, navigates user to the redeem detail screen

- Display 10 items per page.

## Search in Redeem list

### User story

As an administrator, I want to search Redeem in the Redeem list so that I can find the correct specific redeem.

### GUI

[View UI here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=7470-75070&t=qNy3O83HEAuIQV6H-4)

### Acceptance criteria

***On the Redeem screen, the search and filter area will be displayed with the following information: ***

- Search box:

  - Redeem Code.

- Filter by select:

  - Status

    - Includes: Available and Sold out.

***Apply the standard Search & Filter rules as defined here: ***[***Search & Filter***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQAgn3NtlvTOTYWxZUHAZsmXAW-GAvebT6PHAfeJGShKWYw?e=QVK6sw&nav=eyJoIjoiMTQ5MDYwNzY3MyJ9)***   ***

## Create/Edit a redeem

### User story

As an administrator, I want to create a redeem so that user can redeem voucher by their available points

### GUI

### Acceptance criteria

- When user clicks on New button in the redeem list, the new redeem screen will be displayed with the following information:

- Redeem code: Textbox - Required field.

  - Accept only Latin letters, numbers, underscore “_” and no space permitted. If not, show error: Accept only latin letters, numbers, underscore “_” and no space permitted.

  - Convert characters input to Uppercase.

  - Max length: 15 characters.

  - Placeholder: *e.g. ‘510ZERO’*

- Point: Textbox – Required field

  - Only accept numeric integer characters

  - Accepted range: [1;100000]. If user input value out of the range, display an error message: “*Point must be between 1 and 100000*”

  - *Questionary icon : Hover on this icon, display the content:” The user will earn points upon completing the Quest”*

  - *Default: 1*

  - Format: comma (,) to separate thousands

- Percentage: Radio button

  - Default selected

  - When selected, enable 2 input fields: Percentage Off & Maximum Amount.

  - Unselected when radio button Fixed Amount Discount is selected.

  - When being unselected, input fields Percentage Off & Maximum Amount will be disabled and data input will be deleted

- Percentage Off: Text box - Required field (after being enabled)

  - Unit: %

  - Enabled when Percentage radio button is selected.

  - Accept integer values only.

  - Value Range: 0 < Number input <= 100. If not, show error: Enter a number greater than 0 and less than or equal to 100.

- Maximum Amount: Enabled when Percentage Discount radio button is selected.

  - Optional field.

  - Unit: USD

  - Accept numerical values (integer and decimal numbers).

  - Value Range: 0 < Number input <= 100,000. If not, show error: Enter a number greater than 0 and less than or equal to 100,000.

  - Format: comma (,) to separate thousands and 2 decimal places. Ex: 1,200.15

- Fixed Amount: Radio button

  - Default unselected.

  - When selected, enable the field Discount Amount.

  - Unselected when radio button Percentage is selected.

  - When being unselected, field Discount Amount will be disabled and data input will be deleted.

- Discount Amount: Textbox – Required Field (after being enabled)

  - Unit: USD

  - Enabled when Fixed Amount radio button is selected.

  - Accept numerical values (integer & decimal numbers).

  - Value Range: 0 < Number input <= 100,000. If not, show error: Enter a number greater than 0 and less than or equal to 100,000.

  - Format: comma (,) to separate thousands and 2 decimal places. Ex: 1,200.15

- Redeemed Quantities: Label

  - Only display this field when edit/view redeem screen, hide this field in the create new redeem screen

  - Trigger count redeemed quantities:

    - When claim discount code successfully (Generate discount code successfully), redeem quantities value = current redeem quantities value + 1

- Allowed quantities: Textbox – Optional Field

  - Accept integer value only

  - Format: comma (,) to separate thousands

  - Default: Null – No limit usage

  - Questionary icon : Hover on this icon, display the content:” This value defines the limit on the number of times it can be used”

  - Value range: 0 < Number input < 1,000,000. If not, show error: *Enter a number greater than 0 and less than or equal to 1,000,000*

- Validity period: Textbox – Optional Field

  - Accept integer value only

  - Format: comma (,) to separate thousands

  - Default: Null – No limit time

  - Questionary icon : Hover on this icon, display the content: ” This value determines the validity period of the redeem from the moment the customer converts it into a discount code”

  - Value range: 0 < Number input < 1,000. If not, show error:* Enter a number greater than 0 and less than or equal to 1,000*

- Account rank: *Checkbox, multi-checked – Required Field*

  - *Default: Null*

  - *The selected account rank is displayed as removable tag*

  - *There are three options: Silver, Gold, Diamond*

  - *Questionary icon : Hover on this icon, display the content:” The redeem will be displayed to accounts with the corresponding rank.”*

- Status: Label

  - Display the status of redeem

  - There are two statuses: Available and Sold out

  - Only display on Edit redeem view.

- Public to user: toggle on-off

  - Default: ON

- Add: button, click button, system will check:

  - Check if the Discount Code is unique. If it is duplicated with existing code in Discount code and redeem code, display an error message: “This code has already been created. Please change to another one”

  - If there are no errors found, create a new redeem with the status that is Available.

  - Navigate user to Redeem detail screen.

  - In edit screen, disable Redeem Code field, Percentage and Fixed Amount radio button, Percentage Off field, Maximum Amount field

  - ***Create a record in the audit trail with the information as described at ***[***AD00070***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=72:72)

  - ***Create a record in the audit trail with the information as described at ***[***AD00071***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=73:73)

- In edit screen, the system will check:

  - If Redeemed Quantities >= Allowed Quantities:

    - If yes: Update the status of redeem is Sold Out

## View Redeem Discount Code list

### User story

As an administrator, I want to view list of discount code so that I can manage them.

### GUI

### Acceptance criteria

- When user click on Discount code>  Discount screen (Discount code from Redeem), the discount code list will be displayed with the following information:

| **Column** | **Description** |
| --- | --- |
| Code | - Display the redeem code that user claimed |
| Email | - Display user’s email<br>- If the text exceeds max of width, shown “...” at the end and provide mouse hover tooltip with the full email |
| Full Name | - Display user’s full name<br>- Format: Full Name = First Name + Last Name<br>- If the text exceeds max of width, shown “...” at the end and provide mouse hover tooltip with the full name. |
| Redeemed Date | - Display redeemed date of this discount code<br>- Format: mm/dd/yyyy hh:mm:ss |
| Expiry Date | - Display expiry date of this discount code<br>- Format: mm//dd/yyyy |
| Status | - Display the status of this discount code<br>- There are 3 discount code status:<br>  - Activated<br>  - Inactivated<br>  - Expired |

## Search in redeem discount code list

### User story

As an administrator, I want to search specific discount code so that I can find the discount code easily

### GUI

[View UI here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=14003-103794&t=zPAKZaBaZqTrfQXc-4)

### Acceptance criteria

On the Redeem Discount screen, allow user search and filters by column:

- Search box:

  - Redeem Code

- Filter by select:

  - Status: includes: Active, Inactive, Expiry

***Apply the standard Search & Filter rules as defined here: ***[***Search & Filter***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQAgn3NtlvTOTYWxZUHAZsmXAW-GAvebT6PHAfeJGShKWYw?e=E2gVFw&nav=eyJoIjoiMTQ5MDYwNzY3MyJ9)***   ***

## Configure ranking point

### User story

As an administrator, I want to configure points for ranking to evaluate user loyalty

### GUI

### Acceptance criteria

- When user click on Configuration tab, the configuration screen will be displayed with the following information:

- Gold: Text box - Required field

  - Default value: 1,000

  - Unit: Points

  - Only accept numeric integer characters

  - Format: comma (,) to separate thousands

  - Accepted range: [1;10000]. If user input value out of the range, display an error message: “Point must be between 1 and 10,000”

- Diamond: Text box – Required field

  - Default value: 2,000

  - Unit: Points

  - Only accept numeric integer characters

  - Format: comma (,) to separate thousands

  - Accepted range: [1;10000]. If user input value out of the range, display an error message: “Point must be between 1 and 10,000”

  - Diamond value > Gold value. If not, display an error message: “Diamond value must be greater than Gold value”

- Save: Button

If no error is found, save the updated information.

***Create a record in the audit trail with the information as described at ***[***AD00072***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=74:74)

## Automatically create a discount code when user confirm to redeem

### User story

As an administrator, I want to automatically create a discount code for user when user confirm to redeem

### GUI

### Acceptance criteria

- When user click on Claim button, the system creates a discount code for user as above:

- Percentage Discount:

| [Percentage Value] off                                 Max Amount: [Maximum Discount Amount] USD<br>Expired Date: Mmm/DD/YYYY |
| --- |
| [Redeem Code]                                            Copy Button |

- Fixed Amount Discount:

| [Discount Amount] off                                 Expired Date: Mmm/DD/YYYY |
| --- |
| [Redeem Code]                                            Copy Button |

Note:

- If admin don’t configurate Max Amount field and Expired Date field, hide these fields

- Expired Date = Discount creation date + Validity Period (Admin configurate in Odoo)

- When user clicks on Copy button, the discount code will be copied and display an alert:” Code Copied”

- Discount code will be generated based on the redeem code.

- Format: [Discount code_UserID_N]

- N count from 1.

## Handle expiry date of discount code of redeem

### User story

As an administrator, I want to automatically inactive discount code when it is expired

### Acceptance criteria

The system will run a cronjob at 00:00 AM (UTC+0) each date to check if all active discounts are expired or not (Current Date > Expiry Date). If yes, the system will execute:

- BO: Update the status of discount is Inactivated

- FO: Hide this discount code in My Discounts screen

## Configure welcome quest points

### User story

As an administrator, I want to configure points for welcome quest so that they can do quests and earn points.

### GUI

### Acceptance criteria

- When user click on Configuration tab, the configuration screen will be displayed the welcome points configure with the following information:

- The welcome point:

  - Default value: 2,000

  - Unit: Points

  - Only accept numeric integer characters

  - Format: comma (,) to separate thousands

  - Accepted range: [1;9999]. If user input value out of the range, display an error message: *“Welcome Point must be between 1 and 9999”*

- Save: button

  - If no error is found, save the updated information.

***Create a record in the audit trail with the information as described at ***[***AD00073***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=75:75)

## [BlindBox] View blindbox list

### User story

As an admin, I want to view blind box lists so that I can handle all the items in list.

### GUI

### Acceptance criteria

When user click Blindbox in the left menu >> tab Box List, navigate user to Blindbox list page with the following section:

- Button Add New Box:

  - Display **Add New Box **button to allow users to create a new box item, click this button to navigate user to create new item in box list (refer to user story **Create new item in box list**)

  - When a new item is added successfully, it appears at the bottom of the list, and its index increases by 1.

    - Format: Box [index]

    - Example: Box 1, Box 2, Box 3,...

  - If there are 9 items in the box list, disable this button.

- In view blindbox list, the user can only view, not editable.

- In each item, display 2 buttons: Delete and Edit:

  - Delete button: click this button -> open the confirmation popup:

    - Remove button:

      - Close the popup.

      - Remove the box item from the list.

      - Rearrange the remaining items in the box list to maintain order.

      - Update the API box list to reflect changes in both Mobile and Odoo systems.

    - Cancel button:

      - Close the popup.

      - Discard the action remove.

  - Edit button: click this button -> navigate user to corresponding page of each item.

- Sort by created date from oldest to nearest.

- In each box type, display the corresponding fields as below:

  - Type 1: Point Plus

    - Display the following fields:

      - Points

      - Account rank

        - These rank separates by “,” character

        - If this field is null, display “-” in the value field.

      - Box level

      - Reward type

  - Type 2: Discount code

    - Display the following fields:

      - Discount code

      - If the value of discount code is percentage value:

        - Percentage Off

        - Maximum amount

      - If the value of discount code is fixed amount value:

        - Fixed amount

      - Validity period:

        - If this field is null, display “-” in the value field.

      - Account rank

        - These rank separates by “,” character

        - If this field is null, display “-” in the value field.

      - Box level

      - Reward type

  - Type 3: Bonus points for the next quest

    - Display the following fields:

      - If the selected is bonus point for the next quest, display:

        - Bonus point for the next quest: [Points]

      - If the selected is bonus points for the specific quest, display:

        - Bonus point for the next specific quest: [Points]

        - Specific quest: [Quest ID - Quest name]

      - Account rank

        - These rank separates by “,” character

        - If this field is null, display “-” in the value field.

      - Box level

      - Reward type

  - Type 4: Secret

    - Display the following fields:

      - Type: display selected option in 2 options below:

        - Follow the default arrangement

        - Random from secret box list

      - Box level

      - Reward type

## [BlindBox] Create a new box item

### User story

As an admin, I want to create a new item in Blind box so that fill more rewards for users.

### GUI

View UI [here](https://www.figma.com/design/loDqIjF55W3uIIlMErXy81/WMT-Back-Office?node-id=128-19982&t=X362gWwscSAeUcSc-1)

### Acceptance criteria

When user click button Add new box in Box list screen, navigate user to the add new box screen with the following information:

- Box Level:

  - Required field

  - Dropdown list. Box levels of Box list include:

    - Common box

    - Special box

    - Rare box

    - Legendary box

  - Default: Common box

- Reward Type:

  - Required field

  - Dropdown list. Reward type list of Box list include:

    - Point Plus

    - Discount

    - Bonus points for the next quest

    - Secret

  - Default: Point plus

- When user select the rewards type, the corresponding field of each reward type will display as below:

1. **Point Plus**

- Points:

    - Unit: Points

    - Required field

    - Only accept numeric integer characters

    - Format: comma (,) to separate thousands

    - Accepted range: [1;9999]. If user input value out of the range, display an error message: “Point must be between 1 and 9999”

    - Placeholder: *Enter points*

- *Account Rank: Multi-Selection field – Required Field*

    - *Default: uncheck*

    - *Checkbox field*

    - *There are three options: Silver, Gold, Diamond*

  - *Description: *

    - *Textbox *

    - *Maximum character: 500 characters. If exceeds, display error message: "Description must not exceed 500 characters"*

    - *Required field*

1. **Discount**

- ***Discount code: ***

    - ***Textbox - Required field.   ***

    - ***Accept only Latin letters, numbers, underscore “_” and no space permitted. If not, show error: Accept only Latin letters, numbers, underscore “_” and no space permitted. ***

    - ***Convert characters input to Uppercase. ***

    - ***Max length: 15 characters.***

    - ***Placeholder: e.g. ‘510ZERO’***

    - ***The discount code has been unique. If it is duplicated with existing code in Odoo and We Master Trade system, display error message: “This code has already been created. Please change to another one”***

- ***Percentage:***

    - ***Radio button - Default selected ***

    - ***When selected, enable 2 input fields: Percentage Off & Maximum Amount. ***

    - ***Unselected when radio button Fixed Amount Discount is selected. ***

    - ***When being unselected, input fields Percentage Off & Maximum Amount will be disabled and data input will be deleted***

- ***Percentage Off: ***

    - ***Text box - Required field (after being enabled)   ***

    - ***Unit: %***

    - ***Enabled when Percentage radio button is selected. ***

    - ***Accept integer values only. ***

    - ***Value Range: 0 < Number input <= 100. If not, show error: Enter a number greater than 0 and less than or equal to 100. ***

    - Placeholder: *Enter percentage *

- ***Maximum Amount: ***

    - ***Enabled when Percentage Discount radio button is selected.   ***

    - ***Unit: USD***

    - ***Optional field***

    - ***Accept numerical values (integer & decimal numbers). ***

    - ***Value Range: 0 < Number input <= 100,000. If not, show error message: Enter a number greater than 0 and less than or equal to 100,000. ***

    - ***Format: comma (,) to separate thousands and 2 decimal places. Ex: 1,200.15***

    - Placeholder: *Enter maximum amount*

- ***Fixed Amount: ***

    - ***Radio button***

    - ***Default unselected. ***

    - ***When selected, enable the field Discount Amount. ***

    - ***Unselected when radio button Percentage is selected. ***

    - ***When being unselected, field Discount Amount will be disabled and data input will be deleted.***

- ***Discount Amount: Textbox – Required Field (after being enabled)***

    - ***Unit: USD   ***

    - ***Enabled when Fixed Amount radio button is selected. ***

    - ***Accept numerical values (integer & decimal numbers). ***

    - ***Value Range: 0 < Number input <= 100,000. If not, show error: Enter a number greater than 0 and less than or equal to 100,000. ***

    - ***Format: comma (,) to separate thousands and 2 decimal places. Ex: 1,200.15***

    - ***Placeholder: Enter discount amount    ***

- ***Validity period:***

    - ***Textbox – Optional Field  ***

    - ***Accept integer value only***

    - ***Placeholder: Enter validity period***

    - ***Format: comma (,) to separate thousands***

    - ***Default: Null – No limit time***

    - ***Value range: 0 < Number input < 1,000. If not, show error: Enter a number greater than 0 and less than or equal to 1,000***

    - ***Placeholder: Enter validity period    ***

- *Account Rank: Multi-Selection field – Required Field*

- *Default: uncheck*

- *Checkbox field*

- *There are three options: Silver, Gold, Diamond*

  - *Description: *

    - *Textbox *

    - *Maximum character: 500 characters. If exceeds, display error message: "Description must not exceed 500 characters"*

    - *Required field  *

1. Bonus points for the next quest

- Radio button: Choose 1 in 2 options as below:

  - Bonus points for the next quest approved. If user choose this option, display field:

    - Points:

      - Unit: Points

      - Required field

      - Only accept numeric integer characters

      - Format: comma (,) to separate thousands

      - Accepted range: [1;9999]. If user input value out of the range, display an error message: “Point must be between 1 and 9999”

  - Bonus points for the specific quest. If user choose this option, display fields:

    - Choose the quest:

      - Required field

      - Dropdown, single-select

      - Placeholder:* Choose the quest*

      - *When user click on this field, display the dropdown list:*

        - *Get all active quests in WMT system.   *

        - *Dropdown list display with format: “Quest ID – Quest title”   *

        - *User can choose another quest to change the selection.*

      - If "Bonus Points for the Specific Quest" is selected but no quest is chosen, display an error message "Please select a quest from the dropdown"

    - Points:

      - Unit: Points

      - Required field

      - Only accept numeric integer characters

      - Format: comma (,) to separate thousands

      - Accepted range: [1;9999]. If user input value out of the range, display an error message: “Point must be between 1 and 9999”

- Default: choose Bonus points for the next quest approved

- *Account Rank: Multi-Selection field – Required Field*

  - *Default: uncheck*

  - *Checkbox field*

  - *There are three options: Silver, Gold, Diamond*

- *Description: *

  - *Textbox *

  - *Maximum character: 500 characters. If exceeds, display error message: "Description must not exceed 500 characters"*

  - *Required field  *

1. Secret

- Type: Radio button

    - Choose 1 in 2 options as below:

      - Random from secret box list: choose random any box in Secret box list

      - Follow the default arrangement:

        - Choose a Secret Box in sequential order, starting from Box 1. If the user gets Box 1, they will receive Box 2 the next spin.

    - Default: Random from secret box list

  - *Account Rank: Multi-Selection field – Required Field*

    - *Default: uncheck*

    - *Checkbox field*

    - *There are three options: Silver, Gold, Diamond*

  - *Description: *

    - *Textbox *

    - *Maximum character: 500 characters. If exceeds, display error message: "Description must not exceed 500 characters". *

    - *Required field  *

- **Note: **

  - In case the user changes type of box, the previous action will be resettled.

    - **Example User Flow:**

      - **Step 1: User selects "Point Plus" and fills in the relevant fields.**

      - **Step 2:** User changes the type to "Discount."

    - **Result:**

      - All fields related to "Point Plus" are cleared.

      - Fields specific to "Discount" are displayed.

- Add: button

  - When user click on this button, system will check validation of filled information:

    - If user does not fill required fields, display error message: *“Please fill out this field”*

    - If pass validation:

      - Save the new box.

      - Navigate user to View Box list screen.

      - ***Create a record in the audit trail with the information as described at ***[***AD00074***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=76:76)

  - Note:

    - ***When admin choose Reward Type = Secret, auto select Box Level = Legendary***

    - ***When admin choose Box Level = Legendary, auto select Box type = Secret ***

    - ***If either Box Level = Legendary or Reward Type = Secret is selected,***  
***but the other field is not matched accordingly,***  
***→ Display error message: "The Box Level 'Legendary' only applies to the Secret reward type."***

## [BlindBox] View secret box list

### User story

As an admin, I want to view secret box lists so that I can manage secret rewards for users.

### GUI

View UI [here](https://www.figma.com/design/loDqIjF55W3uIIlMErXy81/WMT-Back-Office?node-id=89-2895&t=X362gWwscSAeUcSc-1)

### Acceptance criteria

When user click Blindbox in the left menu >> tab Secret configuration, navigate user to Secret list page with the following section:

- Button Add New Box:

  - Display **Add New Box **button to allow users to create a new secret item, click this button to navigate user to create new item in secret list (refer to user story **Create new item in secret list**)

  - When a new item is added successfully, it appears at the bottom of the list, and its index increases by 1.

    - Format: Opt [index]

    - Example: Opt 1, Opt 2, Opt 3, ...

- In view secret list, the user can only view, not editable.

- In each item, display 2 buttons: Delete and Edit:

  - Delete button: click this button -> open the confirmation popup:

    - Remove button:

      - Close the popup.

      - Remove the box item from the list.

      - Rearrange the remaining items in the box list to maintain order.

      - Update the API box list to reflect changes in both Mobile and Odoo systems.

    - Cancel button:

      - Close the popup.

      - Discard the action to remove.

    - User cannot delete all secret boxes. If the secret list only has 1 item, hide button delete.

  - Edit button: click this button -> navigate user to corresponding page of each item.

- Sort by created date from oldest to nearest.

- In each box type, display the corresponding fields as below:

  - **Type 1: Point Plus**

    - Display the following fields:

      - Points

      - Reward type

  - **Type 2: Discount code**

    - Display the following fields:

      - Discount code

      - If the value of discount code is percentage value:

        - Percentage Off

        - Maximum amount

      - If the value of discount code is fixed amount value:

        - Fixed amount

      - Validity period:

        - If this field is null, display “-” in the value field.

      - Reward type

  - **Type 3: Bonus points for the next quest**

    - Display the following fields:

      - If the selected is bonus point for the next quest, display:

        - Bonus point for the next quest: [Points]

      - If the selected is bonus points for the specific quest, display:

        - Bonus point for the next specific quest: [Points]

        - Specific quest: [Quest ID - Quest name]

      - Reward type

  - **Type 4: Custom**

    - Display the following fields:

      - Title

      - Description

## [BlindBox] Create a new item in Secret box

### User story

As an admin, I want to create a new item in Secret box so that I can update more in secret box.

### GUI

View UI [here](https://www.figma.com/design/loDqIjF55W3uIIlMErXy81/WMT-Back-Office?node-id=243-27590&t=X362gWwscSAeUcSc-1)

### Acceptance criteria

When user click button Add New Option in Secret configuration screen, navigate user to the add new option screen with the following information:

- Reward Type:

  - Required field

  - Dropdown list. Reward type list of Box list include:

    - Point Plus

    - Discount

    - Bonus points for the next quest

    - Custom

  - Default: Point plus

- When user select the rewards type, the corresponding field of each reward type will display as below:

**1. Point Plus**

- Points:

    - Unit: Points

    - Required field

    - Only accept numeric integer characters

    - Format: comma (,) to separate thousands

    - Accepted range: [1;9999]. If user input value out of the range, display an error message: “Point must be between 1 and 9999”

    - Placeholder: *Enter points*

**2. Discount**

- ***Discount code: ***

    - ***Textbox - Required field.   ***

    - ***Accept only Latin letters, numbers, underscore “_” and no space permitted. If not, show error: Accept only Latin letters, numbers, underscore “_” and no space permitted. ***

    - ***Convert characters input to Uppercase. ***

    - ***Max length: 15 characters.***

    - ***Placeholder: e.g. ‘510ZERO’***

    - ***The discount code has been unique. If it is duplicated with existing code in Odoo and We Master Trade system, display error message: “This code has already been created. Please change to another one”***

- ***Percentage:***

    - ***Radio button - Default selected ***

    - ***When selected, enable 2 input fields: Percentage Off & Maximum Amount. ***

    - ***Unselected when radio button Fixed Amount Discount is selected. ***

    - ***When being unselected, input fields Percentage Off & Maximum Amount will be disabled and data input will be deleted***

- ***Percentage Off: ***

    - ***Text box - Required field (after being enabled)   ***

    - ***Unit: %***

    - ***Enabled when Percentage radio button is selected. ***

    - ***Accept integer values only. ***

    - ***Value Range: 0 < Number input <= 100. If not, show error: Enter a number greater than 0 and less than or equal to 100. ***

    - Placeholder: *Enter percentage *

- ***Maximum Amount: ***

    - ***Enabled when Percentage Discount radio button is selected.   ***

    - ***Unit: USD***

    - ***Optional field***

    - ***Accept numerical values (integer & decimal numbers). ***

    - ***Value Range: 0 < Number input <= 100,000. If not, show error message: Enter a number greater than 0 and less than or equal to 100,000. ***

    - ***Format: comma (,) to separate thousands and 2 decimal places. Ex: 1,200.15***

    - Placeholder: *Enter maximum amount*

- ***Fixed Amount: ***

    - ***Radio button***

    - ***Default unselected. ***

    - ***When selected, enable the field Discount Amount. ***

    - ***Unselected when radio button Percentage is selected. ***

    - ***When being unselected, field Discount Amount will be disabled and data input will be deleted.***

- ***Discount Amount: Textbox – Required Field (after being enabled)***

    - ***Unit: USD   ***

    - ***Enabled when Fixed Amount radio button is selected. ***

    - ***Accept numerical values (integer & decimal numbers). ***

    - ***Value Range: 0 < Number input <= 100,000. If not, show error: Enter a number greater than 0 and less than or equal to 100,000. ***

    - ***Format: comma (,) to separate thousands and 2 decimal places. Ex: 1,200.15***

    - ***Placeholder: Enter discount amount    ***

- ***Validity period:***

    - ***Textbox – Optional Field  ***

    - ***Accept integer value only***

    - ***Placeholder: Enter validity period***

    - ***Format: comma (,) to separate thousands***

    - ***Default: Null – No limit time***

    - ***Value range: 0 < Number input < 1,000. If not, show error: Enter a number greater than 0 and less than or equal to 1,000***

    - ***Placeholder: Enter validity period    ***

**3. Bonus points for the next quest  **

- Radio button: Choose 1 in 2 options as below:

  - Bonus points for the next quest approved. If user choose this option, display field:

    - Points:

      - Unit: Points

      - Required field

      - Only accept numeric integer characters

      - Format: comma (,) to separate thousands

      - Accepted range: [1;9999]. If user input value out of the range, display an error message: “Point must be between 1 and 9999”

  - Bonus points for the specific quest. If user choose this option, display fields:

    - Choose the quest:

      - Required field

      - Dropdown, single-select

      - Placeholder:* Choose the quest*

      - *When user click on this field, display the dropdown list:*

        - *Get all active quests + email validation in WMT system.   *

        - *Dropdown list display with format: “Quest ID – Quest title”   *

        - *User can choose another quest to change the selection.*

      - If "Bonus Points for the Specific Quest" is selected but no quest is chosen, display an error message "Please select a quest from the dropdown"

    - Points:

      - Unit: Points

      - Required field

      - Only accept numeric integer characters

      - Format: comma (,) to separate thousands

      - Accepted range: [1;9999]. If user input value out of the range, display an error message: “Point must be between 1 and 9999”

- Default: choose Bonus points for the next quest approved

**4. Custom**

- **Title: **

    - **Text box: maximum 100 characters**

    - **Display an error message if the character count exceeds 100 or the field is left empty: “Title is required and must not exceed 100 characters”**

- **Description: **

    - **Text box: maximum 500 characters**

    - **Display an error message if the character count exceeds 500 or the field is left empty: “Description is required and must not exceed 500 characters”**

- **Note: **

  - In case the user changes type of box, the previous action will be resettled.

    - **Example User Flow:**

      - **Step 1: User selects "Point Plus" and fills in the relevant fields.**

      - **Step 2: User changes the type to "Discount."**

    - **Result:**

      - All fields related to "Point Plus" are cleared.

      - Fields specific to "Discount" are displayed.

- Add: button

  - When user click on this button, system will check validation of filled information:

    - If user does not fill required fields, display error message: *“Please fill out this field”*

    - If pass validation:

      - Save the new option in secret list.

      - Navigate user to View Secret list screen.

      - ***Create a record in the audit trail with the information as described at ***[***AD00076***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=77:77)

- User can click < button to navigate to view list, reset data if filled.

## [BlindBox] Edit item in Box list/Secret list

### User story

As an admin, I want to Edit items in the Secret box so that I can update more in the secret box.

### GUI

View UI [here](https://www.figma.com/design/loDqIjF55W3uIIlMErXy81/WMT-Back-Office?node-id=243-24000&t=X362gWwscSAeUcSc-1)

### Acceptance criteria

***When the user clicks the Edit button at each section box in Box list screen, navigate user to the corresponding box. In each reward, the user will be allowed to update some fields as below. ***

- ***Reward type is Points Plus:***

  - ***User can edit Point value, Account rank value, Description***

  - ***Validation fields as Create a new box. ***

- ***Reward type is Discount:***

  - ***User can edit Validity period and Account rank value, Description***

  - ***Validation fields as Create a new box.   ***

- ***Reward type is Bonus point for the next quest:***

  - ***User can edit to change radio button, Point value, selected quest, Account rank value, Description***

  - ***Validation fields as Create a new box.     ***

- ***Reward type is Secret: ***

  - ***User can edit to change radio button, Account rank value, Description***

  - ***Validation fields as Create a new box.    ***

***When the user clicks the Edit button at each section box in Secret list screen, navigate user to the corresponding box. In each reward, the user will be allowed to update some fields as below. ***

- ***Reward type of secret option is Points Plus:***

  - ***User can edit Point value***

  - ***Validation fields as Create a new box. ***

- ***Reward type of secret option is Discount:***

  - ***User can edit Validity period  ***

  - ***Validation fields as Create a new box.   ***

- ***Reward type of secret option is Bonus point for the next quest:***

  - ***User can edit to change radio button, Point value selected quest***

  - ***Validation fields as Create a new box.     ***

- ***Reward type of secret option is Custom:***

  - ***User can edit Title and Description.***

  - ***Validation fields as Create a new box.     ***

***When user change the data, click button Update, system will validate fields:***

- ***If pass validate: ***

- ***Update the data in the box.  ***

- When the admin updates in the back office (BO), if a user is spinning in the mobile app, it displays the error message: "Something went wrong with our system. Please reload and try again."

- If a user has already spun and received a reward, keep those rewards for them. The updated rewards will only apply to new users.

- ***Create a record in the audit trail with the information as described at ***[***AD00075***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=77:77)

- If not pass:

  - Display error message below error field.

## [BlindBox] View Rewards management

### User story

As an admin, I want to view rewards management to view all redeem from blindbox.

### GUI

View UI [here](https://www.figma.com/design/loDqIjF55W3uIIlMErXy81/WMT-Back-Office?node-id=317-28224&t=sL1czHIHqpon6nPH-1)

### Acceptance criteria

**Search and Filter:**

- ***On the Reward management screen, the search & filter section will be displayed with the following information:***

  - ***Search box: search by Full name, Email. Accept uppercase, lowercase, numeric characters and letters. Max length: 50. In the text input boxes: Search for records containing the input word, case insensitive, unsigned, and accented. For example: Enter full name: Luong Hanh => Find results with first and last name information containing the word Luong Hanh, case insensitive. Satisfactory results could be Luong Hanh, Tran Luong Hanh, Luong Hanh Thi.***

  - ***Status filter: filter by status. ***

    - ***Default value: All Statuses. There are 4 items: All Statuses, Available, Used, Expired. ***

    - ***Admin can select multi-options***

  - ***Received date filter: filter by received date. ***

    - ***Default value: all date.***

    - ***Click the calendar icon to open the range date picker. ***

    - ***Format: mm/dd/yyyy-mm/dd/yyyy***

  - ***Clear: button: On click to clear input data of search box and filter fields.***

- ***Display the result matching with the search & filter criteria.***

- ***If there is no result matching with the criteria, display “No data available”***

***Reward management***

- ***On reward management list, display the following information:***

| ***Field name*** | ***Field type*** | ***Description*** |
| --- | --- | --- |
| ***Reward ID*** | ***Label*** | ***Display the reward ID.***<br>***Format: R0000000N+1*** |
| ***Full Name*** | ***Label*** | ***Display the full name (First name + Last name).*** |
| ***Email*** | ***Label*** | ***Display the user’s email*** |
| ***Reward Type*** | ***Labe*** | ***Display the reward type***<br>***There are 4 types: ***<br>- ***Point Plus***<br>- ***Discount***<br>- ***Bonus points for the next quest***<br>- ***Secret*** |
| ***Reward Value*** | ***Label*** | ***Display the reward value. Each reward type will display the corresponding reward value. ***<br>1. ***Point Plus***<br>- ***Display: [Point] Points***<br>1. ***Discount***<br>- ***Display: [Discount code] - [Discount value] ***<br>  - ***For percentage amount: [Discount value] = [Percentage amount]%***<br>  - ***For fixed amount: [Discount value] = [Discount amount] USD***<br>1. ***Bonus points for the next quest***<br>- ***If bonus points for the next quest is Bonus points for the next quest approved: “[Bonus points for the next quest approved] - [Point] Points***<br>- ***If bonus points for the next quest is Bonus points for the specific quest: [Bonus points for the specific quest] - [Quest ID] - [Point] Points***<br>1. ***Secret***<br>- ***If secret is point plus: ***<br>  - ***Display: “Point Plus - [[Point] Points”***<br>- ***If secret is discount: ***<br>  - ***Display: [Discount code] - [Discount value] ***<br>    - ***For percentage amount: [Discount value] = “Discount code - [Percentage amount] %***<br>    - ***For fixed amount: [Discount value] = Discount code - [Discount amount] USD***<br>- ***If secret is Bonus Point for the next quest:***<br>- ***If bonus points for the next quest is Bonus points for the next quest approved: [Bonus points for the next quest approved] - [Point] Points***<br>- ***If bonus points for the next quest is Bonus points for the specific quest: [Bonus points for the specific quest] - [Quest ID]- [Point] Points***<br>- ***If secret is custom: ***<br>  - ***Display Title. *** |
| Received Date | ***Label*** | ***Display the received time when user get reward.***<br>***Format: mm/dd/yyyy, hh:mm:ss*** |
| Updated Date | ***Label*** | ***Display the updated time when have any changes of reward. ***<br>***Format: mm/dd/yyyy, hh:mm:ss*** |
| Use points to Spin | ***Label*** | ***If the reward from free attempt, keep it null***<br>***If the reward from use point to spin, display “Y” at this field. *** |
| Status | ***Label*** | ***- Display the status of each reward***<br>***- There are 3 types:***<br>***+ Available: default of all reward types (except Point Plus)***<br>***+ Used***<br>***+ Expired: only apply for Discount code*** |
|  |  |  |

- The reward list is sorted according to the Received Date (From Newest to Oldest)

- The Quests list is displayed 10 items per page

## [BlindBox] Update the reward status

### User story

As an admin, I want to update the status of reward in blindbox

### Acceptance criteria

Depend on the reward type to update in reward management list:

1. Point Plus:

- Automatically set to Used once the user receives the reward.

1. Discount code:

- Available: display when user get this discount code.

- Used: display when this discount code used in Paid transaction.

- Expired: display when this discount code expired.

1. Bonus Point for the Next Quest

- Available: display when user does not use yet.

- Used: Shown when the system awards the bonus points after a quest is approved.

1. Secret box:

- For the above reward types: handle like the normal box.

- For custom box: auto display status = Available.

## [BlindBox] Configuration probability for Free attempt

### User story

As an admin, I want to configure probability for free attempt of Blind box so that get the reward which I want.

### GUI

### Acceptance criteria

When user click the Probability tab in the Blind box menu, the configuration Probability for Free attempt will be display with the following information:

- The level of probability:

  - Common box:

    - Number, only accept integer

    - Default: 100

    - Unit: %

  - Special box

    - Number, only accept integer

    - Default: 0

    - Unit: %

  - Rare box

    - Number, only accept integer

    - Default: 0

    - Unit: %

  - Legendary box

    - Number, only accept integer

    - Default: 0

    - Unit: %

- Validation rule:

  - The sum of probabilities across all items must equal 100%. Display an error message if the total probability is less than or greater than 100%: “Total probability must equal 100%”

- *Save icon: ****button***

  - ***Hover in this icon, display tooltip: “Save manually”***

  - ***Click on this button, system will check:***

    - ***If user does not fill required fields, display an error message: “Invalid fields: [Field does not pass condition]”***

    - ***If there is no error found, save successfully. Hide save / discard icon.***

- ***Discard icon:  button***

  - ***Hover in this icon, display tooltip: “Discard changes”***

  - ***Click on this button, the system will execute:***

    - ***Reset all unsaved changes***

    - ***Hide save/discard icon.***

## [BlindBox] Configuration probability for Points attempt

### User story

As an admin, I want to configure probability for Free attempt of Blind box so that get the reward which I want.

### GUI

### Acceptance criteria

When user click the Probability tab in the Blind box menu, the configuration Probability for Points attempt will be display with the following information:

- The level of probability:

  - Common box:

    - Number, only accept integer

    - Default: 100

    - Unit: %

  - Special box

    - Number, only accept integer

    - Default: 0

    - Unit: %

  - Rare box

    - Number, only accept integer

    - Default: 0

    - Unit: %

  - Legendary box

    - Number, only accept integer

    - Default: 0

    - Unit: %

- Validation rule:

  - The sum of probabilities across all items must equal 100%. Display an error message if the total probability is less than or greater than 100%: “Total probability must equal 100%”

- *Save icon: ****button***

  - ***Hover in this icon, display tooltip: “Save manually”***

  - ***Click on this button, system will check:***

    - ***If user does not fill required fields, display an error message: “Invalid fields: [Field does not pass condition]”***

    - ***If there is no error found, save successfully. Hide save / discard icon.***

    - ***Create a record in the audit trail with the information as described at ***[***AD00082***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=83:83)

- ***Discard icon:  button***

  - ***Hover in this icon, display tooltip: “Discard changes”***

  - ***Click on this button, the system will execute:***

    - ***Reset all unsaved changes***

    - ***Hide save/discard icon.***

## [BlindBox] Configuration for General

### User story

As an admin, I want to configure the spin of Blind box so that my user gets the reward which I want.

### GUI

### Acceptance criteria

When user click the Spins configuration tab in the Blind box menu, the configuration for spin will be display with the following information:

- Maximum Spins Allowed per Day:

  - Text box

  - Number – only accepted integer

  - Optional field

  - Default: 10

  - Range accepted: [1; 100]. If out of range, display error message: “Maximum Spins accepted value between 1 and 100”

- Points for purchasing (points):

  - Text box

  - Number – only accepted integer

  - Required field

  - Defaults: 100

  - Range accepted: [1; 9999]. If out of range, display error message: “Points for purchasing accepted value between 1 and 9999”

- ***Save: Button***

  - ***If no error is found, save the updated information.***

  - ***Create a record in the audit trail with the information as described at ***[***AD00080***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=81:81)

## [BlindBox] Search & Filter in Rewards list

### User story

As an admin, I want to search specific reward information so that I can find the reward easily.

### GUI

[View UI here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=7546-83471&t=C7wyNgH975L5CHav-4)

### Acceptance criteria

On the reward screen, allow user search and filters by column:

- Search box:

  - Code

  - Full Name

  - Email

- Filter by select:

  - Reward Type

    - Includes: Point Plus, Discount, Bonus Point, Secret

  - Status

    - Includes: Available, Used, Expired

  - Use Points To Spin

    - Includes: Yes, No

- Filter by Date:

  - Received Date

***Apply the standard Search & Filter rules as defined here: ***[***Search & Filter***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQAgn3NtlvTOTYWxZUHAZsmXAW-GAvebT6PHAfeJGShKWYw?e=QVK6sw&nav=eyJoIjoiMTQ5MDYwNzY3MyJ9)***   ***

## [Profit trader quest] View profit trader quest

### User story

As an admin, I want to view the Profit Trader Quest list so that I can quickly check available quests.

### GUI

[View UI Figma here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=11971-39361&t=ejzAJa2ank2IxAIr-4)

[View UI Zeplin](https://zpl.io/gg9jxY0)

### Acceptance criteria

- When the admin clicks Quests → Profit Trader Quest, Then the system displays the Profit Trader Quest list with the following fields:

  - Quest ID: display profit request ID. Format: PTQ00001 (N from 1, 6 5 digits)

  - Title: display the title of the quest.

  - Status: Display the status of quest. There are 2 values: Active (green) and Inactive (red)

  - Created date: display the created date. Format: mmm dd, yyyy hh:mm:ss

  - Updated date: display the updated date. Format: mmm dd, yyyy hh:mm:ss. For a newly created quest (no updates yet), display Updated date = Created date.

  - Detail: When the admin clicks Detail on a record, the system navigates to the corresponding quest detail/edit screen.

- The list displays 20 items per page.

- The list is sorted by Updated date (descending) by default (newest to oldest).

- No Data: Display message “No results are matching with your filter criteria”

Refer to US: [***Search & Filter***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQAgn3NtlvTOTYWxZUHAZsmXAW-GAvebT6PHAfeJGShKWYw?e=QVK6sw&nav=eyJoIjoiMTQ5MDYwNzY3MyJ9)***   ***

## [Profit trader quest] Search & Filter profit trader quest list

### User story

As an admin, I want to search and filter Profit Trader Quests so that I can find a specific quest quickly.

### GUI

[View UI Figma here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=11971-39361&t=ejzAJa2ank2IxAIr-4)

[View UI Zeplin](https://zpl.io/gg9jxY0)

### Acceptance criteria

On the Profit Trader Quest list screen, allow searching/filtering by:

- Search box:

  - Quest ID

  - Title

- Filter by select:

  - Status: Inactive, Active

- Filter by Date range:

  - Created date

  - Updated date

***Apply the standard Search & Filter rules as defined here: ***[***Search & Filter***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQAgn3NtlvTOTYWxZUHAZsmXAW-GAvebT6PHAfeJGShKWYw?e=QVK6sw&nav=eyJoIjoiMTQ5MDYwNzY3MyJ9)***   ***

## [Profit trader quest] Add a new profit trader quest

### User story

As an admin, I want to create a new Profit Trader Quest so that it can be available to users.

### GUI

[View UI Figma here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=11971-39381&t=ejzAJa2ank2IxAIr-4)

[View UI Zeplin](https://zpl.io/AOALgop)

### Acceptance criteria

- When admin clicks on New button, add new Quest screen will be displayed with the following information:

  - Quest Title:

    - Text box - Required field

    - Max length: 200. If exceed, display an error message: “*Quest Title exceeds 200 characters*”

    - Placeholder: Enter title

  - Active: ***toggle on-off***

    - Default: ON (active)

  - *Platform: Dropdown list – Required field*

    - *There are some options as below:*

      - *Facebook*

      - *Instagram*

      - *YouTube*

      - *Telegram*

      - *Tiktok*

      - *Twitter*

      - *Discord*

      - *Other*

    - *Default: Other*

  - Required upload image: toggle on-off

    - Default: ON

  - Required enter link: toggle on-off

    - Default: ON

*=> Rule: The user must check at least one of the following boxes “Required upload image” or “Required enter link”. If user unchecked both of that field, display an error message: “At least required image or required link checked”*

  - *Description: *

    - *Text editor – Required Field*

    - *Placeholder: Enter description  *

    - *Max length: 2000. Exceed allowed range, display an error message: “Description cannot exceed 2000 characters”*

    - *Supported functions as below image: *

- ***Add: button, when the admin clicks Add:***

  - ***If validation fails, show inline error messages under the relevant fields.***

  - ***If validation passes: ***

    - ***Create the quest successfully.***

    - Add a new record to the Profit Trader Quest list.

    - Navigate to the Edit Quest screen for the newly created quest.

## [Profit trader quest] Edit a profit trader quest detail

### User story

As an admin, I want to edit an existing Profit Trader Quest so that I can update quest information when needed.

### GUI

[View UI Figma here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=11971-39381&t=ejzAJa2ank2IxAIr-4)

### Acceptance criteria

- When admin clicks on Detail button on the record at Profit trader quest management, Then the system displays the Edit Quest with the following information:

  - All fields are auto-filled with the current quest data

  - Quest Title:

    - Auto fill the current data.

    - Text box - Required field

    - Max length: 200. Exceed allowed length, display an error message: “*Quest Title exceed 200 characters*”

    - Placeholder: Enter title

  - Active: ***toggle on-off***

    - ***Auto fill the current data.  ***

  - *Platform: Dropdown list – Required field*

    - *Auto fill the current data.  *

    - *There are some options as above:*

      - *Facebook*

      - *Instagram*

      - *YouTube*

      - *Telegram*

      - *Tiktok*

      - *Twitter*

      - *Discord*

      - *Other*

    - *Default: Other*

  - Required upload image: toggle on-off

    - Auto fill the current data.

    - Default: ON

  - Required enter link: toggle on-off

    - Auto fill the current data.

    - Default: ON

*=> ****Note****: The user must check at least one of the following boxes “Required upload image” or “Required enter link”. If user unchecked both of that field, display an error message: “At least required image or required link checked”*

  - *Description: *

    - *Auto fill the current data.  *

    - *Text editor – Required Field*

    - *Placeholder: Enter description  *

    - *Max length: 2000. Exceed allowed range, display an error message: “Description cannot exceed 2000 characters”*

    - *Functions included:*

      - *Bold*

      - *Italic*

      - *Strikethrough*

      - *Text size*

      - *Text color*

      - *Link*

      - *Bulleted list*

- ***Save: button, only enable when no error FO found. Click on this button, system will check:***

  - ***If there are errors, display an error message below each field. ***

  - ***If no: ***

    - ***Update the quest successfully. ***

    - ***Navigate user to Edit quest view.***
