import { type Locator, type Page } from '@playwright/test';

export class BoShellPage {
  readonly page: Page;
  readonly userMenuButton: Locator;
  readonly switchApplicationMenuItem: Locator;
  readonly switchApplicationDialog: Locator;
  readonly gamificationOption: Locator;
  readonly okButton: Locator;
  readonly questMenu: Locator;
  readonly tournamentQuestLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userMenuButton = page.getByRole('button', { name: /LF SupperAdmin|user/i }).first();
    this.switchApplicationMenuItem = page.getByText('Switch Application').first();
    this.switchApplicationDialog = page.getByText('Switch Application').last();
    this.gamificationOption = page.getByText('Gamification').last();
    this.okButton = page.getByRole('button', { name: /^OK$/ }).last();
    this.questMenu = page.getByRole('menuitem', { name: /Quest/i }).first();
    this.tournamentQuestLink = page.getByRole('link', { name: /^Tournament Quest$/ }).first();
  }

  async ensureGamificationApplication() {
    await this.page.goto('/');
    await this.userMenuButton.click();
    await this.switchApplicationMenuItem.click();
    await this.gamificationOption.click();
    await this.okButton.click();
    await this.questMenu.waitFor({ state: 'visible' });
  }

  async openTournamentQuestPage() {
    await this.ensureGamificationApplication();
    await this.questMenu.click();
    await this.tournamentQuestLink.click();
  }
}
