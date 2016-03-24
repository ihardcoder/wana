const fsp = require('fs-promise');
const modConf = require(__dirname + '/../conf/modules.config.js');
const webpack = require('webpack');
const webpackConf = require('./conf/webpack.config.js');

const invisibleFileReg = /^\./;

fsp.readdir(__dirname + '/../src/modules/').then(function(files) {
    // 分析module目录并生成map数据
    console.log("Analysing modules...");
    const modulesMap = {};
    files.forEach(function(file, index) {
        if (!invisibleFileReg.test(file)) {
            modulesMap[file] = './modules/' + file;
        }
    });
    return modulesMap;
}).then(function(modulesMap) {
    // 将map数据写入modules.mapping.js文件
    console.log("generating modules mapping file...");
    fsp.writeFile(__dirname + '/../conf/modules.mapping.js', JSON.stringify(modulesMap));
    return modulesMap;
}).then(function(modulesMap) {
    console.log("generating main files...");
    const syncModules = modConf.sync;
    // 分别对应同步和异步的入口文件
    const syncIndex = __dirname + '/../src/index.sync.js',
        asyncIndex = __dirname + '/../src/index.async.js';
    // 分别对应同步和异步文件的数据内容
    const syncContent = [],
        asyncContent = [];

    syncContent.push('//main.js with Synchronous modules all in one');
    syncContent.push('import {WA} from \'./core/main.js\';');
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
}).then(function() {
    webpack(webpackConf).run(function(err, stats) {
        console.log(stats.toJson());
    });
});