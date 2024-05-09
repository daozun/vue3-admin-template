import { createPinia, defineStore } from "pinia";
import { getUserInfo } from "@/utils/auth";

export const Store = defineStore("globalState", {
  state: () => ({
    isOpenSideBar: false,
    userInfo: getUserInfo(),
    asyncRoute: false,
    theme: localStorage.getItem("vueuse-color-scheme") || "light",
  }),
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
    setAsyncRoute(status) {
      this.asyncRoute = status;
    },
    setTheme(theme) {
      this.theme = theme;
    },
  },
});

const pinia = createPinia();
export default pinia;
