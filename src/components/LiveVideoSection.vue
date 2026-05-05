<template>
  <section id="live" class="bg-black relative overflow-hidden" aria-label="Amargo en vivo">
    <!-- Background accents -->
    <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-lime/5 blur-[120px] rounded-full pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-600/5 blur-[100px] rounded-full pointer-events-none"></div>

    <div class="section-wrap">
      <div class="section-eyebrow" ref="eyebrowRef">
        <span class="label">03 — Experiencia en vivo</span>
      </div>
      
      <h2 class="section-title mb-12" ref="titleRef">Energía que se siente.</h2>

      <div class="relative group" ref="videoRef">
        <!-- Video Container with 16:9 Aspect Ratio -->
        <div class="relative w-full aspect-video rounded-2xl overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] border border-white/5 bg-zinc-900">
          <iframe 
            class="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/Nvw6R9i7dpk?si=A8fcQdWPdgsQdh21&rel=0&showinfo=0" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
          </iframe>
        </div>

        <!-- Decorative elements -->
        <div class="absolute -top-6 -right-6 w-24 h-24 border-t-2 border-r-2 border-lime/30 rounded-tr-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
        <div class="absolute -bottom-6 -left-6 w-24 h-24 border-b-2 border-l-2 border-lime/30 rounded-bl-3xl pointer-events-none group-hover:scale-110 transition-transform duration-500"></div>
      </div>

      <div class="mt-12 flex flex-col md:flex-row justify-between items-start gap-8" ref="footerRef">
        <div class="max-w-xl">
          <p class="text-text-muted leading-relaxed" style="font-size: var(--text-base);">
            No son solo covers, es una conexión directa con la audiencia a través de los himnos que definieron una generación. <br><span class="text-text font-medium">Revive la nostalgia con el sonido más potente de la escena.</span>
          </p>
        </div>
        <div class="flex gap-6">
          <div class="flex flex-col items-center">
            <span class="text-lime font-display text-4xl leading-none">30+</span>
            <span class="text-[0.65rem] uppercase tracking-[0.2em] text-text-dim mt-1">Temas</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from '@/composables/useGsap'

const eyebrowRef = ref(null)
const titleRef = ref(null)
const videoRef = ref(null)
const footerRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: videoRef.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  })

  gsap.set([eyebrowRef.value, titleRef.value, videoRef.value, footerRef.value], { opacity: 0 })

  tl.fromTo(eyebrowRef.value, { y: 30 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
    .fromTo(titleRef.value, { y: 30 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .fromTo(videoRef.value, { y: 40 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.4')
    .fromTo(footerRef.value, { y: 30 }, { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
})
</script>
