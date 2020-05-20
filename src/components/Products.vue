<template>
  <div class="products">
    <section class="sec alt">
      <div class="container">
        <div class="row">
          <div class="col-lg-4" v-for="product in products">
            <div class="product text-center mt-3">
              <div>
                <div class="product-image">
                  <img :src="product.images[0]">
                </div>
              </div>
              <div class="product-details">
                <router-link :to="{ name: 'Product', params: {id: product.id, name: product.name, description:product.description, price:product.price, images:product.images} }">
                  <h1 class="title"> {{product.name}}</h1>
                </router-link>
                <div class="mt-4 d-flex justify-content-between align-items-center">
                  <div class="product-price">
                    <span>{{product.price | currencyFormatted}}</span>
                  </div>
                  <div>
                    <AddToCart :product-id="product.id" :name="product.name" :price="product.price" :image="getImage(product.images)" />
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
import { fb, db } from '../firebase.js';
import carousel from 'vue-owl-carousel';
import AddToCart from "../components/AddToCart.vue";
export default {
  name: "Products",
  props: ["productPath"],
  data() {
    return {
      productURL: null
    }
  },
  components: {
    carousel,
    AddToCart,
  },
  data() {
    return {
      products: [],
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
  firestore() {
    return {
      products: db.collection("products"),
    }
  },
  created() {
    db.collection("products").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.productURL = doc.id;
      });
    });
  },
  methods: {
    getImage(images) {
      return images[0]
    },
  }
};

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
