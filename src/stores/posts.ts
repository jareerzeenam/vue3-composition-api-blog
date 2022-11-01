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

export const usePosts = defineStore('posts', {
  // Reactive
  state: (): PostsState => ({
    ids: [today.id, thisWeek.id, thisMonth.id, thisYear.id],
    all: new Map([
      [today.id, today],
      [thisWeek.id, thisWeek],
      [thisMonth.id, thisMonth],
      [thisYear.id, thisYear],
    ]),
    selectedPeriod: 'Today',
  }),

  // Methods
  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
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
