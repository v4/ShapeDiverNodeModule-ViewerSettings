"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SettingsVersion_1 = require("./SettingsVersion");
const Settings_1 = require("./versions/1.0/Settings");
const Settings_2 = require("./versions/2.0/Settings");
class SettingsConversion {
    // #endregion Properties (2)
    // #region Constructors (1)
    constructor() {
        // #region Properties (2)
        this._settingsVersions = [];
        this._versions = {
            '1.0': Settings_1.Settings,
            '2.0': Settings_2.Settings
        };
        for (let k of Object.keys(this._versions))
            this._settingsVersions.push(new this._versions[k]());
    }
    // #endregion Constructors (1)
    // #region Public Methods (2)
    convert(settingsJSON, version) {
        let settings = this.createSettingsObject(settingsJSON);
        let currentVersion = settings.version, requiredVersion = new SettingsVersion_1.SettingsVersion(version);
        let indexCurrent = this._findVersionIndex(currentVersion);
        let indexRequired = this._findVersionIndex(requiredVersion);
        if (indexCurrent === -1 || indexRequired === -1)
            return settings.toJSON();
        let convertedSettings = settings;
        if (indexCurrent < indexRequired) {
            while (indexCurrent < indexRequired) {
                indexCurrent += 1;
                convertedSettings = new this._versions[this._settingsVersions[indexCurrent].version.toString()]().convertFromPreviousVersion(settings);
            }
        }
        else if (indexCurrent > indexRequired) {
            while (indexCurrent > indexRequired) {
                indexCurrent -= 1;
                convertedSettings = convertedSettings.convertToPreviousVersion();
            }
        }
        return convertedSettings.toJSON();
    }
    createSettingsObject(settingsJSON) {
        if (!settingsJSON.settings_version)
            return new Settings_1.Settings(settingsJSON);
        let version = new SettingsVersion_1.SettingsVersion(settingsJSON.settings_version);
        return new this._versions[version.toString()](settingsJSON);
    }
    // #endregion Public Methods (2)
    // #region Private Methods (1)
    _findVersionIndex(version) {
        let v = new SettingsVersion_1.SettingsVersion(version.toString());
        for (let i = 0; i < this._settingsVersions.length; i++)
            if (this._settingsVersions[i].version.equalTo(v))
                return i;
        v.versionLevels[v.versionLevels.length - 1] = 0;
        for (let i = 0; i < this._settingsVersions.length; i++)
            if (this._settingsVersions[i].version.equalTo(v))
                return i;
        return -1;
    }
}
exports.SettingsConversion = SettingsConversion;
