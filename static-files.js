const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');

// url：类似'/static/'
// dir：类似__dirname + '/static'
function staticFiles(url, dir) {
    return async (ctx, next) => {
        let rpath = ctx.request.path;
        // 判断是否以指定的url开头
        if(rpath.startsWith(url)){
            // 获取完整的路径
            let fp = path.join(dir, rpath.substring(url.length));
            // 判断文件是否存在
            if(await fs.exists(fp)){
                // 查找文件的mime
                ctx.response.type = mime.lookup(rpath);
                ctx.response.body = await fs.readFile(fp);
            }else{
                ctx.response.status = 404;
            }
        }else{
            // 不是指定前缀的URL继续处理下一个middleware
            await next();
        }
    }
}

module.exports = staticFiles;