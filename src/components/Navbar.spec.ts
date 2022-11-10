import { useUsers } from './../stores/users';
import { mount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';
import { describe, it, expect } from 'vitest';
import { createMemoryHistory, createRouter } from 'vue-router';
import { routes } from '../router';
import Navbar from './Navbar.vue';

describe('Navbar', () => {
  it('renders sign-in and sign-up buttons when not authenticated', async () => {
    const el = document.createElement('div');
    el.id = 'modal';
    document.body.appendChild(el);

    const pinia = createPinia();
    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    });

    const wrapper = mount(Navbar, {
      global: {
        plugins: [pinia, router],
      },
    });

    expect(wrapper.find('#sign-up').exists()).toBe(true);
    expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true);
    // console.log(wrapper.html());
  });

  it.only('renders new post and logout buttons when authenticated', async () => {
    const el = document.createElement('div');
    el.id = 'modal';
    document.body.appendChild(el);

    const pinia = createPinia();
    setActivePinia(pinia);

    const users = useUsers();
    users.currentUserId = '1';

    const router = createRouter({
      history: createMemoryHistory(),
      routes,
    });

    const wrapper = mount(Navbar, {
      global: {
        plugins: [pinia, router],
      },
    });

    // expect(wrapper.find('#sign-up').exists()).toBe(true);
    // expect(wrapper.find('[data-testid="sign-in"]').exists()).toBe(true);

    expect(wrapper.find('a').text()).toBe('New Post');
    expect(wrapper.find('button').text()).toBe('Log Out');
    console.log(wrapper.html());
  });
});
