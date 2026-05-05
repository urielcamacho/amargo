<template>
  <section id="about" class="bg-dark" aria-label="Sobre AMARGO">
    <div class="section-wrap">
      <div ref="gridRef" class="grid gap-[clamp(2.5rem,6vw,5rem)] lg:grid-cols-2 lg:items-center">
        <!-- Copy -->
        <div class="about-copy">
          <div class="mb-[clamp(2.5rem,6vw,4rem)]">
            <div class="section-eyebrow"><span class="label">01 — Acerca de</span></div>
            <h2 class="section-title">Más que<br>covers.</h2>
          </div>
          <p class="text-text-muted leading-relaxed max-w-[550px]" style="font-size: var(--text-base);">
            Amargo es una propuesta de <strong class="text-text font-medium">música en vivo</strong> diseñada para ofrecer una experiencia por encima del estándar, con
            músicos de calidad y profesionalismo en cada presentación. Amargo lo tiene todo para asegurar una noche exitosa y llena de ambiente.
          </p>
          <p class="text-text-muted leading-relaxed max-w-[550px]" style="font-size: var(--text-base);">
            Cada show es un espectáculo cuidadosamente producido: voces en armonía, instrumentación en vivo y presencia escénica real. <strong class="text-text font-medium">Combinamos una energía vibrante con la nostalgia irresistible de los 2000s, la era que definió una generación.</strong>
          </p>
          <div class="mt-8">
            <a href="https://instagram.com/amargo_music" target="_blank" rel="noopener noreferrer" class="btn-ghost">@amargo_music →</a>
          </div>
        </div>

        <!-- Stats card -->
        <div class="bg-surface2 border border-border rounded-sm overflow-hidden">
          <div v-for="(stat, i) in stats" :key="i"
               class="stat-row flex items-center justify-between px-7 py-5 border-b border-border last:border-b-0 transition-colors hover:bg-lime-faint">
            <span class="font-display text-lime leading-none" style="font-size: clamp(1.8rem, 5vw, 2.8rem);">{{ stat.val }}</span>
            <span class="font-heading text-[0.65rem] font-semibold tracking-[0.2em] uppercase text-text-dim text-right" v-html="stat.label"></span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStagger } from '@/composables/useGsap'

const stats = [
  { val: '2000s', label: 'Era que<br>dominamos' },
  { val: '100%', label: 'En vivo.<br>Sin playback.' },
  { val: '★★★★★', label: 'Puesta en<br>escena' },
]

const gridRef = ref(null)

useStagger(gridRef, '.about-copy, .stat-row', {
  y: 50, stagger: 0.12, duration: 0.9,
})
</script>
