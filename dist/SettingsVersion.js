var SettingsVersion = /** @class */ (function () {
    // #endregion Properties (1)
    // #region Constructors (1)
    function SettingsVersion(version) {
        if (version === void 0) { version = ''; }
        // #region Properties (1)
        this._versionLevels = [1, 0, 0];
        var splitArray = version.split('.');
        for (var i = 0, len = Math.min(splitArray.length, this._versionLevels.length); i < len; i++) {
            this._versionLevels[i] = +splitArray[i];
        }
    }
    Object.defineProperty(SettingsVersion.prototype, "versionLevels", {
        // #endregion Constructors (1)
        // #region Public Accessors (1)
        get: function () {
            return this._versionLevels;
        },
        enumerable: true,
        configurable: true
    });
    // #endregion Public Accessors (1)
    // #region Public Methods (3)
    SettingsVersion.prototype.equalTo = function (v) {
        if (v.versionLevels.length !== this._versionLevels.length)
            return false;
        for (var i = 0; i < this._versionLevels.length; i++)
            if (v.versionLevels[i] !== this._versionLevels[i])
                return false;
        return true;
    };
    SettingsVersion.prototype.isLowerThan = function (v) {
        for (var i = 0; i < this._versionLevels.length; i++) {
            if (this._versionLevels[i] > v.versionLevels[i]) {
                return false;
            }
            else if (this._versionLevels[i] < v.versionLevels[i]) {
                return true;
            }
        }
        return false;
    };
    SettingsVersion.prototype.toString = function () {
        return this._versionLevels.join('.');
    };
    return SettingsVersion;
}());
export { SettingsVersion };
