// postcss.config.js
const url = require('postcss-url');
module.exports = {
    plugins: {
        postcss: {
            plugins: [
                url({
                    url: (asset) => {
                        // 字体文件使用cdn
                        if (asset.absolutePath.indexOf('ionicons') != -1) {
                            var u = asset.absolutePath.substring(asset.absolutePath.lastIndexOf('/') + 1);
                            return `https://cdn.bootcdn.net/ajax/libs/ionicons/3.0.0/fonts/${u}`
                        }
                        return asset.url;
                    },
                    fallback: 'copy'
                }),
            ],
        }
    },
}