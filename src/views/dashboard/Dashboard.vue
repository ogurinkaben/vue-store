<template>
	<div class="dashboard-wrapper">
		<div class="container-fluid">
			<div class="row">
				<div class="col-md-2">
					<DashboardSidebar />
				</div>
				<main class="">
					<DashboardTopNav />
					<!--/.Navbar -->
					<section class="dashboard">
						<transition name="fade" appear>
							<router-view></router-view>
						</transition>
					</section>
				</main>
			</div>
		</div>
	</div>
</template>

<script>
import DashboardSidebar from "@/components/DashboardSidebar.vue";
import DashboardTopNav from "@/components/DashboardTopNav.vue";
export default {
	name: "Dashboard",
	components: {
		DashboardSidebar,
		DashboardTopNav
	},
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
