import type { App } from 'vue'
import Primevue from 'primevue/config'

export default (app: App) => {
  app.use(Primevue, { unstyled: true })
}
