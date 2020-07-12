import locale from 'date-fns/locale/pt-BR';
import Vue from "vue";
import { createDateFilter } from 'vue-date-fns';
import { parseISO } from "date-fns";


Vue.filter("date", createDateFilter('dd MMMM yyyy', { locale }))

Object.defineProperty(Vue.prototype, '$parseISO', { value: parseISO })
