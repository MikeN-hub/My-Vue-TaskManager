<template>
  <div class="taskList">
    <div class="header">
      <div class="title">My tasks</div>
      <MyButton class="createTask-btn">+ Create new</MyButton>
    </div>
    <TaskItem
      :task="task"
      v-for="task in tasks"
      :key="task.id"
      @changeStatus="$emit('changeStatus', $event)"
      @removeTask="$emit('removeTask', $event)"
      @editTask="$emit('editTask', $event)"
    />
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'

export default {
  components: { TaskItem },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  setup(props, context) {
    return {}
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
