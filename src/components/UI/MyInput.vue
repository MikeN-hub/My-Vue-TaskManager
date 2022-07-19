<template>
  <input
    type="text"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script>
export default {
  props: ['modelValue'],
  emits: ['update:modelValue'],
}
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
input {
  padding: 0.5rem;
  font-size: 1rem;
  outline: none;
  border: 2px solid $grin-1-color;
}
</style>
