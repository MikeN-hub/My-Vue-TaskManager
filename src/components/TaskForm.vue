<template>
  <div class="backdrop">
    <form class="box" @submit.prevent>
      <MyInput class="input-task" v-model="inputText" />
      <div class="selectEl">
        <select v-model="selectedStatus">
          <option disabled value="">Выберите один из вариантов</option>
          <option v-for="status in avaliableStatuses" :value="status">
            {{ status }}
          </option>
        </select>
        <span>Выбрано: {{ selectedStatus }}</span>
      </div>

      <MyButton class="submit-btn" type="submit" @click="saveTask"
        >save Task</MyButton
      >
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import MyInput from './UI/MyInput.vue'

export default {
  props: {
    avaliableStatuses: {
      type: Array,
      required: true
    },
  },
  setup(props, context) {
    const inputText = ref('')
    const selectedStatus = ref('')

    const saveTask = () => {
      if (inputText) {
        const newTask = {
          id: Date.now(),
          text: inputText.value,
          status: selectedStatus.value,
        }
        context.emit('newTaskCreated', newTask)
      }
    }

    return { inputText, selectedStatus, saveTask }
  },
  components: { MyInput },
}
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
}
.box {
  background: #212121;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -30%);
  min-width: 80%;
  // height: 200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  .input-task {
    flex: 5;
  }
  .selectEl {
    flex: 3;
  }
  .submit-btn {
    flex: 2;
  }
}
</style>
