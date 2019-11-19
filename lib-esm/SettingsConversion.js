import { SettingsVersion } from "./SettingsVersion";
import { Settings as Settings_1_0 } from "./versions/1.0/Settings";
import { Settings as Settings_2_0 } from "./versions/2.0/Settings";
var SettingsConversion = /** @class */ (function () {
    // #endregion Properties (2)
    // #region Constructors (1)
    function SettingsConversion() {
        // #region Properties (2)
        this._settingsVersions = [];
        this._versions = {
            '1.0': Settings_1_0,
            '2.0': Settings_2_0
        };
        for (var _i = 0, _a = Object.keys(this._versions); _i < _a.length; _i++) {
            var k = _a[_i];
            this._settingsVersions.push(new this._versions[k]());
        }
    }
    // #endregion Constructors (1)
    // #region Public Methods (2)
    SettingsConversion.prototype.convert = function (settingsJSON, version) {
        var settings = this.createSettingsObject(settingsJSON);
        var currentVersion = settings.version, requiredVersion = new SettingsVersion(version);
        var indexCurrent = this._findVersionIndex(currentVersion);
        var indexRequired = this._findVersionIndex(requiredVersion);
        if (indexCurrent === -1 || indexRequired === -1)
            return settings.toJSON();
        var convertedSettings = settings;
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
    };
    SettingsConversion.prototype.createSettingsObject = function (settingsJSON) {
        if (!settingsJSON.settings_version)
            return new Settings_1_0(settingsJSON);
        var version = new SettingsVersion(settingsJSON.settings_version);
        return new this._versions[version.toString()](settingsJSON);
    };
    // #endregion Public Methods (2)
    // #region Private Methods (1)
    SettingsConversion.prototype._findVersionIndex = function (version) {
        var v = new SettingsVersion(version.toString());
        for (var i = 0; i < this._settingsVersions.length; i++)
            if (this._settingsVersions[i].version.equalTo(v))
                return i;
        v.versionLevels[v.versionLevels.length - 1] = 0;
        for (var i = 0; i < this._settingsVersions.length; i++)
            if (this._settingsVersions[i].version.equalTo(v))
                return i;
        return -1;
    };
    return SettingsConversion;
}());
export { SettingsConversion };
//# sourceMappingURL=SettingsConversion.js.map