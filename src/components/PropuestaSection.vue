<template>
  <section id="propuesta" class="proposal-section bg-black relative overflow-hidden" aria-label="Propuesta para eventos">
    <div class="proposal-glow" aria-hidden="true"></div>

    <div class="section-wrap relative z-10">
      <div ref="headerRef" class="proposal-header">
        <div>
          <div class="section-eyebrow"><span class="label">02 — Propuesta para eventos</span></div>
          <h2 class="section-title">Elige cómo<br><span class="text-lime">vivir el show.</span></h2>
        </div>
        <p>
          Tres experiencias diseñadas para adaptarse al tamaño y ritmo de tu evento, siempre con la energía de AMARGO en escena.
        </p>
      </div>

      <div ref="benefitsRef" class="benefits-strip" aria-label="Beneficios disponibles">
        <span v-for="benefit in eventBenefits" :key="benefit">
          <i aria-hidden="true"></i>{{ benefit }}
        </span>
      </div>

      <div ref="packagesRef" class="packages-grid">
        <article
          v-for="(eventPackage, index) in eventPackages"
          :key="eventPackage.slug"
          class="package-card"
          :class="{ 'package-card--featured': eventPackage.featured }"
        >
          <div class="package-card__top">
            <span class="package-card__number">0{{ index + 1 }}</span>
            <span v-if="eventPackage.featured" class="package-card__badge">Experiencia completa</span>
            <span v-else class="package-card__type">Paquete 2026</span>
          </div>

          <h3>{{ eventPackage.name }}</h3>

          <ul>
            <li v-for="feature in eventPackage.features" :key="feature">
              <span aria-hidden="true">＋</span>{{ feature }}
            </li>
          </ul>

          <div class="package-card__footer">
            <div>
              <span>Inversión</span>
              <strong>{{ eventPackage.price }}</strong>
            </div>
          </div>
        </article>
      </div>

      <div class="proposal-cta">
        <a href="#cta" class="btn-lime">Cotiza tu evento <span aria-hidden="true">→</span></a>
        <p>Cuéntanos qué experiencia quieres vivir y te ayudamos a elegir el paquete ideal.</p>
      </div>

      <p class="invoice-note">Facturación disponible. Pregunta por el servicio.</p>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from '@/composables/useGsap'
import { eventBenefits, eventPackages } from '@/data/proposals'

const headerRef = ref(null)
const benefitsRef = ref(null)
const packagesRef = ref(null)

onMounted(() => {
  gsap.fromTo(headerRef.value,
    { y: 45, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: headerRef.value, start: 'top 85%' } },
  )

  gsap.fromTo(benefitsRef.value?.children || [],
    { y: 20, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out', scrollTrigger: { trigger: benefitsRef.value, start: 'top 88%' } },
  )

  gsap.fromTo(packagesRef.value?.children || [],
    { y: 50, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: packagesRef.value, start: 'top 82%' } },
  )
})
</script>

<style scoped>
.proposal-section {
  isolation: isolate;
}

.proposal-glow {
  position: absolute;
  top: 15%;
  left: 50%;
  width: 70rem;
  height: 35rem;
  background: radial-gradient(circle, rgba(179, 255, 0, 0.07), transparent 68%);
  transform: translateX(-50%);
  pointer-events: none;
}

.proposal-header {
  display: grid;
  gap: 2rem;
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
}

.proposal-header p {
  max-width: 34rem;
  color: var(--color-text-muted);
  font-size: var(--text-lg);
  line-height: 1.55;
}

.benefits-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  margin-bottom: clamp(2rem, 5vw, 3.5rem);
}

.benefits-strip span {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.7rem 0.85rem;
  border: 1px solid var(--color-border);
  background: rgba(255, 255, 255, 0.025);
  color: var(--color-text-muted);
  font-family: var(--font-family-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.benefits-strip i {
  width: 0.35rem;
  height: 0.35rem;
  background: var(--color-lime);
  border-radius: 999px;
  box-shadow: 0 0 12px var(--color-lime);
}

.packages-grid {
  display: grid;
  gap: 1rem;
}

.package-card {
  position: relative;
  display: flex;
  min-height: 34rem;
  flex-direction: column;
  overflow: hidden;
  padding: clamp(1.4rem, 3vw, 2rem);
  border: 1px solid var(--color-border);
  background:
    linear-gradient(145deg, rgba(179, 255, 0, 0.06), transparent 42%),
    var(--color-surface2);
  transition: border-color 220ms ease, transform 220ms ease;
}

.package-card::after {
  position: absolute;
  right: -4rem;
  bottom: -5rem;
  width: 13rem;
  height: 13rem;
  border: 1px solid rgba(179, 255, 0, 0.12);
  border-radius: 999px;
  content: '';
}

.package-card:hover {
  border-color: var(--color-border-h);
  transform: translateY(-0.4rem);
}

.package-card--featured {
  border-color: rgba(179, 255, 0, 0.38);
  background:
    linear-gradient(145deg, rgba(179, 255, 0, 0.13), transparent 50%),
    var(--color-surface2);
}

.package-card__top {
  display: flex;
  min-height: 1.65rem;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 2rem;
}

.package-card__number,
.package-card__type,
.package-card__badge {
  font-family: var(--font-family-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.package-card__number { color: var(--color-lime); }
.package-card__type { color: var(--color-text-dim); }

.package-card__badge {
  padding: 0.35rem 0.5rem;
  background: var(--color-lime);
  color: var(--color-black);
}

.package-card h3 {
  margin-bottom: 2rem;
  color: var(--color-text);
  font-family: var(--font-family-display);
  font-size: clamp(2.4rem, 5vw, 3.6rem);
  line-height: 0.95;
}

.package-card ul {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  color: var(--color-text-muted);
  font-size: 0.95rem;
  list-style: none;
}

.package-card li {
  display: flex;
  align-items: flex-start;
  gap: 0.55rem;
  line-height: 1.4;
}

.package-card li span { color: var(--color-lime); }

.package-card__footer {
  position: relative;
  z-index: 1;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--color-border);
}

.package-card__footer > div {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.package-card__footer span {
  color: var(--color-text-dim);
  font-family: var(--font-family-heading);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.package-card__footer strong {
  color: var(--color-lime);
  font-family: var(--font-family-display);
  font-size: 2rem;
  font-weight: 400;
  line-height: 1;
}

.invoice-note {
  margin-top: 1.25rem;
  color: var(--color-text-dim);
  font-family: var(--font-family-heading);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-align: center;
  text-transform: uppercase;
}

.proposal-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.9rem;
  margin-top: clamp(2rem, 4vw, 3rem);
  text-align: center;
}

.proposal-cta a {
  padding: 1.25rem 2.5rem;
  font-size: clamp(0.85rem, 2vw, 1.1rem);
  font-weight: 700;
}

.proposal-cta p {
  max-width: 34rem;
  color: var(--color-text-dim);
  font-size: 0.9rem;
  line-height: 1.5;
}

@media (max-width: 767px) {
  .proposal-cta a { width: 100%; text-align: center; }
}

@media (min-width: 768px) {
  .proposal-header {
    grid-template-columns: minmax(0, 1.2fr) minmax(18rem, 0.8fr);
    align-items: end;
  }

  .packages-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .package-card--featured {
    grid-column: 1 / -1;
    min-height: 28rem;
  }
}

@media (max-width: 767px) {
  .package-card,
  .package-card--featured {
    min-height: 0;
  }
}

@media (min-width: 1120px) {
  .packages-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .package-card--featured {
    grid-column: auto;
    min-height: 34rem;
  }
}
</style>
