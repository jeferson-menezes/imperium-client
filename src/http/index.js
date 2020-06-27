import Vue from 'vue'
import VueResource from 'vue-resource'
import { server } from './apis'
import interceptors from './interceptors'
import services from './services'

Vue.use(VueResource)

const http = Vue.http


http.interceptors.push(interceptors)

http.options.root = server

Object.keys(services).map(service => {
    services[service] = Vue.resource('', {}, services[service])
})

const setBearerToken = token => {
    http.headers.common['Authorization'] = `Bearer ${token}`
}

export default services
export { http, setBearerToken }

