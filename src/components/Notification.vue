<template>
  <div v-if="visible" class="notification" :class="{ collapsible }">
    <slot />
    <div v-if="collapsible" @click="close" class="notification__close_icon"><slot name="close" /></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

const collapsible = ref(false)
const visible = ref(false)

onMounted(() => {
  const stored = localStorage.getItem('notification__rooms_closed_2025__closed')
  visible.value = stored !== 'true'
  collapsible.value = true
})

function close() {
  visible.value = false
  localStorage.setItem('notification__rooms_closed_2025__closed', 'true')
}
</script>

<style lang="scss">
@use '../styles/text-styles';
@use '../styles/charter';

.notification {
  position: relative;
  padding: 24px 64px;
  @include text-styles.paragraphMediumRegular;
  background-color: charter.$primary600;
  color: charter.$neutrals100;

  a {
    color: charter.$neutrals100;
    text-decoration: underline;
  }

  .notification__close_icon {
    position: absolute;
    right: 32px;
    font-size: 32px;
    top: 50%;
    margin-top: -16px;
    cursor: pointer;
  }
}
</style>
