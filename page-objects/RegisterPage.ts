import { Page } from '@playwright/test';

export class RegisterPage {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async navigateToRegister() {
    await this.page.click('text=Register');
    await this.page.waitForSelector('text=Signing up is easy!');
  }

  async register(username: string, password: string) {
    // Fill in required registration fields. Some are mandatory.
    await this.page.fill('input[id="customer.firstName"]', 'Test');
    await this.page.fill('input[id="customer.lastName"]', 'User');
    await this.page.fill('input[id="customer.address.street"]', '123 Main St');
    await this.page.fill('input[id="customer.address.city"]', 'New York');
    await this.page.fill('input[id="customer.address.state"]', 'NY');
    await this.page.fill('input[id="customer.address.zipCode"]', '10001');
    await this.page.fill('input[id="customer.phoneNumber"]', '1234567890');
    await this.page.fill('input[id="customer.ssn"]', '123-45-6789');
    await this.page.fill('input[id="customer.username"]', username);
    await this.page.fill('input[id="customer.password"]', password);
    await this.page.fill('input[id="repeatedPassword"]', password);

    await this.page.click('input[value="Register"]');
    await this.page.waitForSelector('text=Your account was created successfully');
    await this.page.click('text=Log Out');
  }
}