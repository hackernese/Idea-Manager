const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require("cy-verify-downloads");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", verifyDownloadTasks);
      // implement node event listeners here
    },
  },
});
