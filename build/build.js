const fsp = require('fs-promise');
const modConf = require(__dirname + '/../conf/modules.config.js');
const webpack = require('webpack');
const webpackConf = require('./conf/webpack.config.js');
const path = require('path');

const invisibleFileReg = /^\./;
const tmpdir = path.join(__dirname, '/../.tmp');
const releasedir = path.join(__dirname,'/../release');

fsp.mkdirs(tmpdir).then(function(){
    fsp.emptydir(tmpdir);
}).then(function(){
    return fsp.readdir(path.join(__dirname, '/../src/modules/'));
}).then(function(files) {
    // 分析module目录并生成map数据
    console.log("Analysing modules...");
    const modulesMap = {};
    files.forEach(function(file, index) {
        if (!invisibleFileReg.test(file)) {
            modulesMap[file] = '../src/modules/' + file;
        }
    });
    return modulesMap;
}).then(function(modulesMap) {
    console.log("generating main files...");
    const syncModules = modConf.sync;
    // 分别对应同步和异步的入口文件
    const syncIndex = path.join(tmpdir,'./index.sync.js'),
        asyncIndex = path.join(tmpdir,'./index.async.js');
    // 分别对应同步和异步文件的数据内容
    const syncContent = [],
        asyncContent = [];

    syncContent.push('//main.js with Synchronous modules all in one');
    syncContent.push('import {WA} from \'../src/core/main.js\';');
    syncContent.push('export const wa = WA.create();');
    asyncContent.push('//main.js with Asynchronous modules all in one');

    for (mod in modulesMap) {
        if (syncModules.indexOf(mod) !== -1) {
            syncContent.push('import { mod_' + mod + ' as ' + mod + '} from \'' + modulesMap[mod] + '\';');
            syncContent.push('wa.use(' + mod + '.name,' + mod + '.fn' + ');');
        } else {
            asyncContent.push('import { mod_' + mod + ' as ' + mod + ' } from \'' + modulesMap[mod] + '\';');
            asyncContent.push('wa.use(' + mod + '.name,' + mod + '.fn' + ');');
        }
    }
    fsp.writeFileSync(syncIndex, syncContent.join('\n'));
    fsp.writeFileSync(asyncIndex, asyncContent.join('\n'));
}).then(function(){
    fsp.emptydir(releasedir);
}).then(function() {
    webpack(webpackConf).run(function(err, stats) {
        console.log('builded successed');
    });
});