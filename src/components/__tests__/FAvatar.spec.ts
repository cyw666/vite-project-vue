import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import FAvatar from '../FAvatar.vue'

describe('FAvatar', () => {
  it('image avatar', () => {
    const wrapper = mount(FAvatar, {
      props: {
        src: 'https://avatars.githubusercontent.com/u/21189649?s=40&v=4',
      },
    })
    expect(wrapper.find('img').exists()).toBe(true)
  })
})
