// import Vue from 'vue';
import Vue from '../../vue/dist/vue';
import App from './App'


/* new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
}) */





Vue.component('blog-post', {
    // 在 JavaScript 中是 camelCase 的
    props: ['postTitle'],
    template: '<h3>{{ postTitle }}</h3>'
})

// 子组件
const ChildComponent = {
    template: '<div>child component {{text}}</div>',
    created: function () {
        // 这里的 data 是父组件注入进来的
        console.log(this.text)
    },
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
    }

})
app.$data.test = 3;
console.log(app)




// console.log('Vue.config', Vue.config);
// console.log('Vue.options', Vue.options );
// console.log('Vue.util', Vue.util );
// console.log('new Vue', new Vue );
// console.log('Vue.prototype', Vue.prototype)

