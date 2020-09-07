import { Container, Filter } from "pixi.js";

export default class ColumnContainer extends Container {
    constructor(width = 100, height = 300) {
        super();
        this.width = width;
        this.height = height;
    }

    public setFilters(filter: Filter[]): void {
        this.filters = filter;
    }

    public setColumnContainerX(x: number): void {
        this.x = x;
    }

    public setColumnContainerY(y: number): void {
        this.y = y;
    }
}
