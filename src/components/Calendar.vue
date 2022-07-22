<template>
  <div class="calendar">
    <form class="dateForm" action="">
      <select class="select-year" v-model="selectedOptions.year">
        <option disabled value="">chose year</option>
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
      <select class="select-mont" v-model="selectedOptions.month">
        <option disabled value="">chose month</option>
        <option v-for="month in months" :key="'month' + month" :value="month">
          {{ month }}
        </option>
      </select>
      <select class="select-day" v-model="selectedOptions.day">
        <option disabled value="">chose date</option>
        <option v-for="date in dates" :key="'date' + date" :value="date">
          {{ date }}
        </option>
      </select>
    </form>
    <div class="controls">
      <button
        @click="selectedOptions.month = getMonth(selectedOptions.month - 1)"
      >
        &lt
      </button>
      <div>{{ picked.monthLong }}</div>
      <button
        @click="selectedOptions.month = getMonth(selectedOptions.month + 1)"
      >
        &gt
      </button>
    </div>
    <div class="dateGrid">
      <div class="weekDays" v-for="day in weekDays" :key="day">{{ day }}</div>
      <div
        :class="[
          'dateNum',
          {
            hidden: num.hidden,
            active: num.value === selectedOptions.day && !num.hidden,
          },
        ]"
        v-for="(num, index) in getGridArr"
        :key="'num' + index"
        @click="selectDay(num)"
      >
        {{ num.value }}
      </div>
    </div>
    <div class="picked">
      {{
        picked.setLocale('ru-RU').toLocaleString({
          weekday: 'long',
          month: 'long',
          day: '2-digit',
          year: 'numeric'
        })
      }}
    </div>
  </div>
</template>

<script>
import { ref, onCreated, onMounted, computed } from 'vue'
import { DateTime, Info } from 'luxon'
import { getArray, getMonth } from '@/helpers/helpers'

export default {
  setup(props, context) {
    const months = getArray(1, 12)
    const years = getArray(2000, 2022)
    const dates = Array.from({ length: 31 }, (_, index) => index + 1)
    const weekDays = Info.weekdays('short')
    const now = DateTime.now()
    const isActive = ref(false)

    const selectDay = (num) => {
      if (!num.hidden) {
        selectedOptions.value.day = num.value
      }
    }

    const selectedOptions = ref({
      year: now.year,
      month: now.month,
      day: now.day,
    })

    const getGridArr = computed(() => {
      let dt = DateTime.local(
        selectedOptions.value.year,
        selectedOptions.value.month,
        1
      )
      let daysInMonth = dt.daysInMonth
      let currentDays = getArray(1, daysInMonth)
      let weekDay = dt.weekday
      let daysInPrevMonth = DateTime.local(
        selectedOptions.value.year,
        selectedOptions.value.month - 1
      ).daysInMonth
      let prevDaysStart = daysInPrevMonth - weekDay + 2
      let prevDays = getArray(prevDaysStart, daysInPrevMonth)
      let nextDays = getArray(1, 42 - prevDays.length - currentDays.length)

      let mapedPrevDays = prevDays.map((item) => {
        return { value: item, hidden: true }
      })
      let mapedNextDays = nextDays.map((item) => {
        return { value: item, hidden: true }
      })
      let mapedCurrentDays = currentDays.map((item) => {
        return { value: item, hidden: false }
      })
      let GridArr = [...mapedPrevDays, ...mapedCurrentDays, ...mapedNextDays]

      return GridArr
    })

    const picked = computed(() => {
      return DateTime.fromObject(selectedOptions.value)
    })

    return {
      months,
      years,
      dates,
      weekDays,
      selectedOptions,
      getGridArr,
      selectDay,
      picked,
      isActive,
      getMonth,
    }
  },
}
</script>

<style lang="scss" scoped>
button {
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
  cursor: pointer;
}
.calendar {
  display: flex;
  flex-direction: column;

  & .dateForm {
    display: flex;
    padding: 1rem;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    & > select {
      font-size: 1rem;
      padding: 0.3rem;
    }
  }

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    & div {
      font-size: 2rem;
      width: 30%;
      text-align: center;
    }
  }

  & .dateGrid {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    .weekDays {
      display: grid;
      place-items: center;
      margin-bottom: 0.5rem;
      font-size: 1.4rem;
      &:nth-child(7n),
      &:nth-child(6n) {
        color: coral;
      }
    }
    .dateNum {
      display: grid;
      place-items: center;
      padding: 5px;
      cursor: pointer;
      font-size: 1.3rem;

      &:nth-child(7n),
      &:nth-child(7n - 1) {
        color: coral;
      }

      &.hidden {
        opacity: 0.3;
      }
      &.active {
        background-color: rgba(teal, 0.5);
      }
    }
    .dateNum:hover {
      background-color: teal;
    }
  }
  .picked {
    margin-top: 1rem;
    display: flex;
    justify-content: center;
  }
}
</style>
