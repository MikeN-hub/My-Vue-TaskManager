import { createApp } from 'vue'
import App from './App.vue'
import myComponents from '@/components/UI/index'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { myIcons } from '@/components/UI/index'

const app = createApp(App)

myComponents.forEach((component) => {
  app.component(component.name, component)
})
myIcons.forEach((icon) => library.add(icon))

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
