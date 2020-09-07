import { Sprite, Texture } from "pixi.js";

export default class Image extends Sprite {
    public static readonly SIZE = 50;

    constructor(texture: Texture) {
        super(texture);
        this.height = Image.SIZE;
        this.width = Image.SIZE;
    }

    public setImageX(value: number): void {
        this.x = value;
    }

    public setImageY(value: number): void {
        this.y = value;
    }

    public getImageWidth(): number {
        return this.width;
    }

    public getImageHeight(): number {
        return this.height;
    }

    public setImageMinScaleXY(x: number, y: number): void {
        this.scale.x = this.scale.x = Math.min(x, y);
    }
}
