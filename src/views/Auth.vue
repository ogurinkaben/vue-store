<template>
	<div class="auth">
		<MainNav />
		<div class="container mt-5 pt-5 auth-area">
			<div class="card mx-auto border-0 col-lg-6 mx-auto pt-5 pb-5">
				<div class="card-header border-bottom-0 bg-transparent">
					<ul class="nav nav-tabs nav-justified" id="pills-tab" role="tablist">
						<li class="nav-item">
							<a class="nav-link active my-text-primary" id="pills-login-tab" data-toggle="pill" href="#pills-login" role="tab" aria-controls="pills-login" aria-selected="true">Login</a>
						</li>

						<li class="nav-item">
							<a class="nav-link my-text-primary" id="pills-register-tab" data-toggle="pill" href="#pills-register" role="tab" aria-controls="pills-register" aria-selected="false">Register</a>
						</li>
					</ul>
				</div>

				<div class="card-body pb-4">
					<div class="tab-content" id="pills-tabContent">

						<div class="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="pills-login-tab">
							<h4 class="form-heading">Welcome back</h4>
							<form @submit.prevent>
								<p v-if="inputErrors.length" class="form-error">
									<ul>
										<li v-for="error in inputErrors">{{ error }}</li>
									</ul>
								</p>
								<div class="form-group">
									<input type="email" v-model="signInEmail" name="email" class="form-field" id="email" placeholder="Email" required autofocus>
								</div>

								<div class="form-group">
									<input type="password" v-model="signInPassword" name="password" class="form-field" id="password" placeholder="Password" required>
								</div>
								<div class="col-lg-12 mt-2 mb-1" v-if="loading">
									<div>
										<div class="sp sp-slices"></div>

									</div>
								</div>

								<div class="text-center pt-4">
									<button type="submit" class="btn btn primary_btn" @click="loginUser">Login</button>
								</div>

								<div class="text-center pt-2 mt-5">
									<a class=" small my-text-primay" href="#">Forgot Your Password?</a>
								</div>
							</form>
						</div>

						<div class="tab-pane fade" id="pills-register" role="tabpanel" aria-labelledby="pills-register-tab">
							<h4 class="form-heading">Register to get started</h4>
							<form @submit.prevent>
								<p v-if="inputErrors.length" class="form-error">
									<ul>
										<li v-for="error in inputErrors">{{ error }}</li>
									</ul>
								</p>
								<div class="form-group">
									<input type="text" v-model="userFirstName" name="username" id="name" class="form-field" placeholder="First Name" required autofocus>
								</div>
								<div class="form-group">
									<input type="text" v-model="userLastName" name="username" id="name" class="form-field" placeholder="Last Name" required autofocus>
								</div>

								<div class="form-group">
									<input type="email" v-model="userEmail" name="email" id="email" class="form-field" placeholder="Email" required>
								</div>
								<div class="form-group">
									<input type="number" v-model="userPhoneNumber" name="phone" id="email" class="form-field" placeholder="Phone Number" required>
								</div>

								<div class="form-group">
									<input type="password" v-model="userPassword" name="password" id="password" class="form-field" placeholder="Set a password" required>
								</div>

								<div class="form-group">
									<input type="password" v-model="confirmUserPassword" name="password_confirmation" id="password-confirm" class="form-field" placeholder="Confirm password" required>
								</div>
								<div class="col-lg-12 mt-2 mb-1" v-if="loading">
									<div class>
										<div class="sp sp-slices"></div>
									</div>
								</div>
								<div class="text-center pt-2 pb-1">
									<button type="submit" class="btn btn primary_btn" @click="signUpUser">Register</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import MainNav from "@/components/MainNav.vue";
import { fb, db } from '../firebase.js';
export default {
	name: "Auth",
	components: {
		MainNav
	},
	data() {
		return {
			signInEmail: null,
			signInPassword: null,
			userFirstName: null,
			userLastName: null,
			userEmail: "",
			userState: "",
			userCountry: "",
			userPhoneNumber: "",
			address: "",
			userPassword: null,
			confirmUserPassword: null,
			loading: false,
			inputErrors: [],
		}
	},
	methods: {
		loginUser: function() {
			if (this.signInEmail && this.signInPassword) {
				this.loading = true;
				setTimeout(() => {
					fb.auth().signInWithEmailAndPassword(this.signInEmail, this.signInPassword)
						.then(() => {
							Toast.fire({
								icon: 'success',
								title: 'Login Success'
							})
							this.$router.replace('/dashboard/');
							this.loading = false;
						})
						.catch((error) => {
							Toast.fire({
								icon: 'error',
								title: 'An error has occured'
							});
							// Handle Errors here.
							this.loading = false;
							var errorCode = error.code;
							var errorMessage = error.message;
							if (errorCode === 'auth/wrong-password') {
								Toast.fire({
									icon: 'error',
									title: 'An error has occured'
								});
								this.inputErrors.push('Password or email incorrect');
								setTimeout(() => {
									this.inputErrors = [];
								}, 5000)
							} else {
								this.inputErrors.push(errorMessage);
								setTimeout(() => {
									this.inputErrors = [];
								}, 5000)
							}
							console.log(error);
						});
				}, 5000);
			} else {
				if (!this.signInEmail || !this.signInPassword) {
					this.inputErrors.push('Please Ensure your Sign-in Details are correct');
					setTimeout(() => {
						this.inputErrors = [];
					}, 5000)
				}
			}
		},
		signUpUser: function() {
			if (this.userEmail && this.userPassword && this.userPassword === this.confirmUserPassword) {
				this.loading = true;
				setTimeout(() => {
					fb.auth().createUserWithEmailAndPassword(this.userEmail, this.userPassword)
						.then((user) => {
							this.loading = false;
							db.collection("users").doc(user.user.uid).set({
									firstName: this.userFirstName,
									lastName: this.userLastName,
									phoneNumber: this.userPhoneNumber,
									state: this.userState,
									country: this.userCountry,
									address: this.address
								})
								.then(function() {
									console.log("User Created successfully!");
								})
								.catch(function(error) {
									console.error("Error writing document: ", error);
								});
							this.$router.replace('/dashboard/');
						})
						.catch((error) => {
							var errorCode = error.code;
							var errorMessage = error.message;
							if (errorCode == 'auth/weak-password') {
								alert('Password is weak')
							} else {
								alert(errorMessage);
							}
							console.log(error);
						});
				}, 5000);
			} else {
				if (!this.userEmail) {
					this.inputErrors.push('Email Required');
					setTimeout(() => {
						this.inputErrors = [];
					}, 5000)
				}
				if (!this.userPassword) {
					this.inputErrors.push('Password Required');
					setTimeout(() => {
						this.inputErrors = [];
					}, 5000)
				}
				if (this.userPassword != this.confirmUserPassword) {
					this.inputErrors.push('Passwords do not match');
					setTimeout(() => {
						this.inputErrors = [];
					}, 5000)
				}
			}
		}
	}
};

</script>

<style scoped>
.auth {
	min-height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
}

.form-heading {
	margin: 3rem 0;
	font-size: 24px;

}

.nav-tabs {
	padding: 0;
}

.nav-tabs .nav-link {
	font-size: 16px;
	display: inline-block;
	min-height: 100%;
	border-radius: 0;
	width: 100%;
	color: var(--primary_color);
}

.nav-tabs .nav-link.active {
	background: var(--primary_color);
	color: #fff;
}

</style>
