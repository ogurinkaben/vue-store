<template>
	<div>
		<MainNav />
		<section class="hero sm scroll-area">

			<div class="container content text-center">
				<div>
					<h1 class="title">Your
						<span class="my-text-primay"> Cart </span></h1>
				</div>
			</div>

		</section>
		<div class="page-section pt-5 pb-5">
			<div class="container mt-5 pt-4">
				<div class="row">
					<section class="pt-3 pb-4 col-lg-8">
						<div v-if="		this.$store.state.cart.length < 1">
							<h4>Cart is empty</h4>
						</div>
						<div v-if="		this.$store.state.cart.length > 0">
							<ul class="products container">
								<li class="row align-items-center product" v-for="(item,index) in this.$store.state.cart">
									<div class="col-lg-4 pl-0">
										<div class="thumbnail">
											<a href="#">
												<img :src="item.productImage" />
											</a>
										</div>

									</div>
									<div class="col-lg-4">
										<div class="detail">
											<div class="name"><a href="#" class="my-text-primay">{{ item.productName }}</a></div>
											<div class="price">{{ item.productPrice | currencyFormatted}}</div>
											<div class="remove">
												<a href="#" @click="$store.commit('removeItemFromCart', item)">Remove item</a>
											</div>
										</div>
									</div>
									<div class="col-lg-4">
										<div class="quantity">
											<label class="label small">Quantity</label>
											<div class="h-100 d-flex align-items-center mt-3">
												<div class="value-button" id="decrease" @click="decreaseValue(index)" value="Decrease Value">-</div>
												<input type="number" id="number" value="0" step="1" :value="item.productQuantity" @input="updateQuantity(index, $event)" @blur="checkQuantity(index, $event)" />
												<div class="value-button" id="increase" @click="increaseValue(index)" value="Increase Value">+</div>
											</div>

										</div>

									</div>

								</li>
							</ul>
						</div>

					</section>

					<section class="col-lg-4 mt-lg-5 mt-3 order-summary" v-if="this.$store.state.cart.length > 0">
						<div class="p-3">
							<h4 class="heading">Order Summary</h4>
							<p class="items-in-cart">ITEMS {{ itemCount }} <span>{{ subTotal | currencyFormatted }} </span></p>
							<div class="summary">
								<p class="shipping-fee">Shipping fee <span>{{ shipping | currencyFormatted }}</span></p>
								<p class="total-price">TOTAL PRICE <span>{{ totalPrice | currencyFormatted }}</span></p>

							</div>

							<div class="checkout">
								<button type="button" class=" btn primary_btn text-white w-100">PROCEED TO CHECKOUT</button>
							</div>
						</div>
					</section>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import MainNav from "@/components/MainNav.vue";
export default {
	name: "Cart",
	props: {},
	components: {
		MainNav,
	},
	data() {
		return {
			shipping: 5,
			promoCode: "",
			discount: 0
		}
	},
	computed: {
		itemCount: function() {
			var count = 0;
			for (var i = 0; i < this.$store.state.cart.length; i++) {
				count += parseInt(this.$store.state.cart[i].productQuantity) || 0;
			}
			return count;
		},
		subTotal: function() {
			var subTotal = 0;
			for (var i = 0; i < this.$store.state.cart.length; i++) {
				subTotal += this.$store.state.cart[i].productQuantity * this.$store.state.cart[i].productPrice;
			}
			return subTotal;
		},
		totalPrice: function() {
			return this.subTotal + this.shipping;
		}
	},
	filters: {
		currencyFormatted: function(value) {
			return Number(value).toLocaleString("en-US", {
				style: "currency",
				currency: "USD"
			});
		}
	},
	methods: {
		increaseValue(index) {
			this.$store.state.cart[index].productQuantity++;
			this.$store.commit('saveData', this.item)
		},
		decreaseValue(index) {
			this.$store.state.cart[index].productQuantity--;
			if (this.$store.state.cart[index].productQuantity < 1) {
				this.$store.state.cart[index].productQuantity = 1;
			}
			this.$store.commit('saveData', this.item)
		},
		updateQuantity: function(index, event) {
			var product = this.$store.state.cart[index];
			var value = event.target.value;
			var valueInt = parseInt(value);
			if (value === "") {
				product.productQuantity = value;
			} else if (valueInt > 0 && valueInt < 100) {
				product.productQuantity = valueInt;
			}
			this.$set(this.$store.state.cart, index, product);
		},
		checkQuantity: function(index, event) {
			if (event.target.value === "") {
				var product = this.$store.state.cart[index];
				product.productQuantity = 1;
				this.$set(this.$store.state.cart, index, product);
			}
		},
		// checkPromoCode: function() {
		// 	for (var i = 0; i < this.promotions.length; i++) {
		// 		if (this.promoCode === this.promotions[i].code) {
		// 			this.discount = parseFloat(
		// 				this.promotions[i].discount.replace("%", "")
		// 			);
		// 			return;
		// 		}
		// 	}
		// 	alert("Sorry, the Promotional code you entered is not valid!");
		// }
	}
};

</script>
<style scoped>
.products {
	padding: 0;

}

.products li {
	margin: 1rem auto;
}

.thumbnail img {
	height: 150px;
	width: 100%;
	object-fit: cover;
}

.quantity {
	padding: 5px;
}

.label {
	display: none;
	font-size: 14px;
	color: #1c1c1c;
}

@media screen and (max-width: 768px) {
	.thumbnail img {
		height: auto;
	}



	.label {
		display: inline-block;
	}

	.products li {
		margin: 2.4rem auto;
	}
}

.detail {
	padding: 16px 5px;
}

.detail .name {
	font-size: 15px;
	font-weight: bolder;
	color: #1c1c1c;
}

.detail .name a {
	transition: 0.4s ease-in-out;
}

.detail .name:hover a {
	color: var(--primary_color);
	text-decoration: none;
}

.detail .price {
	font-weight: bold;
	font-size: 16px;
	color: #17b340;
	margin: 8px 0;
}

.remove a {
	font-size: 12px;
	color: #00f;
	transition: 0.4s ease-in-out;
	text-decoration: none;
	display: inline-block;
}

.remove a:hover {
	text-decoration: line-through;
}

.order-summary {
	padding: 10px;
	background: #f9f9f9;
	display: flex;
	align-items: center;
}

.order-summary .heading {
	font-size: 16px;
	color: var(--primary_color);
	font-weight: 400;
}

.shipping-fee,
.total-price,
.items-in-cart {
	font-size: 16px;
	font-weight: bold;
	color: #1c1c1c;
	margin: 16px auto;
}

.shipping-fee span,
.total-price span,
.items-in-cart span {
	color: #17b340;
}

@media screen and (max-width: 768px) {
	.list-header {
		display: none !important;
	}
}

.value-button {
	padding: 3px 16px;
	border: 1px solid #c4c4c4;
	height: 35px;
}

.value-button:hover {
	cursor: pointer;
}


input#number {
	text-align: center;
	border: none;
	border-top: 1px solid #ddd;
	border-bottom: 1px solid #ddd;
	margin: 0px;
	width: 100px;
	height: 35px;
	padding: 8px 16px;
	font-size: 14px;
	color: var(--primary_color);
	font-weight: bolder;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

/* Firefox */
input[type=number] {
	-moz-appearance: textfield;
}

</style>
