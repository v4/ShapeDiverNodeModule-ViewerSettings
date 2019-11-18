"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Setting_1 = require("./Setting");
class BaseSettings {
    // #endregion Properties (2)
    // #region Public Accessors (3)
    get settings() {
        return this._settings;
    }
    set settings(settings) {
        this._settings = settings;
    }
    get version() {
        return this._version;
    }
    // #endregion Public Accessors (3)
    // #region Public Methods (4)
    getSettingDefinitions() {
        let obj = {};
        this._getSettingDefinitions(this._settings, obj, '');
        return obj;
    }
    getSettingObject(key) {
        let levels = key.split('.');
        let obj = this._settings;
        for (let i = 0; i < levels.length; i++) {
            obj = obj[levels[i]];
            if (obj instanceof Setting_1.Setting && i < levels.length - 1) {
                obj = obj.value;
            }
            else if (obj instanceof Setting_1.Setting) {
                return obj;
            }
            else if (!obj) {
                return;
            }
        }
        return;
    }
    getSettings() {
        let obj = {};
        this._getSettings(this._settings, obj, '');
        return obj;
    }
    toJSON() {
        return this._toJSON(this._settings);
    }
    // #endregion Public Abstract Methods (2)
    // #region Protected Methods (2)
    _fromJSON(settingsJSON, iterable) {
        if (!settingsJSON)
            return;
        for (let s in iterable) {
            if (iterable[s] instanceof Setting_1.Setting) {
                let setting = iterable[s];
                if (setting.persistent) {
                    let settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
                    if (settingChildren.length !== 0 && settingChildren[0] instanceof Setting_1.Setting) {
                        this._fromJSON(settingsJSON[s], iterable[s].value);
                    }
                    else {
                        if (settingsJSON[s] !== undefined)
                            iterable[s].value = settingsJSON[s];
                    }
                }
            }
            else {
                this._fromJSON(settingsJSON[s], iterable[s]);
            }
        }
    }
    _toJSON(iterable) {
        let objJSON = {};
        for (let s in iterable) {
            if (iterable[s] instanceof Setting_1.Setting) {
                let setting = iterable[s];
                if (setting.persistent) {
                    let settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
                    if (settingChildren.length !== 0 && settingChildren[0] instanceof Setting_1.Setting) {
                        objJSON[s] = this._toJSON(iterable[s].value);
                    }
                    else {
                        objJSON[s] = iterable[s].value;
                    }
                }
            }
            else if (iterable[s] instanceof String || typeof iterable[s] === 'string') {
                objJSON[s] = iterable[s];
            }
            else {
                objJSON[s] = this._toJSON(iterable[s]);
            }
        }
        return objJSON;
    }
    // #endregion Protected Methods (2)
    // #region Private Methods (2)
    _getSettingDefinitions(iterable, obj, path) {
        let parentPath = path ? path + '.' : '';
        for (let s in iterable) {
            if (iterable[s] instanceof Setting_1.Setting) {
                let setting = iterable[s];
                let settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
                if (settingChildren.length !== 0 && settingChildren[0] instanceof Setting_1.Setting) {
                    if (iterable[s].desc) {
                        obj[parentPath + s] = {};
                        obj[parentPath + s].descripton = iterable[s].desc;
                        if (typeof iterable[s].type === 'string' || iterable[s].type instanceof String)
                            obj[parentPath + s].type = iterable[s].type;
                    }
                    this._getSettingDefinitions(iterable[s].value, obj, parentPath + s);
                }
                else {
                    if (iterable[s].desc) {
                        obj[parentPath + s] = {};
                        obj[parentPath + s].descripton = iterable[s].desc;
                        if (typeof iterable[s].type === 'string' || iterable[s].type instanceof String)
                            obj[parentPath + s].type = iterable[s].type;
                    }
                }
            }
            else if (!(iterable[s] instanceof String || typeof iterable[s] === 'string')) {
                this._getSettingDefinitions(iterable[s], obj, parentPath + s);
            }
        }
    }
    _getSettings(iterable, obj, path) {
        let parentPath = path ? path + '.' : '';
        for (let s in iterable) {
            if (iterable[s] instanceof Setting_1.Setting) {
                let setting = iterable[s];
                if (setting.persistent) {
                    let settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
                    if (settingChildren.length !== 0 && settingChildren[0] instanceof Setting_1.Setting) {
                        this._getSettings(iterable[s].value, obj, parentPath + s);
                    }
                    else {
                        obj[parentPath + s] = iterable[s].value;
                    }
                }
            }
            else if (iterable[s] instanceof String || typeof iterable[s] === 'string') {
                obj[parentPath + s] = iterable[s];
            }
            else {
                this._getSettings(iterable[s], obj, parentPath + s);
            }
        }
    }
}
exports.BaseSettings = BaseSettings;
