<template>
  <section class="business-hero" aria-label="Noche Millennial para negocios">
    <div class="business-hero__image" aria-hidden="true">
      <img src="@/images/Amargo227.jpg" alt="">
    </div>
    <div class="business-hero__overlay" aria-hidden="true"></div>
    <div class="business-hero__grid" aria-hidden="true"></div>

    <div ref="contentRef" class="business-hero__content">
      <div class="section-eyebrow"><span class="label">Una producción AMARGO</span></div>
      <p class="business-hero__overline">Canciones que siguen sonando</p>
      <h1>Noche<br><span>Millennial.</span></h1>
      <p class="business-hero__intro">
        Una selección de canciones en vivo para una noche distinta.
      </p>

      <div class="business-hero__actions">
        <a href="#setlist" class="btn-lime">Ver repertorio</a>
        <a :href="eventsUrl" class="btn-ghost">Ver propuesta para eventos</a>
      </div>

      <div class="business-hero__facts" aria-label="Características del show">
        <span>Pop y rock en español</span>
        <span>Formato en vivo</span>
        <span>Para tu próxima fecha</span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from '@/composables/useGsap'

const contentRef = ref(null)
const eventsUrl = `${import.meta.env.BASE_URL}#propuesta`

onMounted(() => {
  const elements = contentRef.value?.children || []
  gsap.fromTo(elements,
    { y: 40, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, delay: 0.25, ease: 'power3.out' },
  )
})
</script>

<style scoped>
.business-hero {
  position: relative;
  display: flex;
  min-height: 100svh;
  align-items: flex-end;
  overflow: hidden;
  padding: 8rem clamp(1.25rem, 6vw, 5rem) clamp(3rem, 7vw, 5.5rem);
  background: var(--color-black);
}

.business-hero__image,
.business-hero__overlay,
.business-hero__grid {
  position: absolute;
  inset: 0;
}

.business-hero__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 30%;
  filter: grayscale(0.2);
}

.business-hero__overlay {
  background:
    linear-gradient(90deg, rgba(5, 5, 5, 0.98) 0%, rgba(5, 5, 5, 0.8) 48%, rgba(5, 5, 5, 0.35) 100%),
    linear-gradient(0deg, var(--color-black) 0%, transparent 55%);
}

.business-hero__grid {
  opacity: 0.35;
  background-image:
    linear-gradient(rgba(179, 255, 0, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(179, 255, 0, 0.07) 1px, transparent 1px);
  background-size: 5rem 5rem;
  mask-image: linear-gradient(90deg, black, transparent 72%);
}

.business-hero__content {
  position: relative;
  z-index: 2;
  width: min(100%, 76rem);
  margin: 0 auto;
}

.business-hero__overline {
  margin: 1rem 0 0.6rem;
  color: var(--color-text-muted);
  font-family: var(--font-family-heading);
  font-size: var(--text-base);
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
}

.business-hero h1 {
  color: var(--color-text);
  font-family: var(--font-family-display);
  font-size: clamp(5rem, 15vw, 12rem);
  letter-spacing: -0.035em;
  line-height: 0.78;
}

.business-hero h1 span { color: var(--color-lime); }

.business-hero__intro {
  max-width: 42rem;
  margin-top: 2rem;
  color: var(--color-text-muted);
  font-size: var(--text-lg);
  line-height: 1.55;
}

.business-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 2.25rem;
}

.business-hero__actions a {
  padding: 1.25rem 2.5rem;
  font-size: clamp(0.85rem, 2vw, 1.1rem);
  font-weight: 700;
}

.business-hero__facts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1.5rem;
  margin-top: 2.5rem;
  color: rgba(240, 240, 238, 0.45);
  font-family: var(--font-family-heading);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.business-hero__facts span::before {
  margin-right: 0.65rem;
  color: var(--color-lime);
  content: '◆';
}

@media (max-width: 640px) {
  .business-hero__overlay {
    background: linear-gradient(0deg, rgba(5, 5, 5, 1) 0%, rgba(5, 5, 5, 0.76) 70%, rgba(5, 5, 5, 0.55) 100%);
  }

  .business-hero__actions { flex-direction: column; align-items: stretch; }
  .business-hero__actions a { text-align: center; }
}
</style>
