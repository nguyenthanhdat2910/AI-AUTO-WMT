import { type Locator, type Page } from '@playwright/test';

export class ViewQuestListPage {
  readonly page: Page;
  readonly questsSection: Locator;
  readonly missionTabs: Locator;
  readonly title: Locator;
  readonly description: Locator;
  readonly uploadButton: Locator;
  readonly uploadArea: Locator;
  readonly fileInput: Locator;
  readonly linkInput: Locator;
  readonly linkTooltipIcon: Locator;
  readonly questHeading: Locator;
  readonly questDescription: Locator;
  readonly submitButton: Locator;
  readonly alerts: Locator;
  readonly tournamentMenuLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.questsSection = page
      .getByRole('heading', { name: /participation requirements/i })
      .locator('xpath=ancestor::*[self::section or self::div][1]')
      .or(page.getByRole('region', { name: /quest|mission|participation requirements/i }))
      .or(page.locator('[data-testid="tournament-quests"]'))
      .or(page.getByText(/mission 1/i).locator('xpath=ancestor::*[self::section or self::div][1]'))
      .first();
    this.missionTabs = page.locator(
      ':text-is("Mission 1"), :text-is("Mission 2"), :text-is("Mission 3")',
    );
    this.title = page
      .getByRole('heading')
      .filter({ hasNotText: /mission|tournament/i })
      .first();
    this.description = page
      .locator('[data-testid="quest-description"]')
      .or(page.locator('[class*="description"]').filter({ hasText: /\S/ }))
      .first();
    this.uploadButton = page
      .getByRole('button', { name: /upload your photo|upload.*screenshot|upload/i })
      .or(page.getByText(/click or drag file to this area to upload/i))
      .first();
    this.uploadArea = page
      .getByText(/click or drag file to this area to upload/i)
      .locator('xpath=ancestor::*[self::div][contains(@class,"upload") or .//input[@type="file"]][1]')
      .or(page.getByText(/click or drag file to this area to upload/i))
      .first();
    this.fileInput = page.locator('input[type="file"]').first();
    this.linkInput = page
      .getByPlaceholder('Enter your related link')
      .or(page.getByRole('textbox', { name: /link|url/i }))
      .first();
    this.linkTooltipIcon = page
      .getByRole('button', { name: /tooltip|info|help/i })
      .or(page.getByAltText(/question-circle/i))
      .or(page.locator('img[alt="question-circle"]'))
      .or(page.locator('[aria-label*="tooltip" i], [aria-label*="info" i]'))
      .first();
    this.questHeading = page.getByRole('heading', { name: /TNM\d+\s+Quest/i }).first();
    this.questDescription = this.questHeading
      .locator('xpath=following-sibling::*[self::p or self::div][1]')
      .first();
    this.submitButton = page.getByRole('button', { name: /^submit(?: now)?$/i }).first();
    this.alerts = page.getByRole('alert');
    this.tournamentMenuLink = page
      .getByRole('link', { name: /^Tournament$/i })
      .or(page.locator('[data-testid="sidebar-tournament"]'))
      .first();
  }

  async navigate(path: string) {
    await this.page.goto(path);
    await this.page.waitForLoadState('domcontentloaded');
  }

  async clickTournamentOnLeftMenu() {
    await this.tournamentMenuLink.waitFor({ state: 'visible' });
    await this.tournamentMenuLink.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async openFirstEnrolledTournamentIfListPage() {
    const directQuestVisible = await this.missionTabs.first().isVisible().catch(() => false);
    if (directQuestVisible) {
      return;
    }

    const candidateDetail = this.page
      .getByRole('link', { name: /view|detail|in progress|join now|enrolled/i })
      .or(this.page.getByRole('button', { name: /view|detail|in progress|join now|enrolled/i }))
      .first();
    if (
      (await candidateDetail.isVisible().catch(() => false)) &&
      (await candidateDetail.isEnabled().catch(() => false))
    ) {
      await candidateDetail.click();
      await this.page.waitForLoadState('domcontentloaded');
      return;
    }

    const detailLink = this.page
      .getByRole('link', { name: /view|detail|enrolled|in progress/i })
      .first();
    const detailButton = this.page
      .getByRole('button', { name: /view|detail|enrolled|in progress/i })
      .first();

    if (
      (await detailLink.isVisible().catch(() => false)) &&
      (await detailLink.isEnabled().catch(() => false))
    ) {
      await detailLink.click();
    } else if (
      (await detailButton.isVisible().catch(() => false)) &&
      (await detailButton.isEnabled().catch(() => false))
    ) {
      await detailButton.click();
    }

    await this.page.waitForLoadState('domcontentloaded');
  }

  async hasQuestList() {
    return (await this.missionTab(1).count()) > 0;
  }

  async waitForQuestList(timeout = 10_000) {
    await this.missionTab(1).waitFor({ state: 'visible', timeout });
  }

  missionTab(index: number) {
    return this.page.getByText(`Mission ${index}`, { exact: true });
  }

  async missionCount() {
    let count = 0;
    for (let index = 1; index <= 20; index += 1) {
      if ((await this.missionTab(index).count()) === 0) {
        break;
      }
      count += 1;
    }
    return count;
  }

  async hasUploadField() {
    return (
      (await this.fileInput.count()) > 0 ||
      (await this.uploadButton.isVisible().catch(() => false)) ||
      (await this.uploadArea.isVisible().catch(() => false))
    );
  }

  async hasLinkField() {
    return await this.linkInput.isVisible().catch(() => false);
  }

  async openMission(index: number) {
    await this.missionTab(index).click();
  }

  fileName(name: string) {
    return this.page.getByText(name, { exact: true }).first();
  }

  uploadedFileName(name: string) {
    return this.page.locator('.ant-upload-list-item-name').filter({ hasText: name }).first();
  }

  errorMessage(text: string) {
    return this.page.getByText(text, { exact: false }).first();
  }

  async uploadFiles(paths: string | string[]) {
    const inputCount = await this.fileInput.count();
    if (inputCount > 0) {
      await this.fileInput.setInputFiles(paths);
      return;
    }

    const fileChooserPromise = this.page.waitForEvent('filechooser');
    await this.uploadArea.click();
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(paths);
  }

  async fillLink(link: string) {
    await this.linkInput.fill('');
    await this.linkInput.pressSequentially(link, { delay: 1 });
    await this.linkInput.blur();
  }

  async clearLink() {
    await this.linkInput.fill('');
    await this.linkInput.blur();
  }

  async submit() {
    await this.submitButton.click();
  }

  async removeUploadedFile(fileName: string) {
    const row = this.page
      .getByText(fileName, { exact: true })
      .locator('xpath=ancestor::*[self::li or self::div or self::tr][1]');
    const removeButton = row
      .getByRole('button', { name: /remove|delete|clear/i })
      .or(row.locator('[aria-label*="remove" i], [aria-label*="delete" i]'))
      .first();
    await removeButton.click();
  }
}
