import { describe, it, expect, vi, beforeEach, afterEach, test, mock } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';
import ImprovedSearch from '@/components/ImprovedSearch.vue';
import axios from 'axios';
import { nextTick } from 'vue';

vi.mock('axios');

describe('ImprovedSearch.vue', () => {
  let router;

    let originalAxiosGet;

    beforeEach(() => {
      originalAxiosGet = axios.get;
    });

    afterEach(() => {
      // Restore the original axios.get function after each test
      axios.get = originalAxiosGet;
    });

    beforeEach(async () => {
    const history = createMemoryHistory();
    router = createRouter({
      history: history,
      routes: [
        { path: '/two/:term', component: ImprovedSearch },
        { path: '/two/:term/results', component: ImprovedSearch }
      ]
    });
    await router.push('/two/testTerm');
  });

  it('initializes searchTerm from route params', () => {
    const wrapper = mount(ImprovedSearch, {
      global: {
        plugins: [router]
      }
    });
    expect(wrapper.vm.searchTerm).toBe('testTerm');
  });

  it('renders the search input', () => {
    const wrapper = mount(ImprovedSearch, {
      global: {
        plugins: [router]
      }
    });
    expect(wrapper.find('.search-input').exists()).toBe(true);
  });

  it('updates the route when input changes', async () => {
    // Create a mock router
    const router = createRouter({
        history: createMemoryHistory(),
        routes: [
            { path: '/two/:term', component: ImprovedSearch },
            { path: '/two/:term/results', component: ImprovedSearch }
        ]
    });

    // Push an initial route
    await router.push('/two/testTerm');

    // Mount the component with the router
    const wrapper = mount(ImprovedSearch, {
        global: {
            plugins: [router]
        }
    });

    // Set the searchTerm and trigger the input event
    wrapper.vm.searchTerm = 'testUser';
    await nextTick();
    await wrapper.find('.search-input').trigger('input');
    await flushPromises()

    // Check if the route has been updated correctly
    expect(router.currentRoute.value.path).toBe('/two/testUser');
  });

  it('clears the users list when the search input changes', async () => {
    // Mock the axios.get method
    axios.get = async () => ({ data: [] });

    // Create a mock router with a default route that has parameters
    const history = createMemoryHistory();
    const router = createRouter({
      history: history,
      routes: [{ path: '/two/:term', component: {} }]
    });

    // Push a default route with a term
    await router.push('/two/testTerm');

    const wrapper = mount(ImprovedSearch, {
      global: {
        plugins: [router]
      }
    });

    // Simulate a populated users list
    wrapper.vm.users = [{ id: 1, name: 'John Doe' }];

    // Simulate changing the search input
    wrapper.vm.searchTerm = 'newTerm';
    await wrapper.find('.search-input').trigger('input');

    // Check if the users list has been cleared
    expect(wrapper.vm.users.length).toBe(0);
  });

  describe('searchUsers method', () => {
    beforeEach(() => {
      axios.get.mockReset();
    });

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
      ];
      axios.get.mockResolvedValue({
        data: usersMock,
      });

      const wrapper = mount(ImprovedSearch, {
        global: {
          plugins: [router]
        }
      });
      await wrapper.vm.searchUsers();

      expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users?username=testTerm');
      expect(wrapper.vm.users).toStrictEqual(usersMock);
    });
  });
});
