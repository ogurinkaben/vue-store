<template>
	<button class=" btn primary_btn p-0 mt-2" @click="addToCart">
		Add to cart</button>
</template>

<script>
import { fb } from '../firebase.js';
export default {
	name: "AddToCart",
	components: {},
	props: {
		productId: String,
		name: String,
		price: String,
		image: String,
	},
	data() {
		return {
			item: {
				productName: this.name,
				productID: this.productId,
				productPrice: this.price,
				productImage: this.image,
				productQuantity: 1
			}
		}
	},
	mounted() {},
	methods: {
		addToCart() {
			var user = fb.auth().currentUser;
			if (user) {
				this.$store.commit('addToCart', this.item)
				Toast.fire({
					icon: 'success',
					title: 'Added to cart'
				})
			} else {
				Toast.fire({
					icon: 'error',
					title: 'You need to create an account or login to perform that action'
				})
			}
		}
	}
};

</script>
