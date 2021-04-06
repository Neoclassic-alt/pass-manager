<template>
  <v-card class="mx-auto mt-10"
  max-width="900px">
      <v-card-title>Добро пожаловать в менеджер паролей!</v-card-title>
      <v-card-text>Здесь вы можете управлять своими паролями.</v-card-text>
      <v-card-actions>
        <router-link to="/mypasses">
          <v-btn
          color="blue darken-1"
          text
        >
          Перейти к управлению паролями
          </v-btn>
        </router-link>
      </v-card-actions>
  </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>