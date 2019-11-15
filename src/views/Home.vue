<template>
    <v-app>
        <v-parallax dark src="/back.webp">
            <v-row align="center" justify="center">
                <v-col class="text-center" cols="12">
                    <h1 class="display-2 font-weight-thin mb-4 mt-10 ">PHONESKI</h1>
                    <h4 class="title font-weight-light">Tracking calls is easier than ever</h4>

                    <login-form is-signup
                                :btn="{outlined: true, color: 'white', class: 'mt-8', body: 'Start for free'}"/>

                </v-col>
            </v-row>
        </v-parallax>

        <v-container>
            <v-row>
                <v-col cols="4">
                    <v-card class="mx-auto" outlined max-width="344">
                        <v-card-title class="mb-1 justify-center">
                            <span class="headline font-weight-medium">Fast</span>
                            <v-icon large right>speed</v-icon>
                        </v-card-title>
                        <v-card-subtitle class="subtitle-1 text-center">Скорость - вот что отличает нас от других
                            сервисов.
                            Использование самых современных наработок в области искусственного интелекта и машинного
                            обучения
                            позволяет нашему сервису работать со скоростью света!
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card class="mx-auto" outlined max-width="344">
                        <v-card-title class="mb-1 justify-center">
                            <span class="headline font-weight-medium">Simple</span>
                            <v-icon large right>emoji_people</v-icon>
                        </v-card-title>
                        <v-card-subtitle class="subtitle-1 text-center">Для использования нашего сервиса не нужно
                            никаких
                            специальных знаний. Единственное, что вам нужно - это аккаунт.
                        </v-card-subtitle>
                    </v-card>
                </v-col>
                <v-col cols="4">
                    <v-card class="mx-auto" outlined max-width="344">
                        <v-card-title class="mb-1 justify-center">
                            <span class="headline font-weight-medium">Free</span>
                            <v-icon large right>money_off</v-icon>
                        </v-card-title>
                        <v-card-subtitle class="subtitle-1 text-center">И это абсолютно бесплатно. Навсегда. Без
                            исключений.
                        </v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

        <v-toolbar  flat dense color="grey lighten-3" max-height="48">
            <v-container class="justify-center">
                <span class="font-weight-light">Created by </span>
                <a href="https://github.com/pabushabi">Pavel Shalimov</a>
                <span class="font-weight-light"> @2019</span>
            </v-container>
        </v-toolbar>
    </v-app>
</template>

<script>
    import LoginForm from '@/components/login-form'

    export default {
        name: "Home",
        components: {LoginForm}
    }
</script>
