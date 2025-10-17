const { defineConfig} = require('cypress')

module.exports = defineConfig({
  viewportHeight: 880, //880 / mobile 860
  viewportWidth: 1280, //1280 / mobile 410
  e2e: {},
  //video: true,
  projectId: "jdu5yh"
})