import Vue from '../../../vue/dist/vue';


const vm = new Vue({
    el: '#app',
    template: '<div>{{a}}{{test}}</div>',
    data: {
        test: 1
    }
})


console.log(vm.$options.render)
