<template>
  <v-app-bar app elevation="2">
    <v-toolbar-title>Melon</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-avatar>
      <v-img src="../resources/noavatar.jpg"></v-img>
    </v-avatar>
    <span class="ml-5">Добро пожаловать, {{user.name}}</span>
    <v-btn depressed fab class="ml-2">
      <v-icon
      color="blue darken-2">mdi-help</v-icon>
    </v-btn>
    <v-btn depressed fab>
      <v-icon
      color="blue darken-2">mdi-cog</v-icon>
    </v-btn>
    <v-btn depressed fab>
      <v-icon
      color="blue darken-2">mdi-login</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "AppBar",
  data() {
    return {
      user: {
        name: "Борис",
      }
    }
  }
}
</script>

<style scoped>
</style>