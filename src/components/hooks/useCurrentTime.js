import { ref, onBeforeUnmount } from 'vue'

export const useCurrentTime = () => {
  const currentTime = ref(new Date())
  const updateCurrentTime = () => {
    currentTime.value = new Date()
  }
  const timeInterval = setInterval(updateCurrentTime, 1000)
  onBeforeUnmount(() => {
    clearInterval(timeInterval)
  })
  return { currentTime }
}
