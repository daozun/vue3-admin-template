import { onUnmounted } from "vue";

export const useEcharts = (myChart, options) => {
  if (options && typeof options === "object") {
    myChart.setOption(options);
  }
  const echartsResize = () => {
    myChart && myChart.resize();
  };

  window.addEventListener("resize", echartsResize, false);

  onUnmounted(() => {
    window.removeEventListener("resize", echartsResize);
  });
};
