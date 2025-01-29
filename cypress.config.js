const { defineConfig } = require("cypress");

module.exports = {
  reporter: 'cypress-mochawesome-reporter',
  video: false,
  screenshotsFolder: 'cypress/reports/images',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'Portfólio Cypress Rafael Macabu',
    timestamp: "longDate",
    embeddedScreenshots: true, 
    inlineAssets: true,
    saveAllAttempts: true
  },
  e2e: {
    baseUrl: "https://serverest.dev",
    defaultCommandTimeout: 6000,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); 
    },
  },
};
