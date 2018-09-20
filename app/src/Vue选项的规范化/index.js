import Vue from '../../../vue/dist/vue';

// 子组件
const ChildComponent = {
    template: '<div>child component {{text}}</div>',
    inject: ['text']
}

var app = new Vue({
    el: '#app',
    data: {
        test: 1
    },
    provide: {
        text: 'test provide'
    },
    components: {
        ChildComponent
    },
    directives: {
        test1: {
            bind: function () {
                console.log('v-test1')
            }
        },
        test2: function () {
            console.log('v-test2')
        },
        test3:{
            update : function(){
                console.log('v-test3')
            }
        }
    },
    created() {
        console.log(this);
        console.log(this.$options.data())
    },

})

// console.log('Vue.config', Vue.config);
// console.log('Vue.options', Vue.options );
// console.log('Vue.util', Vue.util );
// console.log('new Vue', new Vue );
// console.log('Vue.prototype', Vue.prototype)
