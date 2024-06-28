import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    data: {
      email: '',
      token: '',
    },
    score: 0,
  }),

  getters: {},

  actions: {
    logout() {
      this.data = { email: '', token: '' };
    },
  },
});
