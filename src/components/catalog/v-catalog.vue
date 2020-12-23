<template>
  <div class="v-catalog">

    <router-link :to="{name: 'cart', params: {cart_data:CART}}">
      <div class = "v-catalog__link_to_cart">Cart: {{ CART.length }}</div>
    </router-link>

    <p>Catalog</p>
    <v-select
      :selected="selected"
      :options="categories"
      @select="sortByCategories"
    />
    <div class = "range-slider">
      <input 
        type="range"
        min = "0"
        max = "10000" 
        step = "10"
        v-model.number="minPrice"
        @change="setRangeSlider"
      >
      <input 
        type="range" 
        min = "0" 
        max = "10000" 
        step = "10"
        v-model.number="maxPrice"
        @change="setRangeSlider"
      >
    </div>

    <div class="range-values">
      <p>Min: {{minPrice}}</p>
      <p>Max: {{maxPrice}}</p>
    </div>

    <div class="v-catalog_list">
      <v-catalog-item 
        v-for = "product in sortedProducts" 
        :key = "product.article"
        :product_data = "product"
        @add = "addToCart"
      />
    </div>
  </div>
</template>

<script>
import vCatalogItem from './v-catalog-item'
import {mapActions, mapGetters} from 'vuex'
import vSelect from '../v-select'

export default {
  name: 'v-catalog',
  components: {
    vCatalogItem,
    vSelect
  },
  props: {

  },

  data() {
    const allOption = {name: 'Все', value: 'all'};
    return {
      categories: [
        {name: 'Мужские', value: 'м'},
        {name: 'Женские', value: 'ж'},
        allOption,
      ],
      selected:allOption,
      sortedProducts:[],
      minPrice:0,
      maxPrice:10000
    }
},
  methods: {
    ...mapActions([
      "GET_PRODUCTS_FROM_API",
      "ADD_TO_CART"
    ]),
    addToCart(product) {
      this.ADD_TO_CART(product);
      console.log(product);
    },
    sortByCategories(category) {
      this.selected = category;
      this.sortedProducts = this.PRODUCTS.filter((item) => {
        return item.price >= this.minPrice && item.price <= this.maxPrice;
      });
      this.sortedProducts = this.sortedProducts.filter((e) => {
        return e.category === category.name || this.selected.name === 'Все';
      })
    },
    setRangeSlider() {
      if(this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = tmp;
      }
      this.sortByCategories(this.selected);
    }
  },
  computed: {
    ...mapGetters([
      "PRODUCTS",
      "CART"
    ]),
  },
  async mounted() { 
    await this.GET_PRODUCTS_FROM_API()
    this.sortedProducts = this.PRODUCTS;
  }
}
</script>

<style lang = "scss">
  .v-catalog {
    &_list {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin-top:30px;
    }

    &__link_to_cart {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: $padding*2;
      border: solid 1px grey;
    }

    .range-values {
      position: absolute;
      left: 60%;
      top: 65px;
    }

    .range-slider input[type=range] {
        position: absolute;
        left: 50%;
        top: 100px;
    }

    ::-webkit-slider-thumb {
        z-index: 2;
        position: relative;
        top: 2px;
        margin-top: -7px;     
    }

    input[type=range]{
        -webkit-appearance: none;
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 300px;
        height: 5px;
        background: #ddd;
        border: none;
        border-radius: 3px;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        border: 1.5px solid #C1C1C1;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #EDEDED;
    }

    input[type=range]:focus {
        outline: none;
    }

    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 5px;
        box-shadow: 1px 1px 1px #C6C6C6, 0px 0px 1px #787878;
        border-radius: 2px;
        border: 0.2px solid #787878;
    }
  }
</style>
