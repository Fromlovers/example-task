import { Texture, Loader } from "pixi.js";

export default class CustomLoader {
    public loader: Loader;

    constructor(loader: Loader) {
        this.loader = loader;
    }

    public static reinitializeLoader(baseUrl: string, concurrency: number): CustomLoader {
        const loader = new Loader(baseUrl, concurrency);

        return new this(loader);
    }

    public loadStatic(listNamesImages?: string[]): Array<string> {
        if (listNamesImages) {
            return listNamesImages;
        }

        listNamesImages = [];

        for (let i = 1; i <= 5; i++) {
            this.loader.add(`./src/assets/images/${i}.png`, `./src/assets/images/${i}.png`);
            listNamesImages.push(`./src/assets/images/${i}.png`);
        }

        return listNamesImages;
    }

    public createTextures(list: Array<string>): Array<Texture> {
        return list.map((el) => Texture.from(el));
    }
}
