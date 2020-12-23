<template>
  <div class="v-card">
    <router-link :to="{name: 'catalog'}">
      <div class = "v-catalog__link_to_cart">Back to Catalog</div>
    </router-link>

    <p>CART</p>
    <p v-if = "!cart_data.length">There are no products in cart</p>
    <v-cart-item
      v-for = "(item, index) in cart_data" 
      :key = "item.article"
      :cart_data_item = "item"
      @on_btn_delete = "delete_from_cart(index)"
      @onclick_btn_of_decrement = "to_decrement_item(index)" 
      @onclick_btn_of_increment = "to_increment_item(index)"
    />
    <div class="v-cart__total">
      <p class="total__name">Total</p>
      <p>{{ cart_total_cost }}</p>
    </div>
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
      default: () => ([]) 
    }
  },
  methods: {
    ...mapActions([
      "DELETE_FROM_CART",
      "INCREMENT_CART_ITEM",
      "DECREMENT_CART_ITEM"
    ]),
    delete_from_cart(index) {
      this.DELETE_FROM_CART(index);
    },
    to_decrement_item(index) {
      this.DECREMENT_CART_ITEM(index);
    },
    to_increment_item(index) {
      this.INCREMENT_CART_ITEM(index);
    }
  },
  computed: {
    cart_total_cost() {
      let result = [];
      if(this.cart_data.length) {
        for(let item of this.cart_data) {
          result.push(item.price*item.quantity)
        }
        result = result.reduce(function(sum,element) {
          return sum + element;
        });
        return result
      } else {
        return 0;
      }
    }
  },
}
</script>

<style lang = "scss">
  .v-cart {
    margin-bottom: 100px;
    &__total {
      height: 15px;
      position: fixed;
      bottom: 0;
      right: 0;
      left: 0;
      padding: $padding*3;
      display: flex;
      justify-content: center;
      background:$green-bg;
      color: #ffffff;
      font-size: 10px;
      .total__name {
      margin-right: $margin*2;
      }
    }
  }
</style>

