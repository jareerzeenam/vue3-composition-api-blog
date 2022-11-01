// Custom State Management

/**
 * ! NOT USED
 * This is a custom built state management store
 * In file ./posts.ts we are using Pinia (a vue state management package) for state management
 */

import { reactive, readonly } from 'vue';

// ref number , string
// computed
// reactive {}, Map, Set

interface PostsState {
  foo: string;
}

export class PostStore {
  #state: PostsState;

  constructor() {
    this.#state = reactive<PostsState>({
      foo: 'foo',
    });
  }

  getState() {
    return readonly(this.#state);
  }

  updateFoo(foo: string) {
    this.#state.foo = foo;
  }
}

const store = new PostStore();

export function usePosts() {
  return store;
}
