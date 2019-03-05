import Vue from 'vue'

// Inputs
Vue.component('m2-date-picker', require('@/components/input/M2DatePicker').default)
Vue.component('m2-date-range', require('@/components/input/M2DateRange').default)

// Layouts
Vue.component('master-layout', require('@/components/layouts/Master').default)
Vue.component('minimal-layout', require('@/components/layouts/Minimal').default)

// Root components
Vue.component('m2-navbar', require('@/components/root/M2Navbar').default)
Vue.component('m2-sidemenu', require('@/components/root/M2SideMenu').default)
Vue.component('m2-loading', require('@/components/root/M2Loading').default)
Vue.component('m2-header', require('@/components/root/M2Header').default)
