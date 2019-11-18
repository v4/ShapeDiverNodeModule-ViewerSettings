import { ISetting } from "./interfaces/interfaces";
export declare class Setting<T> implements ISetting<T> {
    private _value;
    private _type;
    private _desc?;
    private _persistent;
    constructor(_value: T, _type: string | Function, _desc?: string | undefined, _persistent?: boolean);
    get desc(): string | undefined;
    get persistent(): boolean;
    get type(): string | Function;
    get value(): T;
    set value(v: T);
}
