<template>
  <div class="accordion-tab">
    <h3>{{ headline }}</h3>
    <div class="accordion-tab__content" :class="{ visible }"><slot /></div>
  </div>
</template>

<script setup lang="ts">
import {inject, type Ref, computed} from "vue";

const props = defineProps<{ value: string, headline: string }>()
const active = inject<Ref<string>>('active')

const visible = computed(() => !!active && props.value === active.value)
</script>

<style lang="scss">
  .accordion-tab {

    &__content {
      opacity: 0;

      &.visible {
        opacity: 1;
      }
    }
  }
</style>