<template>
    <div class="v-main-wrapper">
        <p> {{ title }} </p>
        <v-card></v-card>
        <v-catalog></v-catalog>
    </div>
</template>


<script>
    import vCatalog from './v-catalog';
    import vCard from './v-card';


export default {
    name: "v-main-wrapper",
    components: {
        vCatalog,
        vCard
    },
    props: {},
    data() {
        return {
            title: 'v-main-wrapper'
        }
    }

}
</script>


<style>
    .v-main-wrapper {
        max-width: 900px;
        margin: 0 auto;
    }
</style>