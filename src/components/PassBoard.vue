<template>
  <div class="pass-board">
      <v-card
        class="mx-auto my-10 pa-5"
        max-width="1200"
      >
        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-card-title>{{name}}</v-card-title>
                    <v-card-subtitle>Дата последнего редактирования: {{date}}</v-card-subtitle>
                    <v-card-text>{{text}}</v-card-text>
                </v-col>
                <v-col cols="3">
                    <v-text-field
                    id="text"
                    :value="currtext"
                    height="30"
                    readonly
                    >
                    </v-text-field>
                    <v-btn 
                    class="mr-2 pa-2"
                    color="blue lighten-1"
                    @click="toggleHover"><span style="color: white">Показать</span></v-btn>
                    <v-btn 
                    class="mr-2 pa-2"
                    color="blue lighten-1"
                    @click="toggleHover"
                    @dblclick="copy"><span style="color: white">Скопировать</span></v-btn>
                </v-col>
                <v-col cols="3">
                    <v-btn
                    color="blue darken-3"
                    icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn
                     color="red darken-3"
                    icon>
                        <v-icon>mdi-trash-can</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
    name: "PassBoard",
    data(){
        return {
            name: "Google",
            date: "22.09.2020",
            text: "Данный пароль рассчитан на вход в сервисы Google",
            password: "lalalala",
            ishovered: false,
        }
    },
    computed: {
        star: function (){
            let length = this.password.length
            let stars = ""
            for (let i = 0; i < length; i++){
                stars += "*"
            }
            return stars
        },
        currtext: function(){
            return this.ishovered ? this.password : this.star
        }
    },
    methods: {
        toggleHover: function(){
            this.ishovered = true
            setTimeout(() => {
                this.ishovered = false
            }, 1000);
        },
        copy: function(){
            let text = document.getElementById("text");
            text.select();
            document.execCommand("copy");
            this.$toast.success("Пароль скопирован", {
                timeout: 3000,
            })
        }
    }
}
</script>

<style>

</style>