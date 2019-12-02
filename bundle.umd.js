(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.ShapediverViewerSettings = {}));
}(this, (function (exports) { 'use strict';

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
        BaseSettings.prototype.getSettings = function (persistentOnly) {
            if (persistentOnly === void 0) { persistentOnly = false; }
            var obj = {};
            this._getSettings(this._settings, persistentOnly, obj, '');
            return obj;
        };
        BaseSettings.prototype.toJSON = function (persistentOnly) {
            if (persistentOnly === void 0) { persistentOnly = false; }
            return this._toJSON(this._settings, persistentOnly);
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
                        // TODO SS-1484 do type checks
                        if (settingsJSON[s] !== undefined)
                            iterable[s].value = settingsJSON[s];
                    }
                }
                else {
                    this._fromJSON(settingsJSON[s], iterable[s]);
                }
            }
        };
        BaseSettings.prototype._toJSON = function (iterable, persistentOnly) {
            var objJSON = {};
            for (var s in iterable) {
                if (iterable[s] instanceof Setting) {
                    var setting = iterable[s];
                    if (!persistentOnly || setting.persistent) {
                        var settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
                        if (settingChildren.length !== 0 && settingChildren[0] instanceof Setting) {
                            objJSON[s] = this._toJSON(iterable[s].value, persistentOnly);
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
                    objJSON[s] = this._toJSON(iterable[s], persistentOnly);
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
        BaseSettings.prototype._getSettings = function (iterable, persistentOnly, obj, path) {
            var parentPath = path ? path + '.' : '';
            for (var s in iterable) {
                if (iterable[s] instanceof Setting) {
                    var setting = iterable[s];
                    if (!persistentOnly || setting.persistent) {
                        var settingChildren = typeof setting.value === 'object' && setting.value !== null ? Object.values(setting.value) : [];
                        if (settingChildren.length !== 0 && settingChildren[0] instanceof Setting) {
                            this._getSettings(iterable[s].value, persistentOnly, obj, parentPath + s);
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
                    this._getSettings(iterable[s], persistentOnly, obj, parentPath + s);
                }
            }
        };
        return BaseSettings;
    }());

    

    var SettingsVersion = /** @class */ (function () {
        // #endregion Properties (1)
        // #region Constructors (1)
        function SettingsVersion(version) {
            if (version === void 0) { version = ''; }
            // #region Properties (1)
            this._versionLevels = [1, 0, 0];
            var splitArray = version.split('.');
            for (var i = 0, len = Math.min(splitArray.length, this._versionLevels.length); i < len; i++) {
                this._versionLevels[i] = +splitArray[i];
            }
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

    

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

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
            _this._version = new SettingsVersion('1.0');
            _this._settings = {
                build_date: new Setting('', 'string', '', false),
                build_version: new Setting('', 'string', '', false),
                settings_version: new Setting('1.0', 'string', '', true),
                ambientOcclusion: new Setting(true, function (v) { return true; }),
                autoRotateSpeed: new Setting(0.0, function (v) { return true; }),
                backgroundColor: new Setting('0xffffffff', function (v) { return true; }),
                bumpAmplitude: new Setting(1.0, function (v) { return true; }),
                camera: new Setting({
                    position: new Setting({ x: 0, y: 0, z: 0 }, function (v) { return true; }),
                    target: new Setting({ x: 0, y: 0, z: 0 }, function (v) { return true; }),
                }, function (v) { return true; }),
                cameraAutoAdjust: new Setting(false, function (v) { return true; }),
                cameraMovementDuration: new Setting(0, function (v) { return true; }),
                cameraOrtho: new Setting({
                    position: new Setting({ x: 0, y: 0, z: 0 }, function (v) { return true; }),
                    target: new Setting({ x: 0, y: 0, z: 0 }, function (v) { return true; }),
                }, function (v) { return true; }),
                cameraRevertAtMouseUp: new Setting(false, function (v) { return true; }),
                clearAlpha: new Setting(1.0, function (v) { return true; }),
                clearColor: new Setting('#ffffff', function (v) { return true; }),
                commitParameters: new Setting(false, function (v) { return true; }),
                controlDamping: new Setting(0.1, function (v) { return true; }),
                controlNames: new Setting({}, function (v) { return true; }),
                controlOrder: new Setting([], function (v) { return true; }),
                defaultMaterialColor: new Setting('#d3d3d3', function (v) { return true; }),
                disablePan: new Setting(false, function (v) { return true; }),
                disableZoom: new Setting(false, function (v) { return true; }),
                enableAutoRotation: new Setting(false, function (v) { return true; }),
                enableRotation: new Setting(true, function (v) { return true; }),
                environmentMap: new Setting('none', function (v) { return true; }),
                environmentMapResolution: new Setting('1024', function (v) { return true; }),
                fov: new Setting(45, function (v) { return true; }),
                lightScene: new Setting('default', function (v) { return true; }),
                lightScenes: new Setting(null, function (v) { return true; }),
                panSpeed: new Setting(0.5, function (v) { return true; }),
                parametersHidden: new Setting([], function (v) { return true; }),
                pointSize: new Setting(1.0, function (v) { return true; }),
                revertAtMouseUpDuration: new Setting(800, function (v) { return true; }),
                rotateSpeed: new Setting(0.25, function (v) { return true; }),
                showEnvironmentMap: new Setting(false, function (v) { return true; }),
                showGrid: new Setting(false, function (v) { return true; }),
                showGroundPlane: new Setting(false, function (v) { return true; }),
                showShadows: new Setting(true, function (v) { return true; }),
                topView: new Setting(false, function (v) { return true; }),
                zoomExtentFactor: new Setting(1.0, function (v) { return true; }),
                zoomSpeed: new Setting(1.0, function (v) { return true; }),
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
    }(BaseSettings));

    

    //import typeChecks from "shapedivernodemodule-typechecks";
    var Settings$1 = /** @class */ (function (_super) {
        __extends(Settings$1, _super);
        // #endregion Properties (1)
        // #region Constructors (1)
        /**
         *
         * @param settingsObject a settings object that is a JSON representation of this SettingsObject
         */
        function Settings$1(settingsJSON) {
            var _this = _super.call(this) || this;
            _this._version = new SettingsVersion('2.0');
            _this._settings = {
                build_date: new Setting('', 'string', '', false),
                build_version: new Setting('', 'string', '', false),
                settings_version: new Setting('2.0', 'string', '', true),
                ar: {
                    enableCameraSync: new Setting(false, 'boolean', 'Enable / disable synchronisation of the camera with AR tracking information. Enabling this will disable the orbit controls.', false),
                    enableCameraSyncInitial: new Setting(false, 'boolean', 'Enable / disable the inital synchronisation of the camera with AR tracking information. Enabling this will disable the orbit controls.'),
                    enableLightingEstimation: new Setting(true, 'boolean', 'Enable / disable automatic lighting estimation. Enabling this stores the current state of the lights which will get restored once automatic lighting estimation gets disabled again.'),
                    enableTouchControls: new Setting(true, 'boolean', 'Enable / disable touch controls for placement of objects in the AR scene while AR camera synchronisation is enabled.'),
                    enableTouchControlRotation: new Setting(true, 'boolean', 'Enable / disable rotation of objects in the AR scene by means of touch controls. Typically this should be enabled for objects to be placed horizontally.'),
                    enableAutomaticPlacement: new Setting(true, 'boolean', 'Enable / disable initial automatic placement of objects in the AR scene as soon as plane anchors get detected. Automatic placement stops once the user starts to interact.'),
                    defaultHitTestType: new Setting('existingPlaneUsingGeometry', function (value) { return ['featurePoint', 'estimatedHorizontalPlane', 'estimatedVerticalPlane', 'existingPlane', 'existingPlaneUsingExtent', 'existingPlaneUsingGeometry'].includes(value); }, 'Default type of feature to use for hit tests, used by touch controls. '),
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
                    bumpAmplitude: new Setting(1, 'notnegative', 'Bump amplitude of the default material'),
                    color: new Setting('#d3d3d3', 'string', 'Color of the default material'),
                    metalness: new Setting(0.0, 'factor', 'Metalness of the default material'),
                    roughness: new Setting(1.0, 'factor', 'Roughness of the default material'),
                },
                parameters: {
                    controlOrder: new Setting([], 'stringarray', ''),
                    controlNames: new Setting({}, function (v) { return true; }, ''),
                    parametersHidden: new Setting([], 'stringarray', ''),
                },
                viewer: {
                    blurSceneWhenBusy: new Setting(true, 'boolean', 'Blur or don\'t blur the scene while a process is busy'),
                    // container: new Setting(undefined, 'any', 'Container to use for creating the viewport, may be undefined in which case a DOM element whose id is domElementIdPrefix+\'-viewport\' will be looked for. An array of containers may be passed to create multiple viewports. Pass an empty array to avoid creating a viewport.'),
                    // deferGeometryLoading: new Setting(false, 'boolean', 'true: tell the CommPlugin instance created by the constructor to not load any geometry until first parameter update or refresh, false: load default geometry'),
                    ignoreSuperseded: new Setting(true, 'boolean', 'Ignore intermediate solutions which at the time of their arrival have already been superseded by another customization request', false),
                    loggingLevel: new Setting(-1, function (value) { return value >= -1 && value <= 3; }, 'Level of log messages shown on the console, allowed values: -1 (none), 0 (error), 1 (warn), 2 (info), 3 (debug)', false),
                    // commPluginRuntimeId: new Setting('CommPlugin_1', 'string', 'runtime id to use for the CommPlugin instance created by the constructor'),
                    messageLoggingLevel: new Setting(-1, function (value) { return value >= -1 && value <= 3; }, 'Log level to be used for logging internal messages, allowed values: -1 (none), 0 (error), 1 (warn), 2 (info), 3 (debug)', false),
                    // strictMode: new Setting(false, 'boolean', '', false),
                    showMessages: new Setting(true, 'boolean', 'Show or don\'t show user messages in the viewport', false),
                    hasRestoredSettings: new Setting(false, 'boolean', 'True if settings have been restored from a settings object delivered by a CommPlugin', false),
                    // exposeViewer: new Setting(false, 'boolean'),
                    commitParameters: new Setting(false, 'boolean', 'Use or don\'t commit mode for parameters'),
                    commitSettings: new Setting(false, 'boolean', 'Use or don\'t commit mode for settings'),
                    viewerRuntimeId: new Setting('', 'string', 'The runtime id of this viewer', false),
                    scene: {
                        show: new Setting(false, 'boolean', 'Show / hide the scene', false),
                        // showSceneMode: new Setting(2, (value: number) => value >= 0 && value <= 3, 'when to fade in the scene: ON_SHOW(1), ON_FIRST_PLUGIN(2), ON_ALL_PLUGINS(3)'),
                        showSceneTransition: new Setting('1s', 'string', ''),
                        camera: {
                            autoAdjust: new Setting(false, 'boolean', 'Enable / disable that the camera adjusts to geometry updates'),
                            cameraMovementDuration: new Setting(800, 'notnegative', 'Default duration of camera movements'),
                            cameraTypes: {
                                perspective: {
                                    default: new Setting({
                                        position: new Setting({ x: 0, y: 0, z: 0 }, 'vector3any', 'Default position for the perspective camera'),
                                        target: new Setting({ x: 0, y: 0, z: 0 }, 'vector3any', 'Default target for the perspective camera'),
                                    }, function (value) { return true; }, 'Default position and target for the perspective camera'),
                                    fov: new Setting(45, 'notnegative', 'Camera frustum vertical field of view angle, unit degree, interval [0,180]'),
                                    controls: new Setting(0, function (value) { return value === 0 || value === 1; }, 'Set camera control type'),
                                },
                                orthographic: {
                                    default: new Setting({
                                        position: new Setting({ x: 0, y: 0, z: 0 }, 'vector3any', 'Default position for the orthographic camera'),
                                        target: new Setting({ x: 0, y: 0, z: 0 }, 'vector3any', 'Default target for the orthographic camera'),
                                    }, function (value) { return true; }, 'Default position and target for the orthographic camera'),
                                },
                                active: new Setting(0, function (value) { return value >= 0 && value <= 6; }, 'Set camera type'),
                            },
                            controls: {
                                orbit: {
                                    autoRotationSpeed: new Setting(0, 'number', 'Speed of autoration, can be negative, also refer to enableAutoRotation'),
                                    damping: new Setting(0.1, 'notnegative', 'How much to damp camera movements by the user'),
                                    enableAutoRotation: new Setting(false, 'boolean', 'Enable / disable automatic rotation of the camera, also refer to autoRotationSpeed'),
                                    enableKeyPan: new Setting(false, 'boolean', 'Enable / disable panning using the keyboard, also refer to enablePan'),
                                    enablePan: new Setting(true, 'boolean', 'Enable / disable panning in general, also refer to enableKeyPan'),
                                    enableRotation: new Setting(true, 'boolean', 'Enable / disable camera rotation'),
                                    enableZoom: new Setting(true, 'boolean', 'Enable / disable zooming'),
                                    input: new Setting({ keys: { up: 38, down: 40, left: 37, right: 39 }, mouse: { rotate: 0, zoom: 1, pan: 2 }, touch: { rotate: 1, zoom: 2, pan: 3 }, }, 'any'),
                                    keyPanSpeed: new Setting(0.5, 'factor', 'Speed of panning when using the keyboard'),
                                    movementSmoothness: new Setting(0.5, 'factor', 'How much to the current movement is affected by the previous one'),
                                    restrictions: {
                                        position: {
                                            cube: new Setting({
                                                min: new Setting({ x: -Infinity, y: -Infinity, z: -Infinity }, 'vector3any', 'Restriction of the camera position inside a cube, minimum corner of the cube'),
                                                max: new Setting({ x: Infinity, y: Infinity, z: Infinity }, 'vector3any', 'Restriction of the camera position inside a cube, maximum corner of the cube'),
                                            }, function (value) { return true; }, 'Restriction of the camera position inside a cube, minimum and maximum corner of the cube', false),
                                            sphere: new Setting({
                                                center: new Setting({ x: 0, y: 0, z: 0 }, 'vector3any', 'Restriction of the camera position inside a sphere, center of the sphere'),
                                                radius: new Setting(Infinity, 'notnegative', 'Restriction of the camera position inside a sphere, radius of the sphere'),
                                            }, function (value) { return true; }, 'Restriction of the camera position inside a sphere, center and radius of the sphere', false),
                                        },
                                        target: {
                                            cube: new Setting({
                                                min: new Setting({ x: -Infinity, y: -Infinity, z: -Infinity }, 'vector3any', 'Restriction of the camera target inside a cube, minimum corner of the cube'),
                                                max: new Setting({ x: Infinity, y: Infinity, z: Infinity }, 'vector3any', 'Restriction of the camera target inside a cube, maximum corner of the cube'),
                                            }, function (value) { return true; }, 'Restriction of the camera target inside a cube, minimum and maximum corner of the cube', false),
                                            sphere: new Setting({
                                                center: new Setting({ x: 0, y: 0, z: 0 }, 'vector3any', 'Restriction of the camera target inside a sphere, center of the sphere'),
                                                radius: new Setting(Infinity, 'notnegative', 'Restriction of the camera target inside a sphere, radius of the sphere'),
                                            }, function (value) { return true; }, 'Restriction of the camera target inside a sphere, center and radius of the sphere', false),
                                        },
                                        rotation: new Setting({
                                            minPolarAngle: new Setting(0, function (value) { return true; }, 'Minimum polar angle of the camera position with respect to the camera target, unit degree, interval [0,180]'),
                                            maxPolarAngle: new Setting(180, function (value) { return true; }, 'Maximum polar angle of the camera position with respect to the camera target, unit degree, interval [0,180]'),
                                            minAzimuthAngle: new Setting(-Infinity, 'number', 'Minimum azimuth angle of the camera position with respect to the camera target, unit degree, interval [-180,180]'),
                                            maxAzimuthAngle: new Setting(Infinity, 'number', 'Maximum azimuth angle of the camera position with respect to the camera target, unit degree, interval [-180,180]'),
                                        }, function (value) { return true; }, 'Minimum and maximum polar and azimuth angle of the camera position with respect to the camera target, unit degree', false),
                                        zoom: new Setting({
                                            minDistance: new Setting(0, 'notnegative', 'Minimum distance between camera position and target'),
                                            maxDistance: new Setting(Infinity, 'notnegative', 'Maximum distance between camera position and target'),
                                        }, function (value) { return true; }, 'Minimum and maximum distance between camera position and target', false),
                                    },
                                    rotationSpeed: new Setting(0.5, 'factor', 'Speed of camera rotation'),
                                    panSpeed: new Setting(0.5, 'factor', 'Speed of panning'),
                                    zoomSpeed: new Setting(0.5, 'factor', 'Speed of zooming'),
                                },
                                fps: {},
                                orthographic: {
                                    damping: new Setting(0.1, 'notnegative', 'How much to damp camera movements by the user'),
                                    enableKeyPan: new Setting(false, 'boolean', 'Enable / disable panning using the keyboard, also refer to enablePan'),
                                    enablePan: new Setting(true, 'boolean', 'Enable / disable panning in general, also refer to enableKeyPan'),
                                    enableZoom: new Setting(true, 'boolean', 'Enable / disable zooming'),
                                    input: new Setting({ keys: { up: 38, down: 40, left: 37, right: 39 }, mouse: { rotate: 0, zoom: 1, pan: 2 }, touch: { rotate: 1, zoom: 2, pan: 3 } }, 'any'),
                                    keyPanSpeed: new Setting(0.5, 'factor', 'Speed of panning when using the keyboard'),
                                    movementSmoothness: new Setting(0.5, 'factor', 'How much to the current movement is affected by the previous one'),
                                    panSpeed: new Setting(0.5, 'factor', 'Speed of panning'),
                                    zoomSpeed: new Setting(0.5, 'factor', 'Speed of zooming'),
                                }
                            },
                            enableCameraControls: new Setting(true, 'boolean', 'Enable / disable camera controls'),
                            revertAtMouseUp: new Setting(false, 'boolean', 'Enable / disable if the mouse should reset on mouse up'),
                            revertAtMouseUpDuration: new Setting(800, 'notnegative', 'The duration of the transition of the revertAtMouseUp'),
                            zoomExtentsFactor: new Setting(1, 'number', 'Factor to apply to the bounding box before zooming to extents'),
                        },
                        duration: new Setting(0, 'notnegative', 'Set fade in / fade out duration'),
                        fullscreen: new Setting(false, 'boolean', 'Enable / disable fullscreen mode', false),
                        gridVisibility: new Setting(true, 'boolean', 'Show / hide the grid'),
                        groundPlaneReflectionThreshold: new Setting(0.01, 'notnegative', 'Allows to control the distance to objects that are still reflected by the groundplane'),
                        groundPlaneReflectionVisibility: new Setting(false, 'boolean', 'Enable / disable the reflectivity of the groundplane'),
                        groundPlaneVisibility: new Setting(true, 'boolean', 'Show / hide the ground plane'),
                        lights: {
                            helper: new Setting(false, 'boolean', 'Show / hide the light helpers'),
                            lightScene: new Setting('default', 'string'),
                            lightScenes: new Setting({}, 'any'),
                        },
                        material: {
                            environmentMap: new Setting('none', function (value) { return true; }, 'Name of the environment map to use, or an array of 6 image URLs making up the cube mapped environment map (px, nx, pz, nz, py, ny)'),
                            environmentMapAsBackground: new Setting(false, 'boolean', 'Show / hide the environment map in the background'),
                            environmentMapResolution: new Setting('1024', function (value) { return (['256', '512', '1024', '2048'].includes(value)); }, 'Image resolution to be used for the named environment maps (available resolutions: 256, 512, 1024)'),
                        },
                        render: {
                            ambientOcclusion: new Setting(true, 'boolean', 'Enable / disable ambient occlusion for rendering'),
                            beautyRenderDelay: new Setting(50, 'notnegative', 'Amount of which the beauty rendering is delayed'),
                            clearColor: new Setting('#ffffff', 'string', 'Set background color'),
                            clearAlpha: new Setting(1.0, 'factor', 'Set background alpha value'),
                            pointSize: new Setting(1.0, 'notnegative', 'Set size of point objects'),
                            shadows: new Setting(true, 'boolean', 'Enable / disable shadows for rendering'),
                            sao: {
                                samples: new Setting(8, 'notnegative'),
                                intensity: new Setting(0.1, 'notnegative'),
                                kernelRadius: new Setting(8, 'notnegative'),
                                standardDev: new Setting(25, 'notnegative'),
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
        Settings$1.prototype.convertFromPreviousVersion = function (settings) {
            var oldSettings = settings.settings;
            this._settings.viewer.scene.render.clearAlpha.value = oldSettings.clearAlpha.value;
            this._settings.viewer.scene.render.clearColor.value = oldSettings.clearColor.value;
            this._settings.defaultMaterial.color.value = oldSettings.defaultMaterialColor.value;
            this._settings.build_date.value = oldSettings.build_date.value;
            this._settings.build_version.value = oldSettings.build_version.value;
            if (!(oldSettings.camera.value.position.value.x === 5 && oldSettings.camera.value.position.value.y === 5 && oldSettings.camera.value.position.value.z === 5 && oldSettings.camera.value.target.value.x === 0 && oldSettings.camera.value.target.value.y === 0 && oldSettings.camera.value.target.value.z === 0)) {
                this._settings.viewer.scene.camera.cameraTypes.perspective.default.value.position.value = oldSettings.camera.value.position.value;
                this._settings.viewer.scene.camera.cameraTypes.perspective.default.value.target.value = oldSettings.camera.value.target.value;
            }
            if (!(oldSettings.cameraOrtho.value.position.value.x === 5 && oldSettings.cameraOrtho.value.position.value.y === 5 && oldSettings.cameraOrtho.value.position.value.z === 5 && oldSettings.cameraOrtho.value.target.value.x === 0 && oldSettings.cameraOrtho.value.target.value.y === 0 && oldSettings.cameraOrtho.value.target.value.z === 0)) {
                this._settings.viewer.scene.camera.cameraTypes.orthographic.default.value.position.value = oldSettings.cameraOrtho.value.position.value;
                this._settings.viewer.scene.camera.cameraTypes.orthographic.default.value.target.value = oldSettings.cameraOrtho.value.target.value;
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
            this._settings.viewer.scene.camera.controls.orbit.enableAutoRotation.value = oldSettings.enableAutoRotation.value;
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
            this._settings.viewer.scene.camera.controls.orbit.zoomSpeed.value = oldSettings.zoomSpeed.value;
            this._settings.viewer.scene.camera.controls.orthographic.zoomSpeed.value = oldSettings.zoomSpeed.value;
            return this;
        };
        Settings$1.prototype.convertToPreviousVersion = function () {
            var oldSettings = new Settings();
            oldSettings.settings.build_date.value = this._settings.build_date.value;
            oldSettings.settings.build_version.value = this._settings.build_version.value;
            oldSettings.settings.ambientOcclusion.value = this._settings.viewer.scene.render.ambientOcclusion.value;
            oldSettings.settings.autoRotateSpeed.value = this._settings.viewer.scene.camera.controls.orbit.autoRotationSpeed.value;
            oldSettings.settings.bumpAmplitude.value = this._settings.defaultMaterial.bumpAmplitude.value;
            oldSettings.settings.camera.value = new Setting({
                position: this._settings.viewer.scene.camera.cameraTypes.perspective.default.value.position.value,
                target: this._settings.viewer.scene.camera.cameraTypes.perspective.default.value.target.value,
            }, function (v) { return true; }).value;
            oldSettings.settings.cameraAutoAdjust.value = this._settings.viewer.scene.camera.autoAdjust.value;
            oldSettings.settings.cameraMovementDuration.value = this._settings.viewer.scene.camera.cameraMovementDuration.value;
            oldSettings.settings.cameraOrtho.value = new Setting({
                position: this._settings.viewer.scene.camera.cameraTypes.orthographic.default.value.position.value,
                target: this._settings.viewer.scene.camera.cameraTypes.orthographic.default.value.target.value,
            }, function (v) { return true; }).value;
            oldSettings.settings.cameraRevertAtMouseUp.value = this._settings.viewer.scene.camera.revertAtMouseUp.value;
            oldSettings.settings.clearAlpha.value = this._settings.viewer.scene.render.clearAlpha.value;
            oldSettings.settings.clearColor.value = this._settings.viewer.scene.render.clearColor.value;
            oldSettings.settings.commitParameters.value = this._settings.viewer.commitParameters.value;
            oldSettings.settings.controlDamping.value = this._settings.viewer.scene.camera.controls.orbit.damping.value;
            if (this._settings.parameters.controlNames.value) { // important to keep this, because old viewers will not work properly if this property is null
                oldSettings.settings.controlNames.value = this._settings.parameters.controlNames.value;
            }
            if (this._settings.parameters.controlOrder.value) { // important to keep this, because old viewers will not work properly if this property is null
                oldSettings.settings.controlOrder.value = this._settings.parameters.controlOrder.value;
            }
            oldSettings.settings.defaultMaterialColor.value = this._settings.defaultMaterial.color.value;
            oldSettings.settings.disablePan.value = !this._settings.viewer.scene.camera.controls.orbit.enablePan.value;
            oldSettings.settings.disableZoom.value = !this._settings.viewer.scene.camera.controls.orbit.enableZoom.value;
            oldSettings.settings.enableAutoRotation.value = this._settings.viewer.scene.camera.controls.orbit.enableAutoRotation.value;
            oldSettings.settings.enableRotation.value = this._settings.viewer.scene.camera.controls.orbit.enableRotation.value;
            oldSettings.settings.environmentMap.value = this._settings.viewer.scene.material.environmentMap.value;
            oldSettings.settings.environmentMapResolution.value = this._settings.viewer.scene.material.environmentMapResolution.value;
            oldSettings.settings.fov.value = this._settings.viewer.scene.camera.cameraTypes.perspective.fov.value;
            oldSettings.settings.lightScene.value = this._settings.viewer.scene.lights.lightScene.value;
            oldSettings.settings.lightScenes.value = this._settings.viewer.scene.lights.lightScenes.value;
            oldSettings.settings.panSpeed.value = this._settings.viewer.scene.camera.controls.orbit.panSpeed.value;
            if (this._settings.parameters.parametersHidden.value) { // important to keep this, because old viewers will not work properly if this property is null
                oldSettings.settings.parametersHidden.value = this._settings.parameters.parametersHidden.value;
            }
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
            // TODO compute backgroundColor (used by viewer v1) from clearAlpha and clearColor, requires tinycolor helper functionality
            //let tc = TO_TINY_COLOR(this._settings.viewer.scene.render.clearColor.value);
            //tc.setAlpha(this._settings.viewer.scene.render.clearAlpha.value);
            //(oldSettings.settings.backgroundColor as ISetting<any>).value = '0x' + tc.toHex8();
            return oldSettings;
        };
        return Settings$1;
    }(BaseSettings));

    var ViewerVersionSettingsVersion = /** @class */ (function () {
        // #endregion Properties (2)
        // #region Constructors (1)
        function ViewerVersionSettingsVersion(viewerVersion, settingsVersion) {
            this.viewer_version = new SettingsVersion(viewerVersion);
            this.settings_version = new SettingsVersion(settingsVersion);
        }
        return ViewerVersionSettingsVersion;
    }());
    var SettingsConversion = /** @class */ (function () {
        // #endregion Properties (2)
        // #region Constructors (1)
        function SettingsConversion() {
            // #region Properties (2)
            this._settingsVersions = [];
            this._versions = {
                '1.0.0': Settings,
                '2.0.0': Settings$1
            };
            this._mapViewerVersionSettingsVersion = [
                new ViewerVersionSettingsVersion('2.19.0', '2.0'),
            ];
            for (var _i = 0, _a = Object.keys(this._versions); _i < _a.length; _i++) {
                var k = _a[_i];
                this._settingsVersions.push(new this._versions[k]());
            }
        }
        // #endregion Constructors (1)
        // #region Public Methods (2)
        SettingsConversion.prototype.convert = function (settingsJSON, version) {
            var settings = this.createSettingsObject(settingsJSON);
            var currentVersion = settings.version, requiredVersion = new SettingsVersion(version);
            var indexCurrent = this._findVersionIndex(currentVersion);
            var indexRequired = this._findVersionIndex(requiredVersion);
            if (indexCurrent === -1 || indexRequired === -1)
                return settings.toJSON();
            var convertedSettings = settings;
            if (indexCurrent < indexRequired) {
                while (indexCurrent < indexRequired) {
                    indexCurrent += 1;
                    var currentVersion_1 = this._versions[this._settingsVersions[indexCurrent].version.toString()];
                    convertedSettings = (new currentVersion_1()).convertFromPreviousVersion(convertedSettings);
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
                return new Settings(settingsJSON);
            var version = new SettingsVersion(settingsJSON.settings_version);
            return new this._versions[version.toString()](settingsJSON);
        };
        SettingsConversion.prototype.mapViewerVersionToSettingsVersion = function (versionString) {
            var version = new SettingsVersion(versionString || '0.0.0');
            for (var _i = 0, _a = this._mapViewerVersionSettingsVersion; _i < _a.length; _i++) {
                var kvp = _a[_i];
                if (kvp.viewer_version.isLowerThan(version) || kvp.viewer_version.equalTo(version)) {
                    return kvp.settings_version.toString();
                }
            }
            return '1.0';
        };
        // #endregion Public Methods (2)
        // #region Private Methods (1)
        SettingsConversion.prototype._findVersionIndex = function (version) {
            var v = new SettingsVersion(version.toString());
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
    exports.Settings_1_0 = Settings;
    exports.Settings_2_0 = Settings$1;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
