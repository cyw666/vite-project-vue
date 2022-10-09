import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FSvgIcon from '../FSvgIcon.vue'

describe('FSvgIcon', () => {
  const name = 'logo'
  it('render test', () => {
    const wrapper = mount(FSvgIcon, {
      props: {
        name,
      },
    })
    expect(wrapper.find('use').html()).toContain(`#icon-${name}`)
  })
  it('icon size', () => {
    const size = 48
    const wrapper = mount(FSvgIcon, {
      props: {
        name,
        size,
      },
    })
    expect(wrapper.find('svg').attributes('style')).toContain(
      `font-size: ${size}px;`
    )
  })

  it('icon color', () => {
    const color = '#333333'
    const wrapper = mount(FSvgIcon, {
      props: {
        name,
        color,
      },
    })
    expect(wrapper.find('svg')).toMatchSnapshot()
  })
})
