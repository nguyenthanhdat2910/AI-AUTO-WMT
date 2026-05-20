import { type Locator, type Page } from '@playwright/test';

export class TournamentQuestListPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly rows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: /tournament quest/i }).first();
    this.rows = page.getByRole('row');
  }

  async navigate() {
    await this.page.goto('/tournament-quest');
    await this.waitForLoaded();
  }

  async waitForLoaded() {
    const reloadButton = this.page.getByRole('button', { name: /reload/i }).first();
    if (await reloadButton.isVisible().catch(() => false)) {
      await reloadButton.click();
    }
    await this.heading.waitFor({ state: 'visible' });
  }

  async openFirstDetail() {
    const detailButton = this.page.getByRole('button', { name: /detail|edit|view/i }).first();
    const detailLink = this.page.getByRole('link', { name: /detail|edit|view/i }).first();
    const detailText = this.page.getByText(/^Detail$/).first();
    const firstQuestId = this.page.getByRole('link', { name: /TNQ\d+/i }).first();

    if (await detailButton.count()) {
      await detailButton.click();
      return;
    }

    if (await detailLink.count()) {
      await detailLink.click();
      return;
    }

    if (await detailText.count()) {
      await detailText.click();
      return;
    }

    await firstQuestId.click();
  }
}
