<template>
  <section id="social-proof" class="bg-surface relative overflow-hidden" aria-label="Opiniones y reseñas">
    <div class="section-wrap">
      <div ref="headerRef" class="mb-[clamp(2rem,5vw,3rem)] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div class="section-eyebrow"><span class="label">06 — Lo que dicen</span></div>
          <h2 class="section-title">La gente<br>habla.</h2>
        </div>
        
        <!-- Pagination dots -->
        <div class="flex gap-2 pb-2">
          <button v-for="(_, i) in reviews" :key="i"
                  @click="scrollToItem(i)"
                  class="w-8 h-1 transition-all duration-500 rounded-full"
                  :class="currentIndex === i ? 'bg-lime w-12' : 'bg-white/10 hover:bg-white/30'"
                  :aria-label="'Ver reseña ' + (i + 1)"></button>
        </div>
      </div>

      <div class="relative group/carousel">
        <div ref="carouselRef" 
             class="flex gap-6 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth pb-8"
             @scroll="onCarouselScroll"
             @touchstart="pauseAutoLoop"
             @touchend="resumeAutoLoop"
             @mousedown="pauseAutoLoop"
             @mouseup="resumeAutoLoop">
             
          <div v-for="(r, i) in reviews" :key="i"
               class="proof-card shrink-0 w-[85vw] md:w-[calc(50%-0.75rem)] lg:w-[calc(50%-1rem)] snap-start relative rounded-sm flex flex-col gap-4 group"
               @mouseenter="onCardEnter($event)"
               @mouseleave="onCardLeave($event)">

            <!-- Animated gradient border -->
            <div class="absolute inset-0 rounded-sm bg-gradient-to-br from-lime/30 via-transparent to-lime/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" aria-hidden="true"></div>

            <!-- Card inner -->
            <div class="relative bg-surface2 border border-border rounded-sm flex flex-col gap-4 h-full group-hover:border-transparent transition-colors duration-300"
                 style="padding: 2rem;">

              <div class="flex gap-1">
                <span v-for="s in 5" :key="s" class="star-icon text-lime text-[0.9rem] inline-block">★</span>
              </div>

              <p class="text-[0.95rem] md:text-[1rem] text-text-muted leading-relaxed flex-1 italic">"{{ r.text }}"</p>

              <div class="border-t border-border pt-4 mt-2">
                <div class="font-heading text-[0.9rem] font-bold tracking-[0.1em] uppercase text-text">{{ r.name }}</div>
                <div class="text-[0.7rem] tracking-wider text-text-dim uppercase">{{ r.role }}</div>
              </div>

              <div class="absolute top-4 right-5 text-lime/10 font-display text-[3.5rem] leading-none pointer-events-none select-none group-hover:text-lime/20 transition-colors duration-500" aria-hidden="true">"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from '@/composables/useGsap'

const reviews = [
  { text: 'Cada Diciembre procuramos hacer algo diferente en Paki eco mercado, algo que sea único y dé a los visitantes y clientes de paki un ambiente diferente, gracias a Amargo music, por apoyarnos en lograr ese reto, la temática musical que nos compartieron en diciembre fue algo original, combino con las actividades navideñas que realizamos y por supuesto los clientes y expositores se fueron con un gran sabor de boca por el repertorio que nos brindaron. Es más!, estamos considerandolos para el 10° Aniversario de Paki 😊 Excelente banda para los eventos!!', name: 'Paki Ecomercado', role: '' },
  { text: 'Contratamos a Amargo para la fiesta de mi esposo, no esperábamos que pusieran a mis invitados a bailar y cantar. La energía y el ambiente que manejan es lo mejor, sin duda los recomiendo!', name: 'Marcela Torres', role: 'Cumpleaños en Jardín' },
  { text: 'Muy recomendada la banda Amargo, el repertorio que manejan hizo que nuestra fiesta se sintiera única. A pesar de haber sido algo íntimo supieron leer el momento y nos dieron todo lo que esperábamos.', name: 'Carlos & Elena', role: 'Aniversario de Bodas' },
  { text: 'Contraté a Amargo para la inauguración de mi cafetería. Llegaron a tiempo, se instalaron sin problema y desde el primer momento hubo ambiente. El show estuvo muy bien y los clientes lo notaron. Los tendré en cuenta para mis siguientes eventos.', name: 'Sofía Mendoza', role: 'Inauguración de Cafetería' },
  { text: 'La fiesta fue un éxito con Amargo. Las canciones 100/10, todos bailamos y cantamos, la chica tiene una voz increíble! Se volvieron de mis bandas favoritas, todo muy fluido y buena vibra.', name: 'Mauricio Gómez', role: 'Cena de Negocios' }
]

const headerRef = ref(null)
const carouselRef = ref(null)
const currentIndex = ref(0)
const isUserInteracting = ref(false)
let autoLoopTimer = null

function onCardEnter(e) {
  gsap.to(e.currentTarget.querySelector('.bg-surface2'), { y: -8, duration: 0.4, ease: 'power2.out' })
  const stars = e.currentTarget.querySelectorAll('.star-icon')
  gsap.fromTo(stars, { scale: 0.5 }, { scale: 1, duration: 0.3, stagger: 0.05, ease: 'back.out(2)' })
}

function onCardLeave(e) {
  gsap.to(e.currentTarget.querySelector('.bg-surface2'), { y: 0, duration: 0.4, ease: 'power2.out' })
}

function onCarouselScroll() {
  if (!carouselRef.value) return
  const container = carouselRef.value
  const itemWidth = container.querySelector('.proof-card').offsetWidth + 24 // card + gap
  currentIndex.value = Math.round(container.scrollLeft / itemWidth)
}

function scrollToItem(index) {
  if (!carouselRef.value) return
  const container = carouselRef.value
  const itemWidth = container.querySelector('.proof-card').offsetWidth + 24
  container.scrollTo({ left: index * itemWidth, behavior: 'smooth' })
}

function startAutoLoop() {
  if (autoLoopTimer) clearInterval(autoLoopTimer)
  autoLoopTimer = setInterval(() => {
    if (!isUserInteracting.value && carouselRef.value) {
      const nextIndex = (currentIndex.value + 1) % reviews.length
      scrollToItem(nextIndex)
    }
  }, 4000)
}

function pauseAutoLoop() {
  isUserInteracting.value = true
}

function resumeAutoLoop() {
  isUserInteracting.value = false
}

onMounted(() => {
  gsap.fromTo(headerRef.value,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: headerRef.value, start: 'top 85%' } }
  )

  const cards = carouselRef.value.querySelectorAll('.proof-card')
  gsap.fromTo(cards,
    { x: 50, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: carouselRef.value, start: 'top 85%' } }
  )
  
  startAutoLoop()
})

onUnmounted(() => {
  if (autoLoopTimer) clearInterval(autoLoopTimer)
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.proof-card {
  perspective: 1000px;
}
</style>
