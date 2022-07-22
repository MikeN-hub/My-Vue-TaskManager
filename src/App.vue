<template>
  <div class="app">
    <div class="sidebar-toggle" @click="sidebarToggle">
      <font-awesome-icon icon="fa-solid fa-angle-right" />
    </div>
    <Sidebar :class="['sidebar', { sidebar_open: isSidebar }]" />
    <Clock />
    <Search class="search" @searched="searched" />
    <TaskList
      class="tasklist"
      :tasks="searchedTasks"
      :avaliableStatuses="avaliableStatuses"
      @changeStatus="changeStatus"
      @removeTask="removeTask"
      @edited="editTask"
      @newTaskCreated="addTask"
    />
    <Calendar class="calendar" />
    <Projects class="projects" />
    <Schedule class="schedule" />
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
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
    const avaliableStatuses = ['todo', 'in progress', 'finished']
    const tasks = ref([])
    const query = ref('')
    const isSidebar = ref(true)

    const sidebarToggle = () => (isSidebar.value = !isSidebar.value)

    const addTask = (newTask) => {
      tasks.value.push(newTask)
      localStorage.setItem('vue-todo', JSON.stringify(tasks.value))
    }

    const removeTask = (id) => {
      tasks.value = tasks.value.filter((item) => item.id !== id)
      localStorage.setItem('vue-todo', JSON.stringify(tasks.value))
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
      localStorage.setItem('vue-todo', JSON.stringify(tasks.value))
    }

    const editTask = (payload) => {
      tasks.value = tasks.value.map((item) => {
        if (item.id === payload.id) {
          return { ...item, text: payload.text }
        } else return item
      })
      localStorage.setItem('vue-todo', JSON.stringify(tasks.value))
    }

    const searched = (text) => {
      query.value = text
    }

    const searchedTasks = computed(() => {
      return tasks.value.filter((item) => item.text.toLowerCase().includes(query.value))
    })

    onMounted(() => {
      if (localStorage.getItem('vue-todo')) {
        let fetchedTasks = JSON.parse(localStorage.getItem('vue-todo'))
        tasks.value = fetchedTasks
      }
    })

    return {
      isSidebar,
      tasks,
      avaliableStatuses,
      sidebarToggle,
      addTask,
      removeTask,
      changeStatus,
      editTask,
      searched,
      searchedTasks,
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
  }
  .tasklist {
    grid-area: tasklist;
    background-color: #2f2f2f;
  }
  .calendar {
    grid-area: calendar;
    background-color: #2f2f2f;
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
