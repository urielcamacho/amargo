<template>
  <footer class="bg-surface border-t border-border" role="contentinfo">
    <div class="max-w-[1240px] mx-auto" style="padding: clamp(2.5rem,6vw,4rem) clamp(1.25rem,6vw,5rem) clamp(1.5rem,4vw,2.5rem);">
      <!-- Top -->
      <div class="grid gap-10 sm:grid-cols-[1.5fr_1fr_1fr] pb-[clamp(2rem,5vw,3rem)] border-b border-border">
        <div>
          <a :href="homeUrl" class="inline-block">
            <img src="@/images/logo-amargo-removebg-preview.png" alt="AMARGO Logo" class="h-20 w-auto object-contain mb-6 brightness-110" />
          </a>
          <p class="text-[0.85rem] text-text-muted leading-relaxed max-w-[260px]">
            {{ description }}
          </p>
        </div>
        <div>
          <div class="font-heading text-[0.65rem] font-bold tracking-[0.3em] uppercase text-text-dim mb-4">Navegación</div>
          <ul class="list-none flex flex-col gap-2.5">
            <li v-for="link in navLinks" :key="link.href">
              <a :href="link.href" class="text-[0.88rem] text-text-muted hover:text-lime transition-colors">{{ link.text }}</a>
            </li>
          </ul>
        </div>
        <div>
          <div class="font-heading text-[0.65rem] font-bold tracking-[0.3em] uppercase text-text-dim mb-4">Contacto</div>
          <ul class="list-none flex flex-col gap-2.5">
            <li><a href="https://instagram.com/amargo_music" target="_blank" rel="noopener" class="text-[0.88rem] text-text-muted hover:text-lime transition-colors">@amargo_music</a></li>
            <li><a href="mailto:aamargomusic@gmail.com" class="text-[0.88rem] text-text-muted hover:text-lime transition-colors">aamargomusic@gmail.com</a></li>
            <li><a :href="contactHref" class="text-[0.88rem] text-text-muted hover:text-lime transition-colors">Contáctanos →</a></li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 pt-6">
        <span class="font-heading text-[0.72rem] tracking-[0.1em] uppercase text-text-dim">© 2026 AMARGO — Todos los derechos reservados</span>
        <a href="https://instagram.com/amargo_music" target="_blank" rel="noopener noreferrer"
           class="font-heading text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-text-dim flex items-center gap-1.5 hover:text-lime transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          @amargo_music
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  page: {
    type: String,
    default: 'home',
    validator: (value) => ['home', 'business'].includes(value),
  },
})

const baseUrl = import.meta.env.BASE_URL
const homeUrl = `${baseUrl}#hero`
const contactHref = '#cta'
const description = computed(() => props.page === 'business'
  ? 'Pop y rock en español de los 2000, tocado en vivo por AMARGO.'
  : 'Música en vivo de alta calidad y profesionalismo para hacer de cada evento una noche inolvidable.')
const navLinks = computed(() => props.page === 'business'
  ? [
      { href: `${baseUrl}#propuesta`, text: 'Propuesta para eventos' },
      { href: '#concepto', text: 'Noche Millennial' },
      { href: '#live', text: 'En vivo' },
      { href: '#setlist', text: 'Set List' },
      { href: '#social-proof', text: 'Testimonios' },
    ]
  : [
      { href: '#about', text: 'Acerca de' },
      { href: '#propuesta', text: 'Propuesta' },
      { href: '#integrantes', text: 'Integrantes' },
    ])
</script>
