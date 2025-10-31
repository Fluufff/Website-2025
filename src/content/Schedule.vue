<template>
  <div class="schedule">
    <ScheduleDay
      v-for="(_, i) in days"
      :key="i"
      :day="i"
      :days="days"
      :open-locations="openLocations"
      :locations="locations"
      :tags="tags"
      :events="events"
    />
  </div>
</template>

<script setup lang="ts">
import ScheduleDay from './ScheduleDay.vue'

export interface DayInfo {
  name: string
  short: string
}

export interface TagInfo {
  name: string
  emoji: string
}

export interface EventInfo {
  time: OpenTime
  tags: number[]
  location: number | null
  host: string | null
  title: string
  description: string
}

export type OpenTime = [number, number, number, number, number]

export interface OpenLocation {
  name: string
  times: OpenTime[]
}

defineProps<{
  days: DayInfo[]
  tags: TagInfo[]
  events: EventInfo[]
  locations: string[]
  openLocations: OpenLocation[]
}>()
</script>

<style lang="scss">
.schedule {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-self: stretch;
}
</style>
