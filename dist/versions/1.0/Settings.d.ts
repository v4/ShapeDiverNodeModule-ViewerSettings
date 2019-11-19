import { ISettings } from "../../interfaces/interfaces";
import { ISettingsObject } from "./interfaces";
import { BaseSettings } from "../../BaseSettings";
export declare class Settings extends BaseSettings {
    protected _settings: ISettingsObject;
    /**
     *
     * @param settingsObject a settings object that is a JSON representation of this SettingsObject
     */
    constructor(settingsJSON?: any);
    convertFromPreviousVersion(oldSettings: ISettings): Settings;
    convertToPreviousVersion(): Settings;
}
//# sourceMappingURL=Settings.d.ts.map