import { createApp, nextTick } from 'vue'
import BusinessApp from './BusinessApp.vue'
import './style.css'
import { ScrollTrigger } from './composables/useGsap'

const app = createApp(BusinessApp)
app.mount('#app')

nextTick(() => {
  ScrollTrigger.refresh()
})
