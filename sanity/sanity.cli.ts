import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  project: {
    basePath: '/studio'
  },
  api: {
    projectId: 'bi8xjpyk',
    dataset: 'production'
  }
})
