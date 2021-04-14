import { Player } from "./Player.js";

class LinkedList {
    constructor(head = null) {
        this.head = head;
    }

    length(current = this.head) {
        if (current == null) return 0;
        else return 1 + this.length(current.next);
    }

    indexOf(index) {
        if (index < 0 || index >= this.length()) return null;

        let tmp = this.head;
        while (index--) {
            tmp = tmp.next;
        }

        return tmp;
    }

    add(name, surname, nation, elo) {
        return (this.head = new Player(name, surname, nation, elo, this.head));
    }

    remove(index) {
        let tmp = index ? this.indexOf(index - 1) : this.head;
        if (tmp) {
            if (index) tmp.next = tmp.next.next;
            else this.head = this.head.next;
        }
    }

    sortArrayByELo() {
        return this.toArray().sort((a, b) => a[3] - b[3]);
    }

    toArray(current = this.head) {
        let array = new Array();
        while (current) {
            array.push(current.toArray());
            current = current.next;
        }
        return array;
    }

    fromArray(input) {
        this.head = null;
        for (const iterator of input.reverse()) {
            this.head = this.add(
                iterator[0],
                iterator[1],
                iterator[2],
                iterator[3]
            );
        }
    }

    getSessionStorage() {
        sessionStorage.setItem("players", JSON.stringify(list.toArray()));
        const list_tmp = JSON.parse(sessionStorage.players);

        list.fromArray(list_tmp);
    }
}

export { LinkedList };
