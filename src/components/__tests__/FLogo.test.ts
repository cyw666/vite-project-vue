import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Index from '../FLogo.vue'

describe('FLogo', () => {
  it('render test', () => {
    const wrapper = mount(Index)
    expect(wrapper.find('.f-logo').exists()).toBe(true)
  })
  it('logo size', () => {
    const size = 48
    const wrapper = mount(Index, {
      props: {
        size,
      },
    })
    expect(wrapper.find('img').attributes('style')).toContain(
      `width: ${size}px; height: ${size}px`
    )
  })
})
