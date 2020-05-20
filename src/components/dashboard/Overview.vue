<template>
	<div class="dashboard-wrapper">
		<section class="dashboard">
			<div class="dashboard_header text-left mb-5">
				<h1 class="title">Overview</h1>
			</div>
			<div class="row">
				<div class="col-lg-6">
					<div class="dash-card">
						<div>
							<div class="icon">
								<i class="ti-wallet"></i>
							</div>
							<div class="info">
								<p>Wallet</p>
								<h3>{{walletBalance | currencyFormatted}}</h3>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
import { fb, db } from '../../firebase.js';
export default {
	name: "Overview",
	data() {
		return {
			userEmail: null,
			walletBalance: null
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
		this.userEmail = user.email;
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
	methods: {}
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.dash-card {
	min-height: 250px;
	display: flex;
	align-items: center;
	box-shadow: 0 10px 35px rgba(0, 0, 0, 0.24);
	padding: 2rem;
	background: #fff;
	border-radius: 8px;
}

.dash-card .icon {
	padding: 10px 0;
}

.dash-card .icon i {
	font-size: 48px;
	color: var(--primary_color);
}

.dash-card .info p {
	font-size: 22px;
	font-weight: 400;
	letter-spacing: 1.4px;
}

.dash-card .info h3 {
	font-size: 28px;
	font-weight: bolder;
}

</style>
