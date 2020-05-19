import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import store from "./store.js";
// jQuery
import jQuery from 'jquery';
// Popper.js
import "popper.js";
// Bootstrap
import "bootstrap";
// Custom CSS
import "./assets/app.css";
import VueFirestore from "vue-firestore";
Vue.component('AddToCart', require('@/components/AddToCart.vue').default);
Vue.use(VueFirestore, {
	key: 'id',
	enumerable: true
});
import Swal from 'sweetalert2';
window.Swal = Swal;
const Toast = Swal.mixin({
	toast: true,
	position: 'top-end',
	showConfirmButton: false,
	timer: 6000,
	timerProgressBar: true,
	onOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
});
window.Toast = Toast;
window.$ = window.jQuery = jQuery;
Vue.config.productionTip = false;
import { fb } from './firebase.js';
let app = '';
fb.auth().onAuthStateChanged(function(user) {
	if (!app) {
		new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount("#app");
	}
});
