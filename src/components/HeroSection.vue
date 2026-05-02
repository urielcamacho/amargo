<template>
  <section id="hero" ref="heroRef" aria-label="AMARGO — Presentación"
    class="relative min-h-screen flex flex-col justify-end overflow-hidden"
    :style="{ padding: 'var(--nav-h, 64px) clamp(1.25rem,6vw,5rem) clamp(1.5rem,4vw,5rem)' }"
    @mousemove="onMouseMove">

    <!-- Background effects -->
    <div ref="glowRef" class="absolute inset-0 pointer-events-none" aria-hidden="true"
      style="background: radial-gradient(ellipse 55% 45% at 75% 35%, rgba(179,255,0,0.07) 0%, transparent 65%),
             radial-gradient(ellipse 40% 55% at 15% 75%, rgba(255,31,31,0.05) 0%, transparent 55%);">
    </div>
    <div class="absolute inset-0 pointer-events-none" aria-hidden="true"
      style="background-image: linear-gradient(rgba(179,255,0,0.035) 1px, transparent 1px),
             linear-gradient(90deg, rgba(179,255,0,0.035) 1px, transparent 1px);
             background-size: clamp(40px,8vw,70px) clamp(40px,8vw,70px);
             mask-image: radial-gradient(ellipse 85% 75% at 50% 50%, black 20%, transparent 80%);">
    </div>

    <!-- Band Image Background Layer -->
    <div ref="imageContainerRef" class="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-0">
      <!-- Blurred Background (Mobile Only) -->
      <img src="@/images/Amargo220.jpg" alt="" 
           class="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 md:hidden" />
      
      <!-- Main Responsive Image -->
      <picture class="w-full h-full">
        <source srcset="@/images/Amargo227.jpg" media="(min-width: 768px)">
        <img src="@/images/Amargo220.jpg" alt="Banda Amargo" 
             class="relative w-full h-full object-cover object-bottom md:object-top scale-105 md:scale-110 transition-transform duration-700" />
      </picture>
      
      <!-- Gradient overlays -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent md:hidden"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-transparent hidden md:block"></div>
    </div>

    <!-- Floating particles -->
    <canvas ref="particlesRef" class="absolute inset-0 pointer-events-none z-[1]" aria-hidden="true"></canvas>

    <!-- Cursor glow (desktop only) -->
    <div ref="cursorGlowRef" class="hidden md:block absolute w-[300px] h-[300px] rounded-full pointer-events-none z-[1] opacity-0"
         style="background: radial-gradient(circle, rgba(179,255,0,0.08) 0%, transparent 70%); transform: translate(-50%, -50%);"
         aria-hidden="true"></div>

    <!-- Scanline overlay -->
    <div class="absolute inset-0 pointer-events-none z-[2] opacity-[0.03]" aria-hidden="true"
         style="background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.05) 2px, rgba(255,255,255,0.05) 4px);"></div>

    <!-- Content -->
    <div class="relative z-10 max-w-[1400px] mb-4 md:mb-0">
      <p ref="eyebrowRef" class="font-heading text-white/50 leading-[1.2] tracking-[0.25em] mb-4 md:mb-6 opacity-0 max-w-[800px] uppercase"
         style="font-size: var(--text-base); font-weight: 300;">
        Cuando todos buscan lo dulce yo prefiero lo
      </p>

      <div ref="titleWrapRef" class="relative opacity-0">
        <h1 class="hero-title font-display text-lime leading-[0.8] tracking-tighter relative inline-block mb-6"
            style="font-size: var(--text-huge);"
            aria-label="AMARGO">
          <span v-for="(char, i) in titleChars" :key="i" class="hero-char inline-block">{{ char }}</span>
        </h1>
      </div>

      <div ref="descriptorRef" class="relative mt-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 opacity-0">
        <div ref="heroLineRef" class="hidden sm:block w-0 h-px bg-lime shrink-0" aria-hidden="true"></div>
        <p class="font-heading uppercase tracking-[0.4em] text-muted font-bold"
           style="font-size: var(--text-base);">
          Presskit 2026
        </p>
      </div>

      <div ref="ctaRowRef" class="relative mt-[clamp(2.5rem,6vw,3.5rem)] flex flex-wrap gap-5 opacity-0">
        <a href="#cta" class="btn-lime !text-[clamp(0.85rem,2vw,1.1rem)] !py-5 !px-10 !font-bold">Contáctanos</a>
        <a href="#propuesta" class="btn-ghost !text-[clamp(0.85rem,2vw,1.1rem)] !py-5 !px-10">Ver Propuesta</a>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div ref="scrollIndRef" class="absolute z-10 flex flex-col items-center gap-1.5 opacity-0"
         style="bottom: clamp(1.5rem,4vw,2.5rem); right: clamp(1.25rem,6vw,5rem);" aria-hidden="true">
      <div class="w-px h-12 bg-gradient-to-b from-lime to-transparent" style="animation: scrollPulse 2.2s ease-in-out infinite;"></div>
      <span class="font-heading text-[0.55rem] tracking-[0.3em] uppercase text-text-dim" style="writing-mode: vertical-rl;">Scroll</span>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { gsap, ScrollTrigger } from '@/composables/useGsap'

const heroRef = ref(null)
const glowRef = ref(null)
const eyebrowRef = ref(null)
const titleWrapRef = ref(null)
const descriptorRef = ref(null)
const heroLineRef = ref(null)
const ctaRowRef = ref(null)
const scrollIndRef = ref(null)
const particlesRef = ref(null)
const cursorGlowRef = ref(null)
const imageContainerRef = ref(null)

const titleChars = computed(() => 'AMARGO'.split(''))

let animFrameId = null

// Cursor-following glow
function onMouseMove(e) {
  if (!cursorGlowRef.value) return
  const rect = heroRef.value.getBoundingClientRect()
  gsap.to(cursorGlowRef.value, {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    opacity: 1,
    duration: 0.6,
    ease: 'power2.out',
  })
}

// Particle system
function initParticles() {
  const canvas = particlesRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const particles = []
  const count = 35

  function resize() {
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
  }
  resize()
  window.addEventListener('resize', resize)

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.2 - 0.1,
      opacity: Math.random() * 0.4 + 0.1,
    })
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (const p of particles) {
      p.x += p.dx
      p.y += p.dy
      if (p.x < 0) p.x = canvas.width
      if (p.x > canvas.width) p.x = 0
      if (p.y < 0) p.y = canvas.height
      if (p.y > canvas.height) p.y = 0

      ctx.beginPath()
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(179, 255, 0, ${p.opacity})`
      ctx.fill()
    }
    animFrameId = requestAnimationFrame(draw)
  }
  draw()
}

onMounted(() => {
  initParticles()

  const tl = gsap.timeline({ delay: 0.3 })

  // Band image reveal
  tl.to(imageContainerRef.value, {
    opacity: 0.7,
    duration: 2,
    ease: 'power2.inOut',
  }, 0)

  // Eyebrow
  gsap.set(eyebrowRef.value, { y: 30 })
  tl.to(eyebrowRef.value, {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
  }, 0)

  // Title wrap
  tl.to(titleWrapRef.value, { opacity: 1, duration: 0.1 }, 0.2)

  // Title chars stagger with 3D rotation
  const chars = titleWrapRef.value.querySelectorAll('.hero-char')
  gsap.set(chars, { opacity: 0, y: 80, rotateX: -90, scale: 0.8 })
  tl.to(chars, {
    opacity: 1, y: 0, rotateX: 0, scale: 1,
    duration: 1, stagger: 0.08,
    ease: 'power4.out',
  }, 0.3)

  // Descriptor
  gsap.set(descriptorRef.value, { y: 30 })
  tl.to(descriptorRef.value, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
  }, 0.8)

  // Hero line expands
  if (heroLineRef.value) {
    tl.to(heroLineRef.value, { width: 50, duration: 0.6, ease: 'power2.out' }, 0.9)
  }

  // CTA row with buttons staggered
  gsap.set(ctaRowRef.value, { y: 20 })
  tl.to(ctaRowRef.value, {
    opacity: 1, y: 0, duration: 0.7, ease: 'power3.out',
  }, 1.0)

  // Scroll indicator
  gsap.set(scrollIndRef.value, { y: 15 })
  tl.to(scrollIndRef.value, {
    opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
  }, 1.3)

  // Enhanced glitch with color channel split
  const titleEl = titleWrapRef.value?.querySelector('.hero-title')
  if (titleEl) {
    const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 5 })
    glitchTl
      .to(titleEl, { x: -4, skewX: 3, filter: 'hue-rotate(90deg)', duration: 0.06, ease: 'steps(1)' })
      .to(titleEl, { x: 5, skewX: -4, filter: 'hue-rotate(-90deg)', duration: 0.06, ease: 'steps(1)' })
      .to(titleEl, { x: -2, skewX: 1, filter: 'hue-rotate(45deg)', duration: 0.04, ease: 'steps(1)' })
      .to(titleEl, { x: 0, skewX: 0, filter: 'none', duration: 0.04, ease: 'steps(1)' })
      .to(titleEl, { x: 3, skewX: -2, filter: 'hue-rotate(-60deg)', duration: 0.05, ease: 'steps(1)' }, '+=0.08')
      .to(titleEl, { x: 0, skewX: 0, filter: 'none', duration: 0.04, ease: 'steps(1)' })
  }

  // Parallax on glow
  gsap.to(glowRef.value, {
    y: 120,
    ease: 'none',
    scrollTrigger: {
      trigger: heroRef.value,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  })

  // Parallax on band image
  if (imageContainerRef.value) {
    const images = imageContainerRef.value.querySelectorAll('img')
    gsap.to(images, {
      y: 100,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }


  // Hero content fades out on scroll - using fromTo and immediateRender: false to avoid capturing 0 opacity states
  gsap.fromTo([eyebrowRef.value, titleWrapRef.value, descriptorRef.value, ctaRowRef.value], 
    { opacity: 1, y: 0 },
    {
      opacity: 0,
      y: -40,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.value,
        start: '60% top',
        end: 'bottom top',
        scrub: true,
        immediateRender: false,
      },
    }
  )
})

onUnmounted(() => {
  if (animFrameId) cancelAnimationFrame(animFrameId)
})
</script>

<style scoped>
.hero-title {
  perspective: 600px;
}
</style>
