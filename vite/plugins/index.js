import vue from "@vitejs/plugin-vue";

import createAutoImport from "./auto-import";
import createSvgIcon from "./svg-icon";
import createCompression from "./compression";
import createSetupExtend from "./setup-extend";
import setTitle from "./set-title";
import addElementplus from "./add-elementplus";

export default function createVitePlugins(viteEnv, isBuild = false, mode) {
  const vitePlugins = [vue()];
  vitePlugins.push(setTitle(mode));
  vitePlugins.push(...addElementplus());
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createSetupExtend());
  vitePlugins.push(createSvgIcon(isBuild));
  isBuild && vitePlugins.push(...createCompression(viteEnv));

  return vitePlugins;
}
