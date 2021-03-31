<template>
  <v-card
    class="pa-5">
        <v-card-title v-once>{{formLabel}}</v-card-title>
        <v-form 
        ref="form"
        @submit.prevent="$emit('action', {name, password, text})">
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
            ><span style="color:white" v-once>{{actionName}}</span>
            </v-btn>
            <v-btn
            color="blue lighten-1"
            class="ml-4"
            @click="toPasses"
            ><span style="color:white">Назад</span>
            </v-btn>
        </v-form>
    </v-card>
</template>

<script>
export default {
    name: "PassForm",
    props: {
        formLabel: {
            type: String,
            required: true
        },
        actionName: {
            type: String,
            required: true
        },
        defaultValues: {
            type: Object,
            default() {
                return {}
            }
        }
    },
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
    watch: {
        password: function(new_pass){
            let score = this.pass_complexity(new_pass)
            if (score < 8){
                this.warning.active = this.warning.sets[0]
            } else if (score >= 8 && score <= 12){
                this.warning.active = this.warning.sets[1]
            } else {
                this.warning.active = this.warning.sets[2]
            }
        },
        defaultValues: function(info){
            this.name = info.name
            this.password = info.password
            this.text = info.text
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
        toPasses: function(){
            this.$router.push('/mypasses')
        }
    }
}
</script>

<style>

</style>