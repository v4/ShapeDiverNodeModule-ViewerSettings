"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Setting {
    // #region Constructors (1)
    constructor(_value, _type, _desc, _persistent = true) {
        this._value = _value;
        this._type = _type;
        this._desc = _desc;
        this._persistent = _persistent;
    }
    // #endregion Constructors (1)
    // #region Public Accessors (5)
    get desc() {
        return this._desc;
    }
    get persistent() {
        return this._persistent;
    }
    get type() {
        return this._type;
    }
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v;
    }
}
exports.Setting = Setting;
