// vue.config.js
const { defineConfig } = require('@vue/cli-service')
const { DefinePlugin } = require('webpack')
 
module.exports = defineConfig({
  transpileDependencies: true,
 configureWebpack: {
   plugins: [
     new DefinePlugin({
       __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
     })
   ],
    devServer: {
      proxy: {
        '/api': {
          target: 'http://47.100.180.85:3000',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
 }
})