const { defineConfig } = require("cypress");

module.exports = {
  reporter: 'cypress-mochawesome-reporter',
  video: false,
  reporterOptions: {

    charts: true,

    reportPageTitle: 'Projeto Cypress',

    embeddedScreenshots: true, 

    inlineAssets: true, //Adds the asserts inline

  },
  e2e: {
    baseUrl: "https://serverest.dev",
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);    
    },
  },
};
