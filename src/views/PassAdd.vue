<template>
  <div style="max-width: 1200px; margin: auto">
      <pass-form
        formLabel="Добавление пароля"
        actionName="Добавить пароль"
        @action="addPass"
        class="mt-10"
      />
  </div>
</template>

<script>
import PassForm from '../components/PassForm.vue'

export default {
  components: { PassForm },
  data() {
    return {
      newID: 0,
    }
  },
  methods: {
    addPass: function(info){
      let new_pass = {...info}
      new_pass.id = this.newID
      new_pass.date = new Date().toLocaleDateString("ru")
      this.$store.dispatch("add_password", new_pass).then(() => {
        if (this.$store.state.success){
          this.$toast.success("Пароль добавлен!")
          this.$router.push('/mypasses')
        } else {
          this.$toast.error("Ошибка при добавлении пароля")
        }
      }) 
    }
  },
  mounted(){
    this.$store.dispatch("getID").then(() => {
      this.newID = this.$store.state.lastID + 1
    })
  }
}
</script>

<style>

</style>