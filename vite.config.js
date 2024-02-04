import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path';
import { autoComplete, Plugin as importToCDN } from "vite-plugin-cdn-import";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    importToCDN({
      //     <script src="https://cdn.bootcdn.net/ajax/libs/vue/3.3.4/vue.global.min.js"></script>
      // <script src="https://cdn.bootcdn.net/ajax/libs/vue-router/4.2.4/vue-router.global.min.js"></script>
      // <script type="text/javascript" src="https://unpkg.com/view-ui-plus@1.3.15"></script>
      // prodUrl: 'https://cdn.jsdelivr.net/npm/{name}@{version}/{path}',
      modules: [
          {
              name: 'vue',
              var: 'Vue',
              path: `https://cdn.bootcdn.net/ajax/libs/vue/3.3.4/vue.global.min.js`,

          },
          {
              name: 'vue-router',
              var: 'VueRouter',
              path: `https://cdn.bootcdn.net/ajax/libs/vue-router/4.2.4/vue-router.global.min.js`,
          },
          {
              name: 'view-ui-plus',
              var: 'ViewUIPlus',
              path: 'https://unpkg.com/view-ui-plus@1.3.15',
          },
      ],
  }),
  ],
  build: {
    target: 'es2015',
    outDir: path.resolve(__dirname, 'docs'),
    sourcemap: false,
},
  resolve: {
    alias: [
      { find: /^@\//, replacement: `${path.resolve(__dirname, 'src')}/` },
      { find: /^~/, replacement: '' }
  ],
  },
  css:{
    preprocessorOptions:{
      less:{
        javascriptEnabled: true
      }
    }
  }
})
