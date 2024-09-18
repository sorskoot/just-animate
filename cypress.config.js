import { defineConfig } from 'cypress'

export default defineConfig({
  video: false,
  screenshot: false,
  defaultCommandTimeout: 45000,
  e2e: {
    setupNodeEvents(on, config) {},
  },
})
