import { SettingsVersion } from "./SettingsVersion";
import { ISettings, ISettingsVersion, ISettingsDictionary } from "./interfaces/interfaces";
import { Settings as Settings_1_0 } from "./versions/1.0/Settings";
import { Settings as Settings_2_0 } from "./versions/2.0/Settings";

export class SettingsConversion {
    // #region Properties (2)

    private _settingsVersions: ISettings[] = [];
    private _versions: ISettingsDictionary<any> = {
        '1.0': Settings_1_0,
        '2.0': Settings_2_0
    }

    // #endregion Properties (2)

    // #region Constructors (1)

    constructor() {
        for(let k of Object.keys(this._versions))
            this._settingsVersions.push(new this._versions[k]());
    }

    // #endregion Constructors (1)

    // #region Public Methods (2)

    public convert(settingsJSON: any, version: string): any {
        let settings: ISettings = this.createSettingsObject(settingsJSON);

        let currentVersion = settings.version,
            requiredVersion = new SettingsVersion(version);
        let indexCurrent = this._findVersionIndex(currentVersion);
        let indexRequired = this._findVersionIndex(requiredVersion);
    
        if(indexCurrent === -1 || indexRequired === -1) return settings.toJSON();

        let convertedSettings: ISettings = settings;
        if (indexCurrent < indexRequired) {
            while(indexCurrent < indexRequired) {
                indexCurrent+=1;
                convertedSettings = new this._versions[this._settingsVersions[indexCurrent].version.toString()]().convertFromPreviousVersion(settings);
            }
        } else if (indexCurrent > indexRequired) {
            while (indexCurrent > indexRequired) {
                indexCurrent-=1;
                convertedSettings = convertedSettings.convertToPreviousVersion();
            }
        }
        return convertedSettings.toJSON();
    }

    public createSettingsObject(settingsJSON: any): ISettings {
        if(!settingsJSON.settings_version) return new Settings_1_0(settingsJSON);
    
        let version = new SettingsVersion(settingsJSON.settings_version);
        return new this._versions[version.toString()](settingsJSON);
    }

    // #endregion Public Methods (2)

    // #region Private Methods (1)

    private _findVersionIndex(version: ISettingsVersion): number {
        let v = new SettingsVersion(version.toString());
        for (let i = 0; i < this._settingsVersions.length; i++)
            if(this._settingsVersions[i].version.equalTo(v))
                return i;

        v.versionLevels[v.versionLevels.length-1] = 0;
        for (let i = 0; i < this._settingsVersions.length; i++)
            if(this._settingsVersions[i].version.equalTo(v))
                return i;
        
        return -1;
    }

    // #endregion Private Methods (1)
}