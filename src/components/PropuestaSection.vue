<template>
  <section id="propuesta" class="bg-black relative overflow-hidden" aria-label="Noche Millennial — Propuesta">
    <div class="section-wrap">
      <div ref="headerRef" class="mb-[clamp(2.5rem,6vw,4rem)]">
        <div class="section-eyebrow"><span class="label">02 — Propuesta Estelar</span></div>
        <h2 class="section-title">Noche<br><span class="text-lime">Millennial.</span></h2>
      </div>

      <div class="grid gap-[clamp(1.5rem,4vw,2.5rem)] lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <!-- Feature card -->
        <div ref="featureRef" class="bg-surface border border-border rounded-sm relative overflow-hidden h-full flex flex-col justify-center"
             :style="{ padding: 'clamp(1.5rem,5vw,2.8rem)' }">
          <div class="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-lime to-transparent"></div>
          
          <span class="inline-block self-start font-heading text-[0.65rem] font-bold tracking-[0.25em] uppercase bg-lime text-black px-3 py-1 rounded-sm mb-5">Concierto Pop / Rock</span>
          <h3 class="font-heading font-black italic uppercase leading-[0.95] mb-5" style="font-size: clamp(2.8rem, 9vw, 5rem);">
            Revive<br><em class="not-italic text-lime block">tu época</em>
          </h3>
          <p class="text-text-muted leading-relaxed" style="font-size: var(--text-base);">
            Un concierto preparado para traer de vuelta cada etapa de la vida de un chavorruco actual. Lleno de nostalgia, diversión y sorpresas que a más de uno le recordará su primer amor, la fiesta de preparatoria y la increíble vida de los 2000s.
          </p>
          <div class="mt-8 pt-6 border-t border-border">
            <span class="label block mb-3.5">Tributos incluidos</span>
            <div class="flex flex-wrap gap-2">
              <span v-for="artist in artists" :key="artist"
                    class="font-heading font-semibold tracking-[0.12em] uppercase text-text-muted border border-lime/20 px-3 py-1 rounded-sm
                           hover:text-black hover:bg-lime hover:border-lime transition-all cursor-default"
                    style="font-size: var(--text-xs);">
                {{ artist }}
              </span>
            </div>
          </div>
        </div>

        <!-- Flyer side -->
        <div ref="sideRef" class="relative group">
          <div class="flyer-container relative overflow-hidden rounded-sm border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:border-lime/30 transition-colors duration-500">
            <img ref="imgRef" :src="flyerImg" alt="Noche Millennial Flyer" class="w-full h-auto object-cover transition-transform duration-1000 ease-out" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from '@/composables/useGsap'

// Import flyer image
import flyerImg from '@/images/noche-millennial.jpeg'

const artists = ['Sin Bandera', 'Shakira', 'Moderatto', 'La 5ta Estación', 'Camila', 'Y mucho más...']

const headerRef = ref(null)
const featureRef = ref(null)
const sideRef = ref(null)
const imgRef = ref(null)

onMounted(() => {
  // Header reveal
  gsap.fromTo(headerRef.value, 
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: headerRef.value, start: 'top 85%' } }
  )

  // Feature card slide in
  gsap.fromTo(featureRef.value,
    { x: -40, opacity: 0 },
    { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: featureRef.value, start: 'top 85%' } }
  )

  // Side flyer reveal
  gsap.fromTo(sideRef.value,
    { x: 40, opacity: 0 },
    { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: sideRef.value, start: 'top 85%' } }
  )

  // Subtle Parallax on Image
  gsap.fromTo(imgRef.value,
    { scale: 1.15, y: -20 },
    { scale: 1, y: 20, ease: 'none', scrollTrigger: { trigger: sideRef.value, start: 'top bottom', end: 'bottom top', scrub: true } }
  )
})
</script>

<style scoped>
.flyer-container {
  will-change: transform;
}
</style>
