import { Game } from "./src/Game.js";
import { LinkedList as List } from "./src/LinkedList.js";

const list = new List();

list.add("Giorfio", "Ambrogio", "NL", 400);
list.add("Nicola", "Ambrogio", "IT", 800);
list.add("John", "Ambrogio", "UK", 900);
// list.add("Tresa", "Bolla", "UK", 1200);

const test = new Game(list.sortArrayByELo(list.toArray()), ".container .games");

test.Test();
