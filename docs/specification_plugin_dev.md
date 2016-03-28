### 插件开发规范
1. 使用es6 Module作为模块化开发规范；
2. `export`务必不要使用`default`，统一使用如下方式`export const 模块名`;
3. 模块名命名规范：`mod_模块名`。比如`mod_timing`；
4. 一个模块包括两部分：`name`和`fn`。模块以object类型导出。