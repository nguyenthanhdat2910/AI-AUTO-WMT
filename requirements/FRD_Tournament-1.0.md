# FRD Tournament-1.0

***WMT DOCUMENTATION OF ***

***TOURNAMENTS – TRADING COMPETITION***

***Version 1.0***

***Revision Summary***

| ***Version*** | ***Comments*** | ***Author*** | ***Issue Date*** |
| --- | --- | --- | --- |
| ***1.0*** | ***Intial documents*** | ***Jen - Nữ Lê*** | ***5/5/2024*** |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |
|  |  |  |  |

***Distribution for Review/Approval***

| ***Name*** | ***Title & Company*** | ***Issue Version*** | ***Issue Date*** | ***Review Date*** | ***Approval Date*** |
| --- | --- | --- | --- | --- | --- |
|  |  |  |  |  |  |
|  |  |  |  |  |  |

# Objective

# Scope

# Current Processing

# Business Flow Diagram

- Sequence diagram of full tournament flow:  [View in tab Tournament](https://app.diagrams.net/#G1bXz0WxHaaQ_fN0BQdXmJw_wn3_XESGSO#%7B%22pageId%22%3A%22ODmqUrG5ajCI5seXQhOh%22%7D)

# Assumptions, Dependencies and Constraints

# Definitions, Acronyms, and Abbreviations

# Detailed Functional Descriptions

# FUNCTION FOR ADMIN

## View tournament list

### User story

As an admin, I want to view all tournaments so that I can manage them easily.

### GUI

[View UI Zeplin here](https://zpl.io/ZqPAZQq)

### Acceptance criteria

When user click tab Tournament >>Tournament management, the tournament list will display with the following information:

| **Field name** | **Field Type** | **Description** |
| --- | --- | --- |
| Tournament ID | Label | - Display tournament ID of this tournament.<br>- The system must auto-generate a unique Tournament ID after creation<br>- Format: TNM0000N (N+1) |
| Tournament Title | Label | - Display tournament title |
| Enroll By | Label | - Display the registration deadline of this tournament.<br>- Format: MMM DD, YYYY HH: MM: SS |
| Start time | Label | - Display the start time of this tournament.<br>- Format: MMM DD, YYYY HH: MM: SS |
| End Time | Label | - Display the end time of this tournament.<br>- Format: MMM DD, YYYY HH: MM: SS |
| Total Reward Users | Label | - Display the number of rewards. |
| Total Participants | Label | - Display the number of enrolled users.<br>- If this field is null, display “0” |
| ***Entry Fee (USD)*** | Label | - Display the entry fee of this tournament.<br>- If Fee is Free, display “0”<br>- Unit: USD |
| Created Date | Label | - Display the created date of this tournament<br>- Format: MMM DD, YYYY HH: MM: SS |
| ***Status*** | Label | - Display the status of this tournament.<br>- There are 4 statuses:<br>  - Upcoming<br>  - Registration Closed<br>  - In Progress<br>  - Result Review<br>  - Finished |
| ***Detail *** | Button | - Click this button to navigate user to the corresponding page. |

- The tournament list is sorted according to the Created date (from newest to oldest).

- Display 20 items per page.

## Tournament list – Search & Filter

### User story

***As an admin, I want to search and filter tournaments so that I can find the tournament easily.***

### GUI

[View UI here](https://zpl.io/ZqPAZQq)

### Acceptance criteria

***In the tournament list, display the following search and filter as below: ***

- ***Search fields: ***

  - ***Tournament ID***

  - ***Tournament Title***

- ***Filter by date: ***

  - ***Created Date***

- ***Filter by select: ***

  - ***Column status:  Registration Closed, Upcoming, In Progress, Result Review, Finished***

- ***Apply the standard Search & Filter rules as defined here: ***[***Search & Filter***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQAgn3NtlvTOTYWxZUHAZsmXAW-GAvebT6PHAfeJGShKWYw?e=4CI2Fv&nav=eyJoIjoiMTQ5MDYwNzY3MyJ9)

## Create a new tournament

### User story

As an admin, I want to create a new tournament so that I can organize the competition for all my customers in WMT.

### GUI

[View UI Zeplin here](https://zpl.io/y1JRNvJ)

## Acceptance criteria

When user click button Add New on Tournament management screen, display the following information:

| **Field name** | **Field Type** | **Required?** | **Description** |  |
| --- | --- | --- | --- | --- |
| Tournament information | Title | String | Yes | - Placeholder: Enter title<br>- Maximum lengths: 50. The user cannot enter more than 50 characters.<br>- If this field is null, display error message: “Please fill out this field” |
|  | Enroll by (UTC+0) | Datetime picker | Yes | - Last datetime by which users can enroll.<br>- Click this field to choose date and time ***(Component design based on Ant design). ***<br>  - User cannot choose datetime in the past at the time of tournament creation. If not pass, display error message: Enroll by must be in the future.<br>- Format: MMM DD, YYYY HH: MM:SS<br>- Placeholder: “Select Enroll by” |
|  | Start time (UTC+0) | Datetime picker | Yes | - When the tournament officially begins.<br>- Click this field to choose date and time. *(Component design based on Ant design).   *<br>  - Must be a future date/time. If not pass, display error message: “Start Time must be in the future.”<br>  - Must be after the **Enroll By** time (>). If not pass, display error message: Enroll By date must be earlier than the Start Time.<br>- Format: MMM DD, YYYY HH:MM:SS<br>- Placeholder: “Select Start Time” |
|  | End time (UTC+0) | Datetime picker | Yes | - When the tournament ends.<br>- Click this field to choose date and time. (Component design based on Ant design).<br>  - Must be later than Start Time (>). If not pass, display error message: End Time must be after Start Time.<br>- Format: MMM DD, YYYY HH: MM:SS<br>- Placeholder: “Select End Time” |
|  | Display in WMT | Toggle | - | - Display = ON, Hide = OFF.<br>- Only one tournament can have the Display on WMT checkbox set to ON at a time. So, after successfully creating a tournament with ON status, if any other tournaments are currently toggled ON, switch them to OFF.’<br>- Default: OFF |
|  | Personalize | Toggle | - | - ON = Tournament for the specific number of users.<br>- OFF = Tournament for all users.<br>- Default: OFF<br>- If the user toggles ON, display the Specific Email button on the right-top corner when saving this tournament (Edit view) and hide section Country allowed<br>- If the user toggles OFF, hide the Specific Emails button and display section Country Allowed |
| Account information | Platform | Dropdown | Yes | - Single-select<br>- Click this button, open the list of options as below: MT5, cTrader<br>- Default: MT5 |
| Account information | Type | Dropdown | Yes | - Single-select.<br>- Disable this field, auto select “General" option. |
|  | Package name | Textbox | Yes | - Text box<br>- Placeholder: Enter package name<br>- Maximum characters:100. User cannot enter over the max length. |
|  | Leverage | Dropdown | Yes | - Single selects<br>- Placeholder: “Select leverage”<br>- Click on display the list of leverage, refer to this [sheet](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/IQCwg8efYKzeR6JpPZ5WBQ7WAX_sfJWC6MpI4Vh62eM1BbQ?e=erwTao&nav=MTJfQTE6QzIzX3tERUZDMEE1Mi01NTlFLTQ2RjctQTk4Ni1BNkQ3RDY3NEM4Q0V9) to get leverage list. |
|  | Group | Dropdown | Yes | - Single selects.<br>- Placeholder: “Select Group”<br>- ***On click display the list of existing group names based on the selected platform (refer to BO > Package > View Group Name)***<br>  - ***Docs for group name of cTrader: ***[***here***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQCvihEiYboNTq-RgKlrgseLAa03a9e8yZm18mvWVpIKMsM?e=T2lFhl&nav=eyJoIjoiMTYwNTYxNjc4NyJ9)<br>  - ***Docs for group name of MT5: ***[***here***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQCvihEiYboNTq-RgKlrgseLAa03a9e8yZm18mvWVpIKMsM?e=T2lFhl&nav=eyJoIjoiMTYwNTYxNjc4NyJ9) |
|  | Initial Balance | String | Yes | - Placeholder: Enter initial balance.<br>- 1 <= Initial Balance <= 10 000 000 000, if Initial Balance value is out of this range, display error message "Initial Balance value must be between 1 and 10 000 000 000"<br>- Only accept integer numbers. Use comma (,) separator (1,300) |
|  | Max Daily Loss | ***Radio button*** | - | - ***Radio button: there are 2 options Certain amount and Ratio of initial balance.***<br>- ***Default value: Certain amount is checked.***<br>- Max Daily Loss: textbox. This field is displayed if the Max Daily Loss type is Certain amount.<br>  - Placeholder “Enter max daily loss”<br>  - 1 <= Max Daily Loss <= 10 000 000 000, if Max Daily Loss value is out of this range, display error message "Max Daily Loss value must be between 1 and 10 000 000 000"<br>  - Only accept numeric, use comma (,) separator (1,300), take 2 numbers after the decimal.<br>- Max Daily Loss: textbox. This field is displayed if the Max Daily Loss type is Ratio of initial balance.<br>  - 0 <= Max Daily Loss <= 100, if Max Daily Loss value is out of this range, display error message "Max Daily Loss value must be between 0 and 100"<br>  - Display "%" after the textbox<br>- Max Daily Loss Amount: read-only field<br>  - If Certain amount radio button is checked: Max Daily Loss Amount will be taken as the value entered in the textbox.<br>  - If the Ratio of initial balance radio button is checked: Max Daily Loss amount = (The value entered in the textbox % * Initial Balance)<br>  - Automatically rounded to 2 decimal places<br>  - Automatically add “USD” after value when admin enters value to the Max Daily Loss field. |
|  | ***Max Total Loss*** | ***Radio button*** | - | - ***Radio button: there are 2 options Certain amount and Ratio of initial balance.***<br>- ***Default value: Certain amount is checked. ***<br>- Max Total Loss textbox. This field is displayed if the Max Total Loss type is Certain amount.<br>  - Hint text “Enter max total loss”<br>  - 1 <= Max Total Loss <= 10 000 000 000, if Max Total Loss value is out of this range, display error message "Max Total Loss value must be between 1 and 10 000 000 000"<br>  - Only accept numeric, use comma (,) separator (1,300), take 2 numbers after the decimal.<br>- Max Total Loss textbox: require field. This field is displayed if the Max Total Loss type is Ratio of initial balance<br>  - Hint text “Enter max total loss”<br>  - 0 <= Max Total Loss <= 100, if Max Total Loss value is out of this range, display error message "Max Total Loss value must be between 0 and 100"<br>  - Display "%" after the textbox<br>- Max Total Loss Amount: read-only field<br>  - If the Certain amount radio button is checked: Max Daily Total Amount will be taken as the value entered in the textbox.<br>  - If the Ratio of initial balance radio button is checked: Max Total Loss Amount = (The value entered in the textbox % * Initial Balance)<br>  - Automatically rounded to 2 decimal places<br>  - Automatically add “USD” after value when admin enters value to the Max Total Loss field. |
|  | ***Profit consistency*** | ***Textbox*** |  | - ***Hint text “Enter profit consistency”***<br>  - ***0 < Profit Consistency <= 100, if Profit consistency value is out of this range, display error message "Profit consistency value must be greater than 0 and up to 100."***<br>  - ***Display "%" after the textbox***<br>  - ***Only accept numeric, use comma (,) separator (1,300), take 2 numbers after the decimal.*** |
| Tournament Fee | ***Fee*** | ***Toggle*** | Yes | - ***In this version 1.0, toggle will be always OFF and disable this toggle*** |
|  | ***Original Fee*** | ***Number*** | Yes | - ***Placeholder: Enter Original Fee ***<br>- ***Unit: USD***<br>- ***Only accept numeric, use comma (,) separator (1,300), take 2 numbers after the decimal.   ***<br>- ***1 <= Original Fee <= 10 000 000 000, if Original Fee value is out of this range, display error message "Original Fee value must be between 1 and 10 000 000 000"   *** |
| Trading rule | ***Trading rule*** | ***Editor*** | Yes | - ***Max length: 10,000 characters. ***<br>- ***Function included:***<br>  - ***Bold***<br>  - ***Italic***<br>  - ***Underline***<br>  - ***Bullet/numbered lists***<br>  - ***Insert link***<br>  - ***Add headings***<br>  - ***Text colors***<br>  - ***Text size*** |
| Prize Pool | ***Add prize*** | ***Button*** | Yes | ***-  Click this button, system will show popup Add prize (refer to user story ***[***Add prize***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQC73xmgz0jvRr15nYJpHIvOAXOIqdwbAn3m8kJ2x04retI?e=URW0b4&nav=eyJoIjoiMTcxMzEyMDc1NiJ9)***)*** |
|  | ***Prize list*** | ***Table*** | - | ***- Admin can view prize pool list, refer to user story View prize pool list)*** |
| Specific email | ***Specific     email *** | ***Button    *** | - | - ***When admin clicks on Specific email button on the Add new/Edit Package screen, the Specific email screen will be displayed (refer to user story Add/Edit a tournament – View list of specific users)***<br>- ***Only display this button when the field Personalize toggle is ON. *** |
| Country | ***Country*** |  |  | - ***Refer to user story ***[***Config country***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQC73xmgz0jvRr15nYJpHIvOAXOIqdwbAn3m8kJ2x04retI?e=1nEvNC&nav=eyJoIjoiMTI0OTA2NTkxMSJ9) |
| ADD | ***Add*** | ***Button*** | - | ***Only enable this button when required fields are filled. ***<br>***When user click this button, the system will check:***<br>- ***If field Personalize is toggle ON, but no email is added in Specific email, display error message: “You are currently chosen display this tournament for personalize, so add email in Specific email”***<br>- ***If no prize is added, display error message: “Please add prize for this tournament”***<br>- ***If no error is found, display popup: ***<br>- ***Cancel: Discard the tournament creating, close popup.   ***<br>- ***Add: click this button, system will: ***<br>  - ***Save the new tournament with status = Upcoming ***<br>  - ***Navigate to the Edit view of this tournament.***<br>  - ***Only one tournament can have the 'Display on WMT' toggle set to ON at any given time. If the current tournament is toggled ON, the system must automatically toggle OFF the 'Display on WMT' field for any other tournament that is currently active. *** |

## Add/Edit a tournament – Add prize

### User story

As an admin, I want to add a prize for the tournament so that I can get a gift for the winners.

### GUI

[View UI Zeplin here](https://zpl.io/0PMOKQE)

### Acceptance criteria

***When user click this button, open popup Add new prize as below: ***

- ***When user click this button, open popup Add new prize as below: ***

- ***Text hint: ***

- ***Placeholder: “Enter text hint”***

- ***Maximum length: 50 ***

- ***Type: string***

- ***Required field. If this field is null, display error message “Please fill out this field”***

- ***Prize amount (USD):***

  - ***Unit: USD ***

  - ***Only accept numeric, use comma (,) separator (1,300), take 2 numbers after the decimal.***

  - ***1 <=Amount <= 10 000 000 000, if Prize amount value is out of this range, display error message "Prize amount value must be between 1 and 10 000 000 000"***

  - ***Placeholder: “Enter prize amount”***

- ***Gift Package: ***

***There are 2 options for package: MT5 (auto-selected) and cTrader (disable). ***

  - ***When admin select MT5 in radio button, the select dropdown list will get the package instant from MT5: ***

    - ***Active package ***

    - ***Reward tournament is checked (refer to US: Add a new tournament package for both MT5)***

  - ***When admin select cTrader in radio button, the select dropdown list will get the package instant from cTrader: ***

    - ***Active package ***

    - ***Reward tournament is checked***

  - ***Format of option: [Package ID – Package name]***

  - ***Placeholder: Select gift package.***

- ***Add: button, only display when required field is filled. When click Add-> system check:***

  - ***If both 2 fields (Prize Amount & Gift package) are null, display error message in 2 field: “Please choose at least one prize: Prize Amount or Gift Package.” ***

  - ***If no error is found:***

    - ***Save the new prize in the Prize list. ***

    - ***Close popup.***

- ***Cancel: button, click to close popup and discard the create action.***

## Add/Edit a tournament – View prize list

### User story

As an admin, I want to view prize list which I created for the tournament

### GUI

[View UI Zeplin here](https://zpl.io/y1JRNvJ)

### Acceptance criteria

- ***When there is no prize, the prize table must be hidden.***

- ***The prize list displays these fields: ***

  - ***Prize:***

    - ***Display prize rank (e.g., 1, 2, 3...) based on sort order (lowest → highest).***

    - ***Sorting happens automatically on render.***

  - ***Text hint: display the text hint of prize***

  - ***Prize amount (USD): ***

    - ***Display the prize amount. ***

    - ***Display “-” if this field is null. ***

  - ***Gift package ID: ***

    - ***Display the selected package ID. ***

    - ***Format: Platform - Package ID – Package Name***

    - ***Display “-” if this field is null.***

- ***When a new prize is added, it is displayed at the end of the list.***

- ***Display 10 items per page.***

## Add/Edit a tournament – Delete prize item in Prize list

### User story

As an admin, I want to delete prize so that set up a new prize.

### GUI

[View UI Zeplin here](https://zpl.io/ez1xZEY)

### Acceptance criteria

- ***When user click button Delete, the system open Popup confirm: ***

- ***Text: “Are you sure you want to delete this prize?” ***

- ***Cancel button: the admin clicks on this button to discard the action of remove***

- ***Delete button: the admin clicks on this button to confirm the action of removing this prize. After the user is removed from the prize list successfully, toast a message with content: “User has been removed from prize list successfully!”***

  - ***The remaining prizes are re-sorted based on an updated ordinal.***

## Edit a tournament – Add specific user

### User story

As an admin, I want to add a user into a tournament by user email so that this package will be displayed on those users.

### GUI

[View UI Zeplin here](https://zpl.io/6JQWqdj)

### Acceptance criteria

***- On the View Specific email screen, admin adds a new user to the list by click button Add, click this button to open popup with the following information: ***

- ***User Email: textbox – required field:  ***

  - ***Hint text: “Enter user email” ***

  - ***Accept email format. If admin enters invalid email format, display error text: “Incorrect email format, make sure you entered correctly” ***

  - ***Max length: 50. Exceeds allowed length, displays error message: “Email must not be more than 50 characters"***

  - ***If this field is null, display error message: “Please fill out this field”   ***

- ***Cancel: close the popup and discard the action by adding. ***

- ***Add button: display when email is filled (not count space). When user clicks on this button, the system will check:  ***

  - ***If this user email already exists in the Specific email list, display error message: “This email address already exists”  ***

  - ***If this user email does not exist in WMT system, display error message: “This email does not exist in WMT system”  ***

  - ***If no error occurs, the system will:  ***

    - ***Add the new user in the Specific email list.***

## Edit a tournament – View list of specific users

### User story

As an admin, I want to view the user list of the tournament so that I can manage them.

### GUI

[View UI Zeplin here](https://zpl.io/1MeLPGw)

### Acceptance criteria

- ***When admin clicks on Specific Email button on the Edit tournament screen, the Specific Email list screen will be displayed with the following information:***

  - ***Total of added email: display the total added email on the header of screen. ***

  - ***User email: display user email.***

  - ***Full name: display full name of user***

  - ***Delete: button: click to open confirmation popup. ***

  - ***Text: “Are you sure you want to remove this user?”***

  - ***Cancel button: the admin clicks on this button to discard the action of remove user***

  - ***Delete button, click this button, system check: ***

    - ***If this user has joined this tournament, display error message: “This user has joined the tournament and cannot be removed by the admin.”***

    - ***If no error is found, confirm the action of removing user from this tournament. After the user is removed successfully, toast a message with content: “User has been removed from tournament successfully!”***

- ***The user email list is sorted according to created date***

- ***If there are no available user email, display text: “There are no available user email”***

- ***Display 20 items per page.***

## Add/Edit a tournament – Configure country

### User story

As an admin, I want to configure a country for each tournament so that it only displays these countries.

### GUI

[View UI Zeplin here](https://zpl.io/y1JRNvJ)

### Acceptance criteria

Section Country allowed only display when toggle Personalize is OFF.

This section display:

- 3 options for country type:

  - ***All countries: radio button - default***

    - ***Selecting this option means the tournament is available in all countries and displays for all users.***

- ***All countries, except: radio button***

  - ***Selecting this option means the tournament is available in all countries except those in the exception list (these users will not see this tournament)***

  - ***When selected:***

      - ***Display the Add button opens the “Add Country” popup (refer to user story: Add new country for Tournament)***

      - ***If admin clicks the Add button (bottom of the form) without  adding any country → show error message: “Please add the country” below this section.***

- ***No countries, except: radio button***

  - ***Selecting this option means the tournament is only available for countries in the exception list.***

  - ***When selected:***

    - ***Display the Add button opens the “Add Country” popup (refer to user story: Add new country for Tournament).***

        - ***If no country is added, the tournament will not be available in any country. This is still considered a valid configuration → No error message is required.***

- ***Default: All Countries***

- ***Add button: on click, system will check all required fields:***

  - ***When adding the package, if the selected option requires at least one country but none is added, display “Please add the country”.***

- ***In the Country Allowed section, display the list of configured countries that the admin has added:***

  - ***Country Name: Display the country name***

  - ***Delete button: On click, display the Delete Country confirmation pop-up (Refer US:  Delete country)   ***

- ***The configure country list is sorted by Country Name (A to Z).***

- ***If the list contains more than 10 records, display a vertical scroll bar.***

## Add/Edit a tournament – Add new country for Tournament

### User story

As an admin, I want to see “Add Country” pop-up when specific radio options are selected so that I can add countries to the exception list for tournament usage rules.

### GUI

[View UI Zeplin here](https://zpl.io/y1JRNvJ)

### Acceptance criteria

- ***In the Country Allowed section, when the admin clicks on the Add button, display the “Add Country” pop-up:***

  - ***Title: “Add Country”***

  - ***Choose Country: Dropdown list***

    - ***On click, display the list of countries.***

    - ***If the selected country already exists in the list, display the message: “Country existed”.***

    - ***Cancel: button: On click, close the pop-up without saving.***

    - ***Confirm: button: On click, the system will:***

      - ***Add the selected country to the country list.***

      - ***Display a toast message: “The country has been added successfully!”***

## Add/Edit a tournament – Delete configured country

### User story

As an admin, I want to delete configured country from the list of configured countries in the Country Allowed section

### GUI

[View UI Zeplin here](https://zpl.io/y1JRNvJ)

### Acceptance criteria

- ***In the Country Allowed section, display delete button:***

  - ***Delete button: On click, display the Delete Country confirmation pop-up:***

    - ***Title: “Delete Country”***

    - ***Content: “Are you sure you want to delete this country?”***

    - ***Cancel: button: On click, close the pop-up without deleting.***

    - ***Confirm: button: On click, the system will:***

      - ***Remove the selected country from the configured country list.***

      - ***Display a toast message: “The country has been deleted”.***

## Edit tournament – General tab

### User story

As an admin, I want to edit tournaments so that I can config some information of tournaments.

### GUI

[View UI Figma heregma](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=19102-267483&t=HS8FWo962XHXorWJ-4)

### Acceptance criteria

In Edit tournament screen, display 3 tabs:

- General: Tab 1 - display the tournament information.

  - In this tab, display all field of creating new tournament, but add more one field below:

    - Status: display tournament status, there are 5 statuses:

      - Upcoming: Current Time < Start Time

      - Registration Closed: Enroll By < Current time < Start Time

      - InProgress: Start Time ≤ Current Time ≤ End Time

      - Result review: Current Time > End Time

      - Finished: after admin published the tournament results.

    - In the general tab for Edit view, display field Participants:

      - Only-view field

      - Count the number of competitors (who pass all quests and get trading accounts for tournaments.

      - If there are no competitors, display “0”

  - Based on each tournament status, user can edit the following fields:

    - Status = Upcoming:

      - All fields are editable

      - Note: Do not validate unmodified fields

    - Status = Registration Closed:

      - All fields are editable

      - Note: Do not validate unmodified fields

    - Status = InProgress: the following fields may be not edited:

      - Start time

      - Entry fee

      - Enroll by

      - Account information section:

        - Platform

        - Type

        - Package name

        - Leverage

        - Group

        - Initial Balance

        - Max Daily Loss

        - Max Total Loss

        - Profit consistency

      - Specific email (cannot delete and add new email)

      - Country allowed

      - Toggle Personalize:

        - If the user toggles ON, display the Specific Email button on the right-top corner when saving this tournament (Edit view) and hide section Country allowed

        - If the user toggles OFF, hide the Specific Emails button and display section Country Allowed

    - Status = Finished, Results Review:

      - View-only mode for all fields.

  - Specific email: button -> click to navigate to Edit tournament – View specific email list (only display this button when Personalize is toggle ON)

  - Save: button, click this button to update the new changes. Validate for all fields as create new tournament.

    - In case user change from ON to OFF for field Personalize, hide button Specific email and keep the list email after saving successfully.

- Tournament history: Tab 2 - display tournament history (refer to user story [Tournament history management](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/EbvfGaDPSO9GvXmdgmkci84Bc4ip3BsCfebyQnbHTit60g?e=WDSVl5&nav=eyJoIjoiMTY3ODkxMzE5NyJ9))

- Tournament result: Tab 3 - display the tournament results (refer to user story Tournament results) - only display for status InProgress, Results Review and Finished

## View Tournament detail - Tournament History

### User story

As an admin, I want to view tournament history so that I can follow the progress of the tournament.

### GUI

[View UI Zeplin here](https://zpl.io/wynlvoJ)

### Acceptance criteria

When user click tab Tournament >>Tournament management, the tournament list will display with the following information:

| **Field name** | **Field Type** | **Description** |
| --- | --- | --- |
| No. | Label | - Display the sequential number of each user.<br>- Sequential index starting from 1, incrementing by 1 for each visible row. |
| Full Name | Label | - Display user full name<br>- Format: First name + Lastname |
| Email | Label | - Display user email. |
| Registration Date | Label | - Display the registration date successfully. |
| Completed Quest? | Label | - Display the status of the tournament quest for this user.<br>- When the user is approved of all quests for this tournament, mark this user Completed Quest = Yes.<br>- If not, mark them to Completed Quest = No |
| Trading account | Label | - Display the trading ID of this user for this tournament.<br>- If this field is null, display “-” |

- The tournament list is sorted according to the Registration date (from newest to oldest).

- Display 20 items per page.

## Tournament History – Search & Filter

### User story

As an admin, I want to search tournament history so that I can find out easily.

### GUI

[View UI Zeplin here](https://zpl.io/wynlvoJ)

### Acceptance criteria

***On the Tournament detail >> Tournament history tab, apply search and filer for: ***

- ***Search box: ***

  - ***Full Name***

  - ***Email  ***

- ***Filter by Select: ***

  - ***Completed Quest? field***

    - ***There are 2 options: Yes (Completed) and No (Incomplete)***

- ***Filter by date: ***

  - ***Registration Date***

- ***Apply the standard Search & Filter rules as defined here: ***[***Search & Filter***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQAgn3NtlvTOTYWxZUHAZsmXAW-GAvebT6PHAfeJGShKWYw?e=4CI2Fv&nav=eyJoIjoiMTQ5MDYwNzY3MyJ9)

## View Tournament detail - Tournament Results

### User story

As an admin, I want to view tournament history so that I can follow the progress of the tournament.

### GUI

[View UI Zeplin here](https://zpl.io/9Nl3rrl)

### Acceptance criteria

***The 3rd tab of Tournament detail is Tournament Results. Only display this tab when status of tournament is Progress, Review Results and Finished. ***

***List trading account have passed these criteria:***

- ***Pass trading objective (max daily loss, daily loss)***

- ***Status of trading account is not terminated***

- ***Closed Profit > 0 ***

- ***Display up to 50 trading accounts on the leaderboard. If fewer than 50 accounts are available, display them all.  ***

***The list includes the following fields:***

- Top: The results list is displayed based on the manual ranking order (Top column)

  - Rank 1 → N is displayed sequentially.

  - The admin can drag and drop rows to reorder the ranking.

  - Default value of Top is the same as System Rank

- Full Name: display full name of user

- Email: display email of user

- Country: display country of user joins this tournament

- Trading Account: display trading account for this tournament

- Profit (USD): display closed profits of trading account (fetch every 1h)

- System Rank

  - The System Rank is automatically calculated by the system based on:

    - Profit (USD) – descending order

    - If profits are equal, the ranking is determined by  
 Profit Reach Time – ascending order (earlier time ranks higher).

- Profit Reach Time

  - Display the time when user reach that profit

  - Format: MMM DD, YYYY HH:MM:SS

- Publish: button, only display when this tournament status is Result Review. When clicking this button, open the popup (refer to user story View Tournament detail - Publish the tournament results)

- Published by [Full name of updater] - [Published datetime]: only display when the result of this tournament is published.

## View Tournament detail - Publish the tournament results

### User story

As an admin, I want to publish the tournament results so that the participants can view the results.

### GUI

[View UI Zeplin here](https://zpl.io/NEB3rr9)

### Acceptance criteria

When user click button Publish (refer to US: [View tournament results](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQC73xmgz0jvRr15nYJpHIvOAXOIqdwbAn3m8kJ2x04retI?e=ZQZzzJ&nav=eyJoIjoiMTUyOTcwMjE4NiJ9)), the system will display [popup as below](https://zpl.io/NEB3rr9):

- Title: Confirm the results of this tournament

- Description:

*“Once confirmed, the system will finalize the tournament results and distribute rewards to the ****Top [Top Prize] participants based on the final ranking.***

*The system will automatically: *

- *Add the gift amount to the user's withdrawable wallet balance. *

- *Create trading accounts for users who receive trading package rewards.*

*This action cannot be undone.*

* Are you sure you want to confirm the final results of this tournament?”*

*Top Prize: is the number of prizes added in Tournament detail – View prize list*

- *Cancel: button: click to discard the publish action*

- *Confirm results: button: click, the system will: *

  - ***Check If this tournament was published before, show popup with content “Data of this tournament has been changed. Please click OK to refresh page and update new data.” Admin clicks on OK button to refresh page -> Navigate to publish screen of this request.***

  - *If pass, the system will check: *

    - *For gift amount: *

      - *Transfer to Wallet – Withdrawable balance*

      - *Create a Wallet Transaction type as Tournament in Wallet Transaction (FO and BO) (Positive) as below: *

        - *Transaction ID: Format: WT000000000 (9 Digits) *

        - Related ID: Tournament ID (TNM0000N (5 digits).

        - Type of Transaction: Tournament

        - Description: “Gift Amount from [Tournament Title]”

        - Amount: + [Gift Amount]

    - For gift package:

      - Admin will add specific email to tournament package manually.

      - Call the API to create a trading account to users ranked in the Top Prize tier, along with their corresponding prize gift package.

      - Get the package information (in package list - selected package).

      - Call API Docuseal to send E-Contract:

        - For the docuseal of the tournament package, notice for these fields:

          - Transaction ID: keep it null

          - Date of Purchase package: Date of Purchase package: Use the date the DocuSeal is sent (the current date)

          - One-time fee: 0 USD

      - Create a trading account record in BO:

        - In the transaction information section, keep it null for these fields:

          - Transaction ID

          - Total amount

          - Paid date

          - Status

          - Payment option

          - Payment method

          - Equivalent amount

          - Payment invoice

      - Send email to the specific user: [E000037](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=RmM6Ow&nav=MTJfQzQxX3tDNkFCNzVDRi0yNEI3LTQ5N0MtQTQyNS1FMTc2MzA0QjRDNUV9)

    - Send email and notification:

      - If user only achieve trading account gift package:

        - Send email to user on TOP: Email [TN10](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/IQCwg8efYKzeR6JpPZ5WBQ7WAX_sfJWC6MpI4Vh62eM1BbQ?e=07d86x&nav=MTJfQTExOkIxMV97N0MzMDA4N0YtMUU0OS00QjNELTg5OUEtMDBFQzJFRUE2OUY2fQ)

        - Send notification: [TN12 – Get gift package](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/IQCwg8efYKzeR6JpPZ5WBQ7WAX_sfJWC6MpI4Vh62eM1BbQ?e=APR4PM&nav=MTJfQzE0X3s5NkYzRENEMC0xRjA4LTQxQzEtQTJERi05NDhDRUE3QTY3ODl9)

      - If user only achieve gift amount:

        - Send email to user on TOP: Email [TN7](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=HAFt4i&nav=MTJfQThfezdDMzAwODdGLTFFNDktNEIzRC04OTlBLTAwRUMyRUVBNjlGNn0)

      - Send notification: [TN11 - Get gift amount](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/IQCwg8efYKzeR6JpPZ5WBQ7WAX_sfJWC6MpI4Vh62eM1BbQ?e=2rDqcW&nav=MTJfQjEzX3s5NkYzRENEMC0xRjA4LTQxQzEtQTJERi05NDhDRUE3QTY3ODl9)

    - If user achieve both of gift package and gift amount:

      - Send email to user on TOP: Email TN11

      - Send notification: TN13 – [Get amount and package](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/IQCwg8efYKzeR6JpPZ5WBQ7WAX_sfJWC6MpI4Vh62eM1BbQ?e=GUiQ4v&nav=MTJfQjE1OkMxNV97OTZGM0RDRDAtMUYwOC00MUMxLUEyREYtOTQ4Q0VBN0E2Nzg5fQ)

    - Send email to user out of TOP:  Email [TN6](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=zAAdXE&nav=MTJfQTdfezdDMzAwODdGLTFFNDktNEIzRC04OTlBLTAwRUMyRUVBNjlGNn0)

  - Hide button Publish in BO >> Tournament results.

  - Change status of Tournament to Finished

  - Change UI to Finished status (refer to user story View tournament information – Finished)

## Add a new tournament package for both MT5 and cTrader

### User story

As an admin, I want to set up gift packages for the tournament prize.

### GUI

[UI for MT5](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=19627-14361&t=FcTZJl4X8hLSebcS-4)

[UI for cTrader](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=19915-21174&t=FcTZJl4X8hLSebcS-4)

### Acceptance criteria

This user story applies for MT5 and cTrader package.

In the Package > Create new package screen, display the field:

- Tournament package:

  - Field type: Toggle

    - ON status: this package belongs to tournament prize, do not display in Package Trading capital of WMT

    - OFF status: this package belongs to Package Trading capital of WMT

  - Default: OFF

  - When toggle is ON, the following fields are disabled:

    - Config country section.

    - Fee section.

    - Display In

  - When the box is OFF, these above fields are displayed again and automatically restored if the user had previously filled in values.

- All other package information, keep it in docs [Add new package.](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/EUPMHxDTxsFAstYM_sciQ6QBTmv3xOzHDKe0mai1EqpXog?e=IDPckX&nav=eyJoIjoiNzc1NjQxNDM5In0%3D)

- If all required fields are satisfied, the package will be saved to the system together with information then navigate an admin to the Edit Package screen. (refer to Package Management – Edit Package)

- If a package setup Tournament package, it is not displayed in FO >> Trading capital screen (it this package is Personalized, ignore this rule)

## Start the tournament

### User story

As an admin, I want to start the tournament so that my user can start their tournament

### Acceptance criteria

When the current time = start time, the system will execute:

- Get the number of users enrolled in the tournament + complete all quests.

- Get the trading information of this tournament included:

  - Initial balance

  - Max Daily Loss

  - Max Total Loss

  - Leverage

  - Type

  - Group

- Call API to trading service to create trading accounts for these users.

- Send email to user pass condition to create trading account:

  - Send email [***TN3***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=fwF4se&nav=MTJfQTRfezdDMzAwODdGLTFFNDktNEIzRC04OTlBLTAwRUMyRUVBNjlGNn0)*** ***

  - ***Send notification  ***[***TN6 - Create a trading account of tournament successfully***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=becnDb&nav=MTJfQzlfezk2RjNEQ0QwLTFGMDgtNDFDMS1BMkRGLTk0OENFQTdBNjc4OX0)

- Send email to user do not pass condition to create trading account:

  - Send notification [TN7](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=qMDUlZ&nav=MTJfQjEwX3s5NkYzRENEMC0xRjA4LTQxQzEtQTJERi05NDhDRUE3QTY3ODl9https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=qMDUlZ&nav=MTJfQjEwX3s5NkYzRENEMC0xRjA4LTQxQzEtQTJERi05NDhDRUE3QTY3ODl9)

  - Send email [TN9 - Tournament Requirements Not Met](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=0WgKWv&nav=MTJfQjEwX3s3QzMwMDg3Ri0xRTQ5LTRCM0QtODk5QS0wMEVDMkVFQTY5RjZ9)

- Change status of tournament to InProgress.

- Change UI to InProgress view (refer to user story View Tournament information – InProgress)

### Non-functional requirement:

- When API create failed, auto retry to create trading accounts.

## Finish the tournament

### User story

As an admin, I want to end the tournament so that my user can finish their tournament and get the rewards.

### Acceptance criteria

When the current time = end time, the system will execute:

- Closed all pending orders and open orders in MT5.

- Terminate all trading accounts of this tournament.

- Get profit (closed profit) from all trading accounts of this tournament.

- Ranking the leaderboard for the tournament.

  - Get leading board results if user pass conditions:

    - Pass all trading objectives (Max Daily Loss, Max Total Loss) if having (refer to user story Trading perfomance).

    - Profit (closed trade) > 0

    - Status of trading account is not Terminated

    - In case there are some trading accounts with the same profit, prioritize the one that reached earlier in the ranking.

    - Display up to 50 trading accounts on the leaderboard. If fewer than 50 accounts are available, display them all.

- Change status of tournament to Result Review.

- Change UI to Result Review view (refer to user story View tournament information – Review Results)

## [Tournament Quest Request] View tournament quest request

### User story

***As an administrator, I want to view Quest request list of tournaments so that I can manage progress of Quest submissions***

### GUI

[View UI Zeplin here](https://zpl.io/Edy3Lky)

### Acceptance criteria

***When user clicks on Tournament -> Tournament Quest Request, the quest request list will be displayed with the following information:***

| ***Column*** | ***Description*** |
| --- | --- |
| ***Request ID*** | - ***Display the quest request ID ***<br>- ***Format: TQ0000000N (With N from 1) (8 digits)*** |
| ***Title*** | - ***Display the Quest title***<br>- ***If the text exceeds max of width, shown “...” at the end and provide mouse hover tooltip with the full Quest title*** |
| ***Tournament ID*** | - ***Display tournament ID linked with this quest.*** |
| ***Email*** | - ***Display email of user.*** |
| ***Full Name*** | - ***Display full name of the requested user***<br>- ***Format: Full Name = First Name + Last Name***<br>- ***If the text exceeds max of width, shown “...” at the end and provide mouse hover tooltip with the full name*** |
| ***Submitted Date*** | - ***Display the submitted date of the quest request***<br>- ***Format: mm/dd/yyyy hh:mm:ss*** |
| ***Status*** | - ***Display the tournament quest request status ***<br>- ***There are 3 statuses:***<br>  - ***Pending***<br>  - ***Approved***<br>  - ***Rejected*** |
| ***Detail*** | - ***Click this button to navigate to detail page. *** |

- ***The quest request list is sorted according to the Submitted Date (From Newest to Oldest)***

- ***The quest request list displays 20 items per page.***

## [Tournament Quest Request] Search in tournament quest request list

### User story

***As an administrator, I want to search specific quest request from the quest requests list so that I can find the quest request easily   ***

### GUI

[View UI here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=20475-87785&t=TbnrWeOoT7kCe7Tw-4)

### Acceptance criteria

***On the Tournament Quest Requests screen, allow user search and filters by column:***

- ***Search box: ***

  - ***Request ID***

  - ***Tournament ID***

  - ***Title***

  - ***Email***

  - ***Full name***

- ***Filter by select: ***

  - ***Status: ***

    - ***Includes: Pending, Approved, and Rejected.***

- ***Filter by Date***

  - ***Submitted Date***

***Apply the standard Search & Filter rules as defined here: ***[***Search & Filter***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQAgn3NtlvTOTYWxZUHAZsmXAW-GAvebT6PHAfeJGShKWYw?e=QVK6sw&nav=eyJoIjoiMTQ5MDYwNzY3MyJ9)***    ***

## [Tournament Quest Request] View Quest request details

### User story

***As an administrator, I want to view the detailed information of a request so that I can understand the specifics of the request ***

### GUI

[View UI here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=20481-90371&t=TbnrWeOoT7kCe7Tw-4)

### Acceptance criteria

***- When user clicks on a quest request, navigate the user to the quest requests detail. This screen will be displayed with the following information:***

***Section 1: Quest information:***

- ***Request ID: Display the quest request ID ***

  - ***Format: TQ0000000N (With N from 1) (8 digits)***

- ***Quest ID: Display the Quest ID***

- ***Quest Title: Display the Quest title***

- ***Tournament ID: display tournament ID linked with this quest***

- ***Tournament title: display tournament title linked with this quest***

- ***Platform: Display the flatform of this Quest***

- ***Description: Display the Quest description  ***

- ***Full Name: Display Full Name of this quest request***

  - ***Format: Full Name = First Name + Last Name***

- ***Email: Display the user’s email***

- ***Status: Display the status of this quest request. There are 3 statuses: Pending, Approved, Rejected***

- ***Submitted Date: Display the submitted date of this quest request***

  - ***Format: mm/dd/yyyy hh:mm:ss***

- ***Updated Date: Display the updated date of this quest request***

  - ***Format: mm/dd/yyyy hh:mm:ss***

  - ***Only display this field when the status is Rejected of Approved***

- ***Updated By: Display the name’s updater of this quest request***

  - ***Only display this field when the status is Rejected of Approved***

- ***Rejected reason: Display the rejected reason of this request***

  - ***Only display this field when the status is “Rejected”  ***

***Section 2: Quest evidence***

- ***Evidence: Display the image link user uploaded***

  - ***Click on the image, open the image in popup (Enable navigation between items using 'Next' and 'Previous' controls.)***

  - ***Display ‘-’ if there is no value in this field***

- ***Related Link: Display the related link user entered***

  - ***Click on this link to open the related link in a new tab***

  - ***Display “-” if there is no value in this field***

***Section 3: Button action***

- ***Approved: button (Refer user story: Approve the quest request)***

  - ***Only display this field when the status is Pending***

- ***Rejected: button (Refer user story: Reject the quest request)***

  - ***Only display this field when the status is Pending***

## [Tournament Quest Request] Approve the quest request

### User story

***As an administrator, I want to approve a quest request for user***

### GUI

[View UI here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=20481-91188&t=TbnrWeOoT7kCe7Tw-4)

### Acceptance criteria

***- When user clicks on Approve button, a confirmation popup will be displayed as above:***

- ***Title: Approve quest request***

- ***Content: Are you sure you want to approve this Quest request?***

- ***Cancel: Button. Click on this button to discard the approve quest request and close the popup***

- ***Approve: Button. Click on this button, the system checks whether the status of request has been changed or not.***

  - ***If status of request has been changed, show popup with content “Data of this request has been changed. Please click OK to refresh page and update new data.” Admin clicks on OK button to refresh page -> Navigate to View request details screen of this request.***

  - ***Check the status of tournament related: if status of tournament belongs to {In progress, Review result, Finished) => display error message: “This quest request belongs to a tournament that has already started, so no further action can be performed.”***

  - ***If no error is found:***

    - ***Change the status of this quest request to Approved***

    - ***Display a toast message: “Approve the quest request successfully!” ***

    - ***Close this popup and hide button Approve and Reject at the Quest Request Details***

    - ***Send notification to user (ID TN3 - ***[***Approve the quest***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=RckC4z&nav=MTJfQzZfezk2RjNEQ0QwLTFGMDgtNDFDMS1BMkRGLTk0OENFQTdBNjc4OX0)***)***

    - ***Send email to user (ID TN5 - ***[***Your Tournament quest Has Been Approved***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=URDhbC&nav=MTJfQTZfezdDMzAwODdGLTFFNDktNEIzRC04OTlBLTAwRUMyRUVBNjlGNn0)***) ***

    - ***If this is the final quest in the tournament quest list, mark the user as having completed the tournament quest.***

      - ***Send notification TN5 - ***[***Approved all quests***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=DleVHt&nav=MTJfQzhfezk2RjNEQ0QwLTFGMDgtNDFDMS1BMkRGLTk0OENFQTdBNjc4OX0)***  ***

      - ***Send email TN2 - ***[***Annoucement to Account User that they pass all tournament quest***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/IQCwg8efYKzeR6JpPZ5WBQ7WAX_sfJWC6MpI4Vh62eM1BbQ?e=JMjWCa&nav=MTJfQTNfezdDMzAwODdGLTFFNDktNEIzRC04OTlBLTAwRUMyRUVBNjlGNn0)

    - ***Create a record in the audit trail with the information as described at ***[***AD00069***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=71:71)

## [Tournament Quest Request] Reject the quest request

### User story

***As an administrator, I want to reject a quest request because there may be some cheat or invalid evidence ***

### GUI

[View UI here](https://www.figma.com/design/fUZXGX8d0X2CkvF3tOComc/WMT---BO---New?node-id=20481-91482&t=TbnrWeOoT7kCe7Tw-4)

### Acceptance criteria

***- When user clicks on Reject button, a confirmation popup will be displayed as above:***

- ***Title: Reject quest request***

- ***Reason: Text box – Required Field***

  - ***Max length: 250 characters. The user cannot enter more than. If user enters more than 250 characters, display an error message: “You cannot more than 250 characters”***

- ***Cancel: Button. Click on this button to discard the reject quest request action and close the popup***

- ***Reject: Button. Only enable when the reason is filled. Click on this button, the system checks whether the status of request has been changed or not.***

  - ***If status of request has been changed, show popup with content “Data of this request has been changed. Please click OK to refresh page and update new data.” Admin clicks on OK button to refresh page -> Navigate to View request details screen of this request.***

  - ***Check the status of tournament related: if status of tournament belongs to {In progress, Review result, Finished) => display error message: “This quest request belongs to a tournament that has already started, so no further action can be performed.”***

  - ***If no error is found: ***

    - ***Change the status of this quest request to Rejected***

    - ***Update quest request to Rejected tab in Quest screen in Mobile ***

    - ***Display a toast message: “Reject the quest request successfully!”***

    - ***Send notification to user (TN4 - ***[***Reject the quest***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=1MdTL8&nav=MTJfQzdfezk2RjNEQ0QwLTFGMDgtNDFDMS1BMkRGLTk0OENFQTdBNjc4OX0)***)***

    - ***Send email to user (TN4 - ***[***Your Tournament quest Has Been Rejected***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=ZEu5LK&nav=MTJfQjVfezdDMzAwODdGLTFFNDktNEIzRC04OTlBLTAwRUMyRUVBNjlGNn0)***)***

    - ***Set quest to NEW so that user can submit the new quest submission (refer to user story ***[***View quest list***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQC73xmgz0jvRr15nYJpHIvOAXOIqdwbAn3m8kJ2x04retI?e=32GBWa&nav=eyJoIjoiNzQ2MDQxNzMyIn0)***)***

    - ***Close this popup and hide button Approve and Reject at the Quest Details***

    - ***Create a record in the audit trail with the information as described at ***[***AD00069***](https://docs.google.com/spreadsheets/d/1A3WX28JO764dT4y-CDT6dajmfvm7EWGQdjG4Nmw_sys/edit?gid=0#gid=0&range=71:71)

# FUNCTION FOR CUSTOMER

## View tournament information – Upcoming

### User story

As a user, I want to view upcoming tournament information, so that I can decide whether to join the exciting WMT competition.

### GUI

[View UI Zeplin here](https://zpl.io/Edy3Lky)

### Acceptance criteria

In the left menu, click Tournament -> display Tournament screen.

The tournament with Display on WMT = TRUE will be shown in the WMT.

- If the tournament is set as personalized (add email personalize), only those users can view the tournament on WMT

- If a tournament is restricted to specific countries, it will only be visible to users whose profile country matches one of the allowed countries (Refer to user story Config country for tournament)

The tournament screen will display the following information:

- **Section 1: Banner tournament**

  - Title: display the tournament title

  - Start time:

    - Display the start time.

    - Format: MMM dd, yyyy HH:mm:ss (UTC+3)

    - Convert and display the date of the UTC time.

  - Participants: set env for the first version is 100 (only UI, not impacting the real number of participants).

  - Fee:

    - Display the original fee; the original fee should be shown with a strikethrough style.

    - Display the actual fee.

    - When toggle Fee is OFF, display “$0”

    - Format: $[Fee]

  - Countdown to start time:

    - Display a real-time countdown timer that shows the time remaining until the tournament starts.

    - Format: DD:HH:MM:SS (Days, Hours, Minutes, Seconds)

    - When countdown reaches 00:00:00:00, replace it with countdown to end time (refer to user story View tournament information – InProgress)

  - Join Now: button

    - Click this button, refer to user story Join a tournament

    - In case, user does not join the tournament and status of the Tournament is Registration Closed, disable the button **Join Now.**

  - Registration time:

    - Display the enroll by time

    - Format example: “Registration ends on July 14th, 2025 | 18:00”

    - If end up the registration time (status is Registration Closed), change text from *“Registration ends on ...”* to *“Tournament registration is now closed.”  *

- **Section 2: Tournament Prize**

  - Display all tournament prizes as configured in the Back Office (BO) - Sort by rank ASC (1 → n) (refer to US View prize list)

  - The Top 3 prizes should be displayed using distinct cards with corresponding rank colors:

🥇 1st Place – Gold

🥈 2nd Place – Silver

🥉 3rd Place – Bronze

  - The remaining prizes will rank in prize list.

  - In each prize, display:

    - The rank of prize:

      - Format: 1st Place, 2nd Place, ...

    - The text hint of each prize

- **Section 3: Tournament rules **

  - Display the trading rules content (Config in BO | Trading rules)

  - If the content exceeds 30 lines, enable a scrollable container to limit the visible height.

- **Section 4: Tournament quest** (refer to user story View quest list)

  - Only display when users are enrolled in this tournament ([UI here](https://zpl.io/NEB3ek4))

If no tournament is set to display, show this below screen [here](https://zpl.io/KE43ekq)

## Join a tournament

### User story

As a user, I want to join a tournament so that I can start them to get rewards.

### GUI

[View UI Zeplin here](https://zpl.io/LLB3JjB)

### Acceptance criteria

In tournament status = Upcoming, display button **Join now, click this button -> open popup confirm as below:**

- The popup **Confirm tournament** display the following information:

  - Tournament title

  - Start time

  - End time

  - Trading rules: display trading rule, if the content exceeds 10 lines, enable a scrollable container to limit the visible height.

  - Checkbox:** I have read and agree with the tournament rules.**

    - **Default: uncheck**

  - Cancel: button

    - Click to close popup

    - Discard the action joining the tournament.

  - Confirm: button, disable if checkbox Agree is not checked.

    - Click this button, the system will check:

      - If this tournament is Fee: navigate user to Checkout payment (this flow will be handled later)

      - If this tournament is Free:

        - Enrolled in this tournament for the user (Each user only join 1 time)

        - Display section Tournament quest in WMT (Refer to user story View quest list)

        - Send notification to user (TN1-[Enrolled](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=3FNzs5&nav=MTJfQjRfezk2RjNEQ0QwLTFGMDgtNDFDMS1BMkRGLTk0OENFQTdBNjc4OX0) tournament successfully)

        - Send email to the user (Email TN1 - [Annoucement to Account User Enroll Tournament Successfully](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=TR7Tag&nav=MTJfQjJfezdDMzAwODdGLTFFNDktNEIzRC04OTlBLTAwRUMyRUVBNjlGNn0))

        - Disable the button **Join Now**, change text of button to **Enrolled**

## View quest list

### User story

As a registered user, I want to view the quest details to read detail of quest to do it

## GUI

[View UI Zeplin here](https://zpl.io/vnyXwgn)

## Acceptance criteria

In Tournament mission (Quests) display a submit quest list:

- Display quests by created date (oldest to newest, from left to right)

- Get quest with status ACTIVE of this tournament. (Only get at the time after user enrolled the tournament, any update on quest will be not update)

- Each quest is shown as a separate tab. Click each tab, display the corresponding quest.

  - Format: Mission N

  - N = sequential number (starting from 1). Example: Mission 1, Mission 2, Mission 3.

  - Example:

- When there is not any quest in Quest list, hide this section in FO.

- In each quest, display the following information:

  - Title: Display the quest’s title

  - Description: Display the quest’s description text.

  - Upload your photo/screenshot:

    - This field is only display if check box Required upload image is checked Required field. If null, display error  message “*Please upload your evidence.*”

    - Click to open file -> System opens file picker (limited to image formats: ***png, .jpg, .jpeg, .heic, .heif.). Only allow choose these types. If the wrong format is wrong, display an error message: “Invalid file format. Please upload a supported format, e.g., JPG, PNG, JPEG, HEIC, HEIF”***

    - Maximum uploaded images: 5

      - If the user uploads exactly 5 images, hide button Upload your photo/screenshot

      - If user upload more than 5 images, display an error message “Exceeded the maximum quantities of images”

    - Maximum size per file: 5MB, if the uploaded file is greater than 5MB, display toast message: “Maximum upload file size 5MB”

    - Display upload information:

      - File name

      - Remove icon : Clicks on this button to delete photo upload.

  - Link: Textbox

    - This field only displays if checkbox Required enter link is checked - Required Field. If null, display error message “*Please enter the URL for your proof or evidence.*”

    - Placeholder: Enter your related link

    - Max-length: 1000 characters. User cannot input more than 1000 characters. If more than, display error message: “You cannot enter link more than 1000 characters.”

    - Tooltip :  Clicks on this icon, display a tooltip with content:” This link will strengthen your evidence, making it more credible”

  - ***Submit button:***

    - ***Only enable when required field is filled  ***

    - ***Clicks on this button, the system check:  ***

      - ***If there is no error found:***

        - ***Create a quest request with Pending status (refer to user story ***[***View quest request***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/IQCbT4q1drPVQKRV9YwpYtEyAdEWNskAUOriDposqH-FbPY?e=A1SI41&nav=eyJoIjoiMjEyNTg4MTkyNiJ9)***)***

        - ***Send email to admin (Email ***[***TN8***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=I5JoVv&nav=MTJfQTlfezdDMzAwODdGLTFFNDktNEIzRC04OTlBLTAwRUMyRUVBNjlGNn0)***)***

        - ***Send Notification to user (ID TN2 - ***[***Submit quest***](https://ceolfglobaltech.sharepoint.com/:x:/s/WeMasterTrade/EbCDx59grN5Homk9nlYFDtYBf-x8lYLoykjhWHrZ4zUFtA?e=bCJb0N&nav=MTJfQjVfezk2RjNEQ0QwLTFGMDgtNDFDMS1BMkRGLTk0OENFQTdBNjc4OX0)***)  ***

        - ***Display the content: “Your request has been submitted. It may take up 24 hours to verify.”***

        - ***Hide this button***

      - ***If there is error found: Display an error message: “Submit failed, please try again”  ***

  - ***When each quest is approved, display content in each tab: “This quest has been approved. Please continue completing the remaining tasks before the tournament begins.”***

  - ***When a quest is rejected, reopen submit so that the user can submit again. ***

  - ***When all quests approved, display screen: ***

## Impact feature

Create Quest in BO > Gamification > Quest

## View tournament information – InProgress

### User story

As a user, I want to view InProgress tournament information, so that I follow my progress so that try to get rank.

### GUI

[View UI Zeplin here](https://zpl.io/7GK31kW)

### Acceptance criteria

The tournament with Display on WMT = TRUE will be shown in the WMT.

- If the tournament is set as personalized (add email personalize), only those users can view the tournament on WMT

- If a tournament is restricted to specific countries, it will only be visible to users whose profile country matches one of the allowed countries (Refer to user story Config country for tournament)

The tournament In-progress screen will display the following information:

- **Section 1: Banner tournament**

  - Title: display the tournament title

  - Start time:

    - Display the start time.

    - Format: MMM dd, yyyy HH:mm:ss (UTC+3)

  - Participants: set hard code value in FO is 100

  - Fee:

    - Display the original fee, the original fee should be shown with a strikethrough style.

    - Display the actual fee.

    - When toggle Fee is False, display “$0”

    - Format: $[Fee]

  - Countdown to end time:

    - Display a real-time countdown timer that shows the time until the tournament ends.

    - Format: DD: HH:MM: SS (Days, Hours, Minutes, Seconds)

    - When countdown reaches 00:00:00:00, keep this layout and add text “

- **Section 2: Leaderboard Realtime**

  - **Get trading results (Profit) of top prize (Fetch trading results every 60 seconds)**

  - **In leader board, display the following information: **

    - **Rank index: Display ranking index. Format: 1st Place, 2nd Place, ...  **

      - **Tooltip: “Leaderboard is processing. Your official position will be confirmed after the final check.”**

      - **Hover to show tooltips.**

    - **Full Name: Display Full Name (First Name + Last Name). If the full name exceeds max of width, show’...’ at the end. On mouse hover, a tooltip should display the full name.**

    - **Country: get country and flag of user (My profile of user)**

    - **Profit (USD):**

      - **Formula: Profit (closed trade) of trading account**

      - **Unit: $**

    - **Get Realtime data on trading accounts and re-ranked the leaderboard in FO follow rule: **

      - Pass all trading objectives (Max Daily Loss, Max Total Loss) if having

      - Profit (closed trade) > 0

      - Status of trading account # Terminated

      - In case there are some trading accounts with the same profit, prioritize the one that reached earlier in the ranking.

      - Display up to 50 trading accounts on the leaderboard. If fewer than 50 accounts are available, display them all.

- **Section 3: Trading performance **

  - **Trading account performance will display with the following information:**

**View 1: Trading information**

- **If tournament trading account is MT5:**

    - **Trading Platform:  **

      - If tournament trading account is MT5:

        - Platform (MT5): when clicking on this button, navigate to page https://wemastertrade.com/platform/

      - If tournament trading account is cTrader:

        - Platform (cTrader): when clicking on this button, navigate to page [***https://ctr.wemastertrade.com/***](https://ctr.wemastertrade.com/)

    - Credentials: Click on to display the popup:

      - Platform:

        - If tournament trading account is MT5:

          - Display “MT5”

        - If tournament trading account is MT5:

          - Display “cTrader”

      - Log In: Display [**Trading account ID**]

        - User can click icon to copy login value

      - Server:

        - If tournament trading account is MT5:

          - **DragonAsiaTech-Server  **

        - If tournament trading account is cTrader:

          - [https://ctr.wemastertrade.com/](https://ctr.wemastertrade.com/)

        - User can click icon to copy server value

      - Change Password:

        - For MT5:

          - Button: when user clicks on this button, close Account Credentials popup and display Change Password popup (Refer user story: [Change Master Password](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/EbjvX2D-TMFGobLHBS6czuQB-2_axE-tNxxAk83W6Ep19Q?e=hskS3T&nav=eyJoIjoiMTQwMDkyMzg3NSJ9))

        - For cTrader:

          - ***Button. Click on this button, navigate user to the new site: https://id-ctr.wemastertrade.com/  ***

    - Initial balance: Display initial balance of trading account. Unit: $. Use comma (,) separator (1, 300)

    - Your current profit: display the current profit of trading account. Unit: $. Use comma (,) separator (1, 300)

      - Display the correct profit value as a numeric value, allowing both positive and negative.

    - Your current rank: display the current rank of user in the tournament.

      - Format: 1st, 2nd, ...

      - In case, user do not pass trading objective below, user’s rank is null, display “-”

      - In case, user have the profit <=0, display “0”

**View 2: Trading objectives**

- ***Column 1: Objectives***

  - Daily Loss < [Max Daily Loss Value] USD.

    - Hide this objective when daily loss field in BO is null

  - Max Daily Loss Hits < 3

    - Tooltip: “On the 1st and 2nd time reaching the Max Daily Loss, trading function will be disabled for the rest of the day and can resume the next day. The account will be terminated if the Max Daily Loss is reached on the 3rd time”

    - Hide this objective when daily loss field in BO is null

  - Total Loss < [Max total loss value] USD

    - Hide this objective when Max Total loss field in BO is null

  - 0% < Profit Consistency ≤ [Profit consistency value] %:

    - Link navigate: https://faq.wemastertrade.com/what-is-the-profit-consistency-rule/

- ***Column 2: Current Result***

  - ***Refer to user story ***[***Trading Result tab***](https://ceolfglobaltech.sharepoint.com/:w:/s/WeMasterTrade/EbjvX2D-TMFGobLHBS6czuQB-2_axE-tNxxAk83W6Ep19Q?e=wsGovd&nav=eyJoIjoiMjI1NjA0MDI4In0%3D)*** in trading service***

- ***Column 3: Summary***

  - ***If the result meets the objective, display Passed  ***

  - ***If the result doesn’t meet the objective, display Not Passing***

- ***Display text note: “Meet all conditions to be ranked on the leaderboard.”***

- ***If both fields are null in BO, hide the trading objective list and text note. ***

- **Section 4: Tournament rules**

  - When user click tab Trading rule, display the trading rules content (Config in BO | Trading rules)

- **FOR GUEST VIEW** (User do not join tournament, include who do not pass tournament quests):

- Hide section 3: Trading performance ([UI here](https://zpl.io/8Ey3Lkw))

## View tournament information – Results Review

### User story

As a user, I want to view tournament trading results and the leaderboard so that I can track my performance and see how I rank against other competitors.

### GUI

[***View UI Zeplin here***](https://zpl.io/JQOBWLK)***  ***

### Acceptance criteria

The tournament with Display on WMT = TRUE will be shown in the WMT.

- If the tournament is set as personalized (add email personalize), only those users can view the tournament on WMT

- If a tournament is restricted to specific countries, it will only be visible to users whose profile country matches one of the allowed countries (Refer to user story Config country for tournament)

The tournament **Result Review** screen will display as** In Progress** status for Both view of Participants and Guest view (refer to user story View tournament information – InProgress)

When the status of the tournament is Results Review, display text:* “The tournament has ended. The results are currently under review by the Risk team, and the final results will be confirmed within 2–3 days.”* next to the navigation of the screen

## View tournament information – Finished

### User story

As a user, I want to view tournament trading results and the leaderboard so that I can track my performance and see how I rank against other competitors.

### GUI

[View UI Zeplin here](https://zpl.io/ML53ekR)

### Acceptance criteria

The tournament with Display on WMT = TRUE will be shown in the WMT.

- If the tournament is set as personalized (add email personalize), only those users can view the tournament on WMT

- If a tournament is restricted to specific countries, it will only be visible to users whose profile country matches one of the allowed countries (Refer to user story Config country for tournament)

The tournament **Finished** screen will display:

- **Section 1: Banner tournament**

  - Title: display the tournament title

- **Section 2: Leaderboard**

  - **Get trading results of top prize when admin publishes the result of this tournament. (refer to user story View Tournament detail - Publish the tournament results) based on the config prize.**

  - **In leader board, display the following information: **

    - The Top 3 prizes should be displayed using distinct cards with corresponding rank colors:

      - 🥇 1st Place – Gold (center)

      - 🥈 2nd Place – Silver (left)

      - 🥉 3rd Place – Bronze (right)

    - The remaining prizes will be ranked in the prize list.

    - Rank index: Display ranking index. Format: 1st Place, 2nd Place, ...

    - **Full Name: Display Full Name (First Name + Last Name). If the full name exceeds max of width, show’...’ at the end. On mouse hover, a tooltip should display the full name.**

    - **Profit (USD):**

      - **Formula: Profit (closed trade) of trading account**

    - **Country: get country and flag of user (user' country)  **

    - **Prize:**

      - **Display text hint corresponding each prize (config in BO of prize)**

    - **If there is only 1 reward found, still display that user in TOP 3. **
