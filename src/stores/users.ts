import { NewUser } from './../users';
import { defineStore } from 'pinia';

export const useUsers = defineStore('users', {
  actions: {
    // create Post
    createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser);

      return window.fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
    },
  },
});
