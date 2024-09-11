import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import Button from 'primevue/button'
import Checkbox from 'primevue/checkbox'
import RadioButton from 'primevue/radiobutton'
import ToggleSwitch from 'primevue/toggleswitch'

import App from './App.vue'
import './assets/base.scss'
import 'primeicons/primeicons.css'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.component('Button', Button)
app.component('Checkbox', Checkbox)
app.component('RadioButton', RadioButton)
app.component('ToggleSwitch', ToggleSwitch)

app.mount('#app')
