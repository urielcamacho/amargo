<template>
  <NavBar page="business" />
  <BusinessHero />
  <BusinessConceptSection />
  <GallerySection />
  <SectionDivider />
  <BusinessUseCasesSection />
  <LiveVideoSection business-only />
  <SectionDivider />
  <SetlistSection />
  <SectionDivider />
  <SocialProof business-only />
  <CtaSection mode="business" />
  <FooterSection page="business" />
</template>

<script setup>
import NavBar from '@/components/NavBar.vue'
import BusinessHero from '@/components/business/BusinessHero.vue'
import BusinessConceptSection from '@/components/business/BusinessConceptSection.vue'
import GallerySection from '@/components/GallerySection.vue'
import SectionDivider from '@/components/SectionDivider.vue'
import BusinessUseCasesSection from '@/components/business/BusinessUseCasesSection.vue'
import LiveVideoSection from '@/components/LiveVideoSection.vue'
import SetlistSection from '@/components/SetlistSection.vue'
import SocialProof from '@/components/SocialProof.vue'
import CtaSection from '@/components/CtaSection.vue'
import FooterSection from '@/components/FooterSection.vue'
</script>
