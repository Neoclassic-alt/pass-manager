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
      style="width: 200px"
      >
        <v-tabs-slider color="#ED1C24"></v-tabs-slider>
        <v-tab @click="toggleSortingDate">по дате 
          <sort-icons 
            :sorting="sorting_by === 'date'"
            :ascending="ascending"
          /></v-tab>
        <v-tab @click="toggleSortingName">по названию
          <sort-icons 
            :sorting="sorting_by === 'name'"
            :ascending="ascending"
          />
        </v-tab>
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
import SortIcons from "../components/SortIcons.vue"
import { mapState } from 'vuex'

export default {
  components: {
    PassBoard,
    SortIcons
  },
  data() {
    return {
      sorting_by: "date", // "date", "name"
      ascending: true
    }
  },
  computed: mapState(['passwords_info']),
  methods: {
    toggleSortingDate: function(){
      if (this.sorting_by == "date"){
        this.ascending = !this.ascending
      } else {
        this.sorting_by = "date"
        this.ascending = true
      }
      this.$store.commit("sort_passes", {sorted_by: "date", ascending: this.ascending})
    },
    toggleSortingName: function(){
      if (this.sorting_by == "name"){
        this.ascending = !this.ascending
      } else {
        this.sorting_by = "name"
        this.ascending = true
      }
      this.$store.commit("sort_passes", {sorted_by: "name", ascending: this.ascending})
    }
  },
  mounted(){
    this.$store.dispatch('get_passwords').then(() => {
      this.$store.commit("sort_passes", {sorted_by: "date", ascending: this.ascending})
    })
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