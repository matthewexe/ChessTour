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

    onScreen(couples) {
        for (const iterator of couples) {
            this.screenElement(iterator[0], iterator[1]);
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
}

export { GraphicGame };
