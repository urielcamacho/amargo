import { createApp, nextTick } from 'vue'
import App from './App.vue'
import './style.css'
import { ScrollTrigger } from './composables/useGsap'

const app = createApp(App)
app.mount('#app')

// Ensure ScrollTrigger recalculates after all components mount
nextTick(() => {
  ScrollTrigger.refresh()
})
