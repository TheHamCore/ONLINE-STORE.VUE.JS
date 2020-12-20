<template>
  <div class="v-card">
    <p>CART</p>
    <v-cart-item
      v-for = "(item, index) in cart_data"
      :key = "item.article"
      :cart_data_item = "item"
      @deleteFromCart = "deleteFromCart(index)">
    </v-cart-item>  
  </div>
</template>

<script>

import vCartItem from './v-cart-item'
import { mapActions } from 'vuex'


export default {
  name: 'v-card',
  components: {
    vCartItem
  },
  props: {
    cart_data: {
      type: Array,
      default() {
        return[]
      }
    }
  },
  data() {
    return {}
  },

  methods: {
    ...mapActions([
      "DELETE_FROM_CART"
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    }
  },
}
</script>

<style>
</style>

