const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {},
  experimentalMemoryManagement: true,
  screenshotOnRunFailure: false,
  watchForFileChanges: false,
  reporter: "nyan",
  reporterOptions: {
    output: "output.json",
  },
});
