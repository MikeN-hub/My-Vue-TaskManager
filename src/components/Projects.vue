<template>
  <div class="container">
    <div class="header">
      <h3>Projects</h3>
      <button>+ create new</button>
    </div>
    <div class="projects">
      <div class="project">Full Stack Web Development</div>
      <div class="project">UI/UX music poroject</div>
      <div class="project">FrontEnd Web App</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>

.container {
  display: flex;
  flex-direction: column;
  .header {
    padding: 2rem;
    display: flex;
    justify-content: space-between;
  }
  .projects {
  display: flex;
  justify-content: center;
  gap: 3rem;
  .project {
    display: grid;
    place-items: center;
    width: 200px;
    height: 200px;
    padding: 1rem;
    border: 3px solid green;
  }
}
}

</style>
