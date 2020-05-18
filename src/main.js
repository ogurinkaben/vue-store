import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
// jQuery
import jQuery from 'jquery';
// Popper.js
import "popper.js";
// Bootstrap
import "bootstrap";
// Custom CSS
import "./assets/app.css";
window.$ = window.jQuery = jQuery;
Vue.config.productionTip = false;
new Vue({
	router,
	render: h => h(App)
}).$mount("#app");
