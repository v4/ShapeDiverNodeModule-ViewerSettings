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
import { SettingsVersion } from "../../SettingsVersion";
import { Setting } from "../../Setting";
import { BaseSettings } from "../../BaseSettings";
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
            build_date: new Setting('', function (v) { return true; }),
            build_version: new Setting('', function (v) { return true; }),
            settings_version: new Setting('1.0', function (v) { return true; }),
            ambientOcclusion: new Setting(true, function (v) { return true; }),
            autoRotateSpeed: new Setting(0.0, function (v) { return true; }),
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
            controlNames: new Setting(null, function (v) { return function (v) { return true; }; }),
            controlOrder: new Setting(null, function (v) { return function (v) { return true; }; }),
            defaultMaterialColor: new Setting('#d3d3d3', function (v) { return true; }),
            disablePan: new Setting(false, function (v) { return true; }),
            disableZoom: new Setting(false, function (v) { return true; }),
            enableAutoRotate: new Setting(false, function (v) { return true; }),
            enableRotation: new Setting(true, function (v) { return true; }),
            environmentMap: new Setting('none', function (v) { return true; }),
            environmentMapResolution: new Setting('1024', function (v) { return true; }),
            fov: new Setting(45, function (v) { return true; }),
            lightScene: new Setting('default', function (v) { return true; }),
            lightScenes: new Setting(null, function (v) { return true; }),
            panSpeed: new Setting(0.5, function (v) { return true; }),
            parametersHidden: new Setting(null, function (v) { return function (v) { return true; }; }),
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
export { Settings };
;
//# sourceMappingURL=Settings.js.map