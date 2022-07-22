<template>
  <div class="taskList">
    <div class="header">
      <div class="title">My tasks</div>
      <MyButton class="createTask-btn" @click="openForm">+ Create new</MyButton>
    </div>
    <TaskItem
      :task="task"
      v-for="task in tasks"
      :key="task.id"
      @changeStatus="$emit('changeStatus', $event)"
      @removeTask="$emit('removeTask', $event)"
      @edited="$emit('edited', $event)"
    />
    <TaskForm
      v-if="isShowForm"
      :avaliableStatuses="avaliableStatuses"
      @newTaskCreated="newTaskCreated"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import TaskItem from './TaskItem.vue'
import TaskForm from './TaskForm.vue'

export default {
  components: { TaskItem, TaskForm },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    avaliableStatuses: {
      type: Array,
      requred: true,
    },
  },
  setup(props, context) {
    const isShowForm = ref(false)

    const openForm = () => (isShowForm.value = true)

    const newTaskCreated = (newTask) => {
      context.emit('newTaskCreated', newTask)
      isShowForm.value = false
    }
    return { isShowForm, openForm, newTaskCreated }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.taskList {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 1rem;
    .title {
      font-size: 1.8rem;
    }
    .createTask-btn {
      font-size: 1.2rem;
    }
  }
}
</style>
