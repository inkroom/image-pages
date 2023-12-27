module.exports = {
  outputDir: 'docs',
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
          externals: {
          vue: 'Vue'
          , 'view-ui-plus': 'ViewUIPlus',
          'vue-router': 'VueRouter'
        },
      }
    } 
    return {}
  },
  css: {
    loaderOptions:{
      less:{
        lessOptions:{
          javascriptEnabled: true
        }
        
      }
    }
  }
}