import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page } from 'playwright';
import { HomePage } from '../page-objects/HomePage';
import { LoginPage } from '../page-objects/LoginPage';
import { RegisterPage } from '../page-objects/RegisterPage';

let browser: Browser;
let page: Page;
let username: string; // Holds random username for login/reuse

// Utility function
function generateRandomUsername(): string {
  const prefix = 'user_';
  const suffix = Math.random().toString(36).substring(2, 8);
  return prefix + suffix;
}

Given('I open the Parabank website', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://parabank.parasoft.com/parabank/index.htm?ConnType=JDBC', { timeout: 20000 });
});

When('I create an account with random username and password {string}', async function (password: string) {
  username = generateRandomUsername(); // Generate and save username
  const registerPage = new RegisterPage(page);
  await registerPage.navigateToRegister();
  await registerPage.register(username, password); 
});

When('I login with that username and password {string}', async function (password: string) {
  const loginpage = new LoginPage(page);
  await loginpage.login(username, password); // Use previously generated username!
});

Then('I print the account balance displayed on homepage', async function () {
  const homepage = new HomePage(page);
  const balance = await homepage.getBalance();
  console.log(`Account balance for ${username}: ${balance}`);
});