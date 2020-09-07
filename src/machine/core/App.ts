import { Application, Loader, Texture, Text } from "pixi.js";
import { Config, Tween } from "../../interfaces/index";
import Reel from "../elements/Reel";
import ButtonContainer from "../elements/ButtonContainer";
import { backOut, lerp } from "../../helpers";
import Image from "../elements/Image";

export default class App extends Application {
    private static readonly WIDTH = 800;
    private static readonly HEIGHT = 600;
    private static readonly BACKGROUND_COLOR = 0x1099bb;
    private static readonly CONFIG: Config = {
        backgroundColor: App.BACKGROUND_COLOR,
        width: App.WIDTH,
        height: App.HEIGHT,
    };

    protected tweens: Tween[] = [];
    protected isRunning = false;
    public reels: Reel[] = [];

    constructor(config: Config = App.CONFIG) {
        super(config);
        this.resizeApp();
        this.setEventResizeApp();
    }

    startSpin(button: ButtonContainer, reels: Reel[]): void {
        if (this.isRunning) {
            return;
        }

        button.interactive = false;
        button.buttonMode = false;
        button.isRunning = true;

        for (let i = 0; i < reels.length; i++) {
            const r = reels[i];
            const extra = Math.floor(Math.random() * 3);
            const target = r.getPosition() + 10 + i * 5 + extra;
            const time = 2500 + i * 600 + extra * 600;
            const tween: Tween = {
                reel: r,
                propertyBeginValue: r.getPosition(),
                target,
                time,
                backOut: backOut(0.5),
                oncomplete: i === reels.length - 1 ? button.reelsComplete.bind(button) : null,
                start: Date.now(),
            };
            this.tweens.push(tween);
        }
    }

    public getView(): HTMLCanvasElement {
        return this.view;
    }

    public getLoader(): Loader {
        return this.loader;
    }

    private resizeApp(width = App.WIDTH, height = App.HEIGHT) {
        this.renderer.resize(window.innerWidth, window.innerHeight);
        this.stage.scale.x = window.innerWidth / width;
        this.stage.scale.y = window.innerHeight / height;
    }

    private setEventResizeApp() {
        window.addEventListener("resize", () => {
            if (!this) {
                return;
            }

            this.resizeApp();
        });
    }

    public getTweens(): Tween[] {
        return this.tweens;
    }

    public setTweens(tween: Tween[]): void {
        this.tweens = tween;
    }

    public getReels(): Reel[] | undefined {
        return this.reels;
    }

    public setReels(reels: Reel[]): void {
        this.reels = reels;
    }

    public setListenersReels(textures: Texture[]): void {
        // Listen for animate update.
        this.ticker.add(() => {
            // Update the slots.
            for (let i = 0; i < this.reels.length; i++) {
                const r = this.reels[i];
                // Update blur filter y amount based on speed.
                // This would be better if calculated with time in mind also. Now blur depends on frame rate.
                r.setBlurY((r.getPosition() - r.getPreviousPosition()) * 8);
                r.setPreviousPosition(r.getPosition());
                // Update symbol positions on reel.
                const images = r.getImages();

                for (let i = 0; i < images.length; i++) {
                    const s = images[i];
                    const prevy = s.y;

                    s.y = ((r.getPosition() + i) % images.length) * Image.SIZE;

                    if (s.y < 0 && prevy > Image.SIZE) {
                        // Detect going over and swap a texture.
                        // This should in proper product be determined from some logical reel.
                        s.texture = textures[Math.floor(Math.random() * textures.length)];
                        s.setImageMinScaleXY(Image.SIZE / s.texture.width, Image.SIZE / s.texture.height);
                    }
                }
            }
        });

        this.ticker.add(() => {
            const now = Date.now();
            const remove = [];

            for (let i = 0; i < this.tweens.length; i++) {
                const t: Tween = this.tweens[i];
                const phase = Math.min(1, (now - t.start) / t.time);

                t.reel.setPosition(lerp(t.propertyBeginValue, t.target, t.backOut(phase)));

                if (phase === 1) {
                    t.reel.setPosition(t.target);
                    if (t.oncomplete) {
                        t.oncomplete();
                    }

                    remove.push(t);
                }
            }

            for (let i = 0; i < remove.length; i++) {
                this.tweens.splice(this.tweens.indexOf(remove[i]), 1);
            }
        });
    }

    public createFPSIndicator(container: ButtonContainer): void {
        const fps = new Text("");
        container.addChild(fps);
        this.ticker.add(() => {
            fps.text = `FPS ${this.ticker.FPS.toFixed(1)}`;
            fps.x = 300;
        });
    }
}
