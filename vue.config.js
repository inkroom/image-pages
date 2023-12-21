/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = {
    outputDir:'docs',
    assetsDir:'static',
    productionSourceMap: false,
    configureWebpack:{
        externals: {
        vue: 'Vue'
        , 'element-ui': 'ELEMENT',
        'vue-router': 'VueRouter'
      },
    }
    
  }