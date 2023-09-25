const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // chrome 117 bug fix, https://github.com/cypress-io/cypress-documentation/issues/5479
      on('before:browser:launch', (browser = {}, launchOptions) => {
      if (browser.name === 'chrome' && browser.isHeadless) {
        launchOptions.args = launchOptions.args.map((arg) => {
          if (arg === '--headless') {
            return '--headless=new'
          }
      
          return arg
        })
      }
      
      return launchOptions
      })
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'https://coding-test-platform.web.app',
    chromeWebSecurity: false,
  },
});
