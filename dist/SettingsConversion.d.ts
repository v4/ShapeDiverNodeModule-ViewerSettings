import { ISettings } from "./interfaces/interfaces";
export declare class SettingsConversion {
    private _settingsVersions;
    private _versions;
    private _mapViewerVersionSettingsVersion;
    constructor();
    convert(settingsJSON: any, version: string, persistentOnly?: boolean): any;
    createSettingsObject(settingsJSON: any): ISettings;
    mapViewerVersionToSettingsVersion(versionString: string): string;
    private _findVersionIndex;
}
