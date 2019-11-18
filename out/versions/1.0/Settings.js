"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SettingsVersion_1 = require("../../SettingsVersion");
const Setting_1 = require("../../Setting");
const BaseSettings_1 = require("../../BaseSettings");
const shapedivernodemodule_typechecks_1 = __importDefault(require("shapedivernodemodule-typechecks"));
class Settings extends BaseSettings_1.BaseSettings {
    // #endregion Properties (1)
    // #region Constructors (1)
    /**
     *
     * @param settingsObject a settings object that is a JSON representation of this SettingsObject
     */
    constructor(settingsJSON) {
        super();
        this._version = new SettingsVersion_1.SettingsVersion('1.0');
        this._settings = {
            build_date: new Setting_1.Setting('', shapedivernodemodule_typechecks_1.default.string),
            build_version: new Setting_1.Setting('', shapedivernodemodule_typechecks_1.default.string),
            settings_version: new Setting_1.Setting('1.0', shapedivernodemodule_typechecks_1.default.string),
            ambientOcclusion: new Setting_1.Setting(true, shapedivernodemodule_typechecks_1.default.boolean),
            autoRotateSpeed: new Setting_1.Setting(0.0, shapedivernodemodule_typechecks_1.default.number),
            bumpAmplitude: new Setting_1.Setting(1.0, shapedivernodemodule_typechecks_1.default.number),
            camera: new Setting_1.Setting({
                position: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, shapedivernodemodule_typechecks_1.default.vector3obj),
                target: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, shapedivernodemodule_typechecks_1.default.vector3obj),
            }, (v) => true),
            cameraAutoAdjust: new Setting_1.Setting(false, shapedivernodemodule_typechecks_1.default.boolean),
            cameraMovementDuration: new Setting_1.Setting(0, shapedivernodemodule_typechecks_1.default.number),
            cameraOrtho: new Setting_1.Setting({
                position: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, shapedivernodemodule_typechecks_1.default.vector3obj),
                target: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, shapedivernodemodule_typechecks_1.default.vector3obj),
            }, (v) => true),
            cameraRevertAtMouseUp: new Setting_1.Setting(false, shapedivernodemodule_typechecks_1.default.boolean),
            clearAlpha: new Setting_1.Setting(1.0, shapedivernodemodule_typechecks_1.default.number),
            clearColor: new Setting_1.Setting('#ffffff', shapedivernodemodule_typechecks_1.default.color),
            commitParameters: new Setting_1.Setting(false, shapedivernodemodule_typechecks_1.default.boolean),
            controlDamping: new Setting_1.Setting(0.1, shapedivernodemodule_typechecks_1.default.number),
            controlNames: new Setting_1.Setting(null, shapedivernodemodule_typechecks_1.default.stringarray),
            controlOrder: new Setting_1.Setting(null, shapedivernodemodule_typechecks_1.default.stringarray),
            defaultMaterialColor: new Setting_1.Setting('#d3d3d3', shapedivernodemodule_typechecks_1.default.color),
            disablePan: new Setting_1.Setting(false, shapedivernodemodule_typechecks_1.default.boolean),
            disableZoom: new Setting_1.Setting(false, shapedivernodemodule_typechecks_1.default.boolean),
            enableAutoRotate: new Setting_1.Setting(false, shapedivernodemodule_typechecks_1.default.boolean),
            enableRotation: new Setting_1.Setting(true, shapedivernodemodule_typechecks_1.default.boolean),
            environmentMap: new Setting_1.Setting('none', shapedivernodemodule_typechecks_1.default.string),
            environmentMapResolution: new Setting_1.Setting('1024', shapedivernodemodule_typechecks_1.default.string),
            fov: new Setting_1.Setting(45, shapedivernodemodule_typechecks_1.default.number),
            lightScene: new Setting_1.Setting('default', shapedivernodemodule_typechecks_1.default.string),
            lightScenes: new Setting_1.Setting(null, shapedivernodemodule_typechecks_1.default.any),
            panSpeed: new Setting_1.Setting(0.5, shapedivernodemodule_typechecks_1.default.number),
            parametersHidden: new Setting_1.Setting(null, shapedivernodemodule_typechecks_1.default.stringarray),
            pointSize: new Setting_1.Setting(1.0, shapedivernodemodule_typechecks_1.default.number),
            revertAtMouseUpDuration: new Setting_1.Setting(800, shapedivernodemodule_typechecks_1.default.number),
            rotateSpeed: new Setting_1.Setting(0.25, shapedivernodemodule_typechecks_1.default.number),
            showEnvironmentMap: new Setting_1.Setting(false, shapedivernodemodule_typechecks_1.default.boolean),
            showGrid: new Setting_1.Setting(false, shapedivernodemodule_typechecks_1.default.boolean),
            showGroundPlane: new Setting_1.Setting(false, shapedivernodemodule_typechecks_1.default.boolean),
            showShadows: new Setting_1.Setting(true, shapedivernodemodule_typechecks_1.default.boolean),
            topView: new Setting_1.Setting(false, shapedivernodemodule_typechecks_1.default.boolean),
            zoomExtentFactor: new Setting_1.Setting(1.0, shapedivernodemodule_typechecks_1.default.number),
            zoomSpeed: new Setting_1.Setting(1.0, shapedivernodemodule_typechecks_1.default.number),
        };
        if (settingsJSON) {
            if ((!settingsJSON.clearAlpha || !settingsJSON.clearColor) && settingsJSON.backgroundColor && typeof settingsJSON.backgroundColor === 'string') {
                settingsJSON.clearAlpha = settingsJSON.backgroundColor.substring(0, 8);
                settingsJSON.clearColor = settingsJSON.backgroundColor.substring(8);
            }
            if (settingsJSON.defaultMaterialColor && Array.isArray(settingsJSON.defaultMaterialColor)) {
                let temp = '#';
                for (let i = 0; i < settingsJSON.defaultMaterialColor.length; i++)
                    temp += Number(settingsJSON.defaultMaterialColor[i]).toString(16);
                settingsJSON.defaultMaterialColor = temp;
            }
            this._fromJSON(settingsJSON, this._settings);
        }
    }
    // #endregion Constructors (1)
    // #region Public Methods (2)
    convertFromPreviousVersion(oldSettings) {
        return this;
    }
    convertToPreviousVersion() {
        return this;
    }
}
exports.Settings = Settings;
;
