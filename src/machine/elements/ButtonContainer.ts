import { Graphics, TextStyle, Text } from "pixi.js";

export default class ButtonContainer extends Graphics {
    public style: TextStyle = new TextStyle({
        fontFamily: "Arial",
        fontSize: 36,
        fontWeight: "bold",
    });

    public isRunning = false;

    constructor(x = 0, y = 0, width = 150, height = 50) {
        super();
        this.beginFill(16747644, 1);
        this.drawRect(x, y, width, height);
        this.interactive = true;
        this.buttonMode = true;
    }

    public addButton(text: string, x = 0, y = 0): void {
        const playText = new Text(text, this.style);
        playText.x = x;
        playText.y = y;
        this.addChild(playText);
    }

    public setStyle(fontFamily: string, fontSize: number, fontWeight: string): void {
        this.style = new TextStyle({
            fontFamily,
            fontSize,
            fontWeight,
        });
    }

    public onClick(callable: () => void): void {
        this.addListener("pointerdown", callable);
    }

    public reelsComplete(): void {
        this.interactive = true;
        this.buttonMode = true;
        this.visible = true;
        this.isRunning = false;
    }
}
