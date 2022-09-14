<template>
  <div class="my-toggler">
    <div
      @click="toggleForm"
      @keyup.enter="toggleForm"
      :class="{ active: !isLinear }"
      class="my-toggler__item"
    >
      <img src="../assets/img/br-icon.svg" class="my-toggler__img" alt="" />
    </div>
    <div
      @click="toggleForm"
      @keyup.enter="toggleForm"
      :class="{ active: isLinear }"
      class="my-toggler__item"
    >
      <img src="../assets/img/li-icon.svg" class="my-toggler__img" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'my-toggler',
  props: {
    isLinear: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  methods: {
    toggleForm() {
      this.$emit('toggleForm');
    },
  },
};
</script>

<style lang="scss">
$white: #ffffff;
$darkgray: #647a8c;

.my-toggler {
  display: flex;
  height: 4rem;
  border-radius: 0.5rem;
}
.my-toggler__item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 1.2rem;
  background: $white;
  border: 1px solid $darkgray;
  cursor: pointer;
  &:first-child {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
  }
  &:last-child {
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
  &.active {
    background: #e5e9ec;
  }
}
</style>
