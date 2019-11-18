"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SettingsVersion {
    // #endregion Properties (1)
    // #region Constructors (1)
    constructor(version = '1.0') {
        // #region Properties (1)
        this._versionLevels = [];
        let splitArray = version.split('.');
        for (let n in splitArray)
            this._versionLevels.push(+splitArray[n]);
    }
    // #endregion Constructors (1)
    // #region Public Accessors (1)
    get versionLevels() {
        return this._versionLevels;
    }
    // #endregion Public Accessors (1)
    // #region Public Methods (3)
    equalTo(v) {
        if (v.versionLevels.length !== this._versionLevels.length)
            return false;
        for (let i = 0; i < this._versionLevels.length; i++)
            if (v.versionLevels[i] !== this._versionLevels[i])
                return false;
        return true;
    }
    isLowerThan(v) {
        for (let i = 0; i < this._versionLevels.length; i++) {
            if (this._versionLevels[i] > v.versionLevels[i]) {
                return false;
            }
            else if (this._versionLevels[i] < v.versionLevels[i]) {
                return true;
            }
        }
        return false;
    }
    toString() {
        return this._versionLevels.join('.');
    }
}
exports.SettingsVersion = SettingsVersion;
