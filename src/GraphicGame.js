class GraphicGame {
    constructor(tag) {
        this.tag = document.querySelector(tag);
    }

    screenGame(info1, info2) {
        this.tag.innerHTML +=
            '<div class="game"><h2>Game</h2><div class="players">' +
            this.screenPlayer(info1) +
            this.screenPlayer(info2) +
            "</div></div>";
    }

    screenPlayer(info) {
        return (
            '<div class="player">' +
            '<div class="info">' +
            "<span>" +
            info[1] +
            "</span><span>" +
            info[0] +
            "</span><span>" +
            info[2] +
            "</span><span>" +
            info[3] +
            "</span></div>" +
            "<button>Winner" +
            "</button></div>"
        );
    }

    onScreen(couples) {
        this.tag.innerHTML = "";
        for (const iterator of couples) {
            this.screenGame(iterator[0], iterator[1]);
            // console.log(greater[key] + " " + lower[key]);
        }
    }

    getInfo(element) {
        const info = new Array();
        for (const span of element) {
            info.push(span.outerText);
        }
        info[3] = parseInt(info[3]);
        return info;
    }

    indexOfPlayer(tagPlayer) {
        // Calling : this.indexOfPlayer(props.path[1])
        return Array.prototype.indexOf.call(
            tagPlayer.parentNode.children,
            tagPlayer
        );
    }

    getGameAll() {
        const array = new Array();
        for (const iterator of this.tag.children) {
            console.log(iterator);
            array.push(iterator.querySelectorAll("button"));
        }

        return array;
    }

    printWinner(winner) {
        const tag = document.querySelector(".winner");
        tag.innerHTML = "<h1>" + winner + "</h1><p>has wooon!</p>";
        tag.classList.add("end");
    }

    printError(error) {
        const field = document.querySelector(".container .err");
        field.innerHTML = error;
    }
}

export { GraphicGame };
