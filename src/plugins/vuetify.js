import Vue from 'vue';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
    },
    theme: {
        themes: {
            light: {
                primary: '#00bb72',
                secondary: '#4285f4',
                accent: '#ffc107',
                success: '#5ED6B0',
                blue: '#68CCD1',
                info: '#ffc107',
            },
            dark: {

            }
        }
    }
});
