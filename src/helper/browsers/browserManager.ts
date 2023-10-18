import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";
import { openSync } from "fs";

const options: LaunchOptions = {
    headless: true,
}
export const invokeBrowser = () => {
const browserType = process.env.BROWSER

    switch (browserType) {
        case "chrome": 
           return chromium.launch(options);

        case "firefox": 
            return firefox.launch(options);

        case "webkit":
            return webkit.launch(options);

    default:
        throw new Error("Please set the correct browser!")

    }

}