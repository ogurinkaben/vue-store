<template>
	<div class="">
		<nav id="nav-sidebar" class="bg-faded">
			<div>
				<div class="sidebar-content hidden-sm-down">
					<span class="sidebar-expand hidden-md-up" @click="toggleNav">
						<i class="ti-close"></i>
					</span>
					<div class="">
						<ul class="nav nav-pills flex-column">
							<li class="nav-item " @click="toggleNav">
								<router-link class="nav-link" to="/dashboard/"> Dashboard <span class="sr-only">(current)</span></router-link>
							</li>
							<li>
							<li class="nav-item " v-if="isAdmin" @click="toggleNav">
								<router-link class="nav-link" to="manage-products"> Manage Products </router-link>
							</li>
							<li class="nav-item " @click="toggleNav">
								<router-link class="nav-link" to="account"> Profile </router-link>
							</li>
							<li class="nav-item " @click="toggleNav">
								<router-link class="nav-link" to="fund-wallet">Fund Wallet</router-link>
							</li>
							<li class="nav-item ">
								<router-link class="nav-link" to="/" @click="toggleNav"> Go to Website </router-link>
							</li>
							<li class="nav-item bottom">
								<a class="nav-link" @click="logOutUser"><i class="ti-power-off text-danger"></i> Logout </a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
import { fb, db } from '../firebase.js';
export default {
	name: "DashboardSidebar",
	data() {
		return {
			isAdmin: false
		}
	},
	beforeCreate() {
		const user = fb.auth().currentUser;
		db.collection("users").doc(user.uid).get().then((doc) => {
			if (doc.data().role == 'admin') {
				this.isAdmin = true
			}
		}).catch(function(error) {
			console.log("Error getting document:", error);
		});
	},
	methods: {
		logOutUser: function() {
			fb.auth().signOut()
				.then(() => {
					this.$router.replace('/')
				})
				.catch((error) => {
					console.log(error)
				});
		},
		toggleNav: function() {
			$('#nav-sidebar').toggleClass("active");
		}
	}
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
