import "./assets/styles/style.css";
import App from "./machine/core/App";
import CustomLoader from "./machine/core/CustomLoader";
import MachineContainer from "./machine/elements/MachineContainer";
import ColumnContainer from "./machine/elements/ColumnContainer";
import Reel from "./machine/elements/Reel";
import Image from "./machine/elements/Image";
import ButtonContainer from "./machine/elements/ButtonContainer";
import { filters } from "pixi.js";

document.addEventListener("DOMContentLoaded", () => {
    const app = new App();
    const viewApp = app.getView();

    addChildToBody(viewApp);

    const loader = new CustomLoader(app.getLoader());
    const pathsImages = loader.loadStatic();
    const textures = loader.createTextures(pathsImages);

    const machineContainer = new MachineContainer();
    machineContainer.setMachineContainerX(0);
    machineContainer.setMachineContainerY(0);
    const reels: Reel[] = [];
    textures.forEach((el, index) => {
        const column = new ColumnContainer();

        column.setColumnContainerX(Image.SIZE * index);
        machineContainer.addChild(column);

        const reel = new Reel(column, [], 0, 0, new filters.BlurFilter());
        reel.setBlurX(0);
        reel.setBlurY(0);

        column.setFilters([reel.getBlur()]);
        reel.addRandomElementsToColumnContainer(textures, 3);

        reels.push(reel);
    });

    app.setReels(reels);

    const buttonContainer = new ButtonContainer(0, machineContainer.height, machineContainer.width + 49, 70);
    buttonContainer.addButton("GO", (machineContainer.width - 10) / 2, machineContainer.height + 10);
    machineContainer.addChild(buttonContainer);

    app.createFPSIndicator(buttonContainer);

    app.stage.addChild(machineContainer);

    buttonContainer.onClick(() => {
        app.startSpin(buttonContainer, reels);
    });
    app.setListenersReels(textures);
});

function addChildToBody(view: HTMLCanvasElement): void {
    document.body.appendChild(view);
}
