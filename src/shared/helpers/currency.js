import Vue from "vue"
import currency from 'currency.js'
import VMoney from "v-money";

const formatBr = { separator: ".", decimal: ",", symbol: "R$ ", formatWithSymbol: true, precision: 2 }
const formatUs = { separator: ".", decimal: "," }
export const moeda = {
    decimal: ',',
    thousands: '.',
    prefix: 'R$ ',
    precision: 2,
    masked: false
}

export const toReal = value => currency(value, formatBr).format()
export const toDolar = value => currency(value, formatUs).dollars() + '.' + currency(value, formatUs).cents()

Object.defineProperty(Vue.prototype, '$toReal', { value: toReal })
Object.defineProperty(Vue.prototype, '$toDolar', { value: toDolar })
Vue.use(VMoney, { precision: 2 })
