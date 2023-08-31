export const useCounterStore = defineStore('counter', {
  state: () => ({ sidebarOpen: false }),
  getters: {
    doubleCount: (state) => state.count * 2
  },
  actions: {
    openNav() {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }
});
