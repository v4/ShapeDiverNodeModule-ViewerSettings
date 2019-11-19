"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SettingsVersion = /** @class */ (function () {
    // #endregion Properties (1)
    // #region Constructors (1)
    function SettingsVersion(version) {
        if (version === void 0) { version = '1.0'; }
        // #region Properties (1)
        this._versionLevels = [];
        var splitArray = version.split('.');
        for (var n in splitArray)
            this._versionLevels.push(+splitArray[n]);
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
exports.SettingsVersion = SettingsVersion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3NWZXJzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NldHRpbmdzVmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBO0lBS0ksNEJBQTRCO0lBRTVCLDJCQUEyQjtJQUUzQix5QkFBWSxPQUF1QjtRQUF2Qix3QkFBQSxFQUFBLGVBQXVCO1FBUm5DLHlCQUF5QjtRQUVqQixtQkFBYyxHQUFhLEVBQUUsQ0FBQztRQU9sQyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3BDLEtBQUssSUFBSSxDQUFDLElBQUksVUFBVTtZQUNwQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7SUFNRCxzQkFBVywwQ0FBYTtRQUp4Qiw4QkFBOEI7UUFFOUIsK0JBQStCO2FBRS9CO1lBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDO1FBQy9CLENBQUM7OztPQUFBO0lBRUQsa0NBQWtDO0lBRWxDLDZCQUE2QjtJQUV0QixpQ0FBTyxHQUFkLFVBQWUsQ0FBbUI7UUFDOUIsSUFBRyxDQUFDLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU07WUFBRSxPQUFPLEtBQUssQ0FBQztRQUV2RSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFO1lBQzlDLElBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsT0FBTyxLQUFLLENBQUM7UUFFckIsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVNLHFDQUFXLEdBQWxCLFVBQW1CLENBQW1CO1FBQ2xDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNoRCxJQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDNUMsT0FBTyxLQUFLLENBQUM7YUFDaEI7aUJBQU0sSUFBRyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ25ELE9BQU8sSUFBSSxDQUFDO2FBQ2Y7U0FDSjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxrQ0FBUSxHQUFmO1FBQ0ksT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBR0wsc0JBQUM7QUFBRCxDQUFDLEFBckRELElBcURDO0FBckRZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSVNldHRpbmdzVmVyc2lvbiB9IGZyb20gXCIuL2ludGVyZmFjZXMvaW50ZXJmYWNlc1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFNldHRpbmdzVmVyc2lvbiBpbXBsZW1lbnRzIElTZXR0aW5nc1ZlcnNpb24ge1xyXG4gICAgLy8gI3JlZ2lvbiBQcm9wZXJ0aWVzICgxKVxyXG5cclxuICAgIHByaXZhdGUgX3ZlcnNpb25MZXZlbHM6IG51bWJlcltdID0gW107XHJcblxyXG4gICAgLy8gI2VuZHJlZ2lvbiBQcm9wZXJ0aWVzICgxKVxyXG5cclxuICAgIC8vICNyZWdpb24gQ29uc3RydWN0b3JzICgxKVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHZlcnNpb246IHN0cmluZyA9ICcxLjAnKSB7XHJcbiAgICAgICAgbGV0IHNwbGl0QXJyYXkgPSB2ZXJzaW9uLnNwbGl0KCcuJyk7XHJcbiAgICAgICAgZm9yIChsZXQgbiBpbiBzcGxpdEFycmF5KSBcclxuICAgICAgICAgICAgdGhpcy5fdmVyc2lvbkxldmVscy5wdXNoKCtzcGxpdEFycmF5W25dKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAjZW5kcmVnaW9uIENvbnN0cnVjdG9ycyAoMSlcclxuXHJcbiAgICAvLyAjcmVnaW9uIFB1YmxpYyBBY2Nlc3NvcnMgKDEpXHJcblxyXG4gICAgcHVibGljIGdldCB2ZXJzaW9uTGV2ZWxzKCk6IG51bWJlcltdIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fdmVyc2lvbkxldmVscztcclxuICAgIH1cclxuXHJcbiAgICAvLyAjZW5kcmVnaW9uIFB1YmxpYyBBY2Nlc3NvcnMgKDEpXHJcblxyXG4gICAgLy8gI3JlZ2lvbiBQdWJsaWMgTWV0aG9kcyAoMylcclxuXHJcbiAgICBwdWJsaWMgZXF1YWxUbyh2OiBJU2V0dGluZ3NWZXJzaW9uKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYodi52ZXJzaW9uTGV2ZWxzLmxlbmd0aCAhPT0gdGhpcy5fdmVyc2lvbkxldmVscy5sZW5ndGgpIHJldHVybiBmYWxzZTtcclxuXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMuX3ZlcnNpb25MZXZlbHMubGVuZ3RoOyBpKyspIFxyXG4gICAgICAgICAgICBpZih2LnZlcnNpb25MZXZlbHNbaV0gIT09IHRoaXMuX3ZlcnNpb25MZXZlbHNbaV0pXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzTG93ZXJUaGFuKHY6IElTZXR0aW5nc1ZlcnNpb24pOiBib29sZWFuIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy5fdmVyc2lvbkxldmVscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZih0aGlzLl92ZXJzaW9uTGV2ZWxzW2ldID4gdi52ZXJzaW9uTGV2ZWxzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZih0aGlzLl92ZXJzaW9uTGV2ZWxzW2ldIDwgdi52ZXJzaW9uTGV2ZWxzW2ldKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTsgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHRvU3RyaW5nKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl92ZXJzaW9uTGV2ZWxzLmpvaW4oJy4nKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAjZW5kcmVnaW9uIFB1YmxpYyBNZXRob2RzICgzKVxyXG59Il19