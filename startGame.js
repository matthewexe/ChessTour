import { Game } from "./src/Game.js";
import { LinkedList } from "./src/LinkedList.js";

const players = LinkedList.prototype.getSession();
const test = new Game(players, ".container .games");

test.startGames();
