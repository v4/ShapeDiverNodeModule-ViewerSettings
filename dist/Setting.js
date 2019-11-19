"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.Setting = Setting;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9TZXR0aW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUE7SUFDSSwyQkFBMkI7SUFFM0IsaUJBQW9CLE1BQVMsRUFBVSxLQUFzQixFQUFVLEtBQWMsRUFBVSxXQUEyQjtRQUEzQiw0QkFBQSxFQUFBLGtCQUEyQjtRQUF0RyxXQUFNLEdBQU4sTUFBTSxDQUFHO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBaUI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFTO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQWdCO0lBQUksQ0FBQztJQU0vSCxzQkFBVyx5QkFBSTtRQUpmLDhCQUE4QjtRQUU5QiwrQkFBK0I7YUFFL0I7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywrQkFBVTthQUFyQjtZQUNJLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUM1QixDQUFDOzs7T0FBQTtJQUVELHNCQUFXLHlCQUFJO2FBQWY7WUFDSSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDdEIsQ0FBQzs7O09BQUE7SUFFRCxzQkFBVywwQkFBSzthQUFoQjtZQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QixDQUFDO2FBRUQsVUFBaUIsQ0FBSTtZQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNwQixDQUFDOzs7T0FKQTtJQU9MLGNBQUM7QUFBRCxDQUFDLEFBOUJELElBOEJDO0FBOUJZLDBCQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNldHRpbmcgfSBmcm9tIFwiLi9pbnRlcmZhY2VzL2ludGVyZmFjZXNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5nPFQ+IGltcGxlbWVudHMgSVNldHRpbmc8VD4ge1xyXG4gICAgLy8gI3JlZ2lvbiBDb25zdHJ1Y3RvcnMgKDEpXHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfdmFsdWU6IFQsIHByaXZhdGUgX3R5cGU6IHN0cmluZ3xGdW5jdGlvbiwgcHJpdmF0ZSBfZGVzYz86IHN0cmluZywgcHJpdmF0ZSBfcGVyc2lzdGVudDogYm9vbGVhbiA9IHRydWUpIHsgfVxyXG5cclxuICAgIC8vICNlbmRyZWdpb24gQ29uc3RydWN0b3JzICgxKVxyXG5cclxuICAgIC8vICNyZWdpb24gUHVibGljIEFjY2Vzc29ycyAoNSlcclxuXHJcbiAgICBwdWJsaWMgZ2V0IGRlc2MoKTogc3RyaW5nfHVuZGVmaW5lZCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Rlc2M7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCBwZXJzaXN0ZW50KCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9wZXJzaXN0ZW50O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdHlwZSgpOiBzdHJpbmd8RnVuY3Rpb24ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl90eXBlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogVCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXQgdmFsdWUodjogVCkge1xyXG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdjtcclxuICAgIH1cclxuXHJcbiAgICAvLyAjZW5kcmVnaW9uIFB1YmxpYyBBY2Nlc3NvcnMgKDUpXHJcbn0iXX0=