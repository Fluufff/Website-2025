<template>
  <div class="schedule__day">
    <h2>{{ dayInfo.name }}, {{ dayInfo.short }}</h2>
    <div class="schedule__day__open_location" v-for="loc in locationsOfTheDay">
      <IconPin class="pin" />
      <h3>{{ loc.name }}</h3>
      <IconClock />
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
import IconClock from '~icons/brix/clock'
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
@use '../styles/charter';
@use '../styles/text-styles';

.schedule__day {
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: charter.$primary700;
  @include text-styles.display2Regular;

  @media (min-width: 600px) {
    display: grid;
    grid-template-columns: 1fr 1fr;

    h2 {
      grid-column: 1 / 3;
    }
  }

  h2 {
    border-radius: 3px;
    padding: 12px 10px;
    background: charter.$secondary700;
    color: charter.$neutrals100;
    @include text-styles.display3SemiBold;
    text-align: center;
    align-self: center;
    line-height: 12px;
  }

  svg {
    height: 20px;
    width: 20px;
    flex-shrink: 0;
  }

  .schedule__day__open_location {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 8px;
    border: solid 1px charter.$neutrals400;
    padding: 24px;
    gap: 8px;

    @media (max-width: 600px) {
      padding: 16px;
    }

    &__times {
      display: flex;
      flex-direction: column;
      margin-right: auto;
    }

    svg.pin {
      order: 2;
    }

    h3 {
      display: flex;
      @include text-styles.display2Regular;
      flex-direction: row;
      align-items: center;
      gap: 8px;
      order: 3;
      text-align: right;
    }
  }
}
</style>
