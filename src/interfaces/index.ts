import Reel from "../machine/elements/Reel";

export interface Tween {
    reel: Reel;
    propertyBeginValue: number;
    target: number;
    time: number;
    backOut: (t: number) => number;
    oncomplete: (() => void) | null;
    start: number;
}

export interface Config {
    backgroundColor: number;
    width: number;
    height: number;
}
