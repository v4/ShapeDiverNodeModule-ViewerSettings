import { ISetting, IGlobalSettingsObject } from "../../interfaces/interfaces";
export interface ISettingsObject extends IGlobalSettingsObject {
    ambientOcclusion: ISetting<boolean>;
    autoRotateSpeed: ISetting<number>;
    backgroundColor?: ISetting<string>;
    bumpAmplitude: ISetting<number>;
    camera: ISetting<{
        position: ISetting<any>;
        target: ISetting<any>;
    }>;
    cameraAutoAdjust: ISetting<boolean>;
    cameraMovementDuration: ISetting<number>;
    cameraOrtho: ISetting<{
        position: ISetting<any>;
        target: ISetting<any>;
    }>;
    cameraRevertAtMouseUp: ISetting<boolean>;
    clearAlpha: ISetting<number>;
    clearColor: ISetting<string>;
    commitParameters: ISetting<boolean>;
    controlDamping: ISetting<number>;
    controlNames: ISetting<string[]>;
    controlOrder: ISetting<string[]>;
    defaultMaterialColor: ISetting<string>;
    disablePan: ISetting<boolean>;
    disableZoom: ISetting<boolean>;
    enableAutoRotation: ISetting<boolean>;
    enableRotation: ISetting<boolean>;
    environmentMap: ISetting<string>;
    environmentMapResolution: ISetting<string>;
    fov: ISetting<number>;
    lightScene: ISetting<string>;
    lightScenes: ISetting<any>;
    panSpeed: ISetting<number>;
    parametersHidden: ISetting<string[]>;
    pointSize: ISetting<number>;
    revertAtMouseUpDuration: ISetting<number>;
    rotateSpeed: ISetting<number>;
    showEnvironmentMap: ISetting<boolean>;
    showGrid: ISetting<boolean>;
    showGroundPlane: ISetting<boolean>;
    showShadows: ISetting<boolean>;
    topView: ISetting<boolean>;
    zoomExtentFactor: ISetting<number>;
    zoomSpeed: ISetting<number>;
}
