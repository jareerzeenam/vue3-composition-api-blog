import { DateTime } from 'luxon';
import { Period } from './../constants';
import { defineStore } from 'pinia';
import {
  Post,
  today,
  thisWeek,
  thisMonth,
  thisYear,
  TimelinePost,
} from './../posts';

interface PostsState {
  ids: string[]; // ["1","2"]
  all: Map<string, Post>;
  selectedPeriod: Period;
}

// Delay 15000 MS
function delay() {
  return new Promise<void>((res) => setTimeout(res, 1500));
}

export const usePosts = defineStore('posts', {
  // Reactive
  state: (): PostsState => ({
    ids: [],
    all: new Map(),
    selectedPeriod: 'Today',
  }),

  // Methods
  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    },

    // Data fetching
    async fetchPosts() {
      // fetching data
      const res = await window.fetch('http://localhost:5500/posts');
      const data = (await res.json()) as Post[];
      await delay();

      // processing data
      let ids: string[] = [];
      let all = new Map<string, Post>();
      for (const post of data) {
        ids.push(post.id);
        all.set(post.id, post);
      }

      // mutation and updating
      this.ids = ids;
      this.all = all;
    },

    // create Post
    createPost(post: TimelinePost) {
      console.log(post);
    },
  },

  // Computed Properties
  getters: {
    filteredPosts: (state): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id);

          if (!post) {
            throw Error(`Post with id of ${id} was expected, but not found!`);
          }
          return {
            ...post,
            createdAt: DateTime.fromISO(post.createdAt),
            author: 'Jareer Zeenam', // overwrite author name
          };
        })
        .filter((post) => {
          if (state.selectedPeriod === 'Today') {
            return post.createdAt >= DateTime.now().minus({ day: 1 });
          }
          if (state.selectedPeriod === 'This Week') {
            return post.createdAt >= DateTime.now().minus({ week: 1 });
          }
          if (state.selectedPeriod === 'This Month') {
            return post.createdAt >= DateTime.now().minus({ month: 1 });
          }

          return post;
        });
    },
  },
});
