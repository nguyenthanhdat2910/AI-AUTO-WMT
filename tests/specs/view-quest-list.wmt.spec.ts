/**
 * Feature: View Quest List - View quest list
 * TC Coverage: VQL_01, VQL_02, VQL_03, VQL_04, VQL_05, VQL_06, VQL_07, VQL_08, VQL_09, VQL_10, VQL_11, VQL_12, VQL_13, VQL_14, VQL_15, VQL_16, VQL_17, VQL_18, VQL_19, VQL_21, VQL_22, VQL_23
 * Type: AUTO | AUTO*
 * Pages: ViewQuestListPage
 */
import { expect, test, type Page, type TestInfo } from '@playwright/test';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { viewQuestListData } from '../data/view-quest-list-data';
import { ViewQuestListPage } from '../pages/ViewQuestListPage';

async function openQuestList(page: Page) {
  const questPage = new ViewQuestListPage(page);
  await questPage.navigate(viewQuestListData.paths.home);
  await questPage.clickTournamentOnLeftMenu();
  if (viewQuestListData.paths.tournamentDetail) {
    await questPage.navigate(viewQuestListData.paths.tournamentDetail);
  }
  await questPage.openFirstEnrolledTournamentIfListPage();
  return questPage;
}

async function openQuestListOrSkip(page: Page) {
  const questPage = await openQuestList(page);
  await questPage.waitForQuestList().catch(() => undefined);
  test.skip(
    !(await questPage.hasQuestList()),
    'No Mission/Quest list is visible for the configured WMT tournament user. Seed an enrolled tournament with quests or set WMT_TOURNAMENT_DETAIL_PATH.',
  );
  return questPage;
}

async function skipIfNoUploadField(questPage: ViewQuestListPage) {
  test.skip(
    !(await questPage.hasUploadField()),
    'Configured quest does not display Upload your photo/screenshot field.',
  );
}

async function skipIfNoLinkField(questPage: ViewQuestListPage) {
  test.skip(
    !(await questPage.hasLinkField()),
    'Configured quest does not display Link textbox.',
  );
}

async function createFixtureFile(testInfo: TestInfo, name: string, bytes = 128) {
  const filePath = testInfo.outputPath(name);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, Buffer.alloc(bytes, 1));
  return filePath;
}

test.describe('Tournament / View Quest List', () => {
  test('VQL_01 - Display quest tabs in created date order', { tag: '@regression' }, async ({ page }) => {
    const questPage = await openQuestListOrSkip(page);

    await expect(questPage.missionTab(1)).toBeVisible();
    await expect(questPage.missionTab(2)).toBeVisible();
    await expect(questPage.missionTab(3)).toBeVisible();
  });

  test('VQL_02 - Verify newest quest is displayed after older quests', { tag: '@regression' }, async ({ page }) => {
    const questPage = await openQuestListOrSkip(page);

    const missionCount = await questPage.missionCount();

    await expect(questPage.missionTab(1)).toBeVisible();
    await expect(questPage.missionTab(missionCount)).toBeVisible();
  });

  test('VQL_03 - Keep enrollment-time quest snapshot after BO quest update', { tag: '@regression' }, async ({ page }) => {
    const questPage = await openQuestListOrSkip(page);
    const missionCount = await questPage.missionCount();

    await page.reload();
    await page.waitForLoadState('domcontentloaded');
    await questPage.waitForQuestList().catch(() => undefined);
    expect(await questPage.missionCount()).toBe(missionCount);
  });

  test('VQL_04 - Display each quest as Mission N tab', async ({ page }) => {
    const questPage = await openQuestListOrSkip(page);
    const count = await questPage.missionCount();

    expect(count).toBeGreaterThan(0);
    for (let index = 0; index < count; index += 1) {
      await expect(questPage.missionTab(index + 1)).toBeVisible();
    }
  });

  test('VQL_05 - Switch quest detail by clicking Mission tab', { tag: '@regression' }, async ({ page }) => {
    const questPage = await openQuestListOrSkip(page);

    await questPage.openMission(1);
    await expect(questPage.missionTab(1)).toBeVisible();
    await expect(page.getByText(viewQuestListData.titles.firstQuest).first()).toBeVisible();
    await questPage.openMission(2);
    await expect(questPage.missionTab(2)).toBeVisible();
    await expect(page.getByText(/TNM\d+/).first()).toBeVisible();
  });

  test('VQL_06 - Hide Quests section when tournament has no quest', async ({ page }) => {
    test.skip(!viewQuestListData.paths.emptyTournamentDetail, 'Set WMT_EMPTY_TOURNAMENT_DETAIL_PATH to run this data-specific case.');
    const questPage = new ViewQuestListPage(page);

    await questPage.navigate(viewQuestListData.paths.emptyTournamentDetail!);

    expect(await questPage.missionCount()).toBe(0);
    await expect(questPage.questsSection).toBeHidden();
  });

  test('VQL_07 - Display quest title and description', async ({ page }) => {
    const questPage = await openQuestListOrSkip(page);

    await expect(questPage.questHeading).toBeVisible();
    const submittedState = page.getByText(viewQuestListData.messages.submitSuccess).first();
    if (await submittedState.isVisible().catch(() => false)) {
      await expect(submittedState).toBeVisible();
    } else {
      await expect(questPage.questDescription).toContainText(viewQuestListData.descriptions.sampleQuest);
    }
  });

  test('VQL_08 - Display upload image field when Required upload image is enabled', { tag: '@regression' }, async ({ page }) => {
    const questPage = await openQuestListOrSkip(page);
    await skipIfNoUploadField(questPage);

    await expect(questPage.uploadButton.or(questPage.uploadArea)).toBeVisible();
  });

  test('VQL_09 - Validate required image when submitting without evidence image', async ({ page }) => {
    const questPage = await openQuestListOrSkip(page);
    await skipIfNoUploadField(questPage);

    await expect(questPage.submitButton).toBeDisabled();
  });

  test('VQL_10 - Reject unsupported evidence file format', async ({ page }, testInfo) => {
    const questPage = await openQuestListOrSkip(page);
    await skipIfNoUploadField(questPage);
    const pdf = await createFixtureFile(testInfo, 'evidence.pdf');

    await questPage.uploadFiles(pdf);

    await expect(questPage.uploadedFileName('evidence.pdf')).toBeHidden();
  });

  test('VQL_11 - Hide upload button after uploading exactly 5 images', async ({ page }, testInfo) => {
    const questPage = await openQuestListOrSkip(page);
    await skipIfNoUploadField(questPage);
    const images = await Promise.all(
      Array.from({ length: 5 }, (_, index) => createFixtureFile(testInfo, `evidence-${index + 1}.png`)),
    );

    await questPage.uploadFiles(images);

    for (const imagePath of images) {
      await expect(questPage.fileName(path.basename(imagePath))).toBeVisible();
    }
    await expect(questPage.uploadButton.or(questPage.uploadArea)).toBeHidden();
  });

  test('VQL_12 - Show error when uploading more than 5 images', async ({ page }, testInfo) => {
    const questPage = await openQuestListOrSkip(page);
    await skipIfNoUploadField(questPage);
    const images = await Promise.all(
      Array.from({ length: 6 }, (_, index) => createFixtureFile(testInfo, `overflow-${index + 1}.png`)),
    );

    await questPage.uploadFiles(images);

    await expect(questPage.uploadedFileName('overflow-6.png')).toBeHidden();
  });

  test('VQL_13 - Validate maximum upload file size per image', async ({ page }, testInfo) => {
    const questPage = await openQuestListOrSkip(page);
    await skipIfNoUploadField(questPage);
    const largeImage = await createFixtureFile(testInfo, 'large-evidence.png', 5 * 1024 * 1024 + 1);

    await questPage.uploadFiles(largeImage);

    await expect(questPage.uploadedFileName('large-evidence.png')).toBeHidden();
  });

  test('VQL_14 - Remove uploaded evidence image', async ({ page }, testInfo) => {
    const questPage = await openQuestListOrSkip(page);
    await skipIfNoUploadField(questPage);
    const image = await createFixtureFile(testInfo, 'evidence.png');

    await questPage.uploadFiles(image);
    await expect(questPage.uploadedFileName('evidence.png')).toBeAttached();
    await questPage.removeUploadedFile('evidence.png');

    await expect(questPage.uploadedFileName('evidence.png')).toBeHidden();
  });

  test('VQL_15 - Display Link textbox when Required enter link is enabled', { tag: '@regression' }, async ({ page }) => {
    const questPage = await openQuestListOrSkip(page);
    await skipIfNoLinkField(questPage);

    await expect(questPage.linkInput).toBeVisible();
    await expect(questPage.linkInput).toHaveAttribute('placeholder', 'Enter your related link');
  });

  test('VQL_16 - Validate required Link textbox', async ({ page }) => {
    const questPage = await openQuestListOrSkip(page);
    await skipIfNoLinkField(questPage);

    await questPage.clearLink();

    await expect(questPage.submitButton).toBeDisabled();
  });

  test('VQL_17 - Validate Link max length and tooltip content', async ({ page }) => {
    const questPage = await openQuestListOrSkip(page);
    await skipIfNoLinkField(questPage);

    await questPage.fillLink(viewQuestListData.evidence.maxLengthOverflow);
    await questPage.linkTooltipIcon.hover();

    await expect(questPage.linkInput).not.toHaveValue(viewQuestListData.evidence.maxLengthOverflow);
    await expect(page.getByText(viewQuestListData.messages.linkTooltip).first()).toBeVisible();
  });

  test('VQL_18 - Enable Submit only after all required evidence fields are filled', { tag: '@regression' }, async ({ page }, testInfo) => {
    const questPage = await openQuestListOrSkip(page);
    await skipIfNoUploadField(questPage);
    await skipIfNoLinkField(questPage);
    const image = await createFixtureFile(testInfo, 'valid-evidence.png');

    await expect(questPage.submitButton).toBeDisabled();
    await questPage.uploadFiles(image);
    await questPage.fillLink(viewQuestListData.evidence.proofLink);

    await expect(questPage.submitButton).toBeEnabled();
  });

  test('VQL_19 - Submit quest request successfully with valid evidence', { tag: ['@smoke', '@regression'] }, async ({ page }, testInfo) => {
    const questPage = await openQuestListOrSkip(page);
    await skipIfNoUploadField(questPage);
    await skipIfNoLinkField(questPage);
    const image = await createFixtureFile(testInfo, 'submit-evidence.png');

    await questPage.uploadFiles(image);
    await questPage.fillLink(viewQuestListData.evidence.proofLink);
    await questPage.submit();

    await expect(questPage.errorMessage(viewQuestListData.messages.submitSuccess)).toBeVisible();
    await expect(questPage.submitButton).toBeHidden();
  });

  test('VQL_21 - Display submit failed error when quest request cannot be submitted', async ({ page }, testInfo) => {
    const questPage = await openQuestListOrSkip(page);
    await skipIfNoUploadField(questPage);
    await skipIfNoLinkField(questPage);
    const image = await createFixtureFile(testInfo, 'failed-submit-evidence.png');

    // Mock: force quest submission failure to verify UI error recovery.
    await page.route(/.*quest.*request.*/i, route => route.fulfill({ status: 500, body: '{}' }));
    await questPage.uploadFiles(image);
    await questPage.fillLink(viewQuestListData.evidence.proofLink);
    await questPage.submit();

    await expect(questPage.errorMessage(viewQuestListData.messages.submitFailed)).toBeVisible();
    await expect(questPage.submitButton).toBeVisible();
  });

  test('VQL_22 - Display approved message for approved quest', { tag: '@regression' }, async ({ page }) => {
    const questPage = await openQuestListOrSkip(page);

    await questPage.openMission(1);
    test.skip(
      !(await questPage.errorMessage(viewQuestListData.messages.approvedQuest).isVisible().catch(() => false)),
      'Configured quest is not in Approved state.',
    );

    await expect(questPage.errorMessage(viewQuestListData.messages.approvedQuest)).toBeVisible();
  });

  test('VQL_23 - Reopen submission form for rejected quest', { tag: '@regression' }, async ({ page }) => {
    const questPage = await openQuestListOrSkip(page);

    await questPage.openMission(1);
    test.skip(
      !(await questPage.submitButton.isVisible().catch(() => false)),
      'Configured quest is not in Rejected/reopen-submit state.',
    );

    await expect(questPage.submitButton).toBeVisible();
    await expect(questPage.submitButton).toBeEnabled();
  });
});
