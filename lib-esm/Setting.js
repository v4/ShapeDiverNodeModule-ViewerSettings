var Setting = /** @class */ (function () {
    // #region Constructors (1)
    function Setting(_value, _type, _desc, _persistent) {
        if (_persistent === void 0) { _persistent = true; }
        this._value = _value;
        this._type = _type;
        this._desc = _desc;
        this._persistent = _persistent;
    }
    Object.defineProperty(Setting.prototype, "desc", {
        // #endregion Constructors (1)
        // #region Public Accessors (5)
        get: function () {
            return this._desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Setting.prototype, "persistent", {
        get: function () {
            return this._persistent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Setting.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Setting.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (v) {
            this._value = v;
        },
        enumerable: true,
        configurable: true
    });
    return Setting;
}());
export { Setting };
//# sourceMappingURL=Setting.js.map