import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import messages from './i18n'

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

const i18n = createI18n({
  locale: 'ro',
  fallbackLocale: 'en',
  messages,
})

app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.component('Button', Button)
app.component('Checkbox', Checkbox)
app.component('RadioButton', RadioButton)
app.component('ToggleSwitch', ToggleSwitch)

app.use(i18n)
app.mount('#app')
