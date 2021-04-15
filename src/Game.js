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

    matchCouple(player1, player2) {
        return Math.floor(Math.random() * 2)
            ? [player2, player1]
            : [player1, player2];
    }

    matchRounds(lower, greater) {
        const couples = new Array();
        for (const key in lower) {
            couples.push(this.matchCouple(lower[key], greater[key]));
        }
        if (greater.length != lower.length)
            couples.push(
                this.matchCouple(
                    lower[lower.length - 1],
                    greater[greater.length - 1]
                )
            );
        return couples;
    }

    Test(lower = this.lower, greater = this.greater) {
        const couples = this.matchRounds(lower, greater);
        this.onScreen(couples);
        const winners = new Array();
        let cnt = 0; // contatore partite completate

        const getButtons = () => {
            const array = new Array();
            for (const iterator of this.tag.children)
                array.push(iterator.querySelectorAll("button"));

            return array;
        };

        const players_btn = getButtons();

        const addWinner = (props) => {
            const btn_winner = props.path[2].querySelectorAll("button");
            winners.push(this.getInfo(props.path[1].firstChild.children));
            cnt++;
            console.log(winners);
            for (const button of btn_winner) {
                button.removeEventListener("click", addWinner);
            }
        };

        for (const player of players_btn) {
            for (const button of player) {
                // console.log(button);
                button.addEventListener("click", addWinner);
            }
        }
    }
}

export { Game };
