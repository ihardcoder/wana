import {Tracker} from './tracker.js';
import { * as Utils} from '../utils/index.js';

const TRACKMOD = 'singleton';

export const wana = function(win.doc) {
    const _win = win,
        _doc = doc;
    // 正则是否为指定tracker API调用
    const Reg_isSpecificTracker = /^[a-zA-Z]+\d*\.[a-z]+\w*$/;
    // 正则是否为默认tracker API调用
    const Reg_isDefautTracker = /[a-z]+\w*$/;
    // 正则是否为合法的trackerName
    const Reg_isTrackerName = /^[a-zA-Z]+\d*\w$/;

    // let trackers = {};
    // let modules = {};
    /**
     * 入口函数，根据command分发行为
     * @param {String} command - 行为命令
     * 1. null||undefined||create:创建或返回默认跟踪器
     * 2. 'use':创建功能插件
     * 3. '[tracker].set':设置匹配键值对
     * 4. 'send':发送数据
     */
    const wana = function(command, options) {
        switch (command) {
            case 'create':
                if (TRACKMOD === 'singleton') {
                    // 目前只全局只提供一个tracker
                    return trackers.default || trackers.default = new Tracker(options);
                } else {
                    // @todo 后续开发版本可以考虑多实例模式
                    if (options && options.trackerName && Reg_isTrackerName.test(options.trackerName)) {
                        return trackers[options.trackerName] || trackers[options.trackerName] = new Tracker(options);
                    }
                }
                break;
            case 'send':
                send(options);
                break;
            case 'use':
                use(options);
                break;
            case Reg_isSpecificTracker.test(command):
                let _command = command.split('.');
                if (TRACKMOD === 'singleton') {
                    if (trackers.default) {
                        trackers.default[command[1]](options);
                    } else {
                        throw new Error('You must create a tracker before manipulate it');
                    }
                } else {
                    if (!tracker[_command[0]]) {
                        throw new Error('The specific tracker has not been created');
                    } else {
                        if (!trackers[_command[0]][_command[1]]) {
                            throw new Error('The specific method is not tracker\'s API');
                        } else {
                            trackers[_command[0]][_command[1]](options);
                        }
                    }
                }
                break;
            case Reg_isDefautTracker.test(command):
                if (trackers.default) {
                    trackers.default[command](options);
                } else {
                    throw new Error('You must create a tracker before manipulate it');
                }
                break;
            default:
                return trackers.default || trackers.default = new Tracker(options);
                break;
        }
    };

    /**
     * 发送数据
     * @param {Object} options-配置选项
     * @param {String} options.module - 发送类型：all（默认）-全部发送；<module>-具体的数据指标，比如timing
     * @param {Object} options.data - 数据
     */
    const send = function(options) {
        let _data = options.data;
        if (!_data || Utils.isEmptyObj(_data)) {
            return false;
        }
        let _module = options.module || 'all';
        if (_module === 'all') {
            for (let _tracker in trackers) {
                _tracker.send(_data);
            }
        } else {
            if (!trackers[_module]) {
                throw new Error('The specific tracker has not been created');
            } else {
                trackers[_module].send(_data);
            }
        }
    };
    /**
     * 使用插件
     * @param {Object} options-配置选项
     */
    const use = function(options) {
        if (!options || !options.name || !options.fn) {
            throw new Error('Wrong parameters!');
            return;
        }
        modules[options.name] = options.fn;
        let _data = options.fn();
        tracker.default.set(_data);
    };

};