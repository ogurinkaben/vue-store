<template>
	<button class=" btn primary_btn p-0 mt-2" @click="addToCart">
		Add to cart</button>
</template>

<script>
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
			this.$store.commit('addToCart', this.item)
			Toast.fire({
				icon: 'success',
				title: 'Added to cart'
			})
		}
	}
};

</script>
