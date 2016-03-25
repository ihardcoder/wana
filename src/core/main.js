export const WA = {
    modules: [],
    data: {},
    create: function() {
        const _this = this;
        _this.data = {};
        return _this;
    },
    send: function() {

    },
    set: function() {

    },
    // 创建插件API
    use: function(name, fn) {
        let _this = this;
        if (!name || !fn || typeof fn !== 'function') {
            return;
        }
        _this.modules.push(name);
        _this.data[name] = fn.call(_this);
    }
};