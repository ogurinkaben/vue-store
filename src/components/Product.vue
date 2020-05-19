<template>
  <div class="product p-0">
    <MainNav />
    <section class="hero sm scroll-area">

      <div class="container content text-center">
        <div>
          <h1 class="title">{{ $route.params.name}}</h1>
        </div>
      </div>

    </section>
    <section class="sec pt-4 pb-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6 pt-5">
            <carousel class="col-lg-12 p-0" :items="1" :autoplay="true" :loop="true" :nav="false" :margin="10" :dots="true">
              <div v-for="image in $route.params.images" class="single-product-image
">
                <img :src="image">
              </div>
            </carousel>
          </div>
          <div class="col-lg-6 pt-5">
            <div class="single-product ">
              <h1 class="title">{{ $route.params.name}}</h1>
              <div class="desc" v-html="$route.params.description"></div>
              <p class="price">{{ $route.params.price | currencyFormatted}}</p>
              <AddToCart :product-id="$route.params.id" :name="$route.params.name" :price="$route.params.price" :image="getImage($route.params.images)" />
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import MainNav from "@/components/MainNav.vue";
import { fb, db } from '../firebase.js';
import carousel from 'vue-owl-carousel';
import AddToCart from "../components/AddToCart.vue";
export default {
  name: "Product",
  props: ["productPath"],
  data() {
    return {
      productURL: null
    }
  },
  components: {
    carousel,
    AddToCart,
    MainNav
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
.single-product-image {
  display: flex;
  min-height: 100px;
  align-items: center;
  justify-content: center;
}

.single-product-image img {
  width: 100%;
  height: 400px !important;
  object-fit: contain;
  display: inline-block;
  border-radius: 8px;
  margin: 0 auto;
}

.single-product .title {
  font-size: 48px;
  font-weight: bolder;
  letter-spacing: 1.4px;
  color: var(--primary_color);

}

.single-product .desc {
  font-size: 16px;
  color: #1c1c1c;
  font-weight: normal;

}

h4 {
  font-size: 1rem !important;
}

ul {
  padding-left: 0;
}

.single-product .price {
  font-size: 32px;
  font-weight: bolder;
  letter-spacing: 1.4px;
  color: var(--primary_color);
}

@media screen and (max-width: 768px) {
  .single-product-image img {
    object-fit: cover;
  }
}

</style>
