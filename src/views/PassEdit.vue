<template>
<div style="max-width: 1200px; margin: auto">
    <v-breadcrumbs 
        :items="items" 
        v-if="pass_info"
        class="pb-0"
    >
        <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
        </template>
    </v-breadcrumbs>
    <pass-board 
    :pass_info="pass_info"
    />
    <v-card
    class="pa-5">
        <v-card-title>Редактирование пароля</v-card-title>
        <v-form 
        ref="form"
        @submit.prevent="savePass">
            <v-text-field
            label="Название"
            v-model.trim="name"
            required
            >
            </v-text-field>
            <v-text-field
            label="Пароль"
            :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_pass ? 'text' : 'password'"
            @click:append="show_pass = !show_pass"
            v-model.trim="password"
            required
            >
            </v-text-field>
            <p :style="{color: warning.active.color}">
                <v-icon
                :color="warning.active.color"
                >{{warning.active.icon}}</v-icon>
                {{warning.active.text}}
            </p>
            <v-textarea
            label="Описание"
            v-model="text">
            </v-textarea>
            <v-btn
            color="blue lighten-1"
            type="submit"
            ><span style="color:white">Изменить пароль</span>
            </v-btn>
        </v-form>
    </v-card>
</div>
</template>

<script>
import PassBoard from '../components/PassBoard.vue'
export default {
    components: { PassBoard },
    data(){
        return {
            text: '',
            password: '',
            name: '',
            warning: {
                active: {
                    text: '',
                    color: '',
                    icon: ''
                },
                sets: [{
                    text: 'Слабый пароль',
                    color: '#E53935',
                    icon: 'mdi-alert-circle',
                },
                {
                    text: 'Средний пароль',
                    color: '#FFB300',
                    icon: 'mdi-help-circle',
                },
                {
                    text: 'Сильный пароль',
                    color: '#43A047',
                    icon: 'mdi-check',
                }], 
            },
            show_pass: false
        }
    },
    computed: {
        pass_info: function(){
            return this.$store.getters.password_info(this.$route.params.id)
        },
        items: function(){
            return [
                {
                    text: 'Пароли',
                    disabled: false,
                    href: 'mypasses'
                },
                {
                    text: this.pass_info.name,
                    disabled: true,
                    href: 'mypasses/edit/' + this.$route.params.id
                }
            ]
        }
    },
    mounted(){
        this.$store.dispatch('get_passwords')
    },
    watch: {
        pass_info: function(info){
            this.name = info.name
            this.password = info.password
            this.text = info.text
        },
        password: function(new_pass){
            let score = this.pass_complexity(new_pass)
            if (score < 8){
                this.warning.active = this.warning.sets[0]
            } else if (score >= 8 && score <= 12){
                this.warning.active = this.warning.sets[1]
            } else {
                this.warning.active = this.warning.sets[2]
            }
        }
    },
    methods: {
        pass_complexity: function(pass){
            let score = 0
            const lowercase_latin = /[A-Z]/;
            const uppercase_latin = /[a-z]/;
            const numbers = /[0-9]/;
            const cyrillic = /[а-яёА-ЯЁ]/;
            const other_symbols = /[!@#$%^&*?()~\s]/;
            const three_numbers = /([0-9])\1\1/;
            const three_letters = /([а-яёa-z])\1\1/i;
            let numberable = false
            // Считается длина пароля
            score += pass.length
            if (pass.match(lowercase_latin) !== null && pass.match(uppercase_latin) !== null){
                score += 2
                numberable = true
            }
            if (pass.match(other_symbols) !== null){
                score += 3
                numberable = true
            }
            if (pass.match(cyrillic) !== null){
                score += 2
                numberable = true
            }
            if (numberable && pass.match(numbers) !== null){
                score += 1
            }
            if (pass.match(three_numbers) !== null){
                score -= 3
            }
            if (pass.match(three_letters) !== null){
                score -= 3
            }
            return score
        },
        savePass: function (){
            let new_pass = {}
            Object.assign(new_pass, this.pass_info)
            new_pass.name = this.name
            new_pass.password = this.password
            new_pass.text = this.text
            let date = new Date()
            new_pass.date = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
            this.$store.dispatch('update_password', new_pass)
        }
    }
}
</script>

<style>
</style>