"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SettingsVersion_1 = require("./SettingsVersion");
var Settings_1 = require("./versions/1.0/Settings");
var Settings_2 = require("./versions/2.0/Settings");
var SettingsConversion = /** @class */ (function () {
    // #endregion Properties (2)
    // #region Constructors (1)
    function SettingsConversion() {
        // #region Properties (2)
        this._settingsVersions = [];
        this._versions = {
            '1.0': Settings_1.Settings,
            '2.0': Settings_2.Settings
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
        var currentVersion = settings.version, requiredVersion = new SettingsVersion_1.SettingsVersion(version);
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
            return new Settings_1.Settings(settingsJSON);
        var version = new SettingsVersion_1.SettingsVersion(settingsJSON.settings_version);
        return new this._versions[version.toString()](settingsJSON);
    };
    // #endregion Public Methods (2)
    // #region Private Methods (1)
    SettingsConversion.prototype._findVersionIndex = function (version) {
        var v = new SettingsVersion_1.SettingsVersion(version.toString());
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
exports.SettingsConversion = SettingsConversion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3NDb252ZXJzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1NldHRpbmdzQ29udmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUFvRDtBQUVwRCxvREFBbUU7QUFDbkUsb0RBQW1FO0FBRW5FO0lBU0ksNEJBQTRCO0lBRTVCLDJCQUEyQjtJQUUzQjtRQVpBLHlCQUF5QjtRQUVqQixzQkFBaUIsR0FBZ0IsRUFBRSxDQUFDO1FBQ3BDLGNBQVMsR0FBNkI7WUFDMUMsS0FBSyxFQUFFLG1CQUFZO1lBQ25CLEtBQUssRUFBRSxtQkFBWTtTQUN0QixDQUFBO1FBT0csS0FBYSxVQUEyQixFQUEzQixLQUFBLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUEzQixjQUEyQixFQUEzQixJQUEyQjtZQUFwQyxJQUFJLENBQUMsU0FBQTtZQUNMLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUFBO0lBQzdELENBQUM7SUFFRCw4QkFBOEI7SUFFOUIsNkJBQTZCO0lBRXRCLG9DQUFPLEdBQWQsVUFBZSxZQUFpQixFQUFFLE9BQWU7UUFDN0MsSUFBSSxRQUFRLEdBQWMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRWxFLElBQUksY0FBYyxHQUFHLFFBQVEsQ0FBQyxPQUFPLEVBQ2pDLGVBQWUsR0FBRyxJQUFJLGlDQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDbkQsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQzFELElBQUksYUFBYSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUU1RCxJQUFHLFlBQVksS0FBSyxDQUFDLENBQUMsSUFBSSxhQUFhLEtBQUssQ0FBQyxDQUFDO1lBQUUsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7UUFFekUsSUFBSSxpQkFBaUIsR0FBYyxRQUFRLENBQUM7UUFDNUMsSUFBSSxZQUFZLEdBQUcsYUFBYSxFQUFFO1lBQzlCLE9BQU0sWUFBWSxHQUFHLGFBQWEsRUFBRTtnQkFDaEMsWUFBWSxJQUFFLENBQUMsQ0FBQztnQkFDaEIsaUJBQWlCLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxDQUFDLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzFJO1NBQ0o7YUFBTSxJQUFJLFlBQVksR0FBRyxhQUFhLEVBQUU7WUFDckMsT0FBTyxZQUFZLEdBQUcsYUFBYSxFQUFFO2dCQUNqQyxZQUFZLElBQUUsQ0FBQyxDQUFDO2dCQUNoQixpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2FBQ3BFO1NBQ0o7UUFDRCxPQUFPLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RDLENBQUM7SUFFTSxpREFBb0IsR0FBM0IsVUFBNEIsWUFBaUI7UUFDekMsSUFBRyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0I7WUFBRSxPQUFPLElBQUksbUJBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUV6RSxJQUFJLE9BQU8sR0FBRyxJQUFJLGlDQUFlLENBQUMsWUFBWSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakUsT0FBTyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDaEUsQ0FBQztJQUVELGdDQUFnQztJQUVoQyw4QkFBOEI7SUFFdEIsOENBQWlCLEdBQXpCLFVBQTBCLE9BQXlCO1FBQy9DLElBQUksQ0FBQyxHQUFHLElBQUksaUNBQWUsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNoRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUU7WUFDbEQsSUFBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLE9BQU8sQ0FBQyxDQUFDO1FBRWpCLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRTtZQUNsRCxJQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDM0MsT0FBTyxDQUFDLENBQUM7UUFFakIsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNkLENBQUM7SUFHTCx5QkFBQztBQUFELENBQUMsQUF6RUQsSUF5RUM7QUF6RVksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2V0dGluZ3NWZXJzaW9uIH0gZnJvbSBcIi4vU2V0dGluZ3NWZXJzaW9uXCI7XHJcbmltcG9ydCB7IElTZXR0aW5ncywgSVNldHRpbmdzVmVyc2lvbiwgSVNldHRpbmdzRGljdGlvbmFyeSB9IGZyb20gXCIuL2ludGVyZmFjZXMvaW50ZXJmYWNlc1wiO1xyXG5pbXBvcnQgeyBTZXR0aW5ncyBhcyBTZXR0aW5nc18xXzAgfSBmcm9tIFwiLi92ZXJzaW9ucy8xLjAvU2V0dGluZ3NcIjtcclxuaW1wb3J0IHsgU2V0dGluZ3MgYXMgU2V0dGluZ3NfMl8wIH0gZnJvbSBcIi4vdmVyc2lvbnMvMi4wL1NldHRpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU2V0dGluZ3NDb252ZXJzaW9uIHtcclxuICAgIC8vICNyZWdpb24gUHJvcGVydGllcyAoMilcclxuXHJcbiAgICBwcml2YXRlIF9zZXR0aW5nc1ZlcnNpb25zOiBJU2V0dGluZ3NbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfdmVyc2lvbnM6IElTZXR0aW5nc0RpY3Rpb25hcnk8YW55PiA9IHtcclxuICAgICAgICAnMS4wJzogU2V0dGluZ3NfMV8wLFxyXG4gICAgICAgICcyLjAnOiBTZXR0aW5nc18yXzBcclxuICAgIH1cclxuXHJcbiAgICAvLyAjZW5kcmVnaW9uIFByb3BlcnRpZXMgKDIpXHJcblxyXG4gICAgLy8gI3JlZ2lvbiBDb25zdHJ1Y3RvcnMgKDEpXHJcblxyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgZm9yKGxldCBrIG9mIE9iamVjdC5rZXlzKHRoaXMuX3ZlcnNpb25zKSlcclxuICAgICAgICAgICAgdGhpcy5fc2V0dGluZ3NWZXJzaW9ucy5wdXNoKG5ldyB0aGlzLl92ZXJzaW9uc1trXSgpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyAjZW5kcmVnaW9uIENvbnN0cnVjdG9ycyAoMSlcclxuXHJcbiAgICAvLyAjcmVnaW9uIFB1YmxpYyBNZXRob2RzICgyKVxyXG5cclxuICAgIHB1YmxpYyBjb252ZXJ0KHNldHRpbmdzSlNPTjogYW55LCB2ZXJzaW9uOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCBzZXR0aW5nczogSVNldHRpbmdzID0gdGhpcy5jcmVhdGVTZXR0aW5nc09iamVjdChzZXR0aW5nc0pTT04pO1xyXG5cclxuICAgICAgICBsZXQgY3VycmVudFZlcnNpb24gPSBzZXR0aW5ncy52ZXJzaW9uLFxyXG4gICAgICAgICAgICByZXF1aXJlZFZlcnNpb24gPSBuZXcgU2V0dGluZ3NWZXJzaW9uKHZlcnNpb24pO1xyXG4gICAgICAgIGxldCBpbmRleEN1cnJlbnQgPSB0aGlzLl9maW5kVmVyc2lvbkluZGV4KGN1cnJlbnRWZXJzaW9uKTtcclxuICAgICAgICBsZXQgaW5kZXhSZXF1aXJlZCA9IHRoaXMuX2ZpbmRWZXJzaW9uSW5kZXgocmVxdWlyZWRWZXJzaW9uKTtcclxuICAgIFxyXG4gICAgICAgIGlmKGluZGV4Q3VycmVudCA9PT0gLTEgfHwgaW5kZXhSZXF1aXJlZCA9PT0gLTEpIHJldHVybiBzZXR0aW5ncy50b0pTT04oKTtcclxuXHJcbiAgICAgICAgbGV0IGNvbnZlcnRlZFNldHRpbmdzOiBJU2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgICAgICBpZiAoaW5kZXhDdXJyZW50IDwgaW5kZXhSZXF1aXJlZCkge1xyXG4gICAgICAgICAgICB3aGlsZShpbmRleEN1cnJlbnQgPCBpbmRleFJlcXVpcmVkKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleEN1cnJlbnQrPTE7XHJcbiAgICAgICAgICAgICAgICBjb252ZXJ0ZWRTZXR0aW5ncyA9IG5ldyB0aGlzLl92ZXJzaW9uc1t0aGlzLl9zZXR0aW5nc1ZlcnNpb25zW2luZGV4Q3VycmVudF0udmVyc2lvbi50b1N0cmluZygpXSgpLmNvbnZlcnRGcm9tUHJldmlvdXNWZXJzaW9uKHNldHRpbmdzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSBpZiAoaW5kZXhDdXJyZW50ID4gaW5kZXhSZXF1aXJlZCkge1xyXG4gICAgICAgICAgICB3aGlsZSAoaW5kZXhDdXJyZW50ID4gaW5kZXhSZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXhDdXJyZW50LT0xO1xyXG4gICAgICAgICAgICAgICAgY29udmVydGVkU2V0dGluZ3MgPSBjb252ZXJ0ZWRTZXR0aW5ncy5jb252ZXJ0VG9QcmV2aW91c1ZlcnNpb24oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29udmVydGVkU2V0dGluZ3MudG9KU09OKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGNyZWF0ZVNldHRpbmdzT2JqZWN0KHNldHRpbmdzSlNPTjogYW55KTogSVNldHRpbmdzIHtcclxuICAgICAgICBpZighc2V0dGluZ3NKU09OLnNldHRpbmdzX3ZlcnNpb24pIHJldHVybiBuZXcgU2V0dGluZ3NfMV8wKHNldHRpbmdzSlNPTik7XHJcbiAgICBcclxuICAgICAgICBsZXQgdmVyc2lvbiA9IG5ldyBTZXR0aW5nc1ZlcnNpb24oc2V0dGluZ3NKU09OLnNldHRpbmdzX3ZlcnNpb24pO1xyXG4gICAgICAgIHJldHVybiBuZXcgdGhpcy5fdmVyc2lvbnNbdmVyc2lvbi50b1N0cmluZygpXShzZXR0aW5nc0pTT04pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICNlbmRyZWdpb24gUHVibGljIE1ldGhvZHMgKDIpXHJcblxyXG4gICAgLy8gI3JlZ2lvbiBQcml2YXRlIE1ldGhvZHMgKDEpXHJcblxyXG4gICAgcHJpdmF0ZSBfZmluZFZlcnNpb25JbmRleCh2ZXJzaW9uOiBJU2V0dGluZ3NWZXJzaW9uKTogbnVtYmVyIHtcclxuICAgICAgICBsZXQgdiA9IG5ldyBTZXR0aW5nc1ZlcnNpb24odmVyc2lvbi50b1N0cmluZygpKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NldHRpbmdzVmVyc2lvbnMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NldHRpbmdzVmVyc2lvbnNbaV0udmVyc2lvbi5lcXVhbFRvKHYpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcblxyXG4gICAgICAgIHYudmVyc2lvbkxldmVsc1t2LnZlcnNpb25MZXZlbHMubGVuZ3RoLTFdID0gMDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuX3NldHRpbmdzVmVyc2lvbnMubGVuZ3RoOyBpKyspXHJcbiAgICAgICAgICAgIGlmKHRoaXMuX3NldHRpbmdzVmVyc2lvbnNbaV0udmVyc2lvbi5lcXVhbFRvKHYpKVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG5cclxuICAgIC8vICNlbmRyZWdpb24gUHJpdmF0ZSBNZXRob2RzICgxKVxyXG59Il19