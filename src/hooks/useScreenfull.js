import { onUnmounted } from "vue";
import screenfull from "screenfull";
import { ElMessage } from "element-plus";

export const useScreenfull = (isFullScreen) => {
  if (isFullScreen.value) {
    if (screenfull.isEnabled) {
      screenfull.request();
    } else {
      ElMessage({
        message: "您的浏览器不支持全屏",
        type: "error",
      });
    }
  } else {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
};
