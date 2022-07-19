<template>
  <div class="clock">
    <p class="time">{{ currentTime.toLocaleTimeString() }}</p>
    <p class="date">{{ currentTime.toLocaleDateString('ru-RU', options) }}</p>
  </div>
</template>

<script>
import { useCurrentTime } from '@/components/hooks/useCurrentTime'

export default {
  setup() {
    const { currentTime } = useCurrentTime()
    const options = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }

    return { currentTime, options }
  },
}
</script>

<style lang="scss" scoped>
.clock {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  .time {
    color: white;
    font-size: 2rem;
    font-weight: bold;
  }
  .date {
    color: #139D99;
    text-transform: capitalize;
  }
}
</style>
