class GraphicGame {
    constructor(tag) {
        this.tag = document.querySelector(tag);
    }

    screenElement(info1, info2) {
        this.tag.innerHTML +=
            '<div class="game"><h2>Game</h2><div class="players"><div class="player"><div class="info"><span>' +
            info1[1] +
            "</span><span>" +
            info1[0] +
            "</span><span>" +
            info1[2] +
            "</span><span>" +
            info1[3] +
            '</span></div><button>Winner</button></div><div class="player"><div class="info"><span>' +
            info2[1] +
            "</span><span>" +
            info2[0] +
            "</span><span>" +
            info2[2] +
            "</span><span>" +
            info2[3] +
            "</span></div><button>Winner</button></div></div></div>";
    }

    onScreen(lower, greater) {
        for (const key in lower) {
            this.screenElement(lower[key], greater[key]);
            // console.log(greater[key] + " " + lower[key]);
        }
    }
}

export { GraphicGame };
