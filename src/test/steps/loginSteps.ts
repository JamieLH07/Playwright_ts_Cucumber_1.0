import {Given, When, Then, setDefaultTimeout} from "@cucumber/cucumber";

setDefaultTimeout(60 * 1000 * 2);

import {chromium, Page, Browser, expect} from "@playwright/test";
import { fixture } from "../../hooks/pageFixture";


Given('User navigates to the application', async function () {
 
  await fixture.page.goto(process.env.BASEURL);
  fixture.logger.info("Navigated to the application")
});

Given('User click on the login link', async function () {

  await fixture.page.locator("//span[text()='Login']").click();

});

Given('User enters the username as {string}', async function (username) {

  await fixture.page.locator("input[formcontrolname='username']").fill(username);

});

Given('User enters the password as {string}', async function (password) {

  await fixture.page.locator("input[formcontrolname='password']").fill(password);

});

When('User clicks on the login button', async function () {

  await fixture.page.locator("(//span[text()='Login'])[2]").click();
  await fixture.page.waitForLoadState();
  fixture.logger.info("Waiting for 2 seconds")
  await fixture.page.waitForTimeout(2000);

});

Then('Login should be successful', async function () {

  const text = await fixture.page.locator("//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]").textContent();
  console.log ("Username: " + text);
  fixture.logger.info("Username" + text);

});

When('Login should not be successful', async function () {

  const failureMessage = fixture.page.locator("mat-error[role='alert']");
  await expect(failureMessage).toBeVisible();
  
});