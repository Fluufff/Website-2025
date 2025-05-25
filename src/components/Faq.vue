<template>
  <div class="content darker faq">
    <h2>Frequently asked questions</h2>
    <p>
      Whether this is your first time in the forest or you’ve walked this path before, a few questions always arise.
      Here’s what you might be wondering before you step beneath the branches...
    </p>
    <div class="faq_questions" :class="{ collapsible }" ref="parent">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const collapsible = ref(false)
const parent = ref<HTMLElement | null>(null)

let qaElements: [Element, Element][] = []

onMounted(() => {
  collapsible.value = true
  if (!parent.value) return

  const questions: Element[] = []
  const answers: Element[] = []

  parent.value.querySelectorAll('.faq-item__question').forEach((e) => questions.push(e))
  parent.value.querySelectorAll('.faq-item__answer').forEach((e) => answers.push(e))

  qaElements = questions.map((q, i) => [q, answers[i]!])
  qaElements.forEach(([q, a]) => {
    q.addEventListener('click', () => clicked(q, a))
  })
})

function clicked(q: Element, a: Element) {
  const isActive = q.classList.contains('active')

  qaElements.forEach(([q, a]) => {
    q.classList.remove('active')
    a.classList.remove('active')
  })

  if (!isActive) {
    q.classList.add('active')
    a.classList.add('active')
  }
}
</script>

<style lang="scss">
.faq_questions {
  margin-top: 32px;
}
</style>
