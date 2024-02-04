function replace_font(){

    return {
        postcssPlugin: 'postcss-replace-font',

          AtRule(atRule, postcss) {
            // 可以快速访问css如@media，@import等@定义的节点（type为atRule）
            if (!atRule.nodes)return


            for(let i =0;i<atRule.nodes.length;i++){
                let at = atRule.nodes[i];
                if(at.prop=='src'){
                    at.value = 'url("https://element.eleme.io/static/element-icons.535877f.woff") format("woff2")'
                }

            }

        }
    }
}

export default{
    plugins: {
        postcss: {
            plugins: [
                replace_font(),
            ],
        }
    },
}