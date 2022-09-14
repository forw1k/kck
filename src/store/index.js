import Vue from 'vue';
import Vuex from 'vuex';
import cards from '@/data/cards.json';

Vue.use(Vuex);

const preparedCards = cards.map((item) => {
  const temp = {};
  temp.id = item.id;
  temp.number = item.number;
  temp.type = item.type;

  temp.isRemoveOptionOpen = false;

  const date = new Date(item.creationDate);
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  };
  temp.creationDate = date.toLocaleDateString('UTC', options).replace(/[,]/g, '');
  const itemTypesMapper = {
    delivery: 'Курьерская доставка',
    pickup: 'Самовывоз',
    'pick-point': 'Доставка в пункт выдачи',
  };
  temp.title = temp.type ? (itemTypesMapper[temp.type.toLowerCase()] || '') : '';

  return temp;
});

const loadData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve(preparedCards);
  }, 100);
});

export default new Vuex.Store({
  actions: {
    async loadData({ commit }, payload) {
      try {
        await loadData(payload);
        commit('SET_ROWS', preparedCards);
      } catch (error) {
        console.error(error);
      }
    },
  },
  state: {
    rows: [],
    headers: [
      { title: 'ID', value: 'id', id: 1 },
      { title: 'Номер накладной', value: 'orderNumber', id: 2 },
      { title: 'Тип заказа', value: 'orderType', id: 3 },
      { title: 'Дата создания', value: 'createData', id: 4 },
      { title: '', value: 'action', id: 5 },
    ],
    options: [
      { id: 1, title: 'Номер накладной', value: 'From' },
      { id: 2, title: 'Номер накладной', value: 'To' },
    ],
    orderTypes: [
      { id: 0, title: 'Выберите из списка', value: 'Default' },
      { id: 1, title: 'Самовывоз', value: 'Pickup' },
      { id: 2, title: 'Курьерская доставка', value: 'Delivery' },
      { id: 3, title: 'Доставка в пункт выдачи', value: 'Pick-point' },
    ],
    sortSelected: '',
    filterSelected: 'Default',
    isLinear: true,
    searchQuery: '',
  },
  getters: {
    selectedSort(state) {
      if (!state.sortSelected) return 'Сортировка';
      const [{ title }] = state.options.filter((item) => item.value === state.sortSelected);
      return title;
    },
    selectedFilter(state) {
      switch (state.filterSelected) {
        case 'Delivery':
          return 'Курьерская доставка';
        case 'Pickup':
          return 'Самовывоз';
        case 'Pick-point':
          return 'Доставка в пункт выдачи';
        default:
          return 'Выберите из списка';
      }
    },
    sortedRows(state) {
      switch (state.sortSelected) {
        case 'From':
          return [...state.rows].sort((rowA, rowB) => rowA.number.localeCompare(rowB.number));
        case 'To':
          return [...state.rows].sort((rowA, rowB) => rowB.number.localeCompare(rowA.number));
        default:
          return state.rows;
      }
    },
    sortedAndFilteredRows(state, getters) {
      return getters.sortedRows
        .filter((row) => row.number.toLowerCase().includes(state.searchQuery.toLowerCase()));
    },
    sortedAndFilteredSelectedRows(state, getters) {
      if (state.filterSelected === 'Default') return getters.sortedAndFilteredRows;
      return getters.sortedAndFilteredRows.filter((row) => row.type === state.filterSelected);
    },
  },
  mutations: {
    SET_ROWS(state, payload) {
      state.rows = payload;
    },
    REMOVE_ROW(state, payload) {
      state.rows = payload;
    },
    SET_SORT_SELECTED(state, payload) {
      state.sortSelected = payload;
    },
    SET_FILTER_SELECTED(state, payload) {
      state.filterSelected = payload;
    },
    TOGGLE_IS_LINEAR(state) {
      state.isLinear = !state.isLinear;
    },
    SET_SEARCH_QUERY(state, searchQuery) {
      state.searchQuery = searchQuery;
    },
  },
});
