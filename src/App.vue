<template>
    <v-app>
        <v-app-bar elevate-on-scroll app>
            <v-toolbar-title class="headline text-uppercase ml-12">
                <router-link to="/" style="text-decoration: none; color: inherit" class="font-weight-light">PHONESKI</router-link>
                <span class="font-weight-light text-lowercase"> is a <span class="primary--text">phone</span> tracking app</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <login-form v-if="this.$route.path !== '/calls'" :btn="{text: true, color: 'primary', dark: true, body: 'Войти'}"/>
            <login-form v-if="this.$route.path !== '/calls'" is-signup :btn="{text: true, class: 'mr-12', body: 'Регистрация'}"/>
        </v-app-bar>
        <router-view/>
    </v-app>
</template>

<script>
    import LoginForm from '@/components/login-form'

    export default {
        name: 'App',
        components: {LoginForm},
        data: () => ({}),
        methods: {},
    };
</script>
