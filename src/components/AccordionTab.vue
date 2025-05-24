<template>
  <div class="accordion-tab" :class="{ visible }">
    <h3>{{ headline }}</h3>
    <div class="accordion-tab__content" :class="{ visible }"><slot /></div>
    <div class="accordion-tab__actions"><slot name="actions" /></div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ value: string; headline: string; visible?: boolean }>()
</script>

<style lang="scss">
@use '../styles/charter';
@use '../styles/text-styles';

.accordion-tab {
  &.visible {
    .accordion-tab__content {
      padding-top: 24px;
      display: block;
    }
    .accordion-tab__actions {
      display: block;
    }
  }

  & + & {
    border-top: solid 1px charter.$neutrals400;
    margin-top: 32px;
    padding-top: 32px;
  }

  > h3 {
    color: charter.$neutrals700;
    font-family: var(--font-gatsby), sans-serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 40px; /* 125% */
  }

  &__content {
    display: none;
    color: charter.$neutrals600;

    font-family: var(--font-inter);
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 22px; /* 137.5% */
  }

  &__actions {
    margin-top: 32px;
    display: none;
  }
}
</style>
