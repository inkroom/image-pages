import Vue from 'vue'

/* -------------------------Init Multi-language------------------------------ */
import VueI18n from 'vue-i18n'
import locales from './locales'
Vue.use(VueI18n)

/* inject i18n */
const browserLanguage = (window.navigator.language || window.navigator.browserLanguage).split('-')[0]
// const lang = Cookies.get('lang') || (browserLanguage in locales ? browserLanguage : 'en')
Vue.config.lang = browserLanguage

Object.keys(locales).forEach(lang => {
  Vue.locale(lang, locales[lang])
})


/* ------------------------Vue Global Variable------------------------------ */
import { $apis, $utils, $document } from '@helper'

Vue.prototype.$apis = $apis
Vue.prototype.$utils = $utils
Vue.prototype.$document = $document

import Filters from './filters'
for (let key in Filters) {
  Vue.filter(key, Filters[key])
}

/* ------------------------Vue Global Components------------------------------ */

import ElementUI from 'element-ui'
import 'element-theme-dark';
// import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import Icon from '@components/Icon/index.js'
Vue.component('icon', Icon)

