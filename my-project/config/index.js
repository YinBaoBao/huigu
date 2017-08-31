// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      /*'/auth':{
        target: 'http://192.168.1.30:10000',
        changeOrigin: true,
        pathRewrite: {
          '^/auth': '/auth'
        }
      },*/
     /*'/provinces': {//配置文件    开发环境下将api代理到本地
        target: 'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/provinces': '/provinces'
        }
      },
      '/city': {//配置文件    开发环境下将api代理到本地
        target: 'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/city': '/city'
        }
      },
      '/district': {//配置文件    开发环境下将api代理到本地
        target: 'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/district': '/district'
        }
      },
      '/bank':{
        target: 'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/bank': '/bank'
        }
      },
      '/bankbranch':{
        target: 'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/bankbranch': '/bankbranch'
        }
      },
      '/module':{
        target: 'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/module': '/module'
        }
      },
      '/operation':{
        target: 'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/operation': '/operation'
        }
      },
      '/role':{
        target: 'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/role': '/role'
        }
      },
      '/constant':{
        target:'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite:{
          '^/constant':'/constant'
        }
      },
      '/channelbank':{
        target:'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite:{
          '^/channelbank':'/channelbank'
        }
      },
      '/channel':{
        target:'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite:{
          '^/channel':'/channel'
        }
      },
      '/department':{
        target:'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite:{
          '^/department':'/department'
        }
      },
      '/module':{
        target:'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite:{
          '^/module':'/module'
        }
      },
      '/user':{
        target:'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite:{
          '^/user':'/user'
        }
      },
      '/image':{
        target:'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite:{
          '^/image':'/image'
        }
      },
      '/roleoperation':{
        target:'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite:{
          '^/roleoperation':'/roleoperation'
        }
      },
      '/roleuser':{
        target:'http://192.168.1.154:9000',
        changeOrigin: true,
        pathRewrite:{
          '^/roleuser':'/roleuser'
        }
      },*/
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
