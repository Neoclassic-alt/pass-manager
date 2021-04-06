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
    <pass-form
        formLabel="Редактирование пароля"
        actionName="Изменить пароль"
        :defaultValues="defaultValues"
        @action="savePass"
    />
</div>
</template>

<script>
import PassBoard from '../components/PassBoard.vue'
import PassForm from '../components/PassForm.vue'
export default {
    components: { 
        PassBoard,
        PassForm
    },
    data(){
        return {
            defaultValues: {},
            //name: '',
            //password: '',
            //text: ''
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
                    href: '/mypasses'
                },
                {
                    text: this.pass_info.name,
                    disabled: true,
                    href: '/mypasses/edit/' + this.$route.params.id
                }
            ]
        }
    },
    mounted(){
        this.$store.dispatch('get_passwords')
    },
    watch: {
        pass_info: function(info){
            let values = {}
            values.name = info.name
            values.password = info.password
            values.text = info.text
            this.defaultValues = {...values}
        },
    },
    methods: {
        getDate: function(){
            const date = new Date()
            return date.toLocaleDateString("ru")
        },
        savePass: function (info){
            let new_pass = {...info}
            new_pass.id = this.pass_info.id
            new_pass.date = this.getDate()
            this.$store.dispatch('update_password', new_pass)
            this.$toast.success("Пароль успешно изменён")
        }
    }
}
</script>

<style>
</style>