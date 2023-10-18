import { Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep, Status } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext } from "@playwright/test";
import { pageFixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { createLogger} from "winston";
import { options } from "../helper/util/logger";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
    //This is used to initially launch a new browser for all tests
    getEnv();
    browser = await invokeBrowser();

});

Before(async function ({pickle}) {
    const scenarioName = pickle.name+pickle.id
    //This is used to start a new context(clean tab) for each test
    context = await browser.newContext();
    const page = await browser.newPage();
    pageFixture.page = page;
    pageFixture.logger = createLogger(options(scenarioName));

});


// AfterStep(async function ({ pickle, result }) {
//     //This is used to capture a sceenshot after each step in our feature files
//     //how to take a screenshot (pickle is used to get the scenario name which is then added to the name of the screenshot)
//     const img = await pageFixture.page.screenshot({ path: ".test-results/screenshots" + pickle.name + '.png', type: "png" })

//     //how to attach the screenshot to the report
//     await this.attach(img, "image/png");


// });

After(async function ({ pickle, result }) {

    //How to set the command so that a screenshot if only taken on a failure 
    console.log(result?.status);
    if (result?.status == Status.FAILED) {

        //how to take a screenshot (pickle is used to get the scenario name which is then added to the name of the screenshot)
        const img = await pageFixture.page.screenshot({ path: "./test-results/screenshots/" + pickle.name + '.png', type: "png" })

        //how to attach the screenshot to the report
        await this.attach(img, "image/png");

    }

    //This is used to close down the tab after each test 
    await pageFixture.page.close();
    await context.close();

});

AfterAll(async function () {

    //This is used to close down the browser after each test 
    await browser.close();
    pageFixture.logger.close();

});
