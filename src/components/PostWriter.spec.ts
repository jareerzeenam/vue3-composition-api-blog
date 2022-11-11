import { useUsers } from './../stores/users';
import { mount } from '@vue/test-utils';
import { createMemoryHistory, createRouter, Router } from 'vue-router';
import { createPinia, Pinia, setActivePinia } from 'pinia';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { routes } from '../router';
import PostWriter from './PostWriter.vue';

describe('PostWriter', () => {
  let pinia: Pinia;
  let router: Router;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    const user = useUsers();
    user.currentUserId = '1';
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });
  });

  it('writes a post using markdown', () => {
    return new Promise<void>(async (resolve) => {
      const wrapper = mount(PostWriter, {
        global: {
          plugins: [pinia, router],
        },
        props: {
          post: {
            id: '1',
            title: '',
            description: '',
            author: '1',
            categoryId: '1',
            createdAt: '',
            markdown: '',
            html: '',
          },
        },
      });

      wrapper.find<HTMLDListElement>('#contenteditable').element.innerText =
        '# Title';

      await wrapper.find('#contenteditable').trigger('input');
      //   console.log(wrapper.html());

      setTimeout(async () => {
        await wrapper.find('#submit').trigger('click');
        console.log(wrapper.html());
        expect(wrapper.emitted().submit[0]).toMatchInlineSnapshot(`
          [
            {
              "author": "1",
              "categoryId": "1",
              "createdAt": "",
              "description": "",
              "html": "<h1 id=\\"title\\">Title</h1>
          ",
              "id": "1",
              "markdown": "# Title",
              "title": "",
            },
          ]
        `);

        resolve();
      }, 300);
    });
  });
});
