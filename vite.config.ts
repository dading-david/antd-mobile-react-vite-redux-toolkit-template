/* eslint-disable no-extra-boolean-cast */
import { defineConfig, ConfigEnv } from 'vite';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import react from '@vitejs/plugin-react';
import postcssPxtoRem from 'postcss-pxtorem'
import { viteMockServe } from 'vite-plugin-mock';
import { visualizer } from 'rollup-plugin-visualizer';

import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ command }: ConfigEnv) => {
  return {
    base: './',
    plugins: [
      react(),
      // mock
      viteMockServe({
        mockPath: 'mock', //mock文件地址
        localEnabled: !!process.env.USE_MOCK, // 开发打包开关
        prodEnabled: !!process.env.USE_CHUNK_MOCK, // 生产打包开关
        logger: false, //是否在控制台显示请求日志
        supportTs: true
      }),
      createStyleImportPlugin({
        libs: []
      }),
      !!process.env.REPORT
        ? visualizer({
          open: true,
          gzipSize: true,
          filename: path.resolve(__dirname, 'dist/stats.html')
        })
        : null
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, './src')
        }
      ]
    },
    css: {
      // css预处理器
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          charset: false,
          // additionalData: '@import "./src/styles/index.less";'
        }
      },
      postcss: {
        plugins: [
          postcssPxtoRem({
            rootValue: 37.5, // 设计稿元素尺寸/10
            unitPrecision: 5,
            propList: ['*'], // 是一个存储哪些将被转换的属性列表，这里设置为['*']全部，假设需要仅对边框进行设置，可以写['*', '!border*']
            selectorBlackList: [], // 则是一个对css选择器进行过滤的数组，比如你设置为['el-']，那所有el-类名里面有关px的样式将不被转换，这里也支持正则写法。
            replace: true,
            mediaQuery: false, // 媒体查询( @media screen 之类的)中不生效
            minPixelValue: 0, // px 绝对值小于 0 的不会被转换
            exclude: /node_modules/i,
          })
        ]
      }
    },
    build: {
      terserOptions: {
        compress: {
          drop_console: true
        }
      },
      outDir: 'dist', //指定输出路径
      assetsDir: 'assets' //指定生成静态资源的存放路径
    }
  };
});

