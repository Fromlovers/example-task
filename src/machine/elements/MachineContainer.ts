import { Container } from "pixi.js";

export default class MachineContainer extends Container {
    constructor() {
        super();
    }

    public setMachineContainerX(x: number): void {
        this.x = x;
    }
    public setMachineContainerY(y: number): void {
        this.y = y;
    }
}
