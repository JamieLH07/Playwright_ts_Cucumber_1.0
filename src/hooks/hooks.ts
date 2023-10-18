import { Before, After, BeforeAll, AfterAll, BeforeStep, AfterStep, Status } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext } from "@playwright/test";
import { getEnv } from "../helper/env/env";
import { createLogger} from "winston";
import { fixture } from "./pageFixture";
import { invokeBrowser } from "../helper/browsers/browserManager";
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
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/vidoes",
        },
    });
    const page = await browser.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(scenarioName));

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
    let videoPath: string;
    let img: Buffer;
    console.log(result?.status);
    if (result?.status == Status.FAILED) {

        //how to take a screenshot (pickle is used to get the scenario name which is then added to the name of the screenshot)
        const img = await fixture.page.screenshot({ path: "./test-results/screenshots/" + pickle.name + '.png', type: "png" })
        videoPath = await fixture.page.video().path();


        //how to attach the screenshot to the report
        await this.attach(img, "image/png");
        
        //how to attach the video to the report
        await this.attach(
            fs.readFileSync(videoPath),
        'video/webm'
        );
    }

    //This is used to close down the tab after each test 
    await fixture.page.close();
    await context.close();
    if (result?.status == Status.FAILED){
        await this.attach(
            img, "image/png"
        );
        await this.attach(
            fs.readFileSync(videoPath),
            'video/webm'
        );

    }

});

AfterAll(async function () {

    //This is used to close down the browser after each test 
    await browser.close();
    fixture.logger.close();

});
