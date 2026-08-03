<template>
  <section id="about" class="bg-dark" aria-label="Sobre AMARGO">
    <div class="section-wrap">
      <div ref="gridRef" class="about-layout grid gap-[clamp(3rem,6vw,5rem)] lg:items-center">
        <!-- Copy -->
        <div class="about-copy">
          <div class="mb-[clamp(2.5rem,6vw,4rem)]">
            <div class="section-eyebrow"><span class="label">01 — Acerca de</span></div>
            <h2 class="section-title about-title">Lo mejor<br><span>para tu evento.</span></h2>
          </div>
          <p class="about-description" style="font-size: var(--text-lg);">
            Una experiencia increíble con músicos de calidad y la nostalgia irresistible de tus épocas favoritas.
          </p>
          <div class="mt-8">
            <a href="https://instagram.com/amargo_music" target="_blank" rel="noopener noreferrer" class="btn-ghost">@amargo_music →</a>
          </div>
        </div>

        <!-- Experience cards -->
        <div class="stats-grid" aria-label="Lo que define el show de AMARGO">
          <article v-for="(stat, i) in stats" :key="stat.kicker" class="stat-card">
            <div class="stat-card-top">
              <span class="stat-index">0{{ i + 1 }}</span>
              <span class="stat-kicker">{{ stat.kicker }}</span>
            </div>
            <div class="stat-value" :class="{ 'stat-value--genres': stat.genres, 'stat-value--stars': stat.stars }" v-html="stat.val"></div>
            <p class="stat-label">{{ stat.label }}</p>
            <span class="stat-pulse" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useStagger } from '@/composables/useGsap'

const stats = [
  { kicker: 'Sonido', val: '★★★★★', label: 'Calidad de audio', stars: true },
  { kicker: 'En escena', val: '6', label: 'Músicos en vivo' },
  { kicker: 'Repertorio', val: 'Rock <b>·</b> Pop <b>·</b> Soul <b>·</b> Funk', label: 'Los géneros que dominamos', genres: true },
]

const gridRef = ref(null)

useStagger(gridRef, '.about-copy, .stat-card', {
  y: 50, stagger: 0.12, duration: 0.9,
})
</script>

<style scoped>
.about-layout {
  grid-template-columns: minmax(0, 1fr);
}

.about-title {
  font-size: clamp(3.8rem, 7.2vw, 6.8rem);
}

.about-title span {
  white-space: nowrap;
}

.about-description {
  max-width: 42rem;
  color: var(--color-text-muted);
  line-height: 1.55;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.stat-card {
  position: relative;
  min-height: 13.75rem;
  padding: 1.25rem;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background:
    linear-gradient(135deg, rgba(179, 255, 0, 0.08), transparent 48%),
    var(--color-surface2);
  transition: border-color 220ms ease, transform 220ms ease, background 220ms ease;
}

.stat-card::after {
  position: absolute;
  right: -1.6rem;
  bottom: -3.25rem;
  width: 7rem;
  height: 7rem;
  border: 1px solid rgba(179, 255, 0, 0.15);
  border-radius: 999px;
  content: '';
}

.stat-card:hover {
  z-index: 1;
  border-color: var(--color-border-h);
  background:
    linear-gradient(135deg, rgba(179, 255, 0, 0.16), transparent 60%),
    var(--color-surface2);
  transform: translateY(-0.35rem);
}

/* The final card spans the row when the collection contains three stats. */
.stat-card:last-child:nth-child(odd) {
  min-height: 11.25rem;
  grid-column: 1 / -1;
}

.stat-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.stat-index,
.stat-kicker,
.stat-label {
  font-family: var(--font-family-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.19em;
  text-transform: uppercase;
}

.stat-index { color: var(--color-lime); }
.stat-kicker,
.stat-label { color: var(--color-text-dim); }

.stat-value {
  position: relative;
  z-index: 1;
  margin: 1.65rem 0 0.65rem;
  color: var(--color-lime);
  font-family: var(--font-family-display);
  font-size: clamp(2.45rem, 4.1vw, 4.15rem);
  line-height: 0.88;
}

.stat-value--genres,
.stat-value--stars {
  max-width: 11rem;
  font-family: var(--font-family-heading);
  font-size: clamp(1.35rem, 2vw, 1.9rem);
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 0.95;
}

.stat-value--genres :deep(b) {
  color: rgba(179, 255, 0, 0.45);
  font-weight: 400;
}

.stat-pulse {
  position: absolute;
  right: 1.25rem;
  bottom: 1.25rem;
  display: flex;
  align-items: end;
  gap: 0.2rem;
  height: 1rem;
}

.stat-pulse i {
  width: 2px;
  background: var(--color-lime);
  opacity: 0.8;
}

.stat-pulse i:nth-child(1) { height: 35%; }
.stat-pulse i:nth-child(2) { height: 90%; }
.stat-pulse i:nth-child(3) { height: 55%; }
.stat-pulse i:nth-child(4) { height: 75%; }

@media (min-width: 1024px) {
  .about-layout {
    grid-template-columns: minmax(0, 1.23fr) minmax(25rem, 0.77fr);
  }

  .stats-grid { gap: 1rem; }
  .stat-card { padding: 1.5rem; }
}

@media (max-width: 420px) {
  .stats-grid { grid-template-columns: 1fr; }
  .stat-card { min-height: 11rem; }
  .stat-card:last-child:nth-child(odd) { grid-column: auto; }
  .about-title { font-size: clamp(2.6rem, 13.2vw, 3.4rem); }
}
</style>
