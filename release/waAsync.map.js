{"version":3,"sources":["webpack:///webpack/universalModuleDefinition?5ca6","webpack:///webpack/bootstrap fa955d85b78f562c9b52?7cee","webpack:///./src/index.async.js","webpack:///./src/modules/jsexception/index.js"],"names":[],"mappings":"AAAA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA,CAAC;AACD,O;ACVA;AACA;;AAEA;AACA;;AAEA;AACA;AACA;;AAEA;AACA;AACA,uBAAe;AACf;AACA;AACA;;AAEA;AACA;;AAEA;AACA;;AAEA;AACA;AACA;;;AAGA;AACA;;AAEA;AACA;;AAEA;AACA;;AAEA;AACA;;;;;;;;;ACrCA;;AACA,IAAG,GAAH,CAAO,6BAAY,IAAZ,EAAiB,6BAAY,EAAZ,CAAxB,gD;;;;;;;;;;;;;;;ACDO,KAAM,4CAAkB;AAC3B,WAAM,aAAN;AACA,aAAQ,MAAR;AACA,SAAI,cAAU;AACV,iBAAQ,GAAR,CAAY,uBAAZ,EADU;MAAV;EAHK,C","file":"waAsync.js","sourcesContent":["(function webpackUniversalModuleDefinition(root, factory) {\n\tif(typeof exports === 'object' && typeof module === 'object')\n\t\tmodule.exports = factory();\n\telse if(typeof define === 'function' && define.amd)\n\t\tdefine([], factory);\n\telse {\n\t\tvar a = factory();\n\t\tfor(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];\n\t}\n})(this, function() {\nreturn \n\n\n/** WEBPACK FOOTER **\n ** webpack/universalModuleDefinition\n **/"," \t// The module cache\n \tvar installedModules = {};\n\n \t// The require function\n \tfunction __webpack_require__(moduleId) {\n\n \t\t// Check if module is in cache\n \t\tif(installedModules[moduleId])\n \t\t\treturn installedModules[moduleId].exports;\n\n \t\t// Create a new module (and put it into the cache)\n \t\tvar module = installedModules[moduleId] = {\n \t\t\texports: {},\n \t\t\tid: moduleId,\n \t\t\tloaded: false\n \t\t};\n\n \t\t// Execute the module function\n \t\tmodules[moduleId].call(module.exports, module, module.exports, __webpack_require__);\n\n \t\t// Flag the module as loaded\n \t\tmodule.loaded = true;\n\n \t\t// Return the exports of the module\n \t\treturn module.exports;\n \t}\n\n\n \t// expose the modules object (__webpack_modules__)\n \t__webpack_require__.m = modules;\n\n \t// expose the module cache\n \t__webpack_require__.c = installedModules;\n\n \t// __webpack_public_path__\n \t__webpack_require__.p = \"\";\n\n \t// Load entry module and return exports\n \treturn __webpack_require__(0);\n\n\n\n/** WEBPACK FOOTER **\n ** webpack/bootstrap fa955d85b78f562c9b52\n **/","//main.js with Asynchronous modules all in one\nimport { mod_jsexception as jsexception } from './modules/jsexception';\nwa.use(jsexception.name,jsexception.fn);\n\n\n/** WEBPACK FOOTER **\n ** ./src/index.async.js\n **/","// import { exTypes } from \"../../core/constants\";\nexport const mod_jsexception = {\n    name: 'jsexception',\n    exType: 'sync',\n    fn: function(){\n        console.log('this is a sync module');\n    }\n}\n\n\n/** WEBPACK FOOTER **\n ** ./src/modules/jsexception/index.js\n **/"],"sourceRoot":""}