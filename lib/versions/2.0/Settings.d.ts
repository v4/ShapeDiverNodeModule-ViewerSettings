import { ISettingsObject } from "./interfaces";
import { Settings as OldSettings } from "../1.0/Settings";
import { BaseSettings } from "../../BaseSettings";
export declare class Settings extends BaseSettings {
    protected _settings: ISettingsObject;
    /**
     *
     * @param settingsObject a settings object that is a JSON representation of this SettingsObject
     */
    constructor(settingsJSON?: any);
    convertFromPreviousVersion(settings: OldSettings): Settings;
    convertToPreviousVersion(): OldSettings;
}
