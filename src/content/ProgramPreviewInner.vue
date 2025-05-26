<script setup lang="ts">
import Accordion from '../components/Accordion.vue'
import PictureSwitcher from '../components/PictureSwitcher.vue'
import { ref } from 'vue'

const currentImage = ref(0)
</script>

<template>
  <div class="program_preview">
    <Accordion alwaysOpen @change="i => currentImage = i">
      <slot name="accordion" />
    </Accordion>
    <PictureSwitcher :current="currentImage">
      <slot name="pictures" />
    </PictureSwitcher>
  </div>
</template>

<style scoped lang="scss"></style>
