<script setup lang="ts">
import { computed, getCurrentInstance, ref, toRef } from 'vue'
import { useClipboard, useToggle } from '@vueuse/core'
import SourceCode from './demo/vp-source-code.vue'

const props = defineProps<{
  source: string
  path: string
  rawSource: string
  description: string
  show: boolean
}>()
const vm = getCurrentInstance()!

console.log('props.show: ', props.show);

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false,
})

const [sourceVisible] = useToggle()


const decodedDescription = computed(() => decodeURIComponent(props.description))



const copyCode = async () => {
  const { $message } = vm.appContext.config.globalProperties
  if (!isSupported) {
    $message.error('复制失败')
  }
  try {
    await copy()
    $message.success('复制成功')
  } catch (e: any) {
    $message.error(e.message)
  }
}
</script>

<template>
  <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
  <div text="sm" m="y-4" v-html="decodedDescription" />

  <div class="example" :class="{'no-show-source':!show}">
    <div class="example-showcase">
      <slot name="source" />
    </div>
    <div class="divider"  v-if="show"/>
    <div class="op-btns" v-if="show">
      <svg-icon name="expend" @click="sourceVisible = !sourceVisible"></svg-icon>
      <svg-icon name="copy" @click="copyCode"></svg-icon>
    </div>
    <SourceCode :visible="sourceVisible" :source="source"   />
  </div>
</template>

<style scoped lang="scss">
.example{
  border: 1px solid var(--border-color);
  border-radius: 2px;

  &.no-show-source{
    border: 0px;
  }

  .example-showcase {
    padding: 1.5rem;
    margin: 0.5px;
    // background-color: var(--el-bg-color);
  }
}
.divider{
  height: 1px;
  border-top: 1px solid var(--border-color);
}
.op-btns{
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 10px;
  gap: 5px;
}

.icon:hover{
  cursor: pointer;
}
</style>
