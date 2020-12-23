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
      @onButtonDelete = "deleteFromCart(index)"
      @onClickBtnOfDecrement = "toDecrementItem(index)" 
      @onClickBtnOfIncrement = "toIncrementItem(index)"
    />
    <div class="v-cart__total">
      <p class="total__name">Total</p>
      <p>{{ cartTotalCost }}</p>
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
      "DELETE_FROM_CART",
      "INCREMENT_CART_ITEM",
      "DECREMENT_CART_ITEM"
    ]),
    deleteFromCart(index) {
      this.DELETE_FROM_CART(index);
    },
    toDecrementItem(index) {
      this.DECREMENT_CART_ITEM(index);
    },
    toIncrementItem(index) {
      this.INCREMENT_CART_ITEM(index);
    }
  },
  computed: {
    cartTotalCost() {
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

