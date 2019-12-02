declare abstract class BaseSettings implements ISettings {
    protected _settings: IBaseSettingsObject;
    protected _version: ISettingsVersion;
    get settings(): IBaseSettingsObject;
    set settings(settings: IBaseSettingsObject);
    get version(): ISettingsVersion;
    getSettingDefinitions(): {};
    getSettingObject(key: string): ISetting<any>;
    getSettings(persistentOnly?: boolean): {};
    toJSON(persistentOnly?: boolean): {};
    abstract convertFromPreviousVersion(obj: ISettings): ISettings;
    abstract convertToPreviousVersion(): ISettings;
    protected _fromJSON(settingsJSON: any, iterable: IBaseSettingsObject): void;
    protected _toJSON(iterable: IBaseSettingsObject, persistentOnly: boolean): {};
    private _getSettingDefinitions;
    private _getSettings;
}
interface ISettingsVersion {
    versionLevels: number[];
    equalTo(v: ISettingsVersion): boolean;
    isLowerThan(v: ISettingsVersion): boolean;
    toString(): string;
}
interface ISettings {
    settings: IBaseSettingsObject;
    version: ISettingsVersion;
    convertFromPreviousVersion(obj: ISettings): ISettings;
    convertToPreviousVersion(): ISettings;
    getSettingDefinitions(): any;
    getSettingObject(key: string): ISetting<any>;
    getSettings(persistentOnly?: boolean): any;
    toJSON(persistentOnly?: boolean): any;
}
interface ISetting<T> {
    desc?: string;
    persistent: boolean;
    type: string | Function;
    value: T;
}
interface IBaseSettingsObject {
    [key: string]: ISetting<any> | IBaseSettingsObject;
}
interface IGlobalSettingsObject {
    build_date: ISetting<string>;
    build_version: ISetting<string>;
    settings_version: ISetting<string>;
    [key: string]: ISetting<any> | IBaseSettingsObject;
}
interface ISettingsObject extends IGlobalSettingsObject {
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
    controlNames: ISetting<{}>;
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
declare class Settings extends BaseSettings {
    protected _settings: ISettingsObject;
    /**
     *
     * @param settingsObject a settings object that is a JSON representation of this SettingsObject
     */
    constructor(settingsJSON?: any);
    convertFromPreviousVersion(oldSettings: ISettings): Settings;
    convertToPreviousVersion(): Settings;
}
declare class SettingsConversion {
    private _settingsVersions;
    private _versions;
    private _mapViewerVersionSettingsVersion;
    constructor();
    convert(settingsJSON: any, version: string): any;
    createSettingsObject(settingsJSON: any): ISettings;
    mapViewerVersionToSettingsVersion(versionString: string): string;
    private _findVersionIndex;
}
declare class Settings_1_0 extends Settings {
}
export { SettingsConversion, Settings_1_0, Settings_2_0 };
