import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StandardSearch from '@/components/StandardSearch.vue'

describe('StandardSearch.vue', () => {
  it('renders the search input', () => {
    const wrapper = mount(StandardSearch)
    expect(wrapper.find('.search-input').exists()).toBe(true)
  })
})
