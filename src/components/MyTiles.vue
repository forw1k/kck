<template>
  <div class="my-tiles">
    <div
      v-for="row in rows"
      :key="row.id"
      @blur="
        () => {
          row.isRemoveOptionOpen = false;
        }
      "
      tabindex="0"
      class="my-tiles__block"
    >
      <div class="my-tiles__head">
        <div class="my-tiles__text">{{ row.id }}</div>
        <div
          @click="toggleRemoveOptionState(row)"
          @keyup.enter="toggleRemoveOptionState(row)"
          class="my-tiles__action"
        >
          <svg
            class="my-tiles__icon"
            width="4"
            height="14"
            viewBox="0 0 4 14"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 1.75C4 0.7875 3.1 0 2 0C0.9 0 0 0.7875 0 1.75C0
                2.7125 0.9 3.5 2 3.5C3.1 3.5 4 2.7125 4 1.75ZM4 12.25C4
                11.2875 3.1 10.5 2 10.5C0.9 10.5 0 11.2875 0 12.25C0
                13.2125 0.9 14 2 14C3.1 14 4 13.2125 4 12.25ZM4 7C4
                6.0375 3.1 5.25 2 5.25C0.9 5.25 0 6.0375 0 7C0 7.9625
                0.9 8.75 2 8.75C3.1 8.75 4 7.9625 4 7Z"
            />
          </svg>
        </div>
        <my-delete-btn
            v-if="row.isRemoveOptionOpen"
            @clickRemove="removeRow(row)"
            class="my-tiles__btn"
        />
      </div>
      <div class="my-tiles__body">
        <div class="my-tiles__item">
          <div class="my-tiles__name">{{ headers[1].title }}:</div>
          <div class="my-tiles__text">{{ row.number }}</div>
        </div>
        <div class="my-tiles__item">
          <div class="my-tiles__name">{{ headers[2].title }}:</div>
          <div class="my-tiles__text">{{ row.title }}</div>
        </div>
        <div class="my-tiles__item">
          <div class="my-tiles__name">{{ headers[3].title }}:</div>
          <div class="my-tiles__text">
            {{ row.creationDate }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyDeleteBtn from '@/components/MyDeleteBtn.vue';

export default {
  name: 'my-tiles',
  components: {
    MyDeleteBtn,
  },
  props: {
    rows: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
    isLinear: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  methods: {
    removeRow(row) {
      this.$emit('remove', row);
    },
    toggleRemoveOptionState(row) {
      const rowCopy = row;
      rowCopy.isRemoveOptionOpen = !rowCopy.isRemoveOptionOpen;
    },
  },
};
</script>

<style lang="scss">
$gray: #e6e6e6;
$white: #ffffff;
$blue: #045da7;
$darkgray: #647a8c;

.my-tiles {
  display: grid;
  grid-template-columns: auto auto auto;
}
.my-tiles__block {
  display: flex;
  flex-direction: column;
  background: #f6fafb;
  box-shadow: 0px 4px 12px #ebebeb;
  border-radius: 3px;
  margin-right: 1.6rem;
  margin-bottom: 1.6rem;
  &:nth-child(3n) {
    margin-right: 0;
  }
}
.my-tiles__head {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.2rem 1.6rem;
  font-size: 1.4rem;
  background: rgba(237, 232, 245, 0.5);
}
.my-tiles__body {
  padding: 1.2rem 1.6rem;
}
.my-tiles__name {
  color: $darkgray;
  font-weight: bold;
  font-size: 1.4rem;
  flex-basis: 40%;
  margin-right: 0.5rem;
}
.my-tiles__item {
  display: flex;
  align-items: flex-start;
  font-size: 1.4rem;
  &:not(last-child) {
    margin-bottom: 0.8rem;
  }
}
.my-tiles__text {
  font-size: 1.4rem;
}
.my-tiles__action {
  vertical-align: middle;
  text-align: center;
  width: 4rem;
  cursor: pointer;
  transition: 0.4s;
  &:hover {
    .my-tiles__icon {
      fill: $blue;
    }
  }
}
.my-tiles__icon {
  fill: $darkgray;
}
.my-tiles__btn {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 111;
}
</style>
