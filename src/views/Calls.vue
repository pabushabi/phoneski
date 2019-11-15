<template>
    <v-app>
        <v-row class="mt-12">
            <v-col>
                <v-data-table :headers="headers" :items="calls" :search="search">
                    <template v-slot:top>
                        <v-toolbar flat color="white">
                            <v-toolbar-title>Звонки</v-toolbar-title>
                            <v-divider class="mx-4" inset vertical></v-divider>
                            <v-spacer/>
                            <v-col cols="2">
                                <v-text-field v-model="search" append-icon="search" label="Поиск" single-line
                                              hide-details></v-text-field>
                            </v-col>
                            <v-dialog v-model="dialog" max-width="500px">
                                <template v-slot:activator="{ on }">
                                    <v-btn color="primary" dark class="mb-2" v-on="on">Новый звонок</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="6">
                                                    <v-text-field v-model="editedItem.caller"
                                                                  :label="headers[0].text" @keyup="changeCaller($event)"
                                                                  maxlength="15"
                                                                  :prefix="focus || editedItem.caller !== '' ? '+7' : ''"
                                                                  @focus="focus = true"
                                                                  @blur="focus = false"
                                                                  :rules="[rules.min]"></v-text-field>
                                                </v-col>
                                                <v-col cols="6">
                                                    <v-text-field v-model="editedItem.companion"
                                                                  :label="headers[1].text" @keyup="changeComp($event)"
                                                                  maxlength="15"
                                                                  :prefix="focus1 || editedItem.companion !== '' ? '+7' : ''"
                                                                  @focus="focus1 = true"
                                                                  @blur="focus1 = false"
                                                                  :rules="[rules.min]"></v-text-field>
                                                </v-col>
                                                <v-col cols="4">
                                                    <v-dialog ref="dialog" :return-value.sync="editedItem.date"
                                                              persistent
                                                              v-model="modal" width="290px">
                                                        <template v-slot:activator="{ on }">
                                                            <v-text-field v-model="editedItem.date"
                                                                          :label="headers[2].text"
                                                                          readonly v-on="on"></v-text-field>
                                                        </template>
                                                        <v-date-picker v-model="editedItem.date" scrollable
                                                                       :first-day-of-week="1"
                                                                       locale="ru-ru">
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary" @click="modal = false">Отмена
                                                            </v-btn>
                                                            <v-btn text color="primary"
                                                                   @click="$refs.dialog.save(editedItem.date)">OK
                                                            </v-btn>
                                                        </v-date-picker>
                                                    </v-dialog>
                                                </v-col>
                                                <v-col cols="4">
                                                    <v-dialog ref="dialog2" v-model="modal2"
                                                              :return-value.sync="editedItem.time"
                                                              persistent width="290px">
                                                        <template v-slot:activator="{ on }">
                                                            <v-text-field v-model="editedItem.time"
                                                                          :label="headers[3].text"
                                                                          readonly v-on="on"></v-text-field>
                                                        </template>
                                                        <v-time-picker v-model="editedItem.time" full-width
                                                                       format="24hr"
                                                                       use-seconds>
                                                            <v-spacer></v-spacer>
                                                            <v-btn text color="primary" @click="modal2 = false">Отмена
                                                            </v-btn>
                                                            <v-btn text color="primary"
                                                                   @click="$refs.dialog2.save(editedItem.time)">OK
                                                            </v-btn>
                                                        </v-time-picker>
                                                    </v-dialog>
                                                </v-col>
                                                <v-col cols="4">
                                                    <v-text-field v-model="editedItem.duration" type="number" min="0"
                                                                  :label="headers[4].text"></v-text-field>
                                                </v-col>
                                                <v-col cols="12">
                                                    <v-text-field v-model="editedItem.note"
                                                                  :label="headers[5].text"></v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn text @click="close">Закрыть</v-btn>
                                        <v-btn color="primary" text @click="save">Сохранить</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>

                    <template v-slot:item.action="{ item }">
                        <v-icon small class="mr-2" @click="editItem(item)">edit</v-icon>
                        <v-icon small @click="deleteItem(item)">delete</v-icon>
                    </template>
                    <template v-slot:item.caller="{ item }">
                        {{"+7" + item.caller }}
                    </template>
                    <template v-slot:item.companion="{ item }">
                        {{"+7" + item.companion }}
                    </template>
                    <template v-slot:no-data>
                        <v-btn color="primary" @click="initialize">Перезагрузть</v-btn>
                    </template>
                </v-data-table>
            </v-col>
        </v-row>


        <v-toolbar flat dense color="grey lighten-3" max-height="48">
            <v-container class="justify-center">
                <span class="font-weight-light">Created by </span>
                <a href="https://github.com/pabushabi">Pavel Shalimov</a>
                <span class="font-weight-light"> @2019</span>
            </v-container>
        </v-toolbar>
    </v-app>
</template>

<script>
    import axios from 'axios'

    export default {
        name: "Calls",
        data: () => ({
            dialog: false,
            modal: false,
            modal2: false,
            search: '',
            headers: [
                {text: 'Звнонящий', value: 'caller'},
                {text: 'Отвечающий', value: 'companion'},
                {text: 'Дата', value: 'date'},
                {text: 'Время', value: 'time'},
                {text: 'Длительность (с)', value: 'duration'},
                {text: 'Заметка', value: 'note', sortable: false},
                {text: 'Действия', value: 'action', sortable: false},
            ],
            calls: [],
            editedIndex: -1,
            editedItem: {
                caller: '',
                companion: '',
                date: '',
                time: '',
                duration: 0,
                note: '',
            },
            defaultItem: {
                caller: '',
                companion: '',
                date: '',
                time: '',
                duration: 0,
                note: '',
            },
            rules: {
                required: value => !!value || 'Должно быть заполнено',
                min: v => v.length >= 15 || 'Минимум 10 цифр',
            },
            focus: false,
            focus1: false,
        }),
        computed: {
            formTitle() {
                return this.editedIndex === -1 ? 'Новый звонок' : 'Редактировать'
            },
        },
        watch: {
            dialog(val) {
                val || this.close()
            },
        },
        created() {
            this.initialize()
        },
        methods: {
            initialize() {
                axios.post('/api/v1/getcalls')
                    .then(data => {
                        console.log(data);
                        this.calls = data.data
                    })
                    .catch(console.log);
            },
            editItem(item) {
                this.editedIndex = this.calls.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true
            },
            deleteItem(item) {
                const index = this.calls.indexOf(item);
                let choice = confirm('Вы действительно хотите удалить элемент?');
                if (choice) {
                    this.calls.splice(index, 1);
                    console.log(item);
                    axios.post('/api/v1/deletecall', {item: item})
                        .then(console.log)
                        .catch(console.log)
                }
            },
            close() {
                this.dialog = false;
                setTimeout(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1
                }, 300)
            },
            save() {
                if (this.editedIndex > -1) {
                    // Object.assign(this.calls[this.editedIndex], this.editedItem)
                    axios.post(`/api/v1/updatecall`, {prevCall: this.calls[this.editedIndex], newCall: this.editedItem})
                        .then(data => {
                            console.log(data);
                            this.initialize();
                        })
                        .catch(console.log)
                } else {
                    axios.post('/api/v1/newcall', {item: this.editedItem})
                        .then(console.log)
                        .catch(console.log);
                    this.calls.push(this.editedItem)
                }
                this.close()
            },
            changeCaller(event) {
                if (event.key !== "Backspace") {
                    if (!(event.key in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
                        this.editedItem.caller = this.editedItem.caller.slice(0, -1);
                    this.editedItem.caller = this.editedItem.caller.replace(/\(?(\d{3})\)?(\d{3})\s?(\d{2})-?(\d{2})/, "($1) $2-$3-$4");
                }
            },
            changeComp(event) {
                if (event.key !== "Backspace") {
                    if (!(event.key in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]))
                        this.editedItem.companion = this.editedItem.companion.slice(0, -1);
                    this.editedItem.companion = this.editedItem.companion.replace(/\(?(\d{3})\)?(\d{3})\s?(\d{2})-?(\d{2})/, "($1) $2-$3-$4");
                }
            },
        },
    }
</script>
