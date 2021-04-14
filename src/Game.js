import { GraphicGame } from "./GraphicGame.js";

class Game extends GraphicGame {
    constructor(players, tag) {
        super(tag);
        [this.lower, this.greater] = this.split(players);
    }

    split(array) {
        return [
            array.slice(0, array.length / 2),
            array.slice(array.length / 2),
        ];
    }

    Test() {
        for (const iterator of this.tag.children) {
            for (const player of iterator.lastElementChild.children) {
                player.lastElementChild.addEventListener("click", (props) => {
                    console.log(props.path);
                });
            }
        }
        // this.tag.children.forEach((props) => {
        //     console.log(props.path);
        // });
    }
}

export { Game };
