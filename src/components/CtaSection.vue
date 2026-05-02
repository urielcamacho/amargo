<template>
  <section id="cta" class="bg-black relative overflow-hidden text-center min-h-[70vh] flex items-center justify-center" aria-label="Contáctanos">
    <!-- Background Image with intense blur and darkness -->
    <div class="absolute inset-0 z-0 opacity-40">
      <img src="@/images/Amargo227.jpg" alt="" class="w-full h-full object-cover blur-md scale-110" aria-hidden="true" />
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>
    </div>

    <!-- Texture Overlay -->
    <div class="absolute inset-0 z-1 opacity-[0.03] pointer-events-none" style="background-image: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');"></div>

    <!-- Animated radial glow -->
    <div ref="glowRef" class="absolute rounded-full pointer-events-none left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-1"
         style="width: 80vmax; height: 80vmax; background: radial-gradient(circle, rgba(163,255,0,0.12) 0%, transparent 70%);"
         aria-hidden="true"></div>

    <!-- Decorative elements -->
    <div class="absolute inset-0 z-1 pointer-events-none overflow-hidden" aria-hidden="true">
      <div v-for="n in 3" :key="n" 
           class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-lime/10 rounded-full"
           :style="{ width: `${n * 30}vmax`, height: `${n * 30}vmax`, opacity: 0.15 / n }"></div>
    </div>

    <div class="section-wrap relative z-10">
      <div ref="labelRef" class="section-eyebrow justify-center mb-6"><span class="label">Contrataciones 2026</span></div>

      <div ref="titleRef" class="mt-3 mb-8">
        <div class="inline-block border border-lime/30 px-3 py-1 rounded-full mb-6 backdrop-blur-sm">
          <span class="label !text-[10px] !mb-0 flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-lime animate-pulse"></span>
            Agenda 2026 Abierta
          </span>
        </div>
        <h2 class="font-display leading-[0.85] tracking-tighter" style="font-size: clamp(3.5rem, 15vw, 10rem);">
          <span v-for="(word, i) in titleWords" :key="i" class="cta-word inline-block mr-[0.2em] last:mr-0">{{ word }}</span>
        </h2>
      </div>

      <div class="max-w-2xl mx-auto mb-12">
        <p ref="subRef" class="text-text-muted leading-relaxed" style="font-size: var(--text-lg);">
          No es música de fondo — <span class="text-text font-bold">es un show completo de nostalgia.</span><br>
          Cotiza tu evento y vive la experiencia AMARGO.
        </p>
      </div>

      <div ref="btnsRef" class="flex flex-col sm:flex-row gap-5 items-center justify-center">
        <a href="https://instagram.com/amargo_music" target="_blank" rel="noopener noreferrer"
           class="btn-lime min-w-[260px] text-center !py-5 !font-bold uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(163,255,0,0.3)] hover:shadow-[0_25px_50_50px_-12px_rgba(163,255,0,0.5)] transition-all"
           style="font-size: var(--text-base);">
          DM en Instagram →
        </a>
        <a href="mailto:aamargomusic@gmail.com" 
           class="btn-ghost min-w-[260px] text-center !py-5 !font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all"
           style="font-size: var(--text-base);">
          Enviar Correo →
        </a>
      </div>

      <div ref="metaRef" class="mt-16 flex justify-center items-center gap-10 flex-wrap">
        <div v-for="(item, i) in metaItems" :key="i" class="cta-meta-item flex flex-col items-center gap-2">
          <span class="w-8 h-px bg-lime/40"></span>
          <span class="font-heading font-bold tracking-[0.3em] uppercase text-text-dim"
                style="font-size: var(--text-xs);">{{ item }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from '@/composables/useGsap'

const titleWords = ['Listos', 'para', 'el', 'show.']
const metaItems = ['Rider técnico incluido', 'Respuesta en 24 hrs', 'Set adaptable al evento']

const glowRef = ref(null)
const labelRef = ref(null)
const titleRef = ref(null)
const subRef = ref(null)
const btnsRef = ref(null)
const metaRef = ref(null)

onMounted(() => {
  // Glow pulse (kept separate since it repeats infinitely)
  if (glowRef.value) {
    gsap.to(glowRef.value, {
      scale: 1.15, opacity: 0.7,
      duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1,
    })
  }

  // Master timeline for sequential entry
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: labelRef.value,
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  })

  // Set initial states
  const words = titleRef.value.querySelectorAll('.cta-word')
  const btnElements = btnsRef.value.querySelectorAll('a')
  const metas = metaRef.value.querySelectorAll('.cta-meta-item')

  gsap.set(labelRef.value, { y: 30, opacity: 0 })
  gsap.set(words, { y: 80, opacity: 0, rotateX: -50, scale: 0.9 })
  gsap.set(subRef.value, { y: 30, opacity: 0 })
  gsap.set(btnElements, { y: 20, opacity: 0, scale: 0.9 })
  gsap.set(metas, { y: 15, opacity: 0 })

  // Build timeline
  tl.to(labelRef.value, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
    .to(words, { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out' }, '-=0.4')
    .to(subRef.value, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.6')
    .to(btnElements, { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.5)' }, '-=0.4')
    .to(metas, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }, '-=0.5')
})
</script>
