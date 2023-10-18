import {Given, When, Then, setDefaultTimeout} from "@cucumber/cucumber";

setDefaultTimeout(60 * 1000 * 2);

import {chromium, Page, Browser, expect} from "@playwright/test"; 
import { fixture } from "../../hooks/pageFixture";

let browser:Browser;
let page: Page;

Given('User searches for a {string}', async function (book) {
    //This is used to search for a book based on a string from the Feature files
    fixture.logger.info("Searching for a book: " + book)
    await fixture.page.locator("input[type='search']").fill(book);
    await fixture.page.waitForTimeout(2000);
    await fixture.page.locator("mat-option[role='option'] span").click();
});

When('User adds the book to the cart', async function () {

    await fixture.page.locator("//button[@color='primary']").click();

});

       
Then('the cart badge should get updated', async function () {

    const badgeCount = await fixture.page.locator("#mat-badge-content-0").textContent();
    expect(Number(badgeCount?.length)).toBeGreaterThan(0);
           
});