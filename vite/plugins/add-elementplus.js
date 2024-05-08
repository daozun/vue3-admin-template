import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export default function addElementplus() {
  const plugin = [];

  plugin.push(
    AutoImport({
      resolvers: [ElementPlusResolver()],
    })
  );

  plugin.push(
    Components({
      resolvers: [ElementPlusResolver()],
    })
  );

  return plugin;
}
