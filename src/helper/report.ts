const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "./test-results",
  reportPath: "./",
  reportName: "Playwright Automation Report",
  pageTitle: "BookCart App test Report",
  displayDuration: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "112",
    },
    device: "Jamie - Laptop PC",
    platform: {
      name: "Windows",
      version: "10",
    },
  },
  customData: {
    title: "Run info",
    data: [
      { label: "Project", value: "Custom project" },
      { label: "Release", value: "1.2.3" },
      { label: "Cycle", value: "Smoke-1" },
    ],
  },
});