import { createPinia, defineStore } from "pinia";
import { getStorage } from "@/utils/auth";

export const Store = defineStore("globalState", {
  state: () => ({ isOpenSideBar: false, userInfo: getStorage() }),
  actions: {
    toggleSideBar() {
      this.isOpenSideBar = !this.isOpenSideBar;
    },
    setUserInfo(userInfo) {
      this.userInfo = userInfo;
    },
    removeUserInfo() {
      this.userInfo = null;
    },
  },
});

const pinia = createPinia();
export default pinia;
