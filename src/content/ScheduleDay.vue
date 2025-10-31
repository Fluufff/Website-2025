<template>
  <div class="schedule__day">
    <h2>{{ dayInfo.name }}, {{ dayInfo.short }}</h2>
    <div class="schedule__day__open_locations">
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
    <div class="schedule__day__events">
      <div class="schedule__day__event" v-for="event in eventsOfTheDay" :key="event.title">
        <div class="schedule__day__event__time"><IconClock /> {{ displayTime(event.time) }}</div>
        <h3>{{ event.title }}</h3>
        <div v-if="event.location !== null" class="schedule__day__event__time">
          <IconPin /> {{ displayLocation(event.location) }}
        </div>
        <div v-if="event.description" class="schedule__day__event__description" v-html="event.description"></div>
        <ul class="schedule__day__event__tags" v-if="event.tags.length > 0 || event.host">
          <li v-for="tag in event.tags">
            <span>{{ displayTagEmoji(tag) }}</span
            >{{ displayTag(tag) }}
          </li>
          <li class="host" v-if="event.host">by {{ event.host }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DayInfo, EventInfo, OpenLocation, OpenTime, TagInfo } from './Schedule.vue'
import IconPin from '~icons/brix/pin'
import IconClock from '~icons/brix/clock'
import { computed } from 'vue'

const props = defineProps<{
  day: number
  days: DayInfo[]
  tags: TagInfo[]
  events: EventInfo[]
  locations: string[]
  openLocations: OpenLocation[]
}>()

const displayLocation = (i: number) => props.locations[i]!
const dayInfo = computed(() => props.days[props.day]!)
const locationsOfTheDay = computed<OpenLocation[]>(() =>
  props.openLocations.map((l) => ({
    name: l.name,
    times: l.times.filter((t) => t[0] === props.day)
  }))
)

const eventsOfTheDay = computed(() => props.events.filter((e) => e.time[0] === props.day))

function displayTime(time: OpenTime): string {
  return `${pad(time[1])}:${pad(time[2])} - ${pad(time[3])}:${pad(time[4])}`
}

const displayTag = (i: number) => props.tags[i]!.name
const displayTagEmoji = (i: number) => props.tags[i]!.emoji

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

  &__open_locations {
    display: flex;
    flex-direction: column;
    gap: 16px;

    @media (min-width: 600px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
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

  &__events {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__event {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 32px 24px;
    border-radius: 8px;
    border: solid 1px charter.$primary200;
    background: charter.$neutrals100;

    h3 {
      @include text-styles.heading3;

      @media (max-width: 700px) {
        @include text-styles.heading4;
      }
    }

    &__time {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 8px;
    }

    &__tags {
      display: flex;
      flex-direction: row;
      list-style: none;
      margin-left: 0 !important;
      gap: 8px;
      border-top: solid 1px charter.$primary200;
      padding-top: 24px;

      li {
        display: flex;
        align-items: center;
        border-radius: 3px;
        border: solid 1px charter.$primary200;
        background: charter.$primary100;
        gap: 4px;
        padding: 10px;

        @include text-styles.display2SemiBold;
        line-height: 10px;

        &.host {
          margin-left: auto;
          background: 0;
          border: 0;
          @include text-styles.display2Regular;
          font-style: italic;
          line-height: 10px;
        }
      }
    }
  }
}
</style>
