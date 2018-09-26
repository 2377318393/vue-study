import Vue from '../../../vue/dist/vue';

var vm = new Vue({
    data: {
        test: 1
    },
    el: "#app",
    methods: {
        test: function () {
            console.log(1)
        }
    }
})

vm.test = 2;


console.log(vm.$options.data())
console.log(vm._data);
console.log(vm.$options.data() === vm._data)

console.log(vm.test)