<template>
  <div>
    <div class="my-sort__label">{{ labelText }}</div>
    <div class="my-sort">
      <div @click="openSelect" @keyup.enter="openSelect" class="my-sort__head">
        <div class="my-sort__title">{{ selectedOption }}</div>
        <div :class="{ reverse: isOpen }" class="my-sort__icon">
          <img src="../assets/img/ar-icon.svg" alt="" />
        </div>
      </div>
      <div v-if="isOpen" class="my-sort__hidden">
        <div
          @click="$emit('setOption', option)"
          @keyup.enter="$emit('setOption', option)"
          v-for="option in options"
          :key="option.id"
          class="my-sort__item"
        >
          <div class="my-sort__text">{{ option.title }}</div>
          <div v-if="hasIcon" :class="{ reverse: option.value === 'To' }" class="my-sort__img">
            <img src="../assets/img/ArrowsDownUp.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-sort',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    orderTypes: {
      type: Array,
      default: () => [],
    },
    selectedOption: {
      type: String,
      required: true,
    },
    labelText: {
      type: String,
      default: '',
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    openSelect() {
      this.$emit('open');
    },
  },
};
</script>

<style lang="scss">
$white: #ffffff;

.my-sort {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  max-width: 30rem;
  min-width: 23rem;
}
.my-sort__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background: $white;
  border: 1px solid #e0e5e6;
  border-radius: 2px;
  padding: 1.2rem 0.8rem;
}
.my-sort__title {
  margin-right: 0.5rem;
  font-weight: bold;
  font-size: 1.4rem;
}
.my-sort__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  background: $white;
  border-bottom: 1px solid #e0e5e6;
  border-left: 1px solid #e0e5e6;
  border-right: 1px solid #e0e5e6;
  border-radius: 2px;
  padding: 1.2rem 0.8rem;
}
.my-sort__hidden {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 100%;
}
.my-sort__text {
  font-size: 1.2rem;
}
.my-sort__img {
  &.reverse {
    transform: scale(-1, 1);
  }
}
.my-sort__icon {
  transition: 0.4s;
  &.reverse {
    transform: rotate(-180deg);
  }
}
.my-sort__label {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 0.4rem;
}
</style>
