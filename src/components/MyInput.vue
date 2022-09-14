<template>
  <label for="orderNumber" class="my-input">
    {{ labelText }}
    <input
      :value="searchQuery"
      @input="updateInput"
      :placeholder="placeholder"
      type="text"
      class="my-input__inner"
    />
  </label>
</template>

<script>
export default {
  name: 'my-input',
  props: {
    searchQuery: [String, Number],
    placeholder: {
      type: String,
    },
    labelText: {
      type: String,
      default: '',
    },
  },
  methods: {
    updateInput(event) {
      console.log(event.target.value);
      this.$emit('updateInput', event.target.value);
    },
  },
};
</script>

<style lang="scss">
.my-input {
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 1.4rem;
}
.my-input__inner {
  border: 1px solid #D9D9D9;
  margin-top: 0.4rem;
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
}
</style>
