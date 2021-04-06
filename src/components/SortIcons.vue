<template>
    <span v-show="sorting">
        <v-icon class="ml-2" v-show="ascending">mdi-arrow-up-bold-circle</v-icon>
        <v-icon class="ml-2" v-show="!ascending">mdi-arrow-down-bold-circle</v-icon>
    </span>
</template>

<script>
export default {
    props: {
        sorting: Boolean,
        ascending: Boolean
    }
}
</script>

<style>

</style>