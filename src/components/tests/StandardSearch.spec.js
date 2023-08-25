import { describe, it, expect, vi, beforeEach, test } from 'vitest'
import { mount } from '@vue/test-utils'
import StandardSearch from '@/components/StandardSearch.vue'
import axios from 'axios'

vi.mock('axios')

beforeEach(() => {
  axios.get.mockReset()
})

describe('StandardSearch.vue', () => {
  it('renders the search input', () => {
    const wrapper = mount(StandardSearch)
    expect(wrapper.find('.search-input').exists()).toBe(true)
  })

  describe('searchUsers method', () => {
    test('makes a GET request to search for users and populates the users ref', async () => {
      const usersMock = [
        {
          id: 1,
          name: 'John Doe',
          email: 'john@example.com',
          address: {
            street: '123 Main St',
            city: 'Anytown'
          },
          company: {
            name: 'TechCorp'
          }
        }
      ]

      axios.get.mockResolvedValue({
        data: usersMock,
      })

      const wrapper = mount(StandardSearch)
      await wrapper.vm.searchUsers()

      expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users?username=')
      expect(wrapper.vm.users).toStrictEqual(usersMock)
    })
  })

})
