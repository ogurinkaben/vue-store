<template>
	<div class="">
		<nav class="navbar navbar-expand-lg navbar-dark">
			<div class="container-fluid">
				<router-link class="navbar-brand" to="/">
					<img alt="logo" src="../assets/logo.png" />
				</router-link>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#toggleNav" aria-controls="toggleNav" aria-expanded="false" aria-label="Toggle navigation">
					<span></span>
					<span></span>
				</button>
				<div class="collapse navbar-collapse" id="toggleNav">
					<ul class="navbar-nav align-items-center ml-auto text-left">
						<li class="nav-item">
							<router-link class="nav-link" to="/">Home</router-link>
						</li>
						<li class="nav-item">
							<router-link class="nav-link" to="/cart/"><i class="ti-shopping-cart"></i> ({{this.$store.state.cart.length }})</router-link>
						</li>
						<li class="nav-item" v-if="!userActive">
							<router-link class="nav-link btn primary_btn fill" to="/auth/">Account <i class="ti-user"></i></router-link>
						</li>
						<li class="nav-item" v-if="userActive">
							<div class="avatar">
								<div class="dropdown">
									<a class="m-0 p-0" id="navbarDropdown1" data-target="#" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
										<div class="initials">
											<span>{{userEmail.charAt(0)}}</span>
										</div>
									</a>
									<ul class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown1">
										<li>
											<router-link class="dropdown-item" to="/dashboard/">Dashboard </router-link>
										</li>
										<li>
											<router-link class="dropdown-item" to="/dashboard/account">Profile </router-link>
										</li>
										<div class="dropdown-divider"></div>
										<li><a class="dropdown-item" @click="logOutUser">Logout</a></li>
									</ul>
								</div>
							</div>
						</li>

					</ul>
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
			userActive: false,
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
		}
	},
	created() {
		var user = fb.auth().currentUser;
		if (user) {
			this.userActive = true;
			this.userEmail = user.email;
		}
	}
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* Navbar*/

.navbar-light .navbar-toggler,
.navbar-light .navbar-toggler:focus {
	background: none;
	border: none;
	outline: none;
}

.navbar {
	background: #000000;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	z-index: 1000;
}


.navbar .navbar-brand img {
	width: 64px;
	height: 64px;
	object-fit: contain;
}

.navbar-toggler {
	cursor: pointer;
	position: relative;
	width: 2.5rem;
	height: 2rem;
	padding: 0.5rem 0.75rem;
	font-size: 1.25rem;
	line-height: 1rem;
	border-radius: 0.25rem;
	border: none;
	padding: 0;
}

.navbar-toggler span {
	display: block;
	position: absolute;
	height: 3px;
	width: 50%;
	background: #fff;
	border-radius: 3px;
	opacity: 1;
	left: 25%;
	transform: rotate(0deg);
	transition: 0.25s ease-in-out;
}

.navbar-toggler span:nth-child(1) {
	top: 34.5%;
}

.navbar-toggler span:nth-child(2),
.navbar-toggler span:nth-child(3) {
	top: 50%;
}

.navbar-toggler span:nth-child(4) {
	top: 65.5%;
}

.navbar-toggler.open span:nth-child(1) {
	top: 18px;
	width: 0%;
	left: 50%;
}

.navbar-toggler.open span:nth-child(2) {
	transform: rotate(45deg);
}

.navbar-toggler.open span:nth-child(3) {
	transform: rotate(-45deg);
}

.navbar-toggler.open span:nth-child(4) {
	top: 18px;
	width: 0%;
	left: 50%;
}

.navbar-nav .nav-item {
	font-size: 14px;
	font-weight: 400;

}

.navbar-nav .nav-item .nav-link i,
.navbar-nav .nav-item .nav-link {
	color: #fff;
	transition: 0.4s ease-in-out;
}


.navbar-nav .nav-item .nav-link:hover:not(.my-btn) {
	color: var(--primary_color);
}

.navbar-nav .nav-link.router-link-exact-active {
	color: var(--primary_color);
}

</style>
