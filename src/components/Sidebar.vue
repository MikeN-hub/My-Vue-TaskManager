<template>
  <div class="sidebar">
    <div class="profile">
      <div class="foto">
        <img src="@/assets/images/nice-girl.jpg" alt="" />
      </div>
      <div class="name">Amanda Hill</div>
      <div class="email">amanda@gmail.com</div>
    </div>
    <nav class="menu">
      <div class="dashboard menu-item">
        <font-awesome-icon icon="fa-solid fa-border-all" />
        <p>dashboard</p>
      </div>
      <div class="tasksList menu-item">
        <font-awesome-icon icon="fa-solid fa-table-list" />
        <p>tasksList</p>
      </div>
      <div class="projects menu-item">
        <font-awesome-icon icon="fa-solid fa-diagram-project" />
        <p>projects</p>
      </div>
      <div class="schedules menu-item">
        <font-awesome-icon icon="fa-solid fa-calendar-days" />
        <p>schedules</p>
      </div>
      <div class="alalitics menu-item">
        <font-awesome-icon icon="fa-solid fa-chart-pie" />
        <p>analitics</p>
      </div>
      <div class="settings menu-item">
        <font-awesome-icon icon="fa-solid fa-gear" />
        <p>settings</p>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-right: 2px solid grey;

  & .profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    .foto {
      height: 100px;
      width: 100px;
      border-radius: 50%;
      display: grid;
      margin: auto;
      img {
        border-radius: 50%;
        border: 2px solid #03b734;
      }
    }
    .name {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .email {
      color: #909090;
    }
  }

  & .menu {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    font-size: 1.5rem;

    .menu-item {
      display: flex;
      gap: 1rem;
      align-items: center;

      p {
        color: #8f8f8f;
      }
    }
  }
}
</style>
