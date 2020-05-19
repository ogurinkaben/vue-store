<template>
	<section class="dashboard">
		<div class="dashboard_header d-flex align-items-center justify-content-between">
			<h1 class="title">Collections</h1>
			<button @click="toggleProductModal" class="btn primary_btn text-white ">Add product</button>
		</div>
		<!--                         <transition name="fade" appear>
                            <router-view></router-view>
                        </transition> -->
		<div class="account">
			<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="productModal">
				<div class="modal-dialog modal-lg modal-dialog-centered">

					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLongTitle " v-if=" modal=='new'">Add product</h5>
							<h5 class="modal-title" id="exampleModalLongTitle " v-if=" modal=='edit'">Edit product</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							<form @submit.prevent class="container pt-5">
								<div class="row">
									<div class="col-lg-12 row mb-3">
										<div class="image-area col-lg-3  mb-2" v-if="imageUpload" v-for="(image, index) in product.images">
											<img :src="image" class="img-fluid mx-auto">
											<a class="remove-image" @click="removeImage(index, image)" style="display: inline;"><i class="ti-close"></i></a>
										</div>

									</div>
									<div class="form-group col-md-6">
										<label class="form-label">Product Name</label>
										<input type="text" v-model="product.name" class="form-control form-field" placeholder="" required>
									</div>
									<div class="form-group col-md-6">
										<label class="form-label">Product Image</label>
										<input type="file" v-on:change="uploadImage" class="form-control form-field pt-1" placeholder="" required>
									</div>
									<div class="form-group col-md-12">
										<label class="form-label">Price</label>
										<input type="number" v-model="product.price" class="form-control form-field" placeholder="" required>
									</div>
									<div class="form-group col-md-12">
										<label class="form-label">Description</label>
										<vue-editor v-model="product.description" />
									</div>
								</div>
								<div class="form-group mt-5 mb-5 text-center">
									<button @click="addProduct()" class="btn primary_btn text-white " v-if="modal == 'new'">Add product</button>
									<button @click="updateProduct()" class="btn primary_btn text-white " v-if="modal == 'edit'">Update product</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div class="dashboard_body">

			</div>
			<div class="table_area table-responsive pt-4 pb-5 mt-4 hasWhiteBg p-3">
				<table id="dash-table" class="table  table-borderless" style="width:100%">
					<thead class="">
						<tr>
							<th>Image</th>
							<th>Name</th>
							<th>Short Description</th>
							<th>Amount</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="product in products">
							<td>
								<img :src="product.images[0]" alt="" class="image"></td>
							<td>{{product.name}}</td>
							<td v-html="product.description"></td>
							<td>{{product.price}}</td>
							<td>
								<button class="action edit" @click="editProduct(product)"><i class="ti-pencil"></i> </button>
								<button class="action delete" @click="deleteProduct(product)"><i class="ti-trash"></i> </button>
							</td>
						</tr>

					</tbody>
				</table>
			</div>
		</div>

	</section>

</template>

<script>
import { VueEditor } from "vue2-editor";
import { fb, db } from '../../firebase.js';
export default {
	name: "AddCollection",
	components: { VueEditor },
	data() {
		return {
			products: [],
			product: {
				name: null,
				price: null,
				description: null,
				images: [],
			},
			imageUpload: false,
			imageURL: null,
			tag: null,
			activeItem: null,
			modal: null
		}
	},
	firestore() {
		return {
			products: db.collection("products"),
		}
	},
	created() {
		$("#productModal").modal("hide");
	},
	methods: {
		reset() {
			this.product = {
				name: null,
				price: null,
				description: null,
				images: [],
			}
		},
		removeImage(index, image) {
			let img = fb.storage().refFromURL(image);
			this.product.images.splice(index, 1);
			img.delete().then(() => {
				Toast.fire({
					icon: 'success',
					title: 'Image Removed'
				})
			}).catch((error) => {
				Toast.fire({
					icon: 'error',
					title: 'An error occured'
				})
			})
		},
		uploadImage(e) {
			var file = e.target.files[0];
			var storageRef = fb.storage().ref('products/' + file.name);
			var uploadTask = storageRef.put(file);
			uploadTask.on('state_changed', (snapshot) => {
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				Toast.fire({
					icon: 'info',
					title: 'Uploading'
				})
			}, (error) => {
				Toast.fire({
					icon: 'error',
					title: 'An error occured'
				})
			}, () => {
				Toast.fire({
					icon: 'success',
					title: 'Image uploaded successfully'
				})
				uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					this.product.images.push(downloadURL);
					this.imageUpload = true;
					this.imageURL = downloadURL;
				});
			});
		},
		addTag() {
			this.tag.replace(/\s/, '').toLowerCase()
			if (this.product.tags.length > 2) {
				Toast.fire({
					icon: 'error',
					title: 'You can only add three tags'
				})
			} else {
				if (this.tag === " ") {
					Toast.fire({
						icon: 'error',
						title: 'add at least one tag'
					})
				} else {
					this.product.tags.push(this.tag);
				}
			}
			this.tag = "";
		},
		removeTag(index) {
			this.product.tags.splice(index)
		},
		toggleMenu() {
			$('#nav-sidebar').toggleClass("active");
		},
		readData() {
			db.product("products").get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					this.products.push(doc);
				});
			});
		},
		toggleProductModal() {
			this.modal = 'new';
			$("#productModal").modal("show");
			this.reset()
		},
		addProduct() {
			this.$firestore.products.add(this.product);
			$("#productModal").modal("hide");
			Toast.fire({
				icon: 'success',
				title: 'Added  successfully'
			})
		},
		deleteProduct(doc) {
			Swal.fire({
				title: 'Are you sure?',
				text: "You won't be able to revert this!",
				icon: 'warning',
				showCancelButton: true,
				confirmButtonColor: '#3085d6',
				cancelButtonColor: '#d33',
				confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.value) {
					this.$firestore.products.doc(doc.id).delete();
					Toast.fire({
						icon: 'success',
						title: 'Deleted  successfully'
					})
				}
			})
		},
		editProduct(product) {
			this.modal = 'edit';
			$("#productModal").modal("show");
			this.product = product;
		},
		updateProduct() {
			this.$firestore.products.doc(this.product.id).update(this.product);
			$("#productModal").modal("hide");
			Toast.fire({
				icon: 'success',
				title: 'Updated  successfully'
			})
		},
	},
};

</script>

<style scoped>
.image-area {
	position: relative;
	width: auto;
}

.image-area img {
	max-width: 100%;
	width: 100%;
	height: 100px;
	margin: 0 auto;
	object-fit: cover;
}

.remove-image {

	position: absolute;
	top: -10px;
	right: -10px;

}

.remove-image i {
	display: flex;
	height: 40px;
	width: 40px;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	padding: 6px;
	text-decoration: none;
	font: 16px;
	background: #555;
	border: 3px solid #fff;
	color: #FFF;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5), inset 0 2px 4px rgba(0, 0, 0, 0.3);
	text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
	-webkit-transition: background 0.5s;
	transition: background 0.5s;
}

.remove-image:hover {
	cursor: pointer;
}

#productModal {
	z-index: 145000;
}

</style>
