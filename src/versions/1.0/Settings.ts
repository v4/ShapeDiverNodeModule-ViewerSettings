import { ISettings } from "../../interfaces/interfaces";
import { SettingsVersion } from "../../SettingsVersion";
import { Setting } from "../../Setting";
import { ISettingsObject } from "./interfaces";
import { BaseSettings } from "../../BaseSettings";
import typeChecks from "shapedivernodemodule-typechecks";

export class Settings extends BaseSettings {
    // #region Properties (1)

    protected _settings: ISettingsObject;

    // #endregion Properties (1)

    // #region Constructors (1)

    /**
     * 
     * @param settingsObject a settings object that is a JSON representation of this SettingsObject
     */
    constructor(settingsJSON?: any) {
        super();
        this._version = new SettingsVersion('1.0');
        this._settings = {
            build_date: new Setting('', typeChecks.string),
            build_version: new Setting('', typeChecks.string),
            settings_version: new Setting('1.0', typeChecks.string),
    
            ambientOcclusion: new Setting(true, typeChecks.boolean),
            autoRotateSpeed: new Setting(0.0, typeChecks.number),
            bumpAmplitude: new Setting(1.0, typeChecks.number),
            camera: new Setting({
                position: new Setting({ x: 0, y: 0, z: 0 }, typeChecks.vector3obj),
                target: new Setting({ x: 0, y: 0, z: 0 }, typeChecks.vector3obj),
            }, (v) => true),
            cameraAutoAdjust: new Setting(false, typeChecks.boolean),
            cameraMovementDuration: new Setting(0, typeChecks.number),
            cameraOrtho: new Setting({
                position: new Setting({ x: 0, y: 0, z: 0 }, typeChecks.vector3obj),
                target: new Setting({ x: 0, y: 0, z: 0 }, typeChecks.vector3obj),
            }, (v) => true),
            cameraRevertAtMouseUp: new Setting(false, typeChecks.boolean),
            clearAlpha: new Setting(1.0, typeChecks.number),
            clearColor: new Setting('#ffffff', typeChecks.color),
            commitParameters: new Setting(false, typeChecks.boolean),
            controlDamping: new Setting(0.1, typeChecks.number),
            controlNames: new Setting(null, typeChecks.stringarray),
            controlOrder: new Setting(null, typeChecks.stringarray),
            defaultMaterialColor: new Setting('#d3d3d3', typeChecks.color),
            disablePan: new Setting(false, typeChecks.boolean),
            disableZoom: new Setting(false, typeChecks.boolean),
            enableAutoRotate: new Setting(false, typeChecks.boolean),
            enableRotation: new Setting(true, typeChecks.boolean),
            environmentMap: new Setting('none', typeChecks.string),
            environmentMapResolution: new Setting('1024', typeChecks.string),
            fov: new Setting(45, typeChecks.number),
            lightScene: new Setting('default', typeChecks.string),
            lightScenes: new Setting(null, typeChecks.any),
            panSpeed: new Setting(0.5, typeChecks.number),
            parametersHidden: new Setting(null, typeChecks.stringarray),
            pointSize: new Setting(1.0, typeChecks.number),
            revertAtMouseUpDuration: new Setting(800, typeChecks.number),
            rotateSpeed: new Setting(0.25, typeChecks.number),
            showEnvironmentMap: new Setting(false, typeChecks.boolean),
            showGrid: new Setting(false, typeChecks.boolean),
            showGroundPlane: new Setting(false, typeChecks.boolean),
            showShadows: new Setting(true, typeChecks.boolean),
            topView: new Setting(false, typeChecks.boolean),
            zoomExtentFactor: new Setting(1.0, typeChecks.number),
            zoomSpeed: new Setting(1.0, typeChecks.number),
        };

        if(settingsJSON) {
            if((!settingsJSON.clearAlpha || !settingsJSON.clearColor) && settingsJSON.backgroundColor && typeof settingsJSON.backgroundColor === 'string') {
                settingsJSON.clearAlpha = settingsJSON.backgroundColor.substring(0, 8);
                settingsJSON.clearColor = settingsJSON.backgroundColor.substring(8);
            }
            if(settingsJSON.defaultMaterialColor && Array.isArray(settingsJSON.defaultMaterialColor)) {
                let temp = '#';
                for(let i = 0; i < settingsJSON.defaultMaterialColor.length; i++)
                    temp += Number(settingsJSON.defaultMaterialColor[i]).toString(16);
                settingsJSON.defaultMaterialColor = temp;
            }

            this._fromJSON(settingsJSON, this._settings);
        }
    }

    // #endregion Constructors (1)

    // #region Public Methods (2)

    public convertFromPreviousVersion(oldSettings: ISettings): Settings {
        return this;
    }

    public convertToPreviousVersion(): Settings {
        return this;
    }

    // #endregion Public Methods (2)
};
