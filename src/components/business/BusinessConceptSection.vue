<template>
  <section id="concepto" class="bg-dark relative overflow-hidden" aria-label="Concepto Noche Millennial">
    <div class="section-wrap">
      <div ref="contentRef" class="concept-grid">
        <div class="concept-copy">
          <div class="section-eyebrow"><span class="label">01 — El concepto</span></div>
          <h2 class="section-title">Una noche para<br><span class="text-lime">cantar en coro.</span></h2>
          <p class="concept-lead">
            De Shakira a Zoé, de Sin Bandera a Moderatto: una selección de canciones que todavía funcionan cuando se tocan en vivo.
          </p>
          <p class="concept-body">
            Un show directo, reconocible y adaptable al lugar donde quieras hacerlo.
          </p>

          <div class="concept-stats">
            <div><strong>6</strong><span>Músicos en escena</span></div>
            <div><strong>25+</strong><span>Canciones</span></div>
            <div><strong>2</strong><span>Estilos principales</span></div>
          </div>

          <div class="concept-tags">
            <span v-for="artist in artists" :key="artist">{{ artist }}</span>
          </div>
        </div>

        <div class="concept-flyer">
          <div class="concept-flyer__frame">
            <img src="@/images/noche-millennial.jpeg" alt="Flyer de Noche Millennial">
          </div>
          <div class="concept-flyer__caption">
            <span>Repertorio en vivo</span>
            <strong>Canciones para cantar</strong>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from '@/composables/useGsap'

const artists = ['Sin Bandera', 'Shakira', 'Moderatto', 'La 5ta Estación', 'Camila', 'Y mucho más']
const contentRef = ref(null)

onMounted(() => {
  const children = contentRef.value?.children || []
  gsap.fromTo(children,
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, stagger: 0.16, ease: 'power3.out', scrollTrigger: { trigger: contentRef.value, start: 'top 82%' } },
  )
})
</script>

<style scoped>
.concept-grid {
  display: grid;
  gap: clamp(2.5rem, 7vw, 5rem);
  align-items: center;
}

.concept-lead {
  max-width: 42rem;
  margin-top: 2rem;
  color: var(--color-text);
  font-size: var(--text-lg);
  font-weight: 500;
  line-height: 1.5;
}

.concept-body {
  max-width: 42rem;
  margin-top: 1rem;
  color: var(--color-text-muted);
  font-size: var(--text-base);
  line-height: 1.6;
}

.concept-stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  margin-top: 2.25rem;
}

.concept-stats div {
  padding: 1rem;
  border: 1px solid var(--color-border);
  background: var(--color-surface2);
}

.concept-stats strong {
  display: block;
  color: var(--color-lime);
  font-family: var(--font-family-display);
  font-size: clamp(2rem, 5vw, 3.25rem);
  font-weight: 400;
  line-height: 1;
}

.concept-stats span,
.concept-flyer__caption span,
.concept-flyer__caption strong {
  color: var(--color-text-dim);
  font-family: var(--font-family-heading);
  font-size: 0.62rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.concept-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.concept-tags span {
  padding: 0.5rem 0.65rem;
  border: 1px solid rgba(179, 255, 0, 0.2);
  color: var(--color-text-muted);
  font-family: var(--font-family-heading);
  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.concept-flyer { position: relative; }

.concept-flyer__frame {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(179, 255, 0, 0.24);
  box-shadow: 0 2rem 5rem rgba(0, 0, 0, 0.55);
}

.concept-flyer__frame::before {
  position: absolute;
  inset: 0;
  z-index: 1;
  border: 0.75rem solid rgba(5, 5, 5, 0.18);
  content: '';
  pointer-events: none;
}

.concept-flyer img { width: 100%; }

.concept-flyer__caption {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-top: 0;
  background: var(--color-surface2);
}

.concept-flyer__caption strong { color: var(--color-lime); }

@media (min-width: 900px) {
  .concept-grid { grid-template-columns: minmax(0, 1.15fr) minmax(20rem, 0.7fr); }
}

@media (max-width: 520px) {
  .concept-stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.4rem;
  }

  .concept-stats div {
    min-width: 0;
    padding: 0.75rem 0.6rem;
  }

  .concept-stats strong {
    font-size: clamp(1.8rem, 9vw, 2.4rem);
  }

  .concept-stats span {
    display: block;
    margin-top: 0.3rem;
    font-size: 0.52rem;
    letter-spacing: 0.08em;
    line-height: 1.2;
  }
}
</style>
