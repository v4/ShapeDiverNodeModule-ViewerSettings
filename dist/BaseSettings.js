import { Setting } from "./Setting";
var BaseSettings = /** @class */ (function () {
    function BaseSettings() {
    }
    Object.defineProperty(BaseSettings.prototype, "settings", {
        // #endregion Properties (2)
        // #region Public Accessors (3)
        get: function () {
            return this._settings;
        },
        set: function (settings) {
            this._settings = settings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseSettings.prototype, "version", {
        get: function () {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    // #endregion Public Accessors (3)
    // #region Public Methods (4)
    BaseSettings.prototype.getSettingDefinitions = function () {
        var obj = {};
        this._getSettingDefinitions(this._settings, obj, '');
        return obj;
    };
    BaseSettings.prototype.getSettingObject = function (key) {
        var levels = key.split('.');
        var obj = this._settings;
        for (var i = 0; i < levels.length; i++) {
            obj = obj[levels[i]];
            if (obj instanceof Setting && i < levels.length - 1) {
                obj = obj.value;
            }
            else if (obj instanceof Setting) {
                return obj;
            }
            else if (!obj) {
                return;
            }
        }
        return;
    };
    BaseSettings.prototype.getSettings = function () {
        var obj = {};
        this._getSettings(this._settings, obj, '');
        return obj;
    };
    BaseSettings.prototype.toJSON = function () {
        return this._toJSON(this._settings);
    };
    // #endregion Public Abstract Methods (2)
    // #region Protected Methods (2)
    BaseSettings.prototype._fromJSON = function (settingsJSON, iterable) {
        if (!settingsJSON)
            return;
        for (var s in iterable) {
            if (iterable[s] instanceof Setting) {
                var setting = iterable[s];
                var settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
                if (settingChildren.length !== 0 && settingChildren[0] instanceof Setting) {
                    this._fromJSON(settingsJSON[s], iterable[s].value);
                }
                else {
                    if (settingsJSON[s] !== undefined)
                        iterable[s].value = settingsJSON[s];
                }
            }
            else {
                this._fromJSON(settingsJSON[s], iterable[s]);
            }
        }
    };
    BaseSettings.prototype._toJSON = function (iterable) {
        var objJSON = {};
        for (var s in iterable) {
            if (iterable[s] instanceof Setting) {
                var setting = iterable[s];
                if (setting.persistent) {
                    var settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
                    if (settingChildren.length !== 0 && settingChildren[0] instanceof Setting) {
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
    };
    // #endregion Protected Methods (2)
    // #region Private Methods (2)
    BaseSettings.prototype._getSettingDefinitions = function (iterable, obj, path) {
        var parentPath = path ? path + '.' : '';
        for (var s in iterable) {
            if (iterable[s] instanceof Setting) {
                var setting = iterable[s];
                var settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
                if (settingChildren.length !== 0 && settingChildren[0] instanceof Setting) {
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
    };
    BaseSettings.prototype._getSettings = function (iterable, obj, path) {
        var parentPath = path ? path + '.' : '';
        for (var s in iterable) {
            if (iterable[s] instanceof Setting) {
                var setting = iterable[s];
                if (setting.persistent) {
                    var settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
                    if (settingChildren.length !== 0 && settingChildren[0] instanceof Setting) {
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
    };
    return BaseSettings;
}());
export { BaseSettings };
