<template>
	<div class="dashboard-wrapper">
		<section class="dashboard">
			<div class="dashboard_header text-center">
				<h1 class="title">YOUR Wallet</h1>
			</div>
			<div class="dashboard_body">
				<div class=" pt-5 pb-3 mt-4 hasWhiteBg p-3 col-md-8 mx-auto">
					<form @submit.prevent>
						<div class="text-center wallet-info">
							<h4> Wallet Balance: <span>{{walletBalance | currencyFormatted}}</span></h4>
							<p>You can proceed to fund wallet bellow.</p>
						</div>

						<div class="col-lg-12 mt-2 mb-1" v-if="loading">
							<div class>
								<div class="sp sp-slices"></div>
							</div>
						</div>
						<div class="form-group mt-5 mb-5 text-center">
							<button type="submit" class="btn primary_btn" @click="showToast()">Fund Wallet</button>
						</div>
					</form>
				</div>
			</div>

		</section>
	</div>
</template>

<script>
import { fb, db } from '../../firebase.js';
export default {
	name: "Wallet",
	data() {
		return {
			walletBalance: null,
			loading: false
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
	created() {
		const user = fb.auth().currentUser;
		db.collection("users").doc(user.uid).get().then((doc) => {
			if (doc.exists) {
				this.walletBalance = doc.data().walletBalance;
			} else {
				console.log("No such document!");
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
	},
	methods: {
		showToast() {
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
				Swal.fire({
					position: 'top-center',
					icon: 'error',
					title: 'This feature is not available yet',
					showConfirmButton: false,
					timer: 3500
				})
			}, 5000)
		}
	}
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wallet-info h4 {
	font-size: 22px;
	font-weight: bolder;
}

.wallet-info h4 span {
	font-size: 28px;
	font-weight: bolder;
	color: var(--primary_color);
}

.wallet-info p {
	font-size: 16px;
	font-weight: 400;
	letter-spacing: 1.4px;
}

</style>
