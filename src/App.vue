<template>
  <div id="app">
    <v-app>
      <app-bar />
      <v-main class="amber lighten-4">
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AppBar from './components/AppBar.vue'
export default {
  components: { 
    AppBar,
   },
      
    }
</script>

<style lang="scss" scoped>
</style>
