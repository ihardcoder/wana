### 插件开发规范
1. 根据统计功能，插件分为两种：前置执行插件和后置执行插件；
2. 前置执行插件（比如js异常的统计功能）需要与主文件同步（sync）部署在html文档的head中；
3. 后置执行插件（比如使用performanceAPI统计数据）全部异步（async）加载；
4. 修改`conf/modules.config.js`文件，将前置执行插件添加到`sync`数组中；将后置执行插件添加到`async`数组中。