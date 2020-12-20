<template>
    <div class="v-main-wrapper">
        <p> {{ title }} </p>
        <v-catalog></v-catalog>
        <v-cart 
            v-if = "CART.length"
            :cart_data = "CART">
            </v-cart>
    </div>
</template>


<script>
    import vCatalog from './v-catalog';
    import vCart from './v-cart';
    import { mapGetters } from 'vuex';



export default {
    name: "v-main-wrapper",
    components: {
        vCatalog,
        vCart
    },
    props: {},
    data() {
        return {
            title: 'v-main-wrapper'
        }
    },
    computed: {
        ...mapGetters([
            "CART"
        ])
    }

}
</script>


<style>
    .v-main-wrapper {
        max-width: 900px;
        margin: 0 auto;
    }
</style>