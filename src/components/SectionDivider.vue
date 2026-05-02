<template>
  <div class="relative h-24 overflow-hidden -my-12 z-10 pointer-events-none" aria-hidden="true">
    <!-- Animated gradient line -->
    <div ref="lineRef" class="absolute left-0 right-0 top-1/2 h-px">
      <div class="h-full bg-gradient-to-r from-transparent via-lime/40 to-transparent w-0 mx-auto"></div>
    </div>
    <!-- Center dot pulse -->
    <div ref="dotRef" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-lime rounded-full opacity-0"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from '@/composables/useGsap'

const lineRef = ref(null)
const dotRef = ref(null)

onMounted(() => {
  const inner = lineRef.value?.querySelector('div')
  if (inner) {
    gsap.to(inner, {
      width: '60%',
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: lineRef.value,
        start: 'top 90%',
      },
    })
  }

  gsap.to(dotRef.value, {
    opacity: 1,
    scale: 1.5,
    duration: 0.6,
    delay: 0.4,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: dotRef.value,
      start: 'top 90%',
    },
  })

  // Dot pulse loop
  gsap.to(dotRef.value, {
    scale: 2,
    opacity: 0.3,
    duration: 2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1,
    delay: 1.5,
  })
})
</script>
