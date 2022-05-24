import { createPinia, defineStore } from "pinia";

export const Store = defineStore("globalState", {
  state: () => ({ isOpenSideBar: false }),
  actions: {
    toggleSideBar() {
      this.isOpenSideBar = !this.isOpenSideBar;
    },
  },
});

const pinia = createPinia();
export default pinia;
