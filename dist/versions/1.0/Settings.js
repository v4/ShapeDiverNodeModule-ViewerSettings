"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SettingsVersion_1 = require("../../SettingsVersion");
var Setting_1 = require("../../Setting");
var BaseSettings_1 = require("../../BaseSettings");
var Settings = /** @class */ (function (_super) {
    __extends(Settings, _super);
    // #endregion Properties (1)
    // #region Constructors (1)
    /**
     *
     * @param settingsObject a settings object that is a JSON representation of this SettingsObject
     */
    function Settings(settingsJSON) {
        var _this = _super.call(this) || this;
        _this._version = new SettingsVersion_1.SettingsVersion('1.0');
        _this._settings = {
            build_date: new Setting_1.Setting('', function (v) { return true; }),
            build_version: new Setting_1.Setting('', function (v) { return true; }),
            settings_version: new Setting_1.Setting('1.0', function (v) { return true; }),
            ambientOcclusion: new Setting_1.Setting(true, function (v) { return true; }),
            autoRotateSpeed: new Setting_1.Setting(0.0, function (v) { return true; }),
            bumpAmplitude: new Setting_1.Setting(1.0, function (v) { return true; }),
            camera: new Setting_1.Setting({
                position: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, function (v) { return true; }),
                target: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, function (v) { return true; }),
            }, function (v) { return true; }),
            cameraAutoAdjust: new Setting_1.Setting(false, function (v) { return true; }),
            cameraMovementDuration: new Setting_1.Setting(0, function (v) { return true; }),
            cameraOrtho: new Setting_1.Setting({
                position: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, function (v) { return true; }),
                target: new Setting_1.Setting({ x: 0, y: 0, z: 0 }, function (v) { return true; }),
            }, function (v) { return true; }),
            cameraRevertAtMouseUp: new Setting_1.Setting(false, function (v) { return true; }),
            clearAlpha: new Setting_1.Setting(1.0, function (v) { return true; }),
            clearColor: new Setting_1.Setting('#ffffff', function (v) { return true; }),
            commitParameters: new Setting_1.Setting(false, function (v) { return true; }),
            controlDamping: new Setting_1.Setting(0.1, function (v) { return true; }),
            controlNames: new Setting_1.Setting(null, function (v) { return function (v) { return true; }; }),
            controlOrder: new Setting_1.Setting(null, function (v) { return function (v) { return true; }; }),
            defaultMaterialColor: new Setting_1.Setting('#d3d3d3', function (v) { return true; }),
            disablePan: new Setting_1.Setting(false, function (v) { return true; }),
            disableZoom: new Setting_1.Setting(false, function (v) { return true; }),
            enableAutoRotate: new Setting_1.Setting(false, function (v) { return true; }),
            enableRotation: new Setting_1.Setting(true, function (v) { return true; }),
            environmentMap: new Setting_1.Setting('none', function (v) { return true; }),
            environmentMapResolution: new Setting_1.Setting('1024', function (v) { return true; }),
            fov: new Setting_1.Setting(45, function (v) { return true; }),
            lightScene: new Setting_1.Setting('default', function (v) { return true; }),
            lightScenes: new Setting_1.Setting(null, function (v) { return true; }),
            panSpeed: new Setting_1.Setting(0.5, function (v) { return true; }),
            parametersHidden: new Setting_1.Setting(null, function (v) { return function (v) { return true; }; }),
            pointSize: new Setting_1.Setting(1.0, function (v) { return true; }),
            revertAtMouseUpDuration: new Setting_1.Setting(800, function (v) { return true; }),
            rotateSpeed: new Setting_1.Setting(0.25, function (v) { return true; }),
            showEnvironmentMap: new Setting_1.Setting(false, function (v) { return true; }),
            showGrid: new Setting_1.Setting(false, function (v) { return true; }),
            showGroundPlane: new Setting_1.Setting(false, function (v) { return true; }),
            showShadows: new Setting_1.Setting(true, function (v) { return true; }),
            topView: new Setting_1.Setting(false, function (v) { return true; }),
            zoomExtentFactor: new Setting_1.Setting(1.0, function (v) { return true; }),
            zoomSpeed: new Setting_1.Setting(1.0, function (v) { return true; }),
        };
        if (settingsJSON) {
            if ((!settingsJSON.clearAlpha || !settingsJSON.clearColor) && settingsJSON.backgroundColor && typeof settingsJSON.backgroundColor === 'string') {
                settingsJSON.clearAlpha = settingsJSON.backgroundColor.substring(0, 8);
                settingsJSON.clearColor = settingsJSON.backgroundColor.substring(8);
            }
            if (settingsJSON.defaultMaterialColor && Array.isArray(settingsJSON.defaultMaterialColor)) {
                var temp = '#';
                for (var i = 0; i < settingsJSON.defaultMaterialColor.length; i++)
                    temp += Number(settingsJSON.defaultMaterialColor[i]).toString(16);
                settingsJSON.defaultMaterialColor = temp;
            }
            _this._fromJSON(settingsJSON, _this._settings);
        }
        return _this;
    }
    // #endregion Constructors (1)
    // #region Public Methods (2)
    Settings.prototype.convertFromPreviousVersion = function (oldSettings) {
        return this;
    };
    Settings.prototype.convertToPreviousVersion = function () {
        return this;
    };
    return Settings;
}(BaseSettings_1.BaseSettings));
exports.Settings = Settings;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdmVyc2lvbnMvMS4wL1NldHRpbmdzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHlEQUF3RDtBQUN4RCx5Q0FBd0M7QUFFeEMsbURBQWtEO0FBRWxEO0lBQThCLDRCQUFZO0lBS3RDLDRCQUE0QjtJQUU1QiwyQkFBMkI7SUFFM0I7OztPQUdHO0lBQ0gsa0JBQVksWUFBa0I7UUFBOUIsWUFDSSxpQkFBTyxTQWlFVjtRQWhFRyxLQUFJLENBQUMsUUFBUSxHQUFHLElBQUksaUNBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxLQUFJLENBQUMsU0FBUyxHQUFHO1lBQ2IsVUFBVSxFQUFFLElBQUksaUJBQU8sQ0FBQyxFQUFFLEVBQUUsVUFBQyxDQUFLLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO1lBQzVDLGFBQWEsRUFBRSxJQUFJLGlCQUFPLENBQUMsRUFBRSxFQUFFLFVBQUMsQ0FBSyxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQztZQUMvQyxnQkFBZ0IsRUFBRSxJQUFJLGlCQUFPLENBQUMsS0FBSyxFQUFFLFVBQUMsQ0FBSyxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQztZQUVyRCxnQkFBZ0IsRUFBRSxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFLFVBQUMsQ0FBSyxJQUFLLE9BQUEsSUFBSSxFQUFKLENBQUksQ0FBQztZQUNwRCxlQUFlLEVBQUUsSUFBSSxpQkFBTyxDQUFDLEdBQUcsRUFBRSxVQUFDLENBQUssSUFBSyxPQUFBLElBQUksRUFBSixDQUFJLENBQUM7WUFDbEQsYUFBYSxFQUFFLElBQUksaUJBQU8sQ0FBQyxHQUFHLEVBQUUsVUFBQyxDQUFLLElBQUssT0FBQSxJQUFJLEVBQUosQ0FBSSxDQUFDO1lBQ2hELE1BQU0sRUFBRSxJQUFJLGlCQUFPLENBQUM7Z0JBQ2hCLFFBQVEsRUFB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VUFBVSxHQUFHLFlBQVksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3ZFO1lBQ0QsSUFBRyxZQUFZLENBQUMsb0JBQW9CLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsRUFBRTtnQkFDdEYsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUNmLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxZQUFZLENBQUMsb0JBQW9CLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtvQkFDNUQsSUFBSSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RFLFlBQVksQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUM7YUFDNUM7WUFFRCxLQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDaEQ7O0lBQ0wsQ0FBQztJQUVELDhCQUE4QjtJQUU5Qiw2QkFBNkI7SUFFdEIsNkNBQTBCLEdBQWpDLFVBQWtDLFdBQXNCO1FBQ3BELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFTSwyQ0FBd0IsR0FBL0I7UUFDSSxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBR0wsZUFBQztBQUFELENBQUMsQUE5RkQsQ0FBOEIsMkJBQVksR0E4RnpDO0FBOUZZLDRCQUFRO0FBOEZwQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNldHRpbmdzIH0gZnJvbSBcIi4uLy4uL2ludGVyZmFjZXMvaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5nc1ZlcnNpb24gfSBmcm9tIFwiLi4vLi4vU2V0dGluZ3NWZXJzaW9uXCI7XHJcbmltcG9ydCB7IFNldHRpbmcgfSBmcm9tIFwiLi4vLi4vU2V0dGluZ1wiO1xyXG5pbXBvcnQgeyBJU2V0dGluZ3NPYmplY3QgfSBmcm9tIFwiLi9pbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7IEJhc2VTZXR0aW5ncyB9IGZyb20gXCIuLi8uLi9CYXNlU2V0dGluZ3NcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTZXR0aW5ncyBleHRlbmRzIEJhc2VTZXR0aW5ncyB7XHJcbiAgICAvLyAjcmVnaW9uIFByb3BlcnRpZXMgKDEpXHJcblxyXG4gICAgcHJvdGVjdGVkIF9zZXR0aW5nczogSVNldHRpbmdzT2JqZWN0O1xyXG5cclxuICAgIC8vICNlbmRyZWdpb24gUHJvcGVydGllcyAoMSlcclxuXHJcbiAgICAvLyAjcmVnaW9uIENvbnN0cnVjdG9ycyAoMSlcclxuXHJcbiAgICAvKipcclxuICAgICAqIFxyXG4gICAgICogQHBhcmFtIHNldHRpbmdzT2JqZWN0IGEgc2V0dGluZ3Mgb2JqZWN0IHRoYXQgaXMgYSBKU09OIHJlcHJlc2VudGF0aW9uIG9mIHRoaXMgU2V0dGluZ3NPYmplY3RcclxuICAgICAqL1xyXG4gICAgY29uc3RydWN0b3Ioc2V0dGluZ3NKU09OPzogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLl92ZXJzaW9uID0gbmV3IFNldHRpbmdzVmVyc2lvbignMS4wJyk7XHJcbiAgICAgICAgdGhpcy5fc2V0dGluZ3MgPSB7XHJcbiAgICAgICAgICAgIGJ1aWxkX2RhdGU6IG5ldyBTZXR0aW5nKCcnLCAodjphbnkpID0+IHRydWUpLFxyXG4gICAgICAgICAgICBidWlsZF92ZXJzaW9uOiBuZXcgU2V0dGluZygnJywgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgc2V0dGluZ3NfdmVyc2lvbjogbmV3IFNldHRpbmcoJzEuMCcsICh2OmFueSkgPT4gdHJ1ZSksXHJcbiAgICBcclxuICAgICAgICAgICAgYW1iaWVudE9jY2x1c2lvbjogbmV3IFNldHRpbmcodHJ1ZSwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgYXV0b1JvdGF0ZVNwZWVkOiBuZXcgU2V0dGluZygwLjAsICh2OmFueSkgPT4gdHJ1ZSksXHJcbiAgICAgICAgICAgIGJ1bXBBbXBsaXR1ZGU6IG5ldyBTZXR0aW5nKDEuMCwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgY2FtZXJhOiBuZXcgU2V0dGluZyh7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogbmV3IFNldHRpbmcoeyB4OiAwLCB5OiAwLCB6OiAwIH0sICh2OmFueSkgPT4gdHJ1ZSksXHJcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IG5ldyBTZXR0aW5nKHsgeDogMCwgeTogMCwgejogMCB9LCAodjphbnkpID0+IHRydWUpLFxyXG4gICAgICAgICAgICB9LCAodjphbnkpID0+IHRydWUpLFxyXG4gICAgICAgICAgICBjYW1lcmFBdXRvQWRqdXN0OiBuZXcgU2V0dGluZyhmYWxzZSwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgY2FtZXJhTW92ZW1lbnREdXJhdGlvbjogbmV3IFNldHRpbmcoMCwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgY2FtZXJhT3J0aG86IG5ldyBTZXR0aW5nKHtcclxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBuZXcgU2V0dGluZyh7IHg6IDAsIHk6IDAsIHo6IDAgfSwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgICAgIHRhcmdldDogbmV3IFNldHRpbmcoeyB4OiAwLCB5OiAwLCB6OiAwIH0sICh2OmFueSkgPT4gdHJ1ZSksXHJcbiAgICAgICAgICAgIH0sICh2OmFueSkgPT4gdHJ1ZSksXHJcbiAgICAgICAgICAgIGNhbWVyYVJldmVydEF0TW91c2VVcDogbmV3IFNldHRpbmcoZmFsc2UsICh2OmFueSkgPT4gdHJ1ZSksXHJcbiAgICAgICAgICAgIGNsZWFyQWxwaGE6IG5ldyBTZXR0aW5nKDEuMCwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgY2xlYXJDb2xvcjogbmV3IFNldHRpbmcoJyNmZmZmZmYnLCAodjphbnkpID0+IHRydWUpLFxyXG4gICAgICAgICAgICBjb21taXRQYXJhbWV0ZXJzOiBuZXcgU2V0dGluZyhmYWxzZSwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgY29udHJvbERhbXBpbmc6IG5ldyBTZXR0aW5nKDAuMSwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgY29udHJvbE5hbWVzOiBuZXcgU2V0dGluZyhudWxsLCAodikgPT4gKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgY29udHJvbE9yZGVyOiBuZXcgU2V0dGluZyhudWxsLCAodikgPT4gKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgZGVmYXVsdE1hdGVyaWFsQ29sb3I6IG5ldyBTZXR0aW5nKCcjZDNkM2QzJywgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgZGlzYWJsZVBhbjogbmV3IFNldHRpbmcoZmFsc2UsICh2OmFueSkgPT4gdHJ1ZSksXHJcbiAgICAgICAgICAgIGRpc2FibGVab29tOiBuZXcgU2V0dGluZyhmYWxzZSwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgZW5hYmxlQXV0b1JvdGF0ZTogbmV3IFNldHRpbmcoZmFsc2UsICh2OmFueSkgPT4gdHJ1ZSksXHJcbiAgICAgICAgICAgIGVuYWJsZVJvdGF0aW9uOiBuZXcgU2V0dGluZyh0cnVlLCAodjphbnkpID0+IHRydWUpLFxyXG4gICAgICAgICAgICBlbnZpcm9ubWVudE1hcDogbmV3IFNldHRpbmcoJ25vbmUnLCAodjphbnkpID0+IHRydWUpLFxyXG4gICAgICAgICAgICBlbnZpcm9ubWVudE1hcFJlc29sdXRpb246IG5ldyBTZXR0aW5nKCcxMDI0JywgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgZm92OiBuZXcgU2V0dGluZyg0NSwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgbGlnaHRTY2VuZTogbmV3IFNldHRpbmcoJ2RlZmF1bHQnLCAodjphbnkpID0+IHRydWUpLFxyXG4gICAgICAgICAgICBsaWdodFNjZW5lczogbmV3IFNldHRpbmcobnVsbCwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgcGFuU3BlZWQ6IG5ldyBTZXR0aW5nKDAuNSwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgcGFyYW1ldGVyc0hpZGRlbjogbmV3IFNldHRpbmcobnVsbCwgKHYpID0+ICh2OmFueSkgPT4gdHJ1ZSksXHJcbiAgICAgICAgICAgIHBvaW50U2l6ZTogbmV3IFNldHRpbmcoMS4wLCAodjphbnkpID0+IHRydWUpLFxyXG4gICAgICAgICAgICByZXZlcnRBdE1vdXNlVXBEdXJhdGlvbjogbmV3IFNldHRpbmcoODAwLCAodjphbnkpID0+IHRydWUpLFxyXG4gICAgICAgICAgICByb3RhdGVTcGVlZDogbmV3IFNldHRpbmcoMC4yNSwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgc2hvd0Vudmlyb25tZW50TWFwOiBuZXcgU2V0dGluZyhmYWxzZSwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgc2hvd0dyaWQ6IG5ldyBTZXR0aW5nKGZhbHNlLCAodjphbnkpID0+IHRydWUpLFxyXG4gICAgICAgICAgICBzaG93R3JvdW5kUGxhbmU6IG5ldyBTZXR0aW5nKGZhbHNlLCAodjphbnkpID0+IHRydWUpLFxyXG4gICAgICAgICAgICBzaG93U2hhZG93czogbmV3IFNldHRpbmcodHJ1ZSwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgdG9wVmlldzogbmV3IFNldHRpbmcoZmFsc2UsICh2OmFueSkgPT4gdHJ1ZSksXHJcbiAgICAgICAgICAgIHpvb21FeHRlbnRGYWN0b3I6IG5ldyBTZXR0aW5nKDEuMCwgKHY6YW55KSA9PiB0cnVlKSxcclxuICAgICAgICAgICAgem9vbVNwZWVkOiBuZXcgU2V0dGluZygxLjAsICh2OmFueSkgPT4gdHJ1ZSksXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgaWYoc2V0dGluZ3NKU09OKSB7XHJcbiAgICAgICAgICAgIGlmKCghc2V0dGluZ3NKU09OLmNsZWFyQWxwaGEgfHwgIXNldHRpbmdzSlNPTi5jbGVhckNvbG9yKSAmJiBzZXR0aW5nc0pTT04uYmFja2dyb3VuZENvbG9yICYmIHR5cGVvZiBzZXR0aW5nc0pTT04uYmFja2dyb3VuZENvbG9yID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3NKU09OLmNsZWFyQWxwaGEgPSBzZXR0aW5nc0pTT04uYmFja2dyb3VuZENvbG9yLnN1YnN0cmluZygwLCA4KTtcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzSlNPTi5jbGVhckNvbG9yID0gc2V0dGluZ3NKU09OLmJhY2tncm91bmRDb2xvci5zdWJzdHJpbmcoOCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoc2V0dGluZ3NKU09OLmRlZmF1bHRNYXRlcmlhbENvbG9yICYmIEFycmF5LmlzQXJyYXkoc2V0dGluZ3NKU09OLmRlZmF1bHRNYXRlcmlhbENvbG9yKSkge1xyXG4gICAgICAgICAgICAgICAgbGV0IHRlbXAgPSAnIyc7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgc2V0dGluZ3NKU09OLmRlZmF1bHRNYXRlcmlhbENvbG9yLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICAgICAgICAgIHRlbXAgKz0gTnVtYmVyKHNldHRpbmdzSlNPTi5kZWZhdWx0TWF0ZXJpYWxDb2xvcltpXSkudG9TdHJpbmcoMTYpO1xyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3NKU09OLmRlZmF1bHRNYXRlcmlhbENvbG9yID0gdGVtcDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5fZnJvbUpTT04oc2V0dGluZ3NKU09OLCB0aGlzLl9zZXR0aW5ncyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vICNlbmRyZWdpb24gQ29uc3RydWN0b3JzICgxKVxyXG5cclxuICAgIC8vICNyZWdpb24gUHVibGljIE1ldGhvZHMgKDIpXHJcblxyXG4gICAgcHVibGljIGNvbnZlcnRGcm9tUHJldmlvdXNWZXJzaW9uKG9sZFNldHRpbmdzOiBJU2V0dGluZ3MpOiBTZXR0aW5ncyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNvbnZlcnRUb1ByZXZpb3VzVmVyc2lvbigpOiBTZXR0aW5ncyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gI2VuZHJlZ2lvbiBQdWJsaWMgTWV0aG9kcyAoMilcclxufTtcclxuIl19