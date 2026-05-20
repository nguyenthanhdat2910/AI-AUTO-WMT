## **WMT PROJECT**

**GENERAL RULES OF LF SOLUTION SYSTEM**

Version 1.0

## 1. **Revision Summary**

| **Version** | **Comments** | **Author** | **Issue Date** |
| ----------------- | ------------------ | ---------------- | -------------------- |
| 1.1               | Initial Release    | Linh Tran        | Otc 12, 2025         |
|                   |                    |                  |                      |
|                   |                    |                  |                      |
|                   |                    |                  |                      |
|                   |                    |                  |                      |
|                   |                    |                  |                      |
|                   |                    |                  |                      |

1. **Distribution for Review/Approval**

| **Name** | **Title &**`<br>`**Company** | **Issue** `<br>`**Version** | **Issue Date** | **Review Date** | **Approval** `<br>`**Date** |
| -------------- | ------------------------------------------ | ----------------------------------------- | -------------------- | --------------------- | ----------------------------------------- |
|                |                                            |                                           |                      |                       |                                           |
|                |                                            |                                           |                      |                       |                                           |

## Table of Contents

| Table of Contents                                                                                                            | Table of Contents                                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Table of Contents..........................................................................................................3 |                                                                                                                            |
| 1.                                                                                                                           | Objective...............................................................................................................4  |
| 2.                                                                                                                           | Scope....................................................................................................................4 |
| 3.                                                                                                                           | Definitions, Acronyms, and Abbreviations..................................................................4                |
| 4.                                                                                                                           | Detailed Rule’s Descriptions....................................................................................4         |
| GENERAL RULES.......................................................................................................4        |                                                                                                                            |
|                                                                                                                              | 4.1. Toast/Error message rules.....................................................................................4       |
|                                                                                                                              | 4.2. Textbox rules......................................................................................................4  |
|                                                                                                                              | 4.3. Tooltips rules......................................................................................................5 |
|                                                                                                                              | 4.4. General rules......................................................................................................5  |
|                                                                                                                              | 4.5. Popup rule..........................................................................................................5 |
|                                                                                                                              | 4.6. Data change Handling..........................................................................................5       |
| FORMAT RULES.........................................................................................................6       |                                                                                                                            |
|                                                                                                                              | 4.7. Format rules.......................................................................................................6  |
| SEARCH & FILTER.....................................................................................................6        |                                                                                                                            |
|                                                                                                                              | 4.8. Search & filter rules.............................................................................................6   |
|                                                                                                                              | 4.8.1.`<br>`Acceptance Criteria...................................................................................6      |
|                                                                                                                              | 4.8.2.`<br>`Example..................................................................................................7   |

## **1. Objective**

This document is to summarize all general rules that will be applied for all features in LF Solution system.

## **2. Scope**

Applied for WCT, WMT, General applications of LF Solution

## **3. Definitions, Acronyms, and Abbreviations**

## **4. Detailed Rule’s Descriptions**

## **GENERAL RULES**

## **4.1. Toast/Error message rules**

- Toast message is sent from the system, system error is displayed within 2 seconds.
- When there is a processing error of the system (Example: API returns error 500), display the message: “A system error has occurred. Please try again."
- For required field: If this field is null, display: “Please fill out this field”

## **4.2. Textbox rules**

- For textboxes with the max length, do not allow admin to enter characters that exceed the max length.
- Logical test case for user-entered field

  - Successful, no message displayed
  - There is an error, display the error information just below the input field

## **4.3. Tooltips rules**

- Tooltip: On click, display
- Title: label. Display the phrase that needs to be explained
- Description: label. Display the description of the phrase

## **4.4. General rules**

- Display 20 items per page.
- When loading data: use placeholder loading
- General “Back” button handling: switch back to previous screen.
- General “x” button in popup: turn popup off
- Display ‘-’ when field is null

## **4.5. Popup rule**

- Click the button to open the popup.
- When the popup is closed (discard the action), all entered data and error messages inside the popup must be cleared.
- The popup can be closed by:

  - Click the X button on the top right corner.
  - Click outside the popup area.

## **4.6. Data change Handling**

- When the user clicks Confirm in the popup (to change status for a record), the system must validate whether data has changed since the popup was opened.

  - If yes: Show popup with content “ _Data of this withdrawal request has been changed. Please click OK to refresh page and update new data._ ” Admin clicks on OK button to close the popup and refresh page.
- Title popup: depending on each specific action.

## **FORMAT RULES**

## **4.7. Format rules**

- Email format:email@email.com
- Number format Identity card/Citizen ID: 9 or 12 digits
- Number format:

  - Dot (.) is used for decimal numbers (9.12)
  - Use a comma separator. Example: 13,000,000.
  - Take 2 numbers after the decimal. Round up if the next digit is 5 or more, round down if the next digit is less than 5.
  - Don’t display 2 numbers after the decimal if they are 00
- Date and time format: Mmm dd, yyyy, hh:mm:ss  (Nov 02, 2025, 23:45:56)
- No. column format: display row numbers, starting from 1

## **SEARCH & FILTER**

## **4.8. Search & filter rules**

## _**4.8.1. Acceptance Criteria**_

The following rules apply to all screens that search and filter features:

- **Search box** : Search by [field name].

  - Accept uppercase, lowercase, numeric characters, symbols and letters.
  - Max length: 50.
  - In the text input boxes: Search for records containing the input word, case insensitive, unsigned, and accented. For example: Enter full name: Luong Hanh => Find results with first and last name information containing the word Luong Hanh, case insensitive. Satisfactory results could be Luong Hanh, Tran Luong Hanh, Luong Hanh Thi.
- User can click on X button to delete data search.
- **Filter by select** :

  - When user clicks on Filter input, a list options filter popup will be displayed.
  - Allow user filters with multi-select options.

`o` If the column has an active filter, display a number tag showing how many options are selected

## − **Filter by Date:**

- When clicking on the date field, open the Date Range Picker and display the calendar.
- As the user types into the search field or select, the system must automatically filter and return matching results.
- **Clear Filters button** : Click on this button to clear all values of the search and filter on the table.
- If there are no data, display message: “ _No results are matching with your filter criteria_ "
- _**Note**_ : Refer Figma: Page note

## _**4.8.2. Example**_

In the withdrawal request list, display the following search and filter as below:

- Search fields:

  - Column 1
  - Column 2
  - Column 3
- Filter by date:

  - Created Date
- Filter by select:

  - Column status: Active, Inactive.
- Apply the standard Search & Filter rules as defined here: Search & Filter

## **EDIT COLUMN**

## **4.9. Edit Columns View**

## _**4.9.1. User story**_

The **Edit Columns** feature allows users to customize which columns are displayed in a data table. Users can show or hide columns based on their preferences.

## _**4.9.2. Acceptance Criteria**_

- The system will display an **“Edit Columns”** button on all screens that contain a data list/table.
- When the user clicks the **“Edit Columns”** button, the system will open the Edit Column popup. The popup displays a list of all available columns.
- Column Selection:

  - Each column in the list will have a checkbox.
  - Columns currently displayed in the table are automatically selected (checked).
  - Columns hidden in the table are unchecked.
  - Users can check or uncheck columns to show or hide them in the table. The table will update automatically based on the selected columns.
- Primary Column Rule:

  - The system will define one or more primary columns (e.g., ID, Name, Transaction ID).
  - The primary column must always be visible.
  - The checkbox of the primary column in the Edit Column popup will be disabled and cannot be unchecked.
- Save Column Preferences:
- The system will save the user’s column configuration after the user updates the column selection.
- The selected column settings will be persisted for the user.
- The column configuration will remain the same when:

  - The user refreshes the page
  - The user navigates to another page and returns
  - The user logs out and logs in again
- If the user has no saved configuration, the system will display the default column

  - settings defined by the system.

## _**4.9.3. Example**_

- List columns:

  - Transaction ID - primary column
  - Reference ID
  - Email – primary column
  - Method
  - Amount
  - Status
  - Created date
- Apply the standard Edit column rule rules as defined here: Edit Column View

## **EXPORT DATA**

## **4.10. EXPORT DATA**

## _**4.10.1. Acceptance Criteria**_

- **Export Data button:** disabled by default.

  - When hovering over a disabled button, show tooltip depends on each specific table.
  - Once the admin selects a valid Date range (≤ 92 days), the Export Data button becomes enabled.
- When the admin clicks on the Export Data button, a confirmation popup is displayed with the following content:
- **Title:** Export Data
- **Message:** Are you sure you want to export the data from **`<Start Date>`** to **`<End Date>`** with the selected columns?
- **Cancel button:** on click to close the popup without taking any action.
- **Export button:** on click to export data according to all selected conditions, the system will:

  - Check: Maximum export limit: 50,000 records per file. If more than records, display error message: “The export exceeds the maximum allowed records (50,000). Please refine your filters or reduce the date range to continue.”
  - Generate and download an excel file (.XLSX) containing all transactions matching the selected filters.
  - The exported file will include the columns currently visible in the table.
  - The exported data must follow the current filters, search conditions, and selected date range applied in the table.
  - Export includes all records that match the filters, not only the records displayed on the current page.
  - File name is displayed with format: WMT_[Table Name]_`<Start Date>`_`<End Date>`. For example:

    - WMT_Transaction_2025_06_01_2025_07_31
  - Display popup:
- Here: button link -> click to download again the export file.
- Close: click to close the popup.
- If the selected Created Date exceeds 92 days → Disable button Export Data
- If no records match the filter or search conditions → Disable button Export Data
- The Date column must always be selected in the Edit Column View popup for export (refer to user story Edit column view). If that column is unchecked, Disable button Export Data

## _**4.10.2. Example for Acceptance criteria**_

- Export Data button: disabled by default.

  - When hovering over a disabled button, show tooltip: “Please select a Created Date range within 92 days to export data.”
  - Once the admin selects a valid **Created Date** range (≤ 92 days), the Export Data button becomes enabled.
- Apply the standard Export data rules as defined here Export data
- File name: WMT_Transaction_`<Start Date>`_`<End Date>`. For example:

  - WMT_Transaction_2025_06_01_2025_07_31
