<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from '@/composables/useGsap'

const popTracks = [
  { name: 'Así es la vida', artist: 'Elefante' },
  { name: 'El problema', artist: 'Ricardo Arjona' },
  { name: 'Duele el amor', artist: 'Aleks Syntek y Ana Torroja' },
  { name: 'La playa', artist: 'La Oreja de Van Gogh' },
  { name: 'El sol no regresa', artist: 'La 5ta Estación' },
  { name: 'Kilómetros', artist: 'Sin Bandera' },
  { name: 'Entra en mi vida', artist: 'Sin Bandera' },
  { name: 'Sirena', artist: 'Sin Bandera' },
  { name: 'Cara luna', artist: 'Bacilos' },
  { name: 'Ciega sordomuda', artist: 'Shakira' },
  { name: 'Te aviso te anuncio', artist: 'Shakira' },
  { name: 'La tortura', artist: 'Shakira y Alejandro Sanz' },
]

const rockTracks = [
  { name: 'Todo cambió', artist: 'Camila' },
  { name: 'Aléjate de mí', artist: 'Camila' },
  { name: 'Volverte a amar', artist: 'Alejandra Guzmán' },
  { name: 'La camisa negra', artist: 'Juanes' },
  { name: 'Volverte a ver', artist: 'Juanes' },
  { name: 'Fotografía', artist: 'Juanes con Nelly Furtado' },
  { name: 'Vía láctea', artist: 'Zoé' },
  { name: 'Bailando solo', artist: 'Los Bunkers' },
  { name: 'A donde van los muertos', artist: 'Kinky' },
  { name: 'Noreste Caliente', artist: 'Jonaz' },
  { name: 'Mentiras', artist: 'Los Amigos Invisibles' },
  { name: 'Sálvame', artist: 'Moderatto (RBD)' },
  { name: 'Ya lo veía venir', artist: 'Moderatto' },
  { name: 'Muriendo lento', artist: 'Moderatto' },
  { name: 'Y mucho más...', artist: 'Público' },
]

const headerRef = ref(null)
const popListRef = ref(null)
const rockListRef = ref(null)
const progressBarRef = ref(null)
const activeTab = ref('pop') // 'pop' or 'rock'

function onTrackEnter(e) {
  gsap.to(e.currentTarget, { x: 4, duration: 0.3, ease: 'power2.out' })
}

function onTrackLeave(e) {
  gsap.to(e.currentTarget, { x: 0, duration: 0.3, ease: 'power2.out' })
}

onMounted(() => {
  gsap.fromTo(headerRef.value,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: headerRef.value, start: 'top 85%' } }
  )

  const animateList = (listEl) => {
    if (!listEl) return
    const rows = listEl.querySelectorAll('.track-row')
    gsap.fromTo(rows,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out', scrollTrigger: { trigger: listEl, start: 'top 85%' } }
    )
  }

  if (popListRef.value) animateList(popListRef.value)
  if (rockListRef.value) animateList(rockListRef.value)

  // Animate progress bar
  if (progressBarRef.value) {
    gsap.to(progressBarRef.value, {
      width: '100%',
      duration: 2,
      ease: 'power2.inOut',
      scrollTrigger: { trigger: progressBarRef.value, start: 'top 95%', toggleActions: 'play none none none' },
    })
  }
})
</script>

<template>
  <section id="setlist" class="bg-black" aria-label="Set list de canciones">
    <div class="section-wrap">
      <div ref="headerRef" class="mb-[clamp(2rem,5vw,3rem)] flex flex-row items-end justify-between gap-4">
        <div>
          <div class="section-eyebrow"><span class="label">04 — Repertorio</span></div>
          <h2 class="section-title mb-0">Set List.</h2>
        </div>
        
        <div class="nostalgia-sticker bg-red font-heading font-black italic uppercase leading-tight px-3 py-1.5 border-[2px] border-white shadow-[3px_3px_0_var(--color-lime)] rotate-3 transition-transform duration-500 hover:-rotate-3 hover:scale-110 cursor-default flex-shrink-0 mb-1"
             style="font-size: 0.9rem;" aria-hidden="true">
          100% Nostalgia
        </div>
      </div>

      <!-- Tab Switcher (Mobile Only) -->
      <div class="flex lg:hidden mb-10 p-1 bg-[#151515] rounded-sm border border-white/10 shadow-2xl">
        <button 
          @click="activeTab = 'pop'"
          class="flex-1 py-3.5 font-heading font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-sm"
          :class="activeTab === 'pop' ? 'active-tab' : 'text-white/60 hover:text-white'">
          <span style="font-size: 0.85rem;">Pop</span>
        </button>
        <button 
          @click="activeTab = 'rock'"
          class="flex-1 py-3.5 font-heading font-bold uppercase tracking-[0.15em] transition-all duration-300 rounded-sm"
          :class="activeTab === 'rock' ? 'active-tab' : 'text-white/60 hover:text-white'">
          <span style="font-size: 0.85rem;">Pop Rock</span>
        </button>
      </div>

      <div class="grid lg:grid-cols-2 gap-x-16 gap-y-12">
        <!-- Pop Column -->
        <div :class="{ 'block': activeTab === 'pop', 'hidden lg:block': activeTab !== 'pop' }">
          <div class="hidden lg:inline-block font-heading text-xl font-bold tracking-[0.15em] uppercase text-lime mb-6 pb-2 border-b border-lime/30">Pop</div>
          <div ref="popListRef" role="list" class="flex flex-col">
            <div v-for="(t, i) in popTracks" :key="i"
                 class="track-row grid items-center gap-4 py-3 border-b border-border transition-all duration-300 hover:bg-lime-faint group relative overflow-hidden cursor-default"
                 style="grid-template-columns: 24px 1fr;"
                 role="listitem"
                 @mouseenter="onTrackEnter"
                 @mouseleave="onTrackLeave">
              <span class="font-heading text-[0.65rem] font-semibold text-text-dim group-hover:text-lime">{{ String(i + 1).padStart(2, '0') }}</span>
              <div>
                <div class="font-heading font-bold tracking-[0.04em] uppercase text-[0.95rem] group-hover:translate-x-1 transition-transform duration-300">{{ t.name }}</div>
                <div class="text-[0.75rem] text-text-dim">{{ t.artist }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pop Rock Column -->
        <div :class="{ 'block': activeTab === 'rock', 'hidden lg:block': activeTab !== 'rock' }">
          <div class="hidden lg:inline-block font-heading text-xl font-bold tracking-[0.15em] uppercase text-lime mb-6 pb-2 border-b border-lime/30">Pop Rock</div>
          <div ref="rockListRef" role="list" class="flex flex-col">
            <div v-for="(t, i) in rockTracks" :key="i"
                 class="track-row grid items-center gap-4 py-3 border-b border-border transition-all duration-300 hover:bg-lime-faint group relative overflow-hidden cursor-default"
                 style="grid-template-columns: 24px 1fr;"
                 role="listitem"
                 @mouseenter="onTrackEnter"
                 @mouseleave="onTrackLeave">
              <span class="font-heading text-[0.65rem] font-semibold text-text-dim group-hover:text-lime">{{ String(i + 1).padStart(2, '0') }}</span>
              <div>
                <div class="font-heading font-bold tracking-[0.04em] uppercase text-[0.95rem] group-hover:translate-x-1 transition-transform duration-300">{{ t.name }}</div>
                <div class="text-[0.75rem] text-text-dim">{{ t.artist }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Track count bar -->
      <div ref="progressRef" class="mt-16 flex items-center gap-4">
        <div class="h-px flex-1 bg-border relative overflow-hidden">
          <div ref="progressBarRef" class="absolute left-0 top-0 h-full bg-lime w-0"></div>
        </div>
        <span class="font-heading text-[0.65rem] tracking-[0.2em] uppercase text-text-dim whitespace-nowrap">+25 canciones</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.active-tab {
  background-color: var(--color-lime) !important;
  color: var(--color-black) !important;
  box-shadow: 0 4px 25px rgba(179, 255, 0, 0.4);
}

@keyframes eqBounce {
  0%, 100% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
}
.eq-bar {
  animation: eqBounce 0.6s ease-in-out infinite alternate;
}
</style>
