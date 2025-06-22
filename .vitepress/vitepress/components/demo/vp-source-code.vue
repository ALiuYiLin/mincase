<script setup lang="ts">
import { computed, onMounted, ref, useTemplateRef } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
})

const decoded = computed(() => {
  return decodeURIComponent(props.source)
})
const exouce = useTemplateRef('exouce')
const maxxHeight = computed(()=>{
  return props.visible?exouce.value?.offsetHeight:0
})


</script>

<template>
  <div  class="example-source-wrapper" :style="{
    'max-height':maxxHeight +'px'
  }" >
    <div class="example-source" ref="exouce" v-html="decoded" />
  </div>
</template>

<style scoped lang="scss">
:deep(.language-vue) {
  margin: 0 !important;
  border-radius: 0 !important;
}
.example-source-wrapper{
  overflow: hidden;
  transition: 0.5s max-height  ease-in-out;
}
</style>
