import {
  tryOnUnmounted,
  useTimeoutFn,
  useBreakpoints,
  useDebounceFn,
  useEventListener,
  breakpointsTailwind,
} from '@vueuse/core'
import { unref, nextTick, computed, ref, type Ref } from 'vue'
import echarts from '~/utils/lib/echarts'
import type { ECharts, EChartsCoreOption } from 'echarts/core'

export function useECharts(elRef: Ref<HTMLDivElement | undefined>) {
  const time = 100
  const chart = ref<ECharts | null>(null)
  let resizeFn = resize
  const cacheOptions = ref({})

  resizeFn = useDebounceFn(resize, 200)

  const getOptions = computed<EChartsCoreOption>(() => {
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value,
    }
  })

  function initCharts() {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }

    const instance = echarts.init(el)
    chart.value = instance
    useEventListener(window, 'resize', resizeFn)
    const breakpoints = useBreakpoints(breakpointsTailwind)

    if (breakpoints.smaller('md') || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn()
      }, time)
    }
  }

  function setOptions(options: EChartsCoreOption, clear = true) {
    cacheOptions.value = options
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions))
      }, time)
      return
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chart.value) {
          initCharts()

          if (!chart.value) return
        }
        clear && chart.value?.clear()

        chart.value?.setOption(unref(getOptions))
      }, time)
    })
  }

  function resize() {
    chart.value?.resize()
  }

  tryOnUnmounted(() => {
    if (!chart.value) return
    chart.value.dispose()
    chart.value = null
  })

  return {
    setOptions,
    resize,
  }
}
