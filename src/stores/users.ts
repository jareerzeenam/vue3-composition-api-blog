import { NewUser } from './../users';
import { defineStore } from 'pinia';

export const useUsers = defineStore('users', {
  actions: {
    // create Post
    createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser);

      return window.fetch('http://localhost:5500/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });
    },
  },
});
