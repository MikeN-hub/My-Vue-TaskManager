<template>
  <div class="task">
    <font-awesome-icon :icon="iconStatusVariant" />
    <input type="text" class="task__text" v-if="isEditing" v-model="newText" />
    <p :class="['task__text', textVariant]" v-else>{{ task.text }}</p>
    <p
      :class="['task__status', statusVariant]"
      @click="$emit('changeStatus', task.id)"
    >
      {{ task.status }}
    </p>
    <font-awesome-icon :icon="IconEditVariant" @click="editTask" />
    <font-awesome-icon
      icon="fa-regular fa-trash-can"
      @click="$emit('removeTask', task.id)"
    />
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
    const iconStatusVariant = computed(() => {
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
    const textVariant = computed(() =>
      props.task.status === 'finished' ? 'lineThrough' : ''
    )
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
    const IconEditVariant = computed(() => {
      return isEditing.value
        ? 'fa-solid fa-floppy-disk'
        : 'fa-regular fa-pen-to-square'
    })

    const isEditing = ref(false)
    const taskRef = ref(props.task)
    const newText = ref(props.task.text)
    const editTask = () => {
      isEditing.value = !isEditing.value
      if (newText.value) {
        taskRef.value.text = newText.value
        context.emit('edited', taskRef)
      } else {
        alert('text field cannot be empy')
        isEditing.value = !isEditing.value
      }
    }

    return {
      iconStatusVariant,
      textVariant,
      statusVariant,
      IconEditVariant,
      isEditing,
      taskRef,
      editTask,
      newText,
    }
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
