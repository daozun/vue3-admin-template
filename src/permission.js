import router from "./router";
import NProgress from "nprogress";

router.beforeEach((to) => {
  //   console.log("before");
  NProgress.start();
});

router.afterEach((to, from, failure) => {
  //   console.log("after");
  NProgress.done();
});
