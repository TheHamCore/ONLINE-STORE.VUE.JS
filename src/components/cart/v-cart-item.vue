<template>
  <div class="v-cart-item">
    <img 
      class = "v-cart-item__image"
      :src=" require('../../assets/images/' + cart_data_item.image)" alt="img"
    >

    <div class="v-cart-item__info">
      <p> {{ cart_data_item.name }} </p>
      <p> {{ cart_data_item.price }} </p>
      <p> {{ cart_data_item.article }} </p>
    </div>

    <div class="v-cart-item_quantity"> 
      <p>Quantity</p>
      <span>
        <span class="quantity__btn" @click="decrementItem">-</span>
        {{cart_data_item.quantity}}
        <span class="quantity__btn" @click="incrementItem">+</span>
      </span>
    </div>

    <button @click = "deleteFromCart">Delete</button>
  </div>
</template>

<script>



export default {
  name:'v-cart-item',
  props: {
    cart_data_item: {
      type:Object,
      default() {
        return {}
      }
    }
  },
  data(){
    return{}
  },
  methods:{
    deleteFromCart() {
      this.$emit('onButtonDelete')
    },
    decrementItem() {
      this.$emit('onClickBtnOfDecrement');
    },
    incrementItem() {
      this.$emit('onClickBtnOfIncrement');
    }
  },
  
}
</script>

<style lang ="scss">
  .v-cart-item {
    display: flex;
    height: 100px;
    justify-content: space-between;
    align-items: center;
    flex-wrap: nowrap;
    box-shadow: 0 0 8px 0;
    margin-bottom: $margin*2;
    padding: $padding*2;
    &__image {
      max-width: 50px;
    }
    .quantity__btn {
      cursor: pointer;
    }
  }
</style>
