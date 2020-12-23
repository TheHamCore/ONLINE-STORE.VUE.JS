<template>
  <div class="v-catalog-item">

    <v-popup
      v-if="is_info_popup_visible"
      @close_popup='change_poput_visibility'
      right_btn_title="Add to cart"
      :poput_title="product_data.name"
      @click_on_add_btn="click_on_add_btn"
    >
    <img 
      class = "v-catalog-item__image" 
      v-bind:src=" require('../../assets/images/' + product_data.image)" alt="img"
    >
    <div>
      <p class = "v-catalog-item__name">{{ product_data.name }}</p>
      <p class = "v-catalog-item__price">Price: {{ product_data.price }} Р</p>
      <p class = "v-catalog-item__price">Category: {{ product_data.category }}</p>
    </div>
  
    </v-popup>

    <img 
      class = "v-catalog-item__image" 
      v-bind:src=" require('../../assets/images/' + product_data.image)" alt="img"
    >

    <p class = "v-catalog-item__name">{{ product_data.name }}</p>
    <p class = "v-catalog-item__price">Price: {{ product_data.price }} Р</p>

    <button
      class="v-catalog-item__show-info"
      @click="change_poput_visibility"
    >
      Show info
    </button>
    
    <button 
      class = "v-catalog-item_add_to_cart_btn btn"
      @click = "click_on_add_btn"
    >
      Add to cart
    </button>  
  </div>
</template>

<script>
import vPopup from '../popup/v-popup'


export default {
  name: 'v-catalog-item',
  components: {
    vPopup
  },
  props: {
    product_data: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      is_info_popup_visible: false
    }
  },
  methods: {
    click_on_add_btn() {
      this.$emit('add', this.product_data);
    },
   change_poput_visibility() {
      this.is_info_popup_visible = !this.is_info_popup_visible;
    },
  },
  mounted() {
    this.$set(this.product_data, 'quantity', 1); //add key("quantity")
  }
}
</script>

<style lang = "scss">
  .v-popup {
    padding: $padding*2;
    position: fixed;
    top: 50px;
    right: 0;
    left: 0;
    width: 400px;
  }
  .v-catalog-item {
    margin-right: $margin*2;
    flex-basis: 25%;
    box-shadow: 0 0 8px 0;
    margin-bottom: $margin*2;
    padding: $padding*2;
    &__image {
      height: 200px;
      width: 100px;
    }
  }
</style>
