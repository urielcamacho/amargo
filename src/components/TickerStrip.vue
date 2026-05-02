<template>
  <div class="overflow-hidden border-y border-border bg-surface py-3 relative" aria-hidden="true">
    <!-- Speed-aware GSAP-driven ticker -->
    <div ref="trackRef" class="flex w-max">
      <template v-for="n in 3" :key="n">
        <span v-for="(item, idx) in items" :key="n + '-' + idx"
              class="ticker-item"
              :class="{ 'text-lime': item.hi }">
          {{ item.text }} <span class="ticker-diamond">◆</span>
        </span>
      </template>
    </div>

    <!-- Fade edges -->
    <div class="absolute top-0 left-0 bottom-0 w-16 bg-gradient-to-r from-surface to-transparent z-[2]"></div>
    <div class="absolute top-0 right-0 bottom-0 w-16 bg-gradient-to-l from-surface to-transparent z-[2]"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from '@/composables/useGsap'

const items = [
  { text: 'AMARGO', hi: true },
  { text: 'NOCHE MILLENNIAL', hi: false },
  { text: 'POP / ROCK', hi: true },
  { text: '100% NOSTALGIA', hi: false },
  { text: 'EN VIVO', hi: true },
  { text: 'SHOW COMPLETO', hi: false },
  { text: '2026', hi: true },
  { text: 'COVERS 2000S', hi: false },
]

const trackRef = ref(null)
let tickerTween = null

onMounted(() => {
  const track = trackRef.value
  if (!track) return

  const totalWidth = track.scrollWidth / 3

  gsap.set(track, { x: 0 })
  tickerTween = gsap.to(track, {
    x: -totalWidth,
    duration: 25,
    ease: 'none',
    repeat: -1,
    modifiers: {
      x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
    },
  })

  // Speed up on scroll
  const onScroll = () => {
    gsap.to(tickerTween, { timeScale: 2.5, duration: 0.3 })
    clearTimeout(window._tickerTimeout)
    window._tickerTimeout = setTimeout(() => {
      gsap.to(tickerTween, { timeScale: 1, duration: 1 })
    }, 300)
  }
  window.addEventListener('scroll', onScroll, { passive: true })
})

onUnmounted(() => {
  tickerTween?.kill()
})
</script>

<style scoped>
.ticker-item {
  font-family: var(--font-family-heading);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--color-text-dim);
  padding: 0 2rem;
  flex-shrink: 0;
  white-space: nowrap;
}

.ticker-diamond {
  color: var(--color-lime);
  font-size: 0.5em;
  vertical-align: middle;
  margin-left: 0.4rem;
}
</style>
