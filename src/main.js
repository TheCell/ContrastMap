import Vue from 'vue'
import App from './App.vue'
import './assets/foundation/js/vendor/what-input.js'
import './assets/foundation/js/vendor/foundation.js'
import './assets/foundation/css/foundation.css'
import './assets/jquery/jquery-3.2.1.min.js'
import testModul from './modules/testmodul.js'
import myComp from './components/testComp.vue'
import markerwindow from './components/markerwindow.vue'
import introwindow from './components/introscreen.vue'
import outrowindow from './components/outroscreen.vue'
import VueRouter from 'vue-router'

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

Vue.use(VueRouter);
Vue.component("my-comp", myComp);
Vue.component("markerwindow", markerwindow);
Vue.component("introwindow", introwindow);
Vue.component("outrowindow", outrowindow);

const routes = [
  { path: '/home', component: Vue.component(Vue)},
  { path: '/markertest', component: Vue.component(markerwindow)}
]

const router = new VueRouter(
  {
    routes
  }
)

// display markers
/*
contentfulClient.getAsset("mapstyle")
  .then(entry => {
    let marker = new google.maps.Marker({
      position: { lat: 47.070978, lng: 8.282165 },
      icon: "https:" + entry.fields.file.url,
      map: this.map
    });
  });
*/

new Vue({
  el: '#app',
  methods:
  {
    // not in use
    switchText: function (button)
    {
      alert("jo");
    }
  },
  render: h => h(App)
});