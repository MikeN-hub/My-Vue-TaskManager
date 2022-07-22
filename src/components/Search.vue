<template>
  <div class="search">
    <div class="wrapper">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      <input type="text" v-model="searchQuery" placeholder="search Task..." />
    </div>
    <div class="decorElem"></div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  setup(props, context) {
    const searchQuery = ref('')

    watch(searchQuery, () => {
      if (searchQuery) {
        context.emit('searched', searchQuery.value.toLowerCase())
      }
    })
    return { searchQuery }
  },
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  padding-right: 1rem;
  .wrapper {
    width: 70%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    input {
      width: 100%;
      font-size: 1.5rem;
      border: none;
      background: none;
      outline: none;
      color: white;
    }
  }

  .decorElem {
    width: 70%;
    height: 2px;
    background-color: lightgrey;
  }
}
</style>
