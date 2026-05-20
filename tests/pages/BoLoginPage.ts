import { type Locator, type Page } from '@playwright/test';

export class BoLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel(/username/i).or(page.getByPlaceholder(/username/i)).first();
    this.passwordInput = page.getByLabel(/password/i).or(page.getByPlaceholder(/password/i)).first();
    this.submitButton = page.getByRole('button', { name: /submit|log in|login|sign in/i }).first();
  }

  async goto(url = '/') {
    await this.page.goto(url);
  }

  async login(email: string, password: string) {
    await this.emailInput.fill('');
    await this.emailInput.pressSequentially(email, { delay: 20 });
    await this.emailInput.blur();
    await this.passwordInput.fill('');
    await this.passwordInput.pressSequentially(password, { delay: 20 });
    await this.passwordInput.blur();
    await this.submitButton.click();
  }
}
