/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/BaseSettings.ts":
/*!*****************************!*\
  !*** ./src/BaseSettings.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Setting_1 = __webpack_require__(/*! ./Setting */ "./src/Setting.ts");
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
            if (iterable[s] instanceof Setting_1.Setting) {
                var setting = iterable[s];
                if (setting.persistent) {
                    var settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
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
    };
    BaseSettings.prototype._toJSON = function (iterable) {
        var objJSON = {};
        for (var s in iterable) {
            if (iterable[s] instanceof Setting_1.Setting) {
                var setting = iterable[s];
                if (setting.persistent) {
                    var settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
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
    };
    // #endregion Protected Methods (2)
    // #region Private Methods (2)
    BaseSettings.prototype._getSettingDefinitions = function (iterable, obj, path) {
        var parentPath = path ? path + '.' : '';
        for (var s in iterable) {
            if (iterable[s] instanceof Setting_1.Setting) {
                var setting = iterable[s];
                var settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
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
    };
    BaseSettings.prototype._getSettings = function (iterable, obj, path) {
        var parentPath = path ? path + '.' : '';
        for (var s in iterable) {
            if (iterable[s] instanceof Setting_1.Setting) {
                var setting = iterable[s];
                if (setting.persistent) {
                    var settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
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
    };
    return BaseSettings;
}());
exports.BaseSettings = BaseSettings;


/***/ }),

/***/ "./src/Setting.ts":
/*!************************!*\
  !*** ./src/Setting.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var Setting = /** @class */ (function () {
    // #region Constructors (1)
    function Setting(_value, _type, _desc, _persistent) {
        if (_persistent === void 0) { _persistent = true; }
        this._value = _value;
        this._type = _type;
        this._desc = _desc;
        this._persistent = _persistent;
    }
    Object.defineProperty(Setting.prototype, "desc", {
        // #endregion Constructors (1)
        // #region Public Accessors (5)
        get: function () {
            return this._desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Setting.prototype, "persistent", {
        get: function () {
            return this._persistent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Setting.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Setting.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            this._value = v;
        },
        enumerable: true,
        configurable: true
    });
    return Setting;
}());
exports.Setting = Setting;


/***/ }),

/***/ "./src/SettingsConversion.ts":
/*!***********************************!*\
  !*** ./src/SettingsConversion.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SettingsVersion_1 = __webpack_require__(/*! ./SettingsVersion */ "./src/SettingsVersion.ts");
var Settings_1 = __webpack_require__(/*! ./versions/1.0/Settings */ "./src/versions/1.0/Settings.ts");
var Settings_2 = __webpack_require__(/*! ./versions/2.0/Settings */ "./src/versions/2.0/Settings.ts");
var SettingsConversion = /** @class */ (function () {
    // #endregion Properties (2)
    // #region Constructors (1)
    function SettingsConversion() {
        // #region Properties (2)
        this._settingsVersions = [];
        this._versions = {
            '1.0': Settings_1.Settings,
            '2.0': Settings_2.Settings
        };
        for (var _i = 0, _a = Object.keys(this._versions); _i < _a.length; _i++) {
            var k = _a[_i];
            this._settingsVersions.push(new this._versions[k]());
        }
    }
    // #endregion Constructors (1)
    // #region Public Methods (2)
    SettingsConversion.prototype.convert = function (settingsJSON, version) {
        var settings = this.createSettingsObject(settingsJSON);
        var currentVersion = settings.version, requiredVersion = new SettingsVersion_1.SettingsVersion(version);
        var indexCurrent = this._findVersionIndex(currentVersion);
        var indexRequired = this._findVersionIndex(requiredVersion);
        if (indexCurrent === -1 || indexRequired === -1)
            return settings.toJSON();
        var convertedSettings = settings;
        if (indexCurrent < indexRequired) {
            while (indexCurrent < indexRequired) {
                indexCurrent += 1;
                convertedSettings = new this._versions[this._settingsVersions[indexCurrent].version.toString()]().convertFromPreviousVersion(settings);
            }
        }
        else if (indexCurrent > indexRequired) {
            while (indexCurrent > indexRequired) {
                indexCurrent -= 1;
                convertedSettings = convertedSettings.convertToPreviousVersion();
            }
        }
        return convertedSettings.toJSON();
    };
    SettingsConversion.prototype.createSettingsObject = function (settingsJSON) {
        if (!settingsJSON.settings_version)
            return new Settings_1.Settings(settingsJSON);
        var version = new SettingsVersion_1.SettingsVersion(settingsJSON.settings_version);
        return new this._versions[version.toString()](settingsJSON);
    };
    // #endregion Public Methods (2)
    // #region Private Methods (1)
    SettingsConversion.prototype._findVersionIndex = function (version) {
        var v = new SettingsVersion_1.SettingsVersion(version.toString());
        for (var i = 0; i < this._settingsVersions.length; i++)
            if (this._settingsVersions[i].version.equalTo(v))
                return i;
        v.versionLevels[v.versionLevels.length - 1] = 0;
        for (var i = 0; i < this._settingsVersions.length; i++)
            if (this._settingsVersions[i].version.equalTo(v))
                return i;
        return -1;
    };
    return SettingsConversion;
}());
exports.SettingsConversion = SettingsConversion;


/***/ }),

/***/ "./src/SettingsVersion.ts":
/*!********************************!*\
  !*** ./src/SettingsVersion.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SettingsVersion = /** @class */ (function () {
    // #endregion Properties (1)
    // #region Constructors (1)
    function SettingsVersion(version) {
        if (version === void 0) { version = '1.0'; }
        // #region Properties (1)
        this._versionLevels = [];
        var splitArray = version.split('.');
        for (var n in splitArray)
            this._versionLevels.push(+splitArray[n]);
    }
    Object.defineProperty(SettingsVersion.prototype, "versionLevels", {
        // #endregion Constructors (1)
        // #region Public Accessors (1)
        get: function () {
            return this._versionLevels;
        },
        enumerable: true,
        configurable: true
    });
    // #endregion Public Accessors (1)
    // #region Public Methods (3)
    SettingsVersion.prototype.equalTo = function (v) {
        if (v.versionLevels.length !== this._versionLevels.length)
            return false;
        for (var i = 0; i < this._versionLevels.length; i++)
            if (v.versionLevels[i] !== this._versionLevels[i])
                return false;
        return true;
    };
    SettingsVersion.prototype.isLowerThan = function (v) {
        for (var i = 0; i < this._versionLevels.length; i++) {
            if (this._versionLevels[i] > v.versionLevels[i]) {
                return false;
            }
            else if (this._versionLevels[i] < v.versionLevels[i]) {
                return true;
            }
        }
        return false;
    };
    SettingsVersion.prototype.toString = function () {
        return this._versionLevels.join('.');
    };
    return SettingsVersion;
}());
exports.SettingsVersion = SettingsVersion;


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var SettingsConversion_1 = __webpack_require__(/*! ./SettingsConversion */ "./src/SettingsConversion.ts");
exports.SettingsConversion = SettingsConversion_1.SettingsConversion;
var Settings_1 = __webpack_require__(/*! ./versions/1.0/Settings */ "./src/versions/1.0/Settings.ts");
exports.Settings_1_0 = Settings_1.Settings;
var Settings_2 = __webpack_require__(/*! ./versions/2.0/Settings */ "./src/versions/2.0/Settings.ts");
exports.Settings_2_0 = Settings_2.Settings;


/***/ }),

/***/ "./src/versions/1.0/Settings.ts":
/*!**************************************!*\
  !*** ./src/versions/1.0/Settings.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var SettingsVersion_1 = __webpack_require__(/*! ../../SettingsVersion */ "./src/SettingsVersion.ts");
var Setting_1 = __webpack_require__(/*! ../../Setting */ "./src/Setting.ts");
var BaseSettings_1 = __webpack_require__(/*! ../../BaseSettings */ "./src/BaseSettings.ts");
var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    // #endregion Properties (1)
    // #region Constructors (1)
    /**
     *
     * @param settingsObject a settings object that is a JSON representation of this SettingsObject
     */
    function Settings(settingsJSON) {
        var _this = _super.call(this) || this;
        _this._version = new SettingsVersion_1.SettingsVersion('1.0');
        _this._settings = {
            build_date: new Setting_1.Setting('', function (v) { return true; }),
            build_version: new Setting_1.Setting('', function (v) { return true; }),
            settings_version: new Setting_1.Setting('1.0', function (v) { return true; }),
            ambientOcclusion: new Setting_1.Setting(true, function (v) { return true; }),
            autoRotateSpeed: new Setting_1.Setting(0.0, function (v) { return true; }),
            bumpAmplitude: new Setting_1.Setting(1.0, function (v) { return true; }),
            camera: new Setting_1.Setting({
                position: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, function (v) { return true; }),
                target: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, function (v) { return true; }),
            }, function (v) { return true; }),
            cameraAutoAdjust: new Setting_1.Setting(false, function (v) { return true; }),
            cameraMovementDuration: new Setting_1.Setting(0, function (v) { return true; }),
            cameraOrtho: new Setting_1.Setting({
                position: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, function (v) { return true; }),
                target: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, function (v) { return true; }),
            }, function (v) { return true; }),
            cameraRevertAtMouseUp: new Setting_1.Setting(false, function (v) { return true; }),
            clearAlpha: new Setting_1.Setting(1.0, function (v) { return true; }),
            clearColor: new Setting_1.Setting('#ffffff', function (v) { return true; }),
            commitParameters: new Setting_1.Setting(false, function (v) { return true; }),
            controlDamping: new Setting_1.Setting(0.1, function (v) { return true; }),
            controlNames: new Setting_1.Setting(null, function (v) { return function (v) { return true; }; }),
            controlOrder: new Setting_1.Setting(null, function (v) { return function (v) { return true; }; }),
            defaultMaterialColor: new Setting_1.Setting('#d3d3d3', function (v) { return true; }),
            disablePan: new Setting_1.Setting(false, function (v) { return true; }),
            disableZoom: new Setting_1.Setting(false, function (v) { return true; }),
            enableAutoRotate: new Setting_1.Setting(false, function (v) { return true; }),
            enableRotation: new Setting_1.Setting(true, function (v) { return true; }),
            environmentMap: new Setting_1.Setting('none', function (v) { return true; }),
            environmentMapResolution: new Setting_1.Setting('1024', function (v) { return true; }),
            fov: new Setting_1.Setting(45, function (v) { return true; }),
            lightScene: new Setting_1.Setting('default', function (v) { return true; }),
            lightScenes: new Setting_1.Setting(null, function (v) { return true; }),
            panSpeed: new Setting_1.Setting(0.5, function (v) { return true; }),
            parametersHidden: new Setting_1.Setting(null, function (v) { return function (v) { return true; }; }),
            pointSize: new Setting_1.Setting(1.0, function (v) { return true; }),
            revertAtMouseUpDuration: new Setting_1.Setting(800, function (v) { return true; }),
            rotateSpeed: new Setting_1.Setting(0.25, function (v) { return true; }),
            showEnvironmentMap: new Setting_1.Setting(false, function (v) { return true; }),
            showGrid: new Setting_1.Setting(false, function (v) { return true; }),
            showGroundPlane: new Setting_1.Setting(false, function (v) { return true; }),
            showShadows: new Setting_1.Setting(true, function (v) { return true; }),
            topView: new Setting_1.Setting(false, function (v) { return true; }),
            zoomExtentFactor: new Setting_1.Setting(1.0, function (v) { return true; }),
            zoomSpeed: new Setting_1.Setting(1.0, function (v) { return true; }),
        };
        if (settingsJSON) {
            if ((!settingsJSON.clearAlpha || !settingsJSON.clearColor) && settingsJSON.backgroundColor && typeof settingsJSON.backgroundColor === 'string') {
                settingsJSON.clearAlpha = settingsJSON.backgroundColor.substring(0, 8);
                settingsJSON.clearColor = settingsJSON.backgroundColor.substring(8);
            }
            if (settingsJSON.defaultMaterialColor && Array.isArray(settingsJSON.defaultMaterialColor)) {
                var temp = '#';
                for (var i = 0; i < settingsJSON.defaultMaterialColor.length; i++)
                    temp += Number(settingsJSON.defaultMaterialColor[i]).toString(16);
                settingsJSON.defaultMaterialColor = temp;
            }
            _this._fromJSON(settingsJSON, _this._settings);
        }
        return _this;
    }
    // #endregion Constructors (1)
    // #region Public Methods (2)
    Settings.prototype.convertFromPreviousVersion = function (oldSettings) {
        return this;
    };
    Settings.prototype.convertToPreviousVersion = function () {
        return this;
    };
    return Settings;
}(BaseSettings_1.BaseSettings));
exports.Settings = Settings;
;


/***/ }),

/***/ "./src/versions/2.0/Settings.ts":
/*!**************************************!*\
  !*** ./src/versions/2.0/Settings.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var SettingsVersion_1 = __webpack_require__(/*! ../../SettingsVersion */ "./src/SettingsVersion.ts");
var Setting_1 = __webpack_require__(/*! ../../Setting */ "./src/Setting.ts");
var Settings_1 = __webpack_require__(/*! ../1.0/Settings */ "./src/versions/1.0/Settings.ts");
var BaseSettings_1 = __webpack_require__(/*! ../../BaseSettings */ "./src/BaseSettings.ts");
//import typeChecks from "shapedivernodemodule-typechecks";
var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    // #endregion Properties (1)
    // #region Constructors (1)
    /**
     *
     * @param settingsObject a settings object that is a JSON representation of this SettingsObject
     */
    function Settings(settingsJSON) {
        var _this = _super.call(this) || this;
        _this._version = new SettingsVersion_1.SettingsVersion('2.0');
        _this._settings = {
            build_date: new Setting_1.Setting('', 'string', '', false),
            build_version: new Setting_1.Setting('', 'string', '', false),
            settings_version: new Setting_1.Setting('2.0', 'string', '', false),
            ar: {
                enableCameraSync: new Setting_1.Setting(false, 'boolean', 'Enable / disable synchronisation of the camera with AR tracking information. Enabling this will disable the orbit controls.', false),
                enableCameraSyncInitial: new Setting_1.Setting(false, 'boolean', 'Enable / disable the inital synchronisation of the camera with AR tracking information. Enabling this will disable the orbit controls.'),
                enableLightingEstimation: new Setting_1.Setting(true, 'boolean', 'Enable / disable automatic lighting estimation. Enabling this stores the current state of the lights which will get restored once automatic lighting estimation gets disabled again.'),
                enableTouchControls: new Setting_1.Setting(true, 'boolean', 'Enable / disable touch controls for placement of objects in the AR scene while AR camera synchronisation is enabled.'),
                enableTouchControlRotation: new Setting_1.Setting(true, 'boolean', 'Enable / disable rotation of objects in the AR scene by means of touch controls. Typically this should be enabled for objects to be placed horizontally.'),
                enableAutomaticPlacement: new Setting_1.Setting(true, 'boolean', 'Enable / disable initial automatic placement of objects in the AR scene as soon as plane anchors get detected. Automatic placement stops once the user starts to interact.'),
                defaultHitTestType: new Setting_1.Setting('existingPlaneUsingGeometry', function (value) { return ['featurePoint', 'estimatedHorizontalPlane', 'estimatedVerticalPlane', 'existingPlane', 'existingPlaneUsingExtent', 'existingPlaneUsingGeometry'].includes(value); }, 'Default type of feature to use for hit tests, used by touch controls. '),
            },
            // constructor: {
            //     useQueryStringParameters: new Setting(false, 'boolean', 'if true, the constructor tries to read settings from the query string, existing settings will not be overridden'),
            //     forceQueryStringParameters: new Setting(false, 'boolean', 'if true, the constructor tries to read settings from the query string existing settings will be overridden'),
            //     apiversion: new Setting('2', 'string', 'major version of the API to return by default'),
            //     runtimeId: new Setting('', 'string', 'runtimeId to set for returned API object, a random one will be chosen by default'),
            //     arkitbridge: new Setting(false, 'boolean', 'enable bridge to ShapeDiver iOS app using ARKit'),
            //     modelViewUrl: new Setting('us-east-1', 'string', 'optional model view url to pass to the default CommPlugin, a leading \'https://\' will be prefixed if not in place, \'us-east-1\' and \'eu-central-1\' may be used as abbreviations for ShapeDiver\'s default systems'),
            //     ticket: new Setting('' , 'string', 'optional model view ticket to be used for immediately instantiating a CommPlugin instance. No CommPlugin instance will be registered by the constructor if this is empty. Further CommPlugin instances can be initialized after the constructor has finished, using the API v2 function {@link module:ApiInterfaceV2~ApiPluginInterface#registerCommPluginAsync registerCommPluginAsync}.'),
            //     authorization: new Setting('', 'string', 'optional authorization token to include with requests to the model view interface (prepend \'Bearer \' yourself if necessary)'),
            //     iframeId: new Setting('sdv-iframe', 'string'),
            //     iframeDebugging: new Setting(false, 'boolean')
            // },
            // browserUI: {
            //     anchorElements: new Setting(true, 'boolean', 'choose whether the default handler for creating DOM elements representing anchors shall be instantiated'),
            //     brandedMode: new Setting(true, 'boolean', 'choose whether ShapeDiver branding shall be shown during initial loading'),
            //     brandedModeConsole: new Setting(null, 'any'),
            //     busyGraphic: new Setting('', 'string', 'optional URL to an image which shall be shown instead of the busy spinner'),
            //     containerControls: new Setting(undefined, 'any', 'optional container to use for creating parameter controls, may be undefined in which case a DOM element whose id is domElementIdPrefix+\'-controls\' will be looked for. Set this to a falsy value different from `undefined` to prevent the settings widget from being created. Not creating the settings and controls widgets saves some resources on loading of the viewer.'),
            //     containerSettings: new Setting(undefined, 'any', 'optional container to use for creating settings controls, may be `undefined` in which case a DOM element whose id is domElementIdPrefix+\'-settings\' will be looked for. Set this to a falsy value different from `undefined` to prevent the settings widget from being created. Not creating the settings and controls widgets saves some resources on loading of the viewer.'),
            //     createButtons: new Setting(true, 'boolean', 'choose whether standard buttons will be created for the viewport'),
            //     domElementIdPrefix: new Setting('sdv-container', 'string', 'prefix to use for lookup of dom elements'),
            //     editMode: new Setting(false, 'boolean', 'choose whether the parameter controls should be initialized in edit mode'),
            //     exportModal: new Setting(true, 'boolean', 'choose whether a modal dialog for export handling shall be instantiated'),
            //     showControlsButton: new Setting(true, 'boolean', 'choose whether a button for showing/hiding the parameter controls shall be shown'),
            //     showControlsInitial: new Setting(false, 'boolean', 'choose whether the parameter controls shall be shown initially'),
            //     showSettingsButton: new Setting(true, 'boolean', 'choose whether a button for showing/hiding the settings controls shall be shown'),
            //     showSettingsInitial: new Setting(false, 'boolean', 'choose whether the settings controls shall be shown initially'),
            //     showZoomButton: new Setting(true, 'boolean', 'choose whether a button for zooming shall be shown'),
            //     zoomButtonResetsCamera: new Setting(false, 'boolean', 'choose whether the zoom button shall reset the camera to its default position'),
            //     showFullscreenButton: new Setting(true, 'boolean', 'choose whether a button for to/from fullscreen mode shall be shown'),
            //     showInitialSpinner: new Setting(true, 'boolean', 'choose whether an initial loading spinner shall be shown'),
            //     showBusySpinner: new Setting(true, 'boolean', 'choose whether a busy mode spinner or the optional custom busyGraphic shall be shown'),
            //     viewportOverlays: new Setting(true, 'boolean', 'choose whether viewport overlays will be created at all (buttons, spinners, progress bar)'),
            // },
            defaultMaterial: {
                // name: new Setting('Default material', 'string', '', false),
                // version: new Setting('2.0', 'string', '', false),
                bumpAmplitude: new Setting_1.Setting(1, 'notnegative', 'Bump amplitude of the default material'),
                color: new Setting_1.Setting('#d3d3d3', 'string', 'Color of the default material'),
                metalness: new Setting_1.Setting(0.0, 'factor', 'Metalness of the default material'),
                roughness: new Setting_1.Setting(1.0, 'factor', 'Roughness of the default material'),
            },
            parameters: {
                controlOrder: new Setting_1.Setting([], 'stringarray', ''),
                controlNames: new Setting_1.Setting([], 'stringarray', ''),
                parametersHidden: new Setting_1.Setting([], 'stringarray', ''),
            },
            viewer: {
                blurSceneWhenBusy: new Setting_1.Setting(true, 'boolean', 'Blur or don\'t blur the scene while a process is busy'),
                // container: new Setting(undefined, 'any', 'Container to use for creating the viewport, may be undefined in which case a DOM element whose id is domElementIdPrefix+\'-viewport\' will be looked for. An array of containers may be passed to create multiple viewports. Pass an empty array to avoid creating a viewport.'),
                // deferGeometryLoading: new Setting(false, 'boolean', 'true: tell the CommPlugin instance created by the constructor to not load any geometry until first parameter update or refresh, false: load default geometry'),
                ignoreSuperseded: new Setting_1.Setting(true, 'boolean', 'Ignore intermediate solutions which at the time of their arrival have already been superseded by another customization request', false),
                loggingLevel: new Setting_1.Setting(-1, function (value) { return value >= -1 && value <= 3; }, 'Level of log messages shown on the console, allowed values: -1 (none), 0 (error), 1 (warn), 2 (info), 3 (debug)', false),
                // commPluginRuntimeId: new Setting('CommPlugin_1', 'string', 'runtime id to use for the CommPlugin instance created by the constructor'),
                messageLoggingLevel: new Setting_1.Setting(-1, function (value) { return value >= -1 && value <= 3; }, 'Log level to be used for logging internal messages, allowed values: -1 (none), 0 (error), 1 (warn), 2 (info), 3 (debug)', false),
                // strictMode: new Setting(false, 'boolean', '', false),
                showMessages: new Setting_1.Setting(true, 'boolean', 'Show or don\'t show user messages in the viewport', false),
                hasRestoredSettings: new Setting_1.Setting(false, 'boolean', 'True if settings have been restored from a settings object delivered by a CommPlugin', false),
                // exposeViewer: new Setting(false, 'boolean'),
                commitParameters: new Setting_1.Setting(false, 'boolean', 'Use or don\'t commit mode for parameters'),
                commitSettings: new Setting_1.Setting(false, 'boolean', 'Use or don\'t commit mode for settings'),
                viewerRuntimeId: new Setting_1.Setting('', 'string', 'The runtime id of this viewer', false),
                scene: {
                    show: new Setting_1.Setting(false, 'boolean', 'Show / hide the scene', false),
                    // showSceneMode: new Setting(2, (value: number) => value >= 0 && value <= 3, 'when to fade in the scene: ON_SHOW(1), ON_FIRST_PLUGIN(2), ON_ALL_PLUGINS(3)'),
                    showSceneTransition: new Setting_1.Setting('1s', 'string', ''),
                    camera: {
                        autoAdjust: new Setting_1.Setting(false, 'boolean', 'Enable / disable that the camera adjusts to geometry updates'),
                        cameraMovementDuration: new Setting_1.Setting(800, 'notnegative', 'Default duration of camera movements'),
                        cameraTypes: {
                            perspective: {
                                "default": new Setting_1.Setting({
                                    position: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, 'vector3any', 'Default position for the perspective camera'),
                                    target: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, 'vector3any', 'Default target for the perspective camera'),
                                }, function (value) { return true; }, 'Default position and target for the perspective camera'),
                                fov: new Setting_1.Setting(45, 'notnegative', 'Camera frustum vertical field of view angle, unit degree, interval [0,180]'),
                                controls: new Setting_1.Setting(0, function (value) { return value === 0 || value === 1; }, 'Set camera control type'),
                            },
                            orthographic: {
                                "default": new Setting_1.Setting({
                                    position: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, 'vector3any', 'Default position for the orthographic camera'),
                                    target: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, 'vector3any', 'Default target for the orthographic camera'),
                                }, function (value) { return true; }, 'Default position and target for the orthographic camera'),
                            },
                            active: new Setting_1.Setting(0, function (value) { return value >= 0 && value <= 6; }, 'Set camera type'),
                        },
                        controls: {
                            orbit: {
                                autoRotationSpeed: new Setting_1.Setting(0, 'number', 'Speed of autoration, can be negative, also refer to enableAutoRotation'),
                                damping: new Setting_1.Setting(0.1, 'notnegative', 'How much to damp camera movements by the user'),
                                enableAutoRotation: new Setting_1.Setting(false, 'boolean', 'Enable / disable automatic rotation of the camera, also refer to autoRotationSpeed'),
                                enableKeyPan: new Setting_1.Setting(false, 'boolean', 'Enable / disable panning using the keyboard, also refer to enablePan'),
                                enablePan: new Setting_1.Setting(true, 'boolean', 'Enable / disable panning in general, also refer to enableKeyPan'),
                                enableRotation: new Setting_1.Setting(true, 'boolean', 'Enable / disable camera rotation'),
                                enableZoom: new Setting_1.Setting(true, 'boolean', 'Enable / disable zooming'),
                                input: new Setting_1.Setting({ keys: { up: 38, down: 40, left: 37, right: 39 }, mouse: { rotate: 0, zoom: 1, pan: 2 }, touch: { rotate: 1, zoom: 2, pan: 3 }, }, 'any'),
                                keyPanSpeed: new Setting_1.Setting(0.5, 'factor', 'Speed of panning when using the keyboard'),
                                movementSmoothness: new Setting_1.Setting(0.5, 'factor', 'How much to the current movement is affected by the previous one'),
                                restrictions: {
                                    position: {
                                        cube: new Setting_1.Setting({
                                            min: new Setting_1.Setting({ x: -Infinity, y: -Infinity, z: -Infinity }, 'vector3any', 'Restriction of the camera position inside a cube, minimum corner of the cube'),
                                            max: new Setting_1.Setting({ x: Infinity, y: Infinity, z: Infinity }, 'vector3any', 'Restriction of the camera position inside a cube, maximum corner of the cube'),
                                        }, function (value) { return true; }, 'Restriction of the camera position inside a cube, minimum and maximum corner of the cube'),
                                        sphere: new Setting_1.Setting({
                                            center: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, 'vector3any', 'Restriction of the camera position inside a sphere, center of the sphere'),
                                            radius: new Setting_1.Setting(Infinity, 'notnegative', 'Restriction of the camera position inside a sphere, radius of the sphere'),
                                        }, function (value) { return true; }, 'Restriction of the camera position inside a sphere, center and radius of the sphere'),
                                    },
                                    target: {
                                        cube: new Setting_1.Setting({
                                            min: new Setting_1.Setting({ x: -Infinity, y: -Infinity, z: -Infinity }, 'vector3any', 'Restriction of the camera target inside a cube, minimum corner of the cube'),
                                            max: new Setting_1.Setting({ x: Infinity, y: Infinity, z: Infinity }, 'vector3any', 'Restriction of the camera target inside a cube, maximum corner of the cube'),
                                        }, function (value) { return true; }, 'Restriction of the camera target inside a cube, minimum and maximum corner of the cube'),
                                        sphere: new Setting_1.Setting({
                                            center: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, 'vector3any', 'Restriction of the camera target inside a sphere, center of the sphere'),
                                            radius: new Setting_1.Setting(Infinity, 'notnegative', 'Restriction of the camera target inside a sphere, radius of the sphere'),
                                        }, function (value) { return true; }, 'Restriction of the camera target inside a sphere, center and radius of the sphere'),
                                    },
                                    rotation: new Setting_1.Setting({
                                        minPolarAngle: new Setting_1.Setting(0, function (value) { return true; }, 'Minimum polar angle of the camera position with respect to the camera target, unit degree, interval [0,180]'),
                                        maxPolarAngle: new Setting_1.Setting(180, function (value) { return true; }, 'Maximum polar angle of the camera position with respect to the camera target, unit degree, interval [0,180]'),
                                        minAzimuthAngle: new Setting_1.Setting(-Infinity, 'number', 'Minimum azimuth angle of the camera position with respect to the camera target, unit degree, interval [-180,180]'),
                                        maxAzimuthAngle: new Setting_1.Setting(Infinity, 'number', 'Maximum azimuth angle of the camera position with respect to the camera target, unit degree, interval [-180,180]'),
                                    }, function (value) { return true; }, 'Minimum and maximum polar and azimuth angle of the camera position with respect to the camera target, unit degree'),
                                    zoom: new Setting_1.Setting({
                                        minDistance: new Setting_1.Setting(0, 'notnegative', 'Minimum distance between camera position and target'),
                                        maxDistance: new Setting_1.Setting(Infinity, 'notnegative', 'Maximum distance between camera position and target'),
                                    }, function (value) { return true; }, 'Minimum and maximum distance between camera position and target'),
                                },
                                rotationSpeed: new Setting_1.Setting(0.5, 'factor', 'Speed of camera rotation'),
                                panSpeed: new Setting_1.Setting(0.5, 'factor', 'Speed of panning'),
                                zoomSpeed: new Setting_1.Setting(0.5, 'factor', 'Speed of zooming'),
                            },
                            fps: {},
                            orthographic: {
                                damping: new Setting_1.Setting(0.1, 'notnegative', 'How much to damp camera movements by the user'),
                                enableKeyPan: new Setting_1.Setting(false, 'boolean', 'Enable / disable panning using the keyboard, also refer to enablePan'),
                                enablePan: new Setting_1.Setting(true, 'boolean', 'Enable / disable panning in general, also refer to enableKeyPan'),
                                enableZoom: new Setting_1.Setting(true, 'boolean', 'Enable / disable zooming'),
                                input: new Setting_1.Setting({ keys: { up: 38, down: 40, left: 37, right: 39 }, mouse: { rotate: 0, zoom: 1, pan: 2 }, touch: { rotate: 1, zoom: 2, pan: 3 } }, 'any'),
                                keyPanSpeed: new Setting_1.Setting(0.5, 'factor', 'Speed of panning when using the keyboard'),
                                movementSmoothness: new Setting_1.Setting(0.5, 'factor', 'How much to the current movement is affected by the previous one'),
                                panSpeed: new Setting_1.Setting(0.5, 'factor', 'Speed of panning'),
                                zoomSpeed: new Setting_1.Setting(0.5, 'factor', 'Speed of zooming'),
                            }
                        },
                        enableCameraControls: new Setting_1.Setting(true, 'boolean', 'Enable / disable camera controls'),
                        revertAtMouseUp: new Setting_1.Setting(false, 'boolean', 'Enable / disable if the mouse should reset on mouse up'),
                        revertAtMouseUpDuration: new Setting_1.Setting(800, 'notnegative', 'The duration of the transition of the revertAtMouseUp'),
                        zoomExtentsFactor: new Setting_1.Setting(1, 'number', 'Factor to apply to the bounding box before zooming to extents'),
                    },
                    duration: new Setting_1.Setting(0, 'notnegative', 'Set fade in / fade out duration'),
                    fullscreen: new Setting_1.Setting(false, 'boolean', 'Enable / disable fullscreen mode', false),
                    gridVisibility: new Setting_1.Setting(true, 'boolean', 'Show / hide the grid'),
                    groundPlaneReflectionThreshold: new Setting_1.Setting(0.01, 'notnegative', 'Allows to control the distance to objects that are still reflected by the groundplane'),
                    groundPlaneReflectionVisibility: new Setting_1.Setting(false, 'boolean', 'Enable / disable the reflectivity of the groundplane'),
                    groundPlaneVisibility: new Setting_1.Setting(true, 'boolean', 'Show / hide the ground plane'),
                    lights: {
                        helper: new Setting_1.Setting(false, 'boolean', 'Show / hide the light helpers'),
                        lightScene: new Setting_1.Setting('default', 'string'),
                        lightScenes: new Setting_1.Setting({}, 'any'),
                    },
                    material: {
                        environmentMap: new Setting_1.Setting('none', function (value) { return true; }, 'Name of the environment map to use, or an array of 6 image URLs making up the cube mapped environment map (px, nx, pz, nz, py, ny)'),
                        environmentMapAsBackground: new Setting_1.Setting(false, 'boolean', 'Show / hide the environment map in the background'),
                        environmentMapResolution: new Setting_1.Setting('1024', function (value) { return (['256', '512', '1024', '2048'].includes(value)); }, 'Image resolution to be used for the named environment maps (available resolutions: 256, 512, 1024)'),
                    },
                    render: {
                        ambientOcclusion: new Setting_1.Setting(true, 'boolean', 'Enable / disable ambient occlusion for rendering'),
                        beautyRenderDelay: new Setting_1.Setting(50, 'notnegative', 'Amount of which the beauty rendering is delayed'),
                        clearColor: new Setting_1.Setting('#ffffff', 'string', 'Set background color'),
                        clearAlpha: new Setting_1.Setting(1.0, 'factor', 'Set background alpha value'),
                        pointSize: new Setting_1.Setting(1.0, 'notnegative', 'Set size of point objects'),
                        shadows: new Setting_1.Setting(true, 'boolean', 'Enable / disable shadows for rendering'),
                        sao: {
                            samples: new Setting_1.Setting(8, 'notnegative'),
                            intensity: new Setting_1.Setting(0.1, 'notnegative'),
                            kernelRadius: new Setting_1.Setting(8, 'notnegative'),
                            standardDev: new Setting_1.Setting(25, 'notnegative'),
                        },
                    },
                }
            },
        };
        if (settingsJSON)
            _this._fromJSON(settingsJSON, _this._settings);
        return _this;
    }
    // #endregion Constructors (1)
    // #region Public Methods (2)
    Settings.prototype.convertFromPreviousVersion = function (settings) {
        var oldSettings = settings.settings;
        this._settings.viewer.scene.render.clearAlpha.value = oldSettings.clearAlpha.value;
        this._settings.viewer.scene.render.clearColor.value = oldSettings.clearColor.value;
        this._settings.defaultMaterial.color.value = oldSettings.defaultMaterialColor.value;
        this._settings.build_date.value = oldSettings.build_date.value;
        this._settings.build_version.value = oldSettings.build_version.value;
        if (!(oldSettings.camera.value.position.value.x === 5 && oldSettings.camera.value.position.value.y === 5 && oldSettings.camera.value.position.value.z === 5 && oldSettings.camera.value.target.value.x === 0 && oldSettings.camera.value.target.value.y === 0 && oldSettings.camera.value.target.value.z === 0)) {
            this._settings.viewer.scene.camera.cameraTypes.perspective["default"].value.position.value = oldSettings.camera.value.position.value;
            this._settings.viewer.scene.camera.cameraTypes.perspective["default"].value.target.value = oldSettings.camera.value.target.value;
        }
        if (!(oldSettings.cameraOrtho.value.position.value.x === 5 && oldSettings.cameraOrtho.value.position.value.y === 5 && oldSettings.cameraOrtho.value.position.value.z === 5 && oldSettings.cameraOrtho.value.target.value.x === 0 && oldSettings.cameraOrtho.value.target.value.y === 0 && oldSettings.cameraOrtho.value.target.value.z === 0)) {
            this._settings.viewer.scene.camera.cameraTypes.orthographic["default"].value.position.value = oldSettings.cameraOrtho.value.position.value;
            this._settings.viewer.scene.camera.cameraTypes.orthographic["default"].value.target.value = oldSettings.cameraOrtho.value.target.value;
        }
        this._settings.viewer.scene.render.ambientOcclusion.value = oldSettings.ambientOcclusion.value;
        this._settings.viewer.scene.camera.controls.orbit.autoRotationSpeed.value = oldSettings.autoRotateSpeed.value;
        this._settings.defaultMaterial.bumpAmplitude.value = oldSettings.bumpAmplitude.value;
        this._settings.viewer.scene.camera.autoAdjust.value = oldSettings.cameraAutoAdjust.value;
        this._settings.viewer.scene.camera.cameraMovementDuration.value = oldSettings.cameraMovementDuration.value;
        this._settings.viewer.scene.camera.revertAtMouseUp.value = oldSettings.cameraRevertAtMouseUp.value;
        this._settings.viewer.commitParameters.value = oldSettings.commitParameters.value;
        this._settings.viewer.scene.camera.controls.orbit.damping.value = oldSettings.controlDamping.value;
        this._settings.viewer.scene.camera.controls.orthographic.damping.value = oldSettings.controlDamping.value;
        this._settings.parameters.controlNames.value = oldSettings.controlNames.value;
        this._settings.parameters.controlOrder.value = oldSettings.controlOrder.value;
        this._settings.viewer.scene.camera.controls.orbit.enablePan.value = !oldSettings.disablePan.value;
        this._settings.viewer.scene.camera.controls.orthographic.enablePan.value = !oldSettings.disablePan.value;
        this._settings.viewer.scene.camera.controls.orbit.enableZoom.value = !oldSettings.disableZoom.value;
        this._settings.viewer.scene.camera.controls.orthographic.enableZoom.value = !oldSettings.disableZoom.value;
        this._settings.viewer.scene.camera.controls.orbit.enableAutoRotation.value = oldSettings.enableAutoRotate.value;
        this._settings.viewer.scene.camera.controls.orbit.enableRotation.value = oldSettings.enableRotation.value;
        this._settings.viewer.scene.material.environmentMap.value = oldSettings.environmentMap.value;
        this._settings.viewer.scene.material.environmentMapResolution.value = oldSettings.environmentMapResolution.value;
        this._settings.viewer.scene.camera.cameraTypes.perspective.fov.value = oldSettings.fov.value;
        this._settings.viewer.scene.lights.lightScene.value = oldSettings.lightScene.value;
        this._settings.viewer.scene.lights.lightScenes.value = oldSettings.lightScenes.value;
        this._settings.parameters.parametersHidden.value = oldSettings.parametersHidden.value;
        this._settings.viewer.scene.render.pointSize.value = oldSettings.pointSize.value;
        this._settings.viewer.scene.camera.revertAtMouseUpDuration.value = oldSettings.revertAtMouseUpDuration.value;
        this._settings.viewer.scene.material.environmentMapAsBackground.value = oldSettings.showEnvironmentMap.value;
        this._settings.viewer.scene.gridVisibility.value = oldSettings.showGrid.value;
        this._settings.viewer.scene.groundPlaneVisibility.value = oldSettings.showGroundPlane.value;
        this._settings.viewer.scene.render.shadows.value = oldSettings.showShadows.value;
        // TODO: replace the '1' with the enum, as soon as build process is fixed
        if (oldSettings.topView.value)
            this._settings.viewer.scene.camera.cameraTypes.active.value = 1;
        this._settings.viewer.scene.camera.zoomExtentsFactor.value = oldSettings.zoomExtentFactor.value;
        return this;
    };
    Settings.prototype.convertToPreviousVersion = function () {
        var oldSettings = new Settings_1.Settings();
        oldSettings.settings.build_date.value = this._settings.build_date.value;
        oldSettings.settings.build_version.value = this._settings.build_version.value;
        oldSettings.settings.ambientOcclusion.value = this._settings.viewer.scene.render.ambientOcclusion.value;
        oldSettings.settings.autoRotateSpeed.value = this._settings.viewer.scene.camera.controls.orbit.autoRotationSpeed.value;
        oldSettings.settings.bumpAmplitude.value = this._settings.defaultMaterial.bumpAmplitude.value;
        oldSettings.settings.camera.value = new Setting_1.Setting({
            position: this._settings.viewer.scene.camera.cameraTypes.perspective["default"].value.position.value,
            target: this._settings.viewer.scene.camera.cameraTypes.perspective["default"].value.target.value,
        }, function (v) { return true; }).value;
        oldSettings.settings.cameraAutoAdjust.value = this._settings.viewer.scene.camera.autoAdjust.value;
        oldSettings.settings.cameraMovementDuration.value = this._settings.viewer.scene.camera.cameraMovementDuration.value;
        oldSettings.settings.cameraOrtho.value = new Setting_1.Setting({
            position: this._settings.viewer.scene.camera.cameraTypes.orthographic["default"].value.position.value,
            target: this._settings.viewer.scene.camera.cameraTypes.orthographic["default"].value.target.value,
        }, function (v) { return true; }).value;
        oldSettings.settings.cameraRevertAtMouseUp.value = this._settings.viewer.scene.camera.revertAtMouseUp.value;
        oldSettings.settings.clearAlpha.value = this._settings.viewer.scene.render.clearAlpha.value;
        oldSettings.settings.clearColor.value = this._settings.viewer.scene.render.clearColor.value;
        oldSettings.settings.commitParameters.value = this._settings.viewer.commitParameters.value;
        oldSettings.settings.controlDamping.value = this._settings.viewer.scene.camera.controls.orbit.damping.value;
        oldSettings.settings.controlNames.value = this._settings.parameters.controlNames.value;
        oldSettings.settings.controlOrder.value = this._settings.parameters.controlOrder.value;
        oldSettings.settings.defaultMaterialColor.value = this._settings.defaultMaterial.color.value;
        oldSettings.settings.disablePan.value = !this._settings.viewer.scene.camera.controls.orbit.enablePan.value;
        oldSettings.settings.disableZoom.value = !this._settings.viewer.scene.camera.controls.orbit.enableZoom.value;
        oldSettings.settings.enableAutoRotate.value = this._settings.viewer.scene.camera.controls.orbit.enableAutoRotation.value;
        oldSettings.settings.enableRotation.value = this._settings.viewer.scene.camera.controls.orbit.enableRotation.value;
        oldSettings.settings.environmentMap.value = this._settings.viewer.scene.material.environmentMap.value;
        oldSettings.settings.environmentMapResolution.value = this._settings.viewer.scene.material.environmentMapResolution.value;
        oldSettings.settings.fov.value = this._settings.viewer.scene.camera.cameraTypes.perspective.fov.value;
        oldSettings.settings.lightScene.value = this._settings.viewer.scene.lights.lightScene.value;
        oldSettings.settings.lightScenes.value = this._settings.viewer.scene.lights.lightScenes.value;
        oldSettings.settings.panSpeed.value = this._settings.viewer.scene.camera.controls.orbit.panSpeed.value;
        oldSettings.settings.parametersHidden.value = this._settings.parameters.parametersHidden.value;
        oldSettings.settings.pointSize.value = this._settings.viewer.scene.render.pointSize.value;
        oldSettings.settings.revertAtMouseUpDuration.value = this._settings.viewer.scene.camera.revertAtMouseUpDuration.value;
        oldSettings.settings.rotateSpeed.value = this._settings.viewer.scene.camera.controls.orbit.rotationSpeed.value;
        oldSettings.settings.showEnvironmentMap.value = this._settings.viewer.scene.material.environmentMapAsBackground.value;
        oldSettings.settings.showGrid.value = this._settings.viewer.scene.gridVisibility.value;
        oldSettings.settings.showGroundPlane.value = this._settings.viewer.scene.groundPlaneVisibility.value;
        oldSettings.settings.showShadows.value = this._settings.viewer.scene.render.shadows.value;
        // TODO: replace the '1' with the enum, as soon as build process is fixed
        oldSettings.settings.topView.value = this._settings.viewer.scene.camera.cameraTypes.active.value === 1;
        oldSettings.settings.zoomExtentFactor.value = this._settings.viewer.scene.camera.zoomExtentsFactor.value;
        oldSettings.settings.zoomSpeed.value = this._settings.viewer.scene.camera.controls.orbit.zoomSpeed.value;
        return oldSettings;
    };
    return Settings;
}(BaseSettings_1.BaseSettings));
exports.Settings = Settings;
;


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL0Jhc2VTZXR0aW5ncy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2V0dGluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvU2V0dGluZ3NDb252ZXJzaW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9TZXR0aW5nc1ZlcnNpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZlcnNpb25zLzEuMC9TZXR0aW5ncy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvdmVyc2lvbnMvMi4wL1NldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTs7O1FBR0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDBDQUEwQyxnQ0FBZ0M7UUFDMUU7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSx3REFBd0Qsa0JBQWtCO1FBQzFFO1FBQ0EsaURBQWlELGNBQWM7UUFDL0Q7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBLHlDQUF5QyxpQ0FBaUM7UUFDMUUsZ0hBQWdILG1CQUFtQixFQUFFO1FBQ3JJO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMkJBQTJCLDBCQUEwQixFQUFFO1FBQ3ZELGlDQUFpQyxlQUFlO1FBQ2hEO1FBQ0E7UUFDQTs7UUFFQTtRQUNBLHNEQUFzRCwrREFBK0Q7O1FBRXJIO1FBQ0E7OztRQUdBO1FBQ0E7Ozs7Ozs7Ozs7Ozs7OztBQ2pGQSx5RUFBb0M7QUFFcEM7SUFBQTtJQXNLQSxDQUFDO0lBNUpHLHNCQUFXLGtDQUFRO1FBSm5CLDRCQUE0QjtRQUU1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QUssQ0FBQyxNQUF3QixDQUFDLEtBQUssR0FBSSxXQUFXLENBQUMsTUFBd0IsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztTQUMxTDtRQUVELElBQUcsQ0FBQyxDQUFFLFdBQVcsQ0FBQyxXQUE2QixDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUssV0FBVyxDQUFDLFdBQTZCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSyxXQUFXLENBQUMsV0FBNkIsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFLLFdBQVcsQ0FBQyxXQUE2QixDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUssV0FBVyxDQUFDLFdBQTZCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSyxXQUFXLENBQUMsV0FBNkIsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDMWIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFNBQU8sQ0FBa0IsQ0FBQyxLQUFLLENBQUMsUUFBMEIsQ0FBQyxLQUFLLEdBQUksV0FBVyxDQUFDLFdBQTZCLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDL0wsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFNBQU8sQ0FBa0IsQ0FBQyxLQUFLLENBQUMsTUFBd0IsQ0FBQyxLQUFLLEdBQUksV0FBVyxDQUFDLFdBQTZCLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDaE07UUFFQSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGdCQUFrQyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1FBQ2pILElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxpQkFBbUMsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUM7UUFDaEksSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsYUFBK0IsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDdkcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUE0QixDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1FBQzNHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsc0JBQXdDLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUM7UUFDN0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxlQUFpQyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDO1FBQ3JILElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFrQyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDO1FBQ3BHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxPQUF5QixDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUNySCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsT0FBeUIsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFDNUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsWUFBOEIsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDaEcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsWUFBOEIsQ0FBQyxLQUFLLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDaEcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQTJCLENBQUMsS0FBSyxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDcEgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFNBQTJCLENBQUMsS0FBSyxHQUFHLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDM0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFVBQTRCLENBQUMsS0FBSyxHQUFHLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDdEgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQTRCLENBQUMsS0FBSyxHQUFHLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7UUFDN0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGtCQUFvQyxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsZ0JB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Q0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDO1FBQ3BILFdBQVcsQ0FBQyxRQUFRLENBQUMsc0JBQXdDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDO1FBQ3RJLFdBQVcsQ0FBQyxRQUFRLENBQUMsV0FBNkIsQ0FBQyxLQUFLLEdBQUcsSUFBSSxpQkFBTyxDQUFDO1lBQ3BFLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsU0FBTyxFQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSztZQUNsRyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFNBQU8sRUFBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUs7U0FDakcsRUFBRSxVQUFDLENBQUMsSUFBSyxXQUFJLEVBQUosQ0FBSSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3JCLFdBQVcsQ0FBQyxRQUFRLENBQUMscUJBQXVDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQztRQUM5SCxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQTRCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUM5RyxXQUFXLENBQUMsUUFBUSxDQUFDLFVBQTRCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENB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Q0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQzdHLHlFQUF5RTtRQUN4RSxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQXlCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssQ0FBQyxDQUFDO1FBQ3pILFdBQVcsQ0FBQyxRQUFRLENBQUMsZ0JBQWtDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDO1FBQzNILFdBQVcsQ0FBQyxRQUFRLENBQUMsU0FBMkIsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUM7UUFFNUgsT0FBTyxXQUFXLENBQUM7SUFDdkIsQ0FBQztJQUdMLGVBQUM7QUFBRCxDQUFDLENBbFY2QiwyQkFBWSxHQWtWekM7QUFsVlksNEJBQVE7QUFrVnBCLENBQUMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvbWFpbi50c1wiKTtcbiIsImltcG9ydCB7IElTZXR0aW5ncywgSUJhc2VTZXR0aW5nc09iamVjdCwgSVNldHRpbmdzVmVyc2lvbiwgSVNldHRpbmcgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIjtcbmltcG9ydCB7IFNldHRpbmcgfSBmcm9tIFwiLi9TZXR0aW5nXCI7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBCYXNlU2V0dGluZ3MgaW1wbGVtZW50cyBJU2V0dGluZ3Mge1xuICAgIC8vICNyZWdpb24gUHJvcGVydGllcyAoMilcblxuICAgIHByb3RlY3RlZCBfc2V0dGluZ3M6IElCYXNlU2V0dGluZ3NPYmplY3Q7XG4gICAgcHJvdGVjdGVkIF92ZXJzaW9uOiBJU2V0dGluZ3NWZXJzaW9uO1xuXG4gICAgLy8gI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzICgyKVxuXG4gICAgLy8gI3JlZ2lvbiBQdWJsaWMgQWNjZXNzb3JzICgzKVxuXG4gICAgcHVibGljIGdldCBzZXR0aW5ncygpOiBJQmFzZVNldHRpbmdzT2JqZWN0IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NldHRpbmdzO1xuICAgIH1cblxuICAgIHB1YmxpYyBzZXQgc2V0dGluZ3Moc2V0dGluZ3M6IElCYXNlU2V0dGluZ3NPYmplY3QpIHtcbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSBzZXR0aW5ncztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHZlcnNpb24oKTogSVNldHRpbmdzVmVyc2lvbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJzaW9uO1xuICAgIH1cblxuICAgIC8vICNlbmRyZWdpb24gUHVibGljIEFjY2Vzc29ycyAoMylcblxuICAgIC8vICNyZWdpb24gUHVibGljIE1ldGhvZHMgKDQpXG5cbiAgICBwdWJsaWMgZ2V0U2V0dGluZ0RlZmluaXRpb25zKCkge1xuICAgICAgICBsZXQgb2JqID0ge307XG4gICAgICAgIHRoaXMuX2dldFNldHRpbmdEZWZpbml0aW9ucyh0aGlzLl9zZXR0aW5ncywgb2JqLCAnJyk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgcHVibGljIGdldFNldHRpbmdPYmplY3Qoa2V5OiBzdHJpbmcpOiBJU2V0dGluZzxhbnk+IHtcbiAgICAgICAgbGV0IGxldmVscyA9IGtleS5zcGxpdCgnLicpO1xuICAgICAgICBsZXQgb2JqOiBhbnkgPSB0aGlzLl9zZXR0aW5ncztcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IGxldmVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgb2JqID0gb2JqW2xldmVsc1tpXV07XG4gICAgICAgICAgICBpZihvYmogaW5zdGFuY2VvZiBTZXR0aW5nICYmIGkgPCBsZXZlbHMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIG9iaiA9IG9iai52YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihvYmogaW5zdGFuY2VvZiBTZXR0aW5nKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfSBlbHNlIGlmKCFvYmopIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXRTZXR0aW5ncygpIHtcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xuICAgICAgICB0aGlzLl9nZXRTZXR0aW5ncyh0aGlzLl9zZXR0aW5ncywgb2JqLCAnJyk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgcHVibGljIHRvSlNPTigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvSlNPTih0aGlzLl9zZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgLy8gI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kcyAoNClcblxuICAgIC8vICNyZWdpb24gUHVibGljIEFic3RyYWN0IE1ldGhvZHMgKDIpXG5cbiAgICBwdWJsaWMgYWJzdHJhY3QgY29udmVydEZyb21QcmV2aW91c1ZlcnNpb24ob2JqOiBJU2V0dGluZ3MpOiBJU2V0dGluZ3M7XG4gICAgcHVibGljIGFic3RyYWN0IGNvbnZlcnRUb1ByZXZpb3VzVmVyc2lvbigpOiBJU2V0dGluZ3M7XG5cbiAgICAvLyAjZW5kcmVnaW9uIFB1YmxpYyBBYnN0cmFjdCBNZXRob2RzICgyKVxuXG4gICAgLy8gI3JlZ2lvbiBQcm90ZWN0ZWQgTWV0aG9kcyAoMilcblxuICAgIHByb3RlY3RlZCBfZnJvbUpTT04oc2V0dGluZ3NKU09OOiBhbnksIGl0ZXJhYmxlOiBJQmFzZVNldHRpbmdzT2JqZWN0KSB7XG4gICAgICAgIGlmKCFzZXR0aW5nc0pTT04pIHJldHVybjtcbiAgICAgICAgZm9yIChsZXQgcyBpbiBpdGVyYWJsZSkge1xuICAgICAgICAgICAgaWYgKGl0ZXJhYmxlW3NdIGluc3RhbmNlb2YgU2V0dGluZykge1xuICAgICAgICAgICAgICAgIGxldCBzZXR0aW5nOiBJU2V0dGluZzxhbnk+ID0gKGl0ZXJhYmxlW3NdIGFzIElTZXR0aW5nPGFueT4pO1xuICAgICAgICAgICAgICAgIGlmKHNldHRpbmcucGVyc2lzdGVudCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2V0dGluZ0NoaWxkcmVuID0gdHlwZW9mIHNldHRpbmcudmFsdWUgPT09ICdvYmplY3QnICYmIHNldHRpbmcudmFsdWUgIT09IG51bGwgPyBPYmplY3QudmFsdWVzKHNldHRpbmcudmFsdWUpIDogW107XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZXR0aW5nQ2hpbGRyZW4ubGVuZ3RoICE9PSAwICYmIHNldHRpbmdDaGlsZHJlblswXSBpbnN0YW5jZW9mIFNldHRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2Zyb21KU09OKHNldHRpbmdzSlNPTltzXSwgaXRlcmFibGVbc10udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2V0dGluZ3NKU09OW3NdICE9PSB1bmRlZmluZWQpIGl0ZXJhYmxlW3NdLnZhbHVlID0gc2V0dGluZ3NKU09OW3NdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9mcm9tSlNPTihzZXR0aW5nc0pTT05bc10sIChpdGVyYWJsZVtzXSBhcyBJQmFzZVNldHRpbmdzT2JqZWN0KSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfdG9KU09OKGl0ZXJhYmxlOiBJQmFzZVNldHRpbmdzT2JqZWN0KSB7XG4gICAgICAgIGxldCBvYmpKU09OID0ge307XG4gICAgICAgIGZvciAobGV0IHMgaW4gaXRlcmFibGUpIHtcbiAgICAgICAgICAgIGlmKGl0ZXJhYmxlW3NdIGluc3RhbmNlb2YgU2V0dGluZykge1xuICAgICAgICAgICAgICAgIGxldCBzZXR0aW5nOiBJU2V0dGluZzxhbnk+ID0gKGl0ZXJhYmxlW3NdIGFzIElTZXR0aW5nPGFueT4pO1xuICAgICAgICAgICAgICAgIGlmKHNldHRpbmcucGVyc2lzdGVudCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2V0dGluZ0NoaWxkcmVuID0gdHlwZW9mIHNldHRpbmcudmFsdWUgPT09ICdvYmplY3QnICYmIHNldHRpbmcudmFsdWUgIT09IG51bGwgPyBPYmplY3QudmFsdWVzKHNldHRpbmcudmFsdWUpIDogW107XG4gICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdDaGlsZHJlbi5sZW5ndGggIT09IDAgJiYgc2V0dGluZ0NoaWxkcmVuWzBdIGluc3RhbmNlb2YgU2V0dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqSlNPTltzXSA9IHRoaXMuX3RvSlNPTihpdGVyYWJsZVtzXS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpKU09OW3NdID0gaXRlcmFibGVbc10udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYoaXRlcmFibGVbc10gaW5zdGFuY2VvZiBTdHJpbmcgfHwgdHlwZW9mIGl0ZXJhYmxlW3NdID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICAgICAgb2JqSlNPTltzXSA9IGl0ZXJhYmxlW3NdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpKU09OW3NdID0gdGhpcy5fdG9KU09OKChpdGVyYWJsZVtzXSBhcyBJQmFzZVNldHRpbmdzT2JqZWN0KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG9iakpTT047XG4gICAgfVxuXG4gICAgLy8gI2VuZHJlZ2lvbiBQcm90ZWN0ZWQgTWV0aG9kcyAoMilcblxuICAgIC8vICNyZWdpb24gUHJpdmF0ZSBNZXRob2RzICgyKVxuXG4gICAgcHJpdmF0ZSBfZ2V0U2V0dGluZ0RlZmluaXRpb25zKGl0ZXJhYmxlOiBJQmFzZVNldHRpbmdzT2JqZWN0LCBvYmo6IGFueSwgcGF0aD86IHN0cmluZykge1xuICAgICAgICBsZXQgcGFyZW50UGF0aCA9IHBhdGggPyBwYXRoICsgJy4nIDogJyc7IFxuXG4gICAgICAgIGZvciAobGV0IHMgaW4gaXRlcmFibGUpIHtcbiAgICAgICAgICAgIGlmKGl0ZXJhYmxlW3NdIGluc3RhbmNlb2YgU2V0dGluZykge1xuICAgICAgICAgICAgICAgIGxldCBzZXR0aW5nOiBJU2V0dGluZzxhbnk+ID0gKGl0ZXJhYmxlW3NdIGFzIElTZXR0aW5nPGFueT4pO1xuICAgICAgICAgICAgICAgIGxldCBzZXR0aW5nQ2hpbGRyZW4gPSB0eXBlb2Ygc2V0dGluZy52YWx1ZSA9PT0gJ29iamVjdCcgJiYgc2V0dGluZy52YWx1ZSAhPT0gbnVsbCA/IE9iamVjdC52YWx1ZXMoc2V0dGluZy52YWx1ZSkgOiBbXTtcbiAgICAgICAgICAgICAgICBpZiAoc2V0dGluZ0NoaWxkcmVuLmxlbmd0aCAhPT0gMCAmJiBzZXR0aW5nQ2hpbGRyZW5bMF0gaW5zdGFuY2VvZiBTZXR0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVyYWJsZVtzXS5kZXNjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbcGFyZW50UGF0aCArIHNdID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmpbcGFyZW50UGF0aCArIHNdLmRlc2NyaXB0b24gPSBpdGVyYWJsZVtzXS5kZXNjO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIGl0ZXJhYmxlW3NdLnR5cGUgPT09ICdzdHJpbmcnIHx8IGl0ZXJhYmxlW3NdLnR5cGUgaW5zdGFuY2VvZiBTdHJpbmcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqW3BhcmVudFBhdGggKyBzXS50eXBlID0gaXRlcmFibGVbc10udHlwZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldFNldHRpbmdEZWZpbml0aW9ucyhpdGVyYWJsZVtzXS52YWx1ZSwgb2JqLCBwYXJlbnRQYXRoICsgcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZXJhYmxlW3NdLmRlc2MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ialtwYXJlbnRQYXRoICsgc10gPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ialtwYXJlbnRQYXRoICsgc10uZGVzY3JpcHRvbiA9IGl0ZXJhYmxlW3NdLmRlc2M7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgaXRlcmFibGVbc10udHlwZSA9PT0gJ3N0cmluZycgfHwgaXRlcmFibGVbc10udHlwZSBpbnN0YW5jZW9mIFN0cmluZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmpbcGFyZW50UGF0aCArIHNdLnR5cGUgPSBpdGVyYWJsZVtzXS50eXBlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYoIShpdGVyYWJsZVtzXSBpbnN0YW5jZW9mIFN0cmluZyB8fCB0eXBlb2YgaXRlcmFibGVbc10gPT09ICdzdHJpbmcnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2dldFNldHRpbmdEZWZpbml0aW9ucygoaXRlcmFibGVbc10gYXMgSUJhc2VTZXR0aW5nc09iamVjdCksIG9iaiwgcGFyZW50UGF0aCtzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2dldFNldHRpbmdzKGl0ZXJhYmxlOiBJQmFzZVNldHRpbmdzT2JqZWN0LCBvYmo6IGFueSwgcGF0aD86IHN0cmluZykge1xuICAgICAgICBsZXQgcGFyZW50UGF0aCA9IHBhdGggPyBwYXRoICsgJy4nIDogJyc7IFxuXG4gICAgICAgIGZvciAobGV0IHMgaW4gaXRlcmFibGUpIHtcbiAgICAgICAgICAgIGlmKGl0ZXJhYmxlW3NdIGluc3RhbmNlb2YgU2V0dGluZykge1xuICAgICAgICAgICAgICAgIGxldCBzZXR0aW5nOiBJU2V0dGluZzxhbnk+ID0gKGl0ZXJhYmxlW3NdIGFzIElTZXR0aW5nPGFueT4pO1xuICAgICAgICAgICAgICAgIGlmKHNldHRpbmcucGVyc2lzdGVudCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2V0dGluZ0NoaWxkcmVuID0gdHlwZW9mIHNldHRpbmcudmFsdWUgPT09ICdvYmplY3QnICYmIHNldHRpbmcudmFsdWUgIT09IG51bGwgPyBPYmplY3QudmFsdWVzKHNldHRpbmcudmFsdWUpIDogW107XG4gICAgICAgICAgICAgICAgICAgIGlmKHNldHRpbmdDaGlsZHJlbi5sZW5ndGggIT09IDAgJiYgc2V0dGluZ0NoaWxkcmVuWzBdIGluc3RhbmNlb2YgU2V0dGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0U2V0dGluZ3MoaXRlcmFibGVbc10udmFsdWUsIG9iaiwgcGFyZW50UGF0aCtzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ialtwYXJlbnRQYXRoK3NdID0gaXRlcmFibGVbc10udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYoaXRlcmFibGVbc10gaW5zdGFuY2VvZiBTdHJpbmcgfHwgdHlwZW9mIGl0ZXJhYmxlW3NdID09PSAnc3RyaW5nJyl7XG4gICAgICAgICAgICAgICAgb2JqW3BhcmVudFBhdGgrc10gPSBpdGVyYWJsZVtzXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZ2V0U2V0dGluZ3MoKGl0ZXJhYmxlW3NdIGFzIElCYXNlU2V0dGluZ3NPYmplY3QpLCBvYmosIHBhcmVudFBhdGgrcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAjZW5kcmVnaW9uIFByaXZhdGUgTWV0aG9kcyAoMilcbn0iLCJpbXBvcnQgeyBJU2V0dGluZyB9IGZyb20gXCIuL2ludGVyZmFjZXMvaW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZzxUPiBpbXBsZW1lbnRzIElTZXR0aW5nPFQ+IHtcbiAgICAvLyAjcmVnaW9uIENvbnN0cnVjdG9ycyAoMSlcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3ZhbHVlOiBULCBwcml2YXRlIF90eXBlOiBzdHJpbmd8RnVuY3Rpb24sIHByaXZhdGUgX2Rlc2M/OiBzdHJpbmcsIHByaXZhdGUgX3BlcnNpc3RlbnQ6IGJvb2xlYW4gPSB0cnVlKSB7IH1cblxuICAgIC8vICNlbmRyZWdpb24gQ29uc3RydWN0b3JzICgxKVxuXG4gICAgLy8gI3JlZ2lvbiBQdWJsaWMgQWNjZXNzb3JzICg1KVxuXG4gICAgcHVibGljIGdldCBkZXNjKCk6IHN0cmluZ3x1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fZGVzYztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHBlcnNpc3RlbnQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wZXJzaXN0ZW50O1xuICAgIH1cblxuICAgIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmd8RnVuY3Rpb24ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdHlwZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IFQge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuXG4gICAgcHVibGljIHNldCB2YWx1ZSh2OiBUKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdjtcbiAgICB9XG5cbiAgICAvLyAjZW5kcmVnaW9uIFB1YmxpYyBBY2Nlc3NvcnMgKDUpXG59IiwiaW1wb3J0IHsgU2V0dGluZ3NWZXJzaW9uIH0gZnJvbSBcIi4vU2V0dGluZ3NWZXJzaW9uXCI7XG5pbXBvcnQgeyBJU2V0dGluZ3MsIElTZXR0aW5nc1ZlcnNpb24sIElTZXR0aW5nc0RpY3Rpb25hcnkgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIjtcbmltcG9ydCB7IFNldHRpbmdzIGFzIFNldHRpbmdzXzFfMCB9IGZyb20gXCIuL3ZlcnNpb25zLzEuMC9TZXR0aW5nc1wiO1xuaW1wb3J0IHsgU2V0dGluZ3MgYXMgU2V0dGluZ3NfMl8wIH0gZnJvbSBcIi4vdmVyc2lvbnMvMi4wL1NldHRpbmdzXCI7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5nc0NvbnZlcnNpb24ge1xuICAgIC8vICNyZWdpb24gUHJvcGVydGllcyAoMilcblxuICAgIHByaXZhdGUgX3NldHRpbmdzVmVyc2lvbnM6IElTZXR0aW5nc1tdID0gW107XG4gICAgcHJpdmF0ZSBfdmVyc2lvbnM6IElTZXR0aW5nc0RpY3Rpb25hcnk8YW55PiA9IHtcbiAgICAgICAgJzEuMCc6IFNldHRpbmdzXzFfMCxcbiAgICAgICAgJzIuMCc6IFNldHRpbmdzXzJfMFxuICAgIH1cblxuICAgIC8vICNlbmRyZWdpb24gUHJvcGVydGllcyAoMilcblxuICAgIC8vICNyZWdpb24gQ29uc3RydWN0b3JzICgxKVxuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGZvcihsZXQgayBvZiBPYmplY3Qua2V5cyh0aGlzLl92ZXJzaW9ucykpXG4gICAgICAgICAgICB0aGlzLl9zZXR0aW5nc1ZlcnNpb25zLnB1c2gobmV3IHRoaXMuX3ZlcnNpb25zW2tdKCkpO1xuICAgIH1cblxuICAgIC8vICNlbmRyZWdpb24gQ29uc3RydWN0b3JzICgxKVxuXG4gICAgLy8gI3JlZ2lvbiBQdWJsaWMgTWV0aG9kcyAoMilcblxuICAgIHB1YmxpYyBjb252ZXJ0KHNldHRpbmdzSlNPTjogYW55LCB2ZXJzaW9uOiBzdHJpbmcpOiBhbnkge1xuICAgICAgICBsZXQgc2V0dGluZ3M6IElTZXR0aW5ncyA9IHRoaXMuY3JlYXRlU2V0dGluZ3NPYmplY3Qoc2V0dGluZ3NKU09OKTtcblxuICAgICAgICBsZXQgY3VycmVudFZlcnNpb24gPSBzZXR0aW5ncy52ZXJzaW9uLFxuICAgICAgICAgICAgcmVxdWlyZWRWZXJzaW9uID0gbmV3IFNldHRpbmdzVmVyc2lvbih2ZXJzaW9uKTtcbiAgICAgICAgbGV0IGluZGV4Q3VycmVudCA9IHRoaXMuX2ZpbmRWZXJzaW9uSW5kZXgoY3VycmVudFZlcnNpb24pO1xuICAgICAgICBsZXQgaW5kZXhSZXF1aXJlZCA9IHRoaXMuX2ZpbmRWZXJzaW9uSW5kZXgocmVxdWlyZWRWZXJzaW9uKTtcbiAgICBcbiAgICAgICAgaWYoaW5kZXhDdXJyZW50ID09PSAtMSB8fCBpbmRleFJlcXVpcmVkID09PSAtMSkgcmV0dXJuIHNldHRpbmdzLnRvSlNPTigpO1xuXG4gICAgICAgIGxldCBjb252ZXJ0ZWRTZXR0aW5nczogSVNldHRpbmdzID0gc2V0dGluZ3M7XG4gICAgICAgIGlmIChpbmRleEN1cnJlbnQgPCBpbmRleFJlcXVpcmVkKSB7XG4gICAgICAgICAgICB3aGlsZShpbmRleEN1cnJlbnQgPCBpbmRleFJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhDdXJyZW50Kz0xO1xuICAgICAgICAgICAgICAgIGNvbnZlcnRlZFNldHRpbmdzID0gbmV3IHRoaXMuX3ZlcnNpb25zW3RoaXMuX3NldHRpbmdzVmVyc2lvbnNbaW5kZXhDdXJyZW50XS52ZXJzaW9uLnRvU3RyaW5nKCldKCkuY29udmVydEZyb21QcmV2aW91c1ZlcnNpb24oc2V0dGluZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGluZGV4Q3VycmVudCA+IGluZGV4UmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHdoaWxlIChpbmRleEN1cnJlbnQgPiBpbmRleFJlcXVpcmVkKSB7XG4gICAgICAgICAgICAgICAgaW5kZXhDdXJyZW50LT0xO1xuICAgICAgICAgICAgICAgIGNvbnZlcnRlZFNldHRpbmdzID0gY29udmVydGVkU2V0dGluZ3MuY29udmVydFRvUHJldmlvdXNWZXJzaW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnZlcnRlZFNldHRpbmdzLnRvSlNPTigpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjcmVhdGVTZXR0aW5nc09iamVjdChzZXR0aW5nc0pTT046IGFueSk6IElTZXR0aW5ncyB7XG4gICAgICAgIGlmKCFzZXR0aW5nc0pTT04uc2V0dGluZ3NfdmVyc2lvbikgcmV0dXJuIG5ldyBTZXR0aW5nc18xXzAoc2V0dGluZ3NKU09OKTtcbiAgICBcbiAgICAgICAgbGV0IHZlcnNpb24gPSBuZXcgU2V0dGluZ3NWZXJzaW9uKHNldHRpbmdzSlNPTi5zZXR0aW5nc192ZXJzaW9uKTtcbiAgICAgICAgcmV0dXJuIG5ldyB0aGlzLl92ZXJzaW9uc1t2ZXJzaW9uLnRvU3RyaW5nKCldKHNldHRpbmdzSlNPTik7XG4gICAgfVxuXG4gICAgLy8gI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kcyAoMilcblxuICAgIC8vICNyZWdpb24gUHJpdmF0ZSBNZXRob2RzICgxKVxuXG4gICAgcHJpdmF0ZSBfZmluZFZlcnNpb25JbmRleCh2ZXJzaW9uOiBJU2V0dGluZ3NWZXJzaW9uKTogbnVtYmVyIHtcbiAgICAgICAgbGV0IHYgPSBuZXcgU2V0dGluZ3NWZXJzaW9uKHZlcnNpb24udG9TdHJpbmcoKSk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fc2V0dGluZ3NWZXJzaW9ucy5sZW5ndGg7IGkrKylcbiAgICAgICAgICAgIGlmKHRoaXMuX3NldHRpbmdzVmVyc2lvbnNbaV0udmVyc2lvbi5lcXVhbFRvKHYpKVxuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuXG4gICAgICAgIHYudmVyc2lvbkxldmVsc1t2LnZlcnNpb25MZXZlbHMubGVuZ3RoLTFdID0gMDtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9zZXR0aW5nc1ZlcnNpb25zLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgaWYodGhpcy5fc2V0dGluZ3NWZXJzaW9uc1tpXS52ZXJzaW9uLmVxdWFsVG8odikpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgLy8gI2VuZHJlZ2lvbiBQcml2YXRlIE1ldGhvZHMgKDEpXG59IiwiaW1wb3J0IHsgSVNldHRpbmdzVmVyc2lvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvaW50ZXJmYWNlc1wiO1xuXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NWZXJzaW9uIGltcGxlbWVudHMgSVNldHRpbmdzVmVyc2lvbiB7XG4gICAgLy8gI3JlZ2lvbiBQcm9wZXJ0aWVzICgxKVxuXG4gICAgcHJpdmF0ZSBfdmVyc2lvbkxldmVsczogbnVtYmVyW10gPSBbXTtcblxuICAgIC8vICNlbmRyZWdpb24gUHJvcGVydGllcyAoMSlcblxuICAgIC8vICNyZWdpb24gQ29uc3RydWN0b3JzICgxKVxuXG4gICAgY29uc3RydWN0b3IodmVyc2lvbjogc3RyaW5nID0gJzEuMCcpIHtcbiAgICAgICAgbGV0IHNwbGl0QXJyYXkgPSB2ZXJzaW9uLnNwbGl0KCcuJyk7XG4gICAgICAgIGZvciAobGV0IG4gaW4gc3BsaXRBcnJheSkgXG4gICAgICAgICAgICB0aGlzLl92ZXJzaW9uTGV2ZWxzLnB1c2goK3NwbGl0QXJyYXlbbl0pO1xuICAgIH1cblxuICAgIC8vICNlbmRyZWdpb24gQ29uc3RydWN0b3JzICgxKVxuXG4gICAgLy8gI3JlZ2lvbiBQdWJsaWMgQWNjZXNzb3JzICgxKVxuXG4gICAgcHVibGljIGdldCB2ZXJzaW9uTGV2ZWxzKCk6IG51bWJlcltdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZlcnNpb25MZXZlbHM7XG4gICAgfVxuXG4gICAgLy8gI2VuZHJlZ2lvbiBQdWJsaWMgQWNjZXNzb3JzICgxKVxuXG4gICAgLy8gI3JlZ2lvbiBQdWJsaWMgTWV0aG9kcyAoMylcblxuICAgIHB1YmxpYyBlcXVhbFRvKHY6IElTZXR0aW5nc1ZlcnNpb24pOiBib29sZWFuIHtcbiAgICAgICAgaWYodi52ZXJzaW9uTGV2ZWxzLmxlbmd0aCAhPT0gdGhpcy5fdmVyc2lvbkxldmVscy5sZW5ndGgpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fdmVyc2lvbkxldmVscy5sZW5ndGg7IGkrKykgXG4gICAgICAgICAgICBpZih2LnZlcnNpb25MZXZlbHNbaV0gIT09IHRoaXMuX3ZlcnNpb25MZXZlbHNbaV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgcHVibGljIGlzTG93ZXJUaGFuKHY6IElTZXR0aW5nc1ZlcnNpb24pOiBib29sZWFuIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX3ZlcnNpb25MZXZlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHRoaXMuX3ZlcnNpb25MZXZlbHNbaV0gPiB2LnZlcnNpb25MZXZlbHNbaV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYodGhpcy5fdmVyc2lvbkxldmVsc1tpXSA8IHYudmVyc2lvbkxldmVsc1tpXSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlOyAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgdG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJzaW9uTGV2ZWxzLmpvaW4oJy4nKTtcbiAgICB9XG5cbiAgICAvLyAjZW5kcmVnaW9uIFB1YmxpYyBNZXRob2RzICgzKVxufSIsImltcG9ydCB7IFNldHRpbmdzQ29udmVyc2lvbiB9IGZyb20gXCIuL1NldHRpbmdzQ29udmVyc2lvblwiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyBhcyBTZXR0aW5nc18xXzAgfSBmcm9tIFwiLi92ZXJzaW9ucy8xLjAvU2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgYXMgU2V0dGluZ3NfMl8wIH0gZnJvbSBcIi4vdmVyc2lvbnMvMi4wL1NldHRpbmdzXCI7XHJcblxyXG5leHBvcnQge1xyXG4gICAgU2V0dGluZ3NDb252ZXJzaW9uLFxyXG4gICAgU2V0dGluZ3NfMV8wLFxyXG4gICAgU2V0dGluZ3NfMl8wLFxyXG59IiwiaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgU2V0dGluZ3NWZXJzaW9uIH0gZnJvbSBcIi4uLy4uL1NldHRpbmdzVmVyc2lvblwiO1xuaW1wb3J0IHsgU2V0dGluZyB9IGZyb20gXCIuLi8uLi9TZXR0aW5nXCI7XG5pbXBvcnQgeyBJU2V0dGluZ3NPYmplY3QgfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XG5pbXBvcnQgeyBCYXNlU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vQmFzZVNldHRpbmdzXCI7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyBleHRlbmRzIEJhc2VTZXR0aW5ncyB7XG4gICAgLy8gI3JlZ2lvbiBQcm9wZXJ0aWVzICgxKVxuXG4gICAgcHJvdGVjdGVkIF9zZXR0aW5nczogSVNldHRpbmdzT2JqZWN0O1xuXG4gICAgLy8gI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzICgxKVxuXG4gICAgLy8gI3JlZ2lvbiBDb25zdHJ1Y3RvcnMgKDEpXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NPYmplY3QgYSBzZXR0aW5ncyBvYmplY3QgdGhhdCBpcyBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhpcyBTZXR0aW5nc09iamVjdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzSlNPTj86IGFueSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gbmV3IFNldHRpbmdzVmVyc2lvbignMS4wJyk7XG4gICAgICAgIHRoaXMuX3NldHRpbmdzID0ge1xuICAgICAgICAgICAgYnVpbGRfZGF0ZTogbmV3IFNldHRpbmcoJycsICh2OmFueSkgPT4gdHJ1ZSksXG4gICAgICAgICAgICBidWlsZF92ZXJzaW9uOiBuZXcgU2V0dGluZygnJywgKHY6YW55KSA9PiB0cnVlKSxcbiAgICAgICAgICAgIHNldHRpbmdzX3ZlcnNpb246IG5ldyBTZXR0aW5nKCcxLjAnLCAodjphbnkpID0+IHRydWUpLFxuICAgIFxuICAgICAgICAgICAgYW1iaWVudE9jY2x1c2lvbjogbmV3IFNldHRpbmcodHJ1ZSwgKHY6YW55KSA9PiB0cnVlKSxcbiAgICAgICAgICAgIGF1dG9Sb3RhdGVTcGVlZDogbmV3IFNldHRpbmcoMC4wLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgYnVtcEFtcGxpdHVkZTogbmV3IFNldHRpbmcoMS4wLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgY2FtZXJhOiBuZXcgU2V0dGluZyh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IG5ldyBTZXR0aW5nKHsgeDogMCwgeTogMCwgejogMCB9LCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgICAgIHRhcmdldDogbmV3IFNldHRpbmcoeyB4OiAwLCB5OiAwLCB6OiAwIH0sICh2OmFueSkgPT4gdHJ1ZSksXG4gICAgICAgICAgICB9LCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgY2FtZXJhQXV0b0FkanVzdDogbmV3IFNldHRpbmcoZmFsc2UsICh2OmFueSkgPT4gdHJ1ZSksXG4gICAgICAgICAgICBjYW1lcmFNb3ZlbWVudER1cmF0aW9uOiBuZXcgU2V0dGluZygwLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgY2FtZXJhT3J0aG86IG5ldyBTZXR0aW5nKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogbmV3IFNldHRpbmcoeyB4OiAwLCB5OiAwLCB6OiAwIH0sICh2OmFueSkgPT4gdHJ1ZSksXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiBuZXcgU2V0dGluZyh7IHg6IDAsIHk6IDAsIHo6IDAgfSwgKHY6YW55KSA9PiB0cnVlKSxcbiAgICAgICAgICAgIH0sICh2OmFueSkgPT4gdHJ1ZSksXG4gICAgICAgICAgICBjYW1lcmFSZXZlcnRBdE1vdXNlVXA6IG5ldyBTZXR0aW5nKGZhbHNlLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgY2xlYXJBbHBoYTogbmV3IFNldHRpbmcoMS4wLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgY2xlYXJDb2xvcjogbmV3IFNldHRpbmcoJyNmZmZmZmYnLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgY29tbWl0UGFyYW1ldGVyczogbmV3IFNldHRpbmcoZmFsc2UsICh2OmFueSkgPT4gdHJ1ZSksXG4gICAgICAgICAgICBjb250cm9sRGFtcGluZzogbmV3IFNldHRpbmcoMC4xLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgY29udHJvbE5hbWVzOiBuZXcgU2V0dGluZyhudWxsLCAodikgPT4gKHY6YW55KSA9PiB0cnVlKSxcbiAgICAgICAgICAgIGNvbnRyb2xPcmRlcjogbmV3IFNldHRpbmcobnVsbCwgKHYpID0+ICh2OmFueSkgPT4gdHJ1ZSksXG4gICAgICAgICAgICBkZWZhdWx0TWF0ZXJpYWxDb2xvcjogbmV3IFNldHRpbmcoJyNkM2QzZDMnLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgZGlzYWJsZVBhbjogbmV3IFNldHRpbmcoZmFsc2UsICh2OmFueSkgPT4gdHJ1ZSksXG4gICAgICAgICAgICBkaXNhYmxlWm9vbTogbmV3IFNldHRpbmcoZmFsc2UsICh2OmFueSkgPT4gdHJ1ZSksXG4gICAgICAgICAgICBlbmFibGVBdXRvUm90YXRlOiBuZXcgU2V0dGluZyhmYWxzZSwgKHY6YW55KSA9PiB0cnVlKSxcbiAgICAgICAgICAgIGVuYWJsZVJvdGF0aW9uOiBuZXcgU2V0dGluZyh0cnVlLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgZW52aXJvbm1lbnRNYXA6IG5ldyBTZXR0aW5nKCdub25lJywgKHY6YW55KSA9PiB0cnVlKSxcbiAgICAgICAgICAgIGVudmlyb25tZW50TWFwUmVzb2x1dGlvbjogbmV3IFNldHRpbmcoJzEwMjQnLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgZm92OiBuZXcgU2V0dGluZyg0NSwgKHY6YW55KSA9PiB0cnVlKSxcbiAgICAgICAgICAgIGxpZ2h0U2NlbmU6IG5ldyBTZXR0aW5nKCdkZWZhdWx0JywgKHY6YW55KSA9PiB0cnVlKSxcbiAgICAgICAgICAgIGxpZ2h0U2NlbmVzOiBuZXcgU2V0dGluZyhudWxsLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgcGFuU3BlZWQ6IG5ldyBTZXR0aW5nKDAuNSwgKHY6YW55KSA9PiB0cnVlKSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnNIaWRkZW46IG5ldyBTZXR0aW5nKG51bGwsICh2KSA9PiAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgcG9pbnRTaXplOiBuZXcgU2V0dGluZygxLjAsICh2OmFueSkgPT4gdHJ1ZSksXG4gICAgICAgICAgICByZXZlcnRBdE1vdXNlVXBEdXJhdGlvbjogbmV3IFNldHRpbmcoODAwLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgcm90YXRlU3BlZWQ6IG5ldyBTZXR0aW5nKDAuMjUsICh2OmFueSkgPT4gdHJ1ZSksXG4gICAgICAgICAgICBzaG93RW52aXJvbm1lbnRNYXA6IG5ldyBTZXR0aW5nKGZhbHNlLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgc2hvd0dyaWQ6IG5ldyBTZXR0aW5nKGZhbHNlLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgc2hvd0dyb3VuZFBsYW5lOiBuZXcgU2V0dGluZyhmYWxzZSwgKHY6YW55KSA9PiB0cnVlKSxcbiAgICAgICAgICAgIHNob3dTaGFkb3dzOiBuZXcgU2V0dGluZyh0cnVlLCAodjphbnkpID0+IHRydWUpLFxuICAgICAgICAgICAgdG9wVmlldzogbmV3IFNldHRpbmcoZmFsc2UsICh2OmFueSkgPT4gdHJ1ZSksXG4gICAgICAgICAgICB6b29tRXh0ZW50RmFjdG9yOiBuZXcgU2V0dGluZygxLjAsICh2OmFueSkgPT4gdHJ1ZSksXG4gICAgICAgICAgICB6b29tU3BlZWQ6IG5ldyBTZXR0aW5nKDEuMCwgKHY6YW55KSA9PiB0cnVlKSxcbiAgICAgICAgfTtcblxuICAgICAgICBpZihzZXR0aW5nc0pTT04pIHtcbiAgICAgICAgICAgIGlmKCghc2V0dGluZ3NKU09OLmNsZWFyQWxwaGEgfHwgIXNldHRpbmdzSlNPTi5jbGVhckNvbG9yKSAmJiBzZXR0aW5nc0pTT04uYmFja2dyb3VuZENvbG9yICYmIHR5cGVvZiBzZXR0aW5nc0pTT04uYmFja2dyb3VuZENvbG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHNldHRpbmdzSlNPTi5jbGVhckFscGhhID0gc2V0dGluZ3NKU09OLmJhY2tncm91bmRDb2xvci5zdWJzdHJpbmcoMCwgOCk7XG4gICAgICAgICAgICAgICAgc2V0dGluZ3NKU09OLmNsZWFyQ29sb3IgPSBzZXR0aW5nc0pTT04uYmFja2dyb3VuZENvbG9yLnN1YnN0cmluZyg4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHNldHRpbmdzSlNPTi5kZWZhdWx0TWF0ZXJpYWxDb2xvciAmJiBBcnJheS5pc0FycmF5KHNldHRpbmdzSlNPTi5kZWZhdWx0TWF0ZXJpYWxDb2xvcikpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGVtcCA9ICcjJztcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2V0dGluZ3NKU09OLmRlZmF1bHRNYXRlcmlhbENvbG9yLmxlbmd0aDsgaSsrKVxuICAgICAgICAgICAgICAgICAgICB0ZW1wICs9IE51bWJlcihzZXR0aW5nc0pTT04uZGVmYXVsdE1hdGVyaWFsQ29sb3JbaV0pLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgICAgICAgICBzZXR0aW5nc0pTT04uZGVmYXVsdE1hdGVyaWFsQ29sb3IgPSB0ZW1wO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9mcm9tSlNPTihzZXR0aW5nc0pTT04sIHRoaXMuX3NldHRpbmdzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vICNlbmRyZWdpb24gQ29uc3RydWN0b3JzICgxKVxuXG4gICAgLy8gI3JlZ2lvbiBQdWJsaWMgTWV0aG9kcyAoMilcblxuICAgIHB1YmxpYyBjb252ZXJ0RnJvbVByZXZpb3VzVmVyc2lvbihvbGRTZXR0aW5nczogSVNldHRpbmdzKTogU2V0dGluZ3Mge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBwdWJsaWMgY29udmVydFRvUHJldmlvdXNWZXJzaW9uKCk6IFNldHRpbmdzIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLy8gI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kcyAoMilcbn07XG4iLCJpbXBvcnQgeyBJU2V0dGluZyB9IGZyb20gXCIuLi8uLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIjtcbmltcG9ydCB7IFNldHRpbmdzVmVyc2lvbiB9IGZyb20gXCIuLi8uLi9TZXR0aW5nc1ZlcnNpb25cIjtcbmltcG9ydCB7IFNldHRpbmcgfSBmcm9tIFwiLi4vLi4vU2V0dGluZ1wiO1xuaW1wb3J0IHsgSVNldHRpbmdzT2JqZWN0IH0gZnJvbSBcIi4vaW50ZXJmYWNlc1wiO1xuaW1wb3J0IHsgU2V0dGluZ3MgYXMgT2xkU2V0dGluZ3MgfSBmcm9tIFwiLi4vMS4wL1NldHRpbmdzXCI7XG5pbXBvcnQgeyBCYXNlU2V0dGluZ3MgfSBmcm9tIFwiLi4vLi4vQmFzZVNldHRpbmdzXCI7XG4vL2ltcG9ydCB0eXBlQ2hlY2tzIGZyb20gXCJzaGFwZWRpdmVybm9kZW1vZHVsZS10eXBlY2hlY2tzXCI7XG5cbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyBleHRlbmRzIEJhc2VTZXR0aW5ncyB7XG4gICAgLy8gI3JlZ2lvbiBQcm9wZXJ0aWVzICgxKVxuXG4gICAgcHJvdGVjdGVkIF9zZXR0aW5nczogSVNldHRpbmdzT2JqZWN0O1xuXG4gICAgLy8gI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzICgxKVxuXG4gICAgLy8gI3JlZ2lvbiBDb25zdHJ1Y3RvcnMgKDEpXG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0gc2V0dGluZ3NPYmplY3QgYSBzZXR0aW5ncyBvYmplY3QgdGhhdCBpcyBhIEpTT04gcmVwcmVzZW50YXRpb24gb2YgdGhpcyBTZXR0aW5nc09iamVjdFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHNldHRpbmdzSlNPTj86IGFueSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gbmV3IFNldHRpbmdzVmVyc2lvbignMi4wJyk7XG5cbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSB7XG4gICAgICAgICAgICBidWlsZF9kYXRlOiBuZXcgU2V0dGluZygnJywgJ3N0cmluZycsICcnLCBmYWxzZSksXG4gICAgICAgICAgICBidWlsZF92ZXJzaW9uOiBuZXcgU2V0dGluZygnJywgJ3N0cmluZycsICcnLCBmYWxzZSksXG4gICAgICAgICAgICBzZXR0aW5nc192ZXJzaW9uOiBuZXcgU2V0dGluZygnMi4wJywgJ3N0cmluZycsICcnLCBmYWxzZSksXG5cbiAgICAgICAgICAgIGFyOiB7XG4gICAgICAgICAgICAgICAgZW5hYmxlQ2FtZXJhU3luYzogbmV3IFNldHRpbmcoZmFsc2UsICdib29sZWFuJywgJ0VuYWJsZSAvIGRpc2FibGUgc3luY2hyb25pc2F0aW9uIG9mIHRoZSBjYW1lcmEgd2l0aCBBUiB0cmFja2luZyBpbmZvcm1hdGlvbi4gRW5hYmxpbmcgdGhpcyB3aWxsIGRpc2FibGUgdGhlIG9yYml0IGNvbnRyb2xzLicsIGZhbHNlKSxcbiAgICAgICAgICAgICAgICBlbmFibGVDYW1lcmFTeW5jSW5pdGlhbDogbmV3IFNldHRpbmcoZmFsc2UsICdib29sZWFuJywgJ0VuYWJsZSAvIGRpc2FibGUgdGhlIGluaXRhbCBzeW5jaHJvbmlzYXRpb24gb2YgdGhlIGNhbWVyYSB3aXRoIEFSIHRyYWNraW5nIGluZm9ybWF0aW9uLiBFbmFibGluZyB0aGlzIHdpbGwgZGlzYWJsZSB0aGUgb3JiaXQgY29udHJvbHMuJyksXG4gICAgICAgICAgICAgICAgZW5hYmxlTGlnaHRpbmdFc3RpbWF0aW9uOiBuZXcgU2V0dGluZyh0cnVlLCAnYm9vbGVhbicsICdFbmFibGUgLyBkaXNhYmxlIGF1dG9tYXRpYyBsaWdodGluZyBlc3RpbWF0aW9uLiBFbmFibGluZyB0aGlzIHN0b3JlcyB0aGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgbGlnaHRzIHdoaWNoIHdpbGwgZ2V0IHJlc3RvcmVkIG9uY2UgYXV0b21hdGljIGxpZ2h0aW5nIGVzdGltYXRpb24gZ2V0cyBkaXNhYmxlZCBhZ2Fpbi4nKSxcbiAgICAgICAgICAgICAgICBlbmFibGVUb3VjaENvbnRyb2xzOiBuZXcgU2V0dGluZyh0cnVlLCAnYm9vbGVhbicsICdFbmFibGUgLyBkaXNhYmxlIHRvdWNoIGNvbnRyb2xzIGZvciBwbGFjZW1lbnQgb2Ygb2JqZWN0cyBpbiB0aGUgQVIgc2NlbmUgd2hpbGUgQVIgY2FtZXJhIHN5bmNocm9uaXNhdGlvbiBpcyBlbmFibGVkLicpLFxuICAgICAgICAgICAgICAgIGVuYWJsZVRvdWNoQ29udHJvbFJvdGF0aW9uOiBuZXcgU2V0dGluZyh0cnVlLCAnYm9vbGVhbicsICdFbmFibGUgLyBkaXNhYmxlIHJvdGF0aW9uIG9mIG9iamVjdHMgaW4gdGhlIEFSIHNjZW5lIGJ5IG1lYW5zIG9mIHRvdWNoIGNvbnRyb2xzLiBUeXBpY2FsbHkgdGhpcyBzaG91bGQgYmUgZW5hYmxlZCBmb3Igb2JqZWN0cyB0byBiZSBwbGFjZWQgaG9yaXpvbnRhbGx5LicpLFxuICAgICAgICAgICAgICAgIGVuYWJsZUF1dG9tYXRpY1BsYWNlbWVudDogbmV3IFNldHRpbmcodHJ1ZSwgJ2Jvb2xlYW4nLCAnRW5hYmxlIC8gZGlzYWJsZSBpbml0aWFsIGF1dG9tYXRpYyBwbGFjZW1lbnQgb2Ygb2JqZWN0cyBpbiB0aGUgQVIgc2NlbmUgYXMgc29vbiBhcyBwbGFuZSBhbmNob3JzIGdldCBkZXRlY3RlZC4gQXV0b21hdGljIHBsYWNlbWVudCBzdG9wcyBvbmNlIHRoZSB1c2VyIHN0YXJ0cyB0byBpbnRlcmFjdC4nKSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0SGl0VGVzdFR5cGU6IG5ldyBTZXR0aW5nKCdleGlzdGluZ1BsYW5lVXNpbmdHZW9tZXRyeScsICh2YWx1ZTogc3RyaW5nKSA9PiBbJ2ZlYXR1cmVQb2ludCcsICdlc3RpbWF0ZWRIb3Jpem9udGFsUGxhbmUnLCAnZXN0aW1hdGVkVmVydGljYWxQbGFuZScsICdleGlzdGluZ1BsYW5lJywgJ2V4aXN0aW5nUGxhbmVVc2luZ0V4dGVudCcsICdleGlzdGluZ1BsYW5lVXNpbmdHZW9tZXRyeSddLmluY2x1ZGVzKHZhbHVlKSwgJ0RlZmF1bHQgdHlwZSBvZiBmZWF0dXJlIHRvIHVzZSBmb3IgaGl0IHRlc3RzLCB1c2VkIGJ5IHRvdWNoIGNvbnRyb2xzLiAnKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBjb25zdHJ1Y3Rvcjoge1xuICAgICAgICAgICAgLy8gICAgIHVzZVF1ZXJ5U3RyaW5nUGFyYW1ldGVyczogbmV3IFNldHRpbmcoZmFsc2UsICdib29sZWFuJywgJ2lmIHRydWUsIHRoZSBjb25zdHJ1Y3RvciB0cmllcyB0byByZWFkIHNldHRpbmdzIGZyb20gdGhlIHF1ZXJ5IHN0cmluZywgZXhpc3Rpbmcgc2V0dGluZ3Mgd2lsbCBub3QgYmUgb3ZlcnJpZGRlbicpLFxuICAgICAgICAgICAgLy8gICAgIGZvcmNlUXVlcnlTdHJpbmdQYXJhbWV0ZXJzOiBuZXcgU2V0dGluZyhmYWxzZSwgJ2Jvb2xlYW4nLCAnaWYgdHJ1ZSwgdGhlIGNvbnN0cnVjdG9yIHRyaWVzIHRvIHJlYWQgc2V0dGluZ3MgZnJvbSB0aGUgcXVlcnkgc3RyaW5nIGV4aXN0aW5nIHNldHRpbmdzIHdpbGwgYmUgb3ZlcnJpZGRlbicpLFxuICAgICAgICAgICAgLy8gICAgIGFwaXZlcnNpb246IG5ldyBTZXR0aW5nKCcyJywgJ3N0cmluZycsICdtYWpvciB2ZXJzaW9uIG9mIHRoZSBBUEkgdG8gcmV0dXJuIGJ5IGRlZmF1bHQnKSxcbiAgICAgICAgICAgIC8vICAgICBydW50aW1lSWQ6IG5ldyBTZXR0aW5nKCcnLCAnc3RyaW5nJywgJ3J1bnRpbWVJZCB0byBzZXQgZm9yIHJldHVybmVkIEFQSSBvYmplY3QsIGEgcmFuZG9tIG9uZSB3aWxsIGJlIGNob3NlbiBieSBkZWZhdWx0JyksXG4gICAgICAgICAgICAvLyAgICAgYXJraXRicmlkZ2U6IG5ldyBTZXR0aW5nKGZhbHNlLCAnYm9vbGVhbicsICdlbmFibGUgYnJpZGdlIHRvIFNoYXBlRGl2ZXIgaU9TIGFwcCB1c2luZyBBUktpdCcpLFxuICAgICAgICAgICAgLy8gICAgIG1vZGVsVmlld1VybDogbmV3IFNldHRpbmcoJ3VzLWVhc3QtMScsICdzdHJpbmcnLCAnb3B0aW9uYWwgbW9kZWwgdmlldyB1cmwgdG8gcGFzcyB0byB0aGUgZGVmYXVsdCBDb21tUGx1Z2luLCBhIGxlYWRpbmcgXFwnaHR0cHM6Ly9cXCcgd2lsbCBiZSBwcmVmaXhlZCBpZiBub3QgaW4gcGxhY2UsIFxcJ3VzLWVhc3QtMVxcJyBhbmQgXFwnZXUtY2VudHJhbC0xXFwnIG1heSBiZSB1c2VkIGFzIGFiYnJldmlhdGlvbnMgZm9yIFNoYXBlRGl2ZXJcXCdzIGRlZmF1bHQgc3lzdGVtcycpLFxuICAgICAgICAgICAgLy8gICAgIHRpY2tldDogbmV3IFNldHRpbmcoJycgLCAnc3RyaW5nJywgJ29wdGlvbmFsIG1vZGVsIHZpZXcgdGlja2V0IHRvIGJlIHVzZWQgZm9yIGltbWVkaWF0ZWx5IGluc3RhbnRpYXRpbmcgYSBDb21tUGx1Z2luIGluc3RhbmNlLiBObyBDb21tUGx1Z2luIGluc3RhbmNlIHdpbGwgYmUgcmVnaXN0ZXJlZCBieSB0aGUgY29uc3RydWN0b3IgaWYgdGhpcyBpcyBlbXB0eS4gRnVydGhlciBDb21tUGx1Z2luIGluc3RhbmNlcyBjYW4gYmUgaW5pdGlhbGl6ZWQgYWZ0ZXIgdGhlIGNvbnN0cnVjdG9yIGhhcyBmaW5pc2hlZCwgdXNpbmcgdGhlIEFQSSB2MiBmdW5jdGlvbiB7QGxpbmsgbW9kdWxlOkFwaUludGVyZmFjZVYyfkFwaVBsdWdpbkludGVyZmFjZSNyZWdpc3RlckNvbW1QbHVnaW5Bc3luYyByZWdpc3RlckNvbW1QbHVnaW5Bc3luY30uJyksXG4gICAgICAgICAgICAvLyAgICAgYXV0aG9yaXphdGlvbjogbmV3IFNldHRpbmcoJycsICdzdHJpbmcnLCAnb3B0aW9uYWwgYXV0aG9yaXphdGlvbiB0b2tlbiB0byBpbmNsdWRlIHdpdGggcmVxdWVzdHMgdG8gdGhlIG1vZGVsIHZpZXcgaW50ZXJmYWNlIChwcmVwZW5kIFxcJ0JlYXJlciBcXCcgeW91cnNlbGYgaWYgbmVjZXNzYXJ5KScpLFxuICAgICAgICAgICAgLy8gICAgIGlmcmFtZUlkOiBuZXcgU2V0dGluZygnc2R2LWlmcmFtZScsICdzdHJpbmcnKSxcbiAgICAgICAgICAgIC8vICAgICBpZnJhbWVEZWJ1Z2dpbmc6IG5ldyBTZXR0aW5nKGZhbHNlLCAnYm9vbGVhbicpXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgLy8gYnJvd3NlclVJOiB7XG4gICAgICAgICAgICAvLyAgICAgYW5jaG9yRWxlbWVudHM6IG5ldyBTZXR0aW5nKHRydWUsICdib29sZWFuJywgJ2Nob29zZSB3aGV0aGVyIHRoZSBkZWZhdWx0IGhhbmRsZXIgZm9yIGNyZWF0aW5nIERPTSBlbGVtZW50cyByZXByZXNlbnRpbmcgYW5jaG9ycyBzaGFsbCBiZSBpbnN0YW50aWF0ZWQnKSxcbiAgICAgICAgICAgIC8vICAgICBicmFuZGVkTW9kZTogbmV3IFNldHRpbmcodHJ1ZSwgJ2Jvb2xlYW4nLCAnY2hvb3NlIHdoZXRoZXIgU2hhcGVEaXZlciBicmFuZGluZyBzaGFsbCBiZSBzaG93biBkdXJpbmcgaW5pdGlhbCBsb2FkaW5nJyksXG4gICAgICAgICAgICAvLyAgICAgYnJhbmRlZE1vZGVDb25zb2xlOiBuZXcgU2V0dGluZyhudWxsLCAnYW55JyksXG4gICAgICAgICAgICAvLyAgICAgYnVzeUdyYXBoaWM6IG5ldyBTZXR0aW5nKCcnLCAnc3RyaW5nJywgJ29wdGlvbmFsIFVSTCB0byBhbiBpbWFnZSB3aGljaCBzaGFsbCBiZSBzaG93biBpbnN0ZWFkIG9mIHRoZSBidXN5IHNwaW5uZXInKSxcbiAgICAgICAgICAgIC8vICAgICBjb250YWluZXJDb250cm9sczogbmV3IFNldHRpbmcodW5kZWZpbmVkLCAnYW55JywgJ29wdGlvbmFsIGNvbnRhaW5lciB0byB1c2UgZm9yIGNyZWF0aW5nIHBhcmFtZXRlciBjb250cm9scywgbWF5IGJlIHVuZGVmaW5lZCBpbiB3aGljaCBjYXNlIGEgRE9NIGVsZW1lbnQgd2hvc2UgaWQgaXMgZG9tRWxlbWVudElkUHJlZml4K1xcJy1jb250cm9sc1xcJyB3aWxsIGJlIGxvb2tlZCBmb3IuIFNldCB0aGlzIHRvIGEgZmFsc3kgdmFsdWUgZGlmZmVyZW50IGZyb20gYHVuZGVmaW5lZGAgdG8gcHJldmVudCB0aGUgc2V0dGluZ3Mgd2lkZ2V0IGZyb20gYmVpbmcgY3JlYXRlZC4gTm90IGNyZWF0aW5nIHRoZSBzZXR0aW5ncyBhbmQgY29udHJvbHMgd2lkZ2V0cyBzYXZlcyBzb21lIHJlc291cmNlcyBvbiBsb2FkaW5nIG9mIHRoZSB2aWV3ZXIuJyksXG4gICAgICAgICAgICAvLyAgICAgY29udGFpbmVyU2V0dGluZ3M6IG5ldyBTZXR0aW5nKHVuZGVmaW5lZCwgJ2FueScsICdvcHRpb25hbCBjb250YWluZXIgdG8gdXNlIGZvciBjcmVhdGluZyBzZXR0aW5ncyBjb250cm9scywgbWF5IGJlIGB1bmRlZmluZWRgIGluIHdoaWNoIGNhc2UgYSBET00gZWxlbWVudCB3aG9zZSBpZCBpcyBkb21FbGVtZW50SWRQcmVmaXgrXFwnLXNldHRpbmdzXFwnIHdpbGwgYmUgbG9va2VkIGZvci4gU2V0IHRoaXMgdG8gYSBmYWxzeSB2YWx1ZSBkaWZmZXJlbnQgZnJvbSBgdW5kZWZpbmVkYCB0byBwcmV2ZW50IHRoZSBzZXR0aW5ncyB3aWRnZXQgZnJvbSBiZWluZyBjcmVhdGVkLiBOb3QgY3JlYXRpbmcgdGhlIHNldHRpbmdzIGFuZCBjb250cm9scyB3aWRnZXRzIHNhdmVzIHNvbWUgcmVzb3VyY2VzIG9uIGxvYWRpbmcgb2YgdGhlIHZpZXdlci4nKSxcbiAgICAgICAgICAgIC8vICAgICBjcmVhdGVCdXR0b25zOiBuZXcgU2V0dGluZyh0cnVlLCAnYm9vbGVhbicsICdjaG9vc2Ugd2hldGhlciBzdGFuZGFyZCBidXR0b25zIHdpbGwgYmUgY3JlYXRlZCBmb3IgdGhlIHZpZXdwb3J0JyksXG4gICAgICAgICAgICAvLyAgICAgZG9tRWxlbWVudElkUHJlZml4OiBuZXcgU2V0dGluZygnc2R2LWNvbnRhaW5lcicsICdzdHJpbmcnLCAncHJlZml4IHRvIHVzZSBmb3IgbG9va3VwIG9mIGRvbSBlbGVtZW50cycpLFxuICAgICAgICAgICAgLy8gICAgIGVkaXRNb2RlOiBuZXcgU2V0dGluZyhmYWxzZSwgJ2Jvb2xlYW4nLCAnY2hvb3NlIHdoZXRoZXIgdGhlIHBhcmFtZXRlciBjb250cm9scyBzaG91bGQgYmUgaW5pdGlhbGl6ZWQgaW4gZWRpdCBtb2RlJyksXG4gICAgICAgICAgICAvLyAgICAgZXhwb3J0TW9kYWw6IG5ldyBTZXR0aW5nKHRydWUsICdib29sZWFuJywgJ2Nob29zZSB3aGV0aGVyIGEgbW9kYWwgZGlhbG9nIGZvciBleHBvcnQgaGFuZGxpbmcgc2hhbGwgYmUgaW5zdGFudGlhdGVkJyksXG4gICAgICAgICAgICAvLyAgICAgc2hvd0NvbnRyb2xzQnV0dG9uOiBuZXcgU2V0dGluZyh0cnVlLCAnYm9vbGVhbicsICdjaG9vc2Ugd2hldGhlciBhIGJ1dHRvbiBmb3Igc2hvd2luZy9oaWRpbmcgdGhlIHBhcmFtZXRlciBjb250cm9scyBzaGFsbCBiZSBzaG93bicpLFxuICAgICAgICAgICAgLy8gICAgIHNob3dDb250cm9sc0luaXRpYWw6IG5ldyBTZXR0aW5nKGZhbHNlLCAnYm9vbGVhbicsICdjaG9vc2Ugd2hldGhlciB0aGUgcGFyYW1ldGVyIGNvbnRyb2xzIHNoYWxsIGJlIHNob3duIGluaXRpYWxseScpLFxuICAgICAgICAgICAgLy8gICAgIHNob3dTZXR0aW5nc0J1dHRvbjogbmV3IFNldHRpbmcodHJ1ZSwgJ2Jvb2xlYW4nLCAnY2hvb3NlIHdoZXRoZXIgYSBidXR0b24gZm9yIHNob3dpbmcvaGlkaW5nIHRoZSBzZXR0aW5ncyBjb250cm9scyBzaGFsbCBiZSBzaG93bicpLFxuICAgICAgICAgICAgLy8gICAgIHNob3dTZXR0aW5nc0luaXRpYWw6IG5ldyBTZXR0aW5nKGZhbHNlLCAnYm9vbGVhbicsICdjaG9vc2Ugd2hldGhlciB0aGUgc2V0dGluZ3MgY29udHJvbHMgc2hhbGwgYmUgc2hvd24gaW5pdGlhbGx5JyksXG4gICAgICAgICAgICAvLyAgICAgc2hvd1pvb21CdXR0b246IG5ldyBTZXR0aW5nKHRydWUsICdib29sZWFuJywgJ2Nob29zZSB3aGV0aGVyIGEgYnV0dG9uIGZvciB6b29taW5nIHNoYWxsIGJlIHNob3duJyksXG4gICAgICAgICAgICAvLyAgICAgem9vbUJ1dHRvblJlc2V0c0NhbWVyYTogbmV3IFNldHRpbmcoZmFsc2UsICdib29sZWFuJywgJ2Nob29zZSB3aGV0aGVyIHRoZSB6b29tIGJ1dHRvbiBzaGFsbCByZXNldCB0aGUgY2FtZXJhIHRvIGl0cyBkZWZhdWx0IHBvc2l0aW9uJyksXG4gICAgICAgICAgICAvLyAgICAgc2hvd0Z1bGxzY3JlZW5CdXR0b246IG5ldyBTZXR0aW5nKHRydWUsICdib29sZWFuJywgJ2Nob29zZSB3aGV0aGVyIGEgYnV0dG9uIGZvciB0by9mcm9tIGZ1bGxzY3JlZW4gbW9kZSBzaGFsbCBiZSBzaG93bicpLFxuICAgICAgICAgICAgLy8gICAgIHNob3dJbml0aWFsU3Bpbm5lcjogbmV3IFNldHRpbmcodHJ1ZSwgJ2Jvb2xlYW4nLCAnY2hvb3NlIHdoZXRoZXIgYW4gaW5pdGlhbCBsb2FkaW5nIHNwaW5uZXIgc2hhbGwgYmUgc2hvd24nKSxcbiAgICAgICAgICAgIC8vICAgICBzaG93QnVzeVNwaW5uZXI6IG5ldyBTZXR0aW5nKHRydWUsICdib29sZWFuJywgJ2Nob29zZSB3aGV0aGVyIGEgYnVzeSBtb2RlIHNwaW5uZXIgb3IgdGhlIG9wdGlvbmFsIGN1c3RvbSBidXN5R3JhcGhpYyBzaGFsbCBiZSBzaG93bicpLFxuICAgICAgICAgICAgLy8gICAgIHZpZXdwb3J0T3ZlcmxheXM6IG5ldyBTZXR0aW5nKHRydWUsICdib29sZWFuJywgJ2Nob29zZSB3aGV0aGVyIHZpZXdwb3J0IG92ZXJsYXlzIHdpbGwgYmUgY3JlYXRlZCBhdCBhbGwgKGJ1dHRvbnMsIHNwaW5uZXJzLCBwcm9ncmVzcyBiYXIpJyksXG4gICAgICAgICAgICAvLyB9LFxuICAgICAgICAgICAgZGVmYXVsdE1hdGVyaWFsOiB7XG4gICAgICAgICAgICAgICAgLy8gbmFtZTogbmV3IFNldHRpbmcoJ0RlZmF1bHQgbWF0ZXJpYWwnLCAnc3RyaW5nJywgJycsIGZhbHNlKSxcbiAgICAgICAgICAgICAgICAvLyB2ZXJzaW9uOiBuZXcgU2V0dGluZygnMi4wJywgJ3N0cmluZycsICcnLCBmYWxzZSksXG4gICAgICAgICAgICAgICAgYnVtcEFtcGxpdHVkZTogbmV3IFNldHRpbmcoMSwgJ25vdG5lZ2F0aXZlJywgJ0J1bXAgYW1wbGl0dWRlIG9mIHRoZSBkZWZhdWx0IG1hdGVyaWFsJyksXG4gICAgICAgICAgICAgICAgY29sb3I6IG5ldyBTZXR0aW5nKCcjZDNkM2QzJywgJ3N0cmluZycsICdDb2xvciBvZiB0aGUgZGVmYXVsdCBtYXRlcmlhbCcpLFxuICAgICAgICAgICAgICAgIG1ldGFsbmVzczogbmV3IFNldHRpbmcoMC4wLCAnZmFjdG9yJywgJ01ldGFsbmVzcyBvZiB0aGUgZGVmYXVsdCBtYXRlcmlhbCcpLFxuICAgICAgICAgICAgICAgIHJvdWdobmVzczogbmV3IFNldHRpbmcoMS4wLCAnZmFjdG9yJywgJ1JvdWdobmVzcyBvZiB0aGUgZGVmYXVsdCBtYXRlcmlhbCcpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgICBjb250cm9sT3JkZXI6IG5ldyBTZXR0aW5nKFtdLCAnc3RyaW5nYXJyYXknLCAnJyksXG4gICAgICAgICAgICAgICAgY29udHJvbE5hbWVzOiBuZXcgU2V0dGluZyhbXSwgJ3N0cmluZ2FycmF5JywgJycpLFxuICAgICAgICAgICAgICAgIHBhcmFtZXRlcnNIaWRkZW46IG5ldyBTZXR0aW5nKFtdLCAnc3RyaW5nYXJyYXknLCAnJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlld2VyOiB7XG4gICAgICAgICAgICAgICAgYmx1clNjZW5lV2hlbkJ1c3k6IG5ldyBTZXR0aW5nKHRydWUsICdib29sZWFuJywgJ0JsdXIgb3IgZG9uXFwndCBibHVyIHRoZSBzY2VuZSB3aGlsZSBhIHByb2Nlc3MgaXMgYnVzeScpLFxuICAgICAgICAgICAgICAgIC8vIGNvbnRhaW5lcjogbmV3IFNldHRpbmcodW5kZWZpbmVkLCAnYW55JywgJ0NvbnRhaW5lciB0byB1c2UgZm9yIGNyZWF0aW5nIHRoZSB2aWV3cG9ydCwgbWF5IGJlIHVuZGVmaW5lZCBpbiB3aGljaCBjYXNlIGEgRE9NIGVsZW1lbnQgd2hvc2UgaWQgaXMgZG9tRWxlbWVudElkUHJlZml4K1xcJy12aWV3cG9ydFxcJyB3aWxsIGJlIGxvb2tlZCBmb3IuIEFuIGFycmF5IG9mIGNvbnRhaW5lcnMgbWF5IGJlIHBhc3NlZCB0byBjcmVhdGUgbXVsdGlwbGUgdmlld3BvcnRzLiBQYXNzIGFuIGVtcHR5IGFycmF5IHRvIGF2b2lkIGNyZWF0aW5nIGEgdmlld3BvcnQuJyksXG4gICAgICAgICAgICAgICAgLy8gZGVmZXJHZW9tZXRyeUxvYWRpbmc6IG5ldyBTZXR0aW5nKGZhbHNlLCAnYm9vbGVhbicsICd0cnVlOiB0ZWxsIHRoZSBDb21tUGx1Z2luIGluc3RhbmNlIGNyZWF0ZWQgYnkgdGhlIGNvbnN0cnVjdG9yIHRvIG5vdCBsb2FkIGFueSBnZW9tZXRyeSB1bnRpbCBmaXJzdCBwYXJhbWV0ZXIgdXBkYXRlIG9yIHJlZnJlc2gsIGZhbHNlOiBsb2FkIGRlZmF1bHQgZ2VvbWV0cnknKSxcbiAgICAgICAgICAgICAgICBpZ25vcmVTdXBlcnNlZGVkOiBuZXcgU2V0dGluZyh0cnVlLCAnYm9vbGVhbicsICdJZ25vcmUgaW50ZXJtZWRpYXRlIHNvbHV0aW9ucyB3aGljaCBhdCB0aGUgdGltZSBvZiB0aGVpciBhcnJpdmFsIGhhdmUgYWxyZWFkeSBiZWVuIHN1cGVyc2VkZWQgYnkgYW5vdGhlciBjdXN0b21pemF0aW9uIHJlcXVlc3QnLCBmYWxzZSksXG4gICAgICAgICAgICAgICAgbG9nZ2luZ0xldmVsOiBuZXcgU2V0dGluZygtMSwgKHZhbHVlOiBudW1iZXIpID0+IHZhbHVlID49IC0xICYmIHZhbHVlIDw9MywgJ0xldmVsIG9mIGxvZyBtZXNzYWdlcyBzaG93biBvbiB0aGUgY29uc29sZSwgYWxsb3dlZCB2YWx1ZXM6IC0xIChub25lKSwgMCAoZXJyb3IpLCAxICh3YXJuKSwgMiAoaW5mbyksIDMgKGRlYnVnKScsIGZhbHNlKSxcbiAgICAgICAgICAgICAgICAvLyBjb21tUGx1Z2luUnVudGltZUlkOiBuZXcgU2V0dGluZygnQ29tbVBsdWdpbl8xJywgJ3N0cmluZycsICdydW50aW1lIGlkIHRvIHVzZSBmb3IgdGhlIENvbW1QbHVnaW4gaW5zdGFuY2UgY3JlYXRlZCBieSB0aGUgY29uc3RydWN0b3InKSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlTG9nZ2luZ0xldmVsOiBuZXcgU2V0dGluZygtMSwgKHZhbHVlOiBudW1iZXIpID0+IHZhbHVlID49IC0xICYmIHZhbHVlIDw9MywgJ0xvZyBsZXZlbCB0byBiZSB1c2VkIGZvciBsb2dnaW5nIGludGVybmFsIG1lc3NhZ2VzLCBhbGxvd2VkIHZhbHVlczogLTEgKG5vbmUpLCAwIChlcnJvciksIDEgKHdhcm4pLCAyIChpbmZvKSwgMyAoZGVidWcpJywgZmFsc2UpLFxuXG4gICAgICAgICAgICAgICAgLy8gc3RyaWN0TW9kZTogbmV3IFNldHRpbmcoZmFsc2UsICdib29sZWFuJywgJycsIGZhbHNlKSxcbiAgICAgICAgICAgICAgICBzaG93TWVzc2FnZXM6IG5ldyBTZXR0aW5nKHRydWUsICdib29sZWFuJywgJ1Nob3cgb3IgZG9uXFwndCBzaG93IHVzZXIgbWVzc2FnZXMgaW4gdGhlIHZpZXdwb3J0JywgZmFsc2UpLFxuICAgICAgICAgICAgICAgIGhhc1Jlc3RvcmVkU2V0dGluZ3M6IG5ldyBTZXR0aW5nKGZhbHNlLCAnYm9vbGVhbicsICdUcnVlIGlmIHNldHRpbmdzIGhhdmUgYmVlbiByZXN0b3JlZCBmcm9tIGEgc2V0dGluZ3Mgb2JqZWN0IGRlbGl2ZXJlZCBieSBhIENvbW1QbHVnaW4nLCBmYWxzZSksXG4gICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBleHBvc2VWaWV3ZXI6IG5ldyBTZXR0aW5nKGZhbHNlLCAnYm9vbGVhbicpLFxuICAgICAgICAgICAgICAgIGNvbW1pdFBhcmFtZXRlcnM6IG5ldyBTZXR0aW5nKGZhbHNlLCAnYm9vbGVhbicsICdVc2Ugb3IgZG9uXFwndCBjb21taXQgbW9kZSBmb3IgcGFyYW1ldGVycycpLFxuICAgICAgICAgICAgICAgIGNvbW1pdFNldHRpbmdzOiBuZXcgU2V0dGluZyhmYWxzZSwgJ2Jvb2xlYW4nLCAnVXNlIG9yIGRvblxcJ3QgY29tbWl0IG1vZGUgZm9yIHNldHRpbmdzJyksXG4gICAgICAgICAgICAgICAgdmlld2VyUnVudGltZUlkOiBuZXcgU2V0dGluZygnJywgJ3N0cmluZycsICdUaGUgcnVudGltZSBpZCBvZiB0aGlzIHZpZXdlcicsIGZhbHNlKSxcblxuICAgICAgICAgICAgICAgIHNjZW5lOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IG5ldyBTZXR0aW5nKGZhbHNlLCAnYm9vbGVhbicsICdTaG93IC8gaGlkZSB0aGUgc2NlbmUnLCBmYWxzZSksXG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3dTY2VuZU1vZGU6IG5ldyBTZXR0aW5nKDIsICh2YWx1ZTogbnVtYmVyKSA9PiB2YWx1ZSA+PSAwICYmIHZhbHVlIDw9IDMsICd3aGVuIHRvIGZhZGUgaW4gdGhlIHNjZW5lOiBPTl9TSE9XKDEpLCBPTl9GSVJTVF9QTFVHSU4oMiksIE9OX0FMTF9QTFVHSU5TKDMpJyksXG4gICAgICAgICAgICAgICAgICAgIHNob3dTY2VuZVRyYW5zaXRpb246IG5ldyBTZXR0aW5nKCcxcycsICdzdHJpbmcnLCAnJyksXG4gICAgICAgICAgICAgICAgICAgIGNhbWVyYToge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b0FkanVzdDogbmV3IFNldHRpbmcoZmFsc2UsICdib29sZWFuJywgJ0VuYWJsZSAvIGRpc2FibGUgdGhhdCB0aGUgY2FtZXJhIGFkanVzdHMgdG8gZ2VvbWV0cnkgdXBkYXRlcycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FtZXJhTW92ZW1lbnREdXJhdGlvbjogbmV3IFNldHRpbmcoODAwLCAnbm90bmVnYXRpdmUnLCAnRGVmYXVsdCBkdXJhdGlvbiBvZiBjYW1lcmEgbW92ZW1lbnRzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjYW1lcmFUeXBlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBlcnNwZWN0aXZlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG5ldyBTZXR0aW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgU2V0dGluZyh7IHg6IDAsIHk6IDAsIHo6IDAgfSwgJ3ZlY3RvcjNhbnknLCAnRGVmYXVsdCBwb3NpdGlvbiBmb3IgdGhlIHBlcnNwZWN0aXZlIGNhbWVyYScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiBuZXcgU2V0dGluZyh7IHg6IDAsIHk6IDAsIHo6IDAgfSwgJ3ZlY3RvcjNhbnknLCAnRGVmYXVsdCB0YXJnZXQgZm9yIHRoZSBwZXJzcGVjdGl2ZSBjYW1lcmEnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKHZhbHVlOiB7IHBvc2l0aW9uOiB7IHg6IDAsIHk6IDAsIHo6IDAgfSwgdGFyZ2V0OiB7IHg6IDAsIHk6IDAsIHo6IDAgfSB9KSA9PiB0cnVlLCAnRGVmYXVsdCBwb3NpdGlvbiBhbmQgdGFyZ2V0IGZvciB0aGUgcGVyc3BlY3RpdmUgY2FtZXJhJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvdjogbmV3IFNldHRpbmcoNDUsICdub3RuZWdhdGl2ZScsICdDYW1lcmEgZnJ1c3R1bSB2ZXJ0aWNhbCBmaWVsZCBvZiB2aWV3IGFuZ2xlLCB1bml0IGRlZ3JlZSwgaW50ZXJ2YWwgWzAsMTgwXScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sczogbmV3IFNldHRpbmcoMCwgKHZhbHVlOiBudW1iZXIpID0+IHZhbHVlID09PSAwIHx8IHZhbHVlID09PSAxLCAnU2V0IGNhbWVyYSBjb250cm9sIHR5cGUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9ydGhvZ3JhcGhpYzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiBuZXcgU2V0dGluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogbmV3IFNldHRpbmcoeyB4OiAwLCB5OiAwLCB6OiAwIH0sICd2ZWN0b3IzYW55JywgJ0RlZmF1bHQgcG9zaXRpb24gZm9yIHRoZSBvcnRob2dyYXBoaWMgY2FtZXJhJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IG5ldyBTZXR0aW5nKHsgeDogMCwgeTogMCwgejogMCB9LCAndmVjdG9yM2FueScsICdEZWZhdWx0IHRhcmdldCBmb3IgdGhlIG9ydGhvZ3JhcGhpYyBjYW1lcmEnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKHZhbHVlOiB7IHBvc2l0aW9uOiB7IHg6IDAsIHk6IDAsIHo6IDAgfSwgdGFyZ2V0OiB7IHg6IDAsIHk6IDAsIHo6IDAgfSB9KSA9PiB0cnVlLCAnRGVmYXVsdCBwb3NpdGlvbiBhbmQgdGFyZ2V0IGZvciB0aGUgb3J0aG9ncmFwaGljIGNhbWVyYScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlOiBuZXcgU2V0dGluZygwLCAodmFsdWU6IG51bWJlcikgPT4gdmFsdWUgPj0gMCAmJiB2YWx1ZSA8PTYsICAnU2V0IGNhbWVyYSB0eXBlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmJpdDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvUm90YXRpb25TcGVlZDogbmV3IFNldHRpbmcoMCwgJ251bWJlcicsICdTcGVlZCBvZiBhdXRvcmF0aW9uLCBjYW4gYmUgbmVnYXRpdmUsIGFsc28gcmVmZXIgdG8gZW5hYmxlQXV0b1JvdGF0aW9uJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhbXBpbmc6IG5ldyBTZXR0aW5nKDAuMSwgJ25vdG5lZ2F0aXZlJywgJ0hvdyBtdWNoIHRvIGRhbXAgY2FtZXJhIG1vdmVtZW50cyBieSB0aGUgdXNlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVBdXRvUm90YXRpb246IG5ldyBTZXR0aW5nKGZhbHNlLCAnYm9vbGVhbicsICdFbmFibGUgLyBkaXNhYmxlIGF1dG9tYXRpYyByb3RhdGlvbiBvZiB0aGUgY2FtZXJhLCBhbHNvIHJlZmVyIHRvIGF1dG9Sb3RhdGlvblNwZWVkJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZUtleVBhbjogbmV3IFNldHRpbmcoZmFsc2UsICdib29sZWFuJywgJ0VuYWJsZSAvIGRpc2FibGUgcGFubmluZyB1c2luZyB0aGUga2V5Ym9hcmQsIGFsc28gcmVmZXIgdG8gZW5hYmxlUGFuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVBhbjogbmV3IFNldHRpbmcodHJ1ZSwgJ2Jvb2xlYW4nLCAnRW5hYmxlIC8gZGlzYWJsZSBwYW5uaW5nIGluIGdlbmVyYWwsIGFsc28gcmVmZXIgdG8gZW5hYmxlS2V5UGFuJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZVJvdGF0aW9uOiBuZXcgU2V0dGluZyh0cnVlLCAnYm9vbGVhbicsICdFbmFibGUgLyBkaXNhYmxlIGNhbWVyYSByb3RhdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVab29tOiBuZXcgU2V0dGluZyh0cnVlLCAnYm9vbGVhbicsICdFbmFibGUgLyBkaXNhYmxlIHpvb21pbmcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IG5ldyBTZXR0aW5nKHsga2V5czogeyB1cDogMzgsIGRvd246IDQwLCBsZWZ0OiAzNywgcmlnaHQ6IDM5IH0sIG1vdXNlOiB7IHJvdGF0ZTogMCwgem9vbTogMSwgcGFuOiAyIH0sIHRvdWNoOiB7IHJvdGF0ZTogMSwgem9vbTogMiwgcGFuOiAzIH0sIH0sICdhbnknKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5UGFuU3BlZWQ6IG5ldyBTZXR0aW5nKDAuNSwgJ2ZhY3RvcicsICdTcGVlZCBvZiBwYW5uaW5nIHdoZW4gdXNpbmcgdGhlIGtleWJvYXJkJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVtZW50U21vb3RobmVzczogbmV3IFNldHRpbmcoMC41LCAnZmFjdG9yJywgJ0hvdyBtdWNoIHRvIHRoZSBjdXJyZW50IG1vdmVtZW50IGlzIGFmZmVjdGVkIGJ5IHRoZSBwcmV2aW91cyBvbmUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdHJpY3Rpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1YmU6IG5ldyBTZXR0aW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluOiBuZXcgU2V0dGluZyh7IHg6IC1JbmZpbml0eSwgeTogLUluZmluaXR5LCB6OiAtSW5maW5pdHkgfSwgJ3ZlY3RvcjNhbnknLCAnUmVzdHJpY3Rpb24gb2YgdGhlIGNhbWVyYSBwb3NpdGlvbiBpbnNpZGUgYSBjdWJlLCBtaW5pbXVtIGNvcm5lciBvZiB0aGUgY3ViZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg6IG5ldyBTZXR0aW5nKHsgeDogSW5maW5pdHksIHk6IEluZmluaXR5LCB6OiBJbmZpbml0eSB9LCAndmVjdG9yM2FueScsICdSZXN0cmljdGlvbiBvZiB0aGUgY2FtZXJhIHBvc2l0aW9uIGluc2lkZSBhIGN1YmUsIG1heGltdW0gY29ybmVyIG9mIHRoZSBjdWJlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKHZhbHVlOiB7IG1pbjogeyB4OiAwLCB5OiAwLCB6OiAwIH0sIG1heDogeyB4OiAwLCB5OiAwLCB6OiAwIH0gfSkgPT4gdHJ1ZSwgJ1Jlc3RyaWN0aW9uIG9mIHRoZSBjYW1lcmEgcG9zaXRpb24gaW5zaWRlIGEgY3ViZSwgbWluaW11bSBhbmQgbWF4aW11bSBjb3JuZXIgb2YgdGhlIGN1YmUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGhlcmU6IG5ldyBTZXR0aW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VudGVyOiBuZXcgU2V0dGluZyh7IHg6IDAsIHk6IDAsIHo6IDAgfSwgJ3ZlY3RvcjNhbnknLCAnUmVzdHJpY3Rpb24gb2YgdGhlIGNhbWVyYSBwb3NpdGlvbiBpbnNpZGUgYSBzcGhlcmUsIGNlbnRlciBvZiB0aGUgc3BoZXJlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGl1czogbmV3IFNldHRpbmcoSW5maW5pdHksICdub3RuZWdhdGl2ZScsICdSZXN0cmljdGlvbiBvZiB0aGUgY2FtZXJhIHBvc2l0aW9uIGluc2lkZSBhIHNwaGVyZSwgcmFkaXVzIG9mIHRoZSBzcGhlcmUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAodmFsdWU6IHsgY2VudGVyOiB7IHg6IDAsIHk6IDAsIHo6IDAgfSwgcmFkaXVzOiBudW1iZXIgfSkgPT4gdHJ1ZSwgJ1Jlc3RyaWN0aW9uIG9mIHRoZSBjYW1lcmEgcG9zaXRpb24gaW5zaWRlIGEgc3BoZXJlLCBjZW50ZXIgYW5kIHJhZGl1cyBvZiB0aGUgc3BoZXJlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ViZTogbmV3IFNldHRpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW46IG5ldyBTZXR0aW5nKHsgeDogLUluZmluaXR5LCB5OiAtSW5maW5pdHksIHo6IC1JbmZpbml0eSB9LCAndmVjdG9yM2FueScsICdSZXN0cmljdGlvbiBvZiB0aGUgY2FtZXJhIHRhcmdldCBpbnNpZGUgYSBjdWJlLCBtaW5pbXVtIGNvcm5lciBvZiB0aGUgY3ViZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg6IG5ldyBTZXR0aW5nKHsgeDogSW5maW5pdHksIHk6IEluZmluaXR5LCB6OiBJbmZpbml0eSB9LCAndmVjdG9yM2FueScsICdSZXN0cmljdGlvbiBvZiB0aGUgY2FtZXJhIHRhcmdldCBpbnNpZGUgYSBjdWJlLCBtYXhpbXVtIGNvcm5lciBvZiB0aGUgY3ViZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sICh2YWx1ZTogeyBtaW46IHsgeDogMCwgeTogMCwgejogMCB9LCBtYXg6IHsgeDogMCwgeTogMCwgejogMCB9IH0pID0+IHRydWUsICdSZXN0cmljdGlvbiBvZiB0aGUgY2FtZXJhIHRhcmdldCBpbnNpZGUgYSBjdWJlLCBtaW5pbXVtIGFuZCBtYXhpbXVtIGNvcm5lciBvZiB0aGUgY3ViZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwaGVyZTogbmV3IFNldHRpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZW50ZXI6IG5ldyBTZXR0aW5nKHsgeDogMCwgeTogMCwgejogMCB9LCAndmVjdG9yM2FueScsICdSZXN0cmljdGlvbiBvZiB0aGUgY2FtZXJhIHRhcmdldCBpbnNpZGUgYSBzcGhlcmUsIGNlbnRlciBvZiB0aGUgc3BoZXJlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhZGl1czogbmV3IFNldHRpbmcoSW5maW5pdHksICdub3RuZWdhdGl2ZScsICdSZXN0cmljdGlvbiBvZiB0aGUgY2FtZXJhIHRhcmdldCBpbnNpZGUgYSBzcGhlcmUsIHJhZGl1cyBvZiB0aGUgc3BoZXJlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgKHZhbHVlOiB7IGNlbnRlcjogeyB4OiAwLCB5OiAwLCB6OiAwIH0sIHJhZGl1czogbnVtYmVyIH0pID0+IHRydWUsICdSZXN0cmljdGlvbiBvZiB0aGUgY2FtZXJhIHRhcmdldCBpbnNpZGUgYSBzcGhlcmUsIGNlbnRlciBhbmQgcmFkaXVzIG9mIHRoZSBzcGhlcmUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGlvbjogbmV3IFNldHRpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pblBvbGFyQW5nbGU6IG5ldyBTZXR0aW5nKDAsICh2YWx1ZTogbnVtYmVyKSA9PnRydWUsICdNaW5pbXVtIHBvbGFyIGFuZ2xlIG9mIHRoZSBjYW1lcmEgcG9zaXRpb24gd2l0aCByZXNwZWN0IHRvIHRoZSBjYW1lcmEgdGFyZ2V0LCB1bml0IGRlZ3JlZSwgaW50ZXJ2YWwgWzAsMTgwXScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heFBvbGFyQW5nbGU6IG5ldyBTZXR0aW5nKDE4MCwgKHZhbHVlOiBudW1iZXIpID0+IHRydWUsICdNYXhpbXVtIHBvbGFyIGFuZ2xlIG9mIHRoZSBjYW1lcmEgcG9zaXRpb24gd2l0aCByZXNwZWN0IHRvIHRoZSBjYW1lcmEgdGFyZ2V0LCB1bml0IGRlZ3JlZSwgaW50ZXJ2YWwgWzAsMTgwXScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkF6aW11dGhBbmdsZTogbmV3IFNldHRpbmcoLUluZmluaXR5LCAnbnVtYmVyJywgJ01pbmltdW0gYXppbXV0aCBhbmdsZSBvZiB0aGUgY2FtZXJhIHBvc2l0aW9uIHdpdGggcmVzcGVjdCB0byB0aGUgY2FtZXJhIHRhcmdldCwgdW5pdCBkZWdyZWUsIGludGVydmFsIFstMTgwLDE4MF0nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhBemltdXRoQW5nbGU6IG5ldyBTZXR0aW5nKEluZmluaXR5LCAnbnVtYmVyJywgJ01heGltdW0gYXppbXV0aCBhbmdsZSBvZiB0aGUgY2FtZXJhIHBvc2l0aW9uIHdpdGggcmVzcGVjdCB0byB0aGUgY2FtZXJhIHRhcmdldCwgdW5pdCBkZWdyZWUsIGludGVydmFsIFstMTgwLDE4MF0nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sICh2YWx1ZTogeyBtaW5Qb2xhckFuZ2xlOiBudW1iZXIsIG1heFBvbGFyQW5nbGU6IG51bWJlciwgbWluQXppbXV0aEFuZ2xlOiBudW1iZXIsIG1heEF6aW11dGhBbmdsZTogbnVtYmVyIH0pID0+IHRydWUsICdNaW5pbXVtIGFuZCBtYXhpbXVtIHBvbGFyIGFuZCBhemltdXRoIGFuZ2xlIG9mIHRoZSBjYW1lcmEgcG9zaXRpb24gd2l0aCByZXNwZWN0IHRvIHRoZSBjYW1lcmEgdGFyZ2V0LCB1bml0IGRlZ3JlZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgem9vbTogbmV3IFNldHRpbmcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbkRpc3RhbmNlOiBuZXcgU2V0dGluZygwLCAnbm90bmVnYXRpdmUnLCAnTWluaW11bSBkaXN0YW5jZSBiZXR3ZWVuIGNhbWVyYSBwb3NpdGlvbiBhbmQgdGFyZ2V0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4RGlzdGFuY2U6IG5ldyBTZXR0aW5nKEluZmluaXR5LCAnbm90bmVnYXRpdmUnLCAnTWF4aW11bSBkaXN0YW5jZSBiZXR3ZWVuIGNhbWVyYSBwb3NpdGlvbiBhbmQgdGFyZ2V0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAodmFsdWU6IHsgbWluRGlzdGFuY2U6IG51bWJlciwgbWF4RGlzdGFuY2U6IG51bWJlciB9KSA9PiB0cnVlLCAnTWluaW11bSBhbmQgbWF4aW11bSBkaXN0YW5jZSBiZXR3ZWVuIGNhbWVyYSBwb3NpdGlvbiBhbmQgdGFyZ2V0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uU3BlZWQ6IG5ldyBTZXR0aW5nKDAuNSwgJ2ZhY3RvcicsICdTcGVlZCBvZiBjYW1lcmEgcm90YXRpb24nKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFuU3BlZWQ6IG5ldyBTZXR0aW5nKDAuNSwgJ2ZhY3RvcicsICdTcGVlZCBvZiBwYW5uaW5nJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHpvb21TcGVlZDogbmV3IFNldHRpbmcoMC41LCAnZmFjdG9yJywgJ1NwZWVkIG9mIHpvb21pbmcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZwczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3J0aG9ncmFwaGljOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhbXBpbmc6IG5ldyBTZXR0aW5nKDAuMSwgJ25vdG5lZ2F0aXZlJywgJ0hvdyBtdWNoIHRvIGRhbXAgY2FtZXJhIG1vdmVtZW50cyBieSB0aGUgdXNlcicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVLZXlQYW46IG5ldyBTZXR0aW5nKGZhbHNlLCAnYm9vbGVhbicsICdFbmFibGUgLyBkaXNhYmxlIHBhbm5pbmcgdXNpbmcgdGhlIGtleWJvYXJkLCBhbHNvIHJlZmVyIHRvIGVuYWJsZVBhbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVQYW46IG5ldyBTZXR0aW5nKHRydWUsICdib29sZWFuJywgJ0VuYWJsZSAvIGRpc2FibGUgcGFubmluZyBpbiBnZW5lcmFsLCBhbHNvIHJlZmVyIHRvIGVuYWJsZUtleVBhbicpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVab29tOiBuZXcgU2V0dGluZyh0cnVlLCAnYm9vbGVhbicsICdFbmFibGUgLyBkaXNhYmxlIHpvb21pbmcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQ6IG5ldyBTZXR0aW5nKHsga2V5czogeyB1cDogMzgsIGRvd246IDQwLCBsZWZ0OiAzNywgcmlnaHQ6IDM5IH0sIG1vdXNlOiB7IHJvdGF0ZTogMCwgem9vbTogMSwgcGFuOiAyIH0sIHRvdWNoOiB7IHJvdGF0ZTogMSwgem9vbTogMiwgcGFuOiAzIH0gfSwgJ2FueScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXlQYW5TcGVlZDogbmV3IFNldHRpbmcoMC41LCAnZmFjdG9yJywgJ1NwZWVkIG9mIHBhbm5pbmcgd2hlbiB1c2luZyB0aGUga2V5Ym9hcmQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW92ZW1lbnRTbW9vdGhuZXNzOiBuZXcgU2V0dGluZygwLjUsICdmYWN0b3InLCAnSG93IG11Y2ggdG8gdGhlIGN1cnJlbnQgbW92ZW1lbnQgaXMgYWZmZWN0ZWQgYnkgdGhlIHByZXZpb3VzIG9uZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYW5TcGVlZDogbmV3IFNldHRpbmcoMC41LCAnZmFjdG9yJywgJ1NwZWVkIG9mIHBhbm5pbmcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgem9vbVNwZWVkOiBuZXcgU2V0dGluZygwLjUsICdmYWN0b3InLCAnU3BlZWQgb2Ygem9vbWluZycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVDYW1lcmFDb250cm9sczogbmV3IFNldHRpbmcodHJ1ZSwgJ2Jvb2xlYW4nLCAnRW5hYmxlIC8gZGlzYWJsZSBjYW1lcmEgY29udHJvbHMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldmVydEF0TW91c2VVcDogbmV3IFNldHRpbmcoZmFsc2UsICdib29sZWFuJywgJ0VuYWJsZSAvIGRpc2FibGUgaWYgdGhlIG1vdXNlIHNob3VsZCByZXNldCBvbiBtb3VzZSB1cCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmV2ZXJ0QXRNb3VzZVVwRHVyYXRpb246IG5ldyBTZXR0aW5nKDgwMCwgJ25vdG5lZ2F0aXZlJywgJ1RoZSBkdXJhdGlvbiBvZiB0aGUgdHJhbnNpdGlvbiBvZiB0aGUgcmV2ZXJ0QXRNb3VzZVVwJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB6b29tRXh0ZW50c0ZhY3RvcjogbmV3IFNldHRpbmcoMSwgJ251bWJlcicsICdGYWN0b3IgdG8gYXBwbHkgdG8gdGhlIGJvdW5kaW5nIGJveCBiZWZvcmUgem9vbWluZyB0byBleHRlbnRzJyksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiBuZXcgU2V0dGluZygwLCAnbm90bmVnYXRpdmUnLCAnU2V0IGZhZGUgaW4gLyBmYWRlIG91dCBkdXJhdGlvbicpLFxuICAgICAgICAgICAgICAgICAgICBmdWxsc2NyZWVuOiBuZXcgU2V0dGluZyhmYWxzZSwgJ2Jvb2xlYW4nLCAnRW5hYmxlIC8gZGlzYWJsZSBmdWxsc2NyZWVuIG1vZGUnLCBmYWxzZSksXG4gICAgICAgICAgICAgICAgICAgIGdyaWRWaXNpYmlsaXR5OiBuZXcgU2V0dGluZyh0cnVlLCAnYm9vbGVhbicsICdTaG93IC8gaGlkZSB0aGUgZ3JpZCcpLFxuICAgICAgICAgICAgICAgICAgICBncm91bmRQbGFuZVJlZmxlY3Rpb25UaHJlc2hvbGQ6IG5ldyBTZXR0aW5nKDAuMDEsICdub3RuZWdhdGl2ZScsICdBbGxvd3MgdG8gY29udHJvbCB0aGUgZGlzdGFuY2UgdG8gb2JqZWN0cyB0aGF0IGFyZSBzdGlsbCByZWZsZWN0ZWQgYnkgdGhlIGdyb3VuZHBsYW5lJyksXG4gICAgICAgICAgICAgICAgICAgIGdyb3VuZFBsYW5lUmVmbGVjdGlvblZpc2liaWxpdHk6IG5ldyBTZXR0aW5nKGZhbHNlLCAnYm9vbGVhbicsICdFbmFibGUgLyBkaXNhYmxlIHRoZSByZWZsZWN0aXZpdHkgb2YgdGhlIGdyb3VuZHBsYW5lJyksXG4gICAgICAgICAgICAgICAgICAgIGdyb3VuZFBsYW5lVmlzaWJpbGl0eTogbmV3IFNldHRpbmcodHJ1ZSwgJ2Jvb2xlYW4nLCAnU2hvdyAvIGhpZGUgdGhlIGdyb3VuZCBwbGFuZScpLFxuICAgICAgICAgICAgICAgICAgICBsaWdodHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlbHBlcjogbmV3IFNldHRpbmcoZmFsc2UsICdib29sZWFuJywgJ1Nob3cgLyBoaWRlIHRoZSBsaWdodCBoZWxwZXJzJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBsaWdodFNjZW5lOiBuZXcgU2V0dGluZygnZGVmYXVsdCcsICdzdHJpbmcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpZ2h0U2NlbmVzOiBuZXcgU2V0dGluZyh7fSwgJ2FueScpLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYXRlcmlhbDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW52aXJvbm1lbnRNYXA6IG5ldyBTZXR0aW5nKCdub25lJywgKHZhbHVlOiBzdHJpbmcgfCBTdHJpbmcgfCBzdHJpbmdbXSB8IFN0cmluZ1tdKSA9PiB0cnVlLCAnTmFtZSBvZiB0aGUgZW52aXJvbm1lbnQgbWFwIHRvIHVzZSwgb3IgYW4gYXJyYXkgb2YgNiBpbWFnZSBVUkxzIG1ha2luZyB1cCB0aGUgY3ViZSBtYXBwZWQgZW52aXJvbm1lbnQgbWFwIChweCwgbngsIHB6LCBueiwgcHksIG55KScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZW52aXJvbm1lbnRNYXBBc0JhY2tncm91bmQ6IG5ldyBTZXR0aW5nKGZhbHNlLCAnYm9vbGVhbicsICdTaG93IC8gaGlkZSB0aGUgZW52aXJvbm1lbnQgbWFwIGluIHRoZSBiYWNrZ3JvdW5kJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBlbnZpcm9ubWVudE1hcFJlc29sdXRpb246IG5ldyBTZXR0aW5nKCcxMDI0JywgKHZhbHVlOiBzdHJpbmcpID0+IChbJzI1NicsICc1MTInLCAnMTAyNCcsICcyMDQ4J10uaW5jbHVkZXModmFsdWUpKSwgJ0ltYWdlIHJlc29sdXRpb24gdG8gYmUgdXNlZCBmb3IgdGhlIG5hbWVkIGVudmlyb25tZW50IG1hcHMgKGF2YWlsYWJsZSByZXNvbHV0aW9uczogMjU2LCA1MTIsIDEwMjQpJyksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW1iaWVudE9jY2x1c2lvbjogbmV3IFNldHRpbmcodHJ1ZSwgJ2Jvb2xlYW4nLCAnRW5hYmxlIC8gZGlzYWJsZSBhbWJpZW50IG9jY2x1c2lvbiBmb3IgcmVuZGVyaW5nJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWF1dHlSZW5kZXJEZWxheTogbmV3IFNldHRpbmcoNTAsICdub3RuZWdhdGl2ZScsICdBbW91bnQgb2Ygd2hpY2ggdGhlIGJlYXV0eSByZW5kZXJpbmcgaXMgZGVsYXllZCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJDb2xvcjogbmV3IFNldHRpbmcoJyNmZmZmZmYnLCAnc3RyaW5nJywgJ1NldCBiYWNrZ3JvdW5kIGNvbG9yJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhckFscGhhOiBuZXcgU2V0dGluZygxLjAsICdmYWN0b3InLCAnU2V0IGJhY2tncm91bmQgYWxwaGEgdmFsdWUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvaW50U2l6ZTogbmV3IFNldHRpbmcoMS4wLCAnbm90bmVnYXRpdmUnLCAnU2V0IHNpemUgb2YgcG9pbnQgb2JqZWN0cycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93czogbmV3IFNldHRpbmcodHJ1ZSwgJ2Jvb2xlYW4nLCAnRW5hYmxlIC8gZGlzYWJsZSBzaGFkb3dzIGZvciByZW5kZXJpbmcnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNhbzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZXM6IG5ldyBTZXR0aW5nKDgsICdub3RuZWdhdGl2ZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGludGVuc2l0eTogbmV3IFNldHRpbmcoMC4xLCAnbm90bmVnYXRpdmUnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXJuZWxSYWRpdXM6IG5ldyBTZXR0aW5nKDgsICdub3RuZWdhdGl2ZScpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YW5kYXJkRGV2OiBuZXcgU2V0dGluZygyNSwgJ25vdG5lZ2F0aXZlJyksXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGlmKHNldHRpbmdzSlNPTikgdGhpcy5fZnJvbUpTT04oc2V0dGluZ3NKU09OLCB0aGlzLl9zZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgLy8gI2VuZHJlZ2lvbiBDb25zdHJ1Y3RvcnMgKDEpXG5cbiAgICAvLyAjcmVnaW9uIFB1YmxpYyBNZXRob2RzICgyKVxuXG4gICAgcHVibGljIGNvbnZlcnRGcm9tUHJldmlvdXNWZXJzaW9uKHNldHRpbmdzOiBPbGRTZXR0aW5ncyk6IFNldHRpbmdzIHtcbiAgICAgICAgbGV0IG9sZFNldHRpbmdzID0gc2V0dGluZ3Muc2V0dGluZ3M7XG4gICAgXG4gICAgICAgICh0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUucmVuZGVyLmNsZWFyQWxwaGEgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSBvbGRTZXR0aW5ncy5jbGVhckFscGhhLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLnJlbmRlci5jbGVhckNvbG9yIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gb2xkU2V0dGluZ3MuY2xlYXJDb2xvci52YWx1ZTtcbiAgICAgICAgKHRoaXMuX3NldHRpbmdzLmRlZmF1bHRNYXRlcmlhbC5jb2xvciBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IG9sZFNldHRpbmdzLmRlZmF1bHRNYXRlcmlhbENvbG9yLnZhbHVlO1xuXG4gICAgICAgICh0aGlzLl9zZXR0aW5ncy5idWlsZF9kYXRlIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gb2xkU2V0dGluZ3MuYnVpbGRfZGF0ZS52YWx1ZTtcbiAgICAgICAgKHRoaXMuX3NldHRpbmdzLmJ1aWxkX3ZlcnNpb24gYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSBvbGRTZXR0aW5ncy5idWlsZF92ZXJzaW9uLnZhbHVlO1xuXG4gICAgICAgIGlmKCEoKG9sZFNldHRpbmdzLmNhbWVyYSBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZS5wb3NpdGlvbi52YWx1ZS54ID09PSA1ICYmIChvbGRTZXR0aW5ncy5jYW1lcmEgYXMgSVNldHRpbmc8YW55PikudmFsdWUucG9zaXRpb24udmFsdWUueSA9PT0gNSAmJiAob2xkU2V0dGluZ3MuY2FtZXJhIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlLnBvc2l0aW9uLnZhbHVlLnogPT09IDUgJiYgKG9sZFNldHRpbmdzLmNhbWVyYSBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZS50YXJnZXQudmFsdWUueCA9PT0gMCAmJiAob2xkU2V0dGluZ3MuY2FtZXJhIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlLnRhcmdldC52YWx1ZS55ID09PSAwICYmIChvbGRTZXR0aW5ncy5jYW1lcmEgYXMgSVNldHRpbmc8YW55PikudmFsdWUudGFyZ2V0LnZhbHVlLnogPT09IDApKSB7XG4gICAgICAgICAgICAoKHRoaXMuX3NldHRpbmdzLnZpZXdlci5zY2VuZS5jYW1lcmEuY2FtZXJhVHlwZXMucGVyc3BlY3RpdmUuZGVmYXVsdCBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZS5wb3NpdGlvbiBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IChvbGRTZXR0aW5ncy5jYW1lcmEgYXMgSVNldHRpbmc8YW55PikudmFsdWUucG9zaXRpb24udmFsdWU7XG4gICAgICAgICAgICAoKHRoaXMuX3NldHRpbmdzLnZpZXdlci5zY2VuZS5jYW1lcmEuY2FtZXJhVHlwZXMucGVyc3BlY3RpdmUuZGVmYXVsdCBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZS50YXJnZXQgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSAob2xkU2V0dGluZ3MuY2FtZXJhIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlLnRhcmdldC52YWx1ZTsgICAgXG4gICAgICAgIH1cblxuICAgICAgICBpZighKChvbGRTZXR0aW5ncy5jYW1lcmFPcnRobyBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZS5wb3NpdGlvbi52YWx1ZS54ID09PSA1ICYmIChvbGRTZXR0aW5ncy5jYW1lcmFPcnRobyBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZS5wb3NpdGlvbi52YWx1ZS55ID09PSA1ICYmIChvbGRTZXR0aW5ncy5jYW1lcmFPcnRobyBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZS5wb3NpdGlvbi52YWx1ZS56ID09PSA1ICYmIChvbGRTZXR0aW5ncy5jYW1lcmFPcnRobyBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZS50YXJnZXQudmFsdWUueCA9PT0gMCAmJiAob2xkU2V0dGluZ3MuY2FtZXJhT3J0aG8gYXMgSVNldHRpbmc8YW55PikudmFsdWUudGFyZ2V0LnZhbHVlLnkgPT09IDAgJiYgKG9sZFNldHRpbmdzLmNhbWVyYU9ydGhvIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlLnRhcmdldC52YWx1ZS56ID09PSAwKSkge1xuICAgICAgICAgICAgKCh0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNhbWVyYVR5cGVzLm9ydGhvZ3JhcGhpYy5kZWZhdWx0IGFzIElTZXR0aW5nPGFueT4pLnZhbHVlLnBvc2l0aW9uIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gKG9sZFNldHRpbmdzLmNhbWVyYU9ydGhvIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlLnBvc2l0aW9uLnZhbHVlO1xuICAgICAgICAgICAgKCh0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNhbWVyYVR5cGVzLm9ydGhvZ3JhcGhpYy5kZWZhdWx0IGFzIElTZXR0aW5nPGFueT4pLnZhbHVlLnRhcmdldCBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IChvbGRTZXR0aW5ncy5jYW1lcmFPcnRobyBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZS50YXJnZXQudmFsdWU7ICAgICAgICBcbiAgICAgICAgfVxuXG4gICAgICAgICh0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUucmVuZGVyLmFtYmllbnRPY2NsdXNpb24gYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSBvbGRTZXR0aW5ncy5hbWJpZW50T2NjbHVzaW9uLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5jb250cm9scy5vcmJpdC5hdXRvUm90YXRpb25TcGVlZCBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IG9sZFNldHRpbmdzLmF1dG9Sb3RhdGVTcGVlZC52YWx1ZTtcbiAgICAgICAgKHRoaXMuX3NldHRpbmdzLmRlZmF1bHRNYXRlcmlhbC5idW1wQW1wbGl0dWRlIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gb2xkU2V0dGluZ3MuYnVtcEFtcGxpdHVkZS52YWx1ZTtcbiAgICAgICAgKHRoaXMuX3NldHRpbmdzLnZpZXdlci5zY2VuZS5jYW1lcmEuYXV0b0FkanVzdCBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IG9sZFNldHRpbmdzLmNhbWVyYUF1dG9BZGp1c3QudmFsdWU7XG4gICAgICAgICh0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNhbWVyYU1vdmVtZW50RHVyYXRpb24gYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSBvbGRTZXR0aW5ncy5jYW1lcmFNb3ZlbWVudER1cmF0aW9uLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5yZXZlcnRBdE1vdXNlVXAgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSBvbGRTZXR0aW5ncy5jYW1lcmFSZXZlcnRBdE1vdXNlVXAudmFsdWU7XG4gICAgICAgICh0aGlzLl9zZXR0aW5ncy52aWV3ZXIuY29tbWl0UGFyYW1ldGVycyBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IG9sZFNldHRpbmdzLmNvbW1pdFBhcmFtZXRlcnMudmFsdWU7XG4gICAgICAgICh0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNvbnRyb2xzLm9yYml0LmRhbXBpbmcgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSBvbGRTZXR0aW5ncy5jb250cm9sRGFtcGluZy52YWx1ZTtcbiAgICAgICAgKHRoaXMuX3NldHRpbmdzLnZpZXdlci5zY2VuZS5jYW1lcmEuY29udHJvbHMub3J0aG9ncmFwaGljLmRhbXBpbmcgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSBvbGRTZXR0aW5ncy5jb250cm9sRGFtcGluZy52YWx1ZTtcbiAgICAgICAgKHRoaXMuX3NldHRpbmdzLnBhcmFtZXRlcnMuY29udHJvbE5hbWVzIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gb2xkU2V0dGluZ3MuY29udHJvbE5hbWVzLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3MucGFyYW1ldGVycy5jb250cm9sT3JkZXIgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSBvbGRTZXR0aW5ncy5jb250cm9sT3JkZXIudmFsdWU7XG4gICAgICAgICh0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNvbnRyb2xzLm9yYml0LmVuYWJsZVBhbiBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9ICFvbGRTZXR0aW5ncy5kaXNhYmxlUGFuLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5jb250cm9scy5vcnRob2dyYXBoaWMuZW5hYmxlUGFuIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gIW9sZFNldHRpbmdzLmRpc2FibGVQYW4udmFsdWU7XG4gICAgICAgICh0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNvbnRyb2xzLm9yYml0LmVuYWJsZVpvb20gYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSAhb2xkU2V0dGluZ3MuZGlzYWJsZVpvb20udmFsdWU7XG4gICAgICAgICh0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNvbnRyb2xzLm9ydGhvZ3JhcGhpYy5lbmFibGVab29tIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gIW9sZFNldHRpbmdzLmRpc2FibGVab29tLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5jb250cm9scy5vcmJpdC5lbmFibGVBdXRvUm90YXRpb24gYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSBvbGRTZXR0aW5ncy5lbmFibGVBdXRvUm90YXRlLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5jb250cm9scy5vcmJpdC5lbmFibGVSb3RhdGlvbiBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IG9sZFNldHRpbmdzLmVuYWJsZVJvdGF0aW9uLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLm1hdGVyaWFsLmVudmlyb25tZW50TWFwIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gb2xkU2V0dGluZ3MuZW52aXJvbm1lbnRNYXAudmFsdWU7XG4gICAgICAgICh0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUubWF0ZXJpYWwuZW52aXJvbm1lbnRNYXBSZXNvbHV0aW9uIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gb2xkU2V0dGluZ3MuZW52aXJvbm1lbnRNYXBSZXNvbHV0aW9uLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5jYW1lcmFUeXBlcy5wZXJzcGVjdGl2ZS5mb3YgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSBvbGRTZXR0aW5ncy5mb3YudmFsdWU7XG4gICAgICAgICh0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUubGlnaHRzLmxpZ2h0U2NlbmUgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSBvbGRTZXR0aW5ncy5saWdodFNjZW5lLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmxpZ2h0cy5saWdodFNjZW5lcyBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IG9sZFNldHRpbmdzLmxpZ2h0U2NlbmVzLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3MucGFyYW1ldGVycy5wYXJhbWV0ZXJzSGlkZGVuIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gb2xkU2V0dGluZ3MucGFyYW1ldGVyc0hpZGRlbi52YWx1ZTtcbiAgICAgICAgKHRoaXMuX3NldHRpbmdzLnZpZXdlci5zY2VuZS5yZW5kZXIucG9pbnRTaXplIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gb2xkU2V0dGluZ3MucG9pbnRTaXplLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5yZXZlcnRBdE1vdXNlVXBEdXJhdGlvbiBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IG9sZFNldHRpbmdzLnJldmVydEF0TW91c2VVcER1cmF0aW9uLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLm1hdGVyaWFsLmVudmlyb25tZW50TWFwQXNCYWNrZ3JvdW5kIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gb2xkU2V0dGluZ3Muc2hvd0Vudmlyb25tZW50TWFwLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmdyaWRWaXNpYmlsaXR5IGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gb2xkU2V0dGluZ3Muc2hvd0dyaWQudmFsdWU7XG4gICAgICAgICh0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuZ3JvdW5kUGxhbmVWaXNpYmlsaXR5IGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gb2xkU2V0dGluZ3Muc2hvd0dyb3VuZFBsYW5lLnZhbHVlO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLnJlbmRlci5zaGFkb3dzIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gb2xkU2V0dGluZ3Muc2hvd1NoYWRvd3MudmFsdWU7XG4gICAgICAgIFxuICAgICAgICAvLyBUT0RPOiByZXBsYWNlIHRoZSAnMScgd2l0aCB0aGUgZW51bSwgYXMgc29vbiBhcyBidWlsZCBwcm9jZXNzIGlzIGZpeGVkXG4gICAgICAgIGlmKG9sZFNldHRpbmdzLnRvcFZpZXcudmFsdWUpXG4gICAgICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5jYW1lcmFUeXBlcy5hY3RpdmUgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSAxO1xuICAgICAgICAodGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS56b29tRXh0ZW50c0ZhY3RvciBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IG9sZFNldHRpbmdzLnpvb21FeHRlbnRGYWN0b3IudmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcHVibGljIGNvbnZlcnRUb1ByZXZpb3VzVmVyc2lvbigpOiBPbGRTZXR0aW5ncyB7XG4gICAgICAgIGxldCBvbGRTZXR0aW5nczogT2xkU2V0dGluZ3MgPSBuZXcgT2xkU2V0dGluZ3MoKTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLmJ1aWxkX2RhdGUgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy5idWlsZF9kYXRlLnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3MuYnVpbGRfdmVyc2lvbiBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IHRoaXMuX3NldHRpbmdzLmJ1aWxkX3ZlcnNpb24udmFsdWU7XG5cbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLmFtYmllbnRPY2NsdXNpb24gYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUucmVuZGVyLmFtYmllbnRPY2NsdXNpb24udmFsdWU7XG4gICAgICAgIChvbGRTZXR0aW5ncy5zZXR0aW5ncy5hdXRvUm90YXRlU3BlZWQgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNvbnRyb2xzLm9yYml0LmF1dG9Sb3RhdGlvblNwZWVkLnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3MuYnVtcEFtcGxpdHVkZSBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IHRoaXMuX3NldHRpbmdzLmRlZmF1bHRNYXRlcmlhbC5idW1wQW1wbGl0dWRlLnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3MuY2FtZXJhIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gbmV3IFNldHRpbmcoe1xuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuX3NldHRpbmdzLnZpZXdlci5zY2VuZS5jYW1lcmEuY2FtZXJhVHlwZXMucGVyc3BlY3RpdmUuZGVmYXVsdC52YWx1ZS5wb3NpdGlvbi52YWx1ZSxcbiAgICAgICAgICAgIHRhcmdldDogdGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5jYW1lcmFUeXBlcy5wZXJzcGVjdGl2ZS5kZWZhdWx0LnZhbHVlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgfSwgKHYpID0+IHRydWUpLnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3MuY2FtZXJhQXV0b0FkanVzdCBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IHRoaXMuX3NldHRpbmdzLnZpZXdlci5zY2VuZS5jYW1lcmEuYXV0b0FkanVzdC52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLmNhbWVyYU1vdmVtZW50RHVyYXRpb24gYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNhbWVyYU1vdmVtZW50RHVyYXRpb24udmFsdWU7XG4gICAgICAgIChvbGRTZXR0aW5ncy5zZXR0aW5ncy5jYW1lcmFPcnRobyBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IG5ldyBTZXR0aW5nKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNhbWVyYVR5cGVzLm9ydGhvZ3JhcGhpYy5kZWZhdWx0LnZhbHVlLnBvc2l0aW9uLnZhbHVlLFxuICAgICAgICAgICAgdGFyZ2V0OiB0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNhbWVyYVR5cGVzLm9ydGhvZ3JhcGhpYy5kZWZhdWx0LnZhbHVlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgfSwgKHYpID0+IHRydWUpLnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3MuY2FtZXJhUmV2ZXJ0QXRNb3VzZVVwIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5yZXZlcnRBdE1vdXNlVXAudmFsdWU7XG4gICAgICAgIChvbGRTZXR0aW5ncy5zZXR0aW5ncy5jbGVhckFscGhhIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLnJlbmRlci5jbGVhckFscGhhLnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3MuY2xlYXJDb2xvciBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IHRoaXMuX3NldHRpbmdzLnZpZXdlci5zY2VuZS5yZW5kZXIuY2xlYXJDb2xvci52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLmNvbW1pdFBhcmFtZXRlcnMgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy52aWV3ZXIuY29tbWl0UGFyYW1ldGVycy52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLmNvbnRyb2xEYW1waW5nIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5jb250cm9scy5vcmJpdC5kYW1waW5nLnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3MuY29udHJvbE5hbWVzIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3MucGFyYW1ldGVycy5jb250cm9sTmFtZXMudmFsdWU7XG4gICAgICAgIChvbGRTZXR0aW5ncy5zZXR0aW5ncy5jb250cm9sT3JkZXIgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy5wYXJhbWV0ZXJzLmNvbnRyb2xPcmRlci52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLmRlZmF1bHRNYXRlcmlhbENvbG9yIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3MuZGVmYXVsdE1hdGVyaWFsLmNvbG9yLnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3MuZGlzYWJsZVBhbiBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9ICF0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNvbnRyb2xzLm9yYml0LmVuYWJsZVBhbi52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLmRpc2FibGVab29tIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gIXRoaXMuX3NldHRpbmdzLnZpZXdlci5zY2VuZS5jYW1lcmEuY29udHJvbHMub3JiaXQuZW5hYmxlWm9vbS52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLmVuYWJsZUF1dG9Sb3RhdGUgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNvbnRyb2xzLm9yYml0LmVuYWJsZUF1dG9Sb3RhdGlvbi52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLmVuYWJsZVJvdGF0aW9uIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5jb250cm9scy5vcmJpdC5lbmFibGVSb3RhdGlvbi52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLmVudmlyb25tZW50TWFwIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLm1hdGVyaWFsLmVudmlyb25tZW50TWFwLnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3MuZW52aXJvbm1lbnRNYXBSZXNvbHV0aW9uIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLm1hdGVyaWFsLmVudmlyb25tZW50TWFwUmVzb2x1dGlvbi52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLmZvdiBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IHRoaXMuX3NldHRpbmdzLnZpZXdlci5zY2VuZS5jYW1lcmEuY2FtZXJhVHlwZXMucGVyc3BlY3RpdmUuZm92LnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3MubGlnaHRTY2VuZSBhcyBJU2V0dGluZzxhbnk+KS52YWx1ZSA9IHRoaXMuX3NldHRpbmdzLnZpZXdlci5zY2VuZS5saWdodHMubGlnaHRTY2VuZS52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLmxpZ2h0U2NlbmVzIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmxpZ2h0cy5saWdodFNjZW5lcy52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLnBhblNwZWVkIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5jb250cm9scy5vcmJpdC5wYW5TcGVlZC52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLnBhcmFtZXRlcnNIaWRkZW4gYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy5wYXJhbWV0ZXJzLnBhcmFtZXRlcnNIaWRkZW4udmFsdWU7XG4gICAgICAgIChvbGRTZXR0aW5ncy5zZXR0aW5ncy5wb2ludFNpemUgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUucmVuZGVyLnBvaW50U2l6ZS52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLnJldmVydEF0TW91c2VVcER1cmF0aW9uIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5yZXZlcnRBdE1vdXNlVXBEdXJhdGlvbi52YWx1ZTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLnJvdGF0ZVNwZWVkIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5jb250cm9scy5vcmJpdC5yb3RhdGlvblNwZWVkLnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3Muc2hvd0Vudmlyb25tZW50TWFwIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLm1hdGVyaWFsLmVudmlyb25tZW50TWFwQXNCYWNrZ3JvdW5kLnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3Muc2hvd0dyaWQgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuZ3JpZFZpc2liaWxpdHkudmFsdWU7XG4gICAgICAgIChvbGRTZXR0aW5ncy5zZXR0aW5ncy5zaG93R3JvdW5kUGxhbmUgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuZ3JvdW5kUGxhbmVWaXNpYmlsaXR5LnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3Muc2hvd1NoYWRvd3MgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUucmVuZGVyLnNoYWRvd3MudmFsdWU7XG4gICAgICAgIC8vIFRPRE86IHJlcGxhY2UgdGhlICcxJyB3aXRoIHRoZSBlbnVtLCBhcyBzb29uIGFzIGJ1aWxkIHByb2Nlc3MgaXMgZml4ZWRcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLnRvcFZpZXcgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLmNhbWVyYVR5cGVzLmFjdGl2ZS52YWx1ZSA9PT0gMTtcbiAgICAgICAgKG9sZFNldHRpbmdzLnNldHRpbmdzLnpvb21FeHRlbnRGYWN0b3IgYXMgSVNldHRpbmc8YW55PikudmFsdWUgPSB0aGlzLl9zZXR0aW5ncy52aWV3ZXIuc2NlbmUuY2FtZXJhLnpvb21FeHRlbnRzRmFjdG9yLnZhbHVlO1xuICAgICAgICAob2xkU2V0dGluZ3Muc2V0dGluZ3Muem9vbVNwZWVkIGFzIElTZXR0aW5nPGFueT4pLnZhbHVlID0gdGhpcy5fc2V0dGluZ3Mudmlld2VyLnNjZW5lLmNhbWVyYS5jb250cm9scy5vcmJpdC56b29tU3BlZWQudmFsdWU7XG5cbiAgICAgICAgcmV0dXJuIG9sZFNldHRpbmdzO1xuICAgIH1cblxuICAgIC8vICNlbmRyZWdpb24gUHVibGljIE1ldGhvZHMgKDIpXG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==