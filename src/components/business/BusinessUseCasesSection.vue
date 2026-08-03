<template>
  <section id="formatos" class="bg-black relative overflow-hidden" aria-label="Noche Millennial para negocios">
    <div class="section-wrap">
      <div ref="headerRef" class="use-cases-header">
        <div>
          <div class="section-eyebrow"><span class="label">02 — Para tu negocio</span></div>
          <h2 class="section-title">Una fecha con<br><span class="text-lime">buenas canciones.</span></h2>
        </div>
        <p>
          Ajustamos el ritmo, el volumen y la duración según el espacio y la gente que va a estar.
        </p>
      </div>

      <div ref="cardsRef" class="use-cases-grid">
        <article v-for="(useCase, index) in useCases" :key="useCase.title">
          <span>0{{ index + 1 }}</span>
          <h3>{{ useCase.title }}</h3>
          <p>{{ useCase.description }}</p>
        </article>
      </div>

      <div ref="deliveryRef" class="delivery-panel">
        <div>
          <span class="label">Cómo armamos la noche</span>
          <h3>El resto lo armamos juntos.</h3>
        </div>
        <ul>
          <li v-for="item in delivery" :key="item"><span aria-hidden="true">＋</span>{{ item }}</li>
        </ul>
        <a href="#cta" class="btn-lime">Platiquemos de la fecha</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from '@/composables/useGsap'

const useCases = [
  { title: 'Bares y restaurantes', description: 'Un repertorio conocido para acompañar la cena y terminar cantando.' },
  { title: 'Inauguraciones', description: 'Música en vivo para abrir el lugar con una buena primera noche.' },
  { title: 'Aniversarios', description: 'Canciones que juntan generaciones sin ponerse solemnes.' },
  { title: 'Eventos corporativos', description: 'Una pausa de la agenda con algo que todos pueden cantar.' },
  { title: 'Centros comerciales', description: 'Un show que se escucha, se reconoce y hace que la gente se acerque.' },
]

const delivery = [
  'Formato definido según el espacio disponible.',
  'Horarios y duración acordados contigo.',
  'Requerimientos técnicos claros desde el inicio.',
  'Cotización para cada presentación.',
]

const headerRef = ref(null)
const cardsRef = ref(null)
const deliveryRef = ref(null)

onMounted(() => {
  gsap.fromTo(headerRef.value, { y: 40, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: headerRef.value, start: 'top 85%' },
  })
  gsap.fromTo(cardsRef.value?.children || [], { y: 40, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: cardsRef.value, start: 'top 84%' },
  })
  gsap.fromTo(deliveryRef.value, { y: 40, opacity: 0 }, {
    y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', scrollTrigger: { trigger: deliveryRef.value, start: 'top 88%' },
  })
})
</script>

<style scoped>
.use-cases-header {
  display: grid;
  gap: 2rem;
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
}

.use-cases-header > p {
  max-width: 33rem;
  color: var(--color-text-muted);
  font-size: var(--text-lg);
  line-height: 1.55;
}

.use-cases-grid {
  display: grid;
  gap: 0.8rem;
}

.use-cases-grid article {
  min-height: 15rem;
  padding: 1.4rem;
  border: 1px solid var(--color-border);
  background:
    linear-gradient(135deg, rgba(179, 255, 0, 0.07), transparent 55%),
    var(--color-surface2);
  transition: border-color 200ms ease, transform 200ms ease;
}

.use-cases-grid article:hover {
  border-color: var(--color-border-h);
  transform: translateY(-0.3rem);
}

.use-cases-grid article > span {
  color: var(--color-lime);
  font-family: var(--font-family-heading);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.18em;
}

.use-cases-grid h3 {
  margin: 2.4rem 0 0.75rem;
  color: var(--color-text);
  font-family: var(--font-family-display);
  font-size: clamp(1.8rem, 3vw, 2.55rem);
  line-height: 0.95;
}

.use-cases-grid p {
  color: var(--color-text-muted);
  font-size: 0.92rem;
  line-height: 1.5;
}

.delivery-panel {
  display: grid;
  gap: 2rem;
  align-items: center;
  margin-top: 1rem;
  padding: clamp(1.5rem, 5vw, 3rem);
  border: 1px solid rgba(179, 255, 0, 0.25);
  background: linear-gradient(100deg, rgba(179, 255, 0, 0.1), transparent 60%), var(--color-surface);
}

.delivery-panel h3 {
  margin-top: 0.75rem;
  color: var(--color-text);
  font-family: var(--font-family-display);
  font-size: clamp(2.2rem, 5vw, 4rem);
  line-height: 0.95;
}

.delivery-panel ul {
  display: grid;
  gap: 0.65rem;
  margin: 0;
  padding: 0;
  color: var(--color-text-muted);
  font-size: 0.92rem;
  list-style: none;
}

.delivery-panel li { display: flex; gap: 0.5rem; }
.delivery-panel li span { color: var(--color-lime); }
.delivery-panel .btn-lime {
  padding: 1.25rem 2.5rem;
  font-size: clamp(0.85rem, 2vw, 1.1rem);
  font-weight: 700;
  text-align: center;
}

@media (min-width: 700px) {
  .use-cases-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .use-cases-grid article:last-child { grid-column: 1 / -1; }
}

@media (max-width: 699px) {
  .use-cases-grid article {
    min-height: 0;
    padding: 1.25rem;
  }

  .use-cases-grid h3 {
    margin: 1.5rem 0 0.6rem;
  }
}

@media (min-width: 960px) {
  .use-cases-header { grid-template-columns: minmax(0, 1.2fr) minmax(20rem, 0.8fr); align-items: end; }
  .use-cases-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .use-cases-grid article:last-child { grid-column: auto; }
  .use-cases-grid article:nth-child(4),
  .use-cases-grid article:nth-child(5) { grid-column: span 1; }
  .delivery-panel { grid-template-columns: minmax(0, 1fr) minmax(18rem, 0.85fr) auto; }
}
</style>
