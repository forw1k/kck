<template>
  <div>
    <my-header></my-header>
    <div class="my-content">
      <div class="my-content__aside">
        <div class="my-filter">
          <div class="my-filter__title">Фильтр</div>
          <div class="my-filter__content">
            <div class="my-filter__item">
              <my-input
                @updateInput="SET_SEARCH_QUERY"
                :searchQuery="searchQuery"
                :placeholder="'Введите фрагмент'"
                :labelText="'Номер накладной'"
              />
            </div>
            <div class="my-filter__item">
              <my-sort
                @open="toggleFilterSelect"
                @setOption="selectFilterOption"
                :isOpen="isFilterOpen"
                :options="orderTypes"
                :selectedOption="selectedFilter"
                :labelText="'Тип заказа'"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="my-content__main">
        <div class="my-content__wrap">
          <div class="my-content__inner">
            <my-sort
              @open="toggleSortSelect"
              @setOption="selectSortOption"
              :isOpen="isSortOpen"
              :options="options"
              :selectedOption="selectedSort"
              :hasIcon="true"
            />
          </div>
          <my-toggler @toggleForm="toggleView" :isLinear="isLinear" />
        </div>
        <my-table
          :isLinear="isLinear"
          @remove="removeItem"
          :rows="sortedAndFilteredSelectedRows"
          :headers="headers"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader.vue';
import MyTable from '@/components/MyTable.vue';
import MySort from '@/components/MySort.vue';
import MyInput from '@/components/MyInput.vue';
import MyToggler from '@/components/MyToggler.vue';
import {
  mapState, mapMutations, mapGetters, mapActions,
} from 'vuex';

export default {
  components: {
    MyHeader,
    MyTable,
    MySort,
    MyToggler,
    MyInput,
  },
  data() {
    return {
      isSortOpen: false,
      isFilterOpen: false,
    };
  },
  computed: {
    ...mapState([
      'rows',
      'headers',
      'options',
      'sortSelected',
      'isLinear',
      'searchQuery',
      'orderTypes',
      'filterSelected',
    ]),
    ...mapGetters([
      'selectedSort',
      'sortedRows',
      'sortedAndFilteredRows',
      'selectedFilter',
      'sortedAndFilteredSelectedRows',
    ]),
  },
  methods: {
    ...mapMutations(['REMOVE_ROW', 'SET_SORT_SELECTED', 'TOGGLE_IS_LINEAR', 'SET_SEARCH_QUERY']),
    ...mapActions(['loadData']),
    removeItem(row) {
      console.log('aaa', row);
      this.$store.commit(
        'REMOVE_ROW',
        this.rows.filter((item) => item.id !== row.id),
      );
    },
    toggleSortSelect() {
      if (!this.isSortOpen) {
        this.isSortOpen = true;
      } else {
        this.isSortOpen = false;
      }
    },
    toggleFilterSelect() {
      if (!this.isFilterOpen) {
        this.isFilterOpen = true;
      } else {
        this.isFilterOpen = false;
      }
    },
    selectSortOption(option) {
      this.$store.commit('SET_SORT_SELECTED', option.value);
      this.isSortOpen = false;
    },
    selectFilterOption(option) {
      this.$store.commit('SET_FILTER_SELECTED', option.value);
      this.isFilterOpen = false;
    },
    toggleView() {
      this.$store.commit('TOGGLE_IS_LINEAR');
      if (this.isLinear) {
        this.$router.push('/');
      } else {
        this.$router.push('/tiles');
      }
    },
  },
  created() {
    this.loadData();
    if (this.$route.path === '/tiles') {
      this.$store.commit('TOGGLE_IS_LINEAR', false);
    }
  },
};
</script>

<style lang="scss">
$white: #ffffff;

.my-content {
  padding: 3.2rem 11.6rem;
  display: flex;
}
.my-content__main {
  width: 100%;
}
.my-content__aside {
  margin-right: 1.6rem;
}
.my-content__wrap {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.6rem;
}
.my-content__inner {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: $white;
  box-shadow: 0px 4px 12px #e7e7e7;
  border-radius: 3px;
  margin-right: 1.6rem;
  padding: 1.6rem;
}
.my-filter {
  width: 28rem;
  padding: 1.6rem;
  box-shadow: 0px 4px 12px #e7e7e7;
}
.my-filter__title {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 2.4rem;
}
.my-filter__item:not(:last-child) {
  margin-bottom: 1.6rem;
}
.my-filter__name {
  font-weight: bold;
}
.my-filter__item {
  width: 100%;
}
</style>
