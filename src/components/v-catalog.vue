<template>
  <div class="v-catalog">

    <p>Catalog</p>

    <div class="v-catalog_list">
      <v-catalog-item v-for = "product in PRODUCTS" 
                      :key = "product.article"
                      v-bind:product_data = "product"
                      @addToCart="addToCart">
      </v-catalog-item>
    </div>
    
    

  </div>
</template>

<script>
import VCatalogItem from './v-catalog-item'
import {mapActions, mapGetters} from 'vuex'

export default {
  name: 'v-catalog',
  components: {
    VCatalogItem,
  },
  props: {},

  data() {
    return {}
},
  methods: {
    ...mapActions([
      "GET_PRODUCTS_FROM_API",
       "ADD_TO_CART"
    ]),
    addToCart(product) {
      this.ADD_TO_CART(product);
      console.log(product); //выводит объект, по которому нажали
    }
  },
  computed: {
    ...mapGetters([
      "PRODUCTS"
    ])
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
    }
  }
</style>
