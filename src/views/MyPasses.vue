<template>
  <div>
    <v-app-bar class="options mx-auto mt-10" color="transparent" flat>
      <v-toolbar-title class="display-1 mr-5" style="color: #545454">Мои пароли</v-toolbar-title>
      <router-link to="/mypasses/add">
        <v-btn
        color="#85DD7F">
        <span style="color:white"><v-icon class="mr-2">mdi-plus</v-icon>Новый пароль</span>
        </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <span style="color: #545454" class="headline mr-2">Сортировать:</span>
      <v-tabs
      background-color="transparent"
      color="#ED1C24"
      style="width:0"
      >
        <v-tabs-slider color="#ED1C24"></v-tabs-slider>
        <v-tab>по дате</v-tab>
        <v-tab>по названию</v-tab>
      </v-tabs>
    </v-app-bar>
    <pass-board 
    v-for="password_info in passwords_info"
    :pass_info="password_info"
    :key="password_info.id"
    />
    <div class="mx-auto mb-10" style="width: 250px">
      <router-link to="/mypasses/add">
        <v-btn
          color="#85DD7F"
          class="pa-6">
          <span style="color:white; font-size: 20px"><v-icon class="mr-2">mdi-plus</v-icon>Новый пароль</span>
        </v-btn>
      </router-link>
    </div>
  </div>
</template>

<script>
import PassBoard from "../components/PassBoard.vue"
import { mapState } from 'vuex'
export default {
  components: {
    PassBoard
  },
  data() {
    return {
      sorting_by: "date", // "date", "name"
    }
  },
  computed: mapState(['passwords_info']),
  mounted(){
    this.$store.dispatch('get_passwords')
  }
}
</script>

<style lang="scss">
.options {
  max-width: 1100px;
}
.selected {
  color:#ED1C24;
  text-decoration: underline;
}
</style>