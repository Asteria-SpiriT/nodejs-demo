const fs = require('fs');

function addControllers(router, dir) {
    let files = fs.readdirSync(__dirname + '/' + dir);
    let js_files = files.filter( item => {
        return item.endsWith('.js');
    });
    let path_dir = dir || 'controllers';
    for(var f of js_files){
        let mapping = require(__dirname + '/' + path_dir +'/' + f);
        addMapping(router, mapping);
    }
}

function addMapping(router, mapping) {
    for(var url in mapping){
        if(url.startsWith('GET /')){
            let path = url.substring(4);
            router.get(path, mapping[url]);
        }else if(url.startsWith('POST /')){
            let path = url.substring(5);
            router.post(path, mapping[url]);
        }else{
            console.log(`Invalid url: ${url}`);
        }
    }
}

module.exports = function(dir){
    let controller_dir = dir || 'controllers',
        router = require('koa-router')();
    addControllers(router, controller_dir);
    return router.routes();
}