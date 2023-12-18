const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {},
  experimentalMemoryManagement: true,
  screenshotOnRunFailure: false,
  watchForFileChanges: false,
  reporter: "nyan",
  numTestsKeptInMemory: 0,
  reporterOptions: {
    output: "output.json",
  },
  env: {
    host: ""
  }
});
