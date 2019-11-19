import { ISettings } from "./interfaces/interfaces";
export declare class SettingsConversion {
    private _settingsVersions;
    private _versions;
    constructor();
    convert(settingsJSON: any, version: string): any;
    createSettingsObject(settingsJSON: any): ISettings;
    private _findVersionIndex;
}
//# sourceMappingURL=SettingsConversion.d.ts.map