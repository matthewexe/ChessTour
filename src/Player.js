class Player {
    constructor(name = "", surname = "", nation = "", elo = 400, next = null) {
        this.name = name;
        this.surname = surname;
        this.nation = nation.toUpperCase();
        this.elo = elo;
        this.next = next;
    }

    toString() {
        return this.surname + this.name + this.nation + this.elo;
    }

    toArray() {
        return new Array(
            this.name,
            this.surname,
            this.nation.toLowerCase(),
            this.elo
        );
    }
}

export { Player };
