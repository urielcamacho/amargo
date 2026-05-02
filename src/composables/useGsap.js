import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export { gsap, ScrollTrigger }

/**
 * Scroll-triggered reveal animation for an element ref.
 */
export function useScrollReveal(elRef, options = {}) {
  const {
    y = 50,
    opacity = 0,
    duration = 1,
    delay = 0,
    ease = 'power3.out',
    start = 'top 85%',
  } = options

  let st = null

  onMounted(() => {
    const el = elRef.value?.$el || elRef.value
    if (!el) return

    gsap.set(el, { y, opacity })
    st = gsap.to(el, {
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    })
  })

  onUnmounted(() => {
    st?.scrollTrigger?.kill()
  })
}

/**
 * Stagger animation for a list of elements.
 */
export function useStagger(containerRef, selector, options = {}) {
  const {
    y = 40,
    opacity = 0,
    duration = 0.8,
    stagger = 0.1,
    ease = 'power3.out',
    start = 'top 85%',
  } = options

  let ctx = null

  onMounted(() => {
    const container = containerRef.value?.$el || containerRef.value
    if (!container) return

    const els = container.querySelectorAll(selector)
    if (!els.length) return

    ctx = gsap.context(() => {
      gsap.set(els, { y, opacity })
      gsap.to(els, {
        y: 0,
        opacity: 1,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: container,
          start,
          toggleActions: 'play none none none',
        },
      })
    }, container)
  })

  onUnmounted(() => {
    ctx?.revert()
  })
}

/**
 * Parallax effect on scroll.
 */
export function useParallax(elRef, speed = 0.3) {
  let st = null

  onMounted(() => {
    const el = elRef.value?.$el || elRef.value
    if (!el) return

    st = gsap.to(el, {
      y: () => speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  })

  onUnmounted(() => {
    st?.scrollTrigger?.kill()
  })
}

/**
 * Count-up animation for a number element.
 */
export function animateCountUp(el, target, duration = 2) {
  const obj = { val: 0 }
  return gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = Math.round(obj.val)
    },
    scrollTrigger: {
      trigger: el,
      start: 'top 85%',
      toggleActions: 'play none none none',
    },
  })
}
