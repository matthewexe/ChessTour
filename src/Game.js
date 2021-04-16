import { GraphicGame } from "./GraphicGame.js";
import { LinkedList } from "./LinkedList.js";

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

    startGames(lower = this.lower, greater = this.greater) {
        const couples = this.matchRounds(lower, greater);
        this.onScreen(couples);
        const winners = new Array();
        const games = this.getGameAll();
        const finish_btn = document.querySelector(
            ".container .btn-next button"
        );

        const isFinish = () => {
            return winners.length == 1;
        };

        const checkWinner = (winner) => {
            const tmp = winners.map((value) => value.toString());
            if (tmp.indexOf(winner.toString()) < 0) winners.push(winner);
        };

        const addWinner = (props) => {
            const btn_winner = props.path[2].querySelectorAll("button");
            checkWinner(this.getInfo(props.path[1].firstChild.children));
            for (const button of btn_winner) {
                button.removeEventListener("click", addWinner);
            }
        };

        // console.log(games);
        for (const player of games) {
            for (const button of player) {
                button.addEventListener("click", addWinner);
            }
        }

        finish_btn.addEventListener("click", () => {
            // console.log(isFinish(), winners.length, couples.length);
            if (isFinish())
                this.printWinner(winners[0][0] + " " + winners[0][1]);
            else if (winners.length == couples.length) {
                [lower, greater] = this.split(
                    LinkedList.prototype.sortArrayByELo(winners)
                );
                this.startGames(lower, greater);
            } else {
                this.printError("Complete all game please");
            }
        });
    }
}

export { Game };
