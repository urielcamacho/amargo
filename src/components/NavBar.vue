<template>
  <nav
    id="nav"
    ref="navRef"
    role="navigation"
    aria-label="Navegación principal"
    class="fixed top-0 left-0 right-0 z-[800] flex items-center justify-between h-24 transition-all duration-400"
    :class="{ 'bg-black/95 shadow-[0_1px_0_var(--color-border)] backdrop-blur-xl h-20': scrolled }"
    :style="{ padding: '0 clamp(1.25rem, 6vw, 5rem)' }"
  >
    <!-- Logo -->
    <a href="#hero" class="z-[810] shrink-0 relative group flex items-center h-full py-4">
      <img src="@/images/logo-amargo-removebg-preview.png" alt="AMARGO Logo" 
           class="h-[clamp(4rem,10vw,5rem)] w-auto object-contain brightness-110 drop-shadow-[0_0_20px_rgba(163,255,0,0.25)] transition-all"
           :class="{ 'h-[clamp(3.5rem,8vw,4.2rem)]': scrolled }" />
    </a>

    <ul class="hidden md:flex list-none gap-10 items-center">
      <li v-for="link in navLinks" :key="link.href">
        <a
          :href="link.href"
          class="nav-link font-heading font-bold tracking-[0.22em] uppercase text-text-muted hover:text-lime transition-colors relative"
          style="font-size: var(--text-sm);"
        >
          {{ link.text }}
          <span class="absolute bottom-[-3px] left-0 w-0 h-[1px] bg-lime transition-all duration-300 group-hover:w-full"></span>
        </a>
      </li>
    </ul>

    <a
      href="#cta"
      class="hidden md:block btn-lime !py-3 !px-7 !font-bold"
      style="font-size: var(--text-sm);"
    >Contáctanos</a>

    <button
      ref="hamRef"
      class="md:hidden w-11 h-11 flex flex-col justify-center gap-[5px] p-1.5 z-[810]"
      aria-label="Abrir menú"
      :aria-expanded="menuOpen"
      @click="toggleMenu"
    >
      <span class="block h-0.5 bg-text transition-transform duration-350 origin-center"
            :class="{ 'translate-y-[7px] rotate-45': menuOpen }"></span>
      <span class="block h-0.5 bg-text transition-all duration-250"
            :class="{ 'opacity-0 scale-x-0': menuOpen }"></span>
      <span class="block h-0.5 bg-text transition-transform duration-350 origin-center"
            :class="{ '-translate-y-[7px] -rotate-45': menuOpen }"></span>
    </button>

    <!-- Scroll progress bar -->
    <div class="absolute bottom-0 left-0 h-[2px] bg-lime transition-none z-[820]"
         :style="{ width: progressWidth }" aria-hidden="true"></div>
  </nav>

  <!-- Mobile Menu -->
  <div
    class="fixed inset-0 bg-black z-[799] flex flex-col justify-center transition-opacity duration-350"
    :class="menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    :style="{ padding: 'clamp(1.25rem, 6vw, 5rem)' }"
    role="dialog"
    aria-label="Menú"
  >
    <ul class="list-none">
      <li v-for="(link, i) in navLinks" :key="link.href" class="border-b border-border overflow-hidden">
        <a
          :href="link.href"
          class="block font-display text-[clamp(2.5rem,10vw,4rem)] tracking-[0.02em] py-2.5 text-text hover:text-lime hover:pl-1.5 transition-all"
          :style="{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }"
          @click="closeMenu"
        >{{ link.text }}</a>
      </li>
    </ul>
    <a href="#cta" class="mt-8 inline-block self-start btn-lime !px-8 !py-4 text-[0.8rem] !font-bold" @click="closeMenu">
      Contáctanos →
    </a>
    <span class="mt-5 font-heading text-xs tracking-[0.2em] text-text-dim uppercase">@amargo_music</span>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navLinks = [
  { href: '#about', text: 'Banda' },
  { href: '#propuesta', text: 'Propuesta' },
  { href: '#setlist', text: 'Set List' },
  { href: '#integrantes', text: 'Integrantes' },
  { href: '#cta', text: 'Contacto' },
]

const navRef = ref(null)
const hamRef = ref(null)
const scrolled = ref(false)
const menuOpen = ref(false)
const progressWidth = ref('0%')

function onScroll() {
  scrolled.value = window.scrollY > 10

  // Update progress bar
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0
  progressWidth.value = `${Math.min(progress, 100)}%`
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
  document.body.style.overflow = menuOpen.value ? 'hidden' : ''
}

function closeMenu() {
  menuOpen.value = false
  document.body.style.overflow = ''
}

function onKey(e) {
  if (e.key === 'Escape') closeMenu()
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  document.addEventListener('keydown', onKey)
  onScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  document.removeEventListener('keydown', onKey)
})
</script>

<style scoped>
.nav-link:hover span {
  width: 100%;
}
</style>
