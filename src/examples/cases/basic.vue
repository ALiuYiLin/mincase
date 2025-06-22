<script setup lang="ts">
import { VPFeatures } from 'vitepress/theme';
export interface Feature {
  icon?: string
  title: string
  details: string
  link?: string
  linkText?: string
  rel?: string
  target?: string
}
const features:Feature[] = [
  {
    title:"111",
    details:"2222"
  }
]
</script>

<template>
  <div class="case-list">
    <VPFeatures :features="features"></VPFeatures>
  </div>
</template>