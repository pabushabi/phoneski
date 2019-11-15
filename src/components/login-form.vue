<template>
    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn :outlined="btn.outlined" :text="btn.text" :color="btn.color" :class="btn.class" :dark="btn.dark"
                   v-on="on">{{btn.body}}
            </v-btn>
        </template>
        <v-card class="py-3">
            <v-card-title class="justify-center">
                <span class="headline">{{isSignup ? "Регистрация аккаунта" : "Вход в аккаунт"}}</span>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" lazy-validation>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field label="Телефонный номер" required v-model="phone"
                                          @keyup="changeNum($event)" maxlength="15"
                                          :prefix="focus || phone !== '' ? '+7' : ''" @focus="focus = true"
                                          @blur="focus = false" :rules="[rules.min]"
                                          prepend-icon="phone" clearable></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Пароль" type="password" counter="25" required
                                          v-model="pass" :rules="[rules.required, rules.max]"
                                          :type="show ? 'text' : 'password'"
                                          :append-icon="show ? 'visibility' : 'visibility_off'"
                                          @click:append="show = !show" v-on:keydown.enter="signup"
                                          prepend-icon="lock"></v-text-field>
                        </v-col>
                    </v-row>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text @click="dialog = false">Закрыть</v-btn>
                <v-btn color="primary" text @click="signup">{{isSignup ? "Регистрация" : "Войти"}}</v-btn>
            </v-card-actions>
        </v-card>
        <v-snackbar v-model="snackbar" left timeout="4000">
            {{ text }}
            <v-btn color="primary" text @click="snackbar = false">
                Close
            </v-btn>
        </v-snackbar>
    </v-dialog>
</template>

<script>
    import axios from "axios";

    export default {
        name: "login-form",
        props: {
            isSignup: Boolean,
            btn: {
                text: Boolean,
                outlined: Boolean,
                class: String,
                color: String,
                dark: Boolean,
                body: String,
            }
        },
        data: () => ({
            dialog: false,
            show: false,
            phone: '',
            pass: '',
            focus: false,
            rules: {
                required: value => !!value || 'Должно быть заполнено',
                min: v => v.length >= 15 || 'Минимум 10 цифр',
                max: e => (e && e.length <= 25) || 'Максимум 25 символов'
            },
            snackbar: false,
            text: "",
        }),
        methods: {
            changeNum(event) {
                if (event.key !== "Backspace") {
                    if (!(event.key in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
                        this.phone = this.phone.slice(0, -1);
                    this.phone = this.phone.replace(/\(?(\d{3})\)?(\d{3})\s?(\d{2})-?(\d{2})/, "($1) $2-$3-$4");
                }
            },
            signup() {
                if (!this.$refs.form.validate()) return;
                const apiPath = this.isSignup ? "/api/v1/register" : "/api/v1/login";
                axios.post(apiPath, {phone: this.phone, pass: this.pass})
                    .then(data => {
                        console.log(data);
                        this.dialog = false;
                        this.$router.push('/calls')
                    })
                    .catch(err => {
                        this.text = "Ошибка авторизации";
                        this.snackbar = true;
                    });
            },
        }
    }
</script>
