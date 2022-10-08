<script setup lang="ts">
defineProps<{ type: string }>()

const emit = defineEmits(['click'])

const handleClick = (evt: MouseEvent) => {
  emit('click', evt)
}
</script>

<template>
  <svg class="svg-icon" aria-hidden="true" @click="handleClick">
    <use :xlink:href="'#jitui-' + type"></use>
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
