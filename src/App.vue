<template>
  <div id="app">
    <v-app>
      <app-bar />
      <v-main>
        <div class="container">
          <router-view></router-view>
        </div>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import AppBar from './components/AppBar.vue'
    export default {
  components: { AppBar },
      
    }
</script>

<style lang="scss" scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
