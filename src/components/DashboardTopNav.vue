<template>
	<div class="">
		<nav class="top-nav">
			<span class="sidebar-expand" @click="toggleNav">
				<i class="ti-view-grid"></i>
			</span>
			<div class="">
				<a class="topnav-brand" href="index.html">
					<!-- 									<img src="/assets/core/logo.png" alt="Justtawa Logo"> -->
				</a>
			</div>
			<div class="is-flex">
				<div class="is-flex pr-2">
					<div class="avatar">
						<div class="dropdown dropdown-menu-right">
							<a class="nav-link m-0 p-0" id="navbarDropdown1" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
								<div class="initials">
									<span>{{userEmail.charAt(0)}}</span>
								</div>
							</a>
							<ul class="dropdown-menu" aria-labelledby="navbarDropdown1">
								<li>
									<router-link class="dropdown-item" to="account">Profile </router-link>
								</li>
								<div class="dropdown-divider"></div>
								<li><a class="dropdown-item" @click="logOutUser">Logout</a></li>
							</ul>
						</div>
						<div>
							<span class="name">{{userEmail}}</span>
						</div>
					</div>
				</div>
				<div class="cart pl-1">
					<router-link to="/cart/" class="cart-link d-flex align-items-center">
						<i class="ti-shopping-cart"></i> ({{this.$store.state.cart.length }})
					</router-link>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
import { fb } from '../firebase.js';
export default {
	name: "DashboardTopNav",
	props: {
		msg: String
	},
	data() {
		return {
			userName: null,
			userEmail: null,
		}
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
		},
	},
	created() {
		const user = fb.auth().currentUser;
		this.userEmail = user.email;
		this.userName = user.displayName;
	},
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cart-link {
	color: var(--primary_color);
	font-size: 14px;
}

</style>
