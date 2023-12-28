const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
  },
  experimentalMemoryManagement: true,
  screenshotOnRunFailure: false,
  watchForFileChanges: false,
  numTestsKeptInMemory: 0,
  chromeWebSecurity: false,
  env: {
    host: "",
  },
});
