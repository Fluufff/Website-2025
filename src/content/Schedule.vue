<template>
  <div class="schedule">
    <ScheduleDay :day="i" :days="days" :open-locations="openLocations" v-for="(day, i) in days" />
  </div>
</template>

<script setup lang="ts">
import ScheduleDay from './ScheduleDay.vue'

export interface DayInfo {
  name: string
  short: string
}

export type OpenTime = [number, number, number, number, number]

export interface OpenLocation {
  name: string
  times: OpenTime[]
}

defineProps<{
  days: Array<DayInfo>
  openLocations: OpenLocation[]
}>()
</script>

<style scoped lang="scss"></style>
