import { NewUser } from './../users';
import { defineStore } from 'pinia';

interface UsersState {
  currentUserId?: string;
}

export const useUsers = defineStore('users', {
  state: (): UsersState => ({
    currentUserId: undefined,
  }),

  actions: {
    // ! Authentication
    async authenticate() {
      try {
        const res = await window.fetch('/api/current-user', {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await res.json();
        this.currentUserId = result.id;
      } catch (error) {
        this.currentUserId = undefined;
      }
    },

    // Logout
    async logout() {
      await window.fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return this.authenticate();
    },

    // create Post
    async createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser);

      await window.fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
      return this.authenticate();
    },
  },
});
