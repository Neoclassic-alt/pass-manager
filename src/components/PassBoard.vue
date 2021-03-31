<template>
  <div class="pass-board">
      <v-card
        class="mx-auto my-5 pa-4"
        max-width="1200"
        elevation="1"
      >
        <v-container>
            <v-row v-if="pass_info !== undefined"><!-- Показываем только когда данные получены -->
                <v-col cols="6">
                    <v-card-title>{{pass_info.name}}</v-card-title>
                    <v-card-subtitle>Дата последнего редактирования: {{pass_info.date}}</v-card-subtitle>
                    <v-card-text>{{pass_info.text}}</v-card-text>
                </v-col>
                <v-col cols="3">
                    <v-text-field
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
                    <router-link :to="'mypasses/edit/' + pass_info.id">
                        <v-btn
                        color="blue darken-3"
                        icon>
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </router-link>
                    <v-btn
                        color="red darken-3"
                        @click.stop="dialog = true"
                        icon>
                            <v-icon>mdi-trash-can</v-icon>
                        </v-btn>
                    <v-dialog
                        v-model="dialog"
                        width="600"
                    >
                        <v-card>
                            <v-card-title class="headline grey lighten-2">
                            Вы действительно хотите удалить пароль? 
                            </v-card-title>
                            <v-card-text class="mt-5">Данное действие невозможно отменить.</v-card-text>
                            <v-divider />
                            <v-card-actions>
                            <v-spacer></v-spacer>
                                <v-btn
                                    color="primary"
                                    text
                                    @click="deletePass"
                                >
                                    Удалить
                                </v-btn>
                                <v-btn
                                    color="primary"
                                    text
                                    @click="dialog = false"
                                >
                                    Отмена
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-col>
            </v-row>
            <v-row v-else>
                <v-col cols="12">Данные загружаются...</v-col>
            </v-row>
        </v-container>
    </v-card>
  </div>
</template>

<script>
export default {
    name: "PassBoard",
    props: {
        pass_info: {
            type: [Object, undefined],
        }
    },
    data(){
        return {
            ishovered: false,
            dialog: false,
            deleted: false,
        }
    },
    computed: {
        star: function (){
            let length = this.pass_info.password.length
            let stars = ""
            for (let i = 0; i < length; i++){
                stars += "*"
            }
            return stars
        },
        currtext: function(){
            return this.ishovered ? this.pass_info.password : this.star
        }
    },
    methods: {
        toggleHover: function(){
            this.ishovered = true
            setTimeout(() => {
                this.ishovered = false
            }, 1000);
        },
        copy: function(event){
            let target = event.target;
            let text = target.closest('div').querySelector('input');
            text.select();
            document.execCommand("copy");
            this.$toast.info("Пароль скопирован", {
                timeout: 3000,
            })
        },
        deletePass: function(){
            this.dialog = false
            this.$store.dispatch("delete_password", this.pass_info.id)
            this.$toast.success("Удаление прошло успешно!")
        }
    }
}
</script>

<style>
a {
    text-decoration: none;
}
</style>