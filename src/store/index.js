import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import * as types from './mutation-types';

const savedLists = localStorage.getItem('trollo-lists');

const state = {
  lists: savedLists ? JSON.parse(savedLists) : [
    {
      title: 'To Do',
      cards: [
        { body: 'English' },
        { body: 'Mathematics' },
      ]
    },
    {
      title: 'Next Up',
      cards: [
        { body: 'Science' }
      ]
    },
    {
      title: 'In Progress',
      cards: []
    }
  ]
};

const mutations = {
  [types.ADD_LIST](state, { title }) {
    state.lists.push({ title, cards: [] });
  },
  [types.REMOVE_LIST](state, { listIndex }) {
    state.lists.splice(listIndex, listIndex);
  },
  [types.ADD_CARD_TO_LIST](state, { to, body }) {
    state.lists[to].cards.push({ body });
  },
  [types.REMOVE_CARD_FROM_LIST](state, { from, cardIndex }) {
    state.lists[from].cards.splice(cardIndex, 1);
  },
  [types.MOVE_CARD_TO_LIST](state, { from, to, cardIndex }) {
    const targetCard = state.lists[from].cards[cardIndex];
    state.lists[from].cards.splice(cardIndex, 1);
    state.lists[to].cards.push(targetCard);
  },
};

const getters = {
  listsCount: (state) => state.lists.length
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
});

store.subscribe((mutation, { lists }) => {
  localStorage.setItem('trollo-lists', JSON.stringify(lists));
});

export default store;
