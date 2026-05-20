import { type Locator, type Page } from '@playwright/test';

export class TournamentQuestEditPage {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly activeControl: Locator;
  readonly platformSelect: Locator;
  readonly tournamentSelect: Locator;
  readonly uploadImageCheckbox: Locator;
  readonly enterLinkCheckbox: Locator;
  readonly descriptionEditor: Locator;
  readonly updateButton: Locator;
  readonly successToast: Locator;
  readonly titleLengthError: Locator;
  readonly evidenceRequirementError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput = page.getByLabel(/quest title/i).or(page.getByPlaceholder(/enter title/i)).first();
    this.activeControl = page.getByLabel(/active/i).first();
    this.platformSelect = page.locator('#platForm').locator('xpath=ancestor::div[contains(@class,"ant-select")]').first();
    this.tournamentSelect = page.locator('#tournamentId').locator('xpath=ancestor::div[contains(@class,"ant-select")]').first();
    this.uploadImageCheckbox = page.getByLabel(/required upload image/i).first();
    this.enterLinkCheckbox = page.getByLabel(/required enter link/i).first();
    this.descriptionEditor = page.getByLabel(/description/i).or(page.locator('[contenteditable="true"]').first()).first();
    this.updateButton = page.getByRole('button', { name: /^(update|save)$/i }).first();
    this.successToast = page.getByText('Update new tournament quest successfully');
    this.titleLengthError = page.getByText('Quest Title exceed 200 characters');
    this.evidenceRequirementError = page.getByText('At least required image or required link checked').first();
  }

  async waitForLoaded() {
    await this.updateButton.waitFor({ state: 'visible' });
  }

  async fillTitle(title: string) {
    await this.titleInput.fill('');
    await this.titleInput.pressSequentially(title, { delay: 10 });
    await this.titleInput.blur();
  }

  async clearTitle() {
    await this.titleInput.fill('');
    await this.titleInput.blur();
  }

  async selectPlatform(platform: string) {
    if ((await this.platformSelect.innerText()).trim().includes(platform)) {
      return;
    }
    await this.platformSelect.click();
    await this.page.getByRole('option', { name: new RegExp(`^${platform}$`, 'i') }).click();
  }

  async selectFirstTournament() {
    if ((await this.tournamentSelect.innerText()).trim()) {
      return;
    }
    await this.tournamentSelect.click();
    await this.page.getByRole('option').first().click();
  }

  async clearTournament() {
    await this.tournamentSelect.hover();
    const clearButton = this.tournamentSelect.locator('.ant-select-clear').first();
    if (await clearButton.isVisible().catch(() => false)) {
      await clearButton.click();
    } else {
      await this.tournamentSelect.click();
      await this.page.keyboard.press('Backspace');
      await this.page.keyboard.press('Escape');
    }
  }

  async setUploadImageRequired(checked: boolean) {
    await this.setCheckbox(this.uploadImageCheckbox, checked);
  }

  async setEnterLinkRequired(checked: boolean) {
    await this.setCheckbox(this.enterLinkCheckbox, checked);
  }

  async fillDescription(description: string) {
    await this.descriptionEditor.fill('');
    await this.descriptionEditor.pressSequentially(description, { delay: 10 });
    await this.descriptionEditor.blur();
  }

  async submitUpdate() {
    await this.updateButton.click();
  }

  private async setCheckbox(locator: Locator, checked: boolean) {
    const isChecked = await locator.isChecked();
    if (isChecked !== checked) {
      await locator.click();
    }
  }
}
