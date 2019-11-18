import { ISettingsVersion } from "./interfaces/interfaces";

export class SettingsVersion implements ISettingsVersion {
    // #region Properties (1)

    private _versionLevels: number[] = [];

    // #endregion Properties (1)

    // #region Constructors (1)

    constructor(version: string = '1.0') {
        let splitArray = version.split('.');
        for (let n in splitArray) 
            this._versionLevels.push(+splitArray[n]);
    }

    // #endregion Constructors (1)

    // #region Public Accessors (1)

    public get versionLevels(): number[] {
        return this._versionLevels;
    }

    // #endregion Public Accessors (1)

    // #region Public Methods (3)

    public equalTo(v: ISettingsVersion): boolean {
        if(v.versionLevels.length !== this._versionLevels.length) return false;

        for(let i = 0; i < this._versionLevels.length; i++) 
            if(v.versionLevels[i] !== this._versionLevels[i])
                return false;
        
        return true;
    }

    public isLowerThan(v: ISettingsVersion): boolean {
        for(let i = 0; i < this._versionLevels.length; i++) {
            if(this._versionLevels[i] > v.versionLevels[i]) {
                return false;
            } else if(this._versionLevels[i] < v.versionLevels[i]) {
                return true;            
            }
        }
        return false;
    }

    public toString() {
        return this._versionLevels.join('.');
    }

    // #endregion Public Methods (3)
}