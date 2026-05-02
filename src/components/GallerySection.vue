<template>
  <section id="gallery" class="bg-black relative overflow-hidden" aria-label="Galería de fotos">
    <div class="section-wrap">
      <div ref="galleryRef" class="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4">
        <!-- Photo 1 - Wide Hero -->
        <div class="gallery-item relative overflow-hidden rounded-sm col-span-2 md:col-span-2 md:row-span-1">
          <img src="@/images/Amargo084.jpg" alt="AMARGO en vivo 1" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105 filter grayscale hover:grayscale-0" />
        </div>
        <!-- Photo 2 - Small -->
        <div class="gallery-item relative overflow-hidden rounded-sm col-span-1 md:col-span-2 md:row-span-1">
          <img src="@/images/Amargo039.jpg" alt="AMARGO en vivo 2" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105 filter grayscale hover:grayscale-0" />
        </div>
        <!-- Photo 3 - Small -->
        <div class="gallery-item relative overflow-hidden rounded-sm col-span-1 md:col-span-1 md:row-span-1">
          <img src="@/images/Amargo111.jpg" alt="AMARGO en vivo 3" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105 filter grayscale hover:grayscale-0" />
        </div>
        <!-- Photo 4 - Small -->
        <div class="gallery-item relative overflow-hidden rounded-sm col-span-1 md:col-span-2 md:row-span-1">
          <img src="@/images/Amargo142.jpg" alt="AMARGO en vivo 4" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105 filter grayscale hover:grayscale-0" />
        </div>
        <!-- Photo 5 - Small -->
        <div class="gallery-item relative overflow-hidden rounded-sm col-span-1 md:col-span-1 md:row-span-1">
          <img src="@/images/Amargo152.jpg" alt="AMARGO en vivo 5" class="w-full h-full object-cover transition-transform duration-700 hover:scale-105 filter grayscale hover:grayscale-0" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { gsap } from '@/composables/useGsap'

const galleryRef = ref(null)

onMounted(() => {
  const items = galleryRef.value.querySelectorAll('.gallery-item')
  
  gsap.fromTo(items, 
    { y: 50, opacity: 0, scale: 0.95 },
    { 
      y: 0, opacity: 1, scale: 1, 
      duration: 1, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: {
        trigger: galleryRef.value,
        start: 'top 85%',
      }
    }
  )
})
</script>

<style scoped>
.gallery-item img {
  aspect-ratio: 1 / 1;
}
/* First image wide */
.gallery-item:first-child img {
  aspect-ratio: 16 / 9;
}

@media (min-width: 768px) {
  .gallery-item img {
    aspect-ratio: auto;
    min-height: 250px;
  }
}
</style>
