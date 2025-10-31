<template>
  <div class="schedule__day">
    <h2>{{ dayInfo.name }}, {{ dayInfo.short }}</h2>
    <div class="schedule__day__open_location" v-for="loc in locationsOfTheDay">
      <h3><IconPin />{{ loc.name }}</h3>
      <div class="schedule__day__open_location__times">
        <span class="closed" v-if="loc.times.length === 0">Closed</span>
        <span v-else v-for="time in loc.times">{{ displayTime(time) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DayInfo, OpenLocation, OpenTime } from './Schedule.vue'
import IconPin from '~icons/brix/pin'
import { computed } from 'vue'

const props = defineProps<{
  day: number
  days: Array<DayInfo>
  openLocations: OpenLocation[]
}>()

const dayInfo = computed(() => props.days[props.day]!)
const locationsOfTheDay = computed<OpenLocation[]>(() =>
  props.openLocations.map((l) => ({
    name: l.name,
    times: l.times.filter((t) => t[0] === props.day)
  }))
)

function displayTime(time: OpenTime): string {
  return `${pad(time[1])}:${pad(time[2])} - ${pad(time[3])}:${pad(time[4])}`
}

function pad(num: number): string {
  return num.toString().padStart(2, '0')
}
</script>

<style lang="scss">
.schedule__day {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .schedule__day__open_location {
    display: flex;
    flex-direction: row;

    h3 {
      order: 2;
    }
  }
}
</style>
