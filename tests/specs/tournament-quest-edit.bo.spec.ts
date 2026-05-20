import { test, expect, type Page } from '@playwright/test';
import { TournamentQuestEditPage } from '../pages/TournamentQuestEditPage';
import { TournamentQuestListPage } from '../pages/TournamentQuestListPage';
import { BoShellPage } from '../pages/BoShellPage';
import { generateText, repeatChar } from '../utils/data-generator';

test.describe('Tournament Quest / Edit', () => {
  async function openTournamentQuestEdit(page: Page) {
    await new BoShellPage(page).openTournamentQuestPage();
    const listPage = new TournamentQuestListPage(page);
    await listPage.waitForLoaded();
    await listPage.openFirstDetail();

    const editPage = new TournamentQuestEditPage(page);
    await editPage.waitForLoaded();
    return { listPage, editPage };
  }

  test('TQ_7.13_01 - Open tournament quest detail from list', async ({ page }) => {
    const { editPage } = await openTournamentQuestEdit(page);

    await expect(editPage.updateButton).toBeVisible();
  });

  test('TQ_7.13_02 - Verify editable fields on detail screen', async ({ page }) => {
    const { editPage } = await openTournamentQuestEdit(page);

    await expect.soft(editPage.titleInput).toBeVisible();
    await expect.soft(editPage.activeControl).toBeVisible();
    await expect.soft(editPage.platformSelect).toBeVisible();
    await expect.soft(editPage.tournamentSelect).toBeVisible();
    await expect.soft(editPage.uploadImageCheckbox).toBeVisible();
    await expect.soft(editPage.enterLinkCheckbox).toBeVisible();
    await expect.soft(editPage.descriptionEditor).toBeVisible();
    await expect.soft(editPage.updateButton).toBeVisible();
  });

  test('TQ_7.13_03 - Validate required Quest Title', async ({ page }) => {
    const { editPage } = await openTournamentQuestEdit(page);

    await editPage.clearTitle();
    await editPage.submitUpdate();

    await expect(editPage.titleInput).toHaveValue('');
    await expect(page.getByText(/please fill out this field|required/i).first()).toBeVisible();
  });

  test('TQ_7.13_04 - Validate Quest Title max length enforcement', async ({ page }) => {
    const { editPage } = await openTournamentQuestEdit(page);

    await editPage.fillTitle(repeatChar('A', 201));
    await editPage.submitUpdate();

    await expect(editPage.titleInput).toHaveValue(repeatChar('A', 200));
    await expect(editPage.updateButton).toBeDisabled();
  });

  test('TQ_7.13_05 - Validate at least one evidence requirement is selected', async ({ page }) => {
    const { editPage } = await openTournamentQuestEdit(page);

    await editPage.setUploadImageRequired(false);
    await editPage.setEnterLinkRequired(false);
    await editPage.submitUpdate();

    await expect(editPage.uploadImageCheckbox).not.toBeChecked();
    await expect(editPage.enterLinkCheckbox).not.toBeChecked();
    await expect(editPage.evidenceRequirementError).toBeVisible();
  });

  test('TQ_7.13_06 - Validate required Tournament ID', async ({ page }) => {
    const { editPage } = await openTournamentQuestEdit(page);

    await editPage.clearTournament();
    await editPage.submitUpdate();

    await expect(page.getByText(/please fill out this field|required/i).first()).toBeVisible();
  });

  test('TQ_7.13_07 - Update tournament quest successfully', async ({ page }) => {
    const { editPage } = await openTournamentQuestEdit(page);
    const title = generateText('TournamentQuestEdit');

    await editPage.fillTitle(title);
    await editPage.selectPlatform('Other');
    await editPage.selectFirstTournament();
    await editPage.setUploadImageRequired(true);
    await editPage.setEnterLinkRequired(true);
    await editPage.fillDescription(`Updated by automation ${title}`);
    await editPage.submitUpdate();

    await expect(editPage.successToast).toBeVisible();
  });

  test('TQ_7.13_08 - Verify success toast after update', async ({ page }) => {
    const { editPage } = await openTournamentQuestEdit(page);
    const title = generateText('TournamentQuestToast');

    await editPage.fillTitle(title);
    await editPage.setUploadImageRequired(true);
    await editPage.setEnterLinkRequired(true);
    await editPage.submitUpdate();

    await expect(editPage.successToast).toBeVisible();
  });
});
