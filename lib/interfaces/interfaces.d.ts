import { BaseSettings } from "../BaseSettings";
export interface ISettingsDictionary<T extends BaseSettings> {
    [key: string]: T;
}
export interface ISettingsVersion {
    versionLevels: number[];
    equalTo(v: ISettingsVersion): boolean;
    isLowerThan(v: ISettingsVersion): boolean;
    toString(): string;
}
export interface ISettings {
    settings: IBaseSettingsObject;
    version: ISettingsVersion;
    convertFromPreviousVersion(obj: ISettings): ISettings;
    convertToPreviousVersion(): ISettings;
    getSettingDefinitions(): any;
    getSettingObject(key: string): ISetting<any>;
    getSettings(): any;
    toJSON(): any;
}
export interface ISetting<T> {
    desc?: string;
    persistent: boolean;
    type: string | Function;
    value: T;
}
export interface IBaseSettingsObject {
    [key: string]: ISetting<any> | IBaseSettingsObject;
}
export interface IGlobalSettingsObject {
    build_date: ISetting<string>;
    build_version: ISetting<string>;
    settings_version: ISetting<string>;
    [key: string]: ISetting<any> | IBaseSettingsObject;
}
