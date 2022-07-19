<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
}
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  color: #139d99;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
}
</style>
