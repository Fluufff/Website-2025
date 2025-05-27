<template>
  <div class="picture-switcher" :class="{ switchable }" ref="parent"><slot /></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{ current: number }>()
const switchable = ref(false)
const parent = ref<HTMLElement | null>(null)

let elements: Element[] = []

onMounted(() => {
  switchable.value = true
  if (!parent.value) return

  elements = Array.from(parent.value.getElementsByTagName('picture'))

  showPicture(props.current)
})

function showPicture(index: number) {
  const newElement = elements[index]
  if (!newElement) return

  elements.forEach((e) => e.classList.remove('active'))
  newElement.classList.add('active')
}

watch(() => props.current, showPicture)
</script>

<style lang="scss">
.picture-switcher {
  position: relative;

  picture {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    visibility: hidden;

    transition: visibility .7s ease-out, opacity .7s ease-out;

    &.active {
      opacity: 1;
      visibility: visible;
    }
  }
}
</style>
