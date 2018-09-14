/* @flow */

import Vue from 'core/index'
import config from 'core/config'
import { extend, noop } from 'shared/util'
import { mountComponent } from 'core/instance/lifecycle'
import { devtools, inBrowser, isChrome } from 'core/util/index'

import {
  query,
  mustUseProp,
  isReservedTag,
  isReservedAttr,
  getTagNamespace,
  isUnknownElement
} from 'web/util/index'

import { patch } from './patch'
import platformDirectives from './directives/index'
import platformComponents from './components/index'

// install platform specific utils
Vue.config.mustUseProp = mustUseProp
Vue.config.isReservedTag = isReservedTag
Vue.config.isReservedAttr = isReservedAttr
Vue.config.getTagNamespace = getTagNamespace
Vue.config.isUnknownElement = isUnknownElement

// install platform runtime directives & components
// 下面两句的作用是在 Vue.options 上添加 web 平台运行时的特定组件和指令。
// 在执行这句之前，Vue.options.directives是个空对象（参见vue\src\core\global-api\index.js），执行之后为Vue.options.directives添加了两个属性（model,show）
extend(Vue.options.directives, platformDirectives)
// 在执行这句之前，Vue.options.components只有keepAlive属性（参见\vue\src\core\components\index.js），执行之后又添加了两个属性（Transition,TransitionGroup）
extend(Vue.options.components, platformComponents)

// install platform patch function
// Vue.prototype 上添加 __patch__ 方法，如果在浏览器环境运行的话，这个方法的值为 patch 函数，否则是一个空函数 noop
Vue.prototype.__patch__ = inBrowser ? patch : noop

// public mount method
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)
}

// devtools global hook
/* istanbul ignore next */
if (inBrowser) {
  setTimeout(() => {
    if (config.devtools) {
      if (devtools) {
        devtools.emit('init', Vue)
      } else if (
        process.env.NODE_ENV !== 'production' &&
        process.env.NODE_ENV !== 'test' &&
        isChrome
      ) {
        console[console.info ? 'info' : 'log'](
          'Download the Vue Devtools extension for a better development experience:\n' +
          'https://github.com/vuejs/vue-devtools'
        )
      }
    }
    if (process.env.NODE_ENV !== 'production' &&
      process.env.NODE_ENV !== 'test' &&
      config.productionTip !== false &&
      typeof console !== 'undefined'
    ) {
      console[console.info ? 'info' : 'log'](
        `You are running Vue in development mode.\n` +
        `Make sure to turn on production mode when deploying for production.\n` +
        `See more tips at https://vuejs.org/guide/deployment.html`
      )
    }
  }, 0)
}

export default Vue

/**
 *
设置平台化的 Vue.config。
在 Vue.options 上混合了两个指令(directives)，分别是 model 和 show。
在 Vue.options 上混合了两个组件(components)，分别是 Transition 和 TransitionGroup。
在 Vue.prototype 上添加了两个方法：__patch__ 和 $mount。
在经过这个文件之后，Vue.options 以及 Vue.config 和 Vue.prototype 都有所变化，我们把这些变化更新到对应的 附录 文件里，都可以查看的到。
 *
*/
