import { Page } from '@playwright/test';

export class HomePage {
  constructor(private page: Page) {}

  async getBalance(): Promise<string> {
    // Wait for the element to be visible
    await this.page.waitForSelector('xpath=//table[@id="accountTable"]/tbody/tr[2]/td[2]/b', { timeout: 5000 });

    const balance = await this.page.textContent('xpath=//table[@id="accountTable"]/tbody/tr[2]/td[2]/b');
    if (!balance) {
      throw new Error('Account balance element not found or has no value.');
    }
    return balance.trim();
  }
}