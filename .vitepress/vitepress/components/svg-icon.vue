<template>
  <svg class="icon" aria-hidden="true" :style="styles">
    <use :href="`#icon-${name}`"></use>
  </svg>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  name:{ 
    type: String,
    required: true,
   },
  height:{
    type: Number,
    default: 16
  },
  width:{
    type: Number,
    default: 16
  },
  color:{
    type: String,
  }
})
const styles = computed(()=>({
  width: `${props.width}px`,
  height: `${props.height}px`,
  color: props.color
}))
</script>

<style>
.icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>