<template>
  <slot />
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'

const props = defineProps<{ images: Record<string, string>, default: string }>()

const active = ref(props.default)
provide('active', active)
</script>

<style lang="scss">

</style>