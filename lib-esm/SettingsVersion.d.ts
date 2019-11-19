import { ISettingsVersion } from "./interfaces/interfaces";
export declare class SettingsVersion implements ISettingsVersion {
    private _versionLevels;
    constructor(version?: string);
    get versionLevels(): number[];
    equalTo(v: ISettingsVersion): boolean;
    isLowerThan(v: ISettingsVersion): boolean;
    toString(): string;
}
