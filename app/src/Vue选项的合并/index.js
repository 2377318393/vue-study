import Vue from '../../../vue/dist/vue';

// --------------------------  生命周期钩子选项的合并策略 -------------------------------------

/* 
//父组件
const Parent = Vue.extend({
    data() {
        return {
            parent: true
        }
    },
    created: [
        function () {
            console.log('first')
        },
        function () {
            console.log('second')
        },
        function () {
            console.log('third')
        },
    ]
})
// //子组件
const Child = new Parent({
    data() {
        return {
            parent: false,
            child: true
        }
    },
    created() {
        console.log(this)
    },
})
 */



// ---------------------------------------  选项watch的合并策略 ----------------------------------------------

/* 
// 创建子类
const Sub = Vue.extend({
    // 检测 test 的变化
    watch: {
        test: function () {
            console.log('extend: test change')
        }
    }
})

// 使用子类创建实例
const v = new Sub({
    el: '#app',
    data: {
        test: 1
    },
    // 检测 test 的变化
    watch: {
        test: function () {
            console.log('instance: test change')
        }
    }
})

// 修改 test 的值
v.test = 2
console.log(v.$options)

 */


/**
 * 最终这两个 watch 选项将被合并为一个数组
 * 
watch: {
  test: [
    function () {
      console.log('extend: test change')
    },
    function () {
      console.log('instance: test change')
    }
  ]
}
 */


// ---------------       mixins 和 extends    -----------------------------------------


/* const consoleMixin = {
    created() {
        console.log('created:mixins')
    },
    data:{
        test : 1
    },
    zidingyi:function(){
        console.log('suibianxiexie')
    }
}
const writeMixin = {
    created() {
        console.log('created:write')
    },
    data:{
        text : 'test'
    }
}

const Sub = new Vue({
    mixins: [consoleMixin,writeMixin],
    created() {
        console.log('created:instance')
    }
})

console.log(Sub) */