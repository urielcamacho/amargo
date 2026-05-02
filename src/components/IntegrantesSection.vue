<template>
  <section id="integrantes" class="bg-dark overflow-hidden" aria-label="Integrantes de la banda">
    <div class="section-wrap">
      <div ref="headerRef" class="mb-[clamp(2.5rem,6vw,4rem)] text-center sm:text-left">
        <div class="section-eyebrow justify-center sm:justify-start"><span class="label">04 — La Banda</span></div>
        <h2 class="section-title">6 músicos.<br>1 show.</h2>
      </div>

      <!-- Desktop Grid (3x2) -->
      <div ref="gridRef" class="hidden md:grid grid-cols-3 gap-12" role="list">
        <div v-for="(m, i) in members" :key="i"
             class="member-cell flex flex-col items-center text-center group"
             role="listitem">
          
          <div class="relative w-full aspect-[4/5] mb-6 overflow-hidden rounded-sm border border-white/10 group-hover:border-lime transition-colors duration-500 shadow-2xl">
            <img :src="m.photo" :alt="m.role" class="member-img w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          <div class="instrument-icon w-10 h-10 flex items-center justify-center text-lime group-hover:scale-110 transition-transform duration-300">
            <div v-if="m.icon.startsWith('<svg')" v-html="m.icon" class="w-full h-full"></div>
            <img v-else :src="m.icon" :alt="m.role" class="w-full h-full object-contain icon-lime" />
          </div>
          <h3 class="font-heading font-bold uppercase tracking-[0.2em] text-text mt-3" style="font-size: var(--text-base);">{{ m.role }}</h3>
        </div>
      </div>

      <!-- Mobile Carousel (Native Swipe with Snap) -->
      <div class="md:hidden relative w-screen left-1/2 -translate-x-1/2 overflow-hidden px-5">
        <div ref="carouselRef" 
             class="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar scroll-smooth" 
             @scroll="onCarouselScroll"
             @touchstart="pauseAutoLoop"
             @touchend="resumeAutoLoop"
             @mousedown="pauseAutoLoop"
             @mouseup="resumeAutoLoop">
          <div v-for="(m, i) in members" :key="i"
               class="carousel-item shrink-0 w-[75vw] flex flex-col items-center snap-center">
            
            <div class="relative w-full aspect-[4/5] mb-5 overflow-hidden rounded-sm border border-white/10 shadow-2xl">
              <img :src="m.photo" :alt="m.role" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            </div>

            <div class="instrument-icon w-12 h-12 flex items-center justify-center text-lime">
              <div v-if="m.icon.startsWith('<svg')" v-html="m.icon" class="w-full h-full"></div>
              <img v-else :src="m.icon" :alt="m.role" class="w-full h-full object-contain icon-lime" />
            </div>
            <h3 class="font-heading font-bold uppercase tracking-[0.2em] text-text mt-3" style="font-size: var(--text-sm);">{{ m.role }}</h3>
          </div>
        </div>
        
        <!-- Progress bar for carousel -->
        <div class="mt-8 mx-auto w-32 h-[1px] bg-white/10 relative">
          <div ref="progressRef" class="absolute top-0 left-0 h-full bg-lime w-1/3"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from '@/composables/useGsap'

// Import member photos
import photoSteff from '@/images/steff.jpg'
import photoFedro from '@/images/fedro.jpg'
import photoAmaro from '@/images/amaro.jpg'
import photoPablo from '@/images/pablo.jpg'
import photoUriel from '@/images/uriel.jpg'
import photoLino from '@/images/lino.jpg'

// Instrument Assets
import iconDrum from '@/images/drum.png'
import iconGuitar from '@/images/electric-guitar.png'
import iconKeys from '@/images/keyboard.png'
import iconMic from '@/images/microphone.png'

// Instrument Definitions
const icons = {
  voice: iconMic,
  guitar: iconGuitar,
  bass: iconGuitar,
  drums: iconDrum,
  keys: iconKeys
}

const members = [
  { photo: photoSteff, icon: icons.voice, role: 'Voz' },
  { photo: photoFedro, icon: icons.guitar, role: 'Guitarra' },
  { photo: photoAmaro, icon: icons.voice, role: 'Voz' },
  { photo: photoPablo, icon: icons.drums, role: 'Batería' },
  { photo: photoUriel, icon: icons.bass, role: 'Bajo' },
  { photo: photoLino, icon: icons.keys, role: 'Teclado' },
]

const headerRef = ref(null)
const gridRef = ref(null)
const carouselRef = ref(null)
const progressRef = ref(null)
const isUserInteracting = ref(false)
let autoLoopTimer = null
let currentIndex = 0

onMounted(() => {
  // Desktop animations
  gsap.fromTo(headerRef.value,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: headerRef.value, start: 'top 85%' } }
  )

  if (window.innerWidth >= 768) {
    const cells = gridRef.value.querySelectorAll('.member-cell')
    gsap.fromTo(cells,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: 'power4.out', scrollTrigger: { trigger: gridRef.value, start: 'top 80%' } }
    )

    const images = gridRef.value.querySelectorAll('.member-img')
    gsap.fromTo(images,
      { scale: 1.15, y: -10 },
      { scale: 1, y: 10, ease: 'none', scrollTrigger: { trigger: gridRef.value, start: 'top bottom', end: 'bottom top', scrub: true } }
    )
  } else {
    // Mobile Carousel Entry Animation
    const items = carouselRef.value.children
    gsap.fromTo(items,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: carouselRef.value, start: 'top 85%' } }
    )
    
    // Initial state for items (first one active)
    updateActiveItem(0)
    startAutoLoop()
  }
})

onUnmounted(() => {
  if (autoLoopTimer) clearInterval(autoLoopTimer)
})

function startAutoLoop() {
  if (autoLoopTimer) clearInterval(autoLoopTimer)
  autoLoopTimer = setInterval(() => {
    if (!isUserInteracting.value && carouselRef.value) {
      const nextIndex = (currentIndex + 1) % members.length
      scrollToItem(nextIndex)
    }
  }, 3500)
}

function pauseAutoLoop() {
  isUserInteracting.value = true
  if (autoLoopTimer) clearInterval(autoLoopTimer)
}

function resumeAutoLoop() {
  isUserInteracting.value = false
  startAutoLoop()
}

function scrollToItem(index) {
  if (!carouselRef.value) return
  const itemWidth = carouselRef.value.children[0].offsetWidth + 16
  carouselRef.value.scrollTo({
    left: index * itemWidth,
    behavior: 'smooth'
  })
}

function onCarouselScroll() {
  if (!carouselRef.value) return
  const container = carouselRef.value
  const items = container.children
  const scrollLeft = container.scrollLeft
  const scrollWidth = container.scrollWidth - container.clientWidth
  const progress = scrollLeft / scrollWidth
  
  // Update progress bar
  gsap.to(progressRef.value, { width: `${progress * 100}%`, duration: 0.1 })
  
  // Update active item focus
  const itemWidth = items[0].offsetWidth + 16 // item + gap
  const index = Math.round(scrollLeft / itemWidth)
  if (index !== currentIndex) {
    currentIndex = index
    updateActiveItem(index)
  }
}

function updateActiveItem(index) {
  const items = Array.from(carouselRef.value.children)
  items.forEach((item, i) => {
    gsap.to(item, { 
      scale: i === index ? 1 : 0.9, 
      opacity: i === index ? 1 : 0.5, 
      duration: 0.4,
      overwrite: 'auto'
    })
  })
}
</script>

<style scoped>
.member-cell {
  will-change: transform, opacity;
}
.carousel-item {
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.icon-lime {
  /* Filter removed to show original icon colors */
}
</style>
