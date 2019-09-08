import 'core-js/stable';
import Vue from 'vue';
import Vuex from 'vuex';
import App from './components/App';
import store from './store';

new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App },
});

