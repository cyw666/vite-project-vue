<template>
  <svg class="f-svg-icon" aria-hidden="true" :style="svgStyle">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts">
export default {
  name: 'FSvgIcon',
}
</script>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    name: string
    size?: number | string
    color?: string
  }>(),
  {
    size: 16,
    color: '#303133',
  }
)

const svgStyle = computed(() => ({
  fontSize: `${props.size}px`,
  color: `${props.color}`,
}))

const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style>
.f-svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
