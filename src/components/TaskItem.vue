<template>
  <div class="task">
    <font-awesome-icon :icon="iconVariant" />
    <p :class="['task__text', textVariant]">{{ task.text }}</p>
    <p
      :class="['task__status', statusVariant]"
      @click="changeStatus"
    >
      {{ task.status }}
    </p>
    <font-awesome-icon icon="fa-regular fa-pen-to-square" @click="$emit('editTask', task.id)"/>
    <font-awesome-icon icon="fa-regular fa-trash-can" @click="$emit('removeTask', task.id)"/>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  setup(props, context) {
    const iconVariant = computed(() => {
      switch (props.task.status) {
        case 'todo':
          return 'fa-regular fa-circle'
          break
        case 'in progress':
          return 'fa-regular fa-circle-dot'
          break
        case 'finished':
          return 'fa-regular fa-circle-check'
        default:
          return 'fa-regular fa-circle'
          break
      }
    })
    const textVariant = computed(() => {
      return props.task.status === 'finished' ? 'lineThrough' : ''
    })
    const statusVariant = computed(() => {
      switch (props.task.status) {
        case 'todo':
          return 'orange'
          break
        case 'in progress':
          return 'yellow'
          break
        case 'finished':
          return 'green'
        default:
          return 'orange'
          break
      }
    })
    const changeStatus = () => {
      context.emit('changeStatus', props.task.id)
    }
    return { iconVariant, textVariant, statusVariant, changeStatus }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';
.task {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0 1rem;
  font-size: 1.3rem;

  .task__id {
    flex: 1;
  }
  .task__text {
    flex: 12;
  }

  & .lineThrough {
    text-decoration: line-through;
  }
  .task__status {
    flex: 3;
    font-size: 1rem;
    cursor: pointer;
  }
  & .green {
    color: green;
  }
  & .yellow {
    color: yellow;
  }
  & .orange {
    color: orange;
  }
}
</style>
