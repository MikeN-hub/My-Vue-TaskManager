<template>
  <div class="app">
    <div class="sidebar-toggle" @click="sidebarToggle">
      <font-awesome-icon icon="fa-solid fa-angle-right" />
    </div>
    <Sidebar :class="['sidebar', { sidebar_open: isSidebar }]" />
    <Clock />
    <Search class="search" />
    <TaskList
      class="tasklist"
      :tasks="tasks"
      @changeStatus="changeStatus"
      @removeTask="removeTask"
      @editTask="editTask"
    />
    <Calendar class="calendar" />
    <Projects class="projects" />
    <Schedule class="schedule" />
    <TaskForm
      v-if="isShowForm"
      :editedTask="editedTask"
      :avaliableStatuses="avaliableStatuses"
      @taskSaved="savedHandler"
    />
  </div>
</template>

<script>
import { ref } from 'vue'
import TaskList from '@/components/TaskList.vue'
import TaskForm from '@/components/TaskForm.vue'
import Sidebar from '@/components/Sidebar.vue'
import Search from '@/components/Search.vue'
import Calendar from '@/components/Calendar.vue'
import Schedule from '@/components/Schedule.vue'
import Projects from '@/components/Projects.vue'
import Clock from '@/components/Clock.vue'

export default {
  components: {
    TaskList,
    TaskForm,
    Sidebar,
    Search,
    Calendar,
    Schedule,
    Projects,
    Clock,
  },
  setup() {
    const data = [
      { id: 1, text: 'Learn TypeScript', status: 'todo' },
      { id: 2, text: 'Learn Vue 3', status: 'in progress' },
      { id: 3, text: 'Make my own todo', status: 'finished' },
    ]
    const avaliableStatuses = ['todo', 'in progress', 'finished']
    const tasks = ref(data)
    const editedTask = ref(null)
    const isSidebar = ref(true)
    const isShowForm = ref(false)

    const showFormToggle = () => (isShowForm.value = !isShowForm.value)
    const sidebarToggle = () => (isSidebar.value = !isSidebar.value)

    const addTask = () => {
      tasks.value.push({ id: 4, text: 'new', status: 'todo' })
    }

    const removeTask = (id) =>
      (tasks.value = tasks.value.filter((item) => item.id !== id))

    const editTask = (id) => {
      const currentTask = tasks.value.find((item) => item.id === id)
      editedTask.value = currentTask
      console.log(currentTask)
      console.log(editedTask.value)
      isShowForm.value = true
    }

    const savedHandler = (savedTask) => {
      showFormToggle()
      console.log(savedTask);
      // tasks.value = tasks.value.map((item) => {
      //   if (item.id === savedTask.id) {
      //     item = savedTask
      //   }
      // })
    }

    const changeStatus = (id) => {
      const currentTask = tasks.value.find((item) => item.id === id)
      const currentStatus = currentTask.status
      const statusIndex = avaliableStatuses.findIndex(
        (item) => item === currentStatus
      )
      let nextStatus
      if (statusIndex > 1) {
        nextStatus = avaliableStatuses[0]
      } else nextStatus = avaliableStatuses[statusIndex + 1]

      tasks.value = tasks.value.map((item) => {
        if (item.id === id) {
          return { ...item, status: nextStatus }
        } else return item
      })
    }

    return {
      tasks,
      addTask,
      isSidebar,
      sidebarToggle,
      changeStatus,
      removeTask,
      isShowForm,
      showFormToggle,
      editTask,
      editedTask,
      avaliableStatuses,
      savedHandler,
    }
  },
}
</script>

<style lang="scss">
@import '@/styles/global.scss';
.app {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-areas:
    'sidebar clock search schedule'
    'sidebar tasklist calendar schedule'
    'sidebar projects projects schedule';
  grid-template-columns: 2fr 4fr 4fr 3fr;
  grid-template-rows: 100px 1fr 1fr;
  grid-gap: 1rem;
  .sidebar {
    grid-area: sidebar;
    background-color: rgba(teal, 0.5);
    transition: 0.5s;
    transform: translateX(-300px);
    &.sidebar_open {
      transform: translateX(0);
    }
  }
  .clock {
    grid-area: clock;
  }
  .search {
    grid-area: search;
    background-color: grey;
  }
  .tasklist {
    grid-area: tasklist;
    background-color: #2f2f2f;
  }
  .calendar {
    grid-area: calendar;
    background-color: rgba($color: yellow, $alpha: 0.5);
  }
  .projects {
    grid-area: projects;
    background-color: #2f2f2f;
  }
  .schedule {
    grid-area: schedule;
    background-color: #312032;
  }
}
.sidebar-toggle {
  position: fixed;
  top: 0;
  left: 0;
  width: 20px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #03b734;
  cursor: pointer;
  z-index: 10;
}
</style>
