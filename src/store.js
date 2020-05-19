import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex)
let cart = window.localStorage.getItem('cart')
const store = new Vuex.Store({
	state: {
		cart: cart ? JSON.parse(cart) : [],
	},
	mutations: {
		addToCart(state, item) {
			let found = state.cart.find(product => product.productID === item.productID)
			if (found) {
				found.productQuantity++;
				this.commit('saveData');
			} else {
				state.cart.push(item);
				this.commit('saveData');
			}
		},
		saveData(state) {
			window.localStorage.setItem('cart', JSON.stringify(state.cart))
		},
		removeItemFromCart(state, item) {
			let index = state.cart.indexOf(item);
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.value) {
					state.cart.splice(index, 1);
					this.commit('saveData');
					Toast.fire({
						icon: 'success',
						title: 'Deleted  successfully'
					})
				}
			})
		}
	}
})
export default store;
