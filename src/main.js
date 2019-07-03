import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faAt } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faTelegram} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


// Fontawesome integration is pretty convoluted for just 3 icons

library.add(
  faAt,
  faTwitter,
  faTelegram
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

// Include axios as a replacement for the http client that Vue 1 had
// Note: it is apparently not considered good practice to add anything to the Vue prototype.
//       Needs to be replaced by better soluction
Vue.prototype.$http = axios

new Vue({
  render: h => h(App),
}).$mount('#app')
