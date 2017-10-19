import Vue from 'vue'
import App from './App.vue'
import './assets/foundation/js/vendor/what-input.js'
import './assets/foundation/js/vendor/foundation.js'
import './assets/foundation/css/foundation.css'

import { createClient } from 'contentful'

import './style/style.scss'

$(document).foundation();

window.contentfulClient = createClient({
  accessToken: '2527ed31bc3821990700b9eb5e55f5facc701d91413fd17e1a5c5087829e551c',
  space: 'ssruiqlv9y3c'
});

contentfulClient.getEntries()
  .then((response) => console.log(response.items))
  .catch(console.error);

new Vue({
  el: '#app',
  render: h => h(App)
});
