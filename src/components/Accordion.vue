<template>
  <div class="accordion">
    <div class="accordion__panels">
      <slot />
    </div>
    <div class="accordion__aside">
      <img :src="images[active]" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'

const props = defineProps<{ images: Record<string, string>; default: string }>()

const active = ref(props.default)
provide('active', active)
</script>

<style lang="scss">
.accordion {
  display: flex;
  flex-direction: row;
  margin-top: 60px;

  &__panels {
    width: 50%;
    box-sizing: border-box;
    padding-right: 92px;
  }

  &__aside {
    > img {
      height: 100%;
      width: 100%;
      object-fit: cover;
      object-position: center;
      border-radius: 8px;
    }
    pointer-events: none;
    position: relative;
    width: 50%;
  }
}
</style>
