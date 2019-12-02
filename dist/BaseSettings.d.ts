import { ISettings, IBaseSettingsObject, ISettingsVersion, ISetting } from "./interfaces/interfaces";
export declare abstract class BaseSettings implements ISettings {
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
