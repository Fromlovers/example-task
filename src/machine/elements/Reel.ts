import { Container, filters, Texture } from "pixi.js";
import Image from "./Image";

export default class Reel {
    protected container: Container;
    protected position: number;
    protected previousPosition: number;
    protected blur: filters.BlurFilter;

    public images: Image[];

    public static readonly WIDTH = 60;

    constructor(
        container: Container,
        images: Image[],
        position: number,
        previousPosition: number,
        blur: filters.BlurFilter
    ) {
        this.container = container;
        this.images = images;
        this.position = position;
        this.previousPosition = previousPosition;
        this.blur = blur;
    }

    public addRandomElementsToColumnContainer(textures: Texture[], countElements: number): void {
        for (let j = 0; j < countElements; j++) {
            const image = new Image(textures[Math.floor(Math.random() * textures.length)]);

            image.setImageY(Image.SIZE * j);
            image.setImageMinScaleXY(Image.SIZE / image.width, Image.SIZE / image.height);

            this.addImage(image);
        }

        this.container.addChild(...this.images);
    }

    public addImage(image: Image): void {
        this.images.push(image);
    }

    public setBlurX(value: number): void {
        this.blur.blurX = value;
    }

    public setBlurY(value: number): void {
        this.blur.blurY = value;
    }

    public getBlurX(): number {
        return this.blur.blurX;
    }

    public getBlurY(): number {
        return this.blur.blurY;
    }

    public getContainer(): Container {
        return this.container;
    }

    public setContainer(container: Container): void {
        this.container = container;
    }

    public getImages(): Image[] {
        return this.images;
    }

    public setImages(images: Image[]): void {
        this.images = images;
    }

    public getPosition(): number {
        return this.position;
    }

    public setPosition(position: number): void {
        this.position = position;
    }

    public getPreviousPosition(): number {
        return this.previousPosition;
    }

    public setPreviousPosition(previousPosition: number): void {
        this.previousPosition = previousPosition;
    }

    public getBlur(): filters.BlurFilter {
        return this.blur;
    }

    public setBlur(blur: filters.BlurFilter): void {
        this.blur = blur;
    }
}
