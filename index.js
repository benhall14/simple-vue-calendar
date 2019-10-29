import SimpleVueCalendar from './components/SimpleVueCalendar.vue'

export default {
    install: function (Vue, options) {
        Vue.component('simple-view-calendar', SimpleVueCalendar);
    },
}

export { SimpleVueCalendar }
