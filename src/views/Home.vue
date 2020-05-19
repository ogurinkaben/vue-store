<template>
	<div class="home">
		<MainNav />
		<section class="hero container-fluid">
			<div class="row">
				<div class="col-lg-6 p-0 ">
					<div class="content text-left">
						<div class="col-12">
							<h1 class="title">Affordable
								<span class="my-text-primay">Airpods</span></h1>
							<p class="sub">"if I was going to listen to music, I was going to put on the headphones"</p>

						</div>
					</div>
				</div>
				<div class="col-lg-6  p-0 content right">

				</div>

			</div>
			<!-- 			<div class="scroll-down">
				<div class="scroll-down-text">Scroll</div>
				<div class="scroll-down-line"></div>
			</div> -->

		</section>
		<section class="about sec scroll-area">
			<div class="container-fluid p-0">
				<div class="row no-gutters align-items-center">
					<div class="img col-lg-6 p-0">
					</div>
					<div class="col-lg-6 p-0 pt-3 pb-3">
						<div class="content ">
							<div class="col-lg-8 mx-auto p-0">
								<h1 class="title">About<br> us</h1>
								<p class="sub">We try to have the kind of a culture that doesn’t value excuses in the sense that when you’re supposed to accomplish something, and you’re at a high level, then your job is to accomplish it, in spite of difficulty. And you’re rewarded for dealing with that.</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		<section class="sec is-img"></section>
		<Products />

		<section class="product p-0 sec scroll-area">
			<div class="container-fluid p-0">
				<div class="row no-gutters align-items-center reverse-column">

					<div class="col-lg-6 p-0 pt-3 pb-3">
						<div class="content ">
							<div class="col-lg-8 mx-auto p-0">
								<h1 class="title">Quality<br> Products</h1>
								<p class="sub">Quality questions create a quality life. Successful people ask better questions, and as a result, they get better answers. The way we communicate with others and with ourselves ultimately determines the quality of our lives. Eventually everything connects – people, ideas, objects. The quality of the connections is the key to quality per se.</p>
							</div>
						</div>
					</div>
					<div class="img col-lg-6 p-0">
					</div>
				</div>
			</div>
		</section>
		<section class="works sec scroll-area">
			<div class="container-fluid p-0">
				<div class="row no-gutters align-items-center ">
					<div class="img col-lg-6 p-0">
					</div>
					<div class="col-lg-6 p-0 pt-3 pb-3">
						<div class="content ">
							<div class="col-lg-8 mx-auto p-0">
								<h1 class="title">Get the<br> Best</h1>
								<p class="sub"><em>"I’ve come to the conclusion that people who wear headphones while they walk, are much happier, more confident, and more beautiful individuals than someone making the solitary drudge to work without acknowledging their own interests and power" </em>
									-Jason Mraz
								</p>
							</div>
						</div>
					</div>

				</div>
			</div>
		</section>
		<section class="colors sec scroll-area">
			<div class="container-fluid p-0">
				<div class="row no-gutters align-items-center reverse-column">

					<div class="col-lg-6 p-0 pt-3 pb-3">
						<div class="content ">
							<div class="col-lg-8 mx-auto p-0">
								<h1 class="title">Embrace<br> variety</h1>
								<p class="sub">If we cannot now end our differences, at least we can help make the world safe for diversity

								</p>
							</div>
						</div>
					</div>

					<div class="img col-lg-6 p-0">
					</div>
				</div>
			</div>
		</section>
		<section class="sec contact">
			<div class="container">
				<div class="content col-lg-6 mx-auto alt">
					<div class="col-lg-12">
						<h1 class="title text-center text-white alt">Leave us a message</h1>
					</div>
				</div>
				<div>
					<div class="">
						<div>
							<div class="container">
								<div class="contact row align-items-center">
									<div class="contact__wrapper col-lg-6 text-left">
										<p class="info">
											<i class="ti-map-alt"></i> Address <br />
											<span>
												7917 Squaw Creek Street

												<br />
												Bellmore, NY 11710
											</span>
										</p>
										<p class="info">
											<i class="ti-envelope"></i> General Support <br />
											<span>info@mystudio.tech</span>
										</p>
									</div>

									<div class="contact__wrapper col-lg-6">
										<div class="form-area">
											<h2 class="heading">Leave a message</h2>

											<form @submit.prevent="submitForm" class="text-left">
												<div class="form-group">
													<label for="full_name" class="input-label">Name *</label>
													<input id="full_name" name="full_name" type="text" required="required" class="input-field" />
												</div>
												<div class="form-group">
													<label for="email" class="input-label">Email *</label>
													<input id="email" name="email" type="email" required="required" class="input-field" />
												</div>
												<div class="form-group">
													<label for="phone_number" class="input-label">Phone Number *</label>
													<input id="phone_number" name="phone_number" type="text" required="required" class="input-field" />
												</div>
												<div class="form-group">
													<label for="message" class="input-label">Message *</label>
													<textarea id="message" name="message" rows="4" required="required" class="input-field"></textarea>
												</div>

												<div class="form-group">
													<input type="submit" class="btn primary_btn outline" value="SEND" />
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
// @ is an alias to /src
import MainNav from "@/components/MainNav.vue";
import Products from "@/components/Products.vue";
export default {
	name: "Home",
	components: {
		MainNav,
		Products
	}
};

</script>

<style scoped>

</style>
