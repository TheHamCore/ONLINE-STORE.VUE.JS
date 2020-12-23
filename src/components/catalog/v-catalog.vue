<template>
  <div class="v-catalog">

    <router-link :to="{name: 'cart', params: {cart_data:CART}}">
      <div class = "v-catalog__link_to_cart">Cart: {{ CART.length }}</div>
    </router-link>

    <p>Catalog</p>
    <v-select
      :selectedOptions="selected"
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
        v-for = "product in filterProducts" 
        :key = "product.article"
        :product_data = "product"
        @emitAddEvent = "addToCart"
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
    return {
      categories: [
        {name: 'Мужские', value: 'м'},
        {name: 'Женские', value: 'ж'},
        {name: 'Все', value: 'all'}
      ],
      selected:'Все',
      sortedProducts:[],
      minPrice:0,
      maxPrice:1000
    }
},
  methods: {
    ...mapActions([
      "GET_PRODUCTS_FROM_API",
      "ADD_TO_CART"
    ]),
    addToCart(product) {
      this.ADD_TO_CART(product);
      console.log(product); //выводит объект, по которому нажали
    },
    sortByCategories(category) {
      let vm = this;
      this.sortedProducts = [...this.PRODUCTS];
      this.sortedProducts = this.sortedProducts.filter(function(item) {
        return item.price >= vm.minPrice && item.price <= vm.maxPrice;
      });
      if(category) {
        this.sortedProducts = this.sortedProducts.filter(function(e) {
          vm.selected = category.name;
          return e.category === category.name;
        })
      }
      // this.sortedProducts = [];
      // let vm = this;
      // this.PRODUCTS.filter(function(item) {
      //   if(item.category === category.name) {
      //     vm.sortedProducts.push(item);
      //   }
      // })
      // this.selected = category.name;
    },
    setRangeSlider() {
      if(this.minPrice > this.maxPrice) {
        let tmp = this.maxPrice;
        this.maxPrice = this.minPrice;
        this.minPrice = tmp;
      }
      this.sortByCategories();
    }
  },
  computed: {
    ...mapGetters([
      "PRODUCTS",
      "CART"
    ]),
    filterProducts() {
      if(this.sortedProducts.length) {
        return this.sortedProducts;
      } else {
        return this.PRODUCTS;
      }
    }
  },
  mounted() { //чтобы получить данные=>необходимо вызвать этот метод, в котором мы получаем данные по API
    this.GET_PRODUCTS_FROM_API()
    .then((response) => {
      if(response.data) {
        console.log('Data arrived from mounted');
      }
    })
  }
}
</script>

<style lang = "scss">
  .v-catalog {
    &_list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
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
